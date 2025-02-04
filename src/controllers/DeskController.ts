import { Request, Response } from "express"
import { ZodError } from "zod"
import { handleError } from "../utils/errorHandler";
import { deskSchemas } from "../validations/validationSchemas";
import deskService from "../services/desk.service";

class DeskController {
  async createDesks(request: Request, response: Response): Promise<void> {
    try {
      const parsedBody = deskSchemas.create.parse(request.body)
      const createdDesk = await deskService.createDesk(parsedBody.name, parsedBody.capacity);
      response.status(201).json({
        status: "success",
        message: "Mesa criada com sucesso!",
        createdDesk,
        code: 201
      });
    }
    catch (error) {
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
      } else {
        handleError(response, error);
      }
    }
  }

  async listAllDesks(request: Request, response: Response): Promise<void> {
    try {
      const desks = await deskService.getAllDesks();
      response.json({
        status: "success",
        message: "Lista de mesas: ",
        desks,
        code: 200
      });
    }
    catch (error) {
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
        handleError(response, error);
      }
    }
  }

  async updateDesks(request: Request, response: Response): Promise<void> {
    try {
      const parsedId = deskSchemas.updateParams.parse({ id: parseInt(request.params.id, 10) });
      const parsedBody = deskSchemas.updateBody.parse(request.body)

      const updatedDesk = await deskService.updateDesk(parsedId, parsedBody);
      response.status(200).json({
        status: "success",
        message: "Mesa atualizada com sucesso!",
        updatedDesk,
        code: 200
      });
    }
    catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map(err => ({
          path: err.path,
          message: err.message
        }))
        response.status(400).json({
          status: "error",
          message: "Falha na validação dos dados",
          errors: formattedErrors
        })
      }
      else {
        handleError(response, error);
      }
    }
  }

  async deleteDesks(request: Request, response: Response): Promise<void> {
    try {
      const parsedId = deskSchemas.updateParams.parse({ id: parseInt(request.params.id, 10) })
      const deletedDesk = await deskService.removeDesk(parsedId);
      response.status(200).json({
        status: "success",
        message: "Mesa deletada com sucesso!",
        deletedDesk,
        code: 200
      });
    }
    catch (error) {
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
        handleError(response, error);
      }
    }
  }
}

export { DeskController };