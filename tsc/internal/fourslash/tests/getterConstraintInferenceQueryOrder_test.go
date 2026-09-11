package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetterConstraintInferenceQueryOrder(t *testing.T) {
	t.Parallel()
	for _, first := range []string{"Getter", "Call", "Output", "SignatureHelp", "ConsumerDiagnostics"} {
		t.Run("getterConstraintInference"+first+"First", func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			const content = `// @Filename: /tsconfig.json
{ "compilerOptions": { "strict": true, "module": "nodenext", "moduleResolution": "nodenext" } }
// @Filename: /schema.ts
interface Schema<O> { readonly output: O; }
declare function wrap<T extends Schema<string>>(value: T): T;
const argument = {
    get output/*getter*/() { return 42; },
};
export const invalid/*call*/ = wrap(/*signature*/[|argument|]);
// @Filename: /consumer.ts
import { invalid } from "./schema.js";
export const output/*output*/ = invalid.output;
type IsAny<T> = 0 extends 1 & T ? true : false;
type Assert<T extends true> = T;
type NotAny = Assert<IsAny<typeof output> extends false ? true : false>;
const actual: number = output;
// @ts-expect-error Deferred validation preserves the actual candidate, not the violated constraint.
const wrong: string = output;
`
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			f.GoToFile(t, "/schema.ts")
			f.GoToFile(t, "/consumer.ts")
			switch first {
			case "Getter":
				// The separate argument lets this getter resolve without resolving the call.
				f.VerifyQuickInfoAt(t, "getter", "(accessor) output: number", "")
			case "Call":
				f.VerifyBaselineHover(t, "call")
			case "Output":
				f.VerifyQuickInfoAt(t, "output", "const output: number", "")
			case "SignatureHelp":
				f.GoToMarker(t, "signature")
				f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{
					ParameterName:  "value",
					ParameterCount: 1,
					OverloadsCount: 1,
				})
			}
			// Check the exported type before schema diagnostics can change inference caches.
			f.GoToMarker(t, "output")
			f.VerifyNonSuggestionDiagnostics(t, nil)
			f.GoToMarker(t, "call")
			f.VerifyNonSuggestionDiagnostics(t, []*lsproto.Diagnostic{{
				Message: lsproto.StringOrMarkupContent{String: new("Type '{ readonly output: number; }' does not satisfy the constraint 'Schema<string>'.\n  Types of property 'output' are incompatible.\n    Type 'number' is not assignable to type 'string'.")},
				Code:    &lsproto.IntegerOrString{Integer: new(int32(2344))},
			}})
		})
	}
}
