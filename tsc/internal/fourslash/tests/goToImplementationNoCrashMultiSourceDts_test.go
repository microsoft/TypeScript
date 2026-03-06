package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationNoCrashMultiSourceDts(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// combined.d.ts has a source map with two sources: a.ts and b.ts.
	// The method declaration on line 1 (col 4-end) straddles a source-map boundary:
	//   - col 4 ("method") maps to a.ts
	//   - col 11 onwards maps to b.ts
	const content = `
// @Filename: /a.ts
export {};
// @Filename: /b.ts
export {};
// @Filename: /combined.d.ts
export declare class Bar {
    method(): void;
}
//# sourceMappingURL=combined.d.ts.map
// @Filename: /combined.d.ts.map
{"version":3,"file":"combined.d.ts","sourceRoot":"","sources":["a.ts","b.ts"],"names":[],"mappings":";IAAA,OCAA;AAAA"}
// @Filename: /user.ts
import { Bar } from './combined';
declare const bar: Bar;
bar./*impl*/method();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToImplementation(t, "impl")
}
