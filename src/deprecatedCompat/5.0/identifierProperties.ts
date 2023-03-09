import {
    addObjectAllocatorPatcher,
    hasProperty,
    Identifier,
    identifierToKeywordKind,
    NodeFlags,
} from "../_namespaces/ts";
import { deprecate } from "../deprecate";

declare module "../../compiler/types" {
    export interface Identifier {
        /** @deprecated Use `idKeyword(identifier)` instead. */
        readonly originalKeywordKind?: SyntaxKind;

        /** @deprecated Use `.parent` or the surrounding context to determine this instead. */
        readonly isInJSDocNamespace?: boolean;
    }
}

addObjectAllocatorPatcher(objectAllocator => {
    const Identifier = objectAllocator.getIdentifierConstructor();

    if (!hasProperty(Identifier.prototype, "originalKeywordKind")) {
        Object.defineProperty(Identifier.prototype, "originalKeywordKind", {
            get: deprecate(function (this: Identifier) {
                return identifierToKeywordKind(this);
            }, {
                name: "originalKeywordKind",
                since: "5.0",
                warnAfter: "5.1",
                errorAfter: "5.2",
                message: "Use 'identifierToKeywordKind(identifier)' instead."
            })
        });
    }

    if (!hasProperty(Identifier.prototype, "isInJSDocNamespace")) {
        Object.defineProperty(Identifier.prototype, "isInJSDocNamespace", {
            get: deprecate(function (this: Identifier) {
                // NOTE: Returns `true` or `undefined` to match previous possible values.
                return this.flags & NodeFlags.IdentifierIsInJSDocNamespace ? true : undefined;
            }, {
                name: "isInJSDocNamespace",
                since: "5.0",
                warnAfter: "5.1",
                errorAfter: "5.2",
                message: "Use '.parent' or the surrounding context to determine this instead."
            })
        });
    }
});
