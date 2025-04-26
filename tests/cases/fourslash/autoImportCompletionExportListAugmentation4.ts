/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /node_modules/@sapphire/pieces/index.d.ts
//// interface Container {
////   stores: unknown;
//// }
////
//// declare class Piece {
////   get container(): Container;
//// }
////
//// export { Piece as Alias, type Container };

// @Filename: /node_modules/@sapphire/framework/index.d.ts
//// import { Alias } from "@sapphire/pieces";
////
//// declare class Command extends Alias {}
////
//// declare module "@sapphire/pieces" {
////   interface Container {
////     client: unknown;
////   }
//// }
////
//// export { Command as CommandAlias };

// @Filename: /index.ts
//// import "@sapphire/pieces";
//// import { CommandAlias } from "@sapphire/framework";
//// class PingCommand extends CommandAlias {
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
      insertText: "get container(): Container {\n}",
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
  newFileContent: `import "@sapphire/pieces";
import { CommandAlias } from "@sapphire/framework";
import { Container } from "@sapphire/pieces";
class PingCommand extends CommandAlias {
  
}`,
  preferences,
});