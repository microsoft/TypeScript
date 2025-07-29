package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPathCompletionsPackageJsonExportsWildcard5(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @Filename: /node_modules/foo/package.json
{
  "name": "foo",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/types/index.d.mts",
        "default": "./dist/esm/index.mjs"
      },
      "default": {
        "types": "./dist/types/index.d.ts",
        "default": "./dist/cjs/index.js"
      }
    },
    "./*": {
      "import": {
        "types": "./dist/types/*.d.mts",
        "default": "./dist/esm/*.mjs"
      },
      "default": {
        "types": "./dist/types/*.d.ts",
        "default": "./dist/cjs/*.js"
      }
    },
    "./only-in-cjs": {
      "require": {
        "types": "./dist/types/only-in-cjs/index.d.ts",
        "default": "./dist/cjs/only-in-cjs/index.js"
      }
    }
  }
}
// @Filename: /node_modules/foo/dist/types/index.d.mts
export const index = 0;
// @Filename: /node_modules/foo/dist/types/index.d.ts
export const index = 0;
// @Filename: /node_modules/foo/dist/types/blah.d.mts
export const blah = 0;
// @Filename: /node_modules/foo/dist/types/blah.d.ts
export const blah = 0;
// @Filename: /node_modules/foo/dist/types/only-in-cjs/index.d.ts
export const onlyInCjs = 0;
// @Filename: /index.mts
import { } from "foo//**/";`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "blah",
					Kind:  PtrTo(lsproto.CompletionItemKindFile),
				},
				&lsproto.CompletionItem{
					Label: "index",
					Kind:  PtrTo(lsproto.CompletionItemKindFile),
				},
			},
		},
	})
}
