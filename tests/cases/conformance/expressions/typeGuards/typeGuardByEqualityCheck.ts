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