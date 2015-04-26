/// <reference path="..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\src\compiler\parser.ts" />
/// <reference path="..\..\..\src\harness\harness.ts" />

module ts {
    describe("JSDocParsing", () => {
        //function nodeToJSON(file: ts.Node): string {
        //    return JSON.stringify(Utils.serializeNode(file), (k, v) => {
        //        return isNodeOrArray(v) ? Utils.serializeNode(v) : v;
        //    }, "    ");
        //}

        //function isNodeOrArray(a: any): boolean {
        //    return a !== undefined && typeof a.pos === "number";
        //}

        describe("TypeExpressions", () => {
            function parsesCorrectly(content: string, expected: string) {
                let typeAndDiagnostics = ts.parseJSDocTypeExpression(content);
                assert.isTrue(typeAndDiagnostics && typeAndDiagnostics.diagnostics.length === 0);

                let result = Utils.sourceFileToJSON(typeAndDiagnostics.jsDocTypeExpression.type);
                assert.equal(result, expected);
            }

            function parsesIncorrectly(content: string) {
                let type = ts.parseJSDocTypeExpression(content);
                assert.isTrue(!type || type.diagnostics.length > 0);
            }

            describe("parseCorrectly", () => {
                it("unknownType", () => {
                    parsesCorrectly("{?}",
                        `{
    "kind": "JSDocUnknownType",
    "pos": 1,
    "end": 2
}`);
                });

                it("allType", () => {
                    parsesCorrectly("{*}",
                        `{
    "kind": "JSDocAllType",
    "pos": 1,
    "end": 2
}`);
                });

                it("nullableType", () => {
                    parsesCorrectly("{?number}",
                        `{
    "kind": "JSDocNullableType",
    "pos": 1,
    "end": 8,
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 2,
        "end": 8,
        "name": {
            "kind": "Identifier",
            "pos": 2,
            "end": 8,
            "originalKeywordKind": "NumberKeyword",
            "text": "number"
        }
    }
}`)
                });

                it("nullableType2", () => {
                    parsesCorrectly("{number?}",
                        `{
    "kind": "JSDocNullableType",
    "pos": 1,
    "end": 8,
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 1,
        "end": 7,
        "name": {
            "kind": "Identifier",
            "pos": 1,
            "end": 7,
            "originalKeywordKind": "NumberKeyword",
            "text": "number"
        }
    }
}`)
                });

                it("nonNullableType", () => {
                    parsesCorrectly("{!number}",
                        `{
    "kind": "JSDocNonNullableType",
    "pos": 1,
    "end": 8,
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 2,
        "end": 8,
        "name": {
            "kind": "Identifier",
            "pos": 2,
            "end": 8,
            "originalKeywordKind": "NumberKeyword",
            "text": "number"
        }
    }
}`)
                });

                it("nonNullableType2", () => {
                    parsesCorrectly("{number!}",
                        `{
    "kind": "JSDocNonNullableType",
    "pos": 1,
    "end": 8,
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 1,
        "end": 7,
        "name": {
            "kind": "Identifier",
            "pos": 1,
            "end": 7,
            "originalKeywordKind": "NumberKeyword",
            "text": "number"
        }
    }
}`)
                });

                it("recordType1", () => {
                    parsesCorrectly("{{}}",
                        `{
    "kind": "JSDocRecordType",
    "pos": 1,
    "end": 3,
    "members": {
        "length": 0,
        "pos": 2,
        "end": 2
    }
}`)
                });

                it("recordType2", () => {
                    parsesCorrectly("{{foo}}",
                        `{
    "kind": "JSDocRecordType",
    "pos": 1,
    "end": 6,
    "members": {
        "0": {
            "kind": "JSDocRecordMember",
            "pos": 2,
            "end": 5,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5,
                "text": "foo"
            }
        },
        "length": 1,
        "pos": 2,
        "end": 5
    }
}`)
                });

                it("recordType3", () => {
                    parsesCorrectly("{{foo: number}}",
                        `{
    "kind": "JSDocRecordType",
    "pos": 1,
    "end": 14,
    "members": {
        "0": {
            "kind": "JSDocRecordMember",
            "pos": 2,
            "end": 13,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5,
                "text": "foo"
            },
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 6,
                "end": 13,
                "name": {
                    "kind": "Identifier",
                    "pos": 6,
                    "end": 13,
                    "originalKeywordKind": "NumberKeyword",
                    "text": "number"
                }
            }
        },
        "length": 1,
        "pos": 2,
        "end": 13
    }
}`)
                });

                it("recordType4", () => {
                    parsesCorrectly("{{foo, bar}}",
                        `{
    "kind": "JSDocRecordType",
    "pos": 1,
    "end": 11,
    "members": {
        "0": {
            "kind": "JSDocRecordMember",
            "pos": 2,
            "end": 5,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5,
                "text": "foo"
            }
        },
        "1": {
            "kind": "JSDocRecordMember",
            "pos": 6,
            "end": 10,
            "name": {
                "kind": "Identifier",
                "pos": 6,
                "end": 10,
                "text": "bar"
            }
        },
        "length": 2,
        "pos": 2,
        "end": 10
    }
}`)
                });

                it("recordType5", () => {
                    parsesCorrectly("{{foo: number, bar}}",
                        `{
    "kind": "JSDocRecordType",
    "pos": 1,
    "end": 19,
    "members": {
        "0": {
            "kind": "JSDocRecordMember",
            "pos": 2,
            "end": 13,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5,
                "text": "foo"
            },
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 6,
                "end": 13,
                "name": {
                    "kind": "Identifier",
                    "pos": 6,
                    "end": 13,
                    "originalKeywordKind": "NumberKeyword",
                    "text": "number"
                }
            }
        },
        "1": {
            "kind": "JSDocRecordMember",
            "pos": 14,
            "end": 18,
            "name": {
                "kind": "Identifier",
                "pos": 14,
                "end": 18,
                "text": "bar"
            }
        },
        "length": 2,
        "pos": 2,
        "end": 18
    }
}`)
                });

                it("recordType6", () => {
                    parsesCorrectly("{{foo, bar: number}}",
                        `{
    "kind": "JSDocRecordType",
    "pos": 1,
    "end": 19,
    "members": {
        "0": {
            "kind": "JSDocRecordMember",
            "pos": 2,
            "end": 5,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5,
                "text": "foo"
            }
        },
        "1": {
            "kind": "JSDocRecordMember",
            "pos": 6,
            "end": 18,
            "name": {
                "kind": "Identifier",
                "pos": 6,
                "end": 10,
                "text": "bar"
            },
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 11,
                "end": 18,
                "name": {
                    "kind": "Identifier",
                    "pos": 11,
                    "end": 18,
                    "originalKeywordKind": "NumberKeyword",
                    "text": "number"
                }
            }
        },
        "length": 2,
        "pos": 2,
        "end": 18
    }
}`)
                });

                it("recordType7", () => {
                    parsesCorrectly("{{foo: number, bar: number}}",
                        `{
    "kind": "JSDocRecordType",
    "pos": 1,
    "end": 27,
    "members": {
        "0": {
            "kind": "JSDocRecordMember",
            "pos": 2,
            "end": 13,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5,
                "text": "foo"
            },
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 6,
                "end": 13,
                "name": {
                    "kind": "Identifier",
                    "pos": 6,
                    "end": 13,
                    "originalKeywordKind": "NumberKeyword",
                    "text": "number"
                }
            }
        },
        "1": {
            "kind": "JSDocRecordMember",
            "pos": 14,
            "end": 26,
            "name": {
                "kind": "Identifier",
                "pos": 14,
                "end": 18,
                "text": "bar"
            },
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 19,
                "end": 26,
                "name": {
                    "kind": "Identifier",
                    "pos": 19,
                    "end": 26,
                    "originalKeywordKind": "NumberKeyword",
                    "text": "number"
                }
            }
        },
        "length": 2,
        "pos": 2,
        "end": 26
    }
}`)
                });

                it("recordType8", () => {
                    parsesCorrectly("{{function}}",
                        `{
    "kind": "JSDocRecordType",
    "pos": 1,
    "end": 11,
    "members": {
        "0": {
            "kind": "JSDocRecordMember",
            "pos": 2,
            "end": 10,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 10,
                "originalKeywordKind": "FunctionKeyword",
                "text": "function"
            }
        },
        "length": 1,
        "pos": 2,
        "end": 10
    }
}`)
                });

                it("unionType", () => {
                    parsesCorrectly("{(number|string)}",
                        `{
    "kind": "JSDocUnionType",
    "pos": 1,
    "end": 16,
    "types": {
        "0": {
            "kind": "JSDocTypeReference",
            "pos": 2,
            "end": 8,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 8,
                "originalKeywordKind": "NumberKeyword",
                "text": "number"
            }
        },
        "1": {
            "kind": "JSDocTypeReference",
            "pos": 9,
            "end": 15,
            "name": {
                "kind": "Identifier",
                "pos": 9,
                "end": 15,
                "originalKeywordKind": "StringKeyword",
                "text": "string"
            }
        },
        "length": 2,
        "pos": 2,
        "end": 15
    }
}`);
                });

                it("topLevelNoParenUnionType", () => {
                    parsesCorrectly("{number|string}",
                        `{
    "kind": "JSDocUnionType",
    "pos": 1,
    "end": 14,
    "types": {
        "0": {
            "kind": "JSDocTypeReference",
            "pos": 1,
            "end": 7,
            "name": {
                "kind": "Identifier",
                "pos": 1,
                "end": 7,
                "originalKeywordKind": "NumberKeyword",
                "text": "number"
            }
        },
        "1": {
            "kind": "JSDocTypeReference",
            "pos": 8,
            "end": 14,
            "name": {
                "kind": "Identifier",
                "pos": 8,
                "end": 14,
                "originalKeywordKind": "StringKeyword",
                "text": "string"
            }
        },
        "length": 2,
        "pos": 1,
        "end": 14
    }
}`);
                });

                it("functionType1", () => {
                    parsesCorrectly("{function()}",
                        `{
    "kind": "JSDocFunctionType",
    "pos": 1,
    "end": 11,
    "parameters": {
        "length": 0,
        "pos": 10,
        "end": 10
    }
}`);
                });

                it("functionType2", () => {
                    parsesCorrectly("{function(string, boolean)}",
                        `{
    "kind": "JSDocFunctionType",
    "pos": 1,
    "end": 26,
    "parameters": {
        "0": {
            "kind": "Parameter",
            "pos": 10,
            "end": 16,
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 10,
                "end": 16,
                "name": {
                    "kind": "Identifier",
                    "pos": 10,
                    "end": 16,
                    "originalKeywordKind": "StringKeyword",
                    "text": "string"
                }
            }
        },
        "1": {
            "kind": "Parameter",
            "pos": 17,
            "end": 25,
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 17,
                "end": 25,
                "name": {
                    "kind": "Identifier",
                    "pos": 17,
                    "end": 25,
                    "originalKeywordKind": "BooleanKeyword",
                    "text": "boolean"
                }
            }
        },
        "length": 2,
        "pos": 10,
        "end": 25
    }
}`);
                });

                it("functionReturnType1", () => {
                    parsesCorrectly("{function(string, boolean)}",
                        `{
    "kind": "JSDocFunctionType",
    "pos": 1,
    "end": 26,
    "parameters": {
        "0": {
            "kind": "Parameter",
            "pos": 10,
            "end": 16,
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 10,
                "end": 16,
                "name": {
                    "kind": "Identifier",
                    "pos": 10,
                    "end": 16,
                    "originalKeywordKind": "StringKeyword",
                    "text": "string"
                }
            }
        },
        "1": {
            "kind": "Parameter",
            "pos": 17,
            "end": 25,
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 17,
                "end": 25,
                "name": {
                    "kind": "Identifier",
                    "pos": 17,
                    "end": 25,
                    "originalKeywordKind": "BooleanKeyword",
                    "text": "boolean"
                }
            }
        },
        "length": 2,
        "pos": 10,
        "end": 25
    }
}`);
                });

                it("thisType1", () => {
                    parsesCorrectly("{this:a.b}",
                        `{
    "kind": "JSDocThisType",
    "pos": 1,
    "end": 9,
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 6,
        "end": 9,
        "name": {
            "kind": "FirstNode",
            "pos": 6,
            "end": 9,
            "left": {
                "kind": "Identifier",
                "pos": 6,
                "end": 7,
                "text": "a"
            },
            "right": {
                "kind": "Identifier",
                "pos": 8,
                "end": 9,
                "text": "b"
            }
        }
    }
}`);
                });

                it("newType1", () => {
                    parsesCorrectly("{new:a.b}",
                        `{
    "kind": "JSDocConstructorType",
    "pos": 1,
    "end": 8,
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 5,
        "end": 8,
        "name": {
            "kind": "FirstNode",
            "pos": 5,
            "end": 8,
            "left": {
                "kind": "Identifier",
                "pos": 5,
                "end": 6,
                "text": "a"
            },
            "right": {
                "kind": "Identifier",
                "pos": 7,
                "end": 8,
                "text": "b"
            }
        }
    }
}`);
                });

                it("variadicType", () => {
                    parsesCorrectly("{...number}",
                        `{
    "kind": "JSDocVariadicType",
    "pos": 1,
    "end": 10,
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 4,
        "end": 10,
        "name": {
            "kind": "Identifier",
            "pos": 4,
            "end": 10,
            "originalKeywordKind": "NumberKeyword",
            "text": "number"
        }
    }
}`);
                });

                it("optionalType", () => {
                    parsesCorrectly("{number=}",
                        `{
    "kind": "JSDocOptionalType",
    "pos": 1,
    "end": 8,
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 1,
        "end": 7,
        "name": {
            "kind": "Identifier",
            "pos": 1,
            "end": 7,
            "originalKeywordKind": "NumberKeyword",
            "text": "number"
        }
    }
}`);
                });

                it("optionalNullable", () => {
                    parsesCorrectly("{?=}",
                        `{
    "kind": "JSDocOptionalType",
    "pos": 1,
    "end": 3,
    "type": {
        "kind": "JSDocUnknownType",
        "pos": 1,
        "end": 2
    }
}`);
                });

                it("typeReference1", () => {
                    parsesCorrectly("{a.<number>}",
                        `{
    "kind": "JSDocTypeReference",
    "pos": 1,
    "end": 11,
    "name": {
        "kind": "Identifier",
        "pos": 1,
        "end": 2,
        "text": "a"
    },
    "typeArguments": {
        "0": {
            "kind": "JSDocTypeReference",
            "pos": 4,
            "end": 10,
            "name": {
                "kind": "Identifier",
                "pos": 4,
                "end": 10,
                "originalKeywordKind": "NumberKeyword",
                "text": "number"
            }
        },
        "length": 1,
        "pos": 4,
        "end": 10
    }
}`);
                });

                it("typeReference2", () => {
                    parsesCorrectly("{a.<number,string>}",
                        `{
    "kind": "JSDocTypeReference",
    "pos": 1,
    "end": 18,
    "name": {
        "kind": "Identifier",
        "pos": 1,
        "end": 2,
        "text": "a"
    },
    "typeArguments": {
        "0": {
            "kind": "JSDocTypeReference",
            "pos": 4,
            "end": 10,
            "name": {
                "kind": "Identifier",
                "pos": 4,
                "end": 10,
                "originalKeywordKind": "NumberKeyword",
                "text": "number"
            }
        },
        "1": {
            "kind": "JSDocTypeReference",
            "pos": 11,
            "end": 17,
            "name": {
                "kind": "Identifier",
                "pos": 11,
                "end": 17,
                "originalKeywordKind": "StringKeyword",
                "text": "string"
            }
        },
        "length": 2,
        "pos": 4,
        "end": 17
    }
}`);
                });

                it("typeReference3", () => {
                    parsesCorrectly("{a.function}",
                        `{
    "kind": "JSDocTypeReference",
    "pos": 1,
    "end": 11,
    "name": {
        "kind": "FirstNode",
        "pos": 1,
        "end": 11,
        "left": {
            "kind": "Identifier",
            "pos": 1,
            "end": 2,
            "text": "a"
        },
        "right": {
            "kind": "Identifier",
            "pos": 3,
            "end": 11,
            "originalKeywordKind": "FunctionKeyword",
            "text": "function"
        }
    }
}`);
                });

                it("arrayType1", () => {
                    parsesCorrectly(
                        "{a[]}",
                        `{
    "kind": "JSDocArrayType",
    "pos": 1,
    "end": 4,
    "elementType": {
        "kind": "JSDocTypeReference",
        "pos": 1,
        "end": 2,
        "name": {
            "kind": "Identifier",
            "pos": 1,
            "end": 2,
            "text": "a"
        }
    }
}`);
                });

                it("arrayType2", () => {
                    parsesCorrectly(
                        "{a[][]}",
                        `{
    "kind": "JSDocArrayType",
    "pos": 1,
    "end": 6,
    "elementType": {
        "kind": "JSDocArrayType",
        "pos": 1,
        "end": 4,
        "elementType": {
            "kind": "JSDocTypeReference",
            "pos": 1,
            "end": 2,
            "name": {
                "kind": "Identifier",
                "pos": 1,
                "end": 2,
                "text": "a"
            }
        }
    }
}`);
                });

                it("arrayType3", () => {
                    parsesCorrectly(
                        "{a[][]=}",
                        `{
    "kind": "JSDocOptionalType",
    "pos": 1,
    "end": 7,
    "type": {
        "kind": "JSDocArrayType",
        "pos": 1,
        "end": 6,
        "elementType": {
            "kind": "JSDocArrayType",
            "pos": 1,
            "end": 4,
            "elementType": {
                "kind": "JSDocTypeReference",
                "pos": 1,
                "end": 2,
                "name": {
                    "kind": "Identifier",
                    "pos": 1,
                    "end": 2,
                    "text": "a"
                }
            }
        }
    }
}`);
                });

                it("keyword1", () => {
                    parsesCorrectly(
                        "{var}",
                        `{
    "kind": "JSDocTypeReference",
    "pos": 1,
    "end": 4,
    "name": {
        "kind": "Identifier",
        "pos": 1,
        "end": 4,
        "originalKeywordKind": "VarKeyword",
        "text": "var"
    }
}`);
                });

                it("keyword2", () => {
                    parsesCorrectly(
                        "{null}",
                        `{
    "kind": "JSDocTypeReference",
    "pos": 1,
    "end": 5,
    "name": {
        "kind": "Identifier",
        "pos": 1,
        "end": 5,
        "originalKeywordKind": "NullKeyword",
        "text": "null"
    }
}`);
                });

                it("keyword3", () => {
                    parsesCorrectly(
                        "{undefined}",
                        `{
    "kind": "JSDocTypeReference",
    "pos": 1,
    "end": 10,
    "name": {
        "kind": "Identifier",
        "pos": 1,
        "end": 10,
        "text": "undefined"
    }
}`);
                });

                it("tupleType0", () => {
                    parsesCorrectly(
                        "{[]}",
                        `{
    "kind": "JSDocTupleType",
    "pos": 1,
    "end": 3,
    "types": {
        "length": 0,
        "pos": 2,
        "end": 2
    }
}`);
                });

                it("tupleType1", () => {
                    parsesCorrectly(
                        "{[number]}",
                        `{
    "kind": "JSDocTupleType",
    "pos": 1,
    "end": 9,
    "types": {
        "0": {
            "kind": "JSDocTypeReference",
            "pos": 2,
            "end": 8,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 8,
                "originalKeywordKind": "NumberKeyword",
                "text": "number"
            }
        },
        "length": 1,
        "pos": 2,
        "end": 8
    }
}`);
                });

                it("tupleType2", () => {
                    parsesCorrectly(
                        "{[number,string]}",
                        `{
    "kind": "JSDocTupleType",
    "pos": 1,
    "end": 16,
    "types": {
        "0": {
            "kind": "JSDocTypeReference",
            "pos": 2,
            "end": 8,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 8,
                "originalKeywordKind": "NumberKeyword",
                "text": "number"
            }
        },
        "1": {
            "kind": "JSDocTypeReference",
            "pos": 9,
            "end": 15,
            "name": {
                "kind": "Identifier",
                "pos": 9,
                "end": 15,
                "originalKeywordKind": "StringKeyword",
                "text": "string"
            }
        },
        "length": 2,
        "pos": 2,
        "end": 15
    }
}`);
                });

                it("tupleType3", () => {
                    parsesCorrectly(
                        "{[number,string,boolean]}",
                        `{
    "kind": "JSDocTupleType",
    "pos": 1,
    "end": 24,
    "types": {
        "0": {
            "kind": "JSDocTypeReference",
            "pos": 2,
            "end": 8,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 8,
                "originalKeywordKind": "NumberKeyword",
                "text": "number"
            }
        },
        "1": {
            "kind": "JSDocTypeReference",
            "pos": 9,
            "end": 15,
            "name": {
                "kind": "Identifier",
                "pos": 9,
                "end": 15,
                "originalKeywordKind": "StringKeyword",
                "text": "string"
            }
        },
        "2": {
            "kind": "JSDocTypeReference",
            "pos": 16,
            "end": 23,
            "name": {
                "kind": "Identifier",
                "pos": 16,
                "end": 23,
                "originalKeywordKind": "BooleanKeyword",
                "text": "boolean"
            }
        },
        "length": 3,
        "pos": 2,
        "end": 23
    }
}`);
                });
            });

            describe("parsesIncorrectly", () => {
                it("emptyType", () => {
                    parsesIncorrectly("{}");
                });

                it("trailingCommaInRecordType", () => {
                    parsesIncorrectly("{{a,}}");
                });

                it("unionTypeWithTrailingBar", () => {
                    parsesIncorrectly("{(a|)}");
                });

                it("unionTypeWithoutTypes", () => {
                    parsesIncorrectly("{()}");
                });

                it("nullableTypeWithoutType", () => {
                    parsesIncorrectly("{!}");
                });

                it("functionTypeWithTrailingComma", () => {
                    parsesIncorrectly("{function(a,)}");
                });

                it("thisWithoutType", () => {
                    parsesIncorrectly("{this:}");
                });

                it("newWithoutType", () => {
                    parsesIncorrectly("{new:}");
                });

                it("variadicWithoutType", () => {
                    parsesIncorrectly("{...}");
                });

                it("optionalWithoutType", () => {
                    parsesIncorrectly("{=}");
                });

                it("allWithType", () => {
                    parsesIncorrectly("{*foo}");
                });

                it("typeArgumentsNotFollowingDot", () => {
                    parsesIncorrectly("{a<>}");
                });

                it("emptyTypeArguments", () => {
                    parsesIncorrectly("{a.<>}");
                });

                it("typeArgumentsWithTrailingComma", () => {
                    parsesIncorrectly("{a.<a,>}");
                });

                it("tsFunctionType", () => {
                    parsesIncorrectly("{() => string}");
                });

                it("tsConstructoType", () => {
                    parsesIncorrectly("{new () => string}");
                });

                it("typeOfType", () => {
                    parsesIncorrectly("{typeof M}");
                });

                it("namedParameter", () => {
                    parsesIncorrectly("{function(a: number)}");
                });

                it("callSignatureInRecordType", () => {
                    parsesIncorrectly("{{(): number}}");
                });

                it("methodInRecordType", () => {
                    parsesIncorrectly("{{foo(): number}}");
                });

                it("tupleTypeWithComma", () => {
                    parsesIncorrectly( "{[,]}");
                });

                it("tupleTypeWithTrailingComma", () => {
                    parsesIncorrectly("{[number,]}");
                });

                it("tupleTypeWithLeadingComma", () => {
                    parsesIncorrectly("{[,number]}");
                });
            });
        });

        describe("DocComments", () => {
            function parsesCorrectly(content: string, expected: string) {
                let comment = ts.parseJSDocCommentInfo(content);
                Debug.assert(comment && comment.diagnostics.length === 0);

                let result = JSON.stringify(comment.jsDocComment, (k, v) => {
                    return v && v.pos !== undefined
                        ? JSON.parse(Utils.sourceFileToJSON(v))
                        : v;
                }, "    ");
                assert.equal(result, expected);
            }

            function parsesIncorrectly(content: string) {
                let type = ts.parseJSDocCommentInfo(content);
                assert.isTrue(!type || type.diagnostics.length > 0);
            }

            describe("parsesIncorrectly", () => {
                it("emptyComment", () => {
                    parsesIncorrectly("/***/");
                });

                it("threeAsterisks", () => {
                    parsesIncorrectly("/*** */");
                });

                it("asteriskAfterPreamble", () => {
                    parsesIncorrectly("/** * @type {number} */");
                });

                it("noType", () => {
                    parsesIncorrectly(
`/**
  * @type
  */`);
                });

                it("multipleTypes", () => {
                    parsesIncorrectly(
`/**
  * @type {number} 
  * @type {string}
  */`);
                });

                it("multipleReturnTypes", () => {
                    parsesIncorrectly(
`/**
  * @return {number}
  * @return {string}
  */`);
                });

                it("noReturnType", () => {
                    parsesIncorrectly(
`/**
  * @return
  */`);
                });

                it("noTypeParameters", () => {
                    parsesIncorrectly(
`/**
  * @template
  */`);
                });

                it("trailingTypeParameterComma", () => {
                    parsesIncorrectly(
`/**
  * @template T,
  */`);
                });

                it("paramWithoutName", () => {
                    parsesIncorrectly(
`/**
  * @param {number}
  */`);
                });

                it("paramWithoutType", () => {
                    parsesIncorrectly(
`/**
  * @param foo
  */`);
                });

                it("paramWithoutTypeOrName", () => {
                    parsesIncorrectly(
`/**
  * @param 
  */`);
                });
            });

            describe("parsesCorrectly", () => {
                it("noLeadingAsterisk", () => {
                    parsesCorrectly(
`/**
    @type {number}
  */`,
                        `{
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 15,
        "end": 21,
        "name": {
            "kind": "Identifier",
            "pos": 15,
            "end": 21,
            "originalKeywordKind": "NumberKeyword",
            "text": "number"
        }
    }
}`);
                });

                it("leadingAsterisk", () => {
                    parsesCorrectly(
`/**
  * @type {number}
  */`,
                        `{
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 15,
        "end": 21,
        "name": {
            "kind": "Identifier",
            "pos": 15,
            "end": 21,
            "originalKeywordKind": "NumberKeyword",
            "text": "number"
        }
    }
}`);
                });

                it("typeTag", () => {
                    parsesCorrectly(
`/**
  * @type {number}
  */`,
                        `{
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 15,
        "end": 21,
        "name": {
            "kind": "Identifier",
            "pos": 15,
            "end": 21,
            "originalKeywordKind": "NumberKeyword",
            "text": "number"
        }
    }
}`);
                });

                it("returnTag1", () => {
                    parsesCorrectly(
`/**
  * @return {number}
  */`,
                        `{
    "returnType": {
        "kind": "JSDocTypeReference",
        "pos": 17,
        "end": 23,
        "name": {
            "kind": "Identifier",
            "pos": 17,
            "end": 23,
            "originalKeywordKind": "NumberKeyword",
            "text": "number"
        }
    }
}`);
                });

                it("returnTag2", () => {
                    parsesCorrectly(
                        `/**
  * @return {number} Description text follows
  */`,
                        `{
    "returnType": {
        "kind": "JSDocTypeReference",
        "pos": 17,
        "end": 23,
        "name": {
            "kind": "Identifier",
            "pos": 17,
            "end": 23,
            "originalKeywordKind": "NumberKeyword",
            "text": "number"
        }
    }
}`);
                });

                it("returnsTag1", () => {
                    parsesCorrectly(
                        `/**
  * @returns {number}
  */`,
                        `{
    "returnType": {
        "kind": "JSDocTypeReference",
        "pos": 18,
        "end": 24,
        "name": {
            "kind": "Identifier",
            "pos": 18,
            "end": 24,
            "originalKeywordKind": "NumberKeyword",
            "text": "number"
        }
    }
}`);
                });

                it("oneParamTag", () => {
                    parsesCorrectly(
`/**
  * @param {number} name1
  */`,
                        `{
    "parameters": [
        {
            "name": "name1",
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 16,
                "end": 22,
                "name": {
                    "kind": "Identifier",
                    "pos": 16,
                    "end": 22,
                    "originalKeywordKind": "NumberKeyword",
                    "text": "number"
                }
            }
        }
    ]
}`);
                });

                it("twoParamTag2", () => {
                    parsesCorrectly(
`/**
  * @param {number} name1
  * @param {number} name2
  */`,
                        `{
    "parameters": [
        {
            "name": "name1",
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 16,
                "end": 22,
                "name": {
                    "kind": "Identifier",
                    "pos": 16,
                    "end": 22,
                    "originalKeywordKind": "NumberKeyword",
                    "text": "number"
                }
            }
        },
        {
            "name": "name2",
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 42,
                "end": 48,
                "name": {
                    "kind": "Identifier",
                    "pos": 42,
                    "end": 48,
                    "originalKeywordKind": "NumberKeyword",
                    "text": "number"
                }
            }
        }
    ]
}`);
                });

                it("paramTag1", () => {
                    parsesCorrectly(
                        `/**
  * @param {number} name1 Description text follows
  */`,
                        `{
    "parameters": [
        {
            "name": "name1",
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 16,
                "end": 22,
                "name": {
                    "kind": "Identifier",
                    "pos": 16,
                    "end": 22,
                    "originalKeywordKind": "NumberKeyword",
                    "text": "number"
                }
            }
        }
    ]
}`);
                });

                it("paramTagBracketedName1", () => {
                    parsesCorrectly(
                        `/**
  * @param {number} [name1] Description text follows
  */`,
                        `{
    "parameters": [
        {
            "name": "name1",
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 16,
                "end": 22,
                "name": {
                    "kind": "Identifier",
                    "pos": 16,
                    "end": 22,
                    "originalKeywordKind": "NumberKeyword",
                    "text": "number"
                }
            },
            "isBracketed": true
        }
    ]
}`);
                });

                it("paramTagBracketedName2", () => {
                    parsesCorrectly(
                        `/**
  * @param {number} [ name1 = 1] Description text follows
  */`,
                        `{
    "parameters": [
        {
            "name": "name1",
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 16,
                "end": 22,
                "name": {
                    "kind": "Identifier",
                    "pos": 16,
                    "end": 22,
                    "originalKeywordKind": "NumberKeyword",
                    "text": "number"
                }
            },
            "isBracketed": true
        }
    ]
}`);
                });

                it("twoParamTagOnSameLine", () => {
                    parsesCorrectly(
`/**
  * @param {number} name1 @param {number} name2
  */`,
                        `{
    "parameters": [
        {
            "name": "name1",
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 16,
                "end": 22,
                "name": {
                    "kind": "Identifier",
                    "pos": 16,
                    "end": 22,
                    "originalKeywordKind": "NumberKeyword",
                    "text": "number"
                }
            }
        }
    ]
}`);
                });

                it("paramTagNameThenType1", () => {
                    parsesCorrectly(
                        `/**
  * @param name1 {number}
  */`,
                        `{
    "parameters": [
        {
            "name": "name1",
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 22,
                "end": 28,
                "name": {
                    "kind": "Identifier",
                    "pos": 22,
                    "end": 28,
                    "originalKeywordKind": "NumberKeyword",
                    "text": "number"
                }
            }
        }
    ]
}`);
                });

                it("paramTagNameThenType2", () => {
                    parsesCorrectly(
                        `/**
  * @param name1 {number} Description
  */`,
                        `{
    "parameters": [
        {
            "name": "name1",
            "type": {
                "kind": "JSDocTypeReference",
                "pos": 22,
                "end": 28,
                "name": {
                    "kind": "Identifier",
                    "pos": 22,
                    "end": 28,
                    "originalKeywordKind": "NumberKeyword",
                    "text": "number"
                }
            }
        }
    ]
}`);
                });

                it("templateTag", () => {
                    parsesCorrectly(
`/**
  * @template T
  */`,
                        `{
    "typeParameters": {
        "0": {
            "kind": "TypeParameter",
            "pos": 18,
            "end": 19,
            "name": {
                "kind": "Identifier",
                "pos": 18,
                "end": 19,
                "text": "T"
            }
        },
        "length": 1,
        "pos": 17,
        "end": 19
    }
}`);
                });

                it("templateTag2", () => {
                    parsesCorrectly(
                        `/**
  * @template K,V
  */`,
                        `{
    "typeParameters": {
        "0": {
            "kind": "TypeParameter",
            "pos": 18,
            "end": 19,
            "name": {
                "kind": "Identifier",
                "pos": 18,
                "end": 19,
                "text": "K"
            }
        },
        "1": {
            "kind": "TypeParameter",
            "pos": 20,
            "end": 21,
            "name": {
                "kind": "Identifier",
                "pos": 20,
                "end": 21,
                "text": "V"
            }
        },
        "length": 2,
        "pos": 17,
        "end": 21
    }
}`);
                });

                it("templateTag3", () => {
                    parsesCorrectly(
                        `/**
  * @template K ,V
  */`,
                        `{
    "typeParameters": {
        "0": {
            "kind": "TypeParameter",
            "pos": 18,
            "end": 19,
            "name": {
                "kind": "Identifier",
                "pos": 18,
                "end": 19,
                "text": "K"
            }
        },
        "1": {
            "kind": "TypeParameter",
            "pos": 21,
            "end": 22,
            "name": {
                "kind": "Identifier",
                "pos": 21,
                "end": 22,
                "text": "V"
            }
        },
        "length": 2,
        "pos": 17,
        "end": 22
    }
}`);
                });

                it("templateTag4", () => {
                    parsesCorrectly(
                        `/**
  * @template K, V
  */`,
                        `{
    "typeParameters": {
        "0": {
            "kind": "TypeParameter",
            "pos": 18,
            "end": 19,
            "name": {
                "kind": "Identifier",
                "pos": 18,
                "end": 19,
                "text": "K"
            }
        },
        "1": {
            "kind": "TypeParameter",
            "pos": 21,
            "end": 22,
            "name": {
                "kind": "Identifier",
                "pos": 21,
                "end": 22,
                "text": "V"
            }
        },
        "length": 2,
        "pos": 17,
        "end": 22
    }
}`);
                });

                it("templateTag5", () => {
                    parsesCorrectly(
                        `/**
  * @template K , V
  */`,
                        `{
    "typeParameters": {
        "0": {
            "kind": "TypeParameter",
            "pos": 18,
            "end": 19,
            "name": {
                "kind": "Identifier",
                "pos": 18,
                "end": 19,
                "text": "K"
            }
        },
        "1": {
            "kind": "TypeParameter",
            "pos": 22,
            "end": 23,
            "name": {
                "kind": "Identifier",
                "pos": 22,
                "end": 23,
                "text": "V"
            }
        },
        "length": 2,
        "pos": 17,
        "end": 23
    }
}`);
                });

                it("templateTag6", () => {
                    parsesCorrectly(
                        `/**
  * @template K , V Description of type parameters.
  */`,
                        `{
    "typeParameters": {
        "0": {
            "kind": "TypeParameter",
            "pos": 18,
            "end": 19,
            "name": {
                "kind": "Identifier",
                "pos": 18,
                "end": 19,
                "text": "K"
            }
        },
        "1": {
            "kind": "TypeParameter",
            "pos": 22,
            "end": 23,
            "name": {
                "kind": "Identifier",
                "pos": 22,
                "end": 23,
                "text": "V"
            }
        },
        "length": 2,
        "pos": 17,
        "end": 24
    }
}`);
                });
            });
        });
    });
}