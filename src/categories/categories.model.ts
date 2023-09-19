import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { User } from "src/users/users.models";

interface CategoryCreationAttrs{
    name: string;
    dateCreated: Date;
    userId: number;
}

@Table({tableName: 'categories'})
export class Category extends Model<Category, CategoryCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;
    @Column({type: DataType.DATE, allowNull: false, defaultValue: Date.now})
    dateCreated: Date;
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User;
}