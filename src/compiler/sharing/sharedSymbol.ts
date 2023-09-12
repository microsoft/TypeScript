import { __String, SymbolFlags } from "../types";
import { SharedResizableArray } from "./collections/sharedResizableArray";
import { SharedMap } from "./collections/sharedMap";
import { Identifiable } from "./structs/identifiableStruct";
import { SharedDeclaration } from "./sharedNode";
import { Shared, SharedStructBase } from "./structs/sharedStruct";
import { Tag, Tagged } from "./structs/taggedStruct";

declare global {
    interface OtherShareablePrimitive {
        __String: __String;
    }
}

/** @internal */
export interface SharedSymbolTable extends SharedMap<__String, SharedSymbol> {
}

/** @internal */
@Shared()
export class SharedSymbol extends Identifiable(Tagged(SharedStructBase, Tag.Symbol)) {
    @Shared() flags!: SymbolFlags;
    @Shared() escapedName!: __String;
    @Shared() declarations: SharedResizableArray<SharedDeclaration> | undefined;
    @Shared() valueDeclaration: SharedDeclaration | undefined;
    @Shared() members: SharedSymbolTable | undefined;
    @Shared() exports: SharedSymbolTable | undefined;
    @Shared() globalExports: SharedSymbolTable | undefined;
    @Shared() parent: SharedSymbol | undefined;
    @Shared() exportSymbol: SharedSymbol | undefined;
    @Shared() constEnumOnlyModule: boolean | undefined;
    @Shared() isReferenced: SymbolFlags | undefined;
    @Shared() isReplaceableByMethod: boolean | undefined;
    @Shared() isAssigned: boolean | undefined;
    @Shared() assignmentDeclarationMembers: SharedMap<number, SharedDeclaration> | undefined;
}
