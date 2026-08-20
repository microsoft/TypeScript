package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestUnusedImports8FS(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noUnusedLocals: true
// @Filename: file2.ts
[|import {Calculator as calc, test as t1, test2 as t2} from "./file1"|]

var x = new calc();
x.handleChar();
t1();
// @Filename: file1.ts
export class Calculator {
    handleChar() { }
}
export function test() {

}
export function test2() {

}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyRangeAfterCodeFix(t, `import {Calculator as calc, test as t1} from "./file1"`, false, 0, 0)
}
