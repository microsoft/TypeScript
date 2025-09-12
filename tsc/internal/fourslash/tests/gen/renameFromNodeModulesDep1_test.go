package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameFromNodeModulesDep1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /index.ts
import { /*okWithAlias*/[|Foo|] } from "foo";
declare const f: Foo;
f./*notOk*/bar;
// @Filename: /tsconfig.json
 { }
// @Filename: /node_modules/foo/package.json
 { "types": "index.d.ts" }
// @Filename: /node_modules/foo/index.d.ts
export interface Foo {
    bar: string;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "okWithAlias")
	f.VerifyRenameSucceeded(t, nil /*preferences*/)
	f.VerifyRenameFailed(t, nil /*preferences*/)
	f.GoToMarker(t, "notOk")
	f.VerifyRenameFailed(t, nil /*preferences*/)
}
