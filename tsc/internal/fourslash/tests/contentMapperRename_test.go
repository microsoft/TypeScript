package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/testutil/contentmappertest"
)

func TestContentMapperRename(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /ProfileCard.vue
<component name="ProfileCard">
<template><h1>{{ title }}</h1></template>
<script lang="ts">
export const ti/*rename*/tle = "Profile";
export const heading = title.toUpperCase();
</script>

// @Filename: /main.ts
import { title } from "./ProfileCard.vue";
export const pageTitle = title;
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	f.VerifyRename(t, "rename", "newTitle", map[string]string{
		"/ProfileCard.vue": `<component name="ProfileCard">
<template><h1>{{ title }}</h1></template>
<script lang="ts">
export const newTitle = "Profile";
export const heading = newTitle.toUpperCase();
</script>
`,
		"/main.ts": `import { newTitle } from "./ProfileCard.vue";
export const pageTitle = newTitle;
`,
	})
}

func TestContentMapperRenameRejectsAtomAndUnmappedOrigins(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /ProfileCard.vue
<component name="ProfileCard">
<template>
  <h1>{{ ti/*atom*/tle }}</h1>
  <p class="card/*markup*/">Profile</p>
</template>
<script lang="ts">
export const title = "Profile";
</script>
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	f.GoToMarker(t, "atom")
	f.VerifyRenameFailed(t, nil)
	f.GoToMarker(t, "markup")
	f.VerifyRenameFailed(t, nil)
}

func TestContentMapperRenameOutgoing(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /format.ts
export function format(value: string): string { return value; }

// @Filename: /ProfileCard.vue
<component name="ProfileCard">
<template><h1>{{ utils.format(title) }}</h1></template>
<script lang="ts">
import * as utils from "./format";
export const title = "Profile";
export const heading = utils.for/*rename*/mat(title);
</script>
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	f.VerifyRename(t, "rename", "render", map[string]string{
		"/format.ts": `export function render(value: string): string { return value; }
`,
		"/ProfileCard.vue": `<component name="ProfileCard">
<template><h1>{{ utils.format(title) }}</h1></template>
<script lang="ts">
import * as utils from "./format";
export const title = "Profile";
export const heading = utils.render(title);
</script>
`,
	})
}
