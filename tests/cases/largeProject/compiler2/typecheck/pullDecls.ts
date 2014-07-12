// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\TypeScript2.ts' />

module TypeScript2 {

    export enum PullDeclFlags {
        None = 0,
        Exported = 1,
        Private = 1 << 1,
        Public = 1 << 2,
        Ambient = 1 << 3,
        Static = 1 << 4,
        LocalStatic = 1 << 5,
        GetAccessor = 1 << 6,
        SetAccessor = 1 << 7,
        Optional = 1 << 8,
        Call = 1 << 9,
        Constructor = 1 << 10,
        Index = 1 << 11,
        Signature = 1 << 12,
        Enum = 1 << 13,
    }

    //PULLTODO - this needs work
    export enum DeclKind {
        None = 0,  // Implicit for globals only

        Module = 1,
        Function = 1 << 1,
        Class = 1 << 2,
        Interface = 1 << 3,

        Variable = 1 << 4,
        Argument = 1 << 5,
        Import = 1 << 7,

        CallSignature = 1 << 8,
        ConstructSignature = 1 << 9,
        IndexSignature = 1 << 10,

        Property = 1 << 12,
        StaticProperty = 1 << 13,

        Dynamic = 1 << 14,

        Script = 1 << 15,
        Global = 1 << 16,
        Primitive = 1 << 17,

        ClassInstanceDecl = 1 << 18,

        Array = 1 << 19,

        Enum = 1 << 20,
        
        SomeType = Module | Function | Class | ClassInstanceDecl | Interface | Primitive | Enum | Global,
        SomeSignature = CallSignature | ConstructSignature | IndexSignature,
        SomeValue = Variable | Argument | Field | StaticField,

        DynamicModule = Module | Dynamic,

        Method = Function | Property,
        Field = Variable | Property,
        StaticMethod = Method | StaticProperty,
        StaticField = Field | StaticProperty,
    }    

    export var pullDeclId = 0;

    export class PullDecl {
        private declType: DeclKind;
        
        private declName: string;

        private symbol: PullSymbol = null;

        // use this to store the symbol for a parameter property
        private propertySymbol: PullSymbol = null;

        // use this to store the signature symbol for a function declaration
        private signatureSymbol: PullSignatureSymbol = null;

        private containedExpressionSymbols: PullSymbol[] = [];
        
        private childDecls: PullDecl[] = [];
        private childDeclTypeCache: any = new BlockIntrinsics();
        private childDeclValueCache: any = new BlockIntrinsics();
        
        private declID = pullDeclId++;
        
        private declFlags: PullDeclFlags = PullDeclFlags.None;
        
        private span: ASTSpan2;
        
        private scriptName: string;
        
        private aliasTo: string; // PULLTODO: Prune
        
        private dependentDecls: PullDecl[] = []; // decls that depend on this decl to know their type
        
        private dependencies: PullDecl[] = []; // decls that this decl depends on to know its type

        constructor (declName: string, declType: DeclKind, declFlags: PullDeclFlags, span: ASTSpan2, scriptName: string) {
            this.declName = declName;
            this.declType = declType;
            this.declFlags = declFlags;
            this.span = span;
            this.scriptName = scriptName;
        }

        public getDeclID() { return this.declID; }

        public getName() { return this.declName; }
        public getKind() { return this.declType}

        public setSymbol(symbol: PullSymbol) { this.symbol = symbol; }
        public getSymbol() { return this.symbol; }

        public setPropertySymbol(symbol: PullSymbol) { this.propertySymbol = symbol; }
        public getPropertySymbol() { return this.propertySymbol; }

        public setSignatureSymbol(signature: PullSignatureSymbol) { this.signatureSymbol = signature; }
        public getSignatureSymbol() { return this.signatureSymbol; }

        public getDeclFlags() { return this.declFlags; }
        
        public getSpan() { return this.span; }
        
        public getScriptName() { return this.scriptName; }
        
        public setAlias(alias: string) { this.aliasTo = alias; }
        public getAlias() { return this.aliasTo; }

        public getDependencies() { return this.dependencies; }
        public addDependency(dependency: PullDecl) { this.dependencies[this.dependencies.length] = dependency; }
        
        public getDependentDecls() { return this.dependentDecls; }
        public addDependentDecl(dependentDecl: PullDecl) { this.dependentDecls[this.dependentDecls.length] = dependentDecl; }

        // returns 'true' if the child decl was successfully added
        // ('false' is returned if addIfDuplicate is false and there is a collision)
        public addChildDecl(childDecl: PullDecl, addIfDuplicate?=true) {
            // check if decl exists
            // merge if necessary
            var declName = childDecl.getName();

            if (!addIfDuplicate) { // PULLTODO: Check decl type?
                for (var i = 0; i < this.childDecls.length; i++) {
                    if (this.childDecls[i].getName() == declName) {
                        return false;
                    }
                }
            }

            this.childDecls[this.childDecls.length] = childDecl;

            // add to the appropriate cache
            var cache = (childDecl.getKind() & DeclKind.SomeType) ? this.childDeclTypeCache : this.childDeclValueCache;
            var cacheVal = <PullDecl[]>cache[declName];
            if (!cacheVal) {
                cacheVal = [];
            }
            cacheVal[cacheVal.length] = childDecl;

            cache[declName] = cacheVal;


            return true;
        }

        public findChildDecls(declName: string, declKind: DeclKind): PullDecl[] {
            // find the decl with the optional type
            // if necessary, cache the decl
            // may be wise to return a chain of decls, or take a parent decl as a parameter
            var cache = (declKind & DeclKind.SomeType) ? this.childDeclTypeCache : this.childDeclValueCache;
            var cacheVal = <PullDecl[]>cache[declName];

            if (cacheVal) {
                return cacheVal;
            }
            else {
                return [];
            }

            //var foundDecls: PullDecl[] = []; 

            //for (var i = 0; i < this.childDecls.length; i++) {
            //    if (this.childDecls[i].getDeclName() == declName) {
            //        if (!declKind || (this.childDecls[i].getDeclKind() & declKind)) {
            //            foundDecls[foundDecls.length] = this.childDecls[i];
            //            break;
            //        }
            //    }
            //}

            //return foundDecls;
        }

        public getChildDecls() { return this.childDecls; }

        public addContainedExpressionSymbol(symbol: PullSymbol) {
            this.containedExpressionSymbols[this.containedExpressionSymbols.length] = symbol;
        }

        public getContainedExpressionSymbols() {
            return this.containedExpressionSymbols;
        }
    }
}