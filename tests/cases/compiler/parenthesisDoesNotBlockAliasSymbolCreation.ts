// @declaration: true

export type InvalidKeys<K extends string|number|symbol> = { [P in K]? : never };
export type InvalidKeys2<K extends string|number|symbol> = (
    { [P in K]? : never }
);

export type A<T> = (
    T & InvalidKeys<"a">
);
export type A2<T> = (
    T & InvalidKeys2<"a">
);

export const a = null as A<{ x : number }>;
export const a2 = null as A2<{ x : number }>;
export const a3 = null as { x : number } & InvalidKeys<"a">;
export const a4 = null as { x : number } & InvalidKeys2<"a">;
