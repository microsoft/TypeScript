package checker

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/nodebuilder"
	"github.com/microsoft/typescript-go/internal/printer"
)

type NodeBuilder struct {
	ctxStack  []*NodeBuilderContext
	basicHost Host
	impl      *nodeBuilderImpl
}

// EmitContext implements NodeBuilderInterface.
func (b *NodeBuilder) EmitContext() *printer.EmitContext {
	return b.impl.e
}

func (b *NodeBuilder) enterContext(enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) {
	b.ctxStack = append(b.ctxStack, b.impl.ctx)
	b.impl.ctx = &NodeBuilderContext{
		tracker:                  tracker,
		flags:                    flags,
		internalFlags:            internalFlags,
		enclosingDeclaration:     enclosingDeclaration,
		enclosingFile:            ast.GetSourceFileOfNode(enclosingDeclaration),
		inferTypeParameters:      make([]*Type, 0),
		symbolDepth:              make(map[CompositeSymbolIdentity]int),
		trackedSymbols:           make([]*TrackedSymbolArgs, 0),
		reverseMappedStack:       make([]*ast.Symbol, 0),
		enclosingSymbolTypes:     make(map[ast.SymbolId]*Type),
		remappedSymbolReferences: make(map[ast.SymbolId]*ast.Symbol),
	}
	// TODO: always provide this; see https://github.com/microsoft/typescript-go/pull/1588#pullrequestreview-3125218673
	var moduleResolverHost Host
	if tracker != nil {
		moduleResolverHost = tracker.GetModuleSpecifierGenerationHost()
	} else if internalFlags&nodebuilder.InternalFlagsDoNotIncludeSymbolChain != 0 {
		moduleResolverHost = b.basicHost
	}
	tracker = NewSymbolTrackerImpl(b.impl.ctx, tracker, moduleResolverHost)
	b.impl.ctx.tracker = tracker
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
	b.exitContextCheck()
	defer b.popContext()
	if b.impl.ctx.encounteredError {
		return nil
	}
	return result
}

func (b *NodeBuilder) exitContextSlice(result []*ast.Node) []*ast.Node {
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
	symbol := b.impl.ch.getSymbolOfDeclaration(signatureDeclaration)
	returnType, ok := b.impl.ctx.enclosingSymbolTypes[ast.GetSymbolId(symbol)]
	if !ok || returnType == nil {
		returnType = b.impl.ch.instantiateType(b.impl.ch.getReturnTypeOfSignature(signature), b.impl.ctx.mapper)
	}
	return b.exitContext(b.impl.serializeInferredReturnTypeForSignature(signature, returnType))
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
	return b.exitContext(b.impl.serializeTypeForDeclaration(declaration, nil, symbol))
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

// SymbolTableToDeclarationStatements implements NodeBuilderInterface.
func (b *NodeBuilder) SymbolTableToDeclarationStatements(symbolTable *ast.SymbolTable, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) []*ast.Node {
	b.enterContext(enclosingDeclaration, flags, internalFlags, tracker)
	return b.exitContextSlice(b.impl.symbolTableToDeclarationStatements(symbolTable))
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

// var _ NodeBuilderInterface = NewNodeBuilderAPI(nil, nil)

func NewNodeBuilder(ch *Checker, e *printer.EmitContext) *NodeBuilder {
	impl := newNodeBuilderImpl(ch, e)
	return &NodeBuilder{impl: impl, ctxStack: make([]*NodeBuilderContext, 0, 1), basicHost: ch.program}
}

func (c *Checker) getNodeBuilder() *NodeBuilder {
	return NewNodeBuilder(c, printer.NewEmitContext())
}
