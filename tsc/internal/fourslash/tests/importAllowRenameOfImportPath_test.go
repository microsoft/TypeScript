package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestAllowRenameOfImportPath(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
export const x = 0;
// @Filename: /dir/index.ts
export const x = 0;
// @Filename: /b.ts
import * as a from "./[|a|]";
import * as dir from "./[|dir|]";
import * as dir2 from "./dir/[|index|]";
// @Filename: /c.js
const a = require("./[|a|]");
`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	prefsTrue := lsutil.UserPreferences{
		IncludeCompletionsForModuleExports:    core.TSTrue,
		IncludeCompletionsForImportStatements: core.TSTrue,
		AllowRenameOfImportPath:               core.TSTrue,
	}
	prefsFalse := lsutil.UserPreferences{
		IncludeCompletionsForModuleExports:    core.TSTrue,
		IncludeCompletionsForImportStatements: core.TSTrue,
		AllowRenameOfImportPath:               core.TSFalse,
	}
	markers := []string{"a", "dir", "index"}
	f.Configure(t, prefsTrue)
	f.GoToEachMarker(t, markers, func(marker *fourslash.Marker, index int) {
		f.VerifyRenameSucceeded(t, &prefsTrue)
	})

	f.Configure(t, prefsFalse)
	f.GoToEachMarker(t, markers, func(marker *fourslash.Marker, index int) {
		f.VerifyRenameFailed(t, &prefsFalse)
	})
}

func TestRenameInfoForImportPathTriggerSpan(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /library.ts
export const foo = "bar";
// @Filename: /index.ts
export * from "./[|lib/*rename*/rary|]";
`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "rename")
	f.VerifyRenameRange(t, f.Ranges()[0].LSRange, "library", &lsutil.UserPreferences{
		AllowRenameOfImportPath: core.TSTrue,
	})
}
