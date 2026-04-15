package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestOrganizeImportsWithTraceResolution1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `// @Filename: /project/tsconfig.json
{
  "compilerOptions": {
    "traceResolution": true
  }
}
// @Filename: /project/main.ts
import "./dep.js";
`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.GoToFile(t, "/project/main.ts")
	f.VerifyOrganizeImports(t,
		`import "./dep.js";
`,
		lsproto.CodeActionKindSourceOrganizeImports,
		nil,
	)
}
