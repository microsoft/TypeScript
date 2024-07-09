// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescript.ts' />

module TypeScript {
    export class Continuation {
        public exceptionBlock = -1;
        constructor (public normalBlock: number) { }
    }

    function getBaseTypeLinks(bases: ASTList, baseTypeLinks: TypeLink[]) {
        if (bases) {
            var len = bases.members.length;
            if (baseTypeLinks == null) {
                baseTypeLinks = new TypeLink[];
            }
            for (var i = 0; i < len; i++) {
                var baseExpr = bases.members[i];
                var name = baseExpr;
                var typeLink = new TypeLink();
                typeLink.ast = name;
                baseTypeLinks[baseTypeLinks.length] = typeLink;
            }
        }
        return baseTypeLinks;
    }

    function getBases(type: Type, typeDecl: TypeDeclaration) {
        type.extendsTypeLinks = getBaseTypeLinks(typeDecl.extendsList, type.extendsTypeLinks);
        type.implementsTypeLinks = getBaseTypeLinks(typeDecl.implementsList, type.implementsTypeLinks);
    }

    function addPrototypeField(classType: Type, ast: AST, context: TypeCollectionContext) {
        var field = new ValueLocation();
        field.typeLink = new TypeLink();
        field.typeLink.ast = ast;
        field.typeLink.type = classType.instanceType;

        var fieldSymbol =
            new FieldSymbol("prototype", ast.minChar,
                            context.checker.locationInfo.unitIndex, true, field);
        fieldSymbol.flags |= (SymbolFlags.Property | SymbolFlags.BuiltIn);
        field.symbol = fieldSymbol;
        fieldSymbol.declAST = ast;
        classType.members.addPublicMember("prototype", fieldSymbol);
    }

    export function createNewConstructGroupForType(type: Type) {
        var signature = new Signature();
        signature.returnType = new TypeLink();
        signature.returnType.type = type.instanceType;
        signature.parameters = [];

        type.construct = new SignatureGroup();
        type.construct.addSignature(signature);     
    }

    export function cloneParentConstructGroupForChildType(child: Type, parent: Type) {
        child.construct = new SignatureGroup();
        var sig: Signature = null;

        if (!parent.construct) {
            createNewConstructGroupForType(parent);
        }

        for (var i = 0; i < parent.construct.signatures.length; i++) { 
            sig = new Signature();
            sig.parameters = parent.construct.signatures[i].parameters;
            sig.nonOptionalParameterCount = parent.construct.signatures[i].nonOptionalParameterCount;
            sig.typeCheckStatus = parent.construct.signatures[i].typeCheckStatus;
            sig.declAST = parent.construct.signatures[i].declAST;
            sig.returnType = new TypeLink();
            sig.returnType.type = child.instanceType;
            child.construct.addSignature(sig);
        }

    }

    export var globalId = "__GLO";

    export interface IAliasScopeContext {
        topLevelScope: ScopeChain;
        members: IHashTable;
        tcContext: TypeCollectionContext;
    }

    function findTypeSymbolInScopeChain(name: string, scopeChain: ScopeChain): Symbol {
        var symbol = scopeChain.scope.find(name, false, true);

        if (symbol == null && scopeChain.previous) {
            symbol = findTypeSymbolInScopeChain(name, scopeChain.previous);
        }

        return symbol;
    }

    function findSymbolFromAlias(alias: AST, context: IAliasScopeContext): Symbol {
        var symbol: Symbol = null;
        switch (alias.nodeType) {
            case NodeType.Name:
                var name = (<Identifier>alias).text;
                var isDynamic = isQuoted(name);

                var findSym = (id: string) => {
                    if (context.members) {
                        return context.members.lookup(name);
                    }
                    else {
                        return findTypeSymbolInScopeChain(name, context.topLevelScope);
                    }
                }

                if (isDynamic) {
                    symbol = context.tcContext.checker.findSymbolForDynamicModule(name, context.tcContext.script.locationInfo.filename, findSym);
                }
                else {
                    symbol = findSym(name);
                }

                break;

            case NodeType.Dot:
                var dottedExpr = <BinaryExpression>alias;
                var op1Sym = findSymbolFromAlias(dottedExpr.operand1, context);

                if (op1Sym && op1Sym.getType()) {
                    symbol = findSymbolFromAlias(dottedExpr.operand2, context);
                }

                break;

            default:
                break;
        }

        if (symbol) {
            var symType = symbol.getType();
            if (symType) {
                var members = symType.members;
                if (members) {
                    context.members = members.publicMembers;
                }
            }
        }

        return symbol;
    }

    export function preCollectImportTypes(ast: AST, parent: AST, context: TypeCollectionContext) {
        var scopeChain = context.scopeChain;
        var typeSymbol: TypeSymbol = null;
        var modType: ModuleType = null;
        var importDecl = <ImportDeclaration>ast;
        var isExported = hasFlag(importDecl.varFlags, VarFlags.Exported);

        // REVIEW: technically, this call isn't strictly necessary, since we'll find the type during the call to resolveTypeMembers
        var aliasedModSymbol = findSymbolFromAlias(importDecl.alias, { topLevelScope: scopeChain, members: null, tcContext: context });
        var isGlobal = context.scopeChain.container == context.checker.gloMod;

        if (aliasedModSymbol) {
            var aliasedModType = aliasedModSymbol.getType();

            if (aliasedModType) {
                modType = <ModuleType>aliasedModType;
            }
        }

        typeSymbol = new TypeSymbol(importDecl.id.text, importDecl.minChar,
                                    context.checker.locationInfo.unitIndex, modType);

        typeSymbol.aliasLink = importDecl;

        if (context.scopeChain.moduleDecl) {
            typeSymbol.declModule = context.scopeChain.moduleDecl;
        }
        typeSymbol.declAST = importDecl;
        importDecl.id.sym = typeSymbol;
        scopeChain.scope.enter(scopeChain.container, ast, typeSymbol,
                                context.checker.errorReporter, isExported || isGlobal, true, false);
        scopeChain.scope.enter(scopeChain.container, ast, typeSymbol,
                                context.checker.errorReporter, isExported || isGlobal, false, false);
        return true;
    }

    export function preCollectModuleTypes(ast: AST, parent: AST, context: TypeCollectionContext) {
        var scopeChain = context.scopeChain;

        var moduleDecl: ModuleDeclaration = <ModuleDeclaration>ast;

        var isAmbient = hasFlag(moduleDecl.modFlags, ModuleFlags.Ambient);
        var isEnum = hasFlag(moduleDecl.modFlags, ModuleFlags.IsEnum);
        var isGlobal = context.scopeChain.container == context.checker.gloMod;
        var isExported = hasFlag(moduleDecl.modFlags, ModuleFlags.Exported);
        var modName = (<Identifier>moduleDecl.name).text;

        var isDynamic = isQuoted(modName);

        var symbol = scopeChain.scope.findLocal(modName, false, false);
        var typeSymbol: TypeSymbol = null;
        var modType: ModuleType = null;
        if ((symbol == null) || (symbol.kind() != SymbolKind.Type)) {

            if (modType == null) {
                var enclosedTypes = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));
                var ambientEnclosedTypes = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));
                modType = new ModuleType(enclosedTypes, ambientEnclosedTypes);
                if (isEnum) {
                    modType.typeFlags |= TypeFlags.IsEnum;
                }
                modType.members = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));
                modType.ambientMembers = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));
                modType.setHasImplementation();
            }

            typeSymbol = new TypeSymbol(modName, moduleDecl.minChar,
                                        context.checker.locationInfo.unitIndex, modType);

            if (context.scopeChain.moduleDecl) {
                typeSymbol.declModule = context.scopeChain.moduleDecl;
            }
            typeSymbol.declAST = moduleDecl;
            typeSymbol.prettyName = moduleDecl.prettyName;
            scopeChain.scope.enter(scopeChain.container, ast, typeSymbol,
                                    context.checker.errorReporter, isExported || isGlobal, true, isAmbient);
            scopeChain.scope.enter(scopeChain.container, ast, typeSymbol,
                                    context.checker.errorReporter, isExported || isGlobal, false, isAmbient);
            modType.symbol = typeSymbol;
        }
        else {
            if (symbol && symbol.declAST && symbol.declAST.nodeType != NodeType.ModuleDeclaration) {
                context.checker.errorReporter.simpleError(moduleDecl, "Conflicting symbol name for module '" + modName + "'");
            }
            typeSymbol = <TypeSymbol>symbol;

            // initialize new private scope for the type
            var publicEnclosedTypes = typeSymbol.type.getAllEnclosedTypes().publicMembers;
            var publicEnclosedTypesTable = (publicEnclosedTypes == null) ? new StringHashTable() : publicEnclosedTypes;
            var enclosedTypes = new ScopedMembers(new DualStringHashTable(publicEnclosedTypesTable, new StringHashTable()));

            var publicEnclosedAmbientTypes = typeSymbol.type.getAllAmbientEnclosedTypes().publicMembers;
            var publicAmbientEnclosedTypesTable = (publicEnclosedAmbientTypes == null) ? new StringHashTable() : publicEnclosedAmbientTypes;
            var ambientEnclosedTypes = new ScopedMembers(new DualStringHashTable(publicAmbientEnclosedTypesTable, new StringHashTable()));

            var publicMembers = typeSymbol.type.members.publicMembers;
            var publicMembersTable = (publicMembers == null) ? new StringHashTable() : publicMembers;
            var members = new ScopedMembers(new DualStringHashTable(publicMembersTable, new StringHashTable()));

            var publicAmbientMembers = typeSymbol.type.ambientMembers.publicMembers;
            var publicAmbientMembersTable = (publicAmbientMembers == null) ? new StringHashTable() : publicAmbientMembers;
            var ambientMembers = new ScopedMembers(new DualStringHashTable(publicAmbientMembersTable, new StringHashTable()));

            modType = new ModuleType(enclosedTypes, ambientEnclosedTypes);
            if (isEnum) {
                modType.typeFlags |= TypeFlags.IsEnum;
            }
            modType.members = members;
            modType.ambientMembers = ambientMembers;
            modType.setHasImplementation();
            modType.symbol = typeSymbol;

            typeSymbol.addLocation(moduleDecl.minChar);
            typeSymbol.expansions.push(modType);

        }
        if (context.scopeChain.moduleDecl) {
            context.scopeChain.moduleDecl.recordNonInterface();
        }
        // REVIEW: If multiple disparate module decls for the same module don't agree
        // in export privileges, how should we handle it?
        if (isExported) {
            typeSymbol.flags |= SymbolFlags.Exported;
        }
        if ((context.scopeChain.moduleDecl) ||
            (context.scopeChain.container == context.checker.gloMod)) {
            typeSymbol.flags |= SymbolFlags.ModuleMember;
        }

        moduleDecl.mod = modType;
        pushTypeCollectionScope(typeSymbol, modType.members,
                                modType.ambientMembers,
                                modType.enclosedTypes,
                                modType.ambientEnclosedTypes,
                                context, null, null, moduleDecl);

        return true;
    }

    export function preCollectClassTypes(ast: AST, parent: AST, context: TypeCollectionContext) {
        var scopeChain = context.scopeChain;
        var classDecl = <ClassDeclaration>ast;

        var classType: Type;
        var instanceType: Type;
        var typeSymbol: TypeSymbol = null;
        var className = (<Identifier>classDecl.name).text;
        var alreadyInScope = false;
        var isAmbient = hasFlag(classDecl.varFlags, VarFlags.Ambient);
        var isExported = hasFlag(classDecl.varFlags, VarFlags.Exported);
        var isGlobal = context.scopeChain.container == context.checker.gloMod;
        var containerMod = <TypeSymbol>scopeChain.container;
        var foundValSymbol = false;

        typeSymbol = <TypeSymbol>scopeChain.scope.findLocal(className, false, true);
        
        // check the value space, since an override may have been declared with the type's name
        // REVIEW-CLASSES
        if (!typeSymbol) {
            var valTypeSymbol = scopeChain.scope.findLocal(className, false, false);
            
            if (valTypeSymbol &&
                valTypeSymbol.isType() &&
                valTypeSymbol.declAST &&
                valTypeSymbol.declAST.nodeType == NodeType.FuncDecl &&
                (<FuncDecl>valTypeSymbol.declAST).isSignature()) {
                
                typeSymbol = <TypeSymbol>valTypeSymbol;
                foundValSymbol = true;
                
                if (isExported) {
                    typeSymbol.flags |= SymbolFlags.Exported;
                }
            
                if (isAmbient) {
                    typeSymbol.flags |= SymbolFlags.Ambient;
                }                
                
                // the class was never entered into type space, so add it
                context.scopeChain.scope.enter(context.scopeChain.container, ast, typeSymbol,
                                            context.checker.errorReporter, isExported || isGlobal, true, isAmbient);                
            }
        }
        
        if (typeSymbol && !foundValSymbol && (typeSymbol.declAST != classDecl)) {
            typeSymbol = null;
        }

        if (typeSymbol == null) {
            var valueSymbol = scopeChain.scope.findLocal(className, false, false);
            classType = new Type();
            classType.setHasImplementation();
            instanceType = new Type();
            instanceType.setHasImplementation();
            classType.instanceType = instanceType;
            classType.members = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));
            classType.ambientMembers = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));
            addPrototypeField(classType, classDecl, context);
            instanceType.members = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));
            instanceType.ambientMembers = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));
            typeSymbol = new TypeSymbol(className, classDecl.minChar,
                                        context.checker.locationInfo.unitIndex, classType);
            typeSymbol.declAST = classDecl;
            typeSymbol.instanceType = instanceType;
            classType.symbol = typeSymbol;
            instanceType.symbol = typeSymbol;

            if (context.scopeChain.moduleDecl) {
                context.scopeChain.moduleDecl.recordNonInterface();
                typeSymbol.declModule = context.scopeChain.moduleDecl;
                typeSymbol.flags |= SymbolFlags.ModuleMember;
            }

            if (isExported) {
                typeSymbol.flags |= SymbolFlags.Exported;
            }
            
            if (isAmbient) {
                typeSymbol.flags |= SymbolFlags.Ambient;
            }

            ast.type = classType;

            // class in both name spaces (type for instance type; constructor representative in value space)
            context.scopeChain.scope.enter(context.scopeChain.container, ast, typeSymbol,
                                            context.checker.errorReporter, isExported || isGlobal, true, isAmbient);

            if (valueSymbol == null) {
                context.scopeChain.scope.enter(context.scopeChain.container, ast, typeSymbol,
                                            context.checker.errorReporter, isExported || isGlobal, false, isAmbient);
            }
        }
        else {                            
            classType = typeSymbol.type;
            
            // If the instance type is null, a call overload was likely declared before the class constructor
            if (classType.instanceType == null) {
                classType.instanceType = new Type();
                classType.instanceType.setHasImplementation();
                classType.instanceType.members = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));
                classType.instanceType.symbol = classType.symbol;
                classType.members = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));
                classType.ambientMembers = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));
            }
            
            instanceType = classType.instanceType;
            ast.type = classType;
        }
        
        // if the class has no declared constructor, either create a default signature or adapt 
        // it's base class's signature group
        if (!classDecl.constructorDecl) {

            if (typeSymbol && typeSymbol.declAST && typeSymbol.declAST.type && typeSymbol.declAST.type.call && !(<FuncDecl>typeSymbol.declAST).isOverload) {
                context.checker.errorReporter.duplicateIdentifier(typeSymbol.declAST, typeSymbol.name);
            }

            createNewConstructGroupForType(classDecl.type);
        }

        classType.typeFlags |= TypeFlags.IsClass;
        instanceType.typeFlags |= TypeFlags.IsClass;

        getBases(instanceType, classDecl);
        pushTypeCollectionScope(typeSymbol, instanceType.members, instanceType.ambientMembers, null, null,
                                context, instanceType, classType, null);
        return true;
    }

    export function preCollectInterfaceTypes(ast: AST, parent: AST, context: TypeCollectionContext) {
        var scopeChain = context.scopeChain;
        var interfaceDecl = <InterfaceDeclaration>ast;
        var interfaceSymbol: TypeSymbol = null;
        var interfaceType: Type = null;
        var isExported = hasFlag(interfaceDecl.varFlags, VarFlags.Exported);
        var isGlobal = context.scopeChain.container == context.checker.gloMod;
        var alreadyInScope = true;

        alreadyInScope = false;
        var interfaceName = (<Identifier>interfaceDecl.name).text;
        interfaceSymbol = <TypeSymbol>scopeChain.scope.findLocal(interfaceName, false, true);
        if (interfaceSymbol == null) {
            interfaceType = new Type();
            interfaceSymbol = new TypeSymbol(interfaceName,
                                        ast.minChar,
                                        context.checker.locationInfo.unitIndex,
                                        interfaceType);
            interfaceType.symbol = interfaceSymbol;
            // REVIEW: Shouldn't allocate another table for interface privates
            interfaceType.members = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));
            interfaceType.ambientMembers = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));
            interfaceSymbol.declAST = interfaceDecl;
            interfaceSymbol.declModule = context.scopeChain.moduleDecl;
        }
        else {
            alreadyInScope = true;
            interfaceType = interfaceSymbol.type;
        }

        if (!interfaceType) {
            interfaceType = context.checker.anyType;
        }

        ast.type = interfaceType;
        getBases(interfaceType, interfaceDecl);

        if (isExported) {
            interfaceSymbol.flags |= SymbolFlags.Exported;
        }

        if (context.scopeChain.moduleDecl) {
            interfaceSymbol.flags |= SymbolFlags.ModuleMember;
        }

        if (!alreadyInScope) {
            context.scopeChain.scope.enter(context.scopeChain.container, ast,
                                            interfaceSymbol, context.checker.errorReporter, isGlobal || isExported, true, false); // REVIEW: Technically, interfaces should be ambient
        }
        pushTypeCollectionScope(interfaceSymbol, interfaceType.members, interfaceType.ambientMembers, null, null,
                                context, interfaceType, null, null);
        return true;
    }

    export function preCollectArgDeclTypes(ast: AST, parent: AST, context: TypeCollectionContext) {
        var scopeChain = context.scopeChain;
        var argDecl = <ArgDecl>ast;
        if (hasFlag(argDecl.varFlags, VarFlags.Public | VarFlags.Private)) {
            var field = new ValueLocation();
            var isPrivate = hasFlag(argDecl.varFlags, VarFlags.Private);
            var fieldSymbol =
                new FieldSymbol(argDecl.id.text, argDecl.minChar,
                                context.checker.locationInfo.unitIndex,
                                !hasFlag(argDecl.varFlags, VarFlags.Readonly),
                                field);
            fieldSymbol.transferVarFlags(argDecl.varFlags);
            field.symbol = fieldSymbol;
            fieldSymbol.declAST = ast;
            argDecl.parameterPropertySym = fieldSymbol;

            context.scopeChain.scope.enter(context.scopeChain.container, ast,
                                            fieldSymbol, context.checker.errorReporter, !isPrivate, false, false);

            field.typeLink = getTypeLink(argDecl.typeExpr, context.checker, argDecl.init == null);
            argDecl.sym = fieldSymbol;
        }
        return false;
    }

    export function preCollectVarDeclTypes(ast: AST, parent: AST, context: TypeCollectionContext) {
        var scopeChain = context.scopeChain;
        var varDecl = <VarDecl>ast;
        var isAmbient = hasFlag(varDecl.varFlags, VarFlags.Ambient);
        var isExported = hasFlag(varDecl.varFlags, VarFlags.Exported);
        var isGlobal = context.scopeChain.container == context.checker.gloMod;
        var isProperty = hasFlag(varDecl.varFlags, VarFlags.Property);
        var isStatic = hasFlag(varDecl.varFlags, VarFlags.Static);
        var isPrivate = hasFlag(varDecl.varFlags, VarFlags.Private);
        var isOptional = hasFlag(varDecl.id.flags, ASTFlags.OptionalName);

        if (context.scopeChain.moduleDecl) {
            context.scopeChain.moduleDecl.recordNonInterface();
        }
        if (isProperty ||
            isExported ||
            (context.scopeChain.container == context.checker.gloMod) ||
            context.scopeChain.moduleDecl) {
            if (isAmbient) {
                var existingSym =
                    <FieldSymbol>scopeChain.scope.findLocal(varDecl.id.text, false, false);
                if (existingSym) {
                    varDecl.sym = existingSym;
                    return false;
                }
            }

            // Defensive error detection...
            if (varDecl.id == null) {
                context.checker.errorReporter.simpleError(varDecl, "Expected variable identifier at this location");
                return false;
            }

            var field = new ValueLocation();
            var fieldSymbol =
                new FieldSymbol(varDecl.id.text, varDecl.minChar,
                                context.checker.locationInfo.unitIndex,
                                (varDecl.varFlags & VarFlags.Readonly) == VarFlags.None,
                                field);
            fieldSymbol.transferVarFlags(varDecl.varFlags);
            if (isOptional) {
                fieldSymbol.flags |= SymbolFlags.Optional;
            }
            field.symbol = fieldSymbol;
            fieldSymbol.declAST = ast;
            if ((context.scopeChain.moduleDecl) ||
                (context.scopeChain.container == context.checker.gloMod)) {
                fieldSymbol.flags |= SymbolFlags.ModuleMember;
                fieldSymbol.declModule = context.scopeChain.moduleDecl;
            }

            // if it's static, enter it into the class's member list directly
            if (hasFlag(varDecl.varFlags, VarFlags.Property) && isStatic && context.scopeChain.classType) {
                if (!context.scopeChain.classType.members.publicMembers.add(varDecl.id.text, fieldSymbol)) {
                    context.checker.errorReporter.duplicateIdentifier(ast, fieldSymbol.name);
                }
                fieldSymbol.container = context.scopeChain.classType.symbol;
            }
            else {
                context.scopeChain.scope.enter(context.scopeChain.container,
                                                ast,
                                                fieldSymbol,
                                                context.checker.errorReporter,
                                                !isPrivate && (isProperty || isExported || isGlobal || isStatic),
                                                false,
                                                isAmbient);
            }

            if (hasFlag(varDecl.varFlags, VarFlags.Exported)) {
                fieldSymbol.flags |= SymbolFlags.Exported;
            }

            field.typeLink = getTypeLink(varDecl.typeExpr, context.checker,
                                        varDecl.init == null);
            varDecl.sym = fieldSymbol;
        }
        return false;
    }

    export function preCollectFuncDeclTypes(ast: AST, parent: AST, context: TypeCollectionContext) {
        var scopeChain = context.scopeChain;

        // REVIEW: This will have to change when we move to "export"
        if (context.scopeChain.moduleDecl) {
            context.scopeChain.moduleDecl.recordNonInterface();
        }

        var funcDecl = <FuncDecl>ast;
        var fgSym: TypeSymbol = null;
        var nameText = funcDecl.getNameText();
        var isExported = hasFlag(funcDecl.fncFlags, FncFlags.Exported | FncFlags.ClassPropertyMethodExported);
        var isStatic = hasFlag(funcDecl.fncFlags, FncFlags.Static);
        var isPrivate = hasFlag(funcDecl.fncFlags, FncFlags.Private);
        var isConstructor = funcDecl.isConstructMember() || funcDecl.isConstructor;
        var containerSym:TypeSymbol = <TypeSymbol> (((funcDecl.isMethod() && isStatic) || funcDecl.isAccessor()) && context.scopeChain.classType ? context.scopeChain.classType.symbol : context.scopeChain.container);
        var containerScope: SymbolScope = context.scopeChain.scope;
        var isGlobal = containerSym == context.checker.gloMod;
        var isOptional = funcDecl.name && hasFlag(funcDecl.name.flags, ASTFlags.OptionalName);
        var go = false;
        var foundSymbol = false; 

        // If this is a class constructor, the "container" is actually the class declaration
        if (isConstructor && hasFlag(funcDecl.fncFlags, FncFlags.ClassMethod)) {
            containerSym = <TypeSymbol>containerSym.container;
            containerScope = scopeChain.previous.scope;
        }

        funcDecl.unitIndex = context.checker.locationInfo.unitIndex;
        
        // If the parent is the constructor, and this isn't an instance method, skip it.
        // That way, we'll set the type during scope assignment, and can be sure that the
        // function will be placed in the constructor-local scope
        if (!funcDecl.isConstructor &&
            containerSym &&
            containerSym.declAST &&
            containerSym.declAST.nodeType == NodeType.FuncDecl &&
            (<FuncDecl>containerSym.declAST).isConstructor &&
            !funcDecl.isMethod()) {
            return go;
        }        

        // Interfaces and overloads
        if (hasFlag(funcDecl.fncFlags, FncFlags.Signature)) {
            var instType = context.scopeChain.thisType;                       

            // If the function is static, search in the class type's
            if (nameText && nameText != "__missing") {
                if (isStatic) {
                    fgSym = containerSym.type.members.allMembers.lookup(nameText);
                }
                else {
                    // REVIEW: This logic should be symmetric with preCollectClassTypes
                    fgSym = <TypeSymbol>containerScope.findLocal(nameText, false, false);
                    
                    // If we could not find the function symbol in the value context, look
                    // in the type context.
                    // This would be the case, for example, if a class constructor override
                    // were declared before a call override for a given class
                    if (fgSym == null) {
                        fgSym = <TypeSymbol>containerScope.findLocal(nameText, false, true);
                    }
                }
                
                if (fgSym) {
                    foundSymbol = true;
                    
                    // We'll combine ambient and non-ambient funcdecls during typecheck (for contextual typing).,
                    // So, if they don't agree, don't use the symbol we've found                    
                    if (!funcDecl.isSignature() && (hasFlag(funcDecl.fncFlags, FncFlags.Ambient) != hasFlag(fgSym.flags, SymbolFlags.Ambient))) {
                       fgSym = null;
                    }
                }                
            }
            
            // a function with this symbol has not yet been declared in this scope
            // REVIEW: In the code below, we need to ensure that only function overloads are considered
            //  (E.g., if a vardecl has the same id as a function or class, we may use the vardecl symbol
            //  as the overload.)  Defensively, however, the vardecl won't have a type yet, so it should
            //  suffice to just check for a null type when considering the overload symbol in
            //  createFunctionSignature
            if (fgSym == null) {
                if (!(funcDecl.isSpecialFn())) {                    
                    fgSym = context.checker.createFunctionSignature(funcDecl, containerSym, containerScope, null, !foundSymbol).declAST.type.symbol;
                }
                else {
                    fgSym = context.checker.createFunctionSignature(funcDecl, containerSym, containerScope, containerSym, false).declAST.type.symbol;                                                                         
                }
                
                // set the symbol's declAST, which will point back to the first declaration (symbol or otherwise)
                // related to this symbol
                if (fgSym.declAST == null || !funcDecl.isSpecialFn()) {
                    fgSym.declAST = ast;
                }
            }
            else { // there exists a symbol with this name
                
                if ((fgSym.kind() == SymbolKind.Type)) {

                    fgSym = context.checker.createFunctionSignature(funcDecl, containerSym, containerScope, fgSym, false).declAST.type.symbol;
                }
                else {
                    context.checker.errorReporter.simpleError(funcDecl, "Function or method '" + funcDecl.name.actualText + "' already declared as a property");
                }
            }
         
            if (funcDecl.isSpecialFn() && !isStatic) {
                funcDecl.type = instType ? instType : fgSym.type; 
            }
            else {
                funcDecl.type = fgSym.type;
            }            
        }
        else {
            // declarations
            
            if (nameText) {
                if (isStatic) {
                    fgSym = containerSym.type.members.allMembers.lookup(nameText);
                }
                else {
                    // in the constructor case, we want to check the parent scope for overloads
                    if (funcDecl.isConstructor && context.scopeChain.previous) {
                        fgSym = <TypeSymbol>context.scopeChain.previous.scope.findLocal(nameText, false, false);
                    }
                    
                    if (fgSym == null) {
                        fgSym = <TypeSymbol>containerScope.findLocal(nameText, false, false);
                    }
                }
                if (fgSym) {
                    foundSymbol = true;
                    
                    if (!isConstructor && fgSym.declAST.nodeType == NodeType.FuncDecl && !(<FuncDecl>fgSym.declAST).isAccessor() && !(<FuncDecl>fgSym.declAST).isSignature()) {
                        fgSym = null;
                        foundSymbol = false;
                    }
                }                
            }

            // REVIEW: Move this check into the typecheck phase?  It's only being run over properties...
            if (fgSym &&
                !fgSym.isAccessor() &&
                fgSym.type &&
                fgSym.type.construct &&
                fgSym.type.construct.signatures != [] &&
                (fgSym.type.construct.signatures[0].declAST == null ||
                    !hasFlag(fgSym.type.construct.signatures[0].declAST.fncFlags, FncFlags.Ambient)) &&
                !funcDecl.isConstructor) {
                context.checker.errorReporter.simpleError(funcDecl, "Functions may not have class overloads");
            }

            if (fgSym && !(fgSym.kind() == SymbolKind.Type) && funcDecl.isMethod() && !funcDecl.isAccessor() && !funcDecl.isConstructor) {
                context.checker.errorReporter.simpleError(funcDecl, "Function or method '" + funcDecl.name.actualText + "' already declared as a property");
                fgSym.type = context.checker.anyType;
            }
            var sig = context.checker.createFunctionSignature(funcDecl, containerSym, containerScope, fgSym, !foundSymbol);

            // it's a getter or setter function                                   
            if (((!fgSym || fgSym.declAST.nodeType != NodeType.FuncDecl) && funcDecl.isAccessor()) || (fgSym && fgSym.isAccessor())) {
                funcDecl.accessorSymbol = context.checker.createAccessorSymbol(funcDecl, fgSym, containerSym.type, (funcDecl.isMethod() && isStatic), true, containerScope, containerSym);
            }

            funcDecl.type.symbol.declAST = ast;
            if (funcDecl.isConstructor) { // REVIEW: Remove when classes completely replace oldclass
                go = true;
            };
        }
        if (isExported) {
            if (funcDecl.type.call) {
                funcDecl.type.symbol.flags |= SymbolFlags.Exported;
            }
            
            // Accessors are set to 'exported' above
            if (fgSym && !fgSym.isAccessor() && fgSym.kind() == SymbolKind.Type && fgSym.type.call) {
                fgSym.flags |= SymbolFlags.Exported;
            }
        }
        if (context.scopeChain.moduleDecl && !funcDecl.isSpecialFn()) {
            funcDecl.type.symbol.flags |= SymbolFlags.ModuleMember;
            funcDecl.type.symbol.declModule = context.scopeChain.moduleDecl;
        }

        if (fgSym && isOptional) {
            fgSym.flags |= SymbolFlags.Optional;
        }

        return go;
    }

    export function preCollectTypes(ast: AST, parent: AST, walker: IAstWalker) {
        var context: TypeCollectionContext = walker.state;
        var go = false;
        var scopeChain = context.scopeChain;

        if (ast.nodeType == NodeType.Script) {
            var script: Script = <Script>ast;
            context.script = script;
            go = true;
        }
        else if (ast.nodeType == NodeType.List) {
            go = true;
        }
        else if (ast.nodeType == NodeType.ImportDeclaration) {
            go = preCollectImportTypes(ast, parent, context);
        }
        else if (ast.nodeType == NodeType.With) {
            go = false;
        }
        else if (ast.nodeType == NodeType.ModuleDeclaration) {
            go = preCollectModuleTypes(ast, parent, context);
        }
        else if (ast.nodeType == NodeType.ClassDeclaration) {
            go = preCollectClassTypes(ast, parent, context);
        }
        else if (ast.nodeType == NodeType.Block) {
            go = true;
        }
        else if (ast.nodeType == NodeType.InterfaceDeclaration) {
            go = preCollectInterfaceTypes(ast, parent, context);
        }
        // This will be a constructor arg because this pass only traverses
        // constructor arg lists
        else if (ast.nodeType == NodeType.ArgDecl) {
            go = preCollectArgDeclTypes(ast, parent, context);
        }
        else if (ast.nodeType == NodeType.VarDecl) {
            go = preCollectVarDeclTypes(ast, parent, context);
        }
        else if (ast.nodeType == NodeType.FuncDecl) {
            go = preCollectFuncDeclTypes(ast, parent, context);
        }
        else {
            if (ast.isStatementOrExpression() && context.scopeChain.moduleDecl) {
                context.scopeChain.moduleDecl.recordNonInterface();
            }
        }
        walker.options.goChildren = go;
        return ast;
    }

    export function postCollectTypes(ast: AST, parent: AST, walker: IAstWalker) {
        var context: TypeCollectionContext = walker.state;

        if (ast.nodeType == NodeType.ModuleDeclaration) {
            popTypeCollectionScope(context);
        }
        else if (ast.nodeType == NodeType.ClassDeclaration) {
            popTypeCollectionScope(context);
        }
        else if (ast.nodeType == NodeType.InterfaceDeclaration) {
            popTypeCollectionScope(context);
        }
        return ast;
    }

}