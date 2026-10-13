package checker

import "unsafe"

type typeKind uint8

const (
	typeKindLiteral typeKind = iota
	typeKindObject
)

type Type struct {
	kind typeKind
}

type LiteralType struct {
	TypeBase
}

type ObjectType struct {
	TypeBase
}

type TypeBase struct {
	Type
}

func (t *TypeBase) AsType() *Type { return &t.Type }

type Checker struct{}

func (c *Checker) newType(flags, objectFlags int, typ *Type, kind typeKind) *Type {
	typ.kind = kind
	return typ
}

func castType[T any](t *Type, kind typeKind) *T {
	if t.kind != kind {
		panic("Invalid type cast")
	}
	return (*T)(unsafe.Pointer(t))
}

func calls(c *Checker, literal *LiteralType, typ *Type, kind typeKind) {
	c.newType(0, 0, literal.AsType(), typeKindLiteral)
	c.newType(0, 0, literal.AsType(), typeKindObject)
	c.newType(0, 0, literal.AsType(), kind)
	c.newType(0, 0, typ, typeKindLiteral)
	_ = c.newType
	_ = castType[LiteralType](typ, typeKindLiteral)
	_ = castType[LiteralType](typ, typeKindObject)
	_ = castType[ObjectType](typ, typeKindLiteral)
	_ = castType[LiteralType](typ, kind)
	_ = castType[*LiteralType](typ, typeKindLiteral)
	_ = castType[LiteralType]
	typ.kind = typeKindLiteral
	typ.kind++
	_ = &typ.kind
	_ = (*LiteralType)(unsafe.Pointer(typ))
}

type PretendLiteralType struct {
	LiteralType
}

func (t *PretendLiteralType) AsType() *Type { return &t.Type }

func shadowedUpcast(c *Checker) {
	data := &PretendLiteralType{}
	c.newType(0, 0, data.AsType(), typeKindLiteral)
}

type typeMapperKind uint8

const (
	typeMapperSimple typeMapperKind = iota
	typeMapperArray
)

type TypeMapper struct {
	kind typeMapperKind
}

type SimpleTypeMapper struct {
	TypeMapper
}

type ArrayTypeMapper struct {
	TypeMapper
}

func castTypeMapper[T any](m *TypeMapper, kind typeMapperKind) *T {
	if m.kind != kind {
		panic("Invalid type mapper cast")
	}
	return (*T)(unsafe.Pointer(m))
}

func mapperCalls(simple *SimpleTypeMapper, header *TypeMapper) {
	simple.kind = typeMapperSimple
	simple.kind = typeMapperArray
	header.kind = typeMapperSimple
	_ = castTypeMapper[SimpleTypeMapper](header, typeMapperSimple)
	_ = castTypeMapper[SimpleTypeMapper](header, typeMapperArray)
	_ = (*SimpleTypeMapper)(unsafe.Pointer(header))
}

func freshRecords(c *Checker) *Type {
	tagged := &LiteralType{}
	c.newType(0, 0, tagged.AsType(), typeKindLiteral)
	_ = (&LiteralType{}).AsType()
	escaped := &LiteralType{}
	c.newType(0, 0, escaped.AsType(), typeKindLiteral)
	_ = escaped.AsType()
	header := &ObjectType{}
	_ = &header.TypeBase
	c.newType(0, 0, header.AsType(), typeKindObject)
	unused := &ObjectType{}
	_ = unused
	value := LiteralType{}
	_ = value
	return new(LiteralType).AsType()
}

func freshMappers() (*TypeMapper, *TypeMapper) {
	tagged := &SimpleTypeMapper{}
	tagged.kind = typeMapperSimple
	untagged := &ArrayTypeMapper{}
	return &tagged.TypeMapper, &untagged.TypeMapper
}

type arena[T any] struct{}

func (a *arena[T]) New() *T { return new(T) }

func arenaRecords(c *Checker, literals *arena[LiteralType]) *LiteralType {
	c.newType(0, 0, literals.New().AsType(), typeKindLiteral)
	data := literals.New()
	c.newType(0, 0, data.AsType(), typeKindLiteral)
	return literals.New()
}

func zeroValueRecords() (*LiteralType, *SimpleTypeMapper) {
	var literal LiteralType
	var literals [2]LiteralType
	_ = literals
	var mappers [2]SimpleTypeMapper
	mappers[0].kind = typeMapperSimple
	return &literal, &mappers[0]
}

func (m *SimpleTypeMapper) Map(t *Type) *Type { return t }

func initSimpleTypeMapper(m *SimpleTypeMapper) *TypeMapper {
	m.kind = typeMapperSimple
	return &m.TypeMapper
}

type mapperOwner struct {
	mapperStorage [2]SimpleTypeMapper
}

func coallocatedMappers(owner *mapperOwner, t *Type) (*TypeMapper, *TypeMapper, *Type) {
	tagged := initSimpleTypeMapper(&owner.mapperStorage[0])
	escaped := &owner.mapperStorage[1].TypeMapper
	return tagged, escaped, owner.mapperStorage[1].Map(t)
}

func zeroValueMapper() *TypeMapper {
	var m SimpleTypeMapper
	return &m.TypeMapper
}
