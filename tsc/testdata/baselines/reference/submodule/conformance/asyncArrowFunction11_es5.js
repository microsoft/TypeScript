//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncArrowFunction11_es5.ts] ////

//// [asyncArrowFunction11_es5.ts]
// https://github.com/Microsoft/TypeScript/issues/24722
class A {
    b = async (...args: any[]) => {
        await Promise.resolve();
        const obj = { ["a"]: () => this }; // computed property name after `await` triggers case
    };
}

//// [asyncArrowFunction11_es5.js]
class A {
    b = async (...args) => {
        await Promise.resolve();
        const obj = { ["a"]: () => this };
    };
}
