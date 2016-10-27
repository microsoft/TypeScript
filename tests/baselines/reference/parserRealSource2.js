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
    var ErrorRecoverySet;
    (function (ErrorRecoverySet) {
        ErrorRecoverySet[ErrorRecoverySet["None"] = 0] = "None";
        ErrorRecoverySet[ErrorRecoverySet["Comma"] = 1] = "Comma";
        ErrorRecoverySet[ErrorRecoverySet["SColon"] = 2] = "SColon";
        ErrorRecoverySet[ErrorRecoverySet["Asg"] = 4] = "Asg";
        ErrorRecoverySet[ErrorRecoverySet["BinOp"] = 8] = "BinOp";
        // AsgMod, AsgAdd, AsgSub, AsgLsh, AsgRsh, AsgRs2, AsgAnd, AsgXor, AsgOr, QMark, Mult, Div, 
        // Pct, GT, LT, And, Xor, Or
        ErrorRecoverySet[ErrorRecoverySet["RBrack"] = 16] = "RBrack";
        ErrorRecoverySet[ErrorRecoverySet["RCurly"] = 32] = "RCurly";
        ErrorRecoverySet[ErrorRecoverySet["RParen"] = 64] = "RParen";
        ErrorRecoverySet[ErrorRecoverySet["Dot"] = 128] = "Dot";
        ErrorRecoverySet[ErrorRecoverySet["Colon"] = 256] = "Colon";
        ErrorRecoverySet[ErrorRecoverySet["PrimType"] = 512] = "PrimType";
        ErrorRecoverySet[ErrorRecoverySet["AddOp"] = 1024] = "AddOp";
        ErrorRecoverySet[ErrorRecoverySet["LCurly"] = 2048] = "LCurly";
        ErrorRecoverySet[ErrorRecoverySet["PreOp"] = 4096] = "PreOp";
        ErrorRecoverySet[ErrorRecoverySet["RegExp"] = 8192] = "RegExp";
        ErrorRecoverySet[ErrorRecoverySet["LParen"] = 16384] = "LParen";
        ErrorRecoverySet[ErrorRecoverySet["LBrack"] = 32768] = "LBrack";
        ErrorRecoverySet[ErrorRecoverySet["Scope"] = 65536] = "Scope";
        ErrorRecoverySet[ErrorRecoverySet["In"] = 131072] = "In";
        ErrorRecoverySet[ErrorRecoverySet["SCase"] = 262144] = "SCase";
        ErrorRecoverySet[ErrorRecoverySet["Else"] = 524288] = "Else";
        ErrorRecoverySet[ErrorRecoverySet["Catch"] = 1048576] = "Catch";
        ErrorRecoverySet[ErrorRecoverySet["Var"] = 2097152] = "Var";
        ErrorRecoverySet[ErrorRecoverySet["Stmt"] = 4194304] = "Stmt";
        ErrorRecoverySet[ErrorRecoverySet["While"] = 8388608] = "While";
        ErrorRecoverySet[ErrorRecoverySet["ID"] = 16777216] = "ID";
        ErrorRecoverySet[ErrorRecoverySet["Prefix"] = 33554432] = "Prefix";
        ErrorRecoverySet[ErrorRecoverySet["Literal"] = 67108864] = "Literal";
        ErrorRecoverySet[ErrorRecoverySet["RLit"] = 134217728] = "RLit";
        ErrorRecoverySet[ErrorRecoverySet["Func"] = 268435456] = "Func";
        ErrorRecoverySet[ErrorRecoverySet["EOF"] = 536870912] = "EOF";
        // REVIEW: Name this something clearer.
        ErrorRecoverySet[ErrorRecoverySet["TypeScriptS"] = 1073741824] = "TypeScriptS";
        ErrorRecoverySet[ErrorRecoverySet["ExprStart"] = 520158210] = "ExprStart";
        ErrorRecoverySet[ErrorRecoverySet["StmtStart"] = 1608580098] = "StmtStart";
        ErrorRecoverySet[ErrorRecoverySet["Postfix"] = 49280] = "Postfix";
    })(ErrorRecoverySet = TypeScript.ErrorRecoverySet || (TypeScript.ErrorRecoverySet = {}));
    var AllowedElements;
    (function (AllowedElements) {
        AllowedElements[AllowedElements["None"] = 0] = "None";
        AllowedElements[AllowedElements["ModuleDeclarations"] = 4] = "ModuleDeclarations";
        AllowedElements[AllowedElements["ClassDeclarations"] = 8] = "ClassDeclarations";
        AllowedElements[AllowedElements["InterfaceDeclarations"] = 16] = "InterfaceDeclarations";
        AllowedElements[AllowedElements["AmbientDeclarations"] = 1024] = "AmbientDeclarations";
        AllowedElements[AllowedElements["Properties"] = 2048] = "Properties";
        AllowedElements[AllowedElements["Global"] = 1052] = "Global";
        AllowedElements[AllowedElements["QuickParse"] = 3100] = "QuickParse";
    })(AllowedElements = TypeScript.AllowedElements || (TypeScript.AllowedElements = {}));
    var Modifiers;
    (function (Modifiers) {
        Modifiers[Modifiers["None"] = 0] = "None";
        Modifiers[Modifiers["Private"] = 1] = "Private";
        Modifiers[Modifiers["Public"] = 2] = "Public";
        Modifiers[Modifiers["Readonly"] = 4] = "Readonly";
        Modifiers[Modifiers["Ambient"] = 8] = "Ambient";
        Modifiers[Modifiers["Exported"] = 16] = "Exported";
        Modifiers[Modifiers["Getter"] = 32] = "Getter";
        Modifiers[Modifiers["Setter"] = 64] = "Setter";
        Modifiers[Modifiers["Static"] = 128] = "Static";
    })(Modifiers = TypeScript.Modifiers || (TypeScript.Modifiers = {}));
    var ASTFlags;
    (function (ASTFlags) {
        ASTFlags[ASTFlags["None"] = 0] = "None";
        ASTFlags[ASTFlags["ExplicitSemicolon"] = 1] = "ExplicitSemicolon";
        ASTFlags[ASTFlags["AutomaticSemicolon"] = 2] = "AutomaticSemicolon";
        ASTFlags[ASTFlags["Writeable"] = 4] = "Writeable";
        ASTFlags[ASTFlags["Error"] = 8] = "Error";
        ASTFlags[ASTFlags["DotLHSPartial"] = 16] = "DotLHSPartial";
        ASTFlags[ASTFlags["DotLHS"] = 32] = "DotLHS";
        ASTFlags[ASTFlags["IsStatement"] = 64] = "IsStatement";
        ASTFlags[ASTFlags["StrictMode"] = 128] = "StrictMode";
        ASTFlags[ASTFlags["PossibleOptionalParameter"] = 256] = "PossibleOptionalParameter";
        ASTFlags[ASTFlags["ClassBaseConstructorCall"] = 512] = "ClassBaseConstructorCall";
        ASTFlags[ASTFlags["OptionalName"] = 1024] = "OptionalName";
        // REVIEW: This flag is to mark lambda nodes to note that the LParen of an expression has already been matched in the lambda header.
        //         The flag is used to communicate this piece of information to the calling parseTerm, which intern will remove it.
        //         Once we have a better way to associate information with nodes, this flag should not be used.
        ASTFlags[ASTFlags["SkipNextRParen"] = 2048] = "SkipNextRParen";
    })(ASTFlags = TypeScript.ASTFlags || (TypeScript.ASTFlags = {}));
    var DeclFlags;
    (function (DeclFlags) {
        DeclFlags[DeclFlags["None"] = 0] = "None";
        DeclFlags[DeclFlags["Exported"] = 1] = "Exported";
        DeclFlags[DeclFlags["Private"] = 2] = "Private";
        DeclFlags[DeclFlags["Public"] = 4] = "Public";
        DeclFlags[DeclFlags["Ambient"] = 8] = "Ambient";
        DeclFlags[DeclFlags["Static"] = 16] = "Static";
        DeclFlags[DeclFlags["LocalStatic"] = 32] = "LocalStatic";
        DeclFlags[DeclFlags["GetAccessor"] = 64] = "GetAccessor";
        DeclFlags[DeclFlags["SetAccessor"] = 128] = "SetAccessor";
    })(DeclFlags = TypeScript.DeclFlags || (TypeScript.DeclFlags = {}));
    var ModuleFlags;
    (function (ModuleFlags) {
        ModuleFlags[ModuleFlags["None"] = 0] = "None";
        ModuleFlags[ModuleFlags["Exported"] = 1] = "Exported";
        ModuleFlags[ModuleFlags["Private"] = 2] = "Private";
        ModuleFlags[ModuleFlags["Public"] = 4] = "Public";
        ModuleFlags[ModuleFlags["Ambient"] = 8] = "Ambient";
        ModuleFlags[ModuleFlags["Static"] = 16] = "Static";
        ModuleFlags[ModuleFlags["LocalStatic"] = 32] = "LocalStatic";
        ModuleFlags[ModuleFlags["GetAccessor"] = 64] = "GetAccessor";
        ModuleFlags[ModuleFlags["SetAccessor"] = 128] = "SetAccessor";
        ModuleFlags[ModuleFlags["IsEnum"] = 256] = "IsEnum";
        ModuleFlags[ModuleFlags["ShouldEmitModuleDecl"] = 512] = "ShouldEmitModuleDecl";
        ModuleFlags[ModuleFlags["IsWholeFile"] = 1024] = "IsWholeFile";
        ModuleFlags[ModuleFlags["IsDynamic"] = 2048] = "IsDynamic";
        ModuleFlags[ModuleFlags["MustCaptureThis"] = 4096] = "MustCaptureThis";
    })(ModuleFlags = TypeScript.ModuleFlags || (TypeScript.ModuleFlags = {}));
    var SymbolFlags;
    (function (SymbolFlags) {
        SymbolFlags[SymbolFlags["None"] = 0] = "None";
        SymbolFlags[SymbolFlags["Exported"] = 1] = "Exported";
        SymbolFlags[SymbolFlags["Private"] = 2] = "Private";
        SymbolFlags[SymbolFlags["Public"] = 4] = "Public";
        SymbolFlags[SymbolFlags["Ambient"] = 8] = "Ambient";
        SymbolFlags[SymbolFlags["Static"] = 16] = "Static";
        SymbolFlags[SymbolFlags["LocalStatic"] = 32] = "LocalStatic";
        SymbolFlags[SymbolFlags["GetAccessor"] = 64] = "GetAccessor";
        SymbolFlags[SymbolFlags["SetAccessor"] = 128] = "SetAccessor";
        SymbolFlags[SymbolFlags["Property"] = 256] = "Property";
        SymbolFlags[SymbolFlags["Readonly"] = 512] = "Readonly";
        SymbolFlags[SymbolFlags["ModuleMember"] = 1024] = "ModuleMember";
        SymbolFlags[SymbolFlags["InterfaceMember"] = 2048] = "InterfaceMember";
        SymbolFlags[SymbolFlags["ClassMember"] = 4096] = "ClassMember";
        SymbolFlags[SymbolFlags["BuiltIn"] = 8192] = "BuiltIn";
        SymbolFlags[SymbolFlags["TypeSetDuringScopeAssignment"] = 16384] = "TypeSetDuringScopeAssignment";
        SymbolFlags[SymbolFlags["Constant"] = 32768] = "Constant";
        SymbolFlags[SymbolFlags["Optional"] = 65536] = "Optional";
        SymbolFlags[SymbolFlags["RecursivelyReferenced"] = 131072] = "RecursivelyReferenced";
        SymbolFlags[SymbolFlags["Bound"] = 262144] = "Bound";
        SymbolFlags[SymbolFlags["CompilerGenerated"] = 524288] = "CompilerGenerated";
    })(SymbolFlags = TypeScript.SymbolFlags || (TypeScript.SymbolFlags = {}));
    var VarFlags;
    (function (VarFlags) {
        VarFlags[VarFlags["None"] = 0] = "None";
        VarFlags[VarFlags["Exported"] = 1] = "Exported";
        VarFlags[VarFlags["Private"] = 2] = "Private";
        VarFlags[VarFlags["Public"] = 4] = "Public";
        VarFlags[VarFlags["Ambient"] = 8] = "Ambient";
        VarFlags[VarFlags["Static"] = 16] = "Static";
        VarFlags[VarFlags["LocalStatic"] = 32] = "LocalStatic";
        VarFlags[VarFlags["GetAccessor"] = 64] = "GetAccessor";
        VarFlags[VarFlags["SetAccessor"] = 128] = "SetAccessor";
        VarFlags[VarFlags["AutoInit"] = 256] = "AutoInit";
        VarFlags[VarFlags["Property"] = 512] = "Property";
        VarFlags[VarFlags["Readonly"] = 1024] = "Readonly";
        VarFlags[VarFlags["Class"] = 2048] = "Class";
        VarFlags[VarFlags["ClassProperty"] = 4096] = "ClassProperty";
        VarFlags[VarFlags["ClassBodyProperty"] = 8192] = "ClassBodyProperty";
        VarFlags[VarFlags["ClassConstructorProperty"] = 16384] = "ClassConstructorProperty";
        VarFlags[VarFlags["ClassSuperMustBeFirstCallInConstructor"] = 32768] = "ClassSuperMustBeFirstCallInConstructor";
        VarFlags[VarFlags["Constant"] = 65536] = "Constant";
        VarFlags[VarFlags["MustCaptureThis"] = 131072] = "MustCaptureThis";
    })(VarFlags = TypeScript.VarFlags || (TypeScript.VarFlags = {}));
    var FncFlags;
    (function (FncFlags) {
        FncFlags[FncFlags["None"] = 0] = "None";
        FncFlags[FncFlags["Exported"] = 1] = "Exported";
        FncFlags[FncFlags["Private"] = 2] = "Private";
        FncFlags[FncFlags["Public"] = 4] = "Public";
        FncFlags[FncFlags["Ambient"] = 8] = "Ambient";
        FncFlags[FncFlags["Static"] = 16] = "Static";
        FncFlags[FncFlags["LocalStatic"] = 32] = "LocalStatic";
        FncFlags[FncFlags["GetAccessor"] = 64] = "GetAccessor";
        FncFlags[FncFlags["SetAccessor"] = 128] = "SetAccessor";
        FncFlags[FncFlags["Definition"] = 256] = "Definition";
        FncFlags[FncFlags["Signature"] = 512] = "Signature";
        FncFlags[FncFlags["Method"] = 1024] = "Method";
        FncFlags[FncFlags["HasReturnExpression"] = 2048] = "HasReturnExpression";
        FncFlags[FncFlags["CallMember"] = 4096] = "CallMember";
        FncFlags[FncFlags["ConstructMember"] = 8192] = "ConstructMember";
        FncFlags[FncFlags["HasSelfReference"] = 16384] = "HasSelfReference";
        FncFlags[FncFlags["IsFatArrowFunction"] = 32768] = "IsFatArrowFunction";
        FncFlags[FncFlags["IndexerMember"] = 65536] = "IndexerMember";
        FncFlags[FncFlags["IsFunctionExpression"] = 131072] = "IsFunctionExpression";
        FncFlags[FncFlags["ClassMethod"] = 262144] = "ClassMethod";
        FncFlags[FncFlags["ClassPropertyMethodExported"] = 524288] = "ClassPropertyMethodExported";
    })(FncFlags = TypeScript.FncFlags || (TypeScript.FncFlags = {}));
    var SignatureFlags;
    (function (SignatureFlags) {
        SignatureFlags[SignatureFlags["None"] = 0] = "None";
        SignatureFlags[SignatureFlags["IsIndexer"] = 1] = "IsIndexer";
        SignatureFlags[SignatureFlags["IsStringIndexer"] = 2] = "IsStringIndexer";
        SignatureFlags[SignatureFlags["IsNumberIndexer"] = 4] = "IsNumberIndexer";
    })(SignatureFlags = TypeScript.SignatureFlags || (TypeScript.SignatureFlags = {}));
    function ToDeclFlags(fncOrVarOrSymbolOrModuleFlags) {
        return fncOrVarOrSymbolOrModuleFlags;
    }
    TypeScript.ToDeclFlags = ToDeclFlags;
    var TypeFlags;
    (function (TypeFlags) {
        TypeFlags[TypeFlags["None"] = 0] = "None";
        TypeFlags[TypeFlags["HasImplementation"] = 1] = "HasImplementation";
        TypeFlags[TypeFlags["HasSelfReference"] = 2] = "HasSelfReference";
        TypeFlags[TypeFlags["MergeResult"] = 4] = "MergeResult";
        TypeFlags[TypeFlags["IsEnum"] = 8] = "IsEnum";
        TypeFlags[TypeFlags["BuildingName"] = 16] = "BuildingName";
        TypeFlags[TypeFlags["HasBaseType"] = 32] = "HasBaseType";
        TypeFlags[TypeFlags["HasBaseTypeOfObject"] = 64] = "HasBaseTypeOfObject";
        TypeFlags[TypeFlags["IsClass"] = 128] = "IsClass";
    })(TypeFlags = TypeScript.TypeFlags || (TypeScript.TypeFlags = {}));
    var TypeRelationshipFlags;
    (function (TypeRelationshipFlags) {
        TypeRelationshipFlags[TypeRelationshipFlags["SuccessfulComparison"] = 0] = "SuccessfulComparison";
        TypeRelationshipFlags[TypeRelationshipFlags["SourceIsNullTargetIsVoidOrUndefined"] = 1] = "SourceIsNullTargetIsVoidOrUndefined";
        TypeRelationshipFlags[TypeRelationshipFlags["RequiredPropertyIsMissing"] = 2] = "RequiredPropertyIsMissing";
        TypeRelationshipFlags[TypeRelationshipFlags["IncompatibleSignatures"] = 4] = "IncompatibleSignatures";
        TypeRelationshipFlags[TypeRelationshipFlags["SourceSignatureHasTooManyParameters"] = 3] = "SourceSignatureHasTooManyParameters";
        TypeRelationshipFlags[TypeRelationshipFlags["IncompatibleReturnTypes"] = 16] = "IncompatibleReturnTypes";
        TypeRelationshipFlags[TypeRelationshipFlags["IncompatiblePropertyTypes"] = 32] = "IncompatiblePropertyTypes";
        TypeRelationshipFlags[TypeRelationshipFlags["IncompatibleParameterTypes"] = 64] = "IncompatibleParameterTypes";
    })(TypeRelationshipFlags = TypeScript.TypeRelationshipFlags || (TypeScript.TypeRelationshipFlags = {}));
    var CodeGenTarget;
    (function (CodeGenTarget) {
        CodeGenTarget[CodeGenTarget["ES3"] = 0] = "ES3";
        CodeGenTarget[CodeGenTarget["ES5"] = 1] = "ES5";
    })(CodeGenTarget = TypeScript.CodeGenTarget || (TypeScript.CodeGenTarget = {}));
    var ModuleGenTarget;
    (function (ModuleGenTarget) {
        ModuleGenTarget[ModuleGenTarget["Synchronous"] = 0] = "Synchronous";
        ModuleGenTarget[ModuleGenTarget["Asynchronous"] = 1] = "Asynchronous";
        ModuleGenTarget[ModuleGenTarget["Local"] = 2] = "Local";
    })(ModuleGenTarget = TypeScript.ModuleGenTarget || (TypeScript.ModuleGenTarget = {}));
    // Compiler defaults to generating ES5-compliant code for
    //  - getters and setters
    TypeScript.codeGenTarget = CodeGenTarget.ES3;
    TypeScript.moduleGenTarget = ModuleGenTarget.Synchronous;
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
