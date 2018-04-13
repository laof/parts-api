import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn } from 'typeorm';
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    mark: string;

    @CreateDateColumn()
    registerTime: any;

    @Column('datetime')
    lastTime: any;

    /**
     * 用户头像
     */
    @Column()
    idphoto: string;
}