//// [tests/cases/conformance/parser/ecmascript5/parserRealSource3.ts] ////

//// [parserRealSource3.ts]
// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescript.ts' />

module TypeScript {
    // Note: Any addition to the NodeType should also be supported with addition to AstWalkerDetailCallback
    export enum NodeType {
        None,
        Empty,
        EmptyExpr,
        True,
        False,
        This,
        Super,
        QString,
        Regex,
        Null,
        ArrayLit,
        ObjectLit,
        Void,
        Comma,
        Pos,
        Neg,
        Delete,
        Await,
        In,
        Dot,
        From,
        Is,
        InstOf,
        Typeof,
        NumberLit,
        Name,
        TypeRef,
        Index,
        Call,
        New,
        Asg,
        AsgAdd,
        AsgSub,
        AsgDiv,
        AsgMul,
        AsgMod,
        AsgAnd,
        AsgXor,
        AsgOr,
        AsgLsh,
        AsgRsh,
        AsgRs2,
        ConditionalExpression,
        LogOr,
        LogAnd,
        Or,
        Xor,
        And,
        Eq,
        Ne,
        Eqv,
        NEqv,
        Lt,
        Le,
        Gt,
        Ge,
        Add,
        Sub,
        Mul,
        Div,
        Mod,
        Lsh,
        Rsh,
        Rs2,
        Not,
        LogNot,
        IncPre,
        DecPre,
        IncPost,
        DecPost,
        TypeAssertion,
        FuncDecl,
        Member,
        VarDecl,
        ArgDecl,
        Return,
        Break,
        Continue,
        Throw,
        For,
        ForIn,
        If,
        While,
        DoWhile,
        Block,
        Case,
        Switch,
        Try,
        TryCatch,
        TryFinally,
        Finally,
        Catch,
        List,
        Script,
        ClassDeclaration,
        InterfaceDeclaration,
        ModuleDeclaration,
        ImportDeclaration,
        With,
        Label,
        LabeledStatement,
        EBStart,
        GotoEB,
        EndCode,
        Error,
        Comment,
        Debugger,
        GeneralNode = FuncDecl,
        LastAsg = AsgRs2,
    }
}

//// [parserRealSource3.js]
// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.
///<reference path='typescript.ts' />
var TypeScript;
(function (TypeScript) {
    // Note: Any addition to the NodeType should also be supported with addition to AstWalkerDetailCallback
    var NodeType;
    (function (NodeType) {
        NodeType[NodeType["None"] = 0] = "None";
        NodeType[NodeType["Empty"] = 1] = "Empty";
        NodeType[NodeType["EmptyExpr"] = 2] = "EmptyExpr";
        NodeType[NodeType["True"] = 3] = "True";
        NodeType[NodeType["False"] = 4] = "False";
        NodeType[NodeType["This"] = 5] = "This";
        NodeType[NodeType["Super"] = 6] = "Super";
        NodeType[NodeType["QString"] = 7] = "QString";
        NodeType[NodeType["Regex"] = 8] = "Regex";
        NodeType[NodeType["Null"] = 9] = "Null";
        NodeType[NodeType["ArrayLit"] = 10] = "ArrayLit";
        NodeType[NodeType["ObjectLit"] = 11] = "ObjectLit";
        NodeType[NodeType["Void"] = 12] = "Void";
        NodeType[NodeType["Comma"] = 13] = "Comma";
        NodeType[NodeType["Pos"] = 14] = "Pos";
        NodeType[NodeType["Neg"] = 15] = "Neg";
        NodeType[NodeType["Delete"] = 16] = "Delete";
        NodeType[NodeType["Await"] = 17] = "Await";
        NodeType[NodeType["In"] = 18] = "In";
        NodeType[NodeType["Dot"] = 19] = "Dot";
        NodeType[NodeType["From"] = 20] = "From";
        NodeType[NodeType["Is"] = 21] = "Is";
        NodeType[NodeType["InstOf"] = 22] = "InstOf";
        NodeType[NodeType["Typeof"] = 23] = "Typeof";
        NodeType[NodeType["NumberLit"] = 24] = "NumberLit";
        NodeType[NodeType["Name"] = 25] = "Name";
        NodeType[NodeType["TypeRef"] = 26] = "TypeRef";
        NodeType[NodeType["Index"] = 27] = "Index";
        NodeType[NodeType["Call"] = 28] = "Call";
        NodeType[NodeType["New"] = 29] = "New";
        NodeType[NodeType["Asg"] = 30] = "Asg";
        NodeType[NodeType["AsgAdd"] = 31] = "AsgAdd";
        NodeType[NodeType["AsgSub"] = 32] = "AsgSub";
        NodeType[NodeType["AsgDiv"] = 33] = "AsgDiv";
        NodeType[NodeType["AsgMul"] = 34] = "AsgMul";
        NodeType[NodeType["AsgMod"] = 35] = "AsgMod";
        NodeType[NodeType["AsgAnd"] = 36] = "AsgAnd";
        NodeType[NodeType["AsgXor"] = 37] = "AsgXor";
        NodeType[NodeType["AsgOr"] = 38] = "AsgOr";
        NodeType[NodeType["AsgLsh"] = 39] = "AsgLsh";
        NodeType[NodeType["AsgRsh"] = 40] = "AsgRsh";
        NodeType[NodeType["AsgRs2"] = 41] = "AsgRs2";
        NodeType[NodeType["ConditionalExpression"] = 42] = "ConditionalExpression";
        NodeType[NodeType["LogOr"] = 43] = "LogOr";
        NodeType[NodeType["LogAnd"] = 44] = "LogAnd";
        NodeType[NodeType["Or"] = 45] = "Or";
        NodeType[NodeType["Xor"] = 46] = "Xor";
        NodeType[NodeType["And"] = 47] = "And";
        NodeType[NodeType["Eq"] = 48] = "Eq";
        NodeType[NodeType["Ne"] = 49] = "Ne";
        NodeType[NodeType["Eqv"] = 50] = "Eqv";
        NodeType[NodeType["NEqv"] = 51] = "NEqv";
        NodeType[NodeType["Lt"] = 52] = "Lt";
        NodeType[NodeType["Le"] = 53] = "Le";
        NodeType[NodeType["Gt"] = 54] = "Gt";
        NodeType[NodeType["Ge"] = 55] = "Ge";
        NodeType[NodeType["Add"] = 56] = "Add";
        NodeType[NodeType["Sub"] = 57] = "Sub";
        NodeType[NodeType["Mul"] = 58] = "Mul";
        NodeType[NodeType["Div"] = 59] = "Div";
        NodeType[NodeType["Mod"] = 60] = "Mod";
        NodeType[NodeType["Lsh"] = 61] = "Lsh";
        NodeType[NodeType["Rsh"] = 62] = "Rsh";
        NodeType[NodeType["Rs2"] = 63] = "Rs2";
        NodeType[NodeType["Not"] = 64] = "Not";
        NodeType[NodeType["LogNot"] = 65] = "LogNot";
        NodeType[NodeType["IncPre"] = 66] = "IncPre";
        NodeType[NodeType["DecPre"] = 67] = "DecPre";
        NodeType[NodeType["IncPost"] = 68] = "IncPost";
        NodeType[NodeType["DecPost"] = 69] = "DecPost";
        NodeType[NodeType["TypeAssertion"] = 70] = "TypeAssertion";
        NodeType[NodeType["FuncDecl"] = 71] = "FuncDecl";
        NodeType[NodeType["Member"] = 72] = "Member";
        NodeType[NodeType["VarDecl"] = 73] = "VarDecl";
        NodeType[NodeType["ArgDecl"] = 74] = "ArgDecl";
        NodeType[NodeType["Return"] = 75] = "Return";
        NodeType[NodeType["Break"] = 76] = "Break";
        NodeType[NodeType["Continue"] = 77] = "Continue";
        NodeType[NodeType["Throw"] = 78] = "Throw";
        NodeType[NodeType["For"] = 79] = "For";
        NodeType[NodeType["ForIn"] = 80] = "ForIn";
        NodeType[NodeType["If"] = 81] = "If";
        NodeType[NodeType["While"] = 82] = "While";
        NodeType[NodeType["DoWhile"] = 83] = "DoWhile";
        NodeType[NodeType["Block"] = 84] = "Block";
        NodeType[NodeType["Case"] = 85] = "Case";
        NodeType[NodeType["Switch"] = 86] = "Switch";
        NodeType[NodeType["Try"] = 87] = "Try";
        NodeType[NodeType["TryCatch"] = 88] = "TryCatch";
        NodeType[NodeType["TryFinally"] = 89] = "TryFinally";
        NodeType[NodeType["Finally"] = 90] = "Finally";
        NodeType[NodeType["Catch"] = 91] = "Catch";
        NodeType[NodeType["List"] = 92] = "List";
        NodeType[NodeType["Script"] = 93] = "Script";
        NodeType[NodeType["ClassDeclaration"] = 94] = "ClassDeclaration";
        NodeType[NodeType["InterfaceDeclaration"] = 95] = "InterfaceDeclaration";
        NodeType[NodeType["ModuleDeclaration"] = 96] = "ModuleDeclaration";
        NodeType[NodeType["ImportDeclaration"] = 97] = "ImportDeclaration";
        NodeType[NodeType["With"] = 98] = "With";
        NodeType[NodeType["Label"] = 99] = "Label";
        NodeType[NodeType["LabeledStatement"] = 100] = "LabeledStatement";
        NodeType[NodeType["EBStart"] = 101] = "EBStart";
        NodeType[NodeType["GotoEB"] = 102] = "GotoEB";
        NodeType[NodeType["EndCode"] = 103] = "EndCode";
        NodeType[NodeType["Error"] = 104] = "Error";
        NodeType[NodeType["Comment"] = 105] = "Comment";
        NodeType[NodeType["Debugger"] = 106] = "Debugger";
        NodeType[NodeType["GeneralNode"] = 71] = "GeneralNode";
        NodeType[NodeType["LastAsg"] = 41] = "LastAsg";
    })(NodeType = TypeScript.NodeType || (TypeScript.NodeType = {}));
})(TypeScript || (TypeScript = {}));
