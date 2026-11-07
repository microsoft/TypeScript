// @target: esnext
// @noImplicitAny: true, false

class Direct extends Direct {
	static value = 1;
	value = 2;
}

const staticValue = Direct.value;
const instanceValue = new Direct().value;

class First extends Second {}
class Second extends First {}

const Expression = class Named extends Named {};

class NestedBase extends (class {
	static value = 1;
	value = 2;
}) {}

const nestedStaticValue: number = NestedBase.value;
const nestedInstanceValue: number = new NestedBase().value;

const SelfReferencingBase = class extends (class {
	static self = SelfReferencingBase;
}) {};

const selfConstructor = SelfReferencingBase.self;

function mixin<Base extends new (...args: any[]) => {}>(base: Base) {
	return class extends base {
		static value = 1;
		value = 2;
	};
}

class Mixed extends mixin(NestedBase) {}

const mixedStaticValue: number = Mixed.value;
const mixedInstanceValue: number = new Mixed().value;

declare function makeBase(value: number): typeof NestedBase;
class InvalidBaseArgument extends makeBase("invalid") {}
const InvalidExpressionArgument = class extends makeBase("invalid") {};

declare function makeInvalidBase(value: number): number;
class InvalidConstructor extends makeInvalidBase("invalid") {}