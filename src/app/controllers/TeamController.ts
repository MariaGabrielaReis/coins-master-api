import { Request, Response } from "express";
import TeamRepository, { Team } from "../repositories/TeamRepository";
import UserRepository from "../repositories/UserRepository";

class TeamController {
  async index(request: Request, response: Response) {
    const { orderBy } = request.params;

    const teams = await TeamRepository.findAll(orderBy);
    response.json(teams);
  }

  async show(request: Request, response: Response) {
    const { code } = request.params;

    const team = await TeamRepository.findByCode(code);

    const members = await UserRepository.findByCode(code);
    if (!team) return response.status(404).json({ error: "Team not found" });

    return response.json({ team, members: members });
  }

  async store(request: Request, response: Response) {
    const newTeam: Team = request.body;

    if (!newTeam.name)
      return response.status(400).json({ error: `Name is required` });
    if (!newTeam.code)
      return response.status(400).json({ error: `Code is required` });
    if (!newTeam.classroom)
      return response.status(400).json({ error: `Classroom is required` });
    if (!newTeam.habilitiy1)
      return response.status(400).json({ error: `Hability 1 is required` });
    if (!newTeam.habilitiy2)
      return response.status(400).json({ error: `Hability 2 is required` });
    if (!newTeam.habilitiy3)
      return response.status(400).json({ error: `Hability 3 is required` });
    if (!newTeam.habilitiy4)
      return response.status(400).json({ error: `Hability 4 is required` });
    if (!newTeam.habilitiy5)
      return response.status(400).json({ error: `Hability 5 is required` });
    if (!newTeam.coins)
      return response.status(400).json({ error: `Coins is required` });

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
    if (!newTeam.habilitiy1)
      return response.status(400).json({ error: `Hability 1 is required` });
    if (!newTeam.habilitiy2)
      return response.status(400).json({ error: `Hability 2 is required` });
    if (!newTeam.habilitiy3)
      return response.status(400).json({ error: `Hability 3 is required` });
    if (!newTeam.habilitiy4)
      return response.status(400).json({ error: `Hability 4 is required` });
    if (!newTeam.habilitiy5)
      return response.status(400).json({ error: `Hability 5 is required` });
    if (!newTeam.coins)
      return response.status(400).json({ error: `Coins is required` });

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
