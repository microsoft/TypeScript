package checker

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func (c *Checker) getTypePrecedence(t *Type) ast.TypePrecedence {
	if t.alias == nil {
		switch {
		case t.flags&TypeFlagsConditional != 0:
			return ast.TypePrecedenceConditional
		case t.flags&TypeFlagsIntersection != 0:
			return ast.TypePrecedenceIntersection
		case t.flags&TypeFlagsUnion != 0 && t.flags&TypeFlagsBoolean == 0:
			return ast.TypePrecedenceUnion
		case t.flags&TypeFlagsIndex != 0 || isInferTypeParameter(t):
			return ast.TypePrecedenceTypeOperator
		case c.isArrayType(t):
			return ast.TypePrecedencePostfix
		case t.objectFlags&ObjectFlagsClassOrInterface == 0 && c.getSingleCallOrConstructSignature(t) != nil:
			return ast.TypePrecedenceFunction
		}
	}
	return ast.TypePrecedenceNonArray
}

func (c *Checker) SymbolToString(s *ast.Symbol) string {
	return c.symbolToString(s)
}

func (c *Checker) symbolToString(s *ast.Symbol) string {
	if scanner.IsValidIdentifier(s.Name, c.languageVersion) {
		return s.Name
	}
	if s.ValueDeclaration != nil {
		name := ast.GetNameOfDeclaration(s.ValueDeclaration)
		if name != nil {
			return scanner.GetTextOfNode(name)
		}
	}
	if len(s.Name) == 0 || s.Name[0] != '\xFE' {
		return s.Name // !!! Implement escaping
	}
	switch s.Name {
	case ast.InternalSymbolNameClass:
		return "(Anonymous class)"
	case ast.InternalSymbolNameFunction:
		return "(Anonymous function)"
	case ast.InternalSymbolNameType, ast.InternalSymbolNameObject:
		return "(Anonymous type)"
	case ast.InternalSymbolNameComputed:
		return "(Computed name)"
	}
	if len(s.Name) >= 2 && s.Name[1] == '@' {
		return "(Unique symbol)"
	}
	return "(Missing)"
}

func (c *Checker) TypeToString(t *Type) string {
	return c.typeToStringEx(t, nil, TypeFormatFlagsNone)
}

func (c *Checker) typeToStringEx(t *Type, enclosingDeclaration *ast.Node, flags TypeFormatFlags) string {
	p := c.newPrinter(flags)
	p.printType(t)
	return p.string()
}

func (c *Checker) SourceFileWithTypes(sourceFile *ast.SourceFile) string {
	p := c.newPrinter(TypeFormatFlagsInTypeAlias)
	p.printSourceFileWithTypes(sourceFile)
	return p.string()
}

func (c *Checker) signatureToString(s *Signature) string {
	p := c.newPrinter(TypeFormatFlagsNone)
	if s.flags&SignatureFlagsConstruct != 0 {
		p.print("new ")
	}
	p.printSignature(s, ": ")
	return p.string()
}

func (c *Checker) typePredicateToString(t *TypePredicate) string {
	p := c.newPrinter(TypeFormatFlagsNone)
	p.printTypePredicate(t)
	return p.string()
}

func (c *Checker) valueToString(value any) string {
	p := c.newPrinter(TypeFormatFlagsNone)
	p.printValue(value)
	return p.string()
}

type Printer struct {
	c                *Checker
	flags            TypeFormatFlags
	sb               strings.Builder
	printing         core.Set[*Type]
	depth            int32
	extendsTypeDepth int32
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

func (p *Printer) printName(symbol *ast.Symbol) {
	p.print(p.c.symbolToString(symbol))
}

func (p *Printer) printQualifiedName(symbol *ast.Symbol) {
	if p.flags&TypeFormatFlagsUseFullyQualifiedType != 0 && symbol.Parent != nil {
		p.printQualifiedName(symbol.Parent)
		p.print(".")
	}
	if symbol.Flags&ast.SymbolFlagsModule != 0 && strings.HasPrefix(symbol.Name, "\"") {
		p.print("import(")
		p.print(symbol.Name)
		p.print(")")
		return
	}
	p.printName(symbol)
}

func (p *Printer) printTypeEx(t *Type, precedence ast.TypePrecedence) {
	if p.c.getTypePrecedence(t) < precedence {
		p.print("(")
		p.printType(t)
		p.print(")")
	} else {
		p.printType(t)
	}
}

func (p *Printer) printType(t *Type) {
	if p.sb.Len() > 1_000_000 {
		p.print("...")
		return
	}

	if t.alias != nil && (p.flags&TypeFormatFlagsInTypeAlias == 0 || p.depth > 0) {
		p.printQualifiedName(t.alias.symbol)
		p.printTypeArguments(t.alias.typeArguments)
	} else {
		p.printTypeNoAlias(t)
	}
}

func (p *Printer) printTypeNoAlias(t *Type) {
	p.depth++
	switch {
	case t.flags&TypeFlagsIntrinsic != 0:
		p.print(t.AsIntrinsicType().intrinsicName)
	case t.flags&(TypeFlagsLiteral|TypeFlagsEnum) != 0:
		p.printLiteralType(t)
	case t.flags&TypeFlagsUniqueESSymbol != 0:
		p.printUniqueESSymbolType(t)
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
	case t.flags&TypeFlagsConditional != 0:
		p.printRecursive(t, (*Printer).printConditionalType)
	case t.flags&TypeFlagsTemplateLiteral != 0:
		p.printTemplateLiteralType(t)
	case t.flags&TypeFlagsStringMapping != 0:
		p.printStringMappingType(t)
	case t.flags&TypeFlagsSubstitution != 0:
		if p.c.isNoInferType(t) {
			if noInferSymbol := p.c.getGlobalNoInferSymbolOrNil(); noInferSymbol != nil {
				p.printQualifiedName(noInferSymbol)
				p.printTypeArguments([]*Type{t.AsSubstitutionType().baseType})
				break
			}
		}
		p.printType(t.AsSubstitutionType().baseType)
	}
	p.depth--
}

func (p *Printer) printRecursive(t *Type, f func(*Printer, *Type)) {
	if !p.printing.Has(t) && p.depth < 10 {
		p.printing.Add(t)
		f(p, t)
		p.printing.Delete(t)
	} else {
		p.print("???")
	}
}

func (p *Printer) printLiteralType(t *Type) {
	if t.flags&(TypeFlagsEnumLiteral|TypeFlagsEnum) != 0 {
		p.printEnumLiteral(t)
	} else {
		p.printValue(t.AsLiteralType().value)
	}
}

func (p *Printer) printValue(value any) {
	switch value := value.(type) {
	case string:
		p.printStringLiteral(value)
	case jsnum.Number:
		p.printNumberLiteral(value)
	case bool:
		p.printBooleanLiteral(value)
	case jsnum.PseudoBigInt:
		p.printBigIntLiteral(value)
	}
}

func (p *Printer) printStringLiteral(s string) {
	p.print("\"")
	p.print(s)
	p.print("\"")
}

func (p *Printer) printNumberLiteral(f jsnum.Number) {
	p.print(f.String())
}

func (p *Printer) printBooleanLiteral(b bool) {
	p.print(core.IfElse(b, "true", "false"))
}

func (p *Printer) printBigIntLiteral(b jsnum.PseudoBigInt) {
	p.print(b.String() + "n")
}

func (p *Printer) printUniqueESSymbolType(t *Type) {
	p.print("unique symbol")
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
	p.printName(t.symbol)
	p.print("<")
	p.printType(t.AsStringMappingType().target)
	p.print(">")
}

func (p *Printer) printEnumLiteral(t *Type) {
	if parent := p.c.getParentOfSymbol(t.symbol); parent != nil {
		p.printQualifiedName(parent)
		if p.c.getDeclaredTypeOfSymbol(parent) != t {
			p.print(".")
			p.printName(t.symbol)
		}
		return
	}
	p.printQualifiedName(t.symbol)
}

func (p *Printer) printObjectType(t *Type) {
	switch {
	case t.objectFlags&ObjectFlagsReference != 0:
		p.printParameterizedType(t)
	case t.objectFlags&ObjectFlagsClassOrInterface != 0:
		p.printQualifiedName(t.symbol)
	case p.c.isGenericMappedType(t) || t.objectFlags&ObjectFlagsMapped != 0 && t.AsMappedType().containsError:
		p.printMappedType(t)
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
	p.printQualifiedName(t.symbol)
	p.printTypeArguments(p.c.getTypeArguments(t)[:p.c.getTypeReferenceArity(t)])
}

func (p *Printer) printTypeArguments(typeArguments []*Type) {
	if len(typeArguments) != 0 {
		p.print("<")
		var tail bool
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
	p.printTypeEx(p.c.getTypeArguments(t)[0], ast.TypePrecedencePostfix)
	p.print("[]")
}

func (p *Printer) printTupleType(t *Type) {
	if t.TargetTupleType().readonly {
		p.print("readonly ")
	}
	p.print("[")
	elementInfos := t.TargetTupleType().elementInfos
	typeArguments := p.c.getTypeArguments(t)
	var tail bool
	for i, info := range elementInfos {
		t := typeArguments[i]
		if tail {
			p.print(", ")
		}
		if info.flags&ElementFlagsVariable != 0 {
			p.print("...")
		}
		if info.labeledDeclaration != nil {
			p.print(info.labeledDeclaration.Name().Text())
			if info.flags&ElementFlagsOptional != 0 {
				p.print("?: ")
				p.printType(p.c.removeMissingType(t, true))
			} else {
				p.print(": ")
				if info.flags&ElementFlagsRest != 0 {
					p.printTypeEx(t, ast.TypePrecedencePostfix)
					p.print("[]")
				} else {
					p.printType(t)
				}
			}
		} else {
			if info.flags&ElementFlagsOptional != 0 {
				p.printTypeEx(p.c.removeMissingType(t, true), ast.TypePrecedencePostfix)
				p.print("?")
			} else if info.flags&ElementFlagsRest != 0 {
				p.printTypeEx(t, ast.TypePrecedencePostfix)
				p.print("[]")
			} else {
				p.printType(t)
			}
		}
		tail = true
	}
	p.print("]")
}

func (p *Printer) printAnonymousType(t *Type) {
	if t.symbol != nil && len(t.symbol.Name) != 0 {
		if t.symbol.Flags&(ast.SymbolFlagsClass|ast.SymbolFlagsEnum|ast.SymbolFlagsValueModule) != 0 {
			if t == p.c.getTypeOfSymbol(t.symbol) {
				p.print("typeof ")
				p.printQualifiedName(t.symbol)
				return
			}
		}
	}
	props := p.c.getPropertiesOfObjectType(t)
	callSignatures := p.c.getSignaturesOfType(t, SignatureKindCall)
	constructSignatures := p.c.getSignaturesOfType(t, SignatureKindConstruct)
	if len(props) == 0 {
		if len(callSignatures) == 1 && len(constructSignatures) == 0 {
			p.printSignature(callSignatures[0], " => ")
			return
		}
		if len(callSignatures) == 0 && len(constructSignatures) == 1 {
			p.print("new ")
			p.printSignature(constructSignatures[0], " => ")
			return
		}
	}
	p.print("{")
	hasMembers := false
	for _, sig := range callSignatures {
		p.print(" ")
		p.printSignature(sig, ": ")
		p.print(";")
		hasMembers = true
	}
	for _, sig := range constructSignatures {
		p.print(" new ")
		p.printSignature(sig, ": ")
		p.print(";")
		hasMembers = true
	}
	for _, info := range p.c.getIndexInfosOfType(t) {
		if info.isReadonly {
			p.print(" readonly")
		}
		p.print(" [")
		p.print(getNameFromIndexInfo(info))
		p.print(": ")
		p.printType(info.keyType)
		p.print("]: ")
		p.printType(info.valueType)
		p.print(";")
		hasMembers = true
	}
	for _, prop := range props {
		if p.c.isReadonlySymbol(prop) {
			p.print(" readonly")
		}
		p.print(" ")
		p.printName(prop)
		if prop.Flags&ast.SymbolFlagsOptional != 0 {
			p.print("?")
		}
		p.print(": ")
		p.printType(p.c.getNonMissingTypeOfSymbol(prop))
		p.print(";")
		hasMembers = true
	}
	if hasMembers {
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
			p.printTypeParameterAndConstraint(tp)
			tail = true
		}
		p.print(">")
	}
	p.print("(")
	var tail bool
	if sig.thisParameter != nil {
		p.print("this: ")
		p.printType(p.c.getTypeOfSymbol(sig.thisParameter))
		tail = true
	}
	for i, param := range sig.parameters {
		if tail {
			p.print(", ")
		}
		if sig.flags&SignatureFlagsHasRestParameter != 0 && i == len(sig.parameters)-1 {
			p.print("...")
			p.printName(param)
		} else {
			p.printName(param)
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
	if pred.t != nil {
		p.print(" is ")
		p.printType(pred.t)
	}
}

func (p *Printer) printTypeParameter(t *Type) {
	switch {
	case t.AsTypeParameter().isThisType:
		p.print("this")
	case p.extendsTypeDepth > 0 && isInferTypeParameter(t):
		p.print("infer ")
		p.printTypeParameterAndConstraint(t)
	case t.symbol != nil:
		p.printName(t.symbol)
	default:
		p.print("???")
	}
}

func (p *Printer) printTypeParameterAndConstraint(t *Type) {
	p.printName(t.symbol)
	if constraint := p.c.getConstraintOfTypeParameter(t); constraint != nil {
		p.print(" extends ")
		p.printType(constraint)
	}
}

func (p *Printer) printUnionType(t *Type) {
	switch {
	case t.flags&TypeFlagsBoolean != 0:
		p.print("boolean")
	case t.flags&TypeFlagsEnumLiteral != 0:
		p.printQualifiedName(t.symbol)
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
				p.printTypeEx(t, ast.TypePrecedenceUnion)
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
		p.printTypeEx(t, ast.TypePrecedenceIntersection)
		tail = true
	}
}

func (p *Printer) printIndexType(t *Type) {
	p.print("keyof ")
	p.printTypeEx(t.AsIndexType().target, ast.TypePrecedenceTypeOperator)
}

func (p *Printer) printIndexedAccessType(t *Type) {
	p.printType(t.AsIndexedAccessType().objectType)
	p.print("[")
	p.printType(t.AsIndexedAccessType().indexType)
	p.print("]")
}

func (p *Printer) printConditionalType(t *Type) {
	p.printType(t.AsConditionalType().checkType)
	p.print(" extends ")
	p.extendsTypeDepth++
	p.printType(t.AsConditionalType().extendsType)
	p.extendsTypeDepth--
	p.print(" ? ")
	p.printType(p.c.getTrueTypeFromConditionalType(t))
	p.print(" : ")
	p.printType(p.c.getFalseTypeFromConditionalType(t))
}

func (p *Printer) printMappedType(t *Type) {
	d := t.AsMappedType().declaration
	p.print("{ ")
	if d.ReadonlyToken != nil {
		if d.ReadonlyToken.Kind != ast.KindReadonlyKeyword {
			p.print(scanner.TokenToString(d.ReadonlyToken.Kind))
		}
		p.print("readonly ")
	}
	p.print("[")
	p.printName(p.c.getTypeParameterFromMappedType(t).symbol)
	p.print(" in ")
	p.printType(p.c.getConstraintTypeFromMappedType(t))
	nameType := p.c.getNameTypeFromMappedType(t)
	if nameType != nil {
		p.print(" as ")
		p.printType(nameType)
	}
	p.print("]")
	if d.QuestionToken != nil {
		if d.QuestionToken.Kind != ast.KindQuestionToken {
			p.print(scanner.TokenToString(d.QuestionToken.Kind))
		}
		p.print("?")
	}
	p.print(": ")
	p.printType(p.c.getTemplateTypeFromMappedType(t))
	p.print("; }")
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
				p.printValue(t.AsLiteralType().value)
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
				return c.symbolToString(symbol), c.getTypeOfSymbol(symbol), true
			}
			if symbol.Flags&ast.SymbolFlagsTypeAlias != 0 {
				return c.symbolToString(symbol), c.getDeclaredTypeOfTypeAlias(symbol), true
			}
		}
	}
	if ast.IsExpressionNode(node) && !isRightSideOfQualifiedNameOrPropertyAccess(node) {
		return scanner.GetTextOfNode(node), c.getTypeOfExpression(node), false
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

func isInferTypeParameter(t *Type) bool {
	return t.flags&TypeFlagsTypeParameter != 0 && t.symbol != nil && core.Some(t.symbol.Declarations, func(d *ast.Node) bool { return ast.IsInferTypeNode(d.Parent) })
}
