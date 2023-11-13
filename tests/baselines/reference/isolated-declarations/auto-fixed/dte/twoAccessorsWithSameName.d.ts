//// [tests/cases/conformance/classes/propertyMemberDeclarations/twoAccessorsWithSameName.ts] ////

//// [twoAccessorsWithSameName.ts]
class C {
    get x(): number { return 1; }
    get x(): number { return 1; } // error
}

class D {
    set x(v: any) {  }
    set x(v: any) {  } // error
}

class E {
    get x(): number {
        return 1;
    }
    set x(v) { }
}

var x = {
    get x() {
        return 1;
    },

    // error
    get x(): number {
        return 1;
    }
}

var y: {
    x: number;
} = {
    get x(): number {
        return 1;
    },
    set x(v) { }
}

/// [Declarations] ////



//// [twoAccessorsWithSameName.d.ts]
declare class C {
    get x(): number;
    get x(): number;
}
declare class D {
    set x(v: any);
    set x(v: any);
}
declare class E {
    get x(): number;
    set x(v: number);
}
declare var x: invalid;
declare var y: {
    x: number;
};
/// [Errors] ////

twoAccessorsWithSameName.ts(2,9): error TS2300: Duplicate identifier 'x'.
twoAccessorsWithSameName.ts(3,9): error TS2300: Duplicate identifier 'x'.
twoAccessorsWithSameName.ts(7,9): error TS2300: Duplicate identifier 'x'.
twoAccessorsWithSameName.ts(8,9): error TS2300: Duplicate identifier 'x'.
twoAccessorsWithSameName.ts(19,9): error TS2300: Duplicate identifier 'x'.
twoAccessorsWithSameName.ts(24,9): error TS1118: An object literal cannot have multiple get/set accessors with the same name.
twoAccessorsWithSameName.ts(24,9): error TS2300: Duplicate identifier 'x'.
twoAccessorsWithSameName.ts(24,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== twoAccessorsWithSameName.ts (8 errors) ====
    class C {
        get x(): number { return 1; }
            ~
!!! error TS2300: Duplicate identifier 'x'.
        get x(): number { return 1; } // error
            ~
!!! error TS2300: Duplicate identifier 'x'.
    }
    
    class D {
        set x(v: any) {  }
            ~
!!! error TS2300: Duplicate identifier 'x'.
        set x(v: any) {  } // error
            ~
!!! error TS2300: Duplicate identifier 'x'.
    }
    
    class E {
        get x(): number {
            return 1;
        }
        set x(v) { }
    }
    
    var x = {
        get x() {
            ~
!!! error TS2300: Duplicate identifier 'x'.
            return 1;
        },
    
        // error
        get x(): number {
            ~
!!! error TS1118: An object literal cannot have multiple get/set accessors with the same name.
            ~
!!! error TS2300: Duplicate identifier 'x'.
            ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            return 1;
        }
    }
    
    var y: {
        x: number;
    } = {
        get x(): number {
            return 1;
        },
        set x(v) { }
    }