//// [tests/cases/conformance/expressions/typeGuards/typeGuardInClass.ts] ////

//// [typeGuardInClass.ts]
let x: string | number;

if (typeof x === "string") {
    let n = class {
        constructor() {
            let y: string = x;
        }
    }
}
else {
    let m = class {
        constructor() {
            let y: number = x;
        }
    }
}


//// [typeGuardInClass.js]
let x;
if (typeof x === "string") {
    let n = class {
        constructor() {
            let y = x;
        }
    };
}
else {
    let m = class {
        constructor() {
            let y = x;
        }
    };
}
