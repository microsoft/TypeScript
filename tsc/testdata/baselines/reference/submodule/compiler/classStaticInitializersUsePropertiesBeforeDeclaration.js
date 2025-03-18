//// [tests/cases/compiler/classStaticInitializersUsePropertiesBeforeDeclaration.ts] ////

//// [classStaticInitializersUsePropertiesBeforeDeclaration.ts]
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


//// [classStaticInitializersUsePropertiesBeforeDeclaration.js]
class Foo {
    static enumMember = Enum.A;
    static objLiteralMember = ObjLiteral.A;
    static namespaceMember = Namespace.A;
}
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
const ObjLiteral = {
    A: 0
};
var Namespace;
(function (Namespace) {
    Namespace.A = 0;
})(Namespace || (Namespace = {}));
