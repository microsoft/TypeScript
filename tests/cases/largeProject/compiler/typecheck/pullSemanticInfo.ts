// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\typescript.ts' />

module TypeScript {
    
    // per-file info on 
    //  decls
    //  bindings
    //  scopes

    // PULLTODO: Get rid of these
    export var declCacheHit = 0;
    export var declCacheMiss = 0;
    export var symbolCacheHit = 0;
    export var symbolCacheMiss = 0;

    export class SemanticInfo {
        private compilationUnitPath: string;  // the "file" this is tied to
        private decls: PullDecl[] = []; // top-level decls
        //private symbols: PullSymbol[] = []; // top-level symbols
        
        private astDeclMap: DataMap = new DataMap();
        private declASTMap: DataMap = new DataMap();
        private declSymbolMap: DataMap = new DataMap();
        private astSymbolMap: DataMap = new DataMap();
        private symbolASTMap: DataMap = new DataMap();

        constructor (compilationUnitPath: string) {
            this.compilationUnitPath = compilationUnitPath;
        }

        public addTopLevelDecl(decl: PullDecl) {
            this.decls[this.decls.length] = decl;
        }
        public getTopLevelDecls() { return this.decls; }

        //public addTopLevelSymbol(symbol: PullSymbol) {
        //    this.symbols[this.symbols.length] = symbol;
        //}
        //public getTopLevelSymbols() { return this.symbols; }

        public getPath() { return this.compilationUnitPath; }

        public getDeclForAST(ast: AST) { return <PullDecl>this.astDeclMap.read(ast.getID().toString()); }

        public setDeclForAST(ast: AST, decl: PullDecl) { this.astDeclMap.link(ast.getID().toString(), decl); }

        public getASTForDecl(decl: PullDecl) { return <AST>this.declASTMap.read(decl.getDeclID().toString() + decl.getKind().toString()); }

        public setASTForDecl(decl: PullDecl, ast: AST) { this.declASTMap.link(decl.getDeclID().toString() + decl.getKind().toString(), ast); }

        public setSymbolForDecl(decl: PullDecl, symbol: PullSymbol) { this.declSymbolMap.link(decl.getDeclID().toString() + decl.getKind().toString(), symbol); }

        public getSymbolForDecl(decl: PullDecl) { return <PullSymbol>this.declSymbolMap.read(decl.getDeclID().toString() + decl.getKind().toString()); }

        public setSymbolForAST(ast: AST, symbol: PullSymbol) { this.astSymbolMap.link(ast.getID().toString(), symbol);  this.symbolASTMap.link(symbol.getSymbolID().toString(), ast) }
        
        public getSymbolForAST(ast: AST) { return <PullSymbol>this.astSymbolMap.read(ast.getID().toString()); }

        public getASTForSymbol(symbol: PullSymbol) { return <AST>this.symbolASTMap.read(symbol.getSymbolID().toString()); }

        public update() { }
    }

    export class SemanticInfoChain {
        public units: SemanticInfo[] = [new SemanticInfo("")];
        private declCache = <any>{};
        private symbolCache = <any>{};
        private unitCache = <any>{};

        public anyTypeSymbol: PullTypeSymbol = null;
        public boolTypeSymbol: PullTypeSymbol = null;
        public numberTypeSymbol: PullTypeSymbol = null;
        public stringTypeSymbol: PullTypeSymbol = null;
        public nullTypeSymbol: PullTypeSymbol = null;
        public undefinedTypeSymbol: PullTypeSymbol = null;
        public elementTypeSymbol: PullTypeSymbol = null;
        public voidTypeSymbol: PullTypeSymbol = null;

        public addPrimitive(name: string, globalDecl: PullDecl) {
            var span = new ASTSpan();
            var decl = new PullDecl(name, DeclKind.Primitive, PullDeclFlags.None, span, "");
            var symbol = new PullPrimitiveTypeSymbol(name);
            symbol.addDeclaration(decl);
            decl.setSymbol(symbol);

            globalDecl.addChildDecl(decl);
            this.units[0].setSymbolForDecl(decl, symbol);

            return symbol;
        }

        constructor () {
            var span = new ASTSpan();
            var globalDecl = new PullDecl("", DeclKind.Global, PullDeclFlags.None, span, "");
            var globalInfo = this.units[0];
            globalInfo.addTopLevelDecl(globalDecl);
            
            // add primitive types
            this.anyTypeSymbol = this.addPrimitive("any", globalDecl);
            this.boolTypeSymbol = this.addPrimitive("boolean", globalDecl);
            this.numberTypeSymbol = this.addPrimitive("number", globalDecl);
            this.stringTypeSymbol = this.addPrimitive("string", globalDecl);
            this.nullTypeSymbol = this.addPrimitive("null", globalDecl);
            this.undefinedTypeSymbol = this.addPrimitive("undefined", globalDecl);
            this.voidTypeSymbol = this.addPrimitive("void", globalDecl);
            this.elementTypeSymbol = this.addPrimitive("_element", globalDecl);
        }

        public addUnit(unit: SemanticInfo) {
            this.units[this.units.length] = unit;
            this.unitCache[unit.getPath()] = unit;
        }

        public getUnit(compilationUnitPath: string) {
            for (var i = 0; i < this.units.length; i++) {
                if (this.units[i].getPath() == compilationUnitPath) {
                    return this.units[i];
                }
            }

            return null;
        }

        // PULLTODO: compilationUnitPath is only really there for debug purposes
        public updateUnit(oldUnit: SemanticInfo, newUnit: SemanticInfo) {
            for (var i = 0; i < this.units.length; i++) {
                if (this.units[i] == oldUnit) {
                    this.units[i] = newUnit;
                    this.unitCache[oldUnit.getPath()] = newUnit;
                    return;
                }
            }
        }

        private collectAllTopLevelDecls() {
            var decls: PullDecl[] = [];
            var unitDecls: PullDecl[];

            for (var i = 0; i < this.units.length; i++) {
                unitDecls = this.units[i].getTopLevelDecls();
                for (var j = 0; j < unitDecls.length; j++) {
                    decls[decls.length] = unitDecls[j];
                }
            }

            return decls;
        }

        private getDeclPathCacheID(declPath: string[], declKind: DeclKind) {
            var cacheID = "";
            
            for (var i = 0; i < declPath.length; i++) {
                cacheID += "#" + declPath[i];
            }

            return cacheID + "#" + declKind.toString();
        }

        // a decl path is a list of decls that reference the components of a declaration from the global scope down
        // E.g., string would be "['string']" and "A.B.C" would be "['A','B','C']"
        public findDecls(declPath: string[], declKind: DeclKind): PullDecl[] {

            var cacheID = this.getDeclPathCacheID(declPath, declKind);

            if (declPath.length) {
                var cachedDecls = this.declCache[cacheID];

                if (cachedDecls && cachedDecls.length) {
                    declCacheHit++;
                    return <PullDecl[]> cachedDecls;
                }
            }

            declCacheMiss++;

            var declsToSearch = this.collectAllTopLevelDecls();

            var decls: PullDecl[] = [];
            var path: string;
            var foundDecls: PullDecl[] = [];
            var keepSearching = (declKind & DeclKind.Module) || (declKind & DeclKind.Interface);

            for (var i = 0; i < declPath.length; i++) {
                path = declPath[i];
                decls = [];

                for (var j = 0; j < declsToSearch.length; j++) {
                    foundDecls = declsToSearch[j].findChildDecls(path, (i == declPath.length - 1) ? declKind : DeclKind.SomeType);

                    for (var k = 0; k < foundDecls.length; k++) {
                        decls[decls.length] = foundDecls[k];
                    }

                    // Unless we're searching for an interface or module, we've found the one true
                    // decl, so don't bother searching the rest of the top-level decls
                    if (foundDecls.length && !keepSearching) {
                        break;
                    }
                }

                declsToSearch = decls;

                if (!declsToSearch) {
                    break;
                }
            }

            if (decls.length) {
                this.declCache[cacheID] = decls;
            }

            return decls;
        }

        public findSymbol(declPath: string[], declType: DeclKind): PullSymbol {

            var cacheID = this.getDeclPathCacheID(declPath, declType);

            if (declPath.length) {

                var cachedSymbol = this.symbolCache[cacheID];

                if (cachedSymbol) {
                    symbolCacheHit++;
                    return cachedSymbol;
                }
            }

            symbolCacheMiss++;

            // symbol wasn't cached, so get the decl
            var decls: PullDecl[] = this.findDecls(declPath, declType);
            var symbol: PullSymbol = null;

            if (decls.length) {
                var symbol = decls[0].getSymbol();
                this.symbolCache[cacheID] = symbol;
            }

            return symbol;
        }

        public update(compilationUnitPath: string) {

            // PULLTODO: Be less aggressive about clearing the cache
            this.declCache = <any>{};
            this.symbolCache = <any>{};
            //this.unitCache[compilationUnitPath] = undefined;
        }

        public getDeclForAST(ast: AST, unitPath: string): PullDecl {
            var unit = <SemanticInfo>this.unitCache[unitPath];

            if (unit) {
                return unit.getDeclForAST(ast);
            }
            
            return null;
        }

        public getASTForDecl(decl: PullDecl, unitPath: string): AST {
            var unit = <SemanticInfo>this.unitCache[unitPath];

            if (unit) {
                return unit.getASTForDecl(decl);
            }
            
            return null;
        }

        public getSymbolForAST(ast: AST, unitPath: string) {
            var unit = <SemanticInfo>this.unitCache[unitPath];

            if (unit) {
                return unit.getSymbolForAST(ast);
            }
            
            return null;
        }

        public getASTForSymbol(symbol: PullSymbol, unitPath: string) {
            var unit = <SemanticInfo>this.unitCache[unitPath];

            if (unit) {
                return unit.getASTForSymbol(symbol);
            }
            
            return null;
        }

        public setSymbolForAST(ast: AST, typeSymbol: PullSymbol, unitPath: string) {
            var unit = <SemanticInfo>this.unitCache[unitPath];

            if (unit) {
                unit.setSymbolForAST(ast, typeSymbol);
            }
        }
    }
}