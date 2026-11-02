package checker

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
)

func (c *Checker) CheckTypeArgumentsForTest(signature *Signature, typeArgumentNodes []*ast.Node, headMessage *diagnostics.Message) []*ast.Diagnostic {
	c.checkTypeArguments(signature, typeArgumentNodes, true, headMessage)
	return c.diagnostics.GetDiagnostics()
}
