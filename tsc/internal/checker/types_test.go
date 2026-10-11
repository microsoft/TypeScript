package checker

import (
	"encoding/binary"
	"runtime"
	"slices"
	"strconv"
	"strings"
	"testing"
	"unsafe"

	"github.com/microsoft/TypeScript/tsc/internal/testutil/race"
	"github.com/zeebo/xxh3"
	"gotest.tools/v3/assert"
)

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
