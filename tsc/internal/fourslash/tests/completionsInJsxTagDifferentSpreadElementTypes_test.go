package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsInJsxTagDifferentSpreadElementTypes(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @Filename: /completionsWithDifferentSpreadTypes.tsx
// @strict: true

// A reasonable type to spread.
export function ComponentObjectX(props: { x: string }) {
    return <SomeComponent {...props} /*objectX*//>;
}

// A questionable but valid type to spread.
export function ComponentObjectXOrY(props: { x: string } | { y: string }) {
    return <SomeComponent {...props} /*objectXOrY*//>;
}

// A very unexpected type to spread (a union containing a primitive).
export function ComponentNumberOrObjectX(props: number | { x: string }) {
    return <SomeComponent {...props} /*numberOrObjectX*//>;
}

// Very unexpected, but still structured (union) types.
// 'boolean' is 'true | false' and an optional 'null' is really 'null | undefined'.
export function ComponentBoolean(props: boolean) {
    return <SomeComponent {...props} /*boolean*//>;
}
export function ComponentOptionalNull(props?: null) {
    return <SomeComponent {...props} /*optNull*//>;
}

// Primitive types (non-structured).
export function ComponentAny(props: any) {
    return <SomeComponent {...props} /*any*//>;
}
export function ComponentUnknown(props: unknown) {
    return <SomeComponent {...props} /*unknown*//>;
}
export function ComponentNever(props: never) {
    return <SomeComponent {...props} /*never*//>;
}
export function ComponentUndefined(props: undefined) {
    return <SomeComponent {...props} /*undefined*//>;
}
export function ComponentNumber(props: number) {
    return <SomeComponent {...props} /*number*//>;
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToEachMarker(t, nil, func(marker *fourslash.Marker, index int) {
		f.VerifyCompletions(t, marker, nil)
	})
}
