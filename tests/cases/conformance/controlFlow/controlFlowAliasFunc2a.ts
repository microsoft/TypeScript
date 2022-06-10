// @strict: true
// @declaration: true
declare type X1Foo = Readonly<{ kind: "foo", foo: string, bug: () => number[] }> ;
declare type X1Bar = Readonly<{ kind: "bar", bar: number, bug: () => number[] }> ; 
declare type X1Baz = Readonly<{ kind: "baz", baz: boolean, bug: () => number[] }>;

declare type X1 = | X1Foo | X1Bar | X1Baz ; 
declare const obj: undefined | X1;
declare const ubool:()=>boolean;
{
    const isBug = obj?.bug();
    while (ubool()) { 
        if (!obj || obj.kind!=="foo") {
            if (isBug) {
                const t = obj.bug;  // `t` and `obj.bug` are correctly typed, but `obj` is "possibly unedfined"
            }
        }
    }
}
