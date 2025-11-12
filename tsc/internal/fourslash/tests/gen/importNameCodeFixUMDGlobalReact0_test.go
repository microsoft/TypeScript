package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixUMDGlobalReact0(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: react
// @allowSyntheticDefaultImports: false
// @module: es2015
// @moduleResolution: bundler
// @Filename: /node_modules/@types/react/index.d.ts
export = React;
export as namespace React;
declare namespace React {
    export class Component { render(): JSX.Element | null; }
}
declare global {
    namespace JSX {
        interface Element {}
    }
}
// @Filename: /a.tsx
[|import { Component } from "react";
export class MyMap extends Component { }
<MyMap/>;|]
// @Filename: /b.tsx
[|import { Component } from "react";
<></>;|]`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "/a.tsx")
	f.VerifyImportFixAtPosition(t, []string{
		`import * as React from "react";
import { Component } from "react";
export class MyMap extends Component { }
<MyMap/>;`,
	}, nil /*preferences*/)
	f.GoToFile(t, "/b.tsx")
	f.VerifyImportFixAtPosition(t, []string{
		`import * as React from "react";
import { Component } from "react";
<></>;`,
	}, nil /*preferences*/)
}
