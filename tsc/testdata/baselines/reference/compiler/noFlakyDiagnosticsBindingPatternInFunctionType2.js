//// [tests/cases/compiler/noFlakyDiagnosticsBindingPatternInFunctionType2.ts] ////

//// [a.js]
/** @template T */
class Base {}
/** @extends {Base<{ e: function({ a: boolean }): void }>} */
export class C extends Base {}


//// [a.js]
/** @template T */
class Base {
}
/** @extends {Base<{ e: function({ a: boolean }): void }>} */
export class C extends Base {
}


//// [a.d.ts]
/** @template T */
declare class Base<T> {
}
/** @extends {Base<{ e: function({ a: boolean }): void }>} */
export declare class C extends Base<{
    e: Function;
    ({ a: boolean }: {
        a: any;
    }): void;
}> {
}
export {};
