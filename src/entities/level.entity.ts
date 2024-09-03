import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { University } from "./university.entity";
import { ClassNo } from "./class.entity";

@Entity()
export class Level {
    @PrimaryGeneratedColumn()
    level_id: number;

    @Column()
    level: "school" | "university";

    @OneToMany(() => University, (university) => university.level, {eager: true})
    universities: University[];

    @OneToMany(() => ClassNo, (classNo) => classNo.level, {eager: true})
    classes: ClassNo[];
}
