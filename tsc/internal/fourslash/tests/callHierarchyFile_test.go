package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCallHierarchyFile(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /src/callers.ts
foo();
function /**/foo() {
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifyBaselineCallHierarchy(t)
}

func TestCallHierarchyFileWorkspace(t *testing.T) {
	t.Parallel()
	const content = `// @Filename: /workspace/project/tsconfig.json
{}
// @Filename: /workspace/project/src/callers.ts
foo();
function /**/foo() {
}`
	for _, test := range []struct {
		name   string
		params *lsproto.InitializeParams
	}{
		{
			name: "callHierarchyFileWorkspaceRootUri",
			params: &lsproto.InitializeParams{
				RootUri: lsproto.DocumentUriOrNull{DocumentUri: new(lsproto.DocumentUri("file:///workspace"))},
			},
		},
		{
			name: "callHierarchyFileWorkspaceFolderRoot",
			params: &lsproto.InitializeParams{
				WorkspaceFolders: &lsproto.WorkspaceFoldersOrNull{WorkspaceFolders: new([]*lsproto.WorkspaceFolder{
					{Uri: "file:///workspace/project/src", Name: "source"},
				})},
			},
		},
		{
			name: "callHierarchyFileWorkspaceFolders",
			params: &lsproto.InitializeParams{
				RootUri: lsproto.DocumentUriOrNull{DocumentUri: new(lsproto.DocumentUri("file:///wrong"))},
				WorkspaceFolders: &lsproto.WorkspaceFoldersOrNull{WorkspaceFolders: new([]*lsproto.WorkspaceFolder{
					{Uri: "file:///workspace", Name: "outer"},
					{Uri: "file:///workspace/project", Name: "inner"},
				})},
			},
		},
		{
			name: "callHierarchyFileNestedWorkspaceRoot",
			params: &lsproto.InitializeParams{
				WorkspaceFolders: &lsproto.WorkspaceFoldersOrNull{WorkspaceFolders: new([]*lsproto.WorkspaceFolder{
					{Uri: "file:///workspace", Name: "outer"},
					{Uri: "file:///workspace/project/src", Name: "inner"},
				})},
			},
		},
		{
			name: "callHierarchyFileOutsideWorkspace",
			params: &lsproto.InitializeParams{
				RootUri: lsproto.DocumentUriOrNull{DocumentUri: new(lsproto.DocumentUri("file:///work"))},
			},
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslashWithOptions(t, content, &fourslash.FourslashOptions{InitializeParams: test.params})
			defer done()
			f.GoToMarker(t, "")
			f.VerifyBaselineCallHierarchy(t)
		})
	}
}
