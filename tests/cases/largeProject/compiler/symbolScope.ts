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

///<reference path='typescript.ts' />

module TypeScript {

    // private members are private to the scope
    // public members are public to the scope
    export class ScopedMembers {

        public allMembers: IHashTable;
        public publicMembers: IHashTable;
        public privateMembers: IHashTable;

        constructor (public dualMembers: DualStringHashTable) { 
            this.allMembers = this.dualMembers;
            this.publicMembers = this.dualMembers.primaryTable;
            this.privateMembers = this.dualMembers.secondaryTable;
        }

        // add a public member
        public addPublicMember(key: string, data) { return this.dualMembers.primaryTable.add(key, data); }

        // add a private member 
        public addPrivateMember(key: string, data) { return this.dualMembers.secondaryTable.add(key, data); }
    }

    export enum SymbolKind {
        None,
        Type,
        Field,
        Parameter,
        Variable,
    }

    export class SymbolScope {
        constructor (public container: Symbol) { }
        public printLabel() { return "base"; }
        public getAllSymbolNames(members: boolean): string[]{
            return ["please", "implement", "in", "derived", "classes"];
        }
        public getAllTypeSymbolNames(members: boolean): string[]{
            return ["please", "implement", "in", "derived", "classes"];
        }
        public getAllValueSymbolNames(members: boolean): string[]{
            return ["please", "implement", "in", "derived", "classes"];
        }
        // advanced search using a filter
        public search(filter: ScopeSearchFilter, name: string, publicOnly: boolean, typespace: boolean): Symbol { return null; }
        // find in this immediate scope
        public findLocal(name: string, publicOnly: boolean, typespace: boolean): Symbol { return null; }
        // find in value namespace 
        public find(name: string, publicOnly: boolean, typespace: boolean): Symbol { return null; }
        // find symbol that supplies an implementation
        public findImplementation(name: string, publicOnly: boolean, typespace: boolean): Symbol { return null; }
        // restrict the search to ambient values
        public findAmbient(name: string, publicOnly: boolean, typespace: boolean): Symbol { return null; }
        public print(outfile: ITextWriter) {
            if (this.container) {
                outfile.WriteLine(this.printLabel() + " scope with container: " + this.container.name + "...");
            }
            else {
                outfile.WriteLine(this.printLabel() + " scope...");
            }
        }

        public enter(container: Symbol, ast: AST, symbol: Symbol, errorReporter: ErrorReporter, publicOnly: boolean,
            typespace: boolean, ambient: boolean): void {
            throw new Error("please implement in derived class");
        }

        public getTable(): IHashTable {
            throw new Error("please implement in derived class");
        }
    }

    function symbolCanBeUsed(sym: Symbol, publicOnly) {
        return publicOnly ? !(hasFlag(sym.flags, SymbolFlags.Private) ||
                            (sym.declAST && sym.declAST.nodeType == NodeType.FuncDecl && hasFlag((<FuncDecl>sym.declAST).fncFlags, FncFlags.Private)))
                          : true;
    }

    export class SymbolAggregateScope extends SymbolScope {
        public printLabel() { return "agg"; }
        public valueCache: IHashTable = null;
        public valueImplCache: IHashTable = null;
        public valueAmbientCache: IHashTable = null;
        public typeCache: IHashTable = null;
        public typeImplCache: IHashTable = null;
        public typeAmbientCache: IHashTable = null;
        public parents: SymbolScope[] = null;
        public container: Symbol;

        constructor (container: Symbol) {
            super(container);
            this.container = container;
        }

        public search(filter: ScopeSearchFilter, name: string, publicOnly: boolean, typespace: boolean) {
            if (this.parents) {
                for (var i = 0; i < this.parents.length; i++) {
                    var sym = this.parents[i].search(filter, name, publicOnly, typespace);
                    if (sym) {
                        if (filter.update(sym)) {
                            return sym;
                        }
                    }
                }
            }
            return filter.result;
        }

        public getAllSymbolNames(members: boolean): string[]{
            var result: string[] = [];
            if (this.parents) {
                for (var i = 0; i < this.parents.length; i++) {
                    var parentResult = this.parents[i].getAllSymbolNames(members);
                    if (parentResult) {
                        result = result.concat(parentResult);
                    }
                }
            }
            return result;
        }

        public getAllTypeSymbolNames(members: boolean): string[]{
            var result: string[] = [];
            if (this.parents) {
                for (var i = 0; i < this.parents.length; i++) {
                    var parentResult = this.parents[i].getAllTypeSymbolNames(members);
                    if (parentResult) {
                        result = result.concat(parentResult);
                    }
                }
            }
            return result;
        }

        public getAllValueSymbolNames(members: boolean): string[]{
            var result: string[] = [];
            if (this.parents) {
                for (var i = 0; i < this.parents.length; i++) {
                    var parentResult = this.parents[i].getAllValueSymbolNames(members);
                    if (parentResult) {
                        result = result.concat(parentResult);
                    }
                }
            }
            return result;
        }

        public print(outfile: ITextWriter) {
            super.print(outfile);
            if (this.parents) {
                for (var i = 0; i < this.parents.length; i++) {
                    this.parents[i].print(outfile);
                }
            }
        }

        public findImplementation(name: string, publicOnly: boolean, typespace: boolean): Symbol {
            var sym: Symbol = null;
            var i = 0;
            var implCache = this.valueImplCache;

            if (typespace) {
                implCache = this.typeImplCache;
            }
            if (implCache &&
                ((sym = implCache.lookup(name)) != null) &&
                (publicOnly ? !(hasFlag(sym.flags, SymbolFlags.Private) ||
                                        (sym.declAST && sym.declAST.nodeType == NodeType.FuncDecl && hasFlag((<FuncDecl>sym.declAST).fncFlags, FncFlags.Private)))
                                        : true)) {
                return sym;
            }
            if (this.parents) {
                for (i = 0; i < this.parents.length; i++) {
                    sym = this.parents[i].findImplementation(name, publicOnly, typespace);
                    if (sym) {
                        break;
                    }
                }
            }
            if (implCache) {
                if (typespace) {
                    this.typeImplCache = new StringHashTable();
                    implCache = this.typeImplCache;
                }
                else {
                    this.valueImplCache = new StringHashTable();
                    implCache = this.valueImplCache;
                }
            }
            implCache.add(name, sym);
            return sym;
        }

        public find(name: string, publicOnly: boolean, typespace: boolean): Symbol {
            var sym: Symbol = null;
            var i = 0;
            var cache = this.valueCache;

            if (typespace) {
                cache = this.typeCache;
            }
            if (cache &&
                ((sym = cache.lookup(name)) != null) &&
                (publicOnly ? !(hasFlag(sym.flags, SymbolFlags.Private) ||
                                        (sym.declAST && sym.declAST.nodeType == NodeType.FuncDecl && hasFlag((<FuncDecl>sym.declAST).fncFlags, FncFlags.Private)))
                                        : true)) {
                return sym;
            }
            if (this.parents) {
                for (i = 0; i < this.parents.length; i++) {
                    sym = this.parents[i].find(name, publicOnly, typespace);
                    if (sym) {
                        break;
                    }
                }
            }
            if (cache == null) {
                if (typespace) {
                    this.typeCache = new StringHashTable();
                    cache = this.typeCache;
                }
                else {
                    this.valueCache = new StringHashTable();
                    cache = this.valueCache;
                }
            }
            cache.add(name, sym);
            return sym;
        }

        public findAmbient(name: string, publicOnly: boolean, typespace: boolean): Symbol {
            var sym: Symbol = null;
            var i = 0;
            var cache = this.valueAmbientCache;
            if (typespace) {
                cache = this.typeAmbientCache;
            }
            if (cache && ((sym = cache.lookup(name)) != null)) {
                return sym;
            }
            if (this.parents) {
                for (i = 0; i < this.parents.length; i++) {
                    sym = this.parents[i].findAmbient(name, publicOnly, typespace);
                    if (sym) {
                        break;
                    }
                }
            }
            if (cache == null) {
                if (typespace) {
                    this.typeAmbientCache = new StringHashTable();
                    cache = this.typeAmbientCache;
                }
                else {
                    this.valueAmbientCache = new StringHashTable();
                    cache = this.valueAmbientCache;
                }
            }
            cache.add(name, sym);
            return sym;
        }

        public addParentScope(parent: SymbolScope): void {
            if (this.parents == null) {
                this.parents = new SymbolScope[];
            }
            this.parents[this.parents.length] = parent;
        }
    }

    export class SymbolTableScope extends SymbolScope {
        public container: Symbol;

        constructor(public valueMembers: ScopedMembers,
                            public ambientValueMembers: ScopedMembers,
                            public enclosedTypes: ScopedMembers,
                            public ambientEnclosedTypes: ScopedMembers,
                            container: Symbol)
        {
            super(container);
            this.container = container;
        }

        public printLabel() { return "table"; }

        public getAllSymbolNames(members: boolean): string[]{
            var result = this.getAllTypeSymbolNames(members);

            return result.concat(this.getAllValueSymbolNames(members));
        }

        public getAllTypeSymbolNames(members: boolean): string[]{
            var result = [];
            if (this.ambientEnclosedTypes) {
                result = result.concat(this.ambientEnclosedTypes.allMembers.getAllKeys());
            }
            if (this.enclosedTypes) {
                result = result.concat(this.enclosedTypes.allMembers.getAllKeys());
            }
            return result;
        }

        public getAllValueSymbolNames(members: boolean): string[]{
            var result = [];
            if (this.ambientValueMembers) {
                result = result.concat(this.ambientValueMembers.allMembers.getAllKeys());
            }
            if (this.valueMembers) {
                result = result.concat(this.valueMembers.allMembers.getAllKeys());
            }
            return result;
        }

        public search(filter: ScopeSearchFilter, name: string, publicOnly: boolean, typespace: boolean) {
            var sym = this.find(name, publicOnly, typespace);
            filter.update(sym);
            return filter.result;
        }

        public find(name: string, publicOnly: boolean, typespace: boolean): Symbol {
            var table: IHashTable = null;
            var ambientTable: IHashTable = null;

            if (typespace) {
                table = (this.enclosedTypes == null) ? null :
                            publicOnly ? this.enclosedTypes.publicMembers : this.enclosedTypes.allMembers;
                ambientTable = (this.ambientEnclosedTypes == null) ? null :
                                    publicOnly ? this.ambientEnclosedTypes.publicMembers : this.ambientEnclosedTypes.allMembers;
            }
            else {
                table = (this.valueMembers == null) ? null :
                                publicOnly ? this.valueMembers.publicMembers : this.valueMembers.allMembers;
                ambientTable = (this.ambientValueMembers == null) ? null :
                                    publicOnly ? this.ambientValueMembers.publicMembers : this.ambientValueMembers.allMembers;
            }
            if (ambientTable) {
                var s = ambientTable.lookup(name);
                if (s) { return s; }
            }
            if (table) {
                var s = table.lookup(name);
                if (s) { return s; }
            }

            return null;
        }

        public findAmbient(name: string, publicOnly: boolean, typespace: boolean): Symbol {
            var ambientTable = (this.ambientValueMembers == null) ? null :
                                publicOnly ? this.ambientValueMembers.publicMembers : this.ambientValueMembers.allMembers;
            if (typespace) {
                ambientTable = (this.ambientEnclosedTypes == null) ? null :
                                    publicOnly ? this.ambientEnclosedTypes.publicMembers : this.ambientEnclosedTypes.allMembers;
            }
            if (ambientTable) {
                var s = ambientTable.lookup(name);
                if (s) { return s; }
            }

            return null;
        }

        public print(outfile: ITextWriter) {
            super.print(outfile);
            if (this.ambientValueMembers) {
                this.ambientValueMembers.allMembers.map(function (key, sym, context) {
                    outfile.WriteLine("  " + key);
                }, null);
            }
            if (this.valueMembers) {
                this.valueMembers.allMembers.map(function (key, sym, context) {
                    outfile.WriteLine("  " + key);
                }, null);
            }
            if (this.ambientEnclosedTypes) {
                this.ambientEnclosedTypes.allMembers.map(function (key, sym, context) {
                    outfile.WriteLine("  " + key);
                }, null);
            }
            if (this.enclosedTypes) {
                this.enclosedTypes.allMembers.map(function (key, sym, context) {
                    outfile.WriteLine("  " + key);
                }, null);
            }
        }

        public findImplementation(name: string, publicOnly: boolean, typespace: boolean): Symbol {
            var sym = this.find(name, publicOnly, typespace);
            if (sym) {
                if (sym.kind() == SymbolKind.Type) {
                    var typeSym = <TypeSymbol>sym;
                    if (!typeSym.type.hasImplementation()) {
                        sym = null;
                    }
                }
                else if (sym.container) {
                    if (sym.container.kind() == SymbolKind.Type) {
                        var ctypeSym = <TypeSymbol>sym.container;
                        if (!ctypeSym.type.hasImplementation()) {
                            sym = null;
                        }
                    }
                }
            }
            return sym;
        }

        public getTable() {
            return this.valueMembers.publicMembers;
        }
    }

    export class SymbolScopeBuilder extends SymbolScope {
        public container: Symbol;
        
        constructor (public valueMembers: ScopedMembers,
                    public ambientValueMembers: ScopedMembers,
                    public enclosedTypes: ScopedMembers,
                    public ambientEnclosedTypes: ScopedMembers,
                    public parent: SymbolScope,
                    container: Symbol)
        {
            super(container);
            this.container = container;
        }

        public printLabel() { return "builder"; }
        public getAllSymbolNames(members: boolean): string[]{
            var result: string[] = this.getAllTypeSymbolNames(members);
            return result.concat(this.getAllValueSymbolNames(members));
        }

        public getAllTypeSymbolNames(members: boolean): string[]{
            var result: string[] = [];
            if (this.ambientEnclosedTypes) {
                result = result.concat(this.ambientEnclosedTypes.allMembers.getAllKeys());
            }
            if (this.enclosedTypes) {
                result = result.concat(this.enclosedTypes.allMembers.getAllKeys());
            }
            if (!members && this.parent) {
                var parentResult = this.parent.getAllTypeSymbolNames(members);
                if (parentResult) {
                    result = result.concat(parentResult);
                }
            }
            return result;
        }

        public getAllValueSymbolNames(members: boolean): string[]{
            var result: string[] = [];
            if (this.ambientValueMembers) {
                result = result.concat(this.ambientValueMembers.allMembers.getAllKeys());
            }
            if (this.valueMembers) {
                result = result.concat(this.valueMembers.allMembers.getAllKeys());
            }
            if (!members && this.parent) {
                var parentResult = this.parent.getAllValueSymbolNames(members);
                if (parentResult) {
                    result = result.concat(parentResult);
                }
            }
            return result;
        }

        public search(filter: ScopeSearchFilter, name: string, publicOnly: boolean, typespace: boolean) {
            var sym: Symbol = null;
            var table = (this.valueMembers == null) ? null :
                            publicOnly ? this.valueMembers.publicMembers : this.valueMembers.allMembers;
            var ambientTable = (this.ambientValueMembers == null) ? null :
                                publicOnly ? this.ambientValueMembers.publicMembers : this.ambientValueMembers.allMembers;
            if (typespace) {
                table = (this.enclosedTypes == null) ? null :
                            publicOnly ? this.enclosedTypes.publicMembers : this.enclosedTypes.allMembers;
                ambientTable = (this.ambientEnclosedTypes == null) ? null :
                                    publicOnly ? this.ambientEnclosedTypes.publicMembers : this.ambientEnclosedTypes.allMembers;
            }
            if (ambientTable) {
                if ((sym = ambientTable.lookup(name)) != null) {
                    if (filter.update(sym)) {
                        return sym;
                    }
                }
            }
            if (table) {
                if ((sym = table.lookup(name)) != null) {
                    if (filter.update(sym)) {
                        return sym;
                    }
                }
            }
            if (this.parent) {
                sym = this.parent.search(filter, name, publicOnly, typespace);
                if (sym) {
                    if (filter.update(sym)) {
                        return sym;
                    }
                }
            }
            return filter.result;
        }

        public print(outfile: ITextWriter) {
            super.print(outfile);
            if (this.ambientValueMembers) {
                this.ambientValueMembers.allMembers.map(function (key, s, context) {
                    var sym = <Symbol>s;
                    outfile.WriteLine("  " + key);
                }, null);
            }
            if (this.valueMembers) {
                this.valueMembers.allMembers.map(function (key, s, context) {
                    var sym = <Symbol>s;
                    outfile.WriteLine("  " + key);
                }, null);
            }
            if (this.ambientEnclosedTypes) {
                this.ambientEnclosedTypes.allMembers.map(function (key, s, context) {
                    var sym = <Symbol>s;
                    outfile.WriteLine("  " + key);
                }, null);
            }
            if (this.enclosedTypes) {
                this.enclosedTypes.allMembers.map(function (key, s, context) {
                    var sym = <Symbol>s;
                    outfile.WriteLine("  " + key);
                }, null);
            }
            if (this.parent) {
                this.parent.print(outfile);
            }
        }

        public find(name: string, publicOnly: boolean, typespace: boolean): Symbol {
            var sym: Symbol = null;
            var table = (this.valueMembers == null) ? null :
                            publicOnly ? this.valueMembers.publicMembers : this.valueMembers.allMembers;
            var ambientTable = (this.ambientValueMembers == null) ? null :
                                publicOnly ? this.ambientValueMembers.publicMembers : this.ambientValueMembers.allMembers;
            if (typespace) {
                table = (this.enclosedTypes == null) ? null :
                            publicOnly ? this.enclosedTypes.publicMembers : this.enclosedTypes.allMembers;
                ambientTable = (this.ambientEnclosedTypes == null) ? null :
                                    publicOnly ? this.ambientEnclosedTypes.publicMembers : this.ambientEnclosedTypes.allMembers;
            }
            if (ambientTable && ((sym = ambientTable.lookup(name)) != null)) {
                return sym;
            }
            if (table && ((sym = table.lookup(name)) != null)) {
                return sym;
            }
            if (this.parent) {
                return this.parent.find(name, publicOnly, typespace);
            }
            return null;
        }

        public findAmbient(name: string, publicOnly: boolean, typespace: boolean): Symbol {
            var sym: Symbol = null;
            var ambientTable = (this.ambientValueMembers == null) ? null :
                                publicOnly ? this.ambientValueMembers.publicMembers : this.ambientValueMembers.allMembers;
            if (typespace) {
                ambientTable = (this.ambientEnclosedTypes == null) ? null :
                                    publicOnly ? this.ambientEnclosedTypes.publicMembers : this.ambientEnclosedTypes.allMembers;
            }
            if (ambientTable && ((sym = ambientTable.lookup(name)) != null)) {
                return sym;
            }
            if (this.parent) {
                return this.parent.findAmbient(name, publicOnly, typespace);
            }
            return null;
        }

        public findLocal(name: string, publicOnly: boolean, typespace: boolean): Symbol {
            var sym: Symbol = null;
            var table = (this.valueMembers == null) ? null :
                            publicOnly ? this.valueMembers.publicMembers : this.valueMembers.allMembers;
            var ambientTable = (this.ambientValueMembers == null) ? null :
                                publicOnly ? this.ambientValueMembers.publicMembers : this.ambientValueMembers.allMembers;
            if (typespace) {
                table = (this.enclosedTypes == null) ? null :
                            publicOnly ? this.enclosedTypes.publicMembers : this.enclosedTypes.allMembers;
                ambientTable = (this.ambientEnclosedTypes == null) ? null :
                                    publicOnly ? this.ambientEnclosedTypes.publicMembers : this.ambientEnclosedTypes.allMembers;
            }
            if (table) {
                if ((sym = table.lookup(name)) != null) {
                    if (sym) { return sym; }
                }
            }
            if (ambientTable) {
                if ((sym = ambientTable.lookup(name)) != null) {
                    if (sym) { return sym; }
                }
            }
            return null;
        }

        public enter(container: Symbol, ast: AST, symbol: Symbol, errorReporter: ErrorReporter, insertAsPublic: boolean, typespace: boolean, ambient: boolean): void {
            var table = null;

            if (ambient) {
                if (typespace) {
                    table = (this.ambientEnclosedTypes == null) ? null :
                                    insertAsPublic ? this.ambientEnclosedTypes.publicMembers : this.ambientEnclosedTypes.privateMembers;
                }
                else {
                    table = (this.ambientValueMembers == null) ? null :
                                insertAsPublic ? this.ambientValueMembers.publicMembers : this.ambientValueMembers.privateMembers;
                }
            }
            else {
                if (typespace) {
                    table = (this.enclosedTypes == null) ? null :
                                insertAsPublic ? this.enclosedTypes.publicMembers : this.enclosedTypes.privateMembers;
                }
                else {
                    table = (this.valueMembers == null) ? null :
                                insertAsPublic ? this.valueMembers.publicMembers : this.valueMembers.privateMembers;
                }
            }

            if (table) {
                if (!table.add(symbol.name, symbol)) {
                    errorReporter.duplicateIdentifier(ast, symbol.name);
                }
            }
            else {
                CompilerDiagnostics.Alert("YYYYY");  // REVIEW: Surely we can do better than this...
            }
            symbol.container = container;
        }

        public getTable() { return this.valueMembers.allMembers; }
    }

    export class FilteredSymbolScope extends SymbolScope {
        constructor (public scope: SymbolScope, container: Symbol, public filter: ScopeSearchFilter) {
            super(container);
        }
        public print(outfile: ITextWriter) {
            this.scope.print(outfile);
        }

        public find(name: string, publicOnly: boolean, typespace: boolean) {
            this.filter.reset();
            return this.scope.search(this.filter, name, publicOnly, typespace);
        }
        public findLocal(name: string, publicOnly: boolean, typespace: boolean) { return this.scope.findLocal(name, publicOnly, typespace); }
    }

    export class FilteredSymbolScopeBuilder extends SymbolScopeBuilder {
        constructor (valueMembers: ScopedMembers, parent: SymbolScope, container: Symbol, public filter: (sym: Symbol) =>boolean) {
            super(valueMembers, null, null, null, parent, container);
        }
        public findLocal(name: string, publicOnly: boolean, typespace: boolean): Symbol {
            var sym = super.findLocal(name, publicOnly, typespace);
            if (sym) {
                if (!this.filter(sym)) {
                    return null;
                }
            }
            return sym;
        }

        public search(filter: ScopeSearchFilter, name: string, publicOnly: boolean, typespace: boolean):Symbol {
            throw new Error("please implement");
        }

        public find(name: string, publicOnly: boolean, typespace: boolean): Symbol {
            var sym = super.findLocal(name, publicOnly, typespace);
            if (sym) {
                if (!this.filter(sym)) {
                    return null;
                }
            }
            return super.find(name, publicOnly, typespace);
        }
    }
}