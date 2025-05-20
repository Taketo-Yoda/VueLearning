
import { BigQuery } from '@google-cloud/bigquery';
import { defineEventHandler, readBody, getQuery } from 'h3';
import { bigqueryConfig } from '../../config/bigquery';

function getBigQueryClient() {
  return new BigQuery({ projectId: bigqueryConfig.projectId });
}

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const bq = getBigQueryClient();
  const table = `${bigqueryConfig.projectId}.${bigqueryConfig.datasetId}.${bigqueryConfig.tableId}`;

  // idは常にクエリストリングから取得
  const queryObj = getQuery(event);
  let id: string | undefined = queryObj.id as string | undefined;
  if (!id) {
    return { error: 'id is required' };
  }

  // idが数値型の場合は変換（BigQueryのスキーマに合わせて適宜変更）
  // const idValue = Number.isNaN(Number(id)) ? id : Number(id);
  const idValue = id;

  try {
    if (method === 'GET') {
      // 単一取得
      const query = `SELECT id, name FROM \`${table}\` WHERE id = @id`;
      const options = { query, params: { id: idValue } };
      const [rows] = await bq.query(options);
      if (rows.length === 0) return { error: 'not found' };
      return rows[0];
    }

    if (method === 'PUT') {
      // 更新
      const body = await readBody(event);
      if (!body.name) {
        return { error: 'name is required' };
      }
      const query = `UPDATE \`${table}\` SET name = @name WHERE id = @id`;
      const options = { query, params: { id: idValue, name: body.name } };
      await bq.query(options);
      return { id: idValue, name: body.name };
    }

    if (method === 'DELETE') {
      // 削除
      const query = `DELETE FROM \`${table}\` WHERE id = @id`;
      const options = { query, params: { id: idValue } };
      await bq.query(options);
      return { id: idValue };
    }
  } catch (e: any) {
    return { error: e.message };
  }

  return { error: 'Method not allowed' };
});
