// @strict: true
// @declaration: true
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