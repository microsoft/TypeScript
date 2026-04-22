package checker

import (
	"fmt"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/nodebuilder"
	"github.com/microsoft/typescript-go/internal/scanner"
)

// isExpanding returns whether the node builder context is operating in hover-expansion mode.
func isExpanding(ctx *NodeBuilderContext) bool {
	return ctx.maxExpansionDepth != -1
}

// expandSymbolForHover produces declaration nodes (class, interface, enum, module) for a symbol
// for expandable hover. This is a focused alternative to the full symbolTableToDeclarationStatements
// machinery used by declaration emit — it directly builds the declaration nodes hover needs
// without the declaration-emit scaffolding (deferred privates, symbol name remapping, export
// modifier computation, alias resolution, visited symbols tracking).
func (b *NodeBuilderImpl) expandSymbolForHover(symbol *ast.Symbol) []*ast.Node {
	var results []*ast.Node
	if symbol.Flags&ast.SymbolFlagsEnum != 0 {
		if node := b.expandEnumDecl(symbol); node != nil {
			results = append(results, node)
		}
	}
	if symbol.Flags&ast.SymbolFlagsClass != 0 {
		if node := b.expandClassDecl(symbol); node != nil {
			results = append(results, node)
		}
	}
	// Module/namespace before interface (matching Strada ordering for merged declarations)
	if symbol.Flags&(ast.SymbolFlagsValueModule|ast.SymbolFlagsNamespaceModule) != 0 {
		if node := b.expandModuleDecl(symbol); node != nil {
			results = append(results, node)
		}
	}
	if symbol.Flags&ast.SymbolFlagsInterface != 0 && symbol.Flags&ast.SymbolFlagsClass == 0 {
		if node := b.expandInterfaceDecl(symbol); node != nil {
			results = append(results, node)
		}
	}
	return results
}

// expandEnumDecl produces an EnumDeclaration node with all members.
func (b *NodeBuilderImpl) expandEnumDecl(symbol *ast.Symbol) *ast.Node {
	name := ast.SymbolName(symbol)
	b.ctx.approximateLength += 9 + len(name)
	memberProps := core.Filter(b.ch.getPropertiesOfType(b.ch.getTypeOfSymbol(symbol)), func(p *ast.Symbol) bool {
		return p.Flags&ast.SymbolFlagsEnumMember != 0
	})
	var members []*ast.Node
	for i, p := range memberProps {
		if b.checkTruncationLengthIfExpanding() && i+3 < len(memberProps)-1 {
			b.ctx.expansionTruncated = true
			members = append(members, b.f.NewEnumMember(b.f.NewStringLiteral(fmt.Sprintf(" ... %d more ... ", len(memberProps)-i-1), 0), nil))
			last := memberProps[len(memberProps)-1]
			members = append(members, b.f.NewEnumMember(b.f.NewIdentifier(last.Name), b.enumMemberInitializer(last)))
			break
		}
		memberDecl := core.Find(p.Declarations, ast.IsEnumMember)
		var initializer *ast.Node
		if memberDecl != nil && memberDecl.AsEnumMember().Initializer != nil {
			initializer = b.f.DeepCloneNode(memberDecl.AsEnumMember().Initializer)
		} else {
			initializer = b.enumMemberInitializer(p)
		}
		b.ctx.approximateLength += 4 + len(p.Name)
		if initializer != nil {
			b.ctx.approximateLength += 5 // " = " + value estimate
		}
		members = append(members, b.f.NewEnumMember(b.f.NewIdentifier(p.Name), initializer))
	}

	constModifier := ast.ModifierFlagsNone
	if isConstEnumSymbol(symbol) {
		constModifier = ast.ModifierFlagsConst
	}
	var mods *ast.ModifierList
	if constModifier != 0 {
		mods = b.f.NewModifierList(ast.CreateModifiersFromModifierFlags(constModifier, b.f.NewModifier))
	}
	return b.f.NewEnumDeclaration(mods, b.f.NewIdentifier(name), b.f.NewNodeList(members))
}

func (b *NodeBuilderImpl) enumMemberInitializer(p *ast.Symbol) *ast.Node {
	memberDecl := core.Find(p.Declarations, ast.IsEnumMember)
	if memberDecl == nil {
		return nil
	}
	val := b.ch.GetConstantValue(memberDecl)
	if val == nil {
		return nil
	}
	switch v := val.(type) {
	case string:
		return b.f.NewStringLiteral(v, 0)
	case jsnum.Number:
		return b.f.NewNumericLiteral(v.String(), 0)
	}
	return nil
}

// expandClassDecl produces a ClassDeclaration node with heritage clauses and members.
func (b *NodeBuilderImpl) expandClassDecl(symbol *ast.Symbol) *ast.Node {
	name := ast.SymbolName(symbol)
	b.ctx.approximateLength += 9 + len(name)

	originalDecl := core.Find(symbol.Declarations, ast.IsClassLike)
	oldEnclosing := b.ctx.enclosingDeclaration
	if originalDecl != nil {
		b.ctx.enclosingDeclaration = originalDecl
	}
	defer func() { b.ctx.enclosingDeclaration = oldEnclosing }()

	localParams := b.ch.getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol)
	typeParamDecls := core.Map(localParams, func(p *Type) *ast.Node { return b.typeParameterToDeclaration(p) })

	declaredType := b.ch.getDeclaredTypeOfClassOrInterface(symbol)
	classType := b.ch.getTypeWithThisArgument(declaredType, nil, false)
	baseTypes := b.ch.getBaseTypes(b.ch.getTargetType(classType))
	staticType := b.ch.getTypeOfSymbol(symbol)
	isClass := staticType.symbol != nil && staticType.symbol.ValueDeclaration != nil && ast.IsClassLike(staticType.symbol.ValueDeclaration)
	var staticBaseType *Type
	if isClass {
		staticBaseType = b.ch.getBaseConstructorTypeOfClass(declaredType)
	} else {
		staticBaseType = b.ch.anyType
	}

	// Heritage clauses
	var heritageClauses []*ast.Node
	if len(baseTypes) > 0 {
		extendsTypes := core.Map(baseTypes, func(bt *Type) *ast.Node { return b.hoverExpressionWithTypeArguments(bt, ast.SymbolFlagsValue) })
		heritageClauses = append(heritageClauses, b.f.NewHeritageClause(ast.KindExtendsKeyword, b.f.NewNodeList(extendsTypes)))
	}
	if impls := b.getImplementsTypes(classType); len(impls) > 0 {
		var implExprs []*ast.Node
		for _, t := range impls {
			if expr := b.hoverExpressionWithTypeArguments(t, ast.SymbolFlagsType); expr != nil {
				implExprs = append(implExprs, expr)
			}
		}
		if len(implExprs) > 0 {
			heritageClauses = append(heritageClauses, b.f.NewHeritageClause(ast.KindImplementsKeyword, b.f.NewNodeList(implExprs)))
		}
	}

	// Instance members via addPropertyToElementList (reusing existing serialization),
	// then convert TypeElements to ClassElements and add class-specific modifiers
	allProps := b.ch.getPropertiesOfType(classType)
	symbolProps := b.filterInheritedProperties(classType, baseTypes, allProps)
	publicProps := core.Filter(symbolProps, func(s *ast.Symbol) bool { return !isHashPrivate(s) })
	hasPrivate := core.Some(symbolProps, isHashPrivate)

	var instanceMembers []*ast.Node
	instanceMembers = b.serializePropertiesWithTruncation(publicProps, instanceMembers)
	instanceMembers = typeElementsToClassElements(b.f, instanceMembers)
	instanceMembers = b.addClassModifiers(instanceMembers, false)

	// Static members
	staticProps := core.Filter(b.ch.getPropertiesOfType(staticType), func(p *ast.Symbol) bool {
		return p.Flags&ast.SymbolFlagsPrototype == 0 && p.Name != "prototype" && !b.isNamespaceMember(p)
	})
	var staticMembers []*ast.Node
	staticMembers = b.serializePropertiesWithTruncation(staticProps, staticMembers)
	staticMembers = typeElementsToClassElements(b.f, staticMembers)
	staticMembers = b.addClassModifiers(staticMembers, true)

	// Hash-private members
	var privateMembers []*ast.Node
	if hasPrivate {
		privateMembers = b.serializePropertiesWithTruncation(core.Filter(symbolProps, isHashPrivate), privateMembers)
		privateMembers = typeElementsToClassElements(b.f, privateMembers)
	}

	// Constructors
	constructors := b.serializeConstructors(staticType, staticBaseType, isClass, symbol)

	// Index signatures
	indexSigs := b.serializeIndexSignaturesOfType(classType, core.FirstOrNil(baseTypes))

	allMembers := make([]*ast.Node, 0, len(indexSigs)+len(staticMembers)+len(constructors)+len(instanceMembers)+len(privateMembers))
	allMembers = append(allMembers, indexSigs...)
	allMembers = append(allMembers, staticMembers...)
	allMembers = append(allMembers, constructors...)
	allMembers = append(allMembers, instanceMembers...)
	allMembers = append(allMembers, privateMembers...)

	return b.f.NewClassDeclaration(nil, b.f.NewIdentifier(name), b.f.NewNodeList(typeParamDecls), b.f.NewNodeList(heritageClauses), b.f.NewNodeList(allMembers))
}

// addClassModifiers post-processes class member nodes to add class-specific modifiers
// (private, protected, public, abstract, static) based on the original symbol declarations.
func (b *NodeBuilderImpl) addClassModifiers(members []*ast.Node, isStatic bool) []*ast.Node {
	for i, m := range members {
		// Find the symbol for this member by matching the property name
		var memberSymbol *ast.Symbol
		memberName := m.Name()
		if memberName != nil {
			if sym, ok := b.idToSymbol[memberName]; ok {
				memberSymbol = sym
			}
		}
		if memberSymbol == nil {
			continue
		}
		modFlags := getDeclarationModifierFlagsFromSymbol(memberSymbol) &^ ast.ModifierFlagsAsync
		if isStatic {
			modFlags |= ast.ModifierFlagsStatic
		}
		if modFlags != 0 && ast.CanHaveModifiers(m) {
			existing := m.ModifierFlags()
			if modFlags != existing {
				members[i] = ast.ReplaceModifiers(b.f, m, b.f.NewModifierList(ast.CreateModifiersFromModifierFlags(modFlags|existing, b.f.NewModifier)))
			}
		}
	}
	return members
}

// typeElementsToClassElements converts TypeElement nodes (PropertySignature, MethodSignature)
// to their ClassElement equivalents (PropertyDeclaration, MethodDeclaration) so they can be
// used as members of a ClassDeclaration. Nodes that are already ClassElements pass through unchanged.
func typeElementsToClassElements(f *ast.NodeFactory, members []*ast.Node) []*ast.Node {
	for i, m := range members {
		switch m.Kind {
		case ast.KindPropertySignature:
			ps := m.AsPropertySignatureDeclaration()
			members[i] = f.NewPropertyDeclaration(m.Modifiers(), ps.Name(), ps.QuestionToken(), ps.Type, nil)
		case ast.KindMethodSignature:
			ms := m.AsMethodSignatureDeclaration()
			members[i] = f.NewMethodDeclaration(m.Modifiers(), nil, ms.Name(), ms.QuestionToken(), ms.TypeParameters, ms.Parameters, ms.Type, nil, nil)
		}
	}
	return members
}

// expandInterfaceDecl produces an InterfaceDeclaration with members.
// Reuses addPropertyToElementList for property serialization and
// signatureToSignatureDeclarationHelper for signatures.
func (b *NodeBuilderImpl) expandInterfaceDecl(symbol *ast.Symbol) *ast.Node {
	name := ast.SymbolName(symbol)
	b.ctx.approximateLength += 14 + len(name)

	interfaceType := b.ch.getDeclaredTypeOfClassOrInterface(symbol)
	localParams := b.ch.getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol)
	typeParamDecls := core.Map(localParams, func(p *Type) *ast.Node { return b.typeParameterToDeclaration(p) })
	baseTypes := b.ch.getBaseTypes(interfaceType)
	var baseType *Type
	if len(baseTypes) > 0 {
		baseType = b.ch.getIntersectionType(baseTypes)
	}

	// Members: reuse existing serialization functions
	resolved := b.ch.resolveStructuredTypeMembers(interfaceType)
	var members []*ast.Node

	// Index signatures, filtering those identical to base
	members = append(members, b.serializeIndexSignaturesOfType(interfaceType, baseType)...)
	// Construct signatures (skip abstract)
	for _, sig := range resolved.ConstructSignatures() {
		if sig.flags&SignatureFlagsAbstract != 0 {
			continue
		}
		members = append(members, b.signatureToSignatureDeclarationHelper(sig, ast.KindConstructSignature, nil))
	}
	// Call signatures
	for _, sig := range resolved.CallSignatures() {
		members = append(members, b.signatureToSignatureDeclarationHelper(sig, ast.KindCallSignature, nil))
	}
	// Properties, filtering inherited
	filteredProps := b.filterInheritedProperties(interfaceType, baseTypes, resolved.properties)
	members = b.serializePropertiesWithTruncation(filteredProps, members)

	// Heritage clauses
	var heritageClauses []*ast.Node
	if len(baseTypes) > 0 {
		var hcTypes []*ast.Node
		for _, bt := range baseTypes {
			if ref := b.hoverExpressionWithTypeArguments(bt, ast.SymbolFlagsValue); ref != nil {
				hcTypes = append(hcTypes, ref)
			}
		}
		if len(hcTypes) > 0 {
			heritageClauses = []*ast.Node{b.f.NewHeritageClause(ast.KindExtendsKeyword, b.f.NewNodeList(hcTypes))}
		}
	}

	return b.f.NewInterfaceDeclaration(nil, b.f.NewIdentifier(name), b.f.NewNodeList(typeParamDecls), b.f.NewNodeList(heritageClauses), b.f.NewNodeList(members))
}

// serializePropertiesWithTruncation iterates properties using addPropertyToElementList,
// with truncation checks matching Strada's createTypeNodesFromResolvedType behavior.
func (b *NodeBuilderImpl) serializePropertiesWithTruncation(properties []*ast.Symbol, elements []*ast.Node) []*ast.Node {
	properties = core.Filter(properties, func(p *ast.Symbol) bool {
		return p.Flags&ast.SymbolFlagsPrototype == 0
	})
	for i, p := range properties {
		if b.checkTruncationLengthIfExpanding() && (i+3 < len(properties)-1) {
			b.ctx.expansionTruncated = true
			text := fmt.Sprintf("... %d more ...", len(properties)-i-1)
			elements = append(elements, b.f.NewPropertySignatureDeclaration(nil, b.f.NewIdentifier(text), nil, nil, nil))
			elements = b.addPropertyToElementList(properties[len(properties)-1], elements)
			break
		}
		elements = b.addPropertyToElementList(p, elements)
	}
	return elements
}

// serializeConstructors builds constructor signature(s) for a class, with base type filtering.
func (b *NodeBuilderImpl) serializeConstructors(staticType *Type, staticBaseType *Type, isClass bool, symbol *ast.Symbol) []*ast.Node {
	isNonConstructable := !isClass &&
		symbol.ValueDeclaration != nil &&
		ast.IsInJSFile(symbol.ValueDeclaration) &&
		len(b.ch.getSignaturesOfType(staticType, SignatureKindConstruct)) == 0
	if isNonConstructable {
		b.ctx.approximateLength += 21
		modifiers := ast.CreateModifiersFromModifierFlags(ast.ModifierFlagsPrivate, b.f.NewModifier)
		return []*ast.Node{b.f.NewConstructorDeclaration(b.f.NewModifierList(modifiers), nil, b.f.NewNodeList(nil), nil, nil, nil)}
	}
	signatures := b.ch.getSignaturesOfType(staticType, SignatureKindConstruct)
	if staticBaseType != nil {
		baseSigs := b.ch.getSignaturesOfType(staticBaseType, SignatureKindConstruct)
		if len(baseSigs) == 0 && core.Every(signatures, func(sig *Signature) bool { return len(sig.parameters) == 0 }) {
			return nil
		}
		if len(baseSigs) == len(signatures) {
			allMatch := true
			for i := range baseSigs {
				if b.ch.compareSignaturesIdentical(signatures[i], baseSigs[i], false, false, true, b.ch.compareTypesIdentical) != TernaryTrue {
					allMatch = false
					break
				}
			}
			if allMatch {
				return nil
			}
		}
		var privateProtected ast.ModifierFlags
		for _, sig := range signatures {
			if sig.declaration != nil {
				privateProtected |= sig.declaration.ModifierFlags() & (ast.ModifierFlagsPrivate | ast.ModifierFlagsProtected)
			}
		}
		if privateProtected != 0 {
			return []*ast.Node{b.f.NewConstructorDeclaration(
				b.f.NewModifierList(ast.CreateModifiersFromModifierFlags(privateProtected, b.f.NewModifier)),
				nil, b.f.NewNodeList(nil), nil, nil, nil,
			)}
		}
	} else if core.Every(signatures, func(sig *Signature) bool { return len(sig.parameters) == 0 }) {
		return nil
	}
	var result []*ast.Node
	for _, sig := range signatures {
		b.ctx.approximateLength++
		result = append(result, b.signatureToSignatureDeclarationHelper(sig, ast.KindConstructor, nil))
	}
	return result
}

// serializeIndexSignaturesOfType builds index signature declarations, filtering those identical to baseType.
func (b *NodeBuilderImpl) serializeIndexSignaturesOfType(input *Type, baseType *Type) []*ast.Node {
	var result []*ast.Node
	for _, info := range b.ch.getIndexInfosOfType(input) {
		if baseType != nil {
			baseInfo := b.ch.getIndexInfoOfType(baseType, info.keyType)
			if baseInfo != nil && b.ch.isTypeIdenticalTo(info.valueType, baseInfo.valueType) {
				continue
			}
		}
		result = append(result, b.indexInfoToIndexSignatureDeclarationHelper(info, nil))
	}
	return result
}

// serializeNamespaceMember produces the appropriate declaration node for a namespace member
// based on its symbol flags (type alias, enum, class, interface, nested namespace, or variable).
func (b *NodeBuilderImpl) serializeNamespaceMember(resolved *ast.Symbol, name string) *ast.Node {
	switch {
	case resolved.Flags&ast.SymbolFlagsTypeAlias != 0:
		return b.serializeTypeAliasForNamespace(resolved, name)
	case resolved.Flags&ast.SymbolFlagsEnum != 0:
		return b.expandEnumDecl(resolved)
	case resolved.Flags&ast.SymbolFlagsClass != 0:
		return b.expandClassDecl(resolved)
	case resolved.Flags&ast.SymbolFlagsInterface != 0:
		return b.expandInterfaceDecl(resolved)
	case resolved.Flags&(ast.SymbolFlagsValueModule|ast.SymbolFlagsNamespaceModule) != 0:
		return b.expandModuleDecl(resolved)
	default:
		t := b.ch.getWidenedType(b.ch.getTypeOfSymbol(resolved))
		b.ctx.approximateLength += len(name) + 5
		return b.f.NewVariableStatement(
			nil,
			b.f.NewVariableDeclarationList(
				b.f.NewNodeList([]*ast.Node{
					b.f.NewVariableDeclaration(b.f.NewIdentifier(name), nil, b.serializeTypeForDeclaration(nil, t, resolved, true), nil),
				}),
				ast.NodeFlagsLet,
			),
		)
	}
}

// expandModuleDecl produces a ModuleDeclaration with exported members.
func (b *NodeBuilderImpl) expandModuleDecl(symbol *ast.Symbol) *ast.Node {
	exports := b.ch.getExportsOfSymbol(symbol)
	var members []*ast.Symbol
	for _, sym := range exports {
		// Filter to namespace-relevant members
		if !b.isNamespaceMember(sym) {
			continue
		}
		if !scanner.IsIdentifierText(sym.Name, core.LanguageVariantStandard) {
			continue
		}
		members = append(members, sym)
	}
	b.ch.sortSymbols(members)
	b.ctx.approximateLength += 14

	// Use the same name as symbol display.
	oldFlags := b.ctx.flags
	defer func() { b.ctx.flags = oldFlags }()
	b.ctx.flags |= nodebuilder.FlagsWriteTypeParametersInQualifiedName | nodebuilder.Flags(SymbolFormatFlagsUseOnlyExternalAliasing)
	localName := b.symbolToNode(symbol, ast.SymbolFlagsAll)
	b.ctx.flags = oldFlags

	type hoverStatement struct {
		node    *ast.Node
		isLocal bool // local declarations (e.g. alias targets) should not get export modifier
	}
	var bodyStmts []hoverStatement
	var emittedLocals collections.Set[*ast.Symbol]
	for i := 0; i < len(members); i++ {
		m := members[i]
		if b.checkTruncationLengthIfExpanding() && i+3 < len(members)-1 {
			b.ctx.expansionTruncated = true
			bodyStmts = append(bodyStmts, hoverStatement{node: b.f.NewExpressionStatement(b.f.NewIdentifier(fmt.Sprintf("... (%d more) ...", len(members)-i-1)))})
			i = len(members) - 2 // skip to last member after i++ at end of iteration
			continue
		}

		// Handle alias/re-export symbols
		if m.Flags&ast.SymbolFlagsAlias != 0 {
			aliasDecl := core.FirstOrNil(m.Declarations)
			target := b.ch.getMergedSymbol(b.ch.getTargetOfAliasDeclaration(aliasDecl))
			if target != nil {
				// If the alias target is a local symbol (not itself an export), emit its declaration first
				if target.Flags&(ast.SymbolFlagsBlockScopedVariable|ast.SymbolFlagsFunctionScopedVariable|ast.SymbolFlagsProperty) != 0 {
					if emittedLocals.AddIfAbsent(target) {
						localType := b.ch.getWidenedType(b.ch.getTypeOfSymbol(target))
						b.ctx.approximateLength += len(target.Name) + 5
						localStmt := b.f.NewVariableStatement(nil,
							b.f.NewVariableDeclarationList(b.f.NewNodeList([]*ast.Node{
								b.f.NewVariableDeclaration(b.f.NewIdentifier(target.Name), nil, b.serializeTypeForDeclaration(nil, localType, target, true), nil),
							}), ast.NodeFlagsLet))
						bodyStmts = append(bodyStmts, hoverStatement{node: localStmt, isLocal: true})
					}
				}
				targetName := target.Name
				b.ctx.approximateLength += 16 + len(m.Name)
				var propertyName *ast.Node
				if m.Name != targetName {
					propertyName = b.f.NewIdentifier(targetName)
				}
				stmt := b.f.NewExportDeclaration(
					nil, false,
					b.f.NewNamedExports(b.f.NewNodeList([]*ast.Node{
						b.f.NewExportSpecifier(false, propertyName, b.f.NewIdentifier(m.Name)),
					})),
					nil, nil,
				)
				bodyStmts = append(bodyStmts, hoverStatement{node: stmt})
				continue
			}
		}

		resolved := b.ch.resolveSymbol(m)

		// Handle functions as function declarations
		if resolved.Flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsMethod) != 0 {
			t := b.ch.getTypeOfSymbol(resolved)
			sigs := b.ch.getSignaturesOfType(t, SignatureKindCall)
			for _, sig := range sigs {
				b.ctx.approximateLength++
				decl := b.signatureToSignatureDeclarationHelper(sig, ast.KindFunctionDeclaration, &SignatureToSignatureDeclarationOptions{
					name: b.f.NewIdentifier(m.Name),
				})
				bodyStmts = append(bodyStmts, hoverStatement{node: decl})
			}
			// If the function also has namespace characteristics, emit an empty namespace.
			merged := b.ch.getMergedSymbol(resolved)
			hasModuleExports := merged.Flags&(ast.SymbolFlagsValueModule|ast.SymbolFlagsNamespaceModule) != 0 && merged.Exports != nil && len(merged.Exports) != 0
			if !hasModuleExports {
				bodyStmts = append(bodyStmts, hoverStatement{node: b.f.NewModuleDeclaration(nil, ast.KindNamespaceKeyword, b.f.NewIdentifier(m.Name), b.f.NewModuleBlock(b.f.NewNodeList(nil)))})
			}
			continue
		}

		// Handle remaining member kinds (type alias, enum, class, interface, namespace, variable)
		if node := b.serializeNamespaceMember(resolved, m.Name); node != nil {
			bodyStmts = append(bodyStmts, hoverStatement{node: node})
		}
	}

	// Add export modifier to exported statements (skip local declarations and ExportDeclarations).
	for i := range bodyStmts {
		s := &bodyStmts[i]
		if s.isLocal || ast.IsExportDeclaration(s.node) {
			continue
		}
		if ast.CanHaveModifiers(s.node) {
			mf := s.node.ModifierFlags() | ast.ModifierFlagsExport
			s.node = ast.ReplaceModifiers(b.f, s.node, b.f.NewModifierList(ast.CreateModifiersFromModifierFlags(mf, b.f.NewModifier)))
		}
	}

	// Collect nodes, stripping export if all statements are exported.
	bodyStatements := make([]*ast.Node, len(bodyStmts))
	for i := range bodyStmts {
		bodyStatements[i] = bodyStmts[i].node
	}
	allExported := len(bodyStatements) > 0 && core.Every(bodyStatements, func(d *ast.Node) bool {
		return ast.HasSyntacticModifier(d, ast.ModifierFlagsExport)
	})
	if allExported {
		for i, stmt := range bodyStatements {
			if ast.CanHaveModifiers(stmt) {
				mf := stmt.ModifierFlags() &^ ast.ModifierFlagsExport
				bodyStatements[i] = ast.ReplaceModifiers(b.f, stmt, b.f.NewModifierList(ast.CreateModifiersFromModifierFlags(mf, b.f.NewModifier)))
			}
		}
	}

	keyword := ast.KindNamespaceKeyword
	if !ast.IsIdentifier(localName) {
		keyword = ast.KindModuleKeyword
	}
	return b.f.NewModuleDeclaration(nil, keyword, localName, b.f.NewModuleBlock(b.f.NewNodeList(bodyStatements)))
}

// serializeTypeAliasForNamespace produces a TypeAliasDeclaration for a type alias inside a namespace body.
func (b *NodeBuilderImpl) serializeTypeAliasForNamespace(symbol *ast.Symbol, name string) *ast.Node {
	aliasType := b.ch.getDeclaredTypeOfTypeAlias(symbol)
	typeParams := b.ch.getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol)
	typeParamDecls := core.Map(typeParams, func(p *Type) *ast.Node { return b.typeParameterToDeclaration(p) })
	restoreFlags := b.saveRestoreFlags()
	b.ctx.flags |= nodebuilder.FlagsInTypeAlias
	typeNode := b.typeToTypeNode(aliasType)
	restoreFlags()
	b.ctx.approximateLength += 8 + len(name)
	return b.f.NewTypeAliasDeclaration(nil, b.f.NewIdentifier(name), b.f.NewNodeList(typeParamDecls), typeNode)
}

// hoverExpressionWithTypeArguments builds an ExpressionWithTypeArguments node for heritage clauses.
func (b *NodeBuilderImpl) hoverExpressionWithTypeArguments(t *Type, flags ast.SymbolFlags) *ast.Node {
	var typeArgs []*ast.Node
	var reference *ast.Node
	if t.objectFlags&ObjectFlagsReference != 0 && t.Target() != nil && b.ch.IsSymbolAccessibleByFlags(t.Target().symbol, b.ctx.enclosingDeclaration, flags) {
		typeArgs = core.Map(b.ch.getTypeArguments(t), func(arg *Type) *ast.Node { return b.typeToTypeNode(arg) })
		reference = b.symbolToExpression(t.Target().symbol, ast.SymbolFlagsType)
	} else if t.symbol != nil && b.ch.IsSymbolAccessibleByFlags(t.symbol, b.ctx.enclosingDeclaration, flags) {
		reference = b.symbolToExpression(t.symbol, ast.SymbolFlagsType)
	} else if t.symbol != nil && t.symbol.Name == ast.InternalSymbolNameClass {
		reference = b.f.NewIdentifier(b.getNameOfSymbolAsWritten(t.symbol))
	}
	if reference != nil {
		return b.f.NewExpressionWithTypeArguments(reference, b.f.NewNodeList(typeArgs))
	}
	return nil
}

// getImplementsTypes extracts implements types from class declarations.
func (b *NodeBuilderImpl) getImplementsTypes(classType *Type) []*Type {
	var result []*Type
	if classType.symbol == nil {
		return result
	}
	for _, declaration := range classType.symbol.Declarations {
		implementsTypeNodes := ast.GetImplementsTypeNodes(declaration)
		if implementsTypeNodes == nil {
			continue
		}
		for _, node := range implementsTypeNodes {
			t := b.ch.getTypeFromTypeNode(node)
			if !b.ch.isErrorType(t) {
				result = append(result, t)
			}
		}
	}
	return result
}

// filterInheritedProperties removes properties already present in base types.
func (b *NodeBuilderImpl) filterInheritedProperties(t *Type, baseTypes []*Type, properties []*ast.Symbol) []*ast.Symbol {
	if len(baseTypes) == 0 {
		return properties
	}
	// Build a lookup from property name to symbol for parent-identity comparison.
	propsByName := make(map[string]*ast.Symbol, len(properties))
	for _, p := range properties {
		propsByName[p.Name] = p
	}
	// Collect names of properties inherited unchanged from base types.
	var inherited collections.Set[string]
	for _, base := range baseTypes {
		baseWithThis := b.ch.getTypeWithThisArgument(base, b.ch.getTargetType(t).AsInterfaceType().thisType, false)
		for _, prop := range b.ch.getPropertiesOfType(baseWithThis) {
			if existing, ok := propsByName[prop.Name]; ok && prop.Parent == existing.Parent {
				inherited.Add(prop.Name)
			}
		}
	}
	if inherited.Len() == 0 {
		return properties
	}
	return core.Filter(properties, func(p *ast.Symbol) bool {
		return !inherited.Has(p.Name)
	})
}

func (b *NodeBuilderImpl) isNamespaceMember(p *ast.Symbol) bool {
	return p.Flags&(ast.SymbolFlagsType|ast.SymbolFlagsNamespace|ast.SymbolFlagsAlias) != 0 ||
		!(p.Flags&ast.SymbolFlagsPrototype != 0 || p.Name == "prototype" || (p.ValueDeclaration != nil && ast.HasStaticModifier(p.ValueDeclaration) && ast.IsClassLike(p.ValueDeclaration.Parent)))
}

func isHashPrivate(s *ast.Symbol) bool {
	return s.ValueDeclaration != nil && s.ValueDeclaration.Name() != nil && ast.IsPrivateIdentifier(s.ValueDeclaration.Name())
}
