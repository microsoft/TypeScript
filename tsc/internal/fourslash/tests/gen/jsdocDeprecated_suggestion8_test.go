package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsdocDeprecated_suggestion8(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: first.ts
/** @deprecated */
export declare function tap<T>(next: null): void;
export declare function tap<T>(next: T): T;
// @Filename: second.ts
import { tap } from './first';
tap`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "second.ts")
	f.VerifyNoErrors(t)
	f.VerifySuggestionDiagnostics(t, nil)
}
