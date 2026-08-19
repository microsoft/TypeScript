package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/testutil/contentmappertest"
)

func TestContentMapperReferences(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /format.ts
export function [|format|](value: string): string { return value; }

// @Filename: /ProfileCard.vue
<component name="[|ProfileCard|]">
<template>
  <h1>{{ [|ti/*template*/tle|] }}</h1>
  <p class="card/*markup*/">Profile</p>
</template>
<script lang="ts">
import { format } from "./format";
export const [|ti/*script*/tle|] = "Profile";
export const heading = [|for/*outgoing*/mat|]([|title|]);
</script>

// @Filename: /main.ts
import DefaultCard, { ProfileCard, title } from "./ProfileCard.vue";
export const pageTitle = [|ti/*incoming*/tle|];
export const component = [|Profile/*atomResult*/Card|];
export const fallback = [|Default/*synthesized*/Card|];
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	f.VerifyBaselineFindAllReferences(t,
		"script",
		"template",
		"incoming",
		"outgoing",
		"atomResult",
		"synthesized",
		"markup",
	)
}
