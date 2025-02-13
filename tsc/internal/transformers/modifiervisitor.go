package transformers

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
)

type modifierVisitor struct {
	Transformer
	AllowedModifiers ast.ModifierFlags
}

func (v *modifierVisitor) visit(node *ast.Node) *ast.Node {
	flags := ast.ModifierToFlag(node.Kind)
	if flags != ast.ModifierFlagsNone && flags&v.AllowedModifiers == 0 {
		return nil
	}
	return node
}

func extractModifiers(emitContext *printer.EmitContext, modifiers *ast.ModifierList, allowed ast.ModifierFlags) *ast.ModifierList {
	if modifiers == nil {
		return nil
	}
	tx := modifierVisitor{AllowedModifiers: allowed}
	tx.newTransformer(tx.visit, emitContext)
	return tx.visitor.VisitModifiers(modifiers)
}
