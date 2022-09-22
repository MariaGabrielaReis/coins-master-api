import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";

class UserController {
  async index(request: Request, response: Response) {
    const { orderBy } = request.params;

    const teams = await UserRepository.findAll(orderBy);
    response.json(teams);
  }
}

export default new UserController();
