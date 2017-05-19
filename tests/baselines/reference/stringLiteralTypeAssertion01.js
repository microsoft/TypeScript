//// [stringLiteralTypeAssertion01.ts]
type S = "a" | "b";
type T = S[] | S;

var s: S;
var t: T;
var str: string;

////////////////

s = <S>t;
s = t as S;

s = <S>str;
s = str as S;

////////////////

t = <T>s;
t = s as T;

t = <T>str;
t = str as T;

////////////////

str = <string>s;
str = s as string;

str = <string>t;
str = t as string;


//// [stringLiteralTypeAssertion01.js]
var s;
var t;
var str;
////////////////
s = t;
s = t;
s = str;
s = str;
////////////////
t = s;
t = s;
t = str;
t = str;
////////////////
str = s;
str = s;
str = t;
str = t;
