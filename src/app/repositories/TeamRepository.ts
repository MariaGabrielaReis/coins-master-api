import dbQuery from "../../database";

export type Team = {
  name: string;
  code: string;
  classroom: string;
  ability1: string;
  ability2: string;
  ability3: string;
  ability4: string;
  ability5: string;
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
      INSERT INTO teams (name, code, classroom, ability1, ability2, ability3, ability4, ability5, coins)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        team.name,
        team.code,
        team.classroom,
        team.ability1,
        team.ability2,
        team.ability3,
        team.ability4,
        team.ability5,
        team.coins ?? 0,
      ]
    );
    return row;
  }

  async update(code: string, team: Team) {
    const row = await dbQuery(
      `
      UPDATE teams
      SET name = $1, code = $2, classroom = $3,ability1 = $4,ability2 = $5,ability3 = $6,ability4 = $7,ability5 = $8, coins = $9
      WHERE code = $10
      RETURNING *
      `,
      [
        team.name,
        team.code,
        team.classroom,
        team.ability1,
        team.ability2,
        team.ability3,
        team.ability4,
        team.ability5,
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
