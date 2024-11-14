// Package printer exports a Printer for pretty-printing TS ASTs and writer interfaces and implementations for using them
// Intended ultimate usage:
//
//		func nodeToInlineStr(node *ast.Node) {
//	   // Reuse singleton single-line writer (TODO: thread safety?)
//		  printer := printer.New({ writer: printer.SingleLineTextWriter, stripComments: true })
//		  printer.printNode(node)
//		  return printer.getText()
//		}
//
// // or
//
//		func nodeToStr(node *ast.Node, options CompilerOptions) {
//	   // create new writer shared for the entire printing operation
//		  printer := printer.New({ writer: printer.NewTextWriter(options.newLine) })
//		  printer.printNode(node)
//		  return printer.getText()
//		}
package printer

import "github.com/microsoft/typescript-go/internal/ast"

// Prints a node into a string - creates its' own text writer to facilitate this - prefer emitter.PrintNode where an emitter is available
func PrintNode(node *ast.Node) string {
	writer := NewTextWriter("\n")
	// printNode(node, writer)
	return writer.getText()
}
