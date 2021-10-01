// @Filename: a.tsx
//// function OverridableComponent(props: {
////     /** @deprecated */
////     a: boolean;
////     c?: boolean;
//// }): JSX.Element
//// function OverridableComponent(props: { a: boolean; b: boolean }): JSX.Element
//// function OverridableComponent(_props: { a: boolean; b?: boolean; c?: boolean }) {
////     return <div />;
//// }

//// <OverridableComponent [|a|] />;
//// <OverridableComponent a b />;

goTo.file('a.tsx')
const ranges = test.ranges();

verify.getSuggestionDiagnostics([
    {
        message: "'a' is deprecated.",
        code: 6385,
        range: ranges[0],
        reportsDeprecated: true,
    }
])
