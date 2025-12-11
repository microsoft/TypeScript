package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_importType6(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: es2015
// @esModuleInterop: true
// @jsx: react
// @Filename: /types.d.ts
declare module "react" { var React: any; export = React; export as namespace React; }
// @Filename: /a.tsx
import type React from "react";
function Component() {}
(<Component/**/ />)`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`import React from "react";
function Component() {}
(<Component />)`,
	}, nil /*preferences*/)
}
