package compiler

import (
	"strings"
)

type TypePrecedence int32

const (
	TypePrecedenceConditional TypePrecedence = iota
	TypePrecedenceUnion
	TypePrecedenceIntersection
	TypePrecedenceTypeOperator
	TypePrecedencePostfix
	TypePrecedenceNonArray
)

func (c *Checker) getTypePrecedence(t *Type) TypePrecedence {
	switch {
	case t.flags&TypeFlagsConditional != 0:
		return TypePrecedenceConditional
	case t.flags&TypeFlagsIntersection != 0:
		return TypePrecedenceIntersection
	case t.flags&TypeFlagsUnion != 0:
		return TypePrecedenceUnion
	case t.flags&TypeFlagsIndex != 0:
		return TypePrecedenceTypeOperator
	case c.isArrayType(t):
		return TypePrecedencePostfix
	default:
		return TypePrecedenceNonArray
	}
}

func (c *Checker) symbolToString(s *Symbol) string {
	if s.valueDeclaration != nil {
		name := getNameOfDeclaration(s.valueDeclaration)
		if name != nil {
			if isIdentifier(name) {
				return getTextOfNode(name)
			}
			return "[" + getTextOfNode(name) + "]"
		}
	}
	return s.name
}

func (c *Checker) typeToString(t *Type) string {
	return c.typeToStringEx(t, nil, TypeFormatFlagsNone)
}

func (c *Checker) typeToStringEx(t *Type, enclosingDeclaration *Node, flags TypeFormatFlags) string {
	p := c.newPrinter(flags)
	p.printType(t)
	return p.string()
}

func (c *Checker) typeAliasToString(d *TypeAliasDeclaration) string {
	p := c.newPrinter(TypeFormatFlagsInTypeAlias)
	p.printTypeAlias(d)
	return p.string()
}

func (c *Checker) signatureToString(s *Signature) string {
	p := c.newPrinter(TypeFormatFlagsNone)
	if s.flags&SignatureFlagsConstruct != 0 {
		p.print("new")
	}
	p.printSignature(s, ": ")
	return p.string()
}

func (c *Checker) typePredicateToString(t *TypePredicate) string {
	p := c.newPrinter(TypeFormatFlagsNone)
	p.printTypePredicate(t)
	return p.string()
}

type Printer struct {
	c       *Checker
	flags   TypeFormatFlags
	sb      strings.Builder
	visited set[*Type]
	depth   int
}

func (c *Checker) newPrinter(flags TypeFormatFlags) *Printer {
	return &Printer{c: c, flags: flags}
}

func (p *Printer) string() string {
	return p.sb.String()
}

func (p *Printer) print(s string) {
	p.sb.WriteString(s)
}

func (p *Printer) printTypeEx(t *Type, precedence TypePrecedence) {
	if p.c.getTypePrecedence(t) < precedence {
		p.print("(")
		p.printType(t)
		p.print(")")
	} else {
		p.printType(t)
	}
}

func (p *Printer) printType(t *Type) {
	if t.alias != nil && (p.flags&TypeFormatFlagsInTypeAlias == 0 || p.depth > 0) {
		p.print(t.alias.symbol.name)
		p.printTypeArguments(t.alias.typeArguments)
	} else {
		p.printTypeNoAlias(t)
	}
}

func (p *Printer) printTypeNoAlias(t *Type) {
	switch {
	case t.flags&TypeFlagsIntrinsic != 0:
		p.print(t.AsIntrinsicType().intrinsicName)
	case t.flags&TypeFlagsLiteral != 0:
		p.printLiteralType(t)
	case t.flags&TypeFlagsUnion != 0:
		p.printUnionType(t)
	case t.flags&TypeFlagsIntersection != 0:
		p.printIntersectionType(t)
	case t.flags&TypeFlagsTypeParameter != 0:
		p.printTypeParameter(t)
	case t.flags&TypeFlagsObject != 0:
		p.printRecursive(t, (*Printer).printObjectType)
	case t.flags&TypeFlagsIndex != 0:
		p.printRecursive(t, (*Printer).printIndexType)
	case t.flags&TypeFlagsIndexedAccess != 0:
		p.printRecursive(t, (*Printer).printIndexedAccessType)
	}
}

func (p *Printer) printRecursive(t *Type, f func(*Printer, *Type)) {
	if !p.visited.has(t) && p.depth < 10 {
		p.visited.add(t)
		p.depth++
		f(p, t)
		p.depth--
	} else {
		p.print("???")
	}
}

func (p *Printer) printLiteralType(t *Type) {
	if t.flags&TypeFlagsEnumLiteral != 0 {
		p.printEnumLiteral(t)
	} else {
		switch value := t.AsLiteralType().value.(type) {
		case string:
			p.printStringLiteral(value)
		case float64:
			p.printNumberLiteral(value)
		case bool:
			p.printBooleanLiteral(value)
		case PseudoBigInt:
			p.printBigIntLiteral(value)
		}
	}
}

func (p *Printer) printStringLiteral(s string) {
	p.print("\"")
	p.print(s)
	p.print("\"")
}

func (p *Printer) printNumberLiteral(f float64) {
	p.print(numberToString(f))
}

func (p *Printer) printBooleanLiteral(b bool) {
	p.print(ifElse(b, "true", "false"))
}

func (p *Printer) printBigIntLiteral(b PseudoBigInt) {
	if b.negative {
		p.print("-")
	}
	p.print(b.base10Value)
}

func (p *Printer) printEnumLiteral(t *Type) {
	p.print(p.c.getParentOfSymbol(t.symbol).name)
	p.print(".")
	p.print(t.symbol.name)
}

func (p *Printer) printObjectType(t *Type) {
	switch {
	case t.objectFlags&ObjectFlagsReference != 0:
		p.printParameterizedType(t)
	case t.objectFlags&ObjectFlagsClassOrInterface != 0:
		p.print(t.symbol.name)
	default:
		p.printAnonymousType(t)
	}
}

func (p *Printer) printParameterizedType(t *Type) {
	switch {
	case p.c.isArrayType(t) && p.flags&TypeFormatFlagsWriteArrayAsGenericType == 0:
		p.printArrayType(t)
	case isTupleType(t):
		p.printTupleType(t)
	default:
		p.printTypeReference(t)
	}
}

func (p *Printer) printTypeReference(t *Type) {
	p.print(t.symbol.name)
	p.printTypeArguments(p.c.getTypeArguments(t)[:p.c.getTypeReferenceArity(t)])
}

func (p *Printer) printTypeArguments(typeArguments []*Type) {
	if len(typeArguments) != 0 {
		p.print("<")
		tail := false
		for _, t := range typeArguments {
			if tail {
				p.print(", ")
			}
			p.printType(t)
			tail = true
		}
		p.print(">")
	}
}

func (p *Printer) printArrayType(t *Type) {
	d := t.AsTypeReference()
	if d.target != p.c.globalArrayType {
		p.print("readonly ")
	}
	p.printTypeEx(p.c.getTypeArguments(t)[0], TypePrecedencePostfix)
	p.print("[]")

}
func (p *Printer) printTupleType(t *Type) {
	tail := false
	p.print("[")
	elementInfos := t.TargetTupleType().elementInfos
	for i, t := range p.c.getTypeArguments(t) {
		if tail {
			p.print(", ")
		}
		info := elementInfos[i]
		if info.flags&ElementFlagsVariable != 0 {
			p.print("...")
		}
		if info.flags&ElementFlagsOptional != 0 {
			p.printTypeEx(t, TypePrecedencePostfix)
			p.print("?")
		} else if info.flags&ElementFlagsRest != 0 {
			p.printTypeEx(t, TypePrecedencePostfix)
			p.print("[]")
		} else {
			p.printType(t)
		}
		tail = true
	}
	p.print("]")
}

func (p *Printer) printAnonymousType(t *Type) {
	props := p.c.getPropertiesOfObjectType(t)
	callSignatures := p.c.getSignaturesOfType(t, SignatureKindCall)
	constructSignatures := p.c.getSignaturesOfType(t, SignatureKindConstruct)
	if len(props) == 0 {
		if len(callSignatures) == 1 && len(constructSignatures) == 0 {
			p.printSignature(callSignatures[0], " => ")
			return
		}
		if len(callSignatures) == 0 && len(constructSignatures) == 1 {
			p.print("new")
			p.printSignature(constructSignatures[0], " => ")
			return
		}
	}
	p.print("{")
	var tail bool
	for _, sig := range callSignatures {
		if tail {
			p.print(",")
		}
		p.print(" ")
		p.printSignature(sig, ": ")
		tail = true
	}
	for _, sig := range constructSignatures {
		if tail {
			p.print(",")
		}
		p.print(" new")
		p.printSignature(sig, ": ")
		tail = true
	}
	for _, info := range p.c.getIndexInfosOfType(t) {
		if tail {
			p.print(",")
		}
		p.print(" [")
		p.print(getNameFromIndexInfo(info))
		p.print(": ")
		p.printType(info.keyType)
		p.print("]: ")
		p.printType(info.valueType)
		tail = true
	}
	for _, prop := range props {
		if tail {
			p.print(",")
		}
		p.print(" ")
		p.print(prop.name)
		p.print(": ")
		p.printType(p.c.getTypeOfSymbol(prop))
		tail = true
	}
	if tail {
		p.print(" ")
	}
	p.print("}")
}

func (p *Printer) printSignature(sig *Signature, returnSeparator string) {
	if len(sig.typeParameters) != 0 {
		p.print("<")
		var tail bool
		for _, tp := range sig.typeParameters {
			if tail {
				p.print(", ")
			}
			p.print(tp.symbol.name)
			tail = true
		}
		p.print(">")
	}
	p.print("(")
	var tail bool
	for i, param := range sig.parameters {
		if tail {
			p.print(", ")
		}
		if sig.flags&SignatureFlagsHasRestParameter != 0 && i == len(sig.parameters)-1 {
			p.print("...")
			p.print(param.name)
		} else {
			p.print(param.name)
			if i >= int(sig.minArgumentCount) {
				p.print("?")
			}
		}
		p.print(": ")
		p.printType(p.c.getTypeOfSymbol(param))
		tail = true
	}
	p.print(")")
	p.print(returnSeparator)
	if pred := p.c.getTypePredicateOfSignature(sig); pred != nil {
		p.printTypePredicate(pred)
	} else {
		p.printType(p.c.getReturnTypeOfSignature(sig))
	}
}

func (p *Printer) printTypePredicate(pred *TypePredicate) {
	if pred.kind == TypePredicateKindAssertsThis || pred.kind == TypePredicateKindAssertsIdentifier {
		p.print("asserts ")
	}
	if pred.kind == TypePredicateKindThis || pred.kind == TypePredicateKindAssertsThis {
		p.print("this")
	} else {
		p.print(pred.parameterName)
	}
	if pred.kind == TypePredicateKindThis || pred.kind == TypePredicateKindIdentifier {
		p.print(" is ")
		p.printType(pred.t)
	}
}

func (p *Printer) printTypeParameter(t *Type) {
	if t.AsTypeParameter().isThisType {
		p.print("this")
	} else {
		p.print(t.symbol.name)
	}
}

func (p *Printer) printUnionType(t *Type) {
	switch {
	case t.flags&TypeFlagsBoolean != 0:
		p.print("boolean")
	case t.flags&TypeFlagsEnumLiteral != 0:
		p.print(t.symbol.name)
	default:
		u := t.AsUnionType()
		if u.origin != nil {
			p.printType(u.origin)
		} else {
			var tail bool
			for _, t := range p.c.formatUnionTypes(u.types) {
				if tail {
					p.print(" | ")
				}
				p.printTypeEx(t, TypePrecedenceUnion)
				tail = true
			}
		}
	}
}

func (p *Printer) printIntersectionType(t *Type) {
	var tail bool
	for _, t := range t.AsIntersectionType().types {
		if tail {
			p.print(" & ")
		}
		p.printTypeEx(t, TypePrecedenceIntersection)
		tail = true
	}
}

func (p *Printer) printIndexType(t *Type) {
	p.print("keyof ")
	p.printTypeEx(t.AsIndexType().target, TypePrecedenceTypeOperator)
}

func (p *Printer) printIndexedAccessType(t *Type) {
	p.printType(t.AsIndexedAccessType().objectType)
	p.print("[")
	p.printType(t.AsIndexedAccessType().indexType)
	p.print("]")
}

func (p *Printer) printTypeAlias(d *TypeAliasDeclaration) {
	p.print("type ")
	symbol := d.AsNode().Symbol()
	t := p.c.getDeclaredTypeOfSymbol(symbol)
	typeParameters := p.c.typeAliasLinks.get(symbol).typeParameters
	p.print(symbol.name)
	if len(typeParameters) != 0 {
		p.print("<")
		tail := false
		for _, t := range typeParameters {
			if tail {
				p.print(", ")
			}
			p.print(t.symbol.name)
			tail = true
		}
		p.print(">")
	}
	p.print(" = ")
	p.printTypeNoAlias(t)
}

func (c *Checker) formatUnionTypes(types []*Type) []*Type {
	var result []*Type
	var flags TypeFlags
	for i := 0; i < len(types); i++ {
		t := types[i]
		flags |= t.flags
		if t.flags&TypeFlagsNullable == 0 {
			if t.flags&(TypeFlagsBooleanLiteral|TypeFlagsEnumLike) != 0 {
				var baseType *Type
				if t.flags&TypeFlagsBooleanLiteral != 0 {
					baseType = c.booleanType
				} else {
					baseType = c.getBaseTypeOfEnumLikeType(t)
				}
				if baseType.flags&TypeFlagsUnion != 0 {
					count := len(baseType.AsUnionType().types)
					if i+count <= len(types) && c.getRegularTypeOfLiteralType(types[i+count-1]) == c.getRegularTypeOfLiteralType(baseType.AsUnionType().types[count-1]) {
						result = append(result, baseType)
						i += count - 1
						continue
					}
				}
			}
			result = append(result, t)
		}
	}
	if flags&TypeFlagsNull != 0 {
		result = append(result, c.nullType)
	}
	if flags&TypeFlagsUndefined != 0 {
		result = append(result, c.undefinedType)
	}
	return result
}
