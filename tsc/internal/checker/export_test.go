package checker

// RunAtInstantiationLimit runs f as if the current statement had reached the instantiation count limit.
func (c *Checker) RunAtInstantiationLimit(f func()) {
	saved := c.instantiationCount
	c.instantiationCount = 5_000_000
	defer func() { c.instantiationCount = saved }()
	f()
}

func (c *Checker) GetTypeWithThisArgument(t *Type, thisArgument *Type) *Type {
	return c.getTypeWithThisArgument(t, thisArgument, false /*needsApparentType*/)
}
