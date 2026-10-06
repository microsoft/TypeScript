package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImportsAttributes(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import { A } from "./file";
import { type B } from "./file";
import { C } from "./file" with { type: "a" };
import { A as D } from "./file" with { type: "b" };
import { E } from "./file" with { type: "a" };
import { A as F } from "./file" with { type: "b" };

type G = A | B | C | D | E | F;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import { A, type B } from "./file";
import { C, E } from "./file" with { type: "a" };
import { A as D, A as F } from "./file" with { type: "b" };

type G = A | B | C | D | E | F;`,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		nil,
	)
}
