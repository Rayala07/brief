import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { onBoardingController } from "../controllers/onboardingController";

const router = Router();

router.post("/", requireAuth, onBoardingController);

export default router;