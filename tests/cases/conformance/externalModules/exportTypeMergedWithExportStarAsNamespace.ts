// @Filename: usage.ts
import { Something } from "./prelude"
export const myValue: Something<string> = Something.of("abc")
export type MyType = Something.SubType<string>

// @Filename: Something.ts
export type Something<A> = { value: A }
export type SubType<A> = { value: A }
export declare function of<A>(value: A): Something<A>

// @Filename: prelude.ts
import * as S from "./Something"
export * as Something from "./Something"
export type Something<A> = S.Something<A>
