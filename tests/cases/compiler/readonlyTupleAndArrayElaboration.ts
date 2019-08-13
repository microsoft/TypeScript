// @strict
// #Repro from #30839

let point = [3, 4] as const;

function distanceFromOrigin([x, y]: [number, number]) {
    return Math.sqrt(x ** 2 + y ** 2);
}

distanceFromOrigin(point);

declare function arryFn(x: number[]): void;
arryFn(point);

declare function arryFn2(x: Array<number>): void;
arryFn2(point);

declare const a: readonly number[];
declare const b: Readonly<number[]>;
declare const c: ReadonlyArray<number>;

arryFn2(a);
arryFn2(b);
arryFn2(c);
