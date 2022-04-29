/// <reference path="fourslash.ts" />

//// type Call<AA> = { (): A/*1*/A };
//// type Index<AA> = {[foo: string]: A/*2*/A};
//// type GenericMethod<AA> = { method<BB>(): A/*3*/A & B/*4*/B }
//// type Nesting<TT> = { method<UU>(): new <WW>() => T/*5*/T & U/*6*/U & W/*7*/W };

verify.quickInfos({
    1: "(type parameter) AA in type Call<AA>",
    2: "(type parameter) AA in type Index<AA>",
    3: "(type parameter) AA in type GenericMethod<AA>",
    4: "(type parameter) BB in method<BB>(): AA & BB",
    5: "(type parameter) TT in type Nesting<TT>",
    6: "(type parameter) UU in method<UU>(): new <WW>() => TT & UU & WW",
    7: "(type parameter) WW in <WW>(): TT & UU & WW"
});
