package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestModuleReexportedIntoGlobalQuickInfo(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /node_modules/@types/three/index.d.ts
export class Vector3 {}
export as namespace THREE;
// @Filename: /global.d.ts
import * as _THREE from 'three';

declare global {
  const THREE: typeof _THREE;
}
// @Filename: /index.ts
let v = new /*1*/THREE.Vector3();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "const THREE: typeof import(\"/node_modules/@types/three/index\")", "")
}
