// @strict: true
// @target: es2022
// @declaration: true

// @filename: variants.ts
function f1() {}
f1.a = 0;
namespace f1 { export type a = 0; }
const n1: number = f1.a;
const s1: string = f1.a; // error
const t1: f1.a = 0;

function f2() {}
f2.a = 0;
namespace f2 { export interface a { x: string } }
const n2: number = f2.a;
const t2: f2.a = { x: "" };

function f3() {}
f3.a = 0;
namespace f3 { export namespace a {} }
const n3: number = f3.a;

function f4() {}
f4.a = 0;
namespace f4 { export namespace a { export type T = string; } }
const n4: number = f4.a;
const t4: f4.a.T = "";

namespace f5 { export type a = 0; }
function f5() {}
f5.a = 0;
const n5: number = f5.a;

function f6() {}
f6.a = 0;
namespace f6 { export namespace a { export const kind = 0; } }
const n6: number = f6.a; // error

namespace TypesOnly { export type T = number; }
namespace Values { export const v = 1; }

// Aliases might resolve to values, so they take precedence over expandos
function f7() {}
f7.a = 0;
namespace f7 { export import a = TypesOnly; }
const n7: number = f7.a;
const t7: f7.a.T = 0;

function f8() {}
f8.a = 0;
namespace f8 { export import a = Values; } // error

// @filename: popover.ts
export function Popover() { return null; }
Popover.Target = (x: number) => x;
Popover.displayName = "Popover";

export namespace Popover {
  export namespace Target {
    export type Props = number;
  }
}

Popover.Target(1);
Popover.displayName;
const props: Popover.Target.Props = 1;
