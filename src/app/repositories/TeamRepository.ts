import dbQuery from "../../database";

class TeamRepository {
  async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const rows = await dbQuery(
      `
      SELECT * FROM teams
      ORDER BY name ${direction}
      `
    );
    return rows;
  }
}

export default new TeamRepository();
