//// [tests/cases/compiler/duplicateObjectLiteralProperty_computedName1.ts] ////

//// [duplicateObjectLiteralProperty_computedName1.ts]
const t1 = {
    1: 1,
    [1]: 0 // duplicate
}

const t2 = {
    1: 1,
    [+1]: 0 // duplicate
}

const t3 = {
    "1": 1,
    [+1]: 0 // duplicate
}

const t4 = {
    "+1": 1,
    [+1]: 0 // two different keys, "+1", "1"
}

const t5 = {
    "+1": 1,
    ["+1"]: 0 // duplicate
}

const t6 = {
    "-1": 1,
    [-1]: 0 // duplicate
}

const t7 = {
    "-1": 1,
    ["-1"]: 0 // duplicate
}


/// [Declarations] ////



//// [duplicateObjectLiteralProperty_computedName1.d.ts]
declare const t1: {
    1: number;
};
declare const t2: {
    1: number;
};
declare const t3: {
    1: number;
};
declare const t4: {
    "+1": number;
    1: number;
};
declare const t5: {
    "+1": number;
};
declare const t6: {
    [-1]: number;
};
declare const t7: {
    "-1": number;
};

/// [Errors] ////

duplicateObjectLiteralProperty_computedName1.ts(3,5): error TS1117: An object literal cannot have multiple properties with the same name.
duplicateObjectLiteralProperty_computedName1.ts(8,5): error TS1117: An object literal cannot have multiple properties with the same name.
duplicateObjectLiteralProperty_computedName1.ts(13,5): error TS1117: An object literal cannot have multiple properties with the same name.
duplicateObjectLiteralProperty_computedName1.ts(23,5): error TS1117: An object literal cannot have multiple properties with the same name.
duplicateObjectLiteralProperty_computedName1.ts(28,5): error TS1117: An object literal cannot have multiple properties with the same name.
duplicateObjectLiteralProperty_computedName1.ts(33,5): error TS1117: An object literal cannot have multiple properties with the same name.


==== duplicateObjectLiteralProperty_computedName1.ts (6 errors) ====
    const t1 = {
        1: 1,
        [1]: 0 // duplicate
        ~~~
!!! error TS1117: An object literal cannot have multiple properties with the same name.
    }
    
    const t2 = {
        1: 1,
        [+1]: 0 // duplicate
        ~~~~
!!! error TS1117: An object literal cannot have multiple properties with the same name.
    }
    
    const t3 = {
        "1": 1,
        [+1]: 0 // duplicate
        ~~~~
!!! error TS1117: An object literal cannot have multiple properties with the same name.
    }
    
    const t4 = {
        "+1": 1,
        [+1]: 0 // two different keys, "+1", "1"
    }
    
    const t5 = {
        "+1": 1,
        ["+1"]: 0 // duplicate
        ~~~~~~
!!! error TS1117: An object literal cannot have multiple properties with the same name.
    }
    
    const t6 = {
        "-1": 1,
        [-1]: 0 // duplicate
        ~~~~
!!! error TS1117: An object literal cannot have multiple properties with the same name.
    }
    
    const t7 = {
        "-1": 1,
        ["-1"]: 0 // duplicate
        ~~~~~~
!!! error TS1117: An object literal cannot have multiple properties with the same name.
    }
    