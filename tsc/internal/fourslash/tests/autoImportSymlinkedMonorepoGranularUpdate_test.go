package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// TestAutoImportSymlinkedMonorepoGranularUpdate verifies that when a file in a symlinked
// project reference is edited, the auto-import index is updated efficiently via granular
// updates rather than rebuilding the entire node_modules bucket.
//
// Scenario:
//   - project-a references project-b via project references (tsconfig)
//   - project-b is symlinked into project-a's node_modules
//   - Initially, project-b exports projectBValue
//   - We get completions in project-a (builds the initial index)
//   - We edit project-b to add a new export (newlyAddedFunction)
//   - We get completions again in project-a
//   - The new export should be available, proving the granular update worked
func TestAutoImportSymlinkedMonorepoGranularUpdate(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /packages/project-b/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "module": "commonjs",
    "strict": true
  },
  "include": ["src"]
}
// @Filename: /packages/project-b/package.json
{
  "name": "project-b",
  "version": "1.0.0",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  }
}
// @Filename: /packages/project-b/src/index.ts
export const projectBValue: number = 42;
/*projectBEdit*/
// @Filename: /packages/project-b/dist/index.d.ts
export declare const projectBValue: number;
// @Filename: /packages/project-a/tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "references": [{ "path": "../project-b" }]
}
// @Filename: /packages/project-a/package.json
{ "name": "project-a", "dependencies": { "project-b": "*" } }
// @Filename: /packages/project-a/src/index.ts
import { projectBValue } from "project-b";
console.log(projectBValue);
newlyAdded/*projectACompletion*/
// @link: /packages/project-b -> /packages/project-a/node_modules/project-b`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// Get initial completions in project-a - this builds the initial auto-import index.
	// At this point, newlyAddedFunction doesn't exist yet in project-b.
	f.GoToMarker(t, "projectACompletion")
	f.BaselineAutoImportsCompletions(t, []string{"projectACompletion"})

	// Now edit project-b's source file to add a new export.
	// This should trigger a granular update when we request completions again.
	f.GoToMarker(t, "projectBEdit")
	f.Insert(t, "\nexport function newlyAddedFunction(): void {}")

	// Go back to project-a and request completions again.
	// The granular update should have picked up the new export from project-b.
	f.GoToMarker(t, "projectACompletion")
	f.BaselineAutoImportsCompletions(t, []string{"projectACompletion"})
}
