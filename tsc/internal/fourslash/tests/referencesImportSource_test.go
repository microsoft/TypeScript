package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestReferencesImportSource(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @target: esnext

// @filename: /a.d.ts
declare module "m" {
    export default function /*a*/f(): void;
}

// @filename: /b.ts
import /*b*/f from "m";
/*bUse*/f();

// @filename: /c.ts
import source /*c*/f from "m";
/*cUse*/f;
export { f };

// @filename: /d.ts
import { /*d*/f } from "./c";
/*dUse*/f;

// @filename: /e.ts
import source /*e*/g from "m";
/*eUse*/g;
import.source("m");`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineFindAllReferences(t, "a", "b", "c", "cUse", "d", "e")
	f.VerifyBaselineRename(t, nil /*preferences*/, "a", "b", "c", "cUse", "d", "e")
}
