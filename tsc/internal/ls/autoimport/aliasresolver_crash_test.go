package autoimport

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/binder"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
)

type fakeCloneHost struct {
	fs vfs.FS
}

func (h *fakeCloneHost) FS() vfs.FS                                      { return h.fs }
func (h *fakeCloneHost) GetCurrentDirectory() tspath.RootedDirectoryPath { return "/" }
func (h *fakeCloneHost) GetDefaultProject(path tspath.PathKey) (tspath.PathKey, *compiler.Program) {
	return "", nil
}

func (h *fakeCloneHost) GetProgramForProject(projectPath tspath.PathKey) *compiler.Program {
	return nil
}

func (h *fakeCloneHost) GetPackageJson(fileName tspath.RootedFilePath) *packagejson.InfoCacheEntry {
	return nil
}

func (h *fakeCloneHost) GetSourceFile(fileName tspath.RootedFilePath, path tspath.PathKey) *ast.SourceFile {
	return nil
}
func (h *fakeCloneHost) Dispose() {}

var _ RegistryCloneHost = (*fakeCloneHost)(nil)

// Regression test for microsoft/typescript-go#4322.
//
// During auto-import export extraction, the checker is built on top of an
// aliasResolver standing in for a real program. This file has a type error, and
// extracting exports should still complete without crashing.
func TestAliasResolverGetDiagnosticsDoesNotPanic(t *testing.T) {
	t.Parallel()

	const fileName = "/pkg/index.ts"
	text := "declare function f(arg: { a: string }): () => void;\nexport const x = f({ a: 1 });\n"

	fs := vfstest.FromMap(map[string]string{fileName: text}, tspath.CaseSensitive /*caseSensitivity*/)
	host := &fakeCloneHost{fs: fs}

	sourceFile := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: fileName,
		PathKey:  tspath.PathKey(fileName),
	}, text, core.ScriptKindTS)
	binder.BindSourceFile(sourceFile)

	resolver := module.NewResolver(host, host.GetCurrentDirectory(), core.EmptyCompilerOptions, "", "", nil)
	r := newAliasResolver(
		[]*ast.SourceFile{sourceFile},
		nil,
		host,
		resolver,
		func(ast.HasFileName, string) {},
	)

	ch, _ := checker.NewChecker(r, nil)

	// Type-checking this file's diagnostics must not panic.
	ch.GetDiagnostics(context.Background(), sourceFile)
}
