package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGoToDefinition_sourcePhase(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @target: esnext

// @filename: /b.ts
import source b from "./a.wasm";
[|/*bUse*/b|];
export { b };

// @filename: /c.ts
import source c from "./a.wasm";
[|/*cUse*/c|];

// @filename: /d.ts
import { /*dImport*/b as d } from "./b";
/*dUse*/d;

// @filename: /e.ts
export { b as /*eExport*/e } from "./b";

// @filename: /f.ts
import { e as f } from "./e";
/*fUse*/f;
import * as ns from "./e";
ns./*property*/e;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineGoToDefinition(t, true, "bUse", "cUse", "dImport", "dUse", "eExport", "fUse", "property")
	f.VerifyBaselineGoToSourceDefinition(t, "bUse", "cUse", "dImport", "dUse", "eExport", "fUse", "property")
	f.VerifyBaselineFindAllReferences(t, "bUse", "cUse")
}
