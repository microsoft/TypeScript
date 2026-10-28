package ast_test

import (
	"reflect"
	"runtime"
	"slices"
	"strconv"
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
	members := ast.SymbolTableOf("member", member)
	exports := ast.SymbolTableOf("export", export)

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
	assert.Equal(t, symbol.Members().Get("member"), member)
	assert.Equal(t, symbol.Exports().Get("export"), export)
	assert.Equal(t, symbol.Parent(), parent)
	assert.Equal(t, symbol.ExportSymbol(), exportSymbol)

	declarations[0] = otherDeclaration
	assert.Equal(t, symbol.Declarations()[0], otherDeclaration)
	symbol.Declarations()[0] = declaration
	assert.Equal(t, declarations[0], declaration)
	symbol.Members().Set("added", export)
	assert.Equal(t, members.Get("added"), export)
	symbol.Exports().Set("added", member)
	assert.Equal(t, exports.Get("added"), member)

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
	members.Set("member", member)
	assert.Equal(t, symbol.Members().Get("member"), member)
	assert.Equal(t, ast.GetMembers(symbol, &arena).Get("member"), member)

	exports := ast.GetExports(symbol, &arena)
	exports.Set("export", export)
	assert.Equal(t, symbol.Exports().Get("export"), export)
	assert.Equal(t, ast.GetExports(symbol, &arena).Get("export"), export)

	symbol.SetMembers(nil, &arena)
	symbol.SetExports(nil, &arena)
	assert.Assert(t, ast.GetMembers(symbol, &arena) != nil)
	assert.Assert(t, ast.GetExports(symbol, &arena) != nil)
	assert.Equal(t, symbol.Members().Len(), 0)
	assert.Equal(t, symbol.Exports().Len(), 0)
}

func TestSymbolTableGrowthAndClone(t *testing.T) {
	t.Parallel()
	for _, capacity := range []int{0, 1, 4, 5, 17} {
		t.Run(strconv.Itoa(capacity), func(t *testing.T) {
			t.Parallel()
			table := ast.NewSymbolTableWithCapacity(capacity)
			for i := range 40 {
				symbol := ast.NewSymbol()
				symbol.SetName(strconv.Itoa(i))
				table.Set(symbol.Name(), symbol)
				if i != 0 && i != 3 && i != 4 && i != 16 && i != 39 {
					continue
				}
				clone := table.Clone()
				assert.DeepEqual(t, slices.Collect(clone.Keys()), slices.Collect(table.Keys()))
				for key, value := range table.All() {
					assert.Equal(t, clone.Get(key), value)
				}
				replacement := ast.NewSymbol()
				replacement.SetName("replacement")
				clone.Set("0", replacement)
				assert.Assert(t, table.Get("0") != replacement)
				assert.Equal(t, clone.Get("0"), replacement)
				clone.Delete("0")
				assert.Equal(t, clone.Len(), table.Len()-1)
				assert.Assert(t, clone.Get("0") == nil)
				assert.Assert(t, table.Get("0") != nil)
				clone.Set("0", table.Get("0"))
				assert.Equal(t, slices.Collect(clone.Keys())[clone.Len()-1], "0")
			}
		})
	}
	t.Run("zero value", func(t *testing.T) {
		t.Parallel()
		var table ast.SymbolMap
		symbol := ast.NewSymbol()
		symbol.SetName("symbol")
		table.Set(symbol.Name(), symbol)
		assert.Equal(t, table.Get(symbol.Name()), symbol)
		assert.Equal(t, table.Clone().Get(symbol.Name()), symbol)
	})
}

func TestSymbolTableSmallAllocations(t *testing.T) { //nolint:paralleltest
	symbols := make([]*ast.Symbol, 4)
	for i := range symbols {
		symbols[i] = ast.NewSymbol()
		symbols[i].SetName(strconv.Itoa(i))
	}
	var table ast.SymbolTable
	for _, capacity := range []int{0, 1, 4} {
		allocs := testing.AllocsPerRun(10, func() {
			table = ast.NewSymbolTableWithCapacity(capacity)
			for _, symbol := range symbols {
				table.Set(symbol.Name(), symbol)
			}
		})
		assert.Equal(t, allocs, float64(1), "capacity %d", capacity)
	}
	original := table
	allocs := testing.AllocsPerRun(10, func() {
		table = original.Clone()
	})
	assert.Equal(t, allocs, float64(1))
	assert.Equal(t, table.Len(), len(symbols))
}

var symbolTableBenchmarkSink ast.SymbolTable

func BenchmarkSymbolTable(b *testing.B) {
	for _, size := range []int{0, 1, 2, 4, 6, 8, 16, 32, 64} {
		b.Run(strconv.Itoa(size), func(b *testing.B) {
			symbols := make([]*ast.Symbol, size)
			for i := range symbols {
				symbols[i] = ast.NewSymbol()
				symbols[i].SetName(strconv.Itoa(i))
			}
			b.ReportAllocs()
			for b.Loop() {
				table := ast.NewSymbolTable()
				for _, symbol := range symbols {
					table.Set(symbol.Name(), symbol)
				}
				symbolTableBenchmarkSink = table
			}
		})
	}
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
	alias.SetMembers(ast.SymbolTableOf("member", member), &arena)
	symbol.SetExports(ast.SymbolTableOf("export", export), &otherArena)
	alias.SetExportSymbol(export, &otherArena)
	runtime.GC()
	assert.Equal(t, symbol.Members().Get("member"), member)
	assert.Equal(t, alias.Exports().Get("export"), export)
	assert.Equal(t, symbol.ExportSymbol(), export)
	symbol.SetMembers(nil, &otherArena)
	alias.SetExports(nil, &arena)
	symbol.SetExportSymbol(nil, &arena)
	assert.Assert(t, alias.Members() == nil)
	assert.Assert(t, symbol.Exports() == nil)
	assert.Assert(t, alias.ExportSymbol() == nil)
	ast.GetMembers(alias, &otherArena).Set("new", export)
	ast.GetExports(symbol, &arena).Set("new", member)
	for range 1024 {
		ast.NewSymbol().SetExports(ast.SymbolTableOf("export", export), &arena)
	}
	arena = ast.SymbolExtraArena{}
	otherArena = ast.SymbolExtraArena{}
	runtime.GC()
	assert.Equal(t, symbol.Members().Get("new"), export)
	assert.Equal(t, alias.Exports().Get("new"), member)
}
