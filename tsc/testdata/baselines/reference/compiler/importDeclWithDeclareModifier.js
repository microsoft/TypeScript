//// [tests/cases/compiler/importDeclWithDeclareModifier.ts] ////

//// [importDeclWithDeclareModifier.ts]
namespace x {
    interface c {
    }
}
declare export import a = x.c;
var b: a;


//// [importDeclWithDeclareModifier.js]
var b;
export {};
