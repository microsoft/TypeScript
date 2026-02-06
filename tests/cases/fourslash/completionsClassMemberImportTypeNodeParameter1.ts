/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /generation.d.ts
//// export type GenerationConfigType = { max_length?: number };

// @FileName: /index.d.ts
//// export declare class PreTrainedModel {
////   _get_generation_config(
////     param: import("./generation.js").GenerationConfigType,
////   ): import("./generation.js").GenerationConfigType;
//// }
////
//// export declare class BlenderbotSmallPreTrainedModel extends PreTrainedModel {
////   /*1*/
//// }

verify.completions({
  marker: "1",
  includes: [
    {
      name: "_get_generation_config",
      insertText: `_get_generation_config(param: import("./generation.js").GenerationConfigType): import("./generation.js").GenerationConfigType;`,
      filterText: "_get_generation_config",
      hasAction: undefined,
    },
  ],
  preferences: {
    includeCompletionsWithClassMemberSnippets: true,
    includeCompletionsWithInsertText: true,
  },
  isNewIdentifierLocation: true,
});
