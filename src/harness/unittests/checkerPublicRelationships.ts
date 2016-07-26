/// <reference path="..\harness.ts" />
/// <reference path="..\..\harness\harnessLanguageService.ts" />

namespace ts {
    describe("Type Checker Public Relationship APIs", () => {
        let checker: TypeChecker;
        let host: CompilerHost;
        let program: Program;
        before(() => {
            host = Harness.Compiler.createCompilerHost([{
                unitName: "test.ts",
                content: `
                type FunctionAlias = Function;
                function foo() {
                    type Function = { myBrand: 42 } & FunctionAlias;
                    return (() => {}) as any as Function;
                }
                function foo2<T>(x: T) {
                    type Function = { myBrand: T } & FunctionAlias;
                    const ret = (() => {}) as any as Function;
                    ret.myBrand = x;
                    return ret;
                }
                const xs: number[] = [1,2,3];
                `
            }], () => void 0, ScriptTarget.ES3, /*useCaseSensitiveFileNames*/true, "", NewLineKind.CarriageReturnLineFeed);
            program = ts.createProgram(["test.ts"], ts.defaultInitCompilerOptions, host);
            const diag = ts.getPreEmitDiagnostics(program);
            if (diag.length) {
                const errors = ts.formatDiagnostics(diag, host);
                console.log(errors);
            }
            checker = program.getTypeChecker();
        });

        it("can get the any type", () => {
            assert(checker.getAnyType().flags & TypeFlags.Any);
        });

        it("can get the string type", () => {
            assert(checker.getStringType().flags & TypeFlags.String);
        });

        it("can get the number type", () => {
            assert(checker.getNumberType().flags & TypeFlags.Number);
        });

        it("can get the boolean type", () => {
            assert(checker.getBooleanType().flags & TypeFlags.Boolean);
        });

        it("can get the void type", () => {
            assert(checker.getVoidType().flags & TypeFlags.Void);
        });

        it("can get the undefined type", () => {
            assert(checker.getUndefinedType().flags & TypeFlags.Undefined);
        });

        it("can get the null type", () => {
            assert(checker.getNullType().flags & TypeFlags.Null);
        });

        it("can get the essymbol type", () => {
            assert(checker.getESSymbolType().flags & TypeFlags.ESSymbol);
        });

        it("can get the never type", () => {
            assert(checker.getNeverType().flags & TypeFlags.Never);
        });

        it("can get the unknown type", () => {
            assert(checker.getUnknownType().flags & TypeFlags.Any);
            assert(checker.getUnknownType() === checker.getUnknownType());
        });

        it("can get the true type", () => {
            assert(checker.getTrueType().flags & TypeFlags.BooleanLiteral);
        });

        it("can get the false type", () => {
            assert(checker.getFalseType().flags & TypeFlags.BooleanLiteral);
        });

        it("ensures true and false are different types", () => {
            assert(checker.getFalseType() !== checker.getTrueType());
        });

        it("can get string literal types", () => {
            assert((checker.getStringLiteralType("foobar") as LiteralType).text === "foobar");
        });

        it("can get numeber literal types", () => {
            assert((checker.getNumberLiteralType("42") as LiteralType).text === "42");
        });

        it("doesn't choke on exceptional input to literal type getters", () => {
            assert.equal((checker.getStringLiteralType("") as LiteralType).text, "");
            assert.throws(() => checker.getStringLiteralType(undefined), Error, "Debug Failure. False expression:");
            /* tslint:disable:no-null-keyword */
            assert.throws(() => checker.getStringLiteralType(null), Error, "Debug Failure. False expression:");
            /* tslint:enable:no-null-keyword */
            let hugeStringLiteral = map(new Array(2 ** 16 - 1), () => "a").join();
            assert.equal((checker.getStringLiteralType(hugeStringLiteral) as LiteralType).text, hugeStringLiteral);
            hugeStringLiteral = undefined;


            assert.throws(() => checker.getNumberLiteralType(undefined), Error, "Debug Failure. False expression:");
            /* tslint:disable:no-null-keyword */
            assert.throws(() => checker.getNumberLiteralType(null), Error, "Debug Failure. False expression:");
            /* tslint:enable:no-null-keyword */

            const sanityChecks = ["000", "0b0", "0x0", "0.0", "0e-0", "-010", "-0b10", "-0x10", "-0o10", "-10.0", "-1e-1", "NaN", "Infinity", "-Infinity"];
            forEach(sanityChecks, num => {
                assert.equal((checker.getNumberLiteralType(num) as LiteralType).text, num, `${num} did not match.`);
            });

            const insanityChecks = [[0, "0"], [0b0, "0"], [-10, "-10"], [NaN, "NaN"], [Infinity, "Infinity"], [-Infinity, "-Infinity"]];
            forEach(insanityChecks, ([num, expected]) => {
                assert.equal((checker.getNumberLiteralType(num as any) as LiteralType).text, expected, `${JSON.stringify(num)} should be ${expected}`);
            });

            const instabilityChecks = [{ foo: 42 }, new Date(42), [42], new Number(42), new String("42")];
            forEach(instabilityChecks, (bad) => {
                assert.throws(() => checker.getNumberLiteralType(bad as any));
            });
        });

        it("can look up global types", () => {
            assert.equal(checker.lookupGlobalType("Array").symbol.name, "Array", "Array global symbol not named Array");
            const globalFunction = checker.lookupGlobalType("Function");
            const globalAlias = checker.lookupGlobalType("FunctionAlias");
            assert.notEqual(globalFunction, checker.getUnknownType(), "The global function type should not be the unknown type");
            assert.notEqual(globalAlias, checker.getUnknownType(), "The global alias function type should not be the unknown type");
            const globalFunctionLength = globalFunction.getProperty("length");
            const aliasFunctionLength = globalAlias.getProperty("length");
            assert(globalFunctionLength, "Global function length symbol should exist");
            assert(aliasFunctionLength, "Alias function length symbol should exist");
            assert.notEqual(checker.getTypeOfSymbol(globalFunctionLength), checker.getUnknownType(), "The global function's length type should not be unknown");
            assert.notEqual(checker.getTypeOfSymbol(aliasFunctionLength), checker.getUnknownType(), "The alias function's length type should not be unknown");
            assert.equal(checker.getTypeOfSymbol(globalFunctionLength), checker.getTypeOfSymbol(aliasFunctionLength), "Alias and global function length were not identical types");
            assert.equal((checker.getTypeOfSymbol(globalFunctionLength) as IntrinsicType).intrinsicName, (checker.getNumberType() as IntrinsicType).intrinsicName, "Function length was not number type");
        });

        it("can look up types in a given scope", () => {
            assert(program.getSourceFile("test.ts"), "Test file not found");
            const functionBody = forEachChild(program.getSourceFile("test.ts"), node => node.kind === SyntaxKind.FunctionDeclaration ? (node as FunctionDeclaration) : undefined).body;
            assert(functionBody, "Function body missing");
            const innerFunction = checker.lookupTypeAt("Function", functionBody.statements[functionBody.statements.length - 1]);
            assert(innerFunction, "Inner function type missing");
            assert.notEqual(innerFunction, checker.getUnknownType(), "Inner function type should not be unknown");
            assert.notEqual(checker.lookupGlobalType("Function"), innerFunction, "Inner function type should be different than global");
            const brandNameType = checker.getTypeOfSymbol(innerFunction.getProperty("myBrand"));
            assert.notEqual(brandNameType, checker.getUnknownType(), "Brand type on inner function should not be unknown");
            assert.equal(brandNameType, checker.getNumberLiteralType("42"), "Brand type should be 42");

            let skipped = false;
            const functionBody2 = forEachChild(program.getSourceFile("test.ts"), node => node.kind === SyntaxKind.FunctionDeclaration ? skipped ? (node as FunctionDeclaration) : (skipped = true, undefined) : undefined).body;
            assert(functionBody2, "Function body missing");
            const innerFunction2 = checker.lookupTypeAt("Function", functionBody2.statements[functionBody2.statements.length - 1]);
            assert(innerFunction2, "Inner function type missing");
            assert.notEqual(innerFunction2, checker.getUnknownType(), "Inner function type should not be unknown");
            assert.notEqual(checker.lookupGlobalType("Function"), innerFunction2, "Inner function type should be different than global");
            const brandNameType2 = checker.getTypeOfSymbol(innerFunction2.getProperty("myBrand"));
            assert.notEqual(brandNameType2, checker.getUnknownType(), "Brand type on inner function should not be unknown");
            const functionType = checker.lookupGlobalValueType("foo2");
            assert.notEqual(functionType, checker.getUnknownType(), "foo2 function type should not be unknown");
            assert(brandNameType2.flags & TypeFlags.TypeParameter, "Brand should be a type parameter");
            assert.equal(brandNameType2, checker.lookupGlobalValueType("foo2").getCallSignatures()[0].getTypeParameters()[0], "Brand type should be a type parameter");
        });

        it("can compare types using all the builtin relationships", () => {
            assert(checker.isSubtypeOf(checker.getNumberType(), checker.getAnyType()), "Any should be a subtype of number");
            assert.isFalse(checker.isSubtypeOf(checker.getAnyType(), checker.getNumberType()), "Number should not be a subtype of any");

            assert(checker.isAssignableTo(checker.getAnyType(), checker.getNumberType()), "Any should be assignable to number");
            assert(checker.isAssignableTo(checker.getFalseType(), checker.getBooleanType()), "False should be assignable to boolean");

            assert(checker.isComparableTo(checker.getBooleanType(), checker.getFalseType()), "False and boolean are comparable");
            assert(checker.isComparableTo(checker.getFalseType(), checker.getBooleanType()), "Boolean and false are comparable");

            const variableType = checker.lookupGlobalValueType("xs");
            const globalArrayType = checker.lookupGlobalType("Array");
            assert.notEqual(variableType, checker.getUnknownType(), "xs type should not be unknown");
            assert.notEqual(globalArrayType, checker.getUnknownType(), "Global array type should not be unknown");
            assert(checker.isInstantiationOf(checker.lookupGlobalValueType("xs") as GenericType, checker.lookupGlobalType("Array") as GenericType));
        });

        after(() => {
            checker = undefined;
            host = undefined;
            program = undefined;
        });
    });
}