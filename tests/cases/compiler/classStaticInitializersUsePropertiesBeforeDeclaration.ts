
class Foo {
    static enumMember = Enum.A;
    static objLiteralMember = ObjLiteral.A;
    static namespaceMember = Namespace.A;
}

enum Enum {
    A
}

const ObjLiteral = {
    A: 0
};

namespace Namespace {
    export let A = 0
}
