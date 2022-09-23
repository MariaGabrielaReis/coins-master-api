import { Request, Response } from "express";
import TeamRepository from "../repositories/TeamRepository";
import UserRepository, { User } from "../repositories/UserRepository";

class UserController {
  async index(request: Request, response: Response) {
    const { orderBy } = request.params;

    const users = await UserRepository.findAll(orderBy);
    response.json(users);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const user = await UserRepository.findById(id);
    return !user
      ? response.status(404).json({ error: "User not found" })
      : response.json(user);
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

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const newUser: User = request.body;

    const UserExists = await UserRepository.findById(id);
    if (!UserExists)
      return response.status(400).json({ error: "User not found" });

    if (!newUser.name)
      return response.status(400).json({ error: `Name is required` });
    if (!newUser.team_code)
      return response.status(400).json({ error: `Team Code is required` });
    if (!newUser.photo)
      return response.status(400).json({ error: `Photo is required` });
    if (!newUser.role)
      return response.status(400).json({ error: `Role is required` });

    const TeamExistsByCode = await TeamRepository.findByCode(newUser.team_code);
    if (!TeamExistsByCode)
      return response
        .status(400)
        .json({ error: `There is no team with this code` });

    const user = await UserRepository.update(id, newUser);
    response.json(user);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await UserRepository.deleteById(id);
    response.sendStatus(204);
  }
}

export default new UserController();
