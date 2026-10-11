package checker_test

import (
	"fmt"
	"path/filepath"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/repo"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
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
	}, tspath.CaseInsensitive /*caseSensitivity*/)
	fs = bundled.WrapFS(fs)

	host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, fs, nil)
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

func TestGetTypeAtLocationOfTypeOnlyImportClause(t *testing.T) {
	t.Parallel()

	fs := vfstest.FromMap(map[string]string{
		"/types.ts": `export type U = number;
export default interface D { x: number }`,
		"/main.ts": `import type { U } from "./types";
import type * as types from "./types";
import { U as V } from "./types";
import type D from "./types";
export const u: U = 1;
export const v: V = 1;
export type W = types.U;
export type E = D;`,
		"/tsconfig.json": `
				{
					"compilerOptions": {},
					"files": ["types.ts", "main.ts"]
				}
			`,
	}, tspath.CaseInsensitive)
	fs = bundled.WrapFS(fs)

	host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)

	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, fs, nil)
	assert.Equal(t, len(errors), 0, "Expected no errors in parsed command line")

	p := compiler.NewProgram(compiler.ProgramOptions{
		Config: parsed,
		Host:   host,
	})
	p.BindSourceFiles()
	c, done := p.GetTypeChecker(t.Context())
	defer done()
	file := p.GetSourceFile("/main.ts")
	importClauseAt := func(index int) *ast.Node {
		return file.Statements.Nodes[index].AsImportDeclaration().ImportClause
	}
	// An import clause without a default binding has no symbol of its own. A type-only one
	// should get the same type as the equivalent regular import instead of crashing.
	regular := c.GetTypeAtLocation(importClauseAt(2))
	for _, index := range []int{0, 1} {
		typ := c.GetTypeAtLocation(importClauseAt(index))
		if typ == nil {
			t.Fatalf("Expected type of import clause %d to be non-nil", index)
		}
		assert.Equal(t, typ, regular)
	}

	defaultClause := c.GetTypeAtLocation(importClauseAt(3))
	defaultReference := c.GetTypeAtLocation(file.Statements.Nodes[7].AsTypeAliasDeclaration().Type)
	assert.Equal(t, defaultClause, defaultReference)
}

func TestInstantiatedMemberLookupIdentity(t *testing.T) {
	t.Parallel()
	for _, reverse := range []bool{false, true} {
		t.Run(core.IfElse(reverse, "reverse", "forward"), func(t *testing.T) {
			t.Parallel()
			fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
				"/main.ts": `interface Base<T> { inherited: T; shared: string }
interface Derived<T> extends Base<T[]> { own: T; shared: "derived"; unused: string }
declare const instance: Derived<number>;
instance.inherited;
instance.own;
instance.shared;`,
				"/tsconfig.json": `{"compilerOptions":{"strict":true},"files":["main.ts"]}`,
			}, tspath.CaseInsensitive))
			host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
			parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, fs, nil)
			assert.Equal(t, len(errors), 0)
			program := compiler.NewProgram(compiler.ProgramOptions{Config: parsed, Host: host})
			program.BindSourceFiles()
			c, done := program.GetTypeChecker(t.Context())
			defer done()
			file := program.GetSourceFile("/main.ts")
			expressions := []*ast.Node{
				file.Statements.Nodes[3].Expression(),
				file.Statements.Nodes[4].Expression(),
				file.Statements.Nodes[5].Expression(),
			}
			symbols := make([]*ast.Symbol, len(expressions))
			typ := c.GetTypeAtLocation(expressions[0].Expression())
			for index := range expressions {
				i := index
				if reverse {
					i = len(expressions) - index - 1
				}
				symbols[i] = c.GetPropertyOfType(typ, expressions[i].Name().Text())
				assert.Assert(t, symbols[i] != nil)
			}
			before := c.SymbolCount
			for _, expression := range expressions {
				c.GetPropertyOfType(typ, expression.Name().Text())
			}
			assert.Equal(t, c.SymbolCount, before)
			unused := file.Statements.Nodes[1].Symbol().Members()["unused"]
			c.GetTypeOfSymbol(unused)
			properties := c.GetPropertiesOfType(typ)
			assert.Equal(t, len(properties), 4)
			assert.Equal(t, properties[0].Name(), "own")
			assert.Equal(t, properties[1].Name(), "shared")
			assert.Equal(t, properties[2].Name(), "unused")
			assert.Assert(t, properties[2] != unused)
			assert.Equal(t, properties[3].Name(), "inherited")
			for i, expression := range expressions {
				assert.Equal(t, c.GetPropertyOfType(typ, expression.Name().Text()), symbols[i])
				assert.Equal(t, c.GetSymbolAtLocation(expression), symbols[i])
				found := false
				for _, property := range properties {
					if property == symbols[i] {
						found = true
					}
				}
				assert.Assert(t, found)
			}
			assert.Equal(t, len(c.GetDiagnostics(t.Context(), file)), 0)
		})
	}
}

func TestInstantiatedMemberShapeQueries(t *testing.T) {
	t.Parallel()
	fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
		"/main.ts": `interface Container<T> {
    (): T;
    [key: string]: T;
    value: T;
    unused: T;
    another: T;
}
declare const container: Container<string>;
container.value;`,
		"/tsconfig.json": `{"compilerOptions":{"strict":true},"files":["main.ts"]}`,
	}, tspath.CaseInsensitive))
	host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, fs, nil)
	assert.Equal(t, len(errors), 0)
	program := compiler.NewProgram(compiler.ProgramOptions{Config: parsed, Host: host})
	program.BindSourceFiles()
	c, done := program.GetTypeChecker(t.Context())
	defer done()
	file := program.GetSourceFile("/main.ts")
	typ := c.GetTypeAtLocation(file.Statements.Nodes[2].Expression().Expression())
	before := c.SymbolCount
	value := c.GetPropertyOfType(typ, "value")
	assert.Assert(t, value != nil)
	assert.Equal(t, c.SymbolCount, before+1)
	before = c.SymbolCount
	assert.Equal(t, len(c.GetSignaturesOfType(typ, checker.SignatureKindCall)), 1)
	assert.Equal(t, len(c.GetIndexInfosOfType(typ)), 1)
	assert.Equal(t, c.SymbolCount, before)
	properties := c.GetPropertiesOfType(typ)
	assert.Equal(t, len(properties), 3)
	assert.Equal(t, c.SymbolCount, before+2)
	assert.Equal(t, c.GetPropertyOfType(typ, "value"), value)
}

func TestInstantiatedMemberTableKeys(t *testing.T) {
	t.Parallel()
	fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
		"/main.ts": `interface Base<T> { value: T }
interface Derived<T> extends Base<T> {}
declare const instance: Derived<string>;
instance;`,
		"/tsconfig.json": `{"files":["main.ts"]}`,
	}, tspath.CaseInsensitive))
	host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, fs, nil)
	assert.Equal(t, len(errors), 0)
	program := compiler.NewProgram(compiler.ProgramOptions{Config: parsed, Host: host})
	program.BindSourceFiles()
	file := program.GetSourceFile("/main.ts")
	members := file.Statements.Nodes[0].Symbol().Members()
	members["different"] = members["value"]
	delete(members, "value")
	c, done := program.GetTypeChecker(t.Context())
	defer done()
	typ := c.GetTypeAtLocation(file.Statements.Nodes[3].Expression())
	value := c.GetPropertyOfType(typ, "value")
	assert.Assert(t, value != nil)
	properties := c.GetPropertiesOfType(typ)
	assert.Equal(t, len(properties), 1)
	assert.Equal(t, properties[0], value)
	assert.Assert(t, c.GetPropertyOfType(typ, "different") == nil)
}

func TestInstantiatedDiamondMissingMember(t *testing.T) {
	t.Parallel()
	var source strings.Builder
	source.WriteString("interface L0<T> { value?: T }\ninterface R0<T> { value?: T }\n")
	for i := 1; i <= 24; i++ {
		fmt.Fprintf(&source, "interface L%d<T> extends L%d<T>, R%d<T> {}\ninterface R%d<T> extends L%d<T>, R%d<T> {}\n", i, i-1, i-1, i, i-1, i-1)
	}
	source.WriteString("declare const instance: L24<string>;\ninstance;")
	fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
		"/main.ts":       source.String(),
		"/tsconfig.json": `{"files":["main.ts"]}`,
	}, tspath.CaseInsensitive))
	host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, fs, nil)
	assert.Equal(t, len(errors), 0)
	program := compiler.NewProgram(compiler.ProgramOptions{Config: parsed, Host: host})
	program.BindSourceFiles()
	c, done := program.GetTypeChecker(t.Context())
	defer done()
	file := program.GetSourceFile("/main.ts")
	typ := c.GetTypeAtLocation(file.Statements.Nodes[len(file.Statements.Nodes)-1].Expression())
	assert.Assert(t, c.GetPropertyOfType(typ, "missing") == nil)
	value := c.GetPropertyOfType(typ, "value")
	assert.Assert(t, value != nil)
	properties := c.GetPropertiesOfType(typ)
	assert.Equal(t, len(properties), 1)
	assert.Equal(t, properties[0], value)
}

func BenchmarkNewChecker(b *testing.B) {
	fs := bundled.WrapFS(osvfs.FS())
	rootPath := tspath.RootedDirectoryPathFromAbsolute(filepath.Join(repo.TestDataPath(), "fixtures/compiler"))
	host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile(rootPath.ResolveFile("tsconfig.json"), &core.CompilerOptions{}, nil, fs, nil)
	assert.Equal(b, len(errors), 0, "Expected no errors in parsed command line")
	program := compiler.NewProgram(compiler.ProgramOptions{
		Config: parsed,
		Host:   host,
	})

	b.ReportAllocs()
	for b.Loop() {
		checker.NewChecker(program, nil)
	}
}
