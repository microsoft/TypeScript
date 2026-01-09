package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// TestAutoImportSymlinkedMonorepoProjectReferences verifies that when a monorepo package
// is symlinked into node_modules and has both src and dist files with project references,
// auto-imports don't show duplicates.
//
// Scenario:
//   - project-a references project-b via project references (tsconfig)
//   - project-b is also symlinked into project-a's node_modules
//   - project-b has both src/index.ts and dist/index.d.ts
//   - package.json "exports" points to dist files
//   - The node_modules bucket finds dist/.d.ts files
//   - The program resolves to src files via project reference mapping
//   - We should NOT see duplicate auto-imports (one from src, one from dist)
func TestAutoImportSymlinkedMonorepoProjectReferences(t *testing.T) {
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
export function projectBFunction(): string { return "hello"; }
// @Filename: /packages/project-b/dist/index.d.ts
export declare const projectBValue: number;
export declare function projectBFunction(): string;
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
projectBFunc/**/
// @link: /packages/project-b -> /packages/project-a/node_modules/project-b`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.GoToMarker(t, "")
	// This should show projectBFunction once, not twice (not from both src and dist)
	f.BaselineAutoImportsCompletions(t, []string{""})
}
