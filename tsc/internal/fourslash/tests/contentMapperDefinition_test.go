package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/testutil/contentmappertest"
)

func TestContentMapperDefinition(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /format.ts
export function [|format|](value: string): string { return value.toUpperCase(); }

// @Filename: /ProfileCard.vue
<component name="[|ProfileCard|]">
<template>
  <h1>{{ ti/*template*/tle }}</h1>
  <p class="card/*markup*/">Profile</p>
</template>
<script lang="ts">
import { format } from "./format";
export const [|title|] = "Profile";
export const heading = for/*outgoing*/mat(title);
export const localTitle = ti/*within*/tle;
</script>

// @Filename: /main.ts
import DefaultCard, { ProfileCard, title } from "./ProfileCard.vue";
export const pageTitle = ti/*incoming*/tle;
export const component = Profile/*atomTarget*/Card;
export const fallback = Default/*fallback*/Card;
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	f.VerifyBaselineGoToDefinition(t, false, /*includeOriginalSelectionRange*/
		"within",
		"template",
		"incoming",
		"outgoing",
		"atomTarget",
		"fallback",
		"markup",
	)
}
