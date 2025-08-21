package dirty

type Box[T Cloneable[T]] struct {
	original T
	value    T
	dirty    bool
	delete   bool
}

func NewBox[T Cloneable[T]](original T) *Box[T] {
	return &Box[T]{original: original, value: original}
}

func (b *Box[T]) Value() T {
	if b.delete {
		var zero T
		return zero
	}
	return b.value
}

func (b *Box[T]) Original() T {
	return b.original
}

func (b *Box[T]) Dirty() bool {
	return b.dirty
}

func (b *Box[T]) Set(value T) {
	b.value = value
	b.delete = false
	b.dirty = true
}

func (b *Box[T]) Change(apply func(T)) {
	if !b.dirty {
		b.value = b.value.Clone()
		b.dirty = true
	}
	apply(b.value)
}

func (b *Box[T]) ChangeIf(cond func(T) bool, apply func(T)) bool {
	if cond(b.value) {
		b.Change(apply)
		return true
	}
	return false
}

func (b *Box[T]) Delete() {
	b.delete = true
}

func (b *Box[T]) Locked(fn func(Value[T])) {
	fn(b)
}

func (b *Box[T]) Finalize() (T, bool) {
	return b.Value(), b.dirty || b.delete
}
