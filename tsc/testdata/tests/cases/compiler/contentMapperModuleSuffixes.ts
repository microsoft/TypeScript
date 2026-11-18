// @runExternalCode: true
// @noTypesAndSymbols: true
// @noEmit: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "bundler",
        "moduleSuffixes": [".web", ""],
        "allowImportingTsExtensions": true,
        "strict": true,
        "traceResolution": true
    },
    "files": ["main.ts"],
    "contentMappers": [
        { "package": "mapper", "extensions": [".box", ".long.box"] }
    ]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

// @Filename: /card.box
export const platform = "default";

// @Filename: /card.web.box
export const platform = "web";

// @Filename: /card.long.box
export const platform = "default";

// @Filename: /card.web.long.box
export const platform = "web";

// @Filename: /card.long.web.box
export const platform = "wrong";

// @Filename: /fallback.box
export const platform = "default";

// @Filename: /target.ts
export const platform = "default";

// @Filename: /target.web.ts
export const platform = "web";

// @Filename: /main.ts
import { platform } from "./card.box";
import { platform as longPlatform } from "./card.long.box";
import { platform as fallbackPlatform } from "./fallback.box";
import { platform as standardPlatform } from "./target.ts";

const check: "web" = platform;
const longCheck: "web" = longPlatform;
const fallbackCheck: "default" = fallbackPlatform;
const standardCheck: "web" = standardPlatform;

export { platform as extensionlessPlatform } from "./card";
