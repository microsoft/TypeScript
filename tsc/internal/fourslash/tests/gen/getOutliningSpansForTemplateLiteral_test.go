package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOutliningSpansForTemplateLiteral(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function tag(...args: any[]): void
const a = [|` + "`" + `signal line` + "`" + `|]
const b = [|` + "`" + `multi
line` + "`" + `|]
const c = tag[|` + "`" + `signal line` + "`" + `|]
const d = tag[|` + "`" + `multi
line` + "`" + `|]
const e = [|` + "`" + `signal ${1} line` + "`" + `|]
const f = [|` + "`" + `multi
${1}
line` + "`" + `|]
const g = tag[|` + "`" + `signal ${1} line` + "`" + `|]
const h = tag[|` + "`" + `multi
${1}
line` + "`" + `|]
const i = ` + "`" + `` + "`" + ``
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyOutliningSpans(t)
}
