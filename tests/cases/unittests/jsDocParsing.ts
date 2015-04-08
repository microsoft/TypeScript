/// <reference path="..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\src\compiler\parser.ts" />
/// <reference path="..\..\..\src\harness\harness.ts" />

module ts {
    describe("JSDocParsing", () => {
        describe("TypeExpressions", () => {
            function parsesCorrectly(content: string, expected: string) {
                let typeExpression = ts.parseJSDocTypeExpression(content);
                assert.isNotNull(typeExpression);

                let result = Utils.sourceFileToJSON(typeExpression.type);
                assert.equal(result, expected);
            }

            function parsesIncorrectly(content: string) {
                let type = ts.parseJSDocTypeExpression(content);
                assert.equal(type, undefined);
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
            "kind": "JSDocMember",
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
            "kind": "JSDocMember",
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
            "kind": "JSDocMember",
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
            "kind": "JSDocMember",
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
            "kind": "JSDocMember",
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
                    "text": "number"
                }
            }
        },
        "1": {
            "kind": "JSDocMember",
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
            "kind": "JSDocMember",
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
            "kind": "JSDocMember",
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
            "kind": "JSDocMember",
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
                    "text": "number"
                }
            }
        },
        "1": {
            "kind": "JSDocMember",
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
            "kind": "JSDocMember",
            "pos": 2,
            "end": 10,
            "name": {
                "kind": "FunctionKeyword",
                "pos": 2,
                "end": 10,
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
                "text": "string"
            }
        },
        "length": 2,
        "pos": 2,
        "end": 15
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
            "kind": "JSDocTypeReference",
            "pos": 10,
            "end": 16,
            "name": {
                "kind": "Identifier",
                "pos": 10,
                "end": 16,
                "text": "string"
            }
        },
        "1": {
            "kind": "JSDocTypeReference",
            "pos": 17,
            "end": 25,
            "name": {
                "kind": "Identifier",
                "pos": 17,
                "end": 25,
                "text": "boolean"
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
            "kind": "JSDocTypeReference",
            "pos": 10,
            "end": 16,
            "name": {
                "kind": "Identifier",
                "pos": 10,
                "end": 16,
                "text": "string"
            }
        },
        "1": {
            "kind": "JSDocTypeReference",
            "pos": 17,
            "end": 25,
            "name": {
                "kind": "Identifier",
                "pos": 17,
                "end": 25,
                "text": "boolean"
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
            "text": "function"
        }
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

                it("keyword", () => {
                    parsesIncorrectly("{var}");
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

                it("arrayType", () => {
                    parsesIncorrectly("{a[]}");
                });

                it("tsFunctionType", () => {
                    parsesIncorrectly("{() => string}");
                });

                it("tsConstructoType", () => {
                    parsesIncorrectly("{new () => string}");
                });

                it("tupleType", () => {
                    parsesIncorrectly("{[number,string]}");
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
            });
        });

        describe("DocComments", () => {
            function parsesCorrectly(content: string, expected: string) {
                let comment = ts.parseJSDocComment(/*parent:*/ undefined, content);
                let result = JSON.stringify(comment, (k, v) => {
                    return v && v.pos !== undefined
                        ? JSON.parse(Utils.sourceFileToJSON(v))
                        : v;
                }, "    ");
                assert.equal(result, expected);
            }

            function parsesIncorrectly(content: string) {
                let type = ts.parseJSDocComment(/*parent:*/ undefined, content);
                assert.equal(type, undefined);
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

                it("noType", () => {
                    parsesIncorrectly(
`/**
  * @type
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
            "kind": 65,
            "pos": 15,
            "end": 21,
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
            "kind": 65,
            "pos": 15,
            "end": 21,
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
            "kind": 65,
            "pos": 15,
            "end": 21,
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
            "kind": 65,
            "pos": 17,
            "end": 23,
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
            "kind": 65,
            "pos": 17,
            "end": 23,
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
                    "kind": 65,
                    "pos": 16,
                    "end": 22,
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
                    "kind": 65,
                    "pos": 16,
                    "end": 22,
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
                    "kind": 65,
                    "pos": 42,
                    "end": 48,
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
                    "kind": 65,
                    "pos": 16,
                    "end": 22,
                    "text": "number"
                }
            }
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
                    "kind": 65,
                    "pos": 16,
                    "end": 22,
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
    "typeParameterNames": [
        "T"
    ]
}`);
                });

                it("templateTag2", () => {
                    parsesCorrectly(
                        `/**
  * @template K,V
  */`,
                        `{
    "typeParameterNames": [
        "K",
        "V"
    ]
}`);
                });

                it("templateTag3", () => {
                    parsesCorrectly(
                        `/**
  * @template K ,V
  */`,
                        `{
    "typeParameterNames": [
        "K",
        "V"
    ]
}`);
                });

                it("templateTag4", () => {
                    parsesCorrectly(
                        `/**
  * @template K, V
  */`,
                        `{
    "typeParameterNames": [
        "K",
        "V"
    ]
}`);
                });

                it("templateTag5", () => {
                    parsesCorrectly(
                        `/**
  * @template K , V
  */`,
                        `{
    "typeParameterNames": [
        "K",
        "V"
    ]
}`);
                });

                it("templateTag6", () => {
                    parsesCorrectly(
                        `/**
  * @template K , V Description of type parameters.
  */`,
                        `{
    "typeParameterNames": [
        "K",
        "V"
    ]
}`);
                });
            });
        });
    });
}