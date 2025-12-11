package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpForSignatureWithUnreachableType(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /node_modules/foo/node_modules/bar/index.d.ts
export interface SomeType {
    x?: number;
}
// @Filename: /node_modules/foo/index.d.ts
import { SomeType } from "bar";
export function func<T extends SomeType>(param: T): void;
export function func<T extends SomeType>(param: T, other: T): void;
// @Filename: /usage.ts
import { func } from "foo";
func({/*1*/});`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "func(param: {}): void", OverloadsCount: 2})
}
