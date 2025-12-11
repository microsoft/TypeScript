package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportTypeOnlyPreferred2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /node_modules/react/index.d.ts
export interface ComponentType {}
export interface ComponentProps {}
export declare function useState<T>(initialState: T): [T, (newState: T) => void];
export declare function useEffect(callback: () => void, deps: any[]): void;
// @Filename: /main.ts
import type { ComponentType } from "react";
import { useState } from "react";

export function Component({ prop } : { prop: ComponentType }) {
    const codeIsUnimportant = useState(1);
    useEffect/*1*/(() => {}, []);
}
// @Filename: /main2.ts
import { useState } from "react";
import type { ComponentType } from "react";

type _ = ComponentProps/*2*/;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifyImportFixAtPosition(t, []string{
		`import type { ComponentType } from "react";
import { useEffect, useState } from "react";

export function Component({ prop } : { prop: ComponentType }) {
    const codeIsUnimportant = useState(1);
    useEffect(() => {}, []);
}`,
	}, nil /*preferences*/)
	f.GoToMarker(t, "2")
	f.VerifyImportFixAtPosition(t, []string{
		`import { useState } from "react";
import type { ComponentProps, ComponentType } from "react";

type _ = ComponentProps;`,
	}, nil /*preferences*/)
}
