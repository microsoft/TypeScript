/// <reference path="fourslash.ts" />

//// function foo (v: any) {}

//// foo(1);
//// foo('');
//// foo(true);
//// foo(() => 1);
//// foo(function () { return 1 });
//// foo({});
//// foo({ a: 1 });
//// foo([]);
//// foo([1]);

//// foo(foo);
//// foo((1));
//// foo(foo(1));

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "all",
    interactiveInlayHints: true
});
