package compiler

import (
	"strconv"
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
	return s.name // !!!
}

func (c *Checker) typeToString(t *Type) string {
	p := c.newPrinter()
	p.printType(t)
	return p.string()
}

func (c *Checker) typeAliasToString(d *TypeAliasDeclaration) string {
	p := c.newPrinter()
	p.printTypeAlias(d)
	return p.string()
}

type Printer struct {
	c     *Checker
	sb    strings.Builder
	depth int
}

func (c *Checker) newPrinter() *Printer {
	return &Printer{c: c}
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
	switch {
	case t.flags&TypeFlagsIntrinsic != 0:
		p.print(t.AsIntrinsicType().intrinsicName)
	case t.flags&TypeFlagsLiteral != 0:
		p.printLiteralType(t)
	case t.flags&TypeFlagsObject != 0:
		p.printObjectType(t)
	case t.flags&TypeFlagsTypeParameter != 0:
		p.printTypeParameter(t)
	case t.flags&TypeFlagsUnion != 0:
		p.printUnionType(t)
	case t.flags&TypeFlagsIntersection != 0:
		p.printIntersectionType(t)
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
		case PseudoBigint:
			p.printBigintLiteral(value)
		}
	}
}

func (p *Printer) printStringLiteral(s string) {
	p.print("\"")
	p.print(s)
	p.print("\"")
}

func (p *Printer) printNumberLiteral(f float64) {
	p.print(strconv.FormatFloat(f, 'g', -1, 64))
}

func (p *Printer) printBooleanLiteral(b bool) {
	p.print(ifElse(b, "true", "false"))
}

func (p *Printer) printBigintLiteral(b PseudoBigint) {
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
	case p.c.isArrayType(t):
		p.printArrayType(t)
	case p.c.isTupleType(t):
		p.printTupleType(t)
	default:
		p.printTypeReference(t)
	}
}

func (p *Printer) printTypeReference(t *Type) {
	p.print(t.symbol.name)
	typeArguments := p.c.getTypeArguments(t)
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
	d := t.AsParameterizedType()
	if d.target != p.c.globalArrayType {
		p.print("readonly ")
	}
	p.printTypeEx(p.c.getTypeArguments(t)[0], TypePrecedencePostfix)
	p.print("[]")

}
func (p *Printer) printTupleType(t *Type) {
	tail := false
	p.print("[")
	elementInfos := t.TargetInterfaceType().tupleData.elementInfos
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
	if p.depth != 0 {
		p.print("???")
		return
	}
	p.depth++
	props := p.c.getPropertiesOfObjectType(t)
	sortSymbols(props)
	p.print("{")
	var tail bool
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
	p.depth--
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
		var tail bool
		for _, t := range p.c.formatUnionTypes(t.AsUnionType().types) {
			if tail {
				p.print(" | ")
			}
			p.printTypeEx(t, TypePrecedenceUnion)
			tail = true
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
	p.printType(t)
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
