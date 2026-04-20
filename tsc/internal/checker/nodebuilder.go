package checker

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/nodebuilder"
	"github.com/microsoft/typescript-go/internal/printer"
)

type NodeBuilder struct {
	ctxStack  []*NodeBuilderContext
	host      Host
	impl      *NodeBuilderImpl
	verbosity *VerbosityContext // nil for non-hover callers
}

// VerbosityContext controls hover-expansion behavior in the node builder.
// A nil VerbosityContext means no expansion (non-hover callers).
// Level 0 = default hover (maxExpansionDepth = 0; detects expandability without expanding).
// Level 1+ = expansion enabled (maxExpansionDepth = Level).
type VerbosityContext struct {
	Level                int  // 0 = default (no expansion), 1+ = expansion depth
	MaxTruncationLength  int  // 0 = use default
	CanIncreaseVerbosity bool // output: whether increasing Level would reveal more
	Truncated            bool // output: whether output was truncated
}

// EmitContext implements NodeBuilderInterface.
func (b *NodeBuilder) EmitContext() *printer.EmitContext {
	return b.impl.e
}

func (b *NodeBuilder) enterContext(enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) {
	verbosityLevel := -1
	maxTruncationLength := 0
	if b.verbosity != nil {
		verbosityLevel = b.verbosity.Level
		maxTruncationLength = b.verbosity.MaxTruncationLength
	}
	b.ctxStack = append(b.ctxStack, b.impl.ctx)
	b.impl.ctx = &NodeBuilderContext{
		host:                     b.host,
		tracker:                  tracker,
		flags:                    flags,
		internalFlags:            internalFlags,
		maxExpansionDepth:        verbosityLevel,
		maxTruncationLength:      maxTruncationLength,
		enclosingDeclaration:     enclosingDeclaration,
		enclosingFile:            ast.GetSourceFileOfNode(enclosingDeclaration),
		inferTypeParameters:      make([]*Type, 0),
		symbolDepth:              make(map[CompositeSymbolIdentity]int),
		trackedSymbols:           make([]*TrackedSymbolArgs, 0),
		reverseMappedStack:       make([]*ast.Symbol, 0),
		enclosingSymbolTypes:     make(map[ast.SymbolId]*Type),
		remappedSymbolReferences: make(map[ast.SymbolId]*ast.Symbol),
	}
	tracker = NewSymbolTrackerImpl(b.impl.ctx, tracker)
	b.impl.ctx.tracker = tracker
}

// propagateVerbosityOut copies expansion signals from the context to the VerbosityContext output.
func (b *NodeBuilder) propagateVerbosityOut() {
	if b.verbosity != nil {
		// Only set to true, never clear — multiple calls share the same VerbosityContext
		if b.impl.ctx.canIncreaseExpansionDepth {
			b.verbosity.CanIncreaseVerbosity = true
		}
		if b.impl.ctx.expansionTruncated {
			b.verbosity.Truncated = true
		}
	}
}

func (b *NodeBuilder) popContext() {
	stackSize := len(b.ctxStack)
	if stackSize == 0 {
		b.impl.ctx = nil
	} else {
		b.impl.ctx = b.ctxStack[stackSize-1]
		b.ctxStack = b.ctxStack[:stackSize-1]
	}
}

func (b *NodeBuilder) exitContext(result *ast.Node) *ast.Node {
	b.propagateVerbosityOut()
	b.exitContextCheck()
	defer b.popContext()
	if b.impl.ctx.encounteredError {
		return nil
	}
	return result
}

func (b *NodeBuilder) exitContextSlice(result []*ast.Node) []*ast.Node {
	b.propagateVerbosityOut()
	b.exitContextCheck()
	defer b.popContext()
	if b.impl.ctx.encounteredError {
		return nil
	}
	return result
}

func (b *NodeBuilder) exitContextCheck() {
	if b.impl.ctx.truncating && b.impl.ctx.flags&nodebuilder.FlagsNoTruncation != 0 {
		b.impl.ctx.tracker.ReportTruncationError()
	}
}

// IndexInfoToIndexSignatureDeclaration implements NodeBuilderInterface.
func (b *NodeBuilder) IndexInfoToIndexSignatureDeclaration(info *IndexInfo, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
	return b.exitContext(b.impl.indexInfoToIndexSignatureDeclarationHelper(info, nil))
}

// SerializeReturnTypeForSignature implements NodeBuilderInterface.
func (b *NodeBuilder) SerializeReturnTypeForSignature(signatureDeclaration *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
	signature := b.impl.ch.getSignatureFromDeclaration(signatureDeclaration)
	return b.exitContext(b.impl.serializeReturnTypeForSignature(signature, true))
}

func (b *NodeBuilder) SerializeTypeParametersForSignature(signatureDeclaration *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) []*ast.Node {
	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
	symbol := b.impl.ch.getSymbolOfDeclaration(signatureDeclaration)
	typeParams := b.SymbolToTypeParameterDeclarations(symbol, enclosingDeclaration, flags, internalFlags, tracker)
	return b.exitContextSlice(typeParams)
}

// SerializeTypeForDeclaration implements NodeBuilderInterface.
func (b *NodeBuilder) SerializeTypeForDeclaration(declaration *ast.Node, symbol *ast.Symbol, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
	return b.exitContext(b.impl.serializeTypeForDeclaration(declaration, nil, symbol, true))
}

// SerializeTypeForExpression implements NodeBuilderInterface.
func (b *NodeBuilder) SerializeTypeForExpression(expr *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
	return b.exitContext(b.impl.serializeTypeForExpression(expr))
}

// SignatureToSignatureDeclaration implements NodeBuilderInterface.
func (b *NodeBuilder) SignatureToSignatureDeclaration(signature *Signature, kind ast.Kind, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
	return b.exitContext(b.impl.signatureToSignatureDeclarationHelper(signature, kind, nil))
}

// ExpandSymbolForHover produces declaration nodes for a symbol with verbosity level support.
func (b *NodeBuilder) ExpandSymbolForHover(symbol *ast.Symbol, meaning ast.SymbolFlags) []*ast.Node {
	b.enterContext(nil, nodebuilder.FlagsIgnoreErrors|nodebuilder.FlagsMultilineObjectLiterals|nodebuilder.FlagsUseAliasDefinedOutsideCurrentScope, nodebuilder.InternalFlagsNone, nil)

	// Push the declared type onto the type stack to prevent re-expansion.
	// We push a nil sentinel after the real type so that isTypeOnStack
	// (which skips the last element) still checks declaredType.
	declaredType := b.impl.ch.getDeclaredTypeOfSymbol(symbol)
	b.impl.ctx.typeStack = append(b.impl.ctx.typeStack, declaredType)
	b.impl.ctx.typeStack = append(b.impl.ctx.typeStack, nil)

	nodes := b.impl.expandSymbolForHover(symbol)

	b.impl.ctx.typeStack = b.impl.ctx.typeStack[:len(b.impl.ctx.typeStack)-2]

	b.propagateVerbosityOut()

	// Simplify declarations by applying original modifiers
	result := make([]*ast.Node, 0, len(nodes))
	for _, node := range nodes {
		switch node.Kind {
		case ast.KindClassDeclaration:
			result = append(result, simplifyClassDeclaration(b.impl.f, node, symbol))
		case ast.KindEnumDeclaration:
			result = append(result, simplifyModifiers(b.impl.f, node, ast.IsEnumDeclaration, symbol))
		case ast.KindInterfaceDeclaration:
			if meaning&ast.SymbolFlagsInterface != 0 {
				result = append(result, simplifyModifiers(b.impl.f, node, ast.IsInterfaceDeclaration, symbol))
			}
		case ast.KindModuleDeclaration:
			result = append(result, simplifyModifiers(b.impl.f, node, ast.IsModuleDeclaration, symbol))
		}
	}

	return b.exitContextSlice(result)
}

func simplifyClassDeclaration(f *ast.NodeFactory, classDecl *ast.Node, symbol *ast.Symbol) *ast.Node {
	classDeclarations := core.Filter(symbol.Declarations, ast.IsClassLike)
	var originalClassDecl *ast.Node
	if len(classDeclarations) > 0 {
		originalClassDecl = classDeclarations[0]
	} else {
		originalClassDecl = classDecl
	}
	modifiers := originalClassDecl.ModifierFlags() & ^(ast.ModifierFlagsExport | ast.ModifierFlagsAmbient)
	isAnonymous := ast.IsClassExpression(originalClassDecl)
	if isAnonymous {
		cd := classDecl.AsClassDeclaration()
		classDecl = f.UpdateClassDeclaration(
			cd,
			classDecl.Modifiers(),
			nil,
			cd.TypeParameters,
			cd.HeritageClauses,
			cd.Members,
		)
	}
	return ast.ReplaceModifiers(f, classDecl, f.NewModifierList(ast.CreateModifiersFromModifierFlags(modifiers, f.NewModifier)))
}

func simplifyModifiers(f *ast.NodeFactory, newDecl *ast.Node, isDeclKind func(*ast.Node) bool, symbol *ast.Symbol) *ast.Node {
	decls := core.Filter(symbol.Declarations, isDeclKind)
	var declWithModifiers *ast.Node
	if len(decls) > 0 {
		declWithModifiers = decls[0]
	} else {
		declWithModifiers = newDecl
	}
	modifiers := declWithModifiers.ModifierFlags() & ^(ast.ModifierFlagsExport | ast.ModifierFlagsAmbient)
	return ast.ReplaceModifiers(f, newDecl, f.NewModifierList(ast.CreateModifiersFromModifierFlags(modifiers, f.NewModifier)))
}

// SymbolToEntityName implements NodeBuilderInterface.
func (b *NodeBuilder) SymbolToEntityName(symbol *ast.Symbol, meaning ast.SymbolFlags, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
	return b.exitContext(b.impl.symbolToName(symbol, meaning, false))
}

// SymbolToExpression implements NodeBuilderInterface.
func (b *NodeBuilder) SymbolToExpression(symbol *ast.Symbol, meaning ast.SymbolFlags, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
	return b.exitContext(b.impl.symbolToExpression(symbol, meaning))
}

// SymbolToNode implements NodeBuilderInterface.
func (b *NodeBuilder) SymbolToNode(symbol *ast.Symbol, meaning ast.SymbolFlags, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
	return b.exitContext(b.impl.symbolToNode(symbol, meaning))
}

// SymbolToParameterDeclaration implements NodeBuilderInterface.
func (b NodeBuilder) SymbolToParameterDeclaration(symbol *ast.Symbol, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
	return b.exitContext(b.impl.symbolToParameterDeclaration(symbol, false))
}

// SymbolToTypeParameterDeclarations implements NodeBuilderInterface.
func (b *NodeBuilder) SymbolToTypeParameterDeclarations(symbol *ast.Symbol, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) []*ast.Node {
	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
	return b.exitContextSlice(b.impl.symbolToTypeParameterDeclarations(symbol))
}

// TypeParameterToDeclaration implements NodeBuilderInterface.
func (b *NodeBuilder) TypeParameterToDeclaration(parameter *Type, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
	return b.exitContext(b.impl.typeParameterToDeclaration(parameter))
}

// TypePredicateToTypePredicateNode implements NodeBuilderInterface.
func (b *NodeBuilder) TypePredicateToTypePredicateNode(predicate *TypePredicate, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
	return b.exitContext(b.impl.typePredicateToTypePredicateNode(predicate))
}

// TypeToTypeNode implements NodeBuilderInterface.
func (b *NodeBuilder) TypeToTypeNode(typ *Type, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
	return b.exitContext(b.impl.typeToTypeNode(typ))
}

func (b *NodeBuilder) TryJSTypeNodeToTypeNode(node *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
	return b.exitContext(b.impl.tryJSTypeNodeToTypeNode(node))
}

// var _ NodeBuilderInterface = NewNodeBuilderAPI(nil, nil)

func NewNodeBuilder(ch *Checker, e *printer.EmitContext) *NodeBuilder {
	return NewNodeBuilderEx(ch, e, nil /*idToSymbol*/)
}

func NewNodeBuilderEx(ch *Checker, e *printer.EmitContext, idToSymbol map[*ast.IdentifierNode]*ast.Symbol) *NodeBuilder {
	impl := newNodeBuilderImpl(ch, e, idToSymbol)
	return &NodeBuilder{impl: impl, ctxStack: make([]*NodeBuilderContext, 0, 1), host: ch.program}
}

func (c *Checker) getNodeBuilder() *NodeBuilder {
	return c.getNodeBuilderEx(nil /*idToSymbol*/)
}

func (c *Checker) getNodeBuilderEx(idToSymbol map[*ast.IdentifierNode]*ast.Symbol) *NodeBuilder {
	b := NewNodeBuilderEx(c, printer.NewEmitContext(), idToSymbol)
	return b
}
