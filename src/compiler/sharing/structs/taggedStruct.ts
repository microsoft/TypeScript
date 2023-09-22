import { hasProperty } from "../../core";
import { isShareableNonPrimitive } from "./shareable";
import { Shared } from "./sharedStruct";

/** @internal */
export const enum Tag {
    Mutex,
    SharedMutex,
    Condition,
    ManualResetEvent,
    CountdownEvent,
    Thread,
    Map,
    Set,
    ResizableArray,
    ConcurrentMap,
    Semaphore,
    NodeArray,
    Node,
    Symbol,
    FileReference,
    AmdDependency,
    CheckJsDirective,
    CommentDirective,
    TextRange,
    Diagnostic,
    DiagnosticMessageChain,
    DiagnosticRelatedInformation,
    Pragma,
    PragmaArguments,
    PragmaSpan,
}

/** @internal */
export interface TaggedStruct<TTag extends Tag> extends SharedStruct {
    readonly __tag__: TTag;
}

/** @internal */
export type TaggedStructConstructor<TTag extends Tag> = (abstract new (...args: any) => TaggedStruct<TTag>) & {
    readonly __tag__: TTag
};

/** @internal */
export type Tagged<F extends abstract new (...args: any) => SharedStruct, TTag extends Tag> =
    (F extends abstract new (...args: infer A) => (infer R extends TaggedStruct<infer _>) ? (abstract new (...args: A) => Omit<R, "__tag__">) : F) & TaggedStructConstructor<TTag>

/**
 * Since shared structs do not support instanceof, we often need a way to distingush one shared struct from another to
 * create the correct proxy class in our membrane. To accomplish this, we can use the Tagged mixin to inject a
 * `__tag__` field that we can use instead of `instanceof`.
 * @internal
 */
export function Tagged<F extends abstract new (...args: any) => SharedStruct, TTag extends Tag>(base: F, tag: TTag): Tagged<F, TTag> {
    @Shared({ abstract: true })
    abstract class TaggedStruct extends base {
        static readonly __tag__ = tag;
        @Shared() readonly __tag__ = tag;

        static [Symbol.hasInstance](value: unknown): boolean {
            return isTaggedStruct(value, tag);
        }
    }
    return TaggedStruct as Tagged<F, TTag>;
}

/** @internal */
export function isTaggedStructObject<TTag extends Tag>(value: ShareableNonPrimitive, tag?: TTag): value is TaggedStruct<TTag> {
    return hasProperty(value, "__tag__") && (tag === undefined || (value as TaggedStruct<Tag>).__tag__ === tag);
}

/** @internal */
export function isTaggedStruct<TTag extends Tag>(value: unknown, tag?: TTag): value is TaggedStruct<TTag> {
    return isShareableNonPrimitive(value) && isTaggedStructObject(value, tag);
}
