//// [tests/cases/compiler/duplicateObjectLiteralProperty_computedName2.ts] ////

//// [duplicateObjectLiteralProperty_computedName2.ts]
const n = 1;
const s = "s";
enum E1 { A = "ENUM_KEY" }
enum E2 { B }

const t1 = {
    [n]: 1,
    [n]: 1, // duplicate
}

const t2 = {
    [s]: 1,
    [s]: 1, // duplicate
}

const t3 = {
    [E1.A]: 1,
    [E1.A]: 1, // duplicate
}

const t4 = {
    [E2.B]: 1,
    [E2.B]: 1, // duplicate
}


/// [Declarations] ////



//// [duplicateObjectLiteralProperty_computedName2.d.ts]
declare const n = 1;
declare const s = "s";
declare enum E1 {
    A = "ENUM_KEY"
}
declare enum E2 {
    B = 0
}
declare const t1: {
    1: number;
};
declare const t2: {
    s: number;
};
declare const t3: {
    ENUM_KEY: number;
};
declare const t4: {
    0: number;
};

/// [Errors] ////

duplicateObjectLiteralProperty_computedName2.ts(8,5): error TS1117: An object literal cannot have multiple properties with the same name.
duplicateObjectLiteralProperty_computedName2.ts(13,5): error TS1117: An object literal cannot have multiple properties with the same name.
duplicateObjectLiteralProperty_computedName2.ts(18,5): error TS1117: An object literal cannot have multiple properties with the same name.
duplicateObjectLiteralProperty_computedName2.ts(23,5): error TS1117: An object literal cannot have multiple properties with the same name.


==== duplicateObjectLiteralProperty_computedName2.ts (4 errors) ====
    const n = 1;
    const s = "s";
    enum E1 { A = "ENUM_KEY" }
    enum E2 { B }
    
    const t1 = {
        [n]: 1,
        [n]: 1, // duplicate
        ~~~
!!! error TS1117: An object literal cannot have multiple properties with the same name.
    }
    
    const t2 = {
        [s]: 1,
        [s]: 1, // duplicate
        ~~~
!!! error TS1117: An object literal cannot have multiple properties with the same name.
    }
    
    const t3 = {
        [E1.A]: 1,
        [E1.A]: 1, // duplicate
        ~~~~~~
!!! error TS1117: An object literal cannot have multiple properties with the same name.
    }
    
    const t4 = {
        [E2.B]: 1,
        [E2.B]: 1, // duplicate
        ~~~~~~
!!! error TS1117: An object literal cannot have multiple properties with the same name.
    }
    