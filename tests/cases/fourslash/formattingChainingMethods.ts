/// <reference path="fourslash.ts" />

//// z$ = this.store.select(this.fake())
////     .ofType(
////      'ACTION',
////      'ACTION-2'
////     )
////     .pipe(
////         filter(x => !!x),
////         switchMap(() =>
////          this.store.select(this.menuSelector.getAll('x'))
////           .pipe(
////             tap(x => {
////             this.x = !x;
////             })
////           )
////         )
////     );
////
////1
////    .toFixed(
////        2);

format.document();
verify.currentFileContentIs(`z$ = this.store.select(this.fake())
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
);
