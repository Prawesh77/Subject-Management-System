import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Level } from "./level.entity";
import { Subjects } from "./subjects.entity";

@Entity()
export class ClassNo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    class: string;

    @ManyToOne(() => Level, (level) => level.classes)
    level: Level;

    @OneToMany(() => Subjects, (subjects) => subjects.class, {eager: true})
    subjects: Subjects[];
}
