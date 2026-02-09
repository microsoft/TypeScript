package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestOrganizeImportsAttributes2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import { A } from "./a";
import { C } from "./a" with { type: "a" };
import { Z } from "./z";
import { A as D } from "./a" with { type: "b" };
import { E } from "./a" with { type: "a" };
import { F } from "./a" with { type: "a" };
import { B } from "./a";

export type G = A | B | C | D | E | F | Z;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import { A, B } from "./a";
import { C, E, F } from "./a" with { type: "a" };
import { A as D } from "./a" with { type: "b" };
import { Z } from "./z";

export type G = A | B | C | D | E | F | Z;`,
		lsproto.CodeActionKindSourceOrganizeImports,
		nil,
	)
}
