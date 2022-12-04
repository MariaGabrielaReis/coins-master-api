import dbQuery from "../../database";

export type User = {
  name: string;
  photo: string;
  team_code: string;
  role: "Dev Team" | "Scrum Master" | "Product Owner";
};

class UserRepository {
  async findAll() {
    const rows = await dbQuery(
      `
      SELECT * FROM users
      ORDER BY name ASC
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

  async findByCode(code: string) {
    const rows = await dbQuery(
      `
      SELECT id, name, photo, role  FROM users
      WHERE team_code = $1
      ORDER BY role DESC
      `,
      [code]
    );
    return rows;
  }

  async create(user: User) {
    const [row] = await dbQuery(
      `
      INSERT INTO users (name, photo, team_code, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [user.name, user.photo, user.team_code, user.role]
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

  async deleteById(id: string) {
    const deleteOp = await dbQuery(
      `
      DELETE FROM users
      WHERE id = $1
      `,
      [id]
    );
    return deleteOp;
  }

  async deleteByTeam(teamCode: string) {
    const deleteOp = await dbQuery(
      `
      DELETE FROM users
      WHERE team_code = $1
      `,
      [teamCode]
    );
    return deleteOp;
  }
}

export default new UserRepository();
