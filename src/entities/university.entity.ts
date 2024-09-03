import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Level } from "./level.entity";
import { Faculty } from "./faculty.entity";

@Entity()
export class University {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uni_name: string;

    @Column()
    uni_id: string;

    @ManyToOne(() => Level, (level) => level.universities)
    level: Level;

    @OneToMany(() => Faculty, (faculty) => faculty.university, {eager: true})
    faculties: Faculty[];
}
