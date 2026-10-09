package binder

import (
	"runtime"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/fixtures"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
	"gotest.tools/v3/assert"
)

func TestBindInternedSymbolNames(t *testing.T) {
	t.Parallel()
	const text = `
export var named = 0;
export var \u006eamed = 1;
export interface Shape {
    (): void;
    "__call": number;
    ["literal"]: number;
    0: number;
}
export { named as renamed };
export default class First { #value = 1; }
export class Second { #value = 2; }
`
	file := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/names.ts",
		PathKey:  tspath.CaseSensitive.PathKey("/names.ts"),
	}, text, core.ScriptKindTS)
	BindSourceFile(file)

	name := ast.MakeSymbolName("named")
	local := file.Locals[name]
	exported := file.Symbol.Exports()[name]
	assert.Assert(t, local != nil && exported != nil)
	assert.Assert(t, local.Name() == name && exported.Name() == name)
	assert.Equal(t, len(local.Declarations()), 2)
	assert.Equal(t, len(exported.Declarations()), 2)
	assert.Equal(t, local.ExportSymbol(), exported)

	members := file.Symbol.Exports()[ast.MakeSymbolName("Shape")].Members()
	for _, name := range []ast.SymbolName{ast.InternalSymbolNameCall, ast.MakeSymbolName("__call"), ast.MakeSymbolName("literal"), ast.MakeSymbolName("0")} {
		assert.Assert(t, members[name] != nil)
		assert.Assert(t, members[name].Name() == name)
	}
	assert.Assert(t, members[ast.InternalSymbolNameCall] != members[ast.MakeSymbolName("__call")])
	assert.Assert(t, file.Symbol.Exports()[ast.MakeSymbolName("renamed")].Name() == ast.MakeSymbolName("renamed"))

	first := file.Symbol.Exports()[ast.InternalSymbolNameDefault]
	second := file.Symbol.Exports()[ast.MakeSymbolName("Second")]
	firstPrivate := GetSymbolNameForPrivateIdentifier(first, "#value")
	secondPrivate := GetSymbolNameForPrivateIdentifier(second, "#value")
	assert.Assert(t, firstPrivate != secondPrivate)
	assert.Assert(t, first.Members()[firstPrivate] != nil)
	assert.Assert(t, second.Members()[secondPrivate] != nil)

	resolver := NameResolver{CompilerOptions: core.EmptyCompilerOptions}
	assert.Equal(t, resolver.Resolve(file.AsNode(), name, ast.SymbolFlagsValue|ast.SymbolFlagsExportValue, nil, false, false), local)
}

func BenchmarkBind(b *testing.B) {
	for _, f := range fixtures.BenchFixtures {
		b.Run(f.Name(), func(b *testing.B) {
			f.SkipIfNotExist(b)

			fileName := tspath.ToRootedFilePath(f.Path(), "/")
			path := osvfs.FS().CaseSensitivity().PathKey(tspath.RootedPath(fileName))
			sourceText := f.ReadFile(b)

			parseOptions := ast.SourceFileParseOptions{
				FileName: fileName,
				PathKey:  path,
			}
			scriptKind := core.GetScriptKindFromFileName(fileName)

			sourceFiles := make([]*ast.SourceFile, b.N)
			for i := range b.N {
				sourceFiles[i] = parser.ParseSourceFile(parseOptions, sourceText, scriptKind)
			}

			// The above parses do a lot of work; ensure GC is finished before we start collecting performance data.
			// GC must be called twice to allow things to settle.
			runtime.GC()
			runtime.GC()

			b.ResetTimer()
			for i := range b.N {
				BindSourceFile(sourceFiles[i])
			}
		})
	}
}
