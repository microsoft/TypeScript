package ast_test

import (
	"reflect"
	"strings"
	"testing"
	"unique"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"gotest.tools/v3/assert"
)

func TestSymbolNameInterning(t *testing.T) {
	t.Parallel()
	for _, text := range []string{"", "name", "__call", "\xFEcall", "#private", "\"module\"", "\u03C0"} {
		t.Run(text, func(t *testing.T) {
			t.Parallel()
			name := unique.Make(text)
			otherName := unique.Make(strings.Clone(text))
			symbol := ast.NewSymbol()
			symbol.SetName(name)
			var storedName unique.Handle[string] = symbol.Name()
			assert.Assert(t, storedName == otherName)
			assert.Equal(t, storedName.Value(), text)

			table := ast.SymbolTable{name: symbol}
			assert.Equal(t, table[otherName], symbol)
			assert.Equal(t, ast.SymbolNameText(symbol), text)

			shared := ast.NewSymbol()
			shared.SetSymbolData(symbol)
			assert.Assert(t, shared.Name() == otherName)
			shared.SetName(unique.Make(text + "other"))
			assert.Assert(t, symbol.Name() == shared.Name())
		})
	}
	assert.Assert(t, ast.InternalSymbolNameCall != unique.Make("__call"))
	assert.Assert(t, ast.NewSymbol().Name() == unique.Make(""))
	assert.Assert(t, new(ast.SymbolWithData).Initialize().Name() == unique.Make(""))
}

func TestSymbolFieldsArePrivate(t *testing.T) {
	t.Parallel()
	for field := range reflect.TypeFor[ast.Symbol]().Fields() {
		assert.Assert(t, !field.IsExported(), "Symbol field %s must be private", field.Name)
	}
}

func TestSymbolAccessors(t *testing.T) {
	t.Parallel()
	symbol := ast.NewSymbol()
	assert.Equal(t, symbol.Flags(), ast.SymbolFlagsNone)
	assert.Equal(t, symbol.CheckFlags(), ast.CheckFlags(0))
	assert.Equal(t, symbol.Name().Value(), "")
	assert.Assert(t, symbol.Declarations() == nil)
	assert.Assert(t, symbol.ValueDeclaration() == nil)
	assert.Assert(t, symbol.Members() == nil)
	assert.Assert(t, symbol.Exports() == nil)
	assert.Assert(t, symbol.Parent() == nil)
	assert.Assert(t, symbol.ExportSymbol() == nil)

	declaration := &ast.Node{}
	otherDeclaration := &ast.Node{}
	member := ast.NewSymbol()
	export := ast.NewSymbol()
	parent := ast.NewSymbol()
	exportSymbol := ast.NewSymbol()
	declarations := []*ast.Node{declaration}
	members := ast.SymbolTable{unique.Make("member"): member}
	exports := ast.SymbolTable{unique.Make("export"): export}

	symbol.SetFlags(ast.SymbolFlagsClass | ast.SymbolFlagsTransient)
	symbol.SetCheckFlags(ast.CheckFlagsReadonly)
	symbol.SetName(unique.Make("C"))
	symbol.SetDeclarations(declarations)
	symbol.SetValueDeclaration(declaration)
	symbol.SetMembers(members)
	symbol.SetExports(exports)
	symbol.SetParent(parent)
	symbol.SetExportSymbol(exportSymbol)

	assert.Equal(t, symbol.Flags(), ast.SymbolFlagsClass|ast.SymbolFlagsTransient)
	assert.Equal(t, symbol.CheckFlags(), ast.CheckFlagsReadonly)
	assert.Equal(t, symbol.Name().Value(), "C")
	assert.Equal(t, symbol.Declarations()[0], declaration)
	assert.Equal(t, symbol.ValueDeclaration(), declaration)
	assert.Equal(t, symbol.Members()[unique.Make("member")], member)
	assert.Equal(t, symbol.Exports()[unique.Make("export")], export)
	assert.Equal(t, symbol.Parent(), parent)
	assert.Equal(t, symbol.ExportSymbol(), exportSymbol)

	declarations[0] = otherDeclaration
	assert.Equal(t, symbol.Declarations()[0], otherDeclaration)
	symbol.Declarations()[0] = declaration
	assert.Equal(t, declarations[0], declaration)
	symbol.Members()[unique.Make("added")] = export
	assert.Equal(t, members[unique.Make("added")], export)
	symbol.Exports()[unique.Make("added")] = member
	assert.Equal(t, exports[unique.Make("added")], member)

	symbol.SetFlags(ast.SymbolFlagsNone)
	symbol.SetCheckFlags(0)
	symbol.SetName(unique.Make(""))
	symbol.SetDeclarations(nil)
	symbol.SetValueDeclaration(nil)
	symbol.SetMembers(nil)
	symbol.SetExports(nil)
	symbol.SetParent(nil)
	symbol.SetExportSymbol(nil)

	assert.Equal(t, symbol.Flags(), ast.SymbolFlagsNone)
	assert.Equal(t, symbol.CheckFlags(), ast.CheckFlags(0))
	assert.Equal(t, symbol.Name().Value(), "")
	assert.Assert(t, symbol.Declarations() == nil)
	assert.Assert(t, symbol.ValueDeclaration() == nil)
	assert.Assert(t, symbol.Members() == nil)
	assert.Assert(t, symbol.Exports() == nil)
	assert.Assert(t, symbol.Parent() == nil)
	assert.Assert(t, symbol.ExportSymbol() == nil)
}

func TestSymbolTableInitialization(t *testing.T) {
	t.Parallel()
	symbol := ast.NewSymbol()
	member := ast.NewSymbol()
	export := ast.NewSymbol()

	members := ast.GetMembers(symbol)
	members[unique.Make("member")] = member
	assert.Equal(t, symbol.Members()[unique.Make("member")], member)
	assert.Equal(t, ast.GetMembers(symbol)[unique.Make("member")], member)

	exports := ast.GetExports(symbol)
	exports[unique.Make("export")] = export
	assert.Equal(t, symbol.Exports()[unique.Make("export")], export)
	assert.Equal(t, ast.GetExports(symbol)[unique.Make("export")], export)

	symbol.SetMembers(nil)
	symbol.SetExports(nil)
	assert.Assert(t, ast.GetMembers(symbol) != nil)
	assert.Assert(t, ast.GetExports(symbol) != nil)
	assert.Equal(t, len(symbol.Members()), 0)
	assert.Equal(t, len(symbol.Exports()), 0)
}
