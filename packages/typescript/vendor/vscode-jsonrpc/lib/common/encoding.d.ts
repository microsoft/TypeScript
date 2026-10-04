import type RAL from './ral';
import { Message } from './messages';
export interface FunctionContentEncoder {
    name: string;
    encode(input: Uint8Array): Promise<Uint8Array>;
}
export interface StreamContentEncoder {
    name: string;
    create(): RAL.WritableStream;
}
export type ContentEncoder = FunctionContentEncoder | (FunctionContentEncoder & StreamContentEncoder);
export interface FunctionContentDecoder {
    name: string;
    decode(buffer: Uint8Array): Promise<Uint8Array>;
}
export interface StreamContentDecoder {
    name: string;
    create(): RAL.WritableStream;
}
export type ContentDecoder = FunctionContentDecoder | (FunctionContentDecoder & StreamContentDecoder);
export interface ContentTypeEncoderOptions {
    charset: RAL.MessageBufferEncoding;
}
export interface FunctionContentTypeEncoder {
    name: string;
    encode(msg: Message, options: ContentTypeEncoderOptions): Promise<Uint8Array>;
}
export interface StreamContentTypeEncoder {
    name: string;
    create(options: ContentTypeEncoderOptions): RAL.WritableStream;
}
export type ContentTypeEncoder = FunctionContentTypeEncoder | (FunctionContentTypeEncoder & StreamContentTypeEncoder);
export interface ContentTypeDecoderOptions {
    charset: RAL.MessageBufferEncoding;
}
export interface FunctionContentTypeDecoder {
    name: string;
    decode(buffer: Uint8Array, options: ContentTypeDecoderOptions): Promise<Message>;
}
export interface StreamContentTypeDecoder {
    name: string;
    create(options: ContentTypeDecoderOptions): RAL.WritableStream;
}
export type ContentTypeDecoder = FunctionContentTypeDecoder | (FunctionContentTypeDecoder & StreamContentTypeDecoder);
interface Named {
    name: string;
}
export declare namespace Encodings {
    function getEncodingHeaderValue(encodings: Named[]): string | undefined;
    function parseEncodingHeaderValue(value: string): string[];
}
export {};
