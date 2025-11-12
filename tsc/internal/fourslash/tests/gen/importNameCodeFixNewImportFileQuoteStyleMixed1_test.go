package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixNewImportFileQuoteStyleMixed1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[|import { v2 } from './module2';
import { v3 } from "./module3";

f1/*0*/();|]
// @Filename: module1.ts
export function f1() {}
// @Filename: module2.ts
export var v2 = 6;
// @Filename: module3.ts
export var v3 = 6;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyImportFixAtPosition(t, []string{
		`import { f1 } from './module1';
import { v2 } from './module2';
import { v3 } from "./module3";

f1();`,
	}, nil /*preferences*/)
}
