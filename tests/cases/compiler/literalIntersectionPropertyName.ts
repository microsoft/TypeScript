declare const typeKey: unique symbol;

type TypeID<Type = unknown, ID extends string = string> = ID & { [typeKey]?: Type };

function typeID<Type, ID extends string>(id: ID): TypeID<Type, ID> {
  return id;
}

type KeyOf<TID extends TypeID> = TID extends TypeID<any, infer ID> ? ID : never;

type TypeOf<TID extends TypeID> = TID extends TypeID<infer Type> ? Type : never;

type Provides<P extends TypeID> = { readonly [T in KeyOf<P>]: TypeOf<P> };

// ---cut---

interface Foo {
    foo(): void;
}

const Foo = typeID("Foo") satisfies TypeID<Foo>;
//    ^? const Foo: TypeID<Foo, "Foo">

const Bar: Provides<typeof Foo> = {
    [Foo]: {}
};