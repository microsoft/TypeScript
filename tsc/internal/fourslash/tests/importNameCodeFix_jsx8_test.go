package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestImportNameCodeFix_jsx8(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: react
// @module: esnext
// @esModuleInterop: true
// @moduleResolution: bundler
// @Filename: /node_modules/react/index.d.ts
export = React;
export as namespace React;
declare namespace React {
    class Component {}
}
// @Filename: /a.tsx
import { Component } from "react";
<Component></Component>;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/a.tsx")
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Import 'React' from \"react\"",
		NewFileContent: `import React, { Component } from "react";
<Component></Component>;`,
		Index: 0,
	})
}
