package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatMultilineTypesWithMapped(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type Z = 'z'
type A = {
  a: 'a'
} | {
      [index in Z]: string
  }
type B = {
  b: 'b'
} & {
      [index in Z]: string
  }

const c = {
  c: 'c'
} as const satisfies {
    [index in Z]: string
  }

const d = {
  d: 'd'
} as const satisfies {
  [index: string]: string
}

const e = {
  e: 'e'
} satisfies {
    [index in Z]: string
  }

const f = {
  f: 'f'
} satisfies {
  [index: string]: string
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `type Z = 'z'
type A = {
    a: 'a'
} | {
    [index in Z]: string
}
type B = {
    b: 'b'
} & {
    [index in Z]: string
}

const c = {
    c: 'c'
} as const satisfies {
    [index in Z]: string
}

const d = {
    d: 'd'
} as const satisfies {
    [index: string]: string
}

const e = {
    e: 'e'
} satisfies {
    [index in Z]: string
}

const f = {
    f: 'f'
} satisfies {
    [index: string]: string
}`)
}
