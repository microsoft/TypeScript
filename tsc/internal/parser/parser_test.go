package parser_test

import (
	"io/fs"
	"iter"
	"os"
	"path/filepath"
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

			fileName := tspath.GetNormalizedAbsolutePath(f.Path(), "/")
			path := tspath.ToPath(fileName, "/", osvfs.FS().UseCaseSensitiveFileNames())
			sourceText := f.ReadFile(b)
			scriptKind := core.GetScriptKindFromFileName(fileName)

			opts := ast.SourceFileParseOptions{
				FileName: fileName,
				Path:     path,
			}

			for b.Loop() {
				parser.ParseSourceFile(opts, sourceText, scriptKind)
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

		fileName := "/index" + extension
		path := tspath.Path(fileName)

		opts := ast.SourceFileParseOptions{
			FileName: fileName,
			Path:     path,
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
		Path:     "/index.ts",
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

func TestParseEscapedImportPhaseAsDefaultBinding(t *testing.T) {
	t.Parallel()
	tests := []struct {
		source      string
		bindingName string
	}{
		{source: `import d\u0065fer from "./module.js";`, bindingName: "defer"},
		{source: `import s\u006furce from "./module.js";`, bindingName: "source"},
	}

	for _, test := range tests {
		t.Run(test.bindingName, func(t *testing.T) {
			t.Parallel()
			file := parsetestutil.ParseTypeScript(test.source, false)
			parsetestutil.CheckDiagnostics(t, file)
			assert.Equal(t, len(file.Statements.Nodes), 1)

			statement := file.Statements.Nodes[0]
			assert.Assert(t, ast.IsImportDeclaration(statement))

			clause := statement.AsImportDeclaration().ImportClause.AsImportClause()
			assert.Equal(t, clause.PhaseModifier, ast.KindUnknown)
			assert.Equal(t, clause.Name().Text(), test.bindingName)
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
		Path:     "/index.js",
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
		Path:     "/index.js",
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
		Path:     "/index.js",
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

func TestSourceFilePositionMapWithNonASCIIStringLiteral(t *testing.T) {
	t.Parallel()
	sourceText := `const x = "─";

namespace N {
  export const y = x;
}
`
	opts := ast.SourceFileParseOptions{
		FileName: "/index.ts",
		Path:     "/index.ts",
	}

	file := parser.ParseSourceFile(opts, sourceText, core.ScriptKindTS)

	positionMap := file.GetPositionMap()
	assert.Assert(t, !positionMap.IsAsciiOnly())
	afterBoxDrawingCharacter := strings.Index(sourceText, "─") + len("─")
	assert.Equal(t, positionMap.UTF8ToUTF16(afterBoxDrawingCharacter), afterBoxDrawingCharacter-2)
	assert.Equal(t, positionMap.UTF8ToUTF16(len(sourceText)), len(sourceText)-2)
}
