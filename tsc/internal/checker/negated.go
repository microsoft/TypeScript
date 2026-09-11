package checker

import (
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/core"
)

// newNegatedType creates a new negated type 'not baseType'.
func (c *Checker) newNegatedType(baseType *Type, flags ObjectFlags) *Type {
	data := &NegatedType{}
	data.baseType = baseType
	return c.newType(TypeFlagsNegated, flags, data)
}

// getNegatedType constructs the type 'not T', applying the negation identities:
//
//	not any      => any
//	not unknown  => never
//	not never    => unknown
//	not not T    => T
//	not (A | B)  => not A & not B   (De Morgan)
//
// All other types are wrapped in a (cached) NegatedType.
func (c *Checker) getNegatedType(t *Type) *Type {
	switch {
	case t.flags&TypeFlagsAny != 0:
		return t
	case t.flags&TypeFlagsUnknown != 0:
		return c.neverType
	case t.flags&TypeFlagsNever != 0:
		return c.unknownType
	case t.flags&TypeFlagsNegated != 0:
		return t.AsNegatedType().baseType
	case t.flags&TypeFlagsUnion != 0:
		return c.getIntersectionType(core.Map(t.Types(), c.getNegatedType))
	}
	if cached := c.negatedTypes[t.id]; cached != nil {
		return cached
	}
	result := c.newNegatedType(t, ObjectFlagsNone)
	result.AsNegatedType().regularType = result
	result.AsNegatedType().freshType = c.newNegatedType(t, ObjectFlagsFreshNegated)
	result.AsNegatedType().freshType.AsNegatedType().regularType = result
	result.AsNegatedType().freshType.AsNegatedType().freshType = result.AsNegatedType().freshType
	c.negatedTypes[t.id] = result
	return result
}

// getFreshNegatedType is like getNegatedType, but the leaf negated types it constructs are marked
// fresh (ObjectFlagsFreshNegated). Fresh negated types are those introduced by control flow
// narrowing (as opposed to written explicitly by the user); they are widened away by getWidenedType
// when a narrowed type escapes into an inferred declaration, so they never leak into emitted
// declaration files.
func (c *Checker) getFreshNegatedType(t *Type) *Type {
	negated := c.getNegatedType(t)
	if negated.flags&TypeFlagsNegated == 0 {
		return negated
	}
	return negated.AsNegatedType().freshType
}

// isFreshNegatedType reports whether t is a fresh negated type introduced by control flow narrowing.
func isFreshNegatedType(t *Type) bool {
	return t.flags&TypeFlagsNegated != 0 && t.objectFlags&ObjectFlagsFreshNegated != 0
}

// containsFreshNegatedType reports whether t is a fresh negated type or (transitively) contains one
// within a union or intersection. ObjectFlagsFreshNegated is a TypeFlagsNegated-only flag (its bit
// is reused for other meanings on unions and intersections), so it must never be read directly on a
// container type; this helper recurses instead.
func containsFreshNegatedType(t *Type) bool {
	if isFreshNegatedType(t) {
		return true
	}
	if t.flags&TypeFlagsUnionOrIntersection != 0 {
		return core.Some(t.Types(), containsFreshNegatedType)
	}
	return false
}

// containsNegatedType reports whether t is a negated type or (transitively) contains one within a
// union or intersection. It is used to decide whether a location wants a negation (and should
// therefore preserve a fresh control-flow negation rather than widening it away).
func containsNegatedType(t *Type) bool {
	if t == nil {
		return false
	}
	if t.flags&TypeFlagsNegated != 0 {
		return true
	}
	if t.flags&TypeFlagsUnionOrIntersection != 0 {
		return core.Some(t.Types(), containsNegatedType)
	}
	return false
}

// removeFreshNegatedTypes strips fresh negated types (introduced by control flow narrowing) from t.
// It is used at inference barriers that do not go through getWidenedType (such as inferred type
// predicates) so that a CFA-introduced 'not X' never leaks into an inferred declaration.
func (c *Checker) removeFreshNegatedTypes(t *Type) *Type {
	if !containsFreshNegatedType(t) {
		return t
	}
	return c.removeFreshNegatedTypesEx(t, false)
}

func (c *Checker) removeFreshNegatedTypesEx(t *Type, intersectionMember bool) *Type {
	return c.mapType(t, func(t *Type) *Type {
		if isFreshNegatedType(t) {
			if intersectionMember {
				return c.unknownType
			}
			return c.neverType
		}
		if t.flags&TypeFlagsIntersection != 0 {
			return c.getIntersectionType(core.Map(t.Types(), func(t *Type) *Type {
				return c.removeFreshNegatedTypesEx(t, true)
			}))
		}
		return t
	})
}

func (c *Checker) getRegularNegatedTypes(t *Type) *Type {
	if !containsFreshNegatedType(t) {
		return t
	}
	return c.mapType(t, func(t *Type) *Type {
		if t.flags&TypeFlagsNegated != 0 {
			return t.AsNegatedType().regularType
		}
		if t.flags&TypeFlagsIntersection != 0 {
			return c.getIntersectionType(core.Map(t.Types(), c.getRegularNegatedTypes))
		}
		return t
	})
}

func (c *Checker) removeOrRegularizeNegatedTypes(t *Type, remove bool) *Type {
	if remove {
		return c.removeFreshNegatedTypes(t)
	}
	return c.getRegularNegatedTypes(t)
}

// removeComplementaryFreshNegatedTypes cancels complementary members of a union that were produced
// by the true and false branches of a control-flow narrowing. When both a refined type 'Base & C'
// and its negated complement 'Base & not C' appear in the union, they cover all of 'Base', so both
// are replaced by the common supertype 'Base'. For example, when the branches of
//
//	if (crate.isPackedTight()) { ... }
//
// rejoin, the union '(Crate<any> & {extraContents}) | (Crate<any> & not (Crate<any> & {extraContents}))'
// simplifies back to just 'Crate<any>'. This is gated on ObjectFlagsFreshNegated so it only affects
// negations introduced by narrowing, not negations written explicitly by the user.
//
// The input slice is assumed to be sorted (per CompareTypes); the result remains sorted.
func (c *Checker) removeComplementaryFreshNegatedTypes(types []*Type) []*Type {
	for i := 0; i < len(types); i++ {
		n := types[i]
		if n.flags&TypeFlagsIntersection == 0 || !core.Some(n.Types(), isFreshNegatedType) {
			continue
		}
		members := n.Types()
		for _, m := range members {
			if !isFreshNegatedType(m) {
				continue
			}
			// 'base' is 'n' with this one negation removed; 'positive' is 'base' with the negation's
			// base type intersected back in (i.e. the corresponding true-branch member).
			rest := core.Filter(members, func(other *Type) bool { return other != m })
			if len(rest) == 0 {
				continue
			}
			base := c.getIntersectionType(rest)
			positive := c.getIntersectionType([]*Type{base, m.AsNegatedType().baseType})
			// Find the true-branch counterpart P. Narrowing may have reduced it (e.g. 'Crate<any> &
			// Crate<Sundries>' to just 'Crate<Sundries>'), so match structurally: any P with
			// (base & C) <: P <: base satisfies 'P | (base & not C) == base'.
			j := -1
			for k, p := range types {
				if k != i && c.isTypeSubtypeOf(p, base) && c.isTypeSubtypeOf(positive, p) {
					j = k
					break
				}
			}
			if j < 0 {
				continue
			}
			lo, hi := i, j
			if lo > hi {
				lo, hi = hi, lo
			}
			types = slices.Delete(types, hi, hi+1)
			types = slices.Delete(types, lo, lo+1)
			types, _ = insertType(types, base)
			i = -1 // Restart the scan since the set changed.
			break
		}
	}
	if core.Some(types, isNegatedType) {
		// Union type construction does this reduction *before* this intersection one - it may need to be checked again with the updated type set.
		if c.checkForSaturatedNegatedType(types) {
			return []*Type{c.unknownType}
		}
	}
	return types
}

// checkForUnsatisfiedNegatedType returns true if the intersection in typeSet is empty (never)
// because some non-negated member is a subtype of the union of the negated members' base types.
// For example, in '"w" & not string' the non-negated member '"w"' is a subtype of 'string'
// (the base type of 'not string'), so the intersection reduces to never.
func (c *Checker) checkForUnsatisfiedNegatedType(typeSet []*Type) bool {
	nonNegatedSet := core.Filter(typeSet, func(t *Type) bool { return t.flags&TypeFlagsNegated == 0 })
	if len(nonNegatedSet) == 0 {
		return false
	}
	negatedBounds := c.getUnionType(core.Map(core.Filter(typeSet, isNegatedType), func(t *Type) *Type {
		return t.AsNegatedType().baseType
	}))
	for _, nonNegatedType := range nonNegatedSet {
		if c.isTypeSubtypeOf(nonNegatedType, negatedBounds) {
			return true
		}
	}
	return false
}

// checkForSaturatedNegatedType returns true if the union in typeSet covers every value (i.e. is the
// unknown type) because it contains a type and its complement. This is the union converse of
// checkForUnsatisfiedNegatedType: when a negated member 'not B' is combined with non-negated members
// whose union is a supertype of 'B', the non-negated part covers 'B' and 'not B' covers everything
// else, so the union is unknown. For example, 'T | not T' reduces to unknown, and 'string | not "w"'
// reduces to unknown because '"w"' is a subtype of 'string'.
func (c *Checker) checkForSaturatedNegatedType(typeSet []*Type) bool {
	nonNegatedSet := core.Filter(typeSet, func(t *Type) bool { return t.flags&TypeFlagsNegated == 0 })
	if len(nonNegatedSet) == 0 {
		return false
	}
	nonNegatedUnion := c.getUnionType(nonNegatedSet)
	for _, negatedType := range core.Filter(typeSet, isNegatedType) {
		if c.isTypeSubtypeOf(negatedType.AsNegatedType().baseType, nonNegatedUnion) {
			return true
		}
	}
	return false
}

// removeNegatedSubtypes removes redundant negated members from an intersection. A member 'not X'
// is redundant when the combined non-negated part of the intersection is already a subtype of
// 'not X' (i.e. it is disjoint from X). For example, in 'false & not true' the non-negated part
// 'false' is a subtype of 'not true', so 'not true' is dropped, leaving just 'false'.
//
// A member 'not X' is also redundant when the non-negated part is mutually exclusive with X by
// virtue of a shared discriminant property (see isDisjointByDiscriminant). For example, given
// discriminated types 'A = { kind: "a" }' and 'C = { kind: "c" }', the intersection 'C & not A'
// reduces to 'C' because no value of type C can be an A.
func (c *Checker) removeNegatedSubtypes(types []*Type) []*Type {
	if len(types) == 0 {
		return types
	}
	nonNegatedBounds := core.Filter(types, func(t *Type) bool { return t.flags&TypeFlagsNegated == 0 })
	if len(nonNegatedBounds) == 0 {
		return types
	}
	nonNegativePart := c.getIntersectionType(nonNegatedBounds)
	for i := len(types) - 1; i >= 0; i-- {
		if types[i].flags&TypeFlagsNegated == 0 {
			continue
		}
		negatedBase := types[i].AsNegatedType().baseType
		if c.isTypeSubtypeOf(nonNegativePart, types[i]) || c.isDisjointByDiscriminant(nonNegativePart, negatedBase) {
			types = slices.Delete(types, i, i+1)
		}
	}
	return types
}

// isDisjointByDiscriminant reports whether types 'a' and 'b' are provably mutually exclusive because
// they share a discriminant property whose types in 'a' and 'b' have an empty (never) intersection.
// For example '{ kind: "c" }' and '{ kind: "a" }' are disjoint by their 'kind' property, so
// 'C & not A' reduces to 'C'.
//
// Discriminant properties are located with findDiscriminantProperties over the union 'a | b' -- the
// same mechanism used for discriminated-union narrowing -- and disjointness of a single discriminant
// is decided by intersecting the two property types and checking for never. Deciding disjointness by
// intersecting the property types (rather than comparing them by identity) is important: an enum
// literal such as 'E.A' (where 'enum E { A = "a" }') is a distinct type from the string literal '"a"'
// yet is not mutually exclusive with it, so 'E.A & "a"' is not never.
//
// Only the (small, literal) discriminant property types are intersected here, never the full input
// types, so this stays cheap and avoids the circularities a general 'a & b is never' computation
// would risk during intersection construction.
func (c *Checker) isDisjointByDiscriminant(a *Type, b *Type) bool {
	union := c.getUnionType([]*Type{a, b})
	if union.flags&TypeFlagsUnion == 0 {
		// 'a' and 'b' collapsed into a single type (e.g. one is a subtype of the other), so there is
		// no discriminant to distinguish them.
		return false
	}
	for _, prop := range c.findDiscriminantProperties(c.getPropertiesOfType(a), union) {
		aPropType := c.getTypeOfPropertyOfType(a, prop.Name)
		bPropType := c.getTypeOfPropertyOfType(b, prop.Name)
		if aPropType != nil && bPropType != nil && c.getIntersectionType([]*Type{aPropType, bPropType}).flags&TypeFlagsNever != 0 {
			return true
		}
	}
	return false
}
