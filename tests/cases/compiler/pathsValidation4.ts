// @noTypesAndSymbols: true
// @filename: tsconfig.json
{
    "compilerOptions": {
        "traceResolution": true,
        "baseUrl": "./src",
        "ignoreDeprecations": "6.0",
        "paths": {
          "@interface/**/*" : ["./src/interface/*"],
          "@service/**/*": ["./src/service/**/*"],
          "@controller/*": ["controller/*"],
        }
    }
}

// @filename: src/main.ts
import 'someModule';