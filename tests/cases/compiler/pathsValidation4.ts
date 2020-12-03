// @noTypesAndSymbols: true
// @filename: tsconfig.json
{
    "compilerOptions": {
        "traceResolution": true,
        "baseUrl": "./src",
        "paths": {
          "@interface/**/*" : ["./src/interface/*"],
          "@service/**/*": ["./src/service/**/*"],
          "@controller/*": ["controller/*"],
        }
    }
}

// @filename: src/main.ts
import 'someModule';