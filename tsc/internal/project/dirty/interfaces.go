package dirty

type Cloneable[T any] interface {
	Clone() T
}

type Value[T any] interface {
	Value() T
	Original() T
	Dirty() bool
	Change(apply func(T))
	ChangeIf(cond func(T) bool, apply func(T)) bool
	Delete()
	Locked(fn func(Value[T]))
}
