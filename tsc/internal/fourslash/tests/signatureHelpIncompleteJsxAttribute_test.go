package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// An incomplete JSX attribute (`c=` with no value) followed on the next line by a closing
// tag is error-recovered so that the closing tag's `</` (KindLessThanSlashToken) is scanned
// as a trailing token of the attribute, even though its span (including the leading newline)
// overruns the attribute. Requesting signature help there must not trip the "Not a subspan"
// assertion in getContainingArgumentInfo.
func TestSignatureHelpIncompleteJsxAttribute(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.tsx
<a><b c=
/*a*/</a>`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoSignatureHelpForMarkers(t, "a")
}
