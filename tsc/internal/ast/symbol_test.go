package ast_test

import (
	"reflect"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"gotest.tools/v3/assert"
)

func TestSymbolFieldsArePrivate(t *testing.T) {
	t.Parallel()
	for field := range reflect.TypeFor[ast.Symbol]().Fields() {
		assert.Assert(t, !field.IsExported(), "Symbol field %s must be private", field.Name)
	}
}

func TestSymbolAccessors(t *testing.T) {
	t.Parallel()
	symbol := &ast.Symbol{}
	assert.Equal(t, symbol.Flags(), ast.SymbolFlagsNone)
	assert.Equal(t, symbol.CheckFlags(), ast.CheckFlags(0))
	assert.Equal(t, symbol.Name(), "")
	assert.Assert(t, symbol.Declarations() == nil)
	assert.Assert(t, symbol.ValueDeclaration() == nil)
	assert.Assert(t, symbol.Members() == nil)
	assert.Assert(t, symbol.Exports() == nil)
	assert.Assert(t, symbol.Parent() == nil)
	assert.Assert(t, symbol.ExportSymbol() == nil)

	declaration := &ast.Node{}
	otherDeclaration := &ast.Node{}
	member := &ast.Symbol{}
	export := &ast.Symbol{}
	parent := &ast.Symbol{}
	exportSymbol := &ast.Symbol{}
	declarations := []*ast.Node{declaration}
	members := ast.SymbolTable{"member": member}
	exports := ast.SymbolTable{"export": export}

	symbol.SetFlags(ast.SymbolFlagsClass | ast.SymbolFlagsTransient)
	symbol.SetCheckFlags(ast.CheckFlagsReadonly)
	symbol.SetName("C")
	symbol.SetDeclarations(declarations)
	symbol.SetValueDeclaration(declaration)
	symbol.SetMembers(members)
	symbol.SetExports(exports)
	symbol.SetParent(parent)
	symbol.SetExportSymbol(exportSymbol)

	assert.Equal(t, symbol.Flags(), ast.SymbolFlagsClass|ast.SymbolFlagsTransient)
	assert.Equal(t, symbol.CheckFlags(), ast.CheckFlagsReadonly)
	assert.Equal(t, symbol.Name(), "C")
	assert.Equal(t, symbol.Declarations()[0], declaration)
	assert.Equal(t, symbol.ValueDeclaration(), declaration)
	assert.Equal(t, symbol.Members()["member"], member)
	assert.Equal(t, symbol.Exports()["export"], export)
	assert.Equal(t, symbol.Parent(), parent)
	assert.Equal(t, symbol.ExportSymbol(), exportSymbol)

	declarations[0] = otherDeclaration
	assert.Equal(t, symbol.Declarations()[0], otherDeclaration)
	symbol.Declarations()[0] = declaration
	assert.Equal(t, declarations[0], declaration)
	symbol.Members()["added"] = export
	assert.Equal(t, members["added"], export)
	symbol.Exports()["added"] = member
	assert.Equal(t, exports["added"], member)

	symbol.SetFlags(ast.SymbolFlagsNone)
	symbol.SetCheckFlags(0)
	symbol.SetName("")
	symbol.SetDeclarations(nil)
	symbol.SetValueDeclaration(nil)
	symbol.SetMembers(nil)
	symbol.SetExports(nil)
	symbol.SetParent(nil)
	symbol.SetExportSymbol(nil)

	assert.Equal(t, symbol.Flags(), ast.SymbolFlagsNone)
	assert.Equal(t, symbol.CheckFlags(), ast.CheckFlags(0))
	assert.Equal(t, symbol.Name(), "")
	assert.Assert(t, symbol.Declarations() == nil)
	assert.Assert(t, symbol.ValueDeclaration() == nil)
	assert.Assert(t, symbol.Members() == nil)
	assert.Assert(t, symbol.Exports() == nil)
	assert.Assert(t, symbol.Parent() == nil)
	assert.Assert(t, symbol.ExportSymbol() == nil)
}

func TestSymbolTableInitialization(t *testing.T) {
	t.Parallel()
	symbol := &ast.Symbol{}
	member := &ast.Symbol{}
	export := &ast.Symbol{}

	members := ast.GetMembers(symbol)
	members["member"] = member
	assert.Equal(t, symbol.Members()["member"], member)
	assert.Equal(t, ast.GetMembers(symbol)["member"], member)

	exports := ast.GetExports(symbol)
	exports["export"] = export
	assert.Equal(t, symbol.Exports()["export"], export)
	assert.Equal(t, ast.GetExports(symbol)["export"], export)

	symbol.SetMembers(nil)
	symbol.SetExports(nil)
	assert.Assert(t, ast.GetMembers(symbol) != nil)
	assert.Assert(t, ast.GetExports(symbol) != nil)
	assert.Equal(t, len(symbol.Members()), 0)
	assert.Equal(t, len(symbol.Exports()), 0)
}
