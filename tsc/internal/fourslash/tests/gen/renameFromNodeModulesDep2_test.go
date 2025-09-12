package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameFromNodeModulesDep2(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /node_modules/first/index.d.ts
import { /*okWithAlias*/[|Foo|] } from "foo";
declare type FooBar = Foo[/*notOk*/"bar"];
// @Filename: /node_modules/first/node_modules/foo/package.json
 { "types": "index.d.ts" }
// @Filename: /node_modules/first/node_modules/foo/index.d.ts
export interface Foo {
    /*ok2*/[|bar|]: string;
}
// @Filename: /node_modules/first/node_modules/foo/bar.d.ts
import { Foo } from "./index";
declare type FooBar = Foo[/*ok3*/"[|bar|]"];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "okWithAlias")
	f.VerifyRenameSucceeded(t, nil /*preferences*/)
	f.VerifyRenameFailed(t, nil /*preferences*/)
	f.GoToMarker(t, "notOk")
	f.VerifyRenameFailed(t, nil /*preferences*/)
	f.GoToMarker(t, "ok2")
	f.VerifyRenameSucceeded(t, nil /*preferences*/)
	f.GoToMarker(t, "ok3")
	f.VerifyRenameSucceeded(t, nil /*preferences*/)
}
