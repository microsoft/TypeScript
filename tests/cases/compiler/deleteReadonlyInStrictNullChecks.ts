// @strictNullChecks: true

interface Function { readonly name: string; }
class Foo {}
delete Foo.name;
