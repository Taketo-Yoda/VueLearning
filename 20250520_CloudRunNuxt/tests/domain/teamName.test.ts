import { describe, it, expect } from 'vitest';
import { TeamName } from '../../server/domain/teamName';

describe('TeamName', () => {
  it('正常なチーム名で生成できる', () => {
    const name = '横浜F・マリノス';
    const teamName = TeamName.create(name);
    expect(teamName.value).toBe(name);
  });

  it('空文字はエラー', () => {
    expect(() => TeamName.create('')).toThrow('チーム名は必須です');
  });

  it('空白のみはエラー', () => {
    expect(() => TeamName.create('   ')).toThrow('チーム名は必須です');
  });

  it('51文字以上はエラー', () => {
    const longName = 'a'.repeat(51);
    expect(() => TeamName.create(longName)).toThrow('チーム名は50文字以内で入力してください');
  });

  it('前後の空白はトリムされる', () => {
    const teamName = TeamName.create('  川崎フロンターレ  ');
    expect(teamName.value).toBe('川崎フロンターレ');
  });
});
