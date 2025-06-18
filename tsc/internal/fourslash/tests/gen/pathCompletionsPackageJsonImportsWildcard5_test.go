package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPathCompletionsPackageJsonImportsWildcard5(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @Filename: /package.json
{
  "name": "foo",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "imports": {
    "#*": {
      "import": {
        "types": "./dist/types/*.d.mts",
        "default": "./dist/esm/*.mjs"
      },
      "default": {
        "types": "./dist/types/*.d.ts",
        "default": "./dist/cjs/*.js"
      }
    },
    "#only-in-cjs": {
      "require": {
        "types": "./dist/types/only-in-cjs/index.d.ts",
        "default": "./dist/cjs/only-in-cjs/index.js"
      }
    }
  }
}
// @Filename: /dist/types/index.d.mts
export const index = 0;
// @Filename: /dist/types/index.d.ts
export const index = 0;
// @Filename: /dist/types/blah.d.mts
export const blah = 0;
// @Filename: /dist/types/blah.d.ts
export const blah = 0;
// @Filename: /dist/types/only-in-cjs/index.d.ts
export const onlyInCjs = 0;
// @Filename: /index.mts
import { } from "/**/";`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &[]string{},
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindFile), Label: "#blah"}, &lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindFile), Label: "#index"}},
		},
	})
}
