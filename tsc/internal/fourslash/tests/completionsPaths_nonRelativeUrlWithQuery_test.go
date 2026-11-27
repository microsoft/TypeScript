package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionsPaths_nonRelativeUrlWithQuery(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "bundler",
        "paths": {
            "@/*": ["./src/*"]
        }
    }
}
// @Filename: /node_modules/foo/index.d.ts
export declare const x: number;
// @Filename: /src/a.ts
import {} from "https://esm.sh/foo?alias=react:preact//*1*/";
import {} from "https://esm.sh/foo#react//*2*/";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, []string{"1", "2"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{},
		},
	})
}

func TestCompletionsPaths_nonRelativeUrlWithQueryWildcardPathMapping(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// `require` in a .ts file is not resolved during program construction, so this only exercises completions.
	const content = `// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "bundler",
        "paths": {
            "*": ["./src/*"]
        }
    }
}
// @Filename: /node_modules/foo/index.d.ts
export declare const x: number;
// @Filename: /src/b.ts
export const b = 1;
// @Filename: /src/a.ts
declare function require(path: string): any;
require("https://esm.sh/foo?alias=react:preact//*1*/");
require("https://esm.sh/foo#react//*2*/");`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, []string{"1", "2"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{},
		},
	})
}
