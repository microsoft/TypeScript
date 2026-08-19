// @runExternalCode: true
// @noTypesAndSymbols: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "target": "es2020",
        "module": "esnext",
        "moduleResolution": "bundler",
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
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"], "compilerOptions": ["target", "jsx"] } }
}

// @Filename: /widget.box
// @box-ignore
const ignored: number = "wrong";

// @box-expect-error: Unused first expectation.
const expected: number = "wrong";

// @box-expect-error: Syntax errors do not satisfy expectations.
const syntaxError = ;

// @box-expect-error: Unused second expectation.
const valid: number = 1;

const visible: number = "wrong";

// @box-expect-error: Mapper diagnostics do not satisfy expectations.
export const broken = #{unterminated;
