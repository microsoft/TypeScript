package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickfixImplementInterfaceUnreachableTypeUsesRelativeImport(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: class.ts
export class Class { }
// @Filename: interface.ts
import { Class } from './class';

export interface Foo {
    x: Class;
}
// @Filename: index.ts
import { Foo } from './interface';

class /*1*/X implements Foo {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description:    "Implement interface 'Foo'",
		NewFileContent: ``,
		Index:          0,
	})
}
