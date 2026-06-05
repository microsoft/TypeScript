package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationInterfaceObjectLiteral(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @Filename: /file1.ts
export interface MyInterface { P: number; }

// @Filename: /file2.ts
import { MyInterface } from "./file1";

const x: /*impl*/MyInterface = { P: 2 };
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToImplementation(t, "impl")
}
