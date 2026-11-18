package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestNoGhostErrors(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
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
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "(accessor) parent: ZodOptional<ZodObject<{\n    name: ZodString;\n    readonly parent: ZodOptional<ZodObject<...>>;\n}>>", "")
	f.VerifyDiagnostics(t, nil)
}
