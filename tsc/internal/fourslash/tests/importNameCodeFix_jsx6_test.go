package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestImportNameCodeFix_jsx6(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
// @jsx: react
// @module: esnext
// @esModuleInterop: true
// @moduleResolution: bundler
// @Filename: /node_modules/react/index.d.ts
export = React;
export as namespace React;
declare namespace React {
    class Component {}
}
// @Filename: /node_modules/react-native/index.d.ts
import * as React from "react";
export class Text extends React.Component {};
// @Filename: /a.tsx
<[|Text|]></Text>;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/a.tsx")
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Add import from \"react-native\"",
		NewFileContent: `import { Text } from "react-native";

<Text></Text>;`,
		Index: 0,
	})
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Import 'React' from \"react\"",
		NewFileContent: `import React from "react";

<Text></Text>;`,
		Index: 1,
	})
}
