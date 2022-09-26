// @strictNullChecks: true
// @exactOptionalPropertyTypes: true
// @filename: file1.ts
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

// @filename: file2.ts
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

// @filename: file3.ts
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

// @filename: file4.ts
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

// @filename: file5.ts
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

// @filename: file6.ts
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