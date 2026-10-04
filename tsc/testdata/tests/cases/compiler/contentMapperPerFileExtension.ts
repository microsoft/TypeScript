// @runExternalCode: true
// @noTypesAndSymbols: true
// @noEmit: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "jsx": "preserve",
        "strict": true
    },
    "contentMappers": [
        { "package": "mapper", "extensions": [".box"] }
    ]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"], "compilerOptions": ["jsx"] } }
}

// @Filename: /script.box
// @box-extension: .ts
export const value: number = 1;

// @Filename: /component.box
// @box-extension: .tsx
declare global {
    namespace JSX {
        interface IntrinsicElements {
            div: {};
        }
    }
}
export const view = <div />;