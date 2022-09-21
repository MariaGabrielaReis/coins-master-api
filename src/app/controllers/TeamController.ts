import { Request, Response } from "express";
import TeamRepository, { Team } from "../repositories/TeamRepository";

class TeamController {
  async index(request: Request, response: Response) {
    const { orderBy } = request.params;

    const teams = await TeamRepository.findAll(orderBy);
    response.json(teams);
  }

  async store(request: Request, response: Response) {
    const newTeam: Team = request.body;

    if (!newTeam.name)
      return response.status(400).json({ error: `Name is required` });
    if (!newTeam.code)
      return response.status(400).json({ error: `Code is required` });
    if (!newTeam.classroom)
      return response.status(400).json({ error: `Classroom is required` });
    if (!newTeam.habilities)
      return response.status(400).json({ error: `Habilities is required` });

    const team = await TeamRepository.create(newTeam);
    response.json(team);
  }
}

export default new TeamController();
