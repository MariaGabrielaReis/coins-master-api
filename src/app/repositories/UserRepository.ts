import dbQuery from "../../database";

export type User = {
  name: string;
  photo: string;
  team_code: string;
  role: string;
};

class UserRepository {
  async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const rows = await dbQuery(
      `
      SELECT * FROM users
      ORDER BY name ${direction}
      `
    );
    return rows;
  }

  async findById(id: string) {
    const [row] = await dbQuery(
      `
      SELECT * FROM users
      WHERE id = $1
      `,
      [id]
    );
    return row;
  }

  async create(user: User) {
    const [row] = await dbQuery(
      `
      INSERT INTO users (name, photo, team_code, role)
      VALUES ($1, $2, $3, 'Dev Team')
      RETURNING *`,
      [user.name, user.photo, user.team_code]
    );
    return row;
  }

  async update(id: string, user: User) {
    const row = await dbQuery(
      `
      UPDATE users
      SET name = $1, photo = $2, team_code = $3, role = $4
      WHERE id = $5
      RETURNING *
      `,
      [user.name, user.photo, user.team_code, user.role, id]
    );
    return row;
  }

  async delete(code: string) {
    const deleteOp = await dbQuery(
      `
      DELETE FROM users
      WHERE id = $1
      `,
      [code]
    );
    return deleteOp;
  }
}

export default new UserRepository();
