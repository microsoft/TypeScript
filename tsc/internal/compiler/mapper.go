package compiler

import "github.com/microsoft/typescript-go/internal/core"

// TypeMapper

type TypeMapper struct {
	data TypeMapperData
}

func (m *TypeMapper) Map(t *Type) *Type { return m.data.Map(t) }

// TypeMapperData

type TypeMapperData interface {
	Map(t *Type) *Type
}

// Factory functions

func newTypeMapper(sources []*Type, targets []*Type) *TypeMapper {
	if len(sources) == 1 {
		return newSimpleTypeMapper(sources[0], targets[0])
	}
	return newArrayTypeMapper(sources, targets)
}

func newSingleTypeMapper(sources []*Type, target *Type) *TypeMapper {
	if len(sources) == 1 {
		return newSimpleTypeMapper(sources[0], target)
	}
	return newArrayToSingleTypeMapper(sources, target)
}

func (c *Checker) combineTypeMappers(m1 *TypeMapper, m2 *TypeMapper) *TypeMapper {
	if m1 != nil {
		return newCompositeTypeMapper(c, m1, m2)
	}
	return m2
}

func mergeTypeMappers(m1 *TypeMapper, m2 *TypeMapper) *TypeMapper {
	if m1 != nil {
		return newMergedTypeMapper(m1, m2)
	}
	return m2
}

func appendTypeMapping(mapper *TypeMapper, source *Type, target *Type) *TypeMapper {
	if mapper == nil {
		return newSimpleTypeMapper(source, target)
	}
	return newMergedTypeMapper(mapper, newSimpleTypeMapper(source, target))
}

// Maps forward-references to later types parameters to the empty object type.
// This is used during inference when instantiating type parameter defaults.
func (c *Checker) newBackreferenceMapper(context *InferenceContext, index int) *TypeMapper {
	forwardInferences := context.inferences[index:]
	typeParameters := core.Map(forwardInferences, func(i *InferenceInfo) *Type {
		return i.typeParameter
	})
	return newArrayToSingleTypeMapper(typeParameters, c.unknownType)
}

// SimpleTypeMapper

type SimpleTypeMapper struct {
	TypeMapper
	source *Type
	target *Type
}

func newSimpleTypeMapper(source *Type, target *Type) *TypeMapper {
	m := &SimpleTypeMapper{}
	m.data = m
	m.source = source
	m.target = target
	return &m.TypeMapper
}

func (m *SimpleTypeMapper) Map(t *Type) *Type {
	if t == m.source {
		return m.target
	}
	return t
}

// ArrayTypeMapper

type ArrayTypeMapper struct {
	TypeMapper
	sources []*Type
	targets []*Type
}

func newArrayTypeMapper(sources []*Type, targets []*Type) *TypeMapper {
	m := &ArrayTypeMapper{}
	m.data = m
	m.sources = sources
	m.targets = targets
	return &m.TypeMapper
}

func (m *ArrayTypeMapper) Map(t *Type) *Type {
	for i, s := range m.sources {
		if t == s {
			return m.targets[i]
		}
	}
	return t
}

// ArrayToSingleTypeMapper

type ArrayToSingleTypeMapper struct {
	TypeMapper
	sources []*Type
	target  *Type
}

func newArrayToSingleTypeMapper(sources []*Type, target *Type) *TypeMapper {
	m := &ArrayToSingleTypeMapper{}
	m.data = m
	m.sources = sources
	m.target = target
	return &m.TypeMapper
}

func (m *ArrayToSingleTypeMapper) Map(t *Type) *Type {
	for _, s := range m.sources {
		if t == s {
			return m.target
		}
	}
	return t
}

// DeferredTypeMapper

type DeferredTypeMapper struct {
	TypeMapper
	sources []*Type
	targets []func() *Type
}

func newDeferredTypeMapper(sources []*Type, targets []func() *Type) *TypeMapper {
	m := &DeferredTypeMapper{}
	m.data = m
	m.sources = sources
	m.targets = targets
	return &m.TypeMapper
}

func (m *DeferredTypeMapper) Map(t *Type) *Type {
	for i, s := range m.sources {
		if t == s {
			return m.targets[i]()
		}
	}
	return t
}

// FunctionTypeMapper

type FunctionTypeMapper struct {
	TypeMapper
	fn func(*Type) *Type
}

func newFunctionTypeMapper(fn func(*Type) *Type) *TypeMapper {
	m := &FunctionTypeMapper{}
	m.data = m
	m.fn = fn
	return &m.TypeMapper
}

func (m *FunctionTypeMapper) Map(t *Type) *Type {
	return m.fn(t)
}

// MergedTypeMapper

type MergedTypeMapper struct {
	TypeMapper
	m1 *TypeMapper
	m2 *TypeMapper
}

func newMergedTypeMapper(m1 *TypeMapper, m2 *TypeMapper) *TypeMapper {
	m := &MergedTypeMapper{}
	m.data = m
	m.m1 = m1
	m.m2 = m2
	return &m.TypeMapper
}

func (m *MergedTypeMapper) Map(t *Type) *Type {
	return m.m2.Map(m.m1.Map(t))
}

// CompositeTypeMapper

type CompositeTypeMapper struct {
	TypeMapper
	c  *Checker
	m1 *TypeMapper
	m2 *TypeMapper
}

func newCompositeTypeMapper(c *Checker, m1 *TypeMapper, m2 *TypeMapper) *TypeMapper {
	m := &CompositeTypeMapper{}
	m.data = m
	m.c = c
	m.m1 = m1
	m.m2 = m2
	return &m.TypeMapper
}

func (m *CompositeTypeMapper) Map(t *Type) *Type {
	t1 := m.m1.Map(t)
	if t1 != t {
		return m.c.instantiateType(t1, m.m2)
	}
	return m.m2.Map(t)
}

// InferenceTypeMapper

type InferenceTypeMapper struct {
	TypeMapper
	c      *Checker
	n      *InferenceContext
	fixing bool
}

func (c *Checker) newInferenceTypeMapper(n *InferenceContext, fixing bool) *TypeMapper {
	m := &InferenceTypeMapper{}
	m.data = m
	m.c = c
	m.n = n
	return &m.TypeMapper
}

func (m *InferenceTypeMapper) Map(t *Type) *Type {
	for i, inference := range m.n.inferences {
		if t == inference.typeParameter {
			if m.fixing && !inference.isFixed {
				// Before we commit to a particular inference (and thus lock out any further inferences),
				// we infer from any intra-expression inference sites we have collected.
				m.c.inferFromIntraExpressionSites(m.n)
				clearCachedInferences(m.n.inferences)
				inference.isFixed = true
			}
			return m.c.getInferredType(m.n, i)
		}
	}
	return t
}
