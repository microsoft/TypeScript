// @strict: true
// @target: es2022
// @declaration: true

export class C {}
export function f1() {}
f1.a = C;
f1.b = C;
export namespace f1 { export type a = 0; }

export enum E { A }
export function f2() {}
f2.a = E;
export namespace f2 { export interface a { x: string } }

export function g() {}
export function f3() {}
f3.a = g;
export namespace f3 { export namespace a { export type T = string; } }

export function Target() { return null; }
export namespace Target { export type Props = number; }

export function Popover() { return null; }
Popover.Target = Target;
export namespace Popover {
  export namespace Target {
    export type Extra = string;
  }
}

export function Popover2() { return null; }
Popover2.b = C;
Popover2.Target = Target;
export namespace Popover2 {
  export namespace Target {
    export type Extra = string;
  }
}
