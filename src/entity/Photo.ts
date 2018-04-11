import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
@Entity()
export class Photo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column('text')
    description: string;
    @Column()
    fileName: string;
    @Column()
    views: number;
    @Column()
    isPublished: boolean;
    @Column('text')
    content: string;
}