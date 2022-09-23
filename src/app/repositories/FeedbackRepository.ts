import dbQuery from "../../database";

export type Feedback = {
  userId: string;
  sprint: number;
  description: string;
};

class FeedbackRepository {
  async findByUser(id: string) {
    const rows = await dbQuery(
      `
      SELECT description FROM feedbacks
      WHERE user_id = $1
      ORDER BY sprint DESC
      `,
      [id]
    );
    return rows;
  }

  async create(feedback: Feedback) {
    const [row] = await dbQuery(
      `
      INSERT INTO feedbacks (user_id, sprint, description)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [feedback.userId, feedback.sprint, feedback.description]
    );
    return row;
  }
}

export default new FeedbackRepository();
