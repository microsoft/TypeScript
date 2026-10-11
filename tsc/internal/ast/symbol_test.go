package ast_test

import (
	"reflect"
	"runtime"
	"testing"
	"unsafe"

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
	var arena ast.SymbolExtraArena
	symbol := ast.NewSymbol()
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
	member := ast.NewSymbol()
	export := ast.NewSymbol()
	parent := ast.NewSymbol()
	exportSymbol := ast.NewSymbol()
	declarations := []*ast.Node{declaration}
	members := ast.SymbolTable{"member": member}
	exports := ast.SymbolTable{"export": export}

	symbol.SetFlags(ast.SymbolFlagsClass | ast.SymbolFlagsTransient)
	symbol.SetCheckFlags(ast.CheckFlagsReadonly)
	symbol.SetName("C")
	symbol.SetDeclarations(declarations)
	symbol.SetValueDeclaration(declaration)
	symbol.SetMembers(members, &arena)
	symbol.SetExports(exports, &arena)
	symbol.SetParent(parent)
	symbol.SetExportSymbol(exportSymbol, &arena)

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
	symbol.SetMembers(nil, &arena)
	symbol.SetExports(nil, &arena)
	symbol.SetParent(nil)
	symbol.SetExportSymbol(nil, &arena)

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
	var arena ast.SymbolExtraArena
	symbol := ast.NewSymbol()
	member := ast.NewSymbol()
	export := ast.NewSymbol()

	members := ast.GetMembers(symbol, &arena)
	members["member"] = member
	assert.Equal(t, symbol.Members()["member"], member)
	assert.Equal(t, ast.GetMembers(symbol, &arena)["member"], member)

	exports := ast.GetExports(symbol, &arena)
	exports["export"] = export
	assert.Equal(t, symbol.Exports()["export"], export)
	assert.Equal(t, ast.GetExports(symbol, &arena)["export"], export)

	symbol.SetMembers(nil, &arena)
	symbol.SetExports(nil, &arena)
	assert.Assert(t, ast.GetMembers(symbol, &arena) != nil)
	assert.Assert(t, ast.GetExports(symbol, &arena) != nil)
	assert.Equal(t, len(symbol.Members()), 0)
	assert.Equal(t, len(symbol.Exports()), 0)
}

func TestSymbolHotRecordLayout(t *testing.T) {
	t.Parallel()
	assert.Equal(t, unsafe.Sizeof(ast.SymbolWithData{}), unsafe.Sizeof(ast.Symbol{})+8*unsafe.Sizeof((*ast.Node)(nil)))
}

func TestSymbolNilExtraFieldsDoNotAllocate(t *testing.T) { //nolint:paralleltest
	var arena ast.SymbolExtraArena
	symbol := ast.NewSymbol()
	allocs := testing.AllocsPerRun(10, func() {
		symbol.SetMembers(nil, &arena)
		symbol.SetExports(nil, &arena)
		symbol.SetExportSymbol(nil, &arena)
	})
	assert.Equal(t, allocs, float64(0))
	assert.Assert(t, reflect.ValueOf(symbol).Elem().FieldByName("data").Elem().FieldByName("extra").IsNil())
}

func TestSymbolSharedExtraData(t *testing.T) {
	t.Parallel()
	var arena ast.SymbolExtraArena
	var otherArena ast.SymbolExtraArena
	symbol := ast.NewSymbol()
	alias := ast.NewSymbol()
	alias.SetSymbolData(symbol)
	member := ast.NewSymbol()
	export := ast.NewSymbol()
	alias.SetMembers(ast.SymbolTable{"member": member}, &arena)
	symbol.SetExports(ast.SymbolTable{"export": export}, &otherArena)
	alias.SetExportSymbol(export, &otherArena)
	runtime.GC()
	assert.Equal(t, symbol.Members()["member"], member)
	assert.Equal(t, alias.Exports()["export"], export)
	assert.Equal(t, symbol.ExportSymbol(), export)
	symbol.SetMembers(nil, &otherArena)
	alias.SetExports(nil, &arena)
	symbol.SetExportSymbol(nil, &arena)
	assert.Assert(t, alias.Members() == nil)
	assert.Assert(t, symbol.Exports() == nil)
	assert.Assert(t, alias.ExportSymbol() == nil)
	ast.GetMembers(alias, &otherArena)["new"] = export
	ast.GetExports(symbol, &arena)["new"] = member
	for range 1024 {
		ast.NewSymbol().SetExports(ast.SymbolTable{"export": export}, &arena)
	}
	arena = ast.SymbolExtraArena{}
	otherArena = ast.SymbolExtraArena{}
	runtime.GC()
	assert.Equal(t, symbol.Members()["new"], export)
	assert.Equal(t, alias.Exports()["new"], member)
}
