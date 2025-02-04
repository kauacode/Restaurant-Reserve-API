import { Response } from "express"

export const handleError = (response: Response, error: any): void => {
  console.error(error)
  response.status(error.statusCode || 400).json({
    status: "error",
    message: error.message || "Erro ao processar os dados enviados!",
    details: error.errors || null,
    code: error.statusCode || 400
  })
}