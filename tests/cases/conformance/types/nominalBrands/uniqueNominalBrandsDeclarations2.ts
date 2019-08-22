// @declaration: true
export type Downcased = unique string;

export function downcaseLit<T extends string>(x: T): T & Downcased {
    return x.toLocaleLowerCase() as T & Downcased;
}
const a = "ok";
export const c = downcaseLit(a); // visibility error
