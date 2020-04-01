/// <reference path="fourslash.ts" />

// @Filename: /project/tsconfig.json
////{
////  "compilerOptions": {
////    "jsx": "react",
////    "jsxFactory": "h"
////  }
////}

// @Filename: /project/app.tsx
////const state = useMemo(() => 'Hello', []);

// @Filename: /project/component.tsx
////import { useEffect } from "preact/hooks";

// @Filename: /project/node_modules/preact/package.json
////{ "name": "preact", "version": "10.3.4", "types": "src/index.d.ts" }

// @Filename: /project/node_modules/preact/hooks/package.json
////{ "name": "hooks", "version": "0.1.0", "types": "src/index.d.ts" }

// @Filename: /project/node_modules/preact/hooks/src/index.d.ts
////export function useEffect(): void;
////export function useMemo<T>(factory: () => T, inputs: ReadonlyArray<unknown> | undefined): T;

goTo.file("/project/app.tsx");
verify.importFixAtPosition([
    getImportFixContent("preact/hooks"),
]);

function getImportFixContent(from: string) {
    return `import { useMemo } from "${from}";

const state = useMemo(() => 'Hello', []);`;
}
