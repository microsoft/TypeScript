package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestHoverAliasInImportedFile(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @filename: other2.ts
export type SomeAliasType<T> = { value: T };

// @filename: other.ts
import { SomeAliasType } from './other2';

declare function isSomeAliasType(x: any): x is SomeAliasType<any>;

export { isSomeAliasType };

// @filename: main.ts
import { isSomeAliasType } from './other';

export function processValue(value: any) {
  if (/*1*/isSomeAliasType(value)) {
    console.log("ok");
  }
}
`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(alias) function isSomeAliasType(x: any): x is SomeAliasType<any>", "")
}
