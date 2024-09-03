import { Entity ,Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne } from "typeorm";
import { Faculty } from "./faculty.entity";
import { Subjects } from "./subjects.entity";

@Entity()
export class Course{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    courseName: string;

    @Column()
    duration: string;

    @Column()
    system: "sem"|"yearly";

    @ManyToOne(()=>Faculty, (faculty)=>faculty.courses)
    faculty: Faculty

    @OneToMany(()=>Subjects, (subjects)=>subjects.course, {eager: true})
    subjects: Subjects
}