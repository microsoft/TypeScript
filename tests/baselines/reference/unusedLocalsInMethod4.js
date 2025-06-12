//// [tests/cases/compiler/unusedLocalsInMethod4.ts] ////

//// [unusedLocalsInMethod4.ts]
function f<T, NonNull extends {}>() {
    let x1: number[]; // should error
    let x2: number[] | null; // should error
    let x3: number[] | undefined; // should not error
    let x4: number[] | undefined | null; // should not error
    let x5!: number[]; // should not error
    let x6: any; // should not error
    let x7: unknown; // should not error
    let x8: T; // should error
    let x9: NonNull; // should error
    var x10: NonNull; // should not error
    let x11: NonNull; // should not error

    function foo() {
        console.log(x1);
        console.log(x2);
        console.log(x3);
        console.log(x4);
        console.log(x5);
        console.log(x6);
        console.log(x7);
        console.log(x8);
        console.log(x9);
        console.log(x10);
        console.log(x11);
    }
    function bar() {
        x11 = {} as any;
    }
    foo();
}

function f2<T, NonNull extends {}>() {
    let x1: number[]; // should error
    let x2: number[] | null; // should error
    let x3: number[] | undefined; // should not error
    let x4: number[] | undefined | null; // should not error
    let x5!: number[]; // should not error
    let x6: any; // should not error
    let x7: unknown; // should not error
    let x8: T; // should error
    let x9: NonNull; // should error

    console.log(x1);
    console.log(x2);
    console.log(x3);
    console.log(x4);
    console.log(x5);
    console.log(x6);
    console.log(x7);
    console.log(x8);
    console.log(x9);
}

function f3() {
    let x: number[];    // should error
    function foo() {
        x.toString();
    }
    foo();
}

function f4() {
    let x: number;  // should error
    return {
        foo() {
            return x.toString();
        }
    };
}

declare let x: number;  // should not error
function f5() {
    x.toString();
}
export default {};

function f6() {
    let key: string;    // should not error
    for (key in {}) {
        console.log(key);
    }
}

function f7() {
    let key: string;    // should not error
    for (key of []) {
        console.log(key);
    }
}

function f8() {
    function ff() {
        let _;
        let rest: {}; // should not error

        [_, ...rest] = bar();
    }
}
declare function bar(): [number, ...string[]];

function f9() {  
    const x: number; // should have only one error
    function bar() {  
        let y = x;  
    }  
}  


function rw() {
    let i: number;  // should error
    function inside() {
        i++;
        console.log(i); // NaN
    }
    inside();
}
rw();

function createBinder() {
    var file: string;   // should not error

    function bindSourceFile(f: string) {
        file = f;

        file.toString();
    }
}

function transformClassFields() {
    enum ClassPropertySubstitutionFlags {
        ClassAliases = 1 << 0,
        ClassStaticThisOrSuperReference = 1 << 1,
    }

    let enabledSubstitutions: ClassPropertySubstitutionFlags;   // should error

    function enableSubstitutionForClassAliases() {
        enabledSubstitutions |= ClassPropertySubstitutionFlags.ClassAliases;

        enabledSubstitutions.toString();
    }
}

//// [unusedLocalsInMethod4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function f() {
    let x1; // should error
    let x2; // should error
    let x3; // should not error
    let x4; // should not error
    let x5; // should not error
    let x6; // should not error
    let x7; // should not error
    let x8; // should error
    let x9; // should error
    var x10; // should not error
    let x11; // should not error
    function foo() {
        console.log(x1);
        console.log(x2);
        console.log(x3);
        console.log(x4);
        console.log(x5);
        console.log(x6);
        console.log(x7);
        console.log(x8);
        console.log(x9);
        console.log(x10);
        console.log(x11);
    }
    function bar() {
        x11 = {};
    }
    foo();
}
function f2() {
    let x1; // should error
    let x2; // should error
    let x3; // should not error
    let x4; // should not error
    let x5; // should not error
    let x6; // should not error
    let x7; // should not error
    let x8; // should error
    let x9; // should error
    console.log(x1);
    console.log(x2);
    console.log(x3);
    console.log(x4);
    console.log(x5);
    console.log(x6);
    console.log(x7);
    console.log(x8);
    console.log(x9);
}
function f3() {
    let x; // should error
    function foo() {
        x.toString();
    }
    foo();
}
function f4() {
    let x; // should error
    return {
        foo() {
            return x.toString();
        }
    };
}
function f5() {
    x.toString();
}
exports.default = {};
function f6() {
    let key; // should not error
    for (key in {}) {
        console.log(key);
    }
}
function f7() {
    let key; // should not error
    for (key of []) {
        console.log(key);
    }
}
function f8() {
    function ff() {
        let _;
        let rest; // should not error
        [_, ...rest] = bar();
    }
}
function f9() {
    const x; // should have only one error
    function bar() {
        let y = x;
    }
}
function rw() {
    let i; // should error
    function inside() {
        i++;
        console.log(i); // NaN
    }
    inside();
}
rw();
function createBinder() {
    var file; // should not error
    function bindSourceFile(f) {
        file = f;
        file.toString();
    }
}
function transformClassFields() {
    let ClassPropertySubstitutionFlags;
    (function (ClassPropertySubstitutionFlags) {
        ClassPropertySubstitutionFlags[ClassPropertySubstitutionFlags["ClassAliases"] = 1] = "ClassAliases";
        ClassPropertySubstitutionFlags[ClassPropertySubstitutionFlags["ClassStaticThisOrSuperReference"] = 2] = "ClassStaticThisOrSuperReference";
    })(ClassPropertySubstitutionFlags || (ClassPropertySubstitutionFlags = {}));
    let enabledSubstitutions; // should error
    function enableSubstitutionForClassAliases() {
        enabledSubstitutions |= ClassPropertySubstitutionFlags.ClassAliases;
        enabledSubstitutions.toString();
    }
}
