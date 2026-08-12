package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestDeprecatedContextualPropertyOverload(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `interface DeprecatedOptions {
    kind: "deprecated";
    /** @deprecated */
    value: number;
}
interface CurrentOptions {
    kind: "current";
    value: number;
}
declare function select(options: DeprecatedOptions): void;
declare function select(options: CurrentOptions): void;

select({ kind: "current", value: 1 });

/** @deprecated */
declare const deprecatedValue: number;
select({ kind: "current", value: [|deprecatedValue|] });

interface DeprecatedContainer {
    /** @deprecated */
    value: number;
}
declare const deprecatedContainer: DeprecatedContainer;
select({ kind: "current", value: deprecatedContainer.[|value|] });

/** @deprecated */
declare function deprecatedCall(): number;
select({ kind: "current", value: [|deprecatedCall|]() });

interface DeprecatedAccessorOptions {
    /** @deprecated */
    value: number;
}
declare function accessor(options: DeprecatedAccessorOptions): void;
accessor({ get [|value|]() { return 1; } });
accessor({ set [|value|](_value: number) {} });

interface DeprecatedNamedOptions {
    /** @deprecated */
    "string-name": number;
    /** @deprecated */
    1: number;
}
declare function named(options: DeprecatedNamedOptions): void;
named({ [|"string-name"|]: 1, [|1|]: 1 });

interface FirstDeprecatedOptions {
    kind: "first";
    /** @deprecated */
    value: number;
}
interface SecondDeprecatedOptions {
    kind: "second";
    /** @deprecated */
    value: number;
}
declare function selectDeprecated(options: FirstDeprecatedOptions): void;
declare function selectDeprecated(options: SecondDeprecatedOptions): void;

selectDeprecated({ kind: "second", [|value|]: 1 });`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifySuggestionDiagnostics(t, []*lsproto.Diagnostic{
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: lsproto.StringOrMarkupContent{String: new("'deprecatedValue' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[0].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: lsproto.StringOrMarkupContent{String: new("'value' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[1].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: lsproto.StringOrMarkupContent{String: new("The signature '(): number' of 'deprecatedCall' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[2].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: lsproto.StringOrMarkupContent{String: new("'value' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[3].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: lsproto.StringOrMarkupContent{String: new("'value' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[4].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: lsproto.StringOrMarkupContent{String: new("'string-name' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[5].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: lsproto.StringOrMarkupContent{String: new("'1' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[6].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: lsproto.StringOrMarkupContent{String: new("'value' is deprecated.")},
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[7].LSRange,
		},
	})
}
