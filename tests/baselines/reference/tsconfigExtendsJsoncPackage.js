//// [tests/cases/compiler/tsconfigExtendsJsoncPackage.ts] ////

//// [base.jsonc]
{
    "compilerOptions": {
        "inlineSourceMap": true
    }
}

//// [package.json]
{
    "name": "test-config",
    "version": "1.0.0"
}

//// [index.ts]
export const x = 42;


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 42;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLENBQUMsR0FBRyxFQUFFLENBQUMifQ==