/// <reference path="..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\src\compiler\parser.ts" />
/// <reference path="..\..\..\src\harness\harness.ts" />

module ts {
    function parsesCorrectly(content: string, expected: string) {
        let type = ts.parseJSDocTypeExpression(content, 0);
        let result = Utils.sourceFileToJSON(type);
        assert.equal(result, expected);
    }

    function parsesIncorrectly(content: string) {
        let type = ts.parseJSDocTypeExpression(content, 0);
        assert.equal(type, undefined);
    }

    describe("JSDocParsing", () => {
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
    "member": {
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
    "member": {
        "0": {
            "kind": "JSDocMember",
            "pos": 2,
            "end": 5,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5
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
    "member": {
        "0": {
            "kind": "JSDocMember",
            "pos": 2,
            "end": 13,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5
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
    "member": {
        "0": {
            "kind": "JSDocMember",
            "pos": 2,
            "end": 5,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5
            }
        },
        "1": {
            "kind": "JSDocMember",
            "pos": 6,
            "end": 10,
            "name": {
                "kind": "Identifier",
                "pos": 6,
                "end": 10
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
    "member": {
        "0": {
            "kind": "JSDocMember",
            "pos": 2,
            "end": 13,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5
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
                "end": 18
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
    "member": {
        "0": {
            "kind": "JSDocMember",
            "pos": 2,
            "end": 5,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5
            }
        },
        "1": {
            "kind": "JSDocMember",
            "pos": 6,
            "end": 18,
            "name": {
                "kind": "Identifier",
                "pos": 6,
                "end": 10
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
    "member": {
        "0": {
            "kind": "JSDocMember",
            "pos": 2,
            "end": 13,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 5
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
                "end": 18
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

            it("unionType", () => {
                debugger;
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
        });

        describe("parsesIncorrectly", () => {
            it("emptyType", () => {
                parsesIncorrectly("{}");
            });
        });
    });
}