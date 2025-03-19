//// [tests/cases/compiler/getterThatThrowsShouldNotNeedReturn.ts] ////

//// [getterThatThrowsShouldNotNeedReturn.ts]
class Greeter {
 public get greet(): string {
  throw ''; // should not raise an error
 }
 public greeting(): string {
  throw ''; // should not raise an error
 }
}


//// [getterThatThrowsShouldNotNeedReturn.js]
class Greeter {
    get greet() {
        throw ''; // should not raise an error
    }
    greeting() {
        throw ''; // should not raise an error
    }
}
