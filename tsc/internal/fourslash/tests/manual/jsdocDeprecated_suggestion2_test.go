package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsdocDeprecated_suggestion2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// overloads
declare function foo(a: string): number;
/** @deprecated */
declare function foo(): undefined;
declare function foo (a?: string): number | undefined;
[|foo|]();
foo('');
foo;
/** @deprecated */
declare function bar(): number;
[|bar|]();
[|bar|];
/** @deprecated */
declare function baz(): number;
/** @deprecated */
declare function baz(): number | undefined;
[|baz|]();
[|baz|];
interface Foo {
    /** @deprecated */
    (): void
    (a: number): void
}
declare const f: Foo;
[|f|]();
f(1);
interface T {
    createElement(): void
    /** @deprecated */
    createElement(tag: 'xmp'): void;
}
declare const t: T;
t.createElement();
t.[|createElement|]('xmp');
declare class C {
    /** @deprecated */
    constructor ();
    constructor(v: string)
}
C;
const c = new [|C|]();
interface Ca {
    /** @deprecated */
    (): void
    new (): void
}
interface Cb {
    (): void
    /** @deprecated */
    new (): string
}
declare const ca: Ca;
declare const cb: Cb;
ca;
cb;
[|ca|]();
cb();
new ca();
new [|cb|]();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifySuggestionDiagnostics(t, []*lsproto.Diagnostic{
		{
			Message: "The signature '(): undefined' of 'foo' is deprecated.",
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Range:   f.Ranges()[0].LSRange,
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
		},
		{
			Message: "The signature '(): number' of 'bar' is deprecated.",
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Range:   f.Ranges()[1].LSRange,
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
		},
		{
			Message: "'bar' is deprecated.",
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Range:   f.Ranges()[2].LSRange,
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
		},
		{
			Message: "The signature '(): number' of 'baz' is deprecated.",
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Range:   f.Ranges()[3].LSRange,
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
		},
		{
			Message: "'baz' is deprecated.",
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Range:   f.Ranges()[4].LSRange,
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
		},
		{
			Message: "The signature '(): void' of 'f' is deprecated.",
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Range:   f.Ranges()[5].LSRange,
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
		},
		{
			Message: "The signature '(tag: \"xmp\"): void' of 't.createElement' is deprecated.",
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Range:   f.Ranges()[6].LSRange,
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
		},
		{
			Message: "The signature 'new (): C' of 'C' is deprecated.",
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Range:   f.Ranges()[7].LSRange,
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
		},
		{
			Message: "The signature '(): void' of 'ca' is deprecated.",
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Range:   f.Ranges()[8].LSRange,
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
		},
		{
			Message: "The signature 'new (): string' of 'cb' is deprecated.",
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Range:   f.Ranges()[9].LSRange,
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
		},
	})
}
