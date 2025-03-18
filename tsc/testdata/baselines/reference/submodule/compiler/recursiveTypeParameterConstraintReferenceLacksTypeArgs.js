//// [tests/cases/compiler/recursiveTypeParameterConstraintReferenceLacksTypeArgs.ts] ////

//// [recursiveTypeParameterConstraintReferenceLacksTypeArgs.ts]
class A<T extends A> { }

//// [recursiveTypeParameterConstraintReferenceLacksTypeArgs.js]
class A {
}
