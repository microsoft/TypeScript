package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameFromNodeModulesDep4(t *testing.T) {
	t.Parallel()
	t.Skip()
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
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "ok")
	f.VerifyRenameSucceeded(t, nil /*preferences*/)
	f.VerifyRenameSucceeded(t, nil /*preferences*/)
	f.GoToMarker(t, "ok2")
	f.VerifyRenameSucceeded(t, nil /*preferences*/)
	f.VerifyRenameSucceeded(t, nil /*preferences*/)
	f.GoToMarker(t, "notOk")
	f.VerifyRenameFailed(t, nil /*preferences*/)
	f.VerifyRenameFailed(t, nil /*preferences*/)
	f.GoToMarker(t, "okWithAlias")
	f.VerifyRenameSucceeded(t, nil /*preferences*/)
	f.VerifyRenameFailed(t, nil /*preferences*/)
}
