// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\typescript.ts' />

module TypeScript {
    export class DataMap {
        public map: any = {};

        public link(id: string, data: any) {
            this.map[id] = data;
        }

        public unlink(id: string) {
            this.map[id] = undefined;
        }

        //public unlinkChildren(ast:AST) {
        //    TypeScript.getAstWalkerFactory().walk(ast, (ast: AST, parent: AST): AST => { this.unlink(ast); });
        //}

        public read(id: string) {
            return this.map[id];
        }

        public flush() {
            this.map = {};
        }

        public unpatch() { return null; }
    }

    export class PatchedDataMap extends DataMap {
        public diffs: any = {};

        constructor(public parent: DataMap) {
            super();
        }

        public link(id: string, data: any) {
            this.diffs[id] = data;
        }

        public unlink(id: string) {
            this.diffs[id] = undefined;
        }

        public read(id: string) {

            var data = this.diffs[id];

            if (data) {
                return data;
            }

            return this.parent.read(id);
        }

        public flush() {
            this.diffs = {};
        }

        public unpatch() {
            this.flush();
            return this.parent;
        }
    }
}