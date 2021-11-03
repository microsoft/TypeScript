//// interface Props {
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
//// }
//// const Component = (props: Props) => props && <div />;
//// const foo = "foo";
//// const bar = "bar";
//// const callback = () => {};

//// let props: Props = { [|callback|]: () => {}, [|foo|]: "foo", bar: "bar", baz: { [|foo|]: true } };
//// props = { [|"foo"|]: "foo", "bar": "bar" };
//// props = { [|["foo"]|]: "foo", ["bar"]: "bar" };
//// props = { [|foo|], bar, [|callback|] };
//// props = { bar, [|callback|]() {} };

//// // Skip if there is a type incompatibility error.
//// const props5: Props = { [|foo|]: "foo", boo: "boo" };

//// // Skip for union types.
//// const props6: { foo: { /** @deprecated */ bar: string } | { bar: string, baz: string } } = { foo: { bar: "bar" } };

const ranges = test.ranges();

verify.getSuggestionDiagnostics([
    {
        message: "'callback' is deprecated.",
        code: 6385,
        range: ranges[0],
        reportsDeprecated: true,
    },
    {
        message: "'foo' is deprecated.",
        code: 6385,
        range: ranges[1],
        reportsDeprecated: true as const,
    },
    {
        message: "'foo' is deprecated.",
        code: 6385,
        range: ranges[2],
        reportsDeprecated: true as const,
    },
    {
        message: "'foo' is deprecated.",
        code: 6385,
        range: ranges[3],
        reportsDeprecated: true as const,
    },
    {
        message: "'foo' is deprecated.",
        code: 6385,
        range: ranges[4],
        reportsDeprecated: true as const,
    },
    {
        message: "'foo' is deprecated.",
        code: 6385,
        range: ranges[5],
        reportsDeprecated: true as const,
    },
    {
        message: "'callback' is deprecated.",
        code: 6385,
        range: ranges[6],
        reportsDeprecated: true,
    },
    {
        message: "'callback' is deprecated.",
        code: 6385,
        range: ranges[7],
        reportsDeprecated: true,
    },
    {
        message: "'foo' is deprecated.",
        code: 6385,
        range: ranges[8],
        reportsDeprecated: true as const,
    },
])
