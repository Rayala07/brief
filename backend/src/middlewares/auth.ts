import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session = await auth.api.getSession({
    headers: req.headers as unknown as Headers,
  });

  if (!session) {
    res.status(401).json({
      status: false,
      error: "Unautorized",
    });
    return;
  }

  req.user = {
    id: session.user.id,
    agencyId: session.user.agencyId ?? null,
    role: session.user.role ?? "owner",
  };

  next();
}
