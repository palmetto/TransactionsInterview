import { Response } from "express";

export const accepted = (res: Response, message?: string): void => {
  res.status(202).json({ message });
};

export const badRequest = (res: Response, message?: string): void => {
  res.status(400).json({ message });
};
