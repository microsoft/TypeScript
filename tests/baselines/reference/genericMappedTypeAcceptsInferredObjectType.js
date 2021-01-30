//// [genericMappedTypeAcceptsInferredObjectType.ts]
interface Constraint {
	foo: string
}

interface ExtendedConstraint extends Constraint {
	bar: string
}

type GenericMap<T> = {
	[P in keyof T]: T[P]
}

type OptionalGenericMap<T> = {
	[P in keyof T]?: T[P]
}

const required = <T>(x: GenericMap<T>) => x
const optional = <T>(x: OptionalGenericMap<T>) => x

const withinConstraint = <T extends Constraint>(foo: T['foo']) => {
	required<Constraint>({ foo }) // no error as { foo: T['foo'] } <: GenericMap<Constraint>
	required<T>({ foo }) // error as { foo: T['foo'] } /<: GenericMap<T> because other properties may be missing
	optional<T>({}) // no error as {} <: OptionalGenericMap<Constraint>
	optional<T>({ foo }) // no error as { foo: T['foo'] } <: OptionalGenericMap<T>
}

const withinExtendedConstraint = <T extends ExtendedConstraint>(foo: T['foo'], bar: T['bar']) => {
	required<ExtendedConstraint>({ foo }) // error as { foo: T['foo'] } /<: GenericMap<ExtendedConstraint> because bar is missing
	required<ExtendedConstraint>({ bar }) // error as { bar: T['bar'] } /<: GenericMap<ExtendedConstraint> because foo is missing
	required<ExtendedConstraint>({ foo, bar }) // no error as { foo: T['foo'], bar: T['bar'] } <: GenericMap<ExtendedConstraint>
	required<T>({ foo, bar }) // error as { foo: T['foo'], bar: T['bar'] } /<: GenericMap<T> because other properties may be missing
	optional<T>({}) // no error as {} <: OptionalGenericMap<T>
	optional<T>({ foo }) // no error as { foo: T['foo'] } <: OptionalGenericMap<T>
	optional<T>({ bar }) // no error as { bar: T['bar'] } <: OptionalGenericMap<T>
	optional<T>({ foo, bar }) // no error as { foo: T['foo'], bar: T['bar'] } <: OptionalGenericMap<T>
}

function shouldReject<T, K extends keyof T>(key: K, v: T[K]): {[k in keyof T]?: T[k]} {
	return { [key]: v }
    // Type '{ [x: string]: T[K]; }' is not assignable to type '{ [k in keyof T]?: T[k] | undefined; }'.(2322)
}


//// [genericMappedTypeAcceptsInferredObjectType.js]
var required = function (x) { return x; };
var optional = function (x) { return x; };
var withinConstraint = function (foo) {
    required({ foo: foo }); // no error as { foo: T['foo'] } <: GenericMap<Constraint>
    required({ foo: foo }); // error as { foo: T['foo'] } /<: GenericMap<T> because other properties may be missing
    optional({}); // no error as {} <: OptionalGenericMap<Constraint>
    optional({ foo: foo }); // no error as { foo: T['foo'] } <: OptionalGenericMap<T>
};
var withinExtendedConstraint = function (foo, bar) {
    required({ foo: foo }); // error as { foo: T['foo'] } /<: GenericMap<ExtendedConstraint> because bar is missing
    required({ bar: bar }); // error as { bar: T['bar'] } /<: GenericMap<ExtendedConstraint> because foo is missing
    required({ foo: foo, bar: bar }); // no error as { foo: T['foo'], bar: T['bar'] } <: GenericMap<ExtendedConstraint>
    required({ foo: foo, bar: bar }); // error as { foo: T['foo'], bar: T['bar'] } /<: GenericMap<T> because other properties may be missing
    optional({}); // no error as {} <: OptionalGenericMap<T>
    optional({ foo: foo }); // no error as { foo: T['foo'] } <: OptionalGenericMap<T>
    optional({ bar: bar }); // no error as { bar: T['bar'] } <: OptionalGenericMap<T>
    optional({ foo: foo, bar: bar }); // no error as { foo: T['foo'], bar: T['bar'] } <: OptionalGenericMap<T>
};
function shouldReject(key, v) {
    var _a;
    return _a = {}, _a[key] = v, _a;
    // Type '{ [x: string]: T[K]; }' is not assignable to type '{ [k in keyof T]?: T[k] | undefined; }'.(2322)
}
