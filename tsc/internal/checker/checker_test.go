package checker_test

import (
	"testing"
	"testing/fstest"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

func TestGetSymbolAtLocation(t *testing.T) {
	t.Parallel()

	content := `interface Foo {
  bar: string;
}
declare const foo: Foo;
foo.bar;`
	fs := vfstest.FromMapFS(fstest.MapFS{
		"foo.ts": &fstest.MapFile{
			Data: []byte(content),
		},
		"tsconfig.json": &fstest.MapFile{
			Data: []byte(`
				{
					"compilerOptions": {}
				}
			`),
		},
	}, false /*useCaseSensitiveFileNames*/)
	fs = bundled.WrapFS(fs)

	cd := "/"
	host := compiler.NewCompilerHost(nil, cd, fs)
	opts := compiler.ProgramOptions{
		Host:               host,
		ConfigFilePath:     "/tsconfig.json",
		DefaultLibraryPath: bundled.LibPath(),
	}
	p := compiler.NewProgram(opts)
	p.BindSourceFiles()
	c := p.GetTypeChecker()
	file := p.GetSourceFile("/foo.ts")
	interfaceId := file.Statements.Nodes[0].Name()
	varId := file.Statements.Nodes[1].AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes[0].Name()
	propAccess := file.Statements.Nodes[2].AsExpressionStatement().Expression
	nodes := []*ast.Node{interfaceId, varId, propAccess}
	for _, node := range nodes {
		symbol := c.GetSymbolAtLocation(node)
		if symbol == nil {
			t.Fatalf("Expected symbol to be non-nil")
		}
	}
}

func TestCheckSrcCompiler(t *testing.T) {
	t.Parallel()

	repo.SkipIfNoTypeScriptSubmodule(t)
	fs := vfs.FromOS()
	fs = bundled.WrapFS(fs)

	rootPath := tspath.CombinePaths(tspath.NormalizeSlashes(repo.TypeScriptSubmodulePath), "src", "compiler")

	host := compiler.NewCompilerHost(nil, rootPath, fs)
	opts := compiler.ProgramOptions{
		Host:               host,
		ConfigFilePath:     tspath.CombinePaths(rootPath, "tsconfig.json"),
		DefaultLibraryPath: bundled.LibPath(),
	}
	p := compiler.NewProgram(opts)
	p.CheckSourceFiles()
}
