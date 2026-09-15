package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestHoverThenDiagnosticsRecursiveCallback(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name  string
		first string
	}{
		{name: "diagnostics"},
		{name: "hover", first: "1"},
		{name: "call", first: "call"},
		{name: "output", first: "output"},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, recursiveCallbackContent)
			defer done()
			const hover = `(property) parent: () => ZodOptional<ZodObject<{
    name: ZodString;
    parent: () => ZodOptional<ZodObject<...>>;
}>>`
			const call = `function object<{
    name: ZodString;
    parent: () => ZodOptional<ZodObject<...>>;
}>(shape: {
    name: ZodString;
    parent: () => ZodOptional<ZodObject<...>>;
}): ZodObject<{
    name: ZodString;
    parent: () => ZodOptional<ZodObject<...>>;
}>`
			const output = `const output: InferObjectType<{
    name: ZodString;
    parent: () => ZodOptional<ZodObject<...>>;
}>`
			switch test.first {
			case "1":
				f.VerifyQuickInfoAt(t, "1", hover, "")
			case "call":
				f.VerifyQuickInfoAt(t, "call", call, "")
			case "output":
				f.VerifyQuickInfoAt(t, "output", output, "")
			}
			f.VerifyNoErrors(t)
			f.VerifyQuickInfoAt(t, "1", hover, "")
			f.VerifyQuickInfoAt(t, "call", call, "")
			f.VerifyQuickInfoAt(t, "output", output, "")
			f.VerifyNoErrors(t)
		})
	}
}

const recursiveCallbackContent = `// @Filename: /tsconfig.json
{ "compilerOptions": { "strict": true, "target": "esnext" } }
// @Filename: /file.ts
interface ZodType<T> {
  output: T;
}

interface ZodString extends ZodType<string> {}

type ZodShape = Record<string, ZodType<any> | (() => ZodType<any>)>;
type Resolve<T> = T extends () => infer R ? R : T;
type InferObjectType<Shape extends ZodShape> = {
  [k in keyof Shape]: Resolve<Shape[k]>["output"];
};
interface ZodObject<T extends ZodShape> extends ZodType<InferObjectType<T>> {}
interface ZodOptional<T extends ZodType<any>> extends ZodType<T["output"] | undefined> {}

declare function object<T extends ZodShape>(shape: T): ZodObject<T>;
declare function string(): ZodString;
declare function optional<T extends ZodType<any>>(schema: T): ZodOptional<T>;

const Category = /*call*/object({
  name: string(),
  parent/*1*/: () => optional(Category),
});
export const output/*output*/ = Category.output;`
