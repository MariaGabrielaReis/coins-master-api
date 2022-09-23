import dbQuery from "../../database";

export type Avaliation = {
  userId: string;
  sprint: number;
  habilitiy1: number;
  habilitiy2: number;
  habilitiy3: number;
  habilitiy4: number;
  habilitiy5: number;
  feedbacks: string[];
};

class AvaliationRepository {
  async create(avaliation: Avaliation) {
    const [row] = await dbQuery(
      `
      INSERT INTO avaliations (user_id, sprint, habilitiy1, habilitiy2, habilitiy3, habilitiy4, habilitiy5)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        avaliation.userId,
        avaliation.sprint,
        avaliation.habilitiy1,
        avaliation.habilitiy2,
        avaliation.habilitiy3,
        avaliation.habilitiy4,
        avaliation.habilitiy5,
      ]
    );
    return row;
  }
}

export default new AvaliationRepository();
