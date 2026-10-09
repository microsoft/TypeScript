package ast_test

import (
	"reflect"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"gotest.tools/v3/assert"
)

func TestSymbolNameInterning(t *testing.T) {
	t.Parallel()
	for _, text := range []string{"", "name", "__call", "\xFEcall", "#private", "\"module\"", "\u03C0"} {
		t.Run(text, func(t *testing.T) {
			t.Parallel()
			name := ast.MakeSymbolName(text)
			otherName := ast.MakeSymbolName(strings.Clone(text))
			symbol := ast.NewSymbol()
			symbol.SetName(name)
			storedName := symbol.Name()
			assert.Assert(t, storedName == otherName)
			assert.Equal(t, storedName.Value(), text)

			table := ast.SymbolTable{name: symbol}
			assert.Equal(t, table[otherName], symbol)
			assert.Equal(t, ast.SymbolNameText(symbol), text)

			shared := ast.NewSymbol()
			shared.SetSymbolData(symbol)
			assert.Assert(t, shared.Name() == otherName)
			shared.SetName(ast.MakeSymbolName(text + "other"))
			assert.Assert(t, symbol.Name() == shared.Name())
		})
	}
	assert.Assert(t, ast.InternalSymbolNameCall != ast.MakeSymbolName("__call"))
	assert.Assert(t, ast.NewSymbol().Name() == ast.MakeSymbolName(""))
	assert.Assert(t, new(ast.SymbolWithData).Initialize().Name() == ast.MakeSymbolName(""))
	assert.Equal(t, reflect.TypeFor[ast.SymbolName]().Name(), "SymbolName")
}

func TestPreinternedSymbolNames(t *testing.T) {
	t.Parallel()
	for text, name := range map[string]ast.SymbolName{
		"":          ast.EmptySymbolName,
		"prototype": ast.SymbolNamePrototype,
		"Symbol":    ast.SymbolNameSymbol,
		"JSX":       ast.SymbolNameJSX,
		"iterator":  ast.SymbolNameIteratorProperty,
		"Iterator":  ast.SymbolNameIterator,
		"unknown":   ast.SymbolNameUnknown,
	} {
		t.Run(text, func(t *testing.T) {
			t.Parallel()
			assert.Assert(t, name == ast.MakeSymbolName(strings.Clone(text)))
			assert.Equal(t, name.Value(), text)
		})
	}
}

func TestSymbolNameMarshaling(t *testing.T) {
	t.Parallel()
	for text, escaped := range map[string]string{
		"":              "",
		"name":          "name",
		"\xFEcall":      "__call",
		"\xFE@iterator": "__@iterator",
		"__call":        "___call",
		"___call":       "____call",
		"\u03C0":        "\u03C0",
	} {
		t.Run(text, func(t *testing.T) {
			t.Parallel()
			name := ast.MakeSymbolName(text)
			assert.Assert(t, !name.IsZero())
			assert.Equal(t, name.String(), text)
			encodedText, err := name.MarshalText()
			assert.NilError(t, err)
			assert.Equal(t, string(encodedText), escaped)
			var decodedText ast.SymbolName
			assert.NilError(t, decodedText.UnmarshalText(encodedText))
			assert.Assert(t, decodedText == name)

			encodedJSON, err := json.Marshal(name)
			assert.NilError(t, err)
			var jsonText string
			assert.NilError(t, json.Unmarshal(encodedJSON, &jsonText))
			assert.Equal(t, jsonText, escaped)
			var decodedJSON ast.SymbolName
			assert.NilError(t, json.Unmarshal(encodedJSON, &decodedJSON))
			assert.Assert(t, decodedJSON == name)

			table := map[ast.SymbolName]int{name: 1}
			encodedTable, err := json.Marshal(table)
			assert.NilError(t, err)
			var decodedTable map[ast.SymbolName]int
			assert.NilError(t, json.Unmarshal(encodedTable, &decodedTable))
			assert.Equal(t, decodedTable[name], 1)
		})
	}
}

func TestUnsetSymbolNameMarshaling(t *testing.T) {
	t.Parallel()
	var name ast.SymbolName
	assert.Assert(t, name.IsZero())
	_, err := name.MarshalText()
	assert.ErrorContains(t, err, "unset")
	data, err := json.Marshal(name)
	assert.NilError(t, err)
	assert.Equal(t, string(data), "null")
	name = ast.EmptySymbolName
	assert.NilError(t, json.Unmarshal(data, &name))
	assert.Assert(t, name.IsZero())
}

func TestInvalidSymbolNameMarshaling(t *testing.T) {
	t.Parallel()
	name := ast.MakeSymbolName("name\xFF")
	_, err := name.MarshalText()
	assert.ErrorContains(t, err, "UTF-8")
	_, err = json.Marshal(name)
	assert.ErrorContains(t, err, "UTF-8")
	assert.ErrorContains(t, name.UnmarshalText([]byte{0xFF}), "UTF-8")
	original := name
	err = json.Unmarshal([]byte("123"), &name)
	assert.Assert(t, err != nil)
	assert.Assert(t, name == original)
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
	members := ast.SymbolTable{ast.MakeSymbolName("member"): member}
	exports := ast.SymbolTable{ast.MakeSymbolName("export"): export}

	symbol.SetFlags(ast.SymbolFlagsClass | ast.SymbolFlagsTransient)
	symbol.SetCheckFlags(ast.CheckFlagsReadonly)
	symbol.SetName(ast.MakeSymbolName("C"))
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
	assert.Equal(t, symbol.Members()[ast.MakeSymbolName("member")], member)
	assert.Equal(t, symbol.Exports()[ast.MakeSymbolName("export")], export)
	assert.Equal(t, symbol.Parent(), parent)
	assert.Equal(t, symbol.ExportSymbol(), exportSymbol)

	declarations[0] = otherDeclaration
	assert.Equal(t, symbol.Declarations()[0], otherDeclaration)
	symbol.Declarations()[0] = declaration
	assert.Equal(t, declarations[0], declaration)
	symbol.Members()[ast.MakeSymbolName("added")] = export
	assert.Equal(t, members[ast.MakeSymbolName("added")], export)
	symbol.Exports()[ast.MakeSymbolName("added")] = member
	assert.Equal(t, exports[ast.MakeSymbolName("added")], member)

	symbol.SetFlags(ast.SymbolFlagsNone)
	symbol.SetCheckFlags(0)
	symbol.SetName(ast.MakeSymbolName(""))
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
	members[ast.MakeSymbolName("member")] = member
	assert.Equal(t, symbol.Members()[ast.MakeSymbolName("member")], member)
	assert.Equal(t, ast.GetMembers(symbol)[ast.MakeSymbolName("member")], member)

	exports := ast.GetExports(symbol)
	exports[ast.MakeSymbolName("export")] = export
	assert.Equal(t, symbol.Exports()[ast.MakeSymbolName("export")], export)
	assert.Equal(t, ast.GetExports(symbol)[ast.MakeSymbolName("export")], export)

	symbol.SetMembers(nil)
	symbol.SetExports(nil)
	assert.Assert(t, ast.GetMembers(symbol) != nil)
	assert.Assert(t, ast.GetExports(symbol) != nil)
	assert.Equal(t, len(symbol.Members()), 0)
	assert.Equal(t, len(symbol.Exports()), 0)
}
