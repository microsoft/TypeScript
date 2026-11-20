//// [tests/cases/compiler/expandoFunctionTypeOnlyNamespaceMember.ts] ////

//// [variants.ts]
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

//// [popover.ts]
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


//// [variants.js]
"use strict";
function f1() { }
f1.a = 0;
const n1 = f1.a;
const s1 = f1.a; // error
const t1 = 0;
function f2() { }
f2.a = 0;
const n2 = f2.a;
const t2 = { x: "" };
function f3() { }
f3.a = 0;
const n3 = f3.a;
function f4() { }
f4.a = 0;
const n4 = f4.a;
const t4 = "";
function f5() { }
f5.a = 0;
const n5 = f5.a;
function f6() { }
f6.a = 0;
(function (f6) {
    let a;
    (function (a) {
        a.kind = 0;
    })(a = f6.a || (f6.a = {}));
})(f6 || (f6 = {}));
const n6 = f6.a; // error
var Values;
(function (Values) {
    Values.v = 1;
})(Values || (Values = {}));
// Aliases might resolve to values, so they take precedence over expandos
function f7() { }
f7.a = 0;
(function (f7) {
})(f7 || (f7 = {}));
const n7 = f7.a;
const t7 = 0;
function f8() { }
f8.a = 0;
(function (f8) {
    f8.a = Values;
})(f8 || (f8 = {})); // error
//// [popover.js]
export function Popover() { return null; }
Popover.Target = (x) => x;
Popover.displayName = "Popover";
Popover.Target(1);
Popover.displayName;
const props = 1;


//// [variants.d.ts]
declare function f1(): void;
declare namespace f1 {
    var a: number;
}
declare namespace f1 {
    type a = 0;
}
declare const n1: number;
declare const s1: string;
declare const t1: f1.a;
declare function f2(): void;
declare namespace f2 {
    var a: number;
}
declare namespace f2 {
    interface a {
        x: string;
    }
}
declare const n2: number;
declare const t2: f2.a;
declare function f3(): void;
declare namespace f3 {
    var a: number;
}
declare namespace f3 {
    namespace a { }
}
declare const n3: number;
declare function f4(): void;
declare namespace f4 {
    var a: number;
}
declare namespace f4 {
    namespace a {
        type T = string;
    }
}
declare const n4: number;
declare const t4: f4.a.T;
declare namespace f5 {
    type a = 0;
}
declare function f5(): void;
declare namespace f5 {
    var a: number;
}
declare const n5: number;
declare function f6(): void;
declare namespace f6 {
    namespace a {
        const kind = 0;
    }
}
declare const n6: number;
declare namespace TypesOnly {
    type T = number;
}
declare namespace Values {
    const v = 1;
}
declare function f7(): void;
declare namespace f7 {
    export import a = TypesOnly;
}
declare const n7: number;
declare const t7: f7.a.T;
declare function f8(): void;
declare namespace f8 {
    export import a = Values;
}
//// [popover.d.ts]
export declare function Popover(): null;
export declare namespace Popover {
    var Target: (x: number) => number;
    var displayName: string;
}
export declare namespace Popover {
    namespace Target {
        type Props = number;
    }
}
