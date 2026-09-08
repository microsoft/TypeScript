package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestRecursiveGetterConstraintDiagnostics(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name       string
		files      []string
		hoverFirst bool
	}{
		{name: "recursiveGetterConstraintSchemaFirst", files: []string{"/schema.ts", "/consumer.ts"}},
		{name: "recursiveGetterConstraintConsumerFirst", files: []string{"/consumer.ts", "/schema.ts"}},
		{name: "recursiveGetterConstraintConsumerOnly", files: []string{"/consumer.ts"}},
		{name: "recursiveGetterConstraintHoverFirst", files: []string{"/schema.ts", "/consumer.ts"}, hoverFirst: true},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			const content = `// @Filename: /tsconfig.json
{ "compilerOptions": { "strict": true, "module": "nodenext", "moduleResolution": "nodenext" } }
// @Filename: /schema.ts
interface Schema<O> { readonly out: O; }
type Shape = Record<string, Schema<any>>;
declare function object<S extends Shape>(shape: S): Schema<{ [K in keyof S]: S[K]["out"] }>;

export const valid = object({
    get next/*next*/() { return valid; },
});

export const invalid = object({
    get next() { return invalid; },
    get bad() { return 42; },
});
// @Filename: /consumer.ts
import { valid, invalid } from "./schema.js";
export const good = valid.out;
export const bad = invalid.out;
`
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			if test.hoverFirst {
				f.GoToMarker(t, "next")
				f.VerifyQuickInfoExists(t)
			}
			for _, file := range test.files {
				f.GoToFile(t, file)
			}
			f.VerifyBaselineNonSuggestionDiagnostics(t)
		})
	}
}
