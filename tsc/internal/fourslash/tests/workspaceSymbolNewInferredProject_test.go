package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// workspace/symbol used to crash when an open file got kicked out of its tsconfig project
// and then another file from that project was opened. The orphaned file ends up in a fresh
// inferred project, and nothing was building a program for it. Before that, the orphaned
// file's symbols were missing because loading project trees didn't refresh the inferred project.
func TestWorkspaceSymbolNewInferredProject(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @Filename: /home/src/projects/p/tsconfig.json
// @noOpen: true
{ "files": ["a.ts", "b.ts"] }

// @Filename: /home/src/projects/p/a.ts
import "./e";

// @Filename: /home/src/projects/p/b.ts
// @noOpen: true
export const b = 1;

// @Filename: /home/src/projects/p/e.ts
export const e = 1;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// e.ts isn't listed in tsconfig.json, it only gets pulled in by the import in a.ts.
	// Once that import is gone, e.ts should move to the inferred project.
	f.GoToFile(t, "/home/src/projects/p/a.ts")
	f.Replace(t, 0, len(`import "./e";`), "")
	f.VerifyWorkspaceSymbol(t, []*fourslash.VerifyWorkspaceSymbolCase{
		{Pattern: "b", Includes: new([]*lsproto.SymbolInformation{})},
		{Pattern: "e", Includes: new([]*lsproto.SymbolInformation{{
			Name: "e",
			Kind: lsproto.SymbolKindVariable,
			Location: lsproto.Location{
				Uri:   "file:///home/src/projects/p/e.ts",
				Range: lsproto.Range{Start: lsproto.Position{Line: 0, Character: 13}, End: lsproto.Position{Line: 0, Character: 14}},
			},
		}})},
	})

	// The tsconfig project is already up to date, so opening b.ts takes the fast path.
	f.GoToFile(t, "/home/src/projects/p/b.ts")
	f.VerifyWorkspaceSymbol(t, []*fourslash.VerifyWorkspaceSymbolCase{
		{Pattern: "b", Includes: new([]*lsproto.SymbolInformation{})},
	})
}
