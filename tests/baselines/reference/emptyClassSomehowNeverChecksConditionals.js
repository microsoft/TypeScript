//// [emptyClassSomehowNeverChecksConditionals.ts]
// quick distillation of conditionals which were previously erased by signature relating
type EqualsTest<T> = <A>() => A extends T ? 1 : 0;
type EqualsTest1<T> = <A>() => A extends T ? 1 : 0;

const x: EqualsTest<number> = undefined as any as EqualsTest<string>; // should error, obviously wrong
const y: EqualsTest<number> = undefined as any as EqualsTest1<string>; // same as the above, but seperate type aliases

// Slightly extended example using class inheritance
type ModelId<M extends Model> = M; // just validates the input matches the `Model` type to issue an error
export declare class Model<MClass extends typeof Model = typeof Model> {
    class: MClass;
    readonly ref: ModelId<this>;
    set<K>(value: K extends MClass ? number : string): void;
}

// identical to the above, but with a no-op subclass
type ModelId2<M extends ModelSub> = M;
export declare class Model2<MClass extends typeof ModelSub = typeof ModelSub> {
    class: MClass;
    readonly ref: ModelId2<this>;
    set<K>(value: K extends MClass ? number : string): void;
}
export declare class ModelSub extends Model2 {}

//// [emptyClassSomehowNeverChecksConditionals.js]
"use strict";
exports.__esModule = true;
var x = undefined; // should error, obviously wrong
var y = undefined; // same as the above, but seperate type aliases
