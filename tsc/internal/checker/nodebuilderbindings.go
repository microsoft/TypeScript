package checker

import (
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/nodebuilder"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
)

type serializationTypeAlias struct {
	t              *Type
	typeId         TypeId
	name           *ast.IdentifierNode
	scope          *ast.Node
	typeParameters []*Type
	usedParameters []bool
	parameterNodes []*ast.Node
	mapper         *TypeMapper
	body           *ast.TypeNode
}

type serializationTypeAliasReference struct {
	alias         *serializationTypeAlias
	node          *ast.TypeReferenceNode
	arguments     []*ast.TypeNode
	owner         *serializationTypeAlias
	freeArguments []bool
}

func (ctx *NodeBuilderContext) recordTypeAliasParameter(symbol *ast.Symbol) {
	alias := ctx.currentTypeAlias
	if alias == nil || ctx.writingTypeAliasArguments || symbol == nil || symbol.Flags&ast.SymbolFlagsTypeParameter == 0 {
		return
	}
	for _, parameter := range ctx.typeParameters[ctx.typeAliasParameterDepth:] {
		if parameter.symbol == symbol {
			return
		}
	}
	for i, parameter := range alias.typeParameters {
		if parameter.symbol == symbol {
			alias.usedParameters[i] = true
		}
	}
}

func (b *NodeBuilderImpl) createSerializationTypeAlias(expansion *serializationExpansion) *serializationTypeAlias {
	// Hoisted helpers need unscoped uniqueness even when first referenced inside a class.
	name := b.e.Factory.NewUniqueNameEx("_recursive", printer.AutoGenerateOptions{
		Flags: printer.GeneratedIdentifierFlagsOptimistic,
	})
	scope := b.f.NewBlock(b.f.NewNodeList(nil), false)
	scope.Parent = b.ctx.typeAliasTracker.TypeAliasScope()
	parameters := []*Type{}
	for _, parameter := range expansion.typeParameters {
		if !slices.Contains(parameters, parameter) {
			parameters = append(parameters, parameter)
		}
	}
	alias := &serializationTypeAlias{
		t:              expansion.t,
		typeId:         expansion.typeId,
		name:           name,
		scope:          scope,
		typeParameters: parameters,
		usedParameters: make([]bool, len(parameters)),
		parameterNodes: make([]*ast.Node, len(parameters)),
		mapper:         expansion.mapper,
	}
	b.ctx.typeAliases = append(b.ctx.typeAliases, alias)
	return alias
}

func (b *NodeBuilderImpl) getSerializationTypeAlias(t *Type) *serializationTypeAlias {
	if len(b.ctx.typeAliases) == 0 {
		return nil
	}
	typeId := b.serializationTypeId(t)
	for _, alias := range b.ctx.typeAliases {
		if b.isSameSerializationType(t, typeId, alias.t, alias.typeId) {
			return alias
		}
	}
	return nil
}

func (b *NodeBuilderImpl) serializationTypeAliasToNode(alias *serializationTypeAlias) *ast.TypeNode {
	arguments := make([]*ast.TypeNode, len(alias.typeParameters))
	freeArguments := make([]bool, len(arguments))
	writingArguments := b.ctx.writingTypeAliasArguments
	b.ctx.writingTypeAliasArguments = true
	for i, parameter := range alias.typeParameters {
		arguments[i] = b.typeToTypeNode(parameter)
		freeArguments[i] = b.ctx.currentTypeAlias != nil &&
			!slices.Contains(b.ctx.typeParameters[b.ctx.typeAliasParameterDepth:], parameter)
	}
	b.ctx.writingTypeAliasArguments = writingArguments
	node := b.f.NewTypeReferenceNode(alias.name, b.f.NewNodeList(arguments))
	b.ctx.typeAliasReferences = append(b.ctx.typeAliasReferences, serializationTypeAliasReference{
		alias: alias, node: node.AsTypeReferenceNode(), arguments: arguments,
		owner: b.ctx.currentTypeAlias, freeArguments: freeArguments,
	})
	b.ctx.approximateLength += len(alias.name.Text())
	return node
}

func (b *NodeBuilderImpl) enterSerializationTypeAliasScope(alias *serializationTypeAlias) func() {
	ctx := b.ctx
	bindings, expansions := ctx.bindings, ctx.expansions
	parameters, enclosingDeclaration, mapper := ctx.typeParameters, ctx.enclosingDeclaration, ctx.mapper
	currentAlias, parameterDepth := ctx.currentTypeAlias, ctx.typeAliasParameterDepth
	inferParameters, flags := ctx.inferTypeParameters, ctx.flags
	ctx.bindings, ctx.expansions, ctx.typeParameters = nil, nil, nil
	ctx.enclosingDeclaration = alias.scope
	ctx.mapper = alias.mapper
	ctx.currentTypeAlias = alias
	ctx.inferTypeParameters = nil
	ctx.flags &^= nodebuilder.FlagsInObjectTypeLiteral | nodebuilder.FlagsInTypeAlias
	restoreScope := b.enterNewScope(alias.scope, nil, alias.typeParameters, nil, nil)
	ctx.typeAliasParameterDepth = len(ctx.typeParameters)
	return func() {
		restoreScope()
		ctx.bindings, ctx.expansions, ctx.typeParameters = bindings, expansions, parameters
		ctx.enclosingDeclaration, ctx.mapper = enclosingDeclaration, mapper
		ctx.currentTypeAlias, ctx.typeAliasParameterDepth = currentAlias, parameterDepth
		ctx.inferTypeParameters, ctx.flags = inferParameters, flags
	}
}

func (b *NodeBuilderImpl) emitSerializationTypeAliases() {
	if b.ctx.typeAliasTracker == nil || len(b.ctx.typeAliases) == 0 {
		return
	}
	// Bodies are rebuilt in their destination scope, not moved out of a source signature.
	// This also makes lexical value references and captured generic parameters independent.
	for {
		changed := false
		for i := range len(b.ctx.typeAliases) {
			alias := b.ctx.typeAliases[i]
			if alias.body == nil {
				changed = true
				restoreScope := b.enterSerializationTypeAliasScope(alias)
				b.ctx.flags |= nodebuilder.FlagsInTypeAlias
				b.ctx.skipTypeAliasReference = true
				alias.body = b.typeToTypeNode(alias.t)
				restoreScope()
				if alias.body == nil && !b.ctx.encounteredError {
					b.ctx.encounteredError = true
					b.ctx.tracker.ReportCyclicStructureError()
				}
				if b.ctx.encounteredError {
					return
				}
			}
		}
		for _, reference := range b.ctx.typeAliasReferences {
			if reference.owner == nil {
				continue
			}
			for i, parameter := range reference.alias.typeParameters {
				if !reference.alias.usedParameters[i] || !reference.freeArguments[i] {
					continue
				}
				index := slices.Index(reference.owner.typeParameters, parameter)
				if index >= 0 && !reference.owner.usedParameters[index] {
					reference.owner.usedParameters[index] = true
					changed = true
				}
			}
		}
		// Capture constraints can introduce further captures or recursive bindings.
		for _, alias := range b.ctx.typeAliases {
			restoreScope := b.enterSerializationTypeAliasScope(alias)
			for i, parameter := range alias.typeParameters {
				if alias.usedParameters[i] && alias.parameterNodes[i] == nil {
					var constraint *ast.TypeNode
					if t := b.ch.getConstraintOfTypeParameter(parameter); t != nil {
						constraint = b.typeToTypeNode(t)
					}
					var modifiers *ast.ModifierList
					if symbol := alias.t.symbol; symbol != nil && symbol.Flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface) != 0 &&
						slices.Contains(b.ch.getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol), parameter) {
						if flags := b.ch.getTypeParameterModifiers(parameter) & (ast.ModifierFlagsIn | ast.ModifierFlagsOut); flags != ast.ModifierFlagsNone {
							modifiers = b.f.NewModifierList(ast.CreateModifiersFromModifierFlags(flags, b.f.NewModifier))
						}
					}
					alias.parameterNodes[i] = b.f.NewTypeParameterDeclaration(modifiers, b.typeParameterToName(parameter).AsNode(), constraint, nil, nil)
					changed = true
				}
			}
			restoreScope()
			if b.ctx.encounteredError {
				return
			}
		}
		if !changed {
			break
		}
	}
	for _, reference := range b.ctx.typeAliasReferences {
		arguments := []*ast.TypeNode{}
		for i, argument := range reference.arguments {
			if reference.alias.usedParameters[i] {
				arguments = append(arguments, argument)
			}
		}
		if len(arguments) == 0 {
			reference.node.TypeArguments = nil
		} else {
			reference.node.TypeArguments = b.f.NewNodeList(arguments)
		}
	}
	for _, alias := range b.ctx.typeAliases {
		parameters := []*ast.Node{}
		for i, parameter := range alias.parameterNodes {
			if alias.usedParameters[i] {
				parameters = append(parameters, parameter)
			}
		}
		var parameterList *ast.NodeList
		if len(parameters) != 0 {
			parameterList = b.f.NewNodeList(parameters)
		}
		b.ctx.typeAliasTracker.AddTypeAliasDeclaration(b.f.NewTypeAliasDeclaration(nil, alias.name, parameterList, alias.body))
	}
}
