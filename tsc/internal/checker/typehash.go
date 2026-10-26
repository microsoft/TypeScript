package checker

import (
	"math"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/jsnum"
	"github.com/zeebo/xxh3"
)

// Structural hashes
//
// A structural hash identifies a type, mapper, or symbol by what it was
// constructed from: declarations by file and position, and types by their
// kind and constituents. Unlike type IDs, it does not depend on the order in
// which types were created, so anything derived from it is the same whatever
// was checked before. Distinct entities may share a hash; uses must only
// lose precision when they do.

func hashFinal(x uint64) uint64 {
	x ^= x >> 30
	x *= 0xbf58476d1ce4e5b9
	x ^= x >> 27
	x *= 0x94d049bb133111eb
	x ^= x >> 31
	return x
}

func hashCombine(h uint64, v uint64) uint64 {
	return hashFinal(h*0x9e3779b97f4a7c15 ^ v)
}

// typeHashDepth bounds how deep a structural hash looks into a type. Types
// that differ only deeper share a hash. Bounding the depth rather than
// stopping at cycles keeps the hash of a type the same wherever a cycle
// through it is entered, and its cost linear.
const typeHashDepth = 4

func (c *Checker) typeHash(t *Type) uint64 {
	return c.typeHashAt(t, typeHashDepth)
}

// typeHashAt returns the structural hash of t, looking depth levels into it.
func (c *Checker) typeHashAt(t *Type, depth int) uint64 {
	if t == nil {
		return 0
	}
	h := hashCombine(hashCombine(uint64(t.kind), uint64(t.flags)), c.symbolHash(t.symbol))
	if depth == 0 {
		return h
	}
	entry := c.typeHashes[t]
	if entry != nil && entry[depth-1] != 0 {
		return entry[depth-1]
	}
	h = hashCombine(h, c.typeHashWorker(t, depth-1))
	if t.alias != nil {
		h = hashCombine(h, c.symbolHash(t.alias.symbol))
		h = c.hashTypes(h, t.alias.typeArguments, depth-1)
	}
	// Zero marks an absent entry.
	h |= 1
	if entry == nil {
		// The worker may have added an entry for t at another depth.
		if entry = c.typeHashes[t]; entry == nil {
			entry = new([typeHashDepth]uint64)
			if c.typeHashes == nil {
				c.typeHashes = make(map[*Type]*[typeHashDepth]uint64)
			}
			c.typeHashes[t] = entry
		}
	}
	entry[depth-1] = h
	return h
}

func (c *Checker) hashTypes(h uint64, types []*Type, depth int) uint64 {
	h = hashCombine(h, uint64(len(types)))
	for _, t := range types {
		h = hashCombine(h, c.typeHashAt(t, depth))
	}
	return h
}

func (c *Checker) typeHashWorker(t *Type, depth int) uint64 {
	h := hashCombine(uint64(t.kind), uint64(t.flags))
	switch t.kind {
	case typeKindIntrinsic:
		h = hashCombine(h, xxh3.HashString(t.AsIntrinsicType().intrinsicName))
		h = hashCombine(h, uint64(t.objectFlags))
	case typeKindLiteral:
		lit := t.AsLiteralType()
		h = hashCombine(h, hashLiteralValue(lit.value))
		h = hashCombine(h, c.symbolHash(t.symbol))
		if lit.freshType == t {
			h = hashCombine(h, 1)
		}
	case typeKindUniqueESSymbol:
		h = hashCombine(h, c.symbolHash(t.symbol))
	case typeKindTypeParameter:
		tp := t.AsTypeParameter()
		h = hashCombine(h, c.symbolHash(t.symbol))
		if tp.isThisType {
			h = hashCombine(h, 1)
		}
		if tp.isDistributed {
			h = hashCombine(h, 2)
		}
		if tp.target != nil {
			h = hashCombine(h, c.typeHashAt(tp.target, depth))
			h = hashCombine(h, c.mapperHashAt(tp.mapper, depth))
		}
	case typeKindIndex:
		idx := t.AsIndexType()
		h = hashCombine(h, c.typeHashAt(idx.target, depth))
		h = hashCombine(h, uint64(idx.indexFlags))
	case typeKindIndexedAccess:
		ia := t.AsIndexedAccessType()
		h = hashCombine(h, c.typeHashAt(ia.objectType, depth))
		h = hashCombine(h, c.typeHashAt(ia.indexType, depth))
		h = hashCombine(h, uint64(ia.accessFlags))
	case typeKindTemplateLiteral:
		tl := t.AsTemplateLiteralType()
		for _, text := range tl.texts {
			h = hashCombine(h, xxh3.HashString(text))
		}
		h = c.hashTypes(h, tl.types, depth)
	case typeKindStringMapping:
		h = hashCombine(h, c.symbolHash(t.symbol))
		h = hashCombine(h, c.typeHashAt(t.AsStringMappingType().target, depth))
	case typeKindSubstitution:
		st := t.AsSubstitutionType()
		h = hashCombine(h, c.typeHashAt(st.baseType, depth))
		h = hashCombine(h, c.typeHashAt(st.constraint, depth))
	case typeKindConditional:
		ct := t.AsConditionalType()
		h = hashCombine(h, c.hashNode(ct.root.node.AsNode()))
		h = hashCombine(h, c.mapperHashAt(ct.mapper, depth))
	case typeKindUnion, typeKindIntersection:
		// Constituents are ordered by type ID, so they are combined in a way
		// that does not depend on their order.
		var sum uint64
		for _, m := range t.AsUnionOrIntersectionType().types {
			sum += hashFinal(c.typeHashAt(m, depth))
		}
		h = hashCombine(h, sum)
	case typeKindTuple:
		tt := t.AsTupleType()
		for _, info := range tt.elementInfos {
			h = hashCombine(h, uint64(info.flags))
			h = hashCombine(h, c.hashNode(info.labeledDeclaration))
		}
		if tt.readonly {
			h = hashCombine(h, 1)
		}
	case typeKindReverseMapped:
		rm := t.AsReverseMappedType()
		h = hashCombine(h, c.typeHashAt(rm.source, depth))
		h = hashCombine(h, c.typeHashAt(rm.mappedType, depth))
		h = hashCombine(h, c.typeHashAt(rm.constraintType, depth))
	case typeKindEvolvingArray:
		h = hashCombine(h, c.typeHashAt(t.AsEvolvingArrayType().elementType, depth))
	case typeKindTypeReference:
		ref := t.AsTypeReference()
		h = hashCombine(h, uint64(t.objectFlags))
		h = hashCombine(h, c.typeHashAt(ref.target, depth))
		if ref.node != nil {
			h = hashCombine(h, c.hashNode(ref.node))
			h = hashCombine(h, c.mapperHashAt(ref.mapper, depth))
		} else {
			h = c.hashTypes(h, ref.resolvedTypeArguments.peek(), depth)
		}
	default:
		// Interfaces, anonymous, mapped, and instantiation expression types.
		h = hashCombine(h, uint64(t.objectFlags&ObjectFlagsObjectTypeKindMask))
		h = hashCombine(h, c.symbolHash(t.symbol))
		if t.kind == typeKindMapped {
			h = hashCombine(h, c.hashNode(t.AsMappedType().declaration.AsNode()))
		}
		if t.kind == typeKindInstantiationExpression {
			h = hashCombine(h, c.hashNode(t.AsInstantiationExpressionType().node))
		}
		if obj := t.AsObjectType(); obj != nil && obj.target != nil {
			h = hashCombine(h, c.typeHashAt(obj.target, depth))
			h = hashCombine(h, c.mapperHashAt(obj.mapper, depth))
		}
	}
	return h
}

func hashLiteralValue(value any) uint64 {
	switch v := value.(type) {
	case string:
		return hashCombine(1, xxh3.HashString(v))
	case jsnum.Number:
		return hashCombine(2, math.Float64bits(float64(v)))
	case bool:
		if v {
			return 3
		}
		return 4
	case jsnum.PseudoBigInt:
		h := hashCombine(5, xxh3.HashString(v.Base10Value))
		if v.Negative {
			h = hashCombine(h, 1)
		}
		return h
	}
	return 0
}

func (c *Checker) hashNode(node *ast.Node) uint64 {
	if node == nil {
		return 0
	}
	h := hashCombine(uint64(node.Kind), uint64(node.Pos()))
	if file := ast.GetSourceFileOfNode(node); file != nil {
		h = hashCombine(h, c.fileHash(file))
	}
	return h
}

// fileHash identifies a file by its text rather than its path, so that
// hashes do not depend on where a project is located.
func (c *Checker) fileHash(file *ast.SourceFile) uint64 {
	if h, ok := c.fileHashes[file]; ok {
		return h
	}
	h := xxh3.HashString(file.Text())
	if c.fileHashes == nil {
		c.fileHashes = make(map[*ast.SourceFile]uint64)
	}
	c.fileHashes[file] = h
	return h
}

func (c *Checker) symbolHash(s *ast.Symbol) uint64 {
	if s == nil {
		return 0
	}
	if h, ok := c.symbolHashes[s]; ok {
		return h
	}
	h := hashCombine(xxh3.HashString(s.Name()), uint64(s.Flags()))
	if decls := s.Declarations(); len(decls) != 0 {
		h = hashCombine(h, c.hashNode(decls[0]))
	} else if s.Parent() != nil {
		h = hashCombine(h, c.symbolHash(s.Parent()))
	}
	if c.symbolHashes == nil {
		c.symbolHashes = make(map[*ast.Symbol]uint64)
	}
	c.symbolHashes[s] = h
	return h
}

func (c *Checker) mapperHash(m *TypeMapper) uint64 {
	// Mappers are immutable, and one mapper is typically used for many
	// instantiations, so its hash is computed once.
	if h, ok := c.mapperHashes[m]; ok {
		return h
	}
	h := c.mapperHashAt(m, typeHashDepth)
	if c.mapperHashes == nil {
		c.mapperHashes = make(map[*TypeMapper]uint64)
	}
	c.mapperHashes[m] = h
	return h
}

// mapperHashAt returns the structural hash of m, looking depth levels into
// the types it maps.
func (c *Checker) mapperHashAt(m *TypeMapper, depth int) uint64 {
	if m == nil {
		return 0
	}
	h := uint64(m.kind)
	if depth == 0 {
		return h
	}
	switch m.kind {
	case TypeMapperKindSimple:
		sm := castTypeMapper[SimpleTypeMapper](m, TypeMapperKindSimple)
		h = hashCombine(h, c.typeHashAt(sm.source, depth))
		h = hashCombine(h, c.typeHashAt(sm.target, depth))
	case TypeMapperKindArray:
		am := castTypeMapper[ArrayTypeMapper](m, TypeMapperKindArray)
		h = c.hashTypes(h, am.sources, depth)
		h = c.hashTypes(h, am.targets, depth)
	case TypeMapperKindArrayToSingle:
		am := castTypeMapper[ArrayToSingleTypeMapper](m, TypeMapperKindArrayToSingle)
		h = c.hashTypes(h, am.sources, depth)
		h = hashCombine(h, c.typeHashAt(am.target, depth))
	case TypeMapperKindDeferred:
		h = c.hashTypes(h, castTypeMapper[DeferredTypeMapper](m, TypeMapperKindDeferred).sources, depth)
	case TypeMapperKindFunction:
		// Function mappers are the checker's fixed mappers.
		switch m {
		case c.uniqueLiteralMapper:
			h = hashCombine(h, 1)
		case c.reportUnreliableMapper:
			h = hashCombine(h, 2)
		case c.reportUnmeasurableMapper:
			h = hashCombine(h, 3)
		case c.restrictiveMapper:
			h = hashCombine(h, 4)
		case c.permissiveMapper:
			h = hashCombine(h, 5)
		}
	case TypeMapperKindMerged:
		mm := castTypeMapper[MergedTypeMapper](m, TypeMapperKindMerged)
		h = hashCombine(h, c.mapperHashAt(mm.m1, depth-1))
		h = hashCombine(h, c.mapperHashAt(mm.m2, depth-1))
	case TypeMapperKindComposite:
		cm := castTypeMapper[CompositeTypeMapper](m, TypeMapperKindComposite)
		h = hashCombine(h, c.mapperHashAt(cm.m1, depth-1))
		h = hashCombine(h, c.mapperHashAt(cm.m2, depth-1))
	case TypeMapperKindInference:
		im := castTypeMapper[InferenceTypeMapper](m, TypeMapperKindInference)
		for _, inference := range im.n.inferences {
			h = hashCombine(h, c.typeHashAt(inference.typeParameter, depth))
		}
		if im.fixing {
			h = hashCombine(h, 1)
		}
	}
	return h
}
