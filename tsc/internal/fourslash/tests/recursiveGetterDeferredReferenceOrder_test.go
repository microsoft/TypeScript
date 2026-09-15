package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestRecursiveGetterDeferredReferenceOrder(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name           string
		marker         string
		consumerFirst  bool
		signatureFirst bool
	}{
		{name: "recursiveMetadataDiagnosticsFirst"},
		{name: "recursiveMetadataGetterFirst", marker: "getter"},
		{name: "recursiveMetadataCallFirst", marker: "call"},
		{name: "recursiveMetadataOutputFirst", marker: "output", consumerFirst: true},
		{name: "recursiveMetadataConsumerDiagnosticsFirst", consumerFirst: true},
		{name: "recursiveMetadataSignatureHelpFirst", signatureFirst: true},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			const content = `
// @Filename: /tsconfig.json
{ "compilerOptions": { "strict": true, "target": "es2020", "exactOptionalPropertyTypes": true, "module": "nodenext", "moduleResolution": "nodenext" } }
// @Filename: /schema.ts
type input<T> = T extends { _zod: { input: any } } ? T["_zod"]["input"] : unknown;
type output<T> = T extends { _zod: { output: any } } ? T["_zod"]["output"] : unknown;
type Writeable<T> = { -readonly [P in keyof T]: T[P] } & {};
type Prettify<T> = { [K in keyof T]: T[K] } & {};
type IsAny<T> = 0 extends 1 & T ? true : false;
interface StandardTypes<Input, Output> {
    readonly input: Input;
    readonly output: Output;
}
interface StandardTypedProps<Input, Output> {
    readonly version: 1;
    readonly vendor: string;
    readonly types?: StandardTypes<Input, Output> | undefined;
}
interface StandardSchemaProps<Input, Output> extends StandardTypedProps<Input, Output> {
    readonly validate: (value: unknown) => { readonly value: Output } | Promise<{ readonly value: Output }>;
}
interface ExtendedProps<Input, Output> extends StandardSchemaProps<Input, Output> {
    readonly jsonSchema: { input(): object; output(): object };
}
type StandardSchema<T> = StandardSchemaProps<input<T>, output<T>>;
type ExtendedSchema<T> = ExtendedProps<input<T>, output<T>>;
interface Internals<out O = unknown, out I = unknown> {
    def: { type: string };
    optin?: "optional" | "defaulted" | undefined;
    optout?: "optional" | undefined;
    output: O;
    input: I;
}
interface Schema<O = unknown, I = unknown, Data extends Internals<O, I> = Internals<O, I>> {
    _zod: Data;
    "~standard": StandardSchema<this>;
}
interface MiniSchema<out O = unknown, out I = unknown,
    out Data extends Internals<O, I> = Internals<O, I>> extends Schema<O, I, Data> {
    type: Data["def"]["type"];
    def: Data["def"];
    parse(data: unknown): output<this>;
}
type Shape = Readonly<{ [k: string]: Schema }>;
type Config = { out: Record<string, unknown>; in: Record<string, unknown> };
type Strip = { out: {}; in: {} };
type OptionalOut = { _zod: { optout: "optional" } };
type OptionalIn = { _zod: { optin: "optional" | "defaulted" } };
type ObjectOutput<T extends Shape, Extra extends Record<string, unknown>> = string extends keyof T
    ? IsAny<T[keyof T]> extends true ? Record<string, unknown> : Record<string, output<T[keyof T]>>
    : keyof (T & Extra) extends never ? Record<string, never> : Prettify<
        { -readonly [k in keyof T as T[k] extends OptionalOut ? never : k]: T[k]["_zod"]["output"] } &
        { -readonly [k in keyof T as T[k] extends OptionalOut ? k : never]?: T[k]["_zod"]["output"] } & Extra>;
type ObjectInput<T extends Shape, Extra extends Record<string, unknown>> = string extends keyof T
    ? IsAny<T[keyof T]> extends true ? Record<string, unknown> : Record<string, input<T[keyof T]>>
    : keyof (T & Extra) extends never ? Record<string, never> : Prettify<
        { -readonly [k in keyof T as T[k] extends OptionalIn ? never : k]: T[k]["_zod"]["input"] } &
        { -readonly [k in keyof T as T[k] extends OptionalIn ? k : never]?: T[k]["_zod"]["input"] } & Extra>;
interface ObjectInternals<S extends Shape = Shape, out C extends Config = Config> extends Internals {
    def: { type: "object"; shape: S; catchall?: Schema | undefined };
    config: C;
    output: ObjectOutput<S, C["out"]>;
    input: ObjectInput<S, C["in"]>;
    optin?: "optional" | undefined;
    optout?: "optional" | undefined;
}
interface CoreObject<S extends Readonly<Shape> = Readonly<Shape>, out C extends Config = Config>
    extends Schema<any, any, ObjectInternals<S, C>> {}
interface MiniObject<S extends Shape = Shape, out C extends Config = Strip>
    extends MiniSchema<any, any, ObjectInternals<S, C>>, CoreObject<S, C> {
    shape: S;
}
interface ExtendedObject<S extends Shape> extends MiniObject<S> {
    "~standard": ExtendedSchema<this>;
}
declare function object<T extends Shape>(shape: T): ExtendedObject<Writeable<T>>;
export const schema/*call*/ = object(/*signature*/{
    get children/*getter*/() { return object({ children: schema }); },
});
schema.shape.children;
type Assert<T extends true> = T;
export function consume() {
    const value = null! as output<typeof schema>;
    const deep = value.children.children.children.children;
    type NotAny = Assert<IsAny<typeof deep> extends false ? true : false>;
    type Keys = Assert<keyof typeof deep extends "children" ? "children" extends keyof typeof deep ? true : false : false>;
    const recursive: typeof deep = value;
    // @ts-expect-error The recursively inferred object has no missing property.
    deep.missing;
    // @ts-expect-error Every children property must contain another recursive object.
    const wrong: typeof deep = { children: { children: 42 } };
}
// @Filename: /consumer.ts
import { schema } from "./schema.js";
type IsAny<T> = 0 extends 1 & T ? true : false;
type Assert<T extends true> = T;
const value = schema._zod.output;
export const deep = value.children.children.children.children;
type DeepIsAny/*output*/ = IsAny<typeof deep>;
type NotAny = Assert<DeepIsAny extends false ? true : false>;
type Keys = Assert<keyof typeof deep extends "children" ? "children" extends keyof typeof deep ? true : false : false>;
const recursive: typeof deep = value;
// @ts-expect-error Imported recursive objects have no missing property.
deep.missing;
// @ts-expect-error Every children property must contain another recursive object.
const wrong: typeof deep = { children: { children: 42 } };
`
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			// Keep the project unchanged throughout the ordered semantic requests.
			f.GoToFile(t, "/schema.ts")
			f.GoToFile(t, "/consumer.ts")
			if test.signatureFirst {
				f.GoToMarker(t, "signature")
				f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{
					ParameterName:  "shape",
					ParameterCount: 1,
					OverloadsCount: 1,
				})
			} else if test.marker == "output" {
				f.VerifyQuickInfoAt(t, "output", "type DeepIsAny = false", "")
			} else if test.marker != "" {
				f.GoToMarker(t, test.marker)
				// Capture the first recursive hover, not just a later cache-stable response.
				f.VerifyBaselineHover(t, test.marker)
			}
			markers := []string{"call", "output"}
			if test.consumerFirst {
				markers = []string{"output", "call"}
			}
			for _, marker := range markers {
				f.GoToMarker(t, marker)
				f.VerifyNonSuggestionDiagnostics(t, nil)
			}
			f.VerifyBaselineNonSuggestionDiagnostics(t)
			f.VerifyBaselineHover(t)
		})
	}
}
