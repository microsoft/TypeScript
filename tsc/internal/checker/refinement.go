package checker

import "github.com/microsoft/TypeScript/tsc/internal/core"

func (c *Checker) getNullableTypeFlags(t *Type) TypeFlags {
	base := c.getBaseConstraintOrType(t)
	if base.flags&TypeFlagsUnion != 0 {
		var flags TypeFlags
		for _, member := range base.Types() {
			flags |= c.getNullableTypeFlags(member)
		}
		if flags&TypeFlagsUndefined != 0 && c.isIntersectionEmpty(t, c.undefinedType) {
			flags &^= TypeFlagsUndefined
		}
		if flags&TypeFlagsNull != 0 && c.isIntersectionEmpty(t, c.nullType) {
			flags &^= TypeFlagsNull
		}
		return flags
	}
	return base.flags & TypeFlagsNullable
}

func (c *Checker) getNonNullableType(t *Type) *Type {
	return c.mapType(t, func(t *Type) *Type {
		if t.flags&(TypeFlagsNullable|TypeFlagsVoid) != 0 {
			return c.neverType
		}
		if t.flags&TypeFlagsUnknown != 0 {
			return c.unknownEmptyObjectType
		}
		base := c.getBaseConstraintOrType(t)
		if everyType(base, func(t *Type) bool { return t.flags&(TypeFlagsNullable|TypeFlagsVoid) != 0 }) {
			return c.neverType
		}
		if c.isIntersectionEmpty(base, c.nullishType) {
			return t
		}
		return c.getGlobalNonNullableTypeInstantiation(t)
	})
}

func (c *Checker) getTypeWithoutUndefined(t *Type) *Type {
	return c.getTypeWithoutNullable(t, c.undefinedType)
}

// Express nullable complements with {} so indexed-access normalization can remove optionality.
func (c *Checker) getTypeWithoutNullable(t *Type, nullable *Type) *Type {
	if !c.strictNullChecks {
		return c.filterType(t, func(t *Type) bool {
			return t.flags&nullable.flags == 0 && (nullable != c.undefinedType || t.flags&TypeFlagsVoid == 0)
		})
	}
	other := core.IfElse(nullable == c.undefinedType, c.nullType, c.undefinedType)
	includesOther := c.getNullableTypeFlags(t)&other.flags != 0
	return c.mapType(t, func(t *Type) *Type {
		base := c.getBaseConstraintOrType(t)
		if nullable == c.undefinedType && t.flags&TypeFlagsVoid != 0 {
			return c.neverType
		}
		if c.isIntersectionEmpty(t, nullable) || c.isIntersectionEmpty(base, nullable) {
			return t
		}
		refinement := core.IfElse(t.flags&TypeFlagsUnknown != 0, c.unknownEmptyObjectType, c.emptyObjectType)
		if !includesOther && !c.isIntersectionEmpty(base, other) {
			refinement = c.getUnionType([]*Type{refinement, other})
		}
		return c.getIntersectionType([]*Type{t, refinement})
	})
}

func (c *Checker) getTruthyType(t *Type) *Type {
	t = c.filterType(t, func(t *Type) bool {
		return !c.maybeTypeOfKind(t, TypeFlagsVoid|TypeFlagsNullable) &&
			(!isUnitType(t) || c.getDefinitelyFalsyPartOfType(t).flags&TypeFlagsNever != 0)
	})
	if c.isNonPrimitiveForRefinement(t) {
		return t
	}
	if c.strictNullChecks {
		t = c.getNonNullableType(t)
	}
	return c.introduceNegationIntoNarrowedType(t, c.falsyType)
}

func (c *Checker) getFalsyType(t *Type) *Type {
	if !c.strictNullChecks {
		// Every type can contain null when strict null checks are disabled.
		return t
	}
	return c.mapType(t, func(t *Type) *Type {
		if c.maybeTypeOfKind(t, TypeFlagsVoid|TypeFlagsNullable) {
			return t
		}
		if isUnitType(t) {
			return c.getDefinitelyFalsyPartOfType(t)
		}
		if c.isNonPrimitiveForRefinement(t) {
			return c.neverType
		}
		return c.getIntersectionType([]*Type{t, c.falsyType})
	})
}

func (c *Checker) isNonPrimitiveForRefinement(t *Type) bool {
	t = c.getBaseConstraintOrType(t)
	if t.flags&TypeFlagsUnion != 0 {
		return core.Every(t.Types(), c.isNonPrimitiveForRefinement)
	}
	if t.flags&TypeFlagsIntersection != 0 {
		// Object constituents can be brands on primitive values.
		return !c.maybeTypeOfKind(t, TypeFlagsPrimitive) && core.Some(t.Types(), c.isNonPrimitiveForRefinement)
	}
	return t.flags&TypeFlagsNonPrimitive != 0 ||
		t.flags&TypeFlagsObject != 0 && !(t.objectFlags&ObjectFlagsAnonymous != 0 && c.isEmptyObjectType(t))
}

func (c *Checker) narrowTypeByTruthValue(t *Type, assumeTrue bool) *Type {
	if assumeTrue {
		return c.getTruthyType(t)
	}
	return c.getFalsyType(t)
}

func (c *Checker) narrowTypeByNullish(t *Type, assumePresent bool) *Type {
	if assumePresent {
		return c.getNonNullableType(t)
	}
	return c.getIntersectionType([]*Type{t, c.nullishType})
}

var typeofNames = []string{"bigint", "boolean", "function", "number", "object", "string", "symbol", "undefined"}

func (c *Checker) getTypeofType(typeName string) *Type {
	switch typeName {
	case "string":
		return c.stringType
	case "number":
		return c.numberType
	case "bigint":
		return c.bigintType
	case "boolean":
		return c.booleanType
	case "symbol":
		return c.esSymbolType
	case "undefined":
		return c.undefinedType
	case "function":
		return c.globalFunctionType
	case "object":
		return c.getUnionType([]*Type{c.nonPrimitiveType, c.nullType})
	}
	return c.nonPrimitiveType
}

func (c *Checker) narrowTypeByTypeName(t *Type, typeName string) *Type {
	if t.flags&TypeFlagsAny != 0 {
		if typeName == "object" || typeName == "function" {
			return t
		}
		return c.getTypeofType(typeName)
	}
	implied := c.getTypeofType(typeName)
	return c.mapType(t, func(t *Type) *Type {
		base := c.getBaseConstraintOrType(t)
		refinement := implied
		if base != t {
			if c.narrowTypeByTypeName(base, typeName).flags&TypeFlagsNever != 0 {
				return c.neverType
			}
			if typeName == "object" && c.isIntersectionEmpty(base, c.nullType) {
				refinement = c.nonPrimitiveType
			}
		} else {
			switch typeName {
			case "function":
				if c.maybeTypeOfKind(base, TypeFlagsPrimitive) || base.flags&TypeFlagsNonPrimitive != 0 ||
					base.flags&TypeFlagsObject != 0 && !c.isEmptyObjectType(base) && !c.isFunctionObjectType(base) {
					return c.neverType
				}
			case "object":
				if base.flags&TypeFlagsPrimitive != 0 && base.flags&TypeFlagsNull == 0 ||
					base.flags&TypeFlagsObject != 0 && c.isFunctionObjectType(base) {
					return c.neverType
				}
			default:
				if implied.flags&TypeFlagsPrimitive != 0 && c.isNonPrimitiveForRefinement(base) && !c.isTypeSubtypeOf(implied, base) {
					return c.neverType
				}
			}
		}
		if c.isTypeStrictSubtypeOf(t, refinement) {
			return t
		}
		if c.isTypeSubtypeOf(refinement, t) {
			return refinement
		}
		if typeName == "object" && c.isNonPrimitiveForRefinement(t) {
			return t
		}
		return c.getIntersectionType([]*Type{t, refinement})
	})
}

func (c *Checker) narrowTypeByTypeofName(t *Type, typeName string, assumeTrue bool) *Type {
	if assumeTrue {
		return c.narrowTypeByTypeName(t, typeName)
	}
	// TODO: Revisit this workaround if https://github.com/microsoft/TypeScript/pull/64376 is merged.
	if typeName == "undefined" {
		return c.getTypeWithoutUndefined(t)
	}
	if typeName == "object" {
		// Callable objects have typeof "function", so excluding object structurally would be too broad.
		t = c.filterType(t, func(t *Type) bool {
			base := c.getBaseConstraintOrType(t)
			if base != t {
				return c.narrowTypeByTypeofName(base, typeName, false).flags&TypeFlagsNever == 0
			}
			return base.flags&(TypeFlagsNonPrimitive|TypeFlagsNull) == 0 &&
				(base.flags&TypeFlagsObject == 0 || base.objectFlags&ObjectFlagsAnonymous != 0 && c.isEmptyObjectType(base) || c.isFunctionObjectType(base))
		})
		return t
	}
	return c.introduceNegationIntoNarrowedType(t, c.getTypeofType(typeName))
}

func (c *Checker) getTypeOutsideTypeofSwitch(t *Type, start int, end int, witnesses []string) *Type {
	for i, witness := range witnesses {
		if (i < start || i >= end) && witness != "" {
			t = c.narrowTypeByTypeofName(t, witness, false)
		}
	}
	return t
}
