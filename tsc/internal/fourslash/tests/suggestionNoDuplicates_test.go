package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestSuggestionNoDuplicates(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
// @Filename: foo.ts
import { f } from [|'m'|]
f
// @Filename: node_modules/m/index.js
module.exports.f = function (x) { return x }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNonSuggestionDiagnostics(t, nil)
	f.VerifySuggestionDiagnostics(t, []*lsproto.Diagnostic{
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(7016))},
			Message: lsproto.StringOrMarkupContent{String: new("Could not find a declaration file for module 'm'. '/node_modules/m/index.js' implicitly has an 'any' type.")},
		},
	})
}
