/// <reference path="fourslash.ts"/>

/////** some documentation
//// * @template T some documentation 2
//// * @template W
//// * @template U,V others
//// * @param a ok
//// * @param b not ok
//// */
////function f<T, U, V, W>(a: number, b: string, c: boolean): void { }
////f</*f0*/;
////f<number, /*f1*/;
////f<number, string, /*f2*/;
////f<number, string, boolean, /*f3*/;

function build(marker: string, parameterName: string, parameterDocComment: string) {
    return {
        marker,
        text: "f<T, U, V, W>(a: number, b: string, c: boolean): void",
        parameterName,
        parameterSpan: parameterName,
        docComment: "some documentation",
        parameterDocComment,
        tags: [{ name: "template", text: "T some documentation 2" },
               { name: "template", text: "W" },
               { name: "template", text: "U, V others" },
               { name: "param", text: "a ok" },
               { name: "param", text: "b not ok" }]
    }
}

verify.signatureHelp(
    build("f0", "T", "some documentation 2"),
    build("f1", "U", "others"),
    build("f2", "V", "others"),
    build("f3", "W", ""),
);
