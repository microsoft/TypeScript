package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestRecursiveGetterConstraintDiagnostics(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name       string
		files      []string
		hoverFirst string
	}{
		{name: "recursiveGetterConstraintSchemaFirst", files: []string{"/schema.ts", "/consumer.ts"}},
		{name: "recursiveGetterConstraintConsumerFirst", files: []string{"/consumer.ts", "/schema.ts"}},
		{name: "recursiveGetterConstraintConsumerOnly", files: []string{"/consumer.ts"}},
		{name: "recursiveGetterConstraintHoverFirst", files: []string{"/schema.ts", "/consumer.ts"}, hoverFirst: "next"},
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

type IsAny<T> = 0 extends 1 & T ? true : false;
type Assert<T extends true> = T;
const deep = valid.out.next.next.next.next;
type NotAny = Assert<IsAny<typeof deep> extends false ? true : false>;
const recursive: typeof deep = valid.out;
// @ts-expect-error Recursive objects have no missing property.
deep.missing;
// @ts-expect-error Every next property must contain another recursive object.
const wrong: typeof deep = { next: { next: 42 } };

export const invalid = object({
    get next() { return invalid; },
    get [|bad|]() { return 42; },
});
// @Filename: /consumer.ts
import { valid, invalid } from "./schema.js";
type IsAny<T> = 0 extends 1 & T ? true : false;
type Assert<T extends true> = T;
export const good/*consumer*/ = valid.out.next.next.next.next;
type NotAny = Assert<IsAny<typeof good> extends false ? true : false>;
const recursive: typeof good = valid.out;
// @ts-expect-error Imported recursive objects have no missing property.
good.missing;
// @ts-expect-error Every next property must contain another recursive object.
const wrong: typeof good = { next: { next: 42 } };
export const bad = invalid.out;
`
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			// Finish opening files before queries so later didOpen notifications cannot reset caches.
			for _, file := range test.files {
				f.GoToFile(t, file)
			}
			if test.hoverFirst != "" {
				f.GoToMarker(t, test.hoverFirst)
				f.VerifyBaselineHover(t, test.hoverFirst)
			}
			for _, file := range test.files {
				if file == "/schema.ts" {
					f.GoToMarker(t, "next")
					f.VerifyNonSuggestionDiagnostics(t, []*lsproto.Diagnostic{{
						Message: lsproto.StringOrMarkupContent{String: new("Type 'number' is not assignable to type 'Schema<any>'.")},
						Code:    &lsproto.IntegerOrString{Integer: new(int32(2322))},
					}})
				} else {
					f.GoToMarker(t, "consumer")
					f.VerifyNonSuggestionDiagnostics(t, nil)
				}
			}
			// Only snapshot all files after the ordered, file-scoped assertions.
			// ConsumerOnly must never request schema diagnostics.
			if len(test.files) > 1 {
				f.VerifyBaselineNonSuggestionDiagnostics(t)
			}
		})
	}
}
