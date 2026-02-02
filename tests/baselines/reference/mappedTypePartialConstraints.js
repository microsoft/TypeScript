//// [tests/cases/compiler/mappedTypePartialConstraints.ts] ////

//// [mappedTypePartialConstraints.ts]
// Repro from #16985

interface MyInterface {
  something: number;
}

class MyClass<T extends MyInterface> {
  doIt(data : Partial<T>) {}
}

class MySubClass extends MyClass<MyInterface> {}

function fn(arg: typeof MyClass) {};

fn(MySubClass);


//// [mappedTypePartialConstraints.js]
// Repro from #16985
class MyClass {
    doIt(data) { }
}
class MySubClass extends MyClass {
}
function fn(arg) { }
;
fn(MySubClass);
