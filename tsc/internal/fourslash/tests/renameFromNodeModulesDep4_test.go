package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestRenameFromNodeModulesDep4(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /index.ts
import hljs from "highlight.js/lib/core"
import { h } from "highlight.js/lib/core";
import { /*notOk*/h as hh } from "highlight.js/lib/core";
/*ok*/[|hljs|];
/*okWithAlias*/[|h|];
/*ok2*/[|hh|];
// @Filename: /node_modules/highlight.js/lib/core.d.ts
declare const hljs: { registerLanguage(s: string): void };
export default hljs;
export const h: string;
// @Filename: /tsconfig.json
{}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "ok")
	f.VerifyRenameSucceeded(t, &lsutil.UserPreferences{UseAliasesForRename: core.TSTrue})
	f.VerifyRenameSucceeded(t, &lsutil.UserPreferences{UseAliasesForRename: core.TSFalse})
	f.GoToMarker(t, "ok2")
	f.VerifyRenameSucceeded(t, &lsutil.UserPreferences{UseAliasesForRename: core.TSTrue})
	f.VerifyRenameSucceeded(t, &lsutil.UserPreferences{UseAliasesForRename: core.TSFalse})
	f.GoToMarker(t, "notOk")
	f.VerifyRenameFailed(t, &lsutil.UserPreferences{UseAliasesForRename: core.TSTrue})
	f.VerifyRenameFailed(t, &lsutil.UserPreferences{UseAliasesForRename: core.TSFalse})
	f.GoToMarker(t, "okWithAlias")
	f.VerifyRenameSucceeded(t, &lsutil.UserPreferences{UseAliasesForRename: core.TSTrue})
	f.VerifyRenameFailed(t, &lsutil.UserPreferences{UseAliasesForRename: core.TSFalse})
}
