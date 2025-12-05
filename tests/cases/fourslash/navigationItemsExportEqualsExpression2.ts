/// <reference path="fourslash.ts"/>

//// export const foo = {
////   foo: {},
//// };
////
//// export = {
////   foo: {},
//// };
////
//// export = {
////   foo: {},
//// };
////
//// type Type = typeof foo;
////
//// export = {
////   foo: {},
//// } as Type;
////
//// export = {
////   foo: {},
//// } satisfies Type;
////
//// export = (class {
////   prop = 42;
//// });
////
//// export = (class Cls {
////   prop = 42;
//// });

verify.navigationTree({
  text: '"navigationItemsExportEqualsExpression2"',
  kind: "module",
  childItems: [
    {
      text: "export=",
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
      text: "export=",
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
      text: "export=",
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
      text: "export=",
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
      text: "export=",
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
      text: "export=",
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
