package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// TestAutoImportSymlinkedMonorepoProjectReferencesNoPkgExports verifies deduplication
// when a monorepo package has both src and dist files, uses project references,
// but does NOT have package.json "exports" to limit what files are discovered.
//
// Scenario:
//   - project-a references project-b via project references (tsconfig)
//   - project-b is also symlinked into project-a's node_modules
//   - project-b has both src/index.ts and dist/index.d.ts
//   - package.json does NOT have "exports", so node_modules search finds BOTH src and dist
//   - The program resolves imports to src files via project reference mapping
//   - We should NOT see duplicate auto-imports (one from src, one from dist)
func TestAutoImportSymlinkedMonorepoProjectReferencesNoPkgExports(t *testing.T) {
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
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
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
