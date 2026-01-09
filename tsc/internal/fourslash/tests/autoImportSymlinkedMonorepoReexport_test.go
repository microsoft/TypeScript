package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// TestAutoImportSymlinkedMonorepoReexport verifies deduplication when a monorepo
// package re-exports symbols from deeper files via `export *`.
//
// Scenario:
//   - project-a references project-b via project references (tsconfig)
//   - project-b is symlinked into project-a's node_modules
//   - project-b has src/utils/foo.ts with the actual export
//   - project-b has src/index.ts with `export * from './utils/foo'`
//   - The Export's Path field points to src/utils/foo.ts (where symbol is defined)
//   - This path must also go through realpath normalization for deduplication
//   - We should NOT see duplicate auto-imports
func TestAutoImportSymlinkedMonorepoReexport(t *testing.T) {
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
// @Filename: /packages/project-b/src/utils/foo.ts
export function projectBFunction(): string { return "hello"; }
// @Filename: /packages/project-b/src/index.ts
export * from './utils/foo';
export const projectBValue: number = 42;
// @Filename: /packages/project-b/dist/utils/foo.d.ts
export declare function projectBFunction(): string;
// @Filename: /packages/project-b/dist/index.d.ts
export * from './utils/foo';
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
projectBFunction/**/
// @link: /packages/project-b -> /packages/project-a/node_modules/project-b`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.GoToMarker(t, "")
	// This should show projectBFunction once via re-export and once via direct import, not duplicates
	f.VerifyImportFixAtPosition(t, []string{
		`import { projectBFunction, projectBValue } from "project-b";
console.log(projectBValue);
projectBFunction`,
		`import { projectBValue } from "project-b";
import { projectBFunction } from "project-b/src/utils/foo";
console.log(projectBValue);
projectBFunction`,
	}, nil /*preferences*/)
}
