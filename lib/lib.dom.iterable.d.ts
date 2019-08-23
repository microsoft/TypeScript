/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */



/// <reference no-default-lib="true"/>


/////////////////////////////
/// DOM Iterable APIs
/////////////////////////////

interface AudioParam {
    setValueCurveAtTime(values: Iterable<number>, startTime: number, duration: number): AudioParam;
}

interface AudioParamMap extends ReadonlyMap<string, AudioParam> {
}

interface AudioTrackList {
    [Symbol.iterator](): IterableIterator<AudioTrack>;
}

interface BaseAudioContext {
    createIIRFilter(feedforward: Iterable<number>, feedback: Iterable<number>): IIRFilterNode;
    createPeriodicWave(real: Iterable<number>, imag: Iterable<number>, constraints?: PeriodicWaveConstraints): PeriodicWave;
}

interface CSSRuleList {
    [Symbol.iterator](): IterableIterator<CSSRule>;
}

interface CSSStyleDeclaration {
    [Symbol.iterator](): IterableIterator<string>;
}

interface Cache {
    addAll(requests: Iterable<RequestInfo>): Promise<void>;
}

interface CanvasPathDrawingStyles {
    setLineDash(segments: Iterable<number>): void;
}

interface ClientRectList {
    [Symbol.iterator](): IterableIterator<ClientRect>;
}

interface DOMRectList {
    [Symbol.iterator](): IterableIterator<DOMRect>;
}

interface DOMStringList {
    [Symbol.iterator](): IterableIterator<string>;
}

interface DOMTokenList {
    [Symbol.iterator](): IterableIterator<string>;
    entries(): IterableIterator<[number, string]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<string>;
}

interface DataTransferItemList {
    [Symbol.iterator](): IterableIterator<DataTransferItem>;
}

interface FileList {
    [Symbol.iterator](): IterableIterator<File>;
}

interface FormData {
    [Symbol.iterator](): IterableIterator<[string, FormDataEntryValue]>;
    /**
     * Returns an array of key, value pairs for every entry in the list.
     */
    entries(): IterableIterator<[string, FormDataEntryValue]>;
    /**
     * Returns a list of keys in the list.
     */
    keys(): IterableIterator<string>;
    /**
     * Returns a list of values in the list.
     */
    values(): IterableIterator<FormDataEntryValue>;
}

interface HTMLAllCollection {
    [Symbol.iterator](): IterableIterator<Element>;
}

interface HTMLCollectionBase {
    [Symbol.iterator](): IterableIterator<Element>;
}

interface HTMLCollectionOf<T extends Element> {
    [Symbol.iterator](): IterableIterator<T>;
}

interface HTMLFormElement {
    [Symbol.iterator](): IterableIterator<Element>;
}

interface HTMLSelectElement {
    [Symbol.iterator](): IterableIterator<Element>;
}

interface Headers {
    [Symbol.iterator](): IterableIterator<[string, string]>;
    /**
     * Returns an iterator allowing to go through all key/value pairs contained in this object.
     */
    entries(): IterableIterator<[string, string]>;
    /**
     * Returns an iterator allowing to go through all keys of the key/value pairs contained in this object.
     */
    keys(): IterableIterator<string>;
    /**
     * Returns an iterator allowing to go through all values of the key/value pairs contained in this object.
     */
    values(): IterableIterator<string>;
}

interface IDBObjectStore {
    /**
     * Creates a new index in store with the given name, keyPath and options and returns a new IDBIndex. If the keyPath and options define constraints that cannot be satisfied with the data already in store the upgrade transaction will abort with a "ConstraintError" DOMException.
     * 
     * Throws an "InvalidStateError" DOMException if not called within an upgrade transaction.
     */
    createIndex(name: string, keyPath: string | Iterable<string>, options?: IDBIndexParameters): IDBIndex;
}

interface MediaKeyStatusMap {
    [Symbol.iterator](): IterableIterator<[BufferSource, MediaKeyStatus]>;
    entries(): IterableIterator<[BufferSource, MediaKeyStatus]>;
    keys(): IterableIterator<BufferSource>;
    values(): IterableIterator<MediaKeyStatus>;
}

interface MediaList {
    [Symbol.iterator](): IterableIterator<string>;
}

interface MimeTypeArray {
    [Symbol.iterator](): IterableIterator<MimeType>;
}

interface NamedNodeMap {
    [Symbol.iterator](): IterableIterator<Attr>;
}

interface Navigator {
    requestMediaKeySystemAccess(keySystem: string, supportedConfigurations: Iterable<MediaKeySystemConfiguration>): Promise<MediaKeySystemAccess>;
}

interface NodeList {
    [Symbol.iterator](): IterableIterator<Node>;
    /**
     * Returns an array of key, value pairs for every entry in the list.
     */
    entries(): IterableIterator<[number, Node]>;
    /**
     * Returns an list of keys in the list.
     */
    keys(): IterableIterator<number>;
    /**
     * Returns an list of values in the list.
     */
    values(): IterableIterator<Node>;
}

interface NodeListOf<TNode extends Node> {
    [Symbol.iterator](): IterableIterator<TNode>;
    /**
     * Returns an array of key, value pairs for every entry in the list.
     */
    entries(): IterableIterator<[number, TNode]>;
    /**
     * Returns an list of keys in the list.
     */
    keys(): IterableIterator<number>;
    /**
     * Returns an list of values in the list.
     */
    values(): IterableIterator<TNode>;
}

interface Plugin {
    [Symbol.iterator](): IterableIterator<MimeType>;
}

interface PluginArray {
    [Symbol.iterator](): IterableIterator<Plugin>;
}

interface RTCRtpTransceiver {
    setCodecPreferences(codecs: Iterable<RTCRtpCodecCapability>): void;
}

interface RTCStatsReport extends ReadonlyMap<string, any> {
}

interface SVGLengthList {
    [Symbol.iterator](): IterableIterator<SVGLength>;
}

interface SVGNumberList {
    [Symbol.iterator](): IterableIterator<SVGNumber>;
}

interface SVGPointList {
    [Symbol.iterator](): IterableIterator<DOMPoint>;
}

interface SVGStringList {
    [Symbol.iterator](): IterableIterator<string>;
}

interface SourceBufferList {
    [Symbol.iterator](): IterableIterator<SourceBuffer>;
}

interface SpeechGrammarList {
    [Symbol.iterator](): IterableIterator<SpeechGrammar>;
}

interface SpeechRecognitionResult {
    [Symbol.iterator](): IterableIterator<SpeechRecognitionAlternative>;
}

interface SpeechRecognitionResultList {
    [Symbol.iterator](): IterableIterator<SpeechRecognitionResult>;
}

interface StyleSheetList {
    [Symbol.iterator](): IterableIterator<StyleSheet>;
}

interface TextTrackCueList {
    [Symbol.iterator](): IterableIterator<TextTrackCue>;
}

interface TextTrackList {
    [Symbol.iterator](): IterableIterator<TextTrack>;
}

interface TouchList {
    [Symbol.iterator](): IterableIterator<Touch>;
}

interface URLSearchParams {
    [Symbol.iterator](): IterableIterator<[string, string]>;
    /**
     * Returns an array of key, value pairs for every entry in the search params.
     */
    entries(): IterableIterator<[string, string]>;
    /**
     * Returns a list of keys in the search params.
     */
    keys(): IterableIterator<string>;
    /**
     * Returns a list of values in the search params.
     */
    values(): IterableIterator<string>;
}

interface VRDisplay {
    requestPresent(layers: Iterable<VRLayer>): Promise<void>;
}

interface VideoTrackList {
    [Symbol.iterator](): IterableIterator<VideoTrack>;
}

interface WEBGL_draw_buffers {
    drawBuffersWEBGL(buffers: Iterable<GLenum>): void;
}

interface WebAuthentication {
    makeCredential(accountInformation: Account, cryptoParameters: Iterable<ScopedCredentialParameters>, attestationChallenge: Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer | null, options?: ScopedCredentialOptions): Promise<ScopedCredentialInfo>;
}

interface WebGL2RenderingContextBase {
    invalidateFramebuffer(target: GLenum, attachments: Iterable<GLenum>): void;
    invalidateSubFramebuffer(target: GLenum, attachments: Iterable<GLenum>, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;
    uniform1uiv(location: WebGLUniformLocation | null, data: Iterable<GLuint>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform2uiv(location: WebGLUniformLocation | null, data: Iterable<GLuint>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform3uiv(location: WebGLUniformLocation | null, data: Iterable<GLuint>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform4uiv(location: WebGLUniformLocation | null, data: Iterable<GLuint>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix3x2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix4x2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix2x3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix4x3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix2x4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix3x4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: GLuint, srcLength?: GLuint): void;
    vertexAttribI4iv(index: GLuint, values: Iterable<GLint>): void;
    vertexAttribI4uiv(index: GLuint, values: Iterable<GLuint>): void;
    drawBuffers(buffers: Iterable<GLenum>): void;
    clearBufferfv(buffer: GLenum, drawbuffer: GLint, values: Iterable<GLfloat>, srcOffset?: GLuint): void;
    clearBufferiv(buffer: GLenum, drawbuffer: GLint, values: Iterable<GLint>, srcOffset?: GLuint): void;
    clearBufferuiv(buffer: GLenum, drawbuffer: GLint, values: Iterable<GLuint>, srcOffset?: GLuint): void;
    transformFeedbackVaryings(program: WebGLProgram, varyings: Iterable<string>, bufferMode: GLenum): void;
    getUniformIndices(program: WebGLProgram, uniformNames: Iterable<string>): Iterable<GLuint> | null;
    getActiveUniforms(program: WebGLProgram, uniformIndices: Iterable<GLuint>, pname: GLenum): any;
}

interface WebGL2RenderingContextOverloads {
    uniform1fv(location: WebGLUniformLocation | null, data: Iterable<GLfloat>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform2fv(location: WebGLUniformLocation | null, data: Iterable<GLfloat>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform3fv(location: WebGLUniformLocation | null, data: Iterable<GLfloat>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform4fv(location: WebGLUniformLocation | null, data: Iterable<GLfloat>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform1iv(location: WebGLUniformLocation | null, data: Iterable<GLint>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform2iv(location: WebGLUniformLocation | null, data: Iterable<GLint>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform3iv(location: WebGLUniformLocation | null, data: Iterable<GLint>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniform4iv(location: WebGLUniformLocation | null, data: Iterable<GLint>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: GLuint, srcLength?: GLuint): void;
    uniformMatrix4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Iterable<GLfloat>, srcOffset?: GLuint, srcLength?: GLuint): void;
}

interface WebGLRenderingContextBase {
    vertexAttrib1fv(index: GLuint, values: Iterable<GLfloat>): void;
    vertexAttrib2fv(index: GLuint, values: Iterable<GLfloat>): void;
    vertexAttrib3fv(index: GLuint, values: Iterable<GLfloat>): void;
    vertexAttrib4fv(index: GLuint, values: Iterable<GLfloat>): void;
}

interface WebGLRenderingContextOverloads {
    uniform1fv(location: WebGLUniformLocation | null, v: Iterable<GLfloat>): void;
    uniform2fv(location: WebGLUniformLocation | null, v: Iterable<GLfloat>): void;
    uniform3fv(location: WebGLUniformLocation | null, v: Iterable<GLfloat>): void;
    uniform4fv(location: WebGLUniformLocation | null, v: Iterable<GLfloat>): void;
    uniform1iv(location: WebGLUniformLocation | null, v: Iterable<GLint>): void;
    uniform2iv(location: WebGLUniformLocation | null, v: Iterable<GLint>): void;
    uniform3iv(location: WebGLUniformLocation | null, v: Iterable<GLint>): void;
    uniform4iv(location: WebGLUniformLocation | null, v: Iterable<GLint>): void;
    uniformMatrix2fv(location: WebGLUniformLocation | null, transpose: GLboolean, value: Iterable<GLfloat>): void;
    uniformMatrix3fv(location: WebGLUniformLocation | null, transpose: GLboolean, value: Iterable<GLfloat>): void;
    uniformMatrix4fv(location: WebGLUniformLocation | null, transpose: GLboolean, value: Iterable<GLfloat>): void;
}
