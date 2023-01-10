import {
    addObjectAllocatorPatcher,
    Identifier,
    idKeyword,
    NodeFlags,
} from "../_namespaces/ts";
import { deprecate } from "../deprecate";

addObjectAllocatorPatcher(objectAllocator => {
    const Identifier = objectAllocator.getIdentifierConstructor();

    const propertyNames = Object.getOwnPropertyNames(Identifier.prototype);
    if (!propertyNames.includes("originalKeywordKind")) {
        Object.defineProperty(Identifier.prototype, "originalKeywordKind", {
            get: deprecate(function (this: Identifier) {
                return idKeyword(this);
            }, {
                name: "originalKeywordKind",
                since: "5.0",
                warnAfter: "5.1",
                errorAfter: "5.2",
                message: "Use 'idKeyword(identifier)' instead."
            })
        });
    }

    if (!propertyNames.includes("isInJSDocNamespace")) {
        Object.defineProperty(Identifier.prototype, "isInJSDocNamespace", {
            get: deprecate(function (this: Identifier) {
                // NOTE: Returns `true` or `undefined` to match previous possible values.
                return this.flags & NodeFlags.IdentifierIsInJSDocNamespace ? true : undefined;
            }, {
                name: "isInJSDocNamespace",
                since: "5.0",
                warnAfter: "5.1",
                errorAfter: "5.2",
                message: "Use 'identifier.flags & NodeFlags.IdentifierIsInJSDocNamespace' instead."
            })
        });
    }
});
