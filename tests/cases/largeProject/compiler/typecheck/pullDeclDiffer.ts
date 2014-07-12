// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\typescript.ts' />

module TypeScript {

    export enum PullDeclEdit {
        NoChanges,
        DeclAdded,
        DeclRemoved,
        DeclChanged,
    }


    export class PullDeclDiff {

        constructor(public oldDecl: PullDecl, public newDecl: PullDecl, public kind: PullDeclEdit) { }
    
    }

    export class PullDeclDiffer {

        /*
        What can change?

        - decl name
        - decl type
        - decl span
        - decl flags

        */

        // For now, just check for there/not there - we'll invalidate the inference symbols anyway
        // next up, we'll want to use this data to find the decl that changed
        public diffDecls(oldDecl: PullDecl, newDecl: PullDecl, diffs: PullDeclDiff[]) {
            // check the children
            var oldDeclChildren = oldDecl.getChildDecls();
            var newDeclChildren = newDecl.getChildDecls();
            var foundDecls: PullDecl[];

            for (var i = 0; i < oldDeclChildren.length; i++) {
                foundDecls = newDecl.findChildDecls(oldDeclChildren[i].getName(), oldDeclChildren[i].getKind());

                if (!foundDecls.length) {
                    diffs[diffs.length] = new PullDeclDiff(oldDeclChildren[i], null, PullDeclEdit.DeclRemoved);
                }
                else if (foundDecls.length == 1) { // just care about non-split entities for now
                    this.diffDecls(oldDeclChildren[i], foundDecls[0], diffs);
                }
            }

            for (var i = 0; i < newDeclChildren.length; i++) {
                foundDecls = oldDecl.findChildDecls(newDeclChildren[i].getName(), newDeclChildren[i].getKind());

                if (!foundDecls.length) {
                    diffs[diffs.length] = new PullDeclDiff(oldDecl, newDeclChildren[i], PullDeclEdit.DeclAdded);
                }
            }
        }
    }


}