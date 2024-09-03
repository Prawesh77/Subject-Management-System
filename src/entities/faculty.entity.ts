import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { University } from "./university.entity";
import { Course } from "./course.entity";

@Entity()
export class Faculty {
    @PrimaryGeneratedColumn()
    faculty_id: number;

    @Column()
    faculty_name: string;

    @ManyToOne(() => University, (university) => university.faculties)
    university: University;

    @OneToMany(() => Course, (course) => course.faculty, {eager: true})
    courses: Course[];
}
