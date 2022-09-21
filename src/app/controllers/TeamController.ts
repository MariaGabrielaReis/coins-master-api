import { Request, Response } from "express";
import TeamRepository from "../repositories/TeamRepository";

class TeamController {
  async index(request: Request, response: Response) {
    const { orderBy } = request.params;

    const teams = await TeamRepository.findAll(orderBy);
    response.json(teams);
  }
}

export default new TeamController();
