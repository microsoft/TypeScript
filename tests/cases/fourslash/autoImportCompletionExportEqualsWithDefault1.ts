/// <reference path="fourslash.ts" />

// @strict: true
// @module: commonjs

// @filename: node.ts
//// import Container from "./container.js";
//// import Document from "./document.js";
////
//// declare namespace Node {
////   class Node extends Node_ {}
////
////   export { Node as default };
//// }
////
//// declare abstract class Node_ {
////   parent: Container | Document | undefined;
//// }
////
//// declare class Node extends Node_ {}
////
//// export = Node;

// @filename: document.ts
//// import Container from "./container.js";
////
//// declare namespace Document {
////   export { Document_ as default };
//// }
////
//// declare class Document_ extends Container {}
////
//// declare class Document extends Document_ {}
////
//// export = Document;

// @filename: container.ts
//// import Node from "./node.js";
////
//// declare namespace Container {
////   export { Container_ as default };
//// }
////
//// declare abstract class Container_ extends Node {
////   p/*1*/
//// }
////
//// declare class Container extends Container_ {}
////
//// export = Container;

const preferences = {
  includeCompletionsWithInsertText: true,
  includeCompletionsWithClassMemberSnippets: true,
};

verify.completions({
  marker: "1",
  includes: [
    {
      name: "parent",
      insertText: "parent: Container_ | Document_ | undefined;",
      filterText: "parent",
      hasAction: true,
      source: "ClassMemberSnippet/",
    },
  ],
  preferences,
  isNewIdentifierLocation: true,
});

verify.applyCodeActionFromCompletion("1", {
  name: "parent",
  source: "ClassMemberSnippet/",
  description: `Includes imports of types referenced by 'parent'`,
  newFileContent: `import Document_ from "./document.js";
import Node from "./node.js";

declare namespace Container {
  export { Container_ as default };
}

declare abstract class Container_ extends Node {
  p
}

declare class Container extends Container_ {}

export = Container;`,
  preferences,
});
