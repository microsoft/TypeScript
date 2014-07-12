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
    export class ArrayCache {
        public arrayType: Type2;
        public arrayBase: Type2 = null;

        public specialize(arrInstType: Type2, checker: TypeChecker): Type2 {
            if (this.arrayBase == null) {
                this.arrayBase = arrInstType.specializeType(checker.wildElm.type, this.arrayType.elementType,
                                                   checker, true);
            }
            return this.arrayBase;
        }
    }

    export class TypeComparisonInfo {
        public onlyCaptureFirstError = false;
        public flags: TypeRelationshipFlags = TypeRelationshipFlags.SuccessfulComparison;
        public message = "";

        public addMessageToFront(message) {
            if (!this.onlyCaptureFirstError) {
                this.message = this.message ? message + ":\n\t" + this.message : message;
            }
            else {
                this.setMessage(message);
            }
        }

        public setMessage(message) {
            this.message = message;
        }
    }

    export interface SignatureData {
        parameters: ParameterSymbol[];
        nonOptionalParameterCount: number;
    }

    export interface ApplicableSignature {
        signature: Signature;
        hadProvisionalErrors: boolean;
    }

    export enum TypeCheckCollectionMode {
        Resident,
        Transient
    }

    export class PersistentGlobalTypeState {
        public importedGlobalsTable = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));
        public importedGlobalsTypeTable = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));

        public importedGlobals: SymbolScopeBuilder;

        // transient state
        public globals: IHashTable = null;
        public globalTypes: IHashTable = null;
        public ambientGlobals: IHashTable = null;
        public ambientGlobalTypes: IHashTable = null;

        // resident state
        public residentGlobalValues = new StringHashTable();
        public residentGlobalTypes = new StringHashTable();
        public residentGlobalAmbientValues = new StringHashTable();
        public residentGlobalAmbientTypes = new StringHashTable();

        // dual resident/transient state

        // REVIEW: We shouldn't need to allocate private hash tables for these, since there's no private global scope
        // REVIEW: In general, we should audit each instance of DualStringHashTable to ensure that both the primary
        // and secondary tables are necessary.  If it's not necessary, we should sub in a constant sentinel value.
        public dualGlobalValues: DualStringHashTable;
        public dualGlobalTypes: DualStringHashTable;
        public dualAmbientGlobalValues: DualStringHashTable;
        public dualAmbientGlobalTypes: DualStringHashTable;

        public globalScope: SymbolScope;

        public voidType: Type2;
        public booleanType: Type2;
        public doubleType: Type2;

        public stringType: Type2;
        public anyType: Type2;
        public nullType: Type2;
        public undefinedType: Type2;

        // Use this flag to turn resident checking on and off
        public residentTypeCheck: boolean = true;

        public mod: ModuleType = null;
        public gloMod: TypeSymbol = null;

        public wildElm: TypeSymbol = null;

        constructor (public errorReporter: ErrorReporter) {
            this.importedGlobals = new SymbolScopeBuilder(null, this.importedGlobalsTable, null, this.importedGlobalsTypeTable, null, null);

            this.dualGlobalValues = new DualStringHashTable(this.residentGlobalValues, new StringHashTable());
            this.dualGlobalTypes = new DualStringHashTable(this.residentGlobalTypes, new StringHashTable());
            this.dualAmbientGlobalValues = new DualStringHashTable(this.residentGlobalAmbientValues, new StringHashTable());
            this.dualAmbientGlobalTypes = new DualStringHashTable(this.residentGlobalAmbientTypes, new StringHashTable());

            var dualGlobalScopedMembers = new ScopedMembers(new DualStringHashTable(this.dualGlobalValues, new StringHashTable()));
            var dualGlobalScopedAmbientMembers = new ScopedMembers(new DualStringHashTable(this.dualAmbientGlobalValues, new StringHashTable()));
            var dualGlobalScopedEnclosedTypes = new ScopedMembers(new DualStringHashTable(this.dualGlobalTypes, new StringHashTable()));
            var dualGlobalScopedAmbientEnclosedTypes = new ScopedMembers(new DualStringHashTable(this.dualAmbientGlobalTypes, new StringHashTable()));

            this.globalScope = new SymbolScopeBuilder(dualGlobalScopedMembers, dualGlobalScopedAmbientMembers, dualGlobalScopedEnclosedTypes, dualGlobalScopedAmbientEnclosedTypes, this.importedGlobals, null);

            this.voidType = this.enterPrimitive(Primitive.Void, "void");
            this.booleanType = this.enterPrimitive(Primitive.Boolean, "boolean");
            this.doubleType = this.enterPrimitive(Primitive.Double, "number");
            this.importedGlobals.ambientEnclosedTypes.addPublicMember("number", this.doubleType.symbol);

            this.stringType = this.enterPrimitive(Primitive.String, "string");
            this.anyType = this.enterPrimitive(Primitive.Any, "any");
            this.nullType = this.enterPrimitive(Primitive.Null, "null");
            this.undefinedType = this.enterPrimitive(Primitive.Undefined, "undefined");

            // shared global state is resident
            this.setCollectionMode(TypeCheckCollectionMode.Resident);

            this.wildElm = new TypeSymbol("_element", -1, 0, -1, new Type2());
            this.importedGlobalsTypeTable.addPublicMember(this.wildElm.name, this.wildElm);

            this.mod = new ModuleType(dualGlobalScopedEnclosedTypes, dualGlobalScopedAmbientEnclosedTypes);
            this.mod.members = dualGlobalScopedMembers;
            this.mod.ambientMembers = dualGlobalScopedAmbientMembers;
            this.mod.containedScope = this.globalScope;

            this.gloMod = new TypeSymbol(globalId, -1, 0, -1, this.mod);
            this.mod.members.addPublicMember(this.gloMod.name, this.gloMod);

            this.defineGlobalValue("undefined", this.undefinedType);
        }


        public enterPrimitive(flags: number, name: string) {
            var primitive = new Type2();
            primitive.primitiveTypeClass = flags;
            var symbol = new TypeSymbol(name, -1, name.length, -1, primitive);
            symbol.typeCheckStatus = TypeCheckStatus.Finished;
            primitive.symbol = symbol;
            this.importedGlobals.enter(null, null, symbol, this.errorReporter, true, true, true);
            return primitive;
        }

        public setCollectionMode(mode: TypeCheckCollectionMode) {
            this.residentTypeCheck =
                this.dualGlobalValues.insertPrimary =
                    this.dualGlobalTypes.insertPrimary =
                        this.dualAmbientGlobalValues.insertPrimary =
                            this.dualAmbientGlobalTypes.insertPrimary = mode == TypeCheckCollectionMode.Resident;
        }

        public refreshPersistentState() {
            this.globals = new StringHashTable();
            this.globalTypes = new StringHashTable();
            this.ambientGlobals = new StringHashTable();
            this.ambientGlobalTypes = new StringHashTable();

            // add global types to the global scope
            this.globalTypes.add(this.voidType.symbol.name, this.voidType.symbol);
            this.globalTypes.add(this.booleanType.symbol.name, this.booleanType.symbol);
            this.globalTypes.add(this.doubleType.symbol.name, this.doubleType.symbol);
            this.globalTypes.add("number", this.doubleType.symbol);
            this.globalTypes.add(this.stringType.symbol.name, this.stringType.symbol);
            this.globalTypes.add(this.anyType.symbol.name, this.anyType.symbol);
            this.globalTypes.add(this.nullType.symbol.name, this.nullType.symbol);
            this.globalTypes.add(this.undefinedType.symbol.name, this.undefinedType.symbol);

            this.dualGlobalValues.secondaryTable = this.globals;
            this.dualGlobalTypes.secondaryTable = this.globalTypes;
            this.dualAmbientGlobalValues.secondaryTable = this.ambientGlobals;
            this.dualAmbientGlobalTypes.secondaryTable = this.ambientGlobalTypes;
        }

        public defineGlobalValue(name: string, type: Type2) {
            var valueLocation = new ValueLocation();
            valueLocation.typeLink = new TypeLink();
            var sym = new VariableSymbol(name, 0, -1, valueLocation);
            sym.setType(type);
            sym.typeCheckStatus = TypeCheckStatus.Finished;
            sym.container = this.gloMod;
            this.importedGlobalsTable.addPublicMember(name, sym);
        }
    }

    export class ContextualTypeContext {
        public targetSig: Signature = null;
        public targetThis: Type2 = null;
        public targetAccessorType: Type2 = null;

        constructor (public contextualType: Type2,
            public provisional: boolean, public contextID: number) { }
    }

    export class ContextualTypingContextStack {
        private contextStack: ContextualTypeContext[] = [];
        static contextID = TypeCheckStatus.Finished + 1;
        public pushContextualType(type: Type2, provisional: boolean) { this.contextStack.push(new ContextualTypeContext(type, provisional, ContextualTypingContextStack.contextID++)); this.checker.errorReporter.pushToErrorSink = provisional; }
        public hadProvisionalErrors = false; // somewhere in the chain a provisional typecheck error was thrown
        public popContextualType() {
            var tc = this.contextStack.pop();
            this.checker.errorReporter.pushToErrorSink = this.isProvisional();
            this.hadProvisionalErrors = this.hadProvisionalErrors || (tc.provisional && (this.checker.errorReporter.getCapturedErrors().length));
            this.checker.errorReporter.freeCapturedErrors();
            return tc;
        }
        public getContextualType(): ContextualTypeContext { return (!this.contextStack.length ? null : this.contextStack[this.contextStack.length - 1]); }
        public getContextID() { return (!this.contextStack.length ? TypeCheckStatus.Finished : this.contextStack[this.contextStack.length - 1].contextID); }
        public isProvisional() { return (!this.contextStack.length ? false : this.contextStack[this.contextStack.length - 1].provisional); }

        constructor (public checker: TypeChecker) { }
    }

    export class TypeChecker {
        public errorReporter: ErrorReporter = null;
        public globalScope: SymbolScope;

        public checkControlFlow = false;
        public printControlFlowGraph = false;
        public checkControlFlowUseDef = false;
        public styleSettings: StyleSettings = null;

        public units: LocationInfo[] = null;

        public voidType: Type2;
        public booleanType: Type2;
        public numberType: Type2;
        public stringType: Type2;
        public anyType: Type2;
        public nullType: Type2;
        public undefinedType: Type2;

        public anon = "_anonymous";

        public globals: DualStringHashTable;
        public globalTypes: DualStringHashTable;
        public ambientGlobals: DualStringHashTable;
        public ambientGlobalTypes: DualStringHashTable;
        public gloModType: ModuleType;
        public gloMod: TypeSymbol;
        public wildElm: TypeSymbol;

        public locationInfo: LocationInfo = null;
        public typeFlow: TypeFlow = null;

        public currentCompareA: Symbol = null;
        public currentCompareB: Symbol = null;

        public currentModDecl: ModuleDeclaration = null;

        public inBind = false;
        public inWith = false;
        public errorsOnWith = true;

        public typingContextStack: ContextualTypingContextStack;
        public currentContextualTypeContext: ContextualTypeContext = null;

        public resolvingBases = false;

        public canCallDefinitionSignature = false;

        public assignableCache: any[] = <any>{};
        public subtypeCache: any[] = <any>{};
        public identicalCache: any[] = <any>{};

        public provisionalStartedTypecheckObjects: PhasedTypecheckObject[] = [];

        public mustCaptureGlobalThis = false;

        constructor (public persistentState: PersistentGlobalTypeState) {
            this.voidType = this.persistentState.voidType;
            this.booleanType = this.persistentState.booleanType;
            this.numberType = this.persistentState.doubleType;
            this.stringType = this.persistentState.stringType;
            this.anyType = this.persistentState.anyType;
            this.nullType = this.persistentState.nullType;
            this.undefinedType = this.persistentState.undefinedType;

            this.globals = this.persistentState.dualGlobalValues;
            this.globalTypes = this.persistentState.dualGlobalTypes;
            this.ambientGlobals = this.persistentState.dualAmbientGlobalValues;
            this.ambientGlobalTypes = this.persistentState.dualAmbientGlobalTypes;
            this.gloModType = this.persistentState.mod;
            this.gloMod = this.persistentState.gloMod;
            this.wildElm = this.persistentState.wildElm;

            this.globalScope = this.persistentState.globalScope;

            this.typingContextStack = new ContextualTypingContextStack(this);
        }

        public setStyleOptions(style: StyleSettings) {
            this.styleSettings = style;
        }

        // Contextual typing
        public setContextualType(type: Type2, provisional: boolean) {
            this.typingContextStack.pushContextualType(type, provisional);
            this.currentContextualTypeContext = this.typingContextStack.getContextualType();
        }

        public unsetContextualType() {
            var lastTC = this.typingContextStack.popContextualType();
            this.currentContextualTypeContext = this.typingContextStack.getContextualType();
            return lastTC;
        }

        public hadProvisionalErrors() {
            return this.typingContextStack.hadProvisionalErrors;
        }
        public resetProvisionalErrors() {
            if (!this.typingContextStack.getContextualType()) {
                this.typingContextStack.hadProvisionalErrors = false;
            }
        }

        public typeCheckWithContextualType(contextType: Type2, provisional: boolean, condition: boolean, ast: AST2) {
            if (condition) {
                this.setContextualType(contextType, this.typingContextStack.isProvisional() || provisional);
            }
            this.typeFlow.typeCheck(ast);
            if (condition) {
                this.unsetContextualType();
            }
        }

        public resetTargetType() {
            this.currentContextualTypeContext = this.typingContextStack.getContextualType();
        }

        // Unset the current contextual type without disturbing the stack, effectively "killing" the contextual typing process
        public killCurrentContextualType() { this.currentContextualTypeContext = null; this.errorReporter.pushToErrorSink = false; }
        public hasTargetType() { return this.currentContextualTypeContext && this.currentContextualTypeContext.contextualType; }
        public getTargetTypeContext() { return this.currentContextualTypeContext; }

        public inProvisionalTypecheckMode() {
            return this.typingContextStack.isProvisional();
        }

        public getTypeCheckFinishedStatus() {
            if (this.inProvisionalTypecheckMode()) {
                return this.typingContextStack.getContextID();
            }
            return TypeCheckStatus.Finished;
        }

        public typeStatusIsFinished(status: TypeCheckStatus) {

            return status == TypeCheckStatus.Finished ||
                   (this.inProvisionalTypecheckMode() && status == this.typingContextStack.getContextID());
        }

        public addStartedPTO(pto: PhasedTypecheckObject) {
            if (this.inProvisionalTypecheckMode()) {
                this.provisionalStartedTypecheckObjects[this.provisionalStartedTypecheckObjects.length] = pto;
            }
        }

        public cleanStartedPTO() {
            for (var i = 0; i < this.provisionalStartedTypecheckObjects.length; i++) {
                if (this.provisionalStartedTypecheckObjects[i].typeCheckStatus >= this.typingContextStack.getContextID()) {
                    this.provisionalStartedTypecheckObjects[i].typeCheckStatus = TypeCheckStatus.NotStarted;
                }
            }
            this.provisionalStartedTypecheckObjects = [];
        }

        // type collection      
        public collectTypes(ast: AST2): void {
            if (ast.nodeType == NodeType.Script) {
                var script = <Script>ast;
                this.locationInfo = script.locationInfo;
            }
            var globalChain = new ScopeChain(this.gloMod, null, this.globalScope);
            var context = new TypeCollectionContext(globalChain, this);
            getAstWalkerFactory().walk(ast, preCollectTypes, postCollectTypes, null, context);
        }

        public makeArrayType(type: Type2): Type2 {
            if (type.arrayCache == null) {
                type.arrayCache = new ArrayCache();
                type.arrayCache.arrayType = new Type2();
                type.arrayCache.arrayType.elementType = type;
                type.arrayCache.arrayType.symbol = type.symbol;
            }
            return type.arrayCache.arrayType;
        }

        public getParameterList(funcDecl: FuncDecl, container: Symbol): SignatureData {
            var args = funcDecl.arguments;
            var parameterTable = null;
            var parameterBuilder = null;
            var len = args.members.length;
            var nonOptionalParams = 0;
            var result: ParameterSymbol[] = [];

            if (len > 0) {
                parameterTable = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));
                parameterBuilder = new SymbolScopeBuilder(parameterTable, null, null, null, null, container);

                for (var i = 0; i < len; i++) {
                    var parameter = <ArgDecl>args.members[i];
                    var paramDef = new ValueLocation();
                    var parameterSymbol = new ParameterSymbol(parameter.id.text, parameter.minChar,
                                                            this.locationInfo.unitIndex, paramDef);
                    parameterSymbol.declAST = parameter;
                    parameterSymbol.funcDecl = funcDecl;
                    parameter.id.sym = parameterSymbol;
                    parameter.sym = parameterSymbol;
                    paramDef.symbol = parameterSymbol;
                    paramDef.typeLink = getTypeLink(parameter.typeExpr, this, false);
                    parameterBuilder.enter(null, parameter, parameterSymbol, this.errorReporter, true, false, false); // REVIEW: Should this be entered into the private scope?
                    result[result.length] = parameterSymbol;
                    if (!parameter.isOptionalArg()) {
                        nonOptionalParams++;
                    }
                }
            }
            return { parameters: result, nonOptionalParameterCount: nonOptionalParams };
        }

        // Create a signature for a function definition
        //  (E.g., has a function body - function declarations, property declarations, lambdas)
        public createFunctionSignature(funcDecl: FuncDecl, container: Symbol, scope: SymbolScope, overloadGroupSym: Symbol, addToScope: boolean): Signature {

            var isExported = hasFlag(funcDecl.fncFlags, FncFlags.Exported | FncFlags.ClassPropertyMethodExported) || container == this.gloMod;
            var isStatic = hasFlag(funcDecl.fncFlags, FncFlags.Static);
            var isPrivate = hasFlag(funcDecl.fncFlags, FncFlags.Private);
            var isDefinition = hasFlag(funcDecl.fncFlags, FncFlags.Definition);
            var isAmbient = hasFlag(funcDecl.fncFlags, FncFlags.Ambient);
            var isConstructor = funcDecl.isConstructMember() || funcDecl.isConstructor;
            var isGlobal = container == this.gloMod;

            var signature: Signature = new Signature();
            var isLambda = funcDecl.fncFlags & FncFlags.IsFunctionExpression;

            // If a return type has been declared for the signature, set the type link.
            // Otherwise:
            //  if it's a signature, its type will be 'any'
            //  if it's a definition, the return type will be inferred  
            if (funcDecl.returnTypeAnnotation || isDefinition) {
                signature.returnType = getTypeLink(funcDecl.returnTypeAnnotation, this, false);
            }
            else {
                signature.returnType = new TypeLink();
                signature.returnType.type = this.anyType;
            }

            signature.hasVariableArgList = funcDecl.variableArgList;

            var sigData = this.getParameterList(funcDecl, container);

            signature.parameters = sigData.parameters;
            signature.nonOptionalParameterCount = sigData.nonOptionalParameterCount;

            funcDecl.signature = signature;
            signature.declAST = funcDecl;

            var useOverloadGroupSym =
                overloadGroupSym &&
                overloadGroupSym.getType() &&
                !overloadGroupSym.isAccessor() &&
                (funcDecl.isSignature() || (isAmbient == hasFlag(overloadGroupSym.flags, SymbolFlags.Ambient)));

            if (useOverloadGroupSym && isPrivate != hasFlag(overloadGroupSym.flags, SymbolFlags.Private)) {
                this.errorReporter.simpleError(funcDecl, "Public/Private visibility of overloads does not agree");
            }

            var groupType = useOverloadGroupSym ? overloadGroupSym.getType() : new Type2();

            if (isConstructor) {
                if (groupType.construct == null) {
                    groupType.construct = new SignatureGroup();
                }
                groupType.construct.addSignature(signature);
                groupType.construct.hasImplementation = !(funcDecl.isSignature());
                if (groupType.construct.hasImplementation) {
                    groupType.setHasImplementation();
                }
            }
            else if (funcDecl.isIndexerMember()) {
                if (groupType.index == null) {
                    groupType.index = new SignatureGroup();
                    groupType.index.flags |= SignatureFlags.IsIndexer;
                }

                groupType.index.addSignature(signature);
                groupType.index.hasImplementation = !(funcDecl.isSignature());
                if (groupType.index.hasImplementation) {
                    groupType.setHasImplementation();
                }
            }
            else {
                if (groupType.call == null) {
                    groupType.call = new SignatureGroup();
                }
                groupType.call.addSignature(signature);

                groupType.call.hasImplementation = !(funcDecl.isSignature());
                if (groupType.call.hasImplementation) {
                    groupType.setHasImplementation();
                }
            }

            var instanceType = groupType.instanceType;

            // Ensure that the function's symbol is properly configured
            // (If there were overloads, we'll already have a symbol, otherwise we need to create one)
            var funcName: string = null;

            // Set the function's name:
            //  In the case of anonymous or functions resulting from error
            //  correction in the parser (isMissing() == true), we do not
            //  want to set a function name, since they shouldn't be inserted
            //  into the enclosing scope

            // usedHint prevents functions bound to object literal fields from being added to the
            // enclosing scope
            var usedHint = false;
            if (funcDecl.name && !funcDecl.name.isMissing()) {
                funcName = funcDecl.name.text;
            }
            else if (funcDecl.hint) {
                funcName = funcDecl.hint;
                usedHint = true;
            }

            if (groupType.symbol == null) {
                groupType.symbol =
                    new TypeSymbol(funcName ? funcName : this.anon,
                                    funcDecl.minChar, funcDecl.limChar - funcDecl.minChar,
                                    this.locationInfo.unitIndex,
                                    groupType);
                if (!useOverloadGroupSym) {
                    groupType.symbol.declAST = funcDecl;
                }
            }

            // REVIEW: Are we missing any other flags?
            if (isStatic) {
                groupType.symbol.flags |= SymbolFlags.Static;
            }

            if (isAmbient) {
                groupType.symbol.flags |= SymbolFlags.Ambient;
            }

            if (isPrivate) {
                groupType.symbol.flags |= SymbolFlags.Private;
            }

            groupType.symbol.isMethod = funcDecl.isMethod();
            if (groupType.symbol.isMethod) {
                groupType.symbol.flags |= SymbolFlags.Property;
            }

            funcDecl.type = groupType;

            // Add the function symbol to the appropriate scope
            // if the funcDecl is a constructor, it will be added to the enclosing scope as a class
            if (!isConstructor) {
                // Add the function's symbol to its enclosing scope
                if (funcName && !isLambda && !funcDecl.isAccessor() && !usedHint) {

                    // REVIEW: We're not setting the isDecl flags for fuctions bound to object literal properties
                    // so removing the isDefiniton clause would break object literals
                    if (addToScope) {  // REVIEW: If we combine this with createFunctionDeclarationSignature, we'll need to broaden this for both decls and defs                      
                        // if it's a static method, enter directly into the container's scope
                        if (funcDecl.isMethod() && isStatic) {

                            // REVIEW: What about private statics?
                            if (!(<TypeSymbol>container).type.members.publicMembers.add(funcName, groupType.symbol)) {
                                this.errorReporter.duplicateIdentifier(funcDecl, funcName);
                            }

                            groupType.symbol.container = container;
                        } // REVIEW: Another check for overloads...
                        else if (overloadGroupSym == null || (overloadGroupSym.declAST && !(<FuncDecl>overloadGroupSym.declAST).isOverload && (container.isType()))) {
                            scope.enter(container, funcDecl, groupType.symbol, this.errorReporter, !isPrivate && (isExported || isStatic || isGlobal), false, isAmbient);
                        }
                    }
                    else if (!funcDecl.isSpecialFn()) {
                        groupType.symbol.container = container; // REVIEW: Set container for overloads or anonymous?
                    }
                }
                else if (!funcDecl.isSpecialFn()) {
                    groupType.symbol.container = container; // REVIEW: Set container for lambdas and accessors?
                }
            }

            // If, say, a call signature overload was declared before the class type was, we want to reuse
            // the type that's already been instantiated for the class type, rather than allocate a new one
            if (useOverloadGroupSym) {
                var overloadGroupType = overloadGroupSym ? overloadGroupSym.getType() : null;
                var classType = groupType;

                if (classType != overloadGroupType) {
                    if (classType.construct == null) {
                        if (overloadGroupType && overloadGroupType.construct) {
                            classType.construct = overloadGroupType.construct;
                        }
                        else {
                            classType.construct = new SignatureGroup();
                        }
                    }
                    else if (overloadGroupType) {
                        if (overloadGroupType.construct) {
                            classType.construct.signatures.concat(overloadGroupType.construct.signatures);
                        }
                    }

                    // sync call and index signatures as well, but don't allocate should they not
                    // already exist
                    if (overloadGroupType) {
                        if (classType.call == null) {
                            classType.call = overloadGroupType.call;
                        }
                        else if (overloadGroupType.call) {
                            classType.call.signatures.concat(overloadGroupType.call.signatures);
                        }

                        // if the function is not static, we need to add any call overloads onto the
                        // instance type's call signature list
                        if (!isStatic) {

                            if (classType.instanceType == null) {
                                classType.instanceType = overloadGroupType.instanceType;
                            }

                            var instanceType = classType.instanceType;

                            if (instanceType) {
                                if (instanceType.call == null) {
                                    instanceType.call = overloadGroupType.call;
                                }
                                else if (overloadGroupType.call) {
                                    instanceType.call.signatures.concat(overloadGroupType.call.signatures);
                                }
                            }
                        }

                        if (classType.index == null) {
                            classType.index = overloadGroupType.index;
                        }
                        else if (overloadGroupType.index) {
                            classType.index.signatures.concat(overloadGroupType.index.signatures);
                        }
                    }
                }
            }

            return signature;
        }

        // Creates a new symbol for an accessor property
        // Note that funcDecl.type.symbol and fgSym may not be the same (E.g., in the case of type collection)
        public createAccessorSymbol(funcDecl: FuncDecl, fgSym: Symbol, enclosingClass: Type2, addToMembers: boolean, isClassProperty: boolean, scope: SymbolScope, container: Symbol) {
            var accessorSym: FieldSymbol = null
            var sig = funcDecl.signature;
            var nameText = funcDecl.name.text;
            var isStatic = hasFlag(funcDecl.fncFlags, FncFlags.Static);
            var isPrivate = hasFlag(funcDecl.fncFlags, FncFlags.Private);

            if (fgSym == null) {
                var field = new ValueLocation();
                accessorSym = new FieldSymbol(nameText, funcDecl.minChar, this.locationInfo.unitIndex, false, field);
                field.symbol = accessorSym;
                accessorSym.declAST = funcDecl; // REVIEW: need to reset for getters and setters

                if (hasFlag(funcDecl.fncFlags, FncFlags.GetAccessor)) {
                    if (accessorSym.getter) {
                        this.errorReporter.simpleError(funcDecl, "Redeclaration of property getter");
                    }
                    accessorSym.getter = <TypeSymbol>sig.declAST.type.symbol;
                }
                else {
                    if (accessorSym.setter) {
                        this.errorReporter.simpleError(funcDecl, "Redeclaration of property setter");
                    }
                    accessorSym.setter = <TypeSymbol>sig.declAST.type.symbol;
                }

                field.typeLink = getTypeLink(null, this, false);

                // if it's static, enter it into the class's member list directly
                if (addToMembers) {
                    if (enclosingClass) {
                        if (!enclosingClass.members.publicMembers.add(nameText, accessorSym)) {
                            this.errorReporter.duplicateIdentifier(funcDecl, accessorSym.name);
                        }
                        accessorSym.container = enclosingClass.symbol;
                    }
                    else {
                        this.errorReporter.simpleError(funcDecl, "Accessor property may not be added in this context");
                    }
                }
                else {
                    scope.enter(container, funcDecl, accessorSym, this.errorReporter, !isPrivate || isStatic, false, false);
                }

                // We set the flags here, instead of below, because the accessor symbol does not yet have a type
                if (isClassProperty) {
                    accessorSym.flags |= SymbolFlags.Property;
                }
                if (isStatic) {
                    accessorSym.flags |= SymbolFlags.Static;
                }

                if (isPrivate) {
                    accessorSym.flags |= SymbolFlags.Private;
                }
                else {
                    accessorSym.flags |= SymbolFlags.Public;
                }
            }
            else {
                accessorSym = <FieldSymbol>(<any>fgSym);

                if (isPrivate != hasFlag(accessorSym.flags, SymbolFlags.Private)) {
                    this.errorReporter.simpleError(funcDecl, "Getter and setter accessors do not agree in visibility");
                }

                if (hasFlag(funcDecl.fncFlags, FncFlags.GetAccessor)) {
                    if (accessorSym.getter) {
                        this.errorReporter.simpleError(funcDecl, "Redeclaration of property getter");
                    }
                    accessorSym.getter = <TypeSymbol>funcDecl.type.symbol;
                }
                else {
                    if (accessorSym.setter) {
                        this.errorReporter.simpleError(funcDecl, "Redeclaration of property setter");
                    }
                    accessorSym.setter = <TypeSymbol>funcDecl.type.symbol;
                }
            }

            return accessorSym;
        }

        public addBases(resultScope: SymbolAggregateScope, type: Type2, baseContext: { base: string; baseId: number; }): void {
            resultScope.addParentScope(new SymbolTableScope(type.members, type.ambientMembers, type.getAllEnclosedTypes(), type.getAllAmbientEnclosedTypes(), type.symbol));
            var i = 0;
            var parent: Type2;
            if (type.extendsList) {
                for (var len = type.extendsList.length; i < len; i++) {
                    parent = type.extendsList[i];
                    if (baseContext.baseId == parent.typeID) {
                        this.errorReporter.reportErrorFromSym(parent.symbol, "Type '" + baseContext.base + "' is recursively referenced as a base class of itself");
                        parent.symbol.flags |= SymbolFlags.RecursivelyReferenced;
                        break;
                    }
                    this.addBases(resultScope, parent, baseContext);
                }
            }
        }

        public scopeOf(type: Type2): SymbolScope {
            var resultScope = new SymbolAggregateScope(type.symbol);
            var baseContext = { base: type.symbol && type.symbol.name ? type.symbol.name : "{}", baseId: type.typeID };
            this.addBases(resultScope, type, baseContext);
            return resultScope;
        }

        public lookupMemberTypeSymbol(containingType: Type2, name: string): Symbol {
            var symbol: Symbol = null;
            if (containingType.containedScope) {
                symbol = containingType.containedScope.find(name, false, true);
            }
            else if (containingType.members) {
                symbol = containingType.members.allMembers.lookup(name);

                if (symbol == null && containingType.ambientMembers) {
                    symbol = containingType.ambientMembers.allMembers.lookup(name);
                }
            }
            if (symbol == null) {
                var typeMembers = containingType.getAllEnclosedTypes();
                var ambientTypeMembers = containingType.getAllAmbientEnclosedTypes();
                if (typeMembers) {
                    symbol = typeMembers.allMembers.lookup(name);

                    if (symbol == null && ambientTypeMembers) {
                        symbol = ambientTypeMembers.allMembers.lookup(name);
                    }

                }
            }
            if (symbol && symbol.isType()) {
                return symbol;
            }
            else {
                return null;
            }
        }

        public findSymbolForDynamicModule(idText: string, currentFileName: string, search: (id: string) =>Symbol): Symbol {
            var originalIdText = idText;
            var symbol = search(idText);
           
            if (symbol == null) {
                // perhaps it's a dynamic module?
                if (!symbol) {
                    idText = swapQuotes(originalIdText);
                    symbol = search(idText);
                }

                // Check the literal path first
                if (!symbol) {
                    idText = stripQuotes(originalIdText) + ".ts";
                    symbol = search(idText);
                }

                if (!symbol) {
                    idText = stripQuotes(originalIdText) + ".str";
                    symbol = search(idText);
                }

                // Check check for .d.str
                if (!symbol) {
                    idText = stripQuotes(originalIdText) + ".d.ts";
                    symbol = search(idText);
                }

                if (!symbol) {
                    idText = stripQuotes(originalIdText) + ".d.str";
                    symbol = search(idText);
                }

                // If the literal path doesn't work, begin the search
                if (!symbol && !isRelative(originalIdText)) {
                    // check the full path first, as this is the most likely scenario
                    idText = originalIdText;

                    var strippedIdText = stripQuotes(idText);

                    // REVIEW: Technically, we shouldn't have to normalize here - we should normalize in addUnit.
                    // Still, normalizing here alows any language services to be free of assumptions
                    var path = getRootFilePath(switchToForwardSlashes(currentFileName));

                    while (symbol == null && path != "") {
                        idText = normalizePath(path + strippedIdText + ".ts");
                        symbol = search(idText);

                        // check for .str
                        if (symbol == null) {
                            idText = changePathToSTR(idText);
                            symbol = search(idText);
                        }

                        // check for .d.ts
                        if (symbol == null) {
                            idText = changePathToDTS(idText);
                            symbol = search(idText);
                        }

                        // check for .d.str
                        if (symbol == null) {
                            idText = changePathToDSTR(idText);
                            symbol = search(idText);
                        }

                        if (symbol == null) {
							if(path === '/') {
								path = '';
							} else {
								path = normalizePath(path + "..");
								path = path && path != '/' ? path + '/' : path;
							}
                        }
                    }
                }
            }

            return symbol;
        }

        public resolveTypeMember(scope: SymbolScope, dotNode: BinaryExpression2): Type2 {
            var lhs = dotNode.operand1;
            var rhs = dotNode.operand2;
            var resultType = this.anyType;
            var lhsType = this.anyType;

            if (lhs && rhs && (rhs.nodeType == NodeType.Name)) {
                if (lhs.nodeType == NodeType.Dot) {
                    lhsType = this.resolveTypeMember(scope, <BinaryExpression2>lhs);
                }
                else if (lhs.nodeType == NodeType.Name) {
                    var identifier = <Identifier2>lhs;
                    var symbol = scope.find(identifier.text, false, true);
                    if (symbol == null) {
                        this.errorReporter.unresolvedSymbol(identifier, identifier.actualText);
                    }
                    else if (symbol.isType()) {

                        var typeSymbol = <TypeSymbol> symbol;

                        if (typeSymbol.aliasLink && !typeSymbol.type && typeSymbol.aliasLink.alias.nodeType == NodeType.Name) {
                            var modPath = (<Identifier2>typeSymbol.aliasLink.alias).text;
                            var modSym = this.findSymbolForDynamicModule(modPath, this.locationInfo.filename, (id) => scope.find(id, false, true));
                            if (modSym) {
                                typeSymbol.type = modSym.getType();
                            }
                        }

                        if (optimizeModuleCodeGen && symbol) {
                            var symType = symbol.getType();
                            // Once the type has been referenced outside of a type ref position, there's
                            // no going back                        
                            if (symType && typeSymbol.aliasLink && typeSymbol.onlyReferencedAsTypeRef) {

                                var modDecl = <ModuleDeclaration>symType.symbol.declAST;
                                if (modDecl && hasFlag(modDecl.modFlags, ModuleFlags.IsDynamic)) {
                                    typeSymbol.onlyReferencedAsTypeRef = !this.resolvingBases;
                                }
                            }
                        }
                        if (!symbol.visible(scope, this)) {
                            this.errorReporter.simpleError(lhs, "The symbol '" + identifier.actualText + "' is not visible at this point");
                        }
                        lhsType = symbol.getType();

                        identifier.sym = symbol;
                    }
                    else {
                        this.errorReporter.simpleError(lhs, "Expected type");
                    }

                }

                // if the LHS type is a module alias, we won't be able to resolve it until
                // typecheck type.  If this is called during binding, lhsType will be null
                if (!lhsType) {
                    lhsType = this.anyType;
                }

                if (lhsType != this.anyType) {
                    var rhsIdentifier = <Identifier2>rhs;
                    var resultSymbol = this.lookupMemberTypeSymbol(lhsType, rhsIdentifier.text);
                    if (resultSymbol == null) {
                        resultType = this.anyType;
                        this.errorReporter.simpleError(dotNode, "Expected type");
                    }
                    else {
                        resultType = resultSymbol.getType();
                        if (!resultSymbol.visible(scope, this)) {
                            this.errorReporter.simpleError(lhs, "The symbol '" + (<Identifier2>rhs).actualText + "' is not visible at this point");
                        }
                    }
                    rhsIdentifier.sym = resultType.symbol;
                }
            }
            if (resultType.isClass()) {
                resultType = resultType.instanceType;
            }
            return resultType;
        }

        public resolveFuncDecl(funcDecl: FuncDecl, scope: SymbolScope,
            fgSym: TypeSymbol): Symbol {
            var functionGroupSymbol = this.createFunctionSignature(funcDecl, scope.container, scope, fgSym, false).declAST.type.symbol;
            var signatures: Signature[];
            if (funcDecl.isConstructMember()) {
                signatures = functionGroupSymbol.type.construct.signatures;
            }
            else if (funcDecl.isIndexerMember()) {
                signatures = functionGroupSymbol.type.getInstanceType().index.signatures;
            }
            else {
                signatures = functionGroupSymbol.type.call.signatures;
            }

            var signature = signatures[signatures.length - 1];
            var len = signature.parameters.length;
            for (var i = 0; i < len; i++) {
                var paramSym: ParameterSymbol = signature.parameters[i];
                this.resolveTypeLink(scope, paramSym.parameter.typeLink, true);
            }

            // If a vararg list is present, check that the type is an array type
            if (len && funcDecl.variableArgList) {
                if (!signature.parameters[len - 1].parameter.typeLink.type.elementType) {
                    this.errorReporter.simpleErrorFromSym(signature.parameters[len - 1].parameter.symbol, "... parameter must have array type");
                    signature.parameters[len - 1].parameter.typeLink.type = this.makeArrayType(signature.parameters[len - 1].parameter.typeLink.type);
                }
            }
            this.resolveTypeLink(scope, signature.returnType,
                            funcDecl.isSignature());
            return functionGroupSymbol;
        }

        public resolveVarDecl(varDecl: VarDecl, scope: SymbolScope): Symbol {
            var field = new ValueLocation();
            var fieldSymbol =
                new FieldSymbol(varDecl.id.text, varDecl.minChar, this.locationInfo.unitIndex,
                                (varDecl.varFlags & VarFlags.Readonly) == VarFlags.None,
                                field);
            fieldSymbol.transferVarFlags(varDecl.varFlags);
            field.symbol = fieldSymbol;
            fieldSymbol.declAST = varDecl;
            field.typeLink = getTypeLink(varDecl.typeExpr, this, varDecl.init == null);
            this.resolveTypeLink(scope, field.typeLink, true);
            varDecl.sym = fieldSymbol;
            varDecl.type = field.typeLink.type;
            return fieldSymbol;
        }

        public resolveTypeLink(scope: SymbolScope, typeLink: TypeLink, supplyVar: boolean): void {
            var arrayCount = 0;
            if (typeLink.type == null) {
                var ast: AST2 = typeLink.ast;
                if (ast) {
                    while (typeLink.type == null) {
                        switch (ast.nodeType) {
                            case NodeType.Name:
                                var identifier = <Identifier2>ast;
                                var symbol = scope.find(identifier.text, false, true);
                                if (symbol == null) {
                                    typeLink.type = this.anyType;
                                    this.errorReporter.unresolvedSymbol(identifier, identifier.actualText);
                                }
                                else if (symbol.isType()) {
                                    if (!symbol.visible(scope, this)) {
                                        this.errorReporter.simpleError(ast, "The symbol '" + identifier.actualText + "' is not visible at this point");
                                    }
                                    identifier.sym = symbol;
                                    typeLink.type = symbol.getType();
                                    if (typeLink.type) {
                                        if (typeLink.type.isClass()) {
                                            typeLink.type = typeLink.type.instanceType;
                                        }
                                    }
                                    else {
                                        typeLink.type = this.anyType;
                                    }
                                }
                                else {
                                    typeLink.type = this.anyType;
                                    this.errorReporter.simpleError(ast, "Expected type");
                                }
                                break;
                            case NodeType.Dot:
                                typeLink.type = this.resolveTypeMember(scope, <BinaryExpression2>ast);
                                break;
                            case NodeType.TypeRef:
                                var typeRef = <TypeReference>ast;
                                arrayCount = typeRef.arrayCount;
                                ast = typeRef.term;
                                if (ast == null) {
                                    typeLink.type = this.anyType;
                                }
                                break;
                            case NodeType.InterfaceDeclaration:
                                var interfaceDecl = <InterfaceDeclaration>ast;
                                var interfaceType = new Type2();
                                var interfaceSymbol = new TypeSymbol((<Identifier2>interfaceDecl.name).text,
                                                                   ast.minChar,
                                                                   ast.limChar - ast.minChar,
                                                                   this.locationInfo.unitIndex,
                                                                   interfaceType);
                                interfaceType.symbol = interfaceSymbol;
                                interfaceType.members = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));

                                interfaceType.containedScope =
                                    new SymbolTableScope(interfaceType.members, null, null, null,
                                                         interfaceSymbol);

                                interfaceType.containedScope.container = interfaceSymbol;
                                interfaceType.memberScope = interfaceType.containedScope;

                                var memberList = <ASTList2>interfaceDecl.members;
                                var props: AST2[] = memberList.members;
                                var propsLen = props.length;

                                for (var j = 0; j < propsLen; j++) {
                                    var propDecl = props[j];
                                    var propSym: Symbol = null;
                                    var addMember = true;
                                    var id: Identifier2 = null;
                                    if (propDecl.nodeType == NodeType.FuncDecl) {
                                        var funcDecl = <FuncDecl>propDecl;
                                        id = funcDecl.name;
                                        propSym = interfaceType.members.allMembers.lookup(funcDecl.getNameText());
                                        addMember = (propSym == null);
                                        if (funcDecl.isSpecialFn()) {
                                            addMember = false;
                                            propSym = this.resolveFuncDecl(funcDecl, scope, interfaceSymbol);
                                        }
                                        else {
                                            propSym = this.resolveFuncDecl(funcDecl, scope, <TypeSymbol>propSym);
                                        }
                                        funcDecl.type = (<TypeSymbol>propSym).type;
                                    }
                                    else {
                                        id = (<VarDecl>propDecl).id;
                                        propSym = this.resolveVarDecl(<VarDecl>propDecl, scope);

                                        // Don't add the member if it was missing a name.  This 
                                        // generally just leads to cascading errors that make things
                                        // more confusing for the user.
                                        addMember = !id.isMissing();
                                    }

                                    if (addMember) {
                                        if (id && hasFlag(id.flags, ASTFlags.OptionalName)) {
                                            propSym.flags |= SymbolFlags.Optional;
                                        }
                                        if (!interfaceType.members.allMembers.add(propSym.name, propSym)) {
                                            this.errorReporter.duplicateIdentifier(ast, propSym.name);
                                        }
                                    }
                                }

                                ast.type = interfaceType;
                                typeLink.type = interfaceType;

                                break;
                            case NodeType.FuncDecl:
                                var tsym = <TypeSymbol>this.resolveFuncDecl(<FuncDecl>ast, scope, null);
                                typeLink.type = tsym.type;
                                break;
                            default:
                                typeLink.type = this.anyType;
                                this.errorReporter.simpleError(ast, "Expected type");
                                break;
                        }
                    }
                }
                for (var count = arrayCount; count > 0; count--) {
                    typeLink.type = this.makeArrayType(typeLink.type);
                }
                if (supplyVar && (typeLink.type == null)) {
                    typeLink.type = this.anyType;
                }
                if (typeLink.ast) {
                    typeLink.ast.type = typeLink.type;
                }
            }
            // else wait for type inference
        }

        public resolveBaseTypeLink(typeLink: TypeLink, scope: SymbolScope) {
            this.resolvingBases = true;
            this.resolveTypeLink(scope, typeLink, true);
            this.resolvingBases = false;
            var extendsType: Type2 = null;
            if (typeLink.type.isClass()) {
                extendsType = typeLink.type.instanceType;
            }
            else {
                extendsType = typeLink.type;
            }

            return extendsType;
        }

        public findMostApplicableSignature(signatures: ApplicableSignature[], args: ASTList2): { sig: Signature; ambiguous: boolean; } {

            if (signatures.length == 1) {
                return { sig: signatures[0].signature, ambiguous: false };
            }

            var best: ApplicableSignature = signatures[0];
            var Q: ApplicableSignature = null;
            var AType: Type2 = null;
            var PType: Type2 = null;
            var QType: Type2 = null;
            var ambiguous = false;

            for (var qSig = 1; qSig < signatures.length; qSig++) {
                Q = signatures[qSig];
                var i = 0;
                // find the better conversion
                for (i = 0; args && i < args.members.length; i++) {
                    AType = args.members[i].type;
                    PType = i < best.signature.parameters.length ? best.signature.parameters[i].getType() : best.signature.parameters[best.signature.parameters.length - 1].getType().elementType;
                    QType = i < Q.signature.parameters.length ? Q.signature.parameters[i].getType() : Q.signature.parameters[Q.signature.parameters.length - 1].getType().elementType;

                    if (this.typesAreIdentical(PType, QType)) {
                        continue;
                    }
                    else if (this.typesAreIdentical(AType, PType)) {
                        break;
                    }
                    else if (this.typesAreIdentical(AType, QType)) {
                        best = Q;
                        break;
                    }
                    else if (this.sourceIsSubtypeOfTarget(PType, QType)) {
                        break;
                    }
                    else if (this.sourceIsSubtypeOfTarget(QType, PType)) {
                        best = Q;
                        break;
                    }
                    else if (Q.hadProvisionalErrors) {
                        break;
                    }
                    else if (best.hadProvisionalErrors) {
                        best = Q;
                        break;
                    }
                }

                if (!args || i == args.members.length) {
                    var collection: ITypeCollection = {
                        getLength: () => { return 2; },
                        setTypeAtIndex: (index: number, type: Type2) => { }, // no contextual typing here, so no need to do anything
                        getTypeAtIndex: (index: number) => { return index ? Q.signature.returnType.type : best.signature.returnType.type; } // we only want the "second" type - the "first" is skipped
                    }
                    var bct = this.findBestCommonType(best.signature.returnType.type, null, collection, true);
                    ambiguous = !bct;
                }
                else {
                    ambiguous = false;
                }
            }

            return { sig: best.signature, ambiguous: ambiguous };
        }

        public getApplicableSignatures(signatures: Signature[], args: ASTList2, comparisonInfo: TypeComparisonInfo): ApplicableSignature[] {

            var applicableSigs: ApplicableSignature[] = [];
            var memberType: Type2 = null;
            var miss = false;
            var cxt: ContextualTypeContext = null;
            var hadProvisionalErrors = false;

            for (var i = 0; i < signatures.length; i++) {
                miss = false;

                for (var j = 0; j < args.members.length; j++) {

                    if (j >= signatures[i].parameters.length) {
                        continue;
                    }
                    memberType = signatures[i].parameters[j].getType();

                    // account for varargs
                    if (signatures[i].declAST.variableArgList && (j >= signatures[i].nonOptionalParameterCount - 1) && memberType.isArray()) {
                        memberType = memberType.elementType;
                    }

                    if (memberType == this.anyType) {
                        continue;
                    }
                    else if (args.members[j].nodeType == NodeType.FuncDecl) {
                        if (this.typeFlow.functionInterfaceType && memberType == this.typeFlow.functionInterfaceType) {
                            continue;
                        }
                        if (!this.canContextuallyTypeFunction(memberType, <FuncDecl>args.members[j], true)) {
                            // if it's just annotations that are blocking us, typecheck the function and add it to the list
                            if (this.canContextuallyTypeFunction(memberType, <FuncDecl>args.members[j], false)) {
                                this.typeFlow.typeCheck(args.members[j]);
                                if (!this.sourceIsAssignableToTarget(args.members[j].type, memberType, comparisonInfo)) {
                                    break;
                                }
                            }
                            else {
                                break;
                            }
                        }
                        else { // if it can be contextually typed, try it out...

                            this.typeCheckWithContextualType(memberType, true, true, args.members[j]);
                            this.cleanStartedPTO();
                            hadProvisionalErrors = this.hadProvisionalErrors();

                            if (!this.sourceIsAssignableToTarget(args.members[j].type, memberType, comparisonInfo)) {
                                if (comparisonInfo) {
                                    comparisonInfo.setMessage("Could not apply type '" + memberType.getTypeName() + "' to argument " + (j + 1) + ", which is of type '" + args.members[j].type.getTypeName() + "'");
                                }
                                miss = true;
                            }

                            // clean the type
                            //if (hadProvisionalErrors) {
                            //    cxt = this.currentContextualTypeContext;
                            //    this.typeCheckWithContextualType(null, true, true, args.members[j]);
                            //    if (!this.sourceIsAssignableToTarget(args.members[j].type, memberType)) {
                            //        miss = true;
                            //    }
                            //    this.cleanStartedPTO();
                            //}

                            this.resetProvisionalErrors();
                            if (miss) {
                                break;
                            }
                        }
                    }
                    else if (args.members[j].nodeType == NodeType.ObjectLit) {
                        // now actually attempt to typecheck as the contextual type
                        if (this.typeFlow.objectInterfaceType && memberType == this.typeFlow.objectInterfaceType) {
                            continue;
                        }

                        this.typeCheckWithContextualType(memberType, true, true, args.members[j]);
                        this.cleanStartedPTO();
                        hadProvisionalErrors = this.hadProvisionalErrors(); 

                        if (!this.sourceIsAssignableToTarget(args.members[j].type, memberType, comparisonInfo)) {
                            if (comparisonInfo) {
                                comparisonInfo.setMessage("Could not apply type '" + memberType.getTypeName() + "' to argument " + (j + 1) + ", which is of type '" + args.members[j].type.getTypeName() + "'");
                            }
                            miss = true;
                        }

                        // clean the type
                        //if (hadProvisionalErrors) {
                        //    this.typeCheckWithContextualType(null, true, true, args.members[j]);

                        //    // is the "cleaned" type even assignable?
                        //    if (!this.sourceIsAssignableToTarget(args.members[j].type, memberType)) {
                        //        miss = true;
                        //    }

                        //    this.cleanStartedPTO();
                        //}

                        this.resetProvisionalErrors();
                        if (miss) {
                            break;
                        }
                    }
                    else if (args.members[j].nodeType == NodeType.ArrayLit) {
                        // attempt to contextually type the array literal
                        if (this.typeFlow.arrayInterfaceType && memberType == this.typeFlow.arrayInterfaceType) {
                            continue;
                        }

                        this.typeCheckWithContextualType(memberType, true, true, args.members[j]);
                        this.cleanStartedPTO();
                        hadProvisionalErrors = this.hadProvisionalErrors(); 

                        if (!this.sourceIsAssignableToTarget(args.members[j].type, memberType, comparisonInfo)) {
                            if (comparisonInfo) {
                                comparisonInfo.setMessage("Could not apply type '" + memberType.getTypeName() + "' to argument " + (j + 1) + ", which is of type '" + args.members[j].type.getTypeName() + "'");
                            }
                            break;
                        }

                        // clean the type
                        //if (hadProvisionalErrors) {
                        //    this.typeCheckWithContextualType(null, true, true, args.members[j]);
                        //    if (!this.sourceIsAssignableToTarget(args.members[j].type, memberType)) {
                        //        miss = true;
                        //    }

                        //    this.cleanStartedPTO();
                        //}

                        this.resetProvisionalErrors();
                        if (miss) {
                            break;
                        }
                    }
                }

                if (j == args.members.length) {
                    applicableSigs[applicableSigs.length] = { signature: signatures[i], hadProvisionalErrors: hadProvisionalErrors };
                }
                hadProvisionalErrors = false;
            }

            return applicableSigs;
        }

        public canContextuallyTypeFunction(candidateType: Type2, funcDecl: FuncDecl, beStringent: boolean): boolean {

            // in these cases, we do not attempt to apply a contextual type
            //  RE: isInlineCallLiteral - if the call target is a function literal, we don't want to apply the target type
            //  to its body - instead, it should be applied to its return type
            if (funcDecl.isParenthesized ||
                funcDecl.isMethod() ||
                beStringent && funcDecl.returnTypeAnnotation ||
                funcDecl.isInlineCallLiteral) {
                return false;
            }

            beStringent = beStringent || (this.typeFlow.functionInterfaceType == candidateType);

            // At this point, if we're not being stringent, there's no need to check for multiple call sigs
            // or count parameters - we just want to unblock typecheck
            if (!beStringent) {
                return true;
            }

            // If we're coming from an in-scope typecheck, lambdas may not have had function signatures created for them
            // REVIEW: Should we search out the overload group here?
            if (!funcDecl.signature) {
                this.createFunctionSignature(funcDecl, this.typeFlow.scope.container, this.typeFlow.scope, null, null);
                this.typeFlow.typeCheck(funcDecl);
            }

            var signature = funcDecl.signature;
            var paramLen = signature.parameters.length;

            // Check that the argument declarations have no type annotations
            for (var i = 0; i < paramLen; i++) {
                var param = signature.parameters[i];
                var symbol = <ParameterSymbol>param;
                var argDecl = <ArgDecl>symbol.declAST;

                // REVIEW: a valid typeExpr is a requirement for varargs,
                // so we may want to revise our invariant
                if (beStringent && argDecl.typeExpr) {
                    return false;
                }
            }

            if (candidateType.construct && candidateType.call) {
                return false;
            }

            var candidateSigs = candidateType.construct ? candidateType.construct : candidateType.call;

            if (!candidateSigs || candidateSigs.signatures.length > 1) {
                return false;
            }

            // if we're here, the contextual type can be applied to the function
            return true;
        }

        public canContextuallyTypeObjectLiteral(targetType: Type2, objectLit: UnaryExpression2): boolean {

            if (targetType == this.typeFlow.objectInterfaceType) {
                return true;
            }

            var memberDecls = <ASTList2>objectLit.operand;

            if (!(memberDecls && targetType.memberScope)) {
                return false;
            }

            var id: AST2 = null;
            var targetMember: Symbol = null;
            var text = "";
            var foundSyms = {};

            // Check that each property in the object literal is present in the target
            // type
            for (var i = 0; i < memberDecls.members.length; i++) {
                id = (<BinaryExpression2>memberDecls.members[i]).operand1;

                if (id.nodeType == NodeType.Name) {
                    text = (<Identifier2>id).text;
                }
                else if (id.nodeType == NodeType.QString) {
                    // TODO: set text to unescaped string
                    var idText = (<StringLiteral>id).text;
                    text = idText.substring(1, idText.length - 1);
                }
                else {
                    return false;
                }

                targetMember = targetType.memberScope.find(text, true, false);

                if (!targetMember) {
                    return false;
                }

                foundSyms[text] = true;
            }

            // Check that all members in the target type are present in the object literal
            var targetMembers = targetType.memberScope.getAllValueSymbolNames(true);

            for (var i = 0; i < targetMembers.length; i++) {
                var memberName = targetMembers[i];
                var memberSym = targetType.memberScope.find(memberName, true, false);

                if (!foundSyms[targetMembers[i]] &&
                    !hasFlag(memberSym.flags, SymbolFlags.Optional)) {
                    return false;
                }
            }

            return true;
        }

        public widenType(t: Type2) {
            if (t == this.undefinedType || t == this.nullType) { // REVIEW: not isNullOrUndefinedType for perf reasons
                return this.anyType;
            }

            return t;
        }

        public isNullOrUndefinedType(t: Type2) {
            return t == this.undefinedType || t == this.nullType;
        }

        public findBestCommonType(initialType: Type2, targetType: Type2, collection: ITypeCollection, acceptVoid:boolean, comparisonInfo?: TypeComparisonInfo) {
            var i = 0;
            var len = collection.getLength();
            var nlastChecked = 0;
            var bestCommonType = initialType;

            if (targetType) {
                bestCommonType = bestCommonType ? bestCommonType.mergeOrdered(targetType, this, acceptVoid) : targetType;
            }

            // it's important that we set the convergence type here, and not in the loop,
            // since the first element considered may be the contextual type
            var convergenceType: Type2 = bestCommonType;

            while (nlastChecked < len) {

                for (i = 0; i < len; i++) {

                    // no use in comparing a type against itself
                    if (i == nlastChecked) {
                        continue;
                    }

                    if (convergenceType && (bestCommonType = convergenceType.mergeOrdered(collection.getTypeAtIndex(i), this, acceptVoid, comparisonInfo))) {
                        convergenceType = bestCommonType;
                    }

                    if (bestCommonType == this.anyType || bestCommonType == null) {
                        break;
                    }
                    else if (targetType) { // set the element type to the target type
                        collection.setTypeAtIndex(i, targetType);
                    }
                }

                // use the type if we've agreed upon it
                if (convergenceType && bestCommonType) {
                    break;
                }

                nlastChecked++;
                if (nlastChecked < len) {
                    convergenceType = collection.getTypeAtIndex(nlastChecked);
                }
            }

            return acceptVoid ? bestCommonType : (bestCommonType == this.voidType ? null : bestCommonType);
        }

        // Type Identity

        public typesAreIdentical(t1: Type2, t2: Type2) {

            // This clause will cover both primitive types (since the type objects are shared),
            // as well as shared brands
            if (t1 == t2) {
                return true;
            }

            if (!t1 || !t2) {
                return false;
            }

            if (t1.isClass() || t1.isClassInstance()) {
                return false;
            }

            var comboId = (t2.typeID << 16) | t1.typeID;

            if (this.identicalCache[comboId]) {
                return true;
            }

            // If one is an enum, and they're not the same type, they're not identical
            if ((t1.typeFlags & TypeFlags.IsEnum) || (t2.typeFlags & TypeFlags.IsEnum)) {
                return false;
            }

            if (t1.isArray() || t2.isArray()) {
                if (!(t1.isArray() && t2.isArray())) {
                    return false;
                }
                this.identicalCache[comboId] = false;
                var ret = this.typesAreIdentical(t1.elementType, t2.elementType);
                if (ret) {
                    this.subtypeCache[comboId] = true;
                }
                else {
                    this.subtypeCache[comboId] = undefined;
                }

                return ret;
            }

            if (t1.primitiveTypeClass != t2.primitiveTypeClass) {
                return false;
            }

            this.identicalCache[comboId] = false;

            // properties are identical in name, optionality, and type
            // REVIEW: TypeChanges - The compiler does not currently check against the members of parent types!
            // REVIEW: TypeChanges - What about ambientMembers?
            if (t1.memberScope && t2.memberScope) {
                var t1MemberKeys = t1.memberScope.getAllValueSymbolNames(true).sort();
                var t2MemberKeys = t2.memberScope.getAllValueSymbolNames(true).sort();

                if (t1MemberKeys.length != t2MemberKeys.length) {
                    this.identicalCache[comboId] = undefined;
                    return false;
                }

                var t1MemberSymbol: Symbol = null;
                var t2MemberSymbol: Symbol = null;

                var t1MemberType: Type2 = null;
                var t2MemberType: Type2 = null;

                for (var iMember = 0; iMember < t1MemberKeys.length; iMember++) {
                    if (t1MemberKeys[iMember] != t2MemberKeys[iMember]) {
                        this.identicalCache[comboId] = undefined;
                        return false;
                    }

                    t1MemberSymbol = <Symbol>t1.memberScope.find(t1MemberKeys[iMember], false, false);
                    t2MemberSymbol = <Symbol>t2.memberScope.find(t2MemberKeys[iMember], false, false);

                    if ((t1MemberSymbol.flags & SymbolFlags.Optional) != (t2MemberSymbol.flags & SymbolFlags.Optional)) {
                        this.identicalCache[comboId] = undefined;
                        return false;
                    }

                    t1MemberType = t1MemberSymbol.getType();
                    t2MemberType = t2MemberSymbol.getType();

                    // catch the mutually recursive or cached cases
                    if (t1MemberType && t2MemberType && (this.identicalCache[(t2MemberType.typeID << 16) | t1MemberType.typeID] != undefined)) {
                        continue;
                    }

                    if (!this.typesAreIdentical(t1MemberType, t2MemberType)) {
                        this.identicalCache[comboId] = undefined;
                        return false;
                    }
                }
            }
            else if (t1.memberScope || t2.memberScope) {
                this.identicalCache[comboId] = undefined;
                return false;
            }

            if (!this.signatureGroupsAreIdentical(t1.call, t2.call)) {
                this.identicalCache[comboId] = undefined;
                return false;
            }

            if (!this.signatureGroupsAreIdentical(t1.construct, t2.construct)) {
                this.identicalCache[comboId] = undefined;
                return false;
            }

            if (!this.signatureGroupsAreIdentical(t1.index, t2.index)) {
                this.identicalCache[comboId] = undefined;
                return false;
            }

            this.identicalCache[comboId] = true;
            return true;
        }

        public signatureGroupsAreIdentical(sg1: SignatureGroup, sg2: SignatureGroup) {

            // covers the null case
            if (sg1 == sg2) {
                return true;
            }

            // covers the mixed-null case
            if (!sg1 || !sg2) {
                return false;
            }

            if (sg1.signatures.length != sg2.signatures.length) {
                return false;
            }

            var sig1: Signature = null;
            var sig2: Signature = null;
            var sigsMatch = false;

            // The signatures in the signature group may not be ordered...
            // REVIEW: Should definition signatures be required to be identical as well?
            for (var iSig1 = 0; iSig1 < sg1.signatures.length; iSig1++) {
                sig1 = sg1.signatures[iSig1];

                for (var iSig2 = 0; iSig2 < sg2.signatures.length; iSig2++) {
                    sig2 = sg2.signatures[iSig2];

                    if (this.signaturesAreIdentical(sig1, sig2)) {
                        sigsMatch = true;
                        break;
                    }
                }

                if (sigsMatch) {
                    sigsMatch = false;
                    continue;
                }

                // no match found for a specific signature
                return false;
            }

            return true;
        }

        public signaturesAreIdentical(s1: Signature, s2: Signature) {

            if (s1.hasVariableArgList != s2.hasVariableArgList) {
                return false;
            }

            if (s1.nonOptionalParameterCount != s2.nonOptionalParameterCount) {
                return false;
            }

            if (s1.parameters.length != s2.parameters.length) {
                return false;
            }

            if (!this.typesAreIdentical(s1.returnType.type, s2.returnType.type)) {
                return false;
            }

            for (var iParam = 0; iParam < s1.parameters.length; iParam++) {
                if (!this.typesAreIdentical(s1.parameters[iParam].parameter.typeLink.type, s2.parameters[iParam].parameter.typeLink.type)) {
                    return false;
                }
            }

            return true;
        }

        // Subtyping and Assignment compatibility

        public sourceIsSubtypeOfTarget(source: Type2, target: Type2, comparisonInfo?: TypeComparisonInfo) { return this.sourceIsRelatableToTarget(source, target, false, this.subtypeCache, comparisonInfo); }
        public signatureGroupIsSubtypeOfTarget(sg1: SignatureGroup, sg2: SignatureGroup, comparisonInfo?: TypeComparisonInfo) { return this.signatureGroupIsRelatableToTarget(sg1, sg2, false, this.subtypeCache, comparisonInfo); }
        public signatureIsSubtypeOfTarget(s1: Signature, s2: Signature, comparisonInfo?: TypeComparisonInfo) { return this.signatureIsRelatableToTarget(s1, s2, false, this.subtypeCache, comparisonInfo); }

        public sourceIsAssignableToTarget(source: Type2, target: Type2, comparisonInfo?: TypeComparisonInfo) { return this.sourceIsRelatableToTarget(source, target, true, this.assignableCache, comparisonInfo); }
        public signatureGroupIsAssignableToTarget(sg1: SignatureGroup, sg2: SignatureGroup, comparisonInfo?: TypeComparisonInfo) { return this.signatureGroupIsRelatableToTarget(sg1, sg2, true, this.assignableCache, comparisonInfo); }
        public signatureIsAssignableToTarget(s1: Signature, s2: Signature, comparisonInfo?: TypeComparisonInfo) { return this.signatureIsRelatableToTarget(s1, s2, true, this.assignableCache, comparisonInfo); }

        public sourceIsRelatableToTarget(source: Type2, target: Type2, assignableTo: boolean, comparisonCache: any, comparisonInfo: TypeComparisonInfo) {

            // REVIEW: Does this check even matter?
            //if (this.typesAreIdentical(source, target)) {
            //    return true;
            //}
            if (source == target) {
                return true;
            }

            // An error has already been reported in this case
            if (!(source && target)) {
                return true;
            }

            var comboId = (source.typeID << 16) | target.typeID;

            // In the case of a 'false', we want to short-circuit a recursive typecheck
            if (comparisonCache[comboId] != undefined) {
                return true;
            }

            // this is one difference between subtyping and assignment compatibility
            if (assignableTo) {
                if (source == this.anyType || target == this.anyType) {
                    return true;
                }
            }
            else {
                // This is one difference between assignment compatibility and subtyping
                if (target == this.anyType) {
                    return true;
                }
            }

            if (source == this.undefinedType) {
                return true;
            }

            if ((source == this.nullType) && (target != this.undefinedType && target != this.voidType)) {
                return true;
            }

            // REVIEW: enum types aren't explicitly covered in the spec
            if (target == this.numberType && (source.typeFlags & TypeFlags.IsEnum)) {
                return true;
            }
            if (source == this.numberType && (target.typeFlags & TypeFlags.IsEnum)) {
                return true;
            }
            if ((source.typeFlags & TypeFlags.IsEnum) || (target.typeFlags & TypeFlags.IsEnum)) {
                return false;
            }

            if (source.isArray() || target.isArray()) {
                if (!(source.isArray() && target.isArray())) {
                    return false;
                }
                comparisonCache[comboId] = false;
                var ret = this.sourceIsRelatableToTarget(source.elementType, target.elementType, assignableTo, comparisonCache, comparisonInfo);
                if (ret) {
                    comparisonCache[comboId] = true;
                }
                else {
                    comparisonCache[comboId] = undefined;
                }

                return ret;
            }

            // this check ensures that we only operate on object types from this point forward,
            // since the checks involving primitives occurred above
            if (source.primitiveTypeClass != target.primitiveTypeClass) {

                if (target.primitiveTypeClass == Primitive.None) {
                    if (source == this.numberType && this.typeFlow.numberInterfaceType) {
                        source = this.typeFlow.numberInterfaceType;
                    }
                    else if (source == this.stringType && this.typeFlow.stringInterfaceType) {
                        source = this.typeFlow.stringInterfaceType;
                    }
                    else if (source == this.booleanType && this.typeFlow.booleanInterfaceType) {
                        source = this.typeFlow.booleanInterfaceType;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }

            comparisonCache[comboId] = false;

            if (source.hasBase(target)) {
                comparisonCache[comboId] = true;
                return true;
            }

            if (this.typeFlow.objectInterfaceType && target == this.typeFlow.objectInterfaceType) {
                return true;
            }

            if (this.typeFlow.functionInterfaceType && (source.call || source.construct) && target == this.typeFlow.functionInterfaceType) {
                return true;
            }

            // REVIEW: We should perhaps do this, though it wouldn't be quite right without generics support
            //if (this.typeFlow.arrayInterfaceType && (source.index) && target == this.typeFlow.arrayInterfaceType) {
            //    return true;
            //}

            // At this point, if the target is a class, but not the source or a parent of the source, bail
            if (target.isClass() || target.isClassInstance()) {
                comparisonCache[comboId] = undefined;
                return false;
            }

            if (target.memberScope && source.memberScope) {
                var mPropKeys = target.memberScope.getAllValueSymbolNames(true);
                var mProp: Symbol = null;
                var nProp: Symbol = null;
                var mPropType: Type2 = null;
                var nPropType: Type2 = null;
                var inferenceSymbol: InferenceSymbol = null;

                for (var iMProp = 0; iMProp < mPropKeys.length; iMProp++) {
                    mProp = target.memberScope.find(mPropKeys[iMProp], false, false);
                    nProp = source.memberScope.find(mPropKeys[iMProp], false, false);

                    // methods do not have the "arguments" field
                    if (mProp.name == "arguments" &&
                        this.typeFlow.iargumentsInterfaceType &&
                        (this.typeFlow.iargumentsInterfaceType.symbol.flags & SymbolFlags.CompilerGenerated) &&
                        mProp.kind() == SymbolKind.Variable &&
                        (<VariableSymbol>mProp).variable.typeLink.type == this.typeFlow.iargumentsInterfaceType) {
                        continue;
                    }

                    if (mProp.isInferenceSymbol()) {
                        inferenceSymbol = <InferenceSymbol>mProp;
                        if (inferenceSymbol.typeCheckStatus == TypeCheckStatus.NotStarted) {
                            // REVIEW: TypeChanges: Does this ever really happen?  Maybe for out-of-order typecheck?
                            this.typeFlow.typeCheck(mProp.declAST);
                        }
                    }
                    mPropType = mProp.getType();

                    if (!nProp) {
                        // If it's not present on the type in question, look for the property on 'Object'
                        if (this.typeFlow.objectInterfaceType) {
                            nProp = this.typeFlow.objectInterfaceType.memberScope.find(mPropKeys[iMProp], false, false);
                        }

                        if (!nProp) {
                            // Now, the property was not found on Object, but the type in question is a function, look
                            // for it on function
                            if (this.typeFlow.functionInterfaceType && (mPropType.call || mPropType.construct)) {
                                nProp = this.typeFlow.functionInterfaceType.memberScope.find(mPropKeys[iMProp], false, false);
                            }

                            // finally, check to see if the property is optional
                            if (!nProp) {
                                if (!(mProp.flags & SymbolFlags.Optional)) {
                                    comparisonCache[comboId] = undefined;
                                    if (comparisonInfo) { // only surface the first error
                                        comparisonInfo.flags |= TypeRelationshipFlags.RequiredPropertyIsMissing;
                                        comparisonInfo.addMessageToFront("Type '" + source.getTypeName() + "' is missing property '" + mPropKeys[iMProp] + "' from type '" + target.getTypeName() + "'");
                                    }
                                    return false;
                                }
                                else {
                                    continue;
                                }
                            }
                        }
                    }

                    if (nProp.isInferenceSymbol()) {
                        inferenceSymbol = <InferenceSymbol>nProp;
                        if (inferenceSymbol.typeCheckStatus == TypeCheckStatus.NotStarted) {
                            this.typeFlow.typeCheck(nProp.declAST);
                        }
                    }


                    nPropType = nProp.getType();

                    // catch the mutually recursive or cached cases
                    if (mPropType && nPropType && (comparisonCache[(nPropType.typeID << 16) | mPropType.typeID] != undefined)) {
                        continue;
                    }

                    if (!this.sourceIsRelatableToTarget(nPropType, mPropType, assignableTo, comparisonCache, comparisonInfo)) {
                        comparisonCache[comboId] = undefined;
                        if (comparisonInfo) { // only surface the first error
                            comparisonInfo.flags |= TypeRelationshipFlags.IncompatiblePropertyTypes;
                            comparisonInfo.addMessageToFront("Types of property '" + mProp.name + "' of types '" + source.getTypeName() + "' and '" + target.getTypeName() + "' are incompatible");
                        }
                        return false;
                    }
                }
            }

            // check signature groups
            if (source.call || target.call) {
                if (!this.signatureGroupIsRelatableToTarget(source.call, target.call, assignableTo, comparisonCache, comparisonInfo)) {
                    if (comparisonInfo) {
                        if (source.call && target.call) {
                            comparisonInfo.addMessageToFront("Call signatures of types '" + source.getTypeName() + "' and '" + target.getTypeName() + "' are incompatible");
                        }
                        else {
                            var hasSig = target.call ? target.getTypeName() : source.getTypeName();
                            var lacksSig = !target.call ? target.getTypeName() : source.getTypeName();
                            comparisonInfo.setMessage("Type '" + hasSig + "' requires a call signature, but Type '" + lacksSig + "' lacks one");
                        }
                        comparisonInfo.flags |= TypeRelationshipFlags.IncompatibleSignatures;
                    }
                    comparisonCache[comboId] = undefined;
                    return false;
                }
            }

            if (source.construct || target.construct) {
                if (!this.signatureGroupIsRelatableToTarget(source.construct, target.construct, assignableTo, comparisonCache, comparisonInfo)) {
                    if (comparisonInfo) {
                        if (source.construct && target.construct) {
                            comparisonInfo.addMessageToFront("Construct signatures of types '" + source.getTypeName() + "' and '" + target.getTypeName() + "' are incompatible");
                        }
                        else {
                            var hasSig = target.construct ? target.getTypeName() : source.getTypeName();
                            var lacksSig = !target.construct ? target.getTypeName() : source.getTypeName();
                            comparisonInfo.setMessage("Type '" + hasSig + "' requires a construct signature, but Type '" + lacksSig + "' lacks one");
                        }
                        comparisonInfo.flags |= TypeRelationshipFlags.IncompatibleSignatures;
                    }
                    comparisonCache[comboId] = undefined;
                    return false;
                }
            }

            if (target.index) {
                var targetIndex = !target.index && this.typeFlow.objectInterfaceType ? this.typeFlow.objectInterfaceType.index : target.index;
                var sourceIndex = !source.index && this.typeFlow.objectInterfaceType ? this.typeFlow.objectInterfaceType.index : source.index;

                if (!this.signatureGroupIsRelatableToTarget(sourceIndex, targetIndex, assignableTo, comparisonCache, comparisonInfo)) {
                    if (comparisonInfo) {
                        comparisonInfo.addMessageToFront("Index signatures of types '" + source.getTypeName() + "' and '" + target.getTypeName() + "' are incompatible");
                        comparisonInfo.flags |= TypeRelationshipFlags.IncompatibleSignatures;
                    }
                    comparisonCache[comboId] = undefined;
                    return false;
                }
            }

            comparisonCache[comboId] = true;
            return true;
        }

        // REVIEW: TypeChanges: Return an error context object so the user can get better diagnostic info
        public signatureGroupIsRelatableToTarget(sourceSG: SignatureGroup, targetSG: SignatureGroup, assignableTo: boolean, comparisonCache: any, comparisonInfo?: TypeComparisonInfo) {
            if (sourceSG == targetSG) {
                return true;
            }

            if (!(sourceSG && targetSG)) {
                return false;
            }

            var mSig: Signature = null;
            var nSig: Signature = null;
            var foundMatch = false;

            for (var iMSig = 0; iMSig < targetSG.signatures.length; iMSig++) {
                mSig = targetSG.signatures[iMSig];

                for (var iNSig = 0; iNSig < sourceSG.signatures.length; iNSig++) {
                    nSig = sourceSG.signatures[iNSig];
                    if (this.signatureIsRelatableToTarget(nSig, mSig, assignableTo, comparisonCache, comparisonInfo)) {
                        foundMatch = true;
                        break;
                    }
                }

                if (foundMatch) {
                    foundMatch = false;
                    continue;
                }
                return false;
            }

            return true;
        }

        public signatureIsRelatableToTarget(sourceSig: Signature, targetSig: Signature, assignableTo: boolean, comparisonCache: any, comparisonInfo?: TypeComparisonInfo) {

            if (!sourceSig.parameters || !targetSig.parameters) {
                return false;
            }

            var targetVarArgCount = targetSig.hasVariableArgList ? targetSig.nonOptionalParameterCount - 1 : targetSig.nonOptionalParameterCount;
            var sourceVarArgCount = sourceSig.hasVariableArgList ? sourceSig.nonOptionalParameterCount - 1 : sourceSig.nonOptionalParameterCount;

            if (sourceVarArgCount > targetVarArgCount && !targetSig.hasVariableArgList) {
                if (comparisonInfo) {
                    comparisonInfo.flags |= TypeRelationshipFlags.SourceSignatureHasTooManyParameters;
                    comparisonInfo.addMessageToFront("Call signature expects " + targetVarArgCount + " or fewer parameters");
                }
                return false;
            }

            var sourceReturnType = sourceSig.returnType.type;
            var targetReturnType = targetSig.returnType.type;

            if (targetReturnType != this.voidType) {
                if (!this.sourceIsRelatableToTarget(sourceReturnType, targetReturnType, assignableTo, comparisonCache, comparisonInfo)) {
                    if (comparisonInfo) {
                        comparisonInfo.flags |= TypeRelationshipFlags.IncompatibleReturnTypes;
                        // No need to print this one here - it's printed as part of the signature error in sourceIsRelatableToTarget
                        //comparisonInfo.addMessageToFront("Incompatible return types: '" + sourceReturnType.getTypeName() + "' and '" + targetReturnType.getTypeName() + "'");
                    }
                    return false;
                }
            }

            var len = (sourceVarArgCount < targetVarArgCount && sourceSig.hasVariableArgList) ? targetVarArgCount : sourceVarArgCount;
            var sourceParamType: Type2 = null;
            var targetParamType: Type2 = null;
            var sourceParamName = "";
            var targetParamName = "";

            for (var iSource = 0, iTarget = 0; iSource < len; iSource++, iTarget++) {

                if (!sourceSig.hasVariableArgList || iSource < sourceVarArgCount) {
                    sourceParamType = (<ParameterSymbol>sourceSig.parameters[iSource]).parameter.typeLink.type;
                    sourceParamName = (<ParameterSymbol>sourceSig.parameters[iSource]).parameter.symbol.name;
                }
                else if (iSource == sourceVarArgCount) {
                    sourceParamType = (<ParameterSymbol>sourceSig.parameters[iSource]).parameter.typeLink.type;
                    if (sourceParamType.elementType) {
                        sourceParamType = sourceParamType.elementType;
                    }
                    sourceParamName = (<ParameterSymbol>sourceSig.parameters[iSource]).parameter.symbol.name;
                }

                if (iTarget < targetSig.parameters.length && iTarget < targetVarArgCount) {
                    targetParamType = (<ParameterSymbol>targetSig.parameters[iTarget]).parameter.typeLink.type;
                    targetParamName = (<ParameterSymbol>targetSig.parameters[iTarget]).parameter.symbol.name;
                }
                else if (targetSig.hasVariableArgList && iTarget == targetVarArgCount) {
                    targetParamType = (<ParameterSymbol>targetSig.parameters[iTarget]).parameter.typeLink.type;
                    if (targetParamType.elementType) {
                        targetParamType = targetParamType.elementType;
                    }
                    targetParamName = (<ParameterSymbol>targetSig.parameters[iTarget]).parameter.symbol.name;
                }

                if (!(this.sourceIsRelatableToTarget(sourceParamType, targetParamType, assignableTo, comparisonCache, comparisonInfo) ||
                        this.sourceIsRelatableToTarget(targetParamType, sourceParamType, assignableTo, comparisonCache, comparisonInfo))) {

                    if (comparisonInfo) {
                        comparisonInfo.flags |= TypeRelationshipFlags.IncompatibleParameterTypes;
                    }
                    return false;
                }
            }
            return true;
        }
    }
}