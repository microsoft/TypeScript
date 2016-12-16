/// <reference path="..\..\compiler\parser.ts" />
/// <reference path="..\harness.ts" />

namespace ts {
    describe("JSDocParsing", () => {
        describe("TypeExpressions", () => {
            function parsesCorrectly(content: string, expected: string) {
                const typeAndDiagnostics = ts.parseJSDocTypeExpressionForTests(content);
                assert.isTrue(typeAndDiagnostics && typeAndDiagnostics.diagnostics.length === 0);

                const result = Utils.sourceFileToJSON(typeAndDiagnostics.jsDocTypeExpression.type);

                assert.equal(result, expected);
            }

            function parsesIncorrectly(content: string) {
                const type = ts.parseJSDocTypeExpressionForTests(content);
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
        "kind": "NumberKeyword",
        "pos": 2,
        "end": 8
    }
}`);
                });

                it("nullableType2", () => {
                    parsesCorrectly("{number?}",
                        `{
    "kind": "JSDocNullableType",
    "pos": 1,
    "end": 8,
    "type": {
        "kind": "NumberKeyword",
        "pos": 1,
        "end": 7
    }
}`);
                });

                it("nonNullableType", () => {
                    parsesCorrectly("{!number}",
                        `{
    "kind": "JSDocNonNullableType",
    "pos": 1,
    "end": 8,
    "type": {
        "kind": "NumberKeyword",
        "pos": 2,
        "end": 8
    }
}`);
                });

                it("nonNullableType2", () => {
                    parsesCorrectly("{number!}",
                        `{
    "kind": "JSDocNonNullableType",
    "pos": 1,
    "end": 8,
    "type": {
        "kind": "NumberKeyword",
        "pos": 1,
        "end": 7
    }
}`);
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
}`);
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
}`);
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
                "kind": "NumberKeyword",
                "pos": 6,
                "end": 13
            }
        },
        "length": 1,
        "pos": 2,
        "end": 13
    }
}`);
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
}`);
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
                "kind": "NumberKeyword",
                "pos": 6,
                "end": 13
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
}`);
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
                "kind": "NumberKeyword",
                "pos": 11,
                "end": 18
            }
        },
        "length": 2,
        "pos": 2,
        "end": 18
    }
}`);
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
                "kind": "NumberKeyword",
                "pos": 6,
                "end": 13
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
                "kind": "NumberKeyword",
                "pos": 19,
                "end": 26
            }
        },
        "length": 2,
        "pos": 2,
        "end": 26
    }
}`);
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
}`);
                });

                it("unionType", () => {
                    parsesCorrectly("{(number|string)}",
                        `{
    "kind": "JSDocUnionType",
    "pos": 1,
    "end": 16,
    "types": {
        "0": {
            "kind": "NumberKeyword",
            "pos": 2,
            "end": 8
        },
        "1": {
            "kind": "StringKeyword",
            "pos": 9,
            "end": 15
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
            "kind": "NumberKeyword",
            "pos": 1,
            "end": 7
        },
        "1": {
            "kind": "StringKeyword",
            "pos": 8,
            "end": 14
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
                "kind": "StringKeyword",
                "pos": 10,
                "end": 16
            }
        },
        "1": {
            "kind": "Parameter",
            "pos": 17,
            "end": 25,
            "type": {
                "kind": "BooleanKeyword",
                "pos": 17,
                "end": 25
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
                "kind": "StringKeyword",
                "pos": 10,
                "end": 16
            }
        },
        "1": {
            "kind": "Parameter",
            "pos": 17,
            "end": 25,
            "type": {
                "kind": "BooleanKeyword",
                "pos": 17,
                "end": 25
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
        "kind": "NumberKeyword",
        "pos": 4,
        "end": 10
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
        "kind": "NumberKeyword",
        "pos": 1,
        "end": 7
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
            "kind": "NumberKeyword",
            "pos": 4,
            "end": 10
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
            "kind": "NumberKeyword",
            "pos": 4,
            "end": 10
        },
        "1": {
            "kind": "StringKeyword",
            "pos": 11,
            "end": 17
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
    "kind": "NullKeyword",
    "pos": 1,
    "end": 5
}`);
                });

                it("keyword3", () => {
                    parsesCorrectly(
                        "{undefined}",
                        `{
    "kind": "UndefinedKeyword",
    "pos": 1,
    "end": 10
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
            "kind": "NumberKeyword",
            "pos": 2,
            "end": 8
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
            "kind": "NumberKeyword",
            "pos": 2,
            "end": 8
        },
        "1": {
            "kind": "StringKeyword",
            "pos": 9,
            "end": 15
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
            "kind": "NumberKeyword",
            "pos": 2,
            "end": 8
        },
        "1": {
            "kind": "StringKeyword",
            "pos": 9,
            "end": 15
        },
        "2": {
            "kind": "BooleanKeyword",
            "pos": 16,
            "end": 23
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
            function parsesCorrectly(content: string, expected: string | {}) {
                const comment = parseIsolatedJSDocComment(content);
                if (!comment) {
                    Debug.fail("Comment failed to parse entirely");
                }
                if (comment.diagnostics.length > 0) {
                    Debug.fail("Comment has at least one diagnostic: " + comment.diagnostics[0].messageText);
                }

                const result = toJsonString(comment.jsDocComment);

                const expectedString = typeof expected === "string"
                    ? expected
                    : toJsonString(expected);
                if (result !== expectedString) {
                    // Turn on a human-readable diff
                    if (typeof require !== "undefined") {
                        const chai = require("chai");
                        chai.config.showDiff = true;
                        // Use deep equal to compare key value data instead of the two objects
                        chai.expect(JSON.parse(result)).deep.equal(JSON.parse(expectedString));
                    }
                    else {
                        assert.equal(result, expectedString);
                    }
                }
            }

            function toJsonString(obj: {}) {
                return JSON.stringify(obj, (k, v) => {
                    return v && v.pos !== undefined
                        ? JSON.parse(Utils.sourceFileToJSON(v))
                        : v;
                }, 4);
            }

            function parsesIncorrectly(content: string) {
                const type = parseIsolatedJSDocComment(content);
                assert.isTrue(!type || type.diagnostics.length > 0);
            }

            function reIndentJSDocComment(jsdocComment: string) {
                const result = jsdocComment
                    .replace(/[\t ]*\/\*\*/, "/**")
                    .replace(/[\t ]*\*\s?@/g, "  * @")
                    .replace(/[\t ]*\*\s?\//, "  */");
                return result;
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
    "kind": "JSDocComment",
    "pos": 0,
    "end": 27,
    "tags": {
        "0": {
            "kind": "JSDocTypeTag",
            "pos": 8,
            "end": 22,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 13,
                "text": "type"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "pos": 14,
                "end": 22,
                "type": {
                    "kind": "NumberKeyword",
                    "pos": 15,
                    "end": 21
                }
            }
        },
        "length": 1,
        "pos": 8,
        "end": 22
    }
}`);
                });

                it("noType", () => {
                    parsesCorrectly(
                        `/**
  * @type
  */`,
                        `{
    "kind": "JSDocComment",
    "pos": 0,
    "end": 18,
    "tags": {
        "0": {
            "kind": "JSDocTypeTag",
            "pos": 8,
            "end": 13,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 13,
                "text": "type"
            }
        },
        "length": 1,
        "pos": 8,
        "end": 13
    }
}`);
                });

                it("noReturnType", () => {
                    parsesCorrectly(
                        `/**
  * @return
  */`,
                        `{
    "kind": "JSDocComment",
    "pos": 0,
    "end": 20,
    "tags": {
        "0": {
            "kind": "JSDocReturnTag",
            "pos": 8,
            "end": 15,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 15,
                "text": "return"
            }
        },
        "length": 1,
        "pos": 8,
        "end": 15
    }
}`);
                });

                it("leadingAsterisk", () => {
                    parsesCorrectly(
`/**
  * @type {number}
  */`,
                        `{
    "kind": "JSDocComment",
    "pos": 0,
    "end": 27,
    "tags": {
        "0": {
            "kind": "JSDocTypeTag",
            "pos": 8,
            "end": 22,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 13,
                "text": "type"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "pos": 14,
                "end": 22,
                "type": {
                    "kind": "NumberKeyword",
                    "pos": 15,
                    "end": 21
                }
            }
        },
        "length": 1,
        "pos": 8,
        "end": 22
    }
}`);
                });

                it("typeTag", () => {
                    parsesCorrectly(
`/**
  * @type {number}
  */`,
                        `{
    "kind": "JSDocComment",
    "pos": 0,
    "end": 27,
    "tags": {
        "0": {
            "kind": "JSDocTypeTag",
            "pos": 8,
            "end": 22,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 13,
                "text": "type"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "pos": 14,
                "end": 22,
                "type": {
                    "kind": "NumberKeyword",
                    "pos": 15,
                    "end": 21
                }
            }
        },
        "length": 1,
        "pos": 8,
        "end": 22
    }
}`);
                });

                it("returnTag1", () => {
                    parsesCorrectly(
`/**
  * @return {number}
  */`,
                        `{
    "kind": "JSDocComment",
    "pos": 0,
    "end": 29,
    "tags": {
        "0": {
            "kind": "JSDocReturnTag",
            "pos": 8,
            "end": 24,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 15,
                "text": "return"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "pos": 16,
                "end": 24,
                "type": {
                    "kind": "NumberKeyword",
                    "pos": 17,
                    "end": 23
                }
            }
        },
        "length": 1,
        "pos": 8,
        "end": 24
    }
}`);
                });

                it("returnTag2", () => {
                    parsesCorrectly(
                        `/**
  * @return {number} Description text follows
  */`,
                        `{
    "kind": "JSDocComment",
    "pos": 0,
    "end": 54,
    "tags": {
        "0": {
            "kind": "JSDocReturnTag",
            "pos": 8,
            "end": 24,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 15,
                "text": "return"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "pos": 16,
                "end": 24,
                "type": {
                    "kind": "NumberKeyword",
                    "pos": 17,
                    "end": 23
                }
            }
        },
        "length": 1,
        "pos": 8,
        "end": 24
    }
}`);
                });

                it("returnsTag1", () => {
                    parsesCorrectly(
                        `/**
  * @returns {number}
  */`,
                        `{
    "kind": "JSDocComment",
    "pos": 0,
    "end": 30,
    "tags": {
        "0": {
            "kind": "JSDocReturnTag",
            "pos": 8,
            "end": 25,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 16,
                "text": "returns"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "pos": 17,
                "end": 25,
                "type": {
                    "kind": "NumberKeyword",
                    "pos": 18,
                    "end": 24
                }
            }
        },
        "length": 1,
        "pos": 8,
        "end": 25
    }
}`);
                });

                it("oneParamTag", () => {
                    parsesCorrectly(
`/**
  * @param {number} name1
  */`,
                        `{
    "kind": "JSDocComment",
    "pos": 0,
    "end": 34,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "pos": 8,
            "end": 29,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 14,
                "text": "param"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "pos": 15,
                "end": 23,
                "type": {
                    "kind": "NumberKeyword",
                    "pos": 16,
                    "end": 22
                }
            },
            "postParameterName": {
                "kind": "Identifier",
                "pos": 24,
                "end": 29,
                "text": "name1"
            }
        },
        "length": 1,
        "pos": 8,
        "end": 29
    }
}`);
                });

                it("twoParamTag2", () => {
                    parsesCorrectly(
`/**
  * @param {number} name1
  * @param {number} name2
  */`,
                        `{
    "kind": "JSDocComment",
    "pos": 0,
    "end": 60,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "pos": 8,
            "end": 29,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 14,
                "text": "param"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "pos": 15,
                "end": 23,
                "type": {
                    "kind": "NumberKeyword",
                    "pos": 16,
                    "end": 22
                }
            },
            "postParameterName": {
                "kind": "Identifier",
                "pos": 24,
                "end": 29,
                "text": "name1"
            }
        },
        "1": {
            "kind": "JSDocParameterTag",
            "pos": 34,
            "end": 55,
            "atToken": {
                "kind": "AtToken",
                "pos": 34,
                "end": 35
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 35,
                "end": 40,
                "text": "param"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "pos": 41,
                "end": 49,
                "type": {
                    "kind": "NumberKeyword",
                    "pos": 42,
                    "end": 48
                }
            },
            "postParameterName": {
                "kind": "Identifier",
                "pos": 50,
                "end": 55,
                "text": "name2"
            }
        },
        "length": 2,
        "pos": 8,
        "end": 55
    }
}`);
                });

                it("paramTag1", () => {
                    parsesCorrectly(
                        `/**
  * @param {number} name1 Description text follows
  */`,
                        `{
    "kind": "JSDocComment",
    "pos": 0,
    "end": 59,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "pos": 8,
            "end": 29,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 14,
                "text": "param"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "pos": 15,
                "end": 23,
                "type": {
                    "kind": "NumberKeyword",
                    "pos": 16,
                    "end": 22
                }
            },
            "postParameterName": {
                "kind": "Identifier",
                "pos": 24,
                "end": 29,
                "text": "name1"
            }
        },
        "length": 1,
        "pos": 8,
        "end": 29
    }
}`);
                });

                it("paramTagBracketedName1", () => {
                    parsesCorrectly(
                        `/**
  * @param {number} [name1] Description text follows
  */`,
                        `{
    "kind": "JSDocComment",
    "pos": 0,
    "end": 61,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "pos": 8,
            "end": 31,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 14,
                "text": "param"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "pos": 15,
                "end": 23,
                "type": {
                    "kind": "NumberKeyword",
                    "pos": 16,
                    "end": 22
                }
            },
            "postParameterName": {
                "kind": "Identifier",
                "pos": 25,
                "end": 30,
                "text": "name1"
            },
            "isBracketed": true
        },
        "length": 1,
        "pos": 8,
        "end": 31
    }
}`);
                });

                it("paramTagBracketedName2", () => {
                    parsesCorrectly(
                        `/**
  * @param {number} [ name1 = 1] Description text follows
  */`,
                        `{
    "kind": "JSDocComment",
    "pos": 0,
    "end": 66,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "pos": 8,
            "end": 36,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 14,
                "text": "param"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "pos": 15,
                "end": 23,
                "type": {
                    "kind": "NumberKeyword",
                    "pos": 16,
                    "end": 22
                }
            },
            "postParameterName": {
                "kind": "Identifier",
                "pos": 26,
                "end": 31,
                "text": "name1"
            },
            "isBracketed": true
        },
        "length": 1,
        "pos": 8,
        "end": 36
    }
}`);
                });

                it("twoParamTagOnSameLine", () => {
                    parsesCorrectly(
`/**
  * @param {number} name1 @param {number} name2
  */`,
                        `{
    "kind": "JSDocComment",
    "pos": 0,
    "end": 56,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "pos": 8,
            "end": 29,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 14,
                "text": "param"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "pos": 15,
                "end": 23,
                "type": {
                    "kind": "NumberKeyword",
                    "pos": 16,
                    "end": 22
                }
            },
            "postParameterName": {
                "kind": "Identifier",
                "pos": 24,
                "end": 29,
                "text": "name1"
            }
        },
        "length": 1,
        "pos": 8,
        "end": 29
    }
}`);
                });

                it("paramTagNameThenType1", () => {
                    parsesCorrectly(
                        `/**
  * @param name1 {number}
  */`,
                        `{
    "kind": "JSDocComment",
    "pos": 0,
    "end": 34,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "pos": 8,
            "end": 29,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 14,
                "text": "param"
            },
            "preParameterName": {
                "kind": "Identifier",
                "pos": 15,
                "end": 20,
                "text": "name1"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "pos": 21,
                "end": 29,
                "type": {
                    "kind": "NumberKeyword",
                    "pos": 22,
                    "end": 28
                }
            }
        },
        "length": 1,
        "pos": 8,
        "end": 29
    }
}`);
                });

                it("paramTagNameThenType2", () => {
                    parsesCorrectly(
                        `/**
  * @param name1 {number} Description
  */`,
                        `{
    "kind": "JSDocComment",
    "pos": 0,
    "end": 46,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "pos": 8,
            "end": 29,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 14,
                "text": "param"
            },
            "preParameterName": {
                "kind": "Identifier",
                "pos": 15,
                "end": 20,
                "text": "name1"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "pos": 21,
                "end": 29,
                "type": {
                    "kind": "NumberKeyword",
                    "pos": 22,
                    "end": 28
                }
            }
        },
        "length": 1,
        "pos": 8,
        "end": 29
    }
}`);
                });

                it("templateTag", () => {
                    parsesCorrectly(
`/**
  * @template T
  */`,
                        `{
    "kind": "JSDocComment",
    "pos": 0,
    "end": 24,
    "tags": {
        "0": {
            "kind": "JSDocTemplateTag",
            "pos": 8,
            "end": 19,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 17,
                "text": "template"
            },
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
        },
        "length": 1,
        "pos": 8,
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
    "kind": "JSDocComment",
    "pos": 0,
    "end": 26,
    "tags": {
        "0": {
            "kind": "JSDocTemplateTag",
            "pos": 8,
            "end": 21,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 17,
                "text": "template"
            },
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
        },
        "length": 1,
        "pos": 8,
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
    "kind": "JSDocComment",
    "pos": 0,
    "end": 27,
    "tags": {
        "0": {
            "kind": "JSDocTemplateTag",
            "pos": 8,
            "end": 22,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 17,
                "text": "template"
            },
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
        },
        "length": 1,
        "pos": 8,
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
    "kind": "JSDocComment",
    "pos": 0,
    "end": 27,
    "tags": {
        "0": {
            "kind": "JSDocTemplateTag",
            "pos": 8,
            "end": 22,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 17,
                "text": "template"
            },
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
        },
        "length": 1,
        "pos": 8,
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
    "kind": "JSDocComment",
    "pos": 0,
    "end": 28,
    "tags": {
        "0": {
            "kind": "JSDocTemplateTag",
            "pos": 8,
            "end": 23,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 17,
                "text": "template"
            },
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
        },
        "length": 1,
        "pos": 8,
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
    "kind": "JSDocComment",
    "pos": 0,
    "end": 60,
    "tags": {
        "0": {
            "kind": "JSDocTemplateTag",
            "pos": 8,
            "end": 23,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 17,
                "text": "template"
            },
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
        },
        "length": 1,
        "pos": 8,
        "end": 23
    }
}`);
                });

                it("paramWithoutType", () => {
                    parsesCorrectly(
                        `/**
  * @param foo
  */`,
                        `{
    "kind": "JSDocComment",
    "pos": 0,
    "end": 23,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "pos": 8,
            "end": 18,
            "atToken": {
                "kind": "AtToken",
                "pos": 8,
                "end": 9
            },
            "tagName": {
                "kind": "Identifier",
                "pos": 9,
                "end": 14,
                "text": "param"
            },
            "preParameterName": {
                "kind": "Identifier",
                "pos": 15,
                "end": 18,
                "text": "foo"
            }
        },
        "length": 1,
        "pos": 8,
        "end": 18
    }
}`);
                });

                it("typedefTagWithChildrenTags", () => {
                    const content =
                    `/**
                      * @typedef People
                      * @type {Object}
                      * @property {number} age
                      * @property {string} name
                      */`;
                    const expected = {
                        "end": 102,
                        "kind": "JSDocComment",
                        "pos": 0,
                        "tags": {
                            "0": {
                                "atToken": {
                                    "end": 9,
                                    "kind": "AtToken",
                                    "pos": 8
                                },
                                "end": 97,
                                "jsDocTypeLiteral": {
                                    "end": 97,
                                    "jsDocPropertyTags": [
                                        {
                                            "atToken": {
                                                "end": 48,
                                                "kind": "AtToken",
                                                "pos": 46
                                            },
                                            "end": 69,
                                            "kind": "JSDocPropertyTag",
                                            "name": {
                                                "end": 69,
                                                "kind": "Identifier",
                                                "pos": 66,
                                                "text": "age"
                                            },
                                            "pos": 46,
                                            "tagName": {
                                                "end": 56,
                                                "kind": "Identifier",
                                                "pos": 48,
                                                "text": "property"
                                            },
                                            "typeExpression": {
                                                "end": 65,
                                                "kind": "JSDocTypeExpression",
                                                "pos": 57,
                                                "type": {
                                                    "end": 64,
                                                    "kind": "NumberKeyword",
                                                    "pos": 58
                                                }
                                            }
                                        },
                                        {
                                            "atToken": {
                                                "end": 75,
                                                "kind": "AtToken",
                                                "pos": 73
                                            },
                                            "end": 97,
                                            "kind": "JSDocPropertyTag",
                                            "name": {
                                                "end": 97,
                                                "kind": "Identifier",
                                                "pos": 93,
                                                "text": "name"
                                            },
                                            "pos": 73,
                                            "tagName": {
                                                "end": 83,
                                                "kind": "Identifier",
                                                "pos": 75,
                                                "text": "property"
                                            },
                                            "typeExpression": {
                                                "end": 92,
                                                "kind": "JSDocTypeExpression",
                                                "pos": 84,
                                                "type": {
                                                    "end": 91,
                                                    "kind": "StringKeyword",
                                                    "pos": 85
                                                }
                                            }
                                        }
                                    ],
                                    "jsDocTypeTag": {
                                        "atToken": {
                                            "end": 29,
                                            "kind": "AtToken",
                                            "pos": 27
                                        },
                                        "end": 42,
                                        "kind": "JSDocTypeTag",
                                        "pos": 27,
                                        "tagName": {
                                            "end": 33,
                                            "kind": "Identifier",
                                            "pos": 29,
                                            "text": "type"
                                        },
                                        "typeExpression": {
                                            "end": 42,
                                            "kind": "JSDocTypeExpression",
                                            "pos": 34,
                                            "type": {
                                                "end": 41,
                                                "kind": "JSDocTypeReference",
                                                "name": {
                                                    "end": 41,
                                                    "kind": "Identifier",
                                                    "pos": 35,
                                                    "text": "Object"
                                                },
                                                "pos": 35
                                            }
                                        }
                                    },
                                    "kind": "JSDocTypeLiteral",
                                    "pos": 23
                                },
                                "kind": "JSDocTypedefTag",
                                "name": {
                                    "end": 23,
                                    "kind": "Identifier",
                                    "pos": 17,
                                    "text": "People"
                                },
                                "pos": 8,
                                "tagName": {
                                    "end": 16,
                                    "kind": "Identifier",
                                    "pos": 9,
                                    "text": "typedef"
                                }
                            },
                            "end": 97,
                            "length": 1,
                            "pos": 8
                        }
                    };
                    parsesCorrectly(reIndentJSDocComment(content), expected);
                });
            });
        });
    });
}
