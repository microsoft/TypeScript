/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/packages/ui/package.json
//// {
////   "name": "@repo/ui",
////   "version": "1.0.0",
////   "exports": {
////     "./*": "./src/*.tsx"
////   }
//// }

// @Filename: /home/src/workspaces/project/packages/ui/src/Card.tsx
//// export const Card = () => null;

// @Filename: /home/src/workspaces/project/apps/web/package.json
//// {
////   "name": "web",
////   "version": "1.0.0",
////   "dependencies": {
////     "@repo/ui": "workspace:*"
////   }
//// }

// @Filename: /home/src/workspaces/project/apps/web/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "esnext",
////     "moduleResolution": "bundler",
////     "noEmit": true,
////     "jsx": "preserve"
////   },
////  "include": ["app"]
//// }

// @Filename: /home/src/workspaces/project/apps/web/app/index.tsx
//// (<Card/**/ />);

// @link: /home/src/workspaces/project/packages/ui -> /home/src/workspaces/project/apps/web/node_modules/@repo/ui

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
