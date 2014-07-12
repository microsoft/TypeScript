//﻿
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

///<reference path='TypeScript2.ts' />

module TypeScript2 {
    export class Signature {
        public hasVariableArgList = false;
        public returnType: TypeLink;
        public parameters: ParameterSymbol[] = null;
        public declAST: FuncDecl = null;
        public typeCheckStatus = TypeCheckStatus.NotStarted;
        public nonOptionalParameterCount = 0;

        public specializeType(pattern: Type2, replacement: Type2, checker: TypeChecker): Signature {
            var result = new Signature();
            if (this.hasVariableArgList) {
                result.hasVariableArgList = true;
            }
            result.returnType = new TypeLink();
            if (this.returnType.type) {
                result.returnType.type =
                    this.returnType.type.specializeType(pattern, replacement, checker, false);
            }
            else {
                result.returnType.type = checker.anyType;
            }

            if (this.parameters) {
                result.parameters = [];
                for (var i = 0, len = this.parameters.length; i < len; i++) {
                    var oldSym:ParameterSymbol = this.parameters[i];
                    var paramDef = new ValueLocation();
                    var paramSym = new ParameterSymbol(oldSym.name, oldSym.location,
                                                     checker.locationInfo.unitIndex,
                                                     paramDef);

                    paramSym.declAST = this.declAST;
                    paramDef.symbol = paramSym;
                    paramDef.typeLink = new TypeLink();
                    result.parameters[i] = paramSym;
                    var oldType = oldSym.getType();
                    if (oldType) {
                        paramDef.typeLink.type = oldType.specializeType(pattern, replacement, checker, false);
                        paramSym.declAST.type = paramDef.typeLink.type;
                    }
                    else {
                        paramDef.typeLink.type = checker.anyType;
                    }
                }
            }
            result.nonOptionalParameterCount = this.nonOptionalParameterCount;
            result.declAST = this.declAST;

            return result;
        }

        public toString() {
            return this.toStringHelper(false, false, null);
        }

        public toStringHelper(shortform: boolean, brackets: boolean, scope: SymbolScope) {
            return this.toStringHelperEx(shortform, brackets, scope).toString();
        }

        public toStringHelperEx(shortform: boolean, brackets: boolean, scope: SymbolScope, prefix? : string = "") : MemberName {
            var builder = new MemberNameArray();
            if (brackets) {
                builder.prefix =  prefix + "[";
            }
            else {
                builder.prefix = prefix + "(";
            }

            var paramLen = this.parameters.length;
            var len = this.hasVariableArgList ? paramLen - 1 : paramLen;
            for (var i = 0; i < len; i++) {
                builder.add(MemberName.create(this.parameters[i].name + (this.parameters[i].isOptional() ? "?" : "") + ": "));
                builder.add(this.parameters[i].getType().getScopedTypeNameEx(scope));
                if (i < paramLen - 1) {
                    builder.add(MemberName.create(", "));
                }
            }

            if (this.hasVariableArgList) {
                builder.add(MemberName.create("..." + this.parameters[i].name + ": "));
                builder.add(this.parameters[i].getType().getScopedTypeNameEx(scope));
            }

            if (shortform) {
                if (brackets) {
                    builder.add(MemberName.create("] => "));
                }
                else {
                    builder.add(MemberName.create(") => "));
                }
            }
            else {
                if (brackets) {
                    builder.add(MemberName.create("]: "));
                }
                else {
                    builder.add(MemberName.create("): "));
                }
            }

            if (this.returnType.type) {
                 builder.add(this.returnType.type.getScopedTypeNameEx(scope));
            }
            else {
                builder.add(MemberName.create("any"));
            }
            return builder;
        }
    }

    export class SignatureGroup {
        public signatures: Signature[] = [];
        public hasImplementation = true;
        public definitionSignature: Signature = null;
        public hasBeenTypechecked = false;
        public flags: SignatureFlags = SignatureFlags.None;
        public addSignature(signature: Signature) {
            if (this.signatures == null) {
                this.signatures = new Signature[];
            }
            this.signatures[this.signatures.length] = signature;
            
            // REVIEW: duplicates should be found within createFunctionSignature,
            // so we won't check for them here
            if (signature.declAST &&
                !signature.declAST.isOverload &&
                !signature.declAST.isSignature() && 
                !hasFlag(signature.declAST.fncFlags, FncFlags.Ambient) &&
                hasFlag(signature.declAST.fncFlags, FncFlags.Definition)) {
                this.definitionSignature = signature;
            }
        }

        public toString() { return this.signatures.toString(); }
        public toStrings(prefix: string, shortform: boolean, scope: SymbolScope) {
            var result : MemberName[] = [];  
            var len = this.signatures.length;
            if (len > 1) {
                shortform = false;
            }
            for (var i = 0; i < len; i++) {
                // the definition signature shouldn't be printed if there are overloads
                if (len > 1 && this.signatures[i] == this.definitionSignature) {
                    continue;
                }
                if (this.flags & SignatureFlags.IsIndexer) {
                    result.push(this.signatures[i].toStringHelperEx(shortform, true, scope));
                }
                else {
                    result.push(this.signatures[i].toStringHelperEx(shortform, false, scope, prefix));
                }
            }
            
            return result;
        }

        public specializeType(pattern: Type2, replacement: Type2, checker: TypeChecker): SignatureGroup {
            var result = new SignatureGroup();
            if (this.signatures) {
                for (var i = 0, len = this.signatures.length; i < len; i++) {
                    result.addSignature(this.signatures[i].specializeType(pattern, replacement, checker));
                }
            }
            return result;
        }

        // verifies that signatures are
        //  - unique within a given group
        //  - compatible with the declaration signature
        public verifySignatures(checker: TypeChecker) {

            var len = 0;
            
            // TODO: verify no signature pair with identical parameters
            if (this.signatures && ((len = this.signatures.length) > 0)) {
                
                for (var i = 0; i < len; i++) {
                    
                    for (var j = i + 1; j < len; j++) {
                        // next check for equivalence between overloads - no two can be exactly the same                     
                        if (this.signatures[i].declAST && this.signatures[j].declAST &&
                            (!hasFlag(this.signatures[i].declAST.fncFlags, FncFlags.Definition) && !hasFlag(this.signatures[j].declAST.fncFlags, FncFlags.Definition)) &&
                            checker.signaturesAreIdentical(this.signatures[i], this.signatures[j])) {
                            checker.errorReporter.simpleError(this.signatures[i].declAST, (this.signatures[i].declAST && this.signatures[i].declAST.name) ? "Signature for '" + this.signatures[i].declAST.name.actualText + "' is duplicated" :"Signature is duplicated");
                        }
                    }
                    
                    // finally, ensure that the definition is assignable to each signature
                    if (this.definitionSignature) {
                        if (!checker.signatureIsAssignableToTarget(this.definitionSignature, this.signatures[i])) {
                            checker.errorReporter.simpleError(this.signatures[i].declAST, "Overload signature is not compatible with function definition");
                        }
                    }
                }
            }
        }

        public typeCheck(checker: TypeChecker, ast: AST2, hasConstruct:boolean) {
            
            if (this.hasBeenTypechecked) {
                return;
            }
            
            // set here to prevent us from recursively invoking typeCheck again
            this.hasBeenTypechecked = true;
            
            var len = 0;
            
            if (this.signatures && ((len = this.signatures.length) > 0)) {
                
                // first, typecheck each signature
                for (var i = 0; i < len; i++) {

                    if (!hasConstruct && !this.definitionSignature && this.signatures[i].declAST && this.signatures[i].declAST.isOverload && !hasFlag(this.signatures[i].declAST.fncFlags, FncFlags.Ambient)) {
                        checker.errorReporter.simpleError(this.signatures[i].declAST, "Overload declaration lacks definition");
                    }

                    // If we're typechecking a constructor via one of its overloads, ensure that the outer class is typechecked, since we need to validate its inheritance properties
                    // to properly check that 'super' is being used correctly
                    if (this.signatures[i].declAST && this.signatures[i].declAST.isConstructor && this.signatures[i].declAST.classDecl && this.signatures[i].declAST.classDecl.type.symbol.typeCheckStatus == TypeCheckStatus.NotStarted) {
                        checker.typeFlow.typeCheck(this.signatures[i].declAST.classDecl);
                    }

                    checker.typeFlow.typeCheck(this.signatures[i].declAST);
                }

                this.verifySignatures(checker);
            }
        }
    }
}