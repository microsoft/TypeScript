package format

import (
	"slices"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

func GetIndentationForNode(n *ast.Node, ignoreActualIndentationRange *core.TextRange, sourceFile *ast.SourceFile, options *FormatCodeSettings) int {
	startline, startpos := scanner.GetECMALineAndCharacterOfPosition(sourceFile, scanner.GetTokenPosOfNode(n, sourceFile, false))
	return getIndentationForNodeWorker(n, startline, startpos, ignoreActualIndentationRange /*indentationDelta*/, 0, sourceFile /*isNextChild*/, false, options)
}

func getIndentationForNodeWorker(
	current *ast.Node,
	currentStartLine int,
	currentStartCharacter int,
	ignoreActualIndentationRange *core.TextRange,
	indentationDelta int,
	sourceFile *ast.SourceFile,
	isNextChild bool,
	options *FormatCodeSettings,
) int {
	parent := current.Parent

	// Walk up the tree and collect indentation for parent-child node pairs. Indentation is not added if
	// * parent and child nodes start on the same line, or
	// * parent is an IfStatement and child starts on the same line as an 'else clause'.
	for parent != nil {
		useActualIndentation := true
		if ignoreActualIndentationRange != nil {
			start := scanner.GetTokenPosOfNode(current, sourceFile, false)
			useActualIndentation = start < ignoreActualIndentationRange.Pos() || start > ignoreActualIndentationRange.End()
		}

		containingListOrParentStartLine, containingListOrParentStartCharacter := getContainingListOrParentStart(parent, current, sourceFile)
		parentAndChildShareLine := containingListOrParentStartLine == currentStartLine ||
			childStartsOnTheSameLineWithElseInIfStatement(parent, current, currentStartLine, sourceFile)

		if useActualIndentation {
			// check if current node is a list item - if yes, take indentation from it
			var firstListChild *ast.Node
			containerList := GetContainingList(current, sourceFile)
			if containerList != nil {
				firstListChild = core.FirstOrNil(containerList.Nodes)
			}
			// A list indents its children if the children begin on a later line than the list itself:
			//
			// f1(               L0 - List start
			//   {               L1 - First child start: indented, along with all other children
			//     prop: 0
			//   },
			//   {
			//     prop: 1
			//   }
			// )
			//
			// f2({             L0 - List start and first child start: children are not indented.
			//   prop: 0             Object properties are indented only one level, because the list
			// }, {                  itself contributes nothing.
			//   prop: 1        L3 - The indentation of the second object literal is best understood by
			// })                    looking at the relationship between the list and *first* list item.
			listLine, _ := getStartLineAndCharacterForNode(firstListChild, sourceFile)
			listIndentsChild := firstListChild != nil && listLine > containingListOrParentStartLine
			actualIndentation := getActualIndentationForListItem(current, sourceFile, options, listIndentsChild)
			if actualIndentation != -1 {
				return actualIndentation + indentationDelta
			}

			// try to fetch actual indentation for current node from source text
			actualIndentation = getActualIndentationForNode(current, parent, currentStartLine, currentStartCharacter, parentAndChildShareLine, sourceFile, options)
			if actualIndentation != -1 {
				return actualIndentation + indentationDelta
			}
		}

		// increase indentation if parent node wants its content to be indented and parent and child nodes don't start on the same line
		if ShouldIndentChildNode(options, parent, current, sourceFile, isNextChild) && !parentAndChildShareLine {
			indentationDelta += options.IndentSize
		}

		// In our AST, a call argument's `parent` is the call-expression, not the argument list.
		// We would like to increase indentation based on the relationship between an argument and its argument-list,
		// so we spoof the starting position of the (parent) call-expression to match the (non-parent) argument-list.
		// But, the spoofed start-value could then cause a problem when comparing the start position of the call-expression
		// to *its* parent (in the case of an iife, an expression statement), adding an extra level of indentation.
		//
		// Instead, when at an argument, we unspoof the starting position of the enclosing call expression
		// *after* applying indentation for the argument.

		useTrueStart := isArgumentAndStartLineOverlapsExpressionBeingCalled(parent, current, currentStartLine, sourceFile)

		current = parent
		parent = current.Parent

		if useTrueStart {
			currentStartLine, currentStartCharacter = scanner.GetECMALineAndCharacterOfPosition(sourceFile, scanner.GetTokenPosOfNode(current, sourceFile, false))
		} else {
			currentStartLine = containingListOrParentStartLine
			currentStartCharacter = containingListOrParentStartCharacter
		}
	}

	return indentationDelta + options.BaseIndentSize
}

/*
* Function returns -1 if actual indentation for node should not be used (i.e because node is nested expression)
 */
func getActualIndentationForNode(current *ast.Node, parent *ast.Node, cuurentLine int, currentChar int, parentAndChildShareLine bool, sourceFile *ast.SourceFile, options *FormatCodeSettings) int {
	// actual indentation is used for statements\declarations if one of cases below is true:
	// - parent is SourceFile - by default immediate children of SourceFile are not indented except when user indents them manually
	// - parent and child are not on the same line
	useActualIndentation := (ast.IsDeclaration(current) || ast.IsStatementButNotDeclaration(current)) && (parent.Kind == ast.KindSourceFile || !parentAndChildShareLine)

	if !useActualIndentation {
		return -1
	}

	return findColumnForFirstNonWhitespaceCharacterInLine(cuurentLine, currentChar, sourceFile, options)
}

func isArgumentAndStartLineOverlapsExpressionBeingCalled(parent *ast.Node, child *ast.Node, childStartLine int, sourceFile *ast.SourceFile) bool {
	if !(ast.IsCallExpression(child) && slices.Contains(parent.AsCallExpression().Arguments.Nodes, child)) {
		return false
	}
	expressionOfCallExpressionEnd := parent.Expression().End()
	expressionOfCallExpressionEndLine, _ := scanner.GetECMALineAndCharacterOfPosition(sourceFile, expressionOfCallExpressionEnd)
	return expressionOfCallExpressionEndLine == childStartLine
}

func getActualIndentationForListItem(node *ast.Node, sourceFile *ast.SourceFile, options *FormatCodeSettings, listIndentsChild bool) int {
	if node.Parent != nil && node.Parent.Kind == ast.KindVariableDeclarationList {
		// VariableDeclarationList has no wrapping tokens
		return -1
	}
	containingList := GetContainingList(node, sourceFile)
	if containingList != nil {
		index := core.FindIndex(containingList.Nodes, func(e *ast.Node) bool { return e == node })
		if index != -1 {
			result := deriveActualIndentationFromList(containingList, index, sourceFile, options)
			if result != -1 {
				return result
			}
		}
		delta := 0
		if listIndentsChild {
			delta = options.IndentSize
		}
		res := getActualIndentationForListStartLine(containingList, sourceFile, options)
		if res == -1 {
			return delta
		}
		return res + delta
	}
	return -1
}

func getActualIndentationForListStartLine(list *ast.NodeList, sourceFile *ast.SourceFile, options *FormatCodeSettings) int {
	if list == nil {
		return -1
	}
	line, char := scanner.GetECMALineAndCharacterOfPosition(sourceFile, list.Loc.Pos())
	return findColumnForFirstNonWhitespaceCharacterInLine(line, char, sourceFile, options)
}

func deriveActualIndentationFromList(list *ast.NodeList, index int, sourceFile *ast.SourceFile, options *FormatCodeSettings) int {
	debug.Assert(list != nil && index >= 0 && index < len(list.Nodes))

	node := list.Nodes[index]

	// walk toward the start of the list starting from current node and check if the line is the same for all items.
	// if end line for item [i - 1] differs from the start line for item [i] - find column of the first non-whitespace character on the line of item [i]

	line, char := getStartLineAndCharacterForNode(node, sourceFile)

	for i := index; i >= 0; i-- {
		if list.Nodes[i].Kind == ast.KindCommaToken {
			continue
		}
		// skip list items that ends on the same line with the current list element
		prevEndLine, _ := scanner.GetECMALineAndCharacterOfPosition(sourceFile, list.Nodes[i].End())
		if prevEndLine != line {
			return findColumnForFirstNonWhitespaceCharacterInLine(line, char, sourceFile, options)
		}

		line, char = getStartLineAndCharacterForNode(list.Nodes[i], sourceFile)
	}
	return -1
}

func findColumnForFirstNonWhitespaceCharacterInLine(line int, char int, sourceFile *ast.SourceFile, options *FormatCodeSettings) int {
	lineStart := scanner.GetECMAPositionOfLineAndCharacter(sourceFile, line, 0)
	return FindFirstNonWhitespaceColumn(lineStart, lineStart+char, sourceFile, options)
}

func FindFirstNonWhitespaceColumn(startPos int, endPos int, sourceFile *ast.SourceFile, options *FormatCodeSettings) int {
	_, col := findFirstNonWhitespaceCharacterAndColumn(startPos, endPos, sourceFile, options)
	return col
}

/**
* Character is the actual index of the character since the beginning of the line.
* Column - position of the character after expanding tabs to spaces.
* "0\t2$"
* value of 'character' for '$' is 3
* value of 'column' for '$' is 6 (assuming that tab size is 4)
 */
func findFirstNonWhitespaceCharacterAndColumn(startPos int, endPos int, sourceFile *ast.SourceFile, options *FormatCodeSettings) (character int, column int) {
	character = 0
	column = 0
	text := sourceFile.Text()
	for pos := startPos; pos < endPos; pos++ {
		ch, size := utf8.DecodeRuneInString(text[pos:])
		if size == 0 && ch == utf8.RuneError {
			continue // multibyte character - TODO: recognize non-tab multicolumn characters? ideographic space?
		}
		if !stringutil.IsWhiteSpaceSingleLine(ch) {
			break
		}

		if ch == '\t' {
			column += options.TabSize + (column % options.TabSize)
		} else {
			column++
		}

		character++
	}
	return character, column
}

func childStartsOnTheSameLineWithElseInIfStatement(parent *ast.Node, child *ast.Node, childStartLine int, sourceFile *ast.SourceFile) bool {
	if parent.Kind == ast.KindIfStatement && parent.AsIfStatement().ElseStatement == child {
		elseKeyword := astnav.FindPrecedingToken(sourceFile, child.Pos())
		debug.AssertIsDefined(elseKeyword)
		elseKeywordStartLine, _ := getStartLineAndCharacterForNode(elseKeyword, sourceFile)
		return elseKeywordStartLine == childStartLine
	}
	return false
}

func getStartLineAndCharacterForNode(n *ast.Node, sourceFile *ast.SourceFile) (line int, character int) {
	return scanner.GetECMALineAndCharacterOfPosition(sourceFile, scanner.GetTokenPosOfNode(n, sourceFile, false))
}

func GetContainingList(node *ast.Node, sourceFile *ast.SourceFile) *ast.NodeList {
	if node.Parent == nil {
		return nil
	}
	return getListByRange(scanner.GetTokenPosOfNode(node, sourceFile, false), node.End(), node.Parent, sourceFile)
}

func getListByPosition(pos int, node *ast.Node, sourceFile *ast.SourceFile) *ast.NodeList {
	if node == nil {
		return nil
	}
	return getListByRange(pos, pos, node, sourceFile)
}

func getListByRange(start int, end int, node *ast.Node, sourceFile *ast.SourceFile) *ast.NodeList {
	r := core.NewTextRange(start, end)
	switch node.Kind {
	case ast.KindTypeReference:
		return getList(node.AsTypeReferenceNode().TypeArguments, r, node, sourceFile)
	case ast.KindObjectLiteralExpression:
		return getList(node.AsObjectLiteralExpression().Properties, r, node, sourceFile)
	case ast.KindArrayLiteralExpression:
		return getList(node.AsArrayLiteralExpression().Elements, r, node, sourceFile)
	case ast.KindTypeLiteral:
		return getList(node.AsTypeLiteralNode().Members, r, node, sourceFile)
	case ast.KindFunctionDeclaration,
		ast.KindFunctionExpression,
		ast.KindArrowFunction,
		ast.KindMethodDeclaration,
		ast.KindMethodSignature,
		ast.KindCallSignature,
		ast.KindConstructor,
		ast.KindConstructorType,
		ast.KindConstructSignature:
		tpl := getList(node.TypeParameterList(), r, node, sourceFile)
		if tpl != nil {
			return tpl
		}
		return getList(node.ParameterList(), r, node, sourceFile)
	case ast.KindGetAccessor:
		return getList(node.ParameterList(), r, node, sourceFile)
	case ast.KindClassDeclaration,
		ast.KindClassExpression,
		ast.KindInterfaceDeclaration,
		ast.KindTypeAliasDeclaration,
		ast.KindJSDocTemplateTag:
		return getList(node.TypeParameterList(), r, node, sourceFile)
	case ast.KindNewExpression, ast.KindCallExpression:
		l := getList(node.TypeArgumentList(), r, node, sourceFile)
		if l != nil {
			return l
		}
		return getList(node.ArgumentList(), r, node, sourceFile)
	case ast.KindVariableDeclarationList:
		return getList(node.AsVariableDeclarationList().Declarations, r, node, sourceFile)
	case ast.KindNamedImports:
		return getList(node.AsNamedImports().Elements, r, node, sourceFile)
	case ast.KindNamedExports:
		return getList(node.AsNamedExports().Elements, r, node, sourceFile)
	case ast.KindObjectBindingPattern, ast.KindArrayBindingPattern:
		return getList(node.AsBindingPattern().Elements, r, node, sourceFile)
	}
	return nil // TODO: should this be a panic? It isn't in strada.
}

func getList(list *ast.NodeList, r core.TextRange, node *ast.Node, sourceFile *ast.SourceFile) *ast.NodeList {
	if list == nil {
		return nil
	}
	if r.ContainedBy(getVisualListRange(node, list.Loc, sourceFile)) {
		return list
	}
	return nil
}

func getVisualListRange(node *ast.Node, list core.TextRange, sourceFile *ast.SourceFile) core.TextRange {
	// In strada, this relied on the services .getChildren method, which manifested synthetic token nodes
	// _however_, the logic boils down to "find the child with the matching span and adjust its start to the
	// previous (possibly token) child's end and its end to the token start of the following element" - basically
	// expanding the range to encompass all the neighboring non-token trivia
	// Now, we perform that logic with the scanner instead
	prior := astnav.FindPrecedingToken(sourceFile, list.Pos())
	var priorEnd int
	if prior == nil {
		priorEnd = list.Pos()
	} else {
		priorEnd = prior.End()
	}
	next := astnav.FindNextToken(prior, node, sourceFile)
	var nextStart int
	if next == nil {
		nextStart = list.End()
	} else {
		nextStart = next.Pos()
	}
	return core.NewTextRange(priorEnd, nextStart)
}

func getContainingListOrParentStart(parent *ast.Node, child *ast.Node, sourceFile *ast.SourceFile) (line int, character int) {
	containingList := GetContainingList(child, sourceFile)
	var startPos int
	if containingList != nil {
		startPos = containingList.Loc.Pos()
	} else {
		startPos = scanner.GetTokenPosOfNode(parent, sourceFile, false)
	}
	return scanner.GetECMALineAndCharacterOfPosition(sourceFile, startPos)
}

func isControlFlowEndingStatement(kind ast.Kind, parentKind ast.Kind) bool {
	switch kind {
	case ast.KindReturnStatement, ast.KindThrowStatement, ast.KindContinueStatement, ast.KindBreakStatement:
		return parentKind != ast.KindBlock
	default:
		return false
	}
}

/**
* True when the parent node should indent the given child by an explicit rule.
* @param isNextChild If true, we are judging indent of a hypothetical child *after* this one, not the current child.
 */
func ShouldIndentChildNode(settings *FormatCodeSettings, parent *ast.Node, child *ast.Node, sourceFile *ast.SourceFile, isNextChildArg ...bool) bool {
	isNextChild := false
	if len(isNextChildArg) > 0 {
		isNextChild = isNextChildArg[0]
	}

	return NodeWillIndentChild(settings, parent, child, sourceFile, false) && !(isNextChild && child != nil && isControlFlowEndingStatement(child.Kind, parent.Kind))
}

func NodeWillIndentChild(settings *FormatCodeSettings, parent *ast.Node, child *ast.Node, sourceFile *ast.SourceFile, indentByDefault bool) bool {
	childKind := ast.KindUnknown
	if child != nil {
		childKind = child.Kind
	}

	switch parent.Kind {
	case ast.KindExpressionStatement,
		ast.KindClassDeclaration,
		ast.KindClassExpression,
		ast.KindInterfaceDeclaration,
		ast.KindEnumDeclaration,
		ast.KindTypeAliasDeclaration,
		ast.KindArrayLiteralExpression,
		ast.KindBlock,
		ast.KindModuleBlock,
		ast.KindObjectLiteralExpression,
		ast.KindTypeLiteral,
		ast.KindMappedType,
		ast.KindTupleType,
		ast.KindParenthesizedExpression,
		ast.KindPropertyAccessExpression,
		ast.KindCallExpression,
		ast.KindNewExpression,
		ast.KindVariableStatement,
		ast.KindExportAssignment,
		ast.KindReturnStatement,
		ast.KindConditionalExpression,
		ast.KindArrayBindingPattern,
		ast.KindObjectBindingPattern,
		ast.KindJsxOpeningElement,
		ast.KindJsxOpeningFragment,
		ast.KindJsxSelfClosingElement,
		ast.KindJsxExpression,
		ast.KindMethodSignature,
		ast.KindCallSignature,
		ast.KindConstructSignature,
		ast.KindParameter,
		ast.KindFunctionType,
		ast.KindConstructorType,
		ast.KindParenthesizedType,
		ast.KindTaggedTemplateExpression,
		ast.KindAwaitExpression,
		ast.KindNamedExports,
		ast.KindNamedImports,
		ast.KindExportSpecifier,
		ast.KindImportSpecifier,
		ast.KindPropertyDeclaration,
		ast.KindCaseClause,
		ast.KindDefaultClause:
		return true
	case ast.KindCaseBlock:
		return settings.IndentSwitchCase.IsTrueOrUnknown()
	case ast.KindVariableDeclaration, ast.KindPropertyAssignment, ast.KindBinaryExpression:
		if settings.IndentMultiLineObjectLiteralBeginningOnBlankLine.IsFalseOrUnknown() && sourceFile != nil && childKind == ast.KindObjectLiteralExpression {
			return rangeIsOnOneLine(child.Loc, sourceFile)
		}
		if parent.Kind == ast.KindBinaryExpression && sourceFile != nil && childKind == ast.KindJsxElement {
			parentStartLine, _ := scanner.GetECMALineAndCharacterOfPosition(sourceFile, scanner.SkipTrivia(sourceFile.Text(), parent.Pos()))
			childStartLine, _ := scanner.GetECMALineAndCharacterOfPosition(sourceFile, scanner.SkipTrivia(sourceFile.Text(), child.Pos()))
			return parentStartLine != childStartLine
		}
		if parent.Kind != ast.KindBinaryExpression {
			return true
		}
		return indentByDefault
	case ast.KindDoStatement,
		ast.KindWhileStatement,
		ast.KindForInStatement,
		ast.KindForOfStatement,
		ast.KindForStatement,
		ast.KindIfStatement,
		ast.KindFunctionDeclaration,
		ast.KindFunctionExpression,
		ast.KindMethodDeclaration,
		ast.KindConstructor,
		ast.KindGetAccessor,
		ast.KindSetAccessor:
		return childKind != ast.KindBlock
	case ast.KindArrowFunction:
		if sourceFile != nil && childKind == ast.KindParenthesizedExpression {
			return rangeIsOnOneLine(child.Loc, sourceFile)
		}
		return childKind != ast.KindBlock
	case ast.KindExportDeclaration:
		return childKind != ast.KindNamedExports
	case ast.KindImportDeclaration:
		return childKind != ast.KindImportClause || (child.AsImportClause().NamedBindings != nil && child.AsImportClause().NamedBindings.Kind != ast.KindNamedImports)
	case ast.KindJsxElement:
		return childKind != ast.KindJsxClosingElement
	case ast.KindJsxFragment:
		return childKind != ast.KindJsxClosingFragment
	case ast.KindIntersectionType, ast.KindUnionType, ast.KindSatisfiesExpression:
		if childKind == ast.KindTypeLiteral || childKind == ast.KindTupleType || childKind == ast.KindMappedType {
			return false
		}
		return indentByDefault
	case ast.KindTryStatement:
		if childKind == ast.KindBlock {
			return false
		}
		return indentByDefault
	}

	// No explicit rule for given nodes so the result will follow the default value argument
	return indentByDefault
}

// A multiline conditional typically increases the indentation of its whenTrue and whenFalse children:
//
// condition
//
//	? whenTrue
//	: whenFalse;
//
// However, that indentation does not apply if the subexpressions themselves span multiple lines,
// applying their own indentation:
//
//	(() => {
//	  return complexCalculationForCondition();
//	})() ? {
//
//	  whenTrue: 'multiline object literal'
//	} : (
//
//	whenFalse('multiline parenthesized expression')
//
// );
//
// In these cases, we must discard the indentation increase that would otherwise be applied to the
// whenTrue and whenFalse children to avoid double-indenting their contents. To identify this scenario,
// we check for the whenTrue branch beginning on the line that the condition ends, and the whenFalse
// branch beginning on the line that the whenTrue branch ends.
func childIsUnindentedBranchOfConditionalExpression(parent *ast.Node, child *ast.Node, childStartLine int, sourceFile *ast.SourceFile) bool {
	if parent.Kind == ast.KindConditionalExpression && (child == parent.AsConditionalExpression().WhenTrue || child == parent.AsConditionalExpression().WhenFalse) {
		conditionEndLine, _ := scanner.GetECMALineAndCharacterOfPosition(sourceFile, parent.AsConditionalExpression().Condition.End())
		if child == parent.AsConditionalExpression().WhenTrue {
			return childStartLine == conditionEndLine
		} else {
			// On the whenFalse side, we have to look at the whenTrue side, because if that one was
			// indented, whenFalse must also be indented:
			//
			// const y = true
			//   ? 1 : (          L1: whenTrue indented because it's on a new line
			//     0              L2: indented two stops, one because whenTrue was indented
			//   );                   and one because of the parentheses spanning multiple lines
			trueStartLine, _ := getStartLineAndCharacterForNode(parent.AsConditionalExpression().WhenTrue, sourceFile)
			trueEndLine, _ := scanner.GetECMALineAndCharacterOfPosition(sourceFile, parent.AsConditionalExpression().WhenTrue.End())
			return conditionEndLine == trueStartLine && trueEndLine == childStartLine
		}
	}
	return false
}

func argumentStartsOnSameLineAsPreviousArgument(parent *ast.Node, child *ast.Node, childStartLine int, sourceFile *ast.SourceFile) bool {
	if ast.IsCallExpression(parent) || ast.IsNewExpression(parent) {
		if len(parent.Arguments()) == 0 {
			return false
		}
		currentIndex := core.FindIndex(parent.Arguments(), func(n *ast.Node) bool { return n == child })
		if currentIndex == -1 {
			// If it's not one of the arguments, don't look past this
			return false
		}
		if currentIndex == 0 {
			return false // Can't look at previous node if first
		}

		previousNode := parent.Arguments()[currentIndex-1]
		lineOfPreviousNode, _ := scanner.GetECMALineAndCharacterOfPosition(sourceFile, previousNode.End())
		if childStartLine == lineOfPreviousNode {
			return true
		}
	}
	return false
}
