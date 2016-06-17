// @allowJs: true
// @filename: es6.js
// @out: dummy50.js
'use strict';

// ArrowFunctionExpression
["Model", "View", "Controller"].forEach(name => console.log(name));

// ClassBody, ClassDeclaration, MethodDefinition
class Socket {
    constructor(port) {
        // ...
    }
    open() {
        // ...
    }
    close() {
        // ...
    }
}

// ClassExpression
var WebSocket = class extends Socket {
    // ...
};

// ExportBatchSpecifier, ExportDeclaration
export * from 'lib/network';

// ExportSpecifier
export {Socket};

// ImportDeclaration, ImportSpecifier
import {Packet} from 'lib/data';

// ModuleDeclaration
module util from 'lib/util';

// SpreadElement
function logItems(...items) {
    items.forEach(function(item) {
        console.log(item);
    });
}
logItems(...['hello', 'world!']);

// TaggedTemplateExpression
console.log`hello world!`;

// TemplateElement, TemplateLiteral
var piMessage = `pi equals ${Math.PI}`;
