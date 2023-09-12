import { Condition } from "../threading/condition";
import { Mutex } from "../threading/mutex";
import { SharedMutex } from "../threading/sharedMutex";
import { ResolutionMode, ScriptTarget } from "../types";
import { SharedMap } from "./collections/sharedMap";
import { SharedSourceFile } from "./sharedNode";
import { Shared, SharedStructBase } from "./structs/sharedStruct";

/** @internal */
@Shared()
export class SharedParserState extends SharedStructBase {
    @Shared() sharedMutex = new SharedMutex();
    @Shared() files = new SharedMap<string, SharedSourceFileEntry>();
}

/** @internal */
@Shared()
export class SharedSourceFileEntry extends SharedStructBase {
    @Shared() parserState: SharedParserState;
    @Shared() setParentNodes: boolean;
    @Shared() setFileVersion: boolean;
    @Shared() fileName: string;
    @Shared() languageVersion: ScriptTarget;
    @Shared() impliedNodeFormat: ResolutionMode | undefined;
    @Shared() shouldCreateNewSourceFile: boolean | undefined;
    @Shared() done = false;
    @Shared() error = false;
    @Shared() file: SharedSourceFile | undefined;
    @Shared() fileMutex = new Mutex();
    @Shared() fileCondition = new Condition();

    constructor(
        parserState: SharedParserState,
        setFileVersion: boolean,
        setParentNodes: boolean,
        fileName: string,
        languageVersion: ScriptTarget,
        impliedNodeFormat: ResolutionMode | undefined,
        shouldCreateNewSourceFile: boolean | undefined,
    ) {
        super();
        this.parserState = parserState;
        this.setFileVersion = setFileVersion;
        this.setParentNodes = setParentNodes;
        this.fileName = fileName;
        this.languageVersion = languageVersion;
        this.impliedNodeFormat = impliedNodeFormat;
        this.shouldCreateNewSourceFile = shouldCreateNewSourceFile;
    }
}

