package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// A declaration map can name anything in its `sources`, including a file whose
// name has no recognized extension. Parsing that file used to hit the parser's
// "ScriptKind must be specified" assert and crash the request.
func TestGoToSourceDefinitionExtensionlessMappedSource(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /lib/helper.d.ts
export declare function helper(): string;
//# sourceMappingURL=helper.d.ts.map
// @Filename: /lib/helper.d.ts.map
{"version":3,"file":"helper.d.ts","sourceRoot":"","sources":["helper"],"names":[],"mappings":"AAAA,wBAAgB,MAAM,IAAI,MAAM,CAAC"}
// @Filename: /lib/helper
export function helper(): string { return ""; }
// @Filename: /index.ts
import { /*usage*/helper } from "./lib/helper";
helper();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usage")
}
