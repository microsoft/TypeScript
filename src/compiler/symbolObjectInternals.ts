import { SymbolObject } from "./objectConstructors";
import {
    JSDocTagInfo,
    Node,
    SymbolDisplayPart,
    TypeChecker,
} from "./types";

/** @internal */
export class SymbolObjectInternals {
    static internals = new SymbolObjectInternals();

    getDocumentationComment(symbol: SymbolObject, typeChecker: TypeChecker | undefined): SymbolDisplayPart[];
    getDocumentationComment(_symbol: SymbolObject, _typeChecker: TypeChecker | undefined): SymbolDisplayPart[] {
        throw new TypeError("Not implemented.");
    }

    getContextualDocumentationComment(symbol: SymbolObject, context: Node | undefined, checker: TypeChecker | undefined): SymbolDisplayPart[];
    getContextualDocumentationComment(_symbol: SymbolObject, _context: Node | undefined, _checker: TypeChecker | undefined): SymbolDisplayPart[] {
        throw new TypeError("Not implemented.");
    }

    getJsDocTags(symbol: SymbolObject, checker?: TypeChecker): JSDocTagInfo[];
    getJsDocTags(_symbol: SymbolObject, _checker?: TypeChecker): JSDocTagInfo[] {
        throw new TypeError("Not implemented.");
    }

    getContextualJsDocTags(symbol: SymbolObject, context: Node | undefined, checker: TypeChecker | undefined): JSDocTagInfo[];
    getContextualJsDocTags(_symbol: SymbolObject, _context: Node | undefined, _checker: TypeChecker | undefined): JSDocTagInfo[] {
        throw new TypeError("Not implemented.");
    }
}
