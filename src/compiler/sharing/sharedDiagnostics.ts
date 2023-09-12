import { CompilerOptions, DiagnosticCategory } from "../types";
import { SharedSourceFile } from "./sharedNode";
import { Shared, SharedStructBase } from "./structs/sharedStruct";
import { Tag, Tagged } from "./structs/taggedStruct";

/** @internal */
@Shared()
export class SharedDiagnosticMessage extends SharedStructBase {
    @Shared() key: string;
    @Shared() category: DiagnosticCategory;
    @Shared() code: number;
    @Shared() message: string;
    @Shared() reportsUnnecessary?: boolean;
    @Shared() reportsDeprecated?: boolean;
    @Shared() elidedInCompatabilityPyramid?: boolean | undefined;

    constructor(
        key: string,
        category: DiagnosticCategory,
        code: number,
        message: string,
        reportsUnnecessary?: {},
        reportsDeprecated?: {},
        elidedInCompatabilityPyramid?: boolean | undefined
    ) {
        super();
        this.key = key;
        this.category = category;
        this.code = code;
        this.message = message;
        this.reportsUnnecessary = !!reportsUnnecessary;
        this.reportsDeprecated = !!reportsDeprecated;
        this.elidedInCompatabilityPyramid = elidedInCompatabilityPyramid;
    }
}

/** @internal */
@Shared()
export class SharedDiagnosticMessageChain extends Tagged(SharedStructBase, Tag.DiagnosticMessageChain) {
    @Shared() messageText: string;
    @Shared() category: DiagnosticCategory;
    @Shared() code: number;
    @Shared() next?: SharedArray<SharedDiagnosticMessageChain>;
    // does this need to be shared somehow?
    // repopulateInfo?: () => RepopulateDiagnosticChainInfo;

    constructor(messageText: string, category: DiagnosticCategory, code: number, next?: SharedArray<SharedDiagnosticMessageChain>) {
        super();
        this.messageText = messageText;
        this.category = category;
        this.code = code;
        this.next = next;
    }
}

/** @internal */
@Shared()
export class SharedDiagnosticRelatedInformation extends Tagged(SharedStructBase, Tag.DiagnosticRelatedInformation) {
    @Shared() category: DiagnosticCategory;
    @Shared() code: number;
    @Shared() file: SharedSourceFile | undefined;
    @Shared() start: number | undefined;
    @Shared() length: number | undefined;
    @Shared() messageText: string | SharedDiagnosticMessageChain;

    constructor(
        category: DiagnosticCategory,
        code: number,
        file: SharedSourceFile | undefined,
        start: number | undefined,
        length: number | undefined,
        messageText: string | SharedDiagnosticMessageChain
    ) {
        super();
        this.category = category;
        this.code = code;
        this.file = file;
        this.start = start;
        this.length = length;
        this.messageText = messageText;
    }
}

/** @internal */
@Shared()
export class SharedDiagnostic extends Tagged(SharedDiagnosticRelatedInformation, Tag.Diagnostic) {
    @Shared() reportsUnnecessary?: boolean;
    @Shared() reportsDeprecated?: boolean;
    @Shared() source?: string;
    @Shared() relatedInformation?: SharedArray<SharedDiagnosticRelatedInformation | SharedDiagnostic>;
    @Shared() skippedOn?: keyof CompilerOptions;
}

/** @internal */
@Shared()
export class SharedDiagnosticAndArguments extends SharedStructBase {
    @Shared() message: SharedDiagnosticMessage;
    @Shared() args: SharedArray<string | number>;

    constructor(message: SharedDiagnosticMessage, args: SharedArray<string | number>) {
        super();
        this.message = message;
        this.args = args;
    }
}

/** @internal */
export interface SharedDiagnosticWithLocation extends SharedDiagnostic {
    file: SharedSourceFile;
    start: number;
    length: number;
}

/** @internal */
@Shared()
export class SharedDiagnosticWithDetachedLocation extends SharedDiagnostic {
    @Shared() fileName: string;
    declare file: undefined;

    constructor(
        category: DiagnosticCategory,
        code: number,
        file: SharedSourceFile | undefined,
        start: number | undefined,
        length: number | undefined,
        messageText: string | SharedDiagnosticMessageChain,
        fileName: string
    ) {
        super(category, code, file, start, length, messageText);
        this.fileName = fileName;
    }
}
