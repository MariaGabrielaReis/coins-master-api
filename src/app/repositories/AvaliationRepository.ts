import dbQuery from "../../database";

export type Avaliation = {
  userId: string;
  sprint: number;
  ability1: number;
  ability2: number;
  ability3: number;
  ability4: number;
  ability5: number;
  feedbacks: string[];
};

class AvaliationRepository {
  async findByUser(id: string) {
    const rows = await dbQuery(
      `
      SELECT * FROM avaliations
      WHERE user_id = $1
      ORDER BY sprint ASC
      `,
      [id]
    );
    return rows;
  }

  async findBySprint(userId: string, sprint: number) {
    const [row] = await dbQuery(
      `
      SELECT * FROM avaliations
      WHERE user_id = $1 AND sprint = $2
      `,
      [userId, sprint]
    );
    return row;
  }

  async create(avaliation: Avaliation) {
    const [row] = await dbQuery(
      `
      INSERT INTO avaliations (user_id, sprint, ability1, ability2, ability3, ability4, ability5)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        avaliation.userId,
        avaliation.sprint,
        avaliation.ability1,
        avaliation.ability2,
        avaliation.ability3,
        avaliation.ability4,
        avaliation.ability5,
      ]
    );
    return row;
  }
}

export default new AvaliationRepository();
