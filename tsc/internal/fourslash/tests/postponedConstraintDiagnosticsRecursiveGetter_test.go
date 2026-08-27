package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// A constraint that could not be answered while the getter was still being resolved is postponed and
// made again when a file's deferred work runs. In a batch compile every file is checked, so the queue
// always drains. The language service checks only what someone asks about, so the risk is that the
// answer depends on which file that was -- which is the complaint in
// https://github.com/microsoft/TypeScript/issues/62181 one layer down.
//
// `bad` holds an array of schemas, which is not a Schema, so it violates the constraint on S. The
// error belongs to schema.ts. These three pin that it is reported there in every order, including
// when the file carrying it is never the one asked about first.

func TestPostponedConstraintDiagnosticsSchemaFirst(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, postponedConstraintContent)
	defer done()
	f.GoToFile(t, "/schema.ts")
	f.GoToFile(t, "/consumer.ts")
	f.VerifyBaselineNonSuggestionDiagnostics(t)
}

func TestPostponedConstraintDiagnosticsConsumerFirst(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, postponedConstraintContent)
	defer done()
	f.GoToFile(t, "/consumer.ts")
	f.GoToFile(t, "/schema.ts")
	f.VerifyBaselineNonSuggestionDiagnostics(t)
}

// The file the error belongs to is never opened.
func TestPostponedConstraintDiagnosticsConsumerOnly(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, postponedConstraintContent)
	defer done()
	f.GoToFile(t, "/consumer.ts")
	f.VerifyBaselineNonSuggestionDiagnostics(t)
}

const postponedConstraintContent = `// @Filename: /tsconfig.json
{ "compilerOptions": { "strict": true, "target": "esnext", "module": "nodenext", "moduleResolution": "nodenext" } }
// @Filename: /schema.ts
export interface Schema<O> {
    readonly out: O;
}
export type Shape = Record<string, Schema<any>>;
export declare function object<S extends Shape>(shape: S): Schema<{ [K in keyof S]: S[K]["out"] }> & { shape: S };

export const tree = object({
    get bad() {
        return [tree];
    },
});
// @Filename: /consumer.ts
import { tree } from "./schema.js";

export const out = tree.out;`
