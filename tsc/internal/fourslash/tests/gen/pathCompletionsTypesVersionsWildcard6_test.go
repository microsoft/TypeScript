package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPathCompletionsTypesVersionsWildcard6(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @Filename: /node_modules/foo/package.json
{
  "types": "index.d.ts",
  "typesVersions": {
    "*": {
      "bar/*": ["dist/*"],
      "exact-match": ["dist/index.d.ts"],
      "foo/*": ["dist/*"],
      "*": ["dist/*"]
    }
  }
}
// @Filename: /node_modules/foo/nope.d.ts
export const nope = 0;
// @Filename: /node_modules/foo/dist/index.d.ts
export const index = 0;
// @Filename: /node_modules/foo/dist/blah.d.ts
export const blah = 0;
// @Filename: /node_modules/foo/dist/foo/onlyInFooFolder.d.ts
export const foo = 0;
// @Filename: /node_modules/foo/dist/subfolder/one.d.ts
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
				"bar",
				"exact-match",
				"foo",
				"blah",
				"index",
				"subfolder",
			},
		},
	})
	f.Insert(t, "foo/")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"blah",
				"index",
				"foo",
				"subfolder",
			},
		},
	})
	f.Insert(t, "foo/")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"onlyInFooFolder",
			},
		},
	})
}
