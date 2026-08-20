package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
)

func TestContentMapperHover(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /format.ts
export function format(value: string): string { return value.toUpperCase(); }

// @Filename: /ProfileCard.vue
<component name="ProfileCard">
<template>
  <h1>{{ ti/*templateTitle*/tle }}</h1>
  <p class="/*markup*/subtitle">Welcome</p>
</template>
<script lang="ts">
import { format } from "./format";
export const ti/*scriptTitle*/tle: string = "Profile";
export const heading = for/*outgoing*/mat(title);
</script>

// @Filename: /main.ts
import { title } from "./ProfileCard.vue";
export const pageTitle = ti/*incoming*/tle;
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	f.VerifyQuickInfoAt(t, "scriptTitle", "const title: string", "")
	f.VerifyQuickInfoAt(t, "templateTitle", "const title: string", "")
	f.VerifyQuickInfoAt(t, "outgoing", "(alias) function format(value: string): string", "")
	f.VerifyQuickInfoAt(t, "incoming", "(alias) const title: string", "")
	f.GoToMarker(t, "markup")
	f.VerifyNotQuickInfoExists(t)
}

func TestContentMapperSupplementalHoverJSDocLink(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /globals.astro
const target = 1;
/** See {@link target}. */
const val/*hover*/ue = target;
`, contentmappertest.SupplementalMapper, ".astro")
	defer done()

	f.VerifyQuickInfoAt(t, "hover", "const value: 1", "See [target](file:///globals.astro#1,7-1,13).")
}
