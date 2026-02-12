package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

const TestAutoImportTransitiveLeakScenario = `
// @Filename: /home/src/workspaces/project/tsconfig.base.json
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "composite": true
  }
}

// @Filename: /home/src/workspaces/project/packages/foo/package.json
{
  "name": "@packages/foo",
  "type": "module",
  "exports": {
    ".": {
	  "types": "./src/index.ts",
	  "default": "./dist/index.js"
	}
  },
  "imports": {
    "#*": {
	  "types": "./src/*.ts",
      "default": "./dist/*.js"
    }
  }
}

// @Filename: /home/src/workspaces/project/packages/foo/tsconfig.json
{ "extends": "../../tsconfig.base.json" }

// @Filename: /home/src/workspaces/project/packages/foo/src/internal/index.ts
export function fooInternal() {
  console.log("foo");
}

// @Filename: /home/src/workspaces/project/packages/foo/src/index.ts
import { fooInternal } from "#internal/index"
export function foo() {
  fooInternal();
}

// @Filename: /home/src/workspaces/project/packages/bar/package.json
{
  "name": "@packages/bar",
  "type": "module",
  "exports": {
    ".": {
	  "types": "./src/index.ts",
	  "default": "./dist/index.js"
	}
  },
  "imports": {
    "#*": {
	  "types": "./src/*.ts",
      "default": "./dist/*.js"
    }
  },
  "dependencies": {
    "@packages/foo": "*"
  }
}

// @Filename: /home/src/workspaces/project/packages/bar/tsconfig.json
{ "extends": "../../tsconfig.base.json" }

// @Filename: /home/src/workspaces/project/packages/bar/src/index.ts
import { foo } from "@packages/foo"

fo/*fooCompletion*/

// @Filename: /home/src/workspaces/project/package.json
{ "workspaces": ["packages/*"], "type": "module" }

// @link: /home/src/workspaces/project/packages/bar -> /home/src/workspaces/project/node_modules/@packages/bar
// @link: /home/src/workspaces/project/packages/foo -> /home/src/workspaces/project/node_modules/@packages/foo
`

func TestAutoImportTransitiveLeak(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, TestAutoImportTransitiveLeakScenario)

	defer done()

	f.VerifyCompletions(t, "fooCompletion", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:               "foo",
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            new(string(ls.SortTextLocationPriority)),
				},
			},
			Excludes: []string{"fooInternal"},
		},
	})
}
