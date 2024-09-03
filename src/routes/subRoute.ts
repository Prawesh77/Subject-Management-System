import express from "express";
import { SubjectController } from "../controller/subjectController"

const router = express.Router();
const subjectController = new SubjectController

router.get("/", subjectController.getCall);
// router.post('/add', someController.addAllDetails);

export default router;