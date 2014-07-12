// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\typescript.ts' />

module TypeScript {

    export class PullContextualTypeContext {

        public hadProvisionalErrors = false;
        public provisionallyTypedSymbols: PullSymbol[] = [];

        constructor (public contextualType: PullTypeSymbol,
                     public provisional: boolean) { }

        public recordProvisionallyTypedSymbol(symbol: PullSymbol) {
            this.provisionallyTypedSymbols[this.provisionallyTypedSymbols.length] = symbol;
        }

        public invalidateProvisionallyTypedSymbols() {
            for (var i = 0; i < this.provisionallyTypedSymbols.length; i++) {
                this.provisionallyTypedSymbols[i].invalidate();
            }
        }
    }

    export class PullTypeResolutionContext {
        private contextStack: PullContextualTypeContext[] = [];

        public resolveAggressively = false;
        
        public pushContextualType(type: PullTypeSymbol, provisional: boolean) {
            this.contextStack.push(new PullContextualTypeContext(type, provisional));
        }
        
        public popContextualType(): PullContextualTypeContext {
            var tc = this.contextStack.pop();

            tc.invalidateProvisionallyTypedSymbols();

            return tc;
        }
        
        public getContextualType(): PullTypeSymbol {
            var context = !this.contextStack.length ? null : this.contextStack[this.contextStack.length - 1];
            
            if (context) {
                return context.contextualType;
            }
            
            return null;
        }
        
        public inProvisionalResolution() {
            return (!this.contextStack.length ? false : this.contextStack[this.contextStack.length - 1].provisional);
        }

        public setTypeInContext(symbol: PullSymbol, type: PullTypeSymbol) {

            symbol.setType(type);

            if (this.contextStack.length && this.inProvisionalResolution()) {
                this.contextStack[this.contextStack.length].recordProvisionallyTypedSymbol(symbol);
            }
        }
    }

}