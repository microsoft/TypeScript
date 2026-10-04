package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestImportNameCodeFix_noDestructureNonObjectLiteral(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
// @target: es2015
// @strict: true
// @esModuleInterop: true
// @Filename: /array.ts
declare const arr: number[];
export = arr;
// @Filename: /class-instance-member.ts
class C { filter() {} }
export = new C();
// @Filename: /object-literal.ts
declare function filter(): void;
export = { filter };
// @Filename: /jquery.d.ts
interface JQueryStatic {
  filter(): void;
}
declare const $: JQueryStatic;
export = $;
// @Filename: /jquery.js
module.exports = {};
// @Filename: /index.ts
filter/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"./object-literal", "./jquery"}, nil /*preferences*/)
}
