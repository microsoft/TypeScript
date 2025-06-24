/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/solution/package.json
//// {
////   "name": "monorepo-like",
//// }

// @Filename: /home/src/workspaces/solution/tsconfig.json
//// {
////   "compilerOptions": {
////     "moduleResolution": "node",
////     "paths": {
////       "*": ["../../app/node_modules/*"],
////       "tabby-*": ["../../tabby-*/src"],
////     }
////   }
//// }

// @Filename: /home/src/workspaces/solution/tabby-core/package.json
//// {
////   "name": "tabby-core"
//// }

// @Filename: /home/src/workspaces/solution/tabby-core/tsconfig.json
//// {
////   "extends": "../tsconfig.json"
//// }

// @Filename: /home/src/workspaces/solution/tabby-core/src/index.ts
//// import { Subject } from "rxjs";
////
//// export abstract class BaseTabComponent {
////   protected recoveryStateChangedHint = new Subject<void>();
//// }

// @Filename: /home/src/workspaces/solution/tabby-settings/package.json
//// {
////   "name": "tabby-settings",
////   "peerDependencies": {
////     "rxjs": "^7"
////   }
//// }

// @Filename: /home/src/workspaces/solution/tabby-settings/tsconfig.json
//// {
////   "extends": "../tsconfig.json",
////   "compilerOptions": {
////     "baseUrl": "src"
////   }
//// }

// @Filename: /home/src/workspaces/solution/tabby-settings/components/settingsTab.component.ts
//// import { BaseTabComponent } from "tabby-core";
//// export class SettingsTabComponent extends BaseTabComponent {
////   /*1*/
//// }

// @Filename: /home/src/workspaces/solution/app/package.json
//// {
////   "name": "tabby"
//// }

// @Filename: /home/src/workspaces/solution/app/tsconfig.json
//// {}

// @Filename: /home/src/workspaces/solution/app/node_modules/rxjs/package.json
//// {
////   "name": "rxjs"
//// }

// @Filename: /home/src/workspaces/solution/app/node_modules/rxjs/index.d.ts
//// export declare class Subject<T> {}

// @Filename: /home/src/workspaces/solution/node_modules/rxjs/package.json
//// {
////   "name": "rxjs"
//// }

// @Filename: /home/src/workspaces/solution/node_modules/rxjs/index.d.ts
//// export declare class Subject<T> {}

// Just verify that completion request doesn't crash
verify.completions({
  marker: "1",
  preferences: {
    includeCompletionsWithInsertText: true,
    includeCompletionsWithClassMemberSnippets: true,
  },
  isNewIdentifierLocation: true,
});