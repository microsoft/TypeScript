// @Filename: a.tsx
//// type Props = {
////      /** @deprecated */
////      foo?: string;
////      bar: string;
////      baz?: {
////          /** @deprecated */
////          foo?: boolean;
////          bar?: boolean;
////      };
////      /** @deprecated */
////      callback?: () => void
////      /** @deprecated */
////      bool?: boolean;
//// }
//// const Component = (props: Props) => props && <div />;
//// const foo = "foo";
//// const bar = "bar";

//// <Component [|bool|] [|callback|]={() => {}} [|foo|]="foo" bar="bar" baz={{ [|foo|]: true }} />;

//// // Skip spread in jsx.
//// <Component {...{ foo: "foo", bar: "bar" }} />;

//// // Skip if there is a type incompatibility error.
//// <Component foo="" boo="" />;
//// <Component {...{ foo: "foo", boo: "boo" }} />;

//// // Skip for union types.
//// const Component2 = (_props: { foo: { /** @deprecated */ bar: string } | { bar: string, baz: string } }) => <div />;
//// <Component foo={{ bar: "bar" }} />;

goTo.file('a.tsx')
const ranges = test.ranges();

verify.getSuggestionDiagnostics([
    {
        message: "'bool' is deprecated.",
        code: 6385,
        range: ranges[0],
        reportsDeprecated: true,
    },
    {
        message: "'callback' is deprecated.",
        code: 6385,
        range: ranges[1],
        reportsDeprecated: true,
    },
    ...ranges.slice(2).map(range => ({
        message: "'foo' is deprecated.",
        code: 6385,
        range,
        reportsDeprecated: true as const,
    }))
])
