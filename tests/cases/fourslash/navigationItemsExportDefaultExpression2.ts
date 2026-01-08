/// <reference path="fourslash.ts"/>

//// export const foo = {
////   foo: {},
//// };
////
//// export default {
////   foo: {},
//// };
////
//// export default {
////   foo: {},
//// };
////
//// type Type = typeof foo;
////
//// export default {
////   foo: {},
//// } as Type;
////
//// export default {
////   foo: {},
//// } satisfies Type;
////
//// export default (class {
////   prop = 42;
//// });
////
//// export default (class Cls {
////   prop = 42;
//// });

verify.navigationTree({
  text: '"navigationItemsExportDefaultExpression2"',
  kind: "module",
  childItems: [
    {
      text: "default",
      kind: "const",
      kindModifiers: "export",
      childItems: [
        {
          text: "foo",
          kind: "property",
        },
      ],
    },
    {
      text: "default",
      kind: "const",
      kindModifiers: "export",
      childItems: [
        {
          text: "foo",
          kind: "property",
        },
      ],
    },
    {
      text: "default",
      kind: "const",
      kindModifiers: "export",
      childItems: [
        {
          text: "foo",
          kind: "property",
        },
      ],
    },
    {
      text: "default",
      kind: "const",
      kindModifiers: "export",
      childItems: [
        {
          text: "foo",
          kind: "property",
        },
      ],
    },
    {
      text: "default",
      kind: "const",
      kindModifiers: "export",
      childItems: [
        {
          text: "<class>",
          kind: "class",
          childItems: [
            {
              text: "prop",
              kind: "property",
            },
          ],
        },
      ],
    },
    {
      text: "default",
      kind: "const",
      kindModifiers: "export",
      childItems: [
        {
          text: "Cls",
          kind: "class",
          childItems: [
            {
              text: "prop",
              kind: "property",
            },
          ],
        },
      ],
    },
    {
      text: "foo",
      kind: "const",
      kindModifiers: "export",
      childItems: [
        {
          text: "foo",
          kind: "property",
        },
      ],
    },
    {
      text: "Type",
      kind: "type",
    },
  ],
});
