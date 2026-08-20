package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImports6(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import * as something from "path"; /* small comment */ // single line one.
/* some comment here
* and there
*/
import * as somethingElse from "anotherpath";
import * as anotherThing from "someopath"; /* small comment */ // single line one.
/* some comment here
* and there
*/
import * as anotherThingElse from "someotherpath";

anotherThing;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`/* some comment here
* and there
*/
import * as anotherThing from "someopath"; /* small comment */ // single line one.
/* some comment here
* and there
*/

anotherThing;`,
		lsproto.CodeActionKindSourceOrganizeImports,
		nil,
	)
}
