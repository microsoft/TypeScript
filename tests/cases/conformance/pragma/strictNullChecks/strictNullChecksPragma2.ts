// @strict: true
// @filename: file1.ts
export interface A {
    member: string;
}
export interface B {
    member: string | undefined;
}

let a: A = { member: undefined };
declare var b: B;
a = b;
b = a;

import {A as OtherA, B as OtherB} from "./file2";

let a2: OtherA = { member: undefined };
declare var b2: OtherB;
a2 = b2;
b2 = a2;

a = a2;
a2 = a;

b = b2;
b2 = b;

a = b2;
b2 = a;

b = a2;
a2 = b;

// @filename: file2.ts
// @ts-strictNullChecks false
export interface A {
    member: string;
}
export interface B {
    member: string | undefined;
}

let a: A = { member: undefined };
declare var b: B;
a = b;
b = a;

import {A as OtherA, B as OtherB} from "./file1";

let a2: OtherA = { member: undefined };
declare var b2: OtherB;
a2 = b2;
b2 = a2;

a = a2;
a2 = a;

b = b2;
b2 = b;

a = b2;
b2 = a;

b = a2;
a2 = b;

// @filename: file3.ts
import {A, B} from "./file1";
import {A as A2, B as B2} from "./file2";

let a: A = { member: undefined };
let b: B = { member: undefined };
let a2: A2 = { member: undefined };
let b2: B2 = { member: undefined };

a = b;
b = a;

a2 = b2;
b2 = a2;

a = a2;
a2 = a;

b = b2;
b2 = b;

a = b2;
b2 = a;

b = a2;
a2 = b;

// @filename: file4.ts
// @ts-strictNullChecks false
import {A, B} from "./file1";
import {A as A2, B as B2} from "./file2";

let a: A = { member: undefined };
let b: B = { member: undefined };
let a2: A2 = { member: undefined };
let b2: B2 = { member: undefined };

a = b;
b = a;

a2 = b2;
b2 = a2;

a = a2;
a2 = a;

b = b2;
b2 = b;

a = b2;
b2 = a;

b = a2;
a2 = b;