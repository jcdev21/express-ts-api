export interface CreateUserDto {
    id: string;
    email: string;
    password: string;
    firstName?: string;
    lastname?: string;
    permissionLevel?: number;
}

export interface PutUserDto {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastname: string;
    permissionLevel: number;
}

export interface PatchUserDto extends Partial<PutUserDto>{};
