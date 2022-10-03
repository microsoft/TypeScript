
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
