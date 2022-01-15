//// [computedPropertyNameWithElementAccessExpression.ts]
// https://github.com/microsoft/TypeScript/issues/25083

enum Type {
  Foo = 'foo'
}

type TypeMap = {
  [Type["Foo"]]: any
}


//// [computedPropertyNameWithElementAccessExpression.js]
// https://github.com/microsoft/TypeScript/issues/25083
var Type;
(function (Type) {
    Type["Foo"] = "foo";
})(Type || (Type = {}));
