// @target: es6
// @strict: true
// @declaration: true
declare const a: symbol;
export class A {
    [a]() { return 1 };
}
declare const e1: A[typeof a]; // no error, `A` has `symbol` index

type Constructor = new (...args: any[]) => {};
declare function Mix<T extends Constructor>(classish: T): T & (new (...args: any[]) => {mixed: true});

export const Mixer = Mix(class {
    [a]() { return 1 };
});
