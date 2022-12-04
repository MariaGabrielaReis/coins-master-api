import { Request, Response } from "express";
import TeamRepository, { Team } from "../repositories/TeamRepository";
import UserRepository, { User } from "../repositories/UserRepository";

class TeamController {
  async index(request: Request, response: Response) {
    const teams = await TeamRepository.findAll();
    response.json(teams);
  }

  async show(request: Request, response: Response) {
    const { code } = request.params;

    const team = await TeamRepository.findByCode(code);

    const members = await UserRepository.findByCode(code);
    if (!team) return response.status(404).json({ error: "Team not found" });

    return response.json({ team, members });
  }

  async store(request: Request, response: Response) {
    const newTeam: Team = request.body;

    if (!newTeam.name)
      return response.status(400).json({ error: `Name is required` });
    if (!newTeam.code)
      return response.status(400).json({ error: `Code is required` });
    if (!newTeam.classroom)
      return response.status(400).json({ error: `Classroom is required` });
    if (!newTeam.ability1)
      return response.status(400).json({ error: `Ability 1 is required` });
    if (!newTeam.ability2)
      return response.status(400).json({ error: `Ability 2 is required` });
    if (!newTeam.ability3)
      return response.status(400).json({ error: `Ability 3 is required` });
    if (!newTeam.ability4)
      return response.status(400).json({ error: `Ability 4 is required` });
    if (!newTeam.ability5)
      return response.status(400).json({ error: `Ability 5 is required` });
    // if (!newTeam.coins)
    //   return response.status(400).json({ error: `Coins is required` });

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
    const { updatedTeam, scrumMaster, productOwner } = request.body;

    const teamExists = await TeamRepository.findByCode(code);
    if (!teamExists)
      return response.status(400).json({ error: "Team not found" });

    const teamExistsByCode = await TeamRepository.findByCode(updatedTeam.code);
    if (teamExistsByCode)
      return response
        .status(400)
        .json({ error: `A team with this code already exists` });

    if (!updatedTeam.name)
      return response.status(400).json({ error: `Name is required` });
    if (!updatedTeam.code)
      return response.status(400).json({ error: `Code is required` });
    if (!updatedTeam.classroom)
      return response.status(400).json({ error: `Classroom is required` });
    if (!updatedTeam.ability1)
      return response.status(400).json({ error: `Ability 1 is required` });
    if (!updatedTeam.ability2)
      return response.status(400).json({ error: `Ability 2 is required` });
    if (!updatedTeam.ability3)
      return response.status(400).json({ error: `Ability 3 is required` });
    if (!updatedTeam.ability4)
      return response.status(400).json({ error: `Ability 4 is required` });
    if (!updatedTeam.ability5)
      return response.status(400).json({ error: `Ability 5 is required` });
    if (!updatedTeam.coins)
      return response.status(400).json({ error: `Coins is required` });

    const members = await UserRepository.findByCode(code);
    const allMembers = [];
    members.map((member) => {
      member.role = "Dev Team";
      member = member.id === scrumMaster.id ? scrumMaster : member;
      member = member.id === productOwner.id ? productOwner : member;
      allMembers.push(member);
    });

    const team = await TeamRepository.update(code, updatedTeam);
    response.json(team);
  }

  async delete(request: Request, response: Response) {
    const { code } = request.params;

    const members = await UserRepository.findByCode(code);
    if (members) await UserRepository.deleteByTeam(code);

    await TeamRepository.delete(code);
    response.sendStatus(204);
  }
}

export default new TeamController();
