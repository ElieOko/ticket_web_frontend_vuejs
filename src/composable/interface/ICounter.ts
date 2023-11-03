import type { IBranch } from "./IBranch"

export interface ICounter{
    CounterId?  : number
    Name        : string
    BranchFId   : number
    branch?     : IBranch
}