import { Request, Response, } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { handleError } from "../utils/errorHandler";
import { reservationSchemas } from "../validations/validationSchemas";
import { ZodError } from "zod";
import reserveService from "../services/reserve.service";

class ReserveController {
  async createReservation(request: AuthRequest, response: Response) {
    try {
      const userId = request.user.id;
      const { deskId, reservationDate } = reservationSchemas.create.parse(request.body);

      const desk = await reserveService.findAvailableDesk(deskId);
      console.log(desk)
      if (!desk) {
        response.status(401).json({
          status: "sucess",
          message: "Essa mesa não está disponivel para realizar reservas!",
          code: 401
        });
      }

      const existingReservation = await reserveService.findReservationForDate(deskId, reservationDate)
      if (existingReservation) {
        response.status(401).json({
          status: "sucess",
          message: "Já existe uma reserva para essa mesa nessa data!",
          code: 401
        });
      }

      await reserveService.updateDeskStatus(desk, "Reservado");

      const newReservation = await reserveService.createReserveRecord(userId, deskId, reservationDate);
      response.status(201).json({
        status: "sucess",
        message: "Reserva realizada com sucesso!",
        reservation: newReservation,
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
      }
      else {
        handleError(response, error);
      }
    }
  }

  async listAllReserves(request: AuthRequest, response: Response) {
    try {
      const userId = request.user.id;
      const reserves = await reserveService.findAllReserves(userId);
      response.status(200).json(reserves);
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

  async patch(request: Request, response: Response) {
    try {
      const deskId = parseInt(request.params.id, 10)
      const activeReservation = await reserveService.activeReservation(deskId, "Ativo");
      if (!activeReservation) {
        response.status(404).json({
          status: "error",
          message: "Nenhuma reserva ativa encontrada para este ID."
        });
        return
      }
      const reservedDesk = await reserveService.reservedDesk(deskId, "Ativo");
      if (!reservedDesk) {
        response.status(404).json({
          status: "error",
          message: "Mesa correspondente não encontrada ou não está reservada."
        });
        return
      }

      await activeReservation.update({ status: "Cancelado" })
      await reservedDesk.update({ status: "Disponivel" })
      response.status(200).json({
        status: "success",
        message: "A reserva foi cancelada com sucesso!",
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
      } else {
        handleError(response, error);
      }
    }
  }
}

export { ReserveController };