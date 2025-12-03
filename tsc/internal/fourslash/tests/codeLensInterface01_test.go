package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCodeLensInterface01(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `
// @module: preserve

// @filename: ./pointable.ts
export interface Pointable {
  getX(): number;
  getY(): number;
}

// @filename: ./classPointable.ts
import { Pointable } from "./pointable";

class Point implements Pointable {
  getX(): number {
    return 0;
  }
  getY(): number {
    return 0;
  }
}

// @filename: ./objectPointable.ts
import { Pointable } from "./pointable";

let x = 0;
let y = 0;
const p: Pointable = {
  getX(): number {
	return x;
  },
  getY(): number {
	return y;
  },
};
`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineCodeLens(t, &lsutil.UserPreferences{
		CodeLens: lsutil.CodeLensUserPreferences{
			ReferencesCodeLensEnabled:            true,
			ReferencesCodeLensShowOnAllFunctions: true,

			ImplementationsCodeLensEnabled:                true,
			ImplementationsCodeLensShowOnInterfaceMethods: true,
			ImplementationsCodeLensShowOnAllClassMethods:  true,
		},
	})
}
