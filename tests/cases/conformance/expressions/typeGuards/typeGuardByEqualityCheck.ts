interface Discriminator {
	_discriminator: void;
}

interface FooDiscriminator extends Discriminator {
	_foo: void;
}

interface BarDiscriminator extends Discriminator {
	_bar: void;
}

interface BaseNode {
	kind: Discriminator;
}

interface FooNode extends BaseNode {
	kind: FooDiscriminator;
	foo: string;
}

interface BarNode extends BaseNode {
	kind: BarDiscriminator;
	bar: string;
}

let a: FooDiscriminator;
let x: FooNode | BarNode;

if (x.kind === a) {
	x.foo = "yay!";
}
else {
	x; // Not narrowed at present
}

let z: {
	value: string;
	item: FooNode | BarNode;
}
if (z.item.kind === a) {
	z.item.foo = "cool!";
	z.value = "yes";
}

let foo: "foo";
let bar: "bar";
let foobar: "foobar";

interface Thing {
	kind: string;
}
interface FooThing extends Thing {
	kind: "foo";
	foo: string;
}
interface BarThing extends Thing {
	kind: "bar";
	bar: string;
}
interface FooBarThing extends Thing {
	kind: "foobar";
	foo: string;
	bar: string;
}

let gg: FooThing | BarThing | FooBarThing;
if (gg.kind === foobar) {
	gg.bar = "bar";
	gg.foo = "foo";
}
let holder = {
	value: gg
};
if (holder.value.kind === foo) {
	holder.value.foo = "foo";
}