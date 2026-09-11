package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// https://github.com/microsoft/TypeScript/issues/62180
// https://github.com/microsoft/TypeScript/issues/62181
func TestHoverThenDiagnosticsRecursiveGetter(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name         string
		hoverFirst   bool
		accessOutput bool
	}{
		{name: "diagnostics"},
		{name: "hover", hoverFirst: true},
		{name: "diagnosticsWithOutput", accessOutput: true},
		{name: "hoverWithOutput", hoverFirst: true, accessOutput: true},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			content := recursiveGetterContent
			if test.accessOutput {
				content += "\nexport const output = Category.output;"
			}
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			const hover = `(accessor) parent: ZodOptional<ZodObject<{
    name: ZodString;
    readonly parent: ZodOptional<ZodObject<...>>;
}>>`
			if test.hoverFirst {
				f.VerifyQuickInfoAt(t, "1", hover, "")
			}
			f.VerifyNoErrors(t)
			f.VerifyQuickInfoAt(t, "1", hover, "")
			f.VerifyNoErrors(t)
		})
	}
}

const recursiveGetterContent = `// @Filename: /tsconfig.json
{ "compilerOptions": { "strict": true, "target": "esnext" } }
// @Filename: /file.ts
interface ZodType<T> {
  optional: "true" | "false";
  output: T;
}

interface ZodString extends ZodType<string> {
  optional: "false";
}

type ZodShape = Record<string, any>;
type Prettify<T> = { [K in keyof T]: T[K] } & {};
type InferObjectType<Shape extends ZodShape> = Prettify<
  {
    [k in keyof Shape as Shape[k] extends { optional: "true" }
      ? k
      : never]?: Shape[k]["output"];
  } & {
    [k in keyof Shape as Shape[k] extends { optional: "true" }
      ? never
      : k]: Shape[k]["output"];
  }
>;
interface ZodObject<T extends ZodShape> extends ZodType<InferObjectType<T>> {
  optional: "false";
}

interface ZodOptional<T extends ZodType<any>>
  extends ZodType<T["output"] | undefined> {
  optional: "true";
}

declare function object<T extends ZodShape>(shape: T): ZodObject<T>;
declare function string(): ZodString;
declare function optional<T extends ZodType<any>>(schema: T): ZodOptional<T>;

const Category = object({
  name: string(),
  get parent/*1*/() {
    return optional(Category);
  },
});`
