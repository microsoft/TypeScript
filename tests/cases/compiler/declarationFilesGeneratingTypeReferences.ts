// @declaration: true
// @outFile: out.js

// @filename: /a/node_modules/@types/jquery/index.d.ts
interface JQuery {

}

// @filename: /a/app.ts
/// <reference types="jquery" preserve="true" />
namespace Test {
    export var x: JQuery;
}
