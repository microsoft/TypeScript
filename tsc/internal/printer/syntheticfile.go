package printer

import (
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
)

// PrintAndPositionNode prints a synthesized node to text using the standard
// change-tracker printer options, trims the trailing newline, and assigns
// positions to the resulting node tree.
// sourceFile may be nil; when non-nil it is passed to the printer for comment
// preservation.
// The returned text is the printed source, and positioned is the node with
// concrete source positions assigned to it and all descendants.
func PrintAndPositionNode(factory *ast.NodeFactory, node *ast.Node, sourceFile *ast.SourceFile, newLine string, indentSize int, emitContext *EmitContext) (text string, positioned *ast.Node) {
	writer := NewChangeTrackerWriter(newLine, indentSize)
	NewPrinter(
		PrinterOptions{
			NewLine:                       core.GetNewLineKind(newLine),
			NeverAsciiEscape:              true,
			PreserveSourceNewlines:        true,
			TerminateUnterminatedLiterals: true,
		},
		writer.GetPrintHandlers(),
		emitContext,
	).Write(node, sourceFile, writer, nil)

	text = writer.String()
	text = strings.TrimSuffix(text, newLine)
	positioned = writer.AssignPositionsToNode(node, factory)
	return text, positioned
}

// CreateSyntheticSourceFile provides text and line maps for formatting a printed
// fragment. The fragment is formatted separately: it need not be a statement and
// must not be added to the source file's statement list.
func CreateSyntheticSourceFile(factory *ast.NodeFactory, text string, parseOptions ast.SourceFileParseOptions) *ast.SourceFile {
	eof := factory.NewToken(ast.KindEndOfFile)
	eof.Loc = core.NewTextRange(len(text), len(text))
	statements := factory.NewNodeList(nil)
	statements.Loc = core.NewTextRange(0, 0)
	syntheticFile := factory.NewSourceFile(
		parseOptions,
		text,
		statements,
		eof,
	)
	syntheticFile.Loc = core.NewTextRange(0, len(text))
	ast.SetParentInChildren(syntheticFile)
	return syntheticFile.AsSourceFile()
}
