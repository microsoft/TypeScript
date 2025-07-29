package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPathCompletionsTypesVersionsWildcard4(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @Filename: /node_modules/foo/package.json
{
  "types": "index.d.ts",
  "typesVersions": {
    ">=4.3.5": {
      "component-*": ["cjs/components/*"]
    }
  }
}
// @Filename: /node_modules/foo/nope.d.ts
export const nope = 0;
// @Filename: /node_modules/foo/cjs/components/index.d.ts
export const index = 0;
// @Filename: /node_modules/foo/cjs/components/blah.d.ts
export const blah = 0;
// @Filename: /node_modules/foo/cjs/components/subfolder/one.d.ts
export const one = 0;
// @Filename: /a.ts
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
				"component-blah",
				"component-index",
				"component-subfolder",
				"nope",
				"cjs",
			},
		},
	})
	f.Insert(t, "component-subfolder/")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"one",
			},
		},
	})
}
