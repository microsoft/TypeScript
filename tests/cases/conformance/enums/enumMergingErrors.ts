// Enum with constant, computed, constant members split across 3 declarations with the same root module
module M {
    export enum E1 { A = 0 }
    export enum E2 { C }
    export enum E3 { A = 0 }
}
module M {
    export enum E1 { B = 'foo'.length }
    export enum E2 { B = 'foo'.length }
    export enum E3 { C }
}
module M {
    export enum E1 { C }
    export enum E2 { A = 0 }
    export enum E3 { B = 'foo'.length }
}

// Enum with no initializer in either declaration with constant members with the same root module
module M1 {
    export enum E1 { A = 0 }
}
module M1 {
    export enum E1 { B }
}
module M1 {
    export enum E1 { C }
}


// Enum with initializer in only one of three declarations with constant members with the same root module
module M2 {
    export enum E1 { A }
}
module M2 {
    export enum E1 { B = 0 }
}
module M2 {
    export enum E1 { C }
}


