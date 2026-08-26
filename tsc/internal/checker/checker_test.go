package checker_test

import (
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestGetSymbolAtLocation(t *testing.T) {
	t.Parallel()

	content := `interface Foo {
  bar: string;
}
declare const foo: Foo;
foo.bar;`
	fs := vfstest.FromMap(map[string]string{
		"/foo.ts": content,
		"/tsconfig.json": `
				{
					"compilerOptions": {},
					"files": ["foo.ts"]
				}
			`,
	}, false /*useCaseSensitiveFileNames*/)
	fs = bundled.WrapFS(fs)

	cd := "/"
	host := compiler.NewCompilerHost(cd, fs, bundled.LibPath(), nil, nil, nil)

	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, host, nil)
	assert.Equal(t, len(errors), 0, "Expected no errors in parsed command line")

	p := compiler.NewProgram(compiler.ProgramOptions{
		Config: parsed,
		Host:   host,
	})
	p.BindSourceFiles()
	c, done := p.GetTypeChecker(t.Context())
	defer done()
	file := p.GetSourceFile("/foo.ts")
	interfaceId := file.Statements.Nodes[0].Name()
	varId := file.Statements.Nodes[1].AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes[0].Name()
	propAccess := file.Statements.Nodes[2].Expression()
	nodes := []*ast.Node{interfaceId, varId, propAccess}
	for _, node := range nodes {
		symbol := c.GetSymbolAtLocation(node)
		if symbol == nil {
			t.Fatalf("Expected symbol to be non-nil")
		}
	}
}

func TestGetSymbolsInScopePatternAmbientModuleGroups(t *testing.T) {
	t.Parallel()

	content := `declare module "*.variant" with { type: "css" } {
  export const cssOnly: "css";
}
declare module "*.variant" with { type: "text" } {
  export const textOnly: "text";
}
declare module "*.variant" with { type: "css" } {
  export const cssAlso: "css-also";
}
declare module "*.variant" with { type: "text" } {
  export const textAlso: "text-also";
}
const marker = 0;`
	fs := vfstest.FromMap(map[string]string{
		"/foo.ts": content,
		"/tsconfig.json": `
				{
					"compilerOptions": {
						"module": "preserve",
						"moduleResolution": "bundler"
					},
					"files": ["foo.ts"]
				}
			`,
	}, false /*useCaseSensitiveFileNames*/)
	fs = bundled.WrapFS(fs)

	host := compiler.NewCompilerHost("/", fs, bundled.LibPath(), nil, nil, nil)
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, host, nil)
	assert.Equal(t, len(errors), 0, "Expected no errors in parsed command line")

	p := compiler.NewProgram(compiler.ProgramOptions{
		Config: parsed,
		Host:   host,
	})
	p.BindSourceFiles()
	c, done := p.GetTypeChecker(t.Context())
	defer done()
	file := p.GetSourceFile("/foo.ts")
	marker := file.Statements.Nodes[4].AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes[0].Name()

	var groups []string
	for _, symbol := range c.GetSymbolsInScope(marker, ast.SymbolFlagsValueModule) {
		if len(symbol.Declarations) == 0 || !ast.IsModuleWithStringLiteralName(symbol.Declarations[0]) || symbol.Declarations[0].Name().Text() != "*.variant" {
			continue
		}
		assert.Assert(t, strings.HasPrefix(symbol.Name, "\"*.variant\""+ast.InternalSymbolNamePrefix+"pattern@"))
		assert.Assert(t, ast.IsAmbientModuleSymbolName(symbol.Name))
		moduleName, ok := ast.TryGetAmbientModuleNameFromSymbolName(symbol.Name)
		assert.Assert(t, ok)
		assert.Equal(t, moduleName, "*.variant")
		assert.Equal(t, len(symbol.Declarations), 2)
		var exportNames []string
		for _, exported := range c.GetExportsOfModule(symbol) {
			exportNames = append(exportNames, exported.Name)
		}
		slices.Sort(exportNames)
		groups = append(groups, strings.Join(exportNames, ","))
	}
	slices.Sort(groups)
	assert.DeepEqual(t, groups, []string{"cssAlso,cssOnly", "textAlso,textOnly"})
}
