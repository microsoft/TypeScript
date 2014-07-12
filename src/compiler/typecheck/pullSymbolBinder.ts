// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\references.ts' />

module TypeScript {

    export class PullSymbolBinder {

        private declsBeingBound: number[] = [];
        private inBindingOtherDeclsWalker = new PullHelpers.OtherPullDeclsWalker();

        constructor(private semanticInfoChain: SemanticInfoChain) {
        }

        private getParent(decl: PullDecl, returnInstanceType = false): PullTypeSymbol {
            var parentDecl = decl.getParentDecl();

            if (parentDecl.kind === PullElementKind.Script) {
                return null;
            }

            var parent = parentDecl.getSymbol();

            if (!parent && parentDecl && !parentDecl.hasBeenBound()) {
                this.bindDeclToPullSymbol(parentDecl);
            }

            parent = parentDecl.getSymbol();
            if (parent) {
                var parentDeclKind = parentDecl.kind;
                if (parentDeclKind === PullElementKind.GetAccessor) {
                    parent = (<PullAccessorSymbol>parent).getGetter();
                }
                else if (parentDeclKind === PullElementKind.SetAccessor) {
                    parent = (<PullAccessorSymbol>parent).getSetter();
                }
            }

            if (parent) {
                if (returnInstanceType && parent.isType() && parent.isContainer()) {
                    var instanceSymbol = (<PullContainerSymbol>parent).getInstanceSymbol();

                    if (instanceSymbol) {
                        return instanceSymbol.type;
                    }
                }

                return parent.type;
            }

            return null;
        }

        private findDeclsInContext(startingDecl: PullDecl, declKind: PullElementKind, searchGlobally: boolean): PullDecl[] {

            if (!searchGlobally) {
                var parentDecl = startingDecl.getParentDecl();
                return parentDecl.searchChildDecls(startingDecl.name, declKind);
            }

            var contextSymbolPath = startingDecl.getParentPath();

            // next, link back up to the enclosing context
            if (contextSymbolPath.length) {
                var copyOfContextSymbolPath: string[] = [];

                for (var i = 0; i < contextSymbolPath.length; i++) {
                    if (contextSymbolPath[i].kind & PullElementKind.Script) {
                        continue;
                    }
                    copyOfContextSymbolPath[copyOfContextSymbolPath.length] = contextSymbolPath[i].name;
                }

                return this.semanticInfoChain.findDecls(copyOfContextSymbolPath, declKind);
            }
        }

        // Called by all the bind methods when searching for existing symbols to reuse. Returns the symbol, or null if it does not exist.
        private getExistingSymbol(decl: PullDecl, searchKind: PullElementKind, parent: PullTypeSymbol): PullSymbol {
            var lookingForValue = (searchKind & PullElementKind.SomeValue) !== 0;
            var lookingForType = (searchKind & PullElementKind.SomeType) !== 0;
            var lookingForContainer = (searchKind & PullElementKind.SomeContainer) !== 0;
            var name = decl.name;
            if (parent) {
                var isExported = (decl.flags & PullElementFlags.Exported) !== 0;

                // First search for a nonmember
                var prevSymbol: PullSymbol = null;
                if (lookingForValue) {
                    prevSymbol = parent.findContainedNonMember(name);
                }
                else if (lookingForType) {
                    prevSymbol = parent.findContainedNonMemberType(name, searchKind);
                }
                else if (lookingForContainer) {
                    prevSymbol = parent.findContainedNonMemberContainer(name, searchKind);
                }
                var prevIsExported = !prevSymbol; // We didn't find it as a local, so it must be exported if it exists
                if (!prevSymbol) {
                    if (lookingForValue) {
                        prevSymbol = parent.findMember(name, /*lookInParent*/ false);
                    }
                    else if (lookingForType) {
                        prevSymbol = parent.findNestedType(name, searchKind);
                    }
                    else if (lookingForContainer) {
                        prevSymbol = parent.findNestedContainer(name, searchKind);
                    }
                }

                // If they are both exported, then they should definitely merge
                if (isExported && prevIsExported) {
                    return prevSymbol; // This could actually be null, but that is ok because it means we are not merging with anything
                }
                if (prevSymbol) {
                    // Check if they have the same parent (we use the LAST declaration to get the most positive answer on this)
                    var prevDecls = prevSymbol.getDeclarations();
                    var lastPrevDecl = prevDecls[prevDecls.length - 1];
                    var parentDecl = decl.getParentDecl();
                    var prevParentDecl = lastPrevDecl && lastPrevDecl.getParentDecl();
                    if (parentDecl !== prevParentDecl) {
                        // no merge
                        return null;
                    }

                    // They share the same parent, so merge them
                    return prevSymbol;
                }
            }
            else {
                var parentDecl = decl.getParentDecl();
                if (parentDecl && parentDecl.kind === PullElementKind.Script) {
                    return this.semanticInfoChain.findTopLevelSymbol(name, searchKind, decl);
                }
                else {
                    // The decl is in a control block (catch/with) that has no parent symbol. Luckily this type of parent can only have one decl.
                    var prevDecls = parentDecl && parentDecl.searchChildDecls(name, searchKind);
                    return prevDecls[0] && prevDecls[0].getSymbol();
                }
            }

            // Did not find a symbol
            return null;
        }

        // Reports an error and returns false if exports do not match. Otherwise, returns true.
        private checkThatExportsMatch(decl: PullDecl, prevSymbol: PullSymbol, reportError = true): boolean {
            // Get export status of each (check against the last decl of the previous symbol)
            var isExported = (decl.flags & PullElementFlags.Exported) !== 0;
            var prevDecls = prevSymbol.getDeclarations();
            var prevIsExported = (prevDecls[prevDecls.length - 1].flags & PullElementFlags.Exported) !== 0;
            if ((isExported !== prevIsExported) && !prevSymbol.isSignature() && (decl.kind & PullElementKind.SomeSignature) === 0) {
                if (reportError) {
                    var ast = this.semanticInfoChain.getASTForDecl(decl);
                    this.semanticInfoChain.addDiagnosticFromAST(
                        ast, DiagnosticCode.All_declarations_of_merged_declaration_0_must_be_exported_or_not_exported, [decl.getDisplayName()]);
                }
                return false;
            }

            return true;
        }

        private getIndexForInsertingSignatureAtEndOfEnclosingDeclInSignatureList(signature: PullSignatureSymbol, currentSignatures: PullSignatureSymbol[]): number {
            var signatureDecl = signature.getDeclarations()[0];
            Debug.assert(signatureDecl);
            var enclosingDecl = signatureDecl.getParentDecl();
            var indexToInsert = ArrayUtilities.indexOf(currentSignatures, someSignature =>
                someSignature.getDeclarations()[0].getParentDecl() !== enclosingDecl);
            return indexToInsert < 0 ? currentSignatures.length : indexToInsert;
        }

        //
        // decl binding
        //

        private bindEnumDeclarationToPullSymbol(enumContainerDecl: PullDecl) {
            // 1. Test for existing decl - if it exists, use its symbol
            // 2. If no other decl exists, create a new symbol and use that one

            var enumName = enumContainerDecl.name;

            var enumContainerSymbol: PullContainerSymbol = null;
            var enumInstanceSymbol: PullSymbol = null;
            var moduleInstanceTypeSymbol: PullTypeSymbol = null;

            var enumInstanceDecl: PullDecl = enumContainerDecl.getValueDecl();

            var enumDeclKind = enumContainerDecl.kind;

            var parent = this.getParent(enumContainerDecl);
            var parentInstanceSymbol = this.getParent(enumContainerDecl, true);
            var parentDecl = enumContainerDecl.getParentDecl();
            var enumAST = <EnumDeclaration>this.semanticInfoChain.getASTForDecl(enumContainerDecl);

            var isExported = enumContainerDecl.flags & PullElementFlags.Exported;

            var createdNewSymbol = false;

            enumContainerSymbol = <PullContainerSymbol>this.getExistingSymbol(enumContainerDecl, PullElementKind.Enum, parent);

            if (enumContainerSymbol) {
                if (enumContainerSymbol.kind !== enumDeclKind) {
                    // duplicate symbol error
                    this.semanticInfoChain.addDuplicateIdentifierDiagnosticFromAST(
                        enumAST.identifier, enumContainerDecl.getDisplayName(), enumContainerSymbol.getDeclarations()[0].ast());
                    enumContainerSymbol = null;
                }
                else if (!this.checkThatExportsMatch(enumContainerDecl, enumContainerSymbol)) {
                    enumContainerSymbol = null;
                }
            }

            if (enumContainerSymbol) {
                enumInstanceSymbol = enumContainerSymbol.getInstanceSymbol();
            }
            else {
                enumContainerSymbol = new PullContainerSymbol(enumName, enumDeclKind);
                createdNewSymbol = true;

                if (!parent) {
                    this.semanticInfoChain.cacheGlobalSymbol(enumContainerSymbol, PullElementKind.Enum);
                }
            }

            // We add the declaration early so that during any recursive binding of other module decls with the same name, this declaration is present.
            enumContainerSymbol.addDeclaration(enumContainerDecl);
            enumContainerDecl.setSymbol(enumContainerSymbol);

            this.semanticInfoChain.setSymbolForAST(enumAST.identifier, enumContainerSymbol);
            this.semanticInfoChain.setSymbolForAST(enumAST, enumContainerSymbol);

            if (!enumInstanceSymbol) {
                // search for a complementary instance symbol first
                var variableSymbol: PullSymbol = null;
                if (parentInstanceSymbol) {
                    if (isExported) {
                        // We search twice because export visibility does not need to agree
                        variableSymbol = parentInstanceSymbol.findMember(enumName, /*lookInParent*/ false);

                        if (!variableSymbol) {
                            variableSymbol = parentInstanceSymbol.findContainedNonMember(enumName);
                        }
                    }
                    else {
                        variableSymbol = parentInstanceSymbol.findContainedNonMember(enumName);

                        if (!variableSymbol) {
                            variableSymbol = parentInstanceSymbol.findMember(enumName, /*lookInParent*/ false);
                        }
                    }

                    if (variableSymbol) {
                        var declarations = variableSymbol.getDeclarations();

                        if (declarations.length) {
                            var variableSymbolParentDecl = declarations[0].getParentDecl();

                            if (parentDecl !== variableSymbolParentDecl) {
                                variableSymbol = null;
                            }
                        }
                    }
                }
                else if (!(enumContainerDecl.flags & PullElementFlags.Exported)) {
                    // Search locally to this file for a previous declaration that's suitable for augmentation
                    var siblingDecls = parentDecl.getChildDecls();
                    var augmentedDecl: PullDecl = null;

                    for (var i = 0; i < siblingDecls.length; i++) {
                        if (siblingDecls[i] === enumContainerDecl) {
                            break;
                        }

                        if ((siblingDecls[i].name === enumName) && (siblingDecls[i].kind & PullElementKind.SomeValue)) {
                            augmentedDecl = siblingDecls[i];
                            break;
                        }
                    }

                    if (augmentedDecl) {
                        variableSymbol = augmentedDecl.getSymbol();

                        if (variableSymbol) {
                            if (variableSymbol.isContainer()) {
                                variableSymbol = (<PullContainerSymbol>variableSymbol).getInstanceSymbol();
                            }
                            else if (variableSymbol && variableSymbol.isType()) {
                                variableSymbol = (<PullTypeSymbol>variableSymbol).getConstructorMethod();
                            }
                        }
                    }
                }

                // The instance symbol is further set up in bindVariableDeclaration
                if (variableSymbol) {
                    enumInstanceSymbol = variableSymbol;
                    moduleInstanceTypeSymbol = variableSymbol.type;
                }
                else {
                    enumInstanceSymbol = new PullSymbol(enumName, PullElementKind.Variable);
                }

                enumContainerSymbol.setInstanceSymbol(enumInstanceSymbol);

                if (!moduleInstanceTypeSymbol) {
                    moduleInstanceTypeSymbol = new PullTypeSymbol("", PullElementKind.ObjectType);
                    enumInstanceSymbol.type = moduleInstanceTypeSymbol;
                }

                moduleInstanceTypeSymbol.addDeclaration(enumContainerDecl);

                if (!moduleInstanceTypeSymbol.getAssociatedContainerType()) {
                    moduleInstanceTypeSymbol.setAssociatedContainerType(enumContainerSymbol);
                }
            }

            if (createdNewSymbol && parent) {
                if (enumContainerDecl.flags & PullElementFlags.Exported) {
                    parent.addEnclosedMemberType(enumContainerSymbol);
                }
                else {
                    parent.addEnclosedNonMemberType(enumContainerSymbol);
                }
            }

            if (createdNewSymbol) {
                // if the enum container was created, add in the index signature
                this.bindEnumIndexerDeclsToPullSymbols(enumContainerSymbol);
            }
            var valueDecl = enumContainerDecl.getValueDecl();

            if (valueDecl) {
                valueDecl.ensureSymbolIsBound();
            }
        }

        private bindEnumIndexerDeclsToPullSymbols(enumContainerSymbol: PullContainerSymbol): void {
            // Add synthetic index signature to the enum instance
            var enumContainerInstanceTypeSymbol = enumContainerSymbol.getInstanceSymbol().type;

            var syntheticIndexerParameterSymbol = new PullSymbol("x", PullElementKind.Parameter);
            syntheticIndexerParameterSymbol.type = this.semanticInfoChain.numberTypeSymbol;
            syntheticIndexerParameterSymbol.setResolved();
            syntheticIndexerParameterSymbol.setIsSynthesized();

            var syntheticIndexerSignatureSymbol = new PullSignatureSymbol(PullElementKind.IndexSignature);
            syntheticIndexerSignatureSymbol.addParameter(syntheticIndexerParameterSymbol);
            syntheticIndexerSignatureSymbol.returnType = this.semanticInfoChain.stringTypeSymbol;
            syntheticIndexerSignatureSymbol.setResolved();
            syntheticIndexerSignatureSymbol.setIsSynthesized();


            enumContainerInstanceTypeSymbol.addIndexSignature(syntheticIndexerSignatureSymbol);
        }

        private findExistingVariableSymbolForModuleValueDecl(decl: PullDecl): PullSymbol {
            var isExported = hasFlag(decl.flags, PullElementFlags.Exported);
            var modName = decl.name;
            var parentInstanceSymbol = this.getParent(decl, true);
            var parentDecl = decl.getParentDecl();

            var variableSymbol: PullSymbol = null;
            // search for a complementary instance symbol first
            if (parentInstanceSymbol) {
                if (isExported) {
                    // We search twice because export visibility does not need to agree
                    variableSymbol = parentInstanceSymbol.findMember(modName, /*lookInParent*/ false);

                    if (!variableSymbol) {
                        variableSymbol = parentInstanceSymbol.findContainedNonMember(modName);
                    }
                }
                else {
                    variableSymbol = parentInstanceSymbol.findContainedNonMember(modName);

                    if (!variableSymbol) {
                        variableSymbol = parentInstanceSymbol.findMember(modName, /*lookInParent*/ false);
                    }
                }

                // use currentModuleValueDecl to emphasise that we are merging value side of the module
                if (variableSymbol) {
                    var declarations = variableSymbol.getDeclarations();

                    if (declarations.length) {

                        var variableSymbolParentDecl = declarations[0].getParentDecl();
                        var isExportedOrHasTheSameParent = isExported || (parentDecl === variableSymbolParentDecl);
                        // previously defined variable symbol can be reused if 
                        // - current decl is either exported or has the same parent with the previosly defined symbol
                        // AND
                        // exports match for both current and previous decl
                        var canReuseVariableSymbol = isExportedOrHasTheSameParent && this.checkThatExportsMatch(decl, variableSymbol, false);

                        if (!canReuseVariableSymbol) {
                            variableSymbol = null;
                        }
                    }
                }
            }
            else if (!isExported) {
                // Search locally to this file for a declaration that's suitable for augmentation.
                // Note: we have to check all declarations because it may be hte case (due to
                // recursive binding), that a later module gets bound before us.  
                var siblingDecls = parentDecl.getChildDecls();

                for (var i = 0; i < siblingDecls.length; i++) {
                    var sibling = siblingDecls[i];

                    var siblingIsSomeValue = hasFlag(sibling.kind, PullElementKind.SomeValue);
                    var siblingIsFunctionOrHasImplictVarFlag =
                        hasFlag(sibling.kind, PullElementKind.SomeFunction) ||
                        hasFlag(sibling.flags, PullElementFlags.ImplicitVariable)

                        // We need to determine of this sibling is something this module definition can augment
                        // Augmentable items are: Function declarations, Classes (whos value decl is its constructor method), Enums
                        var isSiblingAnAugmentableVariable =
                        sibling !== decl &&
                        sibling !== decl.getValueDecl() &&
                        sibling.name === modName &&
                        siblingIsSomeValue &&
                        siblingIsFunctionOrHasImplictVarFlag;

                    if (isSiblingAnAugmentableVariable) {

                        // IMPORTANT: We don't want to just call sibling.getSymbol() here.  
                        // That would force the sibling to get bound.  Something we don't want
                        // to do while binding ourselves (to avoid recursion issues).
                        if (sibling.hasSymbol()) {
                            variableSymbol = sibling.getSymbol();
                            if (variableSymbol.isContainer()) {
                                variableSymbol = (<PullContainerSymbol>variableSymbol).getInstanceSymbol();
                            }
                            else if (variableSymbol && variableSymbol.isType()) {
                                variableSymbol = (<PullTypeSymbol>variableSymbol).getConstructorMethod();
                            }

                            break;
                        }
                    }
                }
            }
            return variableSymbol;
        }

        private bindModuleDeclarationToPullSymbol(moduleContainerDecl: PullDecl) {
            // 1. Test for existing symbol - if it exists, use its symbol
            // 2. If no other symbols exists, create a new symbol and use that one

            var modName = moduleContainerDecl.name;

            var moduleContainerTypeSymbol: PullContainerSymbol = null;
            var moduleKind = moduleContainerDecl.kind;

            var parent = this.getParent(moduleContainerDecl);
            var parentInstanceSymbol = this.getParent(moduleContainerDecl, true);
            var parentDecl = moduleContainerDecl.getParentDecl();
            var moduleNameAST = this.semanticInfoChain.getASTForDecl(moduleContainerDecl);
            var moduleDeclAST: AST = ASTHelpers.getEnclosingModuleDeclaration(moduleNameAST);
            if (!moduleDeclAST) {
                Debug.assert(moduleKind === PullElementKind.DynamicModule);
                Debug.assert(moduleNameAST.kind() === SyntaxKind.SourceUnit);
                // This is the module decl for the top level synthesized external module.
                moduleDeclAST = moduleNameAST;
            }

            var isExported = hasFlag(moduleContainerDecl.flags, PullElementFlags.Exported);
            var searchKind = PullElementKind.SomeContainer;
            var isInitializedModule = (moduleContainerDecl.flags & PullElementFlags.SomeInitializedModule) !== 0;

            if (parent && moduleKind === PullElementKind.DynamicModule) {
                // Dynamic modules cannot be parented
                this.semanticInfoChain.addDiagnosticFromAST(
                    moduleNameAST, DiagnosticCode.Ambient_external_module_declaration_must_be_defined_in_global_context, null);
            }

            var createdNewSymbol = false;

            moduleContainerTypeSymbol = <PullContainerSymbol>this.getExistingSymbol(moduleContainerDecl, searchKind, parent);

            if (moduleContainerTypeSymbol) {
                if (moduleContainerTypeSymbol.kind !== moduleKind) {
                    // duplicate symbol error
                    if (isInitializedModule) {
                        this.semanticInfoChain.addDuplicateIdentifierDiagnosticFromAST(
                            moduleNameAST, moduleContainerDecl.getDisplayName(), /*additionalLocation:*/ moduleContainerTypeSymbol.getDeclarations()[0].ast());
                    }

                    moduleContainerTypeSymbol = null;
                }
                else if (moduleKind === PullElementKind.DynamicModule) {
                    // Dynamic modules cannot be reopened.
                    this.semanticInfoChain.addDiagnosticFromAST(moduleNameAST, DiagnosticCode.Ambient_external_module_declaration_cannot_be_reopened);
                }
                else if (!this.checkThatExportsMatch(moduleContainerDecl, moduleContainerTypeSymbol)) {
                    moduleContainerTypeSymbol = null;
                }
            }

            if (!moduleContainerTypeSymbol) {
                moduleContainerTypeSymbol = new PullContainerSymbol(modName, moduleKind);
                createdNewSymbol = true;

                if (!parent) {
                    this.semanticInfoChain.cacheGlobalSymbol(moduleContainerTypeSymbol, searchKind);
                }
            }

            // We add the declaration early so that during any recursive binding of other module decls with the same name, this declaration is present.
            moduleContainerTypeSymbol.addDeclaration(moduleContainerDecl);
            moduleContainerDecl.setSymbol(moduleContainerTypeSymbol);

            this.semanticInfoChain.setSymbolForAST(moduleNameAST, moduleContainerTypeSymbol);
            this.semanticInfoChain.setSymbolForAST(moduleDeclAST, moduleContainerTypeSymbol);

            var currentModuleValueDecl = moduleContainerDecl.getValueDecl();

            // If we have an enum with more than one declaration, then this enum's first element
            // must have an initializer.
            var moduleDeclarations = moduleContainerTypeSymbol.getDeclarations();

            if (createdNewSymbol) {
                if (parent) {
                    if (moduleContainerDecl.flags & PullElementFlags.Exported) {
                        parent.addEnclosedMemberContainer(moduleContainerTypeSymbol);
                    }
                    else {
                        parent.addEnclosedNonMemberContainer(moduleContainerTypeSymbol);
                    }
                }
            }

            // do not create symbol for the module instance upfront - in some cases it can be harmful.
            // var x: B.C; // 1
            // declare function B(): B.C;
            // declare module B {
            //   export class C {
            //   }
            //}
            // When binding B.C in line 1 we first will bind module B as container (*) ->then we'll bind value side of the module.
            // During binding of the value side will discover that there are 2 value declarations with name B in scope, one - function, another - value decl for the module.
            // Function will be bound first so when we start binding module value decl - we'll find existing symbol that correspond for function and reuse it.
            // If we create instance symbol at point (*) - it will never be used.
            // To avoid this problem we'll bind value decl first and then check if it has symbol - if yes - this symbol will be used as module instance symbol
            if (currentModuleValueDecl) {
                currentModuleValueDecl.ensureSymbolIsBound();

                var instanceSymbol: PullSymbol = null;
                var instanceTypeSymbol: PullTypeSymbol = null;
                if (currentModuleValueDecl.hasSymbol()) {
                    instanceSymbol = currentModuleValueDecl.getSymbol();
                }
                else {
                    // We associate the value decl to the module instance symbol. This should have
                    // already been achieved by ensureSymbolIsBound, but if bindModuleDeclarationToPullSymbol
                    // was called recursively while in the middle of binding the value decl, the cycle
                    // will be short-circuited. With a more organized binding pattern, this situation
                    // shouldn't be possible.
                    instanceSymbol = new PullSymbol(modName, PullElementKind.Variable);
                    currentModuleValueDecl.setSymbol(instanceSymbol);
                    if (!instanceSymbol.hasDeclaration(currentModuleValueDecl)) {
                        instanceSymbol.addDeclaration(currentModuleValueDecl);
                    }
                }

                if (!instanceSymbol.type) {
                    instanceSymbol.type = new PullTypeSymbol("", PullElementKind.ObjectType);
                }

                moduleContainerTypeSymbol.setInstanceSymbol(instanceSymbol);

                if (!instanceSymbol.type.getAssociatedContainerType()) {
                    instanceSymbol.type.setAssociatedContainerType(moduleContainerTypeSymbol);
                }

            }
        }

        // aliases
        private bindImportDeclaration(importDeclaration: PullDecl) {
            var declFlags = importDeclaration.flags;
            var declKind = importDeclaration.kind;
            var importDeclAST = <VariableDeclarator>this.semanticInfoChain.getASTForDecl(importDeclaration);

            var isExported = false;
            var importSymbol: PullTypeAliasSymbol = null;
            var declName = importDeclaration.name;
            var parentHadSymbol = false;
            var parent = this.getParent(importDeclaration);

            importSymbol = <PullTypeAliasSymbol>this.getExistingSymbol(importDeclaration, PullElementKind.SomeContainer, parent);

            if (importSymbol) {
                parentHadSymbol = true;
            }

            if (importSymbol) {
                this.semanticInfoChain.addDuplicateIdentifierDiagnosticFromAST(
                    importDeclAST, importDeclaration.getDisplayName(), importSymbol.getDeclarations()[0].ast());
                importSymbol = null;
            }

            if (!importSymbol) {
                importSymbol = new PullTypeAliasSymbol(declName);

                if (!parent) {
                    this.semanticInfoChain.cacheGlobalSymbol(importSymbol, PullElementKind.SomeContainer);
                }
            }

            importSymbol.addDeclaration(importDeclaration);
            importDeclaration.setSymbol(importSymbol);

            this.semanticInfoChain.setSymbolForAST(importDeclAST, importSymbol);

            if (parent && !parentHadSymbol) {

                if (declFlags & PullElementFlags.Exported) {
                    parent.addEnclosedMemberContainer(importSymbol);
                }
                else {
                    parent.addEnclosedNonMemberContainer(importSymbol);
                }
            }
        }

        // Preserves required binding order for a declaration with given name to prevent cases like:
        // module A { export module B { var x = 1} }
        // module A { export class B { c } }
        // Here if class declaration is bound before module declaration (i.e. because of IDE activities)
        // we won't report expected 'duplicate identifier' error for the class.
        private ensurePriorDeclarationsAreBound(container: PullSymbol, currentDecl: PullDecl) {
            if (!container) {
                return;
            }

            var parentDecls = container.getDeclarations();
            for (var i = 0; i < parentDecls.length; ++i) {
                var parentDecl = parentDecls[i];
                var childDecls = parentDecl.getChildDecls();
                for (var j = 0; j < childDecls.length; ++j) {

                    var childDecl = childDecls[j];
                    if (childDecl === currentDecl) {
                        return;
                    }

                    if (childDecl.name === currentDecl.name) {
                        childDecl.ensureSymbolIsBound();
                    }
                }
            }
        }

        // classes
        private bindClassDeclarationToPullSymbol(classDecl: PullDecl) {

            var className = classDecl.name;
            var classSymbol: PullTypeSymbol = null;

            var constructorSymbol: PullSymbol = null;
            var constructorTypeSymbol: PullTypeSymbol = null;

            var classAST = <ClassDeclaration>this.semanticInfoChain.getASTForDecl(classDecl);

            var parent = this.getParent(classDecl);

            // TODO: we should in general get all the decls from the parent and bind all of them together,
            // but thats a major change and we should fix it without losing perf, so adding just a todo here.
            this.ensurePriorDeclarationsAreBound(parent, classDecl);

            var parentDecl = classDecl.getParentDecl();
            var isExported = classDecl.flags & PullElementFlags.Exported;
            var isGeneric = false;

            classSymbol = <PullTypeSymbol>this.getExistingSymbol(classDecl, PullElementKind.SomeType, parent);

            // Only error if it is an interface (for classes and enums we will error when we bind the implicit variable)
            if (classSymbol && classSymbol.kind === PullElementKind.Interface) {
                this.semanticInfoChain.addDuplicateIdentifierDiagnosticFromAST(
                    classAST.identifier, classDecl.getDisplayName(), classSymbol.getDeclarations()[0].ast());
                classSymbol = null;
            }

            classSymbol = new PullTypeSymbol(className, PullElementKind.Class);

            if (!parent) {
                this.semanticInfoChain.cacheGlobalSymbol(classSymbol, PullElementKind.Class);
            }

            classSymbol.addDeclaration(classDecl);

            classDecl.setSymbol(classSymbol);

            this.semanticInfoChain.setSymbolForAST(classAST.identifier, classSymbol);
            this.semanticInfoChain.setSymbolForAST(classAST, classSymbol);

            if (parent) {
                if (classDecl.flags & PullElementFlags.Exported) {
                    parent.addEnclosedMemberType(classSymbol);
                }
                else {
                    parent.addEnclosedNonMemberType(classSymbol);
                }
            }

            var typeParameterDecls = classDecl.getTypeParameters();

            // PULLREVIEW: Now that we clean type parameters, searching is redundant
            for (var i = 0; i < typeParameterDecls.length; i++) {

                var typeParameterSymbol = classSymbol.findTypeParameter(typeParameterDecls[i].name);

                if (typeParameterSymbol) {
                    var typeParameterAST = this.semanticInfoChain.getASTForDecl(typeParameterSymbol.getDeclarations()[0]);
                    this.semanticInfoChain.addDiagnosticFromAST(typeParameterAST, DiagnosticCode.Duplicate_identifier_0, [typeParameterSymbol.getName()]);
                }

                typeParameterSymbol = new PullTypeParameterSymbol(typeParameterDecls[i].name);

                classSymbol.addTypeParameter(typeParameterSymbol);
                typeParameterSymbol.addDeclaration(typeParameterDecls[i]);
                typeParameterDecls[i].setSymbol(typeParameterSymbol);
            }

            constructorSymbol = classSymbol.getConstructorMethod();
            constructorTypeSymbol = constructorSymbol ? constructorSymbol.type : null;

            if (!constructorSymbol) {
                // First, try to find a sibling value decl that is already bound. If there is one, reuse it.
                var siblingValueDecls: PullDecl[] = null;
                if (parentDecl) {
                    siblingValueDecls = parentDecl.searchChildDecls(className, PullElementKind.SomeValue);
                    // The first decl should have the right symbol
                    if (siblingValueDecls && siblingValueDecls[0] && siblingValueDecls[0].hasSymbol()) {
                        constructorSymbol = siblingValueDecls[0].getSymbol();
                    }
                }

                if (constructorSymbol) {
                    constructorTypeSymbol = constructorSymbol.type;
                }
                else {
                    constructorSymbol = new PullSymbol(className, PullElementKind.ConstructorMethod);
                    constructorTypeSymbol = new PullTypeSymbol("", PullElementKind.ConstructorType);
                    constructorSymbol.setIsSynthesized();
                    constructorSymbol.type = constructorTypeSymbol;
                }

                classSymbol.setConstructorMethod(constructorSymbol);
                classSymbol.setHasDefaultConstructor();
            }

            if (constructorSymbol.getIsSynthesized()) {
                constructorSymbol.addDeclaration(classDecl.getValueDecl());
                constructorTypeSymbol.addDeclaration(classDecl);
            }
            else {
                classSymbol.setHasDefaultConstructor(false);
            }

            constructorTypeSymbol.setAssociatedContainerType(classSymbol);

            var valueDecl = classDecl.getValueDecl();

            if (valueDecl) {
                valueDecl.ensureSymbolIsBound();
            }

            // Create the constructorTypeSymbol
            this.bindStaticPrototypePropertyOfClass(classAST, classSymbol, constructorTypeSymbol);
        }

        // interfaces
        private bindInterfaceDeclarationToPullSymbol(interfaceDecl: PullDecl) {

            // 1. Test for existing decl - if it exists, use its symbol
            // 2. If no other decl exists, create a new symbol and use that one
            var interfaceName = interfaceDecl.name;
            var interfaceSymbol: PullTypeSymbol = null;

            var interfaceAST = <InterfaceDeclaration>this.semanticInfoChain.getASTForDecl(interfaceDecl);
            var createdNewSymbol = false;
            var parent = this.getParent(interfaceDecl);

            // We're not yet ready to support interfaces augmenting classes (or vice versa)
            var acceptableSharedKind = PullElementKind.Interface; // | PullElementKind.Class | PullElementKind.Enum;

            interfaceSymbol = <PullTypeSymbol>this.getExistingSymbol(interfaceDecl, PullElementKind.SomeType, parent);

            if (interfaceSymbol) {
                if (!(interfaceSymbol.kind & acceptableSharedKind)) {
                    this.semanticInfoChain.addDuplicateIdentifierDiagnosticFromAST(
                        interfaceAST.identifier, interfaceDecl.getDisplayName(), interfaceSymbol.getDeclarations()[0].ast());
                    interfaceSymbol = null;
                }
                else if (!this.checkThatExportsMatch(interfaceDecl, interfaceSymbol)) {
                    interfaceSymbol = null;
                }
            }

            if (!interfaceSymbol) {
                interfaceSymbol = new PullTypeSymbol(interfaceName, PullElementKind.Interface);
                createdNewSymbol = true;

                if (!parent) {
                    this.semanticInfoChain.cacheGlobalSymbol(interfaceSymbol, acceptableSharedKind);
                }
            }

            interfaceSymbol.addDeclaration(interfaceDecl);
            interfaceDecl.setSymbol(interfaceSymbol);

            if (createdNewSymbol) {

                if (parent) {
                    if (interfaceDecl.flags & PullElementFlags.Exported) {
                        parent.addEnclosedMemberType(interfaceSymbol);
                    }
                    else {
                        parent.addEnclosedNonMemberType(interfaceSymbol);
                    }
                }
            }

            var typeParameters = interfaceDecl.getTypeParameters();
            var typeParameter: PullTypeParameterSymbol;
            var typeParameterDecls: PullDecl[] = null;

            // PULLREVIEW: Now that we clean type parameters, searching is redundant
            for (var i = 0; i < typeParameters.length; i++) {

                typeParameter = interfaceSymbol.findTypeParameter(typeParameters[i].name);

                if (!typeParameter) {
                    typeParameter = new PullTypeParameterSymbol(typeParameters[i].name);

                    interfaceSymbol.addTypeParameter(typeParameter);
                }
                else {
                    typeParameterDecls = typeParameter.getDeclarations();

                    // Because interface declarations can be "split", it's safe to re-use type parameters
                    // of the same name across interface declarations in the same binding phase
                    for (var j = 0; j < typeParameterDecls.length; j++) {
                        var typeParameterDeclParent = typeParameterDecls[j].getParentDecl();

                        if (typeParameterDeclParent && typeParameterDeclParent === interfaceDecl) {
                            var typeParameterAST = this.semanticInfoChain.getASTForDecl(typeParameterDecls[0]);
                            this.semanticInfoChain.addDiagnosticFromAST(typeParameterAST, DiagnosticCode.Duplicate_identifier_0, [typeParameter.getName()]);

                            break;
                        }
                    }
                }

                typeParameter.addDeclaration(typeParameters[i]);
                typeParameters[i].setSymbol(typeParameter);
            }
        }

        private bindObjectTypeDeclarationToPullSymbol(objectDecl: PullDecl) {
            var objectSymbolAST: AST = this.semanticInfoChain.getASTForDecl(objectDecl);

            var objectSymbol = new PullTypeSymbol("", PullElementKind.ObjectType);

            objectSymbol.addDeclaration(objectDecl);
            objectDecl.setSymbol(objectSymbol);

            this.semanticInfoChain.setSymbolForAST(objectSymbolAST, objectSymbol);

            var childDecls = objectDecl.getChildDecls();

            for (var i = 0; i < childDecls.length; i++) {
                this.bindDeclToPullSymbol(childDecls[i]);
            }
        }

        private bindConstructorTypeDeclarationToPullSymbol(constructorTypeDeclaration: PullDecl) {
            var declKind = constructorTypeDeclaration.kind;
            var declFlags = constructorTypeDeclaration.flags;
            var constructorTypeAST = this.semanticInfoChain.getASTForDecl(constructorTypeDeclaration);

            var constructorTypeSymbol = new PullTypeSymbol("", PullElementKind.ConstructorType);

            constructorTypeDeclaration.setSymbol(constructorTypeSymbol);
            constructorTypeSymbol.addDeclaration(constructorTypeDeclaration);
            this.semanticInfoChain.setSymbolForAST(constructorTypeAST, constructorTypeSymbol);

            var signature = new PullSignatureSymbol(PullElementKind.ConstructSignature);

            var funcDecl = <ConstructorType>this.semanticInfoChain.getASTForDecl(constructorTypeDeclaration);
            if (lastParameterIsRest(funcDecl.parameterList)) {
                signature.hasVarArgs = true;
            }

            signature.addDeclaration(constructorTypeDeclaration);
            constructorTypeDeclaration.setSignatureSymbol(signature);

            this.bindParameterSymbols(funcDecl, ASTHelpers.parametersFromParameterList(funcDecl.parameterList), constructorTypeSymbol, signature);

            var typeParameters = constructorTypeDeclaration.getTypeParameters();
            var typeParameter: PullTypeParameterSymbol;

            for (var i = 0; i < typeParameters.length; i++) {

                typeParameter = constructorTypeSymbol.findTypeParameter(typeParameters[i].name);

                if (!typeParameter) {
                    typeParameter = new PullTypeParameterSymbol(typeParameters[i].name);

                    signature.addTypeParameter(typeParameter);
                }
                else {
                    var typeParameterAST = this.semanticInfoChain.getASTForDecl(typeParameter.getDeclarations()[0]);
                    this.semanticInfoChain.addDiagnosticFromAST(typeParameterAST, DiagnosticCode.Duplicate_identifier_0, [typeParameter.name]);
                }

                typeParameter.addDeclaration(typeParameters[i]);
                typeParameters[i].setSymbol(typeParameter);
            }

            // add the implicit construct member for this function type
            constructorTypeSymbol.appendConstructSignature(signature);
        }

        // variables
        private bindVariableDeclarationToPullSymbol(variableDeclaration: PullDecl) {
            var declFlags = variableDeclaration.flags;
            var declKind = variableDeclaration.kind;
            var varDeclAST = this.semanticInfoChain.getASTForDecl(variableDeclaration);
            var nameAST = varDeclAST.kind() === SyntaxKind.ClassDeclaration
                ? (<ClassDeclaration>varDeclAST).identifier
                : varDeclAST.kind() === SyntaxKind.VariableDeclarator
                    ? (<VariableDeclarator>varDeclAST).propertyName
                    : varDeclAST.kind() === SyntaxKind.EnumDeclaration
                        ? (<EnumDeclaration>varDeclAST).identifier
                        : <AST>varDeclAST;

            var isExported = (declFlags & PullElementFlags.Exported) !== 0;

            var variableSymbol: PullSymbol = null;

            var declName = variableDeclaration.name;

            var parentHadSymbol = false;

            var parent = this.getParent(variableDeclaration, true);

            var parentDecl = variableDeclaration.getParentDecl();

            var isImplicit = (declFlags & PullElementFlags.ImplicitVariable) !== 0;
            var isModuleValue = (declFlags & (PullElementFlags.InitializedModule)) !== 0;
            var isEnumValue = (declFlags & PullElementFlags.Enum) !== 0;
            var isClassConstructorVariable = (declFlags & PullElementFlags.ClassConstructorVariable) !== 0;
            variableSymbol = this.getExistingSymbol(variableDeclaration, PullElementKind.SomeValue, parent);

            if (!variableSymbol && isModuleValue) {
                variableSymbol = this.findExistingVariableSymbolForModuleValueDecl(variableDeclaration.getContainerDecl());
            }

            if (variableSymbol && !variableSymbol.isType()) {
                parentHadSymbol = true;
            }

            var decl: PullDecl;
            var decls: PullDecl[];
            var ast: AST;
            var members: PullSymbol[];

            if (variableSymbol) {

                var prevKind = variableSymbol.kind;
                var prevIsEnum = variableSymbol.anyDeclHasFlag(PullElementFlags.Enum);
                var prevIsClassConstructorVariable = variableSymbol.anyDeclHasFlag(PullElementFlags.ClassConstructorVariable);
                var prevIsModuleValue = variableSymbol.allDeclsHaveFlag(PullElementFlags.InitializedModule);
                var prevIsImplicit = variableSymbol.anyDeclHasFlag(PullElementFlags.ImplicitVariable);
                var prevIsFunction = ArrayUtilities.any(variableSymbol.getDeclarations(), decl => decl.kind === PullElementKind.Function);
                var prevIsAmbient = variableSymbol.allDeclsHaveFlag(PullElementFlags.Ambient);
                var isAmbientOrPrevIsAmbient = prevIsAmbient || (variableDeclaration.flags & PullElementFlags.Ambient) !== 0;
                var prevDecl = variableSymbol.getDeclarations()[0];
                var prevParentDecl = prevDecl.getParentDecl();
                var bothAreGlobal = parentDecl && (parentDecl.kind === PullElementKind.Script) && (prevParentDecl.kind === PullElementKind.Script);
                var shareParent = bothAreGlobal || prevDecl.getParentDecl() === variableDeclaration.getParentDecl();
                var prevIsParam = shareParent && prevKind === PullElementKind.Parameter && declKind == PullElementKind.Variable;

                var acceptableRedeclaration = prevIsParam ||
                    (isImplicit &&
                    ((!isEnumValue && !isClassConstructorVariable && prevIsFunction) || // Enums can't mix with functions
                    ((isModuleValue || isEnumValue) && (prevIsModuleValue || prevIsEnum)) || // modules and enums can mix freely
                    (isClassConstructorVariable && prevIsModuleValue && isAmbientOrPrevIsAmbient) || // an ambient class can be declared after a module
                    (isModuleValue && prevIsClassConstructorVariable))); // the module variable can come after the class constructor variable

                // if the previous declaration is a non-ambient class, it must be located in the same file as this declaration
                if (acceptableRedeclaration && (prevIsClassConstructorVariable || prevIsFunction) && !isAmbientOrPrevIsAmbient) {
                    if (prevDecl.fileName() !== variableDeclaration.fileName()) {
                        this.semanticInfoChain.addDiagnostic(PullHelpers.diagnosticFromDecl(variableDeclaration,
                            DiagnosticCode.Module_0_cannot_merge_with_previous_declaration_of_1_in_a_different_file_2, [declName, declName, prevDecl.fileName()]));
                        variableSymbol.type = this.semanticInfoChain.getResolver().getNewErrorTypeSymbol(declName);
                    }
                }

                if (!acceptableRedeclaration || prevIsParam) {
                    // If neither of them are implicit (both explicitly declared as vars), we won't error now. We'll check that the types match during type check.
                    // However, we will error when a variable clobbers a function, or when the two explicit var declarations are not in the same parent declaration
                    if (!prevIsParam && (isImplicit || prevIsImplicit || hasFlag(prevKind, PullElementKind.SomeFunction)) || !shareParent) {
                        this.semanticInfoChain.addDuplicateIdentifierDiagnosticFromAST(
                            nameAST, variableDeclaration.getDisplayName(), variableSymbol.getDeclarations()[0].ast());
                        variableSymbol.type = this.semanticInfoChain.getResolver().getNewErrorTypeSymbol(declName);
                    }
                    else { // double var declaration (keep them separate so we can verify type sameness during type check)
                        this.checkThatExportsMatch(variableDeclaration, variableSymbol);
                        variableSymbol = null;
                        parentHadSymbol = false;
                    }
                }

                // If we haven't given an error so far and we merged two decls, check that the exports match
                // Only report the error if they are not both initialized modules (if they are, the bind module code would report the error)
                if (variableSymbol &&
                    !(variableSymbol.type && variableSymbol.type.isError()) &&
                    !this.checkThatExportsMatch(variableDeclaration, variableSymbol, !(isModuleValue && prevIsModuleValue))) {
                        variableSymbol.type = this.semanticInfoChain.getResolver().getNewErrorTypeSymbol(declName);
                }
            }

            if ((declFlags & PullElementFlags.ImplicitVariable) === 0) {
                if (!variableSymbol) {
                    variableSymbol = new PullSymbol(declName, declKind);
                    if (!parent && parentDecl.kind === PullElementKind.Script) {
                        this.semanticInfoChain.cacheGlobalSymbol(variableSymbol, declKind);
                    }
                }

                variableSymbol.addDeclaration(variableDeclaration);
                variableDeclaration.setSymbol(variableSymbol);

                this.semanticInfoChain.setSymbolForAST(nameAST, variableSymbol);
                this.semanticInfoChain.setSymbolForAST(varDeclAST, variableSymbol);
            }
            else if (!parentHadSymbol) {

                if (isClassConstructorVariable) {
                    // it's really an implicit class decl, so we need to set the type of the symbol to
                    // the constructor type
                    // Note that we would have already found the class symbol in the search above
                    var classTypeSymbol: PullTypeSymbol = <PullTypeSymbol>variableSymbol;

                    // PULLTODO: In both this case and the case below, we should have already received the
                    // class or module symbol as the variableSymbol found above
                    if (parent) {
                        members = parent.getMembers();

                        for (var i = 0; i < members.length; i++) {
                            if ((members[i].name === declName) && (members[i].kind === PullElementKind.Class)) {
                                classTypeSymbol = <PullTypeSymbol>members[i];
                                break;
                            }
                        }
                    }

                    if (!classTypeSymbol) {
                        var containerDecl = variableDeclaration.getContainerDecl()
                        classTypeSymbol = <PullTypeSymbol>containerDecl.getSymbol();
                        if (!classTypeSymbol) {
                            classTypeSymbol = <PullTypeSymbol>this.semanticInfoChain.findTopLevelSymbol(declName, PullElementKind.SomeType, variableDeclaration);
                        }
                    }

                    if (classTypeSymbol && (classTypeSymbol.kind !== PullElementKind.Class)) {
                        classTypeSymbol = null;
                    }

                    if (classTypeSymbol && classTypeSymbol.isClass()) { // protect against duplicate declarations
                        //replaceProperty = variableSymbol && variableSymbol.getIsSynthesized();

                        //if (replaceProperty) {
                        //    previousProperty = variableSymbol;
                        //}

                        variableSymbol = classTypeSymbol.getConstructorMethod();
                        variableDeclaration.setSymbol(variableSymbol);

                        // set the AST to the constructor method's if possible
                        decls = classTypeSymbol.getDeclarations();

                        if (decls.length) {

                            decl = decls[decls.length - 1];
                            ast = this.semanticInfoChain.getASTForDecl(decl);
                        }
                    }
                    else {
                        // PULLTODO: Clodules/Interfaces on classes
                        if (!variableSymbol) {
                            variableSymbol = new PullSymbol(declName, declKind);
                        }

                        variableSymbol.addDeclaration(variableDeclaration);
                        variableDeclaration.setSymbol(variableSymbol);

                        variableSymbol.type = this.semanticInfoChain.anyTypeSymbol;
                    }
                }
                else if (declFlags & PullElementFlags.SomeInitializedModule) {
                    var moduleContainerTypeSymbol: PullContainerSymbol = null;
                    var moduleParent = this.getParent(variableDeclaration);

                    if (moduleParent) {
                        members = moduleParent.getMembers();

                        for (var i = 0; i < members.length; i++) {
                            if ((members[i].name === declName) && (members[i].isContainer())) {
                                moduleContainerTypeSymbol = <PullContainerSymbol>members[i];
                                break;
                            }
                        }
                    }

                    if (!moduleContainerTypeSymbol) {
                        var containerDecl = variableDeclaration.getContainerDecl();
                        moduleContainerTypeSymbol = <PullContainerSymbol>containerDecl.getSymbol();
                        if (!moduleContainerTypeSymbol) {
                            moduleContainerTypeSymbol = <PullContainerSymbol>this.semanticInfoChain.findTopLevelSymbol(declName, PullElementKind.SomeContainer, variableDeclaration);

                            if (!moduleContainerTypeSymbol) {
                                moduleContainerTypeSymbol = <PullContainerSymbol>this.semanticInfoChain.findTopLevelSymbol(declName, PullElementKind.Enum, variableDeclaration);
                            }
                        }
                    }

                    if (moduleContainerTypeSymbol && (!moduleContainerTypeSymbol.isContainer())) {
                        moduleContainerTypeSymbol = null;
                    }

                    if (moduleContainerTypeSymbol) {
                        variableSymbol = moduleContainerTypeSymbol.getInstanceSymbol();
                        if (!variableSymbol) {
                            variableSymbol = new PullSymbol(declName, declKind);
                            variableSymbol.type = new PullTypeSymbol("", PullElementKind.ObjectType);
                        }
                        // If this method calls bindModuleDeclarationToPullSymbol recursively,
                        // we may associate the variable decl with its symbol in that recursive
                        // call before we do it here. Therefore, make sure the symbol doesn't already
                        // have the decl before adding it. Just like in bindModuleDeclarationToPullSymbol,
                        // we shouldn't need this maneuver with a more iterative binding pattern.
                        if (!variableSymbol.hasDeclaration(variableDeclaration)) {
                            variableSymbol.addDeclaration(variableDeclaration);
                        }
                        variableDeclaration.setSymbol(variableSymbol);
                    }
                    else {
                        Debug.assert(false, "Attempted to bind invalid implicit variable symbol");
                    }
                }
            }
            else {
                if (!variableSymbol.hasDeclaration(variableDeclaration)) {
                    variableSymbol.addDeclaration(variableDeclaration);
                }
                variableDeclaration.setSymbol(variableSymbol);
            }

            var containerDecl = variableDeclaration.getContainerDecl();
            if (variableSymbol && variableSymbol.type && containerDecl && !variableSymbol.type.hasDeclaration(containerDecl)) {
                variableSymbol.type.addDeclaration(containerDecl)
            }

            if (parent && !parentHadSymbol) {

                if (declFlags & PullElementFlags.Exported) {
                    parent.addMember(variableSymbol);
                }
                else {
                    parent.addEnclosedNonMember(variableSymbol);
                }
            }
        }

        private bindCatchVariableToPullSymbol(variableDeclaration: PullDecl) {
            var declFlags = variableDeclaration.flags;
            var declKind = variableDeclaration.kind;
            var identifier = <Identifier>this.semanticInfoChain.getASTForDecl(variableDeclaration);

            var declName = variableDeclaration.name;

            var variableSymbol = new PullSymbol(declName, declKind);

            variableSymbol.addDeclaration(variableDeclaration);
            variableDeclaration.setSymbol(variableSymbol);

            // Catch variable are of type 'any'.  So we don't need to actually resolve anything later.
            variableSymbol.type = this.semanticInfoChain.anyTypeSymbol;

            this.semanticInfoChain.setSymbolForAST(identifier, variableSymbol);
        }

        // properties
        private bindEnumMemberDeclarationToPullSymbol(propertyDeclaration: PullDecl) {
            var declFlags = propertyDeclaration.flags;
            var declKind = propertyDeclaration.kind;
            var propDeclAST = <EnumElement>this.semanticInfoChain.getASTForDecl(propertyDeclaration);

            var declName = propertyDeclaration.name;

            var parentHadSymbol = false;

            var parent = this.getParent(propertyDeclaration, true);

            var propertySymbol = parent.findMember(declName, /*lookInParent*/ false);

            if (propertySymbol) {
                this.semanticInfoChain.addDuplicateIdentifierDiagnosticFromAST(
                    propDeclAST.propertyName, propertyDeclaration.getDisplayName(), propertySymbol.getDeclarations()[0].ast());
            }

            if (propertySymbol) {
                parentHadSymbol = true;
            }

            if (!parentHadSymbol) {
                propertySymbol = new PullSymbol(declName, declKind);
            }

            propertySymbol.addDeclaration(propertyDeclaration);
            propertyDeclaration.setSymbol(propertySymbol);

            this.semanticInfoChain.setSymbolForAST(propDeclAST.propertyName, propertySymbol);
            this.semanticInfoChain.setSymbolForAST(propDeclAST, propertySymbol);

            if (parent && !parentHadSymbol) {
                parent.addMember(propertySymbol);
            }
        }

        private bindPropertyDeclarationToPullSymbol(propertyDeclaration: PullDecl) {
            var declFlags = propertyDeclaration.flags;
            var declKind = propertyDeclaration.kind;

            var ast = this.semanticInfoChain.getASTForDecl(propertyDeclaration);
            var astName = ast.kind() === SyntaxKind.MemberVariableDeclaration
                ? (<MemberVariableDeclaration>ast).variableDeclarator.propertyName
                : ast.kind() === SyntaxKind.PropertySignature
                    ? (<PropertySignature>ast).propertyName
                    : ast.kind() === SyntaxKind.Parameter
                        ? (<Parameter>ast).identifier
                        : (<VariableDeclarator>ast).propertyName;

            var isStatic = false;
            var isOptional = false;

            var propertySymbol: PullSymbol = null;

            if (hasFlag(declFlags, PullElementFlags.Static)) {
                isStatic = true;
            }

            if (hasFlag(declFlags, PullElementFlags.Optional)) {
                isOptional = true;
            }

            var declName = propertyDeclaration.name;

            var parentHadSymbol = false;

            var parent = this.getParent(propertyDeclaration, true);

            if (parent.isClass() && isStatic) {
                parent = parent.getConstructorMethod().type;
            }

            propertySymbol = parent.findMember(declName, /*lookInParent*/ false);

            if (propertySymbol) {
                this.semanticInfoChain.addDuplicateIdentifierDiagnosticFromAST(
                    astName, propertyDeclaration.getDisplayName(), propertySymbol.getDeclarations()[0].ast());
            }

            if (propertySymbol) {
                parentHadSymbol = true;
            }

            var classTypeSymbol: PullTypeSymbol;

            if (!parentHadSymbol) {
                propertySymbol = new PullSymbol(declName, declKind);
            }

            propertySymbol.addDeclaration(propertyDeclaration);
            propertyDeclaration.setSymbol(propertySymbol);

            this.semanticInfoChain.setSymbolForAST(astName, propertySymbol);
            this.semanticInfoChain.setSymbolForAST(ast, propertySymbol);

            if (isOptional) {
                propertySymbol.isOptional = true;
            }

            if (parent && !parentHadSymbol) {
                parent.addMember(propertySymbol);
            }
        }

        // parameters
        private bindParameterSymbols(functionDeclaration: AST, parameterList: IParameters, funcType: PullTypeSymbol, signatureSymbol: PullSignatureSymbol) {
            // create a symbol for each ast
            // if it's a property, add the symbol to the enclosing type's member list
            var parameters: PullSymbol[] = [];
            var params = createIntrinsicsObject<boolean>();
            var funcDecl = this.semanticInfoChain.getDeclForAST(functionDeclaration);

            if (parameterList) {
                for (var i = 0, n = parameterList.length; i < n; i++) {
                    var argDecl = parameterList.astAt(i);
                    var id = parameterList.identifierAt(i);
                    var decl = this.semanticInfoChain.getDeclForAST(argDecl);
                    var isProperty = hasFlag(decl.flags, PullElementFlags.PropertyParameter);
                    var parameterSymbol = new PullSymbol(id.valueText(), PullElementKind.Parameter);

                    if ((i === (n - 1)) && parameterList.lastParameterIsRest()) {
                        parameterSymbol.isVarArg = true;
                    }

                    if (params[id.valueText()]) {
                        this.semanticInfoChain.addDiagnosticFromAST(argDecl, DiagnosticCode.Duplicate_identifier_0, [id.text()]);
                    }
                    else {
                        params[id.valueText()] = true;
                    }

                    if (decl) {
                        var isParameterOptional = false;

                        if (isProperty) {
                            decl.ensureSymbolIsBound();
                            var valDecl = decl.getValueDecl();

                            // if this is a parameter property, we still need to set the value decl
                            // for the function parameter
                            if (valDecl) {
                                isParameterOptional = TypeScript.hasFlag(valDecl.flags, PullElementFlags.Optional);

                                valDecl.setSymbol(parameterSymbol);
                                parameterSymbol.addDeclaration(valDecl);
                            }
                        }
                        else {
                            isParameterOptional = TypeScript.hasFlag(decl.flags, PullElementFlags.Optional);

                            parameterSymbol.addDeclaration(decl);
                            decl.setSymbol(parameterSymbol);
                        }

                        parameterSymbol.isOptional = isParameterOptional;
                    }

                    signatureSymbol.addParameter(parameterSymbol, parameterSymbol.isOptional);

                    if (signatureSymbol.isDefinition()) {
                        funcType.addEnclosedNonMember(parameterSymbol);
                    }
                }
            }
        }

        // function declarations
        private bindFunctionDeclarationToPullSymbol(functionDeclaration: PullDecl) {
            var declKind = functionDeclaration.kind;
            var declFlags = functionDeclaration.flags;
            var funcDeclAST = <FunctionDeclaration>this.semanticInfoChain.getASTForDecl(functionDeclaration);

            var isExported = (declFlags & PullElementFlags.Exported) !== 0;

            var funcName = functionDeclaration.name;

            // 1. Test for existing decl - if it exists, use its symbol
            // 2. If no other decl exists, create a new symbol and use that one

            var isSignature: boolean = (declFlags & PullElementFlags.Signature) !== 0;

            var parent = this.getParent(functionDeclaration, true);

            var parentDecl = functionDeclaration.getParentDecl();
            var parentHadSymbol = false;

            // PULLREVIEW: On a re-bind, there's no need to search far-and-wide: just look in the parent's member list
            var functionSymbol: PullSymbol = null;
            var functionTypeSymbol: PullTypeSymbol = null;

            functionSymbol = this.getExistingSymbol(functionDeclaration, PullElementKind.SomeValue, parent);

            if (functionSymbol) {
                // SPEC: Nov 18
                // When merging a non-ambient function or class declaration and a non-ambient internal module declaration, 
                // the function or class declaration must be located prior to the internal module declaration in the same source file. 
                // => when any of components is ambient - order doesn't matter                
                var acceptableRedeclaration: boolean;
                
                // Duplicate is acceptable if it is another signature (not a duplicate implementation), or an ambient fundule
                if (functionSymbol.kind === PullElementKind.Function) {
                    // normal fundule - we are allowed to add overloads
                    acceptableRedeclaration = isSignature || functionSymbol.allDeclsHaveFlag(PullElementFlags.Signature);
                }
                else {
                    // check if this is ambient fundule?
                    var isCurrentDeclAmbient = hasFlag(functionDeclaration.flags, PullElementFlags.Ambient);
                    acceptableRedeclaration = ArrayUtilities.all(functionSymbol.getDeclarations(), (decl) => {
                        // allowed elements for ambient fundules
                        // - signatures
                        // - initialized modules that can be ambient or not depending on whether current decl is ambient                       
                        var isInitializedModuleOrAmbientDecl = hasFlag(decl.flags, PullElementFlags.InitializedModule) && (isCurrentDeclAmbient || hasFlag(decl.flags, PullElementFlags.Ambient));
                        var isSignature = hasFlag(decl.flags, PullElementFlags.Signature);
                        return isInitializedModuleOrAmbientDecl || isSignature;
                    });
                }

                if (!acceptableRedeclaration) {
                    this.semanticInfoChain.addDuplicateIdentifierDiagnosticFromAST(
                        funcDeclAST.identifier, functionDeclaration.getDisplayName(), functionSymbol.getDeclarations()[0].ast());
                    functionSymbol.type = this.semanticInfoChain.getResolver().getNewErrorTypeSymbol(funcName);
                }
            }

            if (functionSymbol) {
                functionTypeSymbol = functionSymbol.type;
                parentHadSymbol = true;
            }

            if (!functionSymbol) {
                // PULLTODO: Make sure that we properly flag signature decl types when collecting decls
                functionSymbol = new PullSymbol(funcName, PullElementKind.Function);
            }

            if (!functionTypeSymbol) {
                functionTypeSymbol = new PullTypeSymbol("", PullElementKind.FunctionType);
                functionSymbol.type = functionTypeSymbol;
                functionTypeSymbol.setFunctionSymbol(functionSymbol);
            }

            functionDeclaration.setSymbol(functionSymbol);
            functionSymbol.addDeclaration(functionDeclaration);
            functionTypeSymbol.addDeclaration(functionDeclaration);

            this.semanticInfoChain.setSymbolForAST(funcDeclAST.identifier, functionSymbol);
            this.semanticInfoChain.setSymbolForAST(funcDeclAST, functionSymbol);

            if (parent && !parentHadSymbol) {
                if (isExported) {
                    parent.addMember(functionSymbol);
                }
                else {
                    parent.addEnclosedNonMember(functionSymbol);
                }
            }

            var signature = new PullSignatureSymbol(PullElementKind.CallSignature, !isSignature);

            signature.addDeclaration(functionDeclaration);
            functionDeclaration.setSignatureSymbol(signature);

            if (lastParameterIsRest(funcDeclAST.callSignature.parameterList)) {
                signature.hasVarArgs = true;
            }

            var funcDecl = <FunctionDeclaration>this.semanticInfoChain.getASTForDecl(functionDeclaration);
            this.bindParameterSymbols(funcDecl, ASTHelpers.parametersFromParameterList(funcDecl.callSignature.parameterList), functionTypeSymbol, signature);

            var typeParameters = functionDeclaration.getTypeParameters();
            var typeParameter: PullTypeParameterSymbol;

            for (var i = 0; i < typeParameters.length; i++) {

                typeParameter = signature.findTypeParameter(typeParameters[i].name);

                if (!typeParameter) {
                    typeParameter = new PullTypeParameterSymbol(typeParameters[i].name);

                    signature.addTypeParameter(typeParameter);
                }
                else {
                    var typeParameterAST = this.semanticInfoChain.getASTForDecl(typeParameter.getDeclarations()[0]);
                    this.semanticInfoChain.addDiagnosticFromAST(typeParameterAST, DiagnosticCode.Duplicate_identifier_0, [typeParameter.name]);
                }

                typeParameter.addDeclaration(typeParameters[i]);
                typeParameters[i].setSymbol(typeParameter);
            }

            // add the implicit call member for this function type
            functionTypeSymbol.appendCallSignature(signature);
        }

        private bindFunctionExpressionToPullSymbol(functionExpressionDeclaration: PullDecl) {
            var declKind = functionExpressionDeclaration.kind;
            var declFlags = functionExpressionDeclaration.flags;
            var ast = this.semanticInfoChain.getASTForDecl(functionExpressionDeclaration);

            var parameters = ast.kind() === SyntaxKind.SimpleArrowFunctionExpression
                ? ASTHelpers.parametersFromIdentifier((<SimpleArrowFunctionExpression>ast).identifier)
                : ASTHelpers.parametersFromParameterList(ASTHelpers.getParameterList(ast));
            var funcExpAST = ast;

            // 1. Test for existing decl - if it exists, use its symbol
            // 2. If no other decl exists, create a new symbol and use that one

            var functionName = declKind === PullElementKind.FunctionExpression
                ? (<PullFunctionExpressionDecl>functionExpressionDeclaration).getFunctionExpressionName()
                : functionExpressionDeclaration.name;
            var functionSymbol: PullSymbol = new PullSymbol(functionName, declKind);
            var functionTypeSymbol = new PullTypeSymbol("", PullElementKind.FunctionType);
            functionTypeSymbol.setFunctionSymbol(functionSymbol);

            functionSymbol.type = functionTypeSymbol;

            functionExpressionDeclaration.setSymbol(functionSymbol);
            functionSymbol.addDeclaration(functionExpressionDeclaration);
            functionTypeSymbol.addDeclaration(functionExpressionDeclaration);

            var name = funcExpAST.kind() === SyntaxKind.FunctionExpression
                ? (<FunctionExpression>funcExpAST).identifier
                : funcExpAST.kind() === SyntaxKind.FunctionPropertyAssignment
                    ? (<FunctionPropertyAssignment>funcExpAST).propertyName
                    : null;
            if (name) {
                this.semanticInfoChain.setSymbolForAST(name, functionSymbol);
            }

            this.semanticInfoChain.setSymbolForAST(funcExpAST, functionSymbol);

            var signature = new PullSignatureSymbol(PullElementKind.CallSignature, /*isDefinition*/ true);

            if (parameters.lastParameterIsRest()) {
                signature.hasVarArgs = true;
            }

            var typeParameters = functionExpressionDeclaration.getTypeParameters();
            var typeParameter: PullTypeParameterSymbol;

            for (var i = 0; i < typeParameters.length; i++) {

                typeParameter = signature.findTypeParameter(typeParameters[i].name);

                if (!typeParameter) {
                    typeParameter = new PullTypeParameterSymbol(typeParameters[i].name);

                    signature.addTypeParameter(typeParameter);
                }
                else {
                    var typeParameterAST = this.semanticInfoChain.getASTForDecl(typeParameter.getDeclarations()[0]);
                    this.semanticInfoChain.addDiagnosticFromAST(typeParameterAST, DiagnosticCode.Duplicate_identifier_0, [typeParameter.getName()]);
                }

                typeParameter.addDeclaration(typeParameters[i]);
                typeParameters[i].setSymbol(typeParameter);
            }

            signature.addDeclaration(functionExpressionDeclaration);
            functionExpressionDeclaration.setSignatureSymbol(signature);

            this.bindParameterSymbols(funcExpAST, parameters, functionTypeSymbol, signature);

            // add the implicit call member for this function type
            functionTypeSymbol.appendCallSignature(signature);
        }

        private bindFunctionTypeDeclarationToPullSymbol(functionTypeDeclaration: PullDecl) {
            var declKind = functionTypeDeclaration.kind;
            var declFlags = functionTypeDeclaration.flags;
            var funcTypeAST = <FunctionType>this.semanticInfoChain.getASTForDecl(functionTypeDeclaration);

            // 1. Test for existing decl - if it exists, use its symbol
            // 2. If no other decl exists, create a new symbol and use that one

            var functionTypeSymbol = new PullTypeSymbol("", PullElementKind.FunctionType);

            functionTypeDeclaration.setSymbol(functionTypeSymbol);
            functionTypeSymbol.addDeclaration(functionTypeDeclaration);
            this.semanticInfoChain.setSymbolForAST(funcTypeAST, functionTypeSymbol);

            var isSignature: boolean = (declFlags & PullElementFlags.Signature) !== 0;
            var signature = new PullSignatureSymbol(PullElementKind.CallSignature, !isSignature);

            if (lastParameterIsRest(funcTypeAST.parameterList)) {
                signature.hasVarArgs = true;
            }

            var typeParameters = functionTypeDeclaration.getTypeParameters();
            var typeParameter: PullTypeParameterSymbol;

            for (var i = 0; i < typeParameters.length; i++) {

                typeParameter = signature.findTypeParameter(typeParameters[i].name);

                if (!typeParameter) {
                    typeParameter = new PullTypeParameterSymbol(typeParameters[i].name);

                    signature.addTypeParameter(typeParameter);
                }
                else {
                    var typeParameterAST = this.semanticInfoChain.getASTForDecl(typeParameter.getDeclarations()[0]);
                    this.semanticInfoChain.addDiagnosticFromAST(typeParameterAST, DiagnosticCode.Duplicate_identifier_0, [typeParameter.name]);
                }

                typeParameter.addDeclaration(typeParameters[i]);
                typeParameters[i].setSymbol(typeParameter);
            }

            signature.addDeclaration(functionTypeDeclaration);
            functionTypeDeclaration.setSignatureSymbol(signature);

            this.bindParameterSymbols(funcTypeAST, ASTHelpers.parametersFromParameterList(funcTypeAST.parameterList), functionTypeSymbol, signature);

            // add the implicit call member for this function type
            functionTypeSymbol.appendCallSignature(signature);
        }

        // method declarations
        private bindMethodDeclarationToPullSymbol(methodDeclaration: PullDecl) {
            var declKind = methodDeclaration.kind;
            var declFlags = methodDeclaration.flags;
            var methodAST = this.semanticInfoChain.getASTForDecl(methodDeclaration);

            var isPrivate = (declFlags & PullElementFlags.Private) !== 0;
            var isStatic = (declFlags & PullElementFlags.Static) !== 0;
            var isOptional = (declFlags & PullElementFlags.Optional) !== 0;

            var methodName = methodDeclaration.name;

            var isSignature: boolean = (declFlags & PullElementFlags.Signature) !== 0;

            var parent = this.getParent(methodDeclaration, true);
            var parentHadSymbol = false;

            var methodSymbol: PullSymbol = null;
            var methodTypeSymbol: PullTypeSymbol = null;

            if (parent.isClass() && isStatic) {
                parent = parent.getConstructorMethod().type;
            }

            methodSymbol = parent.findMember(methodName, /*lookInParent*/ false);

            if (methodSymbol &&
                (methodSymbol.kind !== PullElementKind.Method ||
                (!isSignature && !methodSymbol.allDeclsHaveFlag(PullElementFlags.Signature)))) {
                    this.semanticInfoChain.addDuplicateIdentifierDiagnosticFromAST(
                        methodAST, methodDeclaration.getDisplayName(), methodSymbol.getDeclarations()[0].ast());
                methodSymbol = null;
            }

            if (methodSymbol) {
                methodTypeSymbol = methodSymbol.type;
                parentHadSymbol = true;
            }

            if (!methodSymbol) {
                // PULLTODO: Make sure that we properly flag signature decl types when collecting decls
                methodSymbol = new PullSymbol(methodName, PullElementKind.Method);
            }

            if (!methodTypeSymbol) {
                methodTypeSymbol = new PullTypeSymbol("", PullElementKind.FunctionType);
                methodSymbol.type = methodTypeSymbol;
                methodTypeSymbol.setFunctionSymbol(methodSymbol);
            }

            methodDeclaration.setSymbol(methodSymbol);
            methodSymbol.addDeclaration(methodDeclaration);
            methodTypeSymbol.addDeclaration(methodDeclaration);

            var nameAST = methodAST.kind() === SyntaxKind.MemberFunctionDeclaration
                ? (<MemberFunctionDeclaration>methodAST).propertyName
                : (<MethodSignature>methodAST).propertyName;

            Debug.assert(nameAST)

            this.semanticInfoChain.setSymbolForAST(nameAST, methodSymbol);
            this.semanticInfoChain.setSymbolForAST(methodAST, methodSymbol);

            if (isOptional) {
                methodSymbol.isOptional = true;
            }

            if (!parentHadSymbol) {
                parent.addMember(methodSymbol);
            }

            var sigKind = PullElementKind.CallSignature;

            var signature = new PullSignatureSymbol(sigKind, !isSignature);

            var parameterList = ASTHelpers.getParameterList(methodAST);
            if (lastParameterIsRest(parameterList)) {
                signature.hasVarArgs = true;
            }

            var typeParameters = methodDeclaration.getTypeParameters();
            var typeParameter: PullTypeParameterSymbol;
            var typeParameterName: string;
            var typeParameterAST: TypeParameter;

            for (var i = 0; i < typeParameters.length; i++) {
                typeParameterName = typeParameters[i].name;
                typeParameterAST = <TypeParameter>this.semanticInfoChain.getASTForDecl(typeParameters[i]);

                typeParameter = signature.findTypeParameter(typeParameterName);

                if (!typeParameter) {
                    typeParameter = new PullTypeParameterSymbol(typeParameterName);
                    signature.addTypeParameter(typeParameter);
                }
                else {
                    this.semanticInfoChain.addDiagnosticFromAST(typeParameterAST, DiagnosticCode.Duplicate_identifier_0, [typeParameter.getName()]);
                }

                typeParameter.addDeclaration(typeParameters[i]);
                typeParameters[i].setSymbol(typeParameter);
            }

            signature.addDeclaration(methodDeclaration);
            methodDeclaration.setSignatureSymbol(signature);

            var funcDecl = this.semanticInfoChain.getASTForDecl(methodDeclaration);
            this.bindParameterSymbols(funcDecl, ASTHelpers.parametersFromParameterList(ASTHelpers.getParameterList(funcDecl)), methodTypeSymbol, signature);

            // add the implicit call member for this function type
            var signatureIndex = this.getIndexForInsertingSignatureAtEndOfEnclosingDeclInSignatureList(signature, methodTypeSymbol.getOwnCallSignatures());
            methodTypeSymbol.insertCallSignatureAtIndex(signature, signatureIndex);
        }

        private bindStaticPrototypePropertyOfClass(classAST: ClassDeclaration, classTypeSymbol: PullTypeSymbol, constructorTypeSymbol: PullTypeSymbol) {
            var prototypeStr = "prototype";

            var prototypeSymbol = constructorTypeSymbol.findMember(prototypeStr, /*lookInParent*/ false);
            if (prototypeSymbol && !prototypeSymbol.getIsSynthesized()) {
                // Report duplicate symbol error on existing prototype symbol since class has explicit prototype symbol
                // This kind of scenario can happen with augmented module and class with module member named prototype
                this.semanticInfoChain.addDiagnostic(
                    PullHelpers.diagnosticFromDecl(prototypeSymbol.getDeclarations()[0], DiagnosticCode.Duplicate_identifier_0, [prototypeSymbol.getDisplayName()]));
            }

            // Add synthetic prototype decl and symbol
            if (!prototypeSymbol || !prototypeSymbol.getIsSynthesized()) {
                var prototypeDecl = new PullSynthesizedDecl(prototypeStr, prototypeStr, PullElementKind.Property,
                    PullElementFlags.Public | PullElementFlags.Static, constructorTypeSymbol.getDeclarations()[0], this.semanticInfoChain);

                prototypeSymbol = new PullSymbol(prototypeStr, PullElementKind.Property);
                prototypeSymbol.setIsSynthesized();
                prototypeSymbol.addDeclaration(prototypeDecl);
                prototypeSymbol.type = classTypeSymbol;
                constructorTypeSymbol.addMember(prototypeSymbol);

                if (prototypeSymbol.type && prototypeSymbol.type.isGeneric()) {
                    var resolver = this.semanticInfoChain.getResolver();
                    prototypeSymbol.type = resolver.instantiateTypeToAny(prototypeSymbol.type, new PullTypeResolutionContext(resolver));
                }
                prototypeSymbol.setResolved();
            }
        }

        // class constructor declarations
        private bindConstructorDeclarationToPullSymbol(constructorDeclaration: PullDecl) {
            var declKind = constructorDeclaration.kind;
            var declFlags = constructorDeclaration.flags;
            var constructorAST = <ConstructorDeclaration>this.semanticInfoChain.getASTForDecl(constructorDeclaration);

            var constructorName = constructorDeclaration.name;

            var isSignature: boolean = (declFlags & PullElementFlags.Signature) !== 0;

            var parent = this.getParent(constructorDeclaration, true);

            var parentHadSymbol = false;

            var constructorSymbol: PullSymbol = parent.getConstructorMethod();
            var constructorTypeSymbol: PullTypeSymbol = null;

            if (constructorSymbol &&
                (constructorSymbol.kind !== PullElementKind.ConstructorMethod ||
                (!isSignature &&
                constructorSymbol.type &&
                constructorSymbol.type.hasOwnConstructSignatures()))) {

                var hasDefinitionSignature = false;
                var constructorSigs = constructorSymbol.type.getOwnDeclaredConstructSignatures();

                for (var i = 0; i < constructorSigs.length; i++) {
                    if (!constructorSigs[i].anyDeclHasFlag(PullElementFlags.Signature)) {
                        hasDefinitionSignature = true;
                        break;
                    }
                }

                if (hasDefinitionSignature) {
                    this.semanticInfoChain.addDiagnosticFromAST(constructorAST, DiagnosticCode.Multiple_constructor_implementations_are_not_allowed);

                    constructorSymbol = null;
                }
            }

            if (constructorSymbol) {
                constructorTypeSymbol = constructorSymbol.type;
            }
            else {
                constructorSymbol = new PullSymbol(constructorName, PullElementKind.ConstructorMethod);
                constructorTypeSymbol = new PullTypeSymbol("", PullElementKind.ConstructorType);
            }

            // Even if we're reusing the symbol, it would have been cleared by the call to invalidate above
            parent.setConstructorMethod(constructorSymbol);
            constructorSymbol.type = constructorTypeSymbol;

            constructorDeclaration.setSymbol(constructorSymbol);
            constructorSymbol.addDeclaration(constructorDeclaration);
            constructorTypeSymbol.addDeclaration(constructorDeclaration);
            constructorSymbol.setIsSynthesized(false);
            this.semanticInfoChain.setSymbolForAST(constructorAST, constructorSymbol);

            // add a call signature to the constructor method, and a construct signature to the parent class type
            var constructSignature = new PullSignatureSymbol(PullElementKind.ConstructSignature, !isSignature);
            constructSignature.returnType = parent;
            constructSignature.addTypeParametersFromReturnType();

            constructSignature.addDeclaration(constructorDeclaration);
            constructorDeclaration.setSignatureSymbol(constructSignature);

            this.bindParameterSymbols(constructorAST, ASTHelpers.parametersFromParameterList(constructorAST.callSignature.parameterList), constructorTypeSymbol, constructSignature);

            if (lastParameterIsRest(constructorAST.callSignature.parameterList)) {
                constructSignature.hasVarArgs = true;
            }

            constructorTypeSymbol.appendConstructSignature(constructSignature);

        }

        private bindConstructSignatureDeclarationToPullSymbol(constructSignatureDeclaration: PullDecl) {
            var parent = this.getParent(constructSignatureDeclaration, true);
            var constructorAST = <ConstructSignature>this.semanticInfoChain.getASTForDecl(constructSignatureDeclaration);

            var constructSignature = new PullSignatureSymbol(PullElementKind.ConstructSignature);

            if (lastParameterIsRest(constructorAST.callSignature.parameterList)) {
                constructSignature.hasVarArgs = true;
            }

            var typeParameters = constructSignatureDeclaration.getTypeParameters();
            var typeParameter: PullTypeParameterSymbol;

            for (var i = 0; i < typeParameters.length; i++) {

                typeParameter = constructSignature.findTypeParameter(typeParameters[i].name);

                if (!typeParameter) {
                    typeParameter = new PullTypeParameterSymbol(typeParameters[i].name);

                    constructSignature.addTypeParameter(typeParameter);
                }
                else {
                    var typeParameterAST = this.semanticInfoChain.getASTForDecl(typeParameter.getDeclarations()[0]);
                    this.semanticInfoChain.addDiagnosticFromAST(typeParameterAST, DiagnosticCode.Duplicate_identifier_0, [typeParameter.getName()]);
                }

                typeParameter.addDeclaration(typeParameters[i]);
                typeParameters[i].setSymbol(typeParameter);
            }

            constructSignature.addDeclaration(constructSignatureDeclaration);
            constructSignatureDeclaration.setSignatureSymbol(constructSignature);

            var funcDecl = this.semanticInfoChain.getASTForDecl(constructSignatureDeclaration);
            this.bindParameterSymbols(funcDecl, ASTHelpers.parametersFromParameterList(ASTHelpers.getParameterList(funcDecl)), null, constructSignature);

            this.semanticInfoChain.setSymbolForAST(this.semanticInfoChain.getASTForDecl(constructSignatureDeclaration), constructSignature);

            var signatureIndex = this.getIndexForInsertingSignatureAtEndOfEnclosingDeclInSignatureList(constructSignature, parent.getOwnDeclaredConstructSignatures());
            parent.insertConstructSignatureAtIndex(constructSignature, signatureIndex);
        }

        private bindCallSignatureDeclarationToPullSymbol(callSignatureDeclaration: PullDecl) {
            var parent = this.getParent(callSignatureDeclaration, true);
            var callSignatureAST = <CallSignature>this.semanticInfoChain.getASTForDecl(callSignatureDeclaration);

            var callSignature = new PullSignatureSymbol(PullElementKind.CallSignature);

            if (lastParameterIsRest(callSignatureAST.parameterList)) {
                callSignature.hasVarArgs = true;
            }

            var typeParameters = callSignatureDeclaration.getTypeParameters();
            var typeParameter: PullTypeParameterSymbol;

            for (var i = 0; i < typeParameters.length; i++) {

                typeParameter = callSignature.findTypeParameter(typeParameters[i].name);

                if (!typeParameter) {
                    typeParameter = new PullTypeParameterSymbol(typeParameters[i].name);

                    callSignature.addTypeParameter(typeParameter);
                }
                else {
                    var typeParameterAST = this.semanticInfoChain.getASTForDecl(typeParameter.getDeclarations()[0]);
                    this.semanticInfoChain.addDiagnosticFromAST(typeParameterAST, DiagnosticCode.Duplicate_identifier_0, [typeParameter.getName()]);
                }

                typeParameter.addDeclaration(typeParameters[i]);
                typeParameters[i].setSymbol(typeParameter);
            }

            callSignature.addDeclaration(callSignatureDeclaration);
            callSignatureDeclaration.setSignatureSymbol(callSignature);

            var funcDecl = <CallSignature>this.semanticInfoChain.getASTForDecl(callSignatureDeclaration);
            this.bindParameterSymbols(funcDecl, ASTHelpers.parametersFromParameterList(funcDecl.parameterList), null, callSignature);

            this.semanticInfoChain.setSymbolForAST(this.semanticInfoChain.getASTForDecl(callSignatureDeclaration), callSignature);

            var signatureIndex = this.getIndexForInsertingSignatureAtEndOfEnclosingDeclInSignatureList(callSignature, parent.getOwnCallSignatures());
            parent.insertCallSignatureAtIndex(callSignature, signatureIndex);
        }

        private bindIndexSignatureDeclarationToPullSymbol(indexSignatureDeclaration: PullDecl) {
            var indexSignature = new PullSignatureSymbol(PullElementKind.IndexSignature);

            indexSignature.addDeclaration(indexSignatureDeclaration);
            indexSignatureDeclaration.setSignatureSymbol(indexSignature);

            var funcDecl = <IndexSignature>this.semanticInfoChain.getASTForDecl(indexSignatureDeclaration);
            this.bindParameterSymbols(funcDecl, ASTHelpers.parametersFromParameter(funcDecl.parameter), null, indexSignature);

            this.semanticInfoChain.setSymbolForAST(this.semanticInfoChain.getASTForDecl(indexSignatureDeclaration), indexSignature);

            var parent = this.getParent(indexSignatureDeclaration);
            parent.addIndexSignature(indexSignature);
            indexSignature.setContainer(parent);
        }

        // getters and setters
        private bindGetAccessorDeclarationToPullSymbol(getAccessorDeclaration: PullDecl) {
            var declKind = getAccessorDeclaration.kind;
            var declFlags = getAccessorDeclaration.flags;
            var funcDeclAST = <GetAccessor>this.semanticInfoChain.getASTForDecl(getAccessorDeclaration);

            var isExported = (declFlags & PullElementFlags.Exported) !== 0;

            var funcName = getAccessorDeclaration.name;

            var isSignature: boolean = (declFlags & PullElementFlags.Signature) !== 0;
            var isStatic = false;

            if (hasFlag(declFlags, PullElementFlags.Static)) {
                isStatic = true;
            }

            var parent = this.getParent(getAccessorDeclaration, true);
            var parentHadSymbol = false;

            var accessorSymbol: PullAccessorSymbol = null;
            var getterSymbol: PullSymbol = null;
            var getterTypeSymbol: PullTypeSymbol = null;

            if (isStatic) {
                parent = parent.getConstructorMethod().type;
            }

            accessorSymbol = <PullAccessorSymbol>parent.findMember(funcName, /*lookInParent*/ false);

            if (accessorSymbol) {
                if (!accessorSymbol.isAccessor()) {
                    this.semanticInfoChain.addDuplicateIdentifierDiagnosticFromAST(
                        funcDeclAST.propertyName, getAccessorDeclaration.getDisplayName(), accessorSymbol.getDeclarations()[0].ast());
                    accessorSymbol = null;
                }
                else {
                    getterSymbol = accessorSymbol.getGetter();

                    if (getterSymbol) {
                        this.semanticInfoChain.addDiagnosticFromAST(funcDeclAST, DiagnosticCode.Getter_0_already_declared, [getAccessorDeclaration.getDisplayName()]);
                        accessorSymbol = null;
                        getterSymbol = null;
                    }
                }
            }

            if (accessorSymbol) {
                parentHadSymbol = true;
            }

            // we have an accessor we can use...
            if (accessorSymbol && getterSymbol) {
                getterTypeSymbol = getterSymbol.type;
            }

            if (!accessorSymbol) {
                accessorSymbol = new PullAccessorSymbol(funcName);
            }

            if (!getterSymbol) {
                getterSymbol = new PullSymbol(funcName, PullElementKind.Function);
                getterTypeSymbol = new PullTypeSymbol("", PullElementKind.FunctionType);
                getterTypeSymbol.setFunctionSymbol(getterSymbol);

                getterSymbol.type = getterTypeSymbol;

                accessorSymbol.setGetter(getterSymbol);
            }

            getAccessorDeclaration.setSymbol(accessorSymbol);
            accessorSymbol.addDeclaration(getAccessorDeclaration);
            getterSymbol.addDeclaration(getAccessorDeclaration);

            // Note that the name AST binds to the full accessor symbol, whereas the declaration AST
            // binds to just the getter symbol. This is because when the resolver resolves an
            // accessor declaration AST, it just expects the getter/setter symbol. But when
            // the language service looks up the name of an accessor, it should treat it as a
            // property and display it to the user as such.
            var nameAST = funcDeclAST.propertyName;
            this.semanticInfoChain.setSymbolForAST(nameAST, accessorSymbol);
            this.semanticInfoChain.setSymbolForAST(funcDeclAST, getterSymbol);

            if (!parentHadSymbol) {
                parent.addMember(accessorSymbol);
            }

            var signature = new PullSignatureSymbol(PullElementKind.CallSignature, !isSignature);

            signature.addDeclaration(getAccessorDeclaration);
            getAccessorDeclaration.setSignatureSymbol(signature);

            this.bindParameterSymbols(funcDeclAST, ASTHelpers.parametersFromParameterList(funcDeclAST.parameterList), getterTypeSymbol, signature);

            // add the implicit call member for this function type
            getterTypeSymbol.appendCallSignature(signature);
        }

        private bindSetAccessorDeclarationToPullSymbol(setAccessorDeclaration: PullDecl) {
            var declKind = setAccessorDeclaration.kind;
            var declFlags = setAccessorDeclaration.flags;
            var funcDeclAST = <SetAccessor>this.semanticInfoChain.getASTForDecl(setAccessorDeclaration);

            var isExported = (declFlags & PullElementFlags.Exported) !== 0;

            var funcName = setAccessorDeclaration.name;

            var isSignature: boolean = (declFlags & PullElementFlags.Signature) !== 0;
            var isStatic = false;

            if (hasFlag(declFlags, PullElementFlags.Static)) {
                isStatic = true;
            }

            var parent = this.getParent(setAccessorDeclaration, true);
            var parentHadSymbol = false;

            var accessorSymbol: PullAccessorSymbol = null;
            var setterSymbol: PullSymbol = null;
            var setterTypeSymbol: PullTypeSymbol = null;

            if (isStatic) {
                parent = parent.getConstructorMethod().type;
            }

            accessorSymbol = <PullAccessorSymbol>parent.findMember(funcName, /*lookInParent*/ false);

            if (accessorSymbol) {
                if (!accessorSymbol.isAccessor()) {
                    this.semanticInfoChain.addDuplicateIdentifierDiagnosticFromAST(
                        funcDeclAST.propertyName, setAccessorDeclaration.getDisplayName(), accessorSymbol.getDeclarations()[0].ast());
                    accessorSymbol = null;
                }
                else {
                    setterSymbol = accessorSymbol.getSetter();

                    if (setterSymbol) {
                        this.semanticInfoChain.addDiagnosticFromAST(funcDeclAST, DiagnosticCode.Setter_0_already_declared, [setAccessorDeclaration.getDisplayName()]);
                        accessorSymbol = null;
                        setterSymbol = null;
                    }
                }
            }

            if (accessorSymbol) {
                parentHadSymbol = true;
                // we have an accessor we can use...
                if (setterSymbol) {
                    setterTypeSymbol = setterSymbol.type;
                }
            }

            if (!accessorSymbol) {
                // PULLTODO: Make sure that we properly flag signature decl types when collecting decls
                accessorSymbol = new PullAccessorSymbol(funcName);
            }

            if (!setterSymbol) {
                setterSymbol = new PullSymbol(funcName, PullElementKind.Function);
                setterTypeSymbol = new PullTypeSymbol("", PullElementKind.FunctionType);
                setterTypeSymbol.setFunctionSymbol(setterSymbol);

                setterSymbol.type = setterTypeSymbol;

                accessorSymbol.setSetter(setterSymbol);
            }

            setAccessorDeclaration.setSymbol(accessorSymbol);
            accessorSymbol.addDeclaration(setAccessorDeclaration);
            setterSymbol.addDeclaration(setAccessorDeclaration);

            // Note that the name AST binds to the full accessor symbol, whereas the declaration AST
            // binds to just the setter symbol. This is because when the resolver resolves an
            // accessor declaration AST, it just expects the getter/setter symbol. But when
            // the language service looks up the name of an accessor, it should treat it as a
            // property and display it to the user as such.

            var nameAST = funcDeclAST.propertyName;
            this.semanticInfoChain.setSymbolForAST(nameAST, accessorSymbol);
            this.semanticInfoChain.setSymbolForAST(funcDeclAST, setterSymbol);

            if (!parentHadSymbol) {
                parent.addMember(accessorSymbol);
            }

            var signature = new PullSignatureSymbol(PullElementKind.CallSignature, !isSignature);

            signature.addDeclaration(setAccessorDeclaration);
            setAccessorDeclaration.setSignatureSymbol(signature);

            // PULLTODO: setter should not have a parameters
            this.bindParameterSymbols(funcDeclAST, ASTHelpers.parametersFromParameterList(funcDeclAST.parameterList), setterTypeSymbol, signature);

            // add the implicit call member for this function type
            setterTypeSymbol.appendCallSignature(signature);
        }

        private getDeclsToBind(decl: PullDecl) {
            var decls: PullDecl[];
            switch (decl.kind) {
                case PullElementKind.Enum:
                case PullElementKind.DynamicModule:
                case PullElementKind.Container:
                case PullElementKind.Interface:
                    decls = this.findDeclsInContext(decl, decl.kind, /*searchGlobally*/ true);
                    break;

                case PullElementKind.Variable:
                case PullElementKind.Function:
                case PullElementKind.Method:
                case PullElementKind.ConstructorMethod:
                    decls = this.findDeclsInContext(decl, decl.kind, /*searchGlobally*/ false);
                    break;

                default:
                    decls = [decl];
            }
            Debug.assert(decls && decls.length > 0);
            Debug.assert(ArrayUtilities.contains(decls, decl));
            return decls;
        }

        private shouldBindDeclaration(decl: PullDecl) {
            return !decl.hasBeenBound() && this.declsBeingBound.indexOf(decl.declID) < 0;
        }

        // binding
        public bindDeclToPullSymbol(decl: PullDecl) {
            if (this.shouldBindDeclaration(decl)) {
                // The decl does not have a symbol attached to it and
                // its not already being bound
                this.bindAllDeclsToPullSymbol(decl);
            }
        }

        private bindAllDeclsToPullSymbol(askedDecl: PullDecl) {
            var allDecls = this.getDeclsToBind(askedDecl);
            for (var i = 0; i < allDecls.length; i++) {
                var decl = allDecls[i];
                // This check is necessary for two reasons
                // 1. This decl could be actually something we dont care to bind other decls corresponding to it 
                //    and so it was already bound without binding other decls with same name corresponding to it (e.g parameter)
                // 2. This was bound as part of some recursion
                //    eg:
                //      module A {
                //          var o;
                //      }
                //      enum A {
                //          /*quickInfoHere*/c
                //      }
                //      module A {
                //          var p;
                //      }
                //     As part of binding the member declaration, we would bind enum and hence end up binding all value decls
                //     which are instance vars from module declaration. As part of it, we would want to bind corresponding 
                //     module declaration which in turn would try to bind all the var declarations
                if (this.shouldBindDeclaration(decl)) {
                    this.bindSingleDeclToPullSymbol(decl);
                }
            }
        }

        private bindSingleDeclToPullSymbol(decl: PullDecl) {
            // Add it to the list in case we revisit it during binding
            this.declsBeingBound.push(decl.declID);

            switch (decl.kind) {
                case PullElementKind.Script:
                    var childDecls = decl.getChildDecls();
                    for (var i = 0; i < childDecls.length; i++) {
                        this.bindDeclToPullSymbol(childDecls[i]);
                    }
                    break;

                case PullElementKind.Enum:
                    this.bindEnumDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.DynamicModule:
                case PullElementKind.Container:
                    this.bindModuleDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.Interface:
                    this.bindInterfaceDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.Class:
                    this.bindClassDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.Function:
                    this.bindFunctionDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.Variable:
                    this.bindVariableDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.CatchVariable:
                    this.bindCatchVariableToPullSymbol(decl);
                    break;

                case PullElementKind.EnumMember:
                    this.bindEnumMemberDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.Property:
                    this.bindPropertyDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.Method:
                    this.bindMethodDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.ConstructorMethod:
                    this.bindConstructorDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.CallSignature:
                    this.bindCallSignatureDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.ConstructSignature:
                    this.bindConstructSignatureDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.IndexSignature:
                    this.bindIndexSignatureDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.GetAccessor:
                    this.bindGetAccessorDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.SetAccessor:
                    this.bindSetAccessorDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.ObjectType:
                    this.bindObjectTypeDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.FunctionType:
                    this.bindFunctionTypeDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.ConstructorType:
                    this.bindConstructorTypeDeclarationToPullSymbol(decl);
                    break;

                case PullElementKind.FunctionExpression:
                    this.bindFunctionExpressionToPullSymbol(decl);
                    break;

                case PullElementKind.TypeAlias:
                    this.bindImportDeclaration(decl);
                    break;

                case PullElementKind.Parameter:
                case PullElementKind.TypeParameter:
                    // parameters are bound by their enclosing function or type.  Ensure that that
                    // decl is bound.
                    decl.getParentDecl().getSymbol();
                    break;

                case PullElementKind.CatchBlock:
                case PullElementKind.WithBlock:
                    // since we don't bind eagerly, there's nothing to do here
                    break;

                default:
                    CompilerDiagnostics.assert(false, "Unrecognized type declaration");
            }

            // Rremove the decl from the list
            Debug.assert(ArrayUtilities.last(this.declsBeingBound) === decl.declID);
            this.declsBeingBound.pop();
        }
    }
}