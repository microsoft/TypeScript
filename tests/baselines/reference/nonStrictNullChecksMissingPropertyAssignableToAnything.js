//// [nonStrictNullChecksMissingPropertyAssignableToAnything.ts]
export interface IJSONSchema {
    id?: string;
    type?: string | string[];
    anyOf?: IJSONSchema[];
	enum?: any[];
	items?: IJSONSchema | IJSONSchema[];
    properties?: IJSONSchemaMap;
}

export interface IJSONSchemaMap {
    [name: string]: IJSONSchema;
}

export const tokenColorsSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            scope: {
                anyOf: [
                    {
                        enum: ["a", "b"]
                    },
                    {
                        type: 'string'
                    },
                    {
                        type: 'array',
                        items: {
                            enum: ["a", "b"]
                        }
                    },
                    {
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    }
                ]
            },
        }
    }
};

const schema: IJSONSchema = {
    type: 'object',
    properties: {
        tokenColors: {
            anyOf: [{
                type: 'string'
            },
                tokenColorsSchema
            ]
        }
    }
};

//// [nonStrictNullChecksMissingPropertyAssignableToAnything.js]
"use strict";
exports.__esModule = true;
exports.tokenColorsSchema = void 0;
exports.tokenColorsSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            scope: {
                anyOf: [
                    {
                        "enum": ["a", "b"]
                    },
                    {
                        type: 'string'
                    },
                    {
                        type: 'array',
                        items: {
                            "enum": ["a", "b"]
                        }
                    },
                    {
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    }
                ]
            }
        }
    }
};
var schema = {
    type: 'object',
    properties: {
        tokenColors: {
            anyOf: [{
                    type: 'string'
                },
                exports.tokenColorsSchema
            ]
        }
    }
};
