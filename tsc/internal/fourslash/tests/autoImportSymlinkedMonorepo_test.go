package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// TestAutoImportSymlinkedMonorepo verifies that when a monorepo package is symlinked
// into node_modules and imported, auto-imports don't show duplicates.
//
// Scenario:
//   - project-a imports "project-b" via a symlink in node_modules
//   - project-b's source files are at /packages/project-b but symlinked to
//     /packages/project-a/node_modules/project-b
//   - The program contains project-b files via realpath, AND the symlink exists in node_modules
//   - We should NOT see duplicate auto-imports for project-b exports
func TestAutoImportSymlinkedMonorepo(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /packages/project-b/package.json
{ "name": "project-b", "version": "1.0.0", "main": "index.js", "types": "index.d.ts" }
// @Filename: /packages/project-b/index.d.ts
export declare const projectBValue: number;
export declare function projectBFunction(): string;
// @Filename: /packages/project-a/tsconfig.json
{ "compilerOptions": { "module": "commonjs", "strict": true } }
// @Filename: /packages/project-a/package.json
{ "name": "project-a", "dependencies": { "project-b": "*" } }
// @Filename: /packages/project-a/index.ts
import { projectBValue } from "project-b";
console.log(projectBValue);
projectBFunc/**/
// @link: /packages/project-b -> /packages/project-a/node_modules/project-b`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.GoToMarker(t, "")
	// This should show projectBFunction once, not twice
	f.BaselineAutoImportsCompletions(t, []string{""})
}
