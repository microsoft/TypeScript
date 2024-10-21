package compiler

import (
	"slices"
	"strconv"

	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
)

type ContainerFlags int32

const (
	// The current node is not a container, and no container manipulation should happen before
	// recursing into it.
	ContainerFlagsNone ContainerFlags = 0
	// The current node is a container.  It should be set as the current container (and block-
	// container) before recursing into it.  The current node does not have locals.  Examples:
	//
	//      Classes, ObjectLiterals, TypeLiterals, Interfaces...
	ContainerFlagsIsContainer ContainerFlags = 1 << 0
	// The current node is a block-scoped-container.  It should be set as the current block-
	// container before recursing into it.  Examples:
	//
	//      Blocks (when not parented by functions), Catch clauses, For/For-in/For-of statements...
	ContainerFlagsIsBlockScopedContainer ContainerFlags = 1 << 1
	// The current node is the container of a control flow path. The current control flow should
	// be saved and restored, and a new control flow initialized within the container.
	ContainerFlagsIsControlFlowContainer                           ContainerFlags = 1 << 2
	ContainerFlagsIsFunctionLike                                   ContainerFlags = 1 << 3
	ContainerFlagsIsFunctionExpression                             ContainerFlags = 1 << 4
	ContainerFlagsHasLocals                                        ContainerFlags = 1 << 5
	ContainerFlagsIsInterface                                      ContainerFlags = 1 << 6
	ContainerFlagsIsObjectLiteralOrClassExpressionMethodOrAccessor ContainerFlags = 1 << 7
)

type Binder struct {
	file                   *SourceFile
	options                *CompilerOptions
	languageVersion        ScriptTarget
	parent                 *Node
	container              *Node
	thisParentContainer    *Node
	blockScopeContainer    *Node
	lastContainer          *Node
	currentFlow            *FlowNode
	currentBreakTarget     *FlowLabel
	currentContinueTarget  *FlowLabel
	currentReturnTarget    *FlowLabel
	currentTrueTarget      *FlowLabel
	currentFalseTarget     *FlowLabel
	currentExceptionTarget *FlowLabel
	preSwitchCaseFlow      *FlowNode
	activeLabelList        *ActiveLabel
	emitFlags              NodeFlags
	seenThisKeyword        bool
	hasExplicitReturn      bool
	hasFlowEffects         bool
	inStrictMode           bool
	inAssignmentPattern    bool
	symbolCount            int
	classifiableNames      map[string]bool
	symbolPool             Pool[Symbol]
	flowNodePool           Pool[FlowNode]
	flowListPool           Pool[FlowList]
	singleDeclarations     []*Node
}

type ModuleInstanceState int32

const (
	ModuleInstanceStateUnknown ModuleInstanceState = iota
	ModuleInstanceStateNonInstantiated
	ModuleInstanceStateInstantiated
	ModuleInstanceStateConstEnumOnly
)

type ActiveLabel struct {
	next           *ActiveLabel
	breakTarget    *FlowLabel
	continueTarget *FlowLabel
	name           string
	referenced     bool
}

func (label *ActiveLabel) BreakTarget() *FlowNode    { return label.breakTarget }
func (label *ActiveLabel) ContinueTarget() *FlowNode { return label.continueTarget }

func bindSourceFile(file *SourceFile, options *CompilerOptions) {
	if !file.isBound {
		b := &Binder{}
		b.file = file
		b.options = options
		b.languageVersion = getEmitScriptTarget(options)
		b.classifiableNames = make(map[string]bool)
		b.bind(file.AsNode())
		file.isBound = true
		file.symbolCount = b.symbolCount
		file.classifiableNames = b.classifiableNames
	}
}

func (b *Binder) newSymbol(flags SymbolFlags, name string) *Symbol {
	b.symbolCount++
	result := b.symbolPool.New()
	result.flags = flags
	result.name = name
	return result
}

func getMembers(symbol *Symbol) SymbolTable {
	if symbol.members == nil {
		symbol.members = make(SymbolTable)
	}
	return symbol.members
}

func getExports(symbol *Symbol) SymbolTable {
	if symbol.exports == nil {
		symbol.exports = make(SymbolTable)
	}
	return symbol.exports
}

func getLocals(container *Node) SymbolTable {
	data := container.LocalsContainerData()
	if data.locals == nil {
		data.locals = make(SymbolTable)
	}
	return data.locals
}

/**
 * Declares a Symbol for the node and adds it to symbols. Reports errors for conflicting identifier names.
 * @param symbolTable - The symbol table which node will be added to.
 * @param parent - node's parent declaration.
 * @param node - The declaration to be added to the symbol table
 * @param includes - The SymbolFlags that node has in addition to its declaration type (eg: export, ambient, etc.)
 * @param excludes - The flags which node cannot be declared alongside in a symbol table. Used to report forbidden declarations.
 */
func (b *Binder) declareSymbol(symbolTable SymbolTable, parent *Symbol, node *Node, includes SymbolFlags, excludes SymbolFlags) *Symbol {
	return b.declareSymbolEx(symbolTable, parent, node, includes, excludes, false /*isReplaceableByMethod*/, false /*isComputedName*/)
}

func (b *Binder) declareSymbolEx(symbolTable SymbolTable, parent *Symbol, node *Node, includes SymbolFlags, excludes SymbolFlags, isReplaceableByMethod bool, isComputedName bool) *Symbol {
	//Debug.assert(isComputedName || !hasDynamicName(node))
	isDefaultExport := hasSyntacticModifier(node, ModifierFlagsDefault) || isExportSpecifier(node) && moduleExportNameIsDefault(node.AsExportSpecifier().name)
	// The exported symbol for an export default function/class node is always named "default"
	var name string
	switch {
	case isComputedName:
		name = InternalSymbolNameComputed
	case isDefaultExport && b.parent != nil:
		name = InternalSymbolNameDefault
	default:
		name = b.getDeclarationName(node)
	}
	var symbol *Symbol
	if name == InternalSymbolNameMissing {
		symbol = b.newSymbol(SymbolFlagsNone, InternalSymbolNameMissing)
	} else {
		// Check and see if the symbol table already has a symbol with this name.  If not,
		// create a new symbol with this name and add it to the table.  Note that we don't
		// give the new symbol any flags *yet*.  This ensures that it will not conflict
		// with the 'excludes' flags we pass in.
		//
		// If we do get an existing symbol, see if it conflicts with the new symbol we're
		// creating.  For example, a 'var' symbol and a 'class' symbol will conflict within
		// the same symbol table.  If we have a conflict, report the issue on each
		// declaration we have for this symbol, and then create a new symbol for this
		// declaration.
		//
		// Note that when properties declared in Javascript constructors
		// (marked by isReplaceableByMethod) conflict with another symbol, the property loses.
		// Always. This allows the common Javascript pattern of overwriting a prototype method
		// with an bound instance method of the same type: `this.method = this.method.bind(this)`
		//
		// If we created a new symbol, either because we didn't have a symbol with this name
		// in the symbol table, or we conflicted with an existing symbol, then just add this
		// node as the sole declaration of the new symbol.
		//
		// Otherwise, we'll be merging into a compatible existing symbol (for example when
		// you have multiple 'vars' with the same name in the same container).  In this case
		// just add this node into the declarations list of the symbol.
		symbol = symbolTable[name]
		if includes&SymbolFlagsClassifiable != 0 {
			b.classifiableNames[name] = true
		}
		if symbol == nil {
			symbol = b.newSymbol(SymbolFlagsNone, name)
			symbolTable[name] = symbol
			if isReplaceableByMethod {
				symbol.isReplaceableByMethod = true
			}
		} else if isReplaceableByMethod && !symbol.isReplaceableByMethod {
			// A symbol already exists, so don't add this as a declaration.
			return symbol
		} else if symbol.flags&excludes != 0 {
			if symbol.isReplaceableByMethod {
				// Javascript constructor-declared symbols can be discarded in favor of
				// prototype symbols like methods.
				symbol = b.newSymbol(SymbolFlagsNone, name)
				symbolTable[name] = symbol
			} else if includes&SymbolFlagsVariable == 0 || symbol.flags&SymbolFlagsAssignment == 0 {
				// Assignment declarations are allowed to merge with variables, no matter what other flags they have.
				if node.Name() != nil {
					setParent(node.Name(), node)
				}
				// Report errors every position with duplicate declaration
				// Report errors on previous encountered declarations
				var message *diagnostics.Message
				if symbol.flags&SymbolFlagsBlockScopedVariable != 0 {
					message = diagnostics.Cannot_redeclare_block_scoped_variable_0
				} else {
					message = diagnostics.Duplicate_identifier_0
				}
				messageNeedsName := true
				if symbol.flags&SymbolFlagsEnum != 0 || includes&SymbolFlagsEnum != 0 {
					message = diagnostics.Enum_declarations_can_only_merge_with_namespace_or_other_enum_declarations
					messageNeedsName = false
				}
				multipleDefaultExports := false
				if len(symbol.declarations) != 0 {
					// If the current node is a default export of some sort, then check if
					// there are any other default exports that we need to error on.
					// We'll know whether we have other default exports depending on if `symbol` already has a declaration list set.
					if isDefaultExport {
						message = diagnostics.A_module_cannot_have_multiple_default_exports
						messageNeedsName = false
						multipleDefaultExports = true
					} else {
						// This is to properly report an error in the case "export default { }" is after export default of class declaration or function declaration.
						// Error on multiple export default in the following case:
						// 1. multiple export default of class declaration or function declaration by checking NodeFlags.Default
						// 2. multiple export default of export assignment. This one doesn't have NodeFlags.Default on (as export default doesn't considered as modifiers)
						if len(symbol.declarations) != 0 && isExportAssignment(node) && !node.AsExportAssignment().isExportEquals {
							message = diagnostics.A_module_cannot_have_multiple_default_exports
							messageNeedsName = false
							multipleDefaultExports = true
						}
					}
				}
				var relatedInformation []*Diagnostic
				if isTypeAliasDeclaration(node) && nodeIsMissing(node.AsTypeAliasDeclaration().typeNode) && hasSyntacticModifier(node, ModifierFlagsExport) && symbol.flags&(SymbolFlagsAlias|SymbolFlagsType|SymbolFlagsNamespace) != 0 {
					// export type T; - may have meant export type { T }?
					relatedInformation = append(relatedInformation, b.createDiagnosticForNode(node, diagnostics.Did_you_mean_0,
						"export type { "+node.AsTypeAliasDeclaration().name.AsIdentifier().text+" }"))
				}
				var declarationName *Node = getNameOfDeclaration(node)
				if declarationName == nil {
					declarationName = node
				}
				for index, declaration := range symbol.declarations {
					var decl *Node = getNameOfDeclaration(declaration)
					if decl == nil {
						decl = declaration
					}
					var diag *Diagnostic
					if messageNeedsName {
						diag = b.createDiagnosticForNode(decl, message, b.getDisplayName(declaration))
					} else {
						diag = b.createDiagnosticForNode(decl, message)
					}
					if multipleDefaultExports {
						addRelatedInfo(diag, b.createDiagnosticForNode(declarationName, ifElse(index == 0, diagnostics.Another_export_default_is_here, diagnostics.X_and_here)))
					}
					b.addDiagnostic(diag)
					if multipleDefaultExports {
						relatedInformation = append(relatedInformation, b.createDiagnosticForNode(decl, diagnostics.The_first_export_default_is_here))
					}
				}
				var diag *Diagnostic
				if messageNeedsName {
					diag = b.createDiagnosticForNode(declarationName, message, b.getDisplayName(node))
				} else {
					diag = b.createDiagnosticForNode(declarationName, message)
				}
				b.addDiagnostic(addRelatedInfo(diag, relatedInformation...))
				symbol = b.newSymbol(SymbolFlagsNone, name)
			}
		}
	}
	b.addDeclarationToSymbol(symbol, node, includes)
	if symbol.parent == nil {
		symbol.parent = parent
	} else if symbol.parent != parent {
		panic("Existing symbol parent should match new one")
	}
	return symbol
}

// Should not be called on a declaration with a computed property name,
// unless it is a well known Symbol.
func (b *Binder) getDeclarationName(node *Node) string {
	if isExportAssignment(node) {
		return ifElse(node.AsExportAssignment().isExportEquals, InternalSymbolNameExportEquals, InternalSymbolNameDefault)
	}
	name := getNameOfDeclaration(node)
	if name != nil {
		if isAmbientModule(node) {
			moduleName := getTextOfIdentifierOrLiteral(name)
			if isGlobalScopeAugmentation(node) {
				return InternalSymbolNameGlobal
			}
			return "\"" + moduleName + "\""
		}
		if isPrivateIdentifier(name) {
			// containingClass exists because private names only allowed inside classes
			containingClass := getContainingClass(node)
			if containingClass == nil {
				// we can get here in cases where there is already a parse error.
				return InternalSymbolNameMissing
			}
			containingClassSymbol := getSymbolFromNode(containingClass)
			return getSymbolNameForPrivateIdentifier(containingClassSymbol, getTextOfIdentifierOrLiteral(name))
		}
		if isPropertyNameLiteral(name) {
			return getTextOfIdentifierOrLiteral(name)
		}
		if isComputedPropertyName(name) {
			nameExpression := name.AsComputedPropertyName().expression
			// treat computed property names where expression is string/numeric literal as just string/numeric literal
			if isStringOrNumericLiteralLike(nameExpression) {
				return getTextOfIdentifierOrLiteral(nameExpression)
			}
			if isSignedNumericLiteral(nameExpression) {
				unaryExpression := nameExpression.AsPrefixUnaryExpression()
				return TokenToString(unaryExpression.operator) + getTextOfIdentifierOrLiteral(unaryExpression.operand)
			}
			panic("Only computed properties with literal names have declaration names")
		}
		// if isJsxNamespacedName(name) {
		// 	return getEscapedTextOfJsxNamespacedName(name)
		// }
		return InternalSymbolNameMissing
	}
	switch node.kind {
	case SyntaxKindConstructor:
		return InternalSymbolNameConstructor
	case SyntaxKindFunctionType, SyntaxKindCallSignature:
		return InternalSymbolNameCall
	case SyntaxKindConstructorType, SyntaxKindConstructSignature:
		return InternalSymbolNameNew
	case SyntaxKindIndexSignature:
		return InternalSymbolNameIndex
	case SyntaxKindExportDeclaration:
		return InternalSymbolNameExportStar
	case SyntaxKindSourceFile:
		return InternalSymbolNameExportEquals
	}
	return InternalSymbolNameMissing
}

func (b *Binder) getDisplayName(node *Node) string {
	nameNode := node.Name()
	if nameNode != nil {
		return declarationNameToString(nameNode)
	}
	name := b.getDeclarationName(node)
	if name != InternalSymbolNameMissing {
		return name
	}
	return "(Missing)"
}

func moduleExportNameIsDefault(node *Node) bool {
	return getTextOfIdentifierOrLiteral(node) == InternalSymbolNameDefault
}

func getSymbolNameForPrivateIdentifier(containingClassSymbol *Symbol, description string) string {
	return InternalSymbolNamePrefix + "#" + strconv.Itoa(int(getSymbolId(containingClassSymbol))) + "@" + description
}

func (b *Binder) declareModuleMember(node *Node, symbolFlags SymbolFlags, symbolExcludes SymbolFlags) *Symbol {
	hasExportModifier := getCombinedModifierFlags(node)&ModifierFlagsExport != 0
	if symbolFlags&SymbolFlagsAlias != 0 {
		if node.kind == SyntaxKindExportSpecifier || (node.kind == SyntaxKindImportEqualsDeclaration && hasExportModifier) {
			return b.declareSymbol(getExports(b.container.Symbol()), b.container.Symbol(), node, symbolFlags, symbolExcludes)
		}
		return b.declareSymbol(getLocals(b.container), nil /*parent*/, node, symbolFlags, symbolExcludes)
	}
	// Exported module members are given 2 symbols: A local symbol that is classified with an ExportValue flag,
	// and an associated export symbol with all the correct flags set on it. There are 2 main reasons:
	//
	//   1. We treat locals and exports of the same name as mutually exclusive within a container.
	//      That means the binder will issue a Duplicate Identifier error if you mix locals and exports
	//      with the same name in the same container.
	//      TODO: Make this a more specific error and decouple it from the exclusion logic.
	//   2. When we checkIdentifier in the checker, we set its resolved symbol to the local symbol,
	//      but return the export symbol (by calling getExportSymbolOfValueSymbolIfExported). That way
	//      when the emitter comes back to it, it knows not to qualify the name if it was found in a containing scope.
	//
	// NOTE: Nested ambient modules always should go to to 'locals' table to prevent their automatic merge
	//       during global merging in the checker. Why? The only case when ambient module is permitted inside another module is module augmentation
	//       and this case is specially handled. Module augmentations should only be merged with original module definition
	//       and should never be merged directly with other augmentation, and the latter case would be possible if automatic merge is allowed.
	if !isAmbientModule(node) && (hasExportModifier || b.container.flags&NodeFlagsExportContext != 0) {
		if !isLocalsContainer(b.container) || (hasSyntacticModifier(node, ModifierFlagsDefault) && b.getDeclarationName(node) == InternalSymbolNameMissing) {
			return b.declareSymbol(getExports(b.container.Symbol()), b.container.Symbol(), node, symbolFlags, symbolExcludes)
			// No local symbol for an unnamed default!
		}
		exportKind := SymbolFlagsNone
		if symbolFlags&SymbolFlagsValue != 0 {
			exportKind = SymbolFlagsExportValue
		}
		local := b.declareSymbol(getLocals(b.container), nil /*parent*/, node, exportKind, symbolExcludes)
		local.exportSymbol = b.declareSymbol(getExports(b.container.Symbol()), b.container.Symbol(), node, symbolFlags, symbolExcludes)
		node.ExportableData().localSymbol = local
		return local
	}
	return b.declareSymbol(getLocals(b.container), nil /*parent*/, node, symbolFlags, symbolExcludes)
}

func (b *Binder) declareClassMember(node *Node, symbolFlags SymbolFlags, symbolExcludes SymbolFlags) *Symbol {
	if isStatic(node) {
		return b.declareSymbol(getExports(b.container.Symbol()), b.container.Symbol(), node, symbolFlags, symbolExcludes)
	}
	return b.declareSymbol(getMembers(b.container.Symbol()), b.container.Symbol(), node, symbolFlags, symbolExcludes)
}

func (b *Binder) declareSourceFileMember(node *Node, symbolFlags SymbolFlags, symbolExcludes SymbolFlags) *Symbol {
	if isExternalModule(b.file) {
		return b.declareModuleMember(node, symbolFlags, symbolExcludes)
	}
	return b.declareSymbol(getLocals(b.file.AsNode()), nil /*parent*/, node, symbolFlags, symbolExcludes)
}

func (b *Binder) declareSymbolAndAddToSymbolTable(node *Node, symbolFlags SymbolFlags, symbolExcludes SymbolFlags) *Symbol {
	switch b.container.kind {
	case SyntaxKindModuleDeclaration:
		return b.declareModuleMember(node, symbolFlags, symbolExcludes)
	case SyntaxKindSourceFile:
		return b.declareSourceFileMember(node, symbolFlags, symbolExcludes)
	case SyntaxKindClassExpression, SyntaxKindClassDeclaration:
		return b.declareClassMember(node, symbolFlags, symbolExcludes)
	case SyntaxKindEnumDeclaration:
		return b.declareSymbol(getExports(b.container.Symbol()), b.container.Symbol(), node, symbolFlags, symbolExcludes)
	case SyntaxKindTypeLiteral, SyntaxKindJSDocTypeLiteral, SyntaxKindObjectLiteralExpression, SyntaxKindInterfaceDeclaration, SyntaxKindJsxAttributes:
		return b.declareSymbol(getMembers(b.container.Symbol()), b.container.Symbol(), node, symbolFlags, symbolExcludes)
	case SyntaxKindFunctionType, SyntaxKindConstructorType, SyntaxKindCallSignature, SyntaxKindConstructSignature, SyntaxKindJSDocSignature,
		SyntaxKindIndexSignature, SyntaxKindMethodDeclaration, SyntaxKindMethodSignature, SyntaxKindConstructor, SyntaxKindGetAccessor,
		SyntaxKindSetAccessor, SyntaxKindFunctionDeclaration, SyntaxKindFunctionExpression, SyntaxKindArrowFunction, SyntaxKindJSDocFunctionType,
		SyntaxKindClassStaticBlockDeclaration, SyntaxKindTypeAliasDeclaration, SyntaxKindMappedType:
		return b.declareSymbol(getLocals(b.container), nil /*parent*/, node, symbolFlags, symbolExcludes)
	}
	panic("Unhandled case in declareSymbolAndAddToSymbolTable")
}

func (b *Binder) newFlowNode(flags FlowFlags) *FlowNode {
	result := b.flowNodePool.New()
	result.flags = flags
	return result
}

func (b *Binder) newFlowNodeEx(flags FlowFlags, node any, antecedent *FlowNode) *FlowNode {
	result := b.newFlowNode(flags)
	result.node = node
	result.antecedent = antecedent
	return result
}

func (b *Binder) createLoopLabel() *FlowLabel {
	return b.newFlowNode(FlowFlagsLoopLabel)
}

func (b *Binder) createBranchLabel() *FlowLabel {
	return b.newFlowNode(FlowFlagsBranchLabel)
}

func (b *Binder) createReduceLabel(target *FlowLabel, antecedents *FlowList, antecedent *FlowNode) *FlowNode {
	return b.newFlowNodeEx(FlowFlagsReduceLabel, &FlowReduceLabelData{target, antecedents}, antecedent)
}

func (b *Binder) createFlowCondition(flags FlowFlags, antecedent *FlowNode, expression *Node) *FlowNode {
	if antecedent.flags&FlowFlagsUnreachable != 0 {
		return antecedent
	}
	if expression == nil {
		if flags&FlowFlagsTrueCondition != 0 {
			return antecedent
		}
		return unreachableFlow
	}
	if (expression.kind == SyntaxKindTrueKeyword && flags&FlowFlagsFalseCondition != 0 || expression.kind == SyntaxKindFalseKeyword && flags&FlowFlagsTrueCondition != 0) && !isExpressionOfOptionalChainRoot(expression) && !isNullishCoalesce(expression.parent) {
		return unreachableFlow
	}
	if !isNarrowingExpression(expression) {
		return antecedent
	}
	setFlowNodeReferenced(antecedent)
	return b.newFlowNodeEx(flags, expression, antecedent)
}

func (b *Binder) createFlowMutation(flags FlowFlags, antecedent *FlowNode, node *Node) *FlowNode {
	setFlowNodeReferenced(antecedent)
	b.hasFlowEffects = true
	result := b.newFlowNodeEx(flags, node, antecedent)
	if b.currentExceptionTarget != nil {
		b.addAntecedent(b.currentExceptionTarget, result)
	}
	return result
}

func (b *Binder) createFlowSwitchClause(antecedent *FlowNode, switchStatement *SwitchStatement, clauseStart int32, clauseEnd int32) *FlowNode {
	setFlowNodeReferenced(antecedent)
	return b.newFlowNodeEx(FlowFlagsSwitchClause, &FlowSwitchClauseData{switchStatement, clauseStart, clauseEnd}, antecedent)
}

func (b *Binder) createFlowCall(antecedent *FlowNode, node *CallExpression) *FlowNode {
	setFlowNodeReferenced(antecedent)
	b.hasFlowEffects = true
	return b.newFlowNodeEx(FlowFlagsCall, node, antecedent)
}

func (b *Binder) newFlowList(head *FlowNode, tail *FlowList) *FlowList {
	result := b.flowListPool.New()
	result.node = head
	result.next = tail
	return result
}

func (b *Binder) combineFlowLists(head *FlowList, tail *FlowList) *FlowList {
	if head == nil {
		return tail
	}
	return b.newFlowList(head.node, b.combineFlowLists(head.next, tail))
}

func (b *Binder) newSingleDeclaration(declaration *Node) []*Node {
	if len(b.singleDeclarations) == cap(b.singleDeclarations) {
		b.singleDeclarations = make([]*Node, 0, nextPoolSize(len(b.singleDeclarations)))
	}
	index := len(b.singleDeclarations)
	b.singleDeclarations = b.singleDeclarations[:index+1]
	b.singleDeclarations[index] = declaration
	return b.singleDeclarations[index : index+1 : index+1]
}

func setFlowNodeReferenced(flow *FlowNode) {
	// On first reference we set the Referenced flag, thereafter we set the Shared flag
	if flow.flags&FlowFlagsReferenced == 0 {
		flow.flags |= FlowFlagsReferenced
	} else {
		flow.flags |= FlowFlagsShared
	}
}

func hasAntecedent(list *FlowList, antecedent *FlowNode) bool {
	for list != nil {
		if list.node == antecedent {
			return true
		}
		list = list.next
	}
	return false
}

func (b *Binder) addAntecedent(label *FlowLabel, antecedent *FlowNode) {
	if antecedent.flags&FlowFlagsUnreachable == 0 && !hasAntecedent(label.antecedents, antecedent) {
		label.antecedents = b.newFlowList(antecedent, label.antecedents)
		setFlowNodeReferenced(antecedent)
	}
}

func finishFlowLabel(label *FlowLabel) *FlowNode {
	if label.antecedents == nil {
		return unreachableFlow
	}
	if label.antecedents.next == nil {
		return label.antecedents.node
	}
	return label
}

func (b *Binder) bind(node *Node) bool {
	if !exists(node) {
		return false
	}
	node.parent = b.parent
	saveInStrictMode := b.inStrictMode
	// Even though in the AST the jsdoc @typedef node belongs to the current node,
	// its symbol might be in the same scope with the current node's symbol. Consider:
	//
	//     /** @typedef {string | number} MyType */
	//     function foo();
	//
	// Here the current node is "foo", which is a container, but the scope of "MyType" should
	// not be inside "foo". Therefore we always bind @typedef before bind the parent node,
	// and skip binding this tag later when binding all the other jsdoc tags.

	// First we bind declaration nodes to a symbol if possible. We'll both create a symbol
	// and then potentially add the symbol to an appropriate symbol table. Possible
	// destination symbol tables are:
	//
	//  1) The 'exports' table of the current container's symbol.
	//  2) The 'members' table of the current container's symbol.
	//  3) The 'locals' table of the current container.
	//
	// However, not all symbols will end up in any of these tables. 'Anonymous' symbols
	// (like TypeLiterals for example) will not be put in any table.
	b.bindWorker(node)
	// Then we recurse into the children of the node to bind them as well. For certain
	// symbols we do specialized work when we recurse. For example, we'll keep track of
	// the current 'container' node when it changes. This helps us know which symbol table
	// a local should go into for example. Since terminal nodes are known not to have
	// children, as an optimization we don't process those.
	if node.kind > SyntaxKindLastToken {
		saveParent := b.parent
		b.parent = node
		containerFlags := getContainerFlags(node)
		if containerFlags == ContainerFlagsNone {
			b.bindChildren(node)
		} else {
			b.bindContainer(node, containerFlags)
		}
		b.parent = saveParent
	} else {
		saveParent := b.parent
		if node.kind == SyntaxKindEndOfFile {
			b.parent = node
		}
		b.parent = saveParent
	}
	b.inStrictMode = saveInStrictMode
	return false
}

func (b *Binder) bindWorker(node *Node) {
	switch node.kind {
	case SyntaxKindIdentifier:
		node.AsIdentifier().flowNode = b.currentFlow
		b.checkContextualIdentifier(node)
	case SyntaxKindThisKeyword, SyntaxKindSuperKeyword:
		node.AsKeywordExpression().flowNode = b.currentFlow
	case SyntaxKindQualifiedName:
		if b.currentFlow != nil && isPartOfTypeQuery(node) {
			node.AsQualifiedName().flowNode = b.currentFlow
		}
	case SyntaxKindMetaProperty:
		node.AsMetaProperty().flowNode = b.currentFlow
	case SyntaxKindPrivateIdentifier:
		b.checkPrivateIdentifier(node)
	case SyntaxKindPropertyAccessExpression, SyntaxKindElementAccessExpression:
		if b.currentFlow != nil && isNarrowableReference(node) {
			setFlowNode(node, b.currentFlow)
		}
	case SyntaxKindBinaryExpression:
		if isFunctionPropertyAssignment(node) {
			b.bindFunctionPropertyAssignment(node)
		}
		b.checkStrictModeBinaryExpression(node)
	case SyntaxKindCatchClause:
		b.checkStrictModeCatchClause(node)
	case SyntaxKindDeleteExpression:
		b.checkStrictModeDeleteExpression(node)
	case SyntaxKindPostfixUnaryExpression:
		b.checkStrictModePostfixUnaryExpression(node)
	case SyntaxKindPrefixUnaryExpression:
		b.checkStrictModePrefixUnaryExpression(node)
	case SyntaxKindWithStatement:
		b.checkStrictModeWithStatement(node)
	case SyntaxKindLabeledStatement:
		b.checkStrictModeLabeledStatement(node)
	case SyntaxKindThisType:
		b.seenThisKeyword = true
	case SyntaxKindTypeParameter:
		b.bindTypeParameter(node)
	case SyntaxKindParameter:
		b.bindParameter(node)
	case SyntaxKindVariableDeclaration:
		b.bindVariableDeclarationOrBindingElement(node)
	case SyntaxKindBindingElement:
		node.AsBindingElement().flowNode = b.currentFlow
		b.bindVariableDeclarationOrBindingElement(node)
	case SyntaxKindPropertyDeclaration, SyntaxKindPropertySignature:
		b.bindPropertyWorker(node)
	case SyntaxKindPropertyAssignment, SyntaxKindShorthandPropertyAssignment:
		b.bindPropertyOrMethodOrAccessor(node, SymbolFlagsProperty, SymbolFlagsPropertyExcludes)
	case SyntaxKindEnumMember:
		b.bindPropertyOrMethodOrAccessor(node, SymbolFlagsEnumMember, SymbolFlagsEnumMemberExcludes)
	case SyntaxKindCallSignature, SyntaxKindConstructSignature, SyntaxKindIndexSignature:
		b.declareSymbolAndAddToSymbolTable(node, SymbolFlagsSignature, SymbolFlagsNone)
	case SyntaxKindMethodDeclaration, SyntaxKindMethodSignature:
		b.bindPropertyOrMethodOrAccessor(node, SymbolFlagsMethod|ifElse(getPostfixTokenFromNode(node) != nil, SymbolFlagsOptional, SymbolFlagsNone), ifElse(isObjectLiteralMethod(node), SymbolFlagsPropertyExcludes, SymbolFlagsMethodExcludes))
	case SyntaxKindFunctionDeclaration:
		b.bindFunctionDeclaration(node)
	case SyntaxKindConstructor:
		b.declareSymbolAndAddToSymbolTable(node, SymbolFlagsConstructor, SymbolFlagsNone)
	case SyntaxKindGetAccessor:
		b.bindPropertyOrMethodOrAccessor(node, SymbolFlagsGetAccessor, SymbolFlagsGetAccessorExcludes)
	case SyntaxKindSetAccessor:
		b.bindPropertyOrMethodOrAccessor(node, SymbolFlagsSetAccessor, SymbolFlagsSetAccessorExcludes)
	case SyntaxKindFunctionType, SyntaxKindConstructorType:
		// !!! SyntaxKindJSDocFunctionType
		// !!! SyntaxKindJSDocSignature
		b.bindFunctionOrConstructorType(node)
	case SyntaxKindTypeLiteral, SyntaxKindMappedType:
		// !!! SyntaxKindJSDocTypeLiteral
		b.bindAnonymousDeclaration(node, SymbolFlagsTypeLiteral, InternalSymbolNameType)
	case SyntaxKindObjectLiteralExpression:
		b.bindAnonymousDeclaration(node, SymbolFlagsObjectLiteral, InternalSymbolNameObject)
	case SyntaxKindFunctionExpression, SyntaxKindArrowFunction:
		b.bindFunctionExpression(node)
	case SyntaxKindClassExpression, SyntaxKindClassDeclaration:
		b.inStrictMode = true
		b.bindClassLikeDeclaration(node)
	case SyntaxKindInterfaceDeclaration:
		b.bindBlockScopedDeclaration(node, SymbolFlagsInterface, SymbolFlagsInterfaceExcludes)
	case SyntaxKindTypeAliasDeclaration:
		b.bindBlockScopedDeclaration(node, SymbolFlagsTypeAlias, SymbolFlagsTypeAliasExcludes)
	case SyntaxKindEnumDeclaration:
		b.bindEnumDeclaration(node)
	case SyntaxKindModuleDeclaration:
		b.bindModuleDeclaration(node)
	case SyntaxKindImportEqualsDeclaration, SyntaxKindNamespaceImport, SyntaxKindImportSpecifier, SyntaxKindExportSpecifier:
		b.declareSymbolAndAddToSymbolTable(node, SymbolFlagsAlias, SymbolFlagsAliasExcludes)
	case SyntaxKindNamespaceExportDeclaration:
		b.bindNamespaceExportDeclaration(node)
	case SyntaxKindImportClause:
		b.bindImportClause(node)
	case SyntaxKindExportDeclaration:
		b.bindExportDeclaration(node)
	case SyntaxKindExportAssignment:
		b.bindExportAssignment(node)
	case SyntaxKindSourceFile:
		b.updateStrictModeStatementList(node.AsSourceFile().statements)
		b.bindSourceFileIfExternalModule()
	case SyntaxKindBlock:
		if isFunctionLikeOrClassStaticBlockDeclaration(node.parent) {
			b.updateStrictModeStatementList(node.AsBlock().statements)
		}
	case SyntaxKindModuleBlock:
		b.updateStrictModeStatementList(node.AsModuleBlock().statements)
	case SyntaxKindJsxAttributes:
		b.bindJsxAttributes(node)
	case SyntaxKindJsxAttribute:
		b.bindJsxAttribute(node, SymbolFlagsProperty, SymbolFlagsPropertyExcludes)
	}
}

func (b *Binder) bindPropertyWorker(node *Node) {
	isAutoAccessor := isAutoAccessorPropertyDeclaration(node)
	includes := ifElse(isAutoAccessor, SymbolFlagsAccessor, SymbolFlagsProperty)
	excludes := ifElse(isAutoAccessor, SymbolFlagsAccessorExcludes, SymbolFlagsPropertyExcludes)
	b.bindPropertyOrMethodOrAccessor(node, includes|ifElse(getPostfixTokenFromNode(node) != nil, SymbolFlagsOptional, SymbolFlagsNone), excludes)
}

func (b *Binder) bindSourceFileIfExternalModule() {
	b.setExportContextFlag(b.file.AsNode())
	if isExternalModule(b.file) {
		b.bindSourceFileAsExternalModule()
	}
	// !!!
	// else if isJsonSourceFile(b.file) {
	// 	b.bindSourceFileAsExternalModule()
	// 	// Create symbol equivalent for the module.exports = {}
	// 	originalSymbol := b.file.symbol
	// 	b.declareSymbol(b.file.symbol.exports, b.file.symbol, b.file, SymbolFlagsProperty, SymbolFlagsAll)
	// 	b.file.symbol = originalSymbol
	// }
}

func (b *Binder) bindSourceFileAsExternalModule() {
	// !!! Remove file extension from module name
	b.bindAnonymousDeclaration(b.file.AsNode(), SymbolFlagsValueModule, "\""+b.file.fileName+"\"")
}

func (b *Binder) bindModuleDeclaration(node *Node) {
	b.setExportContextFlag(node)
	if isAmbientModule(node) {
		if hasSyntacticModifier(node, ModifierFlagsExport) {
			b.errorOnFirstToken(node, diagnostics.X_export_modifier_cannot_be_applied_to_ambient_modules_and_module_augmentations_since_they_are_always_visible)
		}
		if isModuleAugmentationExternal(node) {
			b.declareModuleSymbol(node)
		} else {
			var pattern Pattern
			name := node.AsModuleDeclaration().name
			if isStringLiteral(name) {
				pattern = tryParsePattern(name.AsStringLiteral().text)
				if !isValidPattern(pattern) {
					b.errorOnFirstToken(name, diagnostics.Pattern_0_can_have_at_most_one_Asterisk_character, name.AsStringLiteral().text)
				}
			}
			symbol := b.declareSymbolAndAddToSymbolTable(node, SymbolFlagsValueModule, SymbolFlagsValueModuleExcludes)
			b.file.patternAmbientModules = append(b.file.patternAmbientModules, PatternAmbientModule{pattern, symbol})
		}
	} else {
		state := b.declareModuleSymbol(node)
		if state != ModuleInstanceStateNonInstantiated {
			symbol := node.AsModuleDeclaration().symbol
			// if module was already merged with some function, class or non-const enum, treat it as non-const-enum-only
			symbol.constEnumOnlyModule = symbol.constEnumOnlyModule && (symbol.flags&(SymbolFlagsFunction|SymbolFlagsClass|SymbolFlagsRegularEnum) == 0) && state == ModuleInstanceStateConstEnumOnly
		}
	}
}

func (b *Binder) declareModuleSymbol(node *Node) ModuleInstanceState {
	state := getModuleInstanceState(node, nil /*visited*/)
	instantiated := state != ModuleInstanceStateNonInstantiated
	b.declareSymbolAndAddToSymbolTable(node, ifElse(instantiated, SymbolFlagsValueModule, SymbolFlagsNamespaceModule), ifElse(instantiated, SymbolFlagsValueModuleExcludes, SymbolFlagsNamespaceModuleExcludes))
	return state
}

func (b *Binder) bindNamespaceExportDeclaration(node *Node) {
	if node.AsNamespaceExportDeclaration().modifiers != nil {
		b.errorOnNode(node, diagnostics.Modifiers_cannot_appear_here)
	}
	switch {
	case !isSourceFile(node.parent):
		b.errorOnNode(node, diagnostics.Global_module_exports_may_only_appear_at_top_level)
	case !isExternalModule(node.parent.AsSourceFile()):
		b.errorOnNode(node, diagnostics.Global_module_exports_may_only_appear_in_module_files)
	case !node.parent.AsSourceFile().isDeclarationFile:
		b.errorOnNode(node, diagnostics.Global_module_exports_may_only_appear_in_declaration_files)
	default:
		if b.file.symbol.globalExports == nil {
			b.file.symbol.globalExports = make(SymbolTable)
		}
		b.declareSymbol(b.file.symbol.globalExports, b.file.symbol, node, SymbolFlagsAlias, SymbolFlagsAliasExcludes)
	}
}

func (b *Binder) bindImportClause(node *Node) {
	if node.AsImportClause().name != nil {
		b.declareSymbolAndAddToSymbolTable(node, SymbolFlagsAlias, SymbolFlagsAliasExcludes)
	}
}

func (b *Binder) bindExportDeclaration(node *Node) {
	decl := node.AsExportDeclaration()
	if b.container.Symbol() == nil {
		// Export * in some sort of block construct
		b.bindAnonymousDeclaration(node, SymbolFlagsExportStar, b.getDeclarationName(node))
	} else if decl.exportClause == nil {
		// All export * declarations are collected in an __export symbol
		b.declareSymbol(getExports(b.container.Symbol()), b.container.Symbol(), node, SymbolFlagsExportStar, SymbolFlagsNone)
	} else if isNamespaceExport(decl.exportClause) {
		// declareSymbol walks up parents to find name text, parent _must_ be set
		// but won't be set by the normal binder walk until `bindChildren` later on.
		setParent(decl.exportClause, node)
		b.declareSymbol(getExports(b.container.Symbol()), b.container.Symbol(), decl.exportClause, SymbolFlagsAlias, SymbolFlagsAliasExcludes)
	}
}

func (b *Binder) bindExportAssignment(node *Node) {
	if b.container.Symbol() == nil {
		// Incorrect export assignment in some sort of block construct
		b.bindAnonymousDeclaration(node, SymbolFlagsValue, b.getDeclarationName(node))
	} else {
		flags := SymbolFlagsProperty
		if exportAssignmentIsAlias(node) {
			flags = SymbolFlagsAlias
		}
		// If there is an `export default x;` alias declaration, can't `export default` anything else.
		// (In contrast, you can still have `export default function f() {}` and `export default interface I {}`.)
		symbol := b.declareSymbol(getExports(b.container.Symbol()), b.container.Symbol(), node, flags, SymbolFlagsAll)
		if node.AsExportAssignment().isExportEquals {
			// Will be an error later, since the module already has other exports. Just make sure this has a valueDeclaration set.
			setValueDeclaration(symbol, node)
		}
	}
}

func (b *Binder) bindJsxAttributes(node *Node) {
	b.bindAnonymousDeclaration(node, SymbolFlagsObjectLiteral, InternalSymbolNameJSXAttributes)
}

func (b *Binder) bindJsxAttribute(node *Node, symbolFlags SymbolFlags, symbolExcludes SymbolFlags) {
	b.declareSymbolAndAddToSymbolTable(node, symbolFlags, symbolExcludes)
}

func getModuleInstanceState(node *Node, visited map[NodeId]ModuleInstanceState) ModuleInstanceState {
	module := node.AsModuleDeclaration()
	if module.body != nil && module.body.parent == nil {
		// getModuleInstanceStateForAliasTarget needs to walk up the parent chain, so parent pointers must be set on this tree already
		setParent(module.body, node)
		setParentInChildren(module.body)
	}
	if module.body != nil {
		return getModuleInstanceStateCached(module.body, visited)
	} else {
		return ModuleInstanceStateInstantiated
	}
}

func getModuleInstanceStateCached(node *Node, visited map[NodeId]ModuleInstanceState) ModuleInstanceState {
	if visited == nil {
		visited = make(map[NodeId]ModuleInstanceState)
	}
	nodeId := getNodeId(node)
	if cached, ok := visited[nodeId]; ok {
		if cached != ModuleInstanceStateUnknown {
			return cached
		}
		return ModuleInstanceStateNonInstantiated
	}
	visited[nodeId] = ModuleInstanceStateUnknown
	result := getModuleInstanceStateWorker(node, visited)
	visited[nodeId] = result
	return result
}

func getModuleInstanceStateWorker(node *Node, visited map[NodeId]ModuleInstanceState) ModuleInstanceState {
	// A module is uninstantiated if it contains only
	switch node.kind {
	case SyntaxKindInterfaceDeclaration, SyntaxKindTypeAliasDeclaration:
		return ModuleInstanceStateNonInstantiated
	case SyntaxKindEnumDeclaration:
		if isEnumConst(node) {
			return ModuleInstanceStateConstEnumOnly
		}
	case SyntaxKindImportDeclaration, SyntaxKindImportEqualsDeclaration:
		if !hasSyntacticModifier(node, ModifierFlagsExport) {
			return ModuleInstanceStateNonInstantiated
		}
	case SyntaxKindExportDeclaration:
		decl := node.AsExportDeclaration()
		if decl.moduleSpecifier == nil && decl.exportClause != nil && decl.exportClause.kind == SyntaxKindNamedExports {
			state := ModuleInstanceStateNonInstantiated
			for _, specifier := range decl.exportClause.AsNamedExports().elements {
				specifierState := getModuleInstanceStateForAliasTarget(specifier, visited)
				if specifierState > state {
					state = specifierState
				}
				if state == ModuleInstanceStateInstantiated {
					return state
				}
			}
			return state
		}
	case SyntaxKindModuleBlock:
		state := ModuleInstanceStateNonInstantiated
		node.ForEachChild(func(n *Node) bool {
			childState := getModuleInstanceStateCached(n, visited)
			switch childState {
			case ModuleInstanceStateNonInstantiated:
				return false
			case ModuleInstanceStateConstEnumOnly:
				state = ModuleInstanceStateConstEnumOnly
				return false
			case ModuleInstanceStateInstantiated:
				state = ModuleInstanceStateInstantiated
				return true
			}
			panic("Unhandled case in getModuleInstanceStateWorker")
		})
		return state
	case SyntaxKindModuleDeclaration:
		return getModuleInstanceState(node, visited)
	case SyntaxKindIdentifier:
		if node.flags&NodeFlagsIdentifierIsInJSDocNamespace != 0 {
			return ModuleInstanceStateNonInstantiated
		}
	}
	return ModuleInstanceStateInstantiated
}

func getModuleInstanceStateForAliasTarget(node *Node, visited map[NodeId]ModuleInstanceState) ModuleInstanceState {
	spec := node.AsExportSpecifier()
	name := spec.propertyName
	if name == nil {
		name = spec.name
	}
	if name.kind != SyntaxKindIdentifier {
		// Skip for invalid syntax like this: export { "x" }
		return ModuleInstanceStateInstantiated
	}
	for p := node.parent; p != nil; p = p.parent {
		if isBlock(p) || isModuleBlock(p) || isSourceFile(p) {
			statements := getStatementsOfBlock(p)
			found := ModuleInstanceStateUnknown
			for _, statement := range statements {
				if nodeHasName(statement, name) {
					if statement.parent == nil {
						setParent(statement, p)
						setParentInChildren(statement)
					}
					state := getModuleInstanceStateCached(statement, visited)
					if found == ModuleInstanceStateUnknown || state > found {
						found = state
					}
					if found == ModuleInstanceStateInstantiated {
						return found
					}
					if statement.kind == SyntaxKindImportEqualsDeclaration {
						// Treat re-exports of import aliases as instantiated since they're ambiguous. This is consistent
						// with `export import x = mod.x` being treated as instantiated:
						//   import x = mod.x;
						//   export { x };
						found = ModuleInstanceStateInstantiated
					}
				}
			}
			if found != ModuleInstanceStateUnknown {
				return found
			}
		}
	}
	// Couldn't locate, assume could refer to a value
	return ModuleInstanceStateInstantiated
}

func (b *Binder) setExportContextFlag(node *Node) {
	// A declaration source file or ambient module declaration that contains no export declarations (but possibly regular
	// declarations with export modifiers) is an export context in which declarations are implicitly exported.
	if node.flags&NodeFlagsAmbient != 0 && !b.hasExportDeclarations(node) {
		node.flags |= NodeFlagsExportContext
	} else {
		node.flags &= ^NodeFlagsExportContext
	}
}

func (b *Binder) hasExportDeclarations(node *Node) bool {
	var statements []*Node
	switch node.kind {
	case SyntaxKindSourceFile:
		statements = node.AsSourceFile().statements
	case SyntaxKindModuleDeclaration:
		body := node.AsModuleDeclaration().body
		if isModuleBlock(body) {
			statements = body.AsModuleBlock().statements
		}
	}
	return some(statements, func(s *Node) bool {
		return isExportDeclaration(s) || isExportAssignment(s)
	})
}

func (b *Binder) bindFunctionExpression(node *Node) {
	if !b.file.isDeclarationFile && node.flags&NodeFlagsAmbient == 0 && isAsyncFunction(node) {
		b.emitFlags |= NodeFlagsHasAsyncFunctions
	}
	setFlowNode(node, b.currentFlow)
	bindingName := InternalSymbolNameFunction
	if isFunctionExpression(node) && node.AsFunctionExpression().name != nil {
		b.checkStrictModeFunctionName(node)
		bindingName = node.AsFunctionExpression().name.AsIdentifier().text
	}
	b.bindAnonymousDeclaration(node, SymbolFlagsFunction, bindingName)
}

func (b *Binder) bindClassLikeDeclaration(node *Node) {
	name := node.ClassLikeData().name
	switch node.kind {
	case SyntaxKindClassDeclaration:
		b.bindBlockScopedDeclaration(node, SymbolFlagsClass, SymbolFlagsClassExcludes)
	case SyntaxKindClassExpression:
		nameText := InternalSymbolNameClass
		if name != nil {
			nameText = name.AsIdentifier().text
			b.classifiableNames[nameText] = true
		}
		b.bindAnonymousDeclaration(node, SymbolFlagsClass, nameText)
	}
	symbol := node.Symbol()
	// TypeScript 1.0 spec (April 2014): 8.4
	// Every class automatically contains a static property member named 'prototype', the
	// type of which is an instantiation of the class type with type Any supplied as a type
	// argument for each type parameter. It is an error to explicitly declare a static
	// property member with the name 'prototype'.
	//
	// Note: we check for this here because this class may be merging into a module.  The
	// module might have an exported variable called 'prototype'.  We can't allow that as
	// that would clash with the built-in 'prototype' for the class.
	prototypeSymbol := b.newSymbol(SymbolFlagsProperty|SymbolFlagsPrototype, "prototype")
	symbolExport := getExports(symbol)[prototypeSymbol.name]
	if symbolExport != nil {
		setParent(name, node)
		b.errorOnNode(symbolExport.declarations[0], diagnostics.Duplicate_identifier_0, symbolName(prototypeSymbol))
	}
	getExports(symbol)[prototypeSymbol.name] = prototypeSymbol
	prototypeSymbol.parent = symbol
}

func (b *Binder) bindPropertyOrMethodOrAccessor(node *Node, symbolFlags SymbolFlags, symbolExcludes SymbolFlags) {
	if !b.file.isDeclarationFile && node.flags&NodeFlagsAmbient == 0 && isAsyncFunction(node) {
		b.emitFlags |= NodeFlagsHasAsyncFunctions
	}
	if b.currentFlow != nil && isObjectLiteralOrClassExpressionMethodOrAccessor(node) {
		setFlowNode(node, b.currentFlow)
	}
	if hasDynamicName(node) {
		b.bindAnonymousDeclaration(node, symbolFlags, InternalSymbolNameComputed)
	} else {
		b.declareSymbolAndAddToSymbolTable(node, symbolFlags, symbolExcludes)
	}
}

func (b *Binder) bindFunctionOrConstructorType(node *Node) {
	// For a given function symbol "<...>(...) => T" we want to generate a symbol identical
	// to the one we would get for: { <...>(...): T }
	//
	// We do that by making an anonymous type literal symbol, and then setting the function
	// symbol as its sole member. To the rest of the system, this symbol will be indistinguishable
	// from an actual type literal symbol you would have gotten had you used the long form.
	symbol := b.newSymbol(SymbolFlagsSignature, b.getDeclarationName(node))
	b.addDeclarationToSymbol(symbol, node, SymbolFlagsSignature)
	typeLiteralSymbol := b.newSymbol(SymbolFlagsTypeLiteral, InternalSymbolNameType)
	b.addDeclarationToSymbol(typeLiteralSymbol, node, SymbolFlagsTypeLiteral)
	typeLiteralSymbol.members = make(SymbolTable)
	typeLiteralSymbol.members[symbol.name] = symbol
}

func addLateBoundAssignmentDeclarationToSymbol(node *Node, symbol *Symbol) {
	if symbol.assignmentDeclarationMembers == nil {
		symbol.assignmentDeclarationMembers = make(map[NodeId]*Node)
	}
	symbol.assignmentDeclarationMembers[getNodeId(node)] = node
}

func (b *Binder) bindFunctionPropertyAssignment(node *Node) {
	expr := node.AsBinaryExpression()
	parentName := getAccessedExpression(expr.left).AsIdentifier().text
	parentSymbol := b.lookupName(parentName, b.blockScopeContainer)
	if parentSymbol == nil {
		parentSymbol = b.lookupName(parentName, b.container)
	}
	if parentSymbol != nil && isFunctionSymbol(parentSymbol) {
		// Fix up parent pointers since we're going to use these nodes before we bind into them
		setParent(expr.left, node)
		setParent(expr.right, node)
		if hasDynamicName(node) {
			b.bindAnonymousDeclaration(node, SymbolFlagsProperty|SymbolFlagsAssignment, InternalSymbolNameComputed)
			addLateBoundAssignmentDeclarationToSymbol(node, parentSymbol)
		} else {
			b.declareSymbol(getExports(parentSymbol), parentSymbol, node, SymbolFlagsProperty|SymbolFlagsAssignment, SymbolFlagsPropertyExcludes)
		}
	}
}

func (b *Binder) bindEnumDeclaration(node *Node) {
	if isEnumConst(node) {
		b.bindBlockScopedDeclaration(node, SymbolFlagsConstEnum, SymbolFlagsConstEnumExcludes)
	} else {
		b.bindBlockScopedDeclaration(node, SymbolFlagsRegularEnum, SymbolFlagsRegularEnumExcludes)
	}
}

func (b *Binder) bindVariableDeclarationOrBindingElement(node *Node) {
	if b.inStrictMode {
		b.checkStrictModeEvalOrArguments(node, node.Name())
	}
	if !isBindingPattern(node.Name()) {
		switch {
		case isBlockOrCatchScoped(node):
			b.bindBlockScopedDeclaration(node, SymbolFlagsBlockScopedVariable, SymbolFlagsBlockScopedVariableExcludes)
		case isPartOfParameterDeclaration(node):
			// It is safe to walk up parent chain to find whether the node is a destructuring parameter declaration
			// because its parent chain has already been set up, since parents are set before descending into children.
			//
			// If node is a binding element in parameter declaration, we need to use ParameterExcludes.
			// Using ParameterExcludes flag allows the compiler to report an error on duplicate identifiers in Parameter Declaration
			// For example:
			//      function foo([a,a]) {} // Duplicate Identifier error
			//      function bar(a,a) {}   // Duplicate Identifier error, parameter declaration in this case is handled in bindParameter
			//                             // which correctly set excluded symbols
			b.declareSymbolAndAddToSymbolTable(node, SymbolFlagsFunctionScopedVariable, SymbolFlagsParameterExcludes)
		default:
			b.declareSymbolAndAddToSymbolTable(node, SymbolFlagsFunctionScopedVariable, SymbolFlagsFunctionScopedVariableExcludes)
		}
	}
}

func (b *Binder) bindParameter(node *Node) {
	// !!!
	// if node.kind == SyntaxKindJSDocParameterTag && b.container.kind != SyntaxKindJSDocSignature {
	// 	return
	// }
	decl := node.AsParameterDeclaration()
	if b.inStrictMode && node.flags&NodeFlagsAmbient == 9 {
		// It is a SyntaxError if the identifier eval or arguments appears within a FormalParameterList of a
		// strict mode FunctionLikeDeclaration or FunctionExpression(13.1)
		b.checkStrictModeEvalOrArguments(node, decl.name)
	}
	if isBindingPattern(decl.name) {
		index := slices.Index(node.parent.FunctionLikeData().parameters, node)
		b.bindAnonymousDeclaration(node, SymbolFlagsFunctionScopedVariable, "__"+strconv.Itoa(index))
	} else {
		b.declareSymbolAndAddToSymbolTable(node, SymbolFlagsFunctionScopedVariable, SymbolFlagsParameterExcludes)
	}
	// If this is a property-parameter, then also declare the property symbol into the
	// containing class.
	if isParameterPropertyDeclaration(node, node.parent) {
		classDeclaration := node.parent.parent
		flags := SymbolFlagsProperty | ifElse(decl.questionToken != nil, SymbolFlagsOptional, SymbolFlagsNone)
		b.declareSymbol(getMembers(classDeclaration.Symbol()), classDeclaration.Symbol(), node, flags, SymbolFlagsPropertyExcludes)
	}
}

func (b *Binder) bindFunctionDeclaration(node *Node) {
	if !b.file.isDeclarationFile && node.flags&NodeFlagsAmbient == 0 && isAsyncFunction(node) {
		b.emitFlags |= NodeFlagsHasAsyncFunctions
	}
	b.checkStrictModeFunctionName(node)
	if b.inStrictMode {
		b.checkStrictModeFunctionDeclaration(node)
		b.bindBlockScopedDeclaration(node, SymbolFlagsFunction, SymbolFlagsFunctionExcludes)
	} else {
		b.declareSymbolAndAddToSymbolTable(node, SymbolFlagsFunction, SymbolFlagsFunctionExcludes)
	}
}

func (b *Binder) getInferTypeContainer(node *Node) *Node {
	extendsType := findAncestor(node, func(n *Node) bool {
		parent := n.parent
		return parent != nil && isConditionalTypeNode(parent) && parent.AsConditionalTypeNode().extendsType == n
	})
	if extendsType != nil {
		return extendsType.parent
	}
	return nil
}

func (b *Binder) bindAnonymousDeclaration(node *Node, symbolFlags SymbolFlags, name string) {
	symbol := b.newSymbol(symbolFlags, name)
	if symbolFlags&(SymbolFlagsEnumMember|SymbolFlagsClassMember) != 0 {
		symbol.parent = b.container.Symbol()
	}
	b.addDeclarationToSymbol(symbol, node, symbolFlags)
}

func (b *Binder) bindBlockScopedDeclaration(node *Node, symbolFlags SymbolFlags, symbolExcludes SymbolFlags) {
	switch b.blockScopeContainer.kind {
	case SyntaxKindModuleDeclaration:
		b.declareModuleMember(node, symbolFlags, symbolExcludes)
	case SyntaxKindSourceFile:
		if isExternalOrCommonJsModule(b.container.AsSourceFile()) {
			b.declareModuleMember(node, symbolFlags, symbolExcludes)
			break
		}
		fallthrough
	default:
		b.declareSymbol(getLocals(b.blockScopeContainer), nil /*parent*/, node, symbolFlags, symbolExcludes)
	}
}

func (b *Binder) bindTypeParameter(node *Node) {
	// !!!
	// if isJSDocTemplateTag(node.parent) {
	// 	var container *HasLocals = getEffectiveContainerForJSDocTemplateTag(node.parent)
	// 	if container {
	// 		Debug.assertNode(container, canHaveLocals)
	// 		/* TODO(TS-TO-GO) QuestionQuestionEqualsToken BinaryExpression: container.locals ??= createSymbolTable() */ TODO
	// 		b.declareSymbol(container.locals /*parent*/, nil, node, SymbolFlagsTypeParameter, SymbolFlagsTypeParameterExcludes)
	// 	} else {
	// 		b.declareSymbolAndAddToSymbolTable(node, SymbolFlagsTypeParameter, SymbolFlagsTypeParameterExcludes)
	// 	}
	// }
	if node.parent.kind == SyntaxKindInferType {
		container := b.getInferTypeContainer(node.parent)
		if container != nil {
			b.declareSymbol(getLocals(container), nil /*parent*/, node, SymbolFlagsTypeParameter, SymbolFlagsTypeParameterExcludes)
		} else {
			b.bindAnonymousDeclaration(node, SymbolFlagsTypeParameter, b.getDeclarationName(node))
		}
	} else {
		b.declareSymbolAndAddToSymbolTable(node, SymbolFlagsTypeParameter, SymbolFlagsTypeParameterExcludes)
	}
}

func (b *Binder) lookupName(name string, container *Node) *Symbol {
	data := container.LocalsContainerData()
	if data != nil {
		local := data.locals[name]
		if local != nil {
			return local
		}
	}
	if isSourceFile(container) {
		local := container.AsSourceFile().jsGlobalAugmentations[name]
		if local != nil {
			return local
		}
	}
	symbol := container.Symbol()
	if symbol != nil {
		return symbol.exports[name]
	}
	return nil
}

// The binder visits every node in the syntax tree so it is a convenient place to perform a single localized
// check for reserved words used as identifiers in strict mode code, as well as `yield` or `await` in
// [Yield] or [Await] contexts, respectively.
func (b *Binder) checkContextualIdentifier(node *Node) {
	// Report error only if there are no parse errors in file
	if len(b.file.diagnostics) == 0 && node.flags&NodeFlagsAmbient == 0 && node.flags&NodeFlagsJSDoc == 0 && !isIdentifierName(node) {
		// strict mode identifiers
		originalKeywordKind := getIdentifierToken(node.AsIdentifier().text)
		if originalKeywordKind == SyntaxKindIdentifier {
			return
		}
		if b.inStrictMode && originalKeywordKind >= SyntaxKindFirstFutureReservedWord && originalKeywordKind <= SyntaxKindLastFutureReservedWord {
			b.errorOnNode(node, b.getStrictModeIdentifierMessage(node), declarationNameToString(node))
		} else if originalKeywordKind == SyntaxKindAwaitKeyword {
			if isExternalModule(b.file) && isInTopLevelContext(node) {
				b.errorOnNode(node, diagnostics.Identifier_expected_0_is_a_reserved_word_at_the_top_level_of_a_module, declarationNameToString(node))
			} else if node.flags&NodeFlagsAwaitContext != 0 {
				b.errorOnNode(node, diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here, declarationNameToString(node))
			}
		} else if originalKeywordKind == SyntaxKindYieldKeyword && node.flags&NodeFlagsYieldContext != 0 {
			b.errorOnNode(node, diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here, declarationNameToString(node))
		}
	}
}

func (b *Binder) checkPrivateIdentifier(node *Node) {
	if node.AsPrivateIdentifier().text == "#constructor" {
		// Report error only if there are no parse errors in file
		if len(b.file.diagnostics) == 0 {
			b.errorOnNode(node, diagnostics.X_constructor_is_a_reserved_word, declarationNameToString(node))
		}
	}
}

func (b *Binder) getStrictModeIdentifierMessage(node *Node) *diagnostics.Message {
	// Provide specialized messages to help the user understand why we think they're in
	// strict mode.
	if getContainingClass(node) != nil {
		return diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Class_definitions_are_automatically_in_strict_mode
	}
	if b.file.externalModuleIndicator != nil {
		return diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode
	}
	return diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode
}

func (b *Binder) updateStrictModeStatementList(statements []*Node) {
	if !b.inStrictMode {
		for _, statement := range statements {
			if !isPrologueDirective(statement) {
				return
			}
			if b.isUseStrictPrologueDirective(statement) {
				b.inStrictMode = true
				return
			}
		}
	}
}

// Should be called only on prologue directives (isPrologueDirective(node) should be true)
func (b *Binder) isUseStrictPrologueDirective(node *Node) bool {
	nodeText := getSourceTextOfNodeFromSourceFile(b.file, node.AsExpressionStatement().expression)
	// Note: the node text must be exactly "use strict" or 'use strict'.  It is not ok for the
	// string to contain unicode escapes (as per ES5).
	return nodeText == "\"use strict\"" || nodeText == "'use strict'"
}

func (b *Binder) checkStrictModeFunctionName(node *Node) {
	if b.inStrictMode && node.flags&NodeFlagsAmbient == 0 {
		// It is a SyntaxError if the identifier eval or arguments appears within a FormalParameterList of a strict mode FunctionDeclaration or FunctionExpression (13.1))
		b.checkStrictModeEvalOrArguments(node, node.Name())
	}
}

func (b *Binder) checkStrictModeFunctionDeclaration(node *Node) {
	if b.languageVersion < ScriptTargetES2015 {
		// Report error if function is not top level function declaration
		if b.blockScopeContainer.kind != SyntaxKindSourceFile && b.blockScopeContainer.kind != SyntaxKindModuleDeclaration && !isFunctionLikeOrClassStaticBlockDeclaration(b.blockScopeContainer) {
			// We check first if the name is inside class declaration or class expression; if so give explicit message
			// otherwise report generic error message.
			b.errorOnNode(node, b.getStrictModeBlockScopeFunctionDeclarationMessage(node))
		}
	}
}

func (b *Binder) getStrictModeBlockScopeFunctionDeclarationMessage(node *Node) *diagnostics.Message {
	// Provide specialized messages to help the user understand why we think they're in strict mode.
	if getContainingClass(node) != nil {
		return diagnostics.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES5_Class_definitions_are_automatically_in_strict_mode
	}
	if b.file.externalModuleIndicator != nil {
		return diagnostics.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES5_Modules_are_automatically_in_strict_mode
	}
	return diagnostics.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES5
}

func (b *Binder) checkStrictModeBinaryExpression(node *Node) {
	expr := node.AsBinaryExpression()
	if b.inStrictMode && isLeftHandSideExpression(expr.left) && isAssignmentOperator(expr.operatorToken.kind) {
		// ECMA 262 (Annex C) The identifier eval or arguments may not appear as the LeftHandSideExpression of an
		// Assignment operator(11.13) or of a PostfixExpression(11.3)
		b.checkStrictModeEvalOrArguments(node, expr.left)
	}
}

func (b *Binder) checkStrictModeCatchClause(node *Node) {
	// It is a SyntaxError if a TryStatement with a Catch occurs within strict code and the Identifier of the
	// Catch production is eval or arguments
	clause := node.AsCatchClause()
	if b.inStrictMode && clause.variableDeclaration != nil {
		b.checkStrictModeEvalOrArguments(node, clause.variableDeclaration.AsVariableDeclaration().name)
	}
}

func (b *Binder) checkStrictModeDeleteExpression(node *Node) {
	// Grammar checking
	expr := node.AsDeleteExpression()
	if b.inStrictMode && expr.expression.kind == SyntaxKindIdentifier {
		// When a delete operator occurs within strict mode code, a SyntaxError is thrown if its
		// UnaryExpression is a direct reference to a variable, function argument, or function name
		b.errorOnNode(expr.expression, diagnostics.X_delete_cannot_be_called_on_an_identifier_in_strict_mode)
	}
}

func (b *Binder) checkStrictModePostfixUnaryExpression(node *Node) {
	// Grammar checking
	// The identifier eval or arguments may not appear as the LeftHandSideExpression of an
	// Assignment operator(11.13) or of a PostfixExpression(11.3) or as the UnaryExpression
	// operated upon by a Prefix Increment(11.4.4) or a Prefix Decrement(11.4.5) operator.
	if b.inStrictMode {
		b.checkStrictModeEvalOrArguments(node, node.AsPostfixUnaryExpression().operand)
	}
}

func (b *Binder) checkStrictModePrefixUnaryExpression(node *Node) {
	// Grammar checking
	if b.inStrictMode {
		expr := node.AsPrefixUnaryExpression()
		if expr.operator == SyntaxKindPlusPlusToken || expr.operator == SyntaxKindMinusMinusToken {
			b.checkStrictModeEvalOrArguments(node, expr.operand)
		}
	}
}

func (b *Binder) checkStrictModeWithStatement(node *Node) {
	// Grammar checking for withStatement
	if b.inStrictMode {
		b.errorOnFirstToken(node, diagnostics.X_with_statements_are_not_allowed_in_strict_mode)
	}
}

func (b *Binder) checkStrictModeLabeledStatement(node *Node) {
	// Grammar checking for labeledStatement
	if b.inStrictMode && b.options.Target >= ScriptTargetES2015 {
		data := node.AsLabeledStatement()
		if isDeclarationStatement(data.statement) || isVariableStatement(data.statement) {
			b.errorOnFirstToken(data.label, diagnostics.A_label_is_not_allowed_here)
		}
	}
}

func isEvalOrArgumentsIdentifier(node *Node) bool {
	if isIdentifier(node) {
		text := node.AsIdentifier().text
		return text == "eval" || text == "arguments"
	}
	return false
}

func (b *Binder) checkStrictModeEvalOrArguments(contextNode *Node, name *Node) {
	if name != nil && isEvalOrArgumentsIdentifier(name) {
		// We check first if the name is inside class declaration or class expression; if so give explicit message
		// otherwise report generic error message.
		b.errorOnNode(name, b.getStrictModeEvalOrArgumentsMessage(contextNode), name.AsIdentifier().text)
	}
}

func (b *Binder) getStrictModeEvalOrArgumentsMessage(node *Node) *diagnostics.Message {
	// Provide specialized messages to help the user understand why we think they're in strict mode
	if getContainingClass(node) != nil {
		return diagnostics.Code_contained_in_a_class_is_evaluated_in_JavaScript_s_strict_mode_which_does_not_allow_this_use_of_0_For_more_information_see_https_Colon_Slash_Slashdeveloper_mozilla_org_Slashen_US_Slashdocs_SlashWeb_SlashJavaScript_SlashReference_SlashStrict_mode
	}
	if b.file.externalModuleIndicator != nil {
		return diagnostics.Invalid_use_of_0_Modules_are_automatically_in_strict_mode
	}
	return diagnostics.Invalid_use_of_0_in_strict_mode
}

// All container nodes are kept on a linked list in declaration order. This list is used by
// the getLocalNameOfContainer function in the type checker to validate that the local name
// used for a container is unique.
func (b *Binder) bindContainer(node *Node, containerFlags ContainerFlags) {
	// Before we recurse into a node's children, we first save the existing parent, container
	// and block-container.  Then after we pop out of processing the children, we restore
	// these saved values.
	saveContainer := b.container
	saveThisParentContainer := b.thisParentContainer
	savedBlockScopeContainer := b.blockScopeContainer
	// Depending on what kind of node this is, we may have to adjust the current container
	// and block-container.   If the current node is a container, then it is automatically
	// considered the current block-container as well.  Also, for containers that we know
	// may contain locals, we eagerly initialize the .locals field. We do this because
	// it's highly likely that the .locals will be needed to place some child in (for example,
	// a parameter, or variable declaration).
	//
	// However, we do not proactively create the .locals for block-containers because it's
	// totally normal and common for block-containers to never actually have a block-scoped
	// variable in them.  We don't want to end up allocating an object for every 'block' we
	// run into when most of them won't be necessary.
	//
	// Finally, if this is a block-container, then we clear out any existing .locals object
	// it may contain within it.  This happens in incremental scenarios.  Because we can be
	// reusing a node from a previous compilation, that node may have had 'locals' created
	// for it.  We must clear this so we don't accidentally move any stale data forward from
	// a previous compilation.
	if containerFlags&ContainerFlagsIsContainer != 0 {
		if node.kind != SyntaxKindArrowFunction {
			b.thisParentContainer = b.container
		}
		b.container = node
		b.blockScopeContainer = node
		if containerFlags&ContainerFlagsHasLocals != 0 {
			// localsContainer := node
			// localsContainer.LocalsContainerData().locals = make(SymbolTable)
			b.addToContainerChain(node)
		}
	} else if containerFlags&ContainerFlagsIsBlockScopedContainer != 0 {
		b.blockScopeContainer = node
		b.addToContainerChain(node)
	}
	if containerFlags&ContainerFlagsIsControlFlowContainer != 0 {
		saveCurrentFlow := b.currentFlow
		saveBreakTarget := b.currentBreakTarget
		saveContinueTarget := b.currentContinueTarget
		saveReturnTarget := b.currentReturnTarget
		saveExceptionTarget := b.currentExceptionTarget
		saveActiveLabelList := b.activeLabelList
		saveHasExplicitReturn := b.hasExplicitReturn
		isImmediatelyInvoked := (containerFlags&ContainerFlagsIsFunctionExpression != 0 &&
			!hasSyntacticModifier(node, ModifierFlagsAsync) &&
			!isGeneratorFunctionExpression(node) &&
			getImmediatelyInvokedFunctionExpression(node) != nil) || node.kind == SyntaxKindClassStaticBlockDeclaration
		// A non-async, non-generator IIFE is considered part of the containing control flow. Return statements behave
		// similarly to break statements that exit to a label just past the statement body.
		if !isImmediatelyInvoked {
			flowStart := b.newFlowNode(FlowFlagsStart)
			b.currentFlow = flowStart
			if containerFlags&(ContainerFlagsIsFunctionExpression|ContainerFlagsIsObjectLiteralOrClassExpressionMethodOrAccessor) != 0 {
				flowStart.node = node
			}
		}
		// We create a return control flow graph for IIFEs and constructors. For constructors
		// we use the return control flow graph in strict property initialization checks.
		if isImmediatelyInvoked || node.kind == SyntaxKindConstructor {
			b.currentReturnTarget = b.newFlowNode(FlowFlagsBranchLabel)
		} else {
			b.currentReturnTarget = nil
		}
		b.currentExceptionTarget = nil
		b.currentBreakTarget = nil
		b.currentContinueTarget = nil
		b.activeLabelList = nil
		b.hasExplicitReturn = false
		b.bindChildren(node)
		// Reset all reachability check related flags on node (for incremental scenarios)
		node.flags &= ^NodeFlagsReachabilityAndEmitFlags
		if b.currentFlow.flags&FlowFlagsUnreachable == 0 && containerFlags&ContainerFlagsIsFunctionLike != 0 {
			bodyData := node.BodyData()
			if bodyData != nil && nodeIsPresent(bodyData.body) {
				node.flags |= NodeFlagsHasImplicitReturn
				if b.hasExplicitReturn {
					node.flags |= NodeFlagsHasExplicitReturn
				}
				bodyData.endFlowNode = b.currentFlow
			}
		}
		if node.kind == SyntaxKindSourceFile {
			node.flags |= b.emitFlags
			node.AsSourceFile().endFlowNode = b.currentFlow
		}

		if b.currentReturnTarget != nil {
			b.addAntecedent(b.currentReturnTarget, b.currentFlow)
			b.currentFlow = finishFlowLabel(b.currentReturnTarget)
			if node.kind == SyntaxKindConstructor || node.kind == SyntaxKindClassStaticBlockDeclaration {
				setReturnFlowNode(node, b.currentFlow)
			}
		}
		if !isImmediatelyInvoked {
			b.currentFlow = saveCurrentFlow
		}
		b.currentBreakTarget = saveBreakTarget
		b.currentContinueTarget = saveContinueTarget
		b.currentReturnTarget = saveReturnTarget
		b.currentExceptionTarget = saveExceptionTarget
		b.activeLabelList = saveActiveLabelList
		b.hasExplicitReturn = saveHasExplicitReturn
	} else if containerFlags&ContainerFlagsIsInterface != 0 {
		b.seenThisKeyword = false
		b.bindChildren(node)
		// ContainsThis cannot overlap with HasExtendedUnicodeEscape on Identifier
		if b.seenThisKeyword {
			node.flags |= NodeFlagsContainsThis
		} else {
			node.flags &= ^NodeFlagsContainsThis
		}
	} else {
		b.bindChildren(node)
	}
	b.container = saveContainer
	b.thisParentContainer = saveThisParentContainer
	b.blockScopeContainer = savedBlockScopeContainer
}

func (b *Binder) bindChildren(node *Node) {
	saveInAssignmentPattern := b.inAssignmentPattern
	// Most nodes aren't valid in an assignment pattern, so we clear the value here
	// and set it before we descend into nodes that could actually be part of an assignment pattern.
	b.inAssignmentPattern = false
	if b.checkUnreachable(node) {
		b.bindEachChild(node)
		b.inAssignmentPattern = saveInAssignmentPattern
		return
	}
	kind := node.kind
	if kind >= SyntaxKindFirstStatement && kind <= SyntaxKindLastStatement && (b.options.AllowUnreachableCode != TSTrue || kind == SyntaxKindReturnStatement) {
		hasFlowNodeData := node.FlowNodeData()
		if hasFlowNodeData != nil {
			hasFlowNodeData.flowNode = b.currentFlow
		}
	}
	switch node.kind {
	case SyntaxKindWhileStatement:
		b.bindWhileStatement(node)
	case SyntaxKindDoStatement:
		b.bindDoStatement(node)
	case SyntaxKindForStatement:
		b.bindForStatement(node)
	case SyntaxKindForInStatement, SyntaxKindForOfStatement:
		b.bindForInOrForOfStatement(node)
	case SyntaxKindIfStatement:
		b.bindIfStatement(node)
	case SyntaxKindReturnStatement:
		b.bindReturnStatement(node)
	case SyntaxKindThrowStatement:
		b.bindThrowStatement(node)
	case SyntaxKindBreakStatement:
		b.bindBreakStatement(node)
	case SyntaxKindContinueStatement:
		b.bindContinueStatement(node)
	case SyntaxKindTryStatement:
		b.bindTryStatement(node)
	case SyntaxKindSwitchStatement:
		b.bindSwitchStatement(node)
	case SyntaxKindCaseBlock:
		b.bindCaseBlock(node)
	case SyntaxKindCaseClause, SyntaxKindDefaultClause:
		b.bindCaseOrDefaultClause(node)
	case SyntaxKindExpressionStatement:
		b.bindExpressionStatement(node)
	case SyntaxKindLabeledStatement:
		b.bindLabeledStatement(node)
	case SyntaxKindPrefixUnaryExpression:
		b.bindPrefixUnaryExpressionFlow(node)
	case SyntaxKindPostfixUnaryExpression:
		b.bindPostfixUnaryExpressionFlow(node)
	case SyntaxKindBinaryExpression:
		if isDestructuringAssignment(node) {
			// Carry over whether we are in an assignment pattern to
			// binary expressions that could actually be an initializer
			b.inAssignmentPattern = saveInAssignmentPattern
			b.bindDestructuringAssignmentFlow(node)
			return
		}
		b.bindBinaryExpressionFlow(node)
	case SyntaxKindDeleteExpression:
		b.bindDeleteExpressionFlow(node)
	case SyntaxKindConditionalExpression:
		b.bindConditionalExpressionFlow(node)
	case SyntaxKindVariableDeclaration:
		b.bindVariableDeclarationFlow(node)
	case SyntaxKindPropertyAccessExpression, SyntaxKindElementAccessExpression:
		b.bindAccessExpressionFlow(node)
	case SyntaxKindCallExpression:
		b.bindCallExpressionFlow(node)
	case SyntaxKindNonNullExpression:
		b.bindNonNullExpressionFlow(node)
	// case *JSDocTypedefTag, *JSDocCallbackTag, *JSDocEnumTag:
	// 	b.bindJSDocTypeAlias(node)
	// case *JSDocImportTag:
	// 	b.bindJSDocImportTag(node)
	case SyntaxKindSourceFile:
		b.bindEachStatementFunctionsFirst(node.AsSourceFile().statements)
		//b.bind(node.endOfFileToken)
	case SyntaxKindBlock:
		b.bindEachStatementFunctionsFirst(node.AsBlock().statements)
	case SyntaxKindModuleBlock:
		b.bindEachStatementFunctionsFirst(node.AsModuleBlock().statements)
	case SyntaxKindBindingElement:
		b.bindBindingElementFlow(node)
	case SyntaxKindParameter:
		b.bindParameterFlow(node)
	case SyntaxKindObjectLiteralExpression, SyntaxKindArrayLiteralExpression, SyntaxKindPropertyAssignment, SyntaxKindSpreadElement:
		b.inAssignmentPattern = saveInAssignmentPattern
		b.bindEachChild(node)
	default:
		b.bindEachChild(node)
	}
	b.inAssignmentPattern = saveInAssignmentPattern
}

func (b *Binder) bindEachChild(node *Node) {
	node.ForEachChild(b.bind)
}

func (b *Binder) bindEachExpression(nodes []*Node) {
	for _, node := range nodes {
		b.bind(node)
	}
}

func (b *Binder) bindEachStatement(nodes []*Node) {
	for _, node := range nodes {
		b.bind(node)
	}
}

func (b *Binder) bindEachStatementFunctionsFirst(statements []*Node) {
	for _, node := range statements {
		if node.kind == SyntaxKindFunctionDeclaration {
			b.bind(node)
		}
	}
	for _, node := range statements {
		if node.kind != SyntaxKindFunctionDeclaration {
			b.bind(node)
		}
	}
}

func (b *Binder) checkUnreachable(node *Node) bool {
	if b.currentFlow.flags&FlowFlagsUnreachable == 0 {
		return false
	}
	if b.currentFlow == unreachableFlow {
		// report errors on all statements except empty ones
		// report errors on class declarations
		// report errors on enums with preserved emit
		// report errors on instantiated modules
		reportError := isStatementButNotDeclaration(node) && !isEmptyStatement(node) ||
			isClassDeclaration(node) ||
			isEnumDeclarationWithPreservedEmit(node, b.options) ||
			isModuleDeclaration(node) && b.shouldReportErrorOnModuleDeclaration(node)
		if reportError {
			b.currentFlow = reportedUnreachableFlow
			if b.options.AllowUnreachableCode != TSTrue {
				// unreachable code is reported if
				// - user has explicitly asked about it AND
				// - statement is in not ambient context (statements in ambient context is already an error
				//   so we should not report extras) AND
				//   - node is not variable statement OR
				//   - node is block scoped variable statement OR
				//   - node is not block scoped variable statement and at least one variable declaration has initializer
				//   Rationale: we don't want to report errors on non-initialized var's since they are hoisted
				//   On the other side we do want to report errors on non-initialized 'lets' because of TDZ
				isError := unreachableCodeIsError(b.options) && node.flags&NodeFlagsAmbient == 0 && (!isVariableStatement(node) ||
					getCombinedNodeFlags(node.AsVariableStatement().declarationList)&NodeFlagsBlockScoped != 0 ||
					some(node.AsVariableStatement().declarationList.AsVariableDeclarationList().declarations, func(d *Node) bool {
						return d.AsVariableDeclaration().initializer != nil
					}))
				b.errorOnEachUnreachableRange(node, isError)
			}
		}
	}
	return true
}

func (b *Binder) shouldReportErrorOnModuleDeclaration(node *Node) bool {
	instanceState := getModuleInstanceState(node, nil /*visited*/)
	return instanceState == ModuleInstanceStateInstantiated || (instanceState == ModuleInstanceStateConstEnumOnly && shouldPreserveConstEnums(b.options))
}

func (b *Binder) errorOnEachUnreachableRange(node *Node, isError bool) {
	if b.isExecutableStatement(node) && isBlock(node.parent) {
		statements := node.parent.AsBlock().statements
		index := slices.Index(statements, node)
		var first, last *Node
		for _, s := range statements[index:] {
			if b.isExecutableStatement(s) {
				if first == nil {
					first = s
				}
				last = s
			} else if first != nil {
				b.errorOrSuggestionOnRange(isError, first, last, diagnostics.Unreachable_code_detected)
				first = nil
			}
		}
		if first != nil {
			b.errorOrSuggestionOnRange(isError, first, last, diagnostics.Unreachable_code_detected)
		}
	} else {
		b.errorOrSuggestionOnNode(isError, node, diagnostics.Unreachable_code_detected)
	}
}

// As opposed to a pure declaration like an `interface`
func (b *Binder) isExecutableStatement(s *Node) bool {
	// Don't remove statements that can validly be used before they appear.
	return !isFunctionDeclaration(s) && !b.isPurelyTypeDeclaration(s) && !(isVariableStatement(s) && getCombinedNodeFlags(s)&NodeFlagsBlockScoped == 0 &&
		some(s.AsVariableStatement().declarationList.AsVariableDeclarationList().declarations, func(d *Node) bool {
			return d.AsVariableDeclaration().initializer == nil
		}))
}

func (b *Binder) isPurelyTypeDeclaration(s *Node) bool {
	switch s.kind {
	case SyntaxKindInterfaceDeclaration, SyntaxKindTypeAliasDeclaration:
		return true
	case SyntaxKindModuleDeclaration:
		return getModuleInstanceState(s, nil /*visited*/) != ModuleInstanceStateInstantiated
	case SyntaxKindEnumDeclaration:
		return !isEnumDeclarationWithPreservedEmit(s, b.options)
	default:
		return false
	}
}

func (b *Binder) setContinueTarget(node *Node, target *FlowLabel) *FlowLabel {
	label := b.activeLabelList
	for label != nil && node.parent.kind == SyntaxKindLabeledStatement {
		label.continueTarget = target
		label = label.next
		node = node.parent
	}
	return target
}

func (b *Binder) doWithConditionalBranches(action func(value *Node) bool, value *Node, trueTarget *FlowLabel, falseTarget *FlowLabel) {
	savedTrueTarget := b.currentTrueTarget
	savedFalseTarget := b.currentFalseTarget
	b.currentTrueTarget = trueTarget
	b.currentFalseTarget = falseTarget
	action(value)
	b.currentTrueTarget = savedTrueTarget
	b.currentFalseTarget = savedFalseTarget
}

func (b *Binder) bindCondition(node *Node, trueTarget *FlowLabel, falseTarget *FlowLabel) {
	b.doWithConditionalBranches(b.bind, node, trueTarget, falseTarget)
	if node == nil || !isLogicalAssignmentExpression(node) && !isLogicalExpression(node) && !(isOptionalChain(node) && isOutermostOptionalChain(node)) {
		b.addAntecedent(trueTarget, b.createFlowCondition(FlowFlagsTrueCondition, b.currentFlow, node))
		b.addAntecedent(falseTarget, b.createFlowCondition(FlowFlagsFalseCondition, b.currentFlow, node))
	}
}

func (b *Binder) bindIterativeStatement(node *Node, breakTarget *FlowLabel, continueTarget *FlowLabel) {
	saveBreakTarget := b.currentBreakTarget
	saveContinueTarget := b.currentContinueTarget
	b.currentBreakTarget = breakTarget
	b.currentContinueTarget = continueTarget
	b.bind(node)
	b.currentBreakTarget = saveBreakTarget
	b.currentContinueTarget = saveContinueTarget
}

func isLogicalAssignmentExpression(node *Node) bool {
	return isLogicalOrCoalescingAssignmentExpression(skipParentheses(node))
}

func (b *Binder) bindAssignmentTargetFlow(node *Node) {
	switch node.kind {
	case SyntaxKindArrayLiteralExpression:
		for _, e := range node.AsArrayLiteralExpression().elements {
			if e.kind == SyntaxKindSpreadElement {
				b.bindAssignmentTargetFlow(e.AsSpreadElement().expression)
			} else {
				b.bindDestructuringTargetFlow(e)
			}
		}
	case SyntaxKindObjectLiteralExpression:
		for _, p := range node.AsObjectLiteralExpression().properties {
			switch p.kind {
			case SyntaxKindPropertyAssignment:
				b.bindDestructuringTargetFlow(p.AsPropertyAssignment().initializer)
			case SyntaxKindShorthandPropertyAssignment:
				b.bindAssignmentTargetFlow(p.AsShorthandPropertyAssignment().name)
			case SyntaxKindSpreadAssignment:
				b.bindAssignmentTargetFlow(p.AsSpreadAssignment().expression)
			}
		}
	default:
		if isNarrowableReference(node) {
			b.currentFlow = b.createFlowMutation(FlowFlagsAssignment, b.currentFlow, node)
		}
	}
}

func (b *Binder) bindDestructuringTargetFlow(node *Node) {
	if isBinaryExpression(node) && node.AsBinaryExpression().operatorToken.kind == SyntaxKindEqualsToken {
		b.bindAssignmentTargetFlow(node.AsBinaryExpression().left)
	} else {
		b.bindAssignmentTargetFlow(node)
	}
}

func (b *Binder) bindWhileStatement(node *Node) {
	stmt := node.AsWhileStatement()
	preWhileLabel := b.setContinueTarget(node, b.createLoopLabel())
	preBodyLabel := b.createBranchLabel()
	postWhileLabel := b.createBranchLabel()
	b.addAntecedent(preWhileLabel, b.currentFlow)
	b.currentFlow = preWhileLabel
	b.bindCondition(stmt.expression, preBodyLabel, postWhileLabel)
	b.currentFlow = finishFlowLabel(preBodyLabel)
	b.bindIterativeStatement(stmt.statement, postWhileLabel, preWhileLabel)
	b.addAntecedent(preWhileLabel, b.currentFlow)
	b.currentFlow = finishFlowLabel(postWhileLabel)
}

func (b *Binder) bindDoStatement(node *Node) {
	stmt := node.AsDoStatement()
	preDoLabel := b.createLoopLabel()
	preConditionLabel := b.setContinueTarget(node, b.createBranchLabel())
	postDoLabel := b.createBranchLabel()
	b.addAntecedent(preDoLabel, b.currentFlow)
	b.currentFlow = preDoLabel
	b.bindIterativeStatement(stmt.statement, postDoLabel, preConditionLabel)
	b.addAntecedent(preConditionLabel, b.currentFlow)
	b.currentFlow = finishFlowLabel(preConditionLabel)
	b.bindCondition(stmt.expression, preDoLabel, postDoLabel)
	b.currentFlow = finishFlowLabel(postDoLabel)
}

func (b *Binder) bindForStatement(node *Node) {
	stmt := node.AsForStatement()
	preLoopLabel := b.setContinueTarget(node, b.createLoopLabel())
	preBodyLabel := b.createBranchLabel()
	postLoopLabel := b.createBranchLabel()
	b.bind(stmt.initializer)
	b.addAntecedent(preLoopLabel, b.currentFlow)
	b.currentFlow = preLoopLabel
	b.bindCondition(stmt.condition, preBodyLabel, postLoopLabel)
	b.currentFlow = finishFlowLabel(preBodyLabel)
	b.bindIterativeStatement(stmt.statement, postLoopLabel, preLoopLabel)
	b.bind(stmt.incrementor)
	b.addAntecedent(preLoopLabel, b.currentFlow)
	b.currentFlow = finishFlowLabel(postLoopLabel)
}

func (b *Binder) bindForInOrForOfStatement(node *Node) {
	stmt := node.AsForInOrOfStatement()
	preLoopLabel := b.setContinueTarget(node, b.createLoopLabel())
	postLoopLabel := b.createBranchLabel()
	b.bind(stmt.expression)
	b.addAntecedent(preLoopLabel, b.currentFlow)
	b.currentFlow = preLoopLabel
	if node.kind == SyntaxKindForOfStatement {
		b.bind(stmt.awaitModifier)
	}
	b.addAntecedent(postLoopLabel, b.currentFlow)
	b.bind(stmt.initializer)
	if stmt.initializer.kind != SyntaxKindVariableDeclarationList {
		b.bindAssignmentTargetFlow(stmt.initializer)
	}
	b.bindIterativeStatement(stmt.statement, postLoopLabel, preLoopLabel)
	b.addAntecedent(preLoopLabel, b.currentFlow)
	b.currentFlow = finishFlowLabel(postLoopLabel)
}

func (b *Binder) bindIfStatement(node *Node) {
	stmt := node.AsIfStatement()
	thenLabel := b.createBranchLabel()
	elseLabel := b.createBranchLabel()
	postIfLabel := b.createBranchLabel()
	b.bindCondition(stmt.expression, thenLabel, elseLabel)
	b.currentFlow = finishFlowLabel(thenLabel)
	b.bind(stmt.thenStatement)
	b.addAntecedent(postIfLabel, b.currentFlow)
	b.currentFlow = finishFlowLabel(elseLabel)
	b.bind(stmt.elseStatement)
	b.addAntecedent(postIfLabel, b.currentFlow)
	b.currentFlow = finishFlowLabel(postIfLabel)
}

func (b *Binder) bindReturnStatement(node *Node) {
	b.bind(node.AsReturnStatement().expression)
	if b.currentReturnTarget != nil {
		b.addAntecedent(b.currentReturnTarget, b.currentFlow)
	}
	b.currentFlow = unreachableFlow
	b.hasExplicitReturn = true
	b.hasFlowEffects = true
}

func (b *Binder) bindThrowStatement(node *Node) {
	b.bind(node.AsThrowStatement().expression)
	b.currentFlow = unreachableFlow
	b.hasFlowEffects = true
}

func (b *Binder) bindBreakStatement(node *Node) {
	b.bindBreakOrContinueStatement(node.AsBreakStatement().label, b.currentBreakTarget, (*ActiveLabel).BreakTarget)
}

func (b *Binder) bindContinueStatement(node *Node) {
	b.bindBreakOrContinueStatement(node.AsContinueStatement().label, b.currentContinueTarget, (*ActiveLabel).ContinueTarget)
}

func (b *Binder) bindBreakOrContinueStatement(label *Node, currentTarget *FlowNode, getTarget func(*ActiveLabel) *FlowNode) {
	b.bind(label)
	if label != nil {
		activeLabel := b.findActiveLabel(label.AsIdentifier().text)
		if activeLabel != nil {
			activeLabel.referenced = true
			b.bindBreakOrContinueFlow(getTarget(activeLabel))
		}
	} else {
		b.bindBreakOrContinueFlow(currentTarget)
	}
}

func (b *Binder) findActiveLabel(name string) *ActiveLabel {
	for label := b.activeLabelList; label != nil; label = label.next {
		if label.name == name {
			return label
		}
	}
	return nil
}

func (b *Binder) bindBreakOrContinueFlow(flowLabel *FlowLabel) {
	if flowLabel != nil {
		b.addAntecedent(flowLabel, b.currentFlow)
		b.currentFlow = unreachableFlow
		b.hasFlowEffects = true
	}
}

func (b *Binder) bindTryStatement(node *Node) {
	// We conservatively assume that *any* code in the try block can cause an exception, but we only need
	// to track code that causes mutations (because only mutations widen the possible control flow type of
	// a variable). The exceptionLabel is the target label for control flows that result from exceptions.
	// We add all mutation flow nodes as antecedents of this label such that we can analyze them as possible
	// antecedents of the start of catch or finally blocks. Furthermore, we add the current control flow to
	// represent exceptions that occur before any mutations.
	stmt := node.AsTryStatement()
	saveReturnTarget := b.currentReturnTarget
	saveExceptionTarget := b.currentExceptionTarget
	normalExitLabel := b.createBranchLabel()
	returnLabel := b.createBranchLabel()
	exceptionLabel := b.createBranchLabel()
	if stmt.finallyBlock != nil {
		b.currentReturnTarget = returnLabel
	}
	b.addAntecedent(exceptionLabel, b.currentFlow)
	b.currentExceptionTarget = exceptionLabel
	b.bind(stmt.tryBlock)
	b.addAntecedent(normalExitLabel, b.currentFlow)
	if stmt.catchClause != nil {
		// Start of catch clause is the target of exceptions from try block.
		b.currentFlow = finishFlowLabel(exceptionLabel)
		// The currentExceptionTarget now represents control flows from exceptions in the catch clause.
		// Effectively, in a try-catch-finally, if an exception occurs in the try block, the catch block
		// acts like a second try block.
		exceptionLabel = b.createBranchLabel()
		b.addAntecedent(exceptionLabel, b.currentFlow)
		b.currentExceptionTarget = exceptionLabel
		b.bind(stmt.catchClause)
		b.addAntecedent(normalExitLabel, b.currentFlow)
	}
	b.currentReturnTarget = saveReturnTarget
	b.currentExceptionTarget = saveExceptionTarget
	if stmt.finallyBlock != nil {
		// Possible ways control can reach the finally block:
		// 1) Normal completion of try block of a try-finally or try-catch-finally
		// 2) Normal completion of catch block (following exception in try block) of a try-catch-finally
		// 3) Return in try or catch block of a try-finally or try-catch-finally
		// 4) Exception in try block of a try-finally
		// 5) Exception in catch block of a try-catch-finally
		// When analyzing a control flow graph that starts inside a finally block we want to consider all
		// five possibilities above. However, when analyzing a control flow graph that starts outside (past)
		// the finally block, we only want to consider the first two (if we're past a finally block then it
		// must have completed normally). Likewise, when analyzing a control flow graph from return statements
		// in try or catch blocks in an IIFE, we only want to consider the third. To make this possible, we
		// inject a ReduceLabel node into the control flow graph. This node contains an alternate reduced
		// set of antecedents for the pre-finally label. As control flow analysis passes by a ReduceLabel
		// node, the pre-finally label is temporarily switched to the reduced antecedent set.
		finallyLabel := b.createBranchLabel()
		finallyLabel.antecedents = b.combineFlowLists(normalExitLabel.antecedents, b.combineFlowLists(exceptionLabel.antecedents, returnLabel.antecedents))
		b.currentFlow = finallyLabel
		b.bind(stmt.finallyBlock)
		if b.currentFlow.flags&FlowFlagsUnreachable != 0 {
			// If the end of the finally block is unreachable, the end of the entire try statement is unreachable.
			b.currentFlow = unreachableFlow
		} else {
			// If we have an IIFE return target and return statements in the try or catch blocks, add a control
			// flow that goes back through the finally block and back through only the return statements.
			if b.currentReturnTarget != nil && returnLabel.antecedent != nil {
				b.addAntecedent(b.currentReturnTarget, b.createReduceLabel(finallyLabel, returnLabel.antecedents, b.currentFlow))
			}
			// If we have an outer exception target (i.e. a containing try-finally or try-catch-finally), add a
			// control flow that goes back through the finally blok and back through each possible exception source.
			if b.currentExceptionTarget != nil && exceptionLabel.antecedent != nil {
				b.addAntecedent(b.currentExceptionTarget, b.createReduceLabel(finallyLabel, exceptionLabel.antecedents, b.currentFlow))
			}
			// If the end of the finally block is reachable, but the end of the try and catch blocks are not,
			// convert the current flow to unreachable. For example, 'try { return 1; } finally { ... }' should
			// result in an unreachable current control flow.
			if normalExitLabel.antecedent != nil {
				b.currentFlow = b.createReduceLabel(finallyLabel, normalExitLabel.antecedents, b.currentFlow)
			} else {
				b.currentFlow = unreachableFlow
			}
		}
	} else {
		b.currentFlow = finishFlowLabel(normalExitLabel)
	}
}

func (b *Binder) bindSwitchStatement(node *Node) {
	stmt := node.AsSwitchStatement()
	postSwitchLabel := b.createBranchLabel()
	b.bind(stmt.expression)
	saveBreakTarget := b.currentBreakTarget
	savePreSwitchCaseFlow := b.preSwitchCaseFlow
	b.currentBreakTarget = postSwitchLabel
	b.preSwitchCaseFlow = b.currentFlow
	b.bind(stmt.caseBlock)
	b.addAntecedent(postSwitchLabel, b.currentFlow)
	hasDefault := some(stmt.caseBlock.AsCaseBlock().clauses, func(c *Node) bool {
		return c.kind == SyntaxKindDefaultClause
	})
	if !hasDefault {
		b.addAntecedent(postSwitchLabel, b.createFlowSwitchClause(b.preSwitchCaseFlow, stmt, 0, 0))
	}
	b.currentBreakTarget = saveBreakTarget
	b.preSwitchCaseFlow = savePreSwitchCaseFlow
	b.currentFlow = finishFlowLabel(postSwitchLabel)
}

func (b *Binder) bindCaseBlock(node *Node) {
	switchStatement := node.parent.AsSwitchStatement()
	clauses := node.AsCaseBlock().clauses
	isNarrowingSwitch := switchStatement.expression.kind == SyntaxKindTrueKeyword || isNarrowingExpression(switchStatement.expression)
	var fallthroughFlow *FlowNode = unreachableFlow
	for i := 0; i < len(clauses); i++ {
		clauseStart := i
		for len(clauses[i].AsCaseOrDefaultClause().statements) == 0 && i+1 < len(clauses) {
			if fallthroughFlow == unreachableFlow {
				b.currentFlow = b.preSwitchCaseFlow
			}
			b.bind(clauses[i])
			i++
		}
		preCaseLabel := b.createBranchLabel()
		preCaseFlow := b.preSwitchCaseFlow
		if isNarrowingSwitch {
			preCaseFlow = b.createFlowSwitchClause(b.preSwitchCaseFlow, switchStatement, int32(clauseStart), int32(i+1))
		}
		b.addAntecedent(preCaseLabel, preCaseFlow)
		b.addAntecedent(preCaseLabel, fallthroughFlow)
		b.currentFlow = finishFlowLabel(preCaseLabel)
		clause := clauses[i]
		b.bind(clause)
		fallthroughFlow = b.currentFlow
		if b.currentFlow.flags&FlowFlagsUnreachable == 0 && i != len(clauses)-1 && b.options.NoFallthroughCasesInSwitch == TSTrue {
			clause.AsCaseOrDefaultClause().fallthroughFlowNode = b.currentFlow
		}
	}
}

func (b *Binder) bindCaseOrDefaultClause(node *Node) {
	clause := node.AsCaseOrDefaultClause()
	if clause.expression != nil {
		saveCurrentFlow := b.currentFlow
		b.currentFlow = b.preSwitchCaseFlow
		b.bind(clause.expression)
		b.currentFlow = saveCurrentFlow
	}
	b.bindEachStatement(clause.statements)
}

func (b *Binder) bindExpressionStatement(node *Node) {
	stmt := node.AsExpressionStatement()
	b.bind(stmt.expression)
	b.maybeBindExpressionFlowIfCall(stmt.expression)
}

func (b *Binder) maybeBindExpressionFlowIfCall(node *Node) {
	// A top level or comma expression call expression with a dotted function name and at least one argument
	// is potentially an assertion and is therefore included in the control flow.
	if isCallExpression(node) {
		expr := node.AsCallExpression()
		if expr.expression.kind != SyntaxKindSuperKeyword && isDottedName(expr.expression) {
			b.currentFlow = b.createFlowCall(b.currentFlow, expr)
		}
	}
}

func (b *Binder) bindLabeledStatement(node *Node) {
	stmt := node.AsLabeledStatement()
	postStatementLabel := b.createBranchLabel()
	b.activeLabelList = &ActiveLabel{
		next:           b.activeLabelList,
		name:           stmt.label.AsIdentifier().text,
		breakTarget:    postStatementLabel,
		continueTarget: nil,
		referenced:     false,
	}
	b.bind(stmt.label)
	b.bind(stmt.statement)
	if !b.activeLabelList.referenced && b.options.AllowUnusedLabels != TSTrue {
		b.errorOrSuggestionOnNode(unusedLabelIsError(b.options), stmt.label, diagnostics.Unused_label)
	}
	b.activeLabelList = b.activeLabelList.next
	b.addAntecedent(postStatementLabel, b.currentFlow)
	b.currentFlow = finishFlowLabel(postStatementLabel)
}

func (b *Binder) bindPrefixUnaryExpressionFlow(node *Node) {
	expr := node.AsPrefixUnaryExpression()
	if expr.operator == SyntaxKindExclamationToken {
		saveTrueTarget := b.currentTrueTarget
		b.currentTrueTarget = b.currentFalseTarget
		b.currentFalseTarget = saveTrueTarget
		b.bindEachChild(node)
		b.currentFalseTarget = b.currentTrueTarget
		b.currentTrueTarget = saveTrueTarget
	} else {
		b.bindEachChild(node)
		if expr.operator == SyntaxKindPlusPlusToken || expr.operator == SyntaxKindMinusMinusToken {
			b.bindAssignmentTargetFlow(expr.operand)
		}
	}
}

func (b *Binder) bindPostfixUnaryExpressionFlow(node *Node) {
	expr := node.AsPostfixUnaryExpression()
	b.bindEachChild(node)
	if expr.operator == SyntaxKindPlusPlusToken || expr.operator == SyntaxKindMinusMinusToken {
		b.bindAssignmentTargetFlow(expr.operand)
	}
}

func (b *Binder) bindDestructuringAssignmentFlow(node *Node) {
	expr := node.AsBinaryExpression()
	if b.inAssignmentPattern {
		b.inAssignmentPattern = false
		b.bind(expr.operatorToken)
		b.bind(expr.right)
		b.inAssignmentPattern = true
		b.bind(expr.left)
	} else {
		b.inAssignmentPattern = true
		b.bind(expr.left)
		b.inAssignmentPattern = false
		b.bind(expr.operatorToken)
		b.bind(expr.right)
	}
	b.bindAssignmentTargetFlow(expr.left)
}

func (b *Binder) bindBinaryExpressionFlow(node *Node) {
	expr := node.AsBinaryExpression()
	operator := expr.operatorToken.kind
	if isLogicalOrCoalescingBinaryOperator(operator) || isLogicalOrCoalescingAssignmentOperator(operator) {
		if isTopLevelLogicalExpression(node) {
			postExpressionLabel := b.createBranchLabel()
			saveCurrentFlow := b.currentFlow
			saveHasFlowEffects := b.hasFlowEffects
			b.hasFlowEffects = false
			b.bindLogicalLikeExpression(node, postExpressionLabel, postExpressionLabel)
			if b.hasFlowEffects {
				b.currentFlow = finishFlowLabel(postExpressionLabel)
			} else {
				b.currentFlow = saveCurrentFlow
			}
			b.hasFlowEffects = b.hasFlowEffects || saveHasFlowEffects
			b.currentFlow = finishFlowLabel(postExpressionLabel)
		} else {
			b.bindLogicalLikeExpression(node, b.currentTrueTarget, b.currentFalseTarget)
		}
	} else {
		b.bind(expr.left)
		if operator == SyntaxKindCommaToken {
			b.maybeBindExpressionFlowIfCall(node)
		}
		b.bind(expr.operatorToken)
		b.bind(expr.right)
		if operator == SyntaxKindCommaToken {
			b.maybeBindExpressionFlowIfCall(node)
		}
		if isAssignmentOperator(operator) && !isAssignmentTarget(node) {
			b.bindAssignmentTargetFlow(expr.left)
			if operator == SyntaxKindEqualsToken && expr.left.kind == SyntaxKindElementAccessExpression {
				elementAccess := expr.left.AsElementAccessExpression()
				if isNarrowableOperand(elementAccess.expression) {
					b.currentFlow = b.createFlowMutation(FlowFlagsArrayMutation, b.currentFlow, node)
				}
			}
		}
	}
}

func (b *Binder) bindLogicalLikeExpression(node *Node, trueTarget *FlowLabel, falseTarget *FlowLabel) {
	expr := node.AsBinaryExpression()
	preRightLabel := b.createBranchLabel()
	if expr.operatorToken.kind == SyntaxKindAmpersandAmpersandToken || expr.operatorToken.kind == SyntaxKindAmpersandAmpersandEqualsToken {
		b.bindCondition(expr.left, preRightLabel, falseTarget)
	} else {
		b.bindCondition(expr.left, trueTarget, preRightLabel)
	}
	b.currentFlow = finishFlowLabel(preRightLabel)
	b.bind(expr.operatorToken)
	if isLogicalOrCoalescingAssignmentOperator(expr.operatorToken.kind) {
		b.doWithConditionalBranches(b.bind, expr.right, trueTarget, falseTarget)
		b.bindAssignmentTargetFlow(expr.left)
		b.addAntecedent(trueTarget, b.createFlowCondition(FlowFlagsTrueCondition, b.currentFlow, node))
		b.addAntecedent(falseTarget, b.createFlowCondition(FlowFlagsFalseCondition, b.currentFlow, node))
	} else {
		b.bindCondition(expr.right, trueTarget, falseTarget)
	}
}

func (b *Binder) bindDeleteExpressionFlow(node *Node) {
	expr := node.AsDeleteExpression()
	b.bindEachChild(node)
	if expr.expression.kind == SyntaxKindPropertyAccessExpression {
		b.bindAssignmentTargetFlow(expr.expression)
	}
}

func (b *Binder) bindConditionalExpressionFlow(node *Node) {
	expr := node.AsConditionalExpression()
	trueLabel := b.createBranchLabel()
	falseLabel := b.createBranchLabel()
	postExpressionLabel := b.createBranchLabel()
	saveCurrentFlow := b.currentFlow
	saveHasFlowEffects := b.hasFlowEffects
	b.hasFlowEffects = false
	b.bindCondition(expr.condition, trueLabel, falseLabel)
	b.currentFlow = finishFlowLabel(trueLabel)
	b.bind(expr.questionToken)
	b.bind(expr.whenTrue)
	b.addAntecedent(postExpressionLabel, b.currentFlow)
	b.currentFlow = finishFlowLabel(falseLabel)
	b.bind(expr.colonToken)
	b.bind(expr.whenFalse)
	b.addAntecedent(postExpressionLabel, b.currentFlow)
	if b.hasFlowEffects {
		b.currentFlow = finishFlowLabel(postExpressionLabel)
	} else {
		b.currentFlow = saveCurrentFlow
	}
	b.hasFlowEffects = b.hasFlowEffects || saveHasFlowEffects
}

func (b *Binder) bindVariableDeclarationFlow(node *Node) {
	b.bindEachChild(node)
	if node.AsVariableDeclaration().initializer != nil || isForInOrOfStatement(node.parent.parent) {
		b.bindInitializedVariableFlow(node)
	}
}

func (b *Binder) bindInitializedVariableFlow(node *Node) {
	var name *Node
	switch node.kind {
	case SyntaxKindVariableDeclaration:
		name = node.AsVariableDeclaration().name
	case SyntaxKindBindingElement:
		name = node.AsBindingElement().name
	}
	if isBindingPattern(name) {
		for _, child := range name.AsBindingPattern().elements {
			b.bindInitializedVariableFlow(child)
		}
	} else {
		b.currentFlow = b.createFlowMutation(FlowFlagsAssignment, b.currentFlow, node)
	}
}

func (b *Binder) bindAccessExpressionFlow(node *Node) {
	if isOptionalChain(node) {
		b.bindOptionalChainFlow(node)
	} else {
		b.bindEachChild(node)
	}
}

func (b *Binder) bindOptionalChainFlow(node *Node) {
	if isTopLevelLogicalExpression(node) {
		postExpressionLabel := b.createBranchLabel()
		saveCurrentFlow := b.currentFlow
		saveHasFlowEffects := b.hasFlowEffects
		b.bindOptionalChain(node, postExpressionLabel, postExpressionLabel)
		if b.hasFlowEffects {
			b.currentFlow = finishFlowLabel(postExpressionLabel)
		} else {
			b.currentFlow = saveCurrentFlow
		}
		b.hasFlowEffects = b.hasFlowEffects || saveHasFlowEffects
	} else {
		b.bindOptionalChain(node, b.currentTrueTarget, b.currentFalseTarget)
	}
}

func (b *Binder) bindOptionalChain(node *Node, trueTarget *FlowLabel, falseTarget *FlowLabel) {
	// For an optional chain, we emulate the behavior of a logical expression:
	//
	// a?.b         -> a && a.b
	// a?.b.c       -> a && a.b.c
	// a?.b?.c      -> a && a.b && a.b.c
	// a?.[x = 1]   -> a && a[x = 1]
	//
	// To do this we descend through the chain until we reach the root of a chain (the expression with a `?.`)
	// and build it's CFA graph as if it were the first condition (`a && ...`). Then we bind the rest
	// of the node as part of the "true" branch, and continue to do so as we ascend back up to the outermost
	// chain node. We then treat the entire node as the right side of the expression.
	var preChainLabel *FlowLabel
	if isOptionalChainRoot(node) {
		preChainLabel = b.createBranchLabel()
	}
	b.bindOptionalExpression(getAccessedExpression(node), ifElse(preChainLabel != nil, preChainLabel, trueTarget), falseTarget)
	if preChainLabel != nil {
		b.currentFlow = finishFlowLabel(preChainLabel)
	}
	b.doWithConditionalBranches(b.bindOptionalChainRest, node, trueTarget, falseTarget)
	if isOutermostOptionalChain(node) {
		b.addAntecedent(trueTarget, b.createFlowCondition(FlowFlagsTrueCondition, b.currentFlow, node))
		b.addAntecedent(falseTarget, b.createFlowCondition(FlowFlagsFalseCondition, b.currentFlow, node))
	}
}

func (b *Binder) bindOptionalExpression(node *Node, trueTarget *FlowLabel, falseTarget *FlowLabel) {
	b.doWithConditionalBranches(b.bind, node, trueTarget, falseTarget)
	if !isOptionalChain(node) || isOutermostOptionalChain(node) {
		b.addAntecedent(trueTarget, b.createFlowCondition(FlowFlagsTrueCondition, b.currentFlow, node))
		b.addAntecedent(falseTarget, b.createFlowCondition(FlowFlagsFalseCondition, b.currentFlow, node))
	}
}

func (b *Binder) bindOptionalChainRest(node *Node) bool {
	switch node.kind {
	case SyntaxKindPropertyAccessExpression:
		b.bind(node.AsPropertyAccessExpression().questionDotToken)
		b.bind(node.AsPropertyAccessExpression().name)
	case SyntaxKindElementAccessExpression:
		b.bind(node.AsElementAccessExpression().questionDotToken)
		b.bind(node.AsElementAccessExpression().argumentExpression)
	case SyntaxKindCallExpression:
		b.bind(node.AsCallExpression().questionDotToken)
		b.bind(node.AsCallExpression().typeArguments)
		b.bindEachExpression(node.AsCallExpression().arguments)
	}
	return false
}

func (b *Binder) bindCallExpressionFlow(node *Node) {
	call := node.AsCallExpression()
	if isOptionalChain(node) {
		b.bindOptionalChainFlow(node)
	} else {
		// If the target of the call expression is a function expression or arrow function we have
		// an immediately invoked function expression (IIFE). Initialize the flowNode property to
		// the current control flow (which includes evaluation of the IIFE arguments).
		expr := skipParentheses(call.expression)
		if expr.kind == SyntaxKindFunctionExpression || expr.kind == SyntaxKindArrowFunction {
			b.bind(call.typeArguments)
			b.bindEachExpression(call.arguments)
			b.bind(call.expression)
		} else {
			b.bindEachChild(node)
			if call.expression.kind == SyntaxKindSuperKeyword {
				b.currentFlow = b.createFlowCall(b.currentFlow, call)
			}
		}
	}
	if isPropertyAccessExpression(call.expression) {
		access := call.expression.AsPropertyAccessExpression()
		if isIdentifier(access.name) && isNarrowableOperand(access.expression) && isPushOrUnshiftIdentifier(access.name) {
			b.currentFlow = b.createFlowMutation(FlowFlagsArrayMutation, b.currentFlow, node)
		}
	}
}

func (b *Binder) bindNonNullExpressionFlow(node *Node) {
	if isOptionalChain(node) {
		b.bindOptionalChainFlow(node)
	} else {
		b.bindEachChild(node)
	}
}

func (b *Binder) bindBindingElementFlow(node *Node) {
	// When evaluating a binding pattern, the initializer is evaluated before the binding pattern, per:
	// - https://tc39.es/ecma262/#sec-destructuring-binding-patterns-runtime-semantics-iteratorbindinginitialization
	//   - `BindingElement: BindingPattern Initializer?`
	// - https://tc39.es/ecma262/#sec-runtime-semantics-keyedbindinginitialization
	//   - `BindingElement: BindingPattern Initializer?`
	elem := node.AsBindingElement()
	b.bind(elem.dotDotDotToken)
	b.bind(elem.propertyName)
	b.bindInitializer(elem.initializer)
	b.bind(elem.name)
}

func (b *Binder) bindParameterFlow(node *Node) {
	param := node.AsParameterDeclaration()
	b.bind(param.modifiers)
	b.bind(param.dotDotDotToken)
	b.bind(param.questionToken)
	b.bind(param.typeNode)
	b.bindInitializer(param.initializer)
	b.bind(param.name)
}

// a BindingElement/Parameter does not have side effects if initializers are not evaluated and used. (see GH#49759)
func (b *Binder) bindInitializer(node *Node) {
	if node == nil {
		return
	}
	entryFlow := b.currentFlow
	b.bind(node)
	if entryFlow == unreachableFlow || entryFlow == b.currentFlow {
		return
	}
	exitFlow := b.createBranchLabel()
	b.addAntecedent(exitFlow, entryFlow)
	b.addAntecedent(exitFlow, b.currentFlow)
	b.currentFlow = finishFlowLabel(exitFlow)
}

func isEnumDeclarationWithPreservedEmit(node *Node, options *CompilerOptions) bool {
	return node.kind == SyntaxKindEnumDeclaration && (!isEnumConst(node) || shouldPreserveConstEnums(options))
}

func setFlowNode(node *Node, flowNode *FlowNode) {
	data := node.FlowNodeData()
	if data != nil {
		data.flowNode = flowNode
	}
}

func setReturnFlowNode(node *Node, returnFlowNode *FlowNode) {
	switch node.kind {
	case SyntaxKindConstructor:
		node.AsConstructorDeclaration().returnFlowNode = returnFlowNode
	case SyntaxKindFunctionDeclaration:
		node.AsFunctionDeclaration().returnFlowNode = returnFlowNode
	case SyntaxKindFunctionExpression:
		node.AsFunctionExpression().returnFlowNode = returnFlowNode
	}
}

func isGeneratorFunctionExpression(node *Node) bool {
	return isFunctionExpression(node) && node.AsFunctionExpression().asteriskToken != nil
}

func (b *Binder) addToContainerChain(next *Node) {
	if b.lastContainer != nil {
		next.LocalsContainerData().nextContainer = next
	}
	b.lastContainer = next
}

func (b *Binder) addDeclarationToSymbol(symbol *Symbol, node *Node, symbolFlags SymbolFlags) {
	symbol.flags |= symbolFlags
	node.DeclarationData().symbol = symbol
	if symbol.declarations == nil {
		symbol.declarations = b.newSingleDeclaration(node)
	} else {
		symbol.declarations = appendIfUnique(symbol.declarations, node)
	}
	// On merge of const enum module with class or function, reset const enum only flag (namespaces will already recalculate)
	if symbol.constEnumOnlyModule && symbol.flags&(SymbolFlagsFunction|SymbolFlagsClass|SymbolFlagsRegularEnum) != 0 {
		symbol.constEnumOnlyModule = false
	}
	if symbolFlags&SymbolFlagsValue != 0 {
		setValueDeclaration(symbol, node)
	}
}

func setValueDeclaration(symbol *Symbol, node *Node) {
	valueDeclaration := symbol.valueDeclaration
	if valueDeclaration == nil ||
		!(node.flags&NodeFlagsAmbient != 0 && valueDeclaration.flags&NodeFlagsAmbient == 0) &&
			(isAssignmentDeclaration(valueDeclaration) && !isAssignmentDeclaration(node)) ||
		(valueDeclaration.kind != node.kind && isEffectiveModuleDeclaration(valueDeclaration)) {
		// other kinds of value declarations take precedence over modules and assignment declarations
		symbol.valueDeclaration = node
	}
}

/**
 * Declares a Symbol for the node and adds it to symbols. Reports errors for conflicting identifier names.
 * @param symbolTable - The symbol table which node will be added to.
 * @param parent - node's parent declaration.
 * @param node - The declaration to be added to the symbol table
 * @param includes - The SymbolFlags that node has in addition to its declaration type (eg: export, ambient, etc.)
 * @param excludes - The flags which node cannot be declared alongside in a symbol table. Used to report forbidden declarations.
 */

func getContainerFlags(node *Node) ContainerFlags {
	switch node.kind {
	case SyntaxKindClassExpression, SyntaxKindClassDeclaration, SyntaxKindEnumDeclaration, SyntaxKindObjectLiteralExpression, SyntaxKindTypeLiteral,
		SyntaxKindJSDocTypeLiteral, SyntaxKindJsxAttributes:
		return ContainerFlagsIsContainer
	case SyntaxKindInterfaceDeclaration:
		return ContainerFlagsIsContainer | ContainerFlagsIsInterface
	case SyntaxKindModuleDeclaration, SyntaxKindTypeAliasDeclaration, SyntaxKindMappedType, SyntaxKindIndexSignature:
		return ContainerFlagsIsContainer | ContainerFlagsHasLocals
	case SyntaxKindSourceFile:
		return ContainerFlagsIsContainer | ContainerFlagsIsControlFlowContainer | ContainerFlagsHasLocals
	case SyntaxKindGetAccessor, SyntaxKindSetAccessor, SyntaxKindMethodDeclaration:
		if isObjectLiteralOrClassExpressionMethodOrAccessor(node) {
			return ContainerFlagsIsContainer | ContainerFlagsIsControlFlowContainer | ContainerFlagsHasLocals | ContainerFlagsIsFunctionLike | ContainerFlagsIsObjectLiteralOrClassExpressionMethodOrAccessor
		}
		fallthrough
	case SyntaxKindConstructor, SyntaxKindFunctionDeclaration, SyntaxKindMethodSignature, SyntaxKindCallSignature, SyntaxKindJSDocSignature,
		SyntaxKindJSDocFunctionType, SyntaxKindFunctionType, SyntaxKindConstructSignature, SyntaxKindConstructorType, SyntaxKindClassStaticBlockDeclaration:
		return ContainerFlagsIsContainer | ContainerFlagsIsControlFlowContainer | ContainerFlagsHasLocals | ContainerFlagsIsFunctionLike
	case SyntaxKindFunctionExpression, SyntaxKindArrowFunction:
		return ContainerFlagsIsContainer | ContainerFlagsIsControlFlowContainer | ContainerFlagsHasLocals | ContainerFlagsIsFunctionLike | ContainerFlagsIsFunctionExpression
	case SyntaxKindModuleBlock:
		return ContainerFlagsIsControlFlowContainer
	case SyntaxKindPropertyDeclaration:
		if node.AsPropertyDeclaration().initializer != nil {
			return ContainerFlagsIsControlFlowContainer
		} else {
			return ContainerFlagsNone
		}
	case SyntaxKindCatchClause, SyntaxKindForStatement, SyntaxKindForInStatement, SyntaxKindForOfStatement, SyntaxKindCaseBlock:
		return ContainerFlagsIsBlockScopedContainer | ContainerFlagsHasLocals
	case SyntaxKindBlock:
		if isFunctionLike(node.parent) || isClassStaticBlockDeclaration(node.parent) {
			return ContainerFlagsNone
		} else {
			return ContainerFlagsIsBlockScopedContainer | ContainerFlagsHasLocals
		}
	}
	return ContainerFlagsNone
}

func isNarrowingExpression(expr *Node) bool {
	switch expr.kind {
	case SyntaxKindIdentifier, SyntaxKindThisKeyword:
		return true
	case SyntaxKindPropertyAccessExpression, SyntaxKindElementAccessExpression:
		return containsNarrowableReference(expr)
	case SyntaxKindCallExpression:
		return hasNarrowableArgument(expr)
	case SyntaxKindParenthesizedExpression:
		// if isJSDocTypeAssertion(expr) {
		// 	return false
		// }
		return isNarrowingExpression(expr.AsParenthesizedExpression().expression)
	case SyntaxKindNonNullExpression:
		return isNarrowingExpression(expr.AsNonNullExpression().expression)
	case SyntaxKindBinaryExpression:
		return isNarrowingBinaryExpression(expr.AsBinaryExpression())
	case SyntaxKindPrefixUnaryExpression:
		return expr.AsPrefixUnaryExpression().operator == SyntaxKindExclamationToken && isNarrowingExpression(expr.AsPrefixUnaryExpression().operand)
	case SyntaxKindTypeOfExpression:
		return isNarrowingExpression(expr.AsTypeOfExpression().expression)
	}
	return false
}

func containsNarrowableReference(expr *Node) bool {
	if isNarrowableReference(expr) {
		return true
	}
	if expr.flags&NodeFlagsOptionalChain != 0 {
		switch expr.kind {
		case SyntaxKindPropertyAccessExpression:
			return containsNarrowableReference(expr.AsPropertyAccessExpression().expression)
		case SyntaxKindElementAccessExpression:
			return containsNarrowableReference(expr.AsElementAccessExpression().expression)
		case SyntaxKindCallExpression:
			return containsNarrowableReference(expr.AsCallExpression().expression)
		case SyntaxKindNonNullExpression:
			return containsNarrowableReference(expr.AsNonNullExpression().expression)
		}
	}
	return false
}

func isNarrowableReference(node *Node) bool {
	switch node.kind {
	case SyntaxKindIdentifier, SyntaxKindThisKeyword, SyntaxKindSuperKeyword, SyntaxKindMetaProperty:
		return true
	case SyntaxKindPropertyAccessExpression:
		return isNarrowableReference(node.AsPropertyAccessExpression().expression)
	case SyntaxKindParenthesizedExpression:
		return isNarrowableReference(node.AsParenthesizedExpression().expression)
	case SyntaxKindNonNullExpression:
		return isNarrowableReference(node.AsNonNullExpression().expression)
	case SyntaxKindElementAccessExpression:
		expr := node.AsElementAccessExpression()
		return isStringOrNumericLiteralLike(expr.argumentExpression) ||
			isEntityNameExpression(expr.argumentExpression) && isNarrowableReference(expr.expression)
	case SyntaxKindBinaryExpression:
		expr := node.AsBinaryExpression()
		return expr.operatorToken.kind == SyntaxKindCommaToken && isNarrowableReference(expr.right) ||
			isAssignmentOperator(expr.operatorToken.kind) && isLeftHandSideExpression(expr.left)
	}
	return false
}

func hasNarrowableArgument(expr *Node) bool {
	call := expr.AsCallExpression()
	for _, argument := range call.arguments {
		if containsNarrowableReference(argument) {
			return true
		}
	}
	if isPropertyAccessExpression(call.expression) {
		if containsNarrowableReference(call.expression.AsPropertyAccessExpression().expression) {
			return true
		}
	}
	return false
}

func isNarrowingBinaryExpression(expr *BinaryExpression) bool {
	switch expr.operatorToken.kind {
	case SyntaxKindEqualsToken, SyntaxKindBarBarEqualsToken, SyntaxKindAmpersandAmpersandEqualsToken, SyntaxKindQuestionQuestionEqualsToken:
		return containsNarrowableReference(expr.left)
	case SyntaxKindEqualsEqualsToken, SyntaxKindExclamationEqualsToken, SyntaxKindEqualsEqualsEqualsToken, SyntaxKindExclamationEqualsEqualsToken:
		return isNarrowableOperand(expr.left) || isNarrowableOperand(expr.right) ||
			isNarrowingTypeOfOperands(expr.right, expr.left) || isNarrowingTypeOfOperands(expr.left, expr.right) ||
			(isBooleanLiteral(expr.right) && isNarrowingExpression(expr.left) || isBooleanLiteral(expr.left) && isNarrowingExpression(expr.right))
	case SyntaxKindInstanceOfKeyword:
		return isNarrowableOperand(expr.left)
	case SyntaxKindInKeyword:
		return isNarrowingExpression(expr.right)
	case SyntaxKindCommaToken:
		return isNarrowingExpression(expr.right)
	}
	return false
}

func isNarrowableOperand(expr *Node) bool {
	switch expr.kind {
	case SyntaxKindParenthesizedExpression:
		return isNarrowableOperand(expr.AsParenthesizedExpression().expression)
	case SyntaxKindBinaryExpression:
		binary := expr.AsBinaryExpression()
		switch binary.operatorToken.kind {
		case SyntaxKindEqualsToken:
			return isNarrowableOperand(binary.left)
		case SyntaxKindCommaToken:
			return isNarrowableOperand(binary.right)
		}
	}
	return containsNarrowableReference(expr)
}

func isNarrowingTypeOfOperands(expr1 *Node, expr2 *Node) bool {
	return isTypeOfExpression(expr1) && isNarrowableOperand(expr1.AsTypeOfExpression().expression) && isStringLiteralLike(expr2)
}

func (b *Binder) errorOnNode(node *Node, message *diagnostics.Message, args ...any) {
	b.addDiagnostic(b.createDiagnosticForNode(node, message, args...))
}

func (b *Binder) errorOnFirstToken(node *Node, message *diagnostics.Message, args ...any) {
	span := getRangeOfTokenAtPosition(b.file, node.Pos())
	b.addDiagnostic(NewDiagnostic(b.file, span, message, args...))
}

func (b *Binder) errorOrSuggestionOnNode(isError bool, node *Node, message *diagnostics.Message) {
	b.errorOrSuggestionOnRange(isError, node, node, message)
}

func (b *Binder) errorOrSuggestionOnRange(isError bool, startNode *Node, endNode *Node, message *diagnostics.Message) {
	textRange := NewTextRange(getRangeOfTokenAtPosition(b.file, startNode.Pos()).Pos(), endNode.End())
	diagnostic := NewDiagnostic(b.file, textRange, message)
	if isError {
		b.addDiagnostic(diagnostic)
	} else {
		diagnostic.SetCategory(diagnostics.CategorySuggestion)
		b.file.bindSuggestionDiagnostics = append(b.file.bindSuggestionDiagnostics, diagnostic)
	}
}

// Inside the binder, we may create a diagnostic for an as-yet unbound node (with potentially no parent pointers, implying no accessible source file)
// If so, the node _must_ be in the current file (as that's the only way anything could have traversed to it to yield it as the error node)
// This version of `createDiagnosticForNode` uses the binder's context to account for this, and always yields correct diagnostics even in these situations.
func (b *Binder) createDiagnosticForNode(node *Node, message *diagnostics.Message, args ...any) *Diagnostic {
	return NewDiagnostic(b.file, getErrorRangeForNode(b.file, node), message, args...)
}

func (b *Binder) addDiagnostic(diagnostic *Diagnostic) {
	b.file.bindDiagnostics = append(b.file.bindDiagnostics, diagnostic)
}

func isEnumConst(node *Node) bool {
	return getCombinedModifierFlags(node)&ModifierFlagsConst != 0
}
