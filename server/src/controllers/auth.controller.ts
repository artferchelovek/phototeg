import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async register(req: AuthRequest, res: Response) {
    try {
      const { email, password, username } = req.body;

      if (!email || !password || !username) {
        return res.status(400).json({ error: "email or password is required" });
      }

      const user = await AuthService.register(email, password, username);
      return res.status(200).json(user);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Register failed" });
    }
  }

  static async login(req: AuthRequest, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "email or password is required" });
      }

      const user = await AuthService.login(email, password);

      return res.status(200).json(user);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Login failed" });
    }
  }
}
