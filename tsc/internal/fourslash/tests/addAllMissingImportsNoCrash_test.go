package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestAddAllMissingImportsNoCrash(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: file1.ts
export interface Test1 {}
export interface Test2 {}
export interface Test3 {}
export interface Test4 {}
// @Filename: file2.ts
import { Test1, Test4 } from './file1';
interface Testing {
    test1: Test1;
    test2: Test2;
    test3: Test3;
    test4: Test4;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "file2.ts")
	f.VerifyCodeFixAll(t, fourslash.VerifyCodeFixAllOptions{
		FixID: "fixMissingImport",
		NewFileContent: `import { Test1, Test2, Test3, Test4 } from './file1';
interface Testing {
    test1: Test1;
    test2: Test2;
    test3: Test3;
    test4: Test4;
}`,
	})
}
