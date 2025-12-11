package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameFromNodeModulesDep3(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /packages/first/index.d.ts
import { /*ok*/[|Foo|] } from "foo";
declare type FooBar = Foo[/*ok2*/"[|bar|]"];
// @Filename: /packages/foo/package.json
 { "types": "index.d.ts" }
// @Filename: /packages/foo/index.d.ts
export interface Foo {
    /*ok3*/[|bar|]: string;
}
// @link: /packages/foo -> /packages/first/node_modules/foo`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "ok")
	f.VerifyRenameSucceeded(t, nil /*preferences*/)
	f.VerifyRenameSucceeded(t, nil /*preferences*/)
	f.GoToMarker(t, "ok2")
	f.VerifyRenameSucceeded(t, nil /*preferences*/)
	f.GoToMarker(t, "ok3")
	f.VerifyRenameSucceeded(t, nil /*preferences*/)
}
