package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoExportAssignmentOfGenericInterface(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: quickInfoExportAssignmentOfGenericInterface_0.ts
interface Foo<T> {
    a: string;
}
export = Foo;
// @Filename: quickInfoExportAssignmentOfGenericInterface_1.ts
import a = require('./quickInfoExportAssignmentOfGenericInterface_0');
export var /*1*/x: a<a<string>>;
x.a;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var x: a<a<string>>", "")
}
