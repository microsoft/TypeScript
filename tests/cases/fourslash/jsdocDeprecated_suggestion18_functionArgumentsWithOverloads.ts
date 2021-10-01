//// function overloadFunc(props: {
////     /** @deprecated */
////     a: boolean;
////     c?: boolean;
//// }): JSX.Element
//// function overloadFunc(props: { a: boolean; b: boolean }): JSX.Element
//// function overloadFunc(_props: { a: boolean; b?: boolean; c?: boolean }) {
////     return <div />;
//// }

//// overloadFunc({ [|a|]: true }) />;
//// overloadFunc({ a: true, b: true }) />;

const ranges = test.ranges();

verify.getSuggestionDiagnostics([
    {
        message: "'a' is deprecated.",
        code: 6385,
        range: ranges[0],
        reportsDeprecated: true,
    }
])
