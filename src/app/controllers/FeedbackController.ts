import { Request, Response } from "express";
import FeedbackRepository from "../repositories/FeedbackRepository";

import UserRepository from "../repositories/UserRepository";

class FeedbackController {
  async show(request: Request, response: Response) {
    const { userId } = request.params;

    const userExists = await UserRepository.findById(userId);
    if (!userExists)
      return response.status(404).json({ error: "User not found" });

    const feedbackDescriptions = await FeedbackRepository.findByUser(userId);

    const feedbacks: string[] = [];
    feedbackDescriptions.forEach((feedbackDescription) =>
      feedbacks.push(feedbackDescription.description)
    );
    return response.json(feedbacks);
  }
}

export default new FeedbackController();
