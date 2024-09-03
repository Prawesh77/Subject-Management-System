import express from "express";
import { SubjectController } from "../controller/subjectController"

const router = express.Router();
const subjectController = new SubjectController

router.get("/", subjectController.getCall);
// router.post('/add', someController.addAllDetails);
router.get("/faculty", subjectController.getFaculty);
router.get("/courses", subjectController.getCourses);
router.get("/subjects", subjectController.getSubjects);

export default router;