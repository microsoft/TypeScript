package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestReferencesInStringLiteralValueWithMultipleProjects(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/a/tsconfig.json
{ "files": ["a.ts"] }
// @Filename: /home/src/workspaces/project/a/a.ts
/// <reference path="../b/b.ts" />
const str: string = "hello/*1*/";
// @Filename: /home/src/workspaces/project/b/tsconfig.json
{ "files": ["b.ts"] }
// @Filename: /home/src/workspaces/project/b/b.ts
const str2: string = "hello/*2*/";`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.MarkTestAsStradaServer()
	f.VerifyBaselineFindAllReferences(t, "1", "2")
}
