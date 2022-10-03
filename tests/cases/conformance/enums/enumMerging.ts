// Enum with only constant members across 2 declarations with the same root module
// Enum with initializer in all declarations with constant members with the same root module
module M1 {
    enum EImpl1 {
        A, B, C
    }

    enum EImpl1 {
        D = 1, E, F
    }

    export enum EConst1 {
        A = 3, B = 2, C = 1
    }

    export enum EConst1 {
        D = 7, E = 9, F = 8
    }

    var x = [EConst1.A, EConst1.B, EConst1.C, EConst1.D, EConst1.E, EConst1.F];
}

// Enum with only computed members across 2 declarations with the same root module 
module M2 {
    export enum EComp2 {
        A = 'foo'.length, B = 'foo'.length, C = 'foo'.length
    }

    export enum EComp2 {
        D = 'foo'.length, E = 'foo'.length, F = 'foo'.length
    }

    var x = [EComp2.A, EComp2.B, EComp2.C, EComp2.D, EComp2.E, EComp2.F];
}

// Enum with initializer in only one of two declarations with constant members with the same root module
module M3 {
    enum EInit {
        A,
        B
    }

    enum EInit {
        C = 1, D, E
    }
}

// Enums with same name but different root module
module M4 {
    export enum Color { Red, Green, Blue }
}
module M5 {
    export enum Color { Red, Green, Blue }
}

module M6.A {
    export enum Color { Red, Green, Blue }
}
module M6 {
    export module A {
        export enum Color { Yellow = 1 }
    }
    var t = A.Color.Yellow;
    t = A.Color.Red;
}
