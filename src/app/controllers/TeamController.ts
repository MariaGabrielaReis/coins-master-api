import { Request, Response } from "express";
import TeamRepository, { Team } from "../repositories/TeamRepository";

class TeamController {
  async index(request: Request, response: Response) {
    const { orderBy } = request.params;

    const teams = await TeamRepository.findAll(orderBy);
    response.json(teams);
  }

  async show(request: Request, response: Response) {
    const { code } = request.params;

    const team = await TeamRepository.findByCode(code);
    return !team
      ? response.status(404).json({ error: "Team not found" })
      : response.json(team);
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

    const teamExistsByCode = await TeamRepository.findByCode(newTeam.code);
    if (teamExistsByCode)
      return response
        .status(400)
        .json({ error: `A team with this code already exists` });

    const team = await TeamRepository.create(newTeam);
    response.json(team);
  }

  async update(request: Request, response: Response) {
    const { code } = request.params;
    const newTeam: Team = request.body;

    const teamExists = await TeamRepository.findByCode(code);
    if (!teamExists)
      return response.status(400).json({ error: "Team not found" });

    const teamExistsByCode = await TeamRepository.findByCode(newTeam.code);
    if (teamExistsByCode)
      return response
        .status(400)
        .json({ error: `A team with this code already exists` });

    if (!newTeam.name)
      return response.status(400).json({ error: `Name is required` });
    if (!newTeam.code)
      return response.status(400).json({ error: `Code is required` });
    if (!newTeam.classroom)
      return response.status(400).json({ error: `Classroom is required` });
    if (!newTeam.habilities)
      return response.status(400).json({ error: `Habilities is required` });

    const team = await TeamRepository.update(code, newTeam);
    response.json(team);
  }

  async delete(request: Request, response: Response) {
    const { code } = request.params;

    await TeamRepository.delete(code);
    response.sendStatus(204);
  }
}

export default new TeamController();
