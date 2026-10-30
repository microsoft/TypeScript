package fourslash_test

import (
	"fmt"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestEvolvingArrayLiteralOrigins(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name     string
		pushes   string
		expected string
	}{
		{"forward", "values.push(a); values.push(b);", `string | "a" | "b"`},
		{"reverse", "values.push(b); values.push(a);", `string | "a" | "b"`},
		{"repeated", "values.push(a); values.push(b); values.push(a); values.push(b);", `string | "a" | "b"`},
		{"plain first", "values.push(plain); values.push(a); values.push(b);", `string | "a" | "b"`},
		{"plain last", "values.push(a); values.push(b); values.push(plain);", `string | "a" | "b"`},
		{"mixed", "values.push(a); values.push(b); values.push(n); values.push(m);", `string | number | "a" | "b" | 1 | 2`},
		{"loop", "values.push(a); for (let i = 0; i < 2; i++) { values.push(b); values.push(a); }", `string | "a" | "b"`},
		{"branches", "if (condition) { values.push(a); } else { values.push(b); }", `string | "a" | "b"`},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			content := fmt.Sprintf(`// @strict: true
declare const a: "a" | string;
declare const b: "b" | string;
declare const n: 1 | number;
declare const m: 2 | number;
declare const plain: string;
declare const condition: boolean;
const values = [];
%s
const result/*result*/ = values[0];
`, test.pushes)
			f, done := fourslash.NewFourslash(t, nil, content)
			defer done()
			f.VerifyNoErrors(t)
			f.VerifyQuickInfoAt(t, "result", "const result: "+test.expected, "")
		})
	}
}
