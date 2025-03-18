//// [tests/cases/compiler/declFileForFunctionTypeAsTypeParameter.ts] ////

//// [declFileForFunctionTypeAsTypeParameter.ts]
class X<T> {
}
class C extends X<() => number> {
}
interface I extends X<() => number> {
}



//// [declFileForFunctionTypeAsTypeParameter.js]
class X {
}
class C extends X {
}
