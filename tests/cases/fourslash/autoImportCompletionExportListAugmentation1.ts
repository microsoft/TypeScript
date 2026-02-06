/// <reference path="fourslash.ts" />
// @module: node18

// @Filename: /node_modules/@sapphire/pieces/index.d.ts
//// interface Container {
////   stores: unknown;
//// }
////
//// declare class Piece {
////   container: Container;
//// }
////
//// export { Piece, type Container };

// @FileName: /augmentation.ts
//// declare module "@sapphire/pieces" {
////   interface Container {
////     client: unknown;
////   }
////   export { Container };
//// }

// @Filename: /index.ts
//// import { Piece } from "@sapphire/pieces";
//// class FullPiece extends Piece {
////   /*1*/
//// }

const preferences = {
  includeCompletionsWithClassMemberSnippets: true,
  includeCompletionsWithInsertText: true,
};

verify.completions({
  marker: "1",
  includes: [
    {
      name: "container",
      insertText: "container: Container;",
      filterText: "container",
      hasAction: true,
      source: "ClassMemberSnippet/",
    },
  ],
  preferences,
  isNewIdentifierLocation: true,
});

verify.applyCodeActionFromCompletion("1", {
  name: "container",
  source: "ClassMemberSnippet/",
  description: `Includes imports of types referenced by 'container'`,
  newFileContent: `import { Container, Piece } from "@sapphire/pieces";
class FullPiece extends Piece {
  
}`,
  preferences,
});
