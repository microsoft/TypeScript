package collections

import "maps"

// CopyOnWriteMap is a map that defers cloning of an inherited backing map
// until the first mutation, and supports nested scopes that share the parent's
// map for reads but get their own clone on write.
//
// The zero value is an empty map ready to use.
type CopyOnWriteMap[K comparable, V any] struct {
	m     map[K]V
	owned bool
}

// Get returns the value for k and whether it was present.
func (c *CopyOnWriteMap[K, V]) Get(k K) (V, bool) {
	v, ok := c.m[k]
	return v, ok
}

// Has reports whether k is in the map.
func (c *CopyOnWriteMap[K, V]) Has(k K) bool {
	_, ok := c.m[k]
	return ok
}

// Set assigns v to k, cloning the inherited backing map first if necessary.
func (c *CopyOnWriteMap[K, V]) Set(k K, v V) {
	c.ensureOwned()
	c.m[k] = v
}

func (c *CopyOnWriteMap[K, V]) ensureOwned() {
	if c.owned {
		return
	}
	if c.m == nil {
		c.m = make(map[K]V)
	} else {
		c.m = maps.Clone(c.m)
	}
	c.owned = true
}

// EnterScope returns a function that restores this map to its current state.
// While the scope is active, the map shares its current backing storage with
// the parent scope: reads see the inherited entries, and the first mutation
// transparently clones the storage so the parent's view is not modified.
func (c *CopyOnWriteMap[K, V]) EnterScope() func() {
	saved := *c
	c.owned = false
	return func() { *c = saved }
}

type CopyOnWriteSet[K comparable] struct {
	m CopyOnWriteMap[K, struct{}]
}

// Has reports whether k is in the set.
func (c *CopyOnWriteSet[K]) Has(k K) bool {
	_, ok := c.m.Get(k)
	return ok
}

// Set adds k to the set, cloning the inherited backing map first if necessary.
func (c *CopyOnWriteSet[K]) Add(k K) {
	c.m.Set(k, struct{}{})
}

// EnterScope returns a function that restores this set to its current state.
// While the scope is active, the set shares its current backing storage with
// the parent scope: reads see the inherited entries, and the first mutation
// transparently clones the storage so the parent's view is not modified.
func (c *CopyOnWriteSet[K]) EnterScope() func() {
	return c.m.EnterScope()
}
