package checker

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/tracing"
)

// Tracer records types and trace events during type checking. A nil *Tracer
// is a valid no-op, so call sites can use `if tr := c.tracer; tr != nil` to
// gate work that only matters under --generateTrace.
type Tracer struct {
	tracing  *tracing.Tracing
	recorder tracing.Tracer
}

// NewTracer creates a Tracer for the given checker index that records both
// type-creation events and trace events through the provided tracing session.
func NewTracer(tr *tracing.Tracing, checkerIndex int) *Tracer {
	return &Tracer{tracing: tr, recorder: tr.NewTypeTracer(checkerIndex)}
}

func (t *Tracer) RecordType(typ *Type) {
	t.recorder.RecordType(wrapType(typ))
}

func (t *Tracer) Push(phase tracing.Phase, name string, args map[string]any, separateBeginAndEnd bool) func() {
	return t.tracing.Push(phase, name, args, separateBeginAndEnd)
}

func (t *Tracer) Instant(phase tracing.Phase, name string, args map[string]any) {
	t.tracing.Instant(phase, name, args)
}

// tracedTypeAdapter adapts a Type to the tracing.TracedType interface
type tracedTypeAdapter struct {
	t       *Type
	checker *Checker
}

var _ tracing.TracedType = (*tracedTypeAdapter)(nil)

func (a *tracedTypeAdapter) Id() uint32 {
	return uint32(a.t.id)
}

func (a *tracedTypeAdapter) FormatFlags() []string {
	return FormatTypeFlags(a.t.flags)
}

func (a *tracedTypeAdapter) IsConditional() bool {
	return a.t.flags&TypeFlagsConditional != 0
}

func (a *tracedTypeAdapter) Symbol() *ast.Symbol {
	return a.t.symbol
}

func (a *tracedTypeAdapter) AliasSymbol() *ast.Symbol {
	if a.t.alias == nil {
		return nil
	}
	return a.t.alias.Symbol()
}

func (a *tracedTypeAdapter) AliasTypeArguments() []tracing.TracedType {
	if a.t.alias == nil {
		return nil
	}
	return wrapTypes(a.t.alias.TypeArguments())
}

func (a *tracedTypeAdapter) IntrinsicName() string {
	if a.t.flags&TypeFlagsIntrinsic == 0 {
		return ""
	}
	data, ok := a.t.data.(*IntrinsicType)
	if !ok {
		return ""
	}
	return data.intrinsicName
}

func (a *tracedTypeAdapter) UnionTypes() []tracing.TracedType {
	if a.t.flags&TypeFlagsUnion == 0 {
		return nil
	}
	return wrapTypes(a.t.AsUnionType().types)
}

func (a *tracedTypeAdapter) IntersectionTypes() []tracing.TracedType {
	if a.t.flags&TypeFlagsIntersection == 0 {
		return nil
	}
	return wrapTypes(a.t.AsIntersectionType().types)
}

func (a *tracedTypeAdapter) IndexType() tracing.TracedType {
	if a.t.flags&TypeFlagsIndex == 0 {
		return nil
	}
	t := a.t.AsIndexType().target
	if t == nil {
		return nil
	}
	return wrapType(t)
}

func (a *tracedTypeAdapter) IndexedAccessObjectType() tracing.TracedType {
	if a.t.flags&TypeFlagsIndexedAccess == 0 {
		return nil
	}
	t := a.t.AsIndexedAccessType().objectType
	if t == nil {
		return nil
	}
	return wrapType(t)
}

func (a *tracedTypeAdapter) IndexedAccessIndexType() tracing.TracedType {
	if a.t.flags&TypeFlagsIndexedAccess == 0 {
		return nil
	}
	t := a.t.AsIndexedAccessType().indexType
	if t == nil {
		return nil
	}
	return wrapType(t)
}

func (a *tracedTypeAdapter) ConditionalCheckType() tracing.TracedType {
	if a.t.flags&TypeFlagsConditional == 0 {
		return nil
	}
	t := a.t.AsConditionalType().checkType
	if t == nil {
		return nil
	}
	return wrapType(t)
}

func (a *tracedTypeAdapter) ConditionalExtendsType() tracing.TracedType {
	if a.t.flags&TypeFlagsConditional == 0 {
		return nil
	}
	t := a.t.AsConditionalType().extendsType
	if t == nil {
		return nil
	}
	return wrapType(t)
}

func (a *tracedTypeAdapter) ConditionalTrueType() tracing.TracedType {
	if a.t.flags&TypeFlagsConditional == 0 {
		return nil
	}
	t := a.t.AsConditionalType().resolvedTrueType
	if t == nil {
		return nil
	}
	return wrapType(t)
}

func (a *tracedTypeAdapter) ConditionalFalseType() tracing.TracedType {
	if a.t.flags&TypeFlagsConditional == 0 {
		return nil
	}
	t := a.t.AsConditionalType().resolvedFalseType
	if t == nil {
		return nil
	}
	return wrapType(t)
}

func (a *tracedTypeAdapter) SubstitutionBaseType() tracing.TracedType {
	if a.t.flags&TypeFlagsSubstitution == 0 {
		return nil
	}
	t := a.t.AsSubstitutionType().baseType
	if t == nil {
		return nil
	}
	return wrapType(t)
}

func (a *tracedTypeAdapter) SubstitutionConstraintType() tracing.TracedType {
	if a.t.flags&TypeFlagsSubstitution == 0 {
		return nil
	}
	t := a.t.AsSubstitutionType().constraint
	if t == nil {
		return nil
	}
	return wrapType(t)
}

func (a *tracedTypeAdapter) ReferenceTarget() tracing.TracedType {
	if a.t.flags&TypeFlagsObject == 0 || a.t.objectFlags&ObjectFlagsReference == 0 {
		return nil
	}
	t := a.t.AsTypeReference().target
	if t == nil {
		return nil
	}
	return wrapType(t)
}

func (a *tracedTypeAdapter) ReferenceTypeArguments() []tracing.TracedType {
	if a.t.flags&TypeFlagsObject == 0 || a.t.objectFlags&ObjectFlagsReference == 0 {
		return nil
	}
	return wrapTypes(a.t.AsTypeReference().resolvedTypeArguments)
}

func (a *tracedTypeAdapter) ReferenceNode() *ast.Node {
	if a.t.flags&TypeFlagsObject == 0 || a.t.objectFlags&ObjectFlagsReference == 0 {
		return nil
	}
	return a.t.AsTypeReference().node
}

func (a *tracedTypeAdapter) ReverseMappedSourceType() tracing.TracedType {
	if a.t.flags&TypeFlagsObject == 0 || a.t.objectFlags&ObjectFlagsReverseMapped == 0 {
		return nil
	}
	t := a.t.AsReverseMappedType().source
	if t == nil {
		return nil
	}
	return wrapType(t)
}

func (a *tracedTypeAdapter) ReverseMappedMappedType() tracing.TracedType {
	if a.t.flags&TypeFlagsObject == 0 || a.t.objectFlags&ObjectFlagsReverseMapped == 0 {
		return nil
	}
	t := a.t.AsReverseMappedType().mappedType
	if t == nil {
		return nil
	}
	return wrapType(t)
}

func (a *tracedTypeAdapter) ReverseMappedConstraintType() tracing.TracedType {
	if a.t.flags&TypeFlagsObject == 0 || a.t.objectFlags&ObjectFlagsReverseMapped == 0 {
		return nil
	}
	t := a.t.AsReverseMappedType().constraintType
	if t == nil {
		return nil
	}
	return wrapType(t)
}

func (a *tracedTypeAdapter) EvolvingArrayElementType() tracing.TracedType {
	if a.t.flags&TypeFlagsObject == 0 || a.t.objectFlags&ObjectFlagsEvolvingArray == 0 {
		return nil
	}
	t := a.t.AsEvolvingArrayType().elementType
	if t == nil {
		return nil
	}
	return wrapType(t)
}

func (a *tracedTypeAdapter) EvolvingArrayFinalType() tracing.TracedType {
	if a.t.flags&TypeFlagsObject == 0 || a.t.objectFlags&ObjectFlagsEvolvingArray == 0 {
		return nil
	}
	t := a.t.AsEvolvingArrayType().finalArrayType
	if t == nil {
		return nil
	}
	return wrapType(t)
}

func (a *tracedTypeAdapter) IsTuple() bool {
	return a.t.objectFlags&ObjectFlagsTuple != 0
}

func (a *tracedTypeAdapter) Pattern() *ast.Node {
	if a.checker == nil {
		return nil
	}
	return a.checker.patternForType[a.t]
}

func (a *tracedTypeAdapter) RecursionIdentity() any {
	return getRecursionIdentity(a.t).value
}

func (a *tracedTypeAdapter) Display() string {
	// Compute display text for types where it's valuable for trace analysis.
	// TypeScript only does this for Anonymous|Literal types, but we extend to
	// unions, intersections, and template literals since they often lack
	// firstDeclaration and the display text helps identify them.
	// Incomplete types during tracing can cause panics, which we intentionally
	// suppress (returning ""), matching TypeScript's try/catch around typeToString.
	if a.checker == nil {
		return ""
	}
	if a.t.objectFlags&ObjectFlagsAnonymous != 0 ||
		a.t.flags&(TypeFlagsLiteral|TypeFlagsTemplateLiteral|TypeFlagsUnion|TypeFlagsIntersection) != 0 {
		defer func() {
			_ = recover()
		}()
		return a.checker.TypeToString(a.t)
	}
	return ""
}

func wrapType(t *Type) tracing.TracedType {
	if t == nil {
		return nil
	}
	return &tracedTypeAdapter{t: t, checker: t.checker}
}

func wrapTypes(types []*Type) []tracing.TracedType {
	if len(types) == 0 {
		return nil
	}
	result := make([]tracing.TracedType, len(types))
	for i, t := range types {
		result[i] = wrapType(t)
	}
	return result
}
