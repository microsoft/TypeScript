package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// TestAutoImportCrossProjectNodeModules verifies that when multiple projects share
// a node_modules directory, auto-imports for a project only show packages that are
// either listed in that project's package.json dependencies OR directly imported
// by that project's files.
//
// Scenario:
//   - Two separate projects (project-a and project-b) share a root node_modules
//   - pkg-listed is in both package.json dependencies
//   - pkg-unlisted is NOT in any package.json, but project-a imports it directly
//   - When requesting completions in project-b, pkg-unlisted should NOT appear
//     because project-b doesn't list it and doesn't import it directly.
func TestAutoImportCrossProjectNodeModules(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /node_modules/pkg-listed/package.json
{ "name": "pkg-listed", "version": "1.0.0" }
// @Filename: /node_modules/pkg-listed/index.d.ts
export declare const pkg_listed_value: number;
// @Filename: /node_modules/pkg-unlisted/package.json
{ "name": "pkg-unlisted", "version": "1.0.0" }
// @Filename: /node_modules/pkg-unlisted/index.d.ts
export declare const pkg_unlisted_value: string;
// @Filename: /project-a/tsconfig.json
{ "compilerOptions": { "module": "commonjs", "strict": true } }
// @Filename: /project-a/package.json
{ "name": "project-a", "dependencies": { "pkg-listed": "*" } }
// @Filename: /project-a/index.ts
import { pkg_unlisted_value } from "pkg-unlisted";
console.log(pkg_unlisted_value);
// @Filename: /project-b/tsconfig.json
{ "compilerOptions": { "module": "commonjs", "strict": true } }
// @Filename: /project-b/package.json
{ "name": "project-b", "dependencies": { "pkg-listed": "*" } }
// @Filename: /project-b/index.ts
pkg_/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// Open project-a's file first - this establishes that project-a imports pkg-unlisted
	f.GoToFile(t, "/project-a/index.ts")

	// Now go to project-b and baseline auto-imports
	f.GoToMarker(t, "")
	f.BaselineAutoImportsCompletions(t, []string{""})
}
