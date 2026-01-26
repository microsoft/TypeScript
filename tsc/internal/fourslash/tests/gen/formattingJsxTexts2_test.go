package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingJsxTexts2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
const a = (
    <div>
  foo
          </div>
);

const b = (
    <div>
  {     foo  }
          </div>
);

const c = (
    <div>
    foo
  {     foobar  }
  bar
          </div>
);

const d = 
    <div>
  foo
          </div>;

const e = 
    <div>
  {     foo  }
          </div>

const f = 
    <div>
    foo
  {     foobar  }
  bar
          </div>`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `const a = (
    <div>
        foo
    </div>
);

const b = (
    <div>
        {foo}
    </div>
);

const c = (
    <div>
        foo
        {foobar}
        bar
    </div>
);

const d =
    <div>
        foo
    </div>;

const e =
    <div>
        {foo}
    </div>

const f =
    <div>
        foo
        {foobar}
        bar
    </div>`)
}
