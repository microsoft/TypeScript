/// <reference path='fourslash.ts' />

////import abs = require("/*a*/abs/subModule/*b*/");

test.setTypesRegistry({
  "abs": undefined,
});

goTo.select("a", "b");
verify.refactor({
  name: "Install missing types package",
  actionName: "install",
  refactors: [
      {
          name: "Install missing types package",
          description: "Install missing types package",
          actions: [
              {
                  description: "Install '@types/abs'",
                  name: "install",
              }
          ]
      }
  ],
});
