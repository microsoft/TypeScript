package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementInterfaceAutoImportsReExports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: node_modules/test-module/index.d.ts
declare namespace e {
    interface Foo {}
}
export = e;
// @Filename: a.ts
import { Foo } from "test-module";
export interface A {
    foo(): Foo;
}
// @Filename: b.ts
import { A } from "./a";
export class B implements A {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "b.ts")
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'A'",
		NewFileContent: `import { Foo } from "test-module";
import { A } from "./a";
export class B implements A {
    foo(): Foo {
        throw new Error("Method not implemented.");
    }
}`,
		Index: 0,
	})
}
