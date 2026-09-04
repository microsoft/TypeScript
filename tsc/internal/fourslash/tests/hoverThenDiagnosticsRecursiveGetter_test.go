package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// Regression test for https://github.com/microsoft/TypeScript/issues/62181
//
// A getter naming the declaration being resolved used to report as `any`, and asking for that hover
// before pulling diagnostics changed how many errors came back, because the hover fixed the getter at
// `any` for everything that followed. The hover has to report the recursive type it actually has, and
// the diagnostics have to be the same whether or not anything asked for it first.
func TestHoverThenDiagnosticsRecursiveGetter(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, recursiveGetterContent)
	defer done()
	f.VerifyQuickInfoAt(t, "1", `(accessor) parent: ZodOptional<ZodObject<{
    name: ZodString;
    readonly parent: ZodOptional<ZodObject<...>>;
}>>`, "")
	f.VerifyNoErrors(t)
}

// The same file with nothing asked of it first, so the two can be compared.
func TestDiagnosticsOnlyRecursiveGetter(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, recursiveGetterContent)
	defer done()
	f.VerifyNoErrors(t)
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
});

export const output = Category.output;`
