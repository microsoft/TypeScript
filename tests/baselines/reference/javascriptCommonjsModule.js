//// [tests/cases/compiler/javascriptCommonjsModule.ts] ////

//// [index.js]
class Foo {}

class Bar extends Foo {}

module.exports = Bar;


//// [index.js]
class Foo {
}
class Bar extends Foo {
}
module.exports = Bar;
