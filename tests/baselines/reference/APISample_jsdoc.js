//// [tests/cases/compiler/APISample_jsdoc.ts] ////

//// [package.json]
{
    "name": "typescript",
    "types": "/.ts/typescript.d.ts"
}

//// [APISample_jsdoc.ts]
/*
 * Note: This test is a public API sample. The original sources can be found
 *       at: https://github.com/YousefED/typescript-json-schema
 *           https://github.com/vega/ts-json-schema-generator
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */

declare var console: any;

import * as ts from "typescript";

// excerpted from https://github.com/YousefED/typescript-json-schema
// (converted from a method and modified; for example, `this: any` to compensate, among other changes)
function parseCommentsIntoDefinition(this: any,
                                     symbol: ts.Symbol,
                                     definition: {description?: string, [s: string]: string | undefined},
                                     otherAnnotations: { [s: string]: true}): void {
    if (!symbol) {
        return;
    }

    // the comments for a symbol
    let comments = symbol.getDocumentationComment(undefined);

    if (comments.length) {
        definition.description = comments.map(comment => comment.kind === "lineBreak" ? comment.text : comment.text.trim().replace(/\r\n/g, "\n")).join("");
    }

    // jsdocs are separate from comments
    const jsdocs = symbol.getJsDocTags(this.checker);
    jsdocs.forEach(doc => {
        // if we have @TJS-... annotations, we have to parse them
        const { name, text } = doc;
        if (this.userValidationKeywords[name]) {
            definition[name] = this.parseValue(text);
        } else {
            // special annotations
            otherAnnotations[doc.name] = true;
        }
    });
}


// excerpted from https://github.com/vega/ts-json-schema-generator
export interface Annotations {
    [name: string]: any;
}
function getAnnotations(this: any, node: ts.Node): Annotations | undefined {
    const symbol: ts.Symbol = (node as any).symbol;
    if (!symbol) {
        return undefined;
    }

    const jsDocTags: ts.JSDocTagInfo[] = symbol.getJsDocTags(this.checker);
    if (!jsDocTags || !jsDocTags.length) {
        return undefined;
    }

    const annotations: Annotations = jsDocTags.reduce((result: Annotations, jsDocTag: ts.JSDocTagInfo) => {
        const value = this.parseJsDocTag(jsDocTag);
        if (value !== undefined) {
            result[jsDocTag.name] = value;
        }

        return result;
    }, {});
    return Object.keys(annotations).length ? annotations : undefined;
}

// these examples are artificial and mostly nonsensical
function parseSpecificTags(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.Parameter) {
        return ts.getJSDocParameterTags(node as ts.ParameterDeclaration);
    }
    if (node.kind === ts.SyntaxKind.FunctionDeclaration) {
        const func = node as ts.FunctionDeclaration;
        if (ts.hasJSDocParameterTags(func)) {
            const flat: ts.JSDocTag[] = [];
            for (const tags of func.parameters.map(ts.getJSDocParameterTags)) {
                if (tags) flat.push(...tags);
            }
            return flat;
        }
    }
}

function getReturnTypeFromJSDoc(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.FunctionDeclaration) {
        return ts.getJSDocReturnType(node);
    }
    let type = ts.getJSDocType(node);
    if (type && type.kind === ts.SyntaxKind.FunctionType) {
        return (type as ts.FunctionTypeNode).type;
    }
}

function getAllTags(node: ts.Node) {
    ts.getJSDocTags(node);
}

function getSomeOtherTags(node: ts.Node) {
    const tags: (ts.JSDocTag | undefined)[] = [];
    tags.push(ts.getJSDocAugmentsTag(node));
    tags.push(ts.getJSDocClassTag(node));
    tags.push(ts.getJSDocReturnTag(node));
    const type = ts.getJSDocTypeTag(node);
    if (type) {
        tags.push(type);
    }
    tags.push(ts.getJSDocTemplateTag(node));
    return tags;
}


//// [APISample_jsdoc.js]
"use strict";
/*
 * Note: This test is a public API sample. The original sources can be found
 *       at: https://github.com/YousefED/typescript-json-schema
 *           https://github.com/vega/ts-json-schema-generator
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
// excerpted from https://github.com/YousefED/typescript-json-schema
// (converted from a method and modified; for example, `this: any` to compensate, among other changes)
function parseCommentsIntoDefinition(symbol, definition, otherAnnotations) {
    var _this = this;
    if (!symbol) {
        return;
    }
    // the comments for a symbol
    var comments = symbol.getDocumentationComment(undefined);
    if (comments.length) {
        definition.description = comments.map(function (comment) { return comment.kind === "lineBreak" ? comment.text : comment.text.trim().replace(/\r\n/g, "\n"); }).join("");
    }
    // jsdocs are separate from comments
    var jsdocs = symbol.getJsDocTags(this.checker);
    jsdocs.forEach(function (doc) {
        // if we have @TJS-... annotations, we have to parse them
        var name = doc.name, text = doc.text;
        if (_this.userValidationKeywords[name]) {
            definition[name] = _this.parseValue(text);
        }
        else {
            // special annotations
            otherAnnotations[doc.name] = true;
        }
    });
}
function getAnnotations(node) {
    var _this = this;
    var symbol = node.symbol;
    if (!symbol) {
        return undefined;
    }
    var jsDocTags = symbol.getJsDocTags(this.checker);
    if (!jsDocTags || !jsDocTags.length) {
        return undefined;
    }
    var annotations = jsDocTags.reduce(function (result, jsDocTag) {
        var value = _this.parseJsDocTag(jsDocTag);
        if (value !== undefined) {
            result[jsDocTag.name] = value;
        }
        return result;
    }, {});
    return Object.keys(annotations).length ? annotations : undefined;
}
// these examples are artificial and mostly nonsensical
function parseSpecificTags(node) {
    if (node.kind === ts.SyntaxKind.Parameter) {
        return ts.getJSDocParameterTags(node);
    }
    if (node.kind === ts.SyntaxKind.FunctionDeclaration) {
        var func = node;
        if (ts.hasJSDocParameterTags(func)) {
            var flat = [];
            for (var _i = 0, _a = func.parameters.map(ts.getJSDocParameterTags); _i < _a.length; _i++) {
                var tags = _a[_i];
                if (tags)
                    flat.push.apply(flat, tags);
            }
            return flat;
        }
    }
}
function getReturnTypeFromJSDoc(node) {
    if (node.kind === ts.SyntaxKind.FunctionDeclaration) {
        return ts.getJSDocReturnType(node);
    }
    var type = ts.getJSDocType(node);
    if (type && type.kind === ts.SyntaxKind.FunctionType) {
        return type.type;
    }
}
function getAllTags(node) {
    ts.getJSDocTags(node);
}
function getSomeOtherTags(node) {
    var tags = [];
    tags.push(ts.getJSDocAugmentsTag(node));
    tags.push(ts.getJSDocClassTag(node));
    tags.push(ts.getJSDocReturnTag(node));
    var type = ts.getJSDocTypeTag(node);
    if (type) {
        tags.push(type);
    }
    tags.push(ts.getJSDocTemplateTag(node));
    return tags;
}
