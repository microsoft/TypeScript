package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
)

func TestFormatBlankLines(t *testing.T) {
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo {
    bar: boolean;

}


const foo = "foo";


const bar = "bar";`
	f, done := fourslash.NewFourslash(t, nil, content)
	defer done()
	options := f.GetOptions()
	one := 1
	options.MaxConsecutiveBlankLines = &one
	options.RemoveBlankLinesBeforeClosingBrace = core.TSTrue
	f.Configure(t, options)
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `interface Foo {
    bar: boolean;
}

const foo = "foo";

const bar = "bar";`)
}

func TestFormatBlankLinesInMappedRange(t *testing.T) {
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /formatting.astro
function outer() {
    const a = 1;


    const b = 2;

}
`, contentmappertest.PrefixedSupplementalMapper, ".astro")
	defer done()
	options := f.GetOptions()
	one := 1
	options.MaxConsecutiveBlankLines = &one
	options.RemoveBlankLinesBeforeClosingBrace = core.TSTrue
	f.Configure(t, options)
	f.GoToFile(t, "/formatting.astro")
	f.FormatDocument(t, "/formatting.astro")
	f.VerifyCurrentFileContent(t, `function outer() {
    const a = 1;

    const b = 2;
}
`)
}
