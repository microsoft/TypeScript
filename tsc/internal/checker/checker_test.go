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
	"github.com/microsoft/TypeScript/tsc/internal/nodebuilder"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/repo"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestInstantiatedSignatureDeclarationTypeParameters(t *testing.T) {
	t.Parallel()
	newSignature := func(t *testing.T) (*checker.Checker, *checker.Signature) {
		t.Helper()
		fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
			"/main.ts": `function identity<T>(value: T): T { return value; }
identity<string>("hello");`,
		}, tspath.CaseSensitive))
		program, err := compiler.NewProgram(t.Context(), compiler.ProgramOptions{
			Config: tsoptions.NewParsedCommandLine(&core.CompilerOptions{NoLib: core.TSTrue}, []tspath.RootedFilePath{"/main.ts"}, nil, "/", fs.CaseSensitivity()),
			Host:   compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil),
		})
		assert.NilError(t, err)
		program.BindSourceFiles()
		c, done := program.GetTypeChecker(t.Context())
		t.Cleanup(done)
		call := program.GetSourceFile("/main.ts").Statements.Nodes[1].Expression()
		return c, c.GetResolvedSignature(call)
	}
	for _, kind := range []ast.Kind{
		ast.KindCallSignature, ast.KindConstructSignature, ast.KindMethodSignature,
		ast.KindMethodDeclaration, ast.KindFunctionType, ast.KindConstructorType,
		ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindArrowFunction,
	} {
		t.Run(kind.String(), func(t *testing.T) {
			t.Parallel()
			c, signature := newSignature(t)
			declaration := c.SignatureToSignatureDeclaration(signature, kind, nil, nodebuilder.FlagsWriteTypeArgumentsOfSignature)
			assert.Assert(t, declaration.TypeParameters() == nil, "type parameters must contain declarations, not instantiated argument types")
			assert.Equal(t, declaration.Parameters()[0].Type().Kind, ast.KindStringKeyword)
			assert.Equal(t, declaration.Type().Kind, ast.KindStringKeyword)
		})
	}
	t.Run("rendering", func(t *testing.T) {
		t.Parallel()
		c, signature := newSignature(t)
		assert.Equal(t, c.SignatureToStringEx(signature, nil, checker.TypeFormatFlagsWriteTypeArgumentsOfSignature, nil), "<string>(value: string): string")
		assert.Equal(t, c.SignatureToStringEx(signature, nil, checker.TypeFormatFlagsWriteTypeArgumentsOfSignature|checker.TypeFormatFlagsWriteArrowStyleSignature, nil), "<string>(value: string) => string")

		emitContext := printer.NewEmitContext()
		defer emitContext.Factory.ReleaseArenas()
		builder := checker.NewNodeBuilderEx(c, emitContext, nil)
		declaration := builder.SignatureToSignatureDeclaration(signature, ast.KindFunctionType, nil, nodebuilder.FlagsWriteTypeArgumentsOfSignature, nodebuilder.InternalFlagsNone, nil)
		printNode := func(node *ast.Node) string {
			writer := printer.NewTextWriter("\n", 4)
			p := printer.NewPrinter(printer.PrinterOptions{}, printer.PrintHandlers{}, emitContext)
			p.Write(node, nil, writer, nil)
			return writer.String()
		}
		assert.Equal(t, printNode(declaration), "<string>(value: string) => string")
		clone := declaration.Clone(emitContext.Factory.AsNodeFactory())
		assert.Equal(t, printNode(clone), "<string>(value: string) => string")
		updated := emitContext.Factory.UpdateFunctionTypeNode(
			clone.AsFunctionTypeNode(),
			clone.TypeParameterList(),
			clone.ParameterList(),
			emitContext.Factory.NewKeywordTypeNode(ast.KindNumberKeyword),
		)
		assert.Equal(t, printNode(updated), "<string>(value: string) => number")
	})
}

func TestInstantiatedGenericSignatureDeclarationTypeParameters(t *testing.T) {
	t.Parallel()
	fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
		"/main.ts": `class C<T> {
    method<U extends T>(value: U): U { return value; }
}
new C<string>().method;`,
	}, tspath.CaseSensitive))
	program, err := compiler.NewProgram(t.Context(), compiler.ProgramOptions{
		Config: tsoptions.NewParsedCommandLine(&core.CompilerOptions{NoLib: core.TSTrue}, []tspath.RootedFilePath{"/main.ts"}, nil, "/", fs.CaseSensitivity()),
		Host:   compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil),
	})
	assert.NilError(t, err)
	program.BindSourceFiles()
	c, done := program.GetTypeChecker(t.Context())
	defer done()
	expression := program.GetSourceFile("/main.ts").Statements.Nodes[1].Expression()
	signatures := c.GetSignaturesOfType(c.GetTypeAtLocation(expression), checker.SignatureKindCall)
	assert.Equal(t, len(signatures), 1)
	emitContext := printer.NewEmitContext()
	defer emitContext.Factory.ReleaseArenas()
	builder := checker.NewNodeBuilderEx(c, emitContext, nil)
	for _, declaration := range []*ast.Node{
		c.SignatureToSignatureDeclaration(signatures[0], ast.KindFunctionType, nil, nodebuilder.FlagsWriteTypeArgumentsOfSignature),
		builder.SignatureToSignatureDeclaration(signatures[0], ast.KindFunctionType, nil, nodebuilder.FlagsWriteTypeArgumentsOfSignature, nodebuilder.InternalFlagsNone, nil),
	} {
		parameters := declaration.TypeParameters()
		assert.Equal(t, len(parameters), 1)
		assert.Equal(t, parameters[0].Kind, ast.KindTypeParameter)
		assert.Equal(t, parameters[0].Name().Text(), "U")
		assert.Equal(t, parameters[0].AsTypeParameterDeclaration().Constraint.Kind, ast.KindStringKeyword)
	}
}

func TestInstantiatedSignatureHiddenTypeParameterTruncation(t *testing.T) {
	t.Parallel()
	longLiteral := `"` + strings.Repeat("x", 200) + `"`
	for _, test := range []struct {
		name        string
		declaration string
	}{
		{"default", "= " + longLiteral},
		{"constraint", "extends { hidden: " + longLiteral + "; nested: { value: number } }"},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			fs := bundled.WrapFS(vfstest.FromMap(map[string]string{
				"/main.ts": "class C<T> {\nmethod<U " + test.declaration + ">() { return { value: null as T }; }\n}\nnew C<string>().method;",
			}, tspath.CaseSensitive))
			program, err := compiler.NewProgram(t.Context(), compiler.ProgramOptions{
				Config: tsoptions.NewParsedCommandLine(&core.CompilerOptions{NoLib: core.TSTrue}, []tspath.RootedFilePath{"/main.ts"}, nil, "/", fs.CaseSensitivity()),
				Host:   compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil),
			})
			assert.NilError(t, err)
			program.BindSourceFiles()
			c, done := program.GetTypeChecker(t.Context())
			defer done()
			expression := program.GetSourceFile("/main.ts").Statements.Nodes[1].Expression()
			signatures := c.GetSignaturesOfType(c.GetTypeAtLocation(expression), checker.SignatureKindCall)
			assert.Equal(t, len(signatures), 1)
			for _, verbosity := range []*checker.VerbosityContext{nil, {}} {
				text := c.SignatureToStringEx(signatures[0], nil, checker.TypeFormatFlagsWriteTypeArgumentsOfSignature, verbosity)
				assert.Equal(t, text, "<U>(): { value: string; }")
				if verbosity != nil {
					assert.Assert(t, !verbosity.Truncated)
				}
			}
			visible := c.SignatureToStringEx(signatures[0], nil, checker.TypeFormatFlagsNone, nil)
			assert.Assert(t, strings.HasSuffix(visible, "(): ..."), visible)
		})
	}
}

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
