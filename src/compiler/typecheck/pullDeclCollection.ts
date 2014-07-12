// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\references.ts' />

module TypeScript {
    class DeclCollectionContext {
        public isDeclareFile = false;
        public parentChain: PullDecl[] = [];

        constructor(public document: Document, public semanticInfoChain: SemanticInfoChain, public propagateEnumConstants: boolean) {
        }

        public getParent() { return this.parentChain ? this.parentChain[this.parentChain.length - 1] : null; }

        public pushParent(parentDecl: PullDecl) { if (parentDecl) { this.parentChain[this.parentChain.length] = parentDecl; } }

        public popParent() { this.parentChain.length--; }
    }

    function moduleElementsHasExportAssignment(moduleElements: ISyntaxList2): boolean {
        return moduleElements.any(m => m.kind() === SyntaxKind.ExportAssignment);
    }

    function containingModuleHasExportAssignment(ast: AST): boolean {
        ast = ast.parent;
        while (ast) {
            if (ast.kind() === SyntaxKind.ModuleDeclaration) {
                var moduleDecl = <ModuleDeclaration>ast;
                return moduleElementsHasExportAssignment(moduleDecl.moduleElements);
            }
            else if (ast.kind() === SyntaxKind.SourceUnit) {
                var sourceUnit = <SourceUnit>ast;
                return moduleElementsHasExportAssignment(sourceUnit.moduleElements);
            }

            ast = ast.parent;
        }

        return false;
    }

    function isParsingAmbientModule(ast: AST, context: DeclCollectionContext): boolean {
        ast = ast.parent;
        while (ast) {
            if (ast.kind() === SyntaxKind.ModuleDeclaration) {
                if (hasModifier((<ModuleDeclaration>ast).modifiers, PullElementFlags.Ambient)) {
                    return true;
                }
            }

            ast = ast.parent;
        }

        return false;
    }

    function preCollectImportDecls(ast: AST, context: DeclCollectionContext): void {
        var importDecl = <ImportDeclaration>ast;
        var declFlags = PullElementFlags.None;

        var parent = context.getParent();

        if (hasModifier(importDecl.modifiers, PullElementFlags.Exported) && !containingModuleHasExportAssignment(ast)) {
            declFlags |= PullElementFlags.Exported;
        }

        var decl = new NormalPullDecl(importDecl.identifier.valueText(), importDecl.identifier.text(), PullElementKind.TypeAlias, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(ast, decl);
        context.semanticInfoChain.setASTForDecl(decl, ast);

        // Note: it is intentional that a import does not get added to hte context stack.  An
        // import does not introduce a new name scope, so it shouldn't be in the context decl stack.
        // context.pushParent(decl);
    }

    function preCollectScriptDecls(sourceUnit: SourceUnit, context: DeclCollectionContext): void {
        var fileName = sourceUnit.fileName();

        var isExternalModule = context.document.isExternalModule();

        var decl: PullDecl = new RootPullDecl(
            /*name:*/ fileName, fileName, PullElementKind.Script, PullElementFlags.None, context.semanticInfoChain, isExternalModule);
        context.semanticInfoChain.setDeclForAST(sourceUnit, decl);
        context.semanticInfoChain.setASTForDecl(decl, sourceUnit);

        context.isDeclareFile = context.document.isDeclareFile();

        context.pushParent(decl);

        // if it's an external module, create another decl to represent that module inside the top 
        // level script module.

        if (isExternalModule) {
            var declFlags = PullElementFlags.Exported;
            if (isDTSFile(fileName)) {
                declFlags |= PullElementFlags.Ambient;
            }

            var moduleContainsExecutableCode = containsExecutableCode(sourceUnit.moduleElements);
            var kind = PullElementKind.DynamicModule;
            var valueText = quoteStr(fileName);

            var decl: PullDecl = new NormalPullDecl(valueText, fileName, kind, declFlags, context.getParent());

            context.semanticInfoChain.setASTForDecl(decl, sourceUnit);
            // Note: we're overring what the script points to.  For files with an external module, 
            // the script node will point at the external module declaration.
            context.semanticInfoChain.setDeclForAST(sourceUnit, decl);

            if (!moduleElementsHasExportAssignment(sourceUnit.moduleElements) || moduleContainsExecutableCode) {
                createModuleVariableDecl(decl, sourceUnit, context);
            }

            context.pushParent(decl);
        }
    }

    function preCollectEnumDecls(enumDecl: EnumDeclaration, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.None;
        var enumName = enumDecl.identifier.valueText();

        if ((hasModifier(enumDecl.modifiers, PullElementFlags.Exported) || isParsingAmbientModule(enumDecl, context)) && !containingModuleHasExportAssignment(enumDecl)) {
            declFlags |= PullElementFlags.Exported;
        }

        if (hasModifier(enumDecl.modifiers, PullElementFlags.Ambient) || isParsingAmbientModule(enumDecl, context) || context.isDeclareFile) {
            declFlags |= PullElementFlags.Ambient;
        }

        // Consider an enum 'always initialized'.
        declFlags |= PullElementFlags.Enum;
        var kind = PullElementKind.Enum;

        var enumDeclaration = new NormalPullDecl(enumName, enumDecl.identifier.text(), kind, declFlags, context.getParent());
        context.semanticInfoChain.setDeclForAST(enumDecl, enumDeclaration);
        context.semanticInfoChain.setASTForDecl(enumDeclaration, enumDecl);

        // create the value decl
        var valueDecl = new NormalPullDecl(enumDeclaration.name, enumDeclaration.getDisplayName(), PullElementKind.Variable, enumDeclaration.flags, context.getParent());
        enumDeclaration.setValueDecl(valueDecl);
        context.semanticInfoChain.setASTForDecl(valueDecl, enumDecl);

        context.pushParent(enumDeclaration);
    }

    function createEnumElementDecls(propertyDecl: EnumElement, context: DeclCollectionContext): void {
        var parent = context.getParent();

        var decl = new PullEnumElementDecl(propertyDecl.propertyName.valueText(), propertyDecl.propertyName.text(), parent);
        context.semanticInfoChain.setDeclForAST(propertyDecl, decl);
        context.semanticInfoChain.setASTForDecl(decl, propertyDecl);

        // Note: it is intentional that a enum element does not get added to hte context stack.  An 
        // enum element does not introduce a new name scope, so it shouldn't be in the context decl stack.
        // context.pushParent(decl);
    }

    function preCollectModuleDecls(moduleDecl: ModuleDeclaration, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.None;

        var moduleContainsExecutableCode = containsExecutableCode(moduleDecl.moduleElements);

        var isDynamic = moduleDecl.stringLiteral !== null;

        if ((hasModifier(moduleDecl.modifiers, PullElementFlags.Exported) || isParsingAmbientModule(moduleDecl, context)) && !containingModuleHasExportAssignment(moduleDecl)) {
            declFlags |= PullElementFlags.Exported;
        }

        if (hasModifier(moduleDecl.modifiers, PullElementFlags.Ambient) || isParsingAmbientModule(moduleDecl, context) || context.isDeclareFile) {
            declFlags |= PullElementFlags.Ambient;
        }

        var kind = isDynamic ? PullElementKind.DynamicModule : PullElementKind.Container;

        if (moduleDecl.stringLiteral) {
            var valueText = quoteStr(moduleDecl.stringLiteral.valueText());
            var text = moduleDecl.stringLiteral.text();

            var decl = new NormalPullDecl(valueText, text, kind, declFlags, context.getParent());

            context.semanticInfoChain.setDeclForAST(moduleDecl, decl);
            context.semanticInfoChain.setDeclForAST(moduleDecl.stringLiteral, decl);
            context.semanticInfoChain.setASTForDecl(decl, moduleDecl.stringLiteral);

            if (!moduleElementsHasExportAssignment(moduleDecl.moduleElements) || moduleContainsExecutableCode) {
                createModuleVariableDecl(decl, moduleDecl.stringLiteral, context);
            }

            context.pushParent(decl);
        }
        else {
            // Module has a name or dotted name.
            var moduleNames = ASTHelpers.getModuleNames(moduleDecl.name);
            for (var i = 0, n = moduleNames.length; i < n; i++) {
                var moduleName = moduleNames[i];

                // All the inner module decls are exported.
                var specificFlags = declFlags;
                if (i > 0) {
                    specificFlags |= PullElementFlags.Exported;
                }

                var decl = new NormalPullDecl(moduleName.valueText(), moduleName.text(), kind, specificFlags, context.getParent());

                //// The innermost moduleDecl maps to the entire ModuleDeclaration node.
                //// All the other ones map to the name node.  i.e. module A.B.C { }
                ////
                //// The decl for C points to the entire module declaration.  The decls for A and B
                //// will point at the A and B nodes respectively.
                //var ast = (i === (moduleName.length - 1))
                //    ? moduleDecl
                //    : moduleName;
                context.semanticInfoChain.setDeclForAST(moduleDecl, decl);
                context.semanticInfoChain.setDeclForAST(moduleName, decl);
                context.semanticInfoChain.setASTForDecl(decl, moduleName);

                if (moduleContainsExecutableCode) {
                    createModuleVariableDecl(decl, moduleName, context);
                }

                context.pushParent(decl);
            }
        }
    }

    function createModuleVariableDecl(decl: PullDecl, moduleNameAST: AST, context: DeclCollectionContext): void {
        decl.setFlags(decl.flags | getInitializationFlag(decl));

        // create the value decl
        var valueDecl = new NormalPullDecl(decl.name, decl.getDisplayName(), PullElementKind.Variable, decl.flags, context.getParent());
        decl.setValueDecl(valueDecl);
        context.semanticInfoChain.setASTForDecl(valueDecl, moduleNameAST);
    }

    function containsExecutableCode(members: ISyntaxList2): boolean {
        for (var i = 0, n = members.childCount(); i < n; i++) {
            var member = members.childAt(i);

            // October 11, 2013
            // Internal modules are either instantiated or non-instantiated. A non-instantiated 
            // module is an internal module containing only interface types and other non - 
            // instantiated modules. 
            //
            // Note: small spec deviation.  We don't consider an import statement sufficient to
            // consider a module instantiated (except the case of 'export import' handled below ).
            // After all, if there is an import, but no actual code that references the imported value, 
            // then there's no need to emit the import or the module.
            if (member.kind() === SyntaxKind.ModuleDeclaration) {
                var moduleDecl = <ModuleDeclaration>member;

                // If we have a module in us, and it contains executable code, then we
                // contain executable code.
                if (containsExecutableCode(moduleDecl.moduleElements)) {
                    return true;
                }
            }
            else if (member.kind() === SyntaxKind.ImportDeclaration) {
                // pessimistically assume 'export import' declaration will be the alias to something instantiated
                // we cannot figure out it exactly until the resolution time.
                if (hasModifier((<ImportDeclaration>member).modifiers, PullElementFlags.Exported)) {
                    return true;
                }
            }
            else if (member.kind() !== SyntaxKind.InterfaceDeclaration && member.kind() !== SyntaxKind.ExportAssignment) {
                // In case of export assignment we should be really checking meaning of Export assignment identifier, but thats TODO for later
                // If we contain anything that's not an interface declaration, then we contain
                // executable code.
                return true;
            }
        }

        return false;
    }

    function preCollectClassDecls(classDecl: ClassDeclaration, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.None;

        if ((hasModifier(classDecl.modifiers, PullElementFlags.Exported) || isParsingAmbientModule(classDecl, context)) && !containingModuleHasExportAssignment(classDecl)) {
            declFlags |= PullElementFlags.Exported;
        }

        if (hasModifier(classDecl.modifiers, PullElementFlags.Ambient) || isParsingAmbientModule(classDecl, context) || context.isDeclareFile) {
            declFlags |= PullElementFlags.Ambient;
        }

        var parent = context.getParent();

        var decl = new NormalPullDecl(classDecl.identifier.valueText(), classDecl.identifier.text(), PullElementKind.Class, declFlags, parent);

        var constructorDecl = new NormalPullDecl(
            classDecl.identifier.valueText(),
            classDecl.identifier.text(),
            PullElementKind.Variable,
            declFlags | PullElementFlags.ClassConstructorVariable,
            parent);

        decl.setValueDecl(constructorDecl);

        context.semanticInfoChain.setDeclForAST(classDecl, decl);
        context.semanticInfoChain.setASTForDecl(decl, classDecl);
        context.semanticInfoChain.setASTForDecl(constructorDecl, classDecl);

        context.pushParent(decl);
    }

    function preCollectObjectTypeDecls(objectType: ObjectType, context: DeclCollectionContext): void {
        // if this is the 'body' of an interface declaration, then we don't want to create a decl 
        // here.  We want the interface decl to be the parent decl of all the members we visit.
        if (objectType.parent.kind() === SyntaxKind.InterfaceDeclaration) {
            return;
        }

        var declFlags = PullElementFlags.None;

        var parent = context.getParent();

        if (parent && (parent.kind === PullElementKind.WithBlock || (parent.flags & PullElementFlags.DeclaredInAWithBlock))) {
            declFlags |= PullElementFlags.DeclaredInAWithBlock;
        }

        var decl = new NormalPullDecl("", "", PullElementKind.ObjectType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(objectType, decl);
        context.semanticInfoChain.setASTForDecl(decl, objectType);

        context.pushParent(decl);
    }

    function preCollectInterfaceDecls(interfaceDecl: InterfaceDeclaration, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.None;

        if ((hasModifier(interfaceDecl.modifiers, PullElementFlags.Exported) || isParsingAmbientModule(interfaceDecl, context)) && !containingModuleHasExportAssignment(interfaceDecl)) {
            declFlags |= PullElementFlags.Exported;
        }

        var parent = context.getParent();

        var decl = new NormalPullDecl(interfaceDecl.identifier.valueText(), interfaceDecl.identifier.text(), PullElementKind.Interface, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(interfaceDecl, decl);
        context.semanticInfoChain.setASTForDecl(decl, interfaceDecl);

        context.pushParent(decl);
    }

    function preCollectParameterDecl(argDecl: Parameter, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.None;

        if (hasModifier(argDecl.modifiers, PullElementFlags.Private)) {
            declFlags |= PullElementFlags.Private;
        }
        else {
            declFlags |= PullElementFlags.Public;
        }

        if (argDecl.questionToken !== null || argDecl.equalsValueClause !== null || argDecl.dotDotDotToken !== null) {
            declFlags |= PullElementFlags.Optional;
        }

        var parent = context.getParent();

        if (parent && (parent.kind === PullElementKind.WithBlock || (parent.flags & PullElementFlags.DeclaredInAWithBlock))) {
            declFlags |= PullElementFlags.DeclaredInAWithBlock;
        }

        var decl = new NormalPullDecl(argDecl.identifier.valueText(), argDecl.identifier.text(), PullElementKind.Parameter, declFlags, parent);

        // If it has a default arg, record the fact that the parent has default args (we will need this during resolution)
        if (argDecl.equalsValueClause) {
            parent.flags |= PullElementFlags.HasDefaultArgs;
        }

        if (parent.kind === PullElementKind.ConstructorMethod) {
            decl.setFlag(PullElementFlags.ConstructorParameter);
        }
        
        // if it's a property type, we'll need to add it to the parent's parent as well
        var isPublicOrPrivate = hasModifier(argDecl.modifiers, PullElementFlags.Public | PullElementFlags.Private);
        var isInConstructor = parent.kind === PullElementKind.ConstructorMethod;
        if (isPublicOrPrivate && isInConstructor) {
            var parentsParent = context.parentChain[context.parentChain.length - 2];
            // optional parameters don't introduce optional properties - always drop isOptional flag on the property declaration
            var propDeclFlags = declFlags & ~PullElementFlags.Optional;
            var propDecl = new NormalPullDecl(argDecl.identifier.valueText(), argDecl.identifier.text(), PullElementKind.Property, propDeclFlags, parentsParent);
            propDecl.setValueDecl(decl);
            decl.setFlag(PullElementFlags.PropertyParameter);
            propDecl.setFlag(PullElementFlags.PropertyParameter);

            if (parent.kind === PullElementKind.ConstructorMethod) {
                propDecl.setFlag(PullElementFlags.ConstructorParameter);
            }

            context.semanticInfoChain.setASTForDecl(decl, argDecl);
            context.semanticInfoChain.setASTForDecl(propDecl, argDecl);
            context.semanticInfoChain.setDeclForAST(argDecl, propDecl);
        }
        else {
            context.semanticInfoChain.setASTForDecl(decl, argDecl);
            context.semanticInfoChain.setDeclForAST(argDecl, decl);
        }

        // Record this decl in its parent in the declGroup with the corresponding name
        parent.addVariableDeclToGroup(decl);
        
        // Note: it is intentional that a parameter does not get added to hte context stack.  A 
        // parameter does not introduce a new name scope, so it shouldn't be in the context decl stack.
        // context.pushParent(decl);
    }

    function preCollectTypeParameterDecl(typeParameterDecl: TypeParameter, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.None;

        var parent = context.getParent();

        if (parent && (parent.kind === PullElementKind.WithBlock || (parent.flags & PullElementFlags.DeclaredInAWithBlock))) {
            declFlags |= PullElementFlags.DeclaredInAWithBlock;
        }

        var decl = new NormalPullDecl(typeParameterDecl.identifier.valueText(), typeParameterDecl.identifier.text(), PullElementKind.TypeParameter, declFlags, parent);
        context.semanticInfoChain.setASTForDecl(decl, typeParameterDecl);
        context.semanticInfoChain.setDeclForAST(typeParameterDecl, decl);

        // Note: it is intentional that a type parameter does not get added to hte context stack.
        // A type parameter does not introduce a new name scope, so it shouldn't be in the 
        // context decl stack.
        // context.pushParent(decl);
    }

    // interface properties
    function createPropertySignature(propertyDecl: PropertySignature, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.Public;
        var parent = context.getParent();
        var declType = PullElementKind.Property;

        if (propertyDecl.questionToken !== null) {
            declFlags |= PullElementFlags.Optional;
        }

        var decl = new NormalPullDecl(propertyDecl.propertyName.valueText(), propertyDecl.propertyName.text(), declType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(propertyDecl, decl);
        context.semanticInfoChain.setASTForDecl(decl, propertyDecl);

        // Note: it is intentional that a var decl does not get added to hte context stack.  A var
        // decl does not introduce a new name scope, so it shouldn't be in the context decl stack.
        // context.pushParent(decl);
    }

    // class member variables
    function createMemberVariableDeclaration(memberDecl: MemberVariableDeclaration, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.None;
        var declType = PullElementKind.Property;

        if (hasModifier(memberDecl.modifiers, PullElementFlags.Private)) {
            declFlags |= PullElementFlags.Private;
        }
        else {
            declFlags |= PullElementFlags.Public;
        }

        if (hasModifier(memberDecl.modifiers, PullElementFlags.Static)) {
            declFlags |= PullElementFlags.Static;
        }

        var parent = context.getParent();

        var decl = new NormalPullDecl(memberDecl.variableDeclarator.propertyName.valueText(), memberDecl.variableDeclarator.propertyName.text(), declType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(memberDecl, decl);
        context.semanticInfoChain.setDeclForAST(memberDecl.variableDeclarator, decl);
        context.semanticInfoChain.setASTForDecl(decl, memberDecl);

        // Note: it is intentional that a var decl does not get added to hte context stack.  A var
        // decl does not introduce a new name scope, so it shouldn't be in the context decl stack.
        // context.pushParent(decl);
    }

    function createVariableDeclaration(varDecl: VariableDeclarator, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.None;
        var declType = PullElementKind.Variable;

        var modifiers = ASTHelpers.getVariableDeclaratorModifiers(varDecl);
        if ((hasModifier(modifiers, PullElementFlags.Exported) || isParsingAmbientModule(varDecl, context)) && !containingModuleHasExportAssignment(varDecl)) {
            declFlags |= PullElementFlags.Exported;
        }

        if (hasModifier(modifiers, PullElementFlags.Ambient) || isParsingAmbientModule(varDecl, context) || context.isDeclareFile) {
            declFlags |= PullElementFlags.Ambient;
        }

        var parent = context.getParent();

        if (parent && (parent.kind === PullElementKind.WithBlock || (parent.flags & PullElementFlags.DeclaredInAWithBlock))) {
            declFlags |= PullElementFlags.DeclaredInAWithBlock;
        }

        var decl = new NormalPullDecl(varDecl.propertyName.valueText(), varDecl.propertyName.text(), declType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(varDecl, decl);
        context.semanticInfoChain.setASTForDecl(decl, varDecl);

        if (parent) {
            // Record this decl in its parent in the declGroup with the corresponding name
            parent.addVariableDeclToGroup(decl);
        }

        // Note: it is intentional that a var decl does not get added to hte context stack.  A var
        // decl does not introduce a new name scope, so it shouldn't be in the context decl stack.
        // context.pushParent(decl);
    }

    function preCollectVarDecls(ast: AST, context: DeclCollectionContext): void {
        if (ast.parent.kind() === SyntaxKind.MemberVariableDeclaration) {
            // Already handled this node.
            return;
        }

        var varDecl = <VariableDeclarator>ast;
        createVariableDeclaration(varDecl, context);
    }

    // function type expressions
    function createFunctionTypeDeclaration(functionTypeDeclAST: FunctionType, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.Signature;
        var declType = PullElementKind.FunctionType;

        var parent = context.getParent();

        if (parent && (parent.kind === PullElementKind.WithBlock || (parent.flags & PullElementFlags.DeclaredInAWithBlock))) {
            declFlags |= PullElementFlags.DeclaredInAWithBlock;
        }

        var decl = new NormalPullDecl("", "", declType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(functionTypeDeclAST, decl);
        context.semanticInfoChain.setASTForDecl(decl, functionTypeDeclAST);

        context.pushParent(decl);
    }

    // constructor types
    function createConstructorTypeDeclaration(constructorTypeDeclAST: ConstructorType, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.None;
        var declType = PullElementKind.ConstructorType;

        var parent = context.getParent();

        if (parent && (parent.kind === PullElementKind.WithBlock || (parent.flags & PullElementFlags.DeclaredInAWithBlock))) {
            declFlags |= PullElementFlags.DeclaredInAWithBlock;
        }

        var decl = new NormalPullDecl("", "", declType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(constructorTypeDeclAST, decl);
        context.semanticInfoChain.setASTForDecl(decl, constructorTypeDeclAST);

        context.pushParent(decl);
    }

    // function declaration
    function createFunctionDeclaration(funcDeclAST: FunctionDeclaration, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.None;
        var declType = PullElementKind.Function;

        if ((hasModifier(funcDeclAST.modifiers, PullElementFlags.Exported) || isParsingAmbientModule(funcDeclAST, context)) && !containingModuleHasExportAssignment(funcDeclAST)) {
            declFlags |= PullElementFlags.Exported;
        }

        if (hasModifier(funcDeclAST.modifiers, PullElementFlags.Ambient) || isParsingAmbientModule(funcDeclAST, context) || context.isDeclareFile) {
            declFlags |= PullElementFlags.Ambient;
        }

        if (!funcDeclAST.block) {
            declFlags |= PullElementFlags.Signature;
        }

        var parent = context.getParent();

        if (parent && (parent.kind === PullElementKind.WithBlock || (parent.flags & PullElementFlags.DeclaredInAWithBlock))) {
            declFlags |= PullElementFlags.DeclaredInAWithBlock;
        }

        var decl = new NormalPullDecl(funcDeclAST.identifier.valueText(), funcDeclAST.identifier.text(), declType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(funcDeclAST, decl);
        context.semanticInfoChain.setASTForDecl(decl, funcDeclAST);

        context.pushParent(decl);
    }

    // function expression
    function createAnyFunctionExpressionDeclaration(
        functionExpressionDeclAST: AST,
        id: Identifier,
        context: DeclCollectionContext,
        displayName: Identifier = null): void {

        var declFlags = PullElementFlags.None;

        if (functionExpressionDeclAST.kind() === SyntaxKind.SimpleArrowFunctionExpression ||
            functionExpressionDeclAST.kind() === SyntaxKind.ParenthesizedArrowFunctionExpression) {
            declFlags |= PullElementFlags.ArrowFunction;
        }

        var parent = context.getParent();

        if (parent && (parent.kind === PullElementKind.WithBlock || (parent.flags & PullElementFlags.DeclaredInAWithBlock))) {
            declFlags |= PullElementFlags.DeclaredInAWithBlock;
        }

        var name = id ? id.text() : "";
        var displayNameText = displayName ? displayName.text() : "";
        var decl: PullDecl = new PullFunctionExpressionDecl(name, declFlags, parent, displayNameText);
        context.semanticInfoChain.setDeclForAST(functionExpressionDeclAST, decl);
        context.semanticInfoChain.setASTForDecl(decl, functionExpressionDeclAST);

        context.pushParent(decl);

        if (functionExpressionDeclAST.kind() === SyntaxKind.SimpleArrowFunctionExpression) {
            var simpleArrow = <SimpleArrowFunctionExpression>functionExpressionDeclAST;
            var declFlags = PullElementFlags.Public;

            var parent = context.getParent();

            if (hasFlag(parent.flags, PullElementFlags.DeclaredInAWithBlock)) {
                declFlags |= PullElementFlags.DeclaredInAWithBlock;
            }

            var decl: PullDecl = new NormalPullDecl(simpleArrow.identifier.valueText(), simpleArrow.identifier.text(), PullElementKind.Parameter, declFlags, parent);

            context.semanticInfoChain.setASTForDecl(decl, simpleArrow.identifier);
            context.semanticInfoChain.setDeclForAST(simpleArrow.identifier, decl);

            // Record this decl in its parent in the declGroup with the corresponding name
            parent.addVariableDeclToGroup(decl);
        }
    }

    function createMemberFunctionDeclaration(funcDecl: MemberFunctionDeclaration, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.None;
        var declType = PullElementKind.Method;

        if (hasModifier(funcDecl.modifiers, PullElementFlags.Static)) {
            declFlags |= PullElementFlags.Static;
        }

        if (hasModifier(funcDecl.modifiers, PullElementFlags.Private)) {
            declFlags |= PullElementFlags.Private;
        }
        else {
            declFlags |= PullElementFlags.Public;
        }

        if (!funcDecl.block) {
            declFlags |= PullElementFlags.Signature;
        }

        var parent = context.getParent();

        var decl = new NormalPullDecl(funcDecl.propertyName.valueText(), funcDecl.propertyName.text(), declType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(funcDecl, decl);
        context.semanticInfoChain.setASTForDecl(decl, funcDecl);

        context.pushParent(decl);
    }

    // index signatures
    function createIndexSignatureDeclaration(indexSignatureDeclAST: IndexSignature, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.Signature;
        var declType = PullElementKind.IndexSignature;

        var parent = context.getParent();

        var decl = new NormalPullDecl("", "" , declType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(indexSignatureDeclAST, decl);
        context.semanticInfoChain.setASTForDecl(decl, indexSignatureDeclAST);

        context.pushParent(decl);
    }

    // call signatures
    function createCallSignatureDeclaration(callSignature: CallSignature, context: DeclCollectionContext): void {
        var isChildOfObjectType = callSignature.parent && callSignature.parent.parent &&
            callSignature.parent.kind() === SyntaxKind.SeparatedList &&
            callSignature.parent.parent.kind() === SyntaxKind.ObjectType;

        if (!isChildOfObjectType) {
            // This was a call signature that was part of some other entity (like a function 
            // declaration or construct signature).  Those are already handled specially and
            // we don't want to end up making another call signature for them.  We only want
            // to make an actual call signature if we're a standalone call signature in an 
            // object/interface type.
            return;
        }

        var declFlags = PullElementFlags.Signature;
        var declType = PullElementKind.CallSignature;

        var parent = context.getParent();

        if (parent && (parent.kind === PullElementKind.WithBlock || (parent.flags & PullElementFlags.DeclaredInAWithBlock))) {
            declFlags |= PullElementFlags.DeclaredInAWithBlock;
        }

        var decl = new NormalPullDecl("", "", declType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(callSignature, decl);
        context.semanticInfoChain.setASTForDecl(decl, callSignature);

        context.pushParent(decl);
    }

    function createMethodSignatureDeclaration(method: MethodSignature, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.None;
        var declType = PullElementKind.Method;

        declFlags |= PullElementFlags.Public;
        declFlags |= PullElementFlags.Signature;

        if (method.questionToken !== null) {
            declFlags |= PullElementFlags.Optional;
        }

        var parent = context.getParent();

        var decl = new NormalPullDecl(method.propertyName.valueText(), method.propertyName.text(), declType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(method, decl);
        context.semanticInfoChain.setASTForDecl(decl, method);

        context.pushParent(decl);
    }

    // construct signatures
    function createConstructSignatureDeclaration(constructSignatureDeclAST: ConstructSignature, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.Signature;
        var declType = PullElementKind.ConstructSignature;

        var parent = context.getParent();

        if (parent && (parent.kind === PullElementKind.WithBlock || (parent.flags & PullElementFlags.DeclaredInAWithBlock))) {
            declFlags |= PullElementFlags.DeclaredInAWithBlock;
        }

        var decl = new NormalPullDecl("", "", declType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(constructSignatureDeclAST, decl);
        context.semanticInfoChain.setASTForDecl(decl, constructSignatureDeclAST);

        context.pushParent(decl);
    }

    // class constructors
    function createClassConstructorDeclaration(constructorDeclAST: ConstructorDeclaration, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.None;
        var declType = PullElementKind.ConstructorMethod;

        if (!constructorDeclAST.block) {
            declFlags |= PullElementFlags.Signature;
        }

        var parent = context.getParent();

        if (parent) {
            // if the parent is exported, the constructor decl must be as well
            var parentFlags = parent.flags;

            if (parentFlags & PullElementFlags.Exported) {
                declFlags |= PullElementFlags.Exported;
            }
        }

        var decl = new NormalPullDecl(parent.name, parent.getDisplayName(), declType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(constructorDeclAST, decl);
        context.semanticInfoChain.setASTForDecl(decl, constructorDeclAST);

        context.pushParent(decl);
    }

    function createGetAccessorDeclaration(getAccessorDeclAST: GetAccessor, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.Public;
        var declType = PullElementKind.GetAccessor;

        if (hasModifier(getAccessorDeclAST.modifiers, PullElementFlags.Static)) {
            declFlags |= PullElementFlags.Static;
        }

        if (hasModifier(getAccessorDeclAST.modifiers, PullElementFlags.Private)) {
            declFlags |= PullElementFlags.Private;
        }
        else {
            declFlags |= PullElementFlags.Public;
        }

        var parent = context.getParent();

        if (parent && (parent.kind === PullElementKind.WithBlock || (parent.flags & PullElementFlags.DeclaredInAWithBlock))) {
            declFlags |= PullElementFlags.DeclaredInAWithBlock;
        }

        var decl = new NormalPullDecl(getAccessorDeclAST.propertyName.valueText(), getAccessorDeclAST.propertyName.text(), declType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(getAccessorDeclAST, decl);
        context.semanticInfoChain.setASTForDecl(decl, getAccessorDeclAST);

        context.pushParent(decl);
    }

    function createFunctionExpressionDeclaration(expression: FunctionExpression, context: DeclCollectionContext): void {
        createAnyFunctionExpressionDeclaration(expression, expression.identifier, context);
    }

    function createSetAccessorDeclaration(setAccessorDeclAST: SetAccessor, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.Public;
        var declType = PullElementKind.SetAccessor;

        if (hasModifier(setAccessorDeclAST.modifiers, PullElementFlags.Static)) {
            declFlags |= PullElementFlags.Static;
        }

        if (hasModifier(setAccessorDeclAST.modifiers, PullElementFlags.Private)) {
            declFlags |= PullElementFlags.Private;
        }
        else {
            declFlags |= PullElementFlags.Public;
        }

        var parent = context.getParent();

        if (parent && (parent.kind === PullElementKind.WithBlock || (parent.flags & PullElementFlags.DeclaredInAWithBlock))) {
            declFlags |= PullElementFlags.DeclaredInAWithBlock;
        }

        var decl = new NormalPullDecl(setAccessorDeclAST.propertyName.valueText(), setAccessorDeclAST.propertyName.text(), declType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(setAccessorDeclAST, decl);
        context.semanticInfoChain.setASTForDecl(decl, setAccessorDeclAST);

        context.pushParent(decl);
    }

    function preCollectCatchDecls(ast: CatchClause, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.None;
        var declType = PullElementKind.CatchBlock;

        var parent = context.getParent();

        if (parent && (parent.kind === PullElementKind.WithBlock || (parent.flags & PullElementFlags.DeclaredInAWithBlock))) {
            declFlags |= PullElementFlags.DeclaredInAWithBlock;
        }

        var decl = new NormalPullDecl("", "", declType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(ast, decl);
        context.semanticInfoChain.setASTForDecl(decl, ast);

        context.pushParent(decl);

        var declFlags = PullElementFlags.None;
        var declType = PullElementKind.CatchVariable;

        // Create a decl for the catch clause variable.
        var parent = context.getParent();

        if (hasFlag(parent.flags, PullElementFlags.DeclaredInAWithBlock)) {
            declFlags |= PullElementFlags.DeclaredInAWithBlock;
        }

        var decl = new NormalPullDecl(ast.identifier.valueText(), ast.identifier.text(), declType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(ast.identifier, decl);
        context.semanticInfoChain.setASTForDecl(decl, ast.identifier);

        if (parent) {
            // Record this decl in its parent in the declGroup with the corresponding name
            parent.addVariableDeclToGroup(decl);
        }
    }

    function preCollectWithDecls(ast: AST, context: DeclCollectionContext): void {
        var declFlags = PullElementFlags.None;
        var declType = PullElementKind.WithBlock;

        var parent = context.getParent();

        var decl = new NormalPullDecl("", "", declType, declFlags, parent);
        context.semanticInfoChain.setDeclForAST(ast, decl);
        context.semanticInfoChain.setASTForDecl(decl, ast);

        context.pushParent(decl);
    }

    function preCollectObjectLiteralDecls(ast: AST, context: DeclCollectionContext): void {
        var decl = new NormalPullDecl(
            "", "", PullElementKind.ObjectLiteral, PullElementFlags.None, context.getParent());

        context.semanticInfoChain.setDeclForAST(ast, decl);
        context.semanticInfoChain.setASTForDecl(decl, ast);

        context.pushParent(decl);
    }

    function preCollectSimplePropertyAssignmentDecls(propertyAssignment: SimplePropertyAssignment, context: DeclCollectionContext): void {
        var assignmentText = getPropertyAssignmentNameTextFromIdentifier(propertyAssignment.propertyName);
        var span = TextSpan.fromBounds(propertyAssignment.start(), propertyAssignment.end());

        var decl = new NormalPullDecl(assignmentText.memberName, assignmentText.actualText, PullElementKind.Property, PullElementFlags.Public, context.getParent());

        context.semanticInfoChain.setDeclForAST(propertyAssignment, decl);
        context.semanticInfoChain.setASTForDecl(decl, propertyAssignment);

        // Note: it is intentional that a property assignment does not get added to hte context 
        // stack.  A prop assignment does not introduce a new name scope, so it shouldn't be in
        // the context decl stack.
        // context.pushParent(decl);
    }

    function preCollectFunctionPropertyAssignmentDecls(propertyAssignment: FunctionPropertyAssignment, context: DeclCollectionContext): void {
        var assignmentText = getPropertyAssignmentNameTextFromIdentifier(propertyAssignment.propertyName);

        var decl = new NormalPullDecl(assignmentText.memberName, assignmentText.actualText, PullElementKind.Property, PullElementFlags.Public, context.getParent());

        context.semanticInfoChain.setDeclForAST(propertyAssignment, decl);
        context.semanticInfoChain.setASTForDecl(decl, propertyAssignment);

        createAnyFunctionExpressionDeclaration(
            propertyAssignment, propertyAssignment.propertyName, context, propertyAssignment.propertyName);
    }

    function preCollectDecls(ast: AST, context: DeclCollectionContext) {
        switch (ast.kind()) {
            case SyntaxKind.SourceUnit:
                preCollectScriptDecls(<SourceUnit>ast, context);
                break;
            case SyntaxKind.EnumDeclaration:
                preCollectEnumDecls(<EnumDeclaration>ast, context);
                break;
            case SyntaxKind.EnumElement:
                createEnumElementDecls(<EnumElement>ast, context);
                break;
            case SyntaxKind.ModuleDeclaration:
                preCollectModuleDecls(<ModuleDeclaration>ast, context);
                break;
            case SyntaxKind.ClassDeclaration:
                preCollectClassDecls(<ClassDeclaration>ast, context);
                break;
            case SyntaxKind.InterfaceDeclaration:
                preCollectInterfaceDecls(<InterfaceDeclaration>ast, context);
                break;
            case SyntaxKind.ObjectType:
                preCollectObjectTypeDecls(<ObjectType>ast, context);
                break;
            case SyntaxKind.Parameter:
                preCollectParameterDecl(<Parameter>ast, context);
                break;
            case SyntaxKind.MemberVariableDeclaration:
                createMemberVariableDeclaration(<MemberVariableDeclaration>ast, context);
                break;
            case SyntaxKind.PropertySignature:
                createPropertySignature(<PropertySignature>ast, context);
                break;
            case SyntaxKind.VariableDeclarator:
                preCollectVarDecls(ast, context);
                break;
            case SyntaxKind.ConstructorDeclaration:
                createClassConstructorDeclaration(<ConstructorDeclaration>ast, context);
                break;
            case SyntaxKind.GetAccessor:
                createGetAccessorDeclaration(<GetAccessor>ast, context);
                break;
            case SyntaxKind.SetAccessor:
                createSetAccessorDeclaration(<SetAccessor>ast, context);
                break;
            case SyntaxKind.FunctionExpression:
                createFunctionExpressionDeclaration(<FunctionExpression>ast, context);
                break;
            case SyntaxKind.MemberFunctionDeclaration:
                createMemberFunctionDeclaration(<MemberFunctionDeclaration>ast, context);
                break;
            case SyntaxKind.IndexSignature:
                createIndexSignatureDeclaration(<IndexSignature>ast, context);
                break;
            case SyntaxKind.FunctionType:
                createFunctionTypeDeclaration(<FunctionType>ast, context);
                break;
            case SyntaxKind.ConstructorType:
                createConstructorTypeDeclaration(<ConstructorType>ast, context);
                break;
            case SyntaxKind.CallSignature:
                createCallSignatureDeclaration(<CallSignature>ast, context);
                break;
            case SyntaxKind.ConstructSignature:
                createConstructSignatureDeclaration(<ConstructSignature>ast, context);
                break;
            case SyntaxKind.MethodSignature:
                createMethodSignatureDeclaration(<MethodSignature>ast, context);
                break;
            case SyntaxKind.FunctionDeclaration:
                createFunctionDeclaration(<FunctionDeclaration>ast, context);
                break;
            case SyntaxKind.SimpleArrowFunctionExpression:
            case SyntaxKind.ParenthesizedArrowFunctionExpression:
                createAnyFunctionExpressionDeclaration(ast, /*id*/null, context);
                break;
            case SyntaxKind.ImportDeclaration:
                preCollectImportDecls(ast, context);
                break;
            case SyntaxKind.TypeParameter:
                preCollectTypeParameterDecl(<TypeParameter>ast, context);
                break;
            case SyntaxKind.CatchClause:
                preCollectCatchDecls(<CatchClause>ast, context);
                break;
            case SyntaxKind.WithStatement:
                preCollectWithDecls(ast, context);
                break;
            case SyntaxKind.ObjectLiteralExpression:
                preCollectObjectLiteralDecls(ast, context);
                break;
            case SyntaxKind.SimplePropertyAssignment:
                preCollectSimplePropertyAssignmentDecls(<SimplePropertyAssignment>ast, context);
                break;
            case SyntaxKind.FunctionPropertyAssignment:
                preCollectFunctionPropertyAssignmentDecls(<FunctionPropertyAssignment>ast, context);
                break;
        }
    }

    function isContainer(decl: PullDecl): boolean {
        return decl.kind === PullElementKind.Container || decl.kind === PullElementKind.DynamicModule || decl.kind === PullElementKind.Enum;
    }

    function getInitializationFlag(decl: PullDecl): PullElementFlags {
        if (decl.kind & PullElementKind.Container) {
            return PullElementFlags.InitializedModule;
        }
        else if (decl.kind & PullElementKind.DynamicModule) {
            return PullElementFlags.InitializedDynamicModule;
        }

        return PullElementFlags.None;
    }

    function hasInitializationFlag(decl: PullDecl): boolean {
        var kind = decl.kind;

        if (kind & PullElementKind.Container) {
            return (decl.flags & PullElementFlags.InitializedModule) !== 0;
        }
        else if (kind & PullElementKind.DynamicModule) {
            return (decl.flags & PullElementFlags.InitializedDynamicModule) !== 0;
        }

        return false;
    }

    function postCollectDecls(ast: AST, context: DeclCollectionContext) {
        var currentDecl = context.getParent();

        // We only want to pop the module decls when we're done with the module itself, and not 
        // when we are done with the module names.
        if (ast.kind() === SyntaxKind.IdentifierName || ast.kind() === SyntaxKind.StringLiteral) {
            if (currentDecl.kind === PullElementKind.Container || currentDecl.kind === PullElementKind.DynamicModule) {
                return;
            }
        }

        if (ast.kind() === SyntaxKind.ModuleDeclaration) {
            var moduleDeclaration = <ModuleDeclaration>ast;
            if (moduleDeclaration.stringLiteral) {
                Debug.assert(currentDecl.ast() === moduleDeclaration.stringLiteral);
                context.popParent();
            }
            else {
                var moduleNames = ASTHelpers.getModuleNames(moduleDeclaration.name);
                for (var i = moduleNames.length - 1; i >= 0; i--) {
                    var moduleName = moduleNames[i];
                    Debug.assert(currentDecl.ast() === moduleName);
                    context.popParent();
                    currentDecl = context.getParent();
                }
            }
        }

        if (ast.kind() === SyntaxKind.EnumDeclaration) {
            // Now that we've created all the child decls for the enum elements, determine what 
            // (if any) their constant values should be.
            computeEnumElementConstantValues(<EnumDeclaration>ast, currentDecl, context);
        }

        // Don't pop the topmost decl.  We return that out at the end.
        while (currentDecl.getParentDecl() && currentDecl.ast() === ast) {
            context.popParent();
            currentDecl = context.getParent();
        }
    }

    function computeEnumElementConstantValues(ast: EnumDeclaration, enumDecl: PullDecl, context: DeclCollectionContext): void {
        Debug.assert(enumDecl.kind === PullElementKind.Enum);

        // If this is a non ambient enum, then it starts with a constant section of enum elements.
        // Thus, elements without an initializer in these sections will be assumed to have a 
        // constant value.
        //
        // However, if this an enum in an ambient context, then non initialized elements are 
        // thought to have a computed value and are not in a constant section.
        var isAmbientEnum = hasFlag(enumDecl.flags, PullElementFlags.Ambient);
        var inConstantSection = !isAmbientEnum;
        var currentConstantValue = 0;
        var enumMemberDecls = <PullEnumElementDecl[]>enumDecl.getChildDecls();

        for (var i = 0, n = ast.enumElements.nonSeparatorCount(); i < n; i++) {
            var enumElement = <EnumElement>ast.enumElements.nonSeparatorAt(i);
            var enumElementDecl = ArrayUtilities.first(enumMemberDecls, d =>
                context.semanticInfoChain.getASTForDecl(d) === enumElement);

            Debug.assert(enumElementDecl.kind === PullElementKind.EnumMember);

            if (enumElement.equalsValueClause === null) {
                // Didn't have an initializer.  If we're in a constant section, then this appears
                // to have the value of the current constant.  If we're in a non-constant section
                // then this gets no value.
                if (inConstantSection) {
                    enumElementDecl.constantValue = currentConstantValue;
                    currentConstantValue++;
                }
            }
            else {
                // Enum element had an initializer.  If it's a constant, then then enum gets that 
                // value, and we transition to (or stay in) a constant section (as long as we're
                // not in an ambient context.
                //
                // If it's not a constant, then we transition to a non-constant section.
                enumElementDecl.constantValue = computeEnumElementConstantValue(enumElement.equalsValueClause.value, enumMemberDecls, context);
                if (enumElementDecl.constantValue !== null && !isAmbientEnum) {
                    // This enum element had a constant value.  We're now in a constant section.
                    // Any successive enum elements should get their values from this constant
                    // value onwards.
                    inConstantSection = true;
                    currentConstantValue = enumElementDecl.constantValue + 1;
                }
                else {
                    // Didn't get a constant value.  We're not in a constant section.
                    inConstantSection = false;
                }
            }

            Debug.assert(enumElementDecl.constantValue !== undefined);
        }
    }

    function computeEnumElementConstantValue(expression: AST, enumMemberDecls: PullEnumElementDecl[], context: DeclCollectionContext): number {
        Debug.assert(expression);

        if (ASTHelpers.isIntegerLiteralAST(expression)) {
            // Always produce a value for an integer literal.
            var token: NumericLiteral;
            switch (expression.kind()) {
                case SyntaxKind.PlusExpression:
                case SyntaxKind.NegateExpression:
                    token = <NumericLiteral>(<PrefixUnaryExpression>expression).operand;
                    break;
                default:
                    token = <NumericLiteral>expression;
            }

            var value = token.value();
            return value && expression.kind() === SyntaxKind.NegateExpression ? -value : value;
        }
        else if (context.propagateEnumConstants) {
            // It wasn't a numeric literal.  However, the experimental switch to be more aggressive
            // about propogating enum constants is enabled.  See if we can still figure out the
            // constant value for this enum element.
            switch (expression.kind()) {
                case SyntaxKind.IdentifierName:
                    // If it's a name, see if we already had an enum value named this.  If so,
                    // return that value.  Note, only search backward in the enum for a match.
                    var name = <Identifier>expression;
                    var matchingEnumElement = ArrayUtilities.firstOrDefault(enumMemberDecls, d => d.name === name.valueText());

                    return matchingEnumElement ? matchingEnumElement.constantValue : null;

                case SyntaxKind.LeftShiftExpression:
                    // Handle the common case of a left shifted value.
                    var binaryExpression = <BinaryExpression>expression;
                    var left = computeEnumElementConstantValue(binaryExpression.left, enumMemberDecls, context);
                    var right = computeEnumElementConstantValue(binaryExpression.right, enumMemberDecls, context);
                    if (left === null || right === null) {
                        return null;
                    }

                    return left << right;

                case SyntaxKind.BitwiseOrExpression:
                    // Handle the common case of an or'ed value.
                    var binaryExpression = <BinaryExpression>expression;
                    var left = computeEnumElementConstantValue(binaryExpression.left, enumMemberDecls, context);
                    var right = computeEnumElementConstantValue(binaryExpression.right, enumMemberDecls, context);
                    if (left === null || right === null) {
                        return null;
                    }

                    return left | right;
            }

            // TODO: add more cases.
            return null;
        }
        else {
            // Wasn't an integer literal, and we're not aggressively propagating constants.
            // There is no constant value for this expression.
            return null;
        }
    }

    export module DeclarationCreator {
        export function create(document: Document, semanticInfoChain: SemanticInfoChain, compilationSettings: ImmutableCompilationSettings): PullDecl {
            var declCollectionContext = new DeclCollectionContext(document, semanticInfoChain, compilationSettings.propagateEnumConstants());
            
            // create decls
            getAstWalkerFactory().simpleWalk(document.sourceUnit(), preCollectDecls, postCollectDecls, declCollectionContext);

            return declCollectionContext.getParent();
        }
    }
}