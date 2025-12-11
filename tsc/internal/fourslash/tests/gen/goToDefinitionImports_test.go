package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionImports(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
export default function /*fDef*/f() {}
export const /*xDef*/x = 0;
// @Filename: /b.ts
/*bDef*/declare const b: number;
export = b;
// @Filename: /b.ts
import f, { x } from "./a";
import * as /*aDef*/a from "./a";
import b = require("./b");
[|/*fUse*/f|];
[|/*xUse*/x|];
[|/*aUse*/a|];
[|/*bUse*/b|];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, true, "aUse", "fUse", "xUse", "bUse")
}
