import type { IBranch } from "./IBranch"

export interface IUserAuth{
    UserName : string
    Password : string
}

export interface IUser{
    UserId      : BigInt
    UserName    : string
    FullName    : string
    BranchFId   : number
    token       : string
    Locked      : string
    branch      : IBranch 
}