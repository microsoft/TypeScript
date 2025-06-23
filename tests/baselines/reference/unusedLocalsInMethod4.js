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
    var x1; // should error
    var x2; // should error
    var x3; // should not error
    var x4; // should not error
    var x5; // should not error
    var x6; // should not error
    var x7; // should not error
    var x8; // should error
    var x9; // should error
    var x10; // should not error
    var x11; // should not error
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
    var x1; // should error
    var x2; // should error
    var x3; // should not error
    var x4; // should not error
    var x5; // should not error
    var x6; // should not error
    var x7; // should not error
    var x8; // should error
    var x9; // should error
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
    var x; // should error
    function foo() {
        x.toString();
    }
    foo();
}
function f4() {
    var x; // should error
    return {
        foo: function () {
            return x.toString();
        }
    };
}
function f5() {
    x.toString();
}
exports.default = {};
function f6() {
    var key; // should not error
    for (key in {}) {
        console.log(key);
    }
}
function f7() {
    var key; // should not error
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        key = _a[_i];
        console.log(key);
    }
}
function f8() {
    function ff() {
        var _a;
        var _;
        var rest; // should not error
        _a = bar(), _ = _a[0], rest = _a.slice(1);
    }
}
function f9() {
    var x; // should have only one error
    function bar() {
        var y = x;
    }
}
function rw() {
    var i; // should error
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
    var ClassPropertySubstitutionFlags;
    (function (ClassPropertySubstitutionFlags) {
        ClassPropertySubstitutionFlags[ClassPropertySubstitutionFlags["ClassAliases"] = 1] = "ClassAliases";
        ClassPropertySubstitutionFlags[ClassPropertySubstitutionFlags["ClassStaticThisOrSuperReference"] = 2] = "ClassStaticThisOrSuperReference";
    })(ClassPropertySubstitutionFlags || (ClassPropertySubstitutionFlags = {}));
    var enabledSubstitutions; // should error
    function enableSubstitutionForClassAliases() {
        enabledSubstitutions |= ClassPropertySubstitutionFlags.ClassAliases;
        enabledSubstitutions.toString();
    }
}
