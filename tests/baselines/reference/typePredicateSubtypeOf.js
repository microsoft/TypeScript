//// [typePredicateSubtypeOf.ts]
declare function isInteger(arg: any): arg is subtypeof number;
declare const a: string | number;
if (isInteger(a)) {
    a;
} else {
    a;
}
a;

const array = ["foo", 42, true];
const b = array.filter(isInteger);
const c = array.filter((v): v is subtypeof string => v === v.toString().toLowerCase());

interface A { a: string; isCatOrDog(): this is subtypeof C }
interface B extends A { b: string }
interface C extends A { c: string }
interface D { d: string; isCatOrDog(): this is subtypeof D }

declare function isCatOrDog(arg: any): arg is subtypeof (C | D);
declare const pet: A | D;
if (isCatOrDog(pet)) {
    pet;
} else {
    pet;
}
pet;

if (pet.isCatOrDog()) {
    pet;
} else {
    pet;
}
pet;

declare function isNumber(arg: any): arg is number;
declare function isSafeInteger(arg: any): arg is subtypeof number;

type t1 = typeof isSafeInteger extends typeof isInteger ? true : false;
type t2 = typeof isInteger extends typeof isNumber ? true : false;
type t3 = typeof isNumber extends typeof isSafeInteger ? true : false;

type IsTypeIdenticalTo<X, Y> =
  (<T>() => T extends X ? 1 : 0) extends
  (<T>() => T extends Y ? 1 : 0) ? true : false;
type t4 = IsTypeIdenticalTo<typeof isSafeInteger, typeof isInteger>;
type t5 = IsTypeIdenticalTo<typeof isInteger, typeof isNumber>;
type t6 = IsTypeIdenticalTo<typeof isNumber, typeof isSafeInteger>;


//// [typePredicateSubtypeOf.js]
if (isInteger(a)) {
    a;
}
else {
    a;
}
a;
var array = ["foo", 42, true];
var b = array.filter(isInteger);
var c = array.filter(function (v) { return v === v.toString().toLowerCase(); });
if (isCatOrDog(pet)) {
    pet;
}
else {
    pet;
}
pet;
if (pet.isCatOrDog()) {
    pet;
}
else {
    pet;
}
pet;
