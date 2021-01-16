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
	required<T>({ foo }) // no error as { foo: T['foo'] } <: GenericMap<T>
	optional<T>({}) // no error as {} <: OptionalGenericMap<T>
	optional<T>({ foo }) // no error as { foo: T['foo'] } <: OptionalGenericMap<T>
}

const withinExtendedConstraint = <T extends ExtendedConstraint>(foo: T['foo'], bar: T['bar']) => {
	required<T>({ foo }) // error as { foo: T['foo'] } /<: GenericMap<T> because bar is missing
	required<T>({ bar }) // error as { bar: T['bar'] } /<: GenericMap<T> because foo is missing
	required<T>({ foo, bar }) // no error as { foo: T['foo'], bar: T['bar'] } <: GenericMap<T>
	optional<T>({}) // no error as {} <: OptionalGenericMap<T>
	optional<T>({ foo }) // no error as { foo: T['foo'] } <: OptionalGenericMap<T>
	optional<T>({ bar }) // no error as { bar: T['bar'] } <: OptionalGenericMap<T>
	optional<T>({ foo, bar }) // no error as { foo: T['foo'], bar: T['bar'] } <: OptionalGenericMap<T>
}
