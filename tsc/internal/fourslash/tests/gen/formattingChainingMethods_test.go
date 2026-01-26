package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingChainingMethods(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = ` z$ = this.store.select(this.fake())
     .ofType(
      'ACTION',
      'ACTION-2'
     )
     .pipe(
         filter(x => !!x),
         switchMap(() =>
          this.store.select(this.menuSelector.getAll('x'))
           .pipe(
             tap(x => {
             this.x = !x;
             })
           )
         )
     );

1
    .toFixed(
        2);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `z$ = this.store.select(this.fake())
    .ofType(
        'ACTION',
        'ACTION-2'
    )
    .pipe(
        filter(x => !!x),
        switchMap(() =>
            this.store.select(this.menuSelector.getAll('x'))
                .pipe(
                    tap(x => {
                        this.x = !x;
                    })
                )
        )
    );

1
    .toFixed(
        2);`)
}
