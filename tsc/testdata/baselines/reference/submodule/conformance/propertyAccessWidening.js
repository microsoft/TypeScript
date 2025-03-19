//// [tests/cases/conformance/expressions/propertyAccess/propertyAccessWidening.ts] ////

//// [propertyAccessWidening.ts]
// Repro from #31762

function g1(headerNames: any) {
    let t = [{ hasLineBreak: false, cells: [] }];
    const table = [{cells: headerNames }].concat(t);
}

function g2(headerNames: any) {
    let t = [{ hasLineBreak: false, cells: [] }];
    const table = [{cells: headerNames }]["concat"](t);
}

// Object in property or element access is widened when target of assignment

function foo(options?: { a: string, b: number }) {
    let x1 = (options || {}).a;     // Object type not widened
    let x2 = (options || {})["a"];  // Object type not widened
    (options || {}).a = 1;          // Object type widened, error
    (options || {})["a"] = 1;       // Object type widened, error
}


//// [propertyAccessWidening.js]
// Repro from #31762
function g1(headerNames) {
    let t = [{ hasLineBreak: false, cells: [] }];
    const table = [{ cells: headerNames }].concat(t);
}
function g2(headerNames) {
    let t = [{ hasLineBreak: false, cells: [] }];
    const table = [{ cells: headerNames }]["concat"](t);
}
// Object in property or element access is widened when target of assignment
function foo(options) {
    let x1 = (options || {}).a; // Object type not widened
    let x2 = (options || {})["a"]; // Object type not widened
    (options || {}).a = 1; // Object type widened, error
    (options || {})["a"] = 1; // Object type widened, error
}
