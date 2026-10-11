package checker

import (
	"runtime"
	"testing"
	"unsafe"

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
