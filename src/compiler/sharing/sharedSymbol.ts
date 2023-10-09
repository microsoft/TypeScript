import { __String, SymbolFlags } from "../types";
import { SharedMap } from "./collections/sharedMap";
import { SharedDeclaration } from "./sharedNode";
import { Identifiable } from "./structs/identifiableStruct";
import { Shared, SharedStructBase } from "./structs/sharedStruct";
import { Tag, Tagged } from "./structs/taggedStruct";

/** @internal */
export interface SharedSymbolTable extends SharedMap<__String, SharedSymbol> {
}

/** @internal */
@Shared()
export class SharedSymbol extends Identifiable(Tagged(SharedStructBase, Tag.Symbol)) {
    @Shared() flags!: SymbolFlags;
    @Shared() escapedName!: __String;
    @Shared() declarations: SharedArray<SharedDeclaration> | undefined;
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
