import dbQuery from "../../database";

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
}

export default new UserRepository();
