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
//// const props5: Props = { foo: "foo", boo: "boo" };

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
    ...ranges.slice(1, ranges.length - 2).map(range => ({
        message: "'foo' is deprecated.",
        code: 6385,
        range,
        reportsDeprecated: true as const,
    })),
    {
        message: "'callback' is deprecated.",
        code: 6385,
        range: ranges[ranges.length - 2],
        reportsDeprecated: true,
    },
    {
        message: "'callback' is deprecated.",
        code: 6385,
        range: ranges[ranges.length - 1],
        reportsDeprecated: true,
    },
])
