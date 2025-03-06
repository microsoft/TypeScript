package parsetestutil

import (
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnosticwriter"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// Simplifies parsing an input string into a SourceFile for testing purposes.
func ParseTypeScript(text string, jsx bool) *ast.SourceFile {
	fileName := core.IfElse(jsx, "/main.tsx", "/main.ts")
	file := parser.ParseSourceFile(fileName, tspath.Path(fileName), text, core.ScriptTargetESNext, scanner.JSDocParsingModeParseNone)
	ast.SetParentInChildren(file.AsNode())
	return file
}

// Asserts that the given file has no parse diagnostics.
func CheckDiagnostics(t *testing.T, file *ast.SourceFile) {
	t.Helper()
	if len(file.Diagnostics()) > 0 {
		var b strings.Builder
		diagnosticwriter.WriteFormatDiagnostics(&b, file.Diagnostics(), &diagnosticwriter.FormattingOptions{
			NewLine: "\n",
		})
		t.Error(b.String())
	}
}

// Asserts that the given file has no parse diagnostics and asserts the given message.
func CheckDiagnosticsMessage(t *testing.T, file *ast.SourceFile, message string) {
	t.Helper()
	if len(file.Diagnostics()) > 0 {
		var b strings.Builder
		diagnosticwriter.WriteFormatDiagnostics(&b, file.Diagnostics(), &diagnosticwriter.FormattingOptions{
			NewLine: "\n",
		})
		t.Error(message + b.String())
	}
}

func newSyntheticRecursiveVisitor() *ast.NodeVisitor {
	var v *ast.NodeVisitor
	v = ast.NewNodeVisitor(
		func(node *ast.Node) *ast.Node {
			return v.VisitEachChild(node)
		},
		&ast.NodeFactory{},
		ast.NodeVisitorHooks{
			VisitNode: func(node *ast.Node, v *ast.NodeVisitor) *ast.Node {
				if node != nil {
					node.Loc = core.UndefinedTextRange()
				}
				return v.VisitNode(node)
			},
			VisitToken: func(node *ast.Node, v *ast.NodeVisitor) *ast.Node {
				if node != nil {
					node.Loc = core.UndefinedTextRange()
				}
				return v.VisitNode(node)
			},
			VisitNodes: func(nodes *ast.NodeList, v *ast.NodeVisitor) *ast.NodeList {
				if nodes != nil {
					nodes.Loc = core.UndefinedTextRange()
				}
				return v.VisitNodes(nodes)
			},
			VisitModifiers: func(nodes *ast.ModifierList, v *ast.NodeVisitor) *ast.ModifierList {
				if nodes != nil {
					nodes.Loc = core.UndefinedTextRange()
				}
				return v.VisitModifiers(nodes)
			},
		},
	)
	return v
}

// Sets the Loc of the given node and every Node in its subtree to an undefined TextRange (-1,-1).
func MarkSyntheticRecursive(node *ast.Node) {
	newSyntheticRecursiveVisitor().VisitNode(node)
}
