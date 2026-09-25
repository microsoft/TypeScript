// @strict: true
// @declaration: true

type Json = string | Json[];
type Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;
declare function direct<T>(value: T): Parsed<T>;
declare function indirect<U>(value: U): { concrete: Parsed<string[]>; recursive: Parsed<Json[]>; generic: Parsed<U[]> };
export const concrete = direct([] as string[]);
export const recursive = direct([] as Json[]);
export const instantiated = indirect(1);
const numeric: number[] = instantiated.generic;
instantiated.generic[0] = "error";

function generic<T>(value: T) {
    return indirect(value);
}
export const twice = generic(true);
const boolean: boolean[] = twice.generic;
twice.generic[0] = "error";
