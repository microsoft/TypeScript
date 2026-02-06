import * as ts from "../../../_namespaces/ts.js";
import { testExtractSymbol } from "./helpers.js";

describe("unittests:: services:: extract:: extractFunctions", () => {
    testExtractFunction(
        "extractFunction1",
        `namespace A {
    let x = 1;
    function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        [#|
            let y = 5;
            let z = x;
            a = y;
            foo();|]
        }
    }
}`,
    );
    testExtractFunction(
        "extractFunction2",
        `namespace A {
    let x = 1;
    function foo() {
    }
    namespace B {
        function a() {
        [#|
            let y = 5;
            let z = x;
            return foo();|]
        }
    }
}`,
    );
    testExtractFunction(
        "extractFunction3",
        `namespace A {
    function foo() {
    }
    namespace B {
        function* a(z: number) {
        [#|
            let y = 5;
            yield z;
            return foo();|]
        }
    }
}`,
    );
    testExtractFunction(
        "extractFunction4",
        `namespace A {
    function foo() {
    }
    namespace B {
        async function a(z: number, z1: any) {
        [#|
            let y = 5;
            if (z) {
                await z1;
            }
            return foo();|]
        }
    }
}`,
    );
    testExtractFunction(
        "extractFunction5",
        `namespace A {
    let x = 1;
    export function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        [#|
            let y = 5;
            let z = x;
            a = y;
            foo();|]
        }
    }
}`,
    );
    testExtractFunction(
        "extractFunction6",
        `namespace A {
    let x = 1;
    export function foo() {
    }
    namespace B {
        function a() {
            let a = 1;
        [#|
            let y = 5;
            let z = x;
            a = y;
            return foo();|]
        }
    }
}`,
    );
    testExtractFunction(
        "extractFunction7",
        `namespace A {
    let x = 1;
    export namespace C {
        export function foo() {
        }
    }
    namespace B {
        function a() {
            let a = 1;
        [#|
            let y = 5;
            let z = x;
            a = y;
            return C.foo();|]
        }
    }
}`,
    );
    testExtractFunction(
        "extractFunction9",
        `namespace A {
    export interface I { x: number };
    namespace B {
        function a() {
            [#|let a1: I = { x: 1 };
            return a1.x + 10;|]
        }
    }
}`,
    );
    testExtractFunction(
        "extractFunction10",
        `namespace A {
    export interface I { x: number };
    class C {
        a() {
            let z = 1;
            [#|let a1: I = { x: 1 };
            return a1.x + 10;|]
        }
    }
}`,
    );
    testExtractFunction(
        "extractFunction11",
        `namespace A {
    let y = 1;
    class C {
        a() {
            let z = 1;
            [#|let a1 = { x: 1 };
            y = 10;
            z = 42;
            return a1.x + 10;|]
        }
    }
}`,
    );
    testExtractFunction(
        "extractFunction12",
        `namespace A {
    let y = 1;
    class C {
        b() {}
        a() {
            let z = 1;
            [#|let a1 = { x: 1 };
            y = 10;
            z = 42;
            this.b();
            return a1.x + 10;|]
        }
    }
}`,
    );
    // The "b" type parameters aren't used and shouldn't be passed to the extracted function.
    // Type parameters should be in syntactic order (i.e. in order or character offset from BOF).
    // In all cases, we could use type inference, rather than passing explicit type arguments.
    // Note the inclusion of arrow functions to ensure that some type parameters are not from
    //   targetable scopes.
    testExtractFunction(
        "extractFunction13",
        `<U1a, U1b>(u1a: U1a, u1b: U1b) => {
    function F1<T1a, T1b>(t1a: T1a, t1b: T1b) {
        <U2a, U2b>(u2a: U2a, u2b: U2b) => {
            function F2<T2a, T2b>(t2a: T2a, t2b: T2b) {
                <U3a, U3b>(u3a: U3a, u3b: U3b) => {
                        [#|t1a.toString();
                        t2a.toString();
                        u1a.toString();
                        u2a.toString();
                        u3a.toString();|]
                }
            }
        }
    }
}`,
    );
    // This test is descriptive, rather than normative.  The current implementation
    // doesn't handle type parameter shadowing.
    testExtractFunction(
        "extractFunction14",
        `function F<T>(t1: T) {
    function G<T>(t2: T) {
        [#|t1.toString();
        t2.toString();|]
    }
}`,
    );
    // Confirm that the constraint is preserved.
    testExtractFunction(
        "extractFunction15",
        `function F<T>(t1: T) {
    function G<U extends T[]>(t2: U) {
        [#|t2.toString();|]
    }
}`,
    );
    // Confirm that the contextual type of an extracted expression counts as a use.
    testExtractFunction(
        "extractFunction16",
        `function F<T>() {
    const array: T[] = [#|[]|];
}`,
    );
    // Class type parameter
    testExtractFunction(
        "extractFunction17",
        `class C<T1, T2> {
    M(t1: T1, t2: T2) {
        [#|t1.toString()|];
    }
}`,
    );
    // Function type parameter
    testExtractFunction(
        "extractFunction18",
        `class C {
    M<T1, T2>(t1: T1, t2: T2) {
        [#|t1.toString()|];
    }
}`,
    );
    // Coupled constraints
    testExtractFunction(
        "extractFunction19",
        `function F<T, U extends T[], V extends U[]>(v: V) {
    [#|v.toString()|];
}`,
    );

    testExtractFunction(
        "extractFunction20",
        `const _ = class {
    a() {
        [#|let a1 = { x: 1 };
        return a1.x + 10;|]
    }
}`,
    );
    // Write + void return
    testExtractFunction(
        "extractFunction21",
        `function foo() {
    let x = 10;
    [#|x++;
    return;|]
}`,
    );
    // Return in finally block
    testExtractFunction(
        "extractFunction22",
        `function test() {
    try {
    }
    finally {
        [#|return 1;|]
    }
}`,
    );
    // Extraction position - namespace
    testExtractFunction(
        "extractFunction23",
        `namespace NS {
    function M1() { }
    function M2() {
        [#|return 1;|]
    }
    function M3() { }
}`,
    );
    // Extraction position - function
    testExtractFunction(
        "extractFunction24",
        `function Outer() {
    function M1() { }
    function M2() {
        [#|return 1;|]
    }
    function M3() { }
}`,
    );
    // Extraction position - file
    testExtractFunction(
        "extractFunction25",
        `function M1() { }
function M2() {
    [#|return 1;|]
}
function M3() { }`,
    );
    // Extraction position - class without ctor
    testExtractFunction(
        "extractFunction26",
        `class C {
    M1() { }
    M2() {
        [#|return 1;|]
    }
    M3() { }
}`,
    );
    // Extraction position - class with ctor in middle
    testExtractFunction(
        "extractFunction27",
        `class C {
    M1() { }
    M2() {
        [#|return 1;|]
    }
    constructor() { }
    M3() { }
}`,
    );
    // Extraction position - class with ctor at end
    testExtractFunction(
        "extractFunction28",
        `class C {
    M1() { }
    M2() {
        [#|return 1;|]
    }
    M3() { }
    constructor() { }
}`,
    );
    // Shorthand property names
    testExtractFunction(
        "extractFunction29",
        `interface UnaryExpression {
    kind: "Unary";
    operator: string;
    operand: any;
}

function parseUnaryExpression(operator: string): UnaryExpression {
    [#|return {
        kind: "Unary",
        operator,
        operand: parsePrimaryExpression(),
    };|]
}

function parsePrimaryExpression(): any {
    throw "Not implemented";
}`,
    );
    // Type parameter as declared type
    testExtractFunction(
        "extractFunction30",
        `function F<T>() {
    [#|let t: T;|]
}`,
    );
    // Return in nested function
    testExtractFunction(
        "extractFunction31",
        `namespace N {

    export const value = 1;

    () => {
        var f: () => number;
        [#|f = function (): number {
            return value;
        }|]
    }
}`,
    );
    // Return in nested class
    testExtractFunction(
        "extractFunction32",
        `namespace N {

    export const value = 1;

    () => {
        [#|var c = class {
            M() {
                return value;
            }
        }|]
    }
}`,
    );
    // Selection excludes leading trivia of declaration
    testExtractFunction(
        "extractFunction33",
        `function F() {
    [#|function G() { }|]
}`,
    );
    // Arrow function
    testExtractFunction(
        "extractFunction34",
        `const F = () => {
    [#|function G() { }|]
};`,
    );

    testExtractFunction(
        "extractFunction_RepeatedSubstitution",
        `namespace X {
    export const j = 10;
    export const y = [#|j * j|];
}`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Var",
        `
[#|var x = 1;
"hello"|]
x;
`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Let_Type",
        `
[#|let x: number = 1;
"hello";|]
x;
`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Let_NoType",
        `
[#|let x = 1;
"hello";|]
x;
`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Const_Type",
        `
[#|const x: number = 1;
"hello";|]
x;
`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Const_NoType",
        `
[#|const x = 1;
"hello";|]
x;
`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Multiple1",
        `
[#|const x = 1, y: string = "a";|]
x; y;
`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Multiple2",
        `
[#|const x = 1, y = "a";
const z = 3;|]
x; y; z;
`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Multiple3",
        `
[#|const x = 1, y: string = "a";
let z = 3;|]
x; y; z;
`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_ConsumedTwice",
        `
[#|const x: number = 1;
"hello";|]
x; x;
`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_DeclaredTwice",
        `
[#|var x = 1;
var x = 2;|]
x;
`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Writes_Var",
        `
function f() {
    let a = 1;
    [#|var x = 1;
    a++;|]
    a; x;
}`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Writes_Let_NoType",
        `
function f() {
    let a = 1;
    [#|let x = 1;
    a++;|]
    a; x;
}`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Writes_Let_Type",
        `
function f() {
    let a = 1;
    [#|let x: number = 1;
    a++;|]
    a; x;
}`,
    );

    // We propagate numericLiteralFlags, but it's not consumed by the emitter,
    // so everything comes out decimal.  It would be nice to improve this.
    testExtractFunction(
        "extractFunction_VariableDeclaration_Writes_Let_LiteralType1",
        `
function f() {
    let a = 1;
    [#|let x: 0o10 | 10 | 0b10 = 10;
    a++;|]
    a; x;
}`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Writes_Let_LiteralType2",
        `
function f() {
    let a = 1;
    [#|let x: "a" | 'b' = 'a';
    a++;|]
    a; x;
}`,
    );

    // We propagate numericLiteralFlags, but it's not consumed by the emitter,
    // so everything comes out decimal.  It would be nice to improve this.
    testExtractFunction(
        "extractFunction_VariableDeclaration_Writes_Let_LiteralType1",
        `
function f() {
    let a = 1;
    [#|let x: 0o10 | 10 | 0b10 = 10;
    a++;|]
    a; x;
}`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Writes_Let_TypeWithComments",
        `
function f() {
    let a = 1;
    [#|let x: /*A*/ "a" /*B*/ | /*C*/ 'b' /*D*/ = 'a';
    a++;|]
    a; x;
}`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Writes_Const_NoType",
        `
function f() {
    let a = 1;
    [#|const x = 1;
    a++;|]
    a; x;
}`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Writes_Const_Type",
        `
function f() {
    let a = 1;
    [#|const x: number = 1;
    a++;|]
    a; x;
}`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Writes_Mixed1",
        `
function f() {
    let a = 1;
    [#|const x = 1;
    let y = 2;
    a++;|]
    a; x; y;
}`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Writes_Mixed2",
        `
function f() {
    let a = 1;
    [#|var x = 1;
    let y = 2;
    a++;|]
    a; x; y;
}`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Writes_Mixed3",
        `
function f() {
    let a = 1;
    [#|let x: number = 1;
    let y = 2;
    a++;|]
    a; x; y;
}`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_Writes_UnionUndefined",
        `
function f() {
    let a = 1;
    [#|let x: number | undefined = 1;
    let y: undefined | number = 2;
    let z: (undefined | number) = 3;
    a++;|]
    a; x; y; z;
}`,
    );

    testExtractFunction(
        "extractFunction_VariableDeclaration_ShorthandProperty",
        `
function f() {
    [#|let x;|]
    return { x };
}`,
    );

    testExtractFunction(
        "extractFunction_PreserveTrivia",
        `
// a
var q = /*b*/ //c
    /*d*/ [#|1 /*e*/ //f
    /*g*/ + /*h*/ //i
    /*j*/ 2|] /*k*/ //l
    /*m*/; /*n*/ //o`,
    );

    testExtractFunction(
        "extractFunction_NamelessClass",
        `
export default class {
    M() {
        [#|1 + 1|];
    }
}`,
    );

    testExtractFunction(
        "extractFunction_NoDeclarations",
        `
function F() {
[#|arguments.length|]; // arguments has no declaration
}`,
    );
});

function testExtractFunction(caption: string, text: string) {
    testExtractSymbol(caption, text, "extractFunction", ts.Diagnostics.Extract_function);
}
