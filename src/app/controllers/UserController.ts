import { Request, Response } from "express";
import TeamRepository from "../repositories/TeamRepository";
import UserRepository, { User } from "../repositories/UserRepository";

class UserController {
  async index(request: Request, response: Response) {
    const { orderBy } = request.params;

    const teams = await UserRepository.findAll(orderBy);
    response.json(teams);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const team = await UserRepository.findById(id);
    return !team
      ? response.status(404).json({ error: "User not found" })
      : response.json(team);
  }

  async store(request: Request, response: Response) {
    const newUser: User = request.body;

    if (!newUser.name)
      return response.status(400).json({ error: `Name is required` });
    if (!newUser.team_code)
      return response.status(400).json({ error: `Team Code is required` });
    if (!newUser.photo)
      return response.status(400).json({ error: `Photo is required` });

    const TeamExistsByCode = await TeamRepository.findByCode(newUser.team_code);
    if (!TeamExistsByCode)
      return response
        .status(400)
        .json({ error: `There is no team with this code` });

    const user = await UserRepository.create(newUser);
    response.json(user);
  }
}

export default new UserController();
