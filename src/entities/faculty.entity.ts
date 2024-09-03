import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { University } from "./university.entity";
import { Course } from "./course.entity";

@Entity()
export class Faculty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    faculty_name: string;

    @Column({default: '1'})
    faculty_id: string;

    @ManyToOne(() => University, (university) => university.faculties)
    university: University;

    @OneToMany(() => Course, (course) => course.faculty, {eager: true})
    courses: Course[];
}
