import { Request, Response, NextFunction } from "express"

interface AuthRequest extends Request {
  user?: { role: string };
}

export const authAdmin = (request: AuthRequest, response: Response, next: NextFunction) => {

  if (request.user?.role !== "ADM" && request.user?.role !== "adm") {
    response.status(403).json({
      status: "error",
      message: "Somente administradores podem acessar essa funcionalidade!",
      code: 403
    });
  }
  else {
    next();
  }
}