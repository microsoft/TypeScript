/////////////////////////////
/// Window Iterable APIs
/////////////////////////////

interface AbortSignal {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/any_static) */
    any(signals: Iterable<AbortSignal>): AbortSignal;
}

interface AudioParam {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/AudioParam/setValueCurveAtTime) */
    setValueCurveAtTime(values: Iterable<number>, startTime: number, duration: number): AudioParam;
}

interface AudioParamMap extends ReadonlyMap<string, AudioParam> {
}

interface BaseAudioContext {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/BaseAudioContext/createIIRFilter) */
    createIIRFilter(feedforward: Iterable<number>, feedback: Iterable<number>): IIRFilterNode;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/BaseAudioContext/createPeriodicWave) */
    createPeriodicWave(real: Iterable<number>, imag: Iterable<number>, constraints?: PeriodicWaveConstraints): PeriodicWave;
}

interface CSSKeyframesRule {
    [Symbol.iterator](): BuiltinIterator<CSSKeyframeRule, BuiltinIteratorReturn>;
}

interface CSSNumericArray {
    [Symbol.iterator](): BuiltinIterator<CSSNumericValue, BuiltinIteratorReturn>;
    entries(): BuiltinIterator<[number, CSSNumericValue], BuiltinIteratorReturn>;
    keys(): BuiltinIterator<number, BuiltinIteratorReturn>;
    values(): BuiltinIterator<CSSNumericValue, BuiltinIteratorReturn>;
}

interface CSSRuleList {
    [Symbol.iterator](): BuiltinIterator<CSSRule, BuiltinIteratorReturn>;
}

interface CSSStyleDeclaration {
    [Symbol.iterator](): BuiltinIterator<string, BuiltinIteratorReturn>;
}

interface CSSTransformValue {
    [Symbol.iterator](): BuiltinIterator<CSSTransformComponent, BuiltinIteratorReturn>;
    entries(): BuiltinIterator<[number, CSSTransformComponent], BuiltinIteratorReturn>;
    keys(): BuiltinIterator<number, BuiltinIteratorReturn>;
    values(): BuiltinIterator<CSSTransformComponent, BuiltinIteratorReturn>;
}

interface CSSUnparsedValue {
    [Symbol.iterator](): BuiltinIterator<CSSUnparsedSegment, BuiltinIteratorReturn>;
    entries(): BuiltinIterator<[number, CSSUnparsedSegment], BuiltinIteratorReturn>;
    keys(): BuiltinIterator<number, BuiltinIteratorReturn>;
    values(): BuiltinIterator<CSSUnparsedSegment, BuiltinIteratorReturn>;
}

interface Cache {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Cache/addAll) */
    addAll(requests: Iterable<RequestInfo>): Promise<void>;
}

interface CanvasPath {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/roundRect) */
    roundRect(x: number, y: number, w: number, h: number, radii?: number | DOMPointInit | Iterable<number | DOMPointInit>): void;
}

interface CanvasPathDrawingStyles {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash) */
    setLineDash(segments: Iterable<number>): void;
}

interface CustomStateSet extends Set<string> {
}

interface DOMRectList {
    [Symbol.iterator](): BuiltinIterator<DOMRect, BuiltinIteratorReturn>;
}

interface DOMStringList {
    [Symbol.iterator](): BuiltinIterator<string, BuiltinIteratorReturn>;
}

interface DOMTokenList {
    [Symbol.iterator](): BuiltinIterator<string, BuiltinIteratorReturn>;
    entries(): BuiltinIterator<[number, string], BuiltinIteratorReturn>;
    keys(): BuiltinIterator<number, BuiltinIteratorReturn>;
    values(): BuiltinIterator<string, BuiltinIteratorReturn>;
}

interface DataTransferItemList {
    [Symbol.iterator](): BuiltinIterator<DataTransferItem, BuiltinIteratorReturn>;
}

interface EventCounts extends ReadonlyMap<string, number> {
}

interface FileList {
    [Symbol.iterator](): BuiltinIterator<File, BuiltinIteratorReturn>;
}

interface FontFaceSet extends Set<FontFace> {
}

interface FormData {
    [Symbol.iterator](): BuiltinIterator<[string, FormDataEntryValue], BuiltinIteratorReturn>;
    /** Returns an array of key, value pairs for every entry in the list. */
    entries(): BuiltinIterator<[string, FormDataEntryValue], BuiltinIteratorReturn>;
    /** Returns a list of keys in the list. */
    keys(): BuiltinIterator<string, BuiltinIteratorReturn>;
    /** Returns a list of values in the list. */
    values(): BuiltinIterator<FormDataEntryValue, BuiltinIteratorReturn>;
}

interface HTMLAllCollection {
    [Symbol.iterator](): BuiltinIterator<Element, BuiltinIteratorReturn>;
}

interface HTMLCollectionBase {
    [Symbol.iterator](): BuiltinIterator<Element, BuiltinIteratorReturn>;
}

interface HTMLCollectionOf<T extends Element> {
    [Symbol.iterator](): BuiltinIterator<T, BuiltinIteratorReturn>;
}

interface HTMLFormElement {
    [Symbol.iterator](): BuiltinIterator<Element, BuiltinIteratorReturn>;
}

interface HTMLSelectElement {
    [Symbol.iterator](): BuiltinIterator<HTMLOptionElement, BuiltinIteratorReturn>;
}

interface Headers {
    [Symbol.iterator](): BuiltinIterator<[string, string], BuiltinIteratorReturn>;
    /** Returns an iterator allowing to go through all key/value pairs contained in this object. */
    entries(): BuiltinIterator<[string, string], BuiltinIteratorReturn>;
    /** Returns an iterator allowing to go through all keys of the key/value pairs contained in this object. */
    keys(): BuiltinIterator<string, BuiltinIteratorReturn>;
    /** Returns an iterator allowing to go through all values of the key/value pairs contained in this object. */
    values(): BuiltinIterator<string, BuiltinIteratorReturn>;
}

interface Highlight extends Set<AbstractRange> {
}

interface HighlightRegistry extends Map<string, Highlight> {
}

interface IDBDatabase {
    /**
     * Returns a new transaction with the given mode ("readonly" or "readwrite") and scope which can be a single object store name or an array of names.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/IDBDatabase/transaction)
     */
    transaction(storeNames: string | Iterable<string>, mode?: IDBTransactionMode, options?: IDBTransactionOptions): IDBTransaction;
}

interface IDBObjectStore {
    /**
     * Creates a new index in store with the given name, keyPath and options and returns a new IDBIndex. If the keyPath and options define constraints that cannot be satisfied with the data already in store the upgrade transaction will abort with a "ConstraintError" DOMException.
     *
     * Throws an "InvalidStateError" DOMException if not called within an upgrade transaction.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/IDBObjectStore/createIndex)
     */
    createIndex(name: string, keyPath: string | Iterable<string>, options?: IDBIndexParameters): IDBIndex;
}

interface MIDIInputMap extends ReadonlyMap<string, MIDIInput> {
}

interface MIDIOutput {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/MIDIOutput/send) */
    send(data: Iterable<number>, timestamp?: DOMHighResTimeStamp): void;
}

interface MIDIOutputMap extends ReadonlyMap<string, MIDIOutput> {
}

interface MediaKeyStatusMap {
    [Symbol.iterator](): BuiltinIterator<[BufferSource, MediaKeyStatus], BuiltinIteratorReturn>;
    entries(): BuiltinIterator<[BufferSource, MediaKeyStatus], BuiltinIteratorReturn>;
    keys(): BuiltinIterator<BufferSource, BuiltinIteratorReturn>;
    values(): BuiltinIterator<MediaKeyStatus, BuiltinIteratorReturn>;
}

interface MediaList {
    [Symbol.iterator](): BuiltinIterator<string, BuiltinIteratorReturn>;
}

interface MessageEvent<T = any> {
    /** @deprecated */
    initMessageEvent(type: string, bubbles?: boolean, cancelable?: boolean, data?: any, origin?: string, lastEventId?: string, source?: MessageEventSource | null, ports?: Iterable<MessagePort>): void;
}

interface MimeTypeArray {
    [Symbol.iterator](): BuiltinIterator<MimeType, BuiltinIteratorReturn>;
}

interface NamedNodeMap {
    [Symbol.iterator](): BuiltinIterator<Attr, BuiltinIteratorReturn>;
}

interface Navigator {
    /**
     * Available only in secure contexts.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/requestMediaKeySystemAccess)
     */
    requestMediaKeySystemAccess(keySystem: string, supportedConfigurations: Iterable<MediaKeySystemConfiguration>): Promise<MediaKeySystemAccess>;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/vibrate) */
    vibrate(pattern: Iterable<number>): boolean;
}

interface NodeList {
    [Symbol.iterator](): BuiltinIterator<Node, BuiltinIteratorReturn>;
    /** Returns an array of key, value pairs for every entry in the list. */
    entries(): BuiltinIterator<[number, Node], BuiltinIteratorReturn>;
    /** Returns an list of keys in the list. */
    keys(): BuiltinIterator<number, BuiltinIteratorReturn>;
    /** Returns an list of values in the list. */
    values(): BuiltinIterator<Node, BuiltinIteratorReturn>;
}

interface NodeListOf<TNode extends Node> {
    [Symbol.iterator](): BuiltinIterator<TNode, BuiltinIteratorReturn>;
    /** Returns an array of key, value pairs for every entry in the list. */
    entries(): BuiltinIterator<[number, TNode], BuiltinIteratorReturn>;
    /** Returns an list of keys in the list. */
    keys(): BuiltinIterator<number, BuiltinIteratorReturn>;
    /** Returns an list of values in the list. */
    values(): BuiltinIterator<TNode, BuiltinIteratorReturn>;
}

interface Plugin {
    [Symbol.iterator](): BuiltinIterator<MimeType, BuiltinIteratorReturn>;
}

interface PluginArray {
    [Symbol.iterator](): BuiltinIterator<Plugin, BuiltinIteratorReturn>;
}

interface RTCRtpTransceiver {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/RTCRtpTransceiver/setCodecPreferences) */
    setCodecPreferences(codecs: Iterable<RTCRtpCodec>): void;
}

interface RTCStatsReport extends ReadonlyMap<string, any> {
}

interface SVGLengthList {
    [Symbol.iterator](): BuiltinIterator<SVGLength, BuiltinIteratorReturn>;
}

interface SVGNumberList {
    [Symbol.iterator](): BuiltinIterator<SVGNumber, BuiltinIteratorReturn>;
}

interface SVGPointList {
    [Symbol.iterator](): BuiltinIterator<DOMPoint, BuiltinIteratorReturn>;
}

interface SVGStringList {
    [Symbol.iterator](): BuiltinIterator<string, BuiltinIteratorReturn>;
}

interface SVGTransformList {
    [Symbol.iterator](): BuiltinIterator<SVGTransform, BuiltinIteratorReturn>;
}

interface SourceBufferList {
    [Symbol.iterator](): BuiltinIterator<SourceBuffer, BuiltinIteratorReturn>;
}

interface SpeechRecognitionResult {
    [Symbol.iterator](): BuiltinIterator<SpeechRecognitionAlternative, BuiltinIteratorReturn>;
}

interface SpeechRecognitionResultList {
    [Symbol.iterator](): BuiltinIterator<SpeechRecognitionResult, BuiltinIteratorReturn>;
}

interface StylePropertyMapReadOnly {
    [Symbol.iterator](): BuiltinIterator<[string, Iterable<CSSStyleValue>], BuiltinIteratorReturn>;
    entries(): BuiltinIterator<[string, Iterable<CSSStyleValue>], BuiltinIteratorReturn>;
    keys(): BuiltinIterator<string, BuiltinIteratorReturn>;
    values(): BuiltinIterator<Iterable<CSSStyleValue>, BuiltinIteratorReturn>;
}

interface StyleSheetList {
    [Symbol.iterator](): BuiltinIterator<CSSStyleSheet, BuiltinIteratorReturn>;
}

interface SubtleCrypto {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/deriveKey) */
    deriveKey(algorithm: AlgorithmIdentifier | EcdhKeyDeriveParams | HkdfParams | Pbkdf2Params, baseKey: CryptoKey, derivedKeyType: AlgorithmIdentifier | AesDerivedKeyParams | HmacImportParams | HkdfParams | Pbkdf2Params, extractable: boolean, keyUsages: Iterable<KeyUsage>): Promise<CryptoKey>;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/generateKey) */
    generateKey(algorithm: "Ed25519", extractable: boolean, keyUsages: ReadonlyArray<"sign" | "verify">): Promise<CryptoKeyPair>;
    generateKey(algorithm: RsaHashedKeyGenParams | EcKeyGenParams, extractable: boolean, keyUsages: ReadonlyArray<KeyUsage>): Promise<CryptoKeyPair>;
    generateKey(algorithm: AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params, extractable: boolean, keyUsages: ReadonlyArray<KeyUsage>): Promise<CryptoKey>;
    generateKey(algorithm: AlgorithmIdentifier, extractable: boolean, keyUsages: Iterable<KeyUsage>): Promise<CryptoKeyPair | CryptoKey>;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/importKey) */
    importKey(format: "jwk", keyData: JsonWebKey, algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm, extractable: boolean, keyUsages: ReadonlyArray<KeyUsage>): Promise<CryptoKey>;
    importKey(format: Exclude<KeyFormat, "jwk">, keyData: BufferSource, algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm, extractable: boolean, keyUsages: Iterable<KeyUsage>): Promise<CryptoKey>;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/unwrapKey) */
    unwrapKey(format: KeyFormat, wrappedKey: BufferSource, unwrappingKey: CryptoKey, unwrapAlgorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams, unwrappedKeyAlgorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm, extractable: boolean, keyUsages: Iterable<KeyUsage>): Promise<CryptoKey>;
}

interface TextTrackCueList {
    [Symbol.iterator](): BuiltinIterator<TextTrackCue, BuiltinIteratorReturn>;
}

interface TextTrackList {
    [Symbol.iterator](): BuiltinIterator<TextTrack, BuiltinIteratorReturn>;
}

interface TouchList {
    [Symbol.iterator](): BuiltinIterator<Touch, BuiltinIteratorReturn>;
}

interface URLSearchParams {
    [Symbol.iterator](): BuiltinIterator<[string, string], BuiltinIteratorReturn>;
    /** Returns an array of key, value pairs for every entry in the search params. */
    entries(): BuiltinIterator<[string, string], BuiltinIteratorReturn>;
    /** Returns a list of keys in the search params. */
    keys(): BuiltinIterator<string, BuiltinIteratorReturn>;
    /** Returns a list of values in the search params. */
    values(): BuiltinIterator<string, BuiltinIteratorReturn>;
}

interface WEBGL_draw_buffers {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WEBGL_draw_buffers/drawBuffersWEBGL) */
    drawBuffersWEBGL(buffers: Iterable<GLenum>): void;
}

interface WEBGL_multi_draw {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WEBGL_multi_draw/multiDrawArraysInstancedWEBGL) */
    multiDrawArraysInstancedWEBGL(mode: GLenum, firstsList: Int32Array | Iterable<GLint>, firstsOffset: number, countsList: Int32Array | Iterable<GLsizei>, countsOffset: number, instanceCountsList: Int32Array | Iterable<GLsizei>, instanceCountsOffset: number, drawcount: GLsizei): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WEBGL_multi_draw/multiDrawArraysWEBGL) */
    multiDrawArraysWEBGL(mode: GLenum, firstsList: Int32Array | Iterable<GLint>, firstsOffset: number, countsList: Int32Array | Iterable<GLsizei>, countsOffset: number, drawcount: GLsizei): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WEBGL_multi_draw/multiDrawElementsInstancedWEBGL) */
    multiDrawElementsInstancedWEBGL(mode: GLenum, countsList: Int32Array | Iterable<GLsizei>, countsOffset: number, type: GLenum, offsetsList: Int32Array | Iterable<GLsizei>, offsetsOffset: number, instanceCountsList: Int32Array | Iterable<GLsizei>, instanceCountsOffset: number, drawcount: GLsizei): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WEBGL_multi_draw/multiDrawElementsWEBGL) */
    multiDrawElementsWEBGL(mode: GLenum, countsList: Int32Array | Iterable<GLsizei>, countsOffset: number, type: GLenum, offsetsList: Int32Array | Iterable<GLsizei>, offsetsOffset: number, drawcount: GLsizei): void;
}

interface WebGL2RenderingContextBase {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/clearBuffer) */
    clearBufferfv(buffer: GLenum, drawbuffer: GLint, values: Iterable<GLfloat>, srcOffset?: number): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/clearBuffer) */
    clearBufferiv(buffer: GLenum, drawbuffer: GLint, values: Iterable<GLint>, srcOffset?: number): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/clearBuffer) */
    clearBufferuiv(buffer: GLenum, drawbuffer: GLint, values: Iterable<GLuint>, srcOffset?: number): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/drawBuffers) */
    drawBuffers(buffers: Iterable<GLenum>): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/getActiveUniforms) */
    getActiveUniforms(program: WebGLProgram, uniformIndices: Iterable<GLuint>, pname: GLenum): any;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/getUniformIndices) */
    getUniformIndices(program: WebGLProgram, uniformNames: Iterable<string>): Iterable<GLuint> | null;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/invalidateFramebuffer) */
    invalidateFramebuffer(target: GLenum, attachments: Iterable<GLenum>): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/invalidateSubFramebuffer) */
    invalidateSubFramebuffer(target: GLenum, attachments: Iterable<GLenum>, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/transformFeedbackVaryings) */
    transformFeedbackVaryings(program: WebGLProgram, varyings: Iterable<string>, bufferMode: GLenum): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/uniform) */
    uniform1uiv(location: WebGLUniformLocation | null, data: Iterable<GLuint>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/uniform) */
    uniform2uiv(location: WebGLUniformLocation | null, data: Iterable<GLuint>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/uniform) */
    uniform3uiv(location: WebGLUniformLocation | null, data: Iterable<GLuint>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/uniform) */
    uniform4uiv(location: WebGLUniformLocation | null, data: Iterable<GLuint>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/uniformMatrix) */
    uniformMatrix2x3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/uniformMatrix) */
    uniformMatrix2x4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/uniformMatrix) */
    uniformMatrix3x2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/uniformMatrix) */
    uniformMatrix3x4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/uniformMatrix) */
    uniformMatrix4x2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/uniformMatrix) */
    uniformMatrix4x3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/vertexAttribI) */
    vertexAttribI4iv(index: GLuint, values: Iterable<GLint>): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext/vertexAttribI) */
    vertexAttribI4uiv(index: GLuint, values: Iterable<GLuint>): void;
}

interface WebGL2RenderingContextOverloads {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniform) */
    uniform1fv(location: WebGLUniformLocation | null, data: Iterable<GLfloat>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniform) */
    uniform1iv(location: WebGLUniformLocation | null, data: Iterable<GLint>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniform) */
    uniform2fv(location: WebGLUniformLocation | null, data: Iterable<GLfloat>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniform) */
    uniform2iv(location: WebGLUniformLocation | null, data: Iterable<GLint>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniform) */
    uniform3fv(location: WebGLUniformLocation | null, data: Iterable<GLfloat>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniform) */
    uniform3iv(location: WebGLUniformLocation | null, data: Iterable<GLint>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniform) */
    uniform4fv(location: WebGLUniformLocation | null, data: Iterable<GLfloat>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniform) */
    uniform4iv(location: WebGLUniformLocation | null, data: Iterable<GLint>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniformMatrix) */
    uniformMatrix2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniformMatrix) */
    uniformMatrix3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: number, srcLength?: GLuint): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniformMatrix) */
    uniformMatrix4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: number, srcLength?: GLuint): void;
}

interface WebGLRenderingContextBase {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/vertexAttrib) */
    vertexAttrib1fv(index: GLuint, values: Iterable<GLfloat>): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/vertexAttrib) */
    vertexAttrib2fv(index: GLuint, values: Iterable<GLfloat>): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/vertexAttrib) */
    vertexAttrib3fv(index: GLuint, values: Iterable<GLfloat>): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/vertexAttrib) */
    vertexAttrib4fv(index: GLuint, values: Iterable<GLfloat>): void;
}

interface WebGLRenderingContextOverloads {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniform) */
    uniform1fv(location: WebGLUniformLocation | null, v: Iterable<GLfloat>): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniform) */
    uniform1iv(location: WebGLUniformLocation | null, v: Iterable<GLint>): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniform) */
    uniform2fv(location: WebGLUniformLocation | null, v: Iterable<GLfloat>): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniform) */
    uniform2iv(location: WebGLUniformLocation | null, v: Iterable<GLint>): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniform) */
    uniform3fv(location: WebGLUniformLocation | null, v: Iterable<GLfloat>): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniform) */
    uniform3iv(location: WebGLUniformLocation | null, v: Iterable<GLint>): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniform) */
    uniform4fv(location: WebGLUniformLocation | null, v: Iterable<GLfloat>): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniform) */
    uniform4iv(location: WebGLUniformLocation | null, v: Iterable<GLint>): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniformMatrix) */
    uniformMatrix2fv(location: WebGLUniformLocation | null, transpose: GLboolean, value: Iterable<GLfloat>): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniformMatrix) */
    uniformMatrix3fv(location: WebGLUniformLocation | null, transpose: GLboolean, value: Iterable<GLfloat>): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/uniformMatrix) */
    uniformMatrix4fv(location: WebGLUniformLocation | null, transpose: GLboolean, value: Iterable<GLfloat>): void;
}
