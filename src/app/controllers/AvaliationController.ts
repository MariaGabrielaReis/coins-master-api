import { Request, Response } from "express";
import AvaliationRepository, {
  Avaliation,
} from "../repositories/AvaliationRepository";
import FeedbackRepository from "../repositories/FeedbackRepository";
import UserRepository from "../repositories/UserRepository";

class AvaliationController {
  async store(request: Request, response: Response) {
    const newAvaliation: Avaliation = request.body;

    if (!newAvaliation.userId)
      return response.status(400).json({ error: `User id is required` });
    if (!newAvaliation.sprint)
      return response.status(400).json({ error: `Sprint is required` });
    if (!newAvaliation.habilitiy1)
      return response.status(400).json({ error: `Hability 1 is required` });
    if (!newAvaliation.habilitiy2)
      return response.status(400).json({ error: `Hability 2 is required` });
    if (!newAvaliation.habilitiy3)
      return response.status(400).json({ error: `Hability 3 is required` });
    if (!newAvaliation.habilitiy4)
      return response.status(400).json({ error: `Hability 4 is required` });
    if (!newAvaliation.habilitiy5)
      return response.status(400).json({ error: `Hability 5 is required` });
    if (!newAvaliation.feedbacks)
      return response.status(400).json({ error: `Feedbacks is required` });

    const userExists = await UserRepository.findById(newAvaliation.userId);
    if (!userExists)
      return response.status(400).json({ error: `User not found` });

    const avaliation = await AvaliationRepository.create(newAvaliation);

    newAvaliation.feedbacks.forEach(async (feedback) => {
      await FeedbackRepository.create({
        userId: newAvaliation.userId,
        sprint: newAvaliation.sprint,
        description: feedback,
      });
    });

    response.json(avaliation);
  }
}

export default new AvaliationController();