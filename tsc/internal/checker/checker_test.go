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
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, tsoptions.NewDefaultParseConfigHost(fs), nil)
	assert.Equal(t, len(errors), 0, "Expected no errors in parsed command line")

	p, err := compiler.NewProgram(t.Context(), compiler.ProgramOptions{
		Config: parsed,
		Host:   host,
	})
	assert.NilError(t, err)
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

	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, tsoptions.NewDefaultParseConfigHost(fs), nil)
	assert.Equal(t, len(errors), 0, "Expected no errors in parsed command line")

	p, err := compiler.NewProgram(t.Context(), compiler.ProgramOptions{
		Config: parsed,
		Host:   host,
	})
	assert.NilError(t, err)
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

func BenchmarkNewChecker(b *testing.B) {
	fs := bundled.WrapFS(osvfs.FS())
	rootPath := tspath.RootedDirectoryPathFromAbsolute(filepath.Join(repo.TestDataPath(), "fixtures/compiler"))
	host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile(rootPath.ResolveFile("tsconfig.json"), &core.CompilerOptions{}, nil, tsoptions.NewDefaultParseConfigHost(fs), nil)
	assert.Equal(b, len(errors), 0, "Expected no errors in parsed command line")
	program, err := compiler.NewProgram(b.Context(), compiler.ProgramOptions{
		Config: parsed,
		Host:   host,
	})
	assert.NilError(b, err)

	b.ReportAllocs()
	for b.Loop() {
		checker.NewChecker(program, nil)
	}
}

func BenchmarkCheck(b *testing.B) {
	fs := bundled.WrapFS(osvfs.FS())
	rootPath := tspath.RootedDirectoryPathFromAbsolute(filepath.Join(repo.TestDataPath(), "fixtures/compiler"))
	host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile(rootPath.ResolveFile("tsconfig.json"), &core.CompilerOptions{}, nil, tsoptions.NewDefaultParseConfigHost(fs), nil)
	assert.Equal(b, len(errors), 0, "Expected no errors in parsed command line")
	program, err := compiler.NewProgram(b.Context(), compiler.ProgramOptions{
		Config: parsed,
		Host:   host,
	})
	assert.NilError(b, err)
	program.BindSourceFiles()
	ctx := b.Context()

	b.ReportAllocs()
	for b.Loop() {
		c, _ := checker.NewChecker(program, nil)
		for _, file := range program.GetSourceFiles() {
			c.GetDiagnostics(ctx, file)
		}
		c.GetGlobalDiagnostics()
	}
}

func BenchmarkCheckFreshProgram(b *testing.B) {
	fs := bundled.WrapFS(osvfs.FS())
	rootPath := tspath.RootedDirectoryPathFromAbsolute(filepath.Join(repo.TestDataPath(), "fixtures/compiler"))
	host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile(rootPath.ResolveFile("tsconfig.json"), &core.CompilerOptions{}, nil, tsoptions.NewDefaultParseConfigHost(fs), nil)
	assert.Equal(b, len(errors), 0, "Expected no errors in parsed command line")
	ctx := b.Context()

	b.ReportAllocs()
	for b.Loop() {
		program, err := compiler.NewProgram(ctx, compiler.ProgramOptions{Config: parsed, Host: host})
		assert.NilError(b, err)
		program.BindSourceFiles()
		c, _ := checker.NewChecker(program, nil)
		for _, file := range program.GetSourceFiles() {
			assert.Equal(b, len(c.GetDiagnostics(ctx, file)), 0)
		}
		assert.Equal(b, len(c.GetGlobalDiagnostics()), 0)
	}
}

func TestTypeAllocationAcrossCheckerGrowth(t *testing.T) {
	t.Parallel()
	var content strings.Builder
	content.WriteString(`interface Box<T> { value: T }
export type Initial = Box<"first">;
`)
	for i := range 1024 {
		fmt.Fprintf(&content, "export type T%d = Box<\"value%d\">;\n", i, i)
	}
	fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
		"/foo.ts": content.String(),
	}, tspath.CaseSensitive))
	opts := &core.CompilerOptions{NoLib: core.TSTrue}
	program, err := compiler.NewProgram(t.Context(), compiler.ProgramOptions{
		Config: tsoptions.NewParsedCommandLine(opts, []tspath.RootedFilePath{"/foo.ts"}, nil, "/", fs.CaseSensitivity()),
		Host:   compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil),
	})
	assert.NilError(t, err)
	program.BindSourceFiles()
	c, done := program.GetTypeChecker(t.Context())
	defer done()
	file := program.GetSourceFile("/foo.ts")
	initial := c.GetTypeAtLocation(file.Statements.Nodes[1].AsTypeAliasDeclaration().Type)
	for i := range 1024 {
		node := file.Statements.Nodes[i+2].AsTypeAliasDeclaration().Type
		typ := c.GetTypeAtLocation(node)
		assert.Equal(t, c.TypeToString(typ), fmt.Sprintf("T%d", i))
	}
	assert.Equal(t, c.GetTypeAtLocation(file.Statements.Nodes[1].AsTypeAliasDeclaration().Type), initial)
	assert.Equal(t, c.TypeToString(initial), "Initial")
	assert.Equal(t, len(c.GetDiagnostics(t.Context(), file)), 0)
}

func TestGetSymbolAtLocationJSDocHashLink(t *testing.T) {
	t.Parallel()

	content := `/**
 * {@link Foo.member | static}
 * {@link Foo#member | instance}
 */
class Foo {
    static member = 123;
    member = 456;
}
`
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
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, tsoptions.NewDefaultParseConfigHost(fs), nil)
	assert.Equal(t, len(errors), 0, "Expected no errors in parsed command line")

	p, err := compiler.NewProgram(t.Context(), compiler.ProgramOptions{
		Config: parsed,
		Host:   host,
	})
	assert.NilError(t, err)
	p.BindSourceFiles()
	c, done := p.GetTypeChecker(t.Context())
	defer done()
	file := p.GetSourceFile("/foo.ts")
	classDecl := file.Statements.Nodes[0]
	jsdocs := classDecl.JSDoc(file)
	assert.Equal(t, len(jsdocs), 1, "Expected one JSDoc comment on the class")
	var links []*ast.Node
	for _, commentPart := range jsdocs[0].AsJSDoc().Comment.Nodes {
		if commentPart.Kind == ast.KindJSDocLink {
			links = append(links, commentPart)
		}
	}
	assert.Equal(t, len(links), 2, "Expected two JSDoc links")
	for i, link := range links {
		name := link.AsJSDocLink().Name()
		assert.Assert(t, ast.IsQualifiedName(name), "Expected link name to be a qualified name")
		right := name.AsQualifiedName().Right
		symbol := c.GetSymbolAtLocation(right)
		assert.Assert(t, symbol != nil, "Expected link %d to resolve to a symbol", i)
		assert.Equal(t, len(symbol.Declarations()), 1, "Expected link %d to resolve to a single declaration", i)
		isStatic := ast.HasSyntacticModifier(symbol.Declarations()[0], ast.ModifierFlagsStatic)
		if i == 0 {
			assert.Assert(t, isStatic, "Expected {@link Foo.member} to resolve to the static member")
		} else {
			assert.Assert(t, !isStatic, "Expected {@link Foo#member} to resolve to the instance member")
		}
	}
}

func TestGetSymbolAtLocationJSDocHashLinkEdges(t *testing.T) {
	t.Parallel()

	// Each case is a full source file with one JSDoc link. resolve describes
	// which member the link must resolve to: "static", "instance", "none",
	// or "self" for a plain {@link Foo}.
	cases := []struct {
		name    string
		content string
		resolve string
	}{
		{
			name: "instance only, dot link",
			content: `/** {@link Foo.member} */
class Foo {
    member = 456;
}
`,
			resolve: "instance",
		},
		{
			name: "instance only, hash link",
			content: `/** {@link Foo#member} */
class Foo {
    member = 456;
}
`,
			resolve: "instance",
		},
		{
			name: "static only, dot link",
			content: `/** {@link Foo.member} */
class Foo {
    static member = 123;
}
`,
			resolve: "static",
		},
		{
			name: "static only, hash link resolves to nothing",
			content: `/** {@link Foo#member} */
class Foo {
    static member = 123;
}
`,
			resolve: "none",
		},
		{
			name: "interface, dot link",
			content: `/** {@link I.m} */
interface I {
    m: number;
}
`,
			resolve: "instance",
		},
		{
			name: "interface, hash link",
			content: `/** {@link I#m} */
interface I {
    m: number;
}
`,
			resolve: "instance",
		},
		{
			name: "method, hash link resolves to instance method",
			content: `/** {@link Foo#m} */
class Foo {
    static m() {}
    m() {}
}
`,
			resolve: "instance",
		},
		{
			name: "method, dot link resolves to static method",
			content: `/** {@link Foo.m} */
class Foo {
    static m() {}
    m() {}
}
`,
			resolve: "static",
		},
		{
			name: "nonexistent member, hash link resolves to nothing",
			content: `/** {@link Foo#nope} */
class Foo {
    static member = 123;
    member = 456;
}
`,
			resolve: "none",
		},
		{
			name: "plain link resolves to the class itself",
			content: `/** {@link Foo} */
class Foo {
    static member = 123;
    member = 456;
}
`,
			resolve: "self",
		},
		{
			name: "namespace, hash link resolves to nothing, matching TS 6",
			content: `/** {@link N#m} */
namespace N {
    export const m = 1;
}
`,
			resolve: "none",
		},
		{
			name: "namespace qualified class, hash link resolves to instance member",
			content: `/** {@link Ns.Foo#member} */
namespace Ns {
    export class Foo {
        static member = 123;
        member = 456;
    }
}
`,
			resolve: "instance",
		},
		{
			name: "chained hash link resolves to nothing, matching TS 6",
			content: `/** {@link A#b#c} */
class B {
    c = 1;
}
class A {
    b = new B();
}
`,
			resolve: "none",
		},
		{
			name: "see tag, hash link resolves to instance member",
			content: `/** @see Foo#member */
class Foo {
    static member = 123;
    member = 456;
}
`,
			resolve: "instance",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			fs := vfstest.FromMap(map[string]string{
				"/foo.ts": tc.content,
				"/tsconfig.json": `
				{
					"compilerOptions": {},
					"files": ["foo.ts"]
				}
			`,
			}, tspath.CaseInsensitive /*caseSensitivity*/)
			fs = bundled.WrapFS(fs)
			host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
			parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, tsoptions.NewDefaultParseConfigHost(fs), nil)
			assert.Equal(t, len(errors), 0, "Expected no errors in parsed command line")
			p, err := compiler.NewProgram(t.Context(), compiler.ProgramOptions{Config: parsed, Host: host})
			assert.NilError(t, err)
			p.BindSourceFiles()
			c, done := p.GetTypeChecker(t.Context())
			defer done()
			file := p.GetSourceFile("/foo.ts")
			decl := file.Statements.Nodes[0]
			jsdocs := decl.JSDoc(file)
			assert.Equal(t, len(jsdocs), 1, "Expected one JSDoc comment")
			jsdoc := jsdocs[0].AsJSDoc()
			// Find the link or name reference inside the JSDoc comment or tags.
			var name *ast.Node
			for _, part := range jsdoc.Comment.Nodes {
				if part.Kind == ast.KindJSDocLink {
					name = part.AsJSDocLink().Name()
				}
			}
			if name == nil {
				for _, tag := range jsdoc.Tags.Nodes {
					if tag.Kind == ast.KindJSDocSeeTag {
						if nameExpr := tag.AsJSDocSeeTag().NameExpression; nameExpr != nil {
							name = nameExpr.AsJSDocNameReference().Name()
						}
					}
				}
			}
			assert.Assert(t, name != nil, "Expected a link name to resolve")
			var target *ast.Node
			if ast.IsQualifiedName(name) {
				target = name.AsQualifiedName().Right
			} else {
				target = name
			}
			symbol := c.GetSymbolAtLocation(target)
			switch tc.resolve {
			case "none":
				assert.Assert(t, symbol == nil, "Expected the link to resolve to nothing, got %v", symbol)
			case "self":
				assert.Assert(t, symbol != nil, "Expected the link to resolve to the class")
				assert.Equal(t, symbol, c.GetSymbolAtLocation(decl.Name()), "Expected the link to resolve to the class itself")
			default:
				assert.Assert(t, symbol != nil, "Expected the link to resolve to a symbol")
				assert.Equal(t, len(symbol.Declarations()), 1, "Expected a single declaration")
				isStatic := ast.HasSyntacticModifier(symbol.Declarations()[0], ast.ModifierFlagsStatic)
				if tc.resolve == "static" {
					assert.Assert(t, isStatic, "Expected the link to resolve to the static member")
				} else {
					assert.Assert(t, !isStatic, "Expected the link to resolve to the instance member")
				}
			}
		})
	}
}
