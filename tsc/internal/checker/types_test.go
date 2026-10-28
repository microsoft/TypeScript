package checker

import (
	"encoding/binary"
	"runtime"
	"slices"
	"strconv"
	"strings"
	"testing"
	"unsafe"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/race"
	"github.com/zeebo/xxh3"
	"gotest.tools/v3/assert"
)

func TestCheckerNodeLinkStores(t *testing.T) {
	t.Parallel()
	f := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	first := &Checker{}
	second := &Checker{}
	nodes := make([]*ast.Node, 4096)
	for i := range nodes {
		node := f.NewIdentifier(strconv.Itoa(i))
		if i%2 == 0 {
			ast.GetNodeId(node)
		}
		nodes[i] = node
		assert.Assert(t, !first.typeNodeLinks.Has(node))
		assert.Assert(t, !first.signatureLinks.Has(node))
		first.typeNodeLinks.Get(node).resolvedType = &Type{id: TypeId(i + 1)}
		first.signatureLinks.Get(node).resolvedSignature = &Signature{id: SignatureId(i + 1)}
		second.typeNodeLinks.Get(node).resolvedType = &Type{id: TypeId(i + 2)}
		second.signatureLinks.Get(node).resolvedSignature = &Signature{id: SignatureId(i + 2)}
	}
	f.ReleaseArenas()
	runtime.GC()
	for i, node := range nodes {
		assert.Equal(t, first.typeNodeLinks.Get(node).resolvedType.id, TypeId(i+1))
		assert.Equal(t, first.signatureLinks.Get(node).resolvedSignature.id, SignatureId(i+1))
		assert.Equal(t, second.typeNodeLinks.Get(node).resolvedType.id, TypeId(i+2))
		assert.Equal(t, second.signatureLinks.Get(node).resolvedSignature.id, SignatureId(i+2))
	}
	clone := nodes[0].Clone(f)
	assert.Assert(t, !first.typeNodeLinks.Has(clone))
	assert.Assert(t, !first.signatureLinks.Has(clone))
}

func TestTypeCasts(t *testing.T) {
	t.Parallel()
	type bases interface {
		AsType() *Type
		AsConstrainedType() *ConstrainedType
		AsStructuredType() *StructuredType
		AsObjectType() *ObjectType
		AsTypeReference() *TypeReference
		AsInterfaceType() *InterfaceType
		AsUnionOrIntersectionType() *UnionOrIntersectionType
	}
	tests := []struct {
		kind typeKind
		data bases
		cast func(*Type) any
	}{
		{typeKindIntrinsic, &IntrinsicType{}, func(t *Type) any { return t.AsIntrinsicType() }},
		{typeKindLiteral, &LiteralType{}, func(t *Type) any { return t.AsLiteralType() }},
		{typeKindUniqueESSymbol, &UniqueESSymbolType{}, func(t *Type) any { return t.AsUniqueESSymbolType() }},
		{typeKindTypeParameter, &TypeParameter{}, func(t *Type) any { return t.AsTypeParameter() }},
		{typeKindIndex, &IndexType{}, func(t *Type) any { return t.AsIndexType() }},
		{typeKindIndexedAccess, &IndexedAccessType{}, func(t *Type) any { return t.AsIndexedAccessType() }},
		{typeKindTemplateLiteral, &TemplateLiteralType{}, func(t *Type) any { return t.AsTemplateLiteralType() }},
		{typeKindStringMapping, &StringMappingType{}, func(t *Type) any { return t.AsStringMappingType() }},
		{typeKindSubstitution, &SubstitutionType{}, func(t *Type) any { return t.AsSubstitutionType() }},
		{typeKindConditional, &ConditionalType{}, func(t *Type) any { return t.AsConditionalType() }},
		{typeKindObject, &ObjectType{}, func(t *Type) any { return t.AsObjectType() }},
		{typeKindTypeReference, &TypeReference{}, func(t *Type) any { return t.AsTypeReference() }},
		{typeKindInterface, &InterfaceType{}, func(t *Type) any { return t.AsInterfaceType() }},
		{typeKindTuple, &TupleType{}, func(t *Type) any { return t.AsTupleType() }},
		{typeKindInstantiationExpression, &InstantiationExpressionType{}, func(t *Type) any { return t.AsInstantiationExpressionType() }},
		{typeKindMapped, &MappedType{}, func(t *Type) any { return t.AsMappedType() }},
		{typeKindReverseMapped, &ReverseMappedType{}, func(t *Type) any { return t.AsReverseMappedType() }},
		{typeKindEvolvingArray, &EvolvingArrayType{}, func(t *Type) any { return t.AsEvolvingArrayType() }},
		{typeKindUnion, &UnionType{}, func(t *Type) any { return t.AsUnionType() }},
		{typeKindIntersection, &IntersectionType{}, func(t *Type) any { return t.AsIntersectionType() }},
	}
	for _, test := range tests {
		c := &Checker{}
		typ := c.newType(TypeFlagsAny, ObjectFlagsNone, test.data.AsType(), test.kind)
		runtime.GC()
		assert.Equal(t, test.cast(typ), any(test.data))
		assert.Equal(t, typ.AsConstrainedType(), test.data.AsConstrainedType())
		assert.Equal(t, typ.AsStructuredType(), test.data.AsStructuredType())
		assert.Equal(t, typ.AsObjectType(), test.data.AsObjectType())
		assert.Equal(t, typ.AsTypeReference(), test.data.AsTypeReference())
		assert.Equal(t, typ.AsInterfaceType(), test.data.AsInterfaceType())
		assert.Equal(t, typ.AsUnionOrIntersectionType(), test.data.AsUnionOrIntersectionType())
		typ.flags = TypeFlagsNever
		typ.objectFlags = ObjectFlagsReference
		assert.Equal(t, test.cast(typ), any(test.data))
		assert.Assert(t, didPanic(func() { typ.AsLiteralType() }) == (test.kind != typeKindLiteral))
	}
}

func didPanic(f func()) (panicked bool) {
	defer func() { panicked = recover() != nil }()
	f()
	return false
}

func TestTypeHeaderSize(t *testing.T) {
	t.Parallel()
	assert.Equal(t, unsafe.Sizeof(Type{}), 16+3*unsafe.Sizeof((*Checker)(nil)))
}

func TestKeyBuilder(t *testing.T) {
	t.Parallel()
	for _, count := range []int{0, 1, 46, 47, 256, 4096} {
		t.Run(strconv.Itoa(count), func(t *testing.T) {
			t.Parallel()
			types := make([]*Type, count)
			var expected []byte
			prefix := strings.Repeat("x", count)
			expected = append(expected, prefix...)
			expected = append(expected, 17)
			expected = binary.LittleEndian.AppendUint32(expected, 123)
			expected = binary.LittleEndian.AppendUint64(expected, uint64(count))
			for i := range types {
				types[i] = &Type{id: TypeId(i + 1)}
				expected = binary.LittleEndian.AppendUint32(expected, uint32(i+1))
			}
			expected = append(expected, "suffix"...)
			var builder keyBuilder
			builder.writeString(prefix)
			builder.writeByte(17)
			builder.writeUint32(123)
			builder.writeTypes(types)
			builder.writeString("suffix")
			assert.Equal(t, builder.hash(), CacheHashKey(xxh3.Hash128(expected)))
			assert.Equal(t, builder.hash(), CacheHashKey(xxh3.Hash128(expected)))
		})
	}
}

func TestTypeListKeyAllocations(t *testing.T) { //nolint:paralleltest
	if race.Enabled {
		t.Skip("race instrumentation changes hashing allocations")
	}
	for _, count := range []int{8, 46, 47, 256, 4096} {
		types := make([]*Type, count)
		for i := range types {
			types[i] = &Type{id: TypeId(i + 1)}
		}
		allocations := testing.AllocsPerRun(10, func() { getTypeListKey(types) })
		expected := float64(0)
		if count > 46 {
			expected = 1
		}
		assert.Equal(t, allocations, expected, "type list length %d", count)
	}
}

func BenchmarkTypeListKey(b *testing.B) {
	for _, count := range []int{8, 46, 47, 256, 4096} {
		b.Run(strconv.Itoa(count), func(b *testing.B) {
			types := make([]*Type, count)
			for i := range types {
				types[i] = &Type{id: TypeId(i + 1)}
			}
			b.ReportAllocs()
			for b.Loop() {
				getTypeListKey(types)
			}
		})
	}
}

func newCompositeTestChecker() (*Checker, []*Type) {
	c := &Checker{
		strictNullChecks:      true,
		unionTypes:            make(map[CacheHashKey]*Type),
		unionOfUnionTypes:     make(map[UnionOfUnionKey]*Type),
		intersectionTypes:     make(map[CacheHashKey]*Type),
		subtypeReductionCache: make(map[CacheHashKey][]*Type),
	}
	c.compareSymbols = c.compareSymbolsWorker
	c.neverType = c.newIntrinsicType(TypeFlagsNever, "never")
	c.unknownType = c.newIntrinsicType(TypeFlagsUnknown, "unknown")
	types := []*Type{
		c.newIntrinsicType(TypeFlagsString, "string"),
		c.newIntrinsicType(TypeFlagsNumber, "number"),
		c.newIntrinsicType(TypeFlagsESSymbol, "symbol"),
	}
	return c, types
}

func TestCompositeTypeOwnsConstituents(t *testing.T) {
	t.Parallel()
	c, types := newCompositeTestChecker()
	borrowed := slices.Clone(types)
	union := c.getUnionTypeFromSortedList(borrowed, ObjectFlagsNone, nil, nil)
	borrowed[0] = c.neverType
	assert.Assert(t, slices.Equal(union.Types(), types))
	objects := []*Type{
		c.newObjectType(ObjectFlagsInterface, nil),
		c.newObjectType(ObjectFlagsInterface, nil),
		c.newObjectType(ObjectFlagsInterface, nil),
	}
	intersection := c.getIntersectionType(objects)
	objects[0] = c.neverType
	assert.Assert(t, intersection.Types()[0] != c.neverType)
	reduced := c.removeSubtypes(borrowed, false)
	expected := slices.Clone(reduced)
	borrowed[0] = types[0]
	assert.Assert(t, slices.Equal(reduced, expected))
}

func TestCompositeTypeCacheHitAllocations(t *testing.T) { //nolint:paralleltest
	if race.Enabled {
		t.Skip("race instrumentation changes hashing allocations")
	}
	c, types := newCompositeTestChecker()
	union := c.getUnionType(types)
	filtered := c.removeType(union, types[1])
	objects := []*Type{
		c.newObjectType(ObjectFlagsInterface, nil),
		c.newObjectType(ObjectFlagsInterface, nil),
		c.newObjectType(ObjectFlagsInterface, nil),
	}
	intersection := c.getIntersectionType(objects)
	assert.Equal(t, testing.AllocsPerRun(10, func() { c.getUnionType(types) }), float64(0))
	assert.Equal(t, testing.AllocsPerRun(10, func() { c.getIntersectionType(objects) }), float64(0))
	assert.Equal(t, testing.AllocsPerRun(10, func() { c.mapType(union, func(t *Type) *Type { return t }) }), float64(0))
	assert.Equal(t, testing.AllocsPerRun(10, func() {
		c.mapType(union, func(t *Type) *Type {
			if t == types[1] {
				return nil
			}
			return t
		})
	}), float64(0))
	assert.Equal(t, testing.AllocsPerRun(10, func() { c.removeType(union, types[1]) }), float64(0))
	assert.Equal(t, c.removeType(union, types[1]), filtered)
	assert.Equal(t, c.getIntersectionType(objects), intersection)
}

func TestTemporaryTypeSetReuse(t *testing.T) {
	t.Parallel()
	c, primitives := newCompositeTestChecker()
	for _, count := range []int{3, 17, 80, 300, 5000, 3} {
		objects := make([]*Type, count)
		for i := range objects {
			objects[i] = c.newObjectType(ObjectFlagsInterface, nil)
		}
		intersection := c.getIntersectionType(objects)
		assert.Assert(t, slices.Equal(intersection.Types(), objects))
		union := c.getUnionType(objects)
		assert.Assert(t, slices.Equal(union.Types(), objects))
		mapped := c.mapType(union, func(typ *Type) *Type {
			c.getIntersectionType(objects[:2])
			if typ == objects[1] {
				return nil
			}
			return typ
		})
		expected := slices.Clone(objects)
		expected = slices.Delete(expected, 1, 2)
		assert.Assert(t, slices.Equal(mapped.Types(), expected))
		assert.Equal(t, c.removeType(union, objects[1]), mapped)
		assert.Assert(t, c.mapType(union, func(*Type) *Type { return nil }) == nil)
		assert.Equal(t, c.getIntersectionType(objects), intersection)
		for set := c.freeTypeSets; set != nil; set = set.next {
			assert.Equal(t, len(set.values), 0)
			assert.Equal(t, len(set.valuesByKey), 0)
			assert.Assert(t, cap(set.values) <= 4096)
			for _, typ := range set.values[:cap(set.values)] {
				assert.Assert(t, typ == nil)
			}
			for _, typ := range set.inline {
				assert.Assert(t, typ == nil)
			}
		}
	}
	left := c.getUnionType(primitives[:2])
	right := c.getUnionType(primitives[1:])
	assert.Equal(t, c.getIntersectionType([]*Type{left, right}), primitives[1])
}

func TestIntersectionReductionAllocations(t *testing.T) { //nolint:paralleltest
	if race.Enabled {
		t.Skip("race instrumentation changes hashing allocations")
	}
	c, _ := newCompositeTestChecker()
	members := ast.NewSymbolTable()
	for i := range 128 {
		name := strconv.Itoa(i)
		members.Set(name, c.newSymbol(ast.SymbolFlagsProperty, name))
	}
	object := c.newAnonymousType(nil, members, nil, nil, nil)
	intersection := c.newIntersectionType(ObjectFlagsNone, []*Type{object, object})
	assert.Assert(t, !c.somePropertyReducesToNever(intersection))
	assert.Equal(t, testing.AllocsPerRun(10, func() {
		assert.Assert(t, !c.somePropertyReducesToNever(intersection))
	}), float64(0))
}

func TestTemporaryPropertyCounts(t *testing.T) {
	t.Parallel()
	c := &Checker{}
	names := func(p *temporaryPropertyCounts) []string {
		var result []string
		for _, e := range p.entries {
			result = append(result, e.name)
		}
		return result
	}
	outer := c.getTemporaryPropertyCounts()
	outer.Add("second")
	outer.Add("first")
	outer.Add("second")
	assert.Assert(t, slices.Equal(names(outer), []string{"second", "first"}))
	inner := c.getTemporaryPropertyCounts()
	assert.Assert(t, inner != outer)
	inner.Add("first")
	assert.Equal(t, outer.Count("first"), 1)
	assert.Equal(t, outer.Count("second"), 2)
	c.releaseTemporaryPropertyCounts(inner)
	assert.Equal(t, inner.Size(), 0)
	assert.Equal(t, inner.Count("first"), 0)
	reused := c.getTemporaryPropertyCounts()
	assert.Equal(t, reused, inner)
	reused.Add("second")
	reused.Add("first")
	assert.Assert(t, slices.Equal(names(reused), []string{"second", "first"}))
	assert.Equal(t, outer.Count("first"), 1)
	c.releaseTemporaryPropertyCounts(reused)
	c.releaseTemporaryPropertyCounts(outer)
	runtime.GC()
	reused = c.getTemporaryPropertyCounts()
	assert.Equal(t, reused.Size(), 0)
	assert.Equal(t, reused.Count("second"), 0)
	for i := range 4097 {
		reused.Add(strconv.Itoa(i))
	}
	c.releaseTemporaryPropertyCounts(reused)
	for counts := c.freePropertyCounts; counts != nil; counts = counts.next {
		assert.Assert(t, counts != reused)
		assert.Equal(t, counts.Size(), 0)
	}
	assert.Assert(t, c.getTemporaryPropertyCounts() != reused)
	other := &Checker{}
	assert.Assert(t, other.getTemporaryPropertyCounts() != outer)
}

func TestIntersectionReductionReentrancy(t *testing.T) {
	t.Parallel()
	c, _ := newCompositeTestChecker()
	property := c.newSymbol(ast.SymbolFlagsProperty, "value")
	object := c.newAnonymousType(nil, ast.SymbolTableOf("value", property), nil, nil, nil)
	inner := c.newIntersectionType(ObjectFlagsNone, []*Type{object, object})
	outer := c.newIntersectionType(ObjectFlagsNone, []*Type{inner, object})
	assert.Equal(t, c.getReducedType(outer), outer)
	assert.Equal(t, c.getReducedType(inner), inner)
	assert.Equal(t, c.getPropertyOfUnionOrIntersectionType(outer, "value", true), property)
	assert.Assert(t, c.freePropertyCounts != nil)
	assert.Assert(t, c.freePropertyCounts.next != nil)
	workspace := c.freePropertyCounts
	conflicting := c.newSymbolEx(ast.SymbolFlagsProperty, "value", ast.CheckFlagsContainsPrivate)
	outer.AsUnionOrIntersectionType().propertyCacheWithoutFunctionPropertyAugment.Set("value", conflicting)
	assert.Assert(t, c.somePropertyReducesToNever(outer))
	assert.Equal(t, c.freePropertyCounts, workspace)
	for counts := c.freePropertyCounts; counts != nil; counts = counts.next {
		assert.Equal(t, counts.Size(), 0)
		assert.Equal(t, counts.Count("value"), 0)
	}
}

func BenchmarkCompositeTypeCacheHit(b *testing.B) {
	c, types := newCompositeTestChecker()
	union := c.getUnionType(types)
	objects := []*Type{
		c.newObjectType(ObjectFlagsInterface, nil),
		c.newObjectType(ObjectFlagsInterface, nil),
		c.newObjectType(ObjectFlagsInterface, nil),
	}

	c.getIntersectionType(objects)
	c.removeType(union, types[1])
	b.ReportAllocs()
	for b.Loop() {
		c.getUnionType(types)
		c.getIntersectionType(objects)
		c.mapType(union, func(t *Type) *Type { return t })
		c.removeType(union, types[1])
	}
}

func TestTypeMapperDispatch(t *testing.T) {
	t.Parallel()
	c, types := newCompositeTestChecker()
	source, target, other := types[0], types[1], types[2]
	simple := newSimpleTypeMapper(source, target)
	array := newArrayTypeMapper([]*Type{source, other}, []*Type{target, source})
	merged := newMergedTypeMapper(simple, array)
	for _, test := range []struct {
		mapper *TypeMapper
		kind   TypeMapperKind
		result *Type
	}{
		{simple, TypeMapperKindSimple, target},
		{array, TypeMapperKindArray, target},
		{merged, TypeMapperKindMerged, target},
		{newArrayToSingleTypeMapper([]*Type{source}, target), TypeMapperKindArrayToSingle, target},
		{newDeferredTypeMapper([]*Type{source}, []func() *Type{func() *Type { return target }}), TypeMapperKindDeferred, target},
		{newFunctionTypeMapper(func(typ *Type) *Type {
			if typ == source {
				return target
			}
			return typ
		}, nil, nil), TypeMapperKindFunction, target},
		{newCompositeTypeMapper(c, newSimpleTypeMapper(other, target), simple), TypeMapperKindComposite, target},
	} {
		assert.Equal(t, test.mapper.Kind(), test.kind)
		assert.Equal(t, test.mapper.Map(source), test.result)
		assert.Assert(t, !test.mapper.MapsThisOnly())
		var state TypeMapperState
		assert.Assert(t, !test.mapper.Store(nil))
		assert.Assert(t, !test.mapper.Store(&state))
		assert.Equal(t, len(state), 0)
		test.mapper.Load(nil, nil)
	}
	assert.Equal(t, compareTypeMappers(simple, newSimpleTypeMapper(source, target)), 0)
	assert.Equal(t, compareTypeMappers(array, newArrayTypeMapper([]*Type{source, other}, []*Type{target, source})), 0)
	assert.Equal(t, compareTypeMappers(merged, newMergedTypeMapper(simple, array)), 0)
	this := c.newTypeParameter(nil)
	this.AsTypeParameter().isThisType = true
	for _, mapper := range []*TypeMapper{
		newSimpleTypeMapper(this, target),
		newArrayTypeMapper([]*Type{this}, []*Type{target}),
		newArrayToSingleTypeMapper([]*Type{this}, target),
		newDeferredTypeMapper([]*Type{this}, []func() *Type{func() *Type { return target }}),
	} {
		assert.Assert(t, mapper.MapsThisOnly())
		assert.Equal(t, mapper.Map(this), target)
		assert.Equal(t, mapper.Map(other), other)
	}
}

func TestCompactTypeMapperLayout(t *testing.T) {
	t.Parallel()
	assert.Assert(t, unsafe.Sizeof(SimpleTypeMapper{}) <= 3*unsafe.Sizeof(uintptr(0)))
	assert.Assert(t, unsafe.Sizeof(MergedTypeMapper{}) <= 3*unsafe.Sizeof(uintptr(0)))
	c, types := newCompositeTestChecker()
	mapper := newSimpleTypeMapper(types[0], types[1])
	assert.Assert(t, castTypeMapper[SimpleTypeMapper](mapper, TypeMapperKindSimple).source == types[0])
	func() {
		defer func() { assert.Assert(t, recover() != nil) }()
		castTypeMapper[ArrayTypeMapper](mapper, TypeMapperKindArray)
	}()
	runtime.GC()
	assert.Equal(t, mapper.Map(types[0]), types[1])
	runtime.KeepAlive(c)
}

func TestStrictSubtypeDoesNotProveConditionalInference(t *testing.T) {
	t.Parallel()
	c, primitives := newCompositeTestChecker()
	c.strictFunctionTypes = true
	c.anyType = c.newIntrinsicType(TypeFlagsAny, "any")
	c.assignableRelation = &Relation{}
	c.strictSubtypeRelation = &Relation{}
	c.identityRelation = &Relation{}
	c.emptyObjectType = c.newAnonymousType(nil, nil, nil, nil, nil)
	c.globalStringType = c.emptyObjectType
	c.globalNumberType = c.emptyObjectType
	c.getGlobalNonNullableTypeAliasOrNil = func() *ast.Symbol { return nil }
	functionType := func(parameterType *Type) *Type {
		parameter := c.createSymbolWithType(c.newSymbol(ast.SymbolFlagsFunctionScopedVariable, "value"), parameterType)
		signature := c.newSignature(SignatureFlagsNone, nil, nil, nil, []*ast.Symbol{parameter}, c.unknownType, nil, 1)
		return c.newAnonymousType(nil, nil, []*Signature{signature}, nil, nil)
	}
	constraint := functionType(c.anyType)
	pattern := functionType(primitives[0])
	instantiation := functionType(primitives[1])
	assert.Assert(t, c.isTypeStrictSubtypeOf(constraint, pattern))
	assert.Assert(t, c.isTypeAssignableTo(instantiation, constraint))
	assert.Assert(t, !c.isTypeStrictSubtypeOf(instantiation, constraint))
	assert.Assert(t, !c.isTypeAssignableTo(instantiation, pattern))
}

func newInferenceRelationTestChecker() (*Checker, []*Type) {
	c, primitives := newCompositeTestChecker()
	c.strictFunctionTypes = true
	c.couldContainTypeVariables = c.couldContainTypeVariablesWorker
	c.cachedTypes = make(map[CachedTypeKey]*Type)
	c.anyType = c.newIntrinsicType(TypeFlagsAny, "any")
	c.voidType = c.newIntrinsicType(TypeFlagsVoid, "void")
	c.undefinedType = c.newIntrinsicType(TypeFlagsUndefined, "undefined")
	c.nullType = c.newIntrinsicType(TypeFlagsNull, "null")
	c.noConstraintType = c.newAnonymousType(nil, nil, nil, nil, nil)
	c.circularConstraintType = c.newAnonymousType(nil, nil, nil, nil, nil)
	c.emptyObjectType = c.newAnonymousType(nil, nil, nil, nil, nil)
	c.emptyTypeLiteralType = c.emptyObjectType
	c.globalStringType = c.emptyObjectType
	c.globalNumberType = c.emptyObjectType
	c.getGlobalNonNullableTypeAliasOrNil = func() *ast.Symbol { return nil }
	c.assignableRelation = &Relation{}
	c.subtypeRelation = &Relation{}
	c.strictSubtypeRelation = &Relation{}
	c.identityRelation = &Relation{}
	c.comparableRelation = &Relation{}
	c.inferencePatternRelation = &Relation{}
	c.rigidInferenceMapper = newFunctionTypeMapper(c.rigidInferenceMapperWorker, nil, nil)
	return c, primitives
}

func newInferencePatternTestParameter(c *Checker) *Type {
	parameter := c.cloneTypeParameter(c.newTypeParameter(nil))
	parameter.AsTypeParameter().isInferencePattern = true
	return parameter
}

func TestInferencePatternRelationContext(t *testing.T) {
	t.Parallel()
	c, primitives := newInferenceRelationTestChecker()
	first := newInferencePatternTestParameter(c)
	second := newInferencePatternTestParameter(c)
	relation := c.inferencePatternRelation
	assert.Assert(t, c.isTypeRelatedTo(primitives[0], first, relation))
	assert.Assert(t, !c.isTypeRelatedTo(primitives[0], first.AsTypeParameter().target, relation))
	assert.Assert(t, !c.isTypeRelatedTo(primitives[0], first, c.assignableRelation))
	// Captured binders are rigid, even though all comparisons use the same relation.
	rigidFirst := c.instantiateType(first, c.rigidInferenceMapper)
	assert.Assert(t, !isInferencePatternParameter(rigidFirst))
	assert.Equal(t, c.instantiateType(first, c.rigidInferenceMapper), rigidFirst)
	assert.Assert(t, c.isTypeRelatedTo(first, rigidFirst, relation))
	assert.Assert(t, c.isTypeRelatedTo(c.unknownType, first, relation))
	assert.Assert(t, c.isTypeRelatedTo(first, second, relation))
	assert.Assert(t, !c.isTypeRelatedTo(c.unknownType, c.instantiateType(second, c.rigidInferenceMapper), relation))
}

func TestInferencePatternRelationRigidConstraints(t *testing.T) {
	t.Parallel()
	c, primitives := newInferenceRelationTestChecker()
	outer := newInferencePatternTestParameter(c)
	inner := newInferencePatternTestParameter(c)
	inner.AsTypeParameter().constraint = outer
	rigidInner := c.instantiateType(inner, c.rigidInferenceMapper)
	rigidOuter := c.instantiateType(outer, c.rigidInferenceMapper)
	assert.Equal(t, c.getConstraintOfTypeParameter(rigidInner), rigidOuter)
	assert.Assert(t, !isInferencePatternParameter(rigidOuter))
	assert.Assert(t, c.isTypeRelatedTo(inner, rigidOuter, c.inferencePatternRelation))
	assert.Assert(t, c.isTypeRelatedTo(outer, inner, c.inferencePatternRelation))
	assert.Assert(t, !c.isTypeRelatedTo(primitives[0], inner, c.inferencePatternRelation))
	assert.Assert(t, !c.isTypeRelatedTo(primitives[1], inner, c.inferencePatternRelation))
	assert.Assert(t, c.isTypeRelatedTo(c.neverType, inner, c.inferencePatternRelation))
}

func TestInferencePatternRelationCacheEffects(t *testing.T) {
	t.Parallel()
	c, primitives := newInferenceRelationTestChecker()
	inferred := newInferencePatternTestParameter(c)
	relation := c.inferencePatternRelation
	objectType := func(properties map[string]*Type) *Type {
		members := ast.NewSymbolTable()
		for name, typ := range properties {
			members.Set(name, c.createSymbolWithType(c.newSymbol(ast.SymbolFlagsProperty, name), typ))
		}
		return c.newAnonymousType(nil, members, nil, nil, nil)
	}
	functionType := func(parameterType *Type) *Type {
		parameter := c.createSymbolWithType(c.newSymbol(ast.SymbolFlagsFunctionScopedVariable, "value"), parameterType)
		signature := c.newSignature(SignatureFlagsNone, nil, nil, nil, []*ast.Symbol{parameter}, c.unknownType, nil, 1)
		return c.newAnonymousType(nil, nil, []*Signature{signature}, nil, nil)
	}
	source := objectType(map[string]*Type{"value": primitives[0]})
	target := objectType(map[string]*Type{"value": inferred})
	// Record an effect even when that polarity was already observed by the caller.
	r := c.getRelater()
	r.relation = relation
	r.relationCount = 1_000_000
	r.inferenceUsages = map[*Type]inferenceUsage{inferred: {covariant: 1}}
	assert.Equal(t, r.isRelatedToSimple(source, target), TernaryTrue)
	assert.Equal(t, r.inferenceUsages[inferred].covariant, 2)
	c.putRelater(r)
	assert.Equal(t, len(r.inferenceUsages), 0)
	key, _ := c.getRelationKey(source, target, IntersectionStateNone, relation, false)
	assert.Assert(t, relation.get(key)&RelationComparisonResultSucceeded != 0)
	assert.Equal(t, relation.inferenceUsages[key][inferred], inferenceUsage{covariant: 1})
	instantiationProbes := 0
	couldContainTypeVariables := c.couldContainTypeVariables
	c.couldContainTypeVariables = func(typ *Type) bool {
		instantiationProbes++
		return couldContainTypeVariables(typ)
	}
	relation.set(key, relation.get(key)|RelationComparisonResultReportsUnreliable)
	c.reliabilityFlags = 0
	freeRelater := c.freeRelater
	c.freeRelater = nil
	assert.Assert(t, c.isTypeRelatedTo(source, target, relation))
	assert.Assert(t, c.freeRelater == nil)
	c.freeRelater = freeRelater
	assert.Equal(t, instantiationProbes, 0)
	assert.Assert(t, c.reliabilityFlags&RelationComparisonResultReportsUnreliable != 0)
	mixedSource := objectType(map[string]*Type{"child": source, "input": functionType(c.unknownType)})
	mixedTarget := objectType(map[string]*Type{"child": target, "input": functionType(inferred)})
	assert.Assert(t, !c.isTypeRelatedTo(mixedSource, mixedTarget, relation))
	mixedKey, _ := c.getRelationKey(mixedSource, mixedTarget, IntersectionStateNone, relation, false)
	assert.Assert(t, relation.get(mixedKey)&RelationComparisonResultFailed != 0)
	assert.Equal(t, relation.inferenceUsages[mixedKey][inferred], inferenceUsage{covariant: 1, contravariant: 1})
	probesBeforeCacheHit := instantiationProbes
	freeRelater = c.freeRelater
	c.freeRelater = nil
	assert.Assert(t, !c.isTypeRelatedTo(mixedSource, mixedTarget, relation))
	assert.Assert(t, c.freeRelater == nil)
	c.freeRelater = freeRelater
	assert.Equal(t, instantiationProbes, probesBeforeCacheHit)
	second := newInferencePatternTestParameter(c)
	secondTarget := objectType(map[string]*Type{"value": second})
	assert.Assert(t, c.isTypeRelatedTo(source, secondTarget, relation))
	secondKey, _ := c.getRelationKey(source, secondTarget, IntersectionStateNone, relation, false)
	assert.Equal(t, relation.inferenceUsages[secondKey][second], inferenceUsage{covariant: 1})
	assert.Equal(t, relation.inferenceUsages[secondKey][inferred], inferenceUsage{})
	independentTarget := objectType(map[string]*Type{"child": target, "input": functionType(second)})
	assert.Assert(t, c.isTypeRelatedTo(mixedSource, independentTarget, relation))
	secondMixedTarget := objectType(map[string]*Type{"child": secondTarget, "input": functionType(second)})
	assert.Assert(t, !c.isTypeRelatedTo(mixedSource, secondMixedTarget, relation))

	childSource := objectType(map[string]*Type{"value": primitives[0]})
	childTarget := objectType(map[string]*Type{"value": inferred})
	r = c.getRelater()
	r.relation = relation
	r.relationCount = 1_000_000
	r.inferenceUsages = map[*Type]inferenceUsage{inferred: {contravariant: 1}}
	result := r.isRelatedToSimple(childSource, childTarget)
	assert.Equal(t, result, TernaryTrue)
	assert.Equal(t, checkInferencePatternResult(result, r.inferenceUsages), TernaryFalse)
	c.putRelater(r)
	childKey, _ := c.getRelationKey(childSource, childTarget, IntersectionStateNone, relation, false)
	assert.Assert(t, relation.get(childKey)&RelationComparisonResultSucceeded != 0)
	assert.Equal(t, relation.inferenceUsages[childKey][inferred], inferenceUsage{covariant: 1})
	assert.Assert(t, c.isTypeRelatedTo(childSource, childTarget, relation))
}

func TestInferencePatternRelationGenericCacheKeys(t *testing.T) {
	t.Parallel()
	c, _ := newInferenceRelationTestChecker()
	sourceParameter := c.newTypeParameter(nil)
	first := newInferencePatternTestParameter(c)
	second := newInferencePatternTestParameter(c)
	generic := c.newObjectType(ObjectFlagsInterface, nil)
	generic.AsInterfaceType().instantiations = make(map[CacheHashKey]*Type)
	source := c.createTypeReference(generic, []*Type{sourceParameter})
	firstTarget := c.createTypeReference(generic, []*Type{first})
	secondTarget := c.createTypeReference(generic, []*Type{second})
	firstKey, _ := c.getRelationKey(source, firstTarget, IntersectionStateNone, c.assignableRelation, false)
	secondKey, _ := c.getRelationKey(source, secondTarget, IntersectionStateNone, c.assignableRelation, false)
	assert.Equal(t, firstKey, secondKey)
	firstKey, _ = c.getRelationKey(source, firstTarget, IntersectionStateNone, c.inferencePatternRelation, false)
	secondKey, _ = c.getRelationKey(source, secondTarget, IntersectionStateNone, c.inferencePatternRelation, false)
	assert.Assert(t, firstKey != secondKey)
}

func TestInferencePatternRelationUnknownIsNotCached(t *testing.T) {
	t.Parallel()
	c, _ := newInferenceRelationTestChecker()
	relation := c.inferencePatternRelation
	source := c.newAnonymousType(nil, nil, nil, nil, nil)
	target := c.newAnonymousType(nil, nil, nil, nil, nil)
	r := c.getRelater()
	r.relation = relation
	r.relationCount = 1_000_000
	r.sourceStack = []*Type{c.emptyObjectType}
	r.targetStack = []*Type{c.emptyObjectType}
	r.expandingFlags = ExpandingFlagsBoth
	assert.Equal(t, r.recursiveTypeRelatedTo(source, target, false, IntersectionStateNone, RecursionFlagsNone), TernaryUnknown)
	assert.Equal(t, len(r.maybeKeys), 0)
	key, _ := c.getRelationKey(source, target, IntersectionStateNone, relation, false)
	assert.Assert(t, !r.maybeKeysSet.Has(key))
	assert.Equal(t, relation.get(key), RelationComparisonResultNone)
	c.putRelater(r)
}

func TestInferencePatternRelationGroundEntailment(t *testing.T) {
	t.Parallel()
	c, primitives := newInferenceRelationTestChecker()
	relation := c.inferencePatternRelation
	objectType := func(properties map[string]*Type) *Type {
		members := ast.NewSymbolTable()
		for name, typ := range properties {
			members.Set(name, c.createSymbolWithType(c.newSymbol(ast.SymbolFlagsProperty, name), typ))
		}
		return c.newAnonymousType(nil, members, nil, nil, nil)
	}
	first := objectType(map[string]*Type{"value": primitives[0], "extra": primitives[1]})
	second := objectType(map[string]*Type{"value": primitives[0]})
	third := objectType(map[string]*Type{"value": c.unknownType})
	assert.Assert(t, c.isTypeRelatedTo(first, second, relation))
	assert.Assert(t, c.isTypeRelatedTo(second, third, relation))
	assert.Assert(t, c.isTypeRelatedTo(first, third, relation))
}

func TestInferencePatternRelationIsNotTransitive(t *testing.T) {
	t.Parallel()
	c, _ := newInferenceRelationTestChecker()
	inferred := newInferencePatternTestParameter(c)
	empty := c.newTypeParameter(nil)
	empty.AsTypeParameter().constraint = c.neverType
	relation := c.inferencePatternRelation
	functionType := func(parameterType *Type) *Type {
		parameter := c.createSymbolWithType(c.newSymbol(ast.SymbolFlagsFunctionScopedVariable, "value"), parameterType)
		signature := c.newSignature(SignatureFlagsNone, nil, nil, nil, []*ast.Symbol{parameter}, c.unknownType, nil, 1)
		return c.newAnonymousType(nil, nil, []*Signature{signature}, nil, nil)
	}
	objectType := func(valueType *Type, inputType *Type) *Type {
		members := ast.NewSymbolTable()
		members.Set("value", c.createSymbolWithType(c.newSymbol(ast.SymbolFlagsProperty, "value"), valueType))
		members.Set("input", c.createSymbolWithType(c.newSymbol(ast.SymbolFlagsProperty, "input"), inputType))
		return c.newAnonymousType(nil, members, nil, nil, nil)
	}
	input := functionType(c.unknownType)
	first := objectType(empty, input)
	second := objectType(c.neverType, input)
	third := objectType(inferred, functionType(inferred))
	assert.Assert(t, c.isTypeRelatedTo(first, second, relation))
	assert.Assert(t, c.isTypeRelatedTo(second, third, relation))
	assert.Assert(t, !c.isTypeRelatedTo(first, third, relation))
}

type functionMapperCacheTestState struct {
	occurrences   int
	invalidations int
}

func newFunctionMapperCacheTest(source *Type, target *Type) (*TypeMapper, *functionMapperCacheTestState) {
	state := &functionMapperCacheTestState{}
	mapper := newFunctionTypeMapper(func(typ *Type) *Type {
		if typ == source {
			state.occurrences++
			return target
		}
		return typ
	}, func() any {
		return *state
	}, func(before, after any) {
		previous := before.(functionMapperCacheTestState)
		current := after.(functionMapperCacheTestState)
		state.occurrences += min(2, current.occurrences-previous.occurrences)
		state.invalidations += min(1, current.invalidations-previous.invalidations)
	})
	return mapper, state
}

func TestFunctionMapperCacheHooks(t *testing.T) {
	t.Parallel()
	c, _ := newCompositeTestChecker()
	c.couldContainTypeVariables = c.couldContainTypeVariablesWorker
	c.templateLiteralTypes = make(map[CacheHashKey]*Type)
	source := c.newTypeParameter(nil)
	target := c.newTypeParameter(nil)
	other := c.newTypeParameter(nil)
	inner := c.newTemplateLiteralType([]string{"inner-", ""}, []*Type{source})
	outer := c.newTemplateLiteralType([]string{"", "-", ""}, []*Type{inner, inner})
	observer, observerState := newFunctionMapperCacheTest(source, target)
	second, secondState := newFunctionMapperCacheTest(target, other)
	identity := newSimpleTypeMapper(target, target)
	for _, test := range []struct {
		mapper               *TypeMapper
		secondaryOccurrences int
	}{
		{observer, 0},
		{newMergedTypeMapper(identity, observer), 0},
		{newMergedTypeMapper(observer, observer), 0},
		{newCompositeTypeMapper(c, identity, observer), 0},
		{newCompositeTypeMapper(c, observer, observer), 0},
		{newCompositeTypeMapper(c, observer, nil), 0},
		{newMergedTypeMapper(observer, second), 2},
		{newCompositeTypeMapper(c, observer, second), 2},
	} {
		observerState.occurrences = 0
		secondState.occurrences = 0
		assert.Assert(t, test.mapper.Store(nil))
		instantiations := c.TotalInstantiationCount
		result := c.instantiateType(outer, test.mapper)
		assert.Equal(t, observerState.occurrences, 2)
		assert.Equal(t, secondState.occurrences, test.secondaryOccurrences)
		assert.Equal(t, c.TotalInstantiationCount-instantiations, uint32(2))
		assert.Assert(t, result != outer)
	}
	wholeType, _ := newFunctionMapperCacheTest(inner, c.neverType)
	assert.Equal(t, c.instantiateType(outer, wholeType), c.neverType)
}

func TestFunctionMapperCachedInvalidations(t *testing.T) {
	t.Parallel()
	c, _ := newCompositeTestChecker()
	c.couldContainTypeVariables = c.couldContainTypeVariablesWorker
	c.templateLiteralTypes = make(map[CacheHashKey]*Type)
	source := c.newTypeParameter(nil)
	target := c.newTypeParameter(nil)
	inner := c.newTemplateLiteralType([]string{"inner-", ""}, []*Type{source})
	outer := c.newTemplateLiteralType([]string{"", "-", ""}, []*Type{inner, inner})
	observer, state := newFunctionMapperCacheTest(source, target)
	// Cache invalidation effects even when the mapper was already invalid.
	state.invalidations = 1
	invalidations := 0
	hook := newFunctionTypeMapper(func(typ *Type) *Type {
		if typ == source {
			invalidations++
			state.invalidations++
		}
		return typ
	}, nil, nil)
	mapper := newMergedTypeMapper(hook, observer)
	c.instantiateType(outer, mapper)
	assert.Equal(t, state.occurrences, 2)
	assert.Equal(t, state.invalidations, 3)
	assert.Equal(t, invalidations, 1)

	c.pushActiveMapper(mapper)
	c.instantiateType(inner, mapper)
	assert.Equal(t, len(c.activeTypeMappersCaches[0]), 1)
	assert.Equal(t, len(c.activeTypeMapperStateCaches[0]), 1)
	c.clearActiveMapperCaches()
	assert.Equal(t, len(c.activeTypeMappersCaches[0]), 0)
	assert.Equal(t, len(c.activeTypeMapperStateCaches[0]), 0)
	c.instantiateType(inner, mapper)
	state.occurrences = 0
	state.invalidations = 0
	instantiations := c.TotalInstantiationCount
	c.instantiateType(inner, mapper)
	assert.Equal(t, c.TotalInstantiationCount, instantiations)
	assert.Equal(t, state.occurrences, 1)
	assert.Equal(t, state.invalidations, 1)
	c.popActiveMapper()
	assert.Equal(t, len(c.activeTypeMappersCaches), 0)
	assert.Equal(t, len(c.activeTypeMapperStateCaches), 0)

	other, otherState := newFunctionMapperCacheTest(source, c.newTypeParameter(nil))
	c.pushActiveMapper(other)
	c.instantiateType(inner, other)
	assert.Equal(t, otherState.occurrences, 1)
	assert.Equal(t, state.occurrences, 1)
	assert.Equal(t, state.invalidations, 1)
	c.popActiveMapper()
}

func TestFunctionMapperNilCacheState(t *testing.T) {
	t.Parallel()
	c, _ := newCompositeTestChecker()
	c.couldContainTypeVariables = c.couldContainTypeVariablesWorker
	c.templateLiteralTypes = make(map[CacheHashKey]*Type)
	source := c.newTypeParameter(nil)
	target := c.newTypeParameter(nil)
	inner := c.newTemplateLiteralType([]string{"inner-", ""}, []*Type{source})
	outer := c.newTemplateLiteralType([]string{"", "-", ""}, []*Type{inner, inner})
	stores, loads := 0, 0
	mapper := newFunctionTypeMapper(func(typ *Type) *Type {
		if typ == source {
			return target
		}
		return typ
	}, func() any {
		stores++
		return nil
	}, func(before, after any) {
		assert.Assert(t, before == nil && after == nil)
		loads++
	})
	c.instantiateType(outer, mapper)
	assert.Equal(t, stores, 2)
	assert.Equal(t, loads, 1)
}

func TestFunctionMapperRequiresPairedHandlers(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		store func() any
		load  func(any, any)
	}{
		{store: func() any { return nil }},
		{load: func(any, any) {}},
	} {
		func() {
			defer func() { assert.Assert(t, recover() != nil) }()
			newFunctionTypeMapper(func(typ *Type) *Type { return typ }, test.store, test.load)
		}()
	}
}

func TestTypeMapperStoreLoadDispatch(t *testing.T) {
	t.Parallel()
	stores := [2]int{}
	loads := [2]int{}
	newMapper := func(index int) *TypeMapper {
		return newFunctionTypeMapper(func(typ *Type) *Type { return typ }, func() any {
			stores[index]++
			return nil
		}, func(before, after any) {
			assert.Assert(t, before == nil && after == nil)
			loads[index]++
		})
	}
	first, second := newMapper(0), newMapper(1)
	c, _ := newCompositeTestChecker()
	mapper := newCompositeTypeMapper(c, newMergedTypeMapper(first, second), first)
	assert.Assert(t, mapper.Store(nil))
	assert.Equal(t, stores, [2]int{})
	var before, after TypeMapperState
	assert.Assert(t, mapper.Store(&before))
	assert.Assert(t, mapper.Store(&after))
	assert.Equal(t, stores, [2]int{2, 2})
	assert.Equal(t, len(before), 2)
	assert.Equal(t, len(after), 2)
	mapper.Load(before, after)
	mapper.Load(before, after)
	assert.Equal(t, loads, [2]int{2, 2})
}

func TestInferenceContextMappers(t *testing.T) { //nolint:paralleltest
	c, types := newCompositeTestChecker()
	c.errorType = types[0]
	info := newInferenceInfo(types[0])
	info.inferredType = types[1]
	info.candidates = []*Type{types[1]}
	context := c.newInferenceContextWorker([]*InferenceInfo{info}, nil, InferenceFlagsNone, nil)
	var state TypeMapperState
	assert.Assert(t, !context.nonFixingMapper.Store(&state))
	assert.Equal(t, len(state), 0)
	context.nonFixingMapper.Load(nil, nil)
	assert.Equal(t, context.nonFixingMapper.Map(types[0]), types[1])
	assert.Assert(t, !info.isFixed)
	clone := c.cloneInferenceContext(context, InferenceFlagsNone)
	clone.inferences[0].candidates[0] = types[2]
	assert.Equal(t, info.candidates[0], types[1])
	assert.Equal(t, context.mapper.Map(types[0]), types[0])
	assert.Assert(t, info.isFixed)
	assert.Assert(t, !clone.inferences[0].isFixed)
	assert.Equal(t, context.mapper.Map(types[2]), types[2])
	runtime.GC()
	assert.Equal(t, context.nonFixingMapper.Map(types[0]), types[0])
	if !race.Enabled {
		assert.Equal(t, testing.AllocsPerRun(10, func() {
			c.newInferenceContextWorker([]*InferenceInfo{info}, nil, InferenceFlagsNone, nil)
		}), float64(2))
	}
}

func TestCompactValueSymbolLinksLayout(t *testing.T) {
	t.Parallel()
	assert.Equal(t, unsafe.Sizeof(ValueSymbolLinks{}), 4*unsafe.Sizeof(uintptr(0)))
	assert.Equal(t, unsafe.Sizeof(valueSymbolExtra{}), 3*unsafe.Sizeof(uintptr(0)))
	c, types := newCompositeTestChecker()
	var links ValueSymbolLinks
	assert.Assert(t, links.getWriteType() == nil)
	assert.Assert(t, links.getNameType() == nil)
	assert.Assert(t, links.getContainingType() == nil)
	links.setWriteType(c, nil)
	links.setNameType(c, nil)
	links.setContainingType(c, nil)
	assert.Assert(t, links.extra == nil)
	links.setWriteType(c, types[0])
	extra := links.extra
	links.setNameType(c, types[1])
	links.setContainingType(c, types[2])
	assert.Equal(t, links.extra, extra)
	for range 1024 {
		var other ValueSymbolLinks
		other.setNameType(c, types[2])
	}
	runtime.GC()
	assert.Equal(t, links.getWriteType(), types[0])
	assert.Equal(t, links.getNameType(), types[1])
	assert.Equal(t, links.getContainingType(), types[2])
	links.setNameType(c, nil)
	assert.Assert(t, links.getNameType() == nil)
	assert.Equal(t, links.getWriteType(), types[0])
	assert.Equal(t, links.getContainingType(), types[2])
}

func TestCompactStructuredTypeLayout(t *testing.T) {
	t.Parallel()
	assert.Equal(t, unsafe.Sizeof(StructuredType{}), unsafe.Sizeof(ConstrainedType{})+5*unsafe.Sizeof(uintptr(0)))
}

func TestStructuredTypeExtra(t *testing.T) {
	t.Parallel()
	c, types := newCompositeTestChecker()
	data := c.newAnonymousType(nil, nil, nil, nil, nil).AsStructuredType()
	assert.Assert(t, data.extra == nil)
	assert.Assert(t, data.CallSignatures() == nil)
	assert.Assert(t, data.ConstructSignatures() == nil)
	assert.Assert(t, data.getIndexInfos() == nil)
	c.setStructuredTypeSignatures(data, nil, nil, nil)
	assert.Assert(t, data.extra == nil)

	call := &Signature{}
	construct := &Signature{}
	info := &IndexInfo{keyType: types[0]}
	c.setStructuredTypeSignatures(data, []*Signature{call}, []*Signature{construct}, []*IndexInfo{info})
	assert.Equal(t, data.CallSignatures()[0], call)
	assert.Equal(t, data.ConstructSignatures()[0], construct)
	assert.Equal(t, cap(data.CallSignatures()), 1)
	assert.Equal(t, cap(data.ConstructSignatures()), 1)
	assert.Equal(t, data.getIndexInfos()[0], info)
	extra := data.extra
	extra.objectTypeWithoutAbstractConstructSignatures = types[2]
	for range 1024 {
		other := c.newAnonymousType(nil, nil, []*Signature{call}, nil, nil)
		assert.Assert(t, other.AsStructuredType().extra != extra)
	}
	runtime.GC()
	assert.Equal(t, data.CallSignatures()[0], call)
	assert.Equal(t, data.ConstructSignatures()[0], construct)
	assert.Equal(t, data.getIndexInfos()[0], info)
	assert.Equal(t, data.extra.objectTypeWithoutAbstractConstructSignatures, types[2])
	c.setStructuredTypeSignatures(data, nil, []*Signature{construct}, nil)
	assert.Equal(t, len(data.CallSignatures()), 0)
	assert.Equal(t, data.ConstructSignatures()[0], construct)
	assert.Assert(t, data.getIndexInfos() == nil)
	c.setStructuredTypeSignatures(data, nil, nil, nil)
	assert.Assert(t, data.CallSignatures() == nil)
	assert.Assert(t, data.ConstructSignatures() == nil)
	assert.Equal(t, data.extra, extra)
	assert.Equal(t, extra.objectTypeWithoutAbstractConstructSignatures, types[2])
	c.setStructuredTypeSignatures(data, nil, nil, []*IndexInfo{})
	assert.Assert(t, data.getIndexInfos() != nil)
	runtime.KeepAlive(c)
}

func TestCompactTypeNodeLinksLayout(t *testing.T) {
	t.Parallel()
	assert.Equal(t, unsafe.Sizeof(TypeNodeLinks{}), 2*unsafe.Sizeof(uintptr(0)))
	c, types := newCompositeTestChecker()
	var links TypeNodeLinks
	links.resolvedType = types[0]
	assert.Assert(t, links.getOuterTypeParameters() == nil)
	links.setOuterTypeParameters(c, nil)
	assert.Assert(t, links.outerTypeParameters == nil)
	links.setOuterTypeParameters(c, []*Type{})
	assert.Assert(t, links.getOuterTypeParameters() != nil)
	assert.Equal(t, len(links.getOuterTypeParameters()), 0)
	entry := links.outerTypeParameters
	list := slices.Clone(types)
	links.setOuterTypeParameters(c, list)
	assert.Equal(t, links.outerTypeParameters, entry)
	assert.Equal(t, links.getOuterTypeParameters()[0], types[0])
	list[0] = types[1]
	assert.Equal(t, links.getOuterTypeParameters()[0], types[1])
	for range 1024 {
		var other TypeNodeLinks
		other.setOuterTypeParameters(c, types)
	}
	runtime.GC()
	assert.Equal(t, links.getOuterTypeParameters()[0], types[1])
	assert.Equal(t, links.resolvedType, types[0])
	links.setOuterTypeParameters(c, nil)
	assert.Assert(t, links.getOuterTypeParameters() == nil)
	assert.Equal(t, links.resolvedType, types[0])
	runtime.KeepAlive(c)
}

func TestCompactSignatureLayout(t *testing.T) {
	t.Parallel()
	assert.Equal(t, unsafe.Sizeof(Signature{}), 16+8*unsafe.Sizeof(uintptr(0)))
	assert.Equal(t, unsafe.Sizeof(signatureExtra{}), 7*unsafe.Sizeof(uintptr(0)))
}

func TestSignatureExtra(t *testing.T) {
	t.Parallel()
	c, types := newCompositeTestChecker()
	c.noTypePredicate = &TypePredicate{}
	sig := c.newSignature(SignatureFlagsHasRestParameter, nil, nil, nil, nil, types[0], nil, 1)
	assert.Assert(t, sig.extra == nil)
	assert.Assert(t, sig.TypeParameters() == nil)
	assert.Assert(t, sig.ThisParameter() == nil)
	assert.Assert(t, sig.getComposite() == nil)
	assert.Assert(t, sig.getIsolatedSignatureType() == nil)
	assert.Assert(t, sig.getResolvedTypePredicate(c) == nil)
	assert.Equal(t, sig.resolvedMinArgumentCount, int32(-1))
	sig.setTypeParameters(c, nil)
	sig.setThisParameter(c, nil)
	sig.setComposite(c, nil)
	sig.setResolvedTypePredicate(c, nil)
	assert.Assert(t, sig.extra == nil)
	assert.Assert(t, c.getTypePredicateOfSignature(sig) == nil)
	assert.Equal(t, sig.getResolvedTypePredicate(c), c.noTypePredicate)
	assert.Assert(t, sig.extra == nil)
	assert.Assert(t, sig.flags&SignatureFlagsHasRestParameter != 0)
	assert.Equal(t, sig.Flags(), SignatureFlagsHasRestParameter)
	sig.setResolvedTypePredicate(c, nil)
	assert.Assert(t, sig.getResolvedTypePredicate(c) == nil)
	sig.setTypeParameters(c, []*Type{})
	assert.Assert(t, sig.TypeParameters() != nil)
	entry := sig.extra
	list := slices.Clone(types)
	sig.setTypeParameters(c, list)
	list[0] = types[1]
	assert.Equal(t, sig.TypeParameters()[0], types[1])
	parameter := &ast.Symbol{}
	sig.setThisParameter(c, parameter)
	predicate := c.newTypePredicate(TypePredicateKindIdentifier, "p", 0, types[0])
	sig.setResolvedTypePredicate(c, predicate)
	assert.Equal(t, c.getTypePredicateOfSignature(sig), predicate)
	composite := &CompositeSignature{isUnion: true, signatures: []*Signature{sig}}
	sig.setComposite(c, composite)
	sig.ensureExtra(c).isolatedSignatureType = types[2]
	clone := c.cloneSignature(sig)
	assert.Assert(t, clone.extra != entry)
	assert.Equal(t, clone.getComposite(), composite)
	assert.Equal(t, clone.ThisParameter(), parameter)
	assert.Equal(t, clone.TypeParameters()[0], types[1])
	assert.Assert(t, clone.getResolvedTypePredicate(c) == nil)
	assert.Assert(t, clone.getIsolatedSignatureType() == nil)
	clone.setThisParameter(c, nil)
	assert.Equal(t, sig.ThisParameter(), parameter)
	sig.setResolvedTypePredicate(c, c.noTypePredicate)
	assert.Assert(t, c.getTypePredicateOfSignature(sig) == nil)
	assert.Assert(t, entry.resolvedTypePredicate == nil)
	sig.setResolvedTypePredicate(c, predicate)
	for range 1024 {
		other := c.newSignature(SignatureFlagsNone, nil, types, parameter, nil, nil, predicate, 0)
		other.setComposite(c, composite)
	}
	runtime.GC()
	assert.Equal(t, sig.extra, entry)
	assert.Equal(t, sig.getResolvedTypePredicate(c), predicate)
	assert.Equal(t, sig.Flags(), SignatureFlagsHasRestParameter)
	assert.Equal(t, sig.getIsolatedSignatureType(), types[2])
	sig.setTypeParameters(c, nil)
	sig.setThisParameter(c, nil)
	sig.setComposite(c, nil)
	assert.Equal(t, sig.extra, entry)
	assert.Assert(t, sig.TypeParameters() == nil)
	assert.Equal(t, sig.resolvedReturnType, types[0])
	assert.Equal(t, sig.minArgumentCount, int32(1))
	assert.Equal(t, sig.getResolvedTypePredicate(c), predicate)
	runtime.KeepAlive(c)
}
