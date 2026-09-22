package fourslash_test

import (
	"fmt"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestReducedOriginInstantiation(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name         string
		typeText     string
		typeArgument string
		expected     string
	}{
		{
			name:         "primitive",
			typeText:     "\"fixed\" | string | `prefix${Value}`",
			typeArgument: `"instantiated"`,
			expected:     `string (origin: string | "fixed" | "prefixinstantiated")`,
		},
		{
			name:         "optional primitive",
			typeText:     "(\"fixed\" | string | `prefix${Value}`) | undefined",
			typeArgument: `"instantiated"`,
			expected:     `string | undefined (origin: string | "fixed" | "prefixinstantiated" | undefined)`,
		},
		{
			name:         "string union",
			typeText:     `"fixed" | string | Value`,
			typeArgument: `"instantiated"`,
			expected:     `string (origin: string | "fixed" | "instantiated")`,
		},
		{
			name:         "number union",
			typeText:     `1 | number | Value`,
			typeArgument: `2`,
			expected:     `number (origin: number | 1 | 2)`,
		},
		{
			name:         "bigint union",
			typeText:     `1n | bigint | Value`,
			typeArgument: `2n`,
			expected:     `bigint (origin: bigint | 1n | 2n)`,
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			content := fmt.Sprintf(`// @strict: true
// @target: esnext
interface Container<Value extends string | number | bigint> {
    value: %s;
}
declare const container: Container<%s>;
const result/*result*/ = container.value;
`, test.typeText, test.typeArgument)
			f, done := fourslash.NewFourslash(t, nil, content)
			defer done()
			f.VerifyNoErrors(t)
			f.VerifyQuickInfoAt(t, "result", "const result: "+test.expected, "")
		})
	}
}
