package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsParameterPropertyWithConflictingMember(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @filename: c1.ts
class C1 {
  [|x|]() {}
  constructor(public [|x|]: number) {
    [|x|]++;
  }
}
new C1(1).[|x|];

// @filename: c2.ts
interface C2 {
  get [|x|](): void
}
class C2 {
  constructor(public [|x|]: number) {
    [|x|]++;
  }
}
new C2(1).[|x|];
`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t)
}
