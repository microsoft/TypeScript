package transformers

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/testutil/emittestutil"
	"github.com/microsoft/typescript-go/internal/testutil/parsetestutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type fakeProgram struct {
	singleThreaded              bool
	compilerOptions             *core.CompilerOptions
	files                       []*ast.SourceFile
	getEmitModuleFormatOfFile   func(sourceFile *ast.SourceFile) core.ModuleKind
	getImpliedNodeFormatForEmit func(sourceFile *ast.SourceFile) core.ModuleKind
	getResolvedModule           func(currentSourceFile *ast.SourceFile, moduleReference string) *ast.SourceFile
}

func (p *fakeProgram) Options() *core.CompilerOptions {
	return p.compilerOptions
}

func (p *fakeProgram) SourceFiles() []*ast.SourceFile {
	return p.files
}

func (p *fakeProgram) BindSourceFiles() {
	wg := core.NewWorkGroup(p.singleThreaded)
	for _, file := range p.files {
		if !file.IsBound() {
			wg.Queue(func() {
				binder.BindSourceFile(file, p.compilerOptions.SourceFileAffecting())
			})
		}
	}
	wg.RunAndWait()
}

func (p *fakeProgram) GetEmitModuleFormatOfFile(sourceFile *ast.SourceFile) core.ModuleKind {
	return p.getEmitModuleFormatOfFile(sourceFile)
}

func (p *fakeProgram) GetImpliedNodeFormatForEmit(sourceFile *ast.SourceFile) core.ModuleKind {
	return p.getImpliedNodeFormatForEmit(sourceFile)
}

func (p *fakeProgram) GetResolvedModule(currentSourceFile *ast.SourceFile, moduleReference string) *ast.SourceFile {
	return p.getResolvedModule(currentSourceFile, moduleReference)
}

func (p *fakeProgram) GetSourceFileMetaData(path tspath.Path) *ast.SourceFileMetaData {
	return nil
}

func (p *fakeProgram) GetImportHelpersImportSpecifier(path tspath.Path) *ast.Node {
	return nil
}

func (p *fakeProgram) GetJSXRuntimeImportSpecifier(path tspath.Path) (moduleReference string, specifier *ast.Node) {
	return "", nil
}

func TestImportElision(t *testing.T) {
	t.Parallel()
	data := []struct {
		title  string
		input  string
		output string
		other  string
		jsx    bool
	}{
		{title: "ImportEquals#1", input: "import x = require(\"other\"); x;", output: "import x = require(\"other\");\nx;"},
		{title: "ImportEquals#2", input: "import x = require(\"other\");", output: ""},
		{title: "ImportDeclaration#1", input: `import "m";`, output: `import "m";`},
		{title: "ImportDeclaration#2", input: "import * as x from \"other\"; x;", output: "import * as x from \"other\";\nx;"},
		{title: "ImportDeclaration#3", input: "import x from \"other\"; x;", output: "import x from \"other\";\nx;"},
		{title: "ImportDeclaration#4", input: "import { x } from \"other\"; x;", output: "import { x } from \"other\";\nx;"},
		{title: "ImportDeclaration#5", input: "import * as x from \"other\";", output: ""},
		{title: "ImportDeclaration#6", input: "import x from \"other\";", output: ""},
		{title: "ImportDeclaration#7", input: "import { x } from \"other\";", output: ""},
		{title: "ExportDeclaration#1", input: "export * from \"other\";", other: "export let x;", output: "export * from \"other\";"},
		{title: "ExportDeclaration#2", input: "export * as x from \"other\";", other: "export let x;", output: "export * as x from \"other\";"},
		{title: "ExportDeclaration#3", input: "export * from \"other\";", other: "export let x;", output: "export * from \"other\";"},
		{title: "ExportDeclaration#4", input: "export * as x from \"other\";", other: "export let x;", output: "export * as x from \"other\";"},
		{title: "ExportDeclaration#5", input: "export { x } from \"other\";", other: "export let x;", output: "export { x } from \"other\";"},
		{title: "ExportDeclaration#6", input: "export { x } from \"other\";", other: "export type x = any;", output: ""},
		{title: "ExportDeclaration#7", input: "export { x }; let x;", output: "export { x };\nlet x;"},
		{title: "ExportDeclaration#8", input: "export { x }; type x = any;", output: ""},
		{title: "ExportDeclaration#9", input: "import { x } from \"other\"; export { x };", other: "export type x = any;", output: ""},
		{title: "ExportAssignment#1", input: "let x; export default x;", output: "let x;\nexport default x;"},
		{title: "ExportAssignment#2", input: "type x = any; export default x;", output: ""},
	}

	for _, rec := range data {
		t.Run(rec.title, func(t *testing.T) {
			t.Parallel()

			file := parsetestutil.ParseTypeScript(rec.input, rec.jsx)
			parsetestutil.CheckDiagnostics(t, file)
			files := []*ast.SourceFile{file}

			var other *ast.SourceFile
			if len(rec.other) > 0 {
				other = parsetestutil.ParseTypeScript(rec.other, rec.jsx)
				parsetestutil.CheckDiagnostics(t, other)
				files = append(files, other)
			}

			compilerOptions := &core.CompilerOptions{}

			c := checker.NewChecker(&fakeProgram{
				singleThreaded:  true,
				compilerOptions: compilerOptions,
				files:           files,
				getEmitModuleFormatOfFile: func(sourceFile *ast.SourceFile) core.ModuleKind {
					return core.ModuleKindESNext
				},
				getImpliedNodeFormatForEmit: func(sourceFile *ast.SourceFile) core.ModuleKind {
					return core.ModuleKindESNext
				},
				getResolvedModule: func(currentSourceFile *ast.SourceFile, moduleReference string) *ast.SourceFile {
					if currentSourceFile == file && moduleReference == "other" {
						return other
					}
					return nil
				},
			})

			emitResolver := c.GetEmitResolver(file, false /*skipDiagnostics*/)
			emitResolver.MarkLinkedReferencesRecursively(file)

			emitContext := printer.NewEmitContext()
			file = NewTypeEraserTransformer(emitContext, compilerOptions).TransformSourceFile(file)
			file = NewImportElisionTransformer(emitContext, compilerOptions, emitResolver).TransformSourceFile(file)
			emittestutil.CheckEmit(t, nil, file, rec.output)
		})
	}
}
