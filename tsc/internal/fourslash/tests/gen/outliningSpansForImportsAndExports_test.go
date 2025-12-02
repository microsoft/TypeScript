package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestOutliningSpansForImportsAndExports(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import { a1, a2 } from "a";
;
import {
} from "a";
;
import [|{
  b1,
  b2,
}|] from "b";
;
import j1 from "./j" assert { type: "json" };
;
import j2 from "./j" assert {
};
;
import j3 from "./j" assert [|{
  type: "json"
}|];
;
[|import { a5, a6 } from "a";
import [|{
  a7,
  a8,
}|] from "a";|]
export { a1, a2 };
;
export { a3, a4 } from "a";
;
export {
};
;
export [|{
  b1,
  b2,
}|];
;
export {
} from "b";
;
export [|{
  b3,
  b4,
}|] from "b";
;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyOutliningSpans(t)
}
