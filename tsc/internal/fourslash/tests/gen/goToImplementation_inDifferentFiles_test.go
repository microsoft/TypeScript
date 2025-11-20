package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementation_inDifferentFiles(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/bar.ts
import {Foo} from './foo'

class [|A|] implements Foo {
    func() {}
}

class [|B|] implements Foo {
    func() {}
}
// @Filename: /home/src/workspaces/project/foo.ts
export interface /**/Foo {
    func();
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.MarkTestAsStradaServer()
	f.VerifyBaselineGoToImplementation(t, "")
}
