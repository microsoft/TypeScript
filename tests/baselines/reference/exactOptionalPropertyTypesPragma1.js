//// [tests/cases/conformance/pragma/exactOptionalPropertyTypes/exactOptionalPropertyTypesPragma1.ts] ////

//// [file1.ts]
// @ts-exactOptionalPropertyTypes
export interface A {
    member: string | undefined;
}
declare var a: A;
delete a.member;

export interface B {
    member?: string;
}
declare var b: B;
a = b;
b = a;

//// [file2.ts]
// @ts-exactOptionalPropertyTypes true
export interface A {
    member: string | undefined;
}
declare var a: A;
delete a.member;

export interface B {
    member?: string;
}
declare var b: B;
a = b;
b = a;

//// [file3.ts]
// @ts-exactOptionalPropertyTypes false
export interface A {
    member: string | undefined;
}
declare var a: A;
delete a.member;

export interface B {
    member?: string;
}
declare var b: B;
a = b;
b = a;

//// [file4.ts]
export interface A {
    member: string | undefined;
}
declare var a: A;
delete a.member;

export interface B {
    member?: string;
}
declare var b: B;
a = b;
b = a;

//// [file5.ts]
// @ts-exactOptionalPropertyTypes true
import {A as A1, B as B1} from "./file2";
import {A as A2, B as B2} from "./file3";

declare var a1: A1, b1: B2, a2: A2, b2: B2;

a1 = b1;
b1 = a1;

a2 = b2;
b2 = a2;

a1 = a2;
a2 = a1;

b1 = b2;
b2 = b1;

a1 = b2;
b2 = a1;

b1 = a2;
a2 = b1;

//// [file6.ts]
// @ts-exactOptionalPropertyTypes false
import {A as A1, B as B1} from "./file2";
import {A as A2, B as B2} from "./file3";

declare var a1: A1, b1: B2, a2: A2, b2: B2;

a1 = b1;
b1 = a1;

a2 = b2;
b2 = a2;

a1 = a2;
a2 = a1;

b1 = b2;
b2 = b1;

a1 = b2;
b2 = a1;

b1 = a2;
a2 = b1;

//// [file1.js]
"use strict";
exports.__esModule = true;
delete a.member;
a = b;
b = a;
//// [file2.js]
"use strict";
exports.__esModule = true;
delete a.member;
a = b;
b = a;
//// [file3.js]
"use strict";
exports.__esModule = true;
delete a.member;
a = b;
b = a;
//// [file4.js]
"use strict";
exports.__esModule = true;
delete a.member;
a = b;
b = a;
//// [file5.js]
"use strict";
exports.__esModule = true;
a1 = b1;
b1 = a1;
a2 = b2;
b2 = a2;
a1 = a2;
a2 = a1;
b1 = b2;
b2 = b1;
a1 = b2;
b2 = a1;
b1 = a2;
a2 = b1;
//// [file6.js]
"use strict";
exports.__esModule = true;
a1 = b1;
b1 = a1;
a2 = b2;
b2 = a2;
a1 = a2;
a2 = a1;
b1 = b2;
b2 = b1;
a1 = b2;
b2 = a1;
b1 = a2;
a2 = b1;
