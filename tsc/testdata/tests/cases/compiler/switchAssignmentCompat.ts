// @target: es2015
class Foo { }

switch (0) {
    case Foo: break; // Error expected
}
