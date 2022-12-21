// @noTypesAndSymbols: true
// @Filename: tsconfig.json
{
  "compilerOptions": {
      "traceResolution": true,
      "paths": {
        "@interface/*": ["src/interface/*"],
        "@blah": ["blah"],
        "@humbug/*": ["*/generated"]
      }
  }
}

// @filename: src/main.ts
import 'someModule';