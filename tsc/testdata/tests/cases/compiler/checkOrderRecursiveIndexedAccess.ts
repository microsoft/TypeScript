// @noEmit: true
// @strict: true
// @checkOrder: default, reverse, isolated, typesfirst

// @filename: recur.ts
export type Recur<T> =
    (T extends  (unknown[]) ? {} : { [K in keyof T]?: Recur<T[K]>}) |
    [...Recur<T>[number][]];

// @filename: join.ts
import { Recur } from "./recur";
export function join<T>(l: Recur<T>[]): Recur<T> {
    return ['marker', ...l];
}

// @filename: a.ts
import { Recur } from "./recur";
import { join } from "./join";
function a<T>(l: Recur<T>[]): void {
    const x: Recur<T> | undefined = join(l);
}
