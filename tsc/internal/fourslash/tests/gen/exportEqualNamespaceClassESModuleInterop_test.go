package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestExportEqualNamespaceClassESModuleInterop(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @esModuleInterop: true
// @moduleResolution: node
// @target: es2015
// @module: esnext
// @Filename: /node_modules/@bar/foo/index.d.ts
export = Foo;
declare class Foo {}
declare namespace Foo {}  // class/namespace declaration causes the issue
// @Filename: /node_modules/foo/index.d.ts
import * as Foo from "@bar/foo";
export = Foo;
// @Filename: /index.ts
import Foo from "foo";
/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "/index.ts")
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"Foo",
			},
		},
	})
}
