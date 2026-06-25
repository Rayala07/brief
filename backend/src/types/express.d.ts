declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        agencyId: string | null;
        role: string;
      };
    }
  }
}

export {};
