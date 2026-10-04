package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoStringLiteralOrigin(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
declare let value/*variable*/: "a" | "b" | string;
value/*reference*/;
type Choice/*alias*/ = "a" | "b" | string;
declare function accept(parameter/*parameter*/: Choice): void;
declare const holder: { member: Choice };
holder.member/*property*/;
declare let plain/*plain*/: string;
declare let literals/*literals*/: "a" | "b";
declare let mixed/*mixed*/: Choice | number;
declare let optional/*optional*/: Choice | undefined;
declare let merged/*merged*/: Choice | "c" | string;
type PlainUnion = string | number;
declare let ordinary/*ordinary*/: PlainUnion;
if (value === "a") {
    value/*narrowed*/;
}`
	f, done := fourslash.NewFourslash(t, nil, content)
	defer done()
	f.VerifyQuickInfoAt(t, "variable", `let value: string (origin: string | "a" | "b")`, "")
	f.VerifyQuickInfoAt(t, "reference", `let value: string (origin: string | "a" | "b")`, "")
	f.VerifyQuickInfoAt(t, "alias", `type Choice = string (origin: string | "a" | "b")`, "")
	f.VerifyQuickInfoAt(t, "parameter", `(parameter) parameter: string (origin: string | "a" | "b")`, "")
	f.VerifyQuickInfoAt(t, "property", `(property) member: string (origin: string | "a" | "b")`, "")
	f.VerifyQuickInfoAt(t, "plain", "let plain: string", "")
	f.VerifyQuickInfoAt(t, "literals", `let literals: "a" | "b"`, "")
	f.VerifyQuickInfoAt(t, "mixed", `let mixed: string | number (origin: string | number | "a" | "b")`, "")
	f.VerifyQuickInfoAt(t, "optional", `let optional: string | undefined (origin: string | "a" | "b" | undefined)`, "")
	f.VerifyQuickInfoAt(t, "merged", `let merged: string (origin: string | "a" | "b" | "c")`, "")
	f.VerifyQuickInfoAt(t, "ordinary", "let ordinary: PlainUnion", "")
	f.VerifyQuickInfoAt(t, "narrowed", `let value: "a"`, "")
}

func TestQuickInfoStringLiteralOriginFormats(t *testing.T) {
	t.Parallel()
	const content = `// @strict: true
// @Filename: /a.ts
type Choice = "a" | "b" | string;
/** Available choice. */
export declare let value/*declaration*/: Choice;
export declare const holder: {
    /** Available choice. */
    member: Choice | undefined;
};
// @Filename: /b.ts
import { value, holder } from "./a";
value/*imported*/;
holder.member/*property*/;`
	for _, format := range []string{"markdown", "plaintext", "visualStudio"} {
		t.Run("quickInfoStringLiteralOrigin_"+format, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			capabilities := &lsproto.ClientCapabilities{}
			if format == "visualStudio" {
				capabilities.VSSupportsVisualStudioExtensions = new(true)
			} else {
				capabilities.TextDocument = &lsproto.TextDocumentClientCapabilities{
					Hover: &lsproto.HoverClientCapabilities{
						ContentFormat: &[]lsproto.MarkupKind{lsproto.MarkupKind(format)},
					},
				}
			}
			f, done := fourslash.NewFourslash(t, capabilities, content)
			defer done()
			if format == "visualStudio" {
				f.VerifyBaselineVSHover(t)
			} else {
				f.VerifyBaselineHover(t)
			}
		})
	}
}
