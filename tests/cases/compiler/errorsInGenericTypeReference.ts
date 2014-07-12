
interface IFoo<T> { }

class Foo<T> { }


// in call type arguments
class testClass1 {
    method<T>(): void { }
}
var tc1 = new testClass1();
tc1.method<{ x: V }>(); // error: could not find symbol V


// in constructor type arguments
class testClass2<T> {
}
var tc2 = new testClass2<{ x: V }>(); // error: could not find symbol V


// in method return type annotation
class testClass3 {
    testMethod1(): Foo<{ x: V }> { return null; } // error: could not find symbol V
    static testMethod2(): Foo<{ x: V }> { return null } // error: could not find symbol V
    set a(value: Foo<{ x: V }>) { } // error: could not find symbol V
    property: Foo<{ x: V }>; // error: could not find symbol V
}


// in function return type annotation
function testFunction1(): Foo<{ x: V }> { return null; } // error: could not find symbol V


// in paramter types
function testFunction2(p: Foo<{ x: V }>) { }// error: could not find symbol V


// in var type annotation
var f: Foo<{ x: V }>; // error: could not find symbol V


// in constraints
class testClass4<T extends { x: V }> { } // error: could not find symbol V

interface testClass5<T extends Foo<{ x: V }>> { } // error: could not find symbol V

class testClass6<T> {
    method<M extends { x: V }>(): void { } // error: could not find symbol V
}

interface testInterface1 {
    new <M extends { x: V }>(a: M); // error: could not find symbol V
}


// in extends clause
class testClass7 extends Foo<{ x: V }> { } // error: could not find symbol V


// in implements clause
class testClass8 implements IFoo<{ x: V }> { } // error: could not find symbol V


// in signatures
interface testInterface2 {
    new (a: Foo<{ x: V }>): Foo<{ x: V }>; //2x: error: could not find symbol V
    [x: string]: Foo<{ x: V }>; // error: could not find symbol V
    method(a: Foo<{ x: V }>): Foo<{ x: V }>; //2x: error: could not find symbol V
    property: Foo<{ x: V }>; // error: could not find symbol V
}

