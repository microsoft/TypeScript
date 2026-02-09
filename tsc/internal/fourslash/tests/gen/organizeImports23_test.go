package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestOrganizeImports23(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import {abc, Abc, type bc, type Bc} from 'b';
import {
  I,
  R,
  M,
} from 'a';
type x = bc | Bc;
console.log(abc, Abc, I, R, M);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import {
    I,
    M,
    R,
} from 'a';
import { abc, Abc, type bc, type Bc } from 'b';
type x = bc | Bc;
console.log(abc, Abc, I, R, M);`,
		lsproto.CodeActionKindSourceOrganizeImports,
		nil,
	)
	f.VerifyOrganizeImports(t,
		`import {
    I,
    M,
    R,
} from 'a';
import { abc, Abc, type bc, type Bc } from 'b';
type x = bc | Bc;
console.log(abc, Abc, I, R, M);`,
		lsproto.CodeActionKindSourceOrganizeImports,
		nil,
	)
}
