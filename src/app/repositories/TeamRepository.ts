import dbQuery from "../../database";

export type Team = {
  name: string;
  code: string;
  classroom: string;
  habilities: string[];
};

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

  async create(team: Team) {
    const [row] = await dbQuery(
      `
      INSERT INTO teams (name, code, classroom, habilities)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [team.name, team.code, team.classroom, team.habilities]
    );
    return row;
  }
}

export default new TeamRepository();
