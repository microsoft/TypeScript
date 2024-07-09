
interface Foo { foo: any }
interface Bar { bar: any }
interface Baz { baz: any }
interface Kwah { kwah: any }

////////

interface A<T> {
    aProp: T;
}

interface B<T> {
    bProp: T;
}

interface C<T> {
    cProp: T;
}

declare const a: A<Foo>;
declare const b: B<Foo>;
declare const c: C<Foo>;
declare let thingOfInterfaces: A<Bar> | B<Baz> | C<Kwah>;

thingOfInterfaces = a;
thingOfInterfaces = b;
thingOfInterfaces = c;

////////

type X<T> = {
    xProp: T;
}

type Y<T> = {
    yProp: T;
}

type Z<T> = {
    zProp: T;
}

declare const x: X<Foo>;
declare const y: Y<Foo>;
declare const z: Z<Foo>;
declare let thingOfTypeAliases: X<Bar> | Y<Baz> | Z<Kwah>;

thingOfTypeAliases = x;
thingOfTypeAliases = y;
thingOfTypeAliases = z;