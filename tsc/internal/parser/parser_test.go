package parser_test

import (
	"io/fs"
	"iter"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/repo"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"github.com/microsoft/TypeScript/tsc/internal/testrunner"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/fixtures"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/parsetestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
	"gotest.tools/v3/assert"
)

func BenchmarkParse(b *testing.B) {
	for _, f := range fixtures.BenchFixtures {
		b.Run(f.Name(), func(b *testing.B) {
			f.SkipIfNotExist(b)

			fileName := tspath.ToRootedFilePath(f.Path(), "/")
			path := osvfs.FS().CaseSensitivity().PathKey(tspath.RootedPath(fileName))
			sourceText := f.ReadFile(b)
			scriptKind := core.GetScriptKindFromFileName(fileName)

			opts := ast.SourceFileParseOptions{
				FileName: fileName,
				PathKey:  path,
			}

			for b.Loop() {
				parser.ParseSourceFile(opts, sourceText, scriptKind)
			}
		})
	}
}

func BenchmarkConditionalAsyncExpressions(b *testing.B) {
	for _, test := range []struct{ name, prefix, suffix, closing string }{
		{"call", "a ? async() : x => ", "0;", ""},
		{"arrow", "a ? async(): T => async() : x => ", "0;", ""},
		{"priority", "a ? d = (d): T => a ? 0 : async(...c) : T => ", "0;", ""},
		{"invalidCall", "a ? async() : x => ", "0 +;", ""},
		{"invalidArrow", "a ? async(): T => async() : x => ", "0 +;", ""},
		{"parenthesizedCall", "a ? async() : x => (", "0", ")"},
		{"invalidParenthesizedCall", "a ? async() : x => (", "0 +", ")"},
		{"array", "a ? async() : x => [", "0", "]"},
		{"invalidArray", "a ? async() : x => [", "0 +", "]"},
		{"callArgument", "a ? async() : x => b(", "0", ")"},
		{"invalidCallArgument", "a ? async() : x => b(", "0 +", ")"},
	} {
		b.Run(test.name, func(b *testing.B) {
			for _, count := range []int{10, 20, 40, 80} {
				b.Run(strconv.Itoa(count), func(b *testing.B) {
					source := "const r = " + strings.Repeat(test.prefix, count) + test.suffix + strings.Repeat(test.closing, count)
					opts := ast.SourceFileParseOptions{FileName: "/a.ts", PathKey: "/a.ts"}
					b.ReportAllocs()
					for b.Loop() {
						parser.ParseSourceFile(opts, source, core.ScriptKindTS)
					}
				})
			}
		})
	}
}

func BenchmarkConditionalExpressions(b *testing.B) {
	for _, count := range []int{1, 100} {
		b.Run(strconv.Itoa(count), func(b *testing.B) {
			source := strings.Repeat("{ const r = a ? b : c; }\n", count)
			opts := ast.SourceFileParseOptions{FileName: "/a.ts", PathKey: "/a.ts"}
			b.ReportAllocs()
			for b.Loop() {
				parser.ParseSourceFile(opts, source, core.ScriptKindTS)
			}
		})
	}
}

type parsableFile struct {
	path string
	name string
}

func allParsableFiles(tb testing.TB, root string) iter.Seq[parsableFile] {
	tb.Helper()
	return func(yield func(parsableFile) bool) {
		tb.Helper()
		err := filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
			if err != nil {
				return err
			}

			if d.IsDir() || tspath.TryGetExtensionFromPath(path) == "" {
				return nil
			}

			testName, err := filepath.Rel(root, path)
			if err != nil {
				return err
			}
			testName = filepath.ToSlash(testName)

			if !yield(parsableFile{path, testName}) {
				return filepath.SkipAll
			}
			return nil
		})
		assert.NilError(tb, err)
	}
}

func FuzzParser(f *testing.F) {
	var extensions collections.Set[string]
	for _, es := range tspath.AllSupportedExtensionsWithJson {
		for _, e := range es {
			extensions.Add(e)
		}
	}

	roots := []string{
		filepath.Join(repo.TestDataPath(), "fixtures"),
	}
	for _, root := range roots {
		for file := range allParsableFiles(f, root) {
			sourceText, err := os.ReadFile(file.path)
			assert.NilError(f, err)
			extension := tspath.TryGetExtensionFromPath(file.path)
			f.Add(extension, string(sourceText), false, false)
		}
	}

	testDirs := []string{
		filepath.Join(repo.TestDataPath(), "tests/cases/compiler"),
		filepath.Join(repo.TestDataPath(), "tests/cases/conformance"),
	}

	for _, testDir := range testDirs {
		if _, err := os.Stat(testDir); os.IsNotExist(err) {
			continue
		}

		for file := range allParsableFiles(f, testDir) {
			sourceText, err := os.ReadFile(file.path)
			assert.NilError(f, err)

			type testFile struct {
				content string
				name    string
			}

			testUnits, _, _, _, err := testrunner.ParseTestFilesAndSymlinks(
				string(sourceText),
				file.path,
				func(filename string, content string, fileOptions map[string]string) (testFile, error) {
					return testFile{content: content, name: filename}, nil
				},
			)
			assert.NilError(f, err)

			for _, unit := range testUnits {
				extension := tspath.TryGetExtensionFromPath(unit.name)
				if extension == "" {
					continue
				}
				f.Add(extension, unit.content, false, false)
			}
		}
	}

	f.Fuzz(func(t *testing.T, extension string, sourceText string, externalModuleIndicatorOptionsJSX bool, externalModuleIndicatorOptionsForce bool) {
		if !extensions.Has(extension) {
			t.Skip()
		}

		fileName := tspath.RootedFilePathFromNormalized("/index" + extension)
		path := tspath.PathKeyFromCanonical(fileName.AsString())

		opts := ast.SourceFileParseOptions{
			FileName: fileName,
			PathKey:  path,
			ExternalModuleIndicatorOptions: ast.ExternalModuleIndicatorOptions{
				JSX:   externalModuleIndicatorOptionsJSX,
				Force: externalModuleIndicatorOptionsForce,
			},
		}

		parser.ParseSourceFile(opts, sourceText, core.GetScriptKindFromFileName(fileName))
	})
}

func TestHeritageClauseElementKinds(t *testing.T) {
	t.Parallel()
	sourceText := `
class C extends Base<number> implements Contract<string> {}
interface I extends Parent<boolean> {}
interface Invalid implements Recovery {}
interface MissingExtends extends A. {}
class MissingImplements implements B. {}
`
	file := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/index.ts",
		PathKey:  "/index.ts",
	}, sourceText, core.ScriptKindTS)

	classDecl := file.Statements.Nodes[0].AsClassDeclaration()
	assert.Equal(t, classDecl.HeritageClauses.Nodes[0].AsHeritageClause().Types.Nodes[0].Kind, ast.KindExpressionWithTypeArguments)
	assert.Equal(t, classDecl.HeritageClauses.Nodes[1].AsHeritageClause().Types.Nodes[0].Kind, ast.KindTypeReference)

	interfaceDecl := file.Statements.Nodes[1].AsInterfaceDeclaration()
	assert.Equal(t, interfaceDecl.HeritageClauses.Nodes[0].AsHeritageClause().Types.Nodes[0].Kind, ast.KindTypeReference)

	invalidInterfaceDecl := file.Statements.Nodes[2].AsInterfaceDeclaration()
	assert.Equal(t, invalidInterfaceDecl.HeritageClauses.Nodes[0].AsHeritageClause().Types.Nodes[0].Kind, ast.KindExpressionWithTypeArguments)

	missingExtendsDecl := file.Statements.Nodes[3].AsInterfaceDeclaration()
	assert.Equal(t, missingExtendsDecl.HeritageClauses.Nodes[0].AsHeritageClause().Types.Nodes[0].Kind, ast.KindExpressionWithTypeArguments)

	missingImplementsDecl := file.Statements.Nodes[4].AsClassDeclaration()
	assert.Equal(t, missingImplementsDecl.HeritageClauses.Nodes[0].AsHeritageClause().Types.Nodes[0].Kind, ast.KindExpressionWithTypeArguments)
}

func parseConditionalInGenerator(t *testing.T, expression string, kind core.ScriptKind) *ast.ConditionalExpression {
	t.Helper()
	fileName := tspath.RootedFilePathFromNormalized(core.IfElse(kind == core.ScriptKindJS, "/a.js", "/a.ts"))
	file := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: fileName,
		PathKey:  tspath.CaseSensitive.PathKey(tspath.RootedPath(fileName)),
	}, "function* g() { const a = "+expression+"; }", kind)
	assert.Equal(t, len(file.Diagnostics()), 0)
	assert.Equal(t, len(file.JSDiagnostics()), 0)
	statement := file.Statements.Nodes[0].Body().AsBlock().Statements.Nodes[0]
	declaration := statement.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes[0]
	return declaration.Initializer().AsConditionalExpression()
}

func checkConditionalAsyncNesting(t *testing.T, prefix string, closing string) {
	t.Helper()
	const depth = 8
	source := "const r = " + strings.Repeat(prefix, depth) + "0" + strings.Repeat(closing, depth) + ";"
	file := parsetestutil.ParseTypeScript(source, false)
	parsetestutil.CheckDiagnostics(t, file)
	maxNodeCount := len(source) * len(source)
	assert.Assert(t, file.NodeCount <= maxNodeCount, "created %d nodes for %d bytes", file.NodeCount, len(source))
}

func TestConditionalAsyncNestedArray(t *testing.T) {
	t.Parallel()
	checkConditionalAsyncNesting(t, "a ? async() : x => [", "]")
}

func TestConditionalAsyncNestedCallArgument(t *testing.T) {
	t.Parallel()
	checkConditionalAsyncNesting(t, "a ? async() : x => b(", ")")
}

func TestConditionalAsyncCall(t *testing.T) {
	t.Parallel()
	conditional := parseConditionalInGenerator(t, "b ? async(...c) : 0", core.ScriptKindTS)
	assert.Equal(t, conditional.WhenTrue.Kind, ast.KindCallExpression)
	assert.Equal(t, conditional.WhenTrue.Flags&ast.NodeFlagsYieldContext, ast.NodeFlagsYieldContext)
	assert.Equal(t, conditional.WhenFalse.Kind, ast.KindNumericLiteral)
}

func TestConditionalAsyncCallWithArrow(t *testing.T) {
	t.Parallel()
	conditional := parseConditionalInGenerator(t, "b ? async(...c) : d => d", core.ScriptKindTS)
	assert.Equal(t, conditional.WhenTrue.Kind, ast.KindCallExpression)
	assert.Equal(t, conditional.WhenTrue.Flags&ast.NodeFlagsYieldContext, ast.NodeFlagsYieldContext)
	assert.Equal(t, conditional.WhenFalse.Kind, ast.KindArrowFunction)
}

func TestConditionalAsyncCallYield(t *testing.T) {
	t.Parallel()
	conditional := parseConditionalInGenerator(t, "b ? yield async(...c) : 0", core.ScriptKindTS)
	assert.Equal(t, conditional.WhenTrue.Kind, ast.KindYieldExpression)
	assert.Equal(t, conditional.WhenTrue.Flags&ast.NodeFlagsYieldContext, ast.NodeFlagsYieldContext)
	assert.Equal(t, conditional.WhenFalse.Kind, ast.KindNumericLiteral)
	assert.Equal(t, conditional.WhenTrue.Expression().Kind, ast.KindCallExpression)
}

func TestConditionalAsyncCallYieldWithArrow(t *testing.T) {
	t.Parallel()
	conditional := parseConditionalInGenerator(t, "b ? yield async(...c) : d => d", core.ScriptKindTS)
	assert.Equal(t, conditional.WhenTrue.Kind, ast.KindYieldExpression)
	assert.Equal(t, conditional.WhenTrue.Flags&ast.NodeFlagsYieldContext, ast.NodeFlagsYieldContext)
	assert.Equal(t, conditional.WhenFalse.Kind, ast.KindArrowFunction)
	assert.Equal(t, conditional.WhenTrue.Expression().Kind, ast.KindCallExpression)
}

func TestConditionalAsyncCallJS(t *testing.T) {
	t.Parallel()
	conditional := parseConditionalInGenerator(t, "b ? async(...c) : 0", core.ScriptKindJS)
	assert.Equal(t, conditional.WhenTrue.Kind, ast.KindCallExpression)
	assert.Equal(t, conditional.WhenTrue.Flags&ast.NodeFlagsYieldContext, ast.NodeFlagsYieldContext)
	assert.Equal(t, conditional.WhenFalse.Kind, ast.KindNumericLiteral)
}

func TestConditionalAsyncCallWithArrowJS(t *testing.T) {
	t.Parallel()
	conditional := parseConditionalInGenerator(t, "b ? async(...c) : d => d", core.ScriptKindJS)
	assert.Equal(t, conditional.WhenTrue.Kind, ast.KindCallExpression)
	assert.Equal(t, conditional.WhenTrue.Flags&ast.NodeFlagsYieldContext, ast.NodeFlagsYieldContext)
	assert.Equal(t, conditional.WhenFalse.Kind, ast.KindArrowFunction)
}

func TestConditionalAsyncCallYieldJS(t *testing.T) {
	t.Parallel()
	conditional := parseConditionalInGenerator(t, "b ? yield async(...c) : 0", core.ScriptKindJS)
	assert.Equal(t, conditional.WhenTrue.Kind, ast.KindYieldExpression)
	assert.Equal(t, conditional.WhenTrue.Flags&ast.NodeFlagsYieldContext, ast.NodeFlagsYieldContext)
	assert.Equal(t, conditional.WhenFalse.Kind, ast.KindNumericLiteral)
	assert.Equal(t, conditional.WhenTrue.Expression().Kind, ast.KindCallExpression)
}

func TestConditionalAsyncCallYieldWithArrowJS(t *testing.T) {
	t.Parallel()
	conditional := parseConditionalInGenerator(t, "b ? yield async(...c) : d => d", core.ScriptKindJS)
	assert.Equal(t, conditional.WhenTrue.Kind, ast.KindYieldExpression)
	assert.Equal(t, conditional.WhenTrue.Flags&ast.NodeFlagsYieldContext, ast.NodeFlagsYieldContext)
	assert.Equal(t, conditional.WhenFalse.Kind, ast.KindArrowFunction)
	assert.Equal(t, conditional.WhenTrue.Expression().Kind, ast.KindCallExpression)
}

func TestConditionalAsyncCallJSDoc(t *testing.T) {
	t.Parallel()
	file := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/a.js",
		PathKey:  "/a.js",
	}, "const a = b ? async(...c) : d => /** @param {number */ e => e;", core.ScriptKindJS)
	assert.Equal(t, len(file.Diagnostics()), 0)
	assert.Equal(t, len(file.JSDiagnostics()), 0)
	assert.Equal(t, len(file.JSDocDiagnostics()), 1)
	assert.Equal(t, len(file.Statements.Nodes), 1)
	statement := file.Statements.Nodes[0]
	declaration := statement.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes[0]
	arrow := declaration.Initializer().AsConditionalExpression().WhenFalse.Body()
	assert.Equal(t, len(arrow.JSDoc(file)), 1)
}

func TestConditionalAsyncCallJSDocTypedef(t *testing.T) {
	t.Parallel()
	file := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/a.js",
		PathKey:  "/a.js",
	}, "const a = b ? async(...c) : d => /** @typedef {number} T */ e => e;", core.ScriptKindJS)
	assert.Equal(t, len(file.Diagnostics()), 0)
	assert.Equal(t, len(file.JSDiagnostics()), 0)
	assert.Equal(t, len(file.JSDocDiagnostics()), 0)
	assert.Equal(t, len(file.Statements.Nodes), 2)
	statement := file.Statements.Nodes[1]
	declaration := statement.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes[0]
	arrow := declaration.Initializer().AsConditionalExpression().WhenFalse.Body()
	assert.Equal(t, len(arrow.JSDoc(file)), 1)
}

func TestConditionalAsyncCallCommentDirectives(t *testing.T) {
	t.Parallel()
	file := parsetestutil.ParseTypeScript(`const r = a ? async() : x =>
        // @ts-expect-error
        a ? async() : x =>
        // @ts-ignore
        0;
    const s = a ? async(x = (
        // @ts-expect-error
        b
    ),
        // @ts-ignore
        c
    ): T => b : c;`, false)
	parsetestutil.CheckDiagnostics(t, file)
	assert.Equal(t, len(file.CommentDirectives), 4)
	assert.Equal(t, file.CommentDirectives[0].Kind, ast.CommentDirectiveKindExpectError)
	assert.Equal(t, file.CommentDirectives[1].Kind, ast.CommentDirectiveKindIgnore)
	assert.Equal(t, file.CommentDirectives[2].Kind, ast.CommentDirectiveKindExpectError)
	assert.Equal(t, file.CommentDirectives[3].Kind, ast.CommentDirectiveKindIgnore)
	assert.Equal(t, len(file.Statements.Nodes), 2)
}

func TestConditionalAsyncArrowBodyContext(t *testing.T) {
	t.Parallel()
	file := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/a.ts",
		PathKey:  "/a.ts",
	}, "const a = b ? async (): Promise<number> => async() : d => d;", core.ScriptKindTS)
	assert.Equal(t, len(file.Diagnostics()), 0)
	declaration := file.Statements.Nodes[0].AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes[0]
	arrow := declaration.Initializer().AsConditionalExpression().WhenTrue
	assert.Equal(t, arrow.Kind, ast.KindArrowFunction)
	body := arrow.Body()
	assert.Equal(t, body.Kind, ast.KindCallExpression)
	assert.Equal(t, body.Flags&ast.NodeFlagsAwaitContext, ast.NodeFlagsAwaitContext)
	assert.Equal(t, body.Flags&ast.NodeFlagsYieldContext, ast.NodeFlagsNone)
}

func TestConditionalAsyncArrowYieldContext(t *testing.T) {
	t.Parallel()
	expression := parseConditionalInGenerator(t, "a ? async (): T => a ? async (): T => async() : async() : yield b", core.ScriptKindTS)
	assert.Equal(t, expression.WhenTrue.Kind, ast.KindArrowFunction)
	assert.Equal(t, expression.WhenFalse.Kind, ast.KindYieldExpression)
	assert.Assert(t, expression.WhenFalse.Flags&ast.NodeFlagsYieldContext != 0)
	assert.Equal(t, expression.WhenFalse.Flags&ast.NodeFlagsAwaitContext, ast.NodeFlagsNone)
	body := expression.WhenTrue.Body().AsConditionalExpression()
	assert.Equal(t, body.WhenTrue.Kind, ast.KindArrowFunction)
	assert.Equal(t, body.WhenFalse.Kind, ast.KindCallExpression)
	assert.Assert(t, body.WhenFalse.Flags&ast.NodeFlagsAwaitContext != 0)
	assert.Equal(t, body.WhenFalse.Flags&ast.NodeFlagsYieldContext, ast.NodeFlagsNone)
}

func TestParseStaticSourcePhaseImport(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name          string
		source        string
		phaseModifier ast.Kind
		bindingName   string
		hasAttributes bool
	}{
		{
			name:          "source phase",
			source:        `import source a from "./a.wasm";`,
			phaseModifier: ast.KindSourceKeyword,
			bindingName:   "a",
		},
		{
			name:          "source phase with import attributes",
			source:        `import source a from "./a.wasm" with { type: "webassembly" };`,
			phaseModifier: ast.KindSourceKeyword,
			bindingName:   "a",
			hasAttributes: true,
		},
		{
			name:          "from as source phase binding",
			source:        `import source from from "./module.js";`,
			phaseModifier: ast.KindSourceKeyword,
			bindingName:   "from",
		},
		{
			name:          "source as ordinary default binding",
			source:        `import source from "./module.js";`,
			phaseModifier: ast.KindUnknown,
			bindingName:   "source",
		},
		{
			name:          "source as ordinary default binding with named imports",
			source:        `import source, { value } from "./module.js";`,
			phaseModifier: ast.KindUnknown,
			bindingName:   "source",
		},
		{
			name:          "escaped source as ordinary default binding",
			source:        `import s\u006furce from "./module.js";`,
			phaseModifier: ast.KindUnknown,
			bindingName:   "source",
		},
		{
			name:          "escaped defer as ordinary default binding",
			source:        `import d\u0065fer from "./module.js";`,
			phaseModifier: ast.KindUnknown,
			bindingName:   "defer",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			file := parsetestutil.ParseTypeScript(test.source, false)
			parsetestutil.CheckDiagnostics(t, file)
			assert.Equal(t, len(file.Statements.Nodes), 1)

			statement := file.Statements.Nodes[0]
			assert.Assert(t, ast.IsImportDeclaration(statement))

			declaration := statement.AsImportDeclaration()
			assert.Assert(t, declaration.ImportClause != nil)

			clause := declaration.ImportClause.AsImportClause()
			assert.Equal(t, clause.PhaseModifier, test.phaseModifier)
			assert.Assert(t, clause.Name() != nil)
			assert.Equal(t, clause.Name().Text(), test.bindingName)
			assert.Equal(t, declaration.Attributes != nil, test.hasAttributes)
		})
	}
}

func TestParseSourceAsImportEqualsBinding(t *testing.T) {
	t.Parallel()
	file := parsetestutil.ParseTypeScript(`import source = require("./module.js");`, false)
	parsetestutil.CheckDiagnostics(t, file)
	assert.Equal(t, len(file.Statements.Nodes), 1)

	statement := file.Statements.Nodes[0]
	assert.Assert(t, ast.IsImportEqualsDeclaration(statement))

	assert.Equal(t, statement.Name().Text(), "source")
}

func TestParseInvalidStaticSourcePhaseImports(t *testing.T) {
	t.Parallel()
	tests := []struct {
		source           string
		hasName          bool
		hasNamedBindings bool
	}{
		{source: `import source "./a.js";`},
		{source: `import source * as a from "./a.js";`, hasNamedBindings: true},
		{source: `import source { a } from "./a.js";`, hasNamedBindings: true},
		{source: `import source a, { b } from "./a.js";`, hasName: true, hasNamedBindings: true},
	}

	for _, test := range tests {
		file := parsetestutil.ParseTypeScript(test.source, false)
		parsetestutil.CheckDiagnostics(t, file)
		assert.Equal(t, len(file.Statements.Nodes), 1)

		statement := file.Statements.Nodes[0]
		assert.Assert(t, ast.IsImportDeclaration(statement))

		declaration := statement.AsImportDeclaration()
		assert.Assert(t, declaration.ImportClause != nil)

		clause := declaration.ImportClause.AsImportClause()
		assert.Equal(t, clause.PhaseModifier, ast.KindSourceKeyword)
		assert.Equal(t, clause.Name() != nil, test.hasName)
		assert.Equal(t, clause.NamedBindings != nil, test.hasNamedBindings)
	}
}

func TestParseDynamicSourcePhaseImport(t *testing.T) {
	t.Parallel()
	file := parsetestutil.ParseTypeScript(`import.source("./a.wasm", { with: { type: "webassembly" } });`, false)
	parsetestutil.CheckDiagnostics(t, file)
	assert.Equal(t, len(file.Statements.Nodes), 1)

	statement := file.Statements.Nodes[0]
	assert.Assert(t, ast.IsExpressionStatement(statement))

	call := statement.AsExpressionStatement().Expression
	assert.Assert(t, ast.IsCallExpression(call))
	assert.Assert(t, ast.IsImportCall(call))
	assert.Assert(t, call.SubtreeFacts()&ast.SubtreeContainsDynamicImport != 0)

	metaProperty := call.Expression()
	assert.Assert(t, ast.IsMetaProperty(metaProperty))
	assert.Equal(t, metaProperty.AsMetaProperty().KeywordToken, ast.KindImportKeyword)
	assert.Equal(t, metaProperty.Text(), "source")
	assert.Equal(t, len(call.Arguments()), 2)
	assert.Equal(t, file.Flags&ast.NodeFlagsPossiblyContainsDynamicImport != 0, true)
	assert.Equal(t, file.Flags&ast.NodeFlagsPossiblyContainsImportMeta != 0, false)
	assert.Equal(t, file.ExternalModuleIndicator == nil, true)
}

func TestParseEscapedDynamicImportPhase(t *testing.T) {
	t.Parallel()
	tests := []struct {
		source    string
		phaseName string
	}{
		{source: `import.d\u0065fer("./a.js");`, phaseName: "defer"},
		{source: `import.s\u006furce("./a.wasm");`, phaseName: "source"},
	}

	for _, test := range tests {
		t.Run(test.phaseName, func(t *testing.T) {
			t.Parallel()
			file := parsetestutil.ParseTypeScript(test.source, false)
			assert.Equal(t, len(file.Diagnostics()), 1)
			assert.Equal(t, file.Diagnostics()[0].Code(), diagnostics.Keywords_cannot_contain_escape_characters.Code())
			assert.Equal(t, len(file.Statements.Nodes), 1)

			statement := file.Statements.Nodes[0]
			assert.Assert(t, ast.IsExpressionStatement(statement))

			call := statement.AsExpressionStatement().Expression
			assert.Assert(t, ast.IsCallExpression(call))
			assert.Assert(t, ast.IsImportCall(call))

			metaProperty := call.Expression()
			assert.Assert(t, ast.IsMetaProperty(metaProperty))
			assert.Equal(t, metaProperty.Text(), test.phaseName)
			assert.Equal(t, file.Flags&ast.NodeFlagsPossiblyContainsDynamicImport != 0, true)
			assert.Equal(t, file.Flags&ast.NodeFlagsPossiblyContainsImportMeta != 0, false)
		})
	}
}

func TestJSDocImportTypeParentChain(t *testing.T) {
	t.Parallel()
	sourceText := `test("", async function () {
  ;(/** @type {typeof import("a")} */ ({}))
})

test("", async function () {
  ;(/** @type {typeof import("a")} */ a)
})

test("", async function () {
  (/** @type {typeof import("a")} */ ({}))
  ;(/** @type {typeof import("a")} */ ({}))
})

test("", async function () {
  (/** @type {typeof import("a")} */ a)
  ;(/** @type {typeof import("a")} */ a)
})

test("", async function () {
  (/** @type {typeof import("a")} */ ({}))
  ;(/** @type {typeof import("a")} */ ({}))
})
`
	opts := ast.SourceFileParseOptions{
		FileName: "/index.js",
		PathKey:  "/index.js",
	}

	file := parser.ParseSourceFile(opts, sourceText, core.ScriptKindJS)

	for i := 1; i < len(file.ReparsedClones); i++ {
		a, b := file.ReparsedClones[i-1], file.ReparsedClones[i]
		if a.Pos() == b.Pos() && a.End() == b.End() && a.Kind == b.Kind {
			t.Errorf("duplicate ReparsedClones at [%d] and [%d]: %s pos=%d end=%d", i-1, i, a.Kind.String(), a.Pos(), a.End())
		}
	}

	for _, imp := range file.Imports() {
		reparsed := ast.GetReparsedNodeForNode(imp)
		if ast.GetSourceFileOfNode(reparsed) == nil {
			t.Errorf("reparsed import at pos=%d has broken parent chain", imp.Pos())
		}
	}
}

func TestJSDocTypeSourceSurvivesReparse(t *testing.T) {
	t.Parallel()
	sourceText := `/**
 * @typedef {(
 *   "a" |
 *   "b"
 * )[]} T
 */
const value = 0;`
	opts := ast.SourceFileParseOptions{
		FileName: "/index.js",
		PathKey:  "/index.js",
	}

	file := parser.ParseSourceFile(opts, sourceText, core.ScriptKindJS)
	var typeAlias *ast.Node
	for _, statement := range file.Statements.Nodes {
		if ast.IsJSTypeAliasDeclaration(statement) {
			typeAlias = statement
			break
		}
	}
	assert.Assert(t, typeAlias != nil)

	jsDocs := typeAlias.JSDoc(file)
	assert.Equal(t, len(jsDocs), 1)
	assert.Assert(t, jsDocs[0].AsJSDoc().Tags != nil)
	assert.Equal(t, len(jsDocs[0].AsJSDoc().Tags.Nodes), 1)

	typeExpression := jsDocs[0].AsJSDoc().Tags.Nodes[0].TypeExpression()
	assert.Assert(t, typeExpression != nil)

	expected := strings.Join([]string{"(", `"a" |`, `"b"`, ")[]"}, core.NewLineKindLF.GetNewLineCharacter())
	tests := []struct {
		name string
		node *ast.Node
	}{
		{name: "original", node: typeExpression.Type()},
		{name: "reparsed", node: typeAlias.Type()},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, scanner.GetTextOfNode(test.node), expected)
		})
	}
}

func TestJSDocTypeSourcePropagatesToConstructedReparse(t *testing.T) {
	t.Parallel()
	sourceText := `/**
 * @param {{
 *   value: string
 * }} options
 */
function foo(options) {}`
	opts := ast.SourceFileParseOptions{
		FileName: "/index.js",
		PathKey:  "/index.js",
	}

	file := parser.ParseSourceFile(opts, sourceText, core.ScriptKindJS)
	function := file.Statements.Nodes[0]
	assert.Assert(t, ast.IsFunctionDeclaration(function))
	assert.Equal(t, len(function.Parameters()), 1)

	typeNode := function.Parameters()[0].Type()
	assert.Assert(t, typeNode != nil)
	assert.Assert(t, typeNode.Flags&ast.NodeFlagsReparsed != 0)

	expected := strings.Join([]string{"{", "value: string", "}"}, core.NewLineKindLF.GetNewLineCharacter())
	assert.Equal(t, scanner.GetTextOfNode(typeNode), expected)
	assert.Equal(t, scanner.GetTokenPosOfNode(typeNode, file, false /*includeJSDoc*/), strings.Index(sourceText, "{{")+1)
}

func TestJSDocAugmentsHeritage(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name       string
		expression string
		tagName    string
		augments   bool
	}{
		{"identifier", "A", "A", true},
		{"dotted name", "ns.A", "ns.A", true},
		{"call", "A.extend()", "A", true},
		{"mixin", "mixin(A)", "A", true},
		{"element access", `ns["A"]`, "A", true},
		{"conditional", "(cond ? A : A)", "A", true},
		{"parenthesized name", "(A)", "A", true},
		{"null", "null", "A", false},
		{"mismatched identifier", "A", "Other", false},
		{"mismatched dotted name", "ns.A", "ns.Other", false},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			sourceText := "/** @extends {" + test.tagName + "<string>} */\nclass B extends " + test.expression + " {}"
			opts := ast.SourceFileParseOptions{
				FileName: "/index.js",
				PathKey:  "/index.js",
			}
			file := parser.ParseSourceFile(opts, sourceText, core.ScriptKindJS)
			parsetestutil.CheckDiagnostics(t, file)
			assert.Equal(t, len(file.Statements.Nodes), 1)
			classB := file.Statements.Nodes[0]
			assert.Assert(t, ast.IsClassDeclaration(classB))

			baseType := ast.GetClassExtendsHeritageElement(classB)
			assert.Assert(t, baseType != nil)
			assert.Equal(t, scanner.GetTextOfNode(baseType.Expression()), test.expression)

			jsDocs := classB.JSDoc(file)
			assert.Equal(t, len(jsDocs), 1)
			tags := jsDocs[0].AsJSDoc().Tags
			assert.Assert(t, tags != nil)
			assert.Equal(t, len(tags.Nodes), 1)
			tag := tags.Nodes[0]
			assert.Assert(t, ast.IsJSDocAugmentsTag(tag))
			sourceTypeArguments := tag.ClassName().TypeArguments()
			assert.Equal(t, len(sourceTypeArguments), 1)

			typeArguments := baseType.TypeArguments()
			if test.augments {
				assert.Equal(t, len(typeArguments), 1)
				typeArgument := typeArguments[0]
				assert.Equal(t, typeArgument.Kind, ast.KindStringKeyword)
				assert.Assert(t, typeArgument.Flags&ast.NodeFlagsReparsed != 0)
				assert.Equal(t, typeArgument.Parent, baseType)
				assert.Equal(t, scanner.GetTextOfNode(typeArgument), "string")
				assert.Equal(t, ast.GetReparsedNodeForNode(sourceTypeArguments[0]), typeArgument)
			} else {
				assert.Equal(t, len(typeArguments), 0)
				assert.Equal(t, ast.GetReparsedNodeForNode(sourceTypeArguments[0]), sourceTypeArguments[0])
			}
		})
	}
}

func TestSourceFilePositionMapWithNonASCIIStringLiteral(t *testing.T) {
	t.Parallel()
	sourceText := `const x = "─";

namespace N {
  export const y = x;
}
`
	opts := ast.SourceFileParseOptions{
		FileName: "/index.ts",
		PathKey:  "/index.ts",
	}

	file := parser.ParseSourceFile(opts, sourceText, core.ScriptKindTS)

	positionMap := file.GetPositionMap()
	assert.Assert(t, !positionMap.IsAsciiOnly())
	afterBoxDrawingCharacter := strings.Index(sourceText, "─") + len("─")
	assert.Equal(t, positionMap.UTF8ToUTF16(afterBoxDrawingCharacter), afterBoxDrawingCharacter-2)
	assert.Equal(t, positionMap.UTF8ToUTF16(len(sourceText)), len(sourceText)-2)
}
