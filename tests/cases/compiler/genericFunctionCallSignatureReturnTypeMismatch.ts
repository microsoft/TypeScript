interface Array<T> {}

declare var f : { <T>(x:T): T; }

declare var g : { <S>() : S[]; };
f = g;

var s = f("str").toUpperCase();

console.log(s);
