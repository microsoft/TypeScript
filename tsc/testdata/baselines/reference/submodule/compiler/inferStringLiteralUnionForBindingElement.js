//// [tests/cases/compiler/inferStringLiteralUnionForBindingElement.ts] ////

//// [inferStringLiteralUnionForBindingElement.ts]
declare function func<T extends string>(arg: { keys: T[] }): { readonly keys: T[]; readonly firstKey: T; };

function func1() {
    const { firstKey } = func({keys: ["aa", "bb"]})
    const a: "aa" | "bb" = firstKey;

    const { keys } = func({keys: ["aa", "bb"]})
    const b: ("aa" | "bb")[] = keys;
}
  
function func2() {
    const { keys, firstKey } = func({keys: ["aa", "bb"]})
    const a: "aa" | "bb" = firstKey;
    const b: ("aa" | "bb")[] = keys;
}

function func3() {
    const x = func({keys: ["aa", "bb"]})
    const a: "aa" | "bb" = x.firstKey;
    const b: ("aa" | "bb")[] = x.keys;
}


//// [inferStringLiteralUnionForBindingElement.js]
function func1() {
    const { firstKey } = func({ keys: ["aa", "bb"] });
    const a = firstKey;
    const { keys } = func({ keys: ["aa", "bb"] });
    const b = keys;
}
function func2() {
    const { keys, firstKey } = func({ keys: ["aa", "bb"] });
    const a = firstKey;
    const b = keys;
}
function func3() {
    const x = func({ keys: ["aa", "bb"] });
    const a = x.firstKey;
    const b = x.keys;
}
