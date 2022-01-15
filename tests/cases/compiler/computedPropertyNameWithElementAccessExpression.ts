// https://github.com/microsoft/TypeScript/issues/25083

enum Type {
  Foo = 'foo'
}

type TypeMap = {
  [Type["Foo"]]: any
}
