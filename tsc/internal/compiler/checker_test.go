package compiler

import (
	"testing"
	"testing/fstest"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/bundled"
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
	}, false /*useCaseSensitiveFileNames*/)
	fs = bundled.WrapFS(fs)

	cd := "/"
	host := NewCompilerHost(nil, "/", fs)
	opts := ProgramOptions{
		Host:               host,
		RootPath:           cd,
		DefaultLibraryPath: bundled.LibPath(),
	}
	p := NewProgram(opts)
	p.bindSourceFiles()
	c := p.getTypeChecker()
	file := p.filesByPath["/foo.ts"]
	interfaceId := file.Statements.Nodes[0].Name()
	varId := file.Statements.Nodes[1].AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes[0].Name()
	propAccess := file.Statements.Nodes[2].AsExpressionStatement().Expression
	nodes := []*ast.Node{interfaceId, varId, propAccess}
	for _, node := range nodes {
		symbol := c.getSymbolAtLocation(node, true /*ignoreErrors*/)
		if symbol == nil {
			t.Fatalf("Expected symbol to be non-nil")
		}
	}
}
