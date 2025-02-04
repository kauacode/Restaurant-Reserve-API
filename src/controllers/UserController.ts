import { Request, Response } from "express"
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { handleError } from "../utils/errorHandler"
import { userSchemas } from "../validations/validationSchemas"
import { ZodError } from "zod"
import userService from "../services/user.service"

dotenv.config()

class UserController {
  async register(request: Request, response: Response) {
    try {
      const { name, email, password, role } = userSchemas.create.parse(request.body);

      const user = await userService.registeredUser(email);
      if (user) {
        response.status(401).json({
          status: "sucess",
          message: "E-mail já está em uso!",
          code: 401
        });
      }
      const newUser = await userService.createNewUser(name, email, password, role || 'User');
      response.status(201).json({
        status: "sucess",
        message: "Usuário criado com sucesso!",
        user: newUser
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map(err => ({
          path: err.path,
          message: err.message
        }))
        response.status(400).json({
          status: "error",
          message: "Erro de validação!",
          errors: formattedErrors
        })
      }
      else {
        return handleError(response, error);
      }
    }
  }

  async login(request: Request, response: Response) {
    try {
      const { email, password } = userSchemas.login.parse(request.body);

      const jwtSecret = process.env.JWT_SECRET;
      const user = await userService.registeredUser(email);
      if (!user || !jwtSecret) {
        throw new Error("E-mail ou senha inválidos!");
      }
      const isPasswordValid = await compare(password, user?.password);
      if (!isPasswordValid) {
        response.status(401).json({
          status: "sucess",
          message: "E-mail ou senha inválidos!",
          code: 401
        });
      }
      const token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
      },
        jwtSecret,
        { expiresIn: '1h' });
      response.status(200).json({
        status: "sucess",
        message: "Login realizado com sucesso!",
        token
      });
    }
    catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map(err => ({
          path: err.path,
          message: err.message
        }))
        response.status(401).json({
          status: "error",
          message: "Erro de validação!",
          errors: formattedErrors
        })
      }
      else {
        return handleError(response, error);
      }
    }
  }
}

export default new UserController();