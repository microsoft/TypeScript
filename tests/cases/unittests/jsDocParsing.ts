/// <reference path="..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\src\compiler\parser.ts" />
/// <reference path="..\..\..\src\harness\harness.ts" />

module ts {
    describe("JSDocParsing", () => {
        describe("TypeExpressions", () => {
            function parsesCorrectly(content: string, expected: string) {
                let typeAndDiagnostics = ts.parseJSDocTypeExpressionForTests(content);
                assert.isTrue(typeAndDiagnostics && typeAndDiagnostics.diagnostics.length === 0);

                let result = Utils.sourceFileToJSON(typeAndDiagnostics.jsDocTypeExpression.type);
                assert.equal(result, expected);
            }

            function parsesIncorrectly(content: string) {
                let type = ts.parseJSDocTypeExpressionForTests(content);
                assert.isTrue(!type || type.diagnostics.length > 0);
            }

            describe("parseCorrectly", () => {
                it("unknownType", () => {
                    parsesCorrectly("{?}",
                        `{
    "kind": "JSDocUnknownType",
    "start": 1,
    "length": 1
}`);
                });

                it("allType", () => {
                    parsesCorrectly("{*}",
                        `{
    "kind": "JSDocAllType",
    "start": 1,
    "length": 1
}`);
                });

                it("nullableType", () => {
                    parsesCorrectly("{?number}",
                        `{
    "kind": "JSDocNullableType",
    "start": 1,
    "length": 7,
    "type": {
        "kind": "NumberKeyword",
        "start": 2,
        "length": 6
    }
}`)
                });

                it("nullableType2", () => {
                    parsesCorrectly("{number?}",
                        `{
    "kind": "JSDocNullableType",
    "start": 1,
    "length": 7,
    "type": {
        "kind": "NumberKeyword",
        "start": 1,
        "length": 6
    }
}`)
                });

                it("nonNullableType", () => {
                    parsesCorrectly("{!number}",
                        `{
    "kind": "JSDocNonNullableType",
    "start": 1,
    "length": 7,
    "type": {
        "kind": "NumberKeyword",
        "start": 2,
        "length": 6
    }
}`)
                });

                it("nonNullableType2", () => {
                    parsesCorrectly("{number!}",
                        `{
    "kind": "JSDocNonNullableType",
    "start": 1,
    "length": 7,
    "type": {
        "kind": "NumberKeyword",
        "start": 1,
        "length": 6
    }
}`)
                });

                it("recordType1", () => {
                    parsesCorrectly("{{}}",
                        `{
    "kind": "JSDocRecordType",
    "start": 1,
    "length": 2,
    "members": {
        "start": 2,
        "length": 0
    }
}`)
                });

                it("recordType2", () => {
                    parsesCorrectly("{{foo}}",
                        `{
    "kind": "JSDocRecordType",
    "start": 1,
    "length": 5,
    "members": {
        "0": {
            "kind": "JSDocRecordMember",
            "start": 2,
            "length": 3,
            "name": {
                "kind": "Identifier",
                "start": 2,
                "length": 3,
                "text": "foo"
            }
        },
        "start": 2,
        "length": 1
    }
}`)
                });

                it("recordType3", () => {
                    parsesCorrectly("{{foo: number}}",
                        `{
    "kind": "JSDocRecordType",
    "start": 1,
    "length": 13,
    "members": {
        "0": {
            "kind": "JSDocRecordMember",
            "start": 2,
            "length": 11,
            "name": {
                "kind": "Identifier",
                "start": 2,
                "length": 3,
                "text": "foo"
            },
            "type": {
                "kind": "NumberKeyword",
                "start": 6,
                "length": 7
            }
        },
        "start": 2,
        "length": 1
    }
}`)
                });

                it("recordType4", () => {
                    parsesCorrectly("{{foo, bar}}",
                        `{
    "kind": "JSDocRecordType",
    "start": 1,
    "length": 10,
    "members": {
        "0": {
            "kind": "JSDocRecordMember",
            "start": 2,
            "length": 3,
            "name": {
                "kind": "Identifier",
                "start": 2,
                "length": 3,
                "text": "foo"
            }
        },
        "1": {
            "kind": "JSDocRecordMember",
            "start": 6,
            "length": 4,
            "name": {
                "kind": "Identifier",
                "start": 6,
                "length": 4,
                "text": "bar"
            }
        },
        "start": 2,
        "length": 2
    }
}`)
                });

                it("recordType5", () => {
                    parsesCorrectly("{{foo: number, bar}}",
                        `{
    "kind": "JSDocRecordType",
    "start": 1,
    "length": 18,
    "members": {
        "0": {
            "kind": "JSDocRecordMember",
            "start": 2,
            "length": 11,
            "name": {
                "kind": "Identifier",
                "start": 2,
                "length": 3,
                "text": "foo"
            },
            "type": {
                "kind": "NumberKeyword",
                "start": 6,
                "length": 7
            }
        },
        "1": {
            "kind": "JSDocRecordMember",
            "start": 14,
            "length": 4,
            "name": {
                "kind": "Identifier",
                "start": 14,
                "length": 4,
                "text": "bar"
            }
        },
        "start": 2,
        "length": 2
    }
}`)
                });

                it("recordType6", () => {
                    parsesCorrectly("{{foo, bar: number}}",
                        `{
    "kind": "JSDocRecordType",
    "start": 1,
    "length": 18,
    "members": {
        "0": {
            "kind": "JSDocRecordMember",
            "start": 2,
            "length": 3,
            "name": {
                "kind": "Identifier",
                "start": 2,
                "length": 3,
                "text": "foo"
            }
        },
        "1": {
            "kind": "JSDocRecordMember",
            "start": 6,
            "length": 12,
            "name": {
                "kind": "Identifier",
                "start": 6,
                "length": 4,
                "text": "bar"
            },
            "type": {
                "kind": "NumberKeyword",
                "start": 11,
                "length": 7
            }
        },
        "start": 2,
        "length": 2
    }
}`)
                });

                it("recordType7", () => {
                    parsesCorrectly("{{foo: number, bar: number}}",
                        `{
    "kind": "JSDocRecordType",
    "start": 1,
    "length": 26,
    "members": {
        "0": {
            "kind": "JSDocRecordMember",
            "start": 2,
            "length": 11,
            "name": {
                "kind": "Identifier",
                "start": 2,
                "length": 3,
                "text": "foo"
            },
            "type": {
                "kind": "NumberKeyword",
                "start": 6,
                "length": 7
            }
        },
        "1": {
            "kind": "JSDocRecordMember",
            "start": 14,
            "length": 12,
            "name": {
                "kind": "Identifier",
                "start": 14,
                "length": 4,
                "text": "bar"
            },
            "type": {
                "kind": "NumberKeyword",
                "start": 19,
                "length": 7
            }
        },
        "start": 2,
        "length": 2
    }
}`)
                });

                it("recordType8", () => {
                    parsesCorrectly("{{function}}",
                        `{
    "kind": "JSDocRecordType",
    "start": 1,
    "length": 10,
    "members": {
        "0": {
            "kind": "JSDocRecordMember",
            "start": 2,
            "length": 8,
            "name": {
                "kind": "Identifier",
                "start": 2,
                "length": 8,
                "originalKeywordKind": "FunctionKeyword",
                "text": "function"
            }
        },
        "start": 2,
        "length": 1
    }
}`)
                });

                it("unionType", () => {
                    parsesCorrectly("{(number|string)}",
                        `{
    "kind": "JSDocUnionType",
    "start": 1,
    "length": 15,
    "types": {
        "0": {
            "kind": "NumberKeyword",
            "start": 2,
            "length": 6
        },
        "1": {
            "kind": "StringKeyword",
            "start": 9,
            "length": 6
        },
        "start": 2,
        "length": 2
    }
}`);
                });

                it("topLevelNoParenUnionType", () => {
                    parsesCorrectly("{number|string}",
                        `{
    "kind": "JSDocUnionType",
    "start": 1,
    "length": 13,
    "types": {
        "0": {
            "kind": "NumberKeyword",
            "start": 1,
            "length": 6
        },
        "1": {
            "kind": "StringKeyword",
            "start": 8,
            "length": 6
        },
        "start": 1,
        "length": 2
    }
}`);
                });

                it("functionType1", () => {
                    parsesCorrectly("{function()}",
                        `{
    "kind": "JSDocFunctionType",
    "start": 1,
    "length": 10,
    "parameters": {
        "start": 10,
        "length": 0
    }
}`);
                });

                it("functionType2", () => {
                    parsesCorrectly("{function(string, boolean)}",
                        `{
    "kind": "JSDocFunctionType",
    "start": 1,
    "length": 25,
    "parameters": {
        "0": {
            "kind": "Parameter",
            "start": 10,
            "length": 6,
            "type": {
                "kind": "StringKeyword",
                "start": 10,
                "length": 6
            }
        },
        "1": {
            "kind": "Parameter",
            "start": 17,
            "length": 8,
            "type": {
                "kind": "BooleanKeyword",
                "start": 17,
                "length": 8
            }
        },
        "start": 10,
        "length": 2
    }
}`);
                });

                it("functionReturnType1", () => {
                    parsesCorrectly("{function(string, boolean)}",
                        `{
    "kind": "JSDocFunctionType",
    "start": 1,
    "length": 25,
    "parameters": {
        "0": {
            "kind": "Parameter",
            "start": 10,
            "length": 6,
            "type": {
                "kind": "StringKeyword",
                "start": 10,
                "length": 6
            }
        },
        "1": {
            "kind": "Parameter",
            "start": 17,
            "length": 8,
            "type": {
                "kind": "BooleanKeyword",
                "start": 17,
                "length": 8
            }
        },
        "start": 10,
        "length": 2
    }
}`);
                });

                it("thisType1", () => {
                    parsesCorrectly("{this:a.b}",
                        `{
    "kind": "JSDocThisType",
    "start": 1,
    "length": 8,
    "type": {
        "kind": "JSDocTypeReference",
        "start": 6,
        "length": 3,
        "name": {
            "kind": "FirstNode",
            "start": 6,
            "length": 3,
            "left": {
                "kind": "Identifier",
                "start": 6,
                "length": 1,
                "text": "a"
            },
            "right": {
                "kind": "Identifier",
                "start": 8,
                "length": 1,
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
    "start": 1,
    "length": 7,
    "type": {
        "kind": "JSDocTypeReference",
        "start": 5,
        "length": 3,
        "name": {
            "kind": "FirstNode",
            "start": 5,
            "length": 3,
            "left": {
                "kind": "Identifier",
                "start": 5,
                "length": 1,
                "text": "a"
            },
            "right": {
                "kind": "Identifier",
                "start": 7,
                "length": 1,
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
    "start": 1,
    "length": 9,
    "type": {
        "kind": "NumberKeyword",
        "start": 4,
        "length": 6
    }
}`);
                });

                it("optionalType", () => {
                    parsesCorrectly("{number=}",
                        `{
    "kind": "JSDocOptionalType",
    "start": 1,
    "length": 7,
    "type": {
        "kind": "NumberKeyword",
        "start": 1,
        "length": 6
    }
}`);
                });

                it("optionalNullable", () => {
                    parsesCorrectly("{?=}",
                        `{
    "kind": "JSDocOptionalType",
    "start": 1,
    "length": 2,
    "type": {
        "kind": "JSDocUnknownType",
        "start": 1,
        "length": 1
    }
}`);
                });

                it("typeReference1", () => {
                    parsesCorrectly("{a.<number>}",
                        `{
    "kind": "JSDocTypeReference",
    "start": 1,
    "length": 10,
    "name": {
        "kind": "Identifier",
        "start": 1,
        "length": 1,
        "text": "a"
    },
    "typeArguments": {
        "0": {
            "kind": "NumberKeyword",
            "start": 4,
            "length": 6
        },
        "start": 4,
        "length": 1
    }
}`);
                });

                it("typeReference2", () => {
                    parsesCorrectly("{a.<number,string>}",
                        `{
    "kind": "JSDocTypeReference",
    "start": 1,
    "length": 17,
    "name": {
        "kind": "Identifier",
        "start": 1,
        "length": 1,
        "text": "a"
    },
    "typeArguments": {
        "0": {
            "kind": "NumberKeyword",
            "start": 4,
            "length": 6
        },
        "1": {
            "kind": "StringKeyword",
            "start": 11,
            "length": 6
        },
        "start": 4,
        "length": 2
    }
}`);
                });

                it("typeReference3", () => {
                    parsesCorrectly("{a.function}",
                        `{
    "kind": "JSDocTypeReference",
    "start": 1,
    "length": 10,
    "name": {
        "kind": "FirstNode",
        "start": 1,
        "length": 10,
        "left": {
            "kind": "Identifier",
            "start": 1,
            "length": 1,
            "text": "a"
        },
        "right": {
            "kind": "Identifier",
            "start": 3,
            "length": 8,
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
    "start": 1,
    "length": 3,
    "elementType": {
        "kind": "JSDocTypeReference",
        "start": 1,
        "length": 1,
        "name": {
            "kind": "Identifier",
            "start": 1,
            "length": 1,
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
    "start": 1,
    "length": 5,
    "elementType": {
        "kind": "JSDocArrayType",
        "start": 1,
        "length": 3,
        "elementType": {
            "kind": "JSDocTypeReference",
            "start": 1,
            "length": 1,
            "name": {
                "kind": "Identifier",
                "start": 1,
                "length": 1,
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
    "start": 1,
    "length": 6,
    "type": {
        "kind": "JSDocArrayType",
        "start": 1,
        "length": 5,
        "elementType": {
            "kind": "JSDocArrayType",
            "start": 1,
            "length": 3,
            "elementType": {
                "kind": "JSDocTypeReference",
                "start": 1,
                "length": 1,
                "name": {
                    "kind": "Identifier",
                    "start": 1,
                    "length": 1,
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
    "start": 1,
    "length": 3,
    "name": {
        "kind": "Identifier",
        "start": 1,
        "length": 3,
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
    "start": 1,
    "length": 4,
    "name": {
        "kind": "Identifier",
        "start": 1,
        "length": 4,
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
    "start": 1,
    "length": 9,
    "name": {
        "kind": "Identifier",
        "start": 1,
        "length": 9,
        "text": "undefined"
    }
}`);
                });

                it("tupleType0", () => {
                    parsesCorrectly(
                        "{[]}",
                        `{
    "kind": "JSDocTupleType",
    "start": 1,
    "length": 2,
    "types": {
        "start": 2,
        "length": 0
    }
}`);
                });

                it("tupleType1", () => {
                    parsesCorrectly(
                        "{[number]}",
                        `{
    "kind": "JSDocTupleType",
    "start": 1,
    "length": 8,
    "types": {
        "0": {
            "kind": "NumberKeyword",
            "start": 2,
            "length": 6
        },
        "start": 2,
        "length": 1
    }
}`);
                });

                it("tupleType2", () => {
                    parsesCorrectly(
                        "{[number,string]}",
                        `{
    "kind": "JSDocTupleType",
    "start": 1,
    "length": 15,
    "types": {
        "0": {
            "kind": "NumberKeyword",
            "start": 2,
            "length": 6
        },
        "1": {
            "kind": "StringKeyword",
            "start": 9,
            "length": 6
        },
        "start": 2,
        "length": 2
    }
}`);
                });

                it("tupleType3", () => {
                    parsesCorrectly(
                        "{[number,string,boolean]}",
                        `{
    "kind": "JSDocTupleType",
    "start": 1,
    "length": 23,
    "types": {
        "0": {
            "kind": "NumberKeyword",
            "start": 2,
            "length": 6
        },
        "1": {
            "kind": "StringKeyword",
            "start": 9,
            "length": 6
        },
        "2": {
            "kind": "BooleanKeyword",
            "start": 16,
            "length": 7
        },
        "start": 2,
        "length": 3
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
                let comment = parseIsolatedJSDocComment(content);
                Debug.assert(comment && comment.diagnostics.length === 0);

                let result = JSON.stringify(comment.jsDocComment, (k, v) => {
                    return v && v.start !== undefined
                        ? JSON.parse(Utils.sourceFileToJSON(v))
                        : v;
                }, "    ");
                
                assert.equal(result, expected);
            }

            function parsesIncorrectly(content: string) {
                let type = parseIsolatedJSDocComment(content);
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
    "start": 0,
    "length": 27,
    "tags": {
        "0": {
            "kind": "JSDocTypeTag",
            "start": 8,
            "length": 14,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 4,
                "text": "type"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "start": 14,
                "length": 8,
                "type": {
                    "kind": "NumberKeyword",
                    "start": 15,
                    "length": 6
                }
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 18,
    "tags": {
        "0": {
            "kind": "JSDocTypeTag",
            "start": 8,
            "length": 5,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 4,
                "text": "type"
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 20,
    "tags": {
        "0": {
            "kind": "JSDocReturnTag",
            "start": 8,
            "length": 7,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 6,
                "text": "return"
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 27,
    "tags": {
        "0": {
            "kind": "JSDocTypeTag",
            "start": 8,
            "length": 14,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 4,
                "text": "type"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "start": 14,
                "length": 8,
                "type": {
                    "kind": "NumberKeyword",
                    "start": 15,
                    "length": 6
                }
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 27,
    "tags": {
        "0": {
            "kind": "JSDocTypeTag",
            "start": 8,
            "length": 14,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 4,
                "text": "type"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "start": 14,
                "length": 8,
                "type": {
                    "kind": "NumberKeyword",
                    "start": 15,
                    "length": 6
                }
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 29,
    "tags": {
        "0": {
            "kind": "JSDocReturnTag",
            "start": 8,
            "length": 16,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 6,
                "text": "return"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "start": 16,
                "length": 8,
                "type": {
                    "kind": "NumberKeyword",
                    "start": 17,
                    "length": 6
                }
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 54,
    "tags": {
        "0": {
            "kind": "JSDocReturnTag",
            "start": 8,
            "length": 16,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 6,
                "text": "return"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "start": 16,
                "length": 8,
                "type": {
                    "kind": "NumberKeyword",
                    "start": 17,
                    "length": 6
                }
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 30,
    "tags": {
        "0": {
            "kind": "JSDocReturnTag",
            "start": 8,
            "length": 17,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 7,
                "text": "returns"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "start": 17,
                "length": 8,
                "type": {
                    "kind": "NumberKeyword",
                    "start": 18,
                    "length": 6
                }
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 34,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "start": 8,
            "length": 21,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 5,
                "text": "param"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "start": 15,
                "length": 8,
                "type": {
                    "kind": "NumberKeyword",
                    "start": 16,
                    "length": 6
                }
            },
            "postParameterName": {
                "kind": "Identifier",
                "start": 24,
                "length": 5,
                "text": "name1"
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 60,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "start": 8,
            "length": 21,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 5,
                "text": "param"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "start": 15,
                "length": 8,
                "type": {
                    "kind": "NumberKeyword",
                    "start": 16,
                    "length": 6
                }
            },
            "postParameterName": {
                "kind": "Identifier",
                "start": 24,
                "length": 5,
                "text": "name1"
            }
        },
        "1": {
            "kind": "JSDocParameterTag",
            "start": 34,
            "length": 21,
            "atToken": {
                "kind": "AtToken",
                "start": 34,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 35,
                "length": 5,
                "text": "param"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "start": 41,
                "length": 8,
                "type": {
                    "kind": "NumberKeyword",
                    "start": 42,
                    "length": 6
                }
            },
            "postParameterName": {
                "kind": "Identifier",
                "start": 50,
                "length": 5,
                "text": "name2"
            }
        },
        "start": 8,
        "length": 2
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
    "start": 0,
    "length": 59,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "start": 8,
            "length": 21,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 5,
                "text": "param"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "start": 15,
                "length": 8,
                "type": {
                    "kind": "NumberKeyword",
                    "start": 16,
                    "length": 6
                }
            },
            "postParameterName": {
                "kind": "Identifier",
                "start": 24,
                "length": 5,
                "text": "name1"
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 61,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "start": 8,
            "length": 22,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 5,
                "text": "param"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "start": 15,
                "length": 8,
                "type": {
                    "kind": "NumberKeyword",
                    "start": 16,
                    "length": 6
                }
            },
            "postParameterName": {
                "kind": "Identifier",
                "start": 25,
                "length": 5,
                "text": "name1"
            },
            "isBracketed": true
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 66,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "start": 8,
            "length": 23,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 5,
                "text": "param"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "start": 15,
                "length": 8,
                "type": {
                    "kind": "NumberKeyword",
                    "start": 16,
                    "length": 6
                }
            },
            "postParameterName": {
                "kind": "Identifier",
                "start": 26,
                "length": 5,
                "text": "name1"
            },
            "isBracketed": true
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 56,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "start": 8,
            "length": 21,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 5,
                "text": "param"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "start": 15,
                "length": 8,
                "type": {
                    "kind": "NumberKeyword",
                    "start": 16,
                    "length": 6
                }
            },
            "postParameterName": {
                "kind": "Identifier",
                "start": 24,
                "length": 5,
                "text": "name1"
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 34,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "start": 8,
            "length": 21,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 5,
                "text": "param"
            },
            "preParameterName": {
                "kind": "Identifier",
                "start": 15,
                "length": 5,
                "text": "name1"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "start": 21,
                "length": 8,
                "type": {
                    "kind": "NumberKeyword",
                    "start": 22,
                    "length": 6
                }
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 46,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "start": 8,
            "length": 21,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 5,
                "text": "param"
            },
            "preParameterName": {
                "kind": "Identifier",
                "start": 15,
                "length": 5,
                "text": "name1"
            },
            "typeExpression": {
                "kind": "JSDocTypeExpression",
                "start": 21,
                "length": 8,
                "type": {
                    "kind": "NumberKeyword",
                    "start": 22,
                    "length": 6
                }
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 24,
    "tags": {
        "0": {
            "kind": "JSDocTemplateTag",
            "start": 8,
            "length": 11,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 8,
                "text": "template"
            },
            "typeParameters": {
                "0": {
                    "kind": "TypeParameter",
                    "start": 18,
                    "length": 1,
                    "name": {
                        "kind": "Identifier",
                        "start": 18,
                        "length": 1,
                        "text": "T"
                    }
                },
                "start": 17,
                "length": 1
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 26,
    "tags": {
        "0": {
            "kind": "JSDocTemplateTag",
            "start": 8,
            "length": 13,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 8,
                "text": "template"
            },
            "typeParameters": {
                "0": {
                    "kind": "TypeParameter",
                    "start": 18,
                    "length": 1,
                    "name": {
                        "kind": "Identifier",
                        "start": 18,
                        "length": 1,
                        "text": "K"
                    }
                },
                "1": {
                    "kind": "TypeParameter",
                    "start": 20,
                    "length": 1,
                    "name": {
                        "kind": "Identifier",
                        "start": 20,
                        "length": 1,
                        "text": "V"
                    }
                },
                "start": 17,
                "length": 2
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 27,
    "tags": {
        "0": {
            "kind": "JSDocTemplateTag",
            "start": 8,
            "length": 14,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 8,
                "text": "template"
            },
            "typeParameters": {
                "0": {
                    "kind": "TypeParameter",
                    "start": 18,
                    "length": 1,
                    "name": {
                        "kind": "Identifier",
                        "start": 18,
                        "length": 1,
                        "text": "K"
                    }
                },
                "1": {
                    "kind": "TypeParameter",
                    "start": 21,
                    "length": 1,
                    "name": {
                        "kind": "Identifier",
                        "start": 21,
                        "length": 1,
                        "text": "V"
                    }
                },
                "start": 17,
                "length": 2
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 27,
    "tags": {
        "0": {
            "kind": "JSDocTemplateTag",
            "start": 8,
            "length": 14,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 8,
                "text": "template"
            },
            "typeParameters": {
                "0": {
                    "kind": "TypeParameter",
                    "start": 18,
                    "length": 1,
                    "name": {
                        "kind": "Identifier",
                        "start": 18,
                        "length": 1,
                        "text": "K"
                    }
                },
                "1": {
                    "kind": "TypeParameter",
                    "start": 21,
                    "length": 1,
                    "name": {
                        "kind": "Identifier",
                        "start": 21,
                        "length": 1,
                        "text": "V"
                    }
                },
                "start": 17,
                "length": 2
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 28,
    "tags": {
        "0": {
            "kind": "JSDocTemplateTag",
            "start": 8,
            "length": 15,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 8,
                "text": "template"
            },
            "typeParameters": {
                "0": {
                    "kind": "TypeParameter",
                    "start": 18,
                    "length": 1,
                    "name": {
                        "kind": "Identifier",
                        "start": 18,
                        "length": 1,
                        "text": "K"
                    }
                },
                "1": {
                    "kind": "TypeParameter",
                    "start": 22,
                    "length": 1,
                    "name": {
                        "kind": "Identifier",
                        "start": 22,
                        "length": 1,
                        "text": "V"
                    }
                },
                "start": 17,
                "length": 2
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 60,
    "tags": {
        "0": {
            "kind": "JSDocTemplateTag",
            "start": 8,
            "length": 16,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 8,
                "text": "template"
            },
            "typeParameters": {
                "0": {
                    "kind": "TypeParameter",
                    "start": 18,
                    "length": 1,
                    "name": {
                        "kind": "Identifier",
                        "start": 18,
                        "length": 1,
                        "text": "K"
                    }
                },
                "1": {
                    "kind": "TypeParameter",
                    "start": 22,
                    "length": 1,
                    "name": {
                        "kind": "Identifier",
                        "start": 22,
                        "length": 1,
                        "text": "V"
                    }
                },
                "start": 17,
                "length": 2
            }
        },
        "start": 8,
        "length": 1
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
    "start": 0,
    "length": 23,
    "tags": {
        "0": {
            "kind": "JSDocParameterTag",
            "start": 8,
            "length": 10,
            "atToken": {
                "kind": "AtToken",
                "start": 8,
                "length": 1
            },
            "tagName": {
                "kind": "Identifier",
                "start": 9,
                "length": 5,
                "text": "param"
            },
            "preParameterName": {
                "kind": "Identifier",
                "start": 15,
                "length": 3,
                "text": "foo"
            }
        },
        "start": 8,
        "length": 1
    }
}`);
                });
            });
        });
    });
}