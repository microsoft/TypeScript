//// [readonlyTupleAndArrayElaboration.ts]
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

const t1: readonly [1] = [1];
const t2: readonly [] = t1;

const t3: readonly [1] = [1];
const t4: [] = t3;

const t5: [1] = [1];
const t6: readonly [] = t5;

const t7: [1] = [1];
const t8: [] = t7;

const a1: readonly number[] = [1];
const a2: readonly boolean[] = a1;

const a3: readonly number[] = [1];
const a4: boolean[] = a3;

const a5: number[] = [1];
const a6: readonly boolean [] = a5;

const a7: number[] = [1];
const a8: boolean[] = a7;

const ta1: readonly [1] = [1];
const ta2: readonly boolean[] = ta1;

const ta3: readonly [1] = [1];
const ta4: number[] = ta3;

const ta5: [1] = [1];
const ta6: readonly boolean[] = ta5;

const ta7: [1] = [1];
const ta8: boolean[] = ta7;

const at1: readonly number[] = [1];
const at2: readonly [1] = at1;

const at3: readonly number[] = [1];
const at4: [1] = at3;

const at5: number[] = [1];
const at6: readonly [1] = at5;

const at7: number[] = [1];
const at8: [1] = at7;


//// [readonlyTupleAndArrayElaboration.js]
// @strict
// #Repro from #30839
var point = [3, 4];
function distanceFromOrigin(_a) {
    var x = _a[0], y = _a[1];
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}
distanceFromOrigin(point);
arryFn(point);
arryFn2(point);
arryFn2(a);
arryFn2(b);
arryFn2(c);
var t1 = [1];
var t2 = t1;
var t3 = [1];
var t4 = t3;
var t5 = [1];
var t6 = t5;
var t7 = [1];
var t8 = t7;
var a1 = [1];
var a2 = a1;
var a3 = [1];
var a4 = a3;
var a5 = [1];
var a6 = a5;
var a7 = [1];
var a8 = a7;
var ta1 = [1];
var ta2 = ta1;
var ta3 = [1];
var ta4 = ta3;
var ta5 = [1];
var ta6 = ta5;
var ta7 = [1];
var ta8 = ta7;
var at1 = [1];
var at2 = at1;
var at3 = [1];
var at4 = at3;
var at5 = [1];
var at6 = at5;
var at7 = [1];
var at8 = at7;
