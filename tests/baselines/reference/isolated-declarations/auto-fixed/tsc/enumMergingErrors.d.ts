//// [tests/cases/conformance/enums/enumMergingErrors.ts] ////

//// [enumMergingErrors.ts]
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




/// [Declarations] ////



//// [enumMergingErrors.d.ts]
declare namespace M {
    enum E1 {
        A = 0
    }
    enum E2 {
        C = 0
    }
    enum E3 {
        A = 0
    }
}
declare namespace M {
    enum E1 {
        B
    }
    enum E2 {
        B
    }
    enum E3 {
        C = 0
    }
}
declare namespace M {
    enum E1 {
        C = 0
    }
    enum E2 {
        A = 0
    }
    enum E3 {
        B
    }
}
declare namespace M1 {
    enum E1 {
        A = 0
    }
}
declare namespace M1 {
    enum E1 {
        B = 0
    }
}
declare namespace M1 {
    enum E1 {
        C = 0
    }
}
declare namespace M2 {
    enum E1 {
        A = 0
    }
}
declare namespace M2 {
    enum E1 {
        B = 0
    }
}
declare namespace M2 {
    enum E1 {
        C = 0
    }
}

/// [Errors] ////

enumMergingErrors.ts(26,22): error TS2432: In an enum with multiple declarations, only one declaration can omit an initializer for its first enum element.
enumMergingErrors.ts(38,22): error TS2432: In an enum with multiple declarations, only one declaration can omit an initializer for its first enum element.


==== enumMergingErrors.ts (2 errors) ====
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
                         ~
!!! error TS2432: In an enum with multiple declarations, only one declaration can omit an initializer for its first enum element.
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
                         ~
!!! error TS2432: In an enum with multiple declarations, only one declaration can omit an initializer for its first enum element.
    }
    
    
    