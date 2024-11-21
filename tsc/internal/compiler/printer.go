package compiler

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
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
	if t.alias == nil {
		switch {
		case t.flags&TypeFlagsConditional != 0:
			return TypePrecedenceConditional
		case t.flags&TypeFlagsIntersection != 0:
			return TypePrecedenceIntersection
		case t.flags&TypeFlagsUnion != 0 && t.flags&TypeFlagsBoolean == 0:
			return TypePrecedenceUnion
		case t.flags&TypeFlagsIndex != 0:
			return TypePrecedenceTypeOperator
		case c.isArrayType(t):
			return TypePrecedencePostfix
		}
	}
	return TypePrecedenceNonArray
}

func (c *Checker) symbolToString(s *ast.Symbol) string {
	if s.ValueDeclaration != nil {
		name := getNameOfDeclaration(s.ValueDeclaration)
		if name != nil {
			if ast.IsIdentifier(name) {
				return getTextOfNode(name)
			}
			return "[" + getTextOfNode(name) + "]"
		}
	}
	return s.Name
}

func (c *Checker) typeToString(t *Type) string {
	return c.typeToStringEx(t, nil, TypeFormatFlagsNone)
}

func (c *Checker) typeToStringEx(t *Type, enclosingDeclaration *ast.Node, flags TypeFormatFlags) string {
	p := c.newPrinter(flags)
	p.printType(t)
	return p.string()
}

func (c *Checker) sourceFileWithTypes(sourceFile *ast.SourceFile) string {
	p := c.newPrinter(TypeFormatFlagsInTypeAlias)
	p.printSourceFileWithTypes(sourceFile)
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
	c        *Checker
	flags    TypeFormatFlags
	sb       strings.Builder
	printing core.Set[*Type]
	depth    int
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
		p.print(t.alias.symbol.Name)
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
	case t.flags&TypeFlagsTemplateLiteral != 0:
		p.printTemplateLiteralType(t)
	case t.flags&TypeFlagsStringMapping != 0:
		p.printStringMappingType(t)
	}
}

func (p *Printer) printRecursive(t *Type, f func(*Printer, *Type)) {
	if !p.printing.Has(t) && p.depth < 10 {
		p.printing.Add(t)
		p.depth++
		f(p, t)
		p.depth--
		p.printing.Delete(t)
	} else {
		p.print("???")
	}
}

func (p *Printer) printLiteralType(t *Type) {
	if t.flags&TypeFlagsEnumLiteral != 0 {
		p.printEnumLiteral(t)
	} else {
		p.printLiteralTypeValue(t)
	}
}

func (p *Printer) printLiteralTypeValue(t *Type) {
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

func (p *Printer) printStringLiteral(s string) {
	p.print("\"")
	p.print(s)
	p.print("\"")
}

func (p *Printer) printNumberLiteral(f float64) {
	p.print(core.NumberToString(f))
}

func (p *Printer) printBooleanLiteral(b bool) {
	p.print(core.IfElse(b, "true", "false"))
}

func (p *Printer) printBigIntLiteral(b PseudoBigInt) {
	if b.negative {
		p.print("-")
	}
	p.print(b.base10Value)
}

func (p *Printer) printTemplateLiteralType(t *Type) {
	texts := t.AsTemplateLiteralType().texts
	types := t.AsTemplateLiteralType().types
	p.print("`")
	p.print(texts[0])
	for i, t := range types {
		p.print("${")
		p.printType(t)
		p.print("}")
		p.print(texts[i+1])
	}
	p.print("`")
}

func (p *Printer) printStringMappingType(t *Type) {
	p.print(t.symbol.Name)
	p.print("<")
	p.printType(t.AsStringMappingType().target)
	p.print(">")
}

func (p *Printer) printEnumLiteral(t *Type) {
	p.print(p.c.getParentOfSymbol(t.symbol).Name)
	p.print(".")
	p.print(t.symbol.Name)
}

func (p *Printer) printObjectType(t *Type) {
	switch {
	case t.objectFlags&ObjectFlagsReference != 0:
		p.printParameterizedType(t)
	case t.objectFlags&ObjectFlagsClassOrInterface != 0:
		p.print(t.symbol.Name)
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
	p.print(t.symbol.Name)
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
		p.print(prop.Name)
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
			p.print(tp.symbol.Name)
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
			p.print(param.Name)
		} else {
			p.print(param.Name)
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
		p.print(t.symbol.Name)
	}
}

func (p *Printer) printUnionType(t *Type) {
	switch {
	case t.flags&TypeFlagsBoolean != 0:
		p.print("boolean")
	case t.flags&TypeFlagsEnumLiteral != 0:
		p.print(t.symbol.Name)
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

func (p *Printer) printSourceFileWithTypes(sourceFile *ast.SourceFile) {
	var pos int
	var visit func(*ast.Node) bool
	var typesPrinted bool
	lineStarts := scanner.GetLineStarts(sourceFile)
	printLinesBefore := func(node *ast.Node) {
		line := scanner.ComputeLineOfPosition(lineStarts, scanner.SkipTrivia(sourceFile.Text, node.Pos()))
		var nextLineStart int
		if line+1 < len(lineStarts) {
			nextLineStart = int(lineStarts[line+1])
		} else {
			nextLineStart = sourceFile.Loc.End()
		}
		if pos < nextLineStart {
			if typesPrinted {
				p.print("\n")
			}
			p.print(sourceFile.Text[pos:nextLineStart])
			pos = nextLineStart
			typesPrinted = false
		}
	}
	visit = func(node *ast.Node) bool {
		text, t, isDeclaration := p.c.getTextAndTypeOfNode(node)
		if text != "" && !strings.Contains(text, "\n") {
			printLinesBefore(node)
			p.print(">")
			p.print(text)
			p.print(" : ")
			p.printType(t)
			if isDeclaration && t.flags&TypeFlagsEnumLiteral != 0 && t.flags&(TypeFlagsStringLiteral|TypeFlagsNumberLiteral) != 0 {
				p.print(" = ")
				p.printLiteralTypeValue(t)
			}
			p.print("\n")
			typesPrinted = true
		}
		return node.ForEachChild(visit)
	}
	visit(sourceFile.AsNode())
	p.print(sourceFile.Text[pos:sourceFile.End()])
}

func (c *Checker) getTextAndTypeOfNode(node *ast.Node) (string, *Type, bool) {
	if ast.IsDeclarationNode(node) {
		symbol := node.Symbol()
		if symbol != nil && !isReservedMemberName(symbol.Name) {
			if symbol.Flags&ast.SymbolFlagsValue != 0 {
				return symbol.Name, c.getTypeOfSymbol(symbol), true
			}
			if symbol.Flags&ast.SymbolFlagsTypeAlias != 0 {
				return symbol.Name, c.getDeclaredTypeOfTypeAlias(symbol), true
			}
		}
	}
	if isExpressionNode(node) && !isRightSideOfQualifiedNameOrPropertyAccess(node) {
		return getTextOfNode(node), c.getTypeOfExpression(node), false
	}
	return "", nil, false
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
