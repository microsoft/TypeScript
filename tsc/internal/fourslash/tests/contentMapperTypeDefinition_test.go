package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/testutil/contentmappertest"
)

func TestContentMapperTypeDefinition(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /models.ts
export interface [|ExternalShape|] { area: number }

// @Filename: /ProfileCard.vue
<component name="[|ProfileCard|]">
<template>
  <p>{{ lo/*template*/calShape.area }}</p>
  <span class="shape/*markup*/">Shape</span>
</template>
<script lang="ts">
import { ExternalShape } from "./models";
export interface [|LocalShape|] { area: number }
export const localShape: LocalShape = { area: 1 };
export const externalShape: ExternalShape = { area: 2 };
local/*within*/Shape;
external/*outgoing*/Shape;
</script>

// @Filename: /main.ts
import { ProfileCard, localShape } from "./ProfileCard.vue";
local/*incoming*/Shape;
Profile/*atomTarget*/Card;
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	f.VerifyBaselineGoToTypeDefinition(t, "within", "template", "incoming", "outgoing", "atomTarget", "markup")
}
