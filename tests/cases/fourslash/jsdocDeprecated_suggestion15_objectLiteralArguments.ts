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
//// const func = (_props: Props) => {};
//// const foo = "foo";
//// const bar = "bar";
//// const callback = () => {};

//// func({ [|callback|]: () => {}, [|foo|]: "foo", bar: "bar", baz: { [|foo|]: true } });
//// func({ [|"foo"|]: "foo", "bar": "bar" });
//// func({ [|["foo"]|]: "foo", ["bar"]: "bar" });
//// func({ [|foo|], bar, [|callback|] });
//// func({ bar, [|callback|]() {} });

//// // Skip if there is a type incompatibility error.
//// func({ foo: "foo", boo: "boo" });

//// // Skip for union types.
//// function test(_args: { foo: { /** @deprecated */ bar: string } | { bar: string, baz: string } }) {}
//// test({ foo: { bar: "bar" } })

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
