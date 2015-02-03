//// [parserRealSource2.ts]
// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescript.ts' />

module TypeScript {

    export function hasFlag(val: number, flag: number) {
        return (val & flag) != 0;
    }

    export enum ErrorRecoverySet {
        None = 0,
        Comma = 1, // Comma
        SColon = 1 << 1, // SColon
        Asg = 1 << 2, // Asg
        BinOp = 1 << 3, // Lsh, Rsh, Rs2, Le, Ge, INSTANCEOF, EQ, NE, Eqv, NEqv, LogAnd, LogOr, AsgMul, AsgDiv
        // AsgMod, AsgAdd, AsgSub, AsgLsh, AsgRsh, AsgRs2, AsgAnd, AsgXor, AsgOr, QMark, Mult, Div, 
        // Pct, GT, LT, And, Xor, Or
        RBrack = 1 << 4, // RBrack
        RCurly = 1 << 5, // RCurly
        RParen = 1 << 6, // RParen
        Dot = 1 << 7, // Dot
        Colon = 1 << 8, // Colon
        PrimType = 1 << 9, // number, string, boolean
        AddOp = 1 << 10, // Add, Sub
        LCurly = 1 << 11, // LCurly
        PreOp = 1 << 12, // Tilde, Bang, Inc, Dec
        RegExp = 1 << 13, // RegExp
        LParen = 1 << 14, // LParen
        LBrack = 1 << 15, // LBrack
        Scope = 1 << 16, // Scope
        In = 1 << 17, // IN
        SCase = 1 << 18, // CASE, DEFAULT
        Else = 1 << 19, // ELSE
        Catch = 1 << 20, // CATCH, FINALLY
        Var = 1 << 21, // 
        Stmt = 1 << 22, // BREAK, RETURN, THROW, DEBUGGER, FOR, SWITCH, DO, IF, TRY, WITH
        While = 1 << 23, // WHILE
        ID = 1 << 24, // ID
        Prefix = 1 << 25, // VOID, DELETE, TYPEOF, AWAIT
        Literal = 1 << 26, // IntCon, FltCon, StrCon
        RLit = 1 << 27, // THIS, TRUE, FALSE, NULL
        Func = 1 << 28, // FUNCTION
        EOF = 1 << 29, // EOF

        // REVIEW: Name this something clearer.
        TypeScriptS = 1 << 30, // PROPERTY, PRIVATE, STATIC, INTERFACE, CLASS, MODULE, EXPORT, IMPORT
        ExprStart = SColon | AddOp | LCurly | PreOp | RegExp | LParen | LBrack | ID | Prefix | RLit | Func | Literal,
        StmtStart = ExprStart | SColon | Var | Stmt | While | TypeScriptS,
        Postfix = Dot | LParen | LBrack,
    }

    export enum AllowedElements {
        None = 0,
        ModuleDeclarations = 1 << 2,
        ClassDeclarations = 1 << 3,
        InterfaceDeclarations = 1 << 4,
        AmbientDeclarations = 1 << 10,
        Properties = 1 << 11,

        Global = ModuleDeclarations | ClassDeclarations | InterfaceDeclarations | AmbientDeclarations,
        QuickParse = Global | Properties,
    }

    export enum Modifiers {
        None = 0,
        Private = 1,
        Public = 1 << 1,
        Readonly = 1 << 2,
        Ambient = 1 << 3,
        Exported = 1 << 4,
        Getter = 1 << 5,
        Setter = 1 << 6,
        Static = 1 << 7,
    }

    export enum ASTFlags {
        None = 0,
        ExplicitSemicolon = 1, // statment terminated by an explicit semicolon
        AutomaticSemicolon = 1 << 1, // statment terminated by an automatic semicolon
        Writeable = 1 << 2,  // node is lhs that can be modified
        Error = 1 << 3, // node has an error
        DotLHSPartial = 1 << 4, // node is the lhs of an incomplete dot expr at cursor
        DotLHS = 1 << 5, // node is the lhs of a dot expr
        IsStatement = 1 << 6, // node is a statement
        StrictMode = 1 << 7, // node is in the strict mode environment
        PossibleOptionalParameter = 1 << 8,
        ClassBaseConstructorCall = 1 << 9,
        OptionalName = 1 << 10,
        // REVIEW: This flag is to mark lambda nodes to note that the LParen of an expression has already been matched in the lambda header.
        //         The flag is used to communicate this piece of information to the calling parseTerm, which intern will remove it.
        //         Once we have a better way to associate information with nodes, this flag should not be used.
        SkipNextRParen = 1 << 11, 
    }

    export enum DeclFlags {
        None = 0,
        Exported = 1,
        Private = 1 << 1,
        Public = 1 << 2,
        Ambient = 1 << 3,
        Static = 1 << 4,
        LocalStatic = 1 << 5,
        GetAccessor = 1 << 6,
        SetAccessor = 1 << 7,
    }

    export enum ModuleFlags {
        None = 0,
        Exported = 1,
        Private = 1 << 1,
        Public = 1 << 2,
        Ambient = 1 << 3,
        Static = 1 << 4,
        LocalStatic = 1 << 5,
        GetAccessor = 1 << 6,
        SetAccessor = 1 << 7,
        IsEnum = 1 << 8,
        ShouldEmitModuleDecl = 1 << 9,
        IsWholeFile = 1 << 10,
        IsDynamic = 1 << 11,
        MustCaptureThis = 1 << 12,
    }

    export enum SymbolFlags {
        None = 0,
        Exported = 1,
        Private = 1 << 1,
        Public = 1 << 2,
        Ambient = 1 << 3,
        Static = 1 << 4,
        LocalStatic = 1 << 5,
        GetAccessor = 1 << 6,
        SetAccessor = 1 << 7,
        Property = 1 << 8,
        Readonly = 1 << 9,
        ModuleMember = 1 << 10,
        InterfaceMember = 1 << 11,
        ClassMember = 1 << 12,
        BuiltIn = 1 << 13,
        TypeSetDuringScopeAssignment = 1 << 14,
        Constant = 1 << 15,
        Optional = 1 << 16,
        RecursivelyReferenced = 1 << 17,
        Bound = 1 << 18,
        CompilerGenerated = 1 << 19,
    }

    export enum VarFlags {
        None = 0,
        Exported = 1,
        Private = 1 << 1,
        Public = 1 << 2,
        Ambient = 1 << 3,
        Static = 1 << 4,
        LocalStatic = 1 << 5,
        GetAccessor = 1 << 6,
        SetAccessor = 1 << 7,
        AutoInit = 1 << 8,
        Property = 1 << 9,
        Readonly = 1 << 10,
        Class = 1 << 11,
        ClassProperty = 1 << 12,
        ClassBodyProperty = 1 << 13,
        ClassConstructorProperty = 1 << 14,
        ClassSuperMustBeFirstCallInConstructor = 1 << 15,
        Constant = 1 << 16,
        MustCaptureThis = 1 << 17,
    }

    export enum FncFlags {
        None = 0,
        Exported = 1,
        Private = 1 << 1,
        Public = 1 << 2,
        Ambient = 1 << 3,
        Static = 1 << 4,
        LocalStatic = 1 << 5,
        GetAccessor = 1 << 6,
        SetAccessor = 1 << 7,
        Definition = 1 << 8,
        Signature = 1 << 9,
        Method = 1 << 10,
        HasReturnExpression = 1 << 11,
        CallMember = 1 << 12,
        ConstructMember = 1 << 13,
        HasSelfReference = 1 << 14,
        IsFatArrowFunction = 1 << 15,
        IndexerMember = 1 << 16,
        IsFunctionExpression = 1 << 17,
        ClassMethod = 1 << 18,
        ClassPropertyMethodExported = 1 << 19,
    }

    export enum SignatureFlags {
        None = 0,
        IsIndexer = 1,
        IsStringIndexer = 1 << 1,
        IsNumberIndexer = 1 << 2,
    }

    export function ToDeclFlags(fncFlags: FncFlags) : DeclFlags;
    export function ToDeclFlags(varFlags: VarFlags) : DeclFlags;
    export function ToDeclFlags(symFlags: SymbolFlags): DeclFlags;
    export function ToDeclFlags(moduleFlags: ModuleFlags): DeclFlags;
    export function ToDeclFlags(fncOrVarOrSymbolOrModuleFlags: any) {
        return <DeclFlags>fncOrVarOrSymbolOrModuleFlags;
    }

    export enum TypeFlags {
        None = 0,
        HasImplementation = 1,
        HasSelfReference = 1 << 1,
        MergeResult = 1 << 2,
        IsEnum = 1 << 3,
        BuildingName = 1 << 4,
        HasBaseType = 1 << 5,
        HasBaseTypeOfObject = 1 << 6,
        IsClass = 1 << 7,
    }

    export enum TypeRelationshipFlags {
        SuccessfulComparison = 0,
        SourceIsNullTargetIsVoidOrUndefined = 1,
        RequiredPropertyIsMissing = 1 << 1,
        IncompatibleSignatures = 1 << 2,
        SourceSignatureHasTooManyParameters = 3,
        IncompatibleReturnTypes = 1 << 4,
        IncompatiblePropertyTypes = 1 << 5,
        IncompatibleParameterTypes = 1 << 6,
    }

    export enum CodeGenTarget {
        ES3 = 0,
        ES5 = 1,
    }

    export enum ModuleGenTarget {
        Synchronous = 0,
        Asynchronous = 1,
        Local = 1 << 1,
    }

    // Compiler defaults to generating ES5-compliant code for
    //  - getters and setters
    export var codeGenTarget: CodeGenTarget = CodeGenTarget.ES3;

    export var moduleGenTarget: ModuleGenTarget = ModuleGenTarget.Synchronous;

    export var optimizeModuleCodeGen = true;

    export function flagsToString(e, flags: number): string {
        var builder = "";
        for (var i = 1; i < (1 << 31) ; i = i << 1) {
            if ((flags & i) != 0) {
                for (var k in e) {
                    if (e[k] == i) {
                        if (builder.length > 0) {
                            builder += "|";
                        }
                        builder += k;
                        break;
                    }
                }
            }
        }
        return builder;
    }

}

//// [parserRealSource2.js]
// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.
///<reference path='typescript.ts' />
var TypeScript;
(function (TypeScript) {
    function hasFlag(val, flag) {
        return (val & flag) != 0;
    }
    TypeScript.hasFlag = hasFlag;
    (function (ErrorRecoverySet) {
        ErrorRecoverySet[ErrorRecoverySet["None"] = 0] = "None";
        ErrorRecoverySet[ErrorRecoverySet["Comma"] = 1] = "Comma";
        ErrorRecoverySet[ErrorRecoverySet["SColon"] = 1 << 1] = "SColon";
        ErrorRecoverySet[ErrorRecoverySet["Asg"] = 1 << 2] = "Asg";
        ErrorRecoverySet[ErrorRecoverySet["BinOp"] = 1 << 3] = "BinOp";
        // AsgMod, AsgAdd, AsgSub, AsgLsh, AsgRsh, AsgRs2, AsgAnd, AsgXor, AsgOr, QMark, Mult, Div, 
        // Pct, GT, LT, And, Xor, Or
        ErrorRecoverySet[ErrorRecoverySet["RBrack"] = 1 << 4] = "RBrack";
        ErrorRecoverySet[ErrorRecoverySet["RCurly"] = 1 << 5] = "RCurly";
        ErrorRecoverySet[ErrorRecoverySet["RParen"] = 1 << 6] = "RParen";
        ErrorRecoverySet[ErrorRecoverySet["Dot"] = 1 << 7] = "Dot";
        ErrorRecoverySet[ErrorRecoverySet["Colon"] = 1 << 8] = "Colon";
        ErrorRecoverySet[ErrorRecoverySet["PrimType"] = 1 << 9] = "PrimType";
        ErrorRecoverySet[ErrorRecoverySet["AddOp"] = 1 << 10] = "AddOp";
        ErrorRecoverySet[ErrorRecoverySet["LCurly"] = 1 << 11] = "LCurly";
        ErrorRecoverySet[ErrorRecoverySet["PreOp"] = 1 << 12] = "PreOp";
        ErrorRecoverySet[ErrorRecoverySet["RegExp"] = 1 << 13] = "RegExp";
        ErrorRecoverySet[ErrorRecoverySet["LParen"] = 1 << 14] = "LParen";
        ErrorRecoverySet[ErrorRecoverySet["LBrack"] = 1 << 15] = "LBrack";
        ErrorRecoverySet[ErrorRecoverySet["Scope"] = 1 << 16] = "Scope";
        ErrorRecoverySet[ErrorRecoverySet["In"] = 1 << 17] = "In";
        ErrorRecoverySet[ErrorRecoverySet["SCase"] = 1 << 18] = "SCase";
        ErrorRecoverySet[ErrorRecoverySet["Else"] = 1 << 19] = "Else";
        ErrorRecoverySet[ErrorRecoverySet["Catch"] = 1 << 20] = "Catch";
        ErrorRecoverySet[ErrorRecoverySet["Var"] = 1 << 21] = "Var";
        ErrorRecoverySet[ErrorRecoverySet["Stmt"] = 1 << 22] = "Stmt";
        ErrorRecoverySet[ErrorRecoverySet["While"] = 1 << 23] = "While";
        ErrorRecoverySet[ErrorRecoverySet["ID"] = 1 << 24] = "ID";
        ErrorRecoverySet[ErrorRecoverySet["Prefix"] = 1 << 25] = "Prefix";
        ErrorRecoverySet[ErrorRecoverySet["Literal"] = 1 << 26] = "Literal";
        ErrorRecoverySet[ErrorRecoverySet["RLit"] = 1 << 27] = "RLit";
        ErrorRecoverySet[ErrorRecoverySet["Func"] = 1 << 28] = "Func";
        ErrorRecoverySet[ErrorRecoverySet["EOF"] = 1 << 29] = "EOF";
        // REVIEW: Name this something clearer.
        ErrorRecoverySet[ErrorRecoverySet["TypeScriptS"] = 1 << 30] = "TypeScriptS";
        ErrorRecoverySet[ErrorRecoverySet["ExprStart"] = ErrorRecoverySet.SColon | ErrorRecoverySet.AddOp | ErrorRecoverySet.LCurly | ErrorRecoverySet.PreOp | ErrorRecoverySet.RegExp | ErrorRecoverySet.LParen | ErrorRecoverySet.LBrack | ErrorRecoverySet.ID | ErrorRecoverySet.Prefix | ErrorRecoverySet.RLit | ErrorRecoverySet.Func | ErrorRecoverySet.Literal] = "ExprStart";
        ErrorRecoverySet[ErrorRecoverySet["StmtStart"] = ErrorRecoverySet.ExprStart | ErrorRecoverySet.SColon | ErrorRecoverySet.Var | ErrorRecoverySet.Stmt | ErrorRecoverySet.While | ErrorRecoverySet.TypeScriptS] = "StmtStart";
        ErrorRecoverySet[ErrorRecoverySet["Postfix"] = ErrorRecoverySet.Dot | ErrorRecoverySet.LParen | ErrorRecoverySet.LBrack] = "Postfix";
    })(TypeScript.ErrorRecoverySet || (TypeScript.ErrorRecoverySet = {}));
    var ErrorRecoverySet = TypeScript.ErrorRecoverySet;
    (function (AllowedElements) {
        AllowedElements[AllowedElements["None"] = 0] = "None";
        AllowedElements[AllowedElements["ModuleDeclarations"] = 1 << 2] = "ModuleDeclarations";
        AllowedElements[AllowedElements["ClassDeclarations"] = 1 << 3] = "ClassDeclarations";
        AllowedElements[AllowedElements["InterfaceDeclarations"] = 1 << 4] = "InterfaceDeclarations";
        AllowedElements[AllowedElements["AmbientDeclarations"] = 1 << 10] = "AmbientDeclarations";
        AllowedElements[AllowedElements["Properties"] = 1 << 11] = "Properties";
        AllowedElements[AllowedElements["Global"] = AllowedElements.ModuleDeclarations | AllowedElements.ClassDeclarations | AllowedElements.InterfaceDeclarations | AllowedElements.AmbientDeclarations] = "Global";
        AllowedElements[AllowedElements["QuickParse"] = AllowedElements.Global | AllowedElements.Properties] = "QuickParse";
    })(TypeScript.AllowedElements || (TypeScript.AllowedElements = {}));
    var AllowedElements = TypeScript.AllowedElements;
    (function (Modifiers) {
        Modifiers[Modifiers["None"] = 0] = "None";
        Modifiers[Modifiers["Private"] = 1] = "Private";
        Modifiers[Modifiers["Public"] = 1 << 1] = "Public";
        Modifiers[Modifiers["Readonly"] = 1 << 2] = "Readonly";
        Modifiers[Modifiers["Ambient"] = 1 << 3] = "Ambient";
        Modifiers[Modifiers["Exported"] = 1 << 4] = "Exported";
        Modifiers[Modifiers["Getter"] = 1 << 5] = "Getter";
        Modifiers[Modifiers["Setter"] = 1 << 6] = "Setter";
        Modifiers[Modifiers["Static"] = 1 << 7] = "Static";
    })(TypeScript.Modifiers || (TypeScript.Modifiers = {}));
    var Modifiers = TypeScript.Modifiers;
    (function (ASTFlags) {
        ASTFlags[ASTFlags["None"] = 0] = "None";
        ASTFlags[ASTFlags["ExplicitSemicolon"] = 1] = "ExplicitSemicolon";
        ASTFlags[ASTFlags["AutomaticSemicolon"] = 1 << 1] = "AutomaticSemicolon";
        ASTFlags[ASTFlags["Writeable"] = 1 << 2] = "Writeable";
        ASTFlags[ASTFlags["Error"] = 1 << 3] = "Error";
        ASTFlags[ASTFlags["DotLHSPartial"] = 1 << 4] = "DotLHSPartial";
        ASTFlags[ASTFlags["DotLHS"] = 1 << 5] = "DotLHS";
        ASTFlags[ASTFlags["IsStatement"] = 1 << 6] = "IsStatement";
        ASTFlags[ASTFlags["StrictMode"] = 1 << 7] = "StrictMode";
        ASTFlags[ASTFlags["PossibleOptionalParameter"] = 1 << 8] = "PossibleOptionalParameter";
        ASTFlags[ASTFlags["ClassBaseConstructorCall"] = 1 << 9] = "ClassBaseConstructorCall";
        ASTFlags[ASTFlags["OptionalName"] = 1 << 10] = "OptionalName";
        // REVIEW: This flag is to mark lambda nodes to note that the LParen of an expression has already been matched in the lambda header.
        //         The flag is used to communicate this piece of information to the calling parseTerm, which intern will remove it.
        //         Once we have a better way to associate information with nodes, this flag should not be used.
        ASTFlags[ASTFlags["SkipNextRParen"] = 1 << 11] = "SkipNextRParen";
    })(TypeScript.ASTFlags || (TypeScript.ASTFlags = {}));
    var ASTFlags = TypeScript.ASTFlags;
    (function (DeclFlags) {
        DeclFlags[DeclFlags["None"] = 0] = "None";
        DeclFlags[DeclFlags["Exported"] = 1] = "Exported";
        DeclFlags[DeclFlags["Private"] = 1 << 1] = "Private";
        DeclFlags[DeclFlags["Public"] = 1 << 2] = "Public";
        DeclFlags[DeclFlags["Ambient"] = 1 << 3] = "Ambient";
        DeclFlags[DeclFlags["Static"] = 1 << 4] = "Static";
        DeclFlags[DeclFlags["LocalStatic"] = 1 << 5] = "LocalStatic";
        DeclFlags[DeclFlags["GetAccessor"] = 1 << 6] = "GetAccessor";
        DeclFlags[DeclFlags["SetAccessor"] = 1 << 7] = "SetAccessor";
    })(TypeScript.DeclFlags || (TypeScript.DeclFlags = {}));
    var DeclFlags = TypeScript.DeclFlags;
    (function (ModuleFlags) {
        ModuleFlags[ModuleFlags["None"] = 0] = "None";
        ModuleFlags[ModuleFlags["Exported"] = 1] = "Exported";
        ModuleFlags[ModuleFlags["Private"] = 1 << 1] = "Private";
        ModuleFlags[ModuleFlags["Public"] = 1 << 2] = "Public";
        ModuleFlags[ModuleFlags["Ambient"] = 1 << 3] = "Ambient";
        ModuleFlags[ModuleFlags["Static"] = 1 << 4] = "Static";
        ModuleFlags[ModuleFlags["LocalStatic"] = 1 << 5] = "LocalStatic";
        ModuleFlags[ModuleFlags["GetAccessor"] = 1 << 6] = "GetAccessor";
        ModuleFlags[ModuleFlags["SetAccessor"] = 1 << 7] = "SetAccessor";
        ModuleFlags[ModuleFlags["IsEnum"] = 1 << 8] = "IsEnum";
        ModuleFlags[ModuleFlags["ShouldEmitModuleDecl"] = 1 << 9] = "ShouldEmitModuleDecl";
        ModuleFlags[ModuleFlags["IsWholeFile"] = 1 << 10] = "IsWholeFile";
        ModuleFlags[ModuleFlags["IsDynamic"] = 1 << 11] = "IsDynamic";
        ModuleFlags[ModuleFlags["MustCaptureThis"] = 1 << 12] = "MustCaptureThis";
    })(TypeScript.ModuleFlags || (TypeScript.ModuleFlags = {}));
    var ModuleFlags = TypeScript.ModuleFlags;
    (function (SymbolFlags) {
        SymbolFlags[SymbolFlags["None"] = 0] = "None";
        SymbolFlags[SymbolFlags["Exported"] = 1] = "Exported";
        SymbolFlags[SymbolFlags["Private"] = 1 << 1] = "Private";
        SymbolFlags[SymbolFlags["Public"] = 1 << 2] = "Public";
        SymbolFlags[SymbolFlags["Ambient"] = 1 << 3] = "Ambient";
        SymbolFlags[SymbolFlags["Static"] = 1 << 4] = "Static";
        SymbolFlags[SymbolFlags["LocalStatic"] = 1 << 5] = "LocalStatic";
        SymbolFlags[SymbolFlags["GetAccessor"] = 1 << 6] = "GetAccessor";
        SymbolFlags[SymbolFlags["SetAccessor"] = 1 << 7] = "SetAccessor";
        SymbolFlags[SymbolFlags["Property"] = 1 << 8] = "Property";
        SymbolFlags[SymbolFlags["Readonly"] = 1 << 9] = "Readonly";
        SymbolFlags[SymbolFlags["ModuleMember"] = 1 << 10] = "ModuleMember";
        SymbolFlags[SymbolFlags["InterfaceMember"] = 1 << 11] = "InterfaceMember";
        SymbolFlags[SymbolFlags["ClassMember"] = 1 << 12] = "ClassMember";
        SymbolFlags[SymbolFlags["BuiltIn"] = 1 << 13] = "BuiltIn";
        SymbolFlags[SymbolFlags["TypeSetDuringScopeAssignment"] = 1 << 14] = "TypeSetDuringScopeAssignment";
        SymbolFlags[SymbolFlags["Constant"] = 1 << 15] = "Constant";
        SymbolFlags[SymbolFlags["Optional"] = 1 << 16] = "Optional";
        SymbolFlags[SymbolFlags["RecursivelyReferenced"] = 1 << 17] = "RecursivelyReferenced";
        SymbolFlags[SymbolFlags["Bound"] = 1 << 18] = "Bound";
        SymbolFlags[SymbolFlags["CompilerGenerated"] = 1 << 19] = "CompilerGenerated";
    })(TypeScript.SymbolFlags || (TypeScript.SymbolFlags = {}));
    var SymbolFlags = TypeScript.SymbolFlags;
    (function (VarFlags) {
        VarFlags[VarFlags["None"] = 0] = "None";
        VarFlags[VarFlags["Exported"] = 1] = "Exported";
        VarFlags[VarFlags["Private"] = 1 << 1] = "Private";
        VarFlags[VarFlags["Public"] = 1 << 2] = "Public";
        VarFlags[VarFlags["Ambient"] = 1 << 3] = "Ambient";
        VarFlags[VarFlags["Static"] = 1 << 4] = "Static";
        VarFlags[VarFlags["LocalStatic"] = 1 << 5] = "LocalStatic";
        VarFlags[VarFlags["GetAccessor"] = 1 << 6] = "GetAccessor";
        VarFlags[VarFlags["SetAccessor"] = 1 << 7] = "SetAccessor";
        VarFlags[VarFlags["AutoInit"] = 1 << 8] = "AutoInit";
        VarFlags[VarFlags["Property"] = 1 << 9] = "Property";
        VarFlags[VarFlags["Readonly"] = 1 << 10] = "Readonly";
        VarFlags[VarFlags["Class"] = 1 << 11] = "Class";
        VarFlags[VarFlags["ClassProperty"] = 1 << 12] = "ClassProperty";
        VarFlags[VarFlags["ClassBodyProperty"] = 1 << 13] = "ClassBodyProperty";
        VarFlags[VarFlags["ClassConstructorProperty"] = 1 << 14] = "ClassConstructorProperty";
        VarFlags[VarFlags["ClassSuperMustBeFirstCallInConstructor"] = 1 << 15] = "ClassSuperMustBeFirstCallInConstructor";
        VarFlags[VarFlags["Constant"] = 1 << 16] = "Constant";
        VarFlags[VarFlags["MustCaptureThis"] = 1 << 17] = "MustCaptureThis";
    })(TypeScript.VarFlags || (TypeScript.VarFlags = {}));
    var VarFlags = TypeScript.VarFlags;
    (function (FncFlags) {
        FncFlags[FncFlags["None"] = 0] = "None";
        FncFlags[FncFlags["Exported"] = 1] = "Exported";
        FncFlags[FncFlags["Private"] = 1 << 1] = "Private";
        FncFlags[FncFlags["Public"] = 1 << 2] = "Public";
        FncFlags[FncFlags["Ambient"] = 1 << 3] = "Ambient";
        FncFlags[FncFlags["Static"] = 1 << 4] = "Static";
        FncFlags[FncFlags["LocalStatic"] = 1 << 5] = "LocalStatic";
        FncFlags[FncFlags["GetAccessor"] = 1 << 6] = "GetAccessor";
        FncFlags[FncFlags["SetAccessor"] = 1 << 7] = "SetAccessor";
        FncFlags[FncFlags["Definition"] = 1 << 8] = "Definition";
        FncFlags[FncFlags["Signature"] = 1 << 9] = "Signature";
        FncFlags[FncFlags["Method"] = 1 << 10] = "Method";
        FncFlags[FncFlags["HasReturnExpression"] = 1 << 11] = "HasReturnExpression";
        FncFlags[FncFlags["CallMember"] = 1 << 12] = "CallMember";
        FncFlags[FncFlags["ConstructMember"] = 1 << 13] = "ConstructMember";
        FncFlags[FncFlags["HasSelfReference"] = 1 << 14] = "HasSelfReference";
        FncFlags[FncFlags["IsFatArrowFunction"] = 1 << 15] = "IsFatArrowFunction";
        FncFlags[FncFlags["IndexerMember"] = 1 << 16] = "IndexerMember";
        FncFlags[FncFlags["IsFunctionExpression"] = 1 << 17] = "IsFunctionExpression";
        FncFlags[FncFlags["ClassMethod"] = 1 << 18] = "ClassMethod";
        FncFlags[FncFlags["ClassPropertyMethodExported"] = 1 << 19] = "ClassPropertyMethodExported";
    })(TypeScript.FncFlags || (TypeScript.FncFlags = {}));
    var FncFlags = TypeScript.FncFlags;
    (function (SignatureFlags) {
        SignatureFlags[SignatureFlags["None"] = 0] = "None";
        SignatureFlags[SignatureFlags["IsIndexer"] = 1] = "IsIndexer";
        SignatureFlags[SignatureFlags["IsStringIndexer"] = 1 << 1] = "IsStringIndexer";
        SignatureFlags[SignatureFlags["IsNumberIndexer"] = 1 << 2] = "IsNumberIndexer";
    })(TypeScript.SignatureFlags || (TypeScript.SignatureFlags = {}));
    var SignatureFlags = TypeScript.SignatureFlags;
    function ToDeclFlags(fncOrVarOrSymbolOrModuleFlags) {
        return fncOrVarOrSymbolOrModuleFlags;
    }
    TypeScript.ToDeclFlags = ToDeclFlags;
    (function (TypeFlags) {
        TypeFlags[TypeFlags["None"] = 0] = "None";
        TypeFlags[TypeFlags["HasImplementation"] = 1] = "HasImplementation";
        TypeFlags[TypeFlags["HasSelfReference"] = 1 << 1] = "HasSelfReference";
        TypeFlags[TypeFlags["MergeResult"] = 1 << 2] = "MergeResult";
        TypeFlags[TypeFlags["IsEnum"] = 1 << 3] = "IsEnum";
        TypeFlags[TypeFlags["BuildingName"] = 1 << 4] = "BuildingName";
        TypeFlags[TypeFlags["HasBaseType"] = 1 << 5] = "HasBaseType";
        TypeFlags[TypeFlags["HasBaseTypeOfObject"] = 1 << 6] = "HasBaseTypeOfObject";
        TypeFlags[TypeFlags["IsClass"] = 1 << 7] = "IsClass";
    })(TypeScript.TypeFlags || (TypeScript.TypeFlags = {}));
    var TypeFlags = TypeScript.TypeFlags;
    (function (TypeRelationshipFlags) {
        TypeRelationshipFlags[TypeRelationshipFlags["SuccessfulComparison"] = 0] = "SuccessfulComparison";
        TypeRelationshipFlags[TypeRelationshipFlags["SourceIsNullTargetIsVoidOrUndefined"] = 1] = "SourceIsNullTargetIsVoidOrUndefined";
        TypeRelationshipFlags[TypeRelationshipFlags["RequiredPropertyIsMissing"] = 1 << 1] = "RequiredPropertyIsMissing";
        TypeRelationshipFlags[TypeRelationshipFlags["IncompatibleSignatures"] = 1 << 2] = "IncompatibleSignatures";
        TypeRelationshipFlags[TypeRelationshipFlags["SourceSignatureHasTooManyParameters"] = 3] = "SourceSignatureHasTooManyParameters";
        TypeRelationshipFlags[TypeRelationshipFlags["IncompatibleReturnTypes"] = 1 << 4] = "IncompatibleReturnTypes";
        TypeRelationshipFlags[TypeRelationshipFlags["IncompatiblePropertyTypes"] = 1 << 5] = "IncompatiblePropertyTypes";
        TypeRelationshipFlags[TypeRelationshipFlags["IncompatibleParameterTypes"] = 1 << 6] = "IncompatibleParameterTypes";
    })(TypeScript.TypeRelationshipFlags || (TypeScript.TypeRelationshipFlags = {}));
    var TypeRelationshipFlags = TypeScript.TypeRelationshipFlags;
    (function (CodeGenTarget) {
        CodeGenTarget[CodeGenTarget["ES3"] = 0] = "ES3";
        CodeGenTarget[CodeGenTarget["ES5"] = 1] = "ES5";
    })(TypeScript.CodeGenTarget || (TypeScript.CodeGenTarget = {}));
    var CodeGenTarget = TypeScript.CodeGenTarget;
    (function (ModuleGenTarget) {
        ModuleGenTarget[ModuleGenTarget["Synchronous"] = 0] = "Synchronous";
        ModuleGenTarget[ModuleGenTarget["Asynchronous"] = 1] = "Asynchronous";
        ModuleGenTarget[ModuleGenTarget["Local"] = 1 << 1] = "Local";
    })(TypeScript.ModuleGenTarget || (TypeScript.ModuleGenTarget = {}));
    var ModuleGenTarget = TypeScript.ModuleGenTarget;
    // Compiler defaults to generating ES5-compliant code for
    //  - getters and setters
    TypeScript.codeGenTarget = 0 /* ES3 */;
    TypeScript.moduleGenTarget = 0 /* Synchronous */;
    TypeScript.optimizeModuleCodeGen = true;
    function flagsToString(e, flags) {
        var builder = "";
        for (var i = 1; i < (1 << 31); i = i << 1) {
            if ((flags & i) != 0) {
                for (var k in e) {
                    if (e[k] == i) {
                        if (builder.length > 0) {
                            builder += "|";
                        }
                        builder += k;
                        break;
                    }
                }
            }
        }
        return builder;
    }
    TypeScript.flagsToString = flagsToString;
})(TypeScript || (TypeScript = {}));
