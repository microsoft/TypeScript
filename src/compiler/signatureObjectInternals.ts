import {
    JSDocTagInfo,
    Signature,
    SymbolDisplayPart,
} from "./types";

/** @internal */
export class SignatureObjectInternals {
    static internals = new SignatureObjectInternals();

    getDocumentationComment(signature: Signature): SymbolDisplayPart[];
    getDocumentationComment(_signature: Signature): SymbolDisplayPart[] {
        throw new TypeError("Not implemented.");
    }

    getJsDocTags(signature: Signature): JSDocTagInfo[];
    getJsDocTags(_signature: Signature): JSDocTagInfo[] {
        throw new TypeError("Not implemented.");
    }
}
