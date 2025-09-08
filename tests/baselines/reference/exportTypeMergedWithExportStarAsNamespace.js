//// [tests/cases/conformance/externalModules/exportTypeMergedWithExportStarAsNamespace.ts] ////

//// [usage.ts]
import { Something } from "./prelude"
export const myValue: Something<string> = Something.of("abc")
export type MyType = Something.SubType<string>

//// [Something.ts]
export type Something<A> = { value: A }
export type SubType<A> = { value: A }
export declare function of<A>(value: A): Something<A>

//// [prelude.ts]
import * as S from "./Something"
export * as Something from "./Something"
export type Something<A> = S.Something<A>


//// [Something.js]
export {};
//// [prelude.js]
import * as Something_1 from "./Something";
export { Something_1 as Something };
//// [usage.js]
import { Something } from "./prelude";
export const myValue = Something.of("abc");
