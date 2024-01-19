/// <reference path="../fourslash.ts" />

// @Filename: /project/packages/ui/package.json
//// {
////   "name": "@repo/ui",
////   "version": "1.0.0",
////   "exports": {
////     "./*": "./src/*.tsx"
////   }
//// }

// @Filename: /project/packages/ui/src/Card.tsx
//// export const Card = () => null;

// @Filename: /project/apps/web/package.json
//// {
////   "name": "web",
////   "version": "1.0.0",
////   "dependencies": {
////     "@repo/ui": "workspace:*"
////   }
//// }

// @Filename: /project/apps/web/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "esnext",
////     "moduleResolution": "bundler",
////     "noEmit": true,
////     "jsx": "preserve"
////   },
////  "include": ["app"]
//// }

// @Filename: /project/apps/web/app/index.tsx
//// (<Card/**/ />);

// @link: /project/packages/ui -> /project/apps/web/node_modules/@repo/ui

goTo.marker("");
verify.completions({
  includes: [
    {
      name: "Card",
      source: "@repo/ui/Card",
      sourceDisplay: "@repo/ui/Card",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
    },
  ],
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true
  }
});
