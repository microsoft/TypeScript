package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestAutoImportAutomaticJsxRuntimeCrash(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /project/node_modules/pkg/package.json
{ "name": "pkg", "types": "index.tsx" }
// @Filename: /project/node_modules/pkg/index.tsx
/** @jsxRuntime automatic */
const container = { Widget: { value: <div /> } satisfies {} };
export default container.Widget;
// @Filename: /project/package.json
{ "dependencies": { "pkg": "*" } }
// @Filename: /project/tsconfig.json
{ "compilerOptions": { "jsx": "react-jsx" } }
// @Filename: /project/index.ts
Widg/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		UserPreferences: &lsutil.UserPreferences{
			IncludeCompletionsForModuleExports:    core.TSTrue,
			IncludeCompletionsForImportStatements: core.TSTrue,
		},
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"Widget"},
		},
	})
}

func TestAutoImportAutomaticJsxRuntimeProjectReferenceCrash(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @Filename: /packages/lib/package.json
{ "name": "lib", "types": "out/index.d.ts" }

// @Filename: /packages/lib/tsconfig.json
{ "compilerOptions": { "composite": true, "jsx": "react-jsx", "outDir": "out" } }

// @Filename: /packages/lib/index.tsx
/** @jsxRuntime automatic */
const container = { Widget: { value: <div /> } satisfies {} };
export default container.Widget;

// @Filename: /packages/app/package.json
{ "dependencies": { "lib": "*" } }

// @Filename: /packages/app/tsconfig.json
{ "references": [{ "path": "../lib" }] }

// @Filename: /packages/app/index.ts
Widg/**/

// @link: /packages/lib -> /packages/app/node_modules/lib
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		UserPreferences: &lsutil.UserPreferences{
			IncludeCompletionsForModuleExports:    core.TSTrue,
			IncludeCompletionsForImportStatements: core.TSTrue,
		},
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"Widget"},
		},
	})
}
