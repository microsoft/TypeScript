package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionOverriddenMember17(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// @target: esnext
// @lib: esnext
const entityKind = Symbol.for("drizzle:entityKind");

abstract class MySqlColumn {
  static readonly /*2*/[entityKind]: string = "MySqlColumn";
}

export class MySqlVarBinary extends MySqlColumn {
  static [|/*1*/override|] readonly [entityKind]: string = "MySqlVarBinary";
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "1")
}
