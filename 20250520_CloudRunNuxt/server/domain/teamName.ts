// TeamName値オブジェクト（ドメイン層）
export class TeamName {
  private constructor(public readonly value: string) {}
  static create(name: string): TeamName {
    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('チーム名は必須です');
    }
    if (name.length > 50) {
      throw new Error('チーム名は50文字以内で入力してください');
    }
    // 他にもドメインルールがあればここに追加
    return new TeamName(name.trim());
  }
}
