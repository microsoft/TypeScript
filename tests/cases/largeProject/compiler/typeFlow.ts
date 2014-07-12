//﻿
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

///<reference path='typescript.ts' />

module TypeScript {
    export class ScopeChain {
        public thisType: Type;
        public classType: Type;
        public fnc: FuncDecl;
        public moduleDecl: ModuleDeclaration;

        constructor (public container: Symbol, public previous: ScopeChain,
                     public scope: SymbolScope) { }
    }

    export class BBUseDefInfo {
        public defsBySymbol = new boolean[];
        public gen: BitVector;
        public kill: BitVector;
        public top: BitVector;
        // use lists by symbol 
        public useIndexBySymbol = new number[][];

        constructor (public bb: BasicBlock) { }

        public updateTop() {
            var temp = new BitVector(this.top.bitCount);
            for (var i = 0, succLen = this.bb.successors.length; i < succLen; i++) {
                var succ = this.bb.successors[i];
                if (succ.useDef) {
                    temp.union(succ.useDef.top);
                }
            }
            temp.difference(this.kill);
            temp.union(this.gen);
            var changed = temp.notEq(this.top);
            this.top = temp;
            return changed;
        }


        public initialize(useDefContext: UseDefContext) {
            var defSym = (sym: Symbol, context: UseDefContext) => {
                if (context.isLocalSym(sym)) {
                    var index = context.getSymbolIndex(sym);
                    // clear pending uses
                    this.useIndexBySymbol[index] = new number[];
                    this.defsBySymbol[index] = true;
                }
            }

            var useSym = (sym: Symbol, context: UseDefContext, ast: AST) => {
                if (context.isLocalSym(sym)) {
                    var symIndex = context.getSymbolIndex(sym);
                    if (this.useIndexBySymbol[symIndex] == undefined) {
                        this.useIndexBySymbol[symIndex] = new number[];
                    }
                    var symUses = this.useIndexBySymbol[symIndex];
                    var astIndex = context.getUseIndex(ast);
                    context.addUse(symIndex, astIndex);
                    symUses.push(astIndex);
                }
            }

            function initUseDefPre(cur: AST, parent: AST, walker: IAstWalker) {
                var context: UseDefContext = walker.state;
                if (cur == null) {
                    cur = null;
                }
                if (cur.nodeType == NodeType.VarDecl) {
                    var varDecl = <BoundDecl>cur;
                    if (varDecl.init || hasFlag(varDecl.varFlags, VarFlags.AutoInit)) {
                        defSym(varDecl.sym, context);
                    }
                }
                else if (cur.nodeType == NodeType.Name) {
                    // use
                    if (parent) {
                        if (parent.nodeType == NodeType.Asg) {
                            var asg = <BinaryExpression>parent;
                            if (asg.operand1 == cur) {
                                return cur;
                            }
                        }
                        else if (parent.nodeType == NodeType.VarDecl) {
                            var parentDecl = <BoundDecl>parent;
                            if (parentDecl.id == cur) {
                                return cur;
                            }
                        }
                    }
                    var id = <Identifier>cur;
                    useSym(id.sym, context, cur);
                }
                else if ((cur.nodeType >= NodeType.Asg) && (cur.nodeType <= NodeType.LastAsg)) {
                    // def
                    var asg = <BinaryExpression>cur;
                    if (asg.operand1 && (asg.operand1.nodeType == NodeType.Name)) {
                        var id = <Identifier>asg.operand1;
                        defSym(id.sym, context);
                    }
                }
                else if (cur.nodeType == NodeType.FuncDecl) {
                    walker.options.goChildren = false;
                }

                return cur;
            }

            var options = new AstWalkOptions();
            // traverse ASTs in reverse order of execution (to match uses with preceding defs)
            options.reverseSiblings = true;

            getAstWalkerFactory().walk(this.bb.content, initUseDefPre, null, options, useDefContext);
        }

        public initializeGen(useDefContext: UseDefContext) {
            var symbolLen = this.useIndexBySymbol.length;
            var bitCount = useDefContext.uses.length;
            this.gen = new BitVector(bitCount);
            for (var s = 0; s < symbolLen; s++) {
                var symUses = this.useIndexBySymbol[s];
                if ((symUses != undefined) && (symUses.length > 0)) {
                    for (var u = 0, uLen = symUses.length; u < uLen; u++) {
                        this.gen.set(symUses[u], true);
                    }
                }
            }
            this.top = this.gen;
        }

        public initializeKill(useDefContext: UseDefContext) {
            this.kill = new BitVector(this.gen.bitCount);
            for (var s = 0, symbolLen = this.defsBySymbol.length; s < symbolLen; s++) {
                if (this.defsBySymbol[s]) {
                    var globalSymUses = useDefContext.useIndexBySymbol[s];
                    if (globalSymUses) {
                        for (var u = 0, useLen = globalSymUses.length; u < useLen; u++) {
                            this.kill.set(globalSymUses[u], true);
                        }
                    }
                }
            }
        }
    }

    export class UseDefContext {
        // global use lists by symbol
        public useIndexBySymbol = new number[][];
        // global list of uses (flat)
        public uses = new AST[];
        public symbols = new VariableSymbol[];
        public symbolMap = new StringHashTable();
        public symbolCount = 0;
        public func: Symbol;

        constructor () {
        }

        public getSymbolIndex(sym: Symbol) {
            var name = sym.name;
            var index = <number>(this.symbolMap.lookup(name));
            if (index == null) {
                index = this.symbolCount++;
                this.symbols[index] = <VariableSymbol>sym;
                this.symbolMap.add(name, index);
            }
            return index;
        }

        public addUse(symIndex: number, astIndex: number) {
            var useBySym = this.useIndexBySymbol[symIndex];
            if (useBySym == undefined) {
                useBySym = new number[];
                this.useIndexBySymbol[symIndex] = useBySym;
            }
            useBySym[useBySym.length] = astIndex;
        }

        public getUseIndex(ast: AST) {
            this.uses[this.uses.length] = ast;
            return this.uses.length - 1;
        }

        public isLocalSym(sym: Symbol) { return (sym && (sym.container == this.func) && (sym.kind() == SymbolKind.Variable)); }

        public killSymbol(sym: VariableSymbol, bbUses: BitVector) {
            var index: number = this.symbolMap.lookup(sym.name);
            var usesOfSym = this.useIndexBySymbol[index];
            for (var k = 0, len = usesOfSym.length; k < len; k++) {
                bbUses.set(usesOfSym[k], true);
            }
        }
    }

    export class BitVector {
        static packBits = 30;
        public firstBits = 0;
        public restOfBits: number[] = null;

        constructor (public bitCount: number) {
            if (this.bitCount > BitVector.packBits) {
                this.restOfBits = new number[];
                var len = Math.floor(this.bitCount / BitVector.packBits);
                for (var i = 0; i < len; i++) {
                    this.restOfBits[i] = 0;
                }
            }
        }

        public set(bitIndex: number, value: boolean) {
            if (bitIndex < BitVector.packBits) {
                if (value) {
                    this.firstBits |= (1 << bitIndex);
                }
                else {
                    this.firstBits &= (~(1 << bitIndex));
                }
            }
            else {
                var offset = Math.floor(bitIndex / BitVector.packBits) - 1;
                var localIndex = bitIndex % BitVector.packBits;
                if (value) {
                    this.restOfBits[offset] |= (1 << localIndex);
                }
                else {
                    this.restOfBits[offset] &= (~(1 << localIndex));
                }
            }
        }

        public map(fn: (index: number) =>any) {
            var k: number;
            for (k = 0; k < BitVector.packBits; k++) {
                if (k == this.bitCount) {
                    return;
                }
                if (((1 << k) & this.firstBits) != 0) {
                    fn(k);
                }
            }
            if (this.restOfBits) {
                var len: number;
                var cumu = BitVector.packBits;
                for (k = 0, len = this.restOfBits.length; k < len; k++) {
                    var myBits = this.restOfBits[k];
                    for (var j = 0; j < BitVector.packBits; j++) {
                        if (((1 << j) & myBits) != 0) {
                            fn(cumu);
                        }
                        cumu++;
                        if (cumu == this.bitCount) {
                            return;
                        }
                    }
                }
            }
        }

        // assume conforming sizes
        public union(b: BitVector) {
            this.firstBits |= b.firstBits;
            if (this.restOfBits) {
                for (var k = 0, len = this.restOfBits.length; k < len; k++) {
                    var myBits = this.restOfBits[k];
                    var bBits = b.restOfBits[k];
                    this.restOfBits[k] = myBits | bBits;
                }
            }
        }

        // assume conforming sizes
        public intersection(b: BitVector) {
            this.firstBits &= b.firstBits;
            if (this.restOfBits) {
                for (var k = 0, len = this.restOfBits.length; k < len; k++) {
                    var myBits = this.restOfBits[k];
                    var bBits = b.restOfBits[k];
                    this.restOfBits[k] = myBits & bBits;
                }
            }
        }

        // assume conforming sizes
        public notEq(b: BitVector) {
            if (this.firstBits != b.firstBits) {
                return true;
            }
            if (this.restOfBits) {
                for (var k = 0, len = this.restOfBits.length; k < len; k++) {
                    var myBits = this.restOfBits[k];
                    var bBits = b.restOfBits[k];
                    if (myBits != bBits) {
                        return true;
                    }
                }
            }
            return false;
        }

        public difference(b: BitVector) {
            var oldFirstBits = this.firstBits;
            this.firstBits &= (~b.firstBits);
            if (this.restOfBits) {
                for (var k = 0, len = this.restOfBits.length; k < len; k++) {
                    var myBits = this.restOfBits[k];
                    var bBits = b.restOfBits[k];
                    this.restOfBits[k] &= (~bBits);
                }
            }
        }
    }

    export class BasicBlock {
        // blocks that branch to the block after this one
        public predecessors = new BasicBlock[];
        public index = -1;
        public markValue = 0;
        public marked(markBase: number) { return this.markValue > markBase; }
        public mark() {
            this.markValue++;
        }
        public successors = new BasicBlock[];
        public useDef: BBUseDefInfo = null;
        public content = new ASTList();
        public addSuccessor(successor: BasicBlock): void {
            this.successors[this.successors.length] = successor;
            successor.predecessors[successor.predecessors.length] = this;
        }
    }

    export interface ITargetInfo {
        stmt: AST;
        continueBB: BasicBlock;
        breakBB: BasicBlock;
    }

    export class ControlFlowContext {
        public entry = null;
        // first unreachable ast for each unreachable code segment
        public unreachable: AST[] = null;
        public noContinuation = false;
        // statements enclosing the current statement
        public statementStack = new ITargetInfo[];
        public currentSwitch = new BasicBlock[];
        public walker: IAstWalker;

        constructor (public current: BasicBlock,
                     public exit: BasicBlock) {
            this.entry = this.current;
        }

        public walk(ast: AST, parent: AST) {
            return this.walker.walk(ast, parent);
        }

        public pushSwitch(bb: BasicBlock) {
            this.currentSwitch.push(bb);
        }

        public popSwitch() {
            return this.currentSwitch.pop();
        }

        public reportUnreachable(er: ErrorReporter) {
            if (this.unreachable && (this.unreachable.length > 0)) {
                var len = this.unreachable.length;
                for (var i = 0; i < len; i++) {
                    var unreachableAST = this.unreachable[i];
                    if (unreachableAST.nodeType != NodeType.EndCode) {
                        er.simpleError(unreachableAST, "unreachable code");
                    }
                }
            }
        }

        private printAST(ast: AST, outfile: ITextWriter) {
            var printContext = new PrintContext(outfile, null);

            printContext.increaseIndent();
            //ast.walk(prePrintAST, postPrintAST, null, printContext);
            getAstWalkerFactory().walk(ast, prePrintAST, postPrintAST, null, printContext);

            printContext.decreaseIndent();
        }

        private printBlockContent(bb: BasicBlock, outfile: ITextWriter) {
            var content = bb.content;
            for (var i = 0, len = content.members.length; i < len; i++) {
                var ast = content.members[i];
                this.printAST(ast, outfile);
            }
        }

        public markBase = 0;

        public bfs(nodeFunc: (bb: BasicBlock) =>void , edgeFunc: (node1: BasicBlock, node2: BasicBlock) =>void ,
            preEdges: () =>void , postEdges: () =>void ) {
            var markValue = this.markBase++;
            var q = new BasicBlock[];
            q[q.length] = this.entry;

            while (q.length > 0) {
                var bb = q.pop();
                if (!(bb.marked(markValue))) {
                    bb.mark();
                    if (nodeFunc) {
                        nodeFunc(bb);
                    }
                    var succLen = bb.successors.length;
                    if (succLen > 0) {
                        if (preEdges) {
                            preEdges();
                        }
                        for (var j = succLen - 1; j >= 0; j--) {
                            var successor = bb.successors[j];
                            if (!(successor.marked(this.markBase))) {
                                if (edgeFunc) {
                                    edgeFunc(bb, successor);
                                }
                                q[q.length] = successor;
                            }
                        }
                        if (postEdges) {
                            postEdges();
                        }
                    }
                }
            }
        }

        public linearBBs = new BasicBlock[];

        public useDef(er: ErrorReporter, funcSym: Symbol) {
            var useDefContext = new UseDefContext();
            useDefContext.func = funcSym;
            var useDefInit = (bb: BasicBlock) => {
                bb.useDef = new BBUseDefInfo(bb);
                bb.useDef.initialize(useDefContext);
                this.linearBBs[this.linearBBs.length] = bb;
            }
            this.bfs(useDefInit, null, null, null);
            var i: number, bbLen: number;
            for (i = 0, bbLen = this.linearBBs.length; i < bbLen; i++) {
                this.linearBBs[i].useDef.initializeGen(useDefContext);
                this.linearBBs[i].useDef.initializeKill(useDefContext);
            }
            var changed = true;

            while (changed) {
                changed = false;
                for (i = 0; i < bbLen; i++) {
                    changed = this.linearBBs[i].useDef.updateTop() || changed;
                }
            }

            var top = this.entry.useDef.top;
            top.map((index) => {
                var ast = <Identifier>useDefContext.uses[<number>index];
                er.simpleError(ast, "use of variable '" + ast.actualText + "' that is not definitely assigned");
            });
        }

        public print(outfile: ITextWriter) {
            var index = 0;
            var node = (bb: BasicBlock) => {
                if (bb.index < 0) {
                    bb.index = index++;
                }
                if (bb == this.exit) {
                    outfile.WriteLine("Exit block with index " + bb.index);
                }
                else {
                    outfile.WriteLine("Basic block with index " + bb.index);
                    this.printBlockContent(bb, outfile);
                }
            }

            function preEdges() {
                outfile.Write("  Branches to ");
            }

            function postEdges() {
                outfile.WriteLine("");
            }

            function edge(node1: BasicBlock, node2: BasicBlock) {
                if (node2.index < 0) {
                    node2.index = index++;
                }
                outfile.Write(node2.index + " ");
            }

            this.bfs(node, edge, preEdges, postEdges);
            if (this.unreachable != null) {
                for (var i = 0, len = this.unreachable.length; i < len; i++) {
                    outfile.WriteLine("Unreachable basic block ...");
                    this.printAST(this.unreachable[i], outfile);
                }
            }
        }

        public pushStatement(stmt: Statement, continueBB: BasicBlock, breakBB: BasicBlock) {
            this.statementStack.push({ stmt: stmt, continueBB: continueBB, breakBB: breakBB });
        }

        public popStatement() { return this.statementStack.pop(); }

        public returnStmt() {
            // TODO: make successor finally block if return stmt inside of try/finally 
            this.current.addSuccessor(this.exit);
            this.setUnreachable();
        }

        public setUnreachable() {
            this.current = null;
            this.noContinuation = true;
        }

        public addUnreachable(ast: AST) {
            if (this.unreachable === null) {
                this.unreachable = new AST[];
            }
            this.unreachable[this.unreachable.length] = ast;
        }

        public unconditionalBranch(target: AST, isContinue: boolean) {
            var targetBB = null;
            for (var i = 0, len = this.statementStack.length; i < len; i++) {
                var targetInfo = this.statementStack[i];
                if (targetInfo.stmt == target) {
                    if (isContinue) {
                        targetBB = targetInfo.continueBB;
                    }
                    else {
                        targetBB = targetInfo.breakBB;
                    }
                    break;
                }
            }
            if (targetBB) {
                this.current.addSuccessor(targetBB);
            }
            this.setUnreachable();
        }

        public addContent(ast: AST): void {
            if (this.current) {
                this.current.content.append(ast);
            }
        }
    }

    export interface IResolutionData {
        actuals: Type[];
        exactCandidates: Signature[];
        conversionCandidates: Signature[];
        id: number;
    }

    export class ResolutionDataCache {
        public cacheSize = 16;
        public rdCache: IResolutionData[] = [];
        public nextUp: number = 0;

        constructor () {
            for (var i = 0; i < this.cacheSize; i++) {
                this.rdCache[i] = {
                    actuals: new Type[],
                    exactCandidates: new Signature[],
                    conversionCandidates: new Signature[],
                    id: i
                };
            }
        }

        public getResolutionData(): IResolutionData {
            var rd: IResolutionData = null;

            if (this.nextUp < this.cacheSize) {
                rd = this.rdCache[this.nextUp];
            }

            if (rd == null) {
                this.cacheSize++;
                rd = {
                    actuals: new Type[],
                    exactCandidates: new Signature[],
                    conversionCandidates: new Signature[],
                    id: this.cacheSize
                };
                this.rdCache[this.cacheSize] = rd;
            }

            // cache operates as a stack - RD is always served up in-order
            this.nextUp++;

            return rd;
        }

        public returnResolutionData(rd: IResolutionData) {
            // Pop to save on array allocations, which are a bottleneck
            // REVIEW: On some VMs, Array.pop doesn't always pop the last value in the array
            rd.actuals.length = 0;
            rd.exactCandidates.length = 0;
            rd.conversionCandidates.length = 0;

            this.nextUp = rd.id;
        }
    }

    export class TypeFlow {
        public scope: SymbolScope;
        public globalScope: SymbolScope;

        public thisType: Type;
        public thisFnc: FuncDecl = null;
        public thisClassNode: TypeDeclaration = null;
        public enclosingFncIsMethod = false;

        // REVIEW: Prune in favor of typechecker fields
        public doubleType: Type;
        public booleanType: Type;
        public stringType: Type;
        public anyType: Type;
        public regexType: Type;
        public nullType: Type;
        public voidType: Type;
        public arrayAnyType: Type;

        public arrayInterfaceType: Type = null;
        public stringInterfaceType: Type = null;
        public objectInterfaceType: Type = null;
        public functionInterfaceType: Type = null;
        public numberInterfaceType: Type = null;
        public booleanInterfaceType: Type = null;
        public iargumentsInterfaceType: Type = null;

        public currentScript: Script = null;

        public inImportTypeCheck = false;
        public inTypeRefTypeCheck = false;
        public inArrayElementTypeCheck = false;
        public resolutionDataCache = new ResolutionDataCache();
        public nestingLevel = 0;
        public inSuperCall = false;

        constructor (public logger: ILogger, public initScope: SymbolScope, public parser: Parser,
                   public checker: TypeChecker) {
            this.checker.typeFlow = this;
            this.scope = this.initScope;
            this.globalScope = this.initScope;
            this.doubleType = this.checker.numberType;
            this.booleanType = this.checker.booleanType;
            this.stringType = this.checker.stringType;
            this.anyType = this.checker.anyType;
            this.regexType = this.anyType;
            this.nullType = this.checker.nullType;
            this.voidType = this.checker.voidType;
            this.arrayAnyType = this.checker.makeArrayType(this.anyType);
        }

        public initLibs() {
            var arraySym = this.globalScope.find("Array", false, true);
            if (arraySym && (arraySym.kind() == SymbolKind.Type)) {
                this.arrayInterfaceType = (<TypeSymbol>arraySym).type;
            }
            var stringSym = this.globalScope.find("String", false, true);
            if (stringSym && (stringSym.kind() == SymbolKind.Type)) {
                this.stringInterfaceType = (<TypeSymbol>stringSym).type;
            }
            var objectSym = this.globalScope.find("Object", false, true);
            if (objectSym && (objectSym.kind() == SymbolKind.Type)) {
                this.objectInterfaceType = (<TypeSymbol>objectSym).type;
            }
            var fnSym = this.globalScope.find("Function", false, true);
            if (fnSym && (fnSym.kind() == SymbolKind.Type)) {
                this.functionInterfaceType = (<TypeSymbol>fnSym).type;
            }
            var numberSym = this.globalScope.find("Number", false, true);
            if (numberSym && (numberSym.kind() == SymbolKind.Type)) {
                this.numberInterfaceType = (<TypeSymbol>numberSym).type;
            }
            var booleanSym = this.globalScope.find("Boolean", false, true);
            if (booleanSym && (booleanSym.kind() == SymbolKind.Type)) {
                this.booleanInterfaceType = (<TypeSymbol>booleanSym).type;
            }
            var regexSym = this.globalScope.find("RegExp", false, true);
            if (regexSym && (regexSym.kind() == SymbolKind.Type)) {
                this.regexType = (<TypeSymbol>regexSym).type;
            }
        }

        public cast(ast: AST, type: Type): AST {
            return this.castWithCoercion(ast, type, true, false);
        }

        public castWithCoercion(ast: AST, type: Type, applyCoercion: boolean, typeAssertion: boolean): AST {
            var comparisonInfo = new TypeComparisonInfo();
            if (this.checker.sourceIsAssignableToTarget(ast.type, type, comparisonInfo) || (typeAssertion && this.checker.sourceIsAssignableToTarget(type, ast.type, comparisonInfo))) {
                if (applyCoercion) {
                    if (type == null) {
                        ast.type = this.anyType;
                    }
                    else if (type.isClass()) {
                        ast.type = type.instanceType;
                    }
                    else {
                        ast.type = type;
                    }
                }
                return ast;
            }
            else {
                this.checker.errorReporter.incompatibleTypes(ast, ast.type, type, null, this.scope, comparisonInfo);
                return ast;
            }
        }

        public inScopeTypeCheck(ast: AST, enclosingScope: SymbolScope): AST {
            var prevScope = this.scope;
            this.scope = enclosingScope;
            var svThisFnc = this.thisFnc;
            var svThisType = this.thisType;
            var svThisClassNode = this.thisClassNode;
            var svCurrentModDecl = this.checker.currentModDecl;
            var prevMethodStatus = this.enclosingFncIsMethod;
            var container = this.scope.container;
            var fnc: FuncDecl = null;
            while (container) {
                if (container.kind() == SymbolKind.Type) {
                    var typeSym = <TypeSymbol>container;
                    var type = typeSym.type;
                    if (type.call) {
                        if (fnc == null) {
                            // use innermost function
                            this.enclosingFncIsMethod = typeSym.isMethod;
                            fnc = <FuncDecl>container.declAST;
                        }
                    }
                    if (type.isClass()) {
                        this.thisType = type.instanceType;
                        if (typeSym.declAST &&
                            (typeSym.declAST.nodeType == NodeType.ClassDeclaration)) {
                            this.thisClassNode = <TypeDeclaration>typeSym.declAST;
                        }
                        // use innermost class
                        break;
                    }
                    if (type.isModuleType()) {
                        this.checker.currentModDecl = <ModuleDeclaration>typeSym.declAST;
                        // use innermost module
                        break;
                    }
                }
                container = container.container;
            }
            this.thisFnc = fnc;

            var updated = this.typeCheck(ast);

            this.thisFnc = svThisFnc;
            this.thisType = svThisType;
            this.thisClassNode = svThisClassNode;
            this.checker.currentModDecl = svCurrentModDecl;
            this.enclosingFncIsMethod = prevMethodStatus;
            this.scope = prevScope;
            return updated;
        }

        public typeCheck(ast: AST): AST {
            if (ast) {
                return ast.typeCheck(this);
            }
            else {
                return null;
            }
        }

        public inScopeTypeCheckDecl(ast: AST) {
            if (ast.nodeType == NodeType.VarDecl || ast.nodeType == NodeType.ArgDecl) {
                this.inScopeTypeCheckBoundDecl(<BoundDecl>ast);
            }
            else if (ast.nodeType == NodeType.FuncDecl) {

                var funcDecl = <FuncDecl>ast;

                if (funcDecl.isAccessor()) {
                    this.typeCheckFunction(funcDecl);
                }
            }
        }

        public inScopeTypeCheckBoundDecl(varDecl: BoundDecl) {
            var sym = varDecl.sym;
            var svThisFnc = this.thisFnc;
            var svThisType = this.thisType;
            var prevMethodStatus = this.enclosingFncIsMethod;
            var prevLocationInfo = this.checker.locationInfo;
            if (sym && sym.container) {
                var instanceScope = hasFlag(varDecl.varFlags, VarFlags.ClassConstructorProperty) ? sym.container.getType().constructorScope : sym.container.instanceScope();
                if (hasFlag(varDecl.varFlags, VarFlags.Property) && sym.container.declAST.nodeType == NodeType.FuncDecl) {
                    this.thisFnc = <FuncDecl>sym.container.declAST;
                }
                if (instanceScope) {
                    var prevScope = this.scope;
                    this.scope = instanceScope;
                    var container = sym.container;
                    var svCurrentModDecl = this.checker.currentModDecl;
                    if (this.checker.units &&
                        (sym.unitIndex >= 0) &&
                        (sym.unitIndex < this.checker.units.length)) {
                        this.checker.locationInfo = this.checker.units[sym.unitIndex];
                    }
                    else {
                        this.checker.locationInfo = unknownLocationInfo;
                    }
                    // REVIEW: container linkage for function expressions
                    while (container) {
                        if (container.kind() == SymbolKind.Type) {
                            var typeSym = <TypeSymbol>container;
                            var type = typeSym.type;
                            if (type.call) {
                                this.enclosingFncIsMethod = typeSym.isMethod;
                            }
                            if (type.isClass()) {
                                this.thisType = type.instanceType;
                            }
                            if (type.isModuleType()) {
                                this.checker.currentModDecl = <ModuleDeclaration>container.declAST;
                                break;
                            }
                        }
                        container = container.container;
                    }

                    this.typeCheckBoundDecl(varDecl);
                    this.checker.currentModDecl = svCurrentModDecl;
                    this.scope = prevScope;
                }
            }
            this.thisFnc = svThisFnc;
            this.thisType = svThisType;
            this.checker.locationInfo = prevLocationInfo;
            this.enclosingFncIsMethod = prevMethodStatus;
        }

        public resolveBoundDecl(varDecl: BoundDecl) {
            if (varDecl.typeExpr) {
                if (varDecl.typeExpr.type == null ||
                    (varDecl.typeExpr.type && varDecl.typeExpr.type == this.anyType && this.scope) ||
                    varDecl.typeExpr.type.symbol == null ||
                    !this.checker.typeStatusIsFinished(varDecl.typeExpr.type.symbol.typeCheckStatus)) {
                    this.typeCheck(varDecl.typeExpr);
                }
                varDecl.type = varDecl.typeExpr.type;
                if (varDecl.sym) {
                    varDecl.sym.setType(varDecl.type);
                }
            }
            else if (varDecl.init == null) {
                if (this.checker.styleSettings.implicitAny) {
                    this.checker.errorReporter.styleError(varDecl, "type implicitly set to 'any'");
                }
                varDecl.type = this.anyType;
                if (varDecl.sym) {
                    if (varDecl.sym.isType()) {
                        var tsym = <TypeSymbol>varDecl.sym;
                        if (tsym.isMethod) {
                            this.checker.errorReporter.simpleError(varDecl, "Cannot bind method group to variable.  (Did you mean to use 'declare function' instead of 'declare var'?)");
                            return;
                        }
                        else {
                            this.checker.errorReporter.simpleError(varDecl, "Cannot bind type to variable");
                            return;
                        }
                    }
                    varDecl.sym.setType(varDecl.type);
                }
            }
        }

        public typeCheckBoundDecl(varDecl: BoundDecl): VarDecl {
            // symbol has already been added to the scope
            var infSym = <InferenceSymbol>varDecl.sym;
            if (infSym == null) {
                if (varDecl.init) {
                    varDecl.init = this.typeCheck(varDecl.init);
                    varDecl.type = this.checker.widenType(varDecl.init.type);
                }
                else {
                    if (this.checker.styleSettings.implicitAny) {
                        this.checker.errorReporter.styleError(varDecl, "type implicitly set to 'any'");
                    }
                    varDecl.type = this.anyType;
                }
            }
            else {
                if (infSym.typeCheckStatus == TypeCheckStatus.Started) {
                    if (this.checker.styleSettings.implicitAny) {
                        this.checker.errorReporter.styleError(varDecl, "type implicitly set to 'any'");
                    }
                    varDecl.type = this.anyType;
                    infSym.setType(this.anyType);
                }
                else if (infSym.typeCheckStatus == TypeCheckStatus.NotStarted) {
                    infSym.typeCheckStatus = TypeCheckStatus.Started;
                    this.checker.addStartedPTO(infSym);
                    var resolved = false;
                    if (varDecl.type == null) {
                        // propagate declared type
                        if (varDecl.typeExpr) {
                            this.resolveBoundDecl(varDecl);
                            resolved = true;
                            varDecl.type = varDecl.typeExpr.type;
                            infSym.typeCheckStatus = this.checker.getTypeCheckFinishedStatus();
                        }
                    }

                    if (varDecl.init) {
                        // if the bound decl is a function-local static, we need to set the
                        // encapsulating scope to the function's member scope
                        var isLocalStatic = hasFlag(varDecl.varFlags, VarFlags.LocalStatic);
                        var prevScope = this.scope;
                        var applyTargetType = !varDecl.init.isParenthesized;
                        if (isLocalStatic) {
                            this.scope = varDecl.sym.container.getType().memberScope;
                        }

                        // Mark Lambda expressions with IsPropertyBound flag
                        if (hasFlag(varDecl.varFlags, VarFlags.Property) && this.thisClassNode) {
                            getAstWalkerFactory().walk(varDecl.init, (ast: AST, parent: AST, walker: IAstWalker) => {
                                if (ast && ast.nodeType == NodeType.FuncDecl) {
                                    if (hasFlag((<FuncDecl>ast).fncFlags, FncFlags.IsFatArrowFunction)) {
                                        // Found a Lambda, mark it
                                        (<FuncDecl>ast).fncFlags |= FncFlags.IsPropertyBound;
                                    }
                                    // Only mark the top level functions
                                    walker.options.goChildren = false;
                                }
                                return ast;
                            });
                        }

                        this.checker.typeCheckWithContextualType(varDecl.type, this.checker.inProvisionalTypecheckMode(), applyTargetType, varDecl.init);

                        this.scope = prevScope;
                        if (varDecl.type) {
                            // If the cast is to a target type, in the case of a funcdecl,
                            // we may overwrite the init's type with one generated from a signature.
                            // In that case, we need to preserve the contained scope of the actual decl
                            var preserveScope = false;
                            var preservedContainedScope = null;

                            if (varDecl.init.type) {
                                preservedContainedScope = varDecl.init.type.containedScope;
                                preserveScope = true;
                                if (varDecl.init.type == this.voidType) {
                                    this.checker.errorReporter.simpleError(varDecl, "Cannot assign type 'void' to variable '" + varDecl.id.actualText + "'");
                                }
                            }

                            varDecl.init = this.castWithCoercion(varDecl.init, varDecl.type, applyTargetType && !this.checker.inProvisionalTypecheckMode(), false);

                            if (preserveScope && varDecl.init.type.containedScope == null) {
                                varDecl.init.type.containedScope = preservedContainedScope;
                            }
                        }
                        else {
                            varDecl.type = this.checker.widenType(varDecl.init.type);
                            if (varDecl.type == this.voidType) {
                                this.checker.errorReporter.simpleError(varDecl, "Cannot assign type 'void' to variable '" + varDecl.id.actualText + "'");
                                varDecl.type = this.anyType;
                            }
                        }
                        infSym.setType(varDecl.type);
                    }
                    else {
                        if (!resolved) {
                            this.resolveBoundDecl(varDecl);
                        }
                    }
                    infSym.typeCheckStatus = this.checker.getTypeCheckFinishedStatus();
                }
                else if (this.checker.typeStatusIsFinished(infSym.typeCheckStatus) &&
                         (infSym.declAST != varDecl)) {
                    if (varDecl.init) {
                        varDecl.init = this.typeCheck(varDecl.init);
                        varDecl.type = infSym.getType();
                        varDecl.init = this.cast(varDecl.init, varDecl.type);
                    }
                }
            }
            if (varDecl.id && varDecl.sym) {
                varDecl.id.sym = varDecl.sym;
            }

            // Check if variable satisfies type privacy
            if (varDecl.sym && varDecl.sym.container) {
                this.checkTypePrivacy(varDecl.sym.getType(), varDecl.sym, (typeName: string, isModuleName: boolean) => this.varPrivacyErrorReporter(varDecl, typeName, isModuleName));
            }
            return <VarDecl>varDecl;
        }

        private varPrivacyErrorReporter(varDecl: BoundDecl, typeName: string, isModuleName: boolean) {
            var typestring = "";
            if (isModuleName) {
                var quotestring = "";
                if (!isQuoted(typeName)) {
                    quotestring = "'";
                }
                typestring = " is using inaccessible module " + quotestring + typeName + quotestring;
            } else {
                typestring = " has or is using private type '" + typeName + "'";
            }

            if (hasFlag(varDecl.varFlags, VarFlags.Public)) {
                if (varDecl.sym.container.declAST.nodeType == NodeType.InterfaceDeclaration) {
                    this.checker.errorReporter.simpleError(varDecl, "property '" + varDecl.sym.name + "' of exported interface" + typestring);
                } else {
                    this.checker.errorReporter.simpleError(varDecl, "public member '" + varDecl.sym.name + "' of exported class" + typestring);
                }
            } else {
                this.checker.errorReporter.simpleError(varDecl, "exported variable '" + varDecl.sym.name + "'" + typestring);
            }
        }

        public typeCheckSuper(ast: AST): AST {
            if (this.thisType && (this.enclosingFncIsMethod && !this.thisFnc.isStatic()) && this.thisType.baseClass()) {
                ast.type = this.thisType.baseClass();
            }
            else {
                // redirect 'super' used within lambdas
                if (!this.enclosingFncIsMethod &&
                    this.thisType && this.thisType.baseClass() &&
                    this.thisFnc && hasFlag(this.thisFnc.fncFlags, FncFlags.IsFatArrowFunction)) {
                    // Find the closest non lambda function
                    var enclosingFnc = this.thisFnc.enclosingFnc;
                    while (hasFlag(enclosingFnc.fncFlags, FncFlags.IsFatArrowFunction)) {
                        enclosingFnc = enclosingFnc.enclosingFnc;
                    }

                    // If the lambda is enclosed is a valid member, use the base type
                    if (enclosingFnc && (enclosingFnc.isMethod() || enclosingFnc.isConstructor) && !enclosingFnc.isStatic()) {
                        ast.type = this.thisType.baseClass();
                        enclosingFnc.setHasSuperReferenceInFatArrowFunction();
                        return ast;
                    }
                }

                ast.type = this.anyType;
                this.checker.errorReporter.invalidSuperReference(ast);
            }
            return ast;
        }

        public typeCheckThis(ast: AST): AST {
           ast.type = this.anyType;
            var illegalThisRef = false;
            if (this.thisFnc == null) {
                // 'this' in class bodies should bind to 'any'
                if (this.thisType) {
                    if (this.thisClassNode && this.thisClassNode.nodeType == NodeType.ClassDeclaration) {
                        illegalThisRef = true;
                    }
                    else {
                        ast.type = this.thisType;
                    }
                }
                else if (this.checker.currentModDecl) {
                    this.checker.errorReporter.simpleError(ast, "'this' may not be referenced within module bodies");
                }
            }
            else {
                if (this.thisClassNode && (hasFlag(this.thisFnc.fncFlags, FncFlags.IsPropertyBound) || (this.inSuperCall && hasFlag((<ClassDeclaration>this.thisClassNode).varFlags, VarFlags.ClassSuperMustBeFirstCallInConstructor)))) {
                    illegalThisRef = true;
                }
                if (this.thisFnc.isMethod() || this.thisFnc.isConstructor || this.thisFnc.isTargetTypedAsMethod) {
                    if (this.thisType && !(this.thisFnc.fncFlags & FncFlags.Static)) {
                        ast.type = this.thisType;
                    }
                }
            }

            // redirect 'this' used within lambdas
            if (!this.enclosingFncIsMethod &&
                this.thisFnc &&
                hasFlag(this.thisFnc.fncFlags, FncFlags.IsFatArrowFunction)) {

                    // if the enclosing function was bound to a property,
                    // checkInitSelf would not have been able to mark the 
                    // function for a self init
                if (this.thisFnc.boundToProperty) {
                    var container = this.thisFnc.boundToProperty.sym.container;
                    if (container.declAST.nodeType == NodeType.FuncDecl) {
                        (<FuncDecl>container.declAST).setHasSelfReference();
                    }
                }
                else {
                    var encFnc = this.thisFnc.enclosingFnc;
                    var firstEncFnc = encFnc;

                    while (encFnc) {
                        if (this.thisClassNode && hasFlag(encFnc.fncFlags, FncFlags.IsPropertyBound)) {
                            illegalThisRef = true;
                        }

                        if (!hasFlag(encFnc.fncFlags, FncFlags.IsFatArrowFunction) || encFnc.hasSelfReference()) {
                            encFnc.setHasSelfReference();
                            break;
                        }

                        encFnc = encFnc.enclosingFnc;
                    }

                    if (!encFnc && firstEncFnc) {
                        encFnc = firstEncFnc;
                        encFnc.setHasSelfReference();
                    }
                    else if (!encFnc) { // the lambda is bound at the top-level...
                        if (this.thisClassNode) {
                            (<ClassDeclaration>this.thisClassNode).varFlags |= VarFlags.MustCaptureThis;
                        }
                        else if (this.checker.currentModDecl) {
                            this.checker.currentModDecl.modFlags |= ModuleFlags.MustCaptureThis;
                        }
                        else {
                            this.checker.mustCaptureGlobalThis = true;
                        }
                    }

                    if (encFnc && (encFnc.isMethod() || encFnc.isConstructor) && this.thisType && !hasFlag(encFnc.fncFlags, FncFlags.Static)) {
                        ast.type = this.thisType;
                    }
                }
            }

            if (illegalThisRef) {
                this.checker.errorReporter.simpleError(ast, "Keyword 'this' cannot be referenced in initializers in a class body, or in super constructor calls");
            }
            return ast;
        }

        public setTypeFromSymbol(ast: AST, symbol: Symbol): void {
            if (symbol.isVariable()) {
                if (symbol.isInferenceSymbol()) {
                    var infSym = <InferenceSymbol>symbol;
                    if (infSym.declAST &&
                        !this.checker.typeStatusIsFinished(infSym.typeCheckStatus)) {
                        this.inScopeTypeCheckDecl(infSym.declAST);
                    }
                    if (!this.checker.styleSettings.innerScopeDeclEscape) {
                        if (infSym.declAST && (infSym.declAST.nodeType == NodeType.VarDecl)) {
                            if (this.nestingLevel < (<VarDecl>infSym.declAST).nestingLevel) {
                                this.checker.errorReporter.styleError(ast, "Illegal reference to a variable defined in more nested scope");
                            }
                        }
                    }
                }
                ast.type = symbol.getType();
                if (!symbol.writeable()) {
                    ast.flags = ast.flags & (~(ASTFlags.Writeable));
                }
            }
            else if (symbol.isType()) {
                ast.type = symbol.getType();
                ast.flags = ast.flags & (~(ASTFlags.Writeable));
            }
            else {
                ast.type = this.anyType;
                this.checker.errorReporter.symbolDoesNotReferToAValue(ast, symbol.name);
            }
        }

        public typeCheckName(ast: AST): AST {
            var identifier = <Identifier>ast;

            if (this.checker.inWith) {
                identifier.type = this.anyType;
            }
            else {
                var typespace = this.inTypeRefTypeCheck;
                var idText = identifier.text;
                var originalIdText = idText;
                var isDynamicModuleName = isQuoted(identifier.text);

                var symbol = this.scope.find(idText, false, typespace);

                if (symbol == null && isDynamicModuleName) {
                    symbol = this.checker.findSymbolForDynamicModule(idText, this.currentScript.locationInfo.filename, (id) => this.scope.find(id, false, typespace));
                }

                if (!symbol) {
                    if (!identifier.isMissing()) {
                        this.checker.errorReporter.unresolvedSymbol(identifier, identifier.text);
                    }
                    identifier.type = this.anyType;
                }
                else {
                    if (optimizeModuleCodeGen && symbol && symbol.isType()) {
                        var symType = symbol.getType();
                        // Once the type has been referenced outside of a type ref position, there's
                        // no going back                        
                        if (symType && (<TypeSymbol>symbol).aliasLink && (<TypeSymbol>symbol).onlyReferencedAsTypeRef) {

                            var modDecl = <ModuleDeclaration>symType.symbol.declAST;
                            if (modDecl && hasFlag(modDecl.modFlags, ModuleFlags.IsDynamic)) {
                                (<TypeSymbol>symbol).onlyReferencedAsTypeRef = this.inTypeRefTypeCheck;
                            }
                        }
                    }

                    if (symbol.declAST &&
                        symbol.declAST.nodeType == NodeType.FuncDecl &&
                        !(<FuncDecl>symbol.declAST).returnTypeAnnotation &&
                        (<FuncDecl>symbol.declAST).signature.typeCheckStatus == TypeCheckStatus.Started) {
                        (<FuncDecl>symbol.declAST).type.symbol.flags |= SymbolFlags.RecursivelyReferenced;
                        (<FuncDecl>symbol.declAST).signature.returnType.type = this.anyType;
                    }

                    this.setTypeFromSymbol(ast, symbol);
                    identifier.sym = symbol;
                    if (this.thisFnc) {
                        if (this.thisFnc.type && symbol.container != this.thisFnc.type.symbol) {
                            this.thisFnc.freeVariables[this.thisFnc.freeVariables.length] = symbol;
                        }
                    }
                }
            }
            return ast;
        }

        public typeCheckScript(script: Script): Script {
            this.checker.locationInfo = script.locationInfo;
            this.scope = this.checker.globalScope;

            // if it's a top-level module, the globals have already been added to the implicit
            // module decl
            if (!script.topLevelMod) {
                this.addLocalsFromScope(this.scope, this.checker.gloMod,
                                   script.vars, this.checker.globals, true);
            }

            this.currentScript = script;
            script.bod = <ASTList>this.typeCheck(script.bod);
            this.currentScript = null;
            return script;
        }

        public typeCheckBitNot(ast: AST): AST {
            var unex = <UnaryExpression>ast;
            unex.operand = this.typeCheck(unex.operand);
            unex.type = this.doubleType;
            return unex;
        }

        public typeCheckUnaryNumberOperator(ast: AST): AST {
            var unex = <UnaryExpression>ast;
            unex.operand = this.typeCheck(unex.operand);
            unex.type = this.doubleType;
            return ast;
        }

        public typeCheckLogNot(ast: AST): AST {
            var unex = <UnaryExpression>ast;
            unex.operand = this.typeCheck(unex.operand);
            unex.type = this.booleanType;
            return unex;
        }

        public astIsWriteable(ast: AST): boolean {
            return hasFlag(ast.flags, ASTFlags.Writeable);
        }

        public typeCheckIncOrDec(ast: AST): AST {
            var unex = <UnaryExpression>ast;
            var lval = unex.operand;
            if (!this.astIsWriteable(unex)) {
                this.checker.errorReporter.valueCannotBeModified(unex);
                unex.type = this.doubleType;
            }
            else {
                unex = <UnaryExpression> this.typeCheckUnaryNumberOperator(ast);
                if (unex.operand.type != this.checker.numberType && unex.operand.type != this.checker.anyType && !(unex.operand.type.typeFlags & TypeFlags.IsEnum)) {
                    this.checker.errorReporter.simpleError(ast, "'++' and '--' may only be applied to operands of type 'number' or 'any'");
                }
            }
            return unex;
        }

        public typeCheckBitwiseOperator(ast: AST, assignment: boolean): AST {
            var binex = <BinaryExpression>ast;
            var resultType: Type = null;
            binex.operand1 = this.typeCheck(binex.operand1);
            binex.operand2 = this.typeCheck(binex.operand2);
            var leftType = binex.operand1.type;
            var rightType = binex.operand2.type;

            if (assignment && (!this.astIsWriteable(binex))) {
                this.checker.errorReporter.valueCannotBeModified(binex);
            }

            if (this.checker.styleSettings.bitwise) {
                this.checker.errorReporter.styleError(ast, "use of " + nodeTypeTable[binex.nodeType]);
            }

            if (this.checker.sourceIsSubtypeOfTarget(leftType, this.doubleType) && (this.checker.sourceIsSubtypeOfTarget(rightType, this.doubleType))) {
                resultType = this.doubleType;
            }
            else if ((leftType == this.booleanType) &&
                     (rightType == this.booleanType)) {
                resultType = this.booleanType;
            }
            else if (leftType == this.anyType) {
                if ((rightType == this.anyType) ||
                    (rightType == this.doubleType) ||
                    (rightType == this.booleanType)) {
                    resultType = this.anyType;
                }
            }
            else if (rightType == this.anyType) {
                if ((leftType == this.anyType) ||
                    (leftType == this.doubleType) ||
                    (leftType == this.booleanType)) {
                    resultType = this.anyType;
                }
            }
            if (resultType == null) {
                resultType = this.anyType;
                this.checker.errorReporter.incompatibleTypes(binex, leftType, rightType,
                                                        binex.printLabel(), this.scope);
            }
            binex.type = resultType;
            return binex;
        }

        public typeCheckArithmeticOperator(ast: AST, assignment: boolean): AST {
            var binex = <BinaryExpression>ast;
            binex.operand1 = this.typeCheck(binex.operand1);
            binex.operand2 = this.typeCheck(binex.operand2);
            var leftType = binex.operand1.type;
            var rightType = binex.operand2.type;

            if (assignment && (!this.astIsWriteable(binex.operand1))) {
                this.checker.errorReporter.valueCannotBeModified(binex);
            }

            if (this.checker.styleSettings.bitwise &&
                ((binex.nodeType == NodeType.And) ||
                (binex.nodeType == NodeType.Or) ||
                (binex.nodeType == NodeType.AsgAnd) ||
                (binex.nodeType == NodeType.AsgOr))) {
                this.checker.errorReporter.styleError(ast, "use of " + nodeTypeTable[binex.nodeType]);
            }

            if (leftType == null || rightType == null) {
                this.checker.errorReporter.simpleError(binex, "Could not typecheck arithmetic operation.  Possible recursive typecheck error?");
                binex.type = this.anyType;
                return binex;
            }
            var nodeType = binex.nodeType;

            if (this.checker.isNullOrUndefinedType(leftType)) {
                leftType = rightType;
            }
            if (this.checker.isNullOrUndefinedType(rightType)) {
                rightType = leftType;
            }
            leftType = this.checker.widenType(leftType);
            rightType = this.checker.widenType(rightType);

            if (nodeType == NodeType.Add || nodeType == NodeType.AsgAdd) {

                if (leftType == this.checker.stringType || rightType == this.checker.stringType) {
                    binex.type = this.checker.stringType;
                }
                else if (leftType == this.checker.numberType && rightType == this.checker.numberType) {
                    binex.type = this.checker.numberType;
                }
                else if (this.checker.sourceIsSubtypeOfTarget(leftType, this.checker.numberType) && this.checker.sourceIsSubtypeOfTarget(rightType, this.checker.numberType)) {
                    binex.type = this.checker.numberType;
                }
                else if (leftType == this.checker.anyType || rightType == this.checker.anyType) {
                    binex.type = this.checker.anyType;
                }
                else {
                    binex.type = this.anyType;
                    this.checker.errorReporter.incompatibleTypes(binex, leftType, rightType,
                                                            binex.printLabel(), this.scope);
                }
            }
            else {
                if (leftType == this.checker.numberType && rightType == this.checker.numberType) {
                    binex.type = this.checker.numberType;
                }
                else if (this.checker.sourceIsSubtypeOfTarget(leftType, this.checker.numberType) && this.checker.sourceIsSubtypeOfTarget(rightType, this.checker.numberType)) {
                    binex.type = this.checker.numberType;
                }
                else if (leftType == this.checker.anyType || rightType == this.checker.anyType) {
                    binex.type = this.checker.numberType;
                }
                else {
                    binex.type = this.anyType;
                    this.checker.errorReporter.incompatibleTypes(binex, leftType, rightType,
                                                            binex.printLabel(), this.scope);
                }
            }

            return binex;
        }

        public typeCheckDotOperator(ast: AST): AST {
            var binex = <BinaryExpression>ast;
            var leftIsFnc = false;
            binex.operand1 = this.typeCheck(binex.operand1);
            var leftType = binex.operand1.type;
            var leftScope: SymbolScope = null;
            // REVIEW: replace with get member scope
            if (leftType) {
                if (leftType == this.anyType) {
                    binex.type = this.anyType;
                    return binex;
                }
                else if (leftType == this.stringType) {
                    if (this.stringInterfaceType) {
                        leftScope = this.stringInterfaceType.memberScope;
                    }
                    else {
                        binex.type = this.anyType;
                        return binex;
                    }
                }
                else if (leftType == this.doubleType) {
                    if (this.numberInterfaceType) {
                        leftScope = this.numberInterfaceType.memberScope;
                    }
                    else {
                        binex.type = this.anyType;
                        return binex;
                    }
                }
                else if (leftType == this.booleanType) {
                    if (this.booleanInterfaceType) {
                        leftScope = this.booleanInterfaceType.memberScope;
                    }
                    else {
                        binex.type = this.anyType;
                        return binex;
                    }
                }
                else if ((leftType.call || leftType.construct) && leftType.members == null) {
                    if (this.functionInterfaceType) {
                        leftScope = this.functionInterfaceType.memberScope;
                    }
                    else {
                        binex.type = this.anyType;
                        return binex;
                    }
                }
                else if (leftType.elementType) {
                    if (this.arrayInterfaceType) {
                        var arrInstType = leftType.elementType.getArrayBase(this.arrayInterfaceType, this.checker);
                        leftScope = arrInstType.memberScope;
                    }
                    else {
                        binex.type = this.anyType;
                        return binex;
                    }
                }
                else {
                    leftScope = leftType.memberScope;
                }
            }
            if (leftScope == null) {
                this.checker.errorReporter.expectedClassOrInterface(binex);
                binex.type = this.anyType;
            }
            else {
                var propertyName = <Identifier>binex.operand2;
                var lhsIsEnclosingType = (this.thisClassNode && binex.operand1.type == this.thisClassNode.type.instanceType) || this.inTypeRefTypeCheck;
                var symbol = leftScope.find(propertyName.text, !lhsIsEnclosingType, this.inTypeRefTypeCheck); // only search the public members, unless the rhs is a 'this' pointer

                // If the symbol wasn't found, delegate to the appropriate 'virtual' parent type
                if (!symbol) {
                    if (this.objectInterfaceType && leftType) {
                        // check 'Object' for the symbol
                        if (leftType.isReferenceType()) {
                            symbol = this.objectInterfaceType.memberScope.find(propertyName.text, false, this.inTypeRefTypeCheck);
                        }
                        if (!symbol) {
                            // check 'Function', if appropriate
                            if (this.functionInterfaceType && (leftType.call || leftType.construct)) {
                                symbol = this.functionInterfaceType.memberScope.find(propertyName.text, false, this.inTypeRefTypeCheck);
                            }
                        }
                    }
                }

                if (!symbol || (!symbol.visible(leftScope, this.checker))) {
                    binex.type = this.anyType;

                    if (symbol == null) {
                        this.checker.errorReporter.simpleError(propertyName, "The property '" + propertyName.actualText + "' does not exist on value of type '" + leftType.getScopedTypeName(this.scope) + "'");
                    }
                    else if (!this.inTypeRefTypeCheck) {  // if it's a dotted type reference, we'll catch the visibility error during binding
                        this.checker.errorReporter.simpleError(binex, "The property '" + propertyName.actualText + " on type '" + leftType.getScopedTypeName(this.scope) + "' is not visible");
                    }
                }
                else {
                    if (symbol.isVariable()) {
                        if (symbol.isInferenceSymbol()) {
                            var infSym = <InferenceSymbol>symbol;
                            if (infSym.declAST && !this.checker.typeStatusIsFinished(infSym.typeCheckStatus)) {
                                this.inScopeTypeCheckDecl(infSym.declAST);
                            }
                        }
                    }
                    propertyName.sym = symbol;
                    binex.type = symbol.getType();
                }
            }
            if (binex.type == null) {
                binex.type = this.anyType;
            }

            return binex;
        }

        public typeCheckBooleanOperator(ast: AST): AST {
            var binex = <BinaryExpression>ast;
            binex.operand1 = this.typeCheck(binex.operand1);
            binex.operand2 = this.typeCheck(binex.operand2);
            var leftType = binex.operand1.type;
            var rightType = binex.operand2.type;
            if ((!(this.checker.sourceIsAssignableToTarget(leftType, rightType))) &&
                (!(this.checker.sourceIsAssignableToTarget(rightType, leftType)))) {
                this.checker.errorReporter.incompatibleTypes(binex, leftType, rightType, binex.printLabel(), this.scope);
            }
            binex.type = this.booleanType;
            return binex;
        }

        public typeCheckAsgOperator(ast: AST): AST {
            var binex = <BinaryExpression>ast;
            var applyTargetType = !binex.operand2.isParenthesized;
            binex.operand1 = this.typeCheck(binex.operand1);

            this.checker.typeCheckWithContextualType(binex.operand1.type, this.checker.inProvisionalTypecheckMode(), applyTargetType, binex.operand2);

            var leftType = binex.operand1.type;
            var rightType = binex.operand2.type;

            if (!(this.astIsWriteable(binex.operand1))) {
                this.checker.errorReporter.valueCannotBeModified(binex);
            }
            if (binex.operand1.nodeType == NodeType.Call) {
                var callEx = <CallExpression>binex.operand1;
            }
            var preserveScope = false;
            var preservedContainedScope = null;
            if (binex.operand2.type) {
                preservedContainedScope = binex.operand2.type.containedScope;
                preserveScope = true;
            }
            // Do not re-write the AST in provisional typecheck mode
            binex.operand2 = this.castWithCoercion(binex.operand2, leftType, applyTargetType && !this.checker.inProvisionalTypecheckMode(), false);
            if (preserveScope && binex.operand2.type.containedScope == null) {
                binex.operand2.type.containedScope = preservedContainedScope;
            }
            binex.type = rightType;
            return binex;
        }

        public typeCheckIndex(ast: AST): AST {
            var binex = <BinaryExpression>ast;
            binex.operand1 = this.typeCheck(binex.operand1); // ObjExpr
            binex.operand2 = this.typeCheck(binex.operand2); // IndexExpr

            if (!this.checker.styleSettings.literalSubscript) {
                if (binex.operand2.nodeType == NodeType.QString) {
                    this.checker.errorReporter.styleError(ast, "use literal subscript ('.') notation instead)");
                }
            }

            var objExprType = binex.operand1.type;
            var indexExprType = binex.operand2.type;

            if (objExprType.elementType) { // arrays
                if (indexExprType == this.checker.anyType || indexExprType == this.checker.numberType || hasFlag(indexExprType.typeFlags, TypeFlags.IsEnum)) {
                    binex.type = objExprType.elementType;
                }
                else if (indexExprType == this.checker.stringType) {
                    binex.type = this.checker.anyType;
                }
                else {
                    this.checker.errorReporter.simpleError(binex, "Illegal property access");
                    binex.type = this.checker.anyType;
                }
            }
            else if (objExprType.index) { // types with index sigs

                if (indexExprType == this.checker.anyType ||
                    !((objExprType.index.flags & SignatureFlags.IsStringIndexer) || (objExprType.index.flags & SignatureFlags.IsNumberIndexer)) || // REVIEW: unvalidated type expression
                    ((objExprType.index.flags & SignatureFlags.IsStringIndexer) && indexExprType == this.checker.stringType) ||
                    ((objExprType.index.flags & SignatureFlags.IsNumberIndexer) && (indexExprType == this.checker.numberType || hasFlag(indexExprType.typeFlags, TypeFlags.IsEnum)))) {
                    var sig = this.resolveOverload(ast, objExprType.index);
                    if (sig) {
                        binex.type = sig.returnType.type;//objExprType.index.signatures[0].returnType.type;
                    }
                    else {
                        binex.type = this.checker.anyType;
                    }
                }
                else if (indexExprType == this.checker.stringType) {
                    binex.type = this.checker.anyType;
                }
                else {
                    this.checker.errorReporter.simpleError(binex, "Illegal property access");
                    binex.type = this.checker.anyType;
                }
            }
            else if ((objExprType == this.checker.anyType ||
                     objExprType == this.checker.stringType ||
                     objExprType == this.checker.numberType ||
                     objExprType == this.checker.booleanType ||
                     objExprType.isReferenceType()) &&
                     (indexExprType == this.checker.anyType ||
                      indexExprType == this.checker.stringType ||
                      (indexExprType == this.checker.numberType || hasFlag(indexExprType.typeFlags, TypeFlags.IsEnum)))) { // REVIEW: Do we want to allow indexes of type 'number'?
                binex.type = this.checker.anyType;
            }
            else {
                this.checker.errorReporter.simpleError(binex, "Illegal property access");
                binex.type = this.checker.anyType;
            }

            return binex;
        }

        public typeCheckInOperator(binex: BinaryExpression): BinaryExpression {
            binex.operand1 = this.cast(this.typeCheck(binex.operand1), this.stringType);
            binex.operand2 = this.typeCheck(binex.operand2);

            if (!((binex.operand1.type == this.checker.anyType || binex.operand1.type == this.checker.stringType) &&
                    (binex.operand2.type == this.anyType || this.checker.sourceIsSubtypeOfTarget(binex.operand2.type, this.objectInterfaceType)))) {
                this.checker.errorReporter.simpleError(binex, "The in operator requires the left operand to be of type Any or the String primitive type, and the right operand to be of type Any or an object type");
            }

            binex.type = this.booleanType;
            return binex;
        }

        public typeCheckShift(binex: BinaryExpression, assignment: boolean): BinaryExpression {
            binex.operand1 = this.cast(this.typeCheck(binex.operand1), this.doubleType);
            binex.operand2 = this.cast(this.typeCheck(binex.operand2), this.doubleType);
            if (assignment && (!(this.astIsWriteable(binex.operand1)))) {
                this.checker.errorReporter.valueCannotBeModified(binex);
            }
            binex.type = this.doubleType;
            return binex;
        }

        public typeCheckQMark(trinex: ConditionalExpression): ConditionalExpression {
            trinex.operand1 = this.typeCheck(trinex.operand1);
            trinex.operand2 = this.typeCheck(trinex.operand2);
            trinex.operand3 = this.typeCheck(trinex.operand3);
            var leftType = trinex.operand2.type;
            var rightType = trinex.operand3.type;

            if (leftType == rightType) {
                trinex.type = leftType;
            }
            else {
                if (this.checker.sourceIsSubtypeOfTarget(leftType, rightType)) {
                    trinex.type = rightType;
                }
                else if (this.checker.sourceIsSubtypeOfTarget(rightType, leftType)) {
                    trinex.type = leftType;
                }
                else {
                    trinex.type = this.anyType;
                    this.checker.errorReporter.incompatibleTypes(trinex, leftType, rightType, trinex.printLabel(), this.scope);
                }
            }

            return trinex;
        }

        public addFormals(container: Symbol, signature: Signature,
            table: IHashTable) {
            var len = signature.parameters.length;
            for (var i = 0; i < len; i++) {
                var symbol = <ParameterSymbol>signature.parameters[i];
                symbol.container = container;
                table.add(symbol.name, symbol);
            }
        }

        // REVIEW: We use isModContainer instead of container.getType().isModuleType because container.type may be null at this
        // juncture
        public addLocalsFromScope(scope: SymbolScope, container: Symbol, vars: ASTList, table: IHashTable, isModContainer: boolean) {
            var len = vars.members.length;
            var hasArgsDef = false;
            for (var i = 0; i < len; i++) {
                var local = <VarDecl>vars.members[i];
                if (((local.sym == null) || (local.sym.kind() != SymbolKind.Field))) {
                    var result: Symbol = null;
                    if ((result = table.lookup(local.id.text)) == null) {
                        var localVar: ValueLocation = new ValueLocation();
                        localVar.typeLink = new TypeLink();
                        var varSym = null;

                        if (hasFlag(local.varFlags, VarFlags.Static)) {
                            local.varFlags |= VarFlags.LocalStatic;
                            varSym = new FieldSymbol(local.id.text, local.minChar,
                                                      this.checker.locationInfo.unitIndex,
                                                      true, localVar);
                        }
                        else {
                            varSym = new VariableSymbol(local.id.text, local.minChar,
                                                      this.checker.locationInfo.unitIndex,
                                                      localVar);
                        }
                        varSym.transferVarFlags(local.varFlags);
                        localVar.symbol = varSym;
                        varSym.declAST = local;
                        localVar.typeLink.ast = local.typeExpr;
                        this.checker.resolveTypeLink(scope, localVar.typeLink, false);
                        if ((local.type == null) && (local.init == null)) {
                            local.type = this.anyType;
                        }
                        localVar.typeLink.type = local.type;
                        localVar.symbol.container = container;
                        local.sym = localVar.symbol;
                        table.add(local.id.text, varSym);
                        if (local.id.text == "arguments") {
                            hasArgsDef = true;
                        }
                    }
                    else {
                        local.type = result.getType();
                        local.sym = result;
                    }
                }
            }
            if (!isModContainer) {
                if (!hasArgsDef) {
                    var argLoc = new ValueLocation();
                    argLoc.typeLink = new TypeLink();
                    var theArgSym = new VariableSymbol("arguments", vars.minChar,
                                                     this.checker.locationInfo.unitIndex,
                                                     argLoc);

                    // if the user is using a custom lib.d.ts where IArguments has not been defined
                    // (or they're compiling with the --nolib option), use 'any' as the argument type
                    if (!this.iargumentsInterfaceType) {
                        var argumentsSym = scope.find("IArguments", false, true);

                        if (argumentsSym) {
                            argumentsSym.flags |= SymbolFlags.CompilerGenerated;
                            this.iargumentsInterfaceType = argumentsSym.getType();
                        }
                        else {
                            this.iargumentsInterfaceType = this.anyType;
                        }
                    }
                    argLoc.typeLink.type = this.iargumentsInterfaceType;
                    table.add("arguments", theArgSym);
                }
            }
        }

        // REVIEW: isClass param may now be redundant
        public addConstructorLocalArgs(container: Symbol, args: ASTList, table: IHashTable, isClass: boolean): void {
            if (args) {
                var len = args.members.length;
                for (var i = 0; i < len; i++) {
                    var local = <ArgDecl>args.members[i];
                    if ((local.sym == null) ||
                        (isClass || (local.sym.kind() != SymbolKind.Field))) {
                        var result: Symbol = null;
                        if ((result = table.lookup(local.id.text)) == null) {
                            this.resolveBoundDecl(local);
                            var localVar: ValueLocation = new ValueLocation();
                            localVar.typeLink = new TypeLink();
                            var varSym = new ParameterSymbol(local.id.text, local.minChar,
                                                                   this.checker.locationInfo.unitIndex,
                                                                   localVar);
                            varSym.declAST = local;
                            localVar.symbol = varSym;
                            localVar.typeLink.type = local.type;
                            localVar.symbol.container = container;
                            local.sym = localVar.symbol;
                            table.add(local.id.text, varSym);
                        }
                        else {
                            local.type = result.getType();
                            local.sym = result;
                        }
                    }
                }
            }
        }

        public checkInitSelf(funcDecl: FuncDecl): boolean {
            if (!funcDecl.isMethod()) {
                var freeVars = funcDecl.freeVariables;
                for (var k = 0, len = freeVars.length; k < len; k++) {
                    var sym = freeVars[k];
                    if (sym.isInstanceProperty()) {
                        return true;
                    }
                }
            }
            var fns = funcDecl.scopes;
            var fnsLen = fns.members.length;

            for (var j = 0; j < fnsLen; j++) {
                var fn = <FuncDecl>fns.members[j];
                if (this.checkInitSelf(fn)) {
                    return true;
                }
            }
            return false;
        }

        public checkPromoteFreeVars(funcDecl: FuncDecl, constructorSym: Symbol): void {
            var freeVars = funcDecl.freeVariables;
            for (var k = 0, len = freeVars.length; k < len; k++) {
                var sym = freeVars[k];
                if ((!sym.isInstanceProperty()) && (sym.container == constructorSym)) {
                    instanceFilter.reset();
                    if (this.scope.search(instanceFilter, sym.name, false, false)) {
                        this.checker.errorReporter.simpleError(funcDecl, "Constructor-local variable shadows class property '" + sym.name + "'. To access the class property, use 'self." + sym.name + "'");
                    }

                    this.checker.errorReporter.simpleError(funcDecl, "Constructor-local variables may not be accessed from instance method bodies. Consider changing local variable '" + sym.name + "' to a class property")
                }
            }
        }

        public allReturnsAreVoid(funcDecl: FuncDecl) {
            // in the case of a function or method with no declared return type, walk the body to 
            // pre-emptively determine if the function has a return type of void
            //
            // REVIEW: Eventually, we'll want to perform exit graph analysis to determine
            // if the function ever "escapes" without a return expression
            // This would require moving some of this logic into the function's typecheck-proper,
            // which would slow things down a fair bit, but would open up more analysis opportunities
            var allReturnsAreVoid = true;

            if (funcDecl.signature.returnType.type == null) {
                var preFindReturnExpressionTypes = function (ast: AST, parent: AST, walker: IAstWalker) {
                    var go = true;
                    switch (ast.nodeType) {
                        case NodeType.FuncDecl:
                            // don't recurse into a function decl - we don't want to confuse a nested
                            // return type with the top-level function's return type
                            go = false;
                            break;
                        case NodeType.Return:
                            var returnStmt: ReturnStatement = <ReturnStatement>ast;

                            if (returnStmt.returnExpression) {
                                allReturnsAreVoid = false;
                                go = false;
                            }

                        default:
                            break;
                    }
                    walker.options.goChildren = go;
                    walker.options.goNextSibling = go;
                    return ast;
                }

                getAstWalkerFactory().walk(funcDecl.bod, preFindReturnExpressionTypes);
            }

            return allReturnsAreVoid;
        }

        public classConstructorHasSuperCall(funcDecl: FuncDecl) {
            var foundSuper = false;

            var preFindSuperCall = function (ast: AST, parent: AST, walker: IAstWalker) {

                var go = true;

                switch (ast.nodeType) {
                    case NodeType.FuncDecl:
                        go = false;
                        break;
                    case NodeType.Call:
                        var call = <CallExpression>ast;

                        if (call.target.nodeType == NodeType.Super) {
                            go = false;
                            foundSuper = true;
                            break;
                        }
                        break;
                    default:
                        break;
                }
                walker.options.goChildren = go;
                return ast;
            }

            getAstWalkerFactory().walk(funcDecl.bod, preFindSuperCall);

            return foundSuper;
        }

        private baseListPrivacyErrorReporter(bases: ASTList, i: number, declSymbol: Symbol, extendsList: boolean, typeName: string, isModuleName: boolean) {
            var baseSymbol = bases.members[i].type.symbol;
            var declTypeString = (declSymbol.declAST.nodeType == NodeType.InterfaceDeclaration) ? "interface" : "class";
            var baseListTypeString = extendsList ? "extends" : "implements";
            var baseTypeString = (baseSymbol.declAST.nodeType == NodeType.InterfaceDeclaration) ? "interface" : "class";
            var typestring = "";
            if (isModuleName) {
                var quotestring = "";
                if (!isQuoted(typeName)) {
                    quotestring = "'";
                }
                typestring = " is using inaccessible module ";
                baseTypeString = " " + baseTypeString + " from private module " + quotestring + typeName + quotestring;
            } else {
                baseTypeString = " private " + baseTypeString + " '" + typeName + "'";
            }
            this.checker.errorReporter.simpleError(bases.members[i], "exported " + declTypeString + " '" + declSymbol.name + "' " + baseListTypeString + baseTypeString);
        }

        // Check if declSymbol can satisfy baselist privacy
        private typeCheckBaseListPrivacy(bases: ASTList, declSymbol: Symbol, extendsList: boolean) {
            if (bases) {
                var basesLen = bases.members.length;
                for (var i = 0; i < basesLen; i++) {
                    if (!bases.members[i].type || bases.members[i].type == this.checker.anyType) {
                        // This type is coming from external module so it has to be exported, or we're recovering from an
                        // error condition
                        continue;
                    }

                    this.checkSymbolPrivacy(bases.members[i].type.symbol, declSymbol, (typeName: string, isModuleName: boolean) => this.baseListPrivacyErrorReporter(bases, i, declSymbol, extendsList, typeName, isModuleName));
                }
            }
        }

        // Checks if the privacy is satisfied by typeSymbol that is used in the declaration inside container
        private checkSymbolPrivacy(typeSymbol: TypeSymbol, declSymbol: Symbol, errorCallback: (typeName: string, isModuleName: boolean) => void ) {
            var externalModuleSymbol: TypeSymbol = null;
            var declSymbolPath: Symbol[] = null;

            // Type is visible type, so this can be used by anyone.
            if (typeSymbol.isExternallyVisible(this.checker)) {
                // Symbol could be from external module, go ahead and find the external module
                var typeSymbolPath = typeSymbol.pathToRoot();
                declSymbolPath = declSymbol.pathToRoot();
                var typeSymbolLength = typeSymbolPath.length;
                var declSymbolPathLength = declSymbolPath.length;

                if (typeSymbolLength > 0) {
                    if (typeSymbolPath[typeSymbolLength - 1].getType().isModuleType() &&
                        (<TypeSymbol>typeSymbolPath[typeSymbolLength - 1]).isDynamic &&
                        typeSymbolPath[typeSymbolLength - 1] != declSymbolPath[declSymbolPathLength - 1]) {
                        // Symbol from external module that was imported using one of the import statement
                        externalModuleSymbol = <TypeSymbol>typeSymbolPath[typeSymbolLength - 1];
                    } else if (typeSymbolLength > 1) {
                        // Is symbol from declared quoted module
                        if (typeSymbolPath[typeSymbolLength - 2].getType().isModuleType() &&
                            (<TypeSymbol>typeSymbolPath[typeSymbolLength - 2]).isDynamic &&
                            (declSymbolPathLength == 1 || typeSymbolPath[typeSymbolLength - 2] != declSymbolPath[declSymbolPathLength - 2])) {
                            // From quoted module name
                            externalModuleSymbol = <TypeSymbol>typeSymbolPath[typeSymbolLength - 2];
                        }
                    }
                }

                if (externalModuleSymbol == null) {
                    return;
                }
            }

            // Interface symbol doesn't reflect correct Exported state so use AST instead
            var interfaceDecl: InterfaceDeclaration = declSymbol.getInterfaceDeclFromSymbol(this.checker);
            if (interfaceDecl && !hasFlag(interfaceDecl.varFlags, VarFlags.Exported)) {
                return;
            }

            var checkVisibilitySymbol = declSymbol;
            // Var decl symbol doesnt reflect correct exported state so use AST instead
            var varDecl = declSymbol.getVarDeclFromSymbol();
            if (varDecl) {
                if (hasFlag(varDecl.varFlags, VarFlags.Private)) {
                    return;
                } else if (hasFlag(varDecl.varFlags, VarFlags.Public)) {
                    // Its a member from class so check visibility of its container
                    checkVisibilitySymbol = declSymbol.container;
                }
            }

            // If the container is visible from global scrope it is error
            if (checkVisibilitySymbol.isExternallyVisible(this.checker)) {
                var privateSymbolName = typeSymbol.name;

                // If imported typeSymbol mark it as visible externally and verify that the symbol it imports is visible externally
                if (externalModuleSymbol != null) {
                    var prettyName = externalModuleSymbol.getPrettyNameOfDynamicModule(declSymbolPath);
                    if (prettyName != null) {
                        this.currentScript.AddExternallyVisibleImportedSymbol(prettyName.symbol, this.checker);
                        return;
                    } else {
                        privateSymbolName = externalModuleSymbol.prettyName;
                    }
                }

                // Visible declaration using non visible type.
                errorCallback(privateSymbolName, typeSymbol.name != privateSymbolName);
            }
        }

        // Checks if the privacy is satisfied by type that is used in the declaration inside container
        private checkTypePrivacy(type: Type, declSymbol: Symbol, errorCallback: (typeName: string, isModuleName : boolean) =>void ) {
            // Primitive types
            if (!(type && type.primitiveTypeClass == Primitive.None)) {
                return;
            }


            // If type is array, check element type
            if (type.isArray()) {
                return this.checkTypePrivacy(type.elementType, declSymbol, errorCallback);
            }

            // Going to be printing symbol name, verify if symbol can be emitted
            if (type.symbol && type.symbol.name && type.symbol.name != "_anonymous" &&
                        (((type.call == null) && (type.construct == null) && (type.index == null)) ||
                        (type.members && (!type.isClass())))) {
                return this.checkSymbolPrivacy(<TypeSymbol>type.symbol, declSymbol, errorCallback);
            }

            if (type.members) {
                // Verify symbols for members
                type.members.allMembers.map((key, s, unused) => {
                    var sym = <Symbol>s;
                    if (!hasFlag(sym.flags, SymbolFlags.BuiltIn)) {
                        this.checkTypePrivacy(sym.getType(), declSymbol, errorCallback);
                    }
                }, null);
            }

            this.checkSignatureGroupPrivacy(type.call, declSymbol, errorCallback);
            this.checkSignatureGroupPrivacy(type.construct, declSymbol, errorCallback);
            this.checkSignatureGroupPrivacy(type.index, declSymbol, errorCallback);
        }

        // Checks if the privacy is satisfied by typeSymbol that is used in the declaration inside container
        private checkSignatureGroupPrivacy(sgroup: SignatureGroup, declSymbol: Symbol, errorCallback: (typeName: string, isModuleName : boolean) =>void ) {
            if (sgroup) {
                var len = sgroup.signatures.length;
                for (var i = 0; i < sgroup.signatures.length; i++) {
                    var signature = sgroup.signatures[i];
                    if (len > 1 && signature == sgroup.definitionSignature) {
                        // In case of overloads don't look up for overload defintion types.
                        continue;
                    }

                    if (signature.returnType) {
                        this.checkTypePrivacy(signature.returnType.type, declSymbol, errorCallback);
                    }

                    var paramLen = signature.parameters.length;
                    for (var j = 0; j < paramLen; j++) {
                        var param = signature.parameters[j];
                        this.checkTypePrivacy(param.getType(), declSymbol, errorCallback);
                    }
                }
            }
        }

        private functionArgumentPrivacyErrorReporter(funcDecl: FuncDecl, p: number, paramSymbol: Symbol, typeName: string, isModuleName: boolean) {
            var isGetter = funcDecl.isAccessor() && hasFlag(funcDecl.fncFlags, FncFlags.GetAccessor);
            var isSetter = funcDecl.isAccessor() && hasFlag(funcDecl.fncFlags, FncFlags.SetAccessor);
            var isPublicFunc = hasFlag(funcDecl.fncFlags, FncFlags.Public);
            var isContainerInterface = funcDecl.type.symbol.getInterfaceDeclFromSymbol(this.checker) != null;
            var typestring = "";
            if (isModuleName) {
                var quotestring = "";
                if (!isQuoted(typeName)) {
                    quotestring = "'";
                }
                typestring = " is using inaccessible module " + quotestring + typeName + quotestring;
            } else {
                typestring = " has or is using private type '" + typeName + "'";
            }

            if (!isContainerInterface) {
                if (funcDecl.isConstructor) {
                    this.checker.errorReporter.simpleError(funcDecl.arguments.members[p], "exported class's constructor parameter '" + paramSymbol.name + "'" + typestring);
                } else if (isSetter) {
                    this.checker.errorReporter.simpleError(funcDecl.arguments.members[p], (isPublicFunc ? "public" : "exported") + " setter parameter '" + paramSymbol.name + "'" + typestring);
                } else if (!isGetter) {
                    this.checker.errorReporter.simpleError(funcDecl.arguments.members[p], (isPublicFunc ? "public" : "exported") + " function parameter '" + paramSymbol.name + "'" + typestring);
                }
            } else {
                if (funcDecl.isConstructMember()) {
                    this.checker.errorReporter.simpleError(funcDecl.arguments.members[p], "exported interface's constructor parameter '" + paramSymbol.name + "'" + typestring);
                } else if (funcDecl.isCallMember()) {
                    this.checker.errorReporter.simpleError(funcDecl.arguments.members[p], "exported interface's call parameter '" + paramSymbol.name + "'" + typestring);
                } else if (!funcDecl.isIndexerMember()) {
                    this.checker.errorReporter.simpleError(funcDecl.arguments.members[p], "exported interface's function parameter '" + paramSymbol.name + "'" + typestring);
                }
            }
        }

        private returnTypePrivacyError(astError: AST, funcDecl: FuncDecl, typeName: string, isModuleName: boolean) {
            var isGetter = funcDecl.isAccessor() && hasFlag(funcDecl.fncFlags, FncFlags.GetAccessor);
            var isSetter = funcDecl.isAccessor() && hasFlag(funcDecl.fncFlags, FncFlags.SetAccessor);
            var isPublicFunc = hasFlag(funcDecl.fncFlags, FncFlags.Public);
            var isContainerInterface = funcDecl.type.symbol.getInterfaceDeclFromSymbol(this.checker) != null;
            var typestring = "";
            if (isModuleName) {
                var quotestring = "";
                if (!isQuoted(typeName)) {
                    quotestring = "'";
                }
                typestring = " is using inaccessible module " + quotestring + typeName + quotestring;
            } else {
                typestring = " has or is using private type '" + typeName + "'";
            }
            if (!isContainerInterface) {
                if (isGetter) {
                    this.checker.errorReporter.simpleError(astError, (isPublicFunc ? "public" : "exported") + " getter return type" + typestring);
                } else if (!isSetter) {
                    this.checker.errorReporter.simpleError(astError, (isPublicFunc ? "public" : "exported") + " function return type" + typestring);
                }
            } else {
                if (funcDecl.isConstructMember()) {
                    this.checker.errorReporter.simpleError(astError, "exported interface's constructor return type" + typestring);
                } else if (funcDecl.isCallMember()) {
                    this.checker.errorReporter.simpleError(astError, "exported interface's call return type" + typestring);
                } else if (funcDecl.isIndexerMember()) {
                    this.checker.errorReporter.simpleError(astError, "exported interface's indexer return type" + typestring);
                } else {
                    this.checker.errorReporter.simpleError(astError, "exported interface's function return type" + typestring);
                }
            }
        }

        private functionReturnTypePrivacyErrorReporter(funcDecl: FuncDecl, signature: Signature, typeName: string, isModuleName: boolean) {
            var reportOnFuncDecl = false;

            // Error coming from return annotation
            if (funcDecl.returnTypeAnnotation != null &&
                funcDecl.returnTypeAnnotation.type == signature.returnType.type) {
                this.returnTypePrivacyError(funcDecl.returnTypeAnnotation, funcDecl, typeName, isModuleName);
            }

            // Check if return statement's type matches the one that we concluded
            for (var i = 0; i < funcDecl.returnStatementsWithExpressions.length; i++) {
                if (funcDecl.returnStatementsWithExpressions[i].type == signature.returnType.type) {
                    this.returnTypePrivacyError(funcDecl.returnStatementsWithExpressions[i], funcDecl, typeName, isModuleName);
                } else {
                    reportOnFuncDecl = true;
                }
            }

            if (reportOnFuncDecl) {
                // Show on function decl
                this.returnTypePrivacyError(funcDecl, funcDecl, typeName, isModuleName);
            }
        }

        public typeCheckFunction(funcDecl: FuncDecl): FuncDecl {
            this.nestingLevel = 0;
            var fnType = funcDecl.type;

            var fgSym = fnType.symbol;
            var signature = funcDecl.signature;

            if (this.checker.typeStatusIsFinished(signature.typeCheckStatus)) {
                return funcDecl;
            }
            else if (signature.typeCheckStatus == TypeCheckStatus.Started) {
                if (!funcDecl.returnTypeAnnotation &&
                    funcDecl.bod &&
                       !funcDecl.isSignature() &&
                       !(funcDecl.isConstructor) &&
                       this.allReturnsAreVoid(funcDecl)) {

                    signature.returnType.type = this.voidType;
                    return funcDecl;
                }
                else {
                    if (funcDecl.returnTypeAnnotation == null) {
                        if (this.checker.styleSettings.implicitAny) {
                            this.checker.errorReporter.styleError(funcDecl, "type implicitly set to 'any'");
                        }
                        signature.returnType.type = this.anyType;
                        fgSym.flags |= SymbolFlags.RecursivelyReferenced;
                    }
                    return funcDecl;
                }
            }

            signature.typeCheckStatus = TypeCheckStatus.Started;
            this.checker.addStartedPTO(signature);
            var prevScope = this.scope;
            var prevFnc = this.thisFnc;
            var prevMethodStatus = this.enclosingFncIsMethod;
            var prevClassNode = this.thisClassNode;
            this.enclosingFncIsMethod = funcDecl.isMethod() || funcDecl.isConstructor;
            this.thisFnc = funcDecl;
            var container = funcDecl.type.symbol;
            var prevThisType = this.thisType;
            var prevLocationInfo = this.checker.locationInfo;
            var funcTable: IHashTable = null;
            var acceptedContextualType = false;
            var targetParams: ParameterSymbol[] = null;
            var targetReturnType: Type = null;
            var isGetter = funcDecl.isAccessor() && hasFlag(funcDecl.fncFlags, FncFlags.GetAccessor);
            var isSetter = funcDecl.isAccessor() && hasFlag(funcDecl.fncFlags, FncFlags.SetAccessor);
            var accessorType: Type = (isGetter || isSetter) && funcDecl.accessorSymbol ? funcDecl.accessorSymbol.getType() : null;
            var prevModDecl = this.checker.currentModDecl;

            if (funcDecl.isConstructor && !funcDecl.isOverload) {
                if (fnType.instanceType == null) {
                    this.checker.errorReporter.simpleError(funcDecl, "Malformed function body (is this a class named the same as an existing interface?)");
                    return funcDecl;
                }

                this.scope = fnType.instanceType.constructorScope;
                var ssb = <SymbolScopeBuilder>this.scope;
                funcTable = ssb.valueMembers.allMembers;
            }
            else if ((funcDecl.isSpecialFn() && !(funcDecl.fncFlags & FncFlags.Signature)) || funcDecl.isOverload) {
                funcTable = funcDecl.symbols;
                // if the function is static, we just want to use the 
                // current scope
                if (!hasFlag(funcDecl.fncFlags, FncFlags.Static) && fnType.containedScope) {
                    this.scope = fnType.containedScope;
                }
            }
            else {
                if (funcDecl.bod) {
                    this.scope = fnType.containedScope;
                }
                var ssb = <SymbolScopeBuilder>this.scope;

                // If it is null, it's an ambient declaration with no body, so it doesn't strictly matter
                // if funcTable is not set
                if (ssb && ssb.valueMembers) {
                    funcTable = ssb.valueMembers.allMembers;
                }
            }

            // If it's a class constructor, we need to check for the presence (or absense) of calls
            // to the 'super' constructor
            //
            // A super constructor call must exist if:
            //  - the class has a base class
            //
            // A super constructor call must be the first statement in the function body if:
            //  - the constructor has parameter properties or
            //  - the class body has initialized property decls
            //
            // A super constructor call may not exist if:
            //  - The class has no base type, or inherits directly from 'Object'
            if (funcDecl.isConstructor && funcDecl.bod && hasFlag(funcDecl.fncFlags, FncFlags.ClassMethod)) {

                var hasBaseType = hasFlag(funcDecl.classDecl.type.instanceType.typeFlags, TypeFlags.HasBaseType);
                var noSuperCallAllowed = !hasBaseType || hasFlag(funcDecl.classDecl.type.instanceType.typeFlags, TypeFlags.HasBaseTypeOfObject);
                var superCallMustBeFirst = hasFlag((<ClassDeclaration>funcDecl.classDecl).varFlags, VarFlags.ClassSuperMustBeFirstCallInConstructor);

                if (noSuperCallAllowed && this.classConstructorHasSuperCall(funcDecl)) {
                    this.checker.errorReporter.simpleError(funcDecl, "Calls to 'super' constructor are not allowed in classes that either inherit directly from 'Object' or have no base class");
                }
                else if (hasBaseType) {
                    if (superCallMustBeFirst) {
                        if (!funcDecl.bod ||
                            !funcDecl.bod.members.length ||
                            !((funcDecl.bod.members[0].nodeType == NodeType.Call && (<CallExpression>funcDecl.bod.members[0]).target.nodeType == NodeType.Super) ||
                            (hasFlag(funcDecl.bod.flags, ASTFlags.StrictMode) && funcDecl.bod.members.length > 1 &&
                             funcDecl.bod.members[1].nodeType == NodeType.Call && (<CallExpression>funcDecl.bod.members[1]).target.nodeType == NodeType.Super))) {
                            this.checker.errorReporter.simpleError(funcDecl, "If a derived class contains initialized properties or constructor parameter properties, the first statement in the constructor body must be a call to the super constructor");
                        }
                    }
                    else if (!this.classConstructorHasSuperCall(funcDecl)) {
                        this.checker.errorReporter.simpleError(funcDecl, "Constructors for derived classes must contain a call to the class's 'super' constructor");
                    }
                }
            }

            // If we've typechecked this method "out of order" (not by walking the class, but through a method call somewhere else),
            // we need to reset the current class node in question, so that visibility checks on class members don't fail
            if (funcDecl.isMethod() && funcDecl.type.enclosingType) {

                var enclosingClassNode: TypeDeclaration = null;

                if (funcDecl.type.enclosingType.symbol.declAST.nodeType == NodeType.FuncDecl) {
                    enclosingClassNode = <TypeDeclaration>(<FuncDecl>funcDecl.type.enclosingType.symbol.declAST).classDecl;
                }
                else if (funcDecl.type.enclosingType.symbol.declAST.nodeType == NodeType.ClassDeclaration) {
                    enclosingClassNode = <TypeDeclaration>funcDecl.type.enclosingType.symbol.declAST;
                }

                if (enclosingClassNode) {
                    this.thisClassNode = enclosingClassNode;
                }
            }

            // if this function is contained in a module, we may be in the midst of a recursive typecheck operation
            // should that be the case, we need to properly set the current module (for visibility tests)
            if (fnType.enclosingType) {;
                var enclosingSym = fnType.symbol.container;

                // if the enclosing type is a class, grab the parent module
                if (enclosingSym && enclosingSym.isType() && enclosingSym.getType().isClass()) {
                    enclosingSym = enclosingSym.container;
                }

                if (enclosingSym && enclosingSym.declAST && enclosingSym.declAST.nodeType == NodeType.ModuleDeclaration) {
                    this.checker.currentModDecl = <ModuleDeclaration>enclosingSym.declAST;
                }
            }

            if (funcDecl.unitIndex > 0) {
                if (this.checker.units &&
                    (funcDecl.unitIndex < this.checker.units.length)) {
                    this.checker.locationInfo = this.checker.units[funcDecl.unitIndex];
                }
                else {
                    this.checker.locationInfo = unknownLocationInfo;
                }
            }

            if (fnType.enclosingType) {
                this.thisType = fnType.enclosingType;
            }
            else {
                this.thisType = prevThisType;
            }

            var paramLen = signature.parameters.length;

            if (!funcDecl.isConstructor && funcDecl.bod && !funcDecl.isSignature()) {
                var tmpParamScope = this.scope;
                var ssb = <SymbolScopeBuilder>this.scope;

                // Attempt to contextually type the function declaration             
                if (!funcDecl.isMethod() && funcDecl.returnTypeAnnotation == null) {

                    // the funcDecl may be a candidate for contextual typing                 
                    // REVIEW: prevScope will only be null in the case of an upstream error
                    if (prevScope && funcDecl.name && !funcDecl.name.isMissing()) {
                        // Go ahead and check for an ambient symbol
                        var considerSym: Symbol = prevScope.findAmbient(funcDecl.name.text, false, false);

                        if (considerSym && considerSym.declAST && considerSym.declAST.type) {
                            // REVIEW: Ambients beget signatures, and signatures don't need to be typechecked
                            //typeCheck(considerSym.declAST);
                            this.checker.setContextualType(considerSym.declAST.type, false);
                        }
                    }

                    if (this.checker.hasTargetType()) {
                        var candidateTypeContext = this.checker.getTargetTypeContext();
                        var candidateType = candidateTypeContext.contextualType;

                        if (this.checker.canContextuallyTypeFunction(candidateType, funcDecl, true)) {

                            // Safe to do this, since the indices and fields are guaranteed to be
                            // non-null and valid by the above call to canContextuallyTypeFunction
                            var candidateSigs = candidateType.construct ? candidateType.construct : candidateType.call;
                            candidateTypeContext.targetSig = candidateSigs.signatures[0];
                            var candidateParams = candidateTypeContext.targetSig.parameters;

                            // the target type has been accepted
                            targetParams = candidateParams;
                            targetReturnType = candidateTypeContext.targetSig.returnType.type;

                            // Set "this" if applicable
                            if (candidateTypeContext.targetSig.declAST) {
                                if (candidateTypeContext.targetSig.declAST.isConstructor) {
                                    //candidateTypeContext.targetThis=candidateType.instanceType;
                                    //this.thisType = candidateType.instanceType;
                                    funcDecl.isTargetTypedAsMethod = true;
                                }
                                else if (candidateTypeContext.targetSig.declAST.isMethod()) {
                                    //candidateTypeContext.targetThis=candidateTypeContext.targetSig.declAST.type.enclosingType;
                                    //this.thisType = candidateTypeContext.targetSig.declAST.type.enclosingType;
                                    funcDecl.isTargetTypedAsMethod = true;
                                }
                            }
                            fgSym.type = candidateTypeContext.contextualType;
                            acceptedContextualType = true;
                        }
                        else if (candidateType && funcDecl.isAccessor()) {
                            accessorType = candidateType;
                            candidateTypeContext.targetAccessorType = accessorType;
                        }
                        else {
                            this.checker.killCurrentContextualType();
                        }
                    }
                }

                // typecheck parameters
                // Add parameter symbols to current scope for typechecking (in case default params reference each other)
                // Order matters here - default parameters can reference previously defined parameters
                var paramTable = ssb.valueMembers;
                this.scope = new SymbolScopeBuilder(paramTable, null, null, null, prevScope, container);

                for (var p = 0; p < paramLen; p++) {
                    var symbol = signature.parameters[p];
                    var ast = <ArgDecl>symbol.declAST

                    if (this.checker.hasTargetType() && (targetParams && (this.checker.getTargetTypeContext().targetSig.hasVariableArgList || p < targetParams.length))) {
                        var candidateTypeContext = this.checker.getTargetTypeContext();
                        var hasVarArgList = candidateTypeContext.targetSig.hasVariableArgList;
                        ast.type = hasVarArgList && p >= targetParams.length - 1 ? targetParams[targetParams.length - 1].getType().elementType : targetParams[p].getType();
                        ast.sym.setType(ast.type);
                        (<InferenceSymbol>ast.sym).typeCheckStatus = this.checker.getTypeCheckFinishedStatus();
                    }
                    else {
                        this.typeCheck(ast);
                    }

                    // infer the setter type, if necessary
                    if (isSetter && accessorType) {
                        ast = <ArgDecl>this.cast(ast, accessorType);
                    }

                    symbol.container = container;
                    // Verify the parameter for the privacy
                    this.checkTypePrivacy(symbol.getType(), container, (typeName: string, isModuleName: boolean) => this.functionArgumentPrivacyErrorReporter(funcDecl, p, symbol, typeName, isModuleName));
                    paramTable.publicMembers.add(symbol.name, symbol);
                }
                this.scope = tmpParamScope;
            }
            else {
                this.typeCheck(funcDecl.arguments)

                // Because some terms were not yet type-checkable during binding, ensure that
                // param symbols are updated with the proper argument types
                for (var p = 0; p < paramLen; p++) {
                    signature.parameters[p].parameter.typeLink.type = funcDecl.arguments.members[p].type;
                    // Verify the parameter for the privacy
                    this.checkTypePrivacy(signature.parameters[p].getType(), container, (typeName: string, isModuleName: boolean) => this.functionArgumentPrivacyErrorReporter(funcDecl, p, signature.parameters[p], typeName, isModuleName));
                    if ((<ArgDecl>funcDecl.arguments.members[p]).parameterPropertySym) {
                        (<ArgDecl>funcDecl.arguments.members[p]).parameterPropertySym.setType(funcDecl.arguments.members[p].type);
                    }
                }

                if ((funcDecl.fncFlags & FncFlags.IndexerMember)) {
                    if (!paramLen || paramLen > 1) {
                        this.checker.errorReporter.simpleError(funcDecl, "Index signatures may take one and only one parameter");
                    }
                    else if (funcDecl.arguments.members[0].type == this.checker.numberType) {
                        fnType.index.flags |= SignatureFlags.IsNumberIndexer;
                    }
                    else if (funcDecl.arguments.members[0].type == this.checker.stringType) {
                        fnType.index.flags |= SignatureFlags.IsStringIndexer;
                    }
                    else {
                        this.checker.errorReporter.simpleError(funcDecl.arguments.members[0], "Index signatures may only take 'string' or 'number' as their parameter");
                    }

                }
            }

            // typecheck body
            if (funcDecl.bod && (!funcDecl.isSignature())) {
                if (!(funcDecl.isConstructor)) {
                    this.addFormals(container, signature, funcTable);
                }
                else {
                    this.addConstructorLocalArgs(funcDecl.type.symbol, funcDecl.arguments, funcTable, hasFlag(funcDecl.fncFlags, FncFlags.ClassMethod));

                    if (this.thisClassNode && this.thisClassNode.extendsList) {
                        var tmpScope = this.scope;
                        var funcMembers = new ScopedMembers(<DualStringHashTable>funcTable);
                        this.scope = new FilteredSymbolScopeBuilder(funcMembers, prevScope, funcDecl.type.symbol,
                                                             function (sym) {
                                                                 return sym.kind() == SymbolKind.Parameter;
                                                             });
                        this.typeCheckBaseCalls(this.thisClassNode.extendsList);
                        this.scope = tmpScope;
                    }
                }

                // Because this function may have been typechecked in a different visiblity context as its caller (e.g., this
                // function is being typechecked as a result of a call, before the declaration could be typechecked), we need
                // to set the enclosing module
                var prevMod = this.checker.currentModDecl;
                if (funcDecl.type &&
                    funcDecl.type.symbol &&
                    !funcDecl.isMethod() &&
                    funcDecl.type.symbol.declModule) {
                    this.checker.currentModDecl = funcDecl.type.symbol.declModule;
                }


                // unset the contextual type before typechecking the function body
                if (acceptedContextualType) {
                    this.checker.setContextualType(null, this.checker.inProvisionalTypecheckMode());
                }

                this.typeCheck(funcDecl.bod);

                if (acceptedContextualType) {
                    this.checker.unsetContextualType();
                }

                this.checker.currentModDecl = prevMod;

                if (this.checker.checkControlFlow) {
                    var cfg = funcDecl.buildControlFlow();
                    if (this.checker.printControlFlowGraph) {
                        cfg.print(this.checker.errorReporter.outfile);
                    }
                    cfg.reportUnreachable(this.checker.errorReporter);
                    if (this.checker.checkControlFlowUseDef) {
                        cfg.useDef(this.checker.errorReporter, funcDecl.type.symbol);
                    }
                }

                if (funcDecl.isConstructor) {
                    var fns: ASTList = funcDecl.scopes;
                    var fnsLen = fns.members.length;
                    var freeVars: Symbol[];
                    var sym: Symbol;
                    var j = 0;
                    for (; j < fnsLen; j++) {
                        var fn = <FuncDecl>fns.members[j];
                        if (!fn.isSignature()) {
                            if (hasFlag(fn.fncFlags, FncFlags.Method) && (!hasFlag(fn.fncFlags, FncFlags.Static))) {
                                this.checkPromoteFreeVars(fn, funcDecl.type.symbol);
                            }
                        }
                    }
                }
            }

            this.scope = prevScope;
            this.thisFnc = prevFnc;
            this.thisClassNode = prevClassNode;
            this.enclosingFncIsMethod = prevMethodStatus;
            this.thisType = prevThisType;
            this.checker.locationInfo = prevLocationInfo;
            this.checker.currentModDecl = prevModDecl;

            signature.typeCheckStatus = this.checker.getTypeCheckFinishedStatus();

            // set the return type
            if (funcDecl.returnTypeAnnotation) {
                this.checkForVoidConstructor(funcDecl.returnTypeAnnotation.type, funcDecl.returnTypeAnnotation);

                if (signature.returnType.type == null) {
                    this.checker.resolveTypeLink(this.scope, signature.returnType, false);
                }
            }
            else if (targetReturnType) {
                signature.returnType.type = targetReturnType;
            }

            // If no return type annotation has been applied to the function declaration
            // unify the return types from the given return statements

            if (!(fgSym.flags & SymbolFlags.RecursivelyReferenced) && funcDecl.returnStatementsWithExpressions.length > 0) {
                var collection: ITypeCollection = {
                    getLength: () => { return funcDecl.returnStatementsWithExpressions.length; },
                    setTypeAtIndex: (index: number, type: Type) => { funcDecl.returnStatementsWithExpressions[index].type = type; },
                    getTypeAtIndex: (index: number) => { return funcDecl.returnStatementsWithExpressions[index].type; }
                }

                var bestCommonReturnType = funcDecl.returnStatementsWithExpressions[0].type;
                bestCommonReturnType = this.checker.findBestCommonType(bestCommonReturnType, null, collection, true);

                if (bestCommonReturnType) {
                    signature.returnType.type = this.checker.widenType(bestCommonReturnType);
                }
                else {
                    for (var i = 0; i < funcDecl.returnStatementsWithExpressions.length; i++) {
                        this.checker.errorReporter.simpleError(funcDecl.returnStatementsWithExpressions[i], "Incompatible return type");
                    }
                    signature.returnType.type = this.anyType;
                }
            }

            var onlyHasThrow = false;

            if (signature.returnType.type == null) {
                if (hasFlag(funcDecl.fncFlags, FncFlags.HasReturnExpression)) {
                    if (this.checker.styleSettings.implicitAny) {
                        this.checker.errorReporter.styleError(funcDecl, "type implicitly set to 'any'");
                    }
                    signature.returnType.type = this.anyType;
                }
                else {
                    signature.returnType.type = this.voidType;
                }
            }
            else if (signature.returnType.type == this.nullType || signature.returnType.type == this.checker.undefinedType) {
                signature.returnType.type = this.anyType;
            }
            else if ((signature.returnType.type != this.voidType && signature.returnType.type != this.checker.undefinedType && signature.returnType.type != this.anyType)) {
                // the signature declared a non-void type, but there's no return statement
                if (!funcDecl.isSignature() &&
                    !funcDecl.isConstructor &&
                    !hasFlag(funcDecl.fncFlags, FncFlags.HasReturnExpression) &&
                    !hasFlag(funcDecl.fncFlags, FncFlags.IsFatArrowFunction)) {
                        // relax the restriction if the method only contains a single "throw" statement
                    onlyHasThrow = (funcDecl.bod.members.length > 0) && (funcDecl.bod.members[0].nodeType == NodeType.Throw)

                    if (!onlyHasThrow) {
                        this.checker.errorReporter.simpleError(funcDecl.returnTypeAnnotation || funcDecl,
                             "Function declared a non-void return type, but has no return expression");
                    }
                }

                // Type check for return type Privacy
                this.checkTypePrivacy(signature.returnType.type, container, (typeName: string, isModuleName: boolean) => this.functionReturnTypePrivacyErrorReporter(funcDecl, signature, typeName, isModuleName));
            }

            // if the function declaration is a getter or a setter, set the type of the associated getter/setter symbol
            if (funcDecl.accessorSymbol) {
                var accessorType = funcDecl.accessorSymbol.getType();
                if (!onlyHasThrow && hasFlag(funcDecl.fncFlags, FncFlags.GetAccessor) && !hasFlag(funcDecl.fncFlags, FncFlags.HasReturnExpression)) {
                    this.checker.errorReporter.simpleError(funcDecl, "Getters must return a value");
                }
                if (accessorType) {
                    if ((hasFlag(funcDecl.fncFlags, FncFlags.GetAccessor) && accessorType != signature.returnType.type) ||
                        (funcDecl.arguments.members.length > 0 && accessorType != funcDecl.arguments.members[0].type)) {
                        this.checker.errorReporter.simpleError(funcDecl, "Getter and setter types do not agree");
                    }
                }
                else {
                    if (hasFlag(funcDecl.fncFlags, FncFlags.GetAccessor)) {
                        funcDecl.accessorSymbol.setType(signature.returnType.type);
                    }
                    else {
                        if (funcDecl.arguments.members.length != 1) {
                            this.checker.errorReporter.simpleError(funcDecl, "Setters may have one and only one argument");
                        }
                        else {
                            funcDecl.accessorSymbol.setType(funcDecl.arguments.members[0].type);
                        }
                    }
                }
            }

            this.typeCheckOverloadSignatures(fnType, funcDecl);
            return funcDecl;
        }

        public typeCheckBases(type: Type) {
            var seenInterface = false;
            var bases = type.extendsList;
            var baseLinks = type.extendsTypeLinks;
            if (bases) {
                var len = bases.length;

                if (len > 0) {
                    type.typeFlags |= TypeFlags.HasBaseType;
                }

                for (var i = 0; i < len; i++) {
                    if (bases[i] == this.checker.anyType) {
                        // This may be the type from imported module and hence the type was not really resolved to the correct one.
                        // Try resolving it again
                        baseLinks[i].type = null;
                        // There are no contextual errors when trying to verify the base class
                        var oldErrors = this.checker.errorReporter.getCapturedErrors();
                        CompilerDiagnostics.assert(oldErrors.length == 0, "There shouldnt be any contextual errors when typechecking base type names");
                        this.checker.errorReporter.pushToErrorSink = true;
                        bases[i] = this.checker.resolveBaseTypeLink(baseLinks[i], type.containedScope);
                        this.checker.errorReporter.pushToErrorSink = false;
                        this.checker.errorReporter.freeCapturedErrors();
                    }

                    var base = bases[i];
                    var baseRef = baseLinks[i].ast;

                    // make sure it's the global 'Object' and not some alias
                    var baseTypeOfObject = base.symbol && base.symbol.name == "Object" && base.symbol.container == this.checker.gloMod;

                    if (baseTypeOfObject) {
                        type.typeFlags |= TypeFlags.HasBaseTypeOfObject;
                    }

                    if (base.isClassInstance()) {
                        if (!(type.isClassInstance())) {
                            this.checker.errorReporter.simpleError(baseRef, "Interface base type must be interface");
                        }
                        else {
                            if (seenInterface) {
                                this.checker.errorReporter.simpleError(baseRef, "Class may not follow interface as base type");
                            }
                        }
                    }
                    else if (base.isModuleType()) {
                        this.checker.errorReporter.simpleError(baseRef, "Types may not be derived from module types");
                    }
                    else if (base.members) {
                        if (!seenInterface) {
                            seenInterface = true;
                        }
                    }
                    else {
                        if (!(type.isClassInstance())) {
                            this.checker.errorReporter.simpleError(baseRef,
                                                                     "Interface base type must be interface");
                        }
                        else {
                            this.checker.errorReporter.simpleError(baseRef,
                                                                     "Base type must be interface or class");
                        }
                        break;
                    }
                }
            }
        }

        public checkMembersImplementInterfaces(implementingType: Type) {
            var instanceType = implementingType.getInstanceType();
            if (instanceType.implementsList) {
                var len = instanceType.implementsList.length;

                for (var i = 0; i < len; i++) {
                    var interfaceType = instanceType.implementsList[i];
                    var comparisonInfo = new TypeComparisonInfo();
                    if (!this.checker.sourceIsSubtypeOfTarget(instanceType, interfaceType, comparisonInfo)) {
                        var emsg = "Class '" + instanceType.getTypeName() +
                              "' declares interface '" + interfaceType.getTypeName() +
                              "' but does not implement it";
                        if (!comparisonInfo.message) {
                            this.checker.errorReporter.simpleErrorFromSym(instanceType.symbol, emsg);
                        }
                        else {
                            this.checker.errorReporter.simpleErrorFromSym(instanceType.symbol, emsg + ": " + comparisonInfo.message);
                        }
                    }
                }
            }
        }

        public typeCheckBaseCalls(bases: ASTList) {
            if (bases == null) {
                return;
            }
            var basesLen = bases.members.length;
            for (var i = 0; i < basesLen; i++) {
                var baseExpr = bases.members[i];
                var baseSymbol: Symbol = null;
                if (baseExpr.nodeType == NodeType.Call) {
                    this.typeCheckNew(baseExpr);
                }
            }
        }

        public assertUniqueNamesInBaseTypes(names: IHashTable, type: Type, classDecl: InterfaceDeclaration, checkUnique: boolean): void {
            if (type) {
                if (type.members) {
                    type.members.publicMembers.map((key, s, c) => {
                        var sym = <Symbol>s;
                        var dup = names.lookup(sym.name);
                        if (dup) {
                            if (checkUnique) {
                                this.checker.errorReporter.simpleError(classDecl,
                                                                  "duplicate member name in bases for " + classDecl.name.actualText + ": " + type.symbol.name + " and " + dup.container.name + " both contain member with name " + sym.name);
                            }
                        }
                        else {
                            names.add(sym.name, sym);
                        }
                    }, null);
                }
                if (type.extendsList) {
                    var len = type.extendsList.length;
                    for (var i = 0; i < len; i++) {
                        if (!(type.extendsList[i].symbol.flags & SymbolFlags.RecursivelyReferenced)) {
                            this.assertUniqueNamesInBaseTypes(names, type.extendsList[i], classDecl, checkUnique);
                        }
                    }
                }
            }
        }

        public checkBaseTypeMemberInheritance(derivedType: Type, derivedTypeDecl: AST): void {
            var instanceType = derivedType.getInstanceType();
            if (instanceType.extendsList == null) {
                return;
            }

            var len = instanceType.extendsList.length;
            if (len > 0) {
                var names = new StringHashTable();
                if (instanceType.isClassInstance()) {
                    for (var i = 0; i < len; i++) {
                        this.assertUniqueNamesInBaseTypes(names, instanceType.extendsList[i], <InterfaceDeclaration>derivedTypeDecl, i > 0);
                    }
                }

                if (instanceType.members) {
                    instanceType.members.publicMembers.map((key, s, c) => {
                        var sym = <Symbol>s;
                        for (var j = 0; j < len; j++) {
                            var base = instanceType.extendsList[j];
                            if (base.memberScope == null) {
                                this.checker.errorReporter.simpleError(derivedTypeDecl, "Base type '" + base.symbol.name + "' lacks an implementation.")
                            }
                            else {
                                var bSym = base.memberScope.find(sym.name, false, false);
                                if (bSym) {
                                    var aType = sym.getType();
                                    var bType = bSym.getType();
                                    if (!(this.checker.sourceIsSubtypeOfTarget(aType, bType))) {
                                        this.checker.errorReporter.simpleErrorFromSym(sym,
                                                                          "Type of overridden member '" + sym.name + "' is not subtype of original member defined by type '" + bSym.container.name + "'");
                                    }
                                    else if ((sym.kind() == SymbolKind.Type) &&
                                             (bSym.kind() == SymbolKind.Field)) {
                                        this.checker.errorReporter.simpleErrorFromSym(sym,
                                                                          "Cannot override field '" + sym.name + "' with method");
                                    }
                                }
                            }
                        }
                    }, null);
                }
            }
        }

        public typeCheckClass(classDecl: ClassDeclaration): ClassDeclaration {
            var typeSymbol = <TypeSymbol>classDecl.type.symbol;

            if (typeSymbol.typeCheckStatus == TypeCheckStatus.Finished) {
                return classDecl;
            }
            else if (typeSymbol.typeCheckStatus == TypeCheckStatus.Started) {
                // REVIEW: report this recursion
                //checker.errorReporter.recursionRequiresTypeAnnotation(classDecl);
                return classDecl;
            }
            else {
                typeSymbol.typeCheckStatus = TypeCheckStatus.Started;
                this.checker.addStartedPTO(typeSymbol);
            }

            var prevScope = this.scope;
            var svClassNode = this.thisClassNode;
            this.thisClassNode = classDecl;
            var classType = classDecl.type;
            this.typeCheckBases(classType.instanceType);

            this.typeCheckBaseListPrivacy(classDecl.extendsList, typeSymbol, true);
            this.typeCheckBaseListPrivacy(classDecl.implementsList, typeSymbol, false);

            var prevThisType = this.thisType;
            this.thisType = classType.instanceType;
            this.scope = classType.instanceType.containedScope;

            // Add the constructor locals, if necessary
            if (classDecl.constructorDecl) {
                this.scope = classType.instanceType.constructorScope;
                var ssb = <SymbolScopeBuilder>this.scope;
                var funcTable = ssb.valueMembers.allMembers;

                this.addConstructorLocalArgs(classDecl.constructorDecl.type.symbol, classDecl.constructorDecl.arguments, funcTable, true);
            }

            this.typeCheck(classDecl.members);
            typeSymbol.typeCheckStatus = TypeCheckStatus.Finished;
            this.checkBaseTypeMemberInheritance(classType, classDecl);
            this.checkMembersImplementInterfaces(classType);

            this.typeCheckOverloadSignatures(classType, classDecl);
            this.typeCheckOverloadSignatures(classType.instanceType, classDecl);

            // if the class has no declared constructor, adapt its base class's signature group, if necessary
            if (!classDecl.constructorDecl) {
                if (classDecl.extendsList &&
                    classDecl.extendsList.members.length &&
                    classDecl.extendsList.members[0].type &&
                    classDecl.extendsList.members[0].type.symbol.type.isClass()) {
                    cloneParentConstructGroupForChildType(classDecl.type, classDecl.extendsList.members[0].type.symbol.type);
                }
            }

            this.thisType = prevThisType;
            this.thisClassNode = svClassNode;
            this.scope = prevScope;
            return classDecl;
        }

        public typeCheckOverloadSignatures(type: Type, ast: AST) {
            if (type.call) {
                type.call.typeCheck(this.checker, ast, type.construct != null);
            }
            if (type.construct) {
                type.construct.typeCheck(this.checker, ast, false);
            }
            if (type.index) {
                type.index.typeCheck(this.checker, ast, false);
            }
        }

        public typeCheckInterface(interfaceDecl: InterfaceDeclaration): InterfaceDeclaration {
            // overloads will be typechecked inline by the members
            //this.typeCheckOverloadSignatures(interfaceDecl.type, interfaceDecl);
            this.typeCheckBases(interfaceDecl.type);
            this.typeCheckBaseListPrivacy(interfaceDecl.extendsList, interfaceDecl.type.symbol, true);
            this.typeCheck(interfaceDecl.members);
            this.checkBaseTypeMemberInheritance(interfaceDecl.type, interfaceDecl);

            // propagate base type signatures
            if (interfaceDecl.extendsList) {
                for (var i = 0; i < interfaceDecl.extendsList.members.length; i++) {
                    if (interfaceDecl.extendsList.members[i].type.call) {
                        if (interfaceDecl.type.call) {
                            interfaceDecl.type.call.signatures = interfaceDecl.type.call.signatures.concat(interfaceDecl.extendsList.members[i].type.call.signatures);
                        }
                        else {
                            interfaceDecl.type.call = interfaceDecl.extendsList.members[i].type.call;
                        }
                    }
                    if (interfaceDecl.extendsList.members[i].type.construct) {
                        if (interfaceDecl.type.construct) {
                            interfaceDecl.type.construct.signatures = interfaceDecl.type.construct.signatures.concat(interfaceDecl.extendsList.members[i].type.construct.signatures);
                        }
                        else {
                            interfaceDecl.type.construct = interfaceDecl.extendsList.members[i].type.construct;
                        }
                    }
                    if (interfaceDecl.extendsList.members[i].type.index) {
                        if (interfaceDecl.type.index) {
                            interfaceDecl.type.index.signatures = interfaceDecl.type.index.signatures.concat(interfaceDecl.extendsList.members[i].type.index.signatures);
                        }
                        else {
                            interfaceDecl.type.index = interfaceDecl.extendsList.members[i].type.index;
                        }
                    }
                }
            }

            return interfaceDecl;
        }

        public typeCheckImportDecl(importDecl: ImportDeclaration) {
            var mod: ModuleType = <ModuleType>importDecl.alias.type;
            var sym: TypeSymbol = null;
            var prevInImportTC = this.inImportTypeCheck;
            this.inImportTypeCheck = true;

            this.typeCheck(importDecl.alias);
            mod = <ModuleType>importDecl.alias.type;

            if (mod == null) {
                this.checker.errorReporter.simpleError(importDecl.alias, "Could not resolve module alias '" + importDecl.id.actualText + "'");
                mod = <ModuleType>this.checker.anyType;
                (<TypeSymbol>importDecl.id.sym).type = mod;
            }

            importDecl.id.type = mod;
            sym = mod.symbol;

            if (!mod.isModuleType()) {
                this.checker.errorReporter.simpleError(importDecl.alias, "A module cannot be aliased to a non-module type");
            }
            else {
                sym.type = mod;
                
                // Add the imported module to the AMD dependency list
                if (this.checker.typeFlow.currentScript && 
                    this.checker.typeFlow.currentScript.topLevelMod && 
                    this.checker.typeFlow.currentScript.topLevelMod.mod) 
                {
                    this.checker.typeFlow.currentScript.topLevelMod.mod.importedModules.push(importDecl);
                }

                (<TypeSymbol>importDecl.id.sym).type = mod;

                if (mod.symbol && mod.symbol.declAST) {
                    (<ModuleDeclaration>mod.symbol.declAST).modFlags &= ~ModuleFlags.ShouldEmitModuleDecl;
                }

                //importDecl.id.sym = sym;
                // REVIEW: Uncomment when you can toggle module codegen targets from the language service
                //else if (typeFlow.checker.currentModDecl == null && 
                //            hasFlag((<ModuleDecl>sym.declAST).modFlags,ModuleFlags.IsDynamic) &&
                //            moduleGenTarget == ModuleGenTarget.Asynchronous) 
                //{
                //    typeFlow.checker.errorReporter.simpleError(alias, "In AMD codegen mode, dynamic modules may not be referenced from global scope.  (Wrap the file in a module declaration.)");
                //}
            }
            this.inImportTypeCheck = prevInImportTC;
            return importDecl;
        }

        public typeCheckModule(moduleDecl: ModuleDeclaration): ModuleDeclaration {

            // In some really nasty cases of error recovery, we may not have a type
            if (!moduleDecl.mod) {
                return moduleDecl;
            }

            if (this.currentScript) {
                this.currentScript.requiresGlobal = true;
            }
            var mod = moduleDecl.mod;
            var sym: TypeSymbol = null;

            var prevScope = this.scope;
            var prevThisType = this.thisType;
            var prevCurrentModDecl = this.checker.currentModDecl;
            this.checker.currentModDecl = moduleDecl;

            this.thisType = null;
            this.scope = mod.containedScope;
            this.typeCheck(moduleDecl.members);
            sym = mod.symbol;

            this.checker.currentModDecl = prevCurrentModDecl;
            this.thisType = prevThisType;
            this.scope = prevScope;

            moduleDecl.type = mod;

            if (sym) {
                sym.typeCheckStatus = TypeCheckStatus.Finished;
            }
            return moduleDecl;
        }

        public typeCheckFor(forStmt: ForStatement): ForStatement {
            forStmt.init = this.typeCheck(forStmt.init);
            this.nestingLevel++;
            forStmt.cond = this.typeCheck(forStmt.cond);
            this.typeCheckCondExpr(forStmt.cond);
            forStmt.incr = this.typeCheck(forStmt.incr);
            this.nestingLevel--;
            forStmt.body = this.typeCheck(forStmt.body);
            this.typeCheckCompoundStmtBlock(forStmt.body, "for statement");
            forStmt.type = this.voidType;
            return forStmt;
        }

        public typeCheckWith(withStmt: WithStatement): WithStatement {
            if (this.checker.errorsOnWith) {
                this.checker.errorReporter.simpleError(withStmt.expr, "All symbols within a 'with' block will be typed as 'any'");
            }
            withStmt.expr = this.typeCheck(withStmt.expr);
            this.checker.inWith = true;
            withStmt.body = this.typeCheck(withStmt.body);
            this.typeCheckCompoundStmtBlock(withStmt.body, "with statement");
            this.checker.inWith = false;
            return withStmt;
        }

        public typeCheckForIn(forInStmt: ForInStatement): ForInStatement {
            forInStmt.obj = this.typeCheck(forInStmt.obj);
            forInStmt.lval = this.cast(this.typeCheck(forInStmt.lval), this.checker.stringType);
            if (forInStmt.lval.nodeType == NodeType.VarDecl) {

                var varDecl = <VarDecl>forInStmt.lval;
                if (varDecl.typeExpr) {
                    this.checker.errorReporter.simpleError(varDecl, "Variable declarations for for/in expressions may not contain a type annotation");
                }

                if (varDecl.sym) {
                    varDecl.sym.setType(this.checker.stringType);
                }
            }
            forInStmt.body = this.typeCheck(forInStmt.body);
            this.typeCheckCompoundStmtBlock(forInStmt.body, "for in statement");
            return forInStmt;
        }

        public typeCheckWhile(whileStmt: WhileStatement): WhileStatement {
            whileStmt.cond = this.typeCheck(whileStmt.cond);
            this.typeCheckCondExpr(whileStmt.cond);
            whileStmt.body = this.typeCheck(whileStmt.body);
            this.typeCheckCompoundStmtBlock(whileStmt.body, "while statement");
            whileStmt.type = this.voidType;
            return whileStmt;
        }

        public typeCheckDoWhile(doWhileStmt: DoWhileStatement): DoWhileStatement {
            doWhileStmt.cond = this.typeCheck(doWhileStmt.cond);
            this.typeCheckCondExpr(doWhileStmt.cond);
            doWhileStmt.body = this.typeCheck(doWhileStmt.body);
            this.typeCheckCompoundStmtBlock(doWhileStmt.body, "do while statement");
            doWhileStmt.type = this.voidType;
            return doWhileStmt;
        }

        public typeCheckCondExpr(cond: AST) {
            if (this.checker.styleSettings.assignmentInCond) {
                if ((cond !== null) &&
                    (cond.nodeType >= NodeType.Asg) &&
                    (cond.nodeType <= NodeType.LastAsg)) {
                    this.checker.errorReporter.simpleError(cond, "top-level assignment statement in conditional expression");
                }
            }
        }

        public typeCheckCompoundStmtBlock(stmts: AST, stmtType: string) {
            if (this.checker.styleSettings.blockInCompoundStmt && stmts) {
                if (stmts.nodeType != NodeType.Block) {
                    this.checker.errorReporter.styleError(stmts, stmtType + " requires a block");
                }
            }
        }
        public typeCheckIf(ifStmt: IfStatement): IfStatement {
            ifStmt.cond = this.typeCheck(ifStmt.cond);
            this.typeCheckCondExpr(ifStmt.cond);
            ifStmt.thenBod = this.typeCheck(ifStmt.thenBod);
            ifStmt.elseBod = this.typeCheck(ifStmt.elseBod);
            this.typeCheckCompoundStmtBlock(ifStmt.thenBod, "if statement");
            this.typeCheckCompoundStmtBlock(ifStmt.elseBod, "if statement");
            ifStmt.type = this.voidType;
            return ifStmt;
        }

        public typeFromAccessorFuncDecl(funcDecl: FuncDecl) {
            if (!funcDecl.isAccessor()) {
                return null;
            }

            if (hasFlag(funcDecl.fncFlags, FncFlags.GetAccessor)) {
                return funcDecl.type.call.signatures[0].returnType.type;
            }
            else {
                return funcDecl.type.call.signatures[0].parameters[0].getType();
            }
        }

        public typeCheckObjectLit(objectLit: UnaryExpression): void {

            var resultType = new Type();
            resultType.symbol = new TypeSymbol(this.checker.anon, objectLit.minChar,
                                             objectLit.limChar - objectLit.minChar,
                                             this.checker.locationInfo.unitIndex,
                                             resultType);

            resultType.members = new ScopedMembers(new DualStringHashTable(new StringHashTable(), new StringHashTable()));
            resultType.memberScope = new SymbolTableScope(resultType.members, null, null, null, null);

            var aggScope = new SymbolAggregateScope(resultType.symbol);
            aggScope.addParentScope(resultType.memberScope);
            aggScope.addParentScope(this.scope);
            resultType.containedScope = aggScope;
            var memberDecls = <ASTList>objectLit.operand;
            var prevThisType = this.thisType;
            var acceptTargetType = false;
            var targetType: Type = null;

            if (this.checker.hasTargetType()) {
                targetType = this.checker.getTargetTypeContext().contextualType;

                if (targetType && targetType.symbol && !this.checker.typeStatusIsFinished(targetType.symbol.typeCheckStatus)) {
                    if (targetType.symbol.declAST) {
                        this.typeCheck(targetType.symbol.declAST);
                    }
                }
                acceptTargetType = true;
            }

            if (memberDecls) {
                for (var i = 0, len = memberDecls.members.length; i < len; i++) {

                    var binex = <BinaryExpression>memberDecls.members[i];

                    var id = binex.operand1;
                    var text: string;
                    var targetMember: Symbol = null;
                    var fieldSymbol: FieldSymbol = null;

                    if (id.nodeType == NodeType.Name) {
                        text = (<Identifier>id).text;
                    }
                    else if (id.nodeType == NodeType.QString) {
                        // TODO: set text to unescaped string
                        var idText = (<StringLiteral>id).text;
                        text = idText.substring(1, idText.length - 1);
                    }
                    else {
                        this.checker.errorReporter.simpleError(objectLit,
                                                          "malformed object literal");
                        resultType = this.anyType;
                        break;
                    }

                    if (acceptTargetType && targetType.memberScope) {
                        targetMember = targetType.memberScope.find(text, false, false);
                    }

                    // before typechecking an accessor function member, we need to initialize its accessor symbol
                    if (binex.operand2.nodeType == NodeType.FuncDecl && (<FuncDecl>binex.operand2).isAccessor()) {

                        var funcDecl = <FuncDecl>binex.operand2;
                        var accessorSym: FieldSymbol = resultType.members.publicMembers.lookup(text);

                        accessorSym = this.checker.createAccessorSymbol(funcDecl, accessorSym, resultType, true, false, resultType.memberScope, null);
                        funcDecl.accessorSymbol = accessorSym;
                        fieldSymbol = accessorSym;
                        if (id.nodeType == NodeType.Name) {
                            (<Identifier>id).sym = accessorSym;
                        }
                    }

                    this.checker.typeCheckWithContextualType(acceptTargetType && targetMember ? targetMember.getType() : null, false, acceptTargetType, binex.operand2);

                    if (acceptTargetType && targetMember) {
                        // Note that we accept 'any' in place of a valid subtype                     
                        if ((binex.operand2.type == this.anyType || this.checker.sourceIsAssignableToTarget(binex.operand2.type, targetMember.getType())) ||
                            (binex.operand2.nodeType == NodeType.FuncDecl &&
                            (<FuncDecl>binex.operand2).isAccessor() &&
                                this.typeFromAccessorFuncDecl(<FuncDecl>binex.operand2) == targetMember.getType())) {
                                    // set the field type to the proper contextual type
                                    // this is especially important in the 'any' case, so that
                                    // fields typed to 'any' aren't accepted for contextual typing,
                                    // but never properly set to the target type
                            binex.operand1.type = targetMember.getType();
                        }
                    }
                    else {
                        // here we sub in 'any' for 'undefined' to account for field initialization to
                        // 'undefined'  
                        binex.operand2.type = binex.operand2.type == this.checker.undefinedType ? this.anyType : binex.operand2.type;
                    }

                    // the field symbol hasn't been set by a getter or setter
                    if (fieldSymbol == null) {
                        var memberType = binex.operand2.type;
                        var field = new ValueLocation();
                        fieldSymbol =
                            new FieldSymbol(text, id.minChar,
                                            this.checker.locationInfo.unitIndex,
                                            true, field);
                        fieldSymbol.flags |= SymbolFlags.Property;
                        field.symbol = fieldSymbol;
                        fieldSymbol.typeCheckStatus = this.checker.getTypeCheckFinishedStatus();
                        field.typeLink = new TypeLink();
                        field.typeLink.type = memberType;
                        resultType.members.publicMembers.add(text, fieldSymbol);
                    }
                    fieldSymbol.isObjectLitField = true;
                }
            }

            this.thisType = prevThisType;
            objectLit.type = resultType;
            if (targetType) {
                objectLit.targetType = targetType;
            }
        }

        public typeCheckArrayLit(arrayLit: UnaryExpression): void {
            var elements = <ASTList>arrayLit.operand;
            var elementType = this.anyType;
            var targetElementType: Type = null;
            var comparisonInfo = new TypeComparisonInfo();
            comparisonInfo.onlyCaptureFirstError = true;

            // if the target type is an array type, extract the element type
            if (this.checker.hasTargetType()) {
                var targetType = this.checker.getTargetTypeContext().contextualType;
                if (targetType.elementType) {
                    targetElementType = targetType.elementType;
                }
            }

            if (elements) {

                var prevInArrayElemTypeCheck = this.inArrayElementTypeCheck;

                this.inArrayElementTypeCheck = true;
                this.checker.typeCheckWithContextualType(targetElementType, this.checker.inProvisionalTypecheckMode(), targetElementType != null, elements);
                this.inArrayElementTypeCheck = prevInArrayElemTypeCheck;

                elementType = elements.members[0].type;

                var collection: ITypeCollection = {
                    getLength: () => { return elements.members.length; },
                    setTypeAtIndex: (index: number, type: Type) => { elements.members[index].type = type; },
                    getTypeAtIndex: (index: number) => { return elements.members[index].type; }
                }

                elementType = this.checker.findBestCommonType(elementType, targetElementType, collection, false, comparisonInfo);

                // if the array type is the undefined type, we should widen it to any
                // if it's of the null type, only widen it if it's not in a nested array element, so as not to 
                // short-circuit any checks for the best common type
                if (elementType == this.checker.undefinedType || (!prevInArrayElemTypeCheck && elementType == this.nullType)) {
                    elementType = this.anyType;
                }
            }
            if (!elementType) {
                var emsg = "Incompatible types in array literal expression";
                if (!comparisonInfo.message) {
                    this.checker.errorReporter.simpleError(arrayLit, emsg);
                }
                else {
                    this.checker.errorReporter.simpleError(arrayLit, emsg + ": " + comparisonInfo.message);
                }
                elementType = this.anyType;
            }
            else if (targetElementType) {
                // for the case of zero-length 'any' arrays, we still want to set the contextual type, if
                // need be
                if (this.checker.sourceIsAssignableToTarget(elementType, targetElementType)) {
                    elementType = targetElementType;
                }
            }

            arrayLit.type = this.checker.makeArrayType(elementType);

        }

        public checkForVoidConstructor(type: Type, ast: AST) {
            if (type &&
                type.construct &&
                type.construct.signatures.length > 0) {

                for (var i = 0; i < type.construct.signatures.length; i++) {
                    if (type.construct.signatures[i].returnType.type == this.checker.voidType) {
                        this.checker.errorReporter.simpleError(ast, "Constructors may not have a return type of 'void'");
                        break;
                    }
                }
            }
        }

        // REVIEW: the code below could set the signature type of the function to the current return
        // type, which would have a benefit of reducing the risk of a recursive typecheck scenario, but is
        // is technically wrong - mergeOrdered will only work properly if the best common supertype
        // comes before any sibling types.  This would mean that if a function, "color()", returned
        // three types (in order) - "Red", "Blue", and "IColor", an "Incompatible return type" error 
        // would be triggered.  However, if "color()" returned (in order) "Red", "IColor" and "Blue"
        // no error would be triggered, and the return type of the function would be "IColor"
        public typeCheckReturn(returnStmt: ReturnStatement): ReturnStatement {

            if (this.thisFnc) {
                var targetType: Type = null;

                // determine the target type
                if (this.checker.hasTargetType()) {
                    var tcContext = this.checker.getTargetTypeContext();
                    var accessorType = tcContext.targetAccessorType;

                    if (accessorType) {
                        targetType = accessorType;
                    }
                    else {
                        var targetSig = this.checker.getTargetTypeContext().targetSig;
                        if (targetSig && targetSig.returnType.type != this.voidType) {
                            targetType = targetSig.returnType.type;
                        }
                    }
                }

                if (returnStmt.returnExpression) {
                    this.thisFnc.fncFlags |= FncFlags.HasReturnExpression;

                    if (targetType == null && this.thisFnc.returnTypeAnnotation && this.thisFnc.returnTypeAnnotation.type && this.thisFnc.returnTypeAnnotation.type != this.voidType) {
                        targetType = this.thisFnc.returnTypeAnnotation.type;
                    }

                    this.checker.typeCheckWithContextualType(targetType, this.checker.inProvisionalTypecheckMode(), targetType != null, returnStmt.returnExpression);

                    var expectedReturnType: Type =
                        (this.thisFnc.returnTypeAnnotation && this.thisFnc.returnTypeAnnotation.type) ?
                            this.thisFnc.returnTypeAnnotation.type :
                            targetType;
                    if (expectedReturnType) {
                        if (expectedReturnType == this.voidType && returnStmt.returnExpression.type != this.voidType) {
                            this.checker.errorReporter.simpleError(returnStmt,
                                                              "Return with value expression in void function");

                            // even though we've raised an error, use the more specific type
                            returnStmt.type = returnStmt.returnExpression.type;
                        }
                        else {
                            returnStmt.returnExpression = this.cast(returnStmt.returnExpression, expectedReturnType);
                            returnStmt.type = expectedReturnType;
                        }
                    }
                    else {
                        if (targetType) {
                            if (returnStmt.returnExpression.type != this.voidType) {
                                returnStmt.returnExpression = this.cast(returnStmt.returnExpression, targetType);
                            }
                            else {
                                returnStmt.returnExpression.type = targetType;
                            }
                        }
                        returnStmt.type = returnStmt.returnExpression.type;
                    }
                    this.thisFnc.returnStatementsWithExpressions[this.thisFnc.returnStatementsWithExpressions.length] = returnStmt;
                }
                else {
                    returnStmt.type = targetType == null ? this.checker.voidType : targetType; //((this.thisFnc.returnTypeAnnotation && this.thisFnc.returnTypeAnnotation.type) ? this.thisFnc.returnTypeAnnotation.type : this.checker.voidType) : targetType;
                }
            }

            return returnStmt;
        }

        public typeCheckInstOf(ast: AST): AST {
            var binex = <BinaryExpression>ast;
            binex.operand1 = this.typeCheck(binex.operand1);
            binex.operand2 = this.typeCheck(binex.operand2);

            if (!((binex.operand1.type == this.checker.anyType || this.checker.sourceIsSubtypeOfTarget(binex.operand1.type, this.objectInterfaceType)) &&
                    (binex.operand2.type == this.anyType || this.checker.sourceIsSubtypeOfTarget(binex.operand2.type, this.functionInterfaceType)))) {
                this.checker.errorReporter.simpleError(ast, "The instanceof operator requires the left operand to be of type Any or an object type, and the right operand to be of type Any or a subtype of the Function interface type");
            }
            binex.type = this.booleanType;
            return binex;
        }

        public typeCheckCommaOperator(ast: AST): AST {
            var binex = <BinaryExpression>ast;
            binex.operand1 = this.typeCheck(binex.operand1);
            binex.operand2 = this.typeCheck(binex.operand2);
            binex.type = binex.operand2.type;
            return binex;
        }

        public typeCheckLogOr(binex: BinaryExpression): BinaryExpression {
            binex.operand1 = this.typeCheck(binex.operand1);
            binex.operand2 = this.typeCheck(binex.operand2);
            var leftType = binex.operand1.type;
            var rightType = binex.operand2.type;

            if (leftType == this.checker.anyType || rightType == this.checker.anyType) {
                binex.type = this.checker.anyType;
            }
            else if (leftType == this.checker.booleanType) {
                if (rightType == this.checker.booleanType) {
                    binex.type = this.checker.booleanType;
                }
                else {
                    binex.type = this.checker.anyType;
                }
            }
            else if (leftType == this.checker.numberType) {
                if (rightType == this.checker.numberType) {
                    binex.type = this.checker.numberType;
                }
                else {
                    binex.type = this.checker.anyType;
                }
            }
            else if (leftType == this.checker.stringType) {
                if (rightType == this.checker.stringType) {
                    binex.type = this.checker.stringType;
                }
                else {
                    binex.type = this.checker.anyType;
                }
            }
            else {
                if (this.checker.sourceIsSubtypeOfTarget(leftType, rightType)) {
                    binex.type = rightType;
                }
                else if (this.checker.sourceIsSubtypeOfTarget(rightType, leftType)) {
                    binex.type = leftType;
                }
                else {
                    binex.type = this.checker.anyType;
                }
            }
            return binex;
        }

        public typeCheckLogAnd(binex: BinaryExpression): BinaryExpression {
            binex.operand1 = this.typeCheck(binex.operand1);
            binex.operand2 = this.typeCheck(binex.operand2);
            binex.type = binex.operand2.type;
            return binex;
        }

        public tryAddCandidates(signature: Signature, actuals: Type[], exactCandidates: Signature[], conversionCandidates: Signature[], comparisonInfo: TypeComparisonInfo): void {
            var lowerBound = signature.nonOptionalParameterCount; // required parameters
            var upperBound = signature.parameters.length; // required and optional parameters
            var formalLen = lowerBound;
            var acceptable = false;

            if ((actuals.length >= lowerBound) && (signature.hasVariableArgList || actuals.length <= upperBound)) {
                formalLen = (signature.hasVariableArgList ? signature.parameters.length : actuals.length);
                acceptable = true;
            }

            var repeatType: Type = null;

            if (acceptable || signature.hasVariableArgList) {
                // assumed structure here is checked when signature is formed
                if (signature.hasVariableArgList) {
                    formalLen -= 1;
                    repeatType = (<ParameterSymbol>signature.parameters[formalLen]).parameter.typeLink.type;
                    repeatType = repeatType.elementType;
                    acceptable = actuals.length >= formalLen;
                }
                var len = actuals.length;

                var exact = acceptable;
                var convert = acceptable;
                for (var i = 0; i < len; i++) {
                    var typeA: Type;
                    if (i < formalLen) {
                        typeA =
                            (<ParameterSymbol>signature.parameters[i]).parameter.typeLink.type;
                    }
                    else {
                        typeA = repeatType;
                    }

                    var typeB = actuals[i];
                    if (!typeA || !typeB || !(this.checker.typesAreIdentical(typeA, typeB))) {
                        exact = false;
                    }
                    // is the argument assignable to the parameter?
                    if (!this.checker.sourceIsAssignableToTarget(typeB, typeA, comparisonInfo)) {
                        convert = false;
                    }
                    if (!(exact || convert)) {
                        break;
                    }
                }
                if (exact) {
                    exactCandidates[exactCandidates.length] = signature;
                }
                else if (convert && (exactCandidates.length == 0)) {
                    conversionCandidates[conversionCandidates.length] = signature;
                }

            }
        }

        public resolveOverload(application: AST, group: SignatureGroup): Signature {
            var rd = this.resolutionDataCache.getResolutionData();
            var actuals = rd.actuals;
            var exactCandidates = rd.exactCandidates;
            var conversionCandidates = rd.conversionCandidates;
            var candidate: Signature = null;
            var hasOverloads = group.signatures.length > 1;
            var comparisonInfo = new TypeComparisonInfo();
            var args: ASTList = null;
            var target: AST = null;

            if (application.nodeType == NodeType.Call || application.nodeType == NodeType.New) {
                var callEx = <CallExpression>application;
                args = callEx.arguments;
                target = callEx.target;
                if (callEx.arguments) {
                    var len = callEx.arguments.members.length;
                    for (var i = 0; i < len; i++) {
                        actuals[i] = callEx.arguments.members[i].type;
                    }
                }
            }
            else if (application.nodeType == NodeType.Index) {
                var binExp = <BinaryExpression>application;
                target = binExp.operand1;
                args = new ASTList();
                args.members[0] = binExp.operand2;
                actuals[0] = binExp.operand2.type;
            }

            for (var j = 0, groupLen = group.signatures.length; j < groupLen; j++) {
                var signature = group.signatures[j];
                if (hasOverloads && signature == group.definitionSignature && !this.checker.canCallDefinitionSignature) {
                    continue;
                }
                if (!signature.returnType.type && signature.declAST &&
                    (signature.typeCheckStatus != TypeCheckStatus.Finished)) {
                    this.typeCheckFunction(signature.declAST);
                }
                this.tryAddCandidates(signature, actuals, exactCandidates, conversionCandidates, comparisonInfo);
            }
            if (exactCandidates.length == 0) {

                var applicableCandidates = this.checker.getApplicableSignatures(conversionCandidates, args, comparisonInfo);
                if (applicableCandidates.length > 0) {
                    var candidateInfo = this.checker.findMostApplicableSignature(applicableCandidates, args);
                    if (candidateInfo.ambiguous) {
                        this.checker.errorReporter.simpleError(target, "Ambiguous call expression - could not choose overload");
                    }
                    candidate = candidateInfo.sig;
                }
                else {
                    var emsg = "Supplied parameters do not match any signature of call target";
                    if (comparisonInfo.message) {
                        this.checker.errorReporter.simpleError(target, emsg + ":\n\t" + comparisonInfo.message);
                    }
                    else {
                        this.checker.errorReporter.simpleError(target, emsg);
                    }
                }
            }
            else {
                if (exactCandidates.length > 1) {
                    var applicableSigs: ApplicableSignature[] = [];
                    for (var i = 0; i < exactCandidates.length; i++) {
                        applicableSigs[i] = { signature: exactCandidates[i], hadProvisionalErrors: false };
                    }
                    var candidateInfo = this.checker.findMostApplicableSignature(applicableSigs, args);
                    if (candidateInfo.ambiguous) {
                        this.checker.errorReporter.simpleError(target, "Ambiguous call expression - could not choose overload");
                    }
                    candidate = candidateInfo.sig;
                }
                else {
                    candidate = exactCandidates[0];
                }
            }

            this.resolutionDataCache.returnResolutionData(rd);
            return candidate;
        }

        public typeCheckNew(ast: AST): AST {
            var callEx = <CallExpression>ast;

            callEx.target = this.typeCheck(callEx.target);
            var target = callEx.target;
            if (target.type.construct || target.type.call) {
                this.preTypeCheckCallArgs(callEx.arguments);
            }
            else {
                callEx.arguments = <ASTList>this.typeCheck(callEx.arguments);
            }

            if (target.type == this.anyType) {
                callEx.type = this.anyType;
                callEx.arguments = <ASTList>this.typeCheck(callEx.arguments);
            }
            else {
                if (target.type.construct) {
                    var signature = this.resolveOverload(callEx, target.type.construct);
                    if (signature == null) {
                        callEx.type = this.anyType;
                    }
                    else if (signature.returnType.type == this.voidType) {
                        callEx.type = this.anyType;
                        callEx.signature = signature;
                    }
                    else {
                        callEx.type = signature.returnType.type;
                        callEx.signature = signature;
                    }
                }
                else if (target.type.call) {
                    var signature = this.resolveOverload(callEx, target.type.call);
                    if (signature == null) {
                        callEx.type = this.anyType;
                    }
                    else if ((signature.returnType.type == this.voidType) || (signature.returnType.type == this.anyType)) {
                        callEx.type = this.anyType;
                        callEx.signature = signature;
                    }
                    else {
                        this.checker.errorReporter.simpleError(callEx.target,
                           "new expression only valid on constructors");
                    }
                }
                else if (target.type.elementType) {
                    callEx.type = target.type;
                }
                else {
                    this.checker.errorReporter.invalidCall(callEx, callEx.nodeType, this.scope);
                    callEx.type = this.anyType;
                }
            }

            this.postTypeCheckCallArgs(callEx);

            return callEx;
        }

        // Typecheck all args that cannot be affected by contextual typing of overloads
        public preTypeCheckCallArgs(args: ASTList) {

            if (!args) {
                return;
            }

            for (var i = 0; i < args.members.length; i++) {
                switch (args.members[i].nodeType) {
                    case NodeType.FuncDecl:
                    case NodeType.ObjectLit:
                    case NodeType.ArrayLit:
                        continue;
                    default:
                        this.typeCheck(args.members[i]);
                        break;
                }
            }
        }

        public postTypeCheckCallArgs(callEx: CallExpression) {

            var acceptedTargetType = false;
            var i = 0;

            if (callEx.target &&
                callEx.target.type &&
                callEx.signature &&
                callEx.arguments) {
                var sig = callEx.signature;

                if (sig && callEx.arguments.members.length >= sig.nonOptionalParameterCount) {
                    acceptedTargetType = true;
                    var targetType: Type = null;
                    var nonVarArgFormalParamLength = sig.hasVariableArgList ? sig.parameters.length - 1 : sig.parameters.length;
                    var nonVarArgActualParamLength = callEx.arguments.members.length < nonVarArgFormalParamLength ? callEx.arguments.members.length : nonVarArgFormalParamLength

                    for (i = 0; i < nonVarArgActualParamLength; i++) {
                        targetType = sig.parameters[i].getType();
                        switch (callEx.arguments.members[i].nodeType) {
                            case NodeType.FuncDecl:
                            case NodeType.ObjectLit:
                            case NodeType.ArrayLit:
                                this.checker.typeCheckWithContextualType(targetType, this.checker.inProvisionalTypecheckMode(), !sig.parameters[i].declAST.isParenthesized, callEx.arguments.members[i]);
                                break;
                        }
                    }

                    if (sig.hasVariableArgList) {
                        var varArgParamIndex = sig.nonOptionalParameterCount - 1;
                        targetType = sig.parameters[varArgParamIndex].getType();
                        if (targetType) {
                            targetType = targetType.elementType;
                        }
                        var isParenthesized = !sig.parameters[varArgParamIndex].declAST.isParenthesized;
                        for (i = nonVarArgActualParamLength; i < callEx.arguments.members.length; i++) {
                            switch (callEx.arguments.members[i].nodeType) {
                                case NodeType.FuncDecl:
                                case NodeType.ObjectLit:
                                case NodeType.ArrayLit:
                                    this.checker.typeCheckWithContextualType(targetType, this.checker.inProvisionalTypecheckMode(), isParenthesized, callEx.arguments.members[i]);
                                    break;
                            }
                        }
                    }
                }
            }

            if (!acceptedTargetType && callEx.arguments) {
                this.checker.killCurrentContextualType();

                for (i = 0; i < callEx.arguments.members.length; i++) {
                    switch (callEx.arguments.members[i].nodeType) {
                        case NodeType.FuncDecl:
                        case NodeType.ObjectLit:
                        case NodeType.ArrayLit:
                            this.typeCheck(callEx.arguments.members[i]);
                            break;
                        default:
                            continue;
                    }
                }
            }
        }

        public typeCheckCall(ast: AST): AST {
            var callEx = <CallExpression>ast;
            if (this.checker.styleSettings.newMustBeUsed && (ast.nodeType == NodeType.New)) {
                if (hasFlag(ast.flags, ASTFlags.IsStatement)) {
                    this.checker.errorReporter.styleError(ast, "use of new expression as a statement");
                }
            }
            else if ((!this.checker.styleSettings.evalOK) && (ast.nodeType == NodeType.Call)) {
                if ((callEx.target.nodeType == NodeType.Name) && ((<Identifier>callEx.target).text == "eval")) {
                    this.checker.errorReporter.styleError(callEx, "eval not permitted");
                }
            }

            if (callEx.target.nodeType == NodeType.FuncDecl) {
                (<FuncDecl>callEx.target).isInlineCallLiteral = true;
            }

            var prevInSuperCall = this.inSuperCall;

            if (callEx.target.nodeType == NodeType.Super) {
                this.inSuperCall = true;
            }

            callEx.target = this.typeCheck(callEx.target);
            this.preTypeCheckCallArgs(callEx.arguments);

            var target = callEx.target;

            if ((target.type == null) || (target.type == this.anyType) || (this.functionInterfaceType && target.type == this.functionInterfaceType)) {
                callEx.type = this.anyType;
            }
            else {
                var fnType = target.type;
                if (fnType.call) {
                    var signature = this.resolveOverload(callEx, fnType.call);
                    if (signature == null) {
                        callEx.type = this.anyType;
                    }
                    else {
                        callEx.type = signature.returnType.type;
                        callEx.signature = signature;
                    }
                }
                else {
                    // track calls to class base class
                    if (callEx.target.nodeType == NodeType.Super &&
                        this.thisFnc &&
                        this.thisFnc.isConstructor &&
                        hasFlag(this.thisFnc.fncFlags, FncFlags.ClassMethod)) {

                            // Need to use the class type for the construct signature, not the instance type
                        var signature = fnType.symbol.type.construct ? this.resolveOverload(callEx, fnType.symbol.type.construct) : null;

                        if (signature == null) {
                            callEx.type = this.anyType;
                        }
                        else {
                            callEx.flags |= ASTFlags.ClassBaseConstructorCall;
                            callEx.type = signature.returnType.type;
                            callEx.signature = signature;
                        }
                    }
                    else {
                        callEx.type = this.anyType;
                        this.checker.errorReporter.invalidCall(callEx, callEx.nodeType, this.scope);
                    }
                }
            }
            this.postTypeCheckCallArgs(callEx);

            this.inSuperCall = prevInSuperCall;

            return callEx;
        }

        public assignScopes(ast: AST) {
            var script = <Script>ast;
            this.checker.locationInfo = script.locationInfo;
            var globalChain = new ScopeChain(this.checker.gloMod, null, this.globalScope);
            var context = new AssignScopeContext(globalChain, this, [this.checker.currentModDecl]);
            getAstWalkerFactory().walk(ast, preAssignScopes, postAssignScopes, null, context);
        }

        public findMemberScope(enclosingScopeContext: EnclosingScopeContext, matchFlag: ASTFlags) {
            var enclosingScope = enclosingScopeContext.getScope();
            var pos = enclosingScopeContext.pos - enclosingScopeContext.getScriptFragmentPosition();
            var scriptFragment = enclosingScopeContext.getScriptFragment();

            var memContext = new MemberScopeContext(this, pos, matchFlag);
            memContext.scope = enclosingScope;
            if (scriptFragment.nodeType == NodeType.Name) {
                return scriptFragment.type.getMemberScope(this);
            }
            else {
                getAstWalkerFactory().walk(scriptFragment, preFindMemberScope, null, null, memContext);
                if (memContext.ast && enclosingScopeContext.enclosingClassDecl && memContext.ast.type == enclosingScopeContext.enclosingClassDecl.type.instanceType) {
                    enclosingScopeContext.publicsOnly = false;
                }
                if (memContext.type) {
                    return memContext.type.getMemberScope(this);
                }
                else {
                    return null;
                }
            }
        }

        public findMemberScopeAt(enclosingScopeContext: EnclosingScopeContext) {
            return this.findMemberScope(enclosingScopeContext, ASTFlags.DotLHS);
        }

        public findMemberScopeAtFullAst(enclosingScopeContext: EnclosingScopeContext) {
            var matchFlag = ASTFlags.DotLHS;
            var pos = enclosingScopeContext.pos;
            var astResult: AST = null;

            var preFindMemberScopeFullAst = function (ast: AST, parent: AST, walker: IAstWalker) {
                if (isValidAstNode(ast)) {
                    // Note: pos == ast.limChar       in case of incomplete code (e.g. "foo.")
                    // Note: (pos - 1) == ast.limChar in case of complete code (e.g. "foo.bar")
                    if (hasFlag(ast.flags, matchFlag) && (pos == ast.limChar || (pos - 1) == ast.limChar)) {
                        astResult = ast;
                        walker.options.stopWalk();
                    }

                    // Stop traversal if range does not contain position
                    walker.options.goChildren = (ast.minChar <= pos) && (pos <= ast.limChar);
                }
                return ast;
            }

            var preFindMemberScopeFullAstFuzy = function (ast: AST, parent: AST, walker: IAstWalker) {
                if (isValidAstNode(ast)) {
                    if (hasFlag(ast.flags, matchFlag) && ((ast.minChar < pos) && (pos <= ast.limChar))) {
                        astResult = ast;
                    }

                    // Stop traversal if range does not contain position
                    walker.options.goChildren = (ast.minChar <= pos) && (pos <= ast.limChar);
                }
                return ast;
            }

            getAstWalkerFactory().walk(enclosingScopeContext.script, preFindMemberScopeFullAst);

            if (astResult == null) {
                // Perform a more "fusy" match. This is because the limChar of AST nodes is sometimes
                // not what we expect, for example:
                //   foo./*comment*/;
                // In this case, limChar points to ";" instead of "." (because of the trailing comment).
                getAstWalkerFactory().walk(enclosingScopeContext.script, preFindMemberScopeFullAstFuzy);
            }

            if (astResult &&
                enclosingScopeContext.enclosingClassDecl &&
                astResult.type == enclosingScopeContext.enclosingClassDecl.type.instanceType) {
                enclosingScopeContext.publicsOnly = false;
            }

            if (astResult && astResult.type) {
                return astResult.type.getMemberScope(this);
            }
            else {
                return null;
            }
        }
    }
}
