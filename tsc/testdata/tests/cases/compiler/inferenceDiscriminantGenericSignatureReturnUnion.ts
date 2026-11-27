// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63019

type ReadA = <R>() => [false, R] | [true, R | undefined];
type ReadB = <R>() => [false, R] | [true, R | undefined];

const test = (_: ReadA): ReadB => _;

type ReadObjA = <R>() => { done: false; value: R } | { done: true; value: R | undefined };
type ReadObjB = <R>() => { done: false; value: R } | { done: true; value: R | undefined };

const testObj = (_: ReadObjA): ReadObjB => _;
