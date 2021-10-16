///<reference path="fourslash.ts" />

//// interface Foo {
////     /** @deprecated */
////     f: number
////     b: number
////     /** @deprecated */
////     baz: number
//// }

//// declare const f: Foo
//// f.[|f|];
//// f.b;
//// f.[|baz|];

//// const kf = 'f'
//// const kb = 'b'
//// declare const k: 'f' | 'b' | 'baz'
//// declare const kfb: 'f' | 'b'
//// declare const kfz: 'f' | 'baz'
//// declare const keys: keyof Foo
//// f[[|kf|]]
//// f[kb]
//// f[k]
//// f[kfb]
//// f[kfz]
//// f[keys]


const ranges = test.ranges();
verify.getSuggestionDiagnostics([
    {
        message: "'f' is deprecated.",
        code: 6385,
        range: ranges[0],
        reportsDeprecated: true,
    },
    {
        message: "'baz' is deprecated.",
        code: 6385,
        range: ranges[1],
        reportsDeprecated: true,
    },
    {
        message: "'f' is deprecated.",
        code: 6385,
        range: ranges[2],
        reportsDeprecated: true,
    }
])
