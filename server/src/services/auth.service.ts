import prisma from "../prisma";
import { hashPassword, verifyPassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

export class AuthService {
  static async register(email: string, password: string, username: string) {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new Error("Email already exists");
      }
      if (existingUser.username === username) {
        throw new Error("Username already exists");
      }
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const payload = {
      userId: user.id,
      email: user.email,
      username: user.username,
    };

    const token = generateToken(payload);

    return {
      user: user.id,
      token: token,
    };
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User does not exist");
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const payload = {
      userId: user.id,
      email: user.email,
      username: user.username,
    };

    const token = generateToken(payload);

    return {
      userId: user.id,
      token: token,
    };
  }
}
