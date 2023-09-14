import { Model, Table, Column, DataType, BelongsToMany } from "sequelize-typescript";
import { UserRoles } from "./user-roles.model";
import { User } from "src/users/users.models";

interface RoleCreationAttrs{
    value: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}