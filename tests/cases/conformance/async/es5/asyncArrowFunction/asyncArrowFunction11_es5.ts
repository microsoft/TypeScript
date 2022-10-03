// @target: es5
// @lib: esnext, dom
// @downlevelIteration: true
// https://github.com/Microsoft/TypeScript/issues/24722
class A {
    b = async (...args: any[]) => {
        await Promise.resolve();
        const obj = { ["a"]: () => this }; // computed property name after `await` triggers case
    };
}