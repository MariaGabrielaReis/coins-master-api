import dbQuery from "../../database";

export type Team = {
  name: string;
  code: string;
  classroom: string;
  habilitiy1: string;
  habilitiy2: string;
  habilitiy3: string;
  habilitiy4: string;
  habilitiy5: string;
  coins: number;
};

class TeamRepository {
  async findAll() {
    const rows = await dbQuery(
      `
      SELECT * FROM teams
      ORDER BY name ASC
      `
    );
    return rows;
  }

  async findByCode(code: string) {
    const [row] = await dbQuery(
      `
      SELECT * FROM teams
      WHERE code = $1
      `,
      [code]
    );
    return row;
  }

  async create(team: Team) {
    const [row] = await dbQuery(
      `
      INSERT INTO teams (name, code, classroom, habilitiy1, habilitiy2, habilitiy3, habilitiy4, habilitiy5, coins)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        team.name,
        team.code,
        team.classroom,
        team.habilitiy1,
        team.habilitiy2,
        team.habilitiy3,
        team.habilitiy4,
        team.habilitiy5,
        team.coins,
      ]
    );
    return row;
  }

  async update(code: string, team: Team) {
    const row = await dbQuery(
      `
      UPDATE teams
      SET name = $1, code = $2, classroom = $3, habilitiy1 = $4, habilitiy2 = $5, habilitiy3 = $6, habilitiy4 = $7, habilitiy5 = $8, coins = $9
      WHERE code = $10
      RETURNING *
      `,
      [
        team.name,
        team.code,
        team.classroom,
        team.habilitiy1,
        team.habilitiy2,
        team.habilitiy3,
        team.habilitiy4,
        team.habilitiy5,
        team.coins,
        code,
      ]
    );
    return row;
  }

  async delete(code: string) {
    const deleteOp = await dbQuery(
      `
      DELETE FROM teams
      WHERE code = $1
      `,
      [code]
    );
    return deleteOp;
  }
}

export default new TeamRepository();
