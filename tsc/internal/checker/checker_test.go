package checker_test

import (
	"fmt"
	"path/filepath"
	"strconv"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/nodebuilder"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/repo"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/baseline"
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

func TestTypeToStringMergedNamespace(t *testing.T) {
	t.Parallel()
	const content = `declare function f<T>(value: T): T;
declare namespace f { const extra: number; }
type Sample = typeof f;`
	fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
		"/foo.ts":        content,
		"/tsconfig.json": `{"files":["foo.ts"]}`,
	}, tspath.CaseInsensitive))
	host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, fs, nil)
	assert.Equal(t, len(errors), 0)
	p := compiler.NewProgram(compiler.ProgramOptions{Config: parsed, Host: host})
	p.BindSourceFiles()
	c, done := p.GetTypeChecker(t.Context())
	defer done()
	node := p.GetSourceFile("/foo.ts").Statements.Nodes[2]
	typ := c.GetTypeAtLocation(node)
	var result strings.Builder
	result.WriteString(content + "\n\n")
	for _, useTypeOf := range []bool{false, true} {
		flags := checker.TypeFormatFlagsInTypeAlias
		if useTypeOf {
			flags |= checker.TypeFormatFlagsUseTypeOfFunction
		}
		for level := range 3 {
			vc := &checker.VerbosityContext{Level: level}
			fmt.Fprintf(&result, "useTypeOfFunction=%t, verbosity=%d: %s\n", useTypeOf, level, c.TypeToStringEx(typ, node, flags, vc))
		}
	}
	baseline.Run(t, "typeToStringMergedNamespace.baseline", result.String(), baseline.Options{Subfolder: "checker"})
}

func TestTypeToStringRecursivePrototype(t *testing.T) {
	t.Parallel()
	for _, count := range []int{4, 8, 16, 32} {
		t.Run(strconv.Itoa(count), func(t *testing.T) {
			t.Parallel()
			var content strings.Builder
			content.WriteString("function Color(obj) { this.example = true; }\nColor.prototype = {\n")
			for i := range count {
				parameters := "ratio"
				if i == 0 {
					parameters = ""
				}
				fmt.Fprintf(&content, "m%03d: function(%s) { return this; },\n", i, parameters)
			}
			content.WriteString("toJSON: function() { return this.rgb(); }\n};")
			fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
				"/foo.js":        content.String(),
				"/tsconfig.json": `{"compilerOptions":{"target":"es2015","allowJs":true,"checkJs":true,"noImplicitAny":true},"files":["foo.js"]}`,
			}, tspath.CaseInsensitive))
			host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
			parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, fs, nil)
			assert.Equal(t, len(errors), 0)
			p := compiler.NewProgram(compiler.ProgramOptions{Config: parsed, Host: host})
			p.BindSourceFiles()
			c, done := p.GetTypeChecker(t.Context())
			defer done()
			node := p.GetSourceFile("/foo.js").Statements.Nodes[1].Expression().AsBinaryExpression().Left
			typ := c.GetTypeAtLocation(node)
			display := c.TypeToStringEx(typ, node.Parent, checker.TypeFormatFlagsNoTruncation|checker.TypeFormatFlagsGenerateNamesForShadowedTypeParams, nil)
			t.Logf("methods=%d, bytes=%d, first method occurrences=%d", count, len(display), strings.Count(display, "m000:"))
			for i := range count {
				assert.Equal(t, strings.Count(display, fmt.Sprintf("m%03d:", i)), 1)
			}
		})
	}
}

type typeAliasRecordingTracker struct {
	*checker.SymbolTrackerImpl
	scope        *ast.Node
	declarations []*ast.Node
	cyclicErrors int
	scopeQueries int
}

func (s *typeAliasRecordingTracker) TypeAliasScope() *ast.Node {
	s.scopeQueries++
	return s.scope
}

func (s *typeAliasRecordingTracker) AddTypeAliasDeclaration(declaration *ast.Node) {
	s.declarations = append(s.declarations, declaration)
}

func (s *typeAliasRecordingTracker) ReportCyclicStructureError() {
	s.cyclicErrors++
}

func TestNodeBuilderTypeAliasSynthesisFlag(t *testing.T) {
	t.Parallel()
	fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
		"/foo.ts": `export function make() {
    return { next() { return this; } };
}
make();`,
		"/tsconfig.json": `{"compilerOptions":{"strict":true},"files":["foo.ts"]}`,
	}, tspath.CaseInsensitive))
	host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, fs, nil)
	assert.Equal(t, len(errors), 0)
	p := compiler.NewProgram(compiler.ProgramOptions{Config: parsed, Host: host})
	p.BindSourceFiles()
	c, done := p.GetTypeChecker(t.Context())
	defer done()
	file := p.GetSourceFile("/foo.ts")
	typ := c.GetTypeAtLocation(file.Statements.Nodes[1].Expression())
	builder := checker.NewNodeBuilder(c, printer.NewEmitContext())
	tracker := &typeAliasRecordingTracker{
		SymbolTrackerImpl: checker.NewSymbolTrackerImpl(&checker.NodeBuilderContext{}, nil),
		scope:             file.AsNode(),
	}
	node := builder.TypeToTypeNode(typ, file.Statements.Nodes[0], nodebuilder.FlagsNoTruncation, nodebuilder.InternalFlagsNone, tracker)
	assert.Assert(t, node == nil)
	assert.Equal(t, tracker.cyclicErrors, 1)
	assert.Equal(t, len(tracker.declarations), 0)
	assert.Equal(t, tracker.scopeQueries, 0)

	for _, synthesize := range []bool{false, true, false, true} {
		tracker.declarations = nil
		tracker.cyclicErrors, tracker.scopeQueries = 0, 0
		internalFlags := nodebuilder.InternalFlagsNone
		if synthesize {
			internalFlags |= nodebuilder.InternalFlagsSynthesizeTypeAliases
		}
		node := builder.TypeToTypeNode(typ, file.Statements.Nodes[0], nodebuilder.FlagsNoTruncation|nodebuilder.FlagsAllowAnonymousIdentifier, internalFlags, tracker)
		assert.Assert(t, node != nil)
		assert.Equal(t, tracker.cyclicErrors, 0)
		if synthesize {
			assert.Equal(t, len(tracker.declarations), 1)
			assert.Equal(t, tracker.declarations[0].Name().Text(), "make_recursive")
			assert.Assert(t, tracker.scopeQueries > 0)
			assert.Equal(t, node.Kind, ast.KindTypeReference)
			assert.Equal(t, node.AsTypeReferenceNode().TypeName, tracker.declarations[0].Name())
		} else {
			assert.Equal(t, len(tracker.declarations), 0)
			assert.Equal(t, tracker.scopeQueries, 0)
			assert.Equal(t, node.Kind, ast.KindTypeLiteral)
		}
	}

	for _, missingTracker := range []bool{false, true} {
		func() {
			tracker.scope = nil
			var sink nodebuilder.SymbolTracker = tracker
			if missingTracker {
				sink = nil
			}
			defer func() {
				message, ok := recover().(string)
				assert.Assert(t, ok, "Expected a missing-scope assertion")
				assert.Assert(t, strings.Contains(message, "Type alias synthesis requires a destination scope"))
			}()
			checker.NewNodeBuilder(c, printer.NewEmitContext()).TypeToTypeNode(typ, file.Statements.Nodes[0], nodebuilder.FlagsNoTruncation, nodebuilder.InternalFlagsSynthesizeTypeAliases, sink)
			t.Fatal("Expected type alias synthesis without a destination scope to panic")
		}()
	}
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
