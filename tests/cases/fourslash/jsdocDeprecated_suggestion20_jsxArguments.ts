/// <reference path="fourslash.ts" />
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

//// // Do not skip spread in jsx
//// <Component {...{ [|foo|]: "foo", bar: "bar" }} />;

//// // Do not skip if there is a type incompatibility error.
//// <Component [|foo|]="" boo="" />;
//// <Component {...{ [|foo|]: "foo", boo: "boo" }} />;

//// // Skip for union types.
//// const Component2 = (_props: { foo: { /** @deprecated */ bar: string } | { bar: string, baz: string } }) => <div />;
//// <Component2 foo={{ bar: "bar" }} />;

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
        message: "'foo' is deprecated.",
        code: 6385,
        range: ranges[6],
        reportsDeprecated: true as const,
    },
])
