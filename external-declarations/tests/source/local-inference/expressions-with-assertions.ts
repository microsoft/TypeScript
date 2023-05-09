//@fileName: types.ts
export type Type<T = null> = { foo: T };
export type UsedAsTypeParameter = { foo: string };
export type UnUsed = { foo: string };

//@fileName: expressions-with-assertions.ts
import type { Type, Unused, UsedAsTypeParameter } from './types'
export let n = 0 + 1 as number;
export let s = "X" + "Y" as string;
export let b = !true as boolean;
export let bn = 10n + 11n as bigint;
export let o = null! as Type;
export let o2 = null! as Type<number>;
export let o3 = null! as Type<UsedAsTypeParameter>;
