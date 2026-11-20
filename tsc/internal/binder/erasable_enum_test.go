package binder

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
)

func TestErasableEnumSymbols(t *testing.T) {
	t.Parallel()
	for _, prefix := range []string{"", "export "} {
		t.Run(prefix, func(t *testing.T) {
			t.Parallel()
			file := parser.ParseSourceFile(ast.SourceFileParseOptions{FileName: "/main.ts"}, prefix+`const E: enum = { A: 1, B: "b" };`, core.ScriptKindTS)
			BindSourceFile(file)
			if len(file.Diagnostics()) != 0 || len(file.BindDiagnostics()) != 0 {
				t.Fatalf("unexpected diagnostics: parse=%v, bind=%v", file.Diagnostics(), file.BindDiagnostics())
			}
			declaration := file.Statements.Nodes[0].AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes[0]
			literal := declaration.Initializer()
			symbol := declaration.Symbol()
			if symbol == literal.Symbol() || symbol.Flags() != ast.SymbolFlagsBlockScopedVariable|ast.SymbolFlagsErasableEnum || symbol.ValueDeclaration() != declaration {
				t.Fatal("the variable must have its own erasable enum symbol")
			}
			if len(symbol.Declarations()) != 1 || literal.Symbol().Flags() != ast.SymbolFlagsObjectLiteral {
				t.Fatal("the initializer must retain its ordinary object symbol")
			}
			for _, member := range literal.AsObjectLiteralExpression().Properties.Nodes {
				if symbol.Exports().Get(member.Name().Text()) != member.Symbol() || member.Symbol().Parent() != symbol || member.Symbol().Flags() != ast.SymbolFlagsEnumMember {
					t.Fatalf("member %s was not bound to the enum", member.Name().Text())
				}
			}
			if prefix != "" && file.Symbol.Exports().Get("E") != symbol {
				t.Fatal("the module export must retain the erasable enum declaration symbol")
			}
		})
	}
}

func TestErasableEnumCannotMergeValues(t *testing.T) {
	t.Parallel()
	for _, source := range []string{
		`const E: enum = { A: 1 }; enum E { B = 2 }`,
		`enum E { B = 2 } const E: enum = { A: 1 };`,
		`const E: enum = { A: 1 }; namespace E { export const B = 2; }`,
		`export const E: enum = { A: 1 }; export enum E { B = 2 }`,
	} {
		t.Run(source, func(t *testing.T) {
			t.Parallel()
			file := parser.ParseSourceFile(ast.SourceFileParseOptions{FileName: "/main.ts"}, source, core.ScriptKindTS)
			BindSourceFile(file)
			if len(file.Diagnostics()) != 0 {
				t.Fatalf("unexpected parse diagnostics: %v", file.Diagnostics())
			}
			if len(file.BindDiagnostics()) == 0 {
				t.Fatal("expected duplicate declaration diagnostics")
			}
		})
	}
}

func TestErasableEnumDuplicatePropertyBinding(t *testing.T) {
	t.Parallel()
	for _, properties := range []string{
		`A: 1, A: 2`,
		`A: 1, ["A"]: 2`,
		`["A"]: 1, A: 2`,
		`A: 1, A`,
		`A, A: 1`,
		`A: 1, A() {}`,
	} {
		t.Run(properties, func(t *testing.T) {
			t.Parallel()
			file := parser.ParseSourceFile(ast.SourceFileParseOptions{FileName: "/main.ts"}, `const A = 1; const E: enum = { `+properties+` };`, core.ScriptKindTS)
			BindSourceFile(file)
			if len(file.Diagnostics()) != 0 {
				t.Fatal(file.Diagnostics())
			}
			owner := file.Statements.Nodes[1].AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes[0].Symbol()
			member := owner.Exports().Get("A")
			if member == nil || member.Parent() != owner || member.Flags() != ast.SymbolFlagsEnumMember {
				t.Fatal("an explicit member must retain its erasable enum owner")
			}
		})
	}
}
