package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestSignatureHelpCommentsImportedConstFunctionType(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: math.ts
/**
 * Adds one to a number.
 * @param value The number to add one to.
 */
export declare const addOne: (value: number) => number;
// @Filename: main.ts
import { addOne } from "./math";
addOne(/*0*/1);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineSignatureHelp(t)
}
