import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ClassNo } from "./class.entity";
import { Course } from "./course.entity";

@Entity()
export class Subjects {
    @PrimaryGeneratedColumn()
    sub_id: number;

    @Column()
    subjects: string;

    @Column({nullable: true})
    sem: string;

    @Column({nullable: true})
    year: string;

    @ManyToOne(() => ClassNo, (classNo) => classNo.subjects)
    class: ClassNo;

    @ManyToOne(() => Course, (course) => course.subjects)
    course: Course;
}
