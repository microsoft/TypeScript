//// [override14.ts]
class Foo {
    property = 1
}

class SubFoo extends Foo {
    declare property: number
}


//// [override14.js]
class Foo {
    property = 1;
}
class SubFoo extends Foo {
}
