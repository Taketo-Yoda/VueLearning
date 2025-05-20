import { BigQuery } from '@google-cloud/bigquery';
import { defineEventHandler, readBody, getQuery } from 'h3';
import { TeamName } from '../domain/teamName';
import { bigqueryConfig } from '../config/bigquery';

function getBigQueryClient() {
  return new BigQuery({ projectId: bigqueryConfig.projectId });
}

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const bq = getBigQueryClient();
  const table = `${bigqueryConfig.projectId}.${bigqueryConfig.datasetId}.teams`;

  if (method === 'GET') {
    // 検索・一覧
    const { name } = getQuery(event);
    let query = `SELECT id, name FROM \`${table}\``;
    const options: any = {query};
    if (name) {
      query += ` WHERE name LIKE @name`;
      // nameは部分一致検索
      options.query = query;
      options.params = { name: `%${name}%` };
    }
    options.query += ' ORDER BY id';
    const [rows] = await bq.query(options);
    return rows;
  }

  if (method === 'POST') {
    // 新規登録
    const body = await readBody(event);
    try {
      const teamName = TeamName.create(body.name);
      // BigQuery SQLでUUIDを生成し、INSERT文で利用
      const query = `INSERT INTO \`${table}\` (id, name) VALUES (GENERATE_UUID(), @name)`;
      const options = {
        query,
        params: { name: String(teamName.value) },
      };
      const [job] = await bq.createQueryJob(options);
      await job.getQueryResults();
      // 直近の登録IDを返すには再度SELECTが必要だが、ここではnameのみ返却
      return { name: teamName.value };
    } catch (e: any) {
      return { error: e.message };
    }
  }

  if (method === 'PUT') {
    // 更新
    const body = await readBody(event);
    if (!body.id || !body.name) {
      return { error: 'id and name are required' };
    }
    try {
      const teamName = TeamName.create(body.name);
      const query = `UPDATE \
        \`${table}\`
        SET name = @name
        WHERE id = @id`;
      const options = {
        query,
        params: { id: body.id, name: teamName.value },
      };
      await bq.query(options);
      return { id: body.id, name: teamName.value };
    } catch (e: any) {
      return { error: e.message };
    }
  }

  if (method === 'DELETE') {
    // 削除
    const body = await readBody(event);
    if (!body.id) {
      return { error: 'id is required' };
    }
    const query = `DELETE FROM \
      \`${table}\`
      WHERE id = @id`;
    const options = {
      query,
      params: { id: body.id },
    };
    await bq.query(options);
    return { id: body.id };
  }

  return { error: 'Method not allowed' };
});
