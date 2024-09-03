import { Request, Response } from "express";
import { AppDataSource } from "../config/db.config";
import { ClassNo } from "../entities/class.entity";
import { Course } from "../entities/course.entity";
import { Faculty } from "../entities/faculty.entity";
import { Level } from "../entities/level.entity";
import { Subjects } from "../entities/subjects.entity";
import { University } from "../entities/university.entity";

const classRepo = AppDataSource.getRepository(ClassNo);
const courseRepo = AppDataSource.getRepository(Course);
const facultyRepo = AppDataSource.getRepository(Faculty);
const levelRepo = AppDataSource.getRepository(Level);
const subjectsRepo = AppDataSource.getRepository(Subjects);
const uniRepo = AppDataSource.getRepository(University);

export class SubjectController {

    async getCall(req: Request, res: Response) {
        try {
            const { classNo, university, depart, course, year, sem } = req.body;
    
            if(university){
                const uniDetail = await uniRepo.findOne({ where: { uni_name: university } });
                if (!uniDetail) {
                    return res.status(404).json({ message: "University not found" });
                }
        
                const facultyDetail = await facultyRepo.findOne({
                    where: { faculty_name: depart, university: uniDetail},
                });
                if (!facultyDetail) {
                    return res.status(404).json({ message: "Faculty not found" });
                }
        
                const courseDetail = await courseRepo.findOne({
                    where: { courseName: course, faculty: facultyDetail},
                });
                if (!courseDetail) {
                    return res.status(404).json({ message: "Course not found" });
                }
                let subDetail;
                if(sem){
                    subDetail = await subjectsRepo.find({
                        where: {course: courseDetail, sem: sem},
                    });
                    if (!subDetail) {
                        return res.status(404).json({ message: "Subject not found" });
                    }
                }else{
                    subDetail = await subjectsRepo.findBy(
                        {course: courseDetail, year: year}
                    );
                    if (!subDetail) {
                        return res.status(404).json({ message: "Subject not found" });
                    }
                }
                console.log (subDetail);
                const subjects = subDetail.map((sub)=>sub.subjects);  
                res.json({
                    message: "subjects found",
                    data: subjects
                });
            }
            if(classNo){
                const classDetail = await classRepo.findOne({ where: { class: classNo } });
                if (!classDetail) {
                    return res.status(404).json({ message: "Class not found" });
                }

                const subDetail = await subjectsRepo.find({
                    where: {class: classDetail},
                });
                if (!subDetail) {
                    return res.status(404).json({ message: "Subject not found" });
                }
                const subjects = subDetail.map((sub)=>sub.subjects);  
                res.json({
                    message: "subjects found",
                    data: subjects
                });
            }

            
        } catch (error) {
            console.error("Error fetching subjects:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    // async addDetails(req:Request, res:Response){
    //     return("Add Garna")
    // }
}