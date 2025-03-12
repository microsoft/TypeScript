//// [controlFlowAliasFunc2b.ts]
declare type X2Foo = Readonly<{ kind: "foo", xfoo: string, bug: () => number[] }> ;
declare type X2Bar = Readonly<{ kind: "bar", xbar: number, bug: () => number[] }> ; 
declare type X2Baz = Readonly<{ kind: "baz", xbaz: boolean, bug: () => number[] }>;

declare type X2 = | X2Foo | X2Bar | X2Baz ;
declare const obj2: undefined | X2;
declare const ubool:()=>boolean;
{
    const isFoo = obj2 && obj2.kind === "foo";
    const isBug = obj2?.bug();
    while (ubool()) {
        if (isFoo) {
            const s = obj2.xfoo;
        } else if (isBug) {
            const t = obj2.bug();
        }
    }
}

//// [controlFlowAliasFunc2b.js]
"use strict";
{
    var isFoo = obj2 && obj2.kind === "foo";
    var isBug = obj2 === null || obj2 === void 0 ? void 0 : obj2.bug();
    while (ubool()) {
        if (isFoo) {
            var s = obj2.xfoo;
        }
        else if (isBug) {
            var t = obj2.bug();
        }
    }
}


//// [controlFlowAliasFunc2b.d.ts]
declare type X2Foo = Readonly<{
    kind: "foo";
    xfoo: string;
    bug: () => number[];
}>;
declare type X2Bar = Readonly<{
    kind: "bar";
    xbar: number;
    bug: () => number[];
}>;
declare type X2Baz = Readonly<{
    kind: "baz";
    xbaz: boolean;
    bug: () => number[];
}>;
declare type X2 = X2Foo | X2Bar | X2Baz;
declare const obj2: undefined | X2;
declare const ubool: () => boolean;
