/// <reference path="extractTestHelpers.ts" />

namespace ts {
    describe("extractMethods", () => {
        testExtractMethod("extractMethod1",
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
}`);
        testExtractMethod("extractMethod2",
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
}`);
        testExtractMethod("extractMethod3",
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
}`);
        testExtractMethod("extractMethod4",
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
}`);
        testExtractMethod("extractMethod5",
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
}`);
        testExtractMethod("extractMethod6",
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
}`);
        testExtractMethod("extractMethod7",
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
}`);
        testExtractMethod("extractMethod8",
            `namespace A {
    let x = 1;
    namespace B {
        function a() {
            let a1 = 1;
            return 1 + [#|a1 + x|] + 100;
        }
    }
}`);
        testExtractMethod("extractMethod9",
            `namespace A {
    export interface I { x: number };
    namespace B {
        function a() {
            [#|let a1: I = { x: 1 };
            return a1.x + 10;|]
        }
    }
}`);
        testExtractMethod("extractMethod10",
            `namespace A {
    export interface I { x: number };
    class C {
        a() {
            let z = 1;
            [#|let a1: I = { x: 1 };
            return a1.x + 10;|]
        }
    }
}`);
        testExtractMethod("extractMethod11",
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
}`);
        testExtractMethod("extractMethod12",
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
}`);
        // The "b" type parameters aren't used and shouldn't be passed to the extracted function.
        // Type parameters should be in syntactic order (i.e. in order or character offset from BOF).
        // In all cases, we could use type inference, rather than passing explicit type arguments.
        // Note the inclusion of arrow functions to ensure that some type parameters are not from
        //   targetable scopes.
        testExtractMethod("extractMethod13",
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
}`);
        // This test is descriptive, rather than normative.  The current implementation
        // doesn't handle type parameter shadowing.
        testExtractMethod("extractMethod14",
            `function F<T>(t1: T) {
    function G<T>(t2: T) {
        [#|t1.toString();
        t2.toString();|]
    }
}`);
        // Confirm that the constraint is preserved.
        testExtractMethod("extractMethod15",
            `function F<T>(t1: T) {
    function G<U extends T[]>(t2: U) {
        [#|t2.toString();|]
    }
}`);
        // Confirm that the contextual type of an extracted expression counts as a use.
        testExtractMethod("extractMethod16",
            `function F<T>() {
    const array: T[] = [#|[]|];
}`);
        // Class type parameter
        testExtractMethod("extractMethod17",
            `class C<T1, T2> {
    M(t1: T1, t2: T2) {
        [#|t1.toString()|];
    }
}`);
        // Method type parameter
        testExtractMethod("extractMethod18",
            `class C {
    M<T1, T2>(t1: T1, t2: T2) {
        [#|t1.toString()|];
    }
}`);
        // Coupled constraints
        testExtractMethod("extractMethod19",
            `function F<T, U extends T[], V extends U[]>(v: V) {
    [#|v.toString()|];
}`);

        testExtractMethod("extractMethod20",
        `const _ = class {
    a() {
        [#|let a1 = { x: 1 };
        return a1.x + 10;|]
    }
}`);
        // Write + void return
        testExtractMethod("extractMethod21",
            `function foo() {
    let x = 10;
    [#|x++;
    return;|]
}`);
        // Return in finally block
        testExtractMethod("extractMethod22",
            `function test() {
    try {
    }
    finally {
        [#|return 1;|]
    }
}`);
        // Extraction position - namespace
        testExtractMethod("extractMethod23",
            `namespace NS {
    function M1() { }
    function M2() {
        [#|return 1;|]
    }
    function M3() { }
}`);
        // Extraction position - function
        testExtractMethod("extractMethod24",
            `function Outer() {
    function M1() { }
    function M2() {
        [#|return 1;|]
    }
    function M3() { }
}`);
        // Extraction position - file
        testExtractMethod("extractMethod25",
            `function M1() { }
function M2() {
    [#|return 1;|]
}
function M3() { }`);
        // Extraction position - class without ctor
        testExtractMethod("extractMethod26",
            `class C {
    M1() { }
    M2() {
        [#|return 1;|]
    }
    M3() { }
}`);
        // Extraction position - class with ctor in middle
        testExtractMethod("extractMethod27",
            `class C {
    M1() { }
    M2() {
        [#|return 1;|]
    }
    constructor() { }
    M3() { }
}`);
        // Extraction position - class with ctor at end
        testExtractMethod("extractMethod28",
            `class C {
    M1() { }
    M2() {
        [#|return 1;|]
    }
    M3() { }
    constructor() { }
}`);
        // Shorthand property names
        testExtractMethod("extractMethod29",
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
}`);
        // Type parameter as declared type
        testExtractMethod("extractMethod30",
            `function F<T>() {
    [#|let t: T;|]
}`);
        // Return in nested function
        testExtractMethod("extractMethod31",
            `namespace N {

    export const value = 1;

    () => {
        var f: () => number;
        [#|f = function (): number {
            return value;
        }|]
    }
}`);
        // Return in nested class
        testExtractMethod("extractMethod32",
            `namespace N {

    export const value = 1;

    () => {
        [#|var c = class {
            M() {
                return value;
            }
        }|]
    }
}`);
        // Selection excludes leading trivia of declaration
        testExtractMethod("extractMethod33",
            `function F() {
    [#|function G() { }|]
}`);

// TODO (acasey): handle repeated substitution
//         testExtractMethod("extractMethod_RepeatedSubstitution",
//             `namespace X {
//     export const j = 10;
//     export const y = [#|j * j|];
// }`);
    });

    function testExtractMethod(caption: string, text: string) {
        testExtractSymbol(caption, text, "extractMethod", Diagnostics.Extract_function);
    }
}
