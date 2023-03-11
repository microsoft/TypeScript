// @strict: true
// @noEmit: true

declare function f1(a: number, b: number, c: number, d: number, e: number, f: number): void;
f1(1, 2, 3, 4, ...[5, 6]);
f1(...[1], 2, 3, 4, 5, 6);
f1(1, 2, ...[3, 4], 5, 6);
f1(1, 2, ...[3], 4, ...[5, 6]);
f1(...[1, 2], ...[3, 4], ...[5, 6]);

declare function f2<T extends unknown[]>(...args: T): T;
const x21 = f2(...[1, 'foo'])
const x22 = f2(true, ...[1, 'foo'])

declare function f3<T extends readonly unknown[]>(...args: T): T;
const x31 = f3(...[1, 'foo'])
const x32 = f3(true, ...[1, 'foo'])

// dicovered in #52845#issuecomment-1459132562
interface IAction {
    run(event?: unknown): unknown;
}
declare const action: IAction
action.run(...[100, 'foo']) // error

