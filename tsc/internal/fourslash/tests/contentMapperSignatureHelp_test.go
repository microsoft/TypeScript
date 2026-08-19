package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/testutil/contentmappertest"
)

func TestContentMapperSignatureHelp(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /format.ts
export function format(value: string, uppercase?: boolean): string { return value; }

// @Filename: /ProfileCard.vue
<component name="ProfileCard">
<template>
  <h1>{{ format(ti/*templateCall*/tle) }}</h1>
  <button title="/*markup*/save">Save</button>
</template>
<script lang="ts">
import { format } from "./format";
export const title = "Profile";
format(title, /*scriptCall*/true);
export function greet(name: string, count: number): string { return name.repeat(count); }
</script>

// @Filename: /main.ts
import { greet } from "./ProfileCard.vue";
greet("hello", /*incomingCall*/2);
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	f.GoToMarker(t, "scriptCall")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{
		Text:          "format(value: string, uppercase?: boolean): string",
		ParameterName: "uppercase?",
		ParameterSpan: "uppercase?: boolean",
	})
	f.GoToMarker(t, "templateCall")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{
		Text:          "format(value: string, uppercase?: boolean): string",
		ParameterName: "value",
		ParameterSpan: "value: string",
	})
	f.GoToMarker(t, "incomingCall")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{
		Text:          "greet(name: string, count: number): string",
		ParameterName: "count",
		ParameterSpan: "count: number",
	})
	f.GoToMarker(t, "markup")
	f.VerifyNoSignatureHelp(t)
}

func TestContentMapperSupplementalSignatureHelpJSDocLink(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /globals.astro
const target = 1;
/** See {@link target}. */
function use(value: number) { return value; }
use(/*call*/target);
`, contentmappertest.SupplementalMapper, ".astro")
	defer done()

	f.GoToMarker(t, "call")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{
		Text:          "use(value: number): number",
		DocComment:    "See [target](file:///globals.astro#1,7-1,13).",
		ParameterName: "value",
		ParameterSpan: "value: number",
	})
}
