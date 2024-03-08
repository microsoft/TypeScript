/// <reference path="fourslash.ts" />

// @module: esnext
// @verbatimModuleSyntax: true

// @Filename: Presenter.ts
//// export type DisplayStyle = "normal" | "compact";
//// 
//// export default class Presenter {
////     present(displayStyle: DisplayStyle): Element {
////         return document.createElement("placeholder");
////     }
//// }

// @Filename: index.ts
//// import type Presenter from "./Presenter";
//// 
//// function present(
////     presenter: Presenter,
////     displayStyle: DisplayStyle,
//// ) {}

goTo.file("index.ts");
verify.codeFix({
  errorCode: ts.Diagnostics.Cannot_find_name_0.code,
  description: ignoreInterpolations(ts.Diagnostics.Add_import_from_0),
  newFileContent:
`import type { DisplayStyle } from "./Presenter";
import type Presenter from "./Presenter";

function present(
    presenter: Presenter,
    displayStyle: DisplayStyle,
) {}`
});
