export interface IUser {
    _id        : string;
    id         : number;
    first_name : string;
    last_name  : string;
    username   : string;
    email      : string;
    image      : string;
}

export interface IUserForm {
    first_name : string;
    last_name  : string;
    username   : string;
    email      : string;
    image      : string;
}
