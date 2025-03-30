package binder

import (
	"slices"
	"strconv"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/tspath"
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
	file                    *ast.SourceFile
	options                 *core.CompilerOptions
	languageVersion         core.ScriptTarget
	bindFunc                func(*ast.Node) bool
	unreachableFlow         *ast.FlowNode
	reportedUnreachableFlow *ast.FlowNode

	parent                 *ast.Node
	container              *ast.Node
	thisParentContainer    *ast.Node
	blockScopeContainer    *ast.Node
	lastContainer          *ast.Node
	currentFlow            *ast.FlowNode
	currentBreakTarget     *ast.FlowLabel
	currentContinueTarget  *ast.FlowLabel
	currentReturnTarget    *ast.FlowLabel
	currentTrueTarget      *ast.FlowLabel
	currentFalseTarget     *ast.FlowLabel
	currentExceptionTarget *ast.FlowLabel
	preSwitchCaseFlow      *ast.FlowNode
	activeLabelList        *ActiveLabel
	emitFlags              ast.NodeFlags
	seenThisKeyword        bool
	hasExplicitReturn      bool
	hasFlowEffects         bool
	inStrictMode           bool
	inAssignmentPattern    bool
	seenParseError         bool
	symbolCount            int
	classifiableNames      core.Set[string]
	symbolPool             core.Pool[ast.Symbol]
	flowNodePool           core.Pool[ast.FlowNode]
	flowListPool           core.Pool[ast.FlowList]
	singleDeclarationsPool core.Pool[*ast.Node]
}

type ActiveLabel struct {
	next           *ActiveLabel
	breakTarget    *ast.FlowLabel
	continueTarget *ast.FlowLabel
	name           string
	referenced     bool
}

func (label *ActiveLabel) BreakTarget() *ast.FlowNode    { return label.breakTarget }
func (label *ActiveLabel) ContinueTarget() *ast.FlowNode { return label.continueTarget }

func BindSourceFile(file *ast.SourceFile, options *core.CompilerOptions) {
	// This is constructed this way to make the compiler "out-line" the function,
	// avoiding most work in the common case where the file has already been bound.
	if !file.IsBound() {
		bindSourceFile(file, options)
	}
}

var binderPool = sync.Pool{
	New: func() any {
		b := &Binder{}
		b.bindFunc = b.bind // Allocate closure once
		return b
	},
}

func getBinder() *Binder {
	return binderPool.Get().(*Binder)
}

func putBinder(b *Binder) {
	*b = Binder{bindFunc: b.bindFunc}
	binderPool.Put(b)
}

func bindSourceFile(file *ast.SourceFile, options *core.CompilerOptions) {
	file.BindOnce(func() {
		b := getBinder()
		defer putBinder(b)
		b.file = file
		b.options = options
		b.languageVersion = options.GetEmitScriptTarget()
		b.inStrictMode = (options.AlwaysStrict.IsTrue() || options.Strict.IsTrue()) && !file.IsDeclarationFile || ast.IsExternalModule(file)
		b.unreachableFlow = b.newFlowNode(ast.FlowFlagsUnreachable)
		b.reportedUnreachableFlow = b.newFlowNode(ast.FlowFlagsUnreachable)
		b.bind(file.AsNode())
		file.SymbolCount = b.symbolCount
		file.ClassifiableNames = b.classifiableNames
	})
}

func (b *Binder) newSymbol(flags ast.SymbolFlags, name string) *ast.Symbol {
	b.symbolCount++
	result := b.symbolPool.New()
	result.Flags = flags
	result.Name = name
	return result
}

/**
 * Declares a Symbol for the node and adds it to symbols. Reports errors for conflicting identifier names.
 * @param symbolTable - The symbol table which node will be added to.
 * @param parent - node's parent declaration.
 * @param node - The declaration to be added to the symbol table
 * @param includes - The SymbolFlags that node has in addition to its declaration type (eg: export, ambient, etc.)
 * @param excludes - The flags which node cannot be declared alongside in a symbol table. Used to report forbidden declarations.
 */
func (b *Binder) declareSymbol(symbolTable ast.SymbolTable, parent *ast.Symbol, node *ast.Node, includes ast.SymbolFlags, excludes ast.SymbolFlags) *ast.Symbol {
	return b.declareSymbolEx(symbolTable, parent, node, includes, excludes, false /*isReplaceableByMethod*/, false /*isComputedName*/)
}

func (b *Binder) declareSymbolEx(symbolTable ast.SymbolTable, parent *ast.Symbol, node *ast.Node, includes ast.SymbolFlags, excludes ast.SymbolFlags, isReplaceableByMethod bool, isComputedName bool) *ast.Symbol {
	// Debug.assert(isComputedName || !ast.HasDynamicName(node))
	isDefaultExport := ast.HasSyntacticModifier(node, ast.ModifierFlagsDefault) || ast.IsExportSpecifier(node) && ast.ModuleExportNameIsDefault(node.AsExportSpecifier().Name())
	// The exported symbol for an export default function/class node is always named "default"
	var name string
	switch {
	case isComputedName:
		name = ast.InternalSymbolNameComputed
	case isDefaultExport && parent != nil:
		name = ast.InternalSymbolNameDefault
	default:
		name = b.getDeclarationName(node)
	}
	var symbol *ast.Symbol
	if name == ast.InternalSymbolNameMissing {
		symbol = b.newSymbol(ast.SymbolFlagsNone, ast.InternalSymbolNameMissing)
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
		if includes&ast.SymbolFlagsClassifiable != 0 {
			b.classifiableNames.Add(name)
		}
		if symbol == nil {
			symbol = b.newSymbol(ast.SymbolFlagsNone, name)
			symbolTable[name] = symbol
			if isReplaceableByMethod {
				symbol.Flags |= ast.SymbolFlagsReplaceableByMethod
			}
		} else if isReplaceableByMethod && symbol.Flags&ast.SymbolFlagsReplaceableByMethod == 0 {
			// A symbol already exists, so don't add this as a declaration.
			return symbol
		} else if symbol.Flags&excludes != 0 {
			if symbol.Flags&ast.SymbolFlagsReplaceableByMethod != 0 {
				// Javascript constructor-declared symbols can be discarded in favor of
				// prototype symbols like methods.
				symbol = b.newSymbol(ast.SymbolFlagsNone, name)
				symbolTable[name] = symbol
			} else if !(includes&ast.SymbolFlagsVariable != 0 && symbol.Flags&ast.SymbolFlagsAssignment != 0 ||
				includes&ast.SymbolFlagsAssignment != 0 && symbol.Flags&ast.SymbolFlagsVariable != 0) {
				// Assignment declarations are allowed to merge with variables, no matter what other flags they have.
				if node.Name() != nil {
					setParent(node.Name(), node)
				}
				// Report errors every position with duplicate declaration
				// Report errors on previous encountered declarations
				var message *diagnostics.Message
				if symbol.Flags&ast.SymbolFlagsBlockScopedVariable != 0 {
					message = diagnostics.Cannot_redeclare_block_scoped_variable_0
				} else {
					message = diagnostics.Duplicate_identifier_0
				}
				messageNeedsName := true
				if symbol.Flags&ast.SymbolFlagsEnum != 0 || includes&ast.SymbolFlagsEnum != 0 {
					message = diagnostics.Enum_declarations_can_only_merge_with_namespace_or_other_enum_declarations
					messageNeedsName = false
				}
				multipleDefaultExports := false
				if len(symbol.Declarations) != 0 {
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
						if len(symbol.Declarations) != 0 && ast.IsExportAssignment(node) && !node.AsExportAssignment().IsExportEquals {
							message = diagnostics.A_module_cannot_have_multiple_default_exports
							messageNeedsName = false
							multipleDefaultExports = true
						}
					}
				}
				var declarationName *ast.Node = ast.GetNameOfDeclaration(node)
				if declarationName == nil {
					declarationName = node
				}
				var diag *ast.Diagnostic
				if messageNeedsName {
					diag = b.createDiagnosticForNode(declarationName, message, b.getDisplayName(node))
				} else {
					diag = b.createDiagnosticForNode(declarationName, message)
				}
				if ast.IsTypeAliasDeclaration(node) && ast.NodeIsMissing(node.AsTypeAliasDeclaration().Type) && ast.HasSyntacticModifier(node, ast.ModifierFlagsExport) && symbol.Flags&(ast.SymbolFlagsAlias|ast.SymbolFlagsType|ast.SymbolFlagsNamespace) != 0 {
					// export type T; - may have meant export type { T }?
					diag.AddRelatedInfo(b.createDiagnosticForNode(node, diagnostics.Did_you_mean_0, "export type { "+node.AsTypeAliasDeclaration().Name().AsIdentifier().Text+" }"))
				}
				for index, declaration := range symbol.Declarations {
					var decl *ast.Node = ast.GetNameOfDeclaration(declaration)
					if decl == nil {
						decl = declaration
					}
					var d *ast.Diagnostic
					if messageNeedsName {
						d = b.createDiagnosticForNode(decl, message, b.getDisplayName(declaration))
					} else {
						d = b.createDiagnosticForNode(decl, message)
					}
					if multipleDefaultExports {
						d.AddRelatedInfo(b.createDiagnosticForNode(declarationName, core.IfElse(index == 0, diagnostics.Another_export_default_is_here, diagnostics.X_and_here)))
					}
					b.addDiagnostic(d)
					if multipleDefaultExports {
						diag.AddRelatedInfo(b.createDiagnosticForNode(decl, diagnostics.The_first_export_default_is_here))
					}
				}
				b.addDiagnostic(diag)
				// When get or set accessor conflicts with a non-accessor or an accessor of a different kind, we mark
				// the symbol as a full accessor such that all subsequent declarations are considered conflicting. This
				// for example ensures that a get accessor followed by a non-accessor followed by a set accessor with the
				// same name are all marked as duplicates.
				if symbol.Flags&ast.SymbolFlagsAccessor != 0 && symbol.Flags&ast.SymbolFlagsAccessor != includes&ast.SymbolFlagsAccessor {
					symbol.Flags |= ast.SymbolFlagsAccessor
				}
				symbol = b.newSymbol(ast.SymbolFlagsNone, name)
			}
		}
	}
	b.addDeclarationToSymbol(symbol, node, includes)
	if symbol.Parent == nil {
		symbol.Parent = parent
	} else if symbol.Parent != parent {
		panic("Existing symbol parent should match new one")
	}
	return symbol
}

// Should not be called on a declaration with a computed property name,
// unless it is a well known Symbol.
func (b *Binder) getDeclarationName(node *ast.Node) string {
	if ast.IsExportAssignment(node) {
		return core.IfElse(node.AsExportAssignment().IsExportEquals, ast.InternalSymbolNameExportEquals, ast.InternalSymbolNameDefault)
	}
	name := ast.GetNameOfDeclaration(node)
	if name != nil {
		if ast.IsAmbientModule(node) {
			moduleName := name.Text()
			if ast.IsGlobalScopeAugmentation(node) {
				return ast.InternalSymbolNameGlobal
			}
			return "\"" + moduleName + "\""
		}
		if ast.IsPrivateIdentifier(name) {
			// containingClass exists because private names only allowed inside classes
			containingClass := ast.GetContainingClass(node)
			if containingClass == nil {
				// we can get here in cases where there is already a parse error.
				return ast.InternalSymbolNameMissing
			}
			return GetSymbolNameForPrivateIdentifier(containingClass.Symbol(), name.Text())
		}
		if ast.IsPropertyNameLiteral(name) {
			return name.Text()
		}
		if ast.IsComputedPropertyName(name) {
			nameExpression := name.AsComputedPropertyName().Expression
			// treat computed property names where expression is string/numeric literal as just string/numeric literal
			if ast.IsStringOrNumericLiteralLike(nameExpression) {
				return nameExpression.Text()
			}
			if ast.IsSignedNumericLiteral(nameExpression) {
				unaryExpression := nameExpression.AsPrefixUnaryExpression()
				return scanner.TokenToString(unaryExpression.Operator) + unaryExpression.Operand.Text()
			}
			panic("Only computed properties with literal names have declaration names")
		}
		// if isJsxNamespacedName(name) {
		// 	return getEscapedTextOfJsxNamespacedName(name)
		// }
		return ast.InternalSymbolNameMissing
	}
	switch node.Kind {
	case ast.KindConstructor:
		return ast.InternalSymbolNameConstructor
	case ast.KindFunctionType, ast.KindCallSignature:
		return ast.InternalSymbolNameCall
	case ast.KindConstructorType, ast.KindConstructSignature:
		return ast.InternalSymbolNameNew
	case ast.KindIndexSignature:
		return ast.InternalSymbolNameIndex
	case ast.KindExportDeclaration:
		return ast.InternalSymbolNameExportStar
	case ast.KindSourceFile:
		return ast.InternalSymbolNameExportEquals
	}
	return ast.InternalSymbolNameMissing
}

func (b *Binder) getDisplayName(node *ast.Node) string {
	nameNode := node.Name()
	if nameNode != nil {
		return scanner.DeclarationNameToString(nameNode)
	}
	name := b.getDeclarationName(node)
	if name != ast.InternalSymbolNameMissing {
		return name
	}
	return "(Missing)"
}

func GetSymbolNameForPrivateIdentifier(containingClassSymbol *ast.Symbol, description string) string {
	return ast.InternalSymbolNamePrefix + "#" + strconv.Itoa(int(ast.GetSymbolId(containingClassSymbol))) + "@" + description
}

func (b *Binder) declareModuleMember(node *ast.Node, symbolFlags ast.SymbolFlags, symbolExcludes ast.SymbolFlags) *ast.Symbol {
	hasExportModifier := ast.GetCombinedModifierFlags(node)&ast.ModifierFlagsExport != 0
	if symbolFlags&ast.SymbolFlagsAlias != 0 {
		if node.Kind == ast.KindExportSpecifier || (node.Kind == ast.KindImportEqualsDeclaration && hasExportModifier) {
			return b.declareSymbol(ast.GetExports(b.container.Symbol()), b.container.Symbol(), node, symbolFlags, symbolExcludes)
		}
		return b.declareSymbol(ast.GetLocals(b.container), nil /*parent*/, node, symbolFlags, symbolExcludes)
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
	if !ast.IsAmbientModule(node) && (hasExportModifier || b.container.Flags&ast.NodeFlagsExportContext != 0) {
		if !ast.IsLocalsContainer(b.container) || (ast.HasSyntacticModifier(node, ast.ModifierFlagsDefault) && b.getDeclarationName(node) == ast.InternalSymbolNameMissing) {
			return b.declareSymbol(ast.GetExports(b.container.Symbol()), b.container.Symbol(), node, symbolFlags, symbolExcludes)
			// No local symbol for an unnamed default!
		}
		exportKind := ast.SymbolFlagsNone
		if symbolFlags&ast.SymbolFlagsValue != 0 {
			exportKind = ast.SymbolFlagsExportValue
		}
		local := b.declareSymbol(ast.GetLocals(b.container), nil /*parent*/, node, exportKind, symbolExcludes)
		local.ExportSymbol = b.declareSymbol(ast.GetExports(b.container.Symbol()), b.container.Symbol(), node, symbolFlags, symbolExcludes)
		node.ExportableData().LocalSymbol = local
		return local
	}
	return b.declareSymbol(ast.GetLocals(b.container), nil /*parent*/, node, symbolFlags, symbolExcludes)
}

func (b *Binder) declareClassMember(node *ast.Node, symbolFlags ast.SymbolFlags, symbolExcludes ast.SymbolFlags) *ast.Symbol {
	if ast.IsStatic(node) {
		return b.declareSymbol(ast.GetExports(b.container.Symbol()), b.container.Symbol(), node, symbolFlags, symbolExcludes)
	}
	return b.declareSymbol(ast.GetMembers(b.container.Symbol()), b.container.Symbol(), node, symbolFlags, symbolExcludes)
}

func (b *Binder) declareSourceFileMember(node *ast.Node, symbolFlags ast.SymbolFlags, symbolExcludes ast.SymbolFlags) *ast.Symbol {
	if ast.IsExternalModule(b.file) {
		return b.declareModuleMember(node, symbolFlags, symbolExcludes)
	}
	return b.declareSymbol(ast.GetLocals(b.file.AsNode()), nil /*parent*/, node, symbolFlags, symbolExcludes)
}

func (b *Binder) declareSymbolAndAddToSymbolTable(node *ast.Node, symbolFlags ast.SymbolFlags, symbolExcludes ast.SymbolFlags) *ast.Symbol {
	switch b.container.Kind {
	case ast.KindModuleDeclaration:
		return b.declareModuleMember(node, symbolFlags, symbolExcludes)
	case ast.KindSourceFile:
		return b.declareSourceFileMember(node, symbolFlags, symbolExcludes)
	case ast.KindClassExpression, ast.KindClassDeclaration:
		return b.declareClassMember(node, symbolFlags, symbolExcludes)
	case ast.KindEnumDeclaration:
		return b.declareSymbol(ast.GetExports(b.container.Symbol()), b.container.Symbol(), node, symbolFlags, symbolExcludes)
	case ast.KindTypeLiteral, ast.KindJSDocTypeLiteral, ast.KindObjectLiteralExpression, ast.KindInterfaceDeclaration, ast.KindJsxAttributes:
		return b.declareSymbol(ast.GetMembers(b.container.Symbol()), b.container.Symbol(), node, symbolFlags, symbolExcludes)
	case ast.KindFunctionType, ast.KindConstructorType, ast.KindCallSignature, ast.KindConstructSignature, ast.KindJSDocSignature,
		ast.KindIndexSignature, ast.KindMethodDeclaration, ast.KindMethodSignature, ast.KindConstructor, ast.KindGetAccessor,
		ast.KindSetAccessor, ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindArrowFunction,
		ast.KindClassStaticBlockDeclaration, ast.KindTypeAliasDeclaration, ast.KindMappedType:
		return b.declareSymbol(ast.GetLocals(b.container), nil /*parent*/, node, symbolFlags, symbolExcludes)
	}
	panic("Unhandled case in declareSymbolAndAddToSymbolTable")
}

func (b *Binder) newFlowNode(flags ast.FlowFlags) *ast.FlowNode {
	result := b.flowNodePool.New()
	result.Flags = flags
	return result
}

func (b *Binder) newFlowNodeEx(flags ast.FlowFlags, node *ast.Node, antecedent *ast.FlowNode) *ast.FlowNode {
	result := b.newFlowNode(flags)
	result.Node = node
	result.Antecedent = antecedent
	return result
}

func (b *Binder) createLoopLabel() *ast.FlowLabel {
	return b.newFlowNode(ast.FlowFlagsLoopLabel)
}

func (b *Binder) createBranchLabel() *ast.FlowLabel {
	return b.newFlowNode(ast.FlowFlagsBranchLabel)
}

func (b *Binder) createReduceLabel(target *ast.FlowLabel, antecedents *ast.FlowList, antecedent *ast.FlowNode) *ast.FlowNode {
	return b.newFlowNodeEx(ast.FlowFlagsReduceLabel, ast.NewFlowReduceLabelData(target, antecedents), antecedent)
}

func (b *Binder) createFlowCondition(flags ast.FlowFlags, antecedent *ast.FlowNode, expression *ast.Node) *ast.FlowNode {
	if antecedent.Flags&ast.FlowFlagsUnreachable != 0 {
		return antecedent
	}
	if expression == nil {
		if flags&ast.FlowFlagsTrueCondition != 0 {
			return antecedent
		}
		return b.unreachableFlow
	}
	if (expression.Kind == ast.KindTrueKeyword && flags&ast.FlowFlagsFalseCondition != 0 || expression.Kind == ast.KindFalseKeyword && flags&ast.FlowFlagsTrueCondition != 0) && !ast.IsExpressionOfOptionalChainRoot(expression) && !ast.IsNullishCoalesce(expression.Parent) {
		return b.unreachableFlow
	}
	if !isNarrowingExpression(expression) {
		return antecedent
	}
	setFlowNodeReferenced(antecedent)
	return b.newFlowNodeEx(flags, expression, antecedent)
}

func (b *Binder) createFlowMutation(flags ast.FlowFlags, antecedent *ast.FlowNode, node *ast.Node) *ast.FlowNode {
	setFlowNodeReferenced(antecedent)
	b.hasFlowEffects = true
	result := b.newFlowNodeEx(flags, node, antecedent)
	if b.currentExceptionTarget != nil {
		b.addAntecedent(b.currentExceptionTarget, result)
	}
	return result
}

func (b *Binder) createFlowSwitchClause(antecedent *ast.FlowNode, switchStatement *ast.Node, clauseStart int, clauseEnd int) *ast.FlowNode {
	setFlowNodeReferenced(antecedent)
	return b.newFlowNodeEx(ast.FlowFlagsSwitchClause, ast.NewFlowSwitchClauseData(switchStatement, clauseStart, clauseEnd), antecedent)
}

func (b *Binder) createFlowCall(antecedent *ast.FlowNode, node *ast.Node) *ast.FlowNode {
	setFlowNodeReferenced(antecedent)
	b.hasFlowEffects = true
	return b.newFlowNodeEx(ast.FlowFlagsCall, node, antecedent)
}

func (b *Binder) newFlowList(head *ast.FlowNode, tail *ast.FlowList) *ast.FlowList {
	result := b.flowListPool.New()
	result.Flow = head
	result.Next = tail
	return result
}

func (b *Binder) combineFlowLists(head *ast.FlowList, tail *ast.FlowList) *ast.FlowList {
	if head == nil {
		return tail
	}
	return b.newFlowList(head.Flow, b.combineFlowLists(head.Next, tail))
}

func (b *Binder) newSingleDeclaration(declaration *ast.Node) []*ast.Node {
	nodes := b.singleDeclarationsPool.NewSlice(1)
	nodes[0] = declaration
	return nodes
}

func setFlowNodeReferenced(flow *ast.FlowNode) {
	// On first reference we set the Referenced flag, thereafter we set the Shared flag
	if flow.Flags&ast.FlowFlagsReferenced == 0 {
		flow.Flags |= ast.FlowFlagsReferenced
	} else {
		flow.Flags |= ast.FlowFlagsShared
	}
}

func hasAntecedent(list *ast.FlowList, antecedent *ast.FlowNode) bool {
	for list != nil {
		if list.Flow == antecedent {
			return true
		}
		list = list.Next
	}
	return false
}

func (b *Binder) addAntecedent(label *ast.FlowLabel, antecedent *ast.FlowNode) {
	if antecedent.Flags&ast.FlowFlagsUnreachable == 0 && !hasAntecedent(label.Antecedents, antecedent) {
		label.Antecedents = b.newFlowList(antecedent, label.Antecedents)
		setFlowNodeReferenced(antecedent)
	}
}

func (b *Binder) finishFlowLabel(label *ast.FlowLabel) *ast.FlowNode {
	if label.Antecedents == nil {
		return b.unreachableFlow
	}
	if label.Antecedents.Next == nil {
		return label.Antecedents.Flow
	}
	return label
}

func (b *Binder) bind(node *ast.Node) bool {
	if node == nil {
		return false
	}
	node.Parent = b.parent
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
	switch node.Kind {
	case ast.KindIdentifier:
		node.AsIdentifier().FlowNode = b.currentFlow
		b.checkContextualIdentifier(node)
	case ast.KindThisKeyword, ast.KindSuperKeyword:
		node.AsKeywordExpression().FlowNode = b.currentFlow
	case ast.KindQualifiedName:
		if b.currentFlow != nil && ast.IsPartOfTypeQuery(node) {
			node.AsQualifiedName().FlowNode = b.currentFlow
		}
	case ast.KindMetaProperty:
		node.AsMetaProperty().FlowNode = b.currentFlow
	case ast.KindPrivateIdentifier:
		b.checkPrivateIdentifier(node)
	case ast.KindPropertyAccessExpression, ast.KindElementAccessExpression:
		if b.currentFlow != nil && isNarrowableReference(node) {
			setFlowNode(node, b.currentFlow)
		}
	case ast.KindBinaryExpression:
		if ast.IsFunctionPropertyAssignment(node) {
			b.bindFunctionPropertyAssignment(node)
		}
		b.checkStrictModeBinaryExpression(node)
	case ast.KindCatchClause:
		b.checkStrictModeCatchClause(node)
	case ast.KindDeleteExpression:
		b.checkStrictModeDeleteExpression(node)
	case ast.KindPostfixUnaryExpression:
		b.checkStrictModePostfixUnaryExpression(node)
	case ast.KindPrefixUnaryExpression:
		b.checkStrictModePrefixUnaryExpression(node)
	case ast.KindWithStatement:
		b.checkStrictModeWithStatement(node)
	case ast.KindLabeledStatement:
		b.checkStrictModeLabeledStatement(node)
	case ast.KindThisType:
		b.seenThisKeyword = true
	case ast.KindTypeParameter:
		b.bindTypeParameter(node)
	case ast.KindParameter:
		b.bindParameter(node)
	case ast.KindVariableDeclaration:
		b.bindVariableDeclarationOrBindingElement(node)
	case ast.KindBindingElement:
		node.AsBindingElement().FlowNode = b.currentFlow
		b.bindVariableDeclarationOrBindingElement(node)
	case ast.KindPropertyDeclaration, ast.KindPropertySignature:
		b.bindPropertyWorker(node)
	case ast.KindPropertyAssignment, ast.KindShorthandPropertyAssignment:
		b.bindPropertyOrMethodOrAccessor(node, ast.SymbolFlagsProperty, ast.SymbolFlagsPropertyExcludes)
	case ast.KindEnumMember:
		b.bindPropertyOrMethodOrAccessor(node, ast.SymbolFlagsEnumMember, ast.SymbolFlagsEnumMemberExcludes)
	case ast.KindCallSignature, ast.KindConstructSignature, ast.KindIndexSignature:
		b.declareSymbolAndAddToSymbolTable(node, ast.SymbolFlagsSignature, ast.SymbolFlagsNone)
	case ast.KindMethodDeclaration, ast.KindMethodSignature:
		b.bindPropertyOrMethodOrAccessor(node, ast.SymbolFlagsMethod|getOptionalSymbolFlagForNode(node), core.IfElse(ast.IsObjectLiteralMethod(node), ast.SymbolFlagsPropertyExcludes, ast.SymbolFlagsMethodExcludes))
	case ast.KindFunctionDeclaration:
		b.bindFunctionDeclaration(node)
	case ast.KindConstructor:
		b.declareSymbolAndAddToSymbolTable(node, ast.SymbolFlagsConstructor, ast.SymbolFlagsNone)
	case ast.KindGetAccessor:
		b.bindPropertyOrMethodOrAccessor(node, ast.SymbolFlagsGetAccessor, ast.SymbolFlagsGetAccessorExcludes)
	case ast.KindSetAccessor:
		b.bindPropertyOrMethodOrAccessor(node, ast.SymbolFlagsSetAccessor, ast.SymbolFlagsSetAccessorExcludes)
	case ast.KindFunctionType, ast.KindConstructorType:
		// !!! KindJSDocSignature
		b.bindFunctionOrConstructorType(node)
	case ast.KindTypeLiteral, ast.KindMappedType:
		// !!! KindJSDocTypeLiteral
		b.bindAnonymousDeclaration(node, ast.SymbolFlagsTypeLiteral, ast.InternalSymbolNameType)
	case ast.KindObjectLiteralExpression:
		b.bindAnonymousDeclaration(node, ast.SymbolFlagsObjectLiteral, ast.InternalSymbolNameObject)
	case ast.KindFunctionExpression, ast.KindArrowFunction:
		b.bindFunctionExpression(node)
	case ast.KindClassExpression, ast.KindClassDeclaration:
		b.inStrictMode = true
		b.bindClassLikeDeclaration(node)
	case ast.KindInterfaceDeclaration:
		b.bindBlockScopedDeclaration(node, ast.SymbolFlagsInterface, ast.SymbolFlagsInterfaceExcludes)
	case ast.KindTypeAliasDeclaration:
		b.bindBlockScopedDeclaration(node, ast.SymbolFlagsTypeAlias, ast.SymbolFlagsTypeAliasExcludes)
	case ast.KindEnumDeclaration:
		b.bindEnumDeclaration(node)
	case ast.KindModuleDeclaration:
		b.bindModuleDeclaration(node)
	case ast.KindImportEqualsDeclaration, ast.KindNamespaceImport, ast.KindImportSpecifier, ast.KindExportSpecifier:
		b.declareSymbolAndAddToSymbolTable(node, ast.SymbolFlagsAlias, ast.SymbolFlagsAliasExcludes)
	case ast.KindNamespaceExportDeclaration:
		b.bindNamespaceExportDeclaration(node)
	case ast.KindImportClause:
		b.bindImportClause(node)
	case ast.KindExportDeclaration:
		b.bindExportDeclaration(node)
	case ast.KindExportAssignment:
		b.bindExportAssignment(node)
	case ast.KindSourceFile:
		b.updateStrictModeStatementList(node.AsSourceFile().Statements)
		b.bindSourceFileIfExternalModule()
	case ast.KindBlock:
		if ast.IsFunctionLikeOrClassStaticBlockDeclaration(node.Parent) {
			b.updateStrictModeStatementList(node.AsBlock().Statements)
		}
	case ast.KindModuleBlock:
		b.updateStrictModeStatementList(node.AsModuleBlock().Statements)
	case ast.KindJsxAttributes:
		b.bindJsxAttributes(node)
	case ast.KindJsxAttribute:
		b.bindJsxAttribute(node, ast.SymbolFlagsProperty, ast.SymbolFlagsPropertyExcludes)
	}
	// Then we recurse into the children of the node to bind them as well. For certain
	// symbols we do specialized work when we recurse. For example, we'll keep track of
	// the current 'container' node when it changes. This helps us know which symbol table
	// a local should go into for example. Since terminal nodes are known not to have
	// children, as an optimization we don't process those.
	thisNodeOrAnySubnodesHasError := node.Flags&ast.NodeFlagsThisNodeHasError != 0
	if node.Kind > ast.KindLastToken {
		saveParent := b.parent
		saveSeenParseError := b.seenParseError
		b.parent = node
		b.seenParseError = false
		containerFlags := GetContainerFlags(node)
		if containerFlags == ContainerFlagsNone {
			b.bindChildren(node)
		} else {
			b.bindContainer(node, containerFlags)
		}
		if b.seenParseError {
			thisNodeOrAnySubnodesHasError = true
		}
		b.parent = saveParent
		b.seenParseError = saveSeenParseError
	} else {
		saveParent := b.parent
		if node.Kind == ast.KindEndOfFile {
			b.parent = node
		}
		b.bindJSDoc(node)
		b.parent = saveParent
	}
	if thisNodeOrAnySubnodesHasError {
		node.Flags |= ast.NodeFlagsThisNodeOrAnySubNodesHasError
		b.seenParseError = true
	}
	b.inStrictMode = saveInStrictMode
	return false
}

func (b *Binder) bindJSDoc(node *ast.Node) {
	// !!! if isInJSFile(node) {
	// !!! else {
	for _, jsdoc := range node.JSDoc(b.file) {
		setParent(jsdoc, node)
		ast.SetParentInChildren(jsdoc)
	}
}

func (b *Binder) bindPropertyWorker(node *ast.Node) {
	isAutoAccessor := ast.IsAutoAccessorPropertyDeclaration(node)
	includes := core.IfElse(isAutoAccessor, ast.SymbolFlagsAccessor, ast.SymbolFlagsProperty)
	excludes := core.IfElse(isAutoAccessor, ast.SymbolFlagsAccessorExcludes, ast.SymbolFlagsPropertyExcludes)
	b.bindPropertyOrMethodOrAccessor(node, includes|getOptionalSymbolFlagForNode(node), excludes)
}

func (b *Binder) bindSourceFileIfExternalModule() {
	b.setExportContextFlag(b.file.AsNode())
	if ast.IsExternalModule(b.file) {
		b.bindSourceFileAsExternalModule()
	} else if ast.IsJsonSourceFile(b.file) {
		b.bindSourceFileAsExternalModule()
		// Create symbol equivalent for the module.exports = {}
		originalSymbol := b.file.Symbol
		b.declareSymbol(ast.GetSymbolTable(&b.file.Symbol.Exports), b.file.Symbol, b.file.AsNode(), ast.SymbolFlagsProperty, ast.SymbolFlagsAll)
		b.file.Symbol = originalSymbol
	}
}

func (b *Binder) bindSourceFileAsExternalModule() {
	b.bindAnonymousDeclaration(b.file.AsNode(), ast.SymbolFlagsValueModule, "\""+tspath.RemoveFileExtension(b.file.FileName())+"\"")
}

func (b *Binder) bindModuleDeclaration(node *ast.Node) {
	b.setExportContextFlag(node)
	if ast.IsAmbientModule(node) {
		if ast.HasSyntacticModifier(node, ast.ModifierFlagsExport) {
			b.errorOnFirstToken(node, diagnostics.X_export_modifier_cannot_be_applied_to_ambient_modules_and_module_augmentations_since_they_are_always_visible)
		}
		if ast.IsModuleAugmentationExternal(node) {
			b.declareModuleSymbol(node)
		} else {
			var pattern core.Pattern
			name := node.AsModuleDeclaration().Name()
			if ast.IsStringLiteral(name) {
				pattern = core.TryParsePattern(name.AsStringLiteral().Text)
				if !pattern.IsValid() {
					b.errorOnFirstToken(name, diagnostics.Pattern_0_can_have_at_most_one_Asterisk_character, name.AsStringLiteral().Text)
				}
			}
			symbol := b.declareSymbolAndAddToSymbolTable(node, ast.SymbolFlagsValueModule, ast.SymbolFlagsValueModuleExcludes)
			if pattern.StarIndex >= 0 {
				b.file.PatternAmbientModules = append(b.file.PatternAmbientModules, ast.PatternAmbientModule{Pattern: pattern, Symbol: symbol})
			}
		}
	} else {
		state := b.declareModuleSymbol(node)
		if state != ast.ModuleInstanceStateNonInstantiated {
			symbol := node.AsModuleDeclaration().Symbol
			if symbol.Flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsClass|ast.SymbolFlagsRegularEnum) != 0 || state != ast.ModuleInstanceStateConstEnumOnly {
				// if module was already merged with some function, class or non-const enum, treat it as non-const-enum-only
				symbol.Flags &^= ast.SymbolFlagsConstEnumOnlyModule
			}
		}
	}
}

func (b *Binder) declareModuleSymbol(node *ast.Node) ast.ModuleInstanceState {
	state := ast.GetModuleInstanceState(node)
	instantiated := state != ast.ModuleInstanceStateNonInstantiated
	b.declareSymbolAndAddToSymbolTable(node, core.IfElse(instantiated, ast.SymbolFlagsValueModule, ast.SymbolFlagsNamespaceModule), core.IfElse(instantiated, ast.SymbolFlagsValueModuleExcludes, ast.SymbolFlagsNamespaceModuleExcludes))
	return state
}

func (b *Binder) bindNamespaceExportDeclaration(node *ast.Node) {
	if node.Modifiers() != nil {
		b.errorOnNode(node, diagnostics.Modifiers_cannot_appear_here)
	}
	switch {
	case !ast.IsSourceFile(node.Parent):
		b.errorOnNode(node, diagnostics.Global_module_exports_may_only_appear_at_top_level)
	case !ast.IsExternalModule(node.Parent.AsSourceFile()):
		b.errorOnNode(node, diagnostics.Global_module_exports_may_only_appear_in_module_files)
	case !node.Parent.AsSourceFile().IsDeclarationFile:
		b.errorOnNode(node, diagnostics.Global_module_exports_may_only_appear_in_declaration_files)
	default:
		b.declareSymbol(ast.GetSymbolTable(&b.file.Symbol.GlobalExports), b.file.Symbol, node, ast.SymbolFlagsAlias, ast.SymbolFlagsAliasExcludes)
	}
}

func (b *Binder) bindImportClause(node *ast.Node) {
	if node.AsImportClause().Name() != nil {
		b.declareSymbolAndAddToSymbolTable(node, ast.SymbolFlagsAlias, ast.SymbolFlagsAliasExcludes)
	}
}

func (b *Binder) bindExportDeclaration(node *ast.Node) {
	decl := node.AsExportDeclaration()
	if b.container.Symbol() == nil {
		// Export * in some sort of block construct
		b.bindAnonymousDeclaration(node, ast.SymbolFlagsExportStar, b.getDeclarationName(node))
	} else if decl.ExportClause == nil {
		// All export * declarations are collected in an __export symbol
		b.declareSymbol(ast.GetExports(b.container.Symbol()), b.container.Symbol(), node, ast.SymbolFlagsExportStar, ast.SymbolFlagsNone)
	} else if ast.IsNamespaceExport(decl.ExportClause) {
		// declareSymbol walks up parents to find name text, parent _must_ be set
		// but won't be set by the normal binder walk until `bindChildren` later on.
		setParent(decl.ExportClause, node)
		b.declareSymbol(ast.GetExports(b.container.Symbol()), b.container.Symbol(), decl.ExportClause, ast.SymbolFlagsAlias, ast.SymbolFlagsAliasExcludes)
	}
}

func (b *Binder) bindExportAssignment(node *ast.Node) {
	if b.container.Symbol() == nil {
		// Incorrect export assignment in some sort of block construct
		b.bindAnonymousDeclaration(node, ast.SymbolFlagsValue, b.getDeclarationName(node))
	} else {
		flags := ast.SymbolFlagsProperty
		if ast.ExportAssignmentIsAlias(node) {
			flags = ast.SymbolFlagsAlias
		}
		// If there is an `export default x;` alias declaration, can't `export default` anything else.
		// (In contrast, you can still have `export default function f() {}` and `export default interface I {}`.)
		symbol := b.declareSymbol(ast.GetExports(b.container.Symbol()), b.container.Symbol(), node, flags, ast.SymbolFlagsAll)
		if node.AsExportAssignment().IsExportEquals {
			// Will be an error later, since the module already has other exports. Just make sure this has a valueDeclaration set.
			SetValueDeclaration(symbol, node)
		}
	}
}

func (b *Binder) bindJsxAttributes(node *ast.Node) {
	b.bindAnonymousDeclaration(node, ast.SymbolFlagsObjectLiteral, ast.InternalSymbolNameJSXAttributes)
}

func (b *Binder) bindJsxAttribute(node *ast.Node, symbolFlags ast.SymbolFlags, symbolExcludes ast.SymbolFlags) {
	b.declareSymbolAndAddToSymbolTable(node, symbolFlags, symbolExcludes)
}

func (b *Binder) setExportContextFlag(node *ast.Node) {
	// A declaration source file or ambient module declaration that contains no export declarations (but possibly regular
	// declarations with export modifiers) is an export context in which declarations are implicitly exported.
	if node.Flags&ast.NodeFlagsAmbient != 0 && !b.hasExportDeclarations(node) {
		node.Flags |= ast.NodeFlagsExportContext
	} else {
		node.Flags &= ^ast.NodeFlagsExportContext
	}
}

func (b *Binder) hasExportDeclarations(node *ast.Node) bool {
	var statements []*ast.Node
	switch node.Kind {
	case ast.KindSourceFile:
		statements = node.AsSourceFile().Statements.Nodes
	case ast.KindModuleDeclaration:
		body := node.AsModuleDeclaration().Body
		if body != nil && ast.IsModuleBlock(body) {
			statements = body.AsModuleBlock().Statements.Nodes
		}
	}
	return core.Some(statements, func(s *ast.Node) bool {
		return ast.IsExportDeclaration(s) || ast.IsExportAssignment(s)
	})
}

func (b *Binder) bindFunctionExpression(node *ast.Node) {
	setFlowNode(node, b.currentFlow)
	bindingName := ast.InternalSymbolNameFunction
	if ast.IsFunctionExpression(node) && node.AsFunctionExpression().Name() != nil {
		b.checkStrictModeFunctionName(node)
		bindingName = node.AsFunctionExpression().Name().AsIdentifier().Text
	}
	b.bindAnonymousDeclaration(node, ast.SymbolFlagsFunction, bindingName)
}

func (b *Binder) bindClassLikeDeclaration(node *ast.Node) {
	name := node.Name()
	switch node.Kind {
	case ast.KindClassDeclaration:
		b.bindBlockScopedDeclaration(node, ast.SymbolFlagsClass, ast.SymbolFlagsClassExcludes)
	case ast.KindClassExpression:
		nameText := ast.InternalSymbolNameClass
		if name != nil {
			nameText = name.AsIdentifier().Text
			b.classifiableNames.Add(nameText)
		}
		b.bindAnonymousDeclaration(node, ast.SymbolFlagsClass, nameText)
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
	prototypeSymbol := b.newSymbol(ast.SymbolFlagsProperty|ast.SymbolFlagsPrototype, "prototype")
	symbolExport := ast.GetExports(symbol)[prototypeSymbol.Name]
	if symbolExport != nil {
		setParent(name, node)
		b.errorOnNode(symbolExport.Declarations[0], diagnostics.Duplicate_identifier_0, ast.SymbolName(prototypeSymbol))
	}
	ast.GetExports(symbol)[prototypeSymbol.Name] = prototypeSymbol
	prototypeSymbol.Parent = symbol
}

func (b *Binder) bindPropertyOrMethodOrAccessor(node *ast.Node, symbolFlags ast.SymbolFlags, symbolExcludes ast.SymbolFlags) {
	if b.currentFlow != nil && ast.IsObjectLiteralOrClassExpressionMethodOrAccessor(node) {
		setFlowNode(node, b.currentFlow)
	}
	if ast.HasDynamicName(node) {
		b.bindAnonymousDeclaration(node, symbolFlags, ast.InternalSymbolNameComputed)
	} else {
		b.declareSymbolAndAddToSymbolTable(node, symbolFlags, symbolExcludes)
	}
}

func (b *Binder) bindFunctionOrConstructorType(node *ast.Node) {
	// For a given function symbol "<...>(...) => T" we want to generate a symbol identical
	// to the one we would get for: { <...>(...): T }
	//
	// We do that by making an anonymous type literal symbol, and then setting the function
	// symbol as its sole member. To the rest of the system, this symbol will be indistinguishable
	// from an actual type literal symbol you would have gotten had you used the long form.
	symbol := b.newSymbol(ast.SymbolFlagsSignature, b.getDeclarationName(node))
	b.addDeclarationToSymbol(symbol, node, ast.SymbolFlagsSignature)
	typeLiteralSymbol := b.newSymbol(ast.SymbolFlagsTypeLiteral, ast.InternalSymbolNameType)
	b.addDeclarationToSymbol(typeLiteralSymbol, node, ast.SymbolFlagsTypeLiteral)
	typeLiteralSymbol.Members = make(ast.SymbolTable)
	typeLiteralSymbol.Members[symbol.Name] = symbol
}

func addLateBoundAssignmentDeclarationToSymbol(node *ast.Node, symbol *ast.Symbol) {
	symbol.AssignmentDeclarationMembers.Add(node)
}

func (b *Binder) bindFunctionPropertyAssignment(node *ast.Node) {
	expr := node.AsBinaryExpression()
	parentName := expr.Left.Expression().Text()
	symbol := b.lookupName(parentName, b.blockScopeContainer)
	if symbol == nil {
		symbol = b.lookupName(parentName, b.container)
	}
	if symbol != nil && symbol.ValueDeclaration != nil {
		// For an assignment 'fn.xxx = ...', where 'fn' is a previously declared function or a previously
		// declared const variable initialized with a function expression or arrow function, we add expando
		// property declarations to the function's symbol.
		var funcSymbol *ast.Symbol
		switch {
		case ast.IsFunctionDeclaration(symbol.ValueDeclaration):
			funcSymbol = symbol
		case ast.IsVariableDeclaration(symbol.ValueDeclaration) && symbol.ValueDeclaration.Parent.Flags&ast.NodeFlagsConst != 0:
			initializer := symbol.ValueDeclaration.Initializer()
			if initializer != nil && ast.IsFunctionExpressionOrArrowFunction(initializer) {
				funcSymbol = initializer.Symbol()
			}
		}
		if funcSymbol != nil {
			// Fix up parent pointers since we're going to use these nodes before we bind into them
			setParent(expr.Left, node)
			setParent(expr.Right, node)
			if ast.HasDynamicName(node) {
				b.bindAnonymousDeclaration(node, ast.SymbolFlagsProperty|ast.SymbolFlagsAssignment, ast.InternalSymbolNameComputed)
				addLateBoundAssignmentDeclarationToSymbol(node, funcSymbol)
			} else {
				b.declareSymbol(ast.GetExports(funcSymbol), funcSymbol, node, ast.SymbolFlagsProperty|ast.SymbolFlagsAssignment, ast.SymbolFlagsPropertyExcludes)
			}
		}
	}
}

func (b *Binder) bindEnumDeclaration(node *ast.Node) {
	if ast.IsEnumConst(node) {
		b.bindBlockScopedDeclaration(node, ast.SymbolFlagsConstEnum, ast.SymbolFlagsConstEnumExcludes)
	} else {
		b.bindBlockScopedDeclaration(node, ast.SymbolFlagsRegularEnum, ast.SymbolFlagsRegularEnumExcludes)
	}
}

func (b *Binder) bindVariableDeclarationOrBindingElement(node *ast.Node) {
	if b.inStrictMode {
		b.checkStrictModeEvalOrArguments(node, node.Name())
	}
	if name := node.Name(); name != nil && !ast.IsBindingPattern(name) {
		switch {
		case ast.IsBlockOrCatchScoped(node):
			b.bindBlockScopedDeclaration(node, ast.SymbolFlagsBlockScopedVariable, ast.SymbolFlagsBlockScopedVariableExcludes)
		case ast.IsPartOfParameterDeclaration(node):
			// It is safe to walk up parent chain to find whether the node is a destructuring parameter declaration
			// because its parent chain has already been set up, since parents are set before descending into children.
			//
			// If node is a binding element in parameter declaration, we need to use ParameterExcludes.
			// Using ParameterExcludes flag allows the compiler to report an error on duplicate identifiers in Parameter Declaration
			// For example:
			//      function foo([a,a]) {} // Duplicate Identifier error
			//      function bar(a,a) {}   // Duplicate Identifier error, parameter declaration in this case is handled in bindParameter
			//                             // which correctly set excluded symbols
			b.declareSymbolAndAddToSymbolTable(node, ast.SymbolFlagsFunctionScopedVariable, ast.SymbolFlagsParameterExcludes)
		default:
			b.declareSymbolAndAddToSymbolTable(node, ast.SymbolFlagsFunctionScopedVariable, ast.SymbolFlagsFunctionScopedVariableExcludes)
		}
	}
}

func (b *Binder) bindParameter(node *ast.Node) {
	// !!!
	// if node.kind == KindJSDocParameterTag && b.container.kind != KindJSDocSignature {
	// 	return
	// }
	decl := node.AsParameterDeclaration()
	if b.inStrictMode && node.Flags&ast.NodeFlagsAmbient == 0 {
		// It is a SyntaxError if the identifier eval or arguments appears within a FormalParameterList of a
		// strict mode FunctionLikeDeclaration or FunctionExpression(13.1)
		b.checkStrictModeEvalOrArguments(node, decl.Name())
	}
	if ast.IsBindingPattern(decl.Name()) {
		index := slices.Index(node.Parent.Parameters(), node)
		b.bindAnonymousDeclaration(node, ast.SymbolFlagsFunctionScopedVariable, "__"+strconv.Itoa(index))
	} else {
		b.declareSymbolAndAddToSymbolTable(node, ast.SymbolFlagsFunctionScopedVariable, ast.SymbolFlagsParameterExcludes)
	}
	// If this is a property-parameter, then also declare the property symbol into the
	// containing class.
	if ast.IsParameterPropertyDeclaration(node, node.Parent) {
		classDeclaration := node.Parent.Parent
		flags := ast.SymbolFlagsProperty | core.IfElse(decl.QuestionToken != nil, ast.SymbolFlagsOptional, ast.SymbolFlagsNone)
		b.declareSymbol(ast.GetMembers(classDeclaration.Symbol()), classDeclaration.Symbol(), node, flags, ast.SymbolFlagsPropertyExcludes)
	}
}

func (b *Binder) bindFunctionDeclaration(node *ast.Node) {
	b.checkStrictModeFunctionName(node)
	if b.inStrictMode {
		b.checkStrictModeFunctionDeclaration(node)
		b.bindBlockScopedDeclaration(node, ast.SymbolFlagsFunction, ast.SymbolFlagsFunctionExcludes)
	} else {
		b.declareSymbolAndAddToSymbolTable(node, ast.SymbolFlagsFunction, ast.SymbolFlagsFunctionExcludes)
	}
}

func (b *Binder) getInferTypeContainer(node *ast.Node) *ast.Node {
	extendsType := ast.FindAncestor(node, func(n *ast.Node) bool {
		parent := n.Parent
		return parent != nil && ast.IsConditionalTypeNode(parent) && parent.AsConditionalTypeNode().ExtendsType == n
	})
	if extendsType != nil {
		return extendsType.Parent
	}
	return nil
}

func (b *Binder) bindAnonymousDeclaration(node *ast.Node, symbolFlags ast.SymbolFlags, name string) {
	symbol := b.newSymbol(symbolFlags, name)
	if symbolFlags&(ast.SymbolFlagsEnumMember|ast.SymbolFlagsClassMember) != 0 {
		symbol.Parent = b.container.Symbol()
	}
	b.addDeclarationToSymbol(symbol, node, symbolFlags)
}

func (b *Binder) bindBlockScopedDeclaration(node *ast.Node, symbolFlags ast.SymbolFlags, symbolExcludes ast.SymbolFlags) {
	switch b.blockScopeContainer.Kind {
	case ast.KindModuleDeclaration:
		b.declareModuleMember(node, symbolFlags, symbolExcludes)
	case ast.KindSourceFile:
		if ast.IsExternalOrCommonJsModule(b.container.AsSourceFile()) {
			b.declareModuleMember(node, symbolFlags, symbolExcludes)
			break
		}
		fallthrough
	default:
		b.declareSymbol(ast.GetLocals(b.blockScopeContainer), nil /*parent*/, node, symbolFlags, symbolExcludes)
	}
}

func (b *Binder) bindTypeParameter(node *ast.Node) {
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
	if node.Parent.Kind == ast.KindInferType {
		container := b.getInferTypeContainer(node.Parent)
		if container != nil {
			b.declareSymbol(ast.GetLocals(container), nil /*parent*/, node, ast.SymbolFlagsTypeParameter, ast.SymbolFlagsTypeParameterExcludes)
		} else {
			b.bindAnonymousDeclaration(node, ast.SymbolFlagsTypeParameter, b.getDeclarationName(node))
		}
	} else {
		b.declareSymbolAndAddToSymbolTable(node, ast.SymbolFlagsTypeParameter, ast.SymbolFlagsTypeParameterExcludes)
	}
}

func (b *Binder) lookupName(name string, container *ast.Node) *ast.Symbol {
	localsContainer := container.LocalsContainerData()
	if localsContainer != nil {
		local := localsContainer.Locals[name]
		if local != nil {
			return core.OrElse(local.ExportSymbol, local)
		}
	}
	if ast.IsSourceFile(container) {
		local := container.AsSourceFile().JsGlobalAugmentations[name]
		if local != nil {
			return local
		}
	}
	declaration := container.DeclarationData()
	if declaration != nil && declaration.Symbol != nil {
		return declaration.Symbol.Exports[name]
	}
	return nil
}

// The binder visits every node in the syntax tree so it is a convenient place to perform a single localized
// check for reserved words used as identifiers in strict mode code, as well as `yield` or `await` in
// [Yield] or [Await] contexts, respectively.
func (b *Binder) checkContextualIdentifier(node *ast.Node) {
	// Report error only if there are no parse errors in file
	if len(b.file.Diagnostics()) == 0 && node.Flags&ast.NodeFlagsAmbient == 0 && node.Flags&ast.NodeFlagsJSDoc == 0 && !ast.IsIdentifierName(node) {
		// strict mode identifiers
		originalKeywordKind := scanner.GetIdentifierToken(node.AsIdentifier().Text)
		if originalKeywordKind == ast.KindIdentifier {
			return
		}
		if b.inStrictMode && originalKeywordKind >= ast.KindFirstFutureReservedWord && originalKeywordKind <= ast.KindLastFutureReservedWord {
			b.errorOnNode(node, b.getStrictModeIdentifierMessage(node), scanner.DeclarationNameToString(node))
		} else if originalKeywordKind == ast.KindAwaitKeyword {
			if ast.IsExternalModule(b.file) && ast.IsInTopLevelContext(node) {
				b.errorOnNode(node, diagnostics.Identifier_expected_0_is_a_reserved_word_at_the_top_level_of_a_module, scanner.DeclarationNameToString(node))
			} else if node.Flags&ast.NodeFlagsAwaitContext != 0 {
				b.errorOnNode(node, diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here, scanner.DeclarationNameToString(node))
			}
		} else if originalKeywordKind == ast.KindYieldKeyword && node.Flags&ast.NodeFlagsYieldContext != 0 {
			b.errorOnNode(node, diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here, scanner.DeclarationNameToString(node))
		}
	}
}

func (b *Binder) checkPrivateIdentifier(node *ast.Node) {
	if node.AsPrivateIdentifier().Text == "#constructor" {
		// Report error only if there are no parse errors in file
		if len(b.file.Diagnostics()) == 0 {
			b.errorOnNode(node, diagnostics.X_constructor_is_a_reserved_word, scanner.DeclarationNameToString(node))
		}
	}
}

func (b *Binder) getStrictModeIdentifierMessage(node *ast.Node) *diagnostics.Message {
	// Provide specialized messages to help the user understand why we think they're in
	// strict mode.
	if ast.GetContainingClass(node) != nil {
		return diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Class_definitions_are_automatically_in_strict_mode
	}
	if b.file.ExternalModuleIndicator != nil {
		return diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode
	}
	return diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode
}

func (b *Binder) updateStrictModeStatementList(statements *ast.NodeList) {
	if !b.inStrictMode {
		useStrictDirective := FindUseStrictPrologue(b.file, statements.Nodes)
		if useStrictDirective != nil {
			b.inStrictMode = true
		}
	}
}

// Should be called only on prologue directives (ast.IsPrologueDirective(node) should be true)
func isUseStrictPrologueDirective(sourceFile *ast.SourceFile, node *ast.Node) bool {
	nodeText := scanner.GetSourceTextOfNodeFromSourceFile(sourceFile, node.AsExpressionStatement().Expression, false /*includeTrivia*/)
	// Note: the node text must be exactly "use strict" or 'use strict'.  It is not ok for the
	// string to contain unicode escapes (as per ES5).
	return nodeText == "\"use strict\"" || nodeText == "'use strict'"
}

func FindUseStrictPrologue(sourceFile *ast.SourceFile, statements []*ast.Node) *ast.Node {
	for _, statement := range statements {
		if ast.IsPrologueDirective(statement) {
			if isUseStrictPrologueDirective(sourceFile, statement) {
				return statement
			}
		} else {
			return nil
		}
	}

	return nil
}

func (b *Binder) checkStrictModeFunctionName(node *ast.Node) {
	if b.inStrictMode && node.Flags&ast.NodeFlagsAmbient == 0 {
		// It is a SyntaxError if the identifier eval or arguments appears within a FormalParameterList of a strict mode FunctionDeclaration or FunctionExpression (13.1))
		b.checkStrictModeEvalOrArguments(node, node.Name())
	}
}

func (b *Binder) checkStrictModeFunctionDeclaration(node *ast.Node) {
	if b.languageVersion < core.ScriptTargetES2015 {
		// Report error if function is not top level function declaration
		if b.blockScopeContainer.Kind != ast.KindSourceFile && b.blockScopeContainer.Kind != ast.KindModuleDeclaration && !ast.IsFunctionLikeOrClassStaticBlockDeclaration(b.blockScopeContainer) {
			// We check first if the name is inside class declaration or class expression; if so give explicit message
			// otherwise report generic error message.
			b.errorOnNode(node, b.getStrictModeBlockScopeFunctionDeclarationMessage(node))
		}
	}
}

func (b *Binder) getStrictModeBlockScopeFunctionDeclarationMessage(node *ast.Node) *diagnostics.Message {
	// Provide specialized messages to help the user understand why we think they're in strict mode.
	if ast.GetContainingClass(node) != nil {
		return diagnostics.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES5_Class_definitions_are_automatically_in_strict_mode
	}
	if b.file.ExternalModuleIndicator != nil {
		return diagnostics.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES5_Modules_are_automatically_in_strict_mode
	}
	return diagnostics.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES5
}

func (b *Binder) checkStrictModeBinaryExpression(node *ast.Node) {
	expr := node.AsBinaryExpression()
	if b.inStrictMode && ast.IsLeftHandSideExpression(expr.Left) && ast.IsAssignmentOperator(expr.OperatorToken.Kind) {
		// ECMA 262 (Annex C) The identifier eval or arguments may not appear as the LeftHandSideExpression of an
		// Assignment operator(11.13) or of a PostfixExpression(11.3)
		b.checkStrictModeEvalOrArguments(node, expr.Left)
	}
}

func (b *Binder) checkStrictModeCatchClause(node *ast.Node) {
	// It is a SyntaxError if a TryStatement with a Catch occurs within strict code and the Identifier of the
	// Catch production is eval or arguments
	clause := node.AsCatchClause()
	if b.inStrictMode && clause.VariableDeclaration != nil {
		b.checkStrictModeEvalOrArguments(node, clause.VariableDeclaration.AsVariableDeclaration().Name())
	}
}

func (b *Binder) checkStrictModeDeleteExpression(node *ast.Node) {
	// Grammar checking
	expr := node.AsDeleteExpression()
	if b.inStrictMode && expr.Expression.Kind == ast.KindIdentifier {
		// When a delete operator occurs within strict mode code, a SyntaxError is thrown if its
		// UnaryExpression is a direct reference to a variable, function argument, or function name
		b.errorOnNode(expr.Expression, diagnostics.X_delete_cannot_be_called_on_an_identifier_in_strict_mode)
	}
}

func (b *Binder) checkStrictModePostfixUnaryExpression(node *ast.Node) {
	// Grammar checking
	// The identifier eval or arguments may not appear as the LeftHandSideExpression of an
	// Assignment operator(11.13) or of a PostfixExpression(11.3) or as the UnaryExpression
	// operated upon by a Prefix Increment(11.4.4) or a Prefix Decrement(11.4.5) operator.
	if b.inStrictMode {
		b.checkStrictModeEvalOrArguments(node, node.AsPostfixUnaryExpression().Operand)
	}
}

func (b *Binder) checkStrictModePrefixUnaryExpression(node *ast.Node) {
	// Grammar checking
	if b.inStrictMode {
		expr := node.AsPrefixUnaryExpression()
		if expr.Operator == ast.KindPlusPlusToken || expr.Operator == ast.KindMinusMinusToken {
			b.checkStrictModeEvalOrArguments(node, expr.Operand)
		}
	}
}

func (b *Binder) checkStrictModeWithStatement(node *ast.Node) {
	// Grammar checking for withStatement
	if b.inStrictMode {
		b.errorOnFirstToken(node, diagnostics.X_with_statements_are_not_allowed_in_strict_mode)
	}
}

func (b *Binder) checkStrictModeLabeledStatement(node *ast.Node) {
	// Grammar checking for labeledStatement
	if b.inStrictMode && b.options.Target >= core.ScriptTargetES2015 {
		data := node.AsLabeledStatement()
		if ast.IsDeclarationStatement(data.Statement) || ast.IsVariableStatement(data.Statement) {
			b.errorOnFirstToken(data.Label, diagnostics.A_label_is_not_allowed_here)
		}
	}
}

func isEvalOrArgumentsIdentifier(node *ast.Node) bool {
	if ast.IsIdentifier(node) {
		text := node.AsIdentifier().Text
		return text == "eval" || text == "arguments"
	}
	return false
}

func (b *Binder) checkStrictModeEvalOrArguments(contextNode *ast.Node, name *ast.Node) {
	if name != nil && isEvalOrArgumentsIdentifier(name) {
		// We check first if the name is inside class declaration or class expression; if so give explicit message
		// otherwise report generic error message.
		b.errorOnNode(name, b.getStrictModeEvalOrArgumentsMessage(contextNode), name.AsIdentifier().Text)
	}
}

func (b *Binder) getStrictModeEvalOrArgumentsMessage(node *ast.Node) *diagnostics.Message {
	// Provide specialized messages to help the user understand why we think they're in strict mode
	if ast.GetContainingClass(node) != nil {
		return diagnostics.Code_contained_in_a_class_is_evaluated_in_JavaScript_s_strict_mode_which_does_not_allow_this_use_of_0_For_more_information_see_https_Colon_Slash_Slashdeveloper_mozilla_org_Slashen_US_Slashdocs_SlashWeb_SlashJavaScript_SlashReference_SlashStrict_mode
	}
	if b.file.ExternalModuleIndicator != nil {
		return diagnostics.Invalid_use_of_0_Modules_are_automatically_in_strict_mode
	}
	return diagnostics.Invalid_use_of_0_in_strict_mode
}

// All container nodes are kept on a linked list in declaration order. This list is used by
// the getLocalNameOfContainer function in the type checker to validate that the local name
// used for a container is unique.
func (b *Binder) bindContainer(node *ast.Node, containerFlags ContainerFlags) {
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
		if node.Kind != ast.KindArrowFunction {
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
			!ast.HasSyntacticModifier(node, ast.ModifierFlagsAsync) &&
			!isGeneratorFunctionExpression(node) &&
			ast.GetImmediatelyInvokedFunctionExpression(node) != nil) || node.Kind == ast.KindClassStaticBlockDeclaration
		// A non-async, non-generator IIFE is considered part of the containing control flow. Return statements behave
		// similarly to break statements that exit to a label just past the statement body.
		if !isImmediatelyInvoked {
			flowStart := b.newFlowNode(ast.FlowFlagsStart)
			b.currentFlow = flowStart
			if containerFlags&(ContainerFlagsIsFunctionExpression|ContainerFlagsIsObjectLiteralOrClassExpressionMethodOrAccessor) != 0 {
				flowStart.Node = node
			}
		}
		// We create a return control flow graph for IIFEs and constructors. For constructors
		// we use the return control flow graph in strict property initialization checks.
		if isImmediatelyInvoked || node.Kind == ast.KindConstructor {
			b.currentReturnTarget = b.newFlowNode(ast.FlowFlagsBranchLabel)
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
		node.Flags &= ^ast.NodeFlagsReachabilityCheckFlags
		if b.currentFlow.Flags&ast.FlowFlagsUnreachable == 0 && containerFlags&ContainerFlagsIsFunctionLike != 0 {
			bodyData := node.BodyData()
			if bodyData != nil && ast.NodeIsPresent(bodyData.Body) {
				node.Flags |= ast.NodeFlagsHasImplicitReturn
				if b.hasExplicitReturn {
					node.Flags |= ast.NodeFlagsHasExplicitReturn
				}
				bodyData.EndFlowNode = b.currentFlow
			}
		}
		if node.Kind == ast.KindSourceFile {
			node.Flags |= b.emitFlags
			node.AsSourceFile().EndFlowNode = b.currentFlow
		}

		if b.currentReturnTarget != nil {
			b.addAntecedent(b.currentReturnTarget, b.currentFlow)
			b.currentFlow = b.finishFlowLabel(b.currentReturnTarget)
			if node.Kind == ast.KindConstructor || node.Kind == ast.KindClassStaticBlockDeclaration {
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
			node.Flags |= ast.NodeFlagsContainsThis
		} else {
			node.Flags &= ^ast.NodeFlagsContainsThis
		}
	} else {
		b.bindChildren(node)
	}
	b.container = saveContainer
	b.thisParentContainer = saveThisParentContainer
	b.blockScopeContainer = savedBlockScopeContainer
}

func (b *Binder) bindChildren(node *ast.Node) {
	saveInAssignmentPattern := b.inAssignmentPattern
	// Most nodes aren't valid in an assignment pattern, so we clear the value here
	// and set it before we descend into nodes that could actually be part of an assignment pattern.
	b.inAssignmentPattern = false
	if b.checkUnreachable(node) {
		b.bindEachChild(node)
		b.bindJSDoc(node)
		b.inAssignmentPattern = saveInAssignmentPattern
		return
	}
	kind := node.Kind
	if kind >= ast.KindFirstStatement && kind <= ast.KindLastStatement && (b.options.AllowUnreachableCode != core.TSTrue || kind == ast.KindReturnStatement) {
		hasFlowNodeData := node.FlowNodeData()
		if hasFlowNodeData != nil {
			hasFlowNodeData.FlowNode = b.currentFlow
		}
	}
	switch node.Kind {
	case ast.KindWhileStatement:
		b.bindWhileStatement(node)
	case ast.KindDoStatement:
		b.bindDoStatement(node)
	case ast.KindForStatement:
		b.bindForStatement(node)
	case ast.KindForInStatement, ast.KindForOfStatement:
		b.bindForInOrForOfStatement(node)
	case ast.KindIfStatement:
		b.bindIfStatement(node)
	case ast.KindReturnStatement:
		b.bindReturnStatement(node)
	case ast.KindThrowStatement:
		b.bindThrowStatement(node)
	case ast.KindBreakStatement:
		b.bindBreakStatement(node)
	case ast.KindContinueStatement:
		b.bindContinueStatement(node)
	case ast.KindTryStatement:
		b.bindTryStatement(node)
	case ast.KindSwitchStatement:
		b.bindSwitchStatement(node)
	case ast.KindCaseBlock:
		b.bindCaseBlock(node)
	case ast.KindCaseClause, ast.KindDefaultClause:
		b.bindCaseOrDefaultClause(node)
	case ast.KindExpressionStatement:
		b.bindExpressionStatement(node)
	case ast.KindLabeledStatement:
		b.bindLabeledStatement(node)
	case ast.KindPrefixUnaryExpression:
		b.bindPrefixUnaryExpressionFlow(node)
	case ast.KindPostfixUnaryExpression:
		b.bindPostfixUnaryExpressionFlow(node)
	case ast.KindBinaryExpression:
		if ast.IsDestructuringAssignment(node) {
			// Carry over whether we are in an assignment pattern to
			// binary expressions that could actually be an initializer
			b.inAssignmentPattern = saveInAssignmentPattern
			b.bindDestructuringAssignmentFlow(node)
			return
		}
		b.bindBinaryExpressionFlow(node)
	case ast.KindDeleteExpression:
		b.bindDeleteExpressionFlow(node)
	case ast.KindConditionalExpression:
		b.bindConditionalExpressionFlow(node)
	case ast.KindVariableDeclaration:
		b.bindVariableDeclarationFlow(node)
	case ast.KindPropertyAccessExpression, ast.KindElementAccessExpression:
		b.bindAccessExpressionFlow(node)
	case ast.KindCallExpression:
		b.bindCallExpressionFlow(node)
	case ast.KindNonNullExpression:
		b.bindNonNullExpressionFlow(node)
	// case *JSDocTypedefTag, *JSDocCallbackTag, *JSDocEnumTag:
	// 	b.bindJSDocTypeAlias(node)
	// case *JSDocImportTag:
	// 	b.bindJSDocImportTag(node)
	case ast.KindSourceFile:
		b.bindEachStatementFunctionsFirst(node.AsSourceFile().Statements)
		// b.bind(node.endOfFileToken)
	case ast.KindBlock:
		b.bindEachStatementFunctionsFirst(node.AsBlock().Statements)
	case ast.KindModuleBlock:
		b.bindEachStatementFunctionsFirst(node.AsModuleBlock().Statements)
	case ast.KindBindingElement:
		b.bindBindingElementFlow(node)
	case ast.KindParameter:
		b.bindParameterFlow(node)
	case ast.KindObjectLiteralExpression, ast.KindArrayLiteralExpression, ast.KindPropertyAssignment, ast.KindSpreadElement:
		b.inAssignmentPattern = saveInAssignmentPattern
		b.bindEachChild(node)
	default:
		b.bindEachChild(node)
	}
	b.bindJSDoc(node)
	b.inAssignmentPattern = saveInAssignmentPattern
}

func (b *Binder) bindEachChild(node *ast.Node) {
	node.ForEachChild(b.bindFunc)
}

func (b *Binder) bindEach(nodes []*ast.Node) {
	for _, node := range nodes {
		b.bind(node)
	}
}

func (b *Binder) bindNodeList(nodeList *ast.NodeList) {
	if nodeList != nil {
		b.bindEach(nodeList.Nodes)
	}
}

func (b *Binder) bindModifiers(modifiers *ast.ModifierList) {
	if modifiers != nil {
		b.bindEach(modifiers.Nodes)
	}
}

func (b *Binder) bindEachStatementFunctionsFirst(statements *ast.NodeList) {
	for _, node := range statements.Nodes {
		if node.Kind == ast.KindFunctionDeclaration {
			b.bind(node)
		}
	}
	for _, node := range statements.Nodes {
		if node.Kind != ast.KindFunctionDeclaration {
			b.bind(node)
		}
	}
}

func (b *Binder) checkUnreachable(node *ast.Node) bool {
	if b.currentFlow.Flags&ast.FlowFlagsUnreachable == 0 {
		return false
	}
	if b.currentFlow == b.unreachableFlow {
		// report errors on all statements except empty ones
		// report errors on class declarations
		// report errors on enums with preserved emit
		// report errors on instantiated modules
		reportError := ast.IsStatementButNotDeclaration(node) && !ast.IsEmptyStatement(node) ||
			ast.IsClassDeclaration(node) ||
			isEnumDeclarationWithPreservedEmit(node, b.options) ||
			ast.IsModuleDeclaration(node) && b.shouldReportErrorOnModuleDeclaration(node)
		if reportError {
			b.currentFlow = b.reportedUnreachableFlow
			if b.options.AllowUnreachableCode != core.TSTrue {
				// unreachable code is reported if
				// - user has explicitly asked about it AND
				// - statement is in not ambient context (statements in ambient context is already an error
				//   so we should not report extras) AND
				//   - node is not variable statement OR
				//   - node is block scoped variable statement OR
				//   - node is not block scoped variable statement and at least one variable declaration has initializer
				//   Rationale: we don't want to report errors on non-initialized var's since they are hoisted
				//   On the other side we do want to report errors on non-initialized 'lets' because of TDZ
				isError := unreachableCodeIsError(b.options) && node.Flags&ast.NodeFlagsAmbient == 0 && (!ast.IsVariableStatement(node) ||
					ast.GetCombinedNodeFlags(node.AsVariableStatement().DeclarationList)&ast.NodeFlagsBlockScoped != 0 ||
					core.Some(node.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes, func(d *ast.Node) bool {
						return d.AsVariableDeclaration().Initializer != nil
					}))
				b.errorOnEachUnreachableRange(node, isError)
			}
		}
	}
	return true
}

func (b *Binder) shouldReportErrorOnModuleDeclaration(node *ast.Node) bool {
	instanceState := ast.GetModuleInstanceState(node)
	return instanceState == ast.ModuleInstanceStateInstantiated || (instanceState == ast.ModuleInstanceStateConstEnumOnly && b.options.ShouldPreserveConstEnums())
}

func (b *Binder) errorOnEachUnreachableRange(node *ast.Node, isError bool) {
	if b.isExecutableStatement(node) && ast.IsBlock(node.Parent) {
		statements := node.Parent.AsBlock().Statements.Nodes
		index := slices.Index(statements, node)
		var first, last *ast.Node
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
func (b *Binder) isExecutableStatement(s *ast.Node) bool {
	// Don't remove statements that can validly be used before they appear.
	return !ast.IsFunctionDeclaration(s) && !b.isPurelyTypeDeclaration(s) && !(ast.IsVariableStatement(s) && ast.GetCombinedNodeFlags(s)&ast.NodeFlagsBlockScoped == 0 &&
		core.Some(s.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes, func(d *ast.Node) bool {
			return d.AsVariableDeclaration().Initializer == nil
		}))
}

func (b *Binder) isPurelyTypeDeclaration(s *ast.Node) bool {
	switch s.Kind {
	case ast.KindInterfaceDeclaration, ast.KindTypeAliasDeclaration:
		return true
	case ast.KindModuleDeclaration:
		return ast.GetModuleInstanceState(s) != ast.ModuleInstanceStateInstantiated
	case ast.KindEnumDeclaration:
		return !isEnumDeclarationWithPreservedEmit(s, b.options)
	default:
		return false
	}
}

func (b *Binder) setContinueTarget(node *ast.Node, target *ast.FlowLabel) *ast.FlowLabel {
	label := b.activeLabelList
	for label != nil && node.Parent.Kind == ast.KindLabeledStatement {
		label.continueTarget = target
		label = label.next
		node = node.Parent
	}
	return target
}

func (b *Binder) doWithConditionalBranches(action func(b *Binder, value *ast.Node) bool, value *ast.Node, trueTarget *ast.FlowLabel, falseTarget *ast.FlowLabel) {
	savedTrueTarget := b.currentTrueTarget
	savedFalseTarget := b.currentFalseTarget
	b.currentTrueTarget = trueTarget
	b.currentFalseTarget = falseTarget
	action(b, value)
	b.currentTrueTarget = savedTrueTarget
	b.currentFalseTarget = savedFalseTarget
}

func (b *Binder) bindCondition(node *ast.Node, trueTarget *ast.FlowLabel, falseTarget *ast.FlowLabel) {
	b.doWithConditionalBranches((*Binder).bind, node, trueTarget, falseTarget)
	if node == nil || !isLogicalAssignmentExpression(node) && !ast.IsLogicalExpression(node) && !(ast.IsOptionalChain(node) && ast.IsOutermostOptionalChain(node)) {
		b.addAntecedent(trueTarget, b.createFlowCondition(ast.FlowFlagsTrueCondition, b.currentFlow, node))
		b.addAntecedent(falseTarget, b.createFlowCondition(ast.FlowFlagsFalseCondition, b.currentFlow, node))
	}
}

func (b *Binder) bindIterativeStatement(node *ast.Node, breakTarget *ast.FlowLabel, continueTarget *ast.FlowLabel) {
	saveBreakTarget := b.currentBreakTarget
	saveContinueTarget := b.currentContinueTarget
	b.currentBreakTarget = breakTarget
	b.currentContinueTarget = continueTarget
	b.bind(node)
	b.currentBreakTarget = saveBreakTarget
	b.currentContinueTarget = saveContinueTarget
}

func isLogicalAssignmentExpression(node *ast.Node) bool {
	return ast.IsLogicalOrCoalescingAssignmentExpression(ast.SkipParentheses(node))
}

func (b *Binder) bindAssignmentTargetFlow(node *ast.Node) {
	switch node.Kind {
	case ast.KindArrayLiteralExpression:
		for _, e := range node.AsArrayLiteralExpression().Elements.Nodes {
			if e.Kind == ast.KindSpreadElement {
				b.bindAssignmentTargetFlow(e.AsSpreadElement().Expression)
			} else {
				b.bindDestructuringTargetFlow(e)
			}
		}
	case ast.KindObjectLiteralExpression:
		for _, p := range node.AsObjectLiteralExpression().Properties.Nodes {
			switch p.Kind {
			case ast.KindPropertyAssignment:
				b.bindDestructuringTargetFlow(p.AsPropertyAssignment().Initializer)
			case ast.KindShorthandPropertyAssignment:
				b.bindAssignmentTargetFlow(p.AsShorthandPropertyAssignment().Name())
			case ast.KindSpreadAssignment:
				b.bindAssignmentTargetFlow(p.AsSpreadAssignment().Expression)
			}
		}
	default:
		if isNarrowableReference(node) {
			b.currentFlow = b.createFlowMutation(ast.FlowFlagsAssignment, b.currentFlow, node)
		}
	}
}

func (b *Binder) bindDestructuringTargetFlow(node *ast.Node) {
	if ast.IsBinaryExpression(node) && node.AsBinaryExpression().OperatorToken.Kind == ast.KindEqualsToken {
		b.bindAssignmentTargetFlow(node.AsBinaryExpression().Left)
	} else {
		b.bindAssignmentTargetFlow(node)
	}
}

func (b *Binder) bindWhileStatement(node *ast.Node) {
	stmt := node.AsWhileStatement()
	preWhileLabel := b.setContinueTarget(node, b.createLoopLabel())
	preBodyLabel := b.createBranchLabel()
	postWhileLabel := b.createBranchLabel()
	topFlow := b.currentFlow
	b.currentFlow = preWhileLabel
	b.bindCondition(stmt.Expression, preBodyLabel, postWhileLabel)
	b.currentFlow = b.finishFlowLabel(preBodyLabel)
	b.bindIterativeStatement(stmt.Statement, postWhileLabel, preWhileLabel)
	b.addAntecedent(preWhileLabel, b.currentFlow)
	b.addAntecedent(preWhileLabel, topFlow)
	b.currentFlow = b.finishFlowLabel(postWhileLabel)
}

func (b *Binder) bindDoStatement(node *ast.Node) {
	stmt := node.AsDoStatement()
	preDoLabel := b.createLoopLabel()
	preConditionLabel := b.setContinueTarget(node, b.createBranchLabel())
	postDoLabel := b.createBranchLabel()
	topFlow := b.currentFlow
	b.currentFlow = preDoLabel
	b.bindIterativeStatement(stmt.Statement, postDoLabel, preConditionLabel)
	b.addAntecedent(preConditionLabel, b.currentFlow)
	b.currentFlow = b.finishFlowLabel(preConditionLabel)
	b.bindCondition(stmt.Expression, preDoLabel, postDoLabel)
	b.addAntecedent(preDoLabel, topFlow)
	b.currentFlow = b.finishFlowLabel(postDoLabel)
}

func (b *Binder) bindForStatement(node *ast.Node) {
	stmt := node.AsForStatement()
	preLoopLabel := b.setContinueTarget(node, b.createLoopLabel())
	preBodyLabel := b.createBranchLabel()
	postLoopLabel := b.createBranchLabel()
	b.bind(stmt.Initializer)
	topFlow := b.currentFlow
	b.currentFlow = preLoopLabel
	b.bindCondition(stmt.Condition, preBodyLabel, postLoopLabel)
	b.currentFlow = b.finishFlowLabel(preBodyLabel)
	b.bindIterativeStatement(stmt.Statement, postLoopLabel, preLoopLabel)
	b.bind(stmt.Incrementor)
	b.addAntecedent(preLoopLabel, b.currentFlow)
	b.addAntecedent(preLoopLabel, topFlow)
	b.currentFlow = b.finishFlowLabel(postLoopLabel)
}

func (b *Binder) bindForInOrForOfStatement(node *ast.Node) {
	stmt := node.AsForInOrOfStatement()
	preLoopLabel := b.setContinueTarget(node, b.createLoopLabel())
	postLoopLabel := b.createBranchLabel()
	b.bind(stmt.Expression)
	topFlow := b.currentFlow
	b.currentFlow = preLoopLabel
	if node.Kind == ast.KindForOfStatement {
		b.bind(stmt.AwaitModifier)
	}
	b.addAntecedent(postLoopLabel, b.currentFlow)
	b.bind(stmt.Initializer)
	if stmt.Initializer.Kind != ast.KindVariableDeclarationList {
		b.bindAssignmentTargetFlow(stmt.Initializer)
	}
	b.bindIterativeStatement(stmt.Statement, postLoopLabel, preLoopLabel)
	b.addAntecedent(preLoopLabel, b.currentFlow)
	b.addAntecedent(preLoopLabel, topFlow)
	b.currentFlow = b.finishFlowLabel(postLoopLabel)
}

func (b *Binder) bindIfStatement(node *ast.Node) {
	stmt := node.AsIfStatement()
	thenLabel := b.createBranchLabel()
	elseLabel := b.createBranchLabel()
	postIfLabel := b.createBranchLabel()
	b.bindCondition(stmt.Expression, thenLabel, elseLabel)
	b.currentFlow = b.finishFlowLabel(thenLabel)
	b.bind(stmt.ThenStatement)
	b.addAntecedent(postIfLabel, b.currentFlow)
	b.currentFlow = b.finishFlowLabel(elseLabel)
	b.bind(stmt.ElseStatement)
	b.addAntecedent(postIfLabel, b.currentFlow)
	b.currentFlow = b.finishFlowLabel(postIfLabel)
}

func (b *Binder) bindReturnStatement(node *ast.Node) {
	b.bind(node.AsReturnStatement().Expression)
	if b.currentReturnTarget != nil {
		b.addAntecedent(b.currentReturnTarget, b.currentFlow)
	}
	b.currentFlow = b.unreachableFlow
	b.hasExplicitReturn = true
	b.hasFlowEffects = true
}

func (b *Binder) bindThrowStatement(node *ast.Node) {
	b.bind(node.AsThrowStatement().Expression)
	b.currentFlow = b.unreachableFlow
	b.hasFlowEffects = true
}

func (b *Binder) bindBreakStatement(node *ast.Node) {
	b.bindBreakOrContinueStatement(node.AsBreakStatement().Label, b.currentBreakTarget, (*ActiveLabel).BreakTarget)
}

func (b *Binder) bindContinueStatement(node *ast.Node) {
	b.bindBreakOrContinueStatement(node.AsContinueStatement().Label, b.currentContinueTarget, (*ActiveLabel).ContinueTarget)
}

func (b *Binder) bindBreakOrContinueStatement(label *ast.Node, currentTarget *ast.FlowNode, getTarget func(*ActiveLabel) *ast.FlowNode) {
	b.bind(label)
	if label != nil {
		activeLabel := b.findActiveLabel(label.AsIdentifier().Text)
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

func (b *Binder) bindBreakOrContinueFlow(flowLabel *ast.FlowLabel) {
	if flowLabel != nil {
		b.addAntecedent(flowLabel, b.currentFlow)
		b.currentFlow = b.unreachableFlow
		b.hasFlowEffects = true
	}
}

func (b *Binder) bindTryStatement(node *ast.Node) {
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
	if stmt.FinallyBlock != nil {
		b.currentReturnTarget = returnLabel
	}
	b.addAntecedent(exceptionLabel, b.currentFlow)
	b.currentExceptionTarget = exceptionLabel
	b.bind(stmt.TryBlock)
	b.addAntecedent(normalExitLabel, b.currentFlow)
	if stmt.CatchClause != nil {
		// Start of catch clause is the target of exceptions from try block.
		b.currentFlow = b.finishFlowLabel(exceptionLabel)
		// The currentExceptionTarget now represents control flows from exceptions in the catch clause.
		// Effectively, in a try-catch-finally, if an exception occurs in the try block, the catch block
		// acts like a second try block.
		exceptionLabel = b.createBranchLabel()
		b.addAntecedent(exceptionLabel, b.currentFlow)
		b.currentExceptionTarget = exceptionLabel
		b.bind(stmt.CatchClause)
		b.addAntecedent(normalExitLabel, b.currentFlow)
	}
	b.currentReturnTarget = saveReturnTarget
	b.currentExceptionTarget = saveExceptionTarget
	if stmt.FinallyBlock != nil {
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
		finallyLabel.Antecedents = b.combineFlowLists(normalExitLabel.Antecedents, b.combineFlowLists(exceptionLabel.Antecedents, returnLabel.Antecedents))
		b.currentFlow = finallyLabel
		b.bind(stmt.FinallyBlock)
		if b.currentFlow.Flags&ast.FlowFlagsUnreachable != 0 {
			// If the end of the finally block is unreachable, the end of the entire try statement is unreachable.
			b.currentFlow = b.unreachableFlow
		} else {
			// If we have an IIFE return target and return statements in the try or catch blocks, add a control
			// flow that goes back through the finally block and back through only the return statements.
			if b.currentReturnTarget != nil && returnLabel.Antecedents != nil {
				b.addAntecedent(b.currentReturnTarget, b.createReduceLabel(finallyLabel, returnLabel.Antecedents, b.currentFlow))
			}
			// If we have an outer exception target (i.e. a containing try-finally or try-catch-finally), add a
			// control flow that goes back through the finally block and back through each possible exception source.
			if b.currentExceptionTarget != nil && exceptionLabel.Antecedents != nil {
				b.addAntecedent(b.currentExceptionTarget, b.createReduceLabel(finallyLabel, exceptionLabel.Antecedents, b.currentFlow))
			}
			// If the end of the finally block is reachable, but the end of the try and catch blocks are not,
			// convert the current flow to unreachable. For example, 'try { return 1; } finally { ... }' should
			// result in an unreachable current control flow.
			if normalExitLabel.Antecedents != nil {
				b.currentFlow = b.createReduceLabel(finallyLabel, normalExitLabel.Antecedents, b.currentFlow)
			} else {
				b.currentFlow = b.unreachableFlow
			}
		}
	} else {
		b.currentFlow = b.finishFlowLabel(normalExitLabel)
	}
}

func (b *Binder) bindSwitchStatement(node *ast.Node) {
	stmt := node.AsSwitchStatement()
	postSwitchLabel := b.createBranchLabel()
	b.bind(stmt.Expression)
	saveBreakTarget := b.currentBreakTarget
	savePreSwitchCaseFlow := b.preSwitchCaseFlow
	b.currentBreakTarget = postSwitchLabel
	b.preSwitchCaseFlow = b.currentFlow
	b.bind(stmt.CaseBlock)
	b.addAntecedent(postSwitchLabel, b.currentFlow)
	hasDefault := core.Some(stmt.CaseBlock.AsCaseBlock().Clauses.Nodes, func(c *ast.Node) bool {
		return c.Kind == ast.KindDefaultClause
	})
	if !hasDefault {
		b.addAntecedent(postSwitchLabel, b.createFlowSwitchClause(b.preSwitchCaseFlow, node, 0, 0))
	}
	b.currentBreakTarget = saveBreakTarget
	b.preSwitchCaseFlow = savePreSwitchCaseFlow
	b.currentFlow = b.finishFlowLabel(postSwitchLabel)
}

func (b *Binder) bindCaseBlock(node *ast.Node) {
	switchStatement := node.Parent
	clauses := node.AsCaseBlock().Clauses.Nodes
	isNarrowingSwitch := switchStatement.Expression().Kind == ast.KindTrueKeyword || isNarrowingExpression(switchStatement.Expression())
	var fallthroughFlow *ast.FlowNode = b.unreachableFlow
	for i := 0; i < len(clauses); i++ {
		clauseStart := i
		for len(clauses[i].AsCaseOrDefaultClause().Statements.Nodes) == 0 && i+1 < len(clauses) {
			if fallthroughFlow == b.unreachableFlow {
				b.currentFlow = b.preSwitchCaseFlow
			}
			b.bind(clauses[i])
			i++
		}
		preCaseLabel := b.createBranchLabel()
		preCaseFlow := b.preSwitchCaseFlow
		if isNarrowingSwitch {
			preCaseFlow = b.createFlowSwitchClause(b.preSwitchCaseFlow, switchStatement, clauseStart, i+1)
		}
		b.addAntecedent(preCaseLabel, preCaseFlow)
		b.addAntecedent(preCaseLabel, fallthroughFlow)
		b.currentFlow = b.finishFlowLabel(preCaseLabel)
		clause := clauses[i]
		b.bind(clause)
		fallthroughFlow = b.currentFlow
		if b.currentFlow.Flags&ast.FlowFlagsUnreachable == 0 && i != len(clauses)-1 && b.options.NoFallthroughCasesInSwitch == core.TSTrue {
			clause.AsCaseOrDefaultClause().FallthroughFlowNode = b.currentFlow
		}
	}
}

func (b *Binder) bindCaseOrDefaultClause(node *ast.Node) {
	clause := node.AsCaseOrDefaultClause()
	if clause.Expression != nil {
		saveCurrentFlow := b.currentFlow
		b.currentFlow = b.preSwitchCaseFlow
		b.bind(clause.Expression)
		b.currentFlow = saveCurrentFlow
	}
	b.bindEach(clause.Statements.Nodes)
}

func (b *Binder) bindExpressionStatement(node *ast.Node) {
	stmt := node.AsExpressionStatement()
	b.bind(stmt.Expression)
	b.maybeBindExpressionFlowIfCall(stmt.Expression)
}

func (b *Binder) maybeBindExpressionFlowIfCall(node *ast.Node) {
	// A top level or comma expression call expression with a dotted function name and at least one argument
	// is potentially an assertion and is therefore included in the control flow.
	if ast.IsCallExpression(node) {
		if node.Expression().Kind != ast.KindSuperKeyword && ast.IsDottedName(node.Expression()) {
			b.currentFlow = b.createFlowCall(b.currentFlow, node)
		}
	}
}

func (b *Binder) bindLabeledStatement(node *ast.Node) {
	stmt := node.AsLabeledStatement()
	postStatementLabel := b.createBranchLabel()
	b.activeLabelList = &ActiveLabel{
		next:           b.activeLabelList,
		name:           stmt.Label.AsIdentifier().Text,
		breakTarget:    postStatementLabel,
		continueTarget: nil,
		referenced:     false,
	}
	b.bind(stmt.Label)
	b.bind(stmt.Statement)
	if !b.activeLabelList.referenced && b.options.AllowUnusedLabels != core.TSTrue {
		b.errorOrSuggestionOnNode(unusedLabelIsError(b.options), stmt.Label, diagnostics.Unused_label)
	}
	b.activeLabelList = b.activeLabelList.next
	b.addAntecedent(postStatementLabel, b.currentFlow)
	b.currentFlow = b.finishFlowLabel(postStatementLabel)
}

func (b *Binder) bindPrefixUnaryExpressionFlow(node *ast.Node) {
	expr := node.AsPrefixUnaryExpression()
	if expr.Operator == ast.KindExclamationToken {
		saveTrueTarget := b.currentTrueTarget
		b.currentTrueTarget = b.currentFalseTarget
		b.currentFalseTarget = saveTrueTarget
		b.bindEachChild(node)
		b.currentFalseTarget = b.currentTrueTarget
		b.currentTrueTarget = saveTrueTarget
	} else {
		b.bindEachChild(node)
		if expr.Operator == ast.KindPlusPlusToken || expr.Operator == ast.KindMinusMinusToken {
			b.bindAssignmentTargetFlow(expr.Operand)
		}
	}
}

func (b *Binder) bindPostfixUnaryExpressionFlow(node *ast.Node) {
	expr := node.AsPostfixUnaryExpression()
	b.bindEachChild(node)
	if expr.Operator == ast.KindPlusPlusToken || expr.Operator == ast.KindMinusMinusToken {
		b.bindAssignmentTargetFlow(expr.Operand)
	}
}

func (b *Binder) bindDestructuringAssignmentFlow(node *ast.Node) {
	expr := node.AsBinaryExpression()
	if b.inAssignmentPattern {
		b.inAssignmentPattern = false
		b.bind(expr.OperatorToken)
		b.bind(expr.Right)
		b.inAssignmentPattern = true
		b.bind(expr.Left)
	} else {
		b.inAssignmentPattern = true
		b.bind(expr.Left)
		b.inAssignmentPattern = false
		b.bind(expr.OperatorToken)
		b.bind(expr.Right)
	}
	b.bindAssignmentTargetFlow(expr.Left)
}

func (b *Binder) bindBinaryExpressionFlow(node *ast.Node) {
	expr := node.AsBinaryExpression()
	operator := expr.OperatorToken.Kind
	if ast.IsLogicalOrCoalescingBinaryOperator(operator) || ast.IsLogicalOrCoalescingAssignmentOperator(operator) {
		if isTopLevelLogicalExpression(node) {
			postExpressionLabel := b.createBranchLabel()
			saveCurrentFlow := b.currentFlow
			saveHasFlowEffects := b.hasFlowEffects
			b.hasFlowEffects = false
			b.bindLogicalLikeExpression(node, postExpressionLabel, postExpressionLabel)
			if b.hasFlowEffects {
				b.currentFlow = b.finishFlowLabel(postExpressionLabel)
			} else {
				b.currentFlow = saveCurrentFlow
			}
			b.hasFlowEffects = b.hasFlowEffects || saveHasFlowEffects
		} else {
			b.bindLogicalLikeExpression(node, b.currentTrueTarget, b.currentFalseTarget)
		}
	} else {
		b.bind(expr.Left)
		if operator == ast.KindCommaToken {
			b.maybeBindExpressionFlowIfCall(node)
		}
		b.bind(expr.OperatorToken)
		b.bind(expr.Right)
		if operator == ast.KindCommaToken {
			b.maybeBindExpressionFlowIfCall(node)
		}
		if ast.IsAssignmentOperator(operator) && !ast.IsAssignmentTarget(node) {
			b.bindAssignmentTargetFlow(expr.Left)
			if operator == ast.KindEqualsToken && expr.Left.Kind == ast.KindElementAccessExpression {
				elementAccess := expr.Left.AsElementAccessExpression()
				if isNarrowableOperand(elementAccess.Expression) {
					b.currentFlow = b.createFlowMutation(ast.FlowFlagsArrayMutation, b.currentFlow, node)
				}
			}
		}
	}
}

func (b *Binder) bindLogicalLikeExpression(node *ast.Node, trueTarget *ast.FlowLabel, falseTarget *ast.FlowLabel) {
	expr := node.AsBinaryExpression()
	preRightLabel := b.createBranchLabel()
	if expr.OperatorToken.Kind == ast.KindAmpersandAmpersandToken || expr.OperatorToken.Kind == ast.KindAmpersandAmpersandEqualsToken {
		b.bindCondition(expr.Left, preRightLabel, falseTarget)
	} else {
		b.bindCondition(expr.Left, trueTarget, preRightLabel)
	}
	b.currentFlow = b.finishFlowLabel(preRightLabel)
	b.bind(expr.OperatorToken)
	if ast.IsLogicalOrCoalescingAssignmentOperator(expr.OperatorToken.Kind) {
		b.doWithConditionalBranches((*Binder).bind, expr.Right, trueTarget, falseTarget)
		b.bindAssignmentTargetFlow(expr.Left)
		b.addAntecedent(trueTarget, b.createFlowCondition(ast.FlowFlagsTrueCondition, b.currentFlow, node))
		b.addAntecedent(falseTarget, b.createFlowCondition(ast.FlowFlagsFalseCondition, b.currentFlow, node))
	} else {
		b.bindCondition(expr.Right, trueTarget, falseTarget)
	}
}

func (b *Binder) bindDeleteExpressionFlow(node *ast.Node) {
	expr := node.AsDeleteExpression()
	b.bindEachChild(node)
	if expr.Expression.Kind == ast.KindPropertyAccessExpression {
		b.bindAssignmentTargetFlow(expr.Expression)
	}
}

func (b *Binder) bindConditionalExpressionFlow(node *ast.Node) {
	expr := node.AsConditionalExpression()
	trueLabel := b.createBranchLabel()
	falseLabel := b.createBranchLabel()
	postExpressionLabel := b.createBranchLabel()
	saveCurrentFlow := b.currentFlow
	saveHasFlowEffects := b.hasFlowEffects
	b.hasFlowEffects = false
	b.bindCondition(expr.Condition, trueLabel, falseLabel)
	b.currentFlow = b.finishFlowLabel(trueLabel)
	b.bind(expr.QuestionToken)
	b.bind(expr.WhenTrue)
	b.addAntecedent(postExpressionLabel, b.currentFlow)
	b.currentFlow = b.finishFlowLabel(falseLabel)
	b.bind(expr.ColonToken)
	b.bind(expr.WhenFalse)
	b.addAntecedent(postExpressionLabel, b.currentFlow)
	if b.hasFlowEffects {
		b.currentFlow = b.finishFlowLabel(postExpressionLabel)
	} else {
		b.currentFlow = saveCurrentFlow
	}
	b.hasFlowEffects = b.hasFlowEffects || saveHasFlowEffects
}

func (b *Binder) bindVariableDeclarationFlow(node *ast.Node) {
	b.bindEachChild(node)
	if node.AsVariableDeclaration().Initializer != nil || ast.IsForInOrOfStatement(node.Parent.Parent) {
		b.bindInitializedVariableFlow(node)
	}
}

func (b *Binder) bindInitializedVariableFlow(node *ast.Node) {
	var name *ast.Node
	switch node.Kind {
	case ast.KindVariableDeclaration:
		name = node.AsVariableDeclaration().Name()
	case ast.KindBindingElement:
		name = node.AsBindingElement().Name()
	}
	if name != nil && ast.IsBindingPattern(name) {
		for _, child := range name.AsBindingPattern().Elements.Nodes {
			b.bindInitializedVariableFlow(child)
		}
	} else {
		b.currentFlow = b.createFlowMutation(ast.FlowFlagsAssignment, b.currentFlow, node)
	}
}

func (b *Binder) bindAccessExpressionFlow(node *ast.Node) {
	if ast.IsOptionalChain(node) {
		b.bindOptionalChainFlow(node)
	} else {
		b.bindEachChild(node)
	}
}

func (b *Binder) bindOptionalChainFlow(node *ast.Node) {
	if isTopLevelLogicalExpression(node) {
		postExpressionLabel := b.createBranchLabel()
		saveCurrentFlow := b.currentFlow
		saveHasFlowEffects := b.hasFlowEffects
		b.bindOptionalChain(node, postExpressionLabel, postExpressionLabel)
		if b.hasFlowEffects {
			b.currentFlow = b.finishFlowLabel(postExpressionLabel)
		} else {
			b.currentFlow = saveCurrentFlow
		}
		b.hasFlowEffects = b.hasFlowEffects || saveHasFlowEffects
	} else {
		b.bindOptionalChain(node, b.currentTrueTarget, b.currentFalseTarget)
	}
}

func (b *Binder) bindOptionalChain(node *ast.Node, trueTarget *ast.FlowLabel, falseTarget *ast.FlowLabel) {
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
	var preChainLabel *ast.FlowLabel
	if ast.IsOptionalChainRoot(node) {
		preChainLabel = b.createBranchLabel()
	}
	b.bindOptionalExpression(node.Expression(), core.IfElse(preChainLabel != nil, preChainLabel, trueTarget), falseTarget)
	if preChainLabel != nil {
		b.currentFlow = b.finishFlowLabel(preChainLabel)
	}
	b.doWithConditionalBranches((*Binder).bindOptionalChainRest, node, trueTarget, falseTarget)
	if ast.IsOutermostOptionalChain(node) {
		b.addAntecedent(trueTarget, b.createFlowCondition(ast.FlowFlagsTrueCondition, b.currentFlow, node))
		b.addAntecedent(falseTarget, b.createFlowCondition(ast.FlowFlagsFalseCondition, b.currentFlow, node))
	}
}

func (b *Binder) bindOptionalExpression(node *ast.Node, trueTarget *ast.FlowLabel, falseTarget *ast.FlowLabel) {
	b.doWithConditionalBranches((*Binder).bind, node, trueTarget, falseTarget)
	if !ast.IsOptionalChain(node) || ast.IsOutermostOptionalChain(node) {
		b.addAntecedent(trueTarget, b.createFlowCondition(ast.FlowFlagsTrueCondition, b.currentFlow, node))
		b.addAntecedent(falseTarget, b.createFlowCondition(ast.FlowFlagsFalseCondition, b.currentFlow, node))
	}
}

func (b *Binder) bindOptionalChainRest(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindPropertyAccessExpression:
		b.bind(node.AsPropertyAccessExpression().QuestionDotToken)
		b.bind(node.AsPropertyAccessExpression().Name())
	case ast.KindElementAccessExpression:
		b.bind(node.AsElementAccessExpression().QuestionDotToken)
		b.bind(node.AsElementAccessExpression().ArgumentExpression)
	case ast.KindCallExpression:
		b.bind(node.AsCallExpression().QuestionDotToken)
		b.bindNodeList(node.AsCallExpression().TypeArguments)
		b.bindEach(node.AsCallExpression().Arguments.Nodes)
	}
	return false
}

func (b *Binder) bindCallExpressionFlow(node *ast.Node) {
	call := node.AsCallExpression()
	if ast.IsOptionalChain(node) {
		b.bindOptionalChainFlow(node)
	} else {
		// If the target of the call expression is a function expression or arrow function we have
		// an immediately invoked function expression (IIFE). Initialize the flowNode property to
		// the current control flow (which includes evaluation of the IIFE arguments).
		expr := ast.SkipParentheses(call.Expression)
		if expr.Kind == ast.KindFunctionExpression || expr.Kind == ast.KindArrowFunction {
			b.bindNodeList(call.TypeArguments)
			b.bindEach(call.Arguments.Nodes)
			b.bind(call.Expression)
		} else {
			b.bindEachChild(node)
			if call.Expression.Kind == ast.KindSuperKeyword {
				b.currentFlow = b.createFlowCall(b.currentFlow, node)
			}
		}
	}
	if ast.IsPropertyAccessExpression(call.Expression) {
		access := call.Expression.AsPropertyAccessExpression()
		if ast.IsIdentifier(access.Name()) && isNarrowableOperand(access.Expression) && ast.IsPushOrUnshiftIdentifier(access.Name()) {
			b.currentFlow = b.createFlowMutation(ast.FlowFlagsArrayMutation, b.currentFlow, node)
		}
	}
}

func (b *Binder) bindNonNullExpressionFlow(node *ast.Node) {
	if ast.IsOptionalChain(node) {
		b.bindOptionalChainFlow(node)
	} else {
		b.bindEachChild(node)
	}
}

func (b *Binder) bindBindingElementFlow(node *ast.Node) {
	// When evaluating a binding pattern, the initializer is evaluated before the binding pattern, per:
	// - https://tc39.es/ecma262/#sec-destructuring-binding-patterns-runtime-semantics-iteratorbindinginitialization
	//   - `BindingElement: BindingPattern Initializer?`
	// - https://tc39.es/ecma262/#sec-runtime-semantics-keyedbindinginitialization
	//   - `BindingElement: BindingPattern Initializer?`
	elem := node.AsBindingElement()
	b.bind(elem.DotDotDotToken)
	b.bind(elem.PropertyName)
	b.bindInitializer(elem.Initializer)
	b.bind(elem.Name())
}

func (b *Binder) bindParameterFlow(node *ast.Node) {
	param := node.AsParameterDeclaration()
	b.bindModifiers(param.Modifiers())
	b.bind(param.DotDotDotToken)
	b.bind(param.QuestionToken)
	b.bind(param.Type)
	b.bindInitializer(param.Initializer)
	b.bind(param.Name())
}

// a BindingElement/Parameter does not have side effects if initializers are not evaluated and used. (see GH#49759)
func (b *Binder) bindInitializer(node *ast.Node) {
	if node == nil {
		return
	}
	entryFlow := b.currentFlow
	b.bind(node)
	if entryFlow == b.unreachableFlow || entryFlow == b.currentFlow {
		return
	}
	exitFlow := b.createBranchLabel()
	b.addAntecedent(exitFlow, entryFlow)
	b.addAntecedent(exitFlow, b.currentFlow)
	b.currentFlow = b.finishFlowLabel(exitFlow)
}

func isEnumDeclarationWithPreservedEmit(node *ast.Node, options *core.CompilerOptions) bool {
	return node.Kind == ast.KindEnumDeclaration && (!ast.IsEnumConst(node) || options.ShouldPreserveConstEnums())
}

func setFlowNode(node *ast.Node, flowNode *ast.FlowNode) {
	data := node.FlowNodeData()
	if data != nil {
		data.FlowNode = flowNode
	}
}

func setReturnFlowNode(node *ast.Node, returnFlowNode *ast.FlowNode) {
	switch node.Kind {
	case ast.KindConstructor:
		node.AsConstructorDeclaration().ReturnFlowNode = returnFlowNode
	case ast.KindFunctionDeclaration:
		node.AsFunctionDeclaration().ReturnFlowNode = returnFlowNode
	case ast.KindFunctionExpression:
		node.AsFunctionExpression().ReturnFlowNode = returnFlowNode
	case ast.KindClassStaticBlockDeclaration:
		node.AsClassStaticBlockDeclaration().ReturnFlowNode = returnFlowNode
	}
}

func isGeneratorFunctionExpression(node *ast.Node) bool {
	return ast.IsFunctionExpression(node) && node.AsFunctionExpression().AsteriskToken != nil
}

func (b *Binder) addToContainerChain(next *ast.Node) {
	if b.lastContainer != nil {
		b.lastContainer.LocalsContainerData().NextContainer = next
	}
	b.lastContainer = next
}

func (b *Binder) addDeclarationToSymbol(symbol *ast.Symbol, node *ast.Node, symbolFlags ast.SymbolFlags) {
	symbol.Flags |= symbolFlags
	node.DeclarationData().Symbol = symbol
	if symbol.Declarations == nil {
		symbol.Declarations = b.newSingleDeclaration(node)
	} else {
		symbol.Declarations = core.AppendIfUnique(symbol.Declarations, node)
	}
	// On merge of const enum module with class or function, reset const enum only flag (namespaces will already recalculate)
	if symbol.Flags&ast.SymbolFlagsConstEnumOnlyModule != 0 && symbol.Flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsClass|ast.SymbolFlagsRegularEnum) != 0 {
		symbol.Flags &^= ast.SymbolFlagsConstEnumOnlyModule
	}
	if symbolFlags&ast.SymbolFlagsValue != 0 {
		SetValueDeclaration(symbol, node)
	}
}

func SetValueDeclaration(symbol *ast.Symbol, node *ast.Node) {
	valueDeclaration := symbol.ValueDeclaration
	if valueDeclaration == nil ||
		isAssignmentDeclaration(valueDeclaration) && !isAssignmentDeclaration(node) ||
		valueDeclaration.Kind != node.Kind && isEffectiveModuleDeclaration(valueDeclaration) {
		// Non-assignment declarations take precedence over assignment declarations and
		// non-namespace declarations take precedence over namespace declarations.
		symbol.ValueDeclaration = node
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

func GetContainerFlags(node *ast.Node) ContainerFlags {
	switch node.Kind {
	case ast.KindClassExpression, ast.KindClassDeclaration, ast.KindEnumDeclaration, ast.KindObjectLiteralExpression, ast.KindTypeLiteral,
		ast.KindJSDocTypeLiteral, ast.KindJsxAttributes:
		return ContainerFlagsIsContainer
	case ast.KindInterfaceDeclaration:
		return ContainerFlagsIsContainer | ContainerFlagsIsInterface
	case ast.KindModuleDeclaration, ast.KindTypeAliasDeclaration, ast.KindMappedType, ast.KindIndexSignature:
		return ContainerFlagsIsContainer | ContainerFlagsHasLocals
	case ast.KindSourceFile:
		return ContainerFlagsIsContainer | ContainerFlagsIsControlFlowContainer | ContainerFlagsHasLocals
	case ast.KindGetAccessor, ast.KindSetAccessor, ast.KindMethodDeclaration:
		if ast.IsObjectLiteralOrClassExpressionMethodOrAccessor(node) {
			return ContainerFlagsIsContainer | ContainerFlagsIsControlFlowContainer | ContainerFlagsHasLocals | ContainerFlagsIsFunctionLike | ContainerFlagsIsObjectLiteralOrClassExpressionMethodOrAccessor
		}
		fallthrough
	case ast.KindConstructor, ast.KindFunctionDeclaration, ast.KindMethodSignature, ast.KindCallSignature, ast.KindJSDocSignature,
		ast.KindFunctionType, ast.KindConstructSignature, ast.KindConstructorType, ast.KindClassStaticBlockDeclaration:
		return ContainerFlagsIsContainer | ContainerFlagsIsControlFlowContainer | ContainerFlagsHasLocals | ContainerFlagsIsFunctionLike
	case ast.KindFunctionExpression, ast.KindArrowFunction:
		return ContainerFlagsIsContainer | ContainerFlagsIsControlFlowContainer | ContainerFlagsHasLocals | ContainerFlagsIsFunctionLike | ContainerFlagsIsFunctionExpression
	case ast.KindModuleBlock:
		return ContainerFlagsIsControlFlowContainer
	case ast.KindPropertyDeclaration:
		if node.AsPropertyDeclaration().Initializer != nil {
			return ContainerFlagsIsControlFlowContainer
		} else {
			return ContainerFlagsNone
		}
	case ast.KindCatchClause, ast.KindForStatement, ast.KindForInStatement, ast.KindForOfStatement, ast.KindCaseBlock:
		return ContainerFlagsIsBlockScopedContainer | ContainerFlagsHasLocals
	case ast.KindBlock:
		if ast.IsFunctionLike(node.Parent) || ast.IsClassStaticBlockDeclaration(node.Parent) {
			return ContainerFlagsNone
		} else {
			return ContainerFlagsIsBlockScopedContainer | ContainerFlagsHasLocals
		}
	}
	return ContainerFlagsNone
}

func isNarrowingExpression(expr *ast.Node) bool {
	switch expr.Kind {
	case ast.KindIdentifier, ast.KindThisKeyword:
		return true
	case ast.KindPropertyAccessExpression, ast.KindElementAccessExpression:
		return containsNarrowableReference(expr)
	case ast.KindCallExpression:
		return hasNarrowableArgument(expr)
	case ast.KindParenthesizedExpression:
		// if isJSDocTypeAssertion(expr) {
		// 	return false
		// }
		return isNarrowingExpression(expr.AsParenthesizedExpression().Expression)
	case ast.KindNonNullExpression:
		return isNarrowingExpression(expr.AsNonNullExpression().Expression)
	case ast.KindBinaryExpression:
		return isNarrowingBinaryExpression(expr.AsBinaryExpression())
	case ast.KindPrefixUnaryExpression:
		return expr.AsPrefixUnaryExpression().Operator == ast.KindExclamationToken && isNarrowingExpression(expr.AsPrefixUnaryExpression().Operand)
	case ast.KindTypeOfExpression:
		return isNarrowingExpression(expr.AsTypeOfExpression().Expression)
	}
	return false
}

func containsNarrowableReference(expr *ast.Node) bool {
	if isNarrowableReference(expr) {
		return true
	}
	if expr.Flags&ast.NodeFlagsOptionalChain != 0 {
		switch expr.Kind {
		case ast.KindPropertyAccessExpression:
			return containsNarrowableReference(expr.AsPropertyAccessExpression().Expression)
		case ast.KindElementAccessExpression:
			return containsNarrowableReference(expr.AsElementAccessExpression().Expression)
		case ast.KindCallExpression:
			return containsNarrowableReference(expr.AsCallExpression().Expression)
		case ast.KindNonNullExpression:
			return containsNarrowableReference(expr.AsNonNullExpression().Expression)
		}
	}
	return false
}

func isNarrowableReference(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindIdentifier, ast.KindThisKeyword, ast.KindSuperKeyword, ast.KindMetaProperty:
		return true
	case ast.KindPropertyAccessExpression:
		return isNarrowableReference(node.AsPropertyAccessExpression().Expression)
	case ast.KindParenthesizedExpression:
		return isNarrowableReference(node.AsParenthesizedExpression().Expression)
	case ast.KindNonNullExpression:
		return isNarrowableReference(node.AsNonNullExpression().Expression)
	case ast.KindElementAccessExpression:
		expr := node.AsElementAccessExpression()
		return ast.IsStringOrNumericLiteralLike(expr.ArgumentExpression) ||
			ast.IsEntityNameExpression(expr.ArgumentExpression) && isNarrowableReference(expr.Expression)
	case ast.KindBinaryExpression:
		expr := node.AsBinaryExpression()
		return expr.OperatorToken.Kind == ast.KindCommaToken && isNarrowableReference(expr.Right) ||
			ast.IsAssignmentOperator(expr.OperatorToken.Kind) && ast.IsLeftHandSideExpression(expr.Left)
	}
	return false
}

func hasNarrowableArgument(expr *ast.Node) bool {
	call := expr.AsCallExpression()
	for _, argument := range call.Arguments.Nodes {
		if containsNarrowableReference(argument) {
			return true
		}
	}
	if ast.IsPropertyAccessExpression(call.Expression) {
		if containsNarrowableReference(call.Expression.AsPropertyAccessExpression().Expression) {
			return true
		}
	}
	return false
}

func isNarrowingBinaryExpression(expr *ast.BinaryExpression) bool {
	switch expr.OperatorToken.Kind {
	case ast.KindEqualsToken, ast.KindBarBarEqualsToken, ast.KindAmpersandAmpersandEqualsToken, ast.KindQuestionQuestionEqualsToken:
		return containsNarrowableReference(expr.Left)
	case ast.KindEqualsEqualsToken, ast.KindExclamationEqualsToken, ast.KindEqualsEqualsEqualsToken, ast.KindExclamationEqualsEqualsToken:
		return isNarrowableOperand(expr.Left) || isNarrowableOperand(expr.Right) ||
			isNarrowingTypeOfOperands(expr.Right, expr.Left) || isNarrowingTypeOfOperands(expr.Left, expr.Right) ||
			(ast.IsBooleanLiteral(expr.Right) && isNarrowingExpression(expr.Left) || ast.IsBooleanLiteral(expr.Left) && isNarrowingExpression(expr.Right))
	case ast.KindInstanceOfKeyword:
		return isNarrowableOperand(expr.Left)
	case ast.KindInKeyword:
		return isNarrowingExpression(expr.Right)
	case ast.KindCommaToken:
		return isNarrowingExpression(expr.Right)
	}
	return false
}

func isNarrowableOperand(expr *ast.Node) bool {
	switch expr.Kind {
	case ast.KindParenthesizedExpression:
		return isNarrowableOperand(expr.AsParenthesizedExpression().Expression)
	case ast.KindBinaryExpression:
		binary := expr.AsBinaryExpression()
		switch binary.OperatorToken.Kind {
		case ast.KindEqualsToken:
			return isNarrowableOperand(binary.Left)
		case ast.KindCommaToken:
			return isNarrowableOperand(binary.Right)
		}
	}
	return containsNarrowableReference(expr)
}

func isNarrowingTypeOfOperands(expr1 *ast.Node, expr2 *ast.Node) bool {
	return ast.IsTypeOfExpression(expr1) && isNarrowableOperand(expr1.AsTypeOfExpression().Expression) && ast.IsStringLiteralLike(expr2)
}

func (b *Binder) errorOnNode(node *ast.Node, message *diagnostics.Message, args ...any) {
	b.addDiagnostic(b.createDiagnosticForNode(node, message, args...))
}

func (b *Binder) errorOnFirstToken(node *ast.Node, message *diagnostics.Message, args ...any) {
	span := scanner.GetRangeOfTokenAtPosition(b.file, node.Pos())
	b.addDiagnostic(ast.NewDiagnostic(b.file, span, message, args...))
}

func (b *Binder) errorOrSuggestionOnNode(isError bool, node *ast.Node, message *diagnostics.Message) {
	b.errorOrSuggestionOnRange(isError, node, node, message)
}

func (b *Binder) errorOrSuggestionOnRange(isError bool, startNode *ast.Node, endNode *ast.Node, message *diagnostics.Message) {
	textRange := core.NewTextRange(scanner.GetRangeOfTokenAtPosition(b.file, startNode.Pos()).Pos(), endNode.End())
	diagnostic := ast.NewDiagnostic(b.file, textRange, message)
	if isError {
		b.addDiagnostic(diagnostic)
	} else {
		diagnostic.SetCategory(diagnostics.CategorySuggestion)
		b.file.BindSuggestionDiagnostics = append(b.file.BindSuggestionDiagnostics, diagnostic)
	}
}

// Inside the binder, we may create a diagnostic for an as-yet unbound node (with potentially no parent pointers, implying no accessible source file)
// If so, the node _must_ be in the current file (as that's the only way anything could have traversed to it to yield it as the error node)
// This version of `createDiagnosticForNode` uses the binder's context to account for this, and always yields correct diagnostics even in these situations.
func (b *Binder) createDiagnosticForNode(node *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	return ast.NewDiagnostic(b.file, GetErrorRangeForNode(b.file, node), message, args...)
}

func (b *Binder) addDiagnostic(diagnostic *ast.Diagnostic) {
	b.file.SetBindDiagnostics(append(b.file.BindDiagnostics(), diagnostic))
}

func setParent(child *ast.Node, parent *ast.Node) {
	if child != nil {
		child.Parent = parent
	}
}

func isSignedNumericLiteral(node *ast.Node) bool {
	if node.Kind == ast.KindPrefixUnaryExpression {
		node := node.AsPrefixUnaryExpression()
		return (node.Operator == ast.KindPlusToken || node.Operator == ast.KindMinusToken) && ast.IsNumericLiteral(node.Operand)
	}
	return false
}

func getOptionalSymbolFlagForNode(node *ast.Node) ast.SymbolFlags {
	postfixToken := getPostfixTokenFromNode(node)
	return core.IfElse(postfixToken != nil && postfixToken.Kind == ast.KindQuestionToken, ast.SymbolFlagsOptional, ast.SymbolFlagsNone)
}

func getPostfixTokenFromNode(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindPropertyDeclaration:
		return node.AsPropertyDeclaration().PostfixToken
	case ast.KindPropertySignature:
		return node.AsPropertySignatureDeclaration().PostfixToken
	case ast.KindMethodDeclaration:
		return node.AsMethodDeclaration().PostfixToken
	case ast.KindMethodSignature:
		return node.AsMethodSignatureDeclaration().PostfixToken
	}
	panic("Unhandled case in getPostfixTokenFromNode")
}

func isAsyncFunction(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindArrowFunction, ast.KindMethodDeclaration:
		data := node.BodyData()
		return data.Body != nil && data.AsteriskToken == nil && ast.HasSyntacticModifier(node, ast.ModifierFlagsAsync)
	}
	return false
}

func isFunctionSymbol(symbol *ast.Symbol) bool {
	d := symbol.ValueDeclaration
	if d != nil {
		if ast.IsFunctionDeclaration(d) {
			return true
		}
		if ast.IsVariableDeclaration(d) {
			varDecl := d.AsVariableDeclaration()
			if varDecl.Initializer != nil {
				return ast.IsFunctionLike(varDecl.Initializer)
			}
		}
	}
	return false
}

func unreachableCodeIsError(options *core.CompilerOptions) bool {
	return options.AllowUnreachableCode == core.TSFalse
}

func unusedLabelIsError(options *core.CompilerOptions) bool {
	return options.AllowUnusedLabels == core.TSFalse
}

func isStatementCondition(node *ast.Node) bool {
	switch node.Parent.Kind {
	case ast.KindIfStatement:
		return node.Parent.AsIfStatement().Expression == node
	case ast.KindWhileStatement:
		return node.Parent.AsWhileStatement().Expression == node
	case ast.KindDoStatement:
		return node.Parent.AsDoStatement().Expression == node
	case ast.KindForStatement:
		return node.Parent.AsForStatement().Condition == node
	case ast.KindConditionalExpression:
		return node.Parent.AsConditionalExpression().Condition == node
	}
	return false
}

func isTopLevelLogicalExpression(node *ast.Node) bool {
	for ast.IsParenthesizedExpression(node.Parent) || ast.IsPrefixUnaryExpression(node.Parent) && node.Parent.AsPrefixUnaryExpression().Operator == ast.KindExclamationToken {
		node = node.Parent
	}
	return !isStatementCondition(node) && !ast.IsLogicalExpression(node.Parent) && !(ast.IsOptionalChain(node.Parent) && node.Parent.Expression() == node)
}

func isAssignmentDeclaration(decl *ast.Node) bool {
	return ast.IsBinaryExpression(decl) || ast.IsAccessExpression(decl) || ast.IsIdentifier(decl) || ast.IsCallExpression(decl)
}

func isEffectiveModuleDeclaration(node *ast.Node) bool {
	return ast.IsModuleDeclaration(node) || ast.IsIdentifier(node)
}

func getErrorRangeForArrowFunction(sourceFile *ast.SourceFile, node *ast.Node) core.TextRange {
	pos := scanner.SkipTrivia(sourceFile.Text, node.Pos())
	body := node.AsArrowFunction().Body
	if body != nil && body.Kind == ast.KindBlock {
		startLine, _ := scanner.GetLineAndCharacterOfPosition(sourceFile, body.Pos())
		endLine, _ := scanner.GetLineAndCharacterOfPosition(sourceFile, body.End())
		if startLine < endLine {
			// The arrow function spans multiple lines,
			// make the error span be the first line, inclusive.
			return core.NewTextRange(pos, scanner.GetEndLinePosition(sourceFile, startLine))
		}
	}
	return core.NewTextRange(pos, node.End())
}

func GetErrorRangeForNode(sourceFile *ast.SourceFile, node *ast.Node) core.TextRange {
	errorNode := node
	switch node.Kind {
	case ast.KindSourceFile:
		pos := scanner.SkipTrivia(sourceFile.Text, 0)
		if pos == len(sourceFile.Text) {
			return core.NewTextRange(0, 0)
		}
		return scanner.GetRangeOfTokenAtPosition(sourceFile, pos)
	// This list is a work in progress. Add missing node kinds to improve their error spans
	case ast.KindVariableDeclaration, ast.KindBindingElement, ast.KindClassDeclaration, ast.KindClassExpression, ast.KindInterfaceDeclaration,
		ast.KindModuleDeclaration, ast.KindEnumDeclaration, ast.KindEnumMember, ast.KindFunctionDeclaration, ast.KindFunctionExpression,
		ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor, ast.KindTypeAliasDeclaration, ast.KindPropertyDeclaration,
		ast.KindPropertySignature, ast.KindNamespaceImport:
		errorNode = ast.GetNameOfDeclaration(node)
	case ast.KindArrowFunction:
		return getErrorRangeForArrowFunction(sourceFile, node)
	case ast.KindCaseClause, ast.KindDefaultClause:
		start := scanner.SkipTrivia(sourceFile.Text, node.Pos())
		end := node.End()
		statements := node.AsCaseOrDefaultClause().Statements.Nodes
		if len(statements) != 0 {
			end = statements[0].Pos()
		}
		return core.NewTextRange(start, end)
	case ast.KindReturnStatement, ast.KindYieldExpression:
		pos := scanner.SkipTrivia(sourceFile.Text, node.Pos())
		return scanner.GetRangeOfTokenAtPosition(sourceFile, pos)
	case ast.KindSatisfiesExpression:
		pos := scanner.SkipTrivia(sourceFile.Text, node.AsSatisfiesExpression().Expression.End())
		return scanner.GetRangeOfTokenAtPosition(sourceFile, pos)
	case ast.KindConstructor:
		scanner := scanner.GetScannerForSourceFile(sourceFile, node.Pos())
		start := scanner.TokenStart()
		for scanner.Token() != ast.KindConstructorKeyword && scanner.Token() != ast.KindStringLiteral && scanner.Token() != ast.KindEndOfFile {
			scanner.Scan()
		}
		return core.NewTextRange(start, scanner.TokenEnd())
		// !!!
		// case KindJSDocSatisfiesTag:
		// 	pos := scanner.SkipTrivia(sourceFile.text, node.tagName.pos)
		// 	return scanner.GetRangeOfTokenAtPosition(sourceFile, pos)
	}
	if errorNode == nil {
		// If we don't have a better node, then just set the error on the first token of
		// construct.
		return scanner.GetRangeOfTokenAtPosition(sourceFile, node.Pos())
	}
	pos := errorNode.Pos()
	if !ast.NodeIsMissing(errorNode) {
		pos = scanner.SkipTrivia(sourceFile.Text, pos)
	}
	return core.NewTextRange(pos, errorNode.End())
}
