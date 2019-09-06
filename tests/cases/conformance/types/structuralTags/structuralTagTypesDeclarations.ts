// @declaration: true
export type Downcased = string & tag {downcased: void};

export function downcaseLit<T extends string>(x: T): T & Downcased {
    return x.toLocaleLowerCase() as T & Downcased;
}
const a = "ok";
export const c = downcaseLit(a); // no visibility error, tag reproduced structurally
