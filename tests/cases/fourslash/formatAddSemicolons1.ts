/// <reference path="fourslash.ts" />

////console.log(1)
////console.log(2)
////const x = function() { }
////for (let i = 0; i < 1; i++) {
////    1
////    2
////}
////do { } while (false) console.log(3)
////function f() { }
////class C {
////    ["one"] = {}
////    ["two"]
////    three: string
////    m() { }
////    ;["three"] = {}
////    ;["four"]
////}
////enum E {
////    C
////}
////type M<T> = { [K in keyof T]: any }
////declare module 'foo' { }
////declare module 'bar'
////type T = { x: string, y: number }

format.setFormatOptions({ ...format.copyFormatOptions(), semicolons: ts.SemicolonPreference.Insert });
format.document();
verify.currentFileContentIs(`console.log(1);
console.log(2);
const x = function() { };
for (let i = 0; i < 1; i++) {
    1;
    2;
}
do { } while (false); console.log(3);
function f() { }
class C {
    ["one"] = {}
    ["two"];
    three: string;
    m() { }
    ;["three"] = {}
        ;["four"];
}
enum E {
    C
}
type M<T> = { [K in keyof T]: any };
declare module 'foo' { }
declare module 'bar';
type T = { x: string, y: number; };`);
