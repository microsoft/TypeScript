package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsdocDeprecated_suggestion1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @experimentalDecorators: true
// @Filename: a.ts
export namespace foo {
    /** @deprecated */
    export function faff () { }
    [|faff|]()
}
const [|a|] = foo.[|faff|]()
foo[[|"faff"|]]
const { [|faff|] } = foo
[|faff|]()
/** @deprecated */
export function bar () {
    foo?.[|faff|]()
}
foo?.[[|"faff"|]]?.()
[|bar|]();
/** @deprecated */
export interface Foo {
    /** @deprecated */
    zzz: number
}
/** @deprecated */
export type QW = [|Foo|][[|"zzz"|]]
export type WQ = [|QW|]
class C {
    /** @deprecated */
    constructor() {
    }
    /** @deprecated */
    m() { }
}
/** @deprecated */
class D {
    constructor() {
    }
}
var c = new [|C|]()
c.[|m|]()
c.[|m|]
new [|D|]()
C
[|D|]
// @Filename: j.tsx
type Props = { someProp?: any }
declare var props: Props
/** @deprecated */
function Compi(_props: Props) {
    return <div></div>
}
[|Compi|];
<[|Compi|] />;
<[|Compi|] {...props}><div></div></[|Compi|]>;
/** @deprecated */
function ttf(_x: unknown) {
}
[|ttf|]` + "`" + `` + "`" + `
[|ttf|]
/** @deprecated */
function dec(_c: unknown) { }
[|dec|]
@[|dec|]
class K { }
// @Filename: b.ts
// imports and aliases
import * as f from './a';
import { [|bar|], [|QW|] } from './a';
f.[|bar|]();
f.foo.[|faff|]();
[|bar|]();
type Z = [|QW|];
type A = f.[|Foo|];
type B = f.[|QW|];
type C = f.WQ;
type [|O|] = Z | A | B | C;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "a.ts")
	f.VerifySuggestionDiagnostics(t, []*lsproto.Diagnostic{
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: "The signature '(): void' of 'faff' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[0].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6133))},
			Message: "'a' is declared but its value is never read.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagUnnecessary},
			Range:   f.Ranges()[1].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: "The signature '(): void' of 'foo.faff' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[2].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: "'faff' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[3].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: "'faff' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[4].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: "The signature '(): void' of 'faff' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[5].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: "The signature '(): void' of 'foo.faff' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[6].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: "The signature '(): void' of 'foo.faff' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[7].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: "The signature '(): void' of 'bar' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[8].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: "'Foo' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[9].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: "'zzz' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[10].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: "'QW' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[11].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: "The signature 'new (): C' of 'C' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[12].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: "The signature '(): void' of 'c.m' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[13].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: "'m' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[14].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: "'D' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[15].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: "'D' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[16].LSRange,
		},
	})
	f.GoToFile(t, "j.tsx")
	f.VerifySuggestionDiagnostics(t, []*lsproto.Diagnostic{
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: "'Compi' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[17].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: "The signature '(_props: Props): any' of 'Compi' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[18].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: "The signature '(_props: Props): any' of 'Compi' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[19].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: "'Compi' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[20].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: "The signature '(_x: unknown): void' of 'ttf' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[21].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: "'ttf' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[22].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: "'dec' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[23].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: "The signature '(_c: unknown): void' of 'dec' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[24].LSRange,
		},
	})
	f.GoToFile(t, "b.ts")
	f.VerifySuggestionDiagnostics(t, []*lsproto.Diagnostic{
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: "'bar' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[25].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: "'QW' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[26].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: "The signature '(): void' of 'f.bar' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[27].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: "The signature '(): void' of 'f.foo.faff' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[28].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6387))},
			Message: "The signature '(): void' of 'bar' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[29].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: "'QW' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[30].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: "'Foo' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[31].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6385))},
			Message: "'QW' is deprecated.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagDeprecated},
			Range:   f.Ranges()[32].LSRange,
		},
		{
			Code:    &lsproto.IntegerOrString{Integer: new(int32(6196))},
			Message: "'O' is declared but never used.",
			Tags:    &[]lsproto.DiagnosticTag{lsproto.DiagnosticTagUnnecessary},
			Range:   f.Ranges()[33].LSRange,
		},
	})
}
