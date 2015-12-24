/// <reference path="fourslash.ts" />

//// type Call<AA> = { (): A/*1*/A };
//// type Index<AA> = {[foo: string]: A/*2*/A};
//// type GenericMethod<AA> = { method<BB>(): A/*3*/A & B/*4*/B }
//// type Nesting<TT> = { method<UU>(): new <WW>() => T/*5*/T & U/*6*/U & W/*7*/W };

goTo.marker('1');
verify.quickInfoIs('(type parameter) AA in type Call<AA>');
goTo.marker('2');
verify.quickInfoIs('(type parameter) AA in type Index<AA>');
goTo.marker('3');
verify.quickInfoIs('(type parameter) AA in type GenericMethod<AA>');
goTo.marker('4');
verify.quickInfoIs('(type parameter) BB in method<BB>(): AA & BB');
goTo.marker('5');
verify.quickInfoIs('(type parameter) TT in type Nesting<TT>');
goTo.marker('6');
verify.quickInfoIs('(type parameter) UU in method<UU>(): new <WW>() => TT & UU & WW');
goTo.marker('7');
verify.quickInfoIs('(type parameter) WW in <WW>(): TT & UU & WW');

