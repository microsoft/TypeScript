package estransforms

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/transformers"
)

var newlineNormalizer = strings.NewReplacer("\r\n", "\n", "\r", "\n")

type taggedTemplateTransformer struct {
	transformers.Transformer
	currentSourceFile *ast.SourceFile

	taggedTemplateStringDeclarations []*ast.Node
}

func newTaggedTemplateLiftRestrictionTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
	tx := &taggedTemplateTransformer{}
	return tx.NewTransformer(tx.visit, opts.Context)
}

func (tx *taggedTemplateTransformer) visit(node *ast.Node) *ast.Node {
	if node.SubtreeFacts()&ast.SubtreeContainsInvalidTemplateEscape == 0 {
		return node
	}
	switch node.Kind {
	case ast.KindSourceFile:
		return tx.visitSourceFile(node.AsSourceFile())
	case ast.KindTaggedTemplateExpression:
		return tx.visitTaggedTemplateExpression(node.AsTaggedTemplateExpression())
	default:
		return tx.Visitor().VisitEachChild(node)
	}
}

func (tx *taggedTemplateTransformer) visitSourceFile(node *ast.SourceFile) *ast.Node {
	tx.currentSourceFile = node
	tx.taggedTemplateStringDeclarations = nil
	visited := tx.Visitor().VisitEachChild(node.AsNode())

	if len(tx.taggedTemplateStringDeclarations) > 0 {
		visitedSourceFile := visited.AsSourceFile()
		statements := append(visitedSourceFile.Statements.Nodes[:len(visitedSourceFile.Statements.Nodes):len(visitedSourceFile.Statements.Nodes)],
			tx.Factory().NewVariableStatement(
				nil, /*modifiers*/
				tx.Factory().NewVariableDeclarationList(
					tx.Factory().NewNodeList(tx.taggedTemplateStringDeclarations),
					ast.NodeFlagsNone,
				),
			),
		)
		stmtList := tx.Factory().NewNodeList(statements)
		stmtList.Loc = node.Statements.Loc
		visited = tx.Factory().UpdateSourceFile(visitedSourceFile, stmtList, visitedSourceFile.EndOfFileToken)
	}

	tx.EmitContext().AddEmitHelper(visited, tx.EmitContext().ReadEmitHelpers()...)
	return visited
}

func (tx *taggedTemplateTransformer) visitTaggedTemplateExpression(node *ast.TaggedTemplateExpression) *ast.Node {
	return tx.processTaggedTemplateExpression(node)
}

func (tx *taggedTemplateTransformer) processTaggedTemplateExpression(node *ast.TaggedTemplateExpression) *ast.Node {
	tag := tx.Visitor().VisitNode(node.Tag)
	template := node.Template

	if !hasInvalidEscape(template) {
		return tx.Visitor().VisitEachChild(node.AsNode())
	}

	f := tx.Factory()

	// Build up the template arguments and the raw and cooked strings for the template.
	templateArguments := []*ast.Node{nil} // placeholder for the template object
	var cookedStrings []*ast.Node
	var rawStrings []*ast.Node

	if ast.IsNoSubstitutionTemplateLiteral(template) {
		cookedStrings = append(cookedStrings, createTemplateCooked(f, template.TemplateLiteralLikeData()))
		rawStrings = append(rawStrings, getRawLiteral(f, template))
	} else {
		te := template.AsTemplateExpression()
		cookedStrings = append(cookedStrings, createTemplateCooked(f, te.Head.TemplateLiteralLikeData()))
		rawStrings = append(rawStrings, getRawLiteral(f, te.Head))
		for _, span := range te.TemplateSpans.Nodes {
			ts := span.AsTemplateSpan()
			cookedStrings = append(cookedStrings, createTemplateCooked(f, ts.Literal.TemplateLiteralLikeData()))
			rawStrings = append(rawStrings, getRawLiteral(f, ts.Literal))
			templateArguments = append(templateArguments, tx.Visitor().VisitNode(ts.Expression))
		}
	}

	helperCall := f.NewTemplateObjectHelper(
		f.NewArrayLiteralExpression(f.NewNodeList(cookedStrings), false),
		f.NewArrayLiteralExpression(f.NewNodeList(rawStrings), false),
	)

	// Create a variable to cache the template object if we're in a module.
	// Do not do this in the global scope, as any variable we currently generate could conflict with
	// variables from outside of the current compilation. In the future, we can revisit this behavior.
	if ast.IsExternalModule(tx.currentSourceFile) {
		tempVar := f.NewUniqueName("templateObject")
		tx.taggedTemplateStringDeclarations = append(tx.taggedTemplateStringDeclarations,
			f.NewVariableDeclaration(tempVar, nil, nil, nil),
		)
		templateArguments[0] = f.NewLogicalORExpression(
			tempVar,
			f.NewAssignmentExpression(tempVar, helperCall),
		)
	} else {
		templateArguments[0] = helperCall
	}

	call := f.NewCallExpression(tag, nil /*questionDotToken*/, nil /*typeArguments*/, f.NewNodeList(templateArguments), ast.NodeFlagsNone)
	call.Loc = node.Loc
	return call
}

func createTemplateCooked(f *printer.NodeFactory, template *ast.TemplateLiteralLikeNodeBase) *ast.Node {
	if template.TemplateFlags&ast.TokenFlagsIsInvalid != 0 {
		return f.NewVoidZeroExpression()
	}
	return f.NewStringLiteral(template.Text, ast.TokenFlagsNone)
}

func getRawLiteral(f *printer.NodeFactory, node *ast.Node) *ast.Node {
	text := node.TemplateLiteralLikeData().RawText
	if text == "" {
		text = scanner.GetSourceTextOfNodeFromSourceFile(ast.GetSourceFileOfNode(node), node, false /*includeTrivia*/)
		// text contains the original source, it will also contain quotes ("`"), dollar signs and braces ("${" and "}"),
		// thus we need to remove those characters.
		// First template piece starts with "`", others with "}"
		// Last template piece ends with "`", others with "${"
		isLast := node.Kind == ast.KindNoSubstitutionTemplateLiteral || node.Kind == ast.KindTemplateTail
		endLen := 2
		if isLast {
			endLen = 1
		}
		text = text[1 : len(text)-endLen]
	}

	// Newline normalization:
	// ES6 Spec 11.8.6.1 - Static Semantics of TV's and TRV's
	// <CR><LF> and <CR> LineTerminatorSequences are normalized to <LF> for both TV and TRV.
	text = newlineNormalizer.Replace(text)

	result := f.NewStringLiteral(text, ast.TokenFlagsNone)
	result.Loc = node.Loc
	return result
}

func hasInvalidEscape(template *ast.Node) bool {
	if ast.IsNoSubstitutionTemplateLiteral(template) {
		return template.TemplateLiteralLikeData().TemplateFlags&ast.TokenFlagsContainsInvalidEscape != 0
	}
	te := template.AsTemplateExpression()
	if te.Head.TemplateLiteralLikeData().TemplateFlags&ast.TokenFlagsContainsInvalidEscape != 0 {
		return true
	}
	for _, span := range te.TemplateSpans.Nodes {
		if span.AsTemplateSpan().Literal.TemplateLiteralLikeData().TemplateFlags&ast.TokenFlagsContainsInvalidEscape != 0 {
			return true
		}
	}
	return false
}
