//// [tests/cases/conformance/decorators/class/constructableDecoratorOnClass01.ts] ////

//// [constructableDecoratorOnClass01.ts]
class CtorDtor {}

@CtorDtor
class C {

}


//// [constructableDecoratorOnClass01.js]
class CtorDtor {
}
@CtorDtor
class C {
}
