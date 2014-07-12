// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\TypeScript2.ts' />

module TypeScript2 {

    export class PullSymbolBindingContext {

        private parentChain: PullTypeSymbol[] = [];
        private declPath: string[] = [];
        public semanticInfo: SemanticInfo;
        public reBindingAfterChange = false;
        public startingDeclForRebind = pullDeclId; // note that this gets set on creation

        constructor (public semanticInfoChain: SemanticInfoChain, public scriptName: string) {
            this.semanticInfo = this.semanticInfoChain.getUnit(this.scriptName);
        }

        public getParent(n=0): PullTypeSymbol { return this.parentChain ? this.parentChain[this.parentChain.length - 1 - n] : null; }
        public getDeclPath() { return this.declPath; }

        public pushParent(parentDecl: PullTypeSymbol) { 
            if (parentDecl) { 
                this.parentChain[this.parentChain.length] = parentDecl;
                this.declPath[this.declPath.length] = parentDecl.getName();
            } 
        }

        public popParent() {
            if (this.parentChain.length) {
                this.parentChain.length--;
                this.declPath.length--;
            }
        }
    }

    export var time_in_findSymbol = 0;

    export function findSymbolInContext(name: string, declKind: DeclKind, context: PullSymbolBindingContext, typeLookupPath: string[]): PullSymbol {
        var startTime = new Date().getTime();
        var contextSymbolPath: string[] = context.getDeclPath();
        var nestedSymbolPath: string[] = [];
        var copyOfContextSymbolPath = [];
        var symbol: PullSymbol = null;

        // first, search within the given symbol path
        if (typeLookupPath.length) {

            for (var i = 0; i < typeLookupPath.length; i++) {
                nestedSymbolPath[nestedSymbolPath.length] = typeLookupPath[i];
            }

            nestedSymbolPath[nestedSymbolPath.length] = name;

            while (nestedSymbolPath.length >= 2) {
                symbol = context.semanticInfoChain.findSymbol(nestedSymbolPath, declKind);

                if (symbol) {
                    var endTime = new Date().getTime();
                    time_in_findSymbol += endTime - startTime;
                    return symbol;
                }
                nestedSymbolPath.length -= 2;
                nestedSymbolPath[nestedSymbolPath.length] = name;
            }
        }

        // next, link back up to the enclosing context
        if (contextSymbolPath.length) {
            
            for (var i = 0; i < contextSymbolPath.length; i++) {
                copyOfContextSymbolPath[copyOfContextSymbolPath.length] = contextSymbolPath[i];
            }

            for (var i = 0; i < typeLookupPath.length; i++) {
                copyOfContextSymbolPath[copyOfContextSymbolPath.length] = typeLookupPath[i];
            }

            copyOfContextSymbolPath[copyOfContextSymbolPath.length] = name;

            while (copyOfContextSymbolPath.length >= 2) {
                symbol = context.semanticInfoChain.findSymbol(copyOfContextSymbolPath, declKind);

                if (symbol) {
                    var endTime = new Date().getTime();
                    time_in_findSymbol += endTime - startTime;
                    return symbol;
                }
                copyOfContextSymbolPath.length -= 2;
                copyOfContextSymbolPath[copyOfContextSymbolPath.length] = name;
            }
        }

        // finally, try searching globally
        symbol = context.semanticInfoChain.findSymbol([name], declKind);

        var endTime = new Date().getTime();
        time_in_findSymbol += endTime - startTime;

        return symbol;
    }
}