package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameTemplateLiteralsComputedProperties(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: a.ts
interface Obj {
    [|[` + "`" + `[|{| "contextRangeIndex": 0 |}num|]` + "`" + `]: number;|]
    [|['[|{| "contextRangeIndex": 2 |}bool|]']: boolean;|]
}

let o: Obj = {
    [|[` + "`" + `[|{| "contextRangeIndex": 4 |}num|]` + "`" + `]: 0|],
    [|['[|{| "contextRangeIndex": 6 |}bool|]']: true|],
};

o = {
    [|['[|{| "contextRangeIndex": 8 |}num|]']: 1|],
    [|[` + "`" + `[|{| "contextRangeIndex": 10 |}bool|]` + "`" + `]: false|],
};

o.[|num|];
o['[|num|]'];
o["[|num|]"];
o[` + "`" + `[|num|]` + "`" + `];

o.[|bool|];
o['[|bool|]'];
o["[|bool|]"];
o[` + "`" + `[|bool|]` + "`" + `];

export { o };
// @allowJs: true
// @Filename: b.js
import { o as obj } from './a';

obj.[|num|];
obj[` + "`" + `[|num|]` + "`" + `];

obj.[|bool|];
obj[` + "`" + `[|bool|]` + "`" + `];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineRenameAtRangesWithText(t, nil /*preferences*/, "num", "bool")
}
