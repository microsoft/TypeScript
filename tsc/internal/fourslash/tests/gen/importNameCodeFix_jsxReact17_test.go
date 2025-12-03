package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_jsxReact17(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: preserve
// @module: commonjs
// @Filename: /node_modules/@types/react/index.d.ts
declare namespace React {
  function createElement(): any;
}
export = React;
export as namespace React;

declare global {
  namespace JSX {
    interface IntrinsicElements {}
    interface IntrinsicAttributes {}
  }  
}
// @Filename: /component.tsx
import "react";
export declare function Component(): any;
// @Filename: /index.tsx
(<Component/**/ />);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`import { Component } from "./component";

(<Component />);`,
	}, nil /*preferences*/)
}
