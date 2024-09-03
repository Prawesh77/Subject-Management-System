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
            const { classNo, university, faculty, course, year, sem } = req.body;
    
            if(university){
                const uniDetail = await uniRepo.findOne({ where: { uni_id: university } });
                if (!uniDetail) {
                    return res.status(404).json({ message: "University not found" });
                }
                
                const facultyDetail = await facultyRepo.findOne({
                    where: { faculty_id: faculty, university: uniDetail},
                });
                if (!facultyDetail) {
                    return res.status(404).json({ message: "Faculty not found" });
                }
        
                const courseDetail = await courseRepo.findOne({
                    where: { course_id: course, faculty: facultyDetail},
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
                    const subjects = subDetail.map((sub)=>sub.subjects);  
                    return res.json({
                        message: "subjects found",
                        data: subjects,
                        hey: uniDetail
                    });

                }
                if(year){
                    subDetail = await subjectsRepo.findBy(
                        {course: courseDetail, year: year}
                    );
                    if (!subDetail) {
                        return res.status(404).json({ message: "Subject not found" });
                    }
                    const subjects = subDetail.map((sub)=>sub.subjects);  
                    return res.json({
                        message: "subjects found",
                        data: subjects
                    });
                }

                console.log (subDetail);
                // res.send(uniDetail)

                // subDetail = await uniRepo.findBy({})
                // const subjects = subDetail!.map((sub)=>sub.subjects);  
                // return res.json({
                //     message: "subjects found",
                //     data: subjects
                // });
            }
            if(classNo){
                const classDetail = await classRepo.findOne({ where: { id: classNo } });
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
                    // data: subjects
                });
            }


            
        } catch (error) {
            console.error("Error fetching subjects:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    // async addDetails(req:Request, res:Response){
    //     return("Add Garna")
    // },
    async getFaculty(req:Request, res:Response){
        const {university}=req.body;
        const uniDetail = await uniRepo.findOneBy({uni_id: university});
        if(!uniDetail || uniDetail.uni_id !== university){
            return res.send("No university found")
        }
        const facultyDetails= await facultyRepo.findBy({university: uniDetail})
        console.log(facultyDetails);

        const faculties = facultyDetails.map((faculty)=>faculty.faculty_name);
        return res.json({
            message:`Faculties of ${uniDetail.uni_name}`,
            data: faculties 
        })
    }
    async getCourses(req:Request, res:Response){
        const {faculty}=req.body;
        const facultyDetail = await facultyRepo.findOneBy({faculty_id: faculty});
        if(!facultyDetail || facultyDetail.faculty_id !== faculty){
            return res.send("No Faculty found");
        }
        const courseDetails= await courseRepo.findBy({faculty: facultyDetail});
        console.log(courseDetails);
        if(!courseDetails){
            return res.send(`No courses for ${facultyDetail.faculty_name}`);
        }

        const courses = courseDetails.map((course)=>course.courseName);
        return res.json({
            message:`Courses of ${facultyDetail.faculty_name}`,
            data: courses 
        })
    }
    async getSubjects(req:Request, res:Response){
        const {course, year, sem}=req.body;
        const courseDetail = await courseRepo.findOneBy({course_id: course});
        if(!courseDetail || courseDetail.course_id !== course){
            return res.send("No any course found")
        }

        let subjectDetails;
        if(year){
            subjectDetails= await subjectsRepo.findBy({course: courseDetail, year: year})
            console.log(subjectDetails);
            if(!subjectDetails){
                return res.send("No any subject found")
            }
        }
        if(sem){
            subjectDetails= await subjectsRepo.findBy({course: courseDetail, sem: sem})
            console.log(subjectDetails);
            if(!subjectDetails){
                return res.send("No subject found")
            }
        }
        if(!year || !sem){
            subjectDetails= await subjectsRepo.findBy({course: courseDetail})
            console.log(subjectDetails);
            if(!subjectDetails){
                return res.send("No subject found")
            }
        }

        const subjects = subjectDetails?.map((subject)=>subject.subjects);
        // return res.send(subjectDetails);
        return res.json({
            message:`Subjects of ${courseDetail.courseName}`,
            data: subjects 
        })
    }

}