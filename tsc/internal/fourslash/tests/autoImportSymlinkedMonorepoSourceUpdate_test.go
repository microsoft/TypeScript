package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

const TestAutoImportSymlinkedMonorepoSourceUpdateScenario = `
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
  }
}

// @Filename: /home/src/workspaces/project/packages/foo/tsconfig.json
{ "extends": "../../tsconfig.base.json" }

// @Filename: /home/src/workspaces/project/packages/foo/src/index.ts
/*fooEdit*/

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
  "dependencies": {
    "@packages/foo": "*"
  }
}

// @Filename: /home/src/workspaces/project/packages/bar/tsconfig.json
{ "extends": "../../tsconfig.base.json" }

// @Filename: /home/src/workspaces/project/packages/bar/src/index.ts
/*fooCompletion*/

// @Filename: /home/src/workspaces/project/package.json
{ "workspaces": ["packages/*"], "type": "module" }

// @link: /home/src/workspaces/project/packages/bar -> /home/src/workspaces/project/node_modules/@packages/bar
// @link: /home/src/workspaces/project/packages/foo -> /home/src/workspaces/project/node_modules/@packages/foo
`

func TestAutoImportSymlinkedMonorepoSourceUpdate(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, TestAutoImportSymlinkedMonorepoSourceUpdateScenario)

	defer done()

	// Force auto import to build the cache (no exports yet).
	f.GoToMarker(t, "fooCompletion")
	f.BaselineAutoImportsCompletions(t, []string{"fooCompletion"})

	// Add a new export to the symlinked source package.
	f.GoToMarker(t, "fooEdit")
	f.Insert(t, "\nexport function foo() {}")

	// The new export should appear via granular cache update.
	f.GoToMarker(t, "fooCompletion")
	f.BaselineAutoImportsCompletions(t, []string{"fooCompletion"})
}
