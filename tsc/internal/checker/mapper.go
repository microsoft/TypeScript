package checker

import (
	"slices"
	"unsafe"

	"github.com/microsoft/TypeScript/tsc/internal/core"
)

// TypeMapperKind

type TypeMapperKind int32

const (
	TypeMapperKindUnknown TypeMapperKind = iota
	TypeMapperKindSimple
	TypeMapperKindArray
	TypeMapperKindMerged
)

// TypeMapper

type TypeMapper struct {
	kind typeMapperKind
}

type typeMapperKind uint8

const (
	typeMapperSimple typeMapperKind = iota + 1
	typeMapperArray
	typeMapperArrayToSingle
	typeMapperDeferred
	typeMapperFunction
	typeMapperMerged
	typeMapperComposite
	typeMapperInference
)

// Each concrete mapper embeds the immutable kind header at offset zero.
func castTypeMapper[T any](m *TypeMapper, kind typeMapperKind) *T {
	if m.kind != kind {
		panic("Incorrect type mapper kind")
	}
	return (*T)(unsafe.Pointer(m))
}

var (
	_ [0 - unsafe.Offsetof(SimpleTypeMapper{}.TypeMapperBase)]byte
	_ [0 - unsafe.Offsetof(ArrayTypeMapper{}.TypeMapperBase)]byte
	_ [0 - unsafe.Offsetof(ArrayToSingleTypeMapper{}.TypeMapperBase)]byte
	_ [0 - unsafe.Offsetof(DeferredTypeMapper{}.TypeMapperBase)]byte
	_ [0 - unsafe.Offsetof(FunctionTypeMapper{}.TypeMapperBase)]byte
	_ [0 - unsafe.Offsetof(MergedTypeMapper{}.TypeMapperBase)]byte
	_ [0 - unsafe.Offsetof(CompositeTypeMapper{}.TypeMapperBase)]byte
	_ [0 - unsafe.Offsetof(InferenceTypeMapper{}.TypeMapperBase)]byte
	_ [0 - unsafe.Offsetof(TypeMapperBase{}.TypeMapper)]byte
)

func (m *TypeMapper) Map(t *Type) *Type {
	switch m.kind {
	case typeMapperSimple:
		return castTypeMapper[SimpleTypeMapper](m, typeMapperSimple).Map(t)
	case typeMapperArray:
		return castTypeMapper[ArrayTypeMapper](m, typeMapperArray).Map(t)
	case typeMapperArrayToSingle:
		return castTypeMapper[ArrayToSingleTypeMapper](m, typeMapperArrayToSingle).Map(t)
	case typeMapperDeferred:
		return castTypeMapper[DeferredTypeMapper](m, typeMapperDeferred).Map(t)
	case typeMapperFunction:
		return castTypeMapper[FunctionTypeMapper](m, typeMapperFunction).Map(t)
	case typeMapperMerged:
		return castTypeMapper[MergedTypeMapper](m, typeMapperMerged).Map(t)
	case typeMapperComposite:
		return castTypeMapper[CompositeTypeMapper](m, typeMapperComposite).Map(t)
	case typeMapperInference:
		return castTypeMapper[InferenceTypeMapper](m, typeMapperInference).Map(t)
	default:
		panic("Invalid type mapper kind")
	}
}

func (m *TypeMapper) Kind() TypeMapperKind {
	switch m.kind {
	case typeMapperSimple:
		return TypeMapperKindSimple
	case typeMapperArray:
		return TypeMapperKindArray
	case typeMapperMerged:
		return TypeMapperKindMerged
	default:
		return TypeMapperKindUnknown
	}
}

func (m *TypeMapper) MapsThisOnly() bool {
	switch m.kind {
	case typeMapperSimple:
		return castTypeMapper[SimpleTypeMapper](m, typeMapperSimple).MapsThisOnly()
	case typeMapperArray:
		return castTypeMapper[ArrayTypeMapper](m, typeMapperArray).MapsThisOnly()
	case typeMapperArrayToSingle:
		return castTypeMapper[ArrayToSingleTypeMapper](m, typeMapperArrayToSingle).MapsThisOnly()
	case typeMapperDeferred:
		return castTypeMapper[DeferredTypeMapper](m, typeMapperDeferred).MapsThisOnly()
	default:
		return false
	}
}

// Factory functions

func getMappedType(t *Type, mapper *TypeMapper) *Type {
	return mapper.Map(getNonDistributedTypeParameter(t))
}

func newTypeMapper(sources []*Type, targets []*Type) *TypeMapper {
	if len(sources) == 1 {
		return newSimpleTypeMapper(sources[0], targets[0])
	}
	return newArrayTypeMapper(sources, targets)
}

func (c *Checker) combineTypeMappers(m1 *TypeMapper, m2 *TypeMapper) *TypeMapper {
	if m1 != nil {
		return newCompositeTypeMapper(c, m1, m2)
	}
	return m2
}

func (c *Checker) mapTypeWithCompositeMapper(t *Type, m1 *TypeMapper, m2 *TypeMapper) *Type {
	if m1 == nil {
		return getMappedType(t, m2)
	}
	t1 := getMappedType(t, m1)
	if t1 != t {
		return c.instantiateType(t1, m2)
	}
	return getMappedType(t, m2)
}

func mergeTypeMappers(m1 *TypeMapper, m2 *TypeMapper) *TypeMapper {
	if m1 != nil {
		return newMergedTypeMapper(m1, m2)
	}
	return m2
}

func prependTypeMapping(source *Type, target *Type, mapper *TypeMapper) *TypeMapper {
	if mapper == nil {
		return newSimpleTypeMapper(getNonDistributedTypeParameter(source), target)
	}
	return newMergedTypeMapper(newSimpleTypeMapper(getNonDistributedTypeParameter(source), target), mapper)
}

func appendTypeMapping(mapper *TypeMapper, source *Type, target *Type) *TypeMapper {
	if mapper == nil {
		return newSimpleTypeMapper(getNonDistributedTypeParameter(source), target)
	}
	return newMergedTypeMapper(mapper, newSimpleTypeMapper(getNonDistributedTypeParameter(source), target))
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

// TypeMapperBase

type TypeMapperBase struct {
	TypeMapper
}

func (m *TypeMapperBase) Map(t *Type) *Type    { return t }
func (m *TypeMapperBase) Kind() TypeMapperKind { return TypeMapperKindUnknown }
func (m *TypeMapperBase) MapsThisOnly() bool   { return false }

// SimpleTypeMapper

type SimpleTypeMapper struct {
	TypeMapperBase
	source *Type
	target *Type
}

func newSimpleTypeMapper(source *Type, target *Type) *TypeMapper {
	m := &SimpleTypeMapper{}
	m.kind = typeMapperSimple
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

func (m *SimpleTypeMapper) Kind() TypeMapperKind {
	return TypeMapperKindSimple
}

func (m *SimpleTypeMapper) MapsThisOnly() bool {
	return isThisTypeParameter(m.source)
}

// ArrayTypeMapper

type ArrayTypeMapper struct {
	TypeMapperBase
	sources []*Type
	targets []*Type
}

func newArrayTypeMapper(sources []*Type, targets []*Type) *TypeMapper {
	m := &ArrayTypeMapper{}
	m.kind = typeMapperArray
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

func (m *ArrayTypeMapper) Kind() TypeMapperKind {
	return TypeMapperKindArray
}

func (m *ArrayTypeMapper) MapsThisOnly() bool {
	return len(m.sources) == 1 && isThisTypeParameter(m.sources[0])
}

// ArrayToSingleTypeMapper

type ArrayToSingleTypeMapper struct {
	TypeMapperBase
	sources []*Type
	target  *Type
}

func newArrayToSingleTypeMapper(sources []*Type, target *Type) *TypeMapper {
	m := &ArrayToSingleTypeMapper{}
	m.kind = typeMapperArrayToSingle
	m.sources = sources
	m.target = target
	return &m.TypeMapper
}

func (m *ArrayToSingleTypeMapper) Map(t *Type) *Type {
	if slices.Contains(m.sources, t) {
		return m.target
	}
	return t
}

func (m *ArrayToSingleTypeMapper) MapsThisOnly() bool {
	return len(m.sources) == 1 && isThisTypeParameter(m.sources[0])
}

// DeferredTypeMapper

type DeferredTypeMapper struct {
	TypeMapperBase
	sources []*Type
	targets []func() *Type
}

func newDeferredTypeMapper(sources []*Type, targets []func() *Type) *TypeMapper {
	m := &DeferredTypeMapper{}
	m.kind = typeMapperDeferred
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

func (m *DeferredTypeMapper) MapsThisOnly() bool {
	return len(m.sources) == 1 && isThisTypeParameter(m.sources[0])
}

// FunctionTypeMapper

type FunctionTypeMapper struct {
	TypeMapperBase
	fn func(*Type) *Type
}

func newFunctionTypeMapper(fn func(*Type) *Type) *TypeMapper {
	m := &FunctionTypeMapper{}
	m.kind = typeMapperFunction
	m.fn = fn
	return &m.TypeMapper
}

func (m *FunctionTypeMapper) Map(t *Type) *Type {
	return m.fn(t)
}

// MergedTypeMapper

type MergedTypeMapper struct {
	TypeMapperBase
	m1 *TypeMapper
	m2 *TypeMapper
}

func newMergedTypeMapper(m1 *TypeMapper, m2 *TypeMapper) *TypeMapper {
	m := &MergedTypeMapper{}
	m.kind = typeMapperMerged
	m.m1 = m1
	m.m2 = m2
	return &m.TypeMapper
}

func (m *MergedTypeMapper) Map(t *Type) *Type {
	return m.m2.Map(m.m1.Map(t))
}

func (m *MergedTypeMapper) Kind() TypeMapperKind {
	return TypeMapperKindMerged
}

// CompositeTypeMapper

type CompositeTypeMapper struct {
	TypeMapperBase
	c  *Checker
	m1 *TypeMapper
	m2 *TypeMapper
}

func newCompositeTypeMapper(c *Checker, m1 *TypeMapper, m2 *TypeMapper) *TypeMapper {
	m := &CompositeTypeMapper{}
	m.kind = typeMapperComposite
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
	TypeMapperBase
	c      *Checker
	n      *InferenceContext
	fixing bool
}

func (c *Checker) initInferenceTypeMapper(m *InferenceTypeMapper, n *InferenceContext, fixing bool) *TypeMapper {
	m.kind = typeMapperInference
	m.c = c
	m.n = n
	m.fixing = fixing
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
