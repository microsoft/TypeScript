package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCodeLensFunctionsAndConstants01(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `
// @module: preserve

// @filename: ./exports.ts

let callCount = 0;
export function foo(n: number): void {
  callCount++;
  if (n > 0) {
	foo(n - 1);
  }
  else {
    console.log("function was called " + callCount + " times");
  }
}

foo(5);

export const bar = 123;

// @filename: ./importer.ts
import { foo, bar } from "./exports";

foo(5);
console.log(bar);
`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineCodeLens(t, &lsutil.UserPreferences{
		ReferencesCodeLensEnabled:            true,
		ReferencesCodeLensShowOnAllFunctions: true,

		ImplementationsCodeLensEnabled:                true,
		ImplementationsCodeLensShowOnInterfaceMethods: true,
		ImplementationsCodeLensShowOnAllClassMethods:  true,
	})
}
