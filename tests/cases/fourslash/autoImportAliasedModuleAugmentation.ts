/// <reference path="fourslash.ts" />

// @module: nodenext

// @Filename: /node_modules/@sapphire/pieces/index.d.ts
//// interface Container {
////   stores: unknown;
//// }
////
//// declare class Piece {
////   container: Container;
//// }
////
//// export { Piece, type Container as Alias };

// @FileName: /augmentation.ts
//// declare module "@sapphire/pieces" {
////   interface Alias {
////     client: unknown;
////   }
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
      insertText: "container: Alias;",
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
  newFileContent: `import { Alias, Piece } from "@sapphire/pieces";
class FullPiece extends Piece {
  
}`,
  preferences,
});
