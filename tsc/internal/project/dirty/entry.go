package dirty

type mapEntry[K comparable, V any] struct {
	key      K
	original V
	value    V
	dirty    bool
	delete   bool
}

func (e *mapEntry[K, V]) Key() K {
	return e.key
}

func (e *mapEntry[K, V]) Original() V {
	return e.original
}

func (e *mapEntry[K, V]) Value() V {
	if e.delete {
		var zero V
		return zero
	}
	return e.value
}

func (e *mapEntry[K, V]) Dirty() bool {
	return e.dirty
}
