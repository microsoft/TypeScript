// @Filename: a.tsx
//// /** @deprecated */
//// type Props = {}

//// /** @deprecated */
//// const Component = (props: [|Props|]) => props && <div />;

//// <[|Component|] old="old" new="new" />

//// /** @deprecated */
//// type Options = {}

//// /** @deprecated */
//// const deprecatedFunction = (options: [|Options|]) => { options }

//// [|deprecatedFunction|]({});

goTo.file('a.tsx')
const ranges = test.ranges();

verify.getSuggestionDiagnostics([
    {
        message: "'Props' is deprecated.",
        code: 6385,
        range: ranges[0],
        reportsDeprecated: true,
    },
    {
        message: "'Component' is deprecated.",
        code: 6385,
        range: ranges[1],
        reportsDeprecated: true
    },
    {
        message: "'Options' is deprecated.",
        code: 6385,
        range: ranges[2],
        reportsDeprecated: true,
    },
    {
        message: "'deprecatedFunction' is deprecated.",
        code: 6385,
        range: ranges[3],
        reportsDeprecated: true,
    }
])