//// [tests/cases/compiler/deepObjectInstantiations.ts] ////

//// [deepObjectInstantiations.ts]
// @strict

export type Input = Static<typeof Input, []>
export const Input = MakeObject({
    level1: MakeObject({
        level2: MakeObject({
            foo: MakeString(),
        })
    })
})

export type Output = Static<typeof Output, []>
export const Output = MakeObject({
    level1: MakeObject({
        level2: MakeObject({
            foo: MakeString(),
            bar: MakeString(),
        })
    })
})

function problematicFunction1(ors: Input): Output {
    // Should error
    return ors;
}
function f() {
    problematicFunction1(null as any);
}
f();

export type Evaluate<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
interface HasStatic { static: unknown }
interface HasParams { params: unknown[] }
export type Static<T extends HasStatic, P> = (T & { params: P; })['static']

type RecordOfHasStatics = Record<string, HasStatic>;

export type PropertiesReduce<T extends RecordOfHasStatics, P = []> = Evaluate<{ [K in keyof T]: Static<T[K], P> }>;

declare function MakeObject<T extends RecordOfHasStatics>(object: T): TObject<T>;
export interface TObject<T extends RecordOfHasStatics> extends HasParams {
    static: PropertiesReduce<T, this['params']>;
    properties: T;
}

declare function MakeString(): HasParams & { static: string };


//// [deepObjectInstantiations.js]
"use strict";
// @strict
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = exports.Input = void 0;
exports.Input = MakeObject({
    level1: MakeObject({
        level2: MakeObject({
            foo: MakeString(),
        })
    })
});
exports.Output = MakeObject({
    level1: MakeObject({
        level2: MakeObject({
            foo: MakeString(),
            bar: MakeString(),
        })
    })
});
function problematicFunction1(ors) {
    // Should error
    return ors;
}
function f() {
    problematicFunction1(null);
}
f();
