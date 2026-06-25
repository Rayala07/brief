import { Request, Response } from "express";
import { prisma } from "../db/client";
import { z } from "zod";

const onboardingSchema = z.object({
  name: z.string().min(3),
  category: z.string(),
});

async function onBoardingController(req: Request, res: Response) {
  const result = onboardingSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      status: false,
      error: "Invalid details",
    });
    return;
  }
  const { name, category } = result.data;

  if (req.user!.agencyId) {
    res.status(400).json({
      status: false,
      error: "Already onboarded",
    });
    return;
  }

  const createAgency = await prisma.agency.create({
    data: {
      name,
      category,
      ownerId: req.user!.id,
    },
  });

  await prisma.user.update({
    where: { id: req.user!.id },
    data: {
      agencyId: createAgency.id,
    },
  });

  res.status(201).json({
    success: true,
    message: "Agency created",
    agencyId: createAgency.id,
  });
}

export { onBoardingController };
