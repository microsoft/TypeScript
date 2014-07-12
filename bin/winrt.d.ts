/* *****************************************************************************
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

declare module Windows {
    export module Foundation {
        export module Collections {
            export enum CollectionChange {
                reset,
                itemInserted,
                itemRemoved,
                itemChanged,
            }
            export interface IVectorChangedEventArgs {
                collectionChange: Windows.Foundation.Collections.CollectionChange;
                index: number;
            }
            export interface IPropertySet extends Windows.Foundation.Collections.IObservableMap<string, any>, Windows.Foundation.Collections.IMap<string, any>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, any>> {
            }
            export class PropertySet implements Windows.Foundation.Collections.IPropertySet, Windows.Foundation.Collections.IObservableMap<string, any>, Windows.Foundation.Collections.IMap<string, any>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, any>> {
                size: number;
                onmapchanged: any/* TODO */;
                lookup(key: string): any;
                hasKey(key: string): boolean;
                getView(): Windows.Foundation.Collections.IMapView<string, any>;
                insert(key: string, value: any): boolean;
                remove(key: string): void;
                clear(): void;
                first(): Windows.Foundation.Collections.IIterator<Windows.Foundation.Collections.IKeyValuePair<string, any>>;
            }
            export interface IIterable<T> {
                first(): Windows.Foundation.Collections.IIterator<T>;
            }
            export interface IIterator<T> {
                current: T;
                hasCurrent: boolean;
                moveNext(): boolean;
                getMany(): { items: T[]; returnValue: number; };
            }
            export interface IVectorView<T> extends Windows.Foundation.Collections.IIterable<T> {
                size: number;
                getAt(index: number): T;
                indexOf(value: T): { index: number; returnValue: boolean; };
                getMany(startIndex: number): { items: T[]; returnValue: number; };

                toString(): string;
                toLocaleString(): string;
                concat(...items: T[][]): T[];
                join(seperator: string): string;
                pop(): T;
                push(...items: T[]): void;
                reverse(): T[];
                shift(): T;
                slice(start: number): T[];
                slice(start: number, end: number): T[];
                sort(): T[];
                sort(compareFn: (a: T, b: T) => number): T[];
                splice(start: number): T[];
                splice(start: number, deleteCount: number, ...items: T[]): T[];
                unshift(...items: T[]): number;
                lastIndexOf(searchElement: T): number;
                lastIndexOf(searchElement: T, fromIndex: number): number;
                every(callbackfn: (value: T, index: number, array: T[]) => boolean): boolean;
                every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg: any): boolean;
                some(callbackfn: (value: T, index: number, array: T[]) => boolean): boolean;
                some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg: any): boolean;
                forEach(callbackfn: (value: T, index: number, array: T[]) => void ): void;
                forEach(callbackfn: (value: T, index: number, array: T[]) => void , thisArg: any): void;
                map(callbackfn: (value: T, index: number, array: T[]) => any): any[];
                map(callbackfn: (value: T, index: number, array: T[]) => any, thisArg: any): any[];
                filter(callbackfn: (value: T, index: number, array: T[]) => boolean): T[];
                filter(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg: any): T[];
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: T[]) => any): any;
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: T[]) => any, initialValue: any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: T[]) => any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: T[]) => any, initialValue: any): any;
                length: number;
            }
            export interface IVector<T> extends Windows.Foundation.Collections.IIterable<T> {
                size: number;
                getAt(index: number): T;
                getView(): Windows.Foundation.Collections.IVectorView<T>;
                indexOf(value: T): { index: number; returnValue: boolean; };
                setAt(index: number, value: T): void;
                insertAt(index: number, value: T): void;
                removeAt(index: number): void;
                append(value: T): void;
                removeAtEnd(): void;
                clear(): void;
                getMany(startIndex: number): { items: T[]; returnValue: number; };
                replaceAll(items: T[]): void;

                toString(): string;
                toLocaleString(): string;
                concat(...items: T[][]): T[];
                join(seperator: string): string;
                pop(): T;
                push(...items: T[]): void;
                reverse(): T[];
                shift(): T;
                slice(start: number): T[];
                slice(start: number, end: number): T[];
                sort(): T[];
                sort(compareFn: (a: T, b: T) => number): T[];
                splice(start: number): T[];
                splice(start: number, deleteCount: number, ...items: T[]): T[];
                unshift(...items: T[]): number;
                lastIndexOf(searchElement: T): number;
                lastIndexOf(searchElement: T, fromIndex: number): number;
                every(callbackfn: (value: T, index: number, array: T[]) => boolean): boolean;
                every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg: any): boolean;
                some(callbackfn: (value: T, index: number, array: T[]) => boolean): boolean;
                some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg: any): boolean;
                forEach(callbackfn: (value: T, index: number, array: T[]) => void ): void;
                forEach(callbackfn: (value: T, index: number, array: T[]) => void , thisArg: any): void;
                map(callbackfn: (value: T, index: number, array: T[]) => any): any[];
                map(callbackfn: (value: T, index: number, array: T[]) => any, thisArg: any): any[];
                filter(callbackfn: (value: T, index: number, array: T[]) => boolean): T[];
                filter(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg: any): T[];
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: T[]) => any): any;
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: T[]) => any, initialValue: any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: T[]) => any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: T[]) => any, initialValue: any): any;
                length: number;
            }
            export interface IKeyValuePair<K, V> {
                key: K;
                value: V;
            }
            export interface IMap<K, V> extends Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<K, V>> {
                size: number;
                lookup(key: K): V;
                hasKey(key: K): boolean;
                getView(): Windows.Foundation.Collections.IMapView<K, V>;
                insert(key: K, value: V): boolean;
                remove(key: K): void;
                clear(): void;
            }
            export interface IMapView<K, V> extends Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<K, V>> {
                size: number;
                lookup(key: K): V;
                hasKey(key: K): boolean;
                split(): { first: Windows.Foundation.Collections.IMapView<K, V>; second: Windows.Foundation.Collections.IMapView<K, V>; };
            }
            export interface VectorChangedEventHandler<T> {
                (sender: Windows.Foundation.Collections.IObservableVector<T>, event: Windows.Foundation.Collections.IVectorChangedEventArgs): void;
            }
            export interface IObservableVector<T> extends Windows.Foundation.Collections.IVector<T>, Windows.Foundation.Collections.IIterable<T> {
                onvectorchanged: any/* TODO */;
            }
            export interface IMapChangedEventArgs<K> {
                collectionChange: Windows.Foundation.Collections.CollectionChange;
                key: K;
            }
            export interface MapChangedEventHandler<K, V> {
                (sender: Windows.Foundation.Collections.IObservableMap<K, V>, event: Windows.Foundation.Collections.IMapChangedEventArgs<K>): void;
            }
            export interface IObservableMap<K, V> extends Windows.Foundation.Collections.IMap<K, V>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<K, V>> {
                onmapchanged: any/* TODO */;
            }
        }
    }
}
declare module Windows {
    export module Foundation {
        export interface IUriRuntimeClass {
            absoluteUri: string;
            displayUri: string;
            domain: string;
            extension: string;
            fragment: string;
            host: string;
            password: string;
            path: string;
            port: number;
            query: string;
            queryParsed: Windows.Foundation.WwwFormUrlDecoder;
            rawUri: string;
            schemeName: string;
            suspicious: boolean;
            userName: string;
            equals(pUri: Windows.Foundation.Uri): boolean;
            combineUri(relativeUri: string): Windows.Foundation.Uri;
        }
        export class WwwFormUrlDecoder implements Windows.Foundation.IWwwFormUrlDecoderRuntimeClass, Windows.Foundation.Collections.IIterable<Windows.Foundation.IWwwFormUrlDecoderEntry>, Windows.Foundation.Collections.IVectorView<Windows.Foundation.IWwwFormUrlDecoderEntry> {
            constructor(query: string);
            size: number;
            getFirstValueByName(name: string): string;
            first(): Windows.Foundation.Collections.IIterator<Windows.Foundation.IWwwFormUrlDecoderEntry>;
            getAt(index: number): Windows.Foundation.IWwwFormUrlDecoderEntry;
            indexOf(value: Windows.Foundation.IWwwFormUrlDecoderEntry): { index: number; returnValue: boolean; };
            getMany(startIndex: number): { items: Windows.Foundation.IWwwFormUrlDecoderEntry[]; returnValue: number; };
            toString(): string;
            toLocaleString(): string;
            concat(...items: Windows.Foundation.IWwwFormUrlDecoderEntry[][]): Windows.Foundation.IWwwFormUrlDecoderEntry[];
            join(seperator: string): string;
            pop(): Windows.Foundation.IWwwFormUrlDecoderEntry;
            push(...items: Windows.Foundation.IWwwFormUrlDecoderEntry[]): void;
            reverse(): Windows.Foundation.IWwwFormUrlDecoderEntry[];
            shift(): Windows.Foundation.IWwwFormUrlDecoderEntry;
            slice(start: number): Windows.Foundation.IWwwFormUrlDecoderEntry[];
            slice(start: number, end: number): Windows.Foundation.IWwwFormUrlDecoderEntry[];
            sort(): Windows.Foundation.IWwwFormUrlDecoderEntry[];
            sort(compareFn: (a: Windows.Foundation.IWwwFormUrlDecoderEntry, b: Windows.Foundation.IWwwFormUrlDecoderEntry) => number): Windows.Foundation.IWwwFormUrlDecoderEntry[];
            splice(start: number): Windows.Foundation.IWwwFormUrlDecoderEntry[];
            splice(start: number, deleteCount: number, ...items: Windows.Foundation.IWwwFormUrlDecoderEntry[]): Windows.Foundation.IWwwFormUrlDecoderEntry[];
            unshift(...items: Windows.Foundation.IWwwFormUrlDecoderEntry[]): number;
            lastIndexOf(searchElement: Windows.Foundation.IWwwFormUrlDecoderEntry): number;
            lastIndexOf(searchElement: Windows.Foundation.IWwwFormUrlDecoderEntry, fromIndex: number): number;
            every(callbackfn: (value: Windows.Foundation.IWwwFormUrlDecoderEntry, index: number, array: Windows.Foundation.IWwwFormUrlDecoderEntry[]) => boolean): boolean;
            every(callbackfn: (value: Windows.Foundation.IWwwFormUrlDecoderEntry, index: number, array: Windows.Foundation.IWwwFormUrlDecoderEntry[]) => boolean, thisArg: any): boolean;
            some(callbackfn: (value: Windows.Foundation.IWwwFormUrlDecoderEntry, index: number, array: Windows.Foundation.IWwwFormUrlDecoderEntry[]) => boolean): boolean;
            some(callbackfn: (value: Windows.Foundation.IWwwFormUrlDecoderEntry, index: number, array: Windows.Foundation.IWwwFormUrlDecoderEntry[]) => boolean, thisArg: any): boolean;
            forEach(callbackfn: (value: Windows.Foundation.IWwwFormUrlDecoderEntry, index: number, array: Windows.Foundation.IWwwFormUrlDecoderEntry[]) => void ): void;
            forEach(callbackfn: (value: Windows.Foundation.IWwwFormUrlDecoderEntry, index: number, array: Windows.Foundation.IWwwFormUrlDecoderEntry[]) => void , thisArg: any): void;
            map(callbackfn: (value: Windows.Foundation.IWwwFormUrlDecoderEntry, index: number, array: Windows.Foundation.IWwwFormUrlDecoderEntry[]) => any): any[];
            map(callbackfn: (value: Windows.Foundation.IWwwFormUrlDecoderEntry, index: number, array: Windows.Foundation.IWwwFormUrlDecoderEntry[]) => any, thisArg: any): any[];
            filter(callbackfn: (value: Windows.Foundation.IWwwFormUrlDecoderEntry, index: number, array: Windows.Foundation.IWwwFormUrlDecoderEntry[]) => boolean): Windows.Foundation.IWwwFormUrlDecoderEntry[];
            filter(callbackfn: (value: Windows.Foundation.IWwwFormUrlDecoderEntry, index: number, array: Windows.Foundation.IWwwFormUrlDecoderEntry[]) => boolean, thisArg: any): Windows.Foundation.IWwwFormUrlDecoderEntry[];
            reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Foundation.IWwwFormUrlDecoderEntry[]) => any): any;
            reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Foundation.IWwwFormUrlDecoderEntry[]) => any, initialValue: any): any;
            reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Foundation.IWwwFormUrlDecoderEntry[]) => any): any;
            reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Foundation.IWwwFormUrlDecoderEntry[]) => any, initialValue: any): any;
            length: number;
        }
        export class Uri implements Windows.Foundation.IUriRuntimeClass, Windows.Foundation.IUriRuntimeClassWithAbsoluteCanonicalUri {
            constructor(uri: string);
            constructor(baseUri: string, relativeUri: string);
            absoluteUri: string;
            displayUri: string;
            domain: string;
            extension: string;
            fragment: string;
            host: string;
            password: string;
            path: string;
            port: number;
            query: string;
            queryParsed: Windows.Foundation.WwwFormUrlDecoder;
            rawUri: string;
            schemeName: string;
            suspicious: boolean;
            userName: string;
            absoluteCanonicalUri: string;
            displayIri: string;
            equals(pUri: Windows.Foundation.Uri): boolean;
            combineUri(relativeUri: string): Windows.Foundation.Uri;
            static unescapeComponent(toUnescape: string): string;
            static escapeComponent(toEscape: string): string;
        }
        export interface IUriRuntimeClassWithAbsoluteCanonicalUri {
            absoluteCanonicalUri: string;
            displayIri: string;
        }
        export interface IUriEscapeStatics {
            unescapeComponent(toUnescape: string): string;
            escapeComponent(toEscape: string): string;
        }
        export interface IUriRuntimeClassFactory {
            createUri(uri: string): Windows.Foundation.Uri;
            createUri(baseUri: string, relativeUri: string): Windows.Foundation.Uri;
        }
        export interface IWwwFormUrlDecoderEntry {
            name: string;
            value: string;
        }
        export interface IWwwFormUrlDecoderRuntimeClass extends Windows.Foundation.Collections.IIterable<Windows.Foundation.IWwwFormUrlDecoderEntry>, Windows.Foundation.Collections.IVectorView<Windows.Foundation.IWwwFormUrlDecoderEntry> {
            getFirstValueByName(name: string): string;
        }
        export interface IWwwFormUrlDecoderRuntimeClassFactory {
            createWwwFormUrlDecoder(query: string): Windows.Foundation.WwwFormUrlDecoder;
        }
        export interface IGetActivationFactory {
            getActivationFactory(activatableClassId: string): any;
        }
        export interface IClosable {
            close(): void;
        }
        export enum PropertyType {
            empty,
            uInt8,
            int16,
            uInt16,
            int32,
            uInt32,
            int64,
            uInt64,
            single,
            double,
            char16,
            boolean,
            string,
            inspectable,
            dateTime,
            timeSpan,
            guid,
            point,
            size,
            rect,
            otherType,
            uInt8Array,
            int16Array,
            uInt16Array,
            int32Array,
            uInt32Array,
            int64Array,
            uInt64Array,
            singleArray,
            doubleArray,
            char16Array,
            booleanArray,
            stringArray,
            inspectableArray,
            dateTimeArray,
            timeSpanArray,
            guidArray,
            pointArray,
            sizeArray,
            rectArray,
            otherTypeArray,
        }
        export interface Point {
            x: number;
            y: number;
        }
        export interface Size {
            width: number;
            height: number;
        }
        export interface Rect {
            x: number;
            y: number;
            width: number;
            height: number;
        }
        export interface DateTime {
            universalTime: number;
        }
        export interface TimeSpan {
            duration: number;
        }
        export interface IPropertyValue {
            isNumericScalar: boolean;
            type: Windows.Foundation.PropertyType;
            getUInt8(): number;
            getInt16(): number;
            getUInt16(): number;
            getInt32(): number;
            getUInt32(): number;
            getInt64(): number;
            getUInt64(): number;
            getSingle(): number;
            getDouble(): number;
            getChar16(): string;
            getBoolean(): boolean;
            getString(): string;
            getGuid(): string;
            getDateTime(): Date;
            getTimeSpan(): number;
            getPoint(): Windows.Foundation.Point;
            getSize(): Windows.Foundation.Size;
            getRect(): Windows.Foundation.Rect;
            getUInt8Array(): Uint8Array;
            getInt16Array(): Int16Array;
            getUInt16Array(): Uint16Array;
            getInt32Array(): Int32Array;
            getUInt32Array(): Uint32Array;
            getInt64Array(): number[];
            getUInt64Array(): number[];
            getSingleArray(): Float32Array;
            getDoubleArray(): Float64Array;
            getChar16Array(): string[];
            getBooleanArray(): boolean[];
            getStringArray(): string[];
            getInspectableArray(): any[];
            getGuidArray(): string[];
            getDateTimeArray(): Date[];
            getTimeSpanArray(): number[];
            getPointArray(): Windows.Foundation.Point[];
            getSizeArray(): Windows.Foundation.Size[];
            getRectArray(): Windows.Foundation.Rect[];
        }
        export interface IPropertyValueStatics {
            createEmpty(): any;
            createUInt8(value: number): any;
            createInt16(value: number): any;
            createUInt16(value: number): any;
            createInt32(value: number): any;
            createUInt32(value: number): any;
            createInt64(value: number): any;
            createUInt64(value: number): any;
            createSingle(value: number): any;
            createDouble(value: number): any;
            createChar16(value: string): any;
            createBoolean(value: boolean): any;
            createString(value: string): any;
            createInspectable(value: any): any;
            createGuid(value: string): any;
            createDateTime(value: Date): any;
            createTimeSpan(value: number): any;
            createPoint(value: Windows.Foundation.Point): any;
            createSize(value: Windows.Foundation.Size): any;
            createRect(value: Windows.Foundation.Rect): any;
            createUInt8Array(value: Uint8Array): any;
            createInt16Array(value: Int16Array): any;
            createUInt16Array(value: Uint16Array): any;
            createInt32Array(value: Int32Array): any;
            createUInt32Array(value: Uint32Array): any;
            createInt64Array(value: number[]): any;
            createUInt64Array(value: number[]): any;
            createSingleArray(value: Float32Array): any;
            createDoubleArray(value: Float64Array): any;
            createChar16Array(value: string[]): any;
            createBooleanArray(value: boolean[]): any;
            createStringArray(value: string[]): any;
            createInspectableArray(value: any[]): any;
            createGuidArray(value: string[]): any;
            createDateTimeArray(value: Date[]): any;
            createTimeSpanArray(value: number[]): any;
            createPointArray(value: Windows.Foundation.Point[]): any;
            createSizeArray(value: Windows.Foundation.Size[]): any;
            createRectArray(value: Windows.Foundation.Rect[]): any;
        }
        export class PropertyValue {
            static createEmpty(): any;
            static createUInt8(value: number): any;
            static createInt16(value: number): any;
            static createUInt16(value: number): any;
            static createInt32(value: number): any;
            static createUInt32(value: number): any;
            static createInt64(value: number): any;
            static createUInt64(value: number): any;
            static createSingle(value: number): any;
            static createDouble(value: number): any;
            static createChar16(value: string): any;
            static createBoolean(value: boolean): any;
            static createString(value: string): any;
            static createInspectable(value: any): any;
            static createGuid(value: string): any;
            static createDateTime(value: Date): any;
            static createTimeSpan(value: number): any;
            static createPoint(value: Windows.Foundation.Point): any;
            static createSize(value: Windows.Foundation.Size): any;
            static createRect(value: Windows.Foundation.Rect): any;
            static createUInt8Array(value: Uint8Array): any;
            static createInt16Array(value: Int16Array): any;
            static createUInt16Array(value: Uint16Array): any;
            static createInt32Array(value: Int32Array): any;
            static createUInt32Array(value: Uint32Array): any;
            static createInt64Array(value: number[]): any;
            static createUInt64Array(value: number[]): any;
            static createSingleArray(value: Float32Array): any;
            static createDoubleArray(value: Float64Array): any;
            static createChar16Array(value: string[]): any;
            static createBooleanArray(value: boolean[]): any;
            static createStringArray(value: string[]): any;
            static createInspectableArray(value: any[]): any;
            static createGuidArray(value: string[]): any;
            static createDateTimeArray(value: Date[]): any;
            static createTimeSpanArray(value: number[]): any;
            static createPointArray(value: Windows.Foundation.Point[]): any;
            static createSizeArray(value: Windows.Foundation.Size[]): any;
            static createRectArray(value: Windows.Foundation.Rect[]): any;
        }
        export interface AsyncActionCompletedHandler {
            (asyncInfo: Windows.Foundation.IAsyncAction, asyncStatus: Windows.Foundation.AsyncStatus): void;
        }
        export enum AsyncStatus {
            canceled,
            completed,
            error,
            started,
        }
        export interface EventRegistrationToken {
            value: number;
        }
        export interface HResult {
            value: number;
        }
        export interface IAsyncInfo {
            errorCode: number;
            id: number;
            status: Windows.Foundation.AsyncStatus;
            cancel(): void;
            close(): void;
        }
        export interface IAsyncAction extends Windows.Foundation.IAsyncInfo {
            completed: Windows.Foundation.AsyncActionCompletedHandler;
            getResults(): void;
        }
        export interface AsyncOperationWithProgressCompletedHandler<TResult, TProgress> {
            (asyncInfo: Windows.Foundation.IAsyncOperationWithProgress<TResult, TProgress>, asyncStatus: Windows.Foundation.AsyncStatus): void;
        }
        export interface IAsyncOperationWithProgress<TResult, TProgress> extends Windows.Foundation.IPromise<TResult> {
            operation: {
                progress: Windows.Foundation.AsyncOperationProgressHandler<TResult, TProgress>;
                completed: Windows.Foundation.AsyncOperationWithProgressCompletedHandler<TResult, TProgress>;
                getResults(): TResult;
            }
        }
        export interface AsyncOperationCompletedHandler<TResult> {
            (asyncInfo: Windows.Foundation.IAsyncOperation<TResult>, asyncStatus: Windows.Foundation.AsyncStatus): void;
        }
        export interface IAsyncOperation<TResult> extends Windows.Foundation.IPromise<TResult> {
            operation: {
                completed: Windows.Foundation.AsyncOperationCompletedHandler<TResult>;
                getResults(): TResult;
            }
        }
        export interface AsyncActionWithProgressCompletedHandler<TProgress> {
            (asyncInfo: Windows.Foundation.IAsyncActionWithProgress<TProgress>, asyncStatus: Windows.Foundation.AsyncStatus): void;
        }
        export interface IAsyncActionWithProgress<TProgress> extends Windows.Foundation.IAsyncInfo {
            progress: Windows.Foundation.AsyncActionProgressHandler<TProgress>;
            completed: Windows.Foundation.AsyncActionWithProgressCompletedHandler<TProgress>;
            getResults(): void;
        }
        export interface AsyncOperationProgressHandler<TResult, TProgress> {
            (asyncInfo: Windows.Foundation.IAsyncOperationWithProgress<TResult, TProgress>, progressInfo: TProgress): void;
        }
        export interface AsyncActionProgressHandler<TProgress> {
            (asyncInfo: Windows.Foundation.IAsyncActionWithProgress<TProgress>, progressInfo: TProgress): void;
        }
        export interface IReference<T> extends Windows.Foundation.IPropertyValue {
            value: T;
        }
        export interface IReferenceArray<T> extends Windows.Foundation.IPropertyValue {
            value: T[];
        }
        export interface TypedEventHandler<TSender, TResult> {
            (sender: TSender, args: TResult): void;
        }
        export interface EventHandler<T> {
            (sender: any, args: T): void;
        }
    }
}
declare module Windows {
    export module Foundation {
        export module Metadata {
            export class WebHostHiddenAttribute {
            }
            export class VariantAttribute {
            }
            export class HasVariantAttribute {
            }
            export class DualApiPartitionAttribute {
            }
            export class MuseAttribute {
            }
            export enum GCPressureAmount {
                low,
                medium,
                high,
            }
            export class GCPressureAttribute {
            }
            export class ActivatableAttribute {
                constructor(version: number);
                constructor(type: string /* TODO: really? */, version: number);
            }
            export class VersionAttribute {
                constructor(version: number);
            }
            export class AllowMultipleAttribute {
            }
            export class AttributeUsageAttribute {
                constructor(targets: Windows.Foundation.Metadata.AttributeTargets /* TODO: Really part of WinRT? */);
            }
            export enum AttributeTargets {
                all,
                delegate,
                enum,
                event,
                field,
                interface,
                method,
                parameter,
                property,
                runtimeClass,
                struct,
                interfaceImpl,
            }
            export class DefaultOverloadAttribute {
            }
            export class DefaultAttribute {
            }
            export class GuidAttribute {
                constructor(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number);
            }
            export class ComposableAttribute {
                constructor(type: string /* TODO: really? */, compositionType: Windows.Foundation.Metadata.CompositionType, version: number);
            }
            export enum CompositionType {
                protected,
                public,
            }
            export class OverloadAttribute {
                constructor(method: string);
            }
            export class StaticAttribute {
                constructor(type: string /* TODO: really? */, version: number);
            }
            export class OverridableAttribute {
            }
            export class ProtectedAttribute {
            }
            export class ThreadingAttribute {
                constructor(model: Windows.Foundation.Metadata.ThreadingModel);
            }
            export enum ThreadingModel {
                sTA,
                mTA,
                both,
                invalidThreading,
            }
            export class MarshalingBehaviorAttribute {
                constructor(behavior: Windows.Foundation.Metadata.MarshalingType);
            }
            export enum MarshalingType {
                none,
                agile,
                standard,
                invalidMarshaling,
            }
            export class ExclusiveToAttribute {
                constructor(typeName: string /* TODO: really? */);
            }
            export class LengthIsAttribute {
                constructor(indexLengthParameter: number);
            }
            export class RangeAttribute {
                constructor(minValue: number, maxValue: number);
            }
        }
    }
}
declare module Windows {
    export module Foundation {
        export module Diagnostics {
            export enum ErrorOptions {
                none,
                suppressExceptions,
                forceExceptions,
                useSetErrorInfo,
                suppressSetErrorInfo,
            }
            export interface IErrorReportingSettings {
                setErrorOptions(value: Windows.Foundation.Diagnostics.ErrorOptions): void;
                getErrorOptions(): Windows.Foundation.Diagnostics.ErrorOptions;
            }
            export class RuntimeBrokerErrorSettings implements Windows.Foundation.Diagnostics.IErrorReportingSettings {
                setErrorOptions(value: Windows.Foundation.Diagnostics.ErrorOptions): void;
                getErrorOptions(): Windows.Foundation.Diagnostics.ErrorOptions;
            }
        }
    }
}
declare module Windows {
    export module ApplicationModel {
        export module Background {
            export enum BackgroundAccessStatus {
                unspecified,
                allowedWithAlwaysOnRealTimeConnectivity,
                allowedMayUseActiveRealTimeConnectivity,
                denied,
            }
            export interface IBackgroundExecutionManagerStatics {
                requestAccessAsync(): Windows.Foundation.IAsyncOperation<Windows.ApplicationModel.Background.BackgroundAccessStatus>;
                requestAccessAsync(applicationId: string): Windows.Foundation.IAsyncOperation<Windows.ApplicationModel.Background.BackgroundAccessStatus>;
                removeAccess(): void;
                removeAccess(applicationId: string): void;
                getAccessStatus(): Windows.ApplicationModel.Background.BackgroundAccessStatus;
                getAccessStatus(applicationId: string): Windows.ApplicationModel.Background.BackgroundAccessStatus;
            }
            export class BackgroundExecutionManager {
                static requestAccessAsync(): Windows.Foundation.IAsyncOperation<Windows.ApplicationModel.Background.BackgroundAccessStatus>;
                static requestAccessAsync(applicationId: string): Windows.Foundation.IAsyncOperation<Windows.ApplicationModel.Background.BackgroundAccessStatus>;
                static removeAccess(): void;
                static removeAccess(applicationId: string): void;
                static getAccessStatus(): Windows.ApplicationModel.Background.BackgroundAccessStatus;
                static getAccessStatus(applicationId: string): Windows.ApplicationModel.Background.BackgroundAccessStatus;
            }
            export enum BackgroundTaskCancellationReason {
                abort,
                terminating,
                loggingOff,
                servicingUpdate,
            }
            export interface BackgroundTaskCanceledEventHandler {
                (sender: Windows.ApplicationModel.Background.IBackgroundTaskInstance, reason: Windows.ApplicationModel.Background.BackgroundTaskCancellationReason): void;
            }
            export interface IBackgroundTaskInstance {
                instanceId: string;
                progress: number;
                suspendedCount: number;
                task: Windows.ApplicationModel.Background.BackgroundTaskRegistration;
                triggerDetails: any;
                oncanceled: any/* TODO */;
                getDeferral(): Windows.ApplicationModel.Background.BackgroundTaskDeferral;
            }
            export class BackgroundTaskRegistration implements Windows.ApplicationModel.Background.IBackgroundTaskRegistration {
                name: string;
                taskId: string;
                onprogress: any/* TODO */;
                oncompleted: any/* TODO */;
                unregister(cancelTask: boolean): void;
                static allTasks: Windows.Foundation.Collections.IMapView<string, Windows.ApplicationModel.Background.IBackgroundTaskRegistration>;
            }
            export class BackgroundTaskDeferral implements Windows.ApplicationModel.Background.IBackgroundTaskDeferral {
                complete(): void;
            }
            export interface BackgroundTaskProgressEventHandler {
                (sender: Windows.ApplicationModel.Background.BackgroundTaskRegistration, args: Windows.ApplicationModel.Background.BackgroundTaskProgressEventArgs): void;
            }
            export class BackgroundTaskProgressEventArgs implements Windows.ApplicationModel.Background.IBackgroundTaskProgressEventArgs {
                instanceId: string;
                progress: number;
            }
            export interface BackgroundTaskCompletedEventHandler {
                (sender: Windows.ApplicationModel.Background.BackgroundTaskRegistration, args: Windows.ApplicationModel.Background.BackgroundTaskCompletedEventArgs): void;
            }
            export class BackgroundTaskCompletedEventArgs implements Windows.ApplicationModel.Background.IBackgroundTaskCompletedEventArgs {
                instanceId: string;
                checkResult(): void;
            }
            export interface IBackgroundTaskDeferral {
                complete(): void;
            }
            export interface IBackgroundTask {
                run(taskInstance: Windows.ApplicationModel.Background.IBackgroundTaskInstance): void;
            }
            export interface IBackgroundTaskRegistration {
                name: string;
                taskId: string;
                onprogress: any/* TODO */;
                oncompleted: any/* TODO */;
                unregister(cancelTask: boolean): void;
            }
            export interface IBackgroundTaskRegistrationStatics {
                allTasks: Windows.Foundation.Collections.IMapView<string, Windows.ApplicationModel.Background.IBackgroundTaskRegistration>;
            }
            export interface IBackgroundTaskBuilder {
                name: string;
                taskEntryPoint: string;
                setTrigger(trigger: Windows.ApplicationModel.Background.IBackgroundTrigger): void;
                addCondition(condition: Windows.ApplicationModel.Background.IBackgroundCondition): void;
                register(): Windows.ApplicationModel.Background.BackgroundTaskRegistration;
            }
            export interface IBackgroundTrigger {
            }
            export interface IBackgroundCondition {
            }
            export interface IBackgroundTaskCompletedEventArgs {
                instanceId: string;
                checkResult(): void;
            }
            export interface IBackgroundTaskProgressEventArgs {
                instanceId: string;
                progress: number;
            }
            export class BackgroundTaskBuilder implements Windows.ApplicationModel.Background.IBackgroundTaskBuilder {
                name: string;
                taskEntryPoint: string;
                setTrigger(trigger: Windows.ApplicationModel.Background.IBackgroundTrigger): void;
                addCondition(condition: Windows.ApplicationModel.Background.IBackgroundCondition): void;
                register(): Windows.ApplicationModel.Background.BackgroundTaskRegistration;
            }
            export enum SystemTriggerType {
                invalid,
                smsReceived,
                userPresent,
                userAway,
                networkStateChange,
                controlChannelReset,
                internetAvailable,
                sessionConnected,
                servicingComplete,
                lockScreenApplicationAdded,
                lockScreenApplicationRemoved,
                timeZoneChange,
                onlineIdConnectedStateChange,
            }
            export enum SystemConditionType {
                invalid,
                userPresent,
                userNotPresent,
                internetAvailable,
                internetNotAvailable,
                sessionConnected,
                sessionDisconnected,
            }
            export interface ISystemTrigger extends Windows.ApplicationModel.Background.IBackgroundTrigger {
                oneShot: boolean;
                triggerType: Windows.ApplicationModel.Background.SystemTriggerType;
            }
            export interface ISystemTriggerFactory {
                create(triggerType: Windows.ApplicationModel.Background.SystemTriggerType, oneShot: boolean): Windows.ApplicationModel.Background.SystemTrigger;
            }
            export class SystemTrigger implements Windows.ApplicationModel.Background.ISystemTrigger, Windows.ApplicationModel.Background.IBackgroundTrigger {
                constructor(triggerType: Windows.ApplicationModel.Background.SystemTriggerType, oneShot: boolean);
                oneShot: boolean;
                triggerType: Windows.ApplicationModel.Background.SystemTriggerType;
            }
            export interface ISystemCondition extends Windows.ApplicationModel.Background.IBackgroundCondition {
                conditionType: Windows.ApplicationModel.Background.SystemConditionType;
            }
            export interface ISystemConditionFactory {
                create(conditionType: Windows.ApplicationModel.Background.SystemConditionType): Windows.ApplicationModel.Background.SystemCondition;
            }
            export class SystemCondition implements Windows.ApplicationModel.Background.ISystemCondition, Windows.ApplicationModel.Background.IBackgroundCondition {
                constructor(conditionType: Windows.ApplicationModel.Background.SystemConditionType);
                conditionType: Windows.ApplicationModel.Background.SystemConditionType;
            }
            export interface INetworkOperatorNotificationTrigger extends Windows.ApplicationModel.Background.IBackgroundTrigger {
                networkAccountId: string;
            }
            export interface INetworkOperatorNotificationTriggerFactory {
                create(networkAccountId: string): Windows.ApplicationModel.Background.NetworkOperatorNotificationTrigger;
            }
            export class NetworkOperatorNotificationTrigger implements Windows.ApplicationModel.Background.INetworkOperatorNotificationTrigger, Windows.ApplicationModel.Background.IBackgroundTrigger {
                constructor(networkAccountId: string);
                networkAccountId: string;
            }
            export interface ITimeTrigger extends Windows.ApplicationModel.Background.IBackgroundTrigger {
                freshnessTime: number;
                oneShot: boolean;
            }
            export interface ITimeTriggerFactory {
                create(freshnessTime: number, oneShot: boolean): Windows.ApplicationModel.Background.TimeTrigger;
            }
            export class TimeTrigger implements Windows.ApplicationModel.Background.ITimeTrigger, Windows.ApplicationModel.Background.IBackgroundTrigger {
                constructor(freshnessTime: number, oneShot: boolean);
                freshnessTime: number;
                oneShot: boolean;
            }
            export interface IMaintenanceTrigger extends Windows.ApplicationModel.Background.IBackgroundTrigger {
                freshnessTime: number;
                oneShot: boolean;
            }
            export interface IMaintenanceTriggerFactory {
                create(freshnessTime: number, oneShot: boolean): Windows.ApplicationModel.Background.MaintenanceTrigger;
            }
            export class MaintenanceTrigger implements Windows.ApplicationModel.Background.IMaintenanceTrigger, Windows.ApplicationModel.Background.IBackgroundTrigger {
                constructor(freshnessTime: number, oneShot: boolean);
                freshnessTime: number;
                oneShot: boolean;
            }
            export interface INetworkOperatorHotspotAuthenticationTrigger extends Windows.ApplicationModel.Background.IBackgroundTrigger {
            }
            export class NetworkOperatorHotspotAuthenticationTrigger implements Windows.ApplicationModel.Background.INetworkOperatorHotspotAuthenticationTrigger, Windows.ApplicationModel.Background.IBackgroundTrigger {
            }
            export interface IPushNotificationTriggerFactory {
                create(applicationId: string): Windows.ApplicationModel.Background.PushNotificationTrigger;
            }
            export class PushNotificationTrigger implements Windows.ApplicationModel.Background.IBackgroundTrigger {
                constructor(applicationId: string);
                constructor();
            }
        }
    }
}
declare module Windows {
    export module ApplicationModel {
        export module Contacts {
            export enum ContactFieldType {
                email,
                phoneNumber,
                location,
                instantMessage,
                custom,
            }
            export enum ContactFieldCategory {
                none,
                home,
                work,
                mobile,
                other,
            }
            export enum ContactSelectionMode {
                contacts,
                fields,
            }
            export interface IContactField {
                category: Windows.ApplicationModel.Contacts.ContactFieldCategory;
                name: string;
                type: Windows.ApplicationModel.Contacts.ContactFieldType;
                value: string;
            }
            export class ContactField implements Windows.ApplicationModel.Contacts.IContactField {
                constructor(value: string, type: Windows.ApplicationModel.Contacts.ContactFieldType);
                constructor(value: string, type: Windows.ApplicationModel.Contacts.ContactFieldType, category: Windows.ApplicationModel.Contacts.ContactFieldCategory);
                constructor(name: string, value: string, type: Windows.ApplicationModel.Contacts.ContactFieldType, category: Windows.ApplicationModel.Contacts.ContactFieldCategory);
                category: Windows.ApplicationModel.Contacts.ContactFieldCategory;
                name: string;
                type: Windows.ApplicationModel.Contacts.ContactFieldType;
                value: string;
            }
            export interface IContactLocationField extends Windows.ApplicationModel.Contacts.IContactField {
                city: string;
                country: string;
                postalCode: string;
                region: string;
                street: string;
                unstructuredAddress: string;
            }
            export class ContactLocationField implements Windows.ApplicationModel.Contacts.IContactLocationField, Windows.ApplicationModel.Contacts.IContactField {
                constructor(unstructuredAddress: string);
                constructor(unstructuredAddress: string, category: Windows.ApplicationModel.Contacts.ContactFieldCategory);
                constructor(unstructuredAddress: string, category: Windows.ApplicationModel.Contacts.ContactFieldCategory, street: string, city: string, region: string, country: string, postalCode: string);
                city: string;
                country: string;
                postalCode: string;
                region: string;
                street: string;
                unstructuredAddress: string;
                category: Windows.ApplicationModel.Contacts.ContactFieldCategory;
                name: string;
                type: Windows.ApplicationModel.Contacts.ContactFieldType;
                value: string;
            }
            export interface IContactInstantMessageField extends Windows.ApplicationModel.Contacts.IContactField {
                displayText: string;
                launchUri: Windows.Foundation.Uri;
                service: string;
                userName: string;
            }
            export class ContactInstantMessageField implements Windows.ApplicationModel.Contacts.IContactInstantMessageField, Windows.ApplicationModel.Contacts.IContactField {
                constructor(userName: string);
                constructor(userName: string, category: Windows.ApplicationModel.Contacts.ContactFieldCategory);
                constructor(userName: string, category: Windows.ApplicationModel.Contacts.ContactFieldCategory, service: string, displayText: string, verb: Windows.Foundation.Uri);
                displayText: string;
                launchUri: Windows.Foundation.Uri;
                service: string;
                userName: string;
                category: Windows.ApplicationModel.Contacts.ContactFieldCategory;
                name: string;
                type: Windows.ApplicationModel.Contacts.ContactFieldType;
                value: string;
            }
            export interface IKnownContactFieldStatics {
                email: string;
                instantMessage: string;
                location: string;
                phoneNumber: string;
                convertNameToType(name: string): Windows.ApplicationModel.Contacts.ContactFieldType;
                convertTypeToName(type: Windows.ApplicationModel.Contacts.ContactFieldType): string;
            }
            export class KnownContactField {
                static email: string;
                static instantMessage: string;
                static location: string;
                static phoneNumber: string;
                static convertNameToType(name: string): Windows.ApplicationModel.Contacts.ContactFieldType;
                static convertTypeToName(type: Windows.ApplicationModel.Contacts.ContactFieldType): string;
            }
            export interface IContactInformation {
                customFields: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Contacts.ContactField>;
                emails: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Contacts.ContactField>;
                instantMessages: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Contacts.ContactInstantMessageField>;
                locations: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Contacts.ContactLocationField>;
                name: string;
                phoneNumbers: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Contacts.ContactField>;
                getThumbnailAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IRandomAccessStreamWithContentType>;
                queryCustomFields(customName: string): Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Contacts.ContactField>;
            }
            export class ContactInformation implements Windows.ApplicationModel.Contacts.IContactInformation {
                customFields: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Contacts.ContactField>;
                emails: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Contacts.ContactField>;
                instantMessages: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Contacts.ContactInstantMessageField>;
                locations: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Contacts.ContactLocationField>;
                name: string;
                phoneNumbers: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Contacts.ContactField>;
                getThumbnailAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IRandomAccessStreamWithContentType>;
                queryCustomFields(customName: string): Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Contacts.ContactField>;
            }
            export interface IContactPicker {
                commitButtonText: string;
                desiredFields: Windows.Foundation.Collections.IVector<string>;
                selectionMode: Windows.ApplicationModel.Contacts.ContactSelectionMode;
                pickSingleContactAsync(): Windows.Foundation.IAsyncOperation<Windows.ApplicationModel.Contacts.ContactInformation>;
                pickMultipleContactsAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Contacts.ContactInformation>>;
            }
            export class ContactPicker implements Windows.ApplicationModel.Contacts.IContactPicker {
                commitButtonText: string;
                desiredFields: Windows.Foundation.Collections.IVector<string>;
                selectionMode: Windows.ApplicationModel.Contacts.ContactSelectionMode;
                pickSingleContactAsync(): Windows.Foundation.IAsyncOperation<Windows.ApplicationModel.Contacts.ContactInformation>;
                pickMultipleContactsAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Contacts.ContactInformation>>;
            }
            export interface IContact {
                fields: Windows.Foundation.Collections.IVector<Windows.ApplicationModel.Contacts.IContactField>;
                name: string;
                thumbnail: Windows.Storage.Streams.IRandomAccessStreamReference;
            }
            export class Contact implements Windows.ApplicationModel.Contacts.IContact {
                fields: Windows.Foundation.Collections.IVector<Windows.ApplicationModel.Contacts.IContactField>;
                name: string;
                thumbnail: Windows.Storage.Streams.IRandomAccessStreamReference;
            }
            export interface IContactFieldFactory {
                createField(value: string, type: Windows.ApplicationModel.Contacts.ContactFieldType): Windows.ApplicationModel.Contacts.ContactField;
                createField(value: string, type: Windows.ApplicationModel.Contacts.ContactFieldType, category: Windows.ApplicationModel.Contacts.ContactFieldCategory): Windows.ApplicationModel.Contacts.ContactField;
                createField(name: string, value: string, type: Windows.ApplicationModel.Contacts.ContactFieldType, category: Windows.ApplicationModel.Contacts.ContactFieldCategory): Windows.ApplicationModel.Contacts.ContactField;
            }
            export interface IContactLocationFieldFactory {
                createLocation(unstructuredAddress: string): Windows.ApplicationModel.Contacts.ContactLocationField;
                createLocation(unstructuredAddress: string, category: Windows.ApplicationModel.Contacts.ContactFieldCategory): Windows.ApplicationModel.Contacts.ContactLocationField;
                createLocation(unstructuredAddress: string, category: Windows.ApplicationModel.Contacts.ContactFieldCategory, street: string, city: string, region: string, country: string, postalCode: string): Windows.ApplicationModel.Contacts.ContactLocationField;
            }
            export interface IContactInstantMessageFieldFactory {
                createInstantMessage(userName: string): Windows.ApplicationModel.Contacts.ContactInstantMessageField;
                createInstantMessage(userName: string, category: Windows.ApplicationModel.Contacts.ContactFieldCategory): Windows.ApplicationModel.Contacts.ContactInstantMessageField;
                createInstantMessage(userName: string, category: Windows.ApplicationModel.Contacts.ContactFieldCategory, service: string, displayText: string, verb: Windows.Foundation.Uri): Windows.ApplicationModel.Contacts.ContactInstantMessageField;
            }
            export class ContactFieldFactory implements Windows.ApplicationModel.Contacts.IContactFieldFactory, Windows.ApplicationModel.Contacts.IContactLocationFieldFactory, Windows.ApplicationModel.Contacts.IContactInstantMessageFieldFactory {
                createField(value: string, type: Windows.ApplicationModel.Contacts.ContactFieldType): Windows.ApplicationModel.Contacts.ContactField;
                createField(value: string, type: Windows.ApplicationModel.Contacts.ContactFieldType, category: Windows.ApplicationModel.Contacts.ContactFieldCategory): Windows.ApplicationModel.Contacts.ContactField;
                createField(name: string, value: string, type: Windows.ApplicationModel.Contacts.ContactFieldType, category: Windows.ApplicationModel.Contacts.ContactFieldCategory): Windows.ApplicationModel.Contacts.ContactField;
                createLocation(unstructuredAddress: string): Windows.ApplicationModel.Contacts.ContactLocationField;
                createLocation(unstructuredAddress: string, category: Windows.ApplicationModel.Contacts.ContactFieldCategory): Windows.ApplicationModel.Contacts.ContactLocationField;
                createLocation(unstructuredAddress: string, category: Windows.ApplicationModel.Contacts.ContactFieldCategory, street: string, city: string, region: string, country: string, postalCode: string): Windows.ApplicationModel.Contacts.ContactLocationField;
                createInstantMessage(userName: string): Windows.ApplicationModel.Contacts.ContactInstantMessageField;
                createInstantMessage(userName: string, category: Windows.ApplicationModel.Contacts.ContactFieldCategory): Windows.ApplicationModel.Contacts.ContactInstantMessageField;
                createInstantMessage(userName: string, category: Windows.ApplicationModel.Contacts.ContactFieldCategory, service: string, displayText: string, verb: Windows.Foundation.Uri): Windows.ApplicationModel.Contacts.ContactInstantMessageField;
            }
        }
    }
}
declare module Windows {
    export module ApplicationModel {
        export module Contacts {
            export module Provider {
                export interface IContactRemovedEventArgs {
                    id: string;
                }
                export class ContactRemovedEventArgs implements Windows.ApplicationModel.Contacts.Provider.IContactRemovedEventArgs {
                    id: string;
                }
                export enum AddContactResult {
                    added,
                    alreadyAdded,
                    unavailable,
                }
                export interface IContactPickerUI {
                    desiredFields: Windows.Foundation.Collections.IVectorView<string>;
                    selectionMode: Windows.ApplicationModel.Contacts.ContactSelectionMode;
                    addContact(id: string, contact: Windows.ApplicationModel.Contacts.Contact): Windows.ApplicationModel.Contacts.Provider.AddContactResult;
                    removeContact(id: string): void;
                    containsContact(id: string): boolean;
                    oncontactremoved: any/* TODO */;
                }
                export class ContactPickerUI implements Windows.ApplicationModel.Contacts.Provider.IContactPickerUI {
                    desiredFields: Windows.Foundation.Collections.IVectorView<string>;
                    selectionMode: Windows.ApplicationModel.Contacts.ContactSelectionMode;
                    addContact(id: string, contact: Windows.ApplicationModel.Contacts.Contact): Windows.ApplicationModel.Contacts.Provider.AddContactResult;
                    removeContact(id: string): void;
                    containsContact(id: string): boolean;
                    oncontactremoved: any/* TODO */;
                }
            }
        }
    }
}
declare module Windows {
    export module ApplicationModel {
        export module DataTransfer {
            export interface IStandardDataFormatsStatics {
                bitmap: string;
                html: string;
                rtf: string;
                storageItems: string;
                text: string;
                uri: string;
            }
            export class StandardDataFormats {
                static bitmap: string;
                static html: string;
                static rtf: string;
                static storageItems: string;
                static text: string;
                static uri: string;
            }
            export interface IDataPackagePropertySetView extends Windows.Foundation.Collections.IMapView<string, any>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, any>> {
                applicationListingUri: Windows.Foundation.Uri;
                applicationName: string;
                description: string;
                fileTypes: Windows.Foundation.Collections.IVectorView<string>;
                thumbnail: Windows.Storage.Streams.RandomAccessStreamReference;
                title: string;
            }
            export interface IDataPackagePropertySet extends Windows.Foundation.Collections.IMap<string, any>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, any>> {
                applicationListingUri: Windows.Foundation.Uri;
                applicationName: string;
                description: string;
                fileTypes: Windows.Foundation.Collections.IVector<string>;
                thumbnail: Windows.Storage.Streams.IRandomAccessStreamReference;
                title: string;
            }
            export class DataPackagePropertySetView implements Windows.ApplicationModel.DataTransfer.IDataPackagePropertySetView, Windows.Foundation.Collections.IMapView<string, any>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, any>> {
                applicationListingUri: Windows.Foundation.Uri;
                applicationName: string;
                description: string;
                fileTypes: Windows.Foundation.Collections.IVectorView<string>;
                thumbnail: Windows.Storage.Streams.RandomAccessStreamReference;
                title: string;
                size: number;
                lookup(key: string): any;
                hasKey(key: string): boolean;
                split(): { first: Windows.Foundation.Collections.IMapView<string, any>; second: Windows.Foundation.Collections.IMapView<string, any>; };
                first(): Windows.Foundation.Collections.IIterator<Windows.Foundation.Collections.IKeyValuePair<string, any>>;
            }
            export class DataPackagePropertySet implements Windows.ApplicationModel.DataTransfer.IDataPackagePropertySet, Windows.Foundation.Collections.IMap<string, any>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, any>> {
                applicationListingUri: Windows.Foundation.Uri;
                applicationName: string;
                description: string;
                fileTypes: Windows.Foundation.Collections.IVector<string>;
                thumbnail: Windows.Storage.Streams.IRandomAccessStreamReference;
                title: string;
                size: number;
                lookup(key: string): any;
                hasKey(key: string): boolean;
                getView(): Windows.Foundation.Collections.IMapView<string, any>;
                insert(key: string, value: any): boolean;
                remove(key: string): void;
                clear(): void;
                first(): Windows.Foundation.Collections.IIterator<Windows.Foundation.Collections.IKeyValuePair<string, any>>;
            }
            export interface IDataProviderDeferral {
                complete(): void;
            }
            export class DataProviderDeferral implements Windows.ApplicationModel.DataTransfer.IDataProviderDeferral {
                complete(): void;
            }
            export interface IDataProviderRequest {
                deadline: Date;
                formatId: string;
                getDeferral(): Windows.ApplicationModel.DataTransfer.DataProviderDeferral;
                setData(value: any): void;
            }
            export class DataProviderRequest implements Windows.ApplicationModel.DataTransfer.IDataProviderRequest {
                deadline: Date;
                formatId: string;
                getDeferral(): Windows.ApplicationModel.DataTransfer.DataProviderDeferral;
                setData(value: any): void;
            }
            export interface DataProviderHandler {
                (request: Windows.ApplicationModel.DataTransfer.DataProviderRequest): void;
            }
            export enum DataPackageOperation {
                none,
                copy,
                move,
                link,
            }
            export interface IOperationCompletedEventArgs {
                operation: Windows.ApplicationModel.DataTransfer.DataPackageOperation;
            }
            export class OperationCompletedEventArgs implements Windows.ApplicationModel.DataTransfer.IOperationCompletedEventArgs {
                operation: Windows.ApplicationModel.DataTransfer.DataPackageOperation;
            }
            export interface IDataPackageView {
                availableFormats: Windows.Foundation.Collections.IVectorView<string>;
                properties: Windows.ApplicationModel.DataTransfer.DataPackagePropertySetView;
                requestedOperation: Windows.ApplicationModel.DataTransfer.DataPackageOperation;
                reportOperationCompleted(value: Windows.ApplicationModel.DataTransfer.DataPackageOperation): void;
                contains(formatId: string): boolean;
                getDataAsync(formatId: string): Windows.Foundation.IAsyncOperation<any>;
                getTextAsync(): Windows.Foundation.IAsyncOperation<string>;
                getTextAsync(formatId: string): Windows.Foundation.IAsyncOperation<string>;
                getUriAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Uri>;
                getHtmlFormatAsync(): Windows.Foundation.IAsyncOperation<string>;
                getResourceMapAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IMapView<string, Windows.Storage.Streams.RandomAccessStreamReference>>;
                getRtfAsync(): Windows.Foundation.IAsyncOperation<string>;
                getBitmapAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.RandomAccessStreamReference>;
                getStorageItemsAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.IStorageItem>>;
            }
            export interface IDataPackage {
                properties: Windows.ApplicationModel.DataTransfer.DataPackagePropertySet;
                requestedOperation: Windows.ApplicationModel.DataTransfer.DataPackageOperation;
                resourceMap: Windows.Foundation.Collections.IMap<string, Windows.Storage.Streams.RandomAccessStreamReference>;
                getView(): Windows.ApplicationModel.DataTransfer.DataPackageView;
                onoperationcompleted: any/* TODO */;
                ondestroyed: any/* TODO */;
                setData(formatId: string, value: any): void;
                setDataProvider(formatId: string, delayRenderer: Windows.ApplicationModel.DataTransfer.DataProviderHandler): void;
                setText(value: string): void;
                setUri(value: Windows.Foundation.Uri): void;
                setHtmlFormat(value: string): void;
                setRtf(value: string): void;
                setBitmap(value: Windows.Storage.Streams.RandomAccessStreamReference): void;
                setStorageItems(value: Windows.Foundation.Collections.IIterable<Windows.Storage.IStorageItem>): void;
                setStorageItems(value: Windows.Foundation.Collections.IIterable<Windows.Storage.IStorageItem>, readOnly: boolean): void;
            }
            export class DataPackageView implements Windows.ApplicationModel.DataTransfer.IDataPackageView {
                availableFormats: Windows.Foundation.Collections.IVectorView<string>;
                properties: Windows.ApplicationModel.DataTransfer.DataPackagePropertySetView;
                requestedOperation: Windows.ApplicationModel.DataTransfer.DataPackageOperation;
                reportOperationCompleted(value: Windows.ApplicationModel.DataTransfer.DataPackageOperation): void;
                contains(formatId: string): boolean;
                getDataAsync(formatId: string): Windows.Foundation.IAsyncOperation<any>;
                getTextAsync(): Windows.Foundation.IAsyncOperation<string>;
                getTextAsync(formatId: string): Windows.Foundation.IAsyncOperation<string>;
                getUriAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Uri>;
                getHtmlFormatAsync(): Windows.Foundation.IAsyncOperation<string>;
                getResourceMapAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IMapView<string, Windows.Storage.Streams.RandomAccessStreamReference>>;
                getRtfAsync(): Windows.Foundation.IAsyncOperation<string>;
                getBitmapAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.RandomAccessStreamReference>;
                getStorageItemsAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.IStorageItem>>;
            }
            export class DataPackage implements Windows.ApplicationModel.DataTransfer.IDataPackage {
                properties: Windows.ApplicationModel.DataTransfer.DataPackagePropertySet;
                requestedOperation: Windows.ApplicationModel.DataTransfer.DataPackageOperation;
                resourceMap: Windows.Foundation.Collections.IMap<string, Windows.Storage.Streams.RandomAccessStreamReference>;
                getView(): Windows.ApplicationModel.DataTransfer.DataPackageView;
                onoperationcompleted: any/* TODO */;
                ondestroyed: any/* TODO */;
                setData(formatId: string, value: any): void;
                setDataProvider(formatId: string, delayRenderer: Windows.ApplicationModel.DataTransfer.DataProviderHandler): void;
                setText(value: string): void;
                setUri(value: Windows.Foundation.Uri): void;
                setHtmlFormat(value: string): void;
                setRtf(value: string): void;
                setBitmap(value: Windows.Storage.Streams.RandomAccessStreamReference): void;
                setStorageItems(value: Windows.Foundation.Collections.IIterable<Windows.Storage.IStorageItem>): void;
                setStorageItems(value: Windows.Foundation.Collections.IIterable<Windows.Storage.IStorageItem>, readOnly: boolean): void;
            }
            export interface IHtmlFormatHelperStatics {
                getStaticFragment(htmlFormat: string): string;
                createHtmlFormat(htmlFragment: string): string;
            }
            export class HtmlFormatHelper {
                static getStaticFragment(htmlFormat: string): string;
                static createHtmlFormat(htmlFragment: string): string;
            }
            export interface IClipboardStatics {
                getContent(): Windows.ApplicationModel.DataTransfer.DataPackageView;
                setContent(content: Windows.ApplicationModel.DataTransfer.DataPackage): void;
                flush(): void;
                clear(): void;
                oncontentchanged: any/* TODO */;
            }
            export class Clipboard {
                static getContent(): Windows.ApplicationModel.DataTransfer.DataPackageView;
                static setContent(content: Windows.ApplicationModel.DataTransfer.DataPackage): void;
                static flush(): void;
                static clear(): void;
                static oncontentchanged: any/* TODO */;
            }
            export interface IDataRequestDeferral {
                complete(): void;
            }
            export class DataRequestDeferral implements Windows.ApplicationModel.DataTransfer.IDataRequestDeferral {
                complete(): void;
            }
            export interface IDataRequest {
                data: Windows.ApplicationModel.DataTransfer.DataPackage;
                deadline: Date;
                failWithDisplayText(value: string): void;
                getDeferral(): Windows.ApplicationModel.DataTransfer.DataRequestDeferral;
            }
            export class DataRequest implements Windows.ApplicationModel.DataTransfer.IDataRequest {
                data: Windows.ApplicationModel.DataTransfer.DataPackage;
                deadline: Date;
                failWithDisplayText(value: string): void;
                getDeferral(): Windows.ApplicationModel.DataTransfer.DataRequestDeferral;
            }
            export interface IDataRequestedEventArgs {
                request: Windows.ApplicationModel.DataTransfer.DataRequest;
            }
            export class DataRequestedEventArgs implements Windows.ApplicationModel.DataTransfer.IDataRequestedEventArgs {
                request: Windows.ApplicationModel.DataTransfer.DataRequest;
            }
            export interface ITargetApplicationChosenEventArgs {
                applicationName: string;
            }
            export class TargetApplicationChosenEventArgs implements Windows.ApplicationModel.DataTransfer.ITargetApplicationChosenEventArgs {
                applicationName: string;
            }
            export interface IDataTransferManager {
                ondatarequested: any/* TODO */;
                ontargetapplicationchosen: any/* TODO */;
            }
            export class DataTransferManager implements Windows.ApplicationModel.DataTransfer.IDataTransferManager {
                ondatarequested: any/* TODO */;
                ontargetapplicationchosen: any/* TODO */;
                static showShareUI(): void;
                static getForCurrentView(): Windows.ApplicationModel.DataTransfer.DataTransferManager;
            }
            export interface IDataTransferManagerStatics {
                showShareUI(): void;
                getForCurrentView(): Windows.ApplicationModel.DataTransfer.DataTransferManager;
            }
        }
    }
}
declare module Windows {
    export module ApplicationModel {
        export module Search {
            export interface ISearchPaneQueryLinguisticDetails {
                queryTextAlternatives: Windows.Foundation.Collections.IVectorView<string>;
                queryTextCompositionLength: number;
                queryTextCompositionStart: number;
            }
            export class SearchPaneQueryLinguisticDetails implements Windows.ApplicationModel.Search.ISearchPaneQueryLinguisticDetails {
                queryTextAlternatives: Windows.Foundation.Collections.IVectorView<string>;
                queryTextCompositionLength: number;
                queryTextCompositionStart: number;
            }
            export interface ISearchPaneVisibilityChangedEventArgs {
                visible: boolean;
            }
            export class SearchPaneVisibilityChangedEventArgs implements Windows.ApplicationModel.Search.ISearchPaneVisibilityChangedEventArgs {
                visible: boolean;
            }
            export interface ISearchPaneQueryChangedEventArgs {
                language: string;
                linguisticDetails: Windows.ApplicationModel.Search.SearchPaneQueryLinguisticDetails;
                queryText: string;
            }
            export class SearchPaneQueryChangedEventArgs implements Windows.ApplicationModel.Search.ISearchPaneQueryChangedEventArgs {
                language: string;
                linguisticDetails: Windows.ApplicationModel.Search.SearchPaneQueryLinguisticDetails;
                queryText: string;
            }
            export interface ISearchPaneQuerySubmittedEventArgs {
                language: string;
                queryText: string;
            }
            export class SearchPaneQuerySubmittedEventArgs implements Windows.ApplicationModel.Search.ISearchPaneQuerySubmittedEventArgs {
                language: string;
                queryText: string;
            }
            export interface ISearchPaneResultSuggestionChosenEventArgs {
                tag: string;
            }
            export class SearchPaneResultSuggestionChosenEventArgs implements Windows.ApplicationModel.Search.ISearchPaneResultSuggestionChosenEventArgs {
                tag: string;
            }
            export interface ISearchSuggestionCollection {
                size: number;
                appendQuerySuggestion(text: string): void;
                appendQuerySuggestions(suggestions: Windows.Foundation.Collections.IIterable<string>): void;
                appendResultSuggestion(text: string, detailText: string, tag: string, image: Windows.Storage.Streams.IRandomAccessStreamReference, imageAlternateText: string): void;
                appendSearchSeparator(label: string): void;
            }
            export class SearchSuggestionCollection implements Windows.ApplicationModel.Search.ISearchSuggestionCollection {
                size: number;
                appendQuerySuggestion(text: string): void;
                appendQuerySuggestions(suggestions: Windows.Foundation.Collections.IIterable<string>): void;
                appendResultSuggestion(text: string, detailText: string, tag: string, image: Windows.Storage.Streams.IRandomAccessStreamReference, imageAlternateText: string): void;
                appendSearchSeparator(label: string): void;
            }
            export interface ISearchPaneSuggestionsRequestDeferral {
                complete(): void;
            }
            export interface ISearchPaneSuggestionsRequest {
                isCanceled: boolean;
                searchSuggestionCollection: Windows.ApplicationModel.Search.SearchSuggestionCollection;
                getDeferral(): Windows.ApplicationModel.Search.SearchPaneSuggestionsRequestDeferral;
            }
            export class SearchPaneSuggestionsRequestDeferral implements Windows.ApplicationModel.Search.ISearchPaneSuggestionsRequestDeferral {
                complete(): void;
            }
            export class SearchPaneSuggestionsRequest implements Windows.ApplicationModel.Search.ISearchPaneSuggestionsRequest {
                isCanceled: boolean;
                searchSuggestionCollection: Windows.ApplicationModel.Search.SearchSuggestionCollection;
                getDeferral(): Windows.ApplicationModel.Search.SearchPaneSuggestionsRequestDeferral;
            }
            export interface ISearchPaneSuggestionsRequestedEventArgs extends Windows.ApplicationModel.Search.ISearchPaneQueryChangedEventArgs {
                request: Windows.ApplicationModel.Search.SearchPaneSuggestionsRequest;
            }
            export class SearchPaneSuggestionsRequestedEventArgs implements Windows.ApplicationModel.Search.ISearchPaneSuggestionsRequestedEventArgs, Windows.ApplicationModel.Search.ISearchPaneQueryChangedEventArgs {
                request: Windows.ApplicationModel.Search.SearchPaneSuggestionsRequest;
                language: string;
                linguisticDetails: Windows.ApplicationModel.Search.SearchPaneQueryLinguisticDetails;
                queryText: string;
            }
            export interface ILocalContentSuggestionSettings {
                aqsFilter: string;
                enabled: boolean;
                locations: Windows.Foundation.Collections.IVector<Windows.Storage.StorageFolder>;
                propertiesToMatch: Windows.Foundation.Collections.IVector<string>;
            }
            export class LocalContentSuggestionSettings implements Windows.ApplicationModel.Search.ILocalContentSuggestionSettings {
                aqsFilter: string;
                enabled: boolean;
                locations: Windows.Foundation.Collections.IVector<Windows.Storage.StorageFolder>;
                propertiesToMatch: Windows.Foundation.Collections.IVector<string>;
            }
            export interface ISearchPaneStatics {
                getForCurrentView(): Windows.ApplicationModel.Search.SearchPane;
            }
            export class SearchPane implements Windows.ApplicationModel.Search.ISearchPane {
                language: string;
                placeholderText: string;
                queryText: string;
                searchHistoryContext: string;
                searchHistoryEnabled: boolean;
                showOnKeyboardInput: boolean;
                visible: boolean;
                onvisibilitychanged: any/* TODO */;
                onquerychanged: any/* TODO */;
                onsuggestionsrequested: any/* TODO */;
                onquerysubmitted: any/* TODO */;
                onresultsuggestionchosen: any/* TODO */;
                setLocalContentSuggestionSettings(settings: Windows.ApplicationModel.Search.LocalContentSuggestionSettings): void;
                show(): void;
                show(query: string): void;
                trySetQueryText(query: string): boolean;
                static getForCurrentView(): Windows.ApplicationModel.Search.SearchPane;
            }
            export interface ISearchPane {
                language: string;
                placeholderText: string;
                queryText: string;
                searchHistoryContext: string;
                searchHistoryEnabled: boolean;
                showOnKeyboardInput: boolean;
                visible: boolean;
                onvisibilitychanged: any/* TODO */;
                onquerychanged: any/* TODO */;
                onsuggestionsrequested: any/* TODO */;
                onquerysubmitted: any/* TODO */;
                onresultsuggestionchosen: any/* TODO */;
                setLocalContentSuggestionSettings(settings: Windows.ApplicationModel.Search.LocalContentSuggestionSettings): void;
                show(): void;
                show(query: string): void;
                trySetQueryText(query: string): boolean;
            }
        }
    }
}
declare module Windows {
    export module ApplicationModel {
        export module DataTransfer {
            export module ShareTarget {
                export interface IQuickLink {
                    id: string;
                    supportedDataFormats: Windows.Foundation.Collections.IVector<string>;
                    supportedFileTypes: Windows.Foundation.Collections.IVector<string>;
                    thumbnail: Windows.Storage.Streams.RandomAccessStreamReference;
                    title: string;
                }
                export class QuickLink implements Windows.ApplicationModel.DataTransfer.ShareTarget.IQuickLink {
                    id: string;
                    supportedDataFormats: Windows.Foundation.Collections.IVector<string>;
                    supportedFileTypes: Windows.Foundation.Collections.IVector<string>;
                    thumbnail: Windows.Storage.Streams.RandomAccessStreamReference;
                    title: string;
                }
                export interface IShareOperation {
                    data: Windows.ApplicationModel.DataTransfer.DataPackageView;
                    quickLinkId: string;
                    removeThisQuickLink(): void;
                    reportStarted(): void;
                    reportDataRetrieved(): void;
                    reportSubmittedBackgroundTask(): void;
                    reportCompleted(quicklink: Windows.ApplicationModel.DataTransfer.ShareTarget.QuickLink): void;
                    reportCompleted(): void;
                    reportError(value: string): void;
                }
                export class ShareOperation implements Windows.ApplicationModel.DataTransfer.ShareTarget.IShareOperation {
                    data: Windows.ApplicationModel.DataTransfer.DataPackageView;
                    quickLinkId: string;
                    removeThisQuickLink(): void;
                    reportStarted(): void;
                    reportDataRetrieved(): void;
                    reportSubmittedBackgroundTask(): void;
                    reportCompleted(quicklink: Windows.ApplicationModel.DataTransfer.ShareTarget.QuickLink): void;
                    reportCompleted(): void;
                    reportError(value: string): void;
                }
            }
        }
    }
}
declare module Windows {
    export module ApplicationModel {
        export module Activation {
            export interface ISplashScreen {
                imageLocation: Windows.Foundation.Rect;
                ondismissed: any/* TODO */;
            }
            export class SplashScreen implements Windows.ApplicationModel.Activation.ISplashScreen {
                imageLocation: Windows.Foundation.Rect;
                ondismissed: any/* TODO */;
            }
            export enum ApplicationExecutionState {
                notRunning,
                running,
                suspended,
                terminated,
                closedByUser,
            }
            export enum ActivationKind {
                launch,
                search,
                shareTarget,
                file,
                protocol,
                fileOpenPicker,
                fileSavePicker,
                cachedFileUpdater,
                contactPicker,
                device,
                printTaskSettings,
                cameraSettings,
            }
            export interface IActivatedEventArgs {
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
            }
            export interface ILaunchActivatedEventArgs extends Windows.ApplicationModel.Activation.IActivatedEventArgs {
                arguments: string;
                tileId: string;
            }
            export class LaunchActivatedEventArgs implements Windows.ApplicationModel.Activation.ILaunchActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs {
                arguments: string;
                tileId: string;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
            }
            export interface ISearchActivatedEventArgs extends Windows.ApplicationModel.Activation.IActivatedEventArgs {
                language: string;
                queryText: string;
            }
            export class SearchActivatedEventArgs implements Windows.ApplicationModel.Activation.ISearchActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs {
                language: string;
                queryText: string;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
            }
            export interface IShareTargetActivatedEventArgs extends Windows.ApplicationModel.Activation.IActivatedEventArgs {
                shareOperation: Windows.ApplicationModel.DataTransfer.ShareTarget.ShareOperation;
            }
            export class ShareTargetActivatedEventArgs implements Windows.ApplicationModel.Activation.IShareTargetActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs {
                shareOperation: Windows.ApplicationModel.DataTransfer.ShareTarget.ShareOperation;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
            }
            export interface IFileActivatedEventArgs extends Windows.ApplicationModel.Activation.IActivatedEventArgs {
                files: Windows.Foundation.Collections.IVectorView<Windows.Storage.IStorageItem>;
                verb: string;
            }
            export class FileActivatedEventArgs implements Windows.ApplicationModel.Activation.IFileActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs {
                files: Windows.Foundation.Collections.IVectorView<Windows.Storage.IStorageItem>;
                verb: string;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
            }
            export interface IProtocolActivatedEventArgs extends Windows.ApplicationModel.Activation.IActivatedEventArgs {
                uri: Windows.Foundation.Uri;
            }
            export class ProtocolActivatedEventArgs implements Windows.ApplicationModel.Activation.IProtocolActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs {
                uri: Windows.Foundation.Uri;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
            }
            export interface IFileOpenPickerActivatedEventArgs extends Windows.ApplicationModel.Activation.IActivatedEventArgs {
                fileOpenPickerUI: Windows.Storage.Pickers.Provider.FileOpenPickerUI;
            }
            export class FileOpenPickerActivatedEventArgs implements Windows.ApplicationModel.Activation.IFileOpenPickerActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs {
                fileOpenPickerUI: Windows.Storage.Pickers.Provider.FileOpenPickerUI;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
            }
            export interface IFileSavePickerActivatedEventArgs extends Windows.ApplicationModel.Activation.IActivatedEventArgs {
                fileSavePickerUI: Windows.Storage.Pickers.Provider.FileSavePickerUI;
            }
            export class FileSavePickerActivatedEventArgs implements Windows.ApplicationModel.Activation.IFileSavePickerActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs {
                fileSavePickerUI: Windows.Storage.Pickers.Provider.FileSavePickerUI;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
            }
            export interface ICachedFileUpdaterActivatedEventArgs extends Windows.ApplicationModel.Activation.IActivatedEventArgs {
                cachedFileUpdaterUI: Windows.Storage.Provider.CachedFileUpdaterUI;
            }
            export class CachedFileUpdaterActivatedEventArgs implements Windows.ApplicationModel.Activation.ICachedFileUpdaterActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs {
                cachedFileUpdaterUI: Windows.Storage.Provider.CachedFileUpdaterUI;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
            }
            export interface IContactPickerActivatedEventArgs extends Windows.ApplicationModel.Activation.IActivatedEventArgs {
                contactPickerUI: Windows.ApplicationModel.Contacts.Provider.ContactPickerUI;
            }
            export class ContactPickerActivatedEventArgs implements Windows.ApplicationModel.Activation.IContactPickerActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs {
                contactPickerUI: Windows.ApplicationModel.Contacts.Provider.ContactPickerUI;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
            }
            export interface IDeviceActivatedEventArgs extends Windows.ApplicationModel.Activation.IActivatedEventArgs {
                deviceInformationId: string;
                verb: string;
            }
            export class DeviceActivatedEventArgs implements Windows.ApplicationModel.Activation.IDeviceActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs {
                deviceInformationId: string;
                verb: string;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
            }
            export interface IPrintTaskSettingsActivatedEventArgs extends Windows.ApplicationModel.Activation.IActivatedEventArgs {
                configuration: Windows.Devices.Printers.Extensions.PrintTaskConfiguration;
            }
            export class PrintTaskSettingsActivatedEventArgs implements Windows.ApplicationModel.Activation.IPrintTaskSettingsActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs {
                configuration: Windows.Devices.Printers.Extensions.PrintTaskConfiguration;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
            }
            export interface ICameraSettingsActivatedEventArgs extends Windows.ApplicationModel.Activation.IActivatedEventArgs {
                videoDeviceController: any;
                videoDeviceExtension: any;
            }
            export class CameraSettingsActivatedEventArgs implements Windows.ApplicationModel.Activation.ICameraSettingsActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs {
                videoDeviceController: any;
                videoDeviceExtension: any;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
            }
        }
    }
}
declare module Windows {
    export module ApplicationModel {
        export module Core {
            export class CoreApplication {
                static mainView: Windows.ApplicationModel.Core.CoreApplicationView;
                static views: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Core.CoreApplicationView>;
                static id: string;
                static properties: Windows.Foundation.Collections.IPropertySet;
                static incrementApplicationUseCount(): void;
                static decrementApplicationUseCount(): void;
                static createNewView(runtimeType: string, entryPoint: string): Windows.ApplicationModel.Core.CoreApplicationView;
                static exit(): void;
                static onexiting: any/* TODO */;
                static onsuspending: any/* TODO */;
                static onresuming: any/* TODO */;
                static getCurrentView(): Windows.ApplicationModel.Core.CoreApplicationView;
                static run(viewSource: Windows.ApplicationModel.Core.IFrameworkViewSource): void;
                static runWithActivationFactories(activationFactoryCallback: Windows.Foundation.IGetActivationFactory): void;
            }
            export class CoreApplicationView implements Windows.ApplicationModel.Core.ICoreApplicationView {
                coreWindow: Windows.UI.Core.CoreWindow;
                isHosted: boolean;
                isMain: boolean;
                onactivated: any/* TODO */;
            }
            export interface IFrameworkView {
                initialize(applicationView: Windows.ApplicationModel.Core.CoreApplicationView): void;
                setWindow(window: Windows.UI.Core.CoreWindow): void;
                load(entryPoint: string): void;
                run(): void;
                uninitialize(): void;
            }
            export interface IFrameworkViewSource {
                createView(): Windows.ApplicationModel.Core.IFrameworkView;
            }
            export interface ICoreApplication {
                id: string;
                properties: Windows.Foundation.Collections.IPropertySet;
                onsuspending: any/* TODO */;
                onresuming: any/* TODO */;
                getCurrentView(): Windows.ApplicationModel.Core.CoreApplicationView;
                run(viewSource: Windows.ApplicationModel.Core.IFrameworkViewSource): void;
                runWithActivationFactories(activationFactoryCallback: Windows.Foundation.IGetActivationFactory): void;
            }
            export interface ICoreApplicationUseCount {
                incrementApplicationUseCount(): void;
                decrementApplicationUseCount(): void;
            }
            export interface ICoreApplicationExit {
                exit(): void;
                onexiting: any/* TODO */;
            }
            export interface ICoreImmersiveApplication {
                mainView: Windows.ApplicationModel.Core.CoreApplicationView;
                views: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Core.CoreApplicationView>;
                createNewView(runtimeType: string, entryPoint: string): Windows.ApplicationModel.Core.CoreApplicationView;
            }
            export interface ICoreApplicationView {
                coreWindow: Windows.UI.Core.CoreWindow;
                isHosted: boolean;
                isMain: boolean;
                onactivated: any/* TODO */;
            }
        }
    }
}
declare module Windows {
    export module ApplicationModel {
        export class SuspendingEventArgs implements Windows.ApplicationModel.ISuspendingEventArgs {
            suspendingOperation: Windows.ApplicationModel.SuspendingOperation;
        }
        export interface ISuspendingDeferral {
            complete(): void;
        }
        export class SuspendingDeferral implements Windows.ApplicationModel.ISuspendingDeferral {
            complete(): void;
        }
        export interface ISuspendingOperation {
            deadline: Date;
            getDeferral(): Windows.ApplicationModel.SuspendingDeferral;
        }
        export class SuspendingOperation implements Windows.ApplicationModel.ISuspendingOperation {
            deadline: Date;
            getDeferral(): Windows.ApplicationModel.SuspendingDeferral;
        }
        export interface ISuspendingEventArgs {
            suspendingOperation: Windows.ApplicationModel.SuspendingOperation;
        }
        export interface PackageVersion {
            major: number;
            minor: number;
            build: number;
            revision: number;
        }
        export interface IPackageId {
            architecture: Windows.System.ProcessorArchitecture;
            familyName: string;
            fullName: string;
            name: string;
            publisher: string;
            publisherId: string;
            resourceId: string;
            version: Windows.ApplicationModel.PackageVersion;
        }
        export class PackageId implements Windows.ApplicationModel.IPackageId {
            architecture: Windows.System.ProcessorArchitecture;
            familyName: string;
            fullName: string;
            name: string;
            publisher: string;
            publisherId: string;
            resourceId: string;
            version: Windows.ApplicationModel.PackageVersion;
        }
        export interface IPackage {
            dependencies: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Package>;
            id: Windows.ApplicationModel.PackageId;
            installedLocation: Windows.Storage.StorageFolder;
            isFramework: boolean;
        }
        export class Package implements Windows.ApplicationModel.IPackage {
            dependencies: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Package>;
            id: Windows.ApplicationModel.PackageId;
            installedLocation: Windows.Storage.StorageFolder;
            isFramework: boolean;
            static current: Windows.ApplicationModel.Package;
        }
        export interface IPackageStatics {
            current: Windows.ApplicationModel.Package;
        }
        export interface IDesignModeStatics {
            designModeEnabled: boolean;
        }
        export class DesignMode {
            static designModeEnabled: boolean;
        }
    }
}
declare module Windows {
    export module ApplicationModel {
        export module Resources {
            export interface IResourceLoader {
                getString(resource: string): string;
            }
            export class ResourceLoader implements Windows.ApplicationModel.Resources.IResourceLoader {
                constructor(name: string);
                constructor();
                getString(resource: string): string;
                static getStringForReference(uri: Windows.Foundation.Uri): string;
            }
            export interface IResourceLoaderStatics {
                getStringForReference(uri: Windows.Foundation.Uri): string;
            }
            export interface IResourceLoaderFactory {
                createResourceLoaderByName(name: string): Windows.ApplicationModel.Resources.ResourceLoader;
            }
        }
    }
}
declare module Windows {
    export module ApplicationModel {
        export module Resources {
            export module Core {
                export interface IResourceManager {
                    allResourceMaps: Windows.Foundation.Collections.IMapView<string, Windows.ApplicationModel.Resources.Core.ResourceMap>;
                    defaultContext: Windows.ApplicationModel.Resources.Core.ResourceContext;
                    mainResourceMap: Windows.ApplicationModel.Resources.Core.ResourceMap;
                    loadPriFiles(files: Windows.Foundation.Collections.IIterable<Windows.Storage.IStorageFile>): void;
                    unloadPriFiles(files: Windows.Foundation.Collections.IIterable<Windows.Storage.IStorageFile>): void;
                }
                export class ResourceMap implements Windows.ApplicationModel.Resources.Core.IResourceMap, Windows.Foundation.Collections.IMapView<string, Windows.ApplicationModel.Resources.Core.NamedResource>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, Windows.ApplicationModel.Resources.Core.NamedResource>> {
                    uri: Windows.Foundation.Uri;
                    size: number;
                    getValue(resource: string): Windows.ApplicationModel.Resources.Core.ResourceCandidate;
                    getValue(resource: string, context: Windows.ApplicationModel.Resources.Core.ResourceContext): Windows.ApplicationModel.Resources.Core.ResourceCandidate;
                    getSubtree(reference: string): Windows.ApplicationModel.Resources.Core.ResourceMap;
                    lookup(key: string): Windows.ApplicationModel.Resources.Core.NamedResource;
                    hasKey(key: string): boolean;
                    split(): { first: Windows.Foundation.Collections.IMapView<string, Windows.ApplicationModel.Resources.Core.NamedResource>; second: Windows.Foundation.Collections.IMapView<string, Windows.ApplicationModel.Resources.Core.NamedResource>; };
                    first(): Windows.Foundation.Collections.IIterator<Windows.Foundation.Collections.IKeyValuePair<string, Windows.ApplicationModel.Resources.Core.NamedResource>>;
                }
                export class ResourceContext implements Windows.ApplicationModel.Resources.Core.IResourceContext {
                    languages: Windows.Foundation.Collections.IVectorView<string>;
                    qualifierValues: Windows.Foundation.Collections.IObservableMap<string, string>;
                    reset(): void;
                    reset(qualifierNames: Windows.Foundation.Collections.IIterable<string>): void;
                    overrideToMatch(result: Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Resources.Core.ResourceQualifier>): void;
                    clone(): Windows.ApplicationModel.Resources.Core.ResourceContext;
                    static createMatchingContext(result: Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Resources.Core.ResourceQualifier>): Windows.ApplicationModel.Resources.Core.ResourceContext;
                }
                export interface IResourceManagerStatics {
                    current: Windows.ApplicationModel.Resources.Core.ResourceManager;
                    isResourceReference(resourceReference: string): boolean;
                }
                export class ResourceManager implements Windows.ApplicationModel.Resources.Core.IResourceManager {
                    allResourceMaps: Windows.Foundation.Collections.IMapView<string, Windows.ApplicationModel.Resources.Core.ResourceMap>;
                    defaultContext: Windows.ApplicationModel.Resources.Core.ResourceContext;
                    mainResourceMap: Windows.ApplicationModel.Resources.Core.ResourceMap;
                    loadPriFiles(files: Windows.Foundation.Collections.IIterable<Windows.Storage.IStorageFile>): void;
                    unloadPriFiles(files: Windows.Foundation.Collections.IIterable<Windows.Storage.IStorageFile>): void;
                    static current: Windows.ApplicationModel.Resources.Core.ResourceManager;
                    static isResourceReference(resourceReference: string): boolean;
                }
                export interface IResourceQualifier {
                    isDefault: boolean;
                    isMatch: boolean;
                    qualifierName: string;
                    qualifierValue: string;
                    score: number;
                }
                export class ResourceQualifier implements Windows.ApplicationModel.Resources.Core.IResourceQualifier {
                    isDefault: boolean;
                    isMatch: boolean;
                    qualifierName: string;
                    qualifierValue: string;
                    score: number;
                }
                export interface IResourceContext {
                    languages: Windows.Foundation.Collections.IVectorView<string>;
                    qualifierValues: Windows.Foundation.Collections.IObservableMap<string, string>;
                    reset(): void;
                    reset(qualifierNames: Windows.Foundation.Collections.IIterable<string>): void;
                    overrideToMatch(result: Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Resources.Core.ResourceQualifier>): void;
                    clone(): Windows.ApplicationModel.Resources.Core.ResourceContext;
                }
                export interface IResourceContextStatics {
                    createMatchingContext(result: Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Resources.Core.ResourceQualifier>): Windows.ApplicationModel.Resources.Core.ResourceContext;
                }
                export interface IResourceCandidate {
                    isDefault: boolean;
                    isMatch: boolean;
                    isMatchAsDefault: boolean;
                    qualifiers: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Resources.Core.ResourceQualifier>;
                    valueAsString: string;
                    getValueAsFileAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                    getQualifierValue(qualifierName: string): string;
                }
                export class ResourceCandidate implements Windows.ApplicationModel.Resources.Core.IResourceCandidate {
                    isDefault: boolean;
                    isMatch: boolean;
                    isMatchAsDefault: boolean;
                    qualifiers: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Resources.Core.ResourceQualifier>;
                    valueAsString: string;
                    getValueAsFileAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                    getQualifierValue(qualifierName: string): string;
                }
                export interface INamedResource {
                    candidates: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Resources.Core.ResourceCandidate>;
                    uri: Windows.Foundation.Uri;
                    resolve(): Windows.ApplicationModel.Resources.Core.ResourceCandidate;
                    resolve(resourceContext: Windows.ApplicationModel.Resources.Core.ResourceContext): Windows.ApplicationModel.Resources.Core.ResourceCandidate;
                    resolveAll(): Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Resources.Core.ResourceCandidate>;
                    resolveAll(resourceContext: Windows.ApplicationModel.Resources.Core.ResourceContext): Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Resources.Core.ResourceCandidate>;
                }
                export class NamedResource implements Windows.ApplicationModel.Resources.Core.INamedResource {
                    candidates: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Resources.Core.ResourceCandidate>;
                    uri: Windows.Foundation.Uri;
                    resolve(): Windows.ApplicationModel.Resources.Core.ResourceCandidate;
                    resolve(resourceContext: Windows.ApplicationModel.Resources.Core.ResourceContext): Windows.ApplicationModel.Resources.Core.ResourceCandidate;
                    resolveAll(): Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Resources.Core.ResourceCandidate>;
                    resolveAll(resourceContext: Windows.ApplicationModel.Resources.Core.ResourceContext): Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Resources.Core.ResourceCandidate>;
                }
                export interface IResourceMap extends Windows.Foundation.Collections.IMapView<string, Windows.ApplicationModel.Resources.Core.NamedResource>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, Windows.ApplicationModel.Resources.Core.NamedResource>> {
                    uri: Windows.Foundation.Uri;
                    getValue(resource: string): Windows.ApplicationModel.Resources.Core.ResourceCandidate;
                    getValue(resource: string, context: Windows.ApplicationModel.Resources.Core.ResourceContext): Windows.ApplicationModel.Resources.Core.ResourceCandidate;
                    getSubtree(reference: string): Windows.ApplicationModel.Resources.Core.ResourceMap;
                }
                export class ResourceMapIterator implements Windows.Foundation.Collections.IIterator<Windows.Foundation.Collections.IKeyValuePair<string, Windows.ApplicationModel.Resources.Core.NamedResource>> {
                    current: Windows.Foundation.Collections.IKeyValuePair<string, Windows.ApplicationModel.Resources.Core.NamedResource>;
                    hasCurrent: boolean;
                    moveNext(): boolean;
                    getMany(): { items: Windows.Foundation.Collections.IKeyValuePair<string, Windows.ApplicationModel.Resources.Core.NamedResource>[]; returnValue: number; };
                }
                export class ResourceMapMapView implements Windows.Foundation.Collections.IMapView<string, Windows.ApplicationModel.Resources.Core.ResourceMap>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, Windows.ApplicationModel.Resources.Core.ResourceMap>> {
                    size: number;
                    lookup(key: string): Windows.ApplicationModel.Resources.Core.ResourceMap;
                    hasKey(key: string): boolean;
                    split(): { first: Windows.Foundation.Collections.IMapView<string, Windows.ApplicationModel.Resources.Core.ResourceMap>; second: Windows.Foundation.Collections.IMapView<string, Windows.ApplicationModel.Resources.Core.ResourceMap>; };
                    first(): Windows.Foundation.Collections.IIterator<Windows.Foundation.Collections.IKeyValuePair<string, Windows.ApplicationModel.Resources.Core.ResourceMap>>;
                }
                export class ResourceMapMapViewIterator implements Windows.Foundation.Collections.IIterator<Windows.Foundation.Collections.IKeyValuePair<string, Windows.ApplicationModel.Resources.Core.ResourceMap>> {
                    current: Windows.Foundation.Collections.IKeyValuePair<string, Windows.ApplicationModel.Resources.Core.ResourceMap>;
                    hasCurrent: boolean;
                    moveNext(): boolean;
                    getMany(): { items: Windows.Foundation.Collections.IKeyValuePair<string, Windows.ApplicationModel.Resources.Core.ResourceMap>[]; returnValue: number; };
                }
                export class ResourceQualifierObservableMap implements Windows.Foundation.Collections.IObservableMap<string, string>, Windows.Foundation.Collections.IMap<string, string>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, string>> {
                    size: number;
                    onmapchanged: any/* TODO */;
                    lookup(key: string): string;
                    hasKey(key: string): boolean;
                    getView(): Windows.Foundation.Collections.IMapView<string, string>;
                    insert(key: string, value: string): boolean;
                    remove(key: string): void;
                    clear(): void;
                    first(): Windows.Foundation.Collections.IIterator<Windows.Foundation.Collections.IKeyValuePair<string, string>>;
                }
                export class ResourceQualifierMapView implements Windows.Foundation.Collections.IMapView<string, string>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, string>> {
                    size: number;
                    lookup(key: string): string;
                    hasKey(key: string): boolean;
                    split(): { first: Windows.Foundation.Collections.IMapView<string, string>; second: Windows.Foundation.Collections.IMapView<string, string>; };
                    first(): Windows.Foundation.Collections.IIterator<Windows.Foundation.Collections.IKeyValuePair<string, string>>;
                }
                export class ResourceQualifierVectorView implements Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Resources.Core.ResourceQualifier>, Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Resources.Core.ResourceQualifier> {
                    size: number;
                    getAt(index: number): Windows.ApplicationModel.Resources.Core.ResourceQualifier;
                    indexOf(value: Windows.ApplicationModel.Resources.Core.ResourceQualifier): { index: number; returnValue: boolean; };
                    getMany(startIndex: number): { items: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]; returnValue: number; };
                    first(): Windows.Foundation.Collections.IIterator<Windows.ApplicationModel.Resources.Core.ResourceQualifier>;
                    toString(): string;
                    toLocaleString(): string;
                    concat(...items: Windows.ApplicationModel.Resources.Core.ResourceQualifier[][]): Windows.ApplicationModel.Resources.Core.ResourceQualifier[];
                    join(seperator: string): string;
                    pop(): Windows.ApplicationModel.Resources.Core.ResourceQualifier;
                    push(...items: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]): void;
                    reverse(): Windows.ApplicationModel.Resources.Core.ResourceQualifier[];
                    shift(): Windows.ApplicationModel.Resources.Core.ResourceQualifier;
                    slice(start: number): Windows.ApplicationModel.Resources.Core.ResourceQualifier[];
                    slice(start: number, end: number): Windows.ApplicationModel.Resources.Core.ResourceQualifier[];
                    sort(): Windows.ApplicationModel.Resources.Core.ResourceQualifier[];
                    sort(compareFn: (a: Windows.ApplicationModel.Resources.Core.ResourceQualifier, b: Windows.ApplicationModel.Resources.Core.ResourceQualifier) => number): Windows.ApplicationModel.Resources.Core.ResourceQualifier[];
                    splice(start: number): Windows.ApplicationModel.Resources.Core.ResourceQualifier[];
                    splice(start: number, deleteCount: number, ...items: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]): Windows.ApplicationModel.Resources.Core.ResourceQualifier[];
                    unshift(...items: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]): number;
                    lastIndexOf(searchElement: Windows.ApplicationModel.Resources.Core.ResourceQualifier): number;
                    lastIndexOf(searchElement: Windows.ApplicationModel.Resources.Core.ResourceQualifier, fromIndex: number): number;
                    every(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceQualifier, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]) => boolean): boolean;
                    every(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceQualifier, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]) => boolean, thisArg: any): boolean;
                    some(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceQualifier, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]) => boolean): boolean;
                    some(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceQualifier, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]) => boolean, thisArg: any): boolean;
                    forEach(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceQualifier, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]) => void ): void;
                    forEach(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceQualifier, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]) => void , thisArg: any): void;
                    map(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceQualifier, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]) => any): any[];
                    map(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceQualifier, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]) => any, thisArg: any): any[];
                    filter(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceQualifier, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]) => boolean): Windows.ApplicationModel.Resources.Core.ResourceQualifier[];
                    filter(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceQualifier, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]) => boolean, thisArg: any): Windows.ApplicationModel.Resources.Core.ResourceQualifier[];
                    reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]) => any): any;
                    reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]) => any, initialValue: any): any;
                    reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]) => any): any;
                    reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.ApplicationModel.Resources.Core.ResourceQualifier[]) => any, initialValue: any): any;
                    length: number;
                }
                export class ResourceCandidateVectorView implements Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Resources.Core.ResourceCandidate>, Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Resources.Core.ResourceCandidate> {
                    size: number;
                    getAt(index: number): Windows.ApplicationModel.Resources.Core.ResourceCandidate;
                    indexOf(value: Windows.ApplicationModel.Resources.Core.ResourceCandidate): { index: number; returnValue: boolean; };
                    getMany(startIndex: number): { items: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]; returnValue: number; };
                    first(): Windows.Foundation.Collections.IIterator<Windows.ApplicationModel.Resources.Core.ResourceCandidate>;
                    toString(): string;
                    toLocaleString(): string;
                    concat(...items: Windows.ApplicationModel.Resources.Core.ResourceCandidate[][]): Windows.ApplicationModel.Resources.Core.ResourceCandidate[];
                    join(seperator: string): string;
                    pop(): Windows.ApplicationModel.Resources.Core.ResourceCandidate;
                    push(...items: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]): void;
                    reverse(): Windows.ApplicationModel.Resources.Core.ResourceCandidate[];
                    shift(): Windows.ApplicationModel.Resources.Core.ResourceCandidate;
                    slice(start: number): Windows.ApplicationModel.Resources.Core.ResourceCandidate[];
                    slice(start: number, end: number): Windows.ApplicationModel.Resources.Core.ResourceCandidate[];
                    sort(): Windows.ApplicationModel.Resources.Core.ResourceCandidate[];
                    sort(compareFn: (a: Windows.ApplicationModel.Resources.Core.ResourceCandidate, b: Windows.ApplicationModel.Resources.Core.ResourceCandidate) => number): Windows.ApplicationModel.Resources.Core.ResourceCandidate[];
                    splice(start: number): Windows.ApplicationModel.Resources.Core.ResourceCandidate[];
                    splice(start: number, deleteCount: number, ...items: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]): Windows.ApplicationModel.Resources.Core.ResourceCandidate[];
                    unshift(...items: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]): number;
                    lastIndexOf(searchElement: Windows.ApplicationModel.Resources.Core.ResourceCandidate): number;
                    lastIndexOf(searchElement: Windows.ApplicationModel.Resources.Core.ResourceCandidate, fromIndex: number): number;
                    every(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceCandidate, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]) => boolean): boolean;
                    every(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceCandidate, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]) => boolean, thisArg: any): boolean;
                    some(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceCandidate, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]) => boolean): boolean;
                    some(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceCandidate, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]) => boolean, thisArg: any): boolean;
                    forEach(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceCandidate, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]) => void ): void;
                    forEach(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceCandidate, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]) => void , thisArg: any): void;
                    map(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceCandidate, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]) => any): any[];
                    map(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceCandidate, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]) => any, thisArg: any): any[];
                    filter(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceCandidate, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]) => boolean): Windows.ApplicationModel.Resources.Core.ResourceCandidate[];
                    filter(callbackfn: (value: Windows.ApplicationModel.Resources.Core.ResourceCandidate, index: number, array: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]) => boolean, thisArg: any): Windows.ApplicationModel.Resources.Core.ResourceCandidate[];
                    reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]) => any): any;
                    reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]) => any, initialValue: any): any;
                    reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]) => any): any;
                    reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.ApplicationModel.Resources.Core.ResourceCandidate[]) => any, initialValue: any): any;
                    length: number;
                }
                export class ResourceContextLanguagesVectorView implements Windows.Foundation.Collections.IVectorView<string>, Windows.Foundation.Collections.IIterable<string> {
                    size: number;
                    getAt(index: number): string;
                    indexOf(value: string): { index: number; returnValue: boolean; };
                    getMany(startIndex: number): { items: string[]; returnValue: number; };
                    first(): Windows.Foundation.Collections.IIterator<string>;
                    toString(): string;
                    toLocaleString(): string;
                    concat(...items: string[][]): string[];
                    join(seperator: string): string;
                    pop(): string;
                    push(...items: string[]): void;
                    reverse(): string[];
                    shift(): string;
                    slice(start: number): string[];
                    slice(start: number, end: number): string[];
                    sort(): string[];
                    sort(compareFn: (a: string, b: string) => number): string[];
                    splice(start: number): string[];
                    splice(start: number, deleteCount: number, ...items: string[]): string[];
                    unshift(...items: string[]): number;
                    lastIndexOf(searchElement: string): number;
                    lastIndexOf(searchElement: string, fromIndex: number): number;
                    every(callbackfn: (value: string, index: number, array: string[]) => boolean): boolean;
                    every(callbackfn: (value: string, index: number, array: string[]) => boolean, thisArg: any): boolean;
                    some(callbackfn: (value: string, index: number, array: string[]) => boolean): boolean;
                    some(callbackfn: (value: string, index: number, array: string[]) => boolean, thisArg: any): boolean;
                    forEach(callbackfn: (value: string, index: number, array: string[]) => void ): void;
                    forEach(callbackfn: (value: string, index: number, array: string[]) => void , thisArg: any): void;
                    map(callbackfn: (value: string, index: number, array: string[]) => any): any[];
                    map(callbackfn: (value: string, index: number, array: string[]) => any, thisArg: any): any[];
                    filter(callbackfn: (value: string, index: number, array: string[]) => boolean): string[];
                    filter(callbackfn: (value: string, index: number, array: string[]) => boolean, thisArg: any): string[];
                    reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: string[]) => any): any;
                    reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: string[]) => any, initialValue: any): any;
                    reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: string[]) => any): any;
                    reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: string[]) => any, initialValue: any): any;
                    length: number;
                }
            }
        }
    }
}
declare module Windows {
    export module ApplicationModel {
        export module Resources {
            export module Management {
                export enum IndexedResourceType {
                    string,
                    path,
                }
                export interface IResourceIndexer {
                    indexFilePath(filePath: Windows.Foundation.Uri): Windows.ApplicationModel.Resources.Management.IndexedResourceCandidate;
                    indexFileContentsAsync(file: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Resources.Management.IndexedResourceCandidate>>;
                }
                export class IndexedResourceCandidate implements Windows.ApplicationModel.Resources.Management.IIndexedResourceCandidate {
                    metadata: Windows.Foundation.Collections.IMapView<string, string>;
                    qualifiers: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Resources.Management.IndexedResourceQualifier>;
                    type: Windows.ApplicationModel.Resources.Management.IndexedResourceType;
                    uri: Windows.Foundation.Uri;
                    valueAsString: string;
                    getQualifierValue(qualifierName: string): string;
                }
                export interface IResourceIndexerFactory {
                    createResourceIndexer(projectRoot: Windows.Foundation.Uri): Windows.ApplicationModel.Resources.Management.ResourceIndexer;
                }
                export class ResourceIndexer implements Windows.ApplicationModel.Resources.Management.IResourceIndexer {
                    constructor(projectRoot: Windows.Foundation.Uri);
                    indexFilePath(filePath: Windows.Foundation.Uri): Windows.ApplicationModel.Resources.Management.IndexedResourceCandidate;
                    indexFileContentsAsync(file: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Resources.Management.IndexedResourceCandidate>>;
                }
                export interface IIndexedResourceQualifier {
                    qualifierName: string;
                    qualifierValue: string;
                }
                export interface IIndexedResourceCandidate {
                    metadata: Windows.Foundation.Collections.IMapView<string, string>;
                    qualifiers: Windows.Foundation.Collections.IVectorView<Windows.ApplicationModel.Resources.Management.IndexedResourceQualifier>;
                    type: Windows.ApplicationModel.Resources.Management.IndexedResourceType;
                    uri: Windows.Foundation.Uri;
                    valueAsString: string;
                    getQualifierValue(qualifierName: string): string;
                }
                export class IndexedResourceQualifier implements Windows.ApplicationModel.Resources.Management.IIndexedResourceQualifier {
                    qualifierName: string;
                    qualifierValue: string;
                }
            }
        }
    }
}
declare module Windows {
    export module ApplicationModel {
        export module Store {
            export interface LicenseChangedEventHandler {
                (): void;
            }
            export interface ICurrentApp {
                appId: string;
                licenseInformation: Windows.ApplicationModel.Store.LicenseInformation;
                linkUri: Windows.Foundation.Uri;
                requestAppPurchaseAsync(includeReceipt: boolean): Windows.Foundation.IAsyncOperation<string>;
                requestProductPurchaseAsync(productId: string, includeReceipt: boolean): Windows.Foundation.IAsyncOperation<string>;
                loadListingInformationAsync(): Windows.Foundation.IAsyncOperation<Windows.ApplicationModel.Store.ListingInformation>;
                getAppReceiptAsync(): Windows.Foundation.IAsyncOperation<string>;
                getProductReceiptAsync(productId: string): Windows.Foundation.IAsyncOperation<string>;
            }
            export class LicenseInformation implements Windows.ApplicationModel.Store.ILicenseInformation {
                expirationDate: Date;
                isActive: boolean;
                isTrial: boolean;
                productLicenses: Windows.Foundation.Collections.IMapView<string, Windows.ApplicationModel.Store.ProductLicense>;
                onlicensechanged: any/* TODO */;
            }
            export class ListingInformation implements Windows.ApplicationModel.Store.IListingInformation {
                ageRating: number;
                currentMarket: string;
                description: string;
                formattedPrice: string;
                name: string;
                productListings: Windows.Foundation.Collections.IMapView<string, Windows.ApplicationModel.Store.ProductListing>;
            }
            export interface ICurrentAppSimulator {
                appId: string;
                licenseInformation: Windows.ApplicationModel.Store.LicenseInformation;
                linkUri: Windows.Foundation.Uri;
                requestAppPurchaseAsync(includeReceipt: boolean): Windows.Foundation.IAsyncOperation<string>;
                requestProductPurchaseAsync(productId: string, includeReceipt: boolean): Windows.Foundation.IAsyncOperation<string>;
                loadListingInformationAsync(): Windows.Foundation.IAsyncOperation<Windows.ApplicationModel.Store.ListingInformation>;
                getAppReceiptAsync(): Windows.Foundation.IAsyncOperation<string>;
                getProductReceiptAsync(productId: string): Windows.Foundation.IAsyncOperation<string>;
                reloadSimulatorAsync(simulatorSettingsFile: Windows.Storage.StorageFile): Windows.Foundation.IAsyncAction;
            }
            export interface ILicenseInformation {
                expirationDate: Date;
                isActive: boolean;
                isTrial: boolean;
                productLicenses: Windows.Foundation.Collections.IMapView<string, Windows.ApplicationModel.Store.ProductLicense>;
                onlicensechanged: any/* TODO */;
            }
            export class ProductLicense implements Windows.ApplicationModel.Store.IProductLicense {
                expirationDate: Date;
                isActive: boolean;
                productId: string;
            }
            export interface IProductLicense {
                expirationDate: Date;
                isActive: boolean;
                productId: string;
            }
            export interface IListingInformation {
                ageRating: number;
                currentMarket: string;
                description: string;
                formattedPrice: string;
                name: string;
                productListings: Windows.Foundation.Collections.IMapView<string, Windows.ApplicationModel.Store.ProductListing>;
            }
            export class ProductListing implements Windows.ApplicationModel.Store.IProductListing {
                formattedPrice: string;
                name: string;
                productId: string;
            }
            export interface IProductListing {
                formattedPrice: string;
                name: string;
                productId: string;
            }
            export class CurrentApp {
                static appId: string;
                static licenseInformation: Windows.ApplicationModel.Store.LicenseInformation;
                static linkUri: Windows.Foundation.Uri;
                static requestAppPurchaseAsync(includeReceipt: boolean): Windows.Foundation.IAsyncOperation<string>;
                static requestProductPurchaseAsync(productId: string, includeReceipt: boolean): Windows.Foundation.IAsyncOperation<string>;
                static loadListingInformationAsync(): Windows.Foundation.IAsyncOperation<Windows.ApplicationModel.Store.ListingInformation>;
                static getAppReceiptAsync(): Windows.Foundation.IAsyncOperation<string>;
                static getProductReceiptAsync(productId: string): Windows.Foundation.IAsyncOperation<string>;
            }
            export class CurrentAppSimulator {
                static appId: string;
                static licenseInformation: Windows.ApplicationModel.Store.LicenseInformation;
                static linkUri: Windows.Foundation.Uri;
                static requestAppPurchaseAsync(includeReceipt: boolean): Windows.Foundation.IAsyncOperation<string>;
                static requestProductPurchaseAsync(productId: string, includeReceipt: boolean): Windows.Foundation.IAsyncOperation<string>;
                static loadListingInformationAsync(): Windows.Foundation.IAsyncOperation<Windows.ApplicationModel.Store.ListingInformation>;
                static getAppReceiptAsync(): Windows.Foundation.IAsyncOperation<string>;
                static getProductReceiptAsync(productId: string): Windows.Foundation.IAsyncOperation<string>;
                static reloadSimulatorAsync(simulatorSettingsFile: Windows.Storage.StorageFile): Windows.Foundation.IAsyncAction;
            }
        }
    }
}
declare module Windows {
    export module Data {
        export module Html {
            export interface IHtmlUtilities {
                convertToText(html: string): string;
            }
            export class HtmlUtilities {
                static convertToText(html: string): string;
            }
        }
    }
}
declare module Windows {
    export module Data {
        export module Json {
            export enum JsonValueType {
                null_,
                boolean,
                number,
                string,
                array,
                object,
            }
            export enum JsonErrorStatus {
                unknown,
                invalidJsonString,
                invalidJsonNumber,
                jsonValueNotFound,
                implementationLimit,
            }
            export interface IJsonValue {
                valueType: Windows.Data.Json.JsonValueType;
                stringify(): string;
                getString(): string;
                getNumber(): number;
                getBoolean(): boolean;
                getArray(): Windows.Data.Json.JsonArray;
                getObject(): Windows.Data.Json.JsonObject;
            }
            export class JsonArray implements Windows.Data.Json.IJsonArray, Windows.Data.Json.IJsonValue, Windows.Foundation.Collections.IVector<Windows.Data.Json.IJsonValue>, Windows.Foundation.Collections.IIterable<Windows.Data.Json.IJsonValue> {
                valueType: Windows.Data.Json.JsonValueType;
                size: number;
                getObjectAt(index: number): Windows.Data.Json.JsonObject;
                getArrayAt(index: number): Windows.Data.Json.JsonArray;
                getStringAt(index: number): string;
                getNumberAt(index: number): number;
                getBooleanAt(index: number): boolean;
                stringify(): string;
                getString(): string;
                getNumber(): number;
                getBoolean(): boolean;
                getArray(): Windows.Data.Json.JsonArray;
                getObject(): Windows.Data.Json.JsonObject;
                getAt(index: number): Windows.Data.Json.IJsonValue;
                getView(): Windows.Foundation.Collections.IVectorView<Windows.Data.Json.IJsonValue>;
                indexOf(value: Windows.Data.Json.IJsonValue): { index: number; returnValue: boolean; };
                setAt(index: number, value: Windows.Data.Json.IJsonValue): void;
                insertAt(index: number, value: Windows.Data.Json.IJsonValue): void;
                removeAt(index: number): void;
                append(value: Windows.Data.Json.IJsonValue): void;
                removeAtEnd(): void;
                clear(): void;
                getMany(startIndex: number): { items: Windows.Data.Json.IJsonValue[]; returnValue: number; };
                replaceAll(items: Windows.Data.Json.IJsonValue[]): void;
                first(): Windows.Foundation.Collections.IIterator<Windows.Data.Json.IJsonValue>;
                static parse(input: string): Windows.Data.Json.JsonArray;
                static tryParse(input: string): { result: Windows.Data.Json.JsonArray; succeeded: boolean; };
                toString(): string;
                toLocaleString(): string;
                concat(...items: Windows.Data.Json.IJsonValue[][]): Windows.Data.Json.IJsonValue[];
                join(seperator: string): string;
                pop(): Windows.Data.Json.IJsonValue;
                push(...items: Windows.Data.Json.IJsonValue[]): void;
                reverse(): Windows.Data.Json.IJsonValue[];
                shift(): Windows.Data.Json.IJsonValue;
                slice(start: number): Windows.Data.Json.IJsonValue[];
                slice(start: number, end: number): Windows.Data.Json.IJsonValue[];
                sort(): Windows.Data.Json.IJsonValue[];
                sort(compareFn: (a: Windows.Data.Json.IJsonValue, b: Windows.Data.Json.IJsonValue) => number): Windows.Data.Json.IJsonValue[];
                splice(start: number): Windows.Data.Json.IJsonValue[];
                splice(start: number, deleteCount: number, ...items: Windows.Data.Json.IJsonValue[]): Windows.Data.Json.IJsonValue[];
                unshift(...items: Windows.Data.Json.IJsonValue[]): number;
                lastIndexOf(searchElement: Windows.Data.Json.IJsonValue): number;
                lastIndexOf(searchElement: Windows.Data.Json.IJsonValue, fromIndex: number): number;
                every(callbackfn: (value: Windows.Data.Json.IJsonValue, index: number, array: Windows.Data.Json.IJsonValue[]) => boolean): boolean;
                every(callbackfn: (value: Windows.Data.Json.IJsonValue, index: number, array: Windows.Data.Json.IJsonValue[]) => boolean, thisArg: any): boolean;
                some(callbackfn: (value: Windows.Data.Json.IJsonValue, index: number, array: Windows.Data.Json.IJsonValue[]) => boolean): boolean;
                some(callbackfn: (value: Windows.Data.Json.IJsonValue, index: number, array: Windows.Data.Json.IJsonValue[]) => boolean, thisArg: any): boolean;
                forEach(callbackfn: (value: Windows.Data.Json.IJsonValue, index: number, array: Windows.Data.Json.IJsonValue[]) => void ): void;
                forEach(callbackfn: (value: Windows.Data.Json.IJsonValue, index: number, array: Windows.Data.Json.IJsonValue[]) => void , thisArg: any): void;
                map(callbackfn: (value: Windows.Data.Json.IJsonValue, index: number, array: Windows.Data.Json.IJsonValue[]) => any): any[];
                map(callbackfn: (value: Windows.Data.Json.IJsonValue, index: number, array: Windows.Data.Json.IJsonValue[]) => any, thisArg: any): any[];
                filter(callbackfn: (value: Windows.Data.Json.IJsonValue, index: number, array: Windows.Data.Json.IJsonValue[]) => boolean): Windows.Data.Json.IJsonValue[];
                filter(callbackfn: (value: Windows.Data.Json.IJsonValue, index: number, array: Windows.Data.Json.IJsonValue[]) => boolean, thisArg: any): Windows.Data.Json.IJsonValue[];
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Data.Json.IJsonValue[]) => any): any;
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Data.Json.IJsonValue[]) => any, initialValue: any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Data.Json.IJsonValue[]) => any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Data.Json.IJsonValue[]) => any, initialValue: any): any;
                length: number;
            }
            export class JsonObject implements Windows.Data.Json.IJsonObject, Windows.Data.Json.IJsonValue, Windows.Foundation.Collections.IMap<string, Windows.Data.Json.IJsonValue>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, Windows.Data.Json.IJsonValue>> {
                valueType: Windows.Data.Json.JsonValueType;
                size: number;
                getNamedValue(name: string): Windows.Data.Json.JsonValue;
                setNamedValue(name: string, value: Windows.Data.Json.IJsonValue): void;
                getNamedObject(name: string): Windows.Data.Json.JsonObject;
                getNamedArray(name: string): Windows.Data.Json.JsonArray;
                getNamedString(name: string): string;
                getNamedNumber(name: string): number;
                getNamedBoolean(name: string): boolean;
                stringify(): string;
                getString(): string;
                getNumber(): number;
                getBoolean(): boolean;
                getArray(): Windows.Data.Json.JsonArray;
                getObject(): Windows.Data.Json.JsonObject;
                lookup(key: string): Windows.Data.Json.IJsonValue;
                hasKey(key: string): boolean;
                getView(): Windows.Foundation.Collections.IMapView<string, Windows.Data.Json.IJsonValue>;
                insert(key: string, value: Windows.Data.Json.IJsonValue): boolean;
                remove(key: string): void;
                clear(): void;
                first(): Windows.Foundation.Collections.IIterator<Windows.Foundation.Collections.IKeyValuePair<string, Windows.Data.Json.IJsonValue>>;
                static parse(input: string): Windows.Data.Json.JsonObject;
                static tryParse(input: string): { result: Windows.Data.Json.JsonObject; succeeded: boolean; };
            }
            export interface IJsonValueStatics {
                parse(input: string): Windows.Data.Json.JsonValue;
                tryParse(input: string): { result: Windows.Data.Json.JsonValue; succeeded: boolean; };
                createBooleanValue(input: boolean): Windows.Data.Json.JsonValue;
                createNumberValue(input: number): Windows.Data.Json.JsonValue;
                createStringValue(input: string): Windows.Data.Json.JsonValue;
            }
            export class JsonValue implements Windows.Data.Json.IJsonValue {
                valueType: Windows.Data.Json.JsonValueType;
                stringify(): string;
                getString(): string;
                getNumber(): number;
                getBoolean(): boolean;
                getArray(): Windows.Data.Json.JsonArray;
                getObject(): Windows.Data.Json.JsonObject;
                static parse(input: string): Windows.Data.Json.JsonValue;
                static tryParse(input: string): { result: Windows.Data.Json.JsonValue; succeeded: boolean; };
                static createBooleanValue(input: boolean): Windows.Data.Json.JsonValue;
                static createNumberValue(input: number): Windows.Data.Json.JsonValue;
                static createStringValue(input: string): Windows.Data.Json.JsonValue;
            }
            export interface IJsonObject extends Windows.Data.Json.IJsonValue {
                getNamedValue(name: string): Windows.Data.Json.JsonValue;
                setNamedValue(name: string, value: Windows.Data.Json.IJsonValue): void;
                getNamedObject(name: string): Windows.Data.Json.JsonObject;
                getNamedArray(name: string): Windows.Data.Json.JsonArray;
                getNamedString(name: string): string;
                getNamedNumber(name: string): number;
                getNamedBoolean(name: string): boolean;
            }
            export interface IJsonObjectStatics {
                parse(input: string): Windows.Data.Json.JsonObject;
                tryParse(input: string): { result: Windows.Data.Json.JsonObject; succeeded: boolean; };
            }
            export interface IJsonArray extends Windows.Data.Json.IJsonValue {
                getObjectAt(index: number): Windows.Data.Json.JsonObject;
                getArrayAt(index: number): Windows.Data.Json.JsonArray;
                getStringAt(index: number): string;
                getNumberAt(index: number): number;
                getBooleanAt(index: number): boolean;
            }
            export interface IJsonArrayStatics {
                parse(input: string): Windows.Data.Json.JsonArray;
                tryParse(input: string): { result: Windows.Data.Json.JsonArray; succeeded: boolean; };
            }
            export interface IJsonErrorStatics {
                getStatus(hresult: number): Windows.Data.Json.JsonErrorStatus;
            }
            export class JsonError {
                static getStatus(hresult: number): Windows.Data.Json.JsonErrorStatus;
            }
        }
    }
}
declare module Windows {
    export module Data {
        export module Xml {
            export module Dom {
                export enum NodeType {
                    invalid,
                    elementNode,
                    attributeNode,
                    textNode,
                    dataSectionNode,
                    entityReferenceNode,
                    entityNode,
                    processingInstructionNode,
                    commentNode,
                    documentNode,
                    documentTypeNode,
                    documentFragmentNode,
                    notationNode,
                }
                export interface IXmlNodeSelector {
                    selectSingleNode(xpath: string): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodes(xpath: string): Windows.Data.Xml.Dom.XmlNodeList;
                    selectSingleNodeNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodesNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.XmlNodeList;
                }
                export class XmlNodeList implements Windows.Data.Xml.Dom.IXmlNodeList, Windows.Foundation.Collections.IVectorView<Windows.Data.Xml.Dom.IXmlNode>, Windows.Foundation.Collections.IIterable<Windows.Data.Xml.Dom.IXmlNode> {
                    length: number;
                    size: number;
                    item(index: number): Windows.Data.Xml.Dom.IXmlNode;
                    getAt(index: number): Windows.Data.Xml.Dom.IXmlNode;
                    indexOf(value: Windows.Data.Xml.Dom.IXmlNode): { index: number; returnValue: boolean; };
                    getMany(startIndex: number): { items: Windows.Data.Xml.Dom.IXmlNode[]; returnValue: number; };
                    first(): Windows.Foundation.Collections.IIterator<Windows.Data.Xml.Dom.IXmlNode>;
                    toString(): string;
                    toLocaleString(): string;
                    concat(...items: Windows.Data.Xml.Dom.IXmlNode[][]): Windows.Data.Xml.Dom.IXmlNode[];
                    join(seperator: string): string;
                    pop(): Windows.Data.Xml.Dom.IXmlNode;
                    push(...items: Windows.Data.Xml.Dom.IXmlNode[]): void;
                    reverse(): Windows.Data.Xml.Dom.IXmlNode[];
                    shift(): Windows.Data.Xml.Dom.IXmlNode;
                    slice(start: number): Windows.Data.Xml.Dom.IXmlNode[];
                    slice(start: number, end: number): Windows.Data.Xml.Dom.IXmlNode[];
                    sort(): Windows.Data.Xml.Dom.IXmlNode[];
                    sort(compareFn: (a: Windows.Data.Xml.Dom.IXmlNode, b: Windows.Data.Xml.Dom.IXmlNode) => number): Windows.Data.Xml.Dom.IXmlNode[];
                    splice(start: number): Windows.Data.Xml.Dom.IXmlNode[];
                    splice(start: number, deleteCount: number, ...items: Windows.Data.Xml.Dom.IXmlNode[]): Windows.Data.Xml.Dom.IXmlNode[];
                    unshift(...items: Windows.Data.Xml.Dom.IXmlNode[]): number;
                    lastIndexOf(searchElement: Windows.Data.Xml.Dom.IXmlNode): number;
                    lastIndexOf(searchElement: Windows.Data.Xml.Dom.IXmlNode, fromIndex: number): number;
                    every(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => boolean): boolean;
                    every(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => boolean, thisArg: any): boolean;
                    some(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => boolean): boolean;
                    some(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => boolean, thisArg: any): boolean;
                    forEach(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => void ): void;
                    forEach(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => void , thisArg: any): void;
                    map(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => any): any[];
                    map(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => any, thisArg: any): any[];
                    filter(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => boolean): Windows.Data.Xml.Dom.IXmlNode[];
                    filter(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => boolean, thisArg: any): Windows.Data.Xml.Dom.IXmlNode[];
                    reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => any): any;
                    reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => any, initialValue: any): any;
                    reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => any): any;
                    reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => any, initialValue: any): any;
                }
                export class XmlNamedNodeMap implements Windows.Data.Xml.Dom.IXmlNamedNodeMap, Windows.Foundation.Collections.IVectorView<Windows.Data.Xml.Dom.IXmlNode>, Windows.Foundation.Collections.IIterable<Windows.Data.Xml.Dom.IXmlNode> {
                    length: number;
                    size: number;
                    item(index: number): Windows.Data.Xml.Dom.IXmlNode;
                    getNamedItem(name: string): Windows.Data.Xml.Dom.IXmlNode;
                    setNamedItem(node: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    removeNamedItem(name: string): Windows.Data.Xml.Dom.IXmlNode;
                    getNamedItemNS(namespaceUri: any, name: string): Windows.Data.Xml.Dom.IXmlNode;
                    removeNamedItemNS(namespaceUri: any, name: string): Windows.Data.Xml.Dom.IXmlNode;
                    setNamedItemNS(node: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    getAt(index: number): Windows.Data.Xml.Dom.IXmlNode;
                    indexOf(value: Windows.Data.Xml.Dom.IXmlNode): { index: number; returnValue: boolean; };
                    getMany(startIndex: number): { items: Windows.Data.Xml.Dom.IXmlNode[]; returnValue: number; };
                    first(): Windows.Foundation.Collections.IIterator<Windows.Data.Xml.Dom.IXmlNode>;
                    toString(): string;
                    toLocaleString(): string;
                    concat(...items: Windows.Data.Xml.Dom.IXmlNode[][]): Windows.Data.Xml.Dom.IXmlNode[];
                    join(seperator: string): string;
                    pop(): Windows.Data.Xml.Dom.IXmlNode;
                    push(...items: Windows.Data.Xml.Dom.IXmlNode[]): void;
                    reverse(): Windows.Data.Xml.Dom.IXmlNode[];
                    shift(): Windows.Data.Xml.Dom.IXmlNode;
                    slice(start: number): Windows.Data.Xml.Dom.IXmlNode[];
                    slice(start: number, end: number): Windows.Data.Xml.Dom.IXmlNode[];
                    sort(): Windows.Data.Xml.Dom.IXmlNode[];
                    sort(compareFn: (a: Windows.Data.Xml.Dom.IXmlNode, b: Windows.Data.Xml.Dom.IXmlNode) => number): Windows.Data.Xml.Dom.IXmlNode[];
                    splice(start: number): Windows.Data.Xml.Dom.IXmlNode[];
                    splice(start: number, deleteCount: number, ...items: Windows.Data.Xml.Dom.IXmlNode[]): Windows.Data.Xml.Dom.IXmlNode[];
                    unshift(...items: Windows.Data.Xml.Dom.IXmlNode[]): number;
                    lastIndexOf(searchElement: Windows.Data.Xml.Dom.IXmlNode): number;
                    lastIndexOf(searchElement: Windows.Data.Xml.Dom.IXmlNode, fromIndex: number): number;
                    every(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => boolean): boolean;
                    every(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => boolean, thisArg: any): boolean;
                    some(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => boolean): boolean;
                    some(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => boolean, thisArg: any): boolean;
                    forEach(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => void ): void;
                    forEach(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => void , thisArg: any): void;
                    map(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => any): any[];
                    map(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => any, thisArg: any): any[];
                    filter(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => boolean): Windows.Data.Xml.Dom.IXmlNode[];
                    filter(callbackfn: (value: Windows.Data.Xml.Dom.IXmlNode, index: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => boolean, thisArg: any): Windows.Data.Xml.Dom.IXmlNode[];
                    reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => any): any;
                    reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => any, initialValue: any): any;
                    reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => any): any;
                    reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Data.Xml.Dom.IXmlNode[]) => any, initialValue: any): any;
                 }
                export class XmlDocument implements Windows.Data.Xml.Dom.IXmlDocument, Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer, Windows.Data.Xml.Dom.IXmlDocumentIO {
                    doctype: Windows.Data.Xml.Dom.XmlDocumentType;
                    documentElement: Windows.Data.Xml.Dom.XmlElement;
                    documentUri: string;
                    implementation: Windows.Data.Xml.Dom.XmlDomImplementation;
                    attributes: Windows.Data.Xml.Dom.XmlNamedNodeMap;
                    childNodes: Windows.Data.Xml.Dom.XmlNodeList;
                    firstChild: Windows.Data.Xml.Dom.IXmlNode;
                    lastChild: Windows.Data.Xml.Dom.IXmlNode;
                    localName: any;
                    namespaceUri: any;
                    nextSibling: Windows.Data.Xml.Dom.IXmlNode;
                    nodeName: string;
                    nodeType: Windows.Data.Xml.Dom.NodeType;
                    nodeValue: any;
                    ownerDocument: Windows.Data.Xml.Dom.XmlDocument;
                    parentNode: Windows.Data.Xml.Dom.IXmlNode;
                    prefix: any;
                    previousSibling: Windows.Data.Xml.Dom.IXmlNode;
                    innerText: string;
                    createElement(tagName: string): Windows.Data.Xml.Dom.XmlElement;
                    createDocumentFragment(): Windows.Data.Xml.Dom.XmlDocumentFragment;
                    createTextNode(data: string): Windows.Data.Xml.Dom.XmlText;
                    createComment(data: string): Windows.Data.Xml.Dom.XmlComment;
                    createProcessingInstruction(target: string, data: string): Windows.Data.Xml.Dom.XmlProcessingInstruction;
                    createAttribute(name: string): Windows.Data.Xml.Dom.XmlAttribute;
                    createEntityReference(name: string): Windows.Data.Xml.Dom.XmlEntityReference;
                    getElementsByTagName(tagName: string): Windows.Data.Xml.Dom.XmlNodeList;
                    createCDataSection(data: string): Windows.Data.Xml.Dom.XmlCDataSection;
                    createAttributeNS(namespaceUri: any, qualifiedName: string): Windows.Data.Xml.Dom.XmlAttribute;
                    createElementNS(namespaceUri: any, qualifiedName: string): Windows.Data.Xml.Dom.XmlElement;
                    getElementById(elementId: string): Windows.Data.Xml.Dom.XmlElement;
                    importNode(node: Windows.Data.Xml.Dom.IXmlNode, deep: boolean): Windows.Data.Xml.Dom.IXmlNode;
                    hasChildNodes(): boolean;
                    insertBefore(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    replaceChild(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    removeChild(childNode: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    appendChild(newChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    cloneNode(deep: boolean): Windows.Data.Xml.Dom.IXmlNode;
                    normalize(): void;
                    selectSingleNode(xpath: string): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodes(xpath: string): Windows.Data.Xml.Dom.XmlNodeList;
                    selectSingleNodeNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodesNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.XmlNodeList;
                    getXml(): string;
                    loadXml(xml: string): void;
                    loadXml(xml: string, loadSettings: Windows.Data.Xml.Dom.XmlLoadSettings): void;
                    saveToFileAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncAction;
                    static loadFromUriAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperation<Windows.Data.Xml.Dom.XmlDocument>;
                    static loadFromUriAsync(uri: Windows.Foundation.Uri, loadSettings: Windows.Data.Xml.Dom.XmlLoadSettings): Windows.Foundation.IAsyncOperation<Windows.Data.Xml.Dom.XmlDocument>;
                    static loadFromFileAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<Windows.Data.Xml.Dom.XmlDocument>;
                    static loadFromFileAsync(file: Windows.Storage.IStorageFile, loadSettings: Windows.Data.Xml.Dom.XmlLoadSettings): Windows.Foundation.IAsyncOperation<Windows.Data.Xml.Dom.XmlDocument>;
                }
                export interface IXmlNodeSerializer {
                    innerText: string;
                    getXml(): string;
                }
                export interface IXmlNode extends Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    attributes: Windows.Data.Xml.Dom.XmlNamedNodeMap;
                    childNodes: Windows.Data.Xml.Dom.XmlNodeList;
                    firstChild: Windows.Data.Xml.Dom.IXmlNode;
                    lastChild: Windows.Data.Xml.Dom.IXmlNode;
                    localName: any;
                    namespaceUri: any;
                    nextSibling: Windows.Data.Xml.Dom.IXmlNode;
                    nodeName: string;
                    nodeType: Windows.Data.Xml.Dom.NodeType;
                    nodeValue: any;
                    ownerDocument: Windows.Data.Xml.Dom.XmlDocument;
                    parentNode: Windows.Data.Xml.Dom.IXmlNode;
                    prefix: any;
                    previousSibling: Windows.Data.Xml.Dom.IXmlNode;
                    hasChildNodes(): boolean;
                    insertBefore(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    replaceChild(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    removeChild(childNode: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    appendChild(newChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    cloneNode(deep: boolean): Windows.Data.Xml.Dom.IXmlNode;
                    normalize(): void;
                }
                export interface IXmlDomImplementation {
                    hasFeature(feature: string, version: any): boolean;
                }
                export interface IXmlDocumentType extends Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    entities: Windows.Data.Xml.Dom.XmlNamedNodeMap;
                    name: string;
                    notations: Windows.Data.Xml.Dom.XmlNamedNodeMap;
                }
                export interface IXmlAttribute extends Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    name: string;
                    specified: boolean;
                    value: string;
                }
                export interface IXmlDocumentFragment extends Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                }
                export interface IXmlElement extends Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    tagName: string;
                    getAttribute(attributeName: string): string;
                    setAttribute(attributeName: string, attributeValue: string): void;
                    removeAttribute(attributeName: string): void;
                    getAttributeNode(attributeName: string): Windows.Data.Xml.Dom.XmlAttribute;
                    setAttributeNode(newAttribute: Windows.Data.Xml.Dom.XmlAttribute): Windows.Data.Xml.Dom.XmlAttribute;
                    removeAttributeNode(attributeNode: Windows.Data.Xml.Dom.XmlAttribute): Windows.Data.Xml.Dom.XmlAttribute;
                    getElementsByTagName(tagName: string): Windows.Data.Xml.Dom.XmlNodeList;
                    setAttributeNS(namespaceUri: any, qualifiedName: string, value: string): void;
                    getAttributeNS(namespaceUri: any, localName: string): string;
                    removeAttributeNS(namespaceUri: any, localName: string): void;
                    setAttributeNodeNS(newAttribute: Windows.Data.Xml.Dom.XmlAttribute): Windows.Data.Xml.Dom.XmlAttribute;
                    getAttributeNodeNS(namespaceUri: any, localName: string): Windows.Data.Xml.Dom.XmlAttribute;
                }
                export class XmlAttribute implements Windows.Data.Xml.Dom.IXmlAttribute, Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    name: string;
                    specified: boolean;
                    value: string;
                    attributes: Windows.Data.Xml.Dom.XmlNamedNodeMap;
                    childNodes: Windows.Data.Xml.Dom.XmlNodeList;
                    firstChild: Windows.Data.Xml.Dom.IXmlNode;
                    lastChild: Windows.Data.Xml.Dom.IXmlNode;
                    localName: any;
                    namespaceUri: any;
                    nextSibling: Windows.Data.Xml.Dom.IXmlNode;
                    nodeName: string;
                    nodeType: Windows.Data.Xml.Dom.NodeType;
                    nodeValue: any;
                    ownerDocument: Windows.Data.Xml.Dom.XmlDocument;
                    parentNode: Windows.Data.Xml.Dom.IXmlNode;
                    prefix: any;
                    previousSibling: Windows.Data.Xml.Dom.IXmlNode;
                    innerText: string;
                    hasChildNodes(): boolean;
                    insertBefore(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    replaceChild(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    removeChild(childNode: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    appendChild(newChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    cloneNode(deep: boolean): Windows.Data.Xml.Dom.IXmlNode;
                    normalize(): void;
                    selectSingleNode(xpath: string): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodes(xpath: string): Windows.Data.Xml.Dom.XmlNodeList;
                    selectSingleNodeNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodesNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.XmlNodeList;
                    getXml(): string;
                }
                export interface IDtdNotation extends Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    publicId: any;
                    systemId: any;
                }
                export interface IDtdEntity extends Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    notationName: any;
                    publicId: any;
                    systemId: any;
                }
                export interface IXmlEntityReference extends Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                }
                export interface IXmlProcessingInstruction extends Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    data: string;
                    target: string;
                }
                export interface IXmlCharacterData extends Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    data: string;
                    length: number;
                    substringData(offset: number, count: number): string;
                    appendData(data: string): void;
                    insertData(offset: number, data: string): void;
                    deleteData(offset: number, count: number): void;
                    replaceData(offset: number, count: number, data: string): void;
                }
                export interface IXmlComment extends Windows.Data.Xml.Dom.IXmlCharacterData, Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                }
                export interface IXmlText extends Windows.Data.Xml.Dom.IXmlCharacterData, Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    splitText(offset: number): Windows.Data.Xml.Dom.IXmlText;
                }
                export interface IXmlCDataSection extends Windows.Data.Xml.Dom.IXmlText, Windows.Data.Xml.Dom.IXmlCharacterData, Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                }
                export interface IXmlDocument extends Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    doctype: Windows.Data.Xml.Dom.XmlDocumentType;
                    documentElement: Windows.Data.Xml.Dom.XmlElement;
                    documentUri: string;
                    implementation: Windows.Data.Xml.Dom.XmlDomImplementation;
                    createElement(tagName: string): Windows.Data.Xml.Dom.XmlElement;
                    createDocumentFragment(): Windows.Data.Xml.Dom.XmlDocumentFragment;
                    createTextNode(data: string): Windows.Data.Xml.Dom.XmlText;
                    createComment(data: string): Windows.Data.Xml.Dom.XmlComment;
                    createProcessingInstruction(target: string, data: string): Windows.Data.Xml.Dom.XmlProcessingInstruction;
                    createAttribute(name: string): Windows.Data.Xml.Dom.XmlAttribute;
                    createEntityReference(name: string): Windows.Data.Xml.Dom.XmlEntityReference;
                    getElementsByTagName(tagName: string): Windows.Data.Xml.Dom.XmlNodeList;
                    createCDataSection(data: string): Windows.Data.Xml.Dom.XmlCDataSection;
                    createAttributeNS(namespaceUri: any, qualifiedName: string): Windows.Data.Xml.Dom.XmlAttribute;
                    createElementNS(namespaceUri: any, qualifiedName: string): Windows.Data.Xml.Dom.XmlElement;
                    getElementById(elementId: string): Windows.Data.Xml.Dom.XmlElement;
                    importNode(node: Windows.Data.Xml.Dom.IXmlNode, deep: boolean): Windows.Data.Xml.Dom.IXmlNode;
                }
                export class XmlDocumentType implements Windows.Data.Xml.Dom.IXmlDocumentType, Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    entities: Windows.Data.Xml.Dom.XmlNamedNodeMap;
                    name: string;
                    notations: Windows.Data.Xml.Dom.XmlNamedNodeMap;
                    attributes: Windows.Data.Xml.Dom.XmlNamedNodeMap;
                    childNodes: Windows.Data.Xml.Dom.XmlNodeList;
                    firstChild: Windows.Data.Xml.Dom.IXmlNode;
                    lastChild: Windows.Data.Xml.Dom.IXmlNode;
                    localName: any;
                    namespaceUri: any;
                    nextSibling: Windows.Data.Xml.Dom.IXmlNode;
                    nodeName: string;
                    nodeType: Windows.Data.Xml.Dom.NodeType;
                    nodeValue: any;
                    ownerDocument: Windows.Data.Xml.Dom.XmlDocument;
                    parentNode: Windows.Data.Xml.Dom.IXmlNode;
                    prefix: any;
                    previousSibling: Windows.Data.Xml.Dom.IXmlNode;
                    innerText: string;
                    hasChildNodes(): boolean;
                    insertBefore(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    replaceChild(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    removeChild(childNode: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    appendChild(newChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    cloneNode(deep: boolean): Windows.Data.Xml.Dom.IXmlNode;
                    normalize(): void;
                    selectSingleNode(xpath: string): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodes(xpath: string): Windows.Data.Xml.Dom.XmlNodeList;
                    selectSingleNodeNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodesNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.XmlNodeList;
                    getXml(): string;
                }
                export class XmlDomImplementation implements Windows.Data.Xml.Dom.IXmlDomImplementation {
                    hasFeature(feature: string, version: any): boolean;
                }
                export class XmlElement implements Windows.Data.Xml.Dom.IXmlElement, Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    tagName: string;
                    attributes: Windows.Data.Xml.Dom.XmlNamedNodeMap;
                    childNodes: Windows.Data.Xml.Dom.XmlNodeList;
                    firstChild: Windows.Data.Xml.Dom.IXmlNode;
                    lastChild: Windows.Data.Xml.Dom.IXmlNode;
                    localName: any;
                    namespaceUri: any;
                    nextSibling: Windows.Data.Xml.Dom.IXmlNode;
                    nodeName: string;
                    nodeType: Windows.Data.Xml.Dom.NodeType;
                    nodeValue: any;
                    ownerDocument: Windows.Data.Xml.Dom.XmlDocument;
                    parentNode: Windows.Data.Xml.Dom.IXmlNode;
                    prefix: any;
                    previousSibling: Windows.Data.Xml.Dom.IXmlNode;
                    innerText: string;
                    getAttribute(attributeName: string): string;
                    setAttribute(attributeName: string, attributeValue: string): void;
                    removeAttribute(attributeName: string): void;
                    getAttributeNode(attributeName: string): Windows.Data.Xml.Dom.XmlAttribute;
                    setAttributeNode(newAttribute: Windows.Data.Xml.Dom.XmlAttribute): Windows.Data.Xml.Dom.XmlAttribute;
                    removeAttributeNode(attributeNode: Windows.Data.Xml.Dom.XmlAttribute): Windows.Data.Xml.Dom.XmlAttribute;
                    getElementsByTagName(tagName: string): Windows.Data.Xml.Dom.XmlNodeList;
                    setAttributeNS(namespaceUri: any, qualifiedName: string, value: string): void;
                    getAttributeNS(namespaceUri: any, localName: string): string;
                    removeAttributeNS(namespaceUri: any, localName: string): void;
                    setAttributeNodeNS(newAttribute: Windows.Data.Xml.Dom.XmlAttribute): Windows.Data.Xml.Dom.XmlAttribute;
                    getAttributeNodeNS(namespaceUri: any, localName: string): Windows.Data.Xml.Dom.XmlAttribute;
                    hasChildNodes(): boolean;
                    insertBefore(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    replaceChild(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    removeChild(childNode: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    appendChild(newChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    cloneNode(deep: boolean): Windows.Data.Xml.Dom.IXmlNode;
                    normalize(): void;
                    selectSingleNode(xpath: string): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodes(xpath: string): Windows.Data.Xml.Dom.XmlNodeList;
                    selectSingleNodeNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodesNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.XmlNodeList;
                    getXml(): string;
                }
                export class XmlDocumentFragment implements Windows.Data.Xml.Dom.IXmlDocumentFragment, Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    attributes: Windows.Data.Xml.Dom.XmlNamedNodeMap;
                    childNodes: Windows.Data.Xml.Dom.XmlNodeList;
                    firstChild: Windows.Data.Xml.Dom.IXmlNode;
                    lastChild: Windows.Data.Xml.Dom.IXmlNode;
                    localName: any;
                    namespaceUri: any;
                    nextSibling: Windows.Data.Xml.Dom.IXmlNode;
                    nodeName: string;
                    nodeType: Windows.Data.Xml.Dom.NodeType;
                    nodeValue: any;
                    ownerDocument: Windows.Data.Xml.Dom.XmlDocument;
                    parentNode: Windows.Data.Xml.Dom.IXmlNode;
                    prefix: any;
                    previousSibling: Windows.Data.Xml.Dom.IXmlNode;
                    innerText: string;
                    hasChildNodes(): boolean;
                    insertBefore(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    replaceChild(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    removeChild(childNode: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    appendChild(newChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    cloneNode(deep: boolean): Windows.Data.Xml.Dom.IXmlNode;
                    normalize(): void;
                    selectSingleNode(xpath: string): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodes(xpath: string): Windows.Data.Xml.Dom.XmlNodeList;
                    selectSingleNodeNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodesNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.XmlNodeList;
                    getXml(): string;
                }
                export class XmlText implements Windows.Data.Xml.Dom.IXmlText, Windows.Data.Xml.Dom.IXmlCharacterData, Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    data: string;
                    length: number;
                    attributes: Windows.Data.Xml.Dom.XmlNamedNodeMap;
                    childNodes: Windows.Data.Xml.Dom.XmlNodeList;
                    firstChild: Windows.Data.Xml.Dom.IXmlNode;
                    lastChild: Windows.Data.Xml.Dom.IXmlNode;
                    localName: any;
                    namespaceUri: any;
                    nextSibling: Windows.Data.Xml.Dom.IXmlNode;
                    nodeName: string;
                    nodeType: Windows.Data.Xml.Dom.NodeType;
                    nodeValue: any;
                    ownerDocument: Windows.Data.Xml.Dom.XmlDocument;
                    parentNode: Windows.Data.Xml.Dom.IXmlNode;
                    prefix: any;
                    previousSibling: Windows.Data.Xml.Dom.IXmlNode;
                    innerText: string;
                    splitText(offset: number): Windows.Data.Xml.Dom.IXmlText;
                    substringData(offset: number, count: number): string;
                    appendData(data: string): void;
                    insertData(offset: number, data: string): void;
                    deleteData(offset: number, count: number): void;
                    replaceData(offset: number, count: number, data: string): void;
                    hasChildNodes(): boolean;
                    insertBefore(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    replaceChild(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    removeChild(childNode: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    appendChild(newChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    cloneNode(deep: boolean): Windows.Data.Xml.Dom.IXmlNode;
                    normalize(): void;
                    selectSingleNode(xpath: string): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodes(xpath: string): Windows.Data.Xml.Dom.XmlNodeList;
                    selectSingleNodeNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodesNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.XmlNodeList;
                    getXml(): string;
                }
                export class XmlComment implements Windows.Data.Xml.Dom.IXmlComment, Windows.Data.Xml.Dom.IXmlCharacterData, Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    data: string;
                    length: number;
                    attributes: Windows.Data.Xml.Dom.XmlNamedNodeMap;
                    childNodes: Windows.Data.Xml.Dom.XmlNodeList;
                    firstChild: Windows.Data.Xml.Dom.IXmlNode;
                    lastChild: Windows.Data.Xml.Dom.IXmlNode;
                    localName: any;
                    namespaceUri: any;
                    nextSibling: Windows.Data.Xml.Dom.IXmlNode;
                    nodeName: string;
                    nodeType: Windows.Data.Xml.Dom.NodeType;
                    nodeValue: any;
                    ownerDocument: Windows.Data.Xml.Dom.XmlDocument;
                    parentNode: Windows.Data.Xml.Dom.IXmlNode;
                    prefix: any;
                    previousSibling: Windows.Data.Xml.Dom.IXmlNode;
                    innerText: string;
                    substringData(offset: number, count: number): string;
                    appendData(data: string): void;
                    insertData(offset: number, data: string): void;
                    deleteData(offset: number, count: number): void;
                    replaceData(offset: number, count: number, data: string): void;
                    hasChildNodes(): boolean;
                    insertBefore(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    replaceChild(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    removeChild(childNode: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    appendChild(newChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    cloneNode(deep: boolean): Windows.Data.Xml.Dom.IXmlNode;
                    normalize(): void;
                    selectSingleNode(xpath: string): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodes(xpath: string): Windows.Data.Xml.Dom.XmlNodeList;
                    selectSingleNodeNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodesNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.XmlNodeList;
                    getXml(): string;
                }
                export class XmlProcessingInstruction implements Windows.Data.Xml.Dom.IXmlProcessingInstruction, Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    data: string;
                    target: string;
                    attributes: Windows.Data.Xml.Dom.XmlNamedNodeMap;
                    childNodes: Windows.Data.Xml.Dom.XmlNodeList;
                    firstChild: Windows.Data.Xml.Dom.IXmlNode;
                    lastChild: Windows.Data.Xml.Dom.IXmlNode;
                    localName: any;
                    namespaceUri: any;
                    nextSibling: Windows.Data.Xml.Dom.IXmlNode;
                    nodeName: string;
                    nodeType: Windows.Data.Xml.Dom.NodeType;
                    nodeValue: any;
                    ownerDocument: Windows.Data.Xml.Dom.XmlDocument;
                    parentNode: Windows.Data.Xml.Dom.IXmlNode;
                    prefix: any;
                    previousSibling: Windows.Data.Xml.Dom.IXmlNode;
                    innerText: string;
                    hasChildNodes(): boolean;
                    insertBefore(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    replaceChild(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    removeChild(childNode: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    appendChild(newChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    cloneNode(deep: boolean): Windows.Data.Xml.Dom.IXmlNode;
                    normalize(): void;
                    selectSingleNode(xpath: string): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodes(xpath: string): Windows.Data.Xml.Dom.XmlNodeList;
                    selectSingleNodeNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodesNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.XmlNodeList;
                    getXml(): string;
                }
                export class XmlEntityReference implements Windows.Data.Xml.Dom.IXmlEntityReference, Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    attributes: Windows.Data.Xml.Dom.XmlNamedNodeMap;
                    childNodes: Windows.Data.Xml.Dom.XmlNodeList;
                    firstChild: Windows.Data.Xml.Dom.IXmlNode;
                    lastChild: Windows.Data.Xml.Dom.IXmlNode;
                    localName: any;
                    namespaceUri: any;
                    nextSibling: Windows.Data.Xml.Dom.IXmlNode;
                    nodeName: string;
                    nodeType: Windows.Data.Xml.Dom.NodeType;
                    nodeValue: any;
                    ownerDocument: Windows.Data.Xml.Dom.XmlDocument;
                    parentNode: Windows.Data.Xml.Dom.IXmlNode;
                    prefix: any;
                    previousSibling: Windows.Data.Xml.Dom.IXmlNode;
                    innerText: string;
                    hasChildNodes(): boolean;
                    insertBefore(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    replaceChild(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    removeChild(childNode: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    appendChild(newChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    cloneNode(deep: boolean): Windows.Data.Xml.Dom.IXmlNode;
                    normalize(): void;
                    selectSingleNode(xpath: string): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodes(xpath: string): Windows.Data.Xml.Dom.XmlNodeList;
                    selectSingleNodeNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodesNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.XmlNodeList;
                    getXml(): string;
                }
                export class XmlCDataSection implements Windows.Data.Xml.Dom.IXmlCDataSection, Windows.Data.Xml.Dom.IXmlText, Windows.Data.Xml.Dom.IXmlCharacterData, Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    data: string;
                    length: number;
                    attributes: Windows.Data.Xml.Dom.XmlNamedNodeMap;
                    childNodes: Windows.Data.Xml.Dom.XmlNodeList;
                    firstChild: Windows.Data.Xml.Dom.IXmlNode;
                    lastChild: Windows.Data.Xml.Dom.IXmlNode;
                    localName: any;
                    namespaceUri: any;
                    nextSibling: Windows.Data.Xml.Dom.IXmlNode;
                    nodeName: string;
                    nodeType: Windows.Data.Xml.Dom.NodeType;
                    nodeValue: any;
                    ownerDocument: Windows.Data.Xml.Dom.XmlDocument;
                    parentNode: Windows.Data.Xml.Dom.IXmlNode;
                    prefix: any;
                    previousSibling: Windows.Data.Xml.Dom.IXmlNode;
                    innerText: string;
                    splitText(offset: number): Windows.Data.Xml.Dom.IXmlText;
                    substringData(offset: number, count: number): string;
                    appendData(data: string): void;
                    insertData(offset: number, data: string): void;
                    deleteData(offset: number, count: number): void;
                    replaceData(offset: number, count: number, data: string): void;
                    hasChildNodes(): boolean;
                    insertBefore(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    replaceChild(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    removeChild(childNode: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    appendChild(newChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    cloneNode(deep: boolean): Windows.Data.Xml.Dom.IXmlNode;
                    normalize(): void;
                    selectSingleNode(xpath: string): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodes(xpath: string): Windows.Data.Xml.Dom.XmlNodeList;
                    selectSingleNodeNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodesNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.XmlNodeList;
                    getXml(): string;
                }
                export interface IXmlNamedNodeMap extends Windows.Foundation.Collections.IVectorView<Windows.Data.Xml.Dom.IXmlNode>, Windows.Foundation.Collections.IIterable<Windows.Data.Xml.Dom.IXmlNode> {
                    length: number;
                    item(index: number): Windows.Data.Xml.Dom.IXmlNode;
                    getNamedItem(name: string): Windows.Data.Xml.Dom.IXmlNode;
                    setNamedItem(node: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    removeNamedItem(name: string): Windows.Data.Xml.Dom.IXmlNode;
                    getNamedItemNS(namespaceUri: any, name: string): Windows.Data.Xml.Dom.IXmlNode;
                    removeNamedItemNS(namespaceUri: any, name: string): Windows.Data.Xml.Dom.IXmlNode;
                    setNamedItemNS(node: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                }
                export interface IXmlNodeList extends Windows.Foundation.Collections.IVectorView<Windows.Data.Xml.Dom.IXmlNode>, Windows.Foundation.Collections.IIterable<Windows.Data.Xml.Dom.IXmlNode> {
                    length: number;
                    item(index: number): Windows.Data.Xml.Dom.IXmlNode;
                }
                export interface IXmlLoadSettings {
                    elementContentWhiteSpace: boolean;
                    maxElementDepth: number;
                    prohibitDtd: boolean;
                    resolveExternals: boolean;
                    validateOnParse: boolean;
                }
                export interface IXmlDocumentIO {
                    loadXml(xml: string): void;
                    loadXml(xml: string, loadSettings: Windows.Data.Xml.Dom.XmlLoadSettings): void;
                    saveToFileAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncAction;
                }
                export class XmlLoadSettings implements Windows.Data.Xml.Dom.IXmlLoadSettings {
                    elementContentWhiteSpace: boolean;
                    maxElementDepth: number;
                    prohibitDtd: boolean;
                    resolveExternals: boolean;
                    validateOnParse: boolean;
                }
                export interface IXmlDocumentStatics {
                    loadFromUriAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperation<Windows.Data.Xml.Dom.XmlDocument>;
                    loadFromUriAsync(uri: Windows.Foundation.Uri, loadSettings: Windows.Data.Xml.Dom.XmlLoadSettings): Windows.Foundation.IAsyncOperation<Windows.Data.Xml.Dom.XmlDocument>;
                    loadFromFileAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<Windows.Data.Xml.Dom.XmlDocument>;
                    loadFromFileAsync(file: Windows.Storage.IStorageFile, loadSettings: Windows.Data.Xml.Dom.XmlLoadSettings): Windows.Foundation.IAsyncOperation<Windows.Data.Xml.Dom.XmlDocument>;
                }
                export class DtdNotation implements Windows.Data.Xml.Dom.IDtdNotation, Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    publicId: any;
                    systemId: any;
                    attributes: Windows.Data.Xml.Dom.XmlNamedNodeMap;
                    childNodes: Windows.Data.Xml.Dom.XmlNodeList;
                    firstChild: Windows.Data.Xml.Dom.IXmlNode;
                    lastChild: Windows.Data.Xml.Dom.IXmlNode;
                    localName: any;
                    namespaceUri: any;
                    nextSibling: Windows.Data.Xml.Dom.IXmlNode;
                    nodeName: string;
                    nodeType: Windows.Data.Xml.Dom.NodeType;
                    nodeValue: any;
                    ownerDocument: Windows.Data.Xml.Dom.XmlDocument;
                    parentNode: Windows.Data.Xml.Dom.IXmlNode;
                    prefix: any;
                    previousSibling: Windows.Data.Xml.Dom.IXmlNode;
                    innerText: string;
                    hasChildNodes(): boolean;
                    insertBefore(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    replaceChild(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    removeChild(childNode: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    appendChild(newChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    cloneNode(deep: boolean): Windows.Data.Xml.Dom.IXmlNode;
                    normalize(): void;
                    selectSingleNode(xpath: string): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodes(xpath: string): Windows.Data.Xml.Dom.XmlNodeList;
                    selectSingleNodeNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodesNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.XmlNodeList;
                    getXml(): string;
                }
                export class DtdEntity implements Windows.Data.Xml.Dom.IDtdEntity, Windows.Data.Xml.Dom.IXmlNode, Windows.Data.Xml.Dom.IXmlNodeSelector, Windows.Data.Xml.Dom.IXmlNodeSerializer {
                    notationName: any;
                    publicId: any;
                    systemId: any;
                    attributes: Windows.Data.Xml.Dom.XmlNamedNodeMap;
                    childNodes: Windows.Data.Xml.Dom.XmlNodeList;
                    firstChild: Windows.Data.Xml.Dom.IXmlNode;
                    lastChild: Windows.Data.Xml.Dom.IXmlNode;
                    localName: any;
                    namespaceUri: any;
                    nextSibling: Windows.Data.Xml.Dom.IXmlNode;
                    nodeName: string;
                    nodeType: Windows.Data.Xml.Dom.NodeType;
                    nodeValue: any;
                    ownerDocument: Windows.Data.Xml.Dom.XmlDocument;
                    parentNode: Windows.Data.Xml.Dom.IXmlNode;
                    prefix: any;
                    previousSibling: Windows.Data.Xml.Dom.IXmlNode;
                    innerText: string;
                    hasChildNodes(): boolean;
                    insertBefore(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    replaceChild(newChild: Windows.Data.Xml.Dom.IXmlNode, referenceChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    removeChild(childNode: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    appendChild(newChild: Windows.Data.Xml.Dom.IXmlNode): Windows.Data.Xml.Dom.IXmlNode;
                    cloneNode(deep: boolean): Windows.Data.Xml.Dom.IXmlNode;
                    normalize(): void;
                    selectSingleNode(xpath: string): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodes(xpath: string): Windows.Data.Xml.Dom.XmlNodeList;
                    selectSingleNodeNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.IXmlNode;
                    selectNodesNS(xpath: string, namespaces: any): Windows.Data.Xml.Dom.XmlNodeList;
                    getXml(): string;
                }
            }
        }
    }
}
declare module Windows {
    export module Data {
        export module Xml {
            export module Xsl {
                export interface IXsltProcessor {
                    transformToString(inputNode: Windows.Data.Xml.Dom.IXmlNode): string;
                }
                export interface IXsltProcessorFactory {
                    createInstance(document: Windows.Data.Xml.Dom.XmlDocument): Windows.Data.Xml.Xsl.XsltProcessor;
                }
                export class XsltProcessor implements Windows.Data.Xml.Xsl.IXsltProcessor {
                    constructor(document: Windows.Data.Xml.Dom.XmlDocument);
                    transformToString(inputNode: Windows.Data.Xml.Dom.IXmlNode): string;
                }
            }
        }
    }
}
declare module Windows {
    export module Devices {
        export module Sms {
            export enum SmsMessageClass {
                none,
                class0,
                class1,
                class2,
                class3,
            }
            export interface ISmsMessage {
                id: number;
                messageClass: Windows.Devices.Sms.SmsMessageClass;
            }
            export enum SmsDataFormat {
                unknown,
                cdmaSubmit,
                gsmSubmit,
                cdmaDeliver,
                gsmDeliver,
            }
            export interface ISmsBinaryMessage extends Windows.Devices.Sms.ISmsMessage {
                format: Windows.Devices.Sms.SmsDataFormat;
                getData(): Uint8Array;
                setData(value: Uint8Array): void;
            }
            export class SmsBinaryMessage implements Windows.Devices.Sms.ISmsBinaryMessage, Windows.Devices.Sms.ISmsMessage {
                format: Windows.Devices.Sms.SmsDataFormat;
                id: number;
                messageClass: Windows.Devices.Sms.SmsMessageClass;
                getData(): Uint8Array;
                setData(value: Uint8Array): void;
            }
            export enum SmsEncoding {
                unknown,
                optimal,
                sevenBitAscii,
                unicode,
                gsmSevenBit,
            }
            export interface ISmsTextMessage extends Windows.Devices.Sms.ISmsMessage {
                body: string;
                encoding: Windows.Devices.Sms.SmsEncoding;
                from: string;
                partCount: number;
                partNumber: number;
                partReferenceId: number;
                timestamp: Date;
                to: string;
                toBinaryMessages(format: Windows.Devices.Sms.SmsDataFormat): Windows.Foundation.Collections.IVectorView<Windows.Devices.Sms.ISmsBinaryMessage>;
            }
            export interface ISmsTextMessageStatics {
                fromBinaryMessage(binaryMessage: Windows.Devices.Sms.SmsBinaryMessage): Windows.Devices.Sms.SmsTextMessage;
                fromBinaryData(format: Windows.Devices.Sms.SmsDataFormat, value: Uint8Array): Windows.Devices.Sms.SmsTextMessage;
            }
            export class SmsTextMessage implements Windows.Devices.Sms.ISmsTextMessage, Windows.Devices.Sms.ISmsMessage {
                body: string;
                encoding: Windows.Devices.Sms.SmsEncoding;
                from: string;
                partCount: number;
                partNumber: number;
                partReferenceId: number;
                timestamp: Date;
                to: string;
                id: number;
                messageClass: Windows.Devices.Sms.SmsMessageClass;
                toBinaryMessages(format: Windows.Devices.Sms.SmsDataFormat): Windows.Foundation.Collections.IVectorView<Windows.Devices.Sms.ISmsBinaryMessage>;
                static fromBinaryMessage(binaryMessage: Windows.Devices.Sms.SmsBinaryMessage): Windows.Devices.Sms.SmsTextMessage;
                static fromBinaryData(format: Windows.Devices.Sms.SmsDataFormat, value: Uint8Array): Windows.Devices.Sms.SmsTextMessage;
            }
            export enum SmsMessageFilter {
                all,
                unread,
                read,
                sent,
                draft,
            }
            export enum SmsMessageType {
                binary,
                text,
            }
            export class DeleteSmsMessageOperation implements Windows.Foundation.IAsyncAction, Windows.Foundation.IAsyncInfo {
                completed: Windows.Foundation.AsyncActionCompletedHandler;
                errorCode: number;
                id: number;
                status: Windows.Foundation.AsyncStatus;
                getResults(): void;
                cancel(): void;
                close(): void;
                then<U>(success?: (value: any) => U, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: any) => Windows.Foundation.IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: any) => U, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: any) => Windows.Foundation.IPromise<U>, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                done<U>(success?: (value: any) => any, error?: (error: any) => any, progress?: (progress: any) => void ): void;
                operation: {
                    completed: Windows.Foundation.AsyncOperationCompletedHandler<any>;
                    getResults(): any;
                }
            }
            export class DeleteSmsMessagesOperation implements Windows.Foundation.IAsyncAction, Windows.Foundation.IAsyncInfo {
                completed: Windows.Foundation.AsyncActionCompletedHandler;
                errorCode: number;
                id: number;
                status: Windows.Foundation.AsyncStatus;
                getResults(): void;
                cancel(): void;
                close(): void;
                then<U>(success?: (value: any) => U, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: any) => Windows.Foundation.IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: any) => U, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: any) => Windows.Foundation.IPromise<U>, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                done<U>(success?: (value: any) => any, error?: (error: any) => any, progress?: (progress: any) => void ): void;
                operation: {
                    completed: Windows.Foundation.AsyncOperationCompletedHandler<any>;
                    getResults(): any;
                }
            }
            export class GetSmsMessageOperation implements Windows.Foundation.IAsyncOperation<Windows.Devices.Sms.ISmsMessage>, Windows.Foundation.IAsyncInfo {
                completed: Windows.Foundation.AsyncOperationCompletedHandler<Windows.Devices.Sms.ISmsMessage>;
                errorCode: number;
                id: number;
                status: Windows.Foundation.AsyncStatus;
                getResults(): Windows.Devices.Sms.ISmsMessage;
                cancel(): void;
                close(): void;
                then<U>(success?: (value: Windows.Devices.Sms.ISmsMessage) => U, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: Windows.Devices.Sms.ISmsMessage) => Windows.Foundation.IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: Windows.Devices.Sms.ISmsMessage) => U, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: Windows.Devices.Sms.ISmsMessage) => Windows.Foundation.IPromise<U>, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                done<U>(success?: (value: Windows.Devices.Sms.ISmsMessage) => any, error?: (error: any) => any, progress?: (progress: any) => void ): void;
                operation: {
                    completed: Windows.Foundation.AsyncOperationCompletedHandler<Windows.Devices.Sms.ISmsMessage>;
                    getResults(): Windows.Devices.Sms.ISmsMessage;
                }
            }
            export class GetSmsMessagesOperation implements Windows.Foundation.IAsyncOperationWithProgress<Windows.Foundation.Collections.IVectorView<Windows.Devices.Sms.ISmsMessage>, number>, Windows.Foundation.IAsyncInfo {
                completed: Windows.Foundation.AsyncOperationWithProgressCompletedHandler<Windows.Foundation.Collections.IVectorView<Windows.Devices.Sms.ISmsMessage>, number>;
                progress: Windows.Foundation.AsyncOperationProgressHandler<Windows.Foundation.Collections.IVectorView<Windows.Devices.Sms.ISmsMessage>, number>;
                errorCode: number;
                id: number;
                status: Windows.Foundation.AsyncStatus;
                getResults(): Windows.Foundation.Collections.IVectorView<Windows.Devices.Sms.ISmsMessage>;
                cancel(): void;
                close(): void;
                then<U>(success?: (value: Windows.Foundation.Collections.IVectorView<Windows.Devices.Sms.ISmsMessage>) => U, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: Windows.Foundation.Collections.IVectorView<Windows.Devices.Sms.ISmsMessage>) => Windows.Foundation.IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: Windows.Foundation.Collections.IVectorView<Windows.Devices.Sms.ISmsMessage>) => U, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: Windows.Foundation.Collections.IVectorView<Windows.Devices.Sms.ISmsMessage>) => Windows.Foundation.IPromise<U>, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                done<U>(success?: (value: Windows.Foundation.Collections.IVectorView<Windows.Devices.Sms.ISmsMessage>) => any, error?: (error: any) => any, progress?: (progress: any) => void ): void;
                operation: {
                    progress: Windows.Foundation.AsyncOperationProgressHandler<Windows.Foundation.Collections.IVectorView<Windows.Devices.Sms.ISmsMessage>, number>;
                    completed: Windows.Foundation.AsyncOperationWithProgressCompletedHandler<Windows.Foundation.Collections.IVectorView<Windows.Devices.Sms.ISmsMessage>, number>;
                    getResults(): Windows.Foundation.Collections.IVectorView<Windows.Devices.Sms.ISmsMessage>;
                }
            }
            export interface ISmsDeviceMessageStore {
                maxMessages: number;
                deleteMessageAsync(messageId: number): Windows.Foundation.IAsyncAction;
                deleteMessagesAsync(messageFilter: Windows.Devices.Sms.SmsMessageFilter): Windows.Foundation.IAsyncAction;
                getMessageAsync(messageId: number): Windows.Foundation.IAsyncOperation<Windows.Devices.Sms.ISmsMessage>;
                getMessagesAsync(messageFilter: Windows.Devices.Sms.SmsMessageFilter): Windows.Foundation.IAsyncOperationWithProgress<Windows.Foundation.Collections.IVectorView<Windows.Devices.Sms.ISmsMessage>, number>;
            }
            export class SmsDeviceMessageStore implements Windows.Devices.Sms.ISmsDeviceMessageStore {
                maxMessages: number;
                deleteMessageAsync(messageId: number): Windows.Foundation.IAsyncAction;
                deleteMessagesAsync(messageFilter: Windows.Devices.Sms.SmsMessageFilter): Windows.Foundation.IAsyncAction;
                getMessageAsync(messageId: number): Windows.Foundation.IAsyncOperation<Windows.Devices.Sms.ISmsMessage>;
                getMessagesAsync(messageFilter: Windows.Devices.Sms.SmsMessageFilter): Windows.Foundation.IAsyncOperationWithProgress<Windows.Foundation.Collections.IVectorView<Windows.Devices.Sms.ISmsMessage>, number>;
            }
            export interface SmsEncodedLength {
                segmentCount: number;
                characterCountLastSegment: number;
                charactersPerSegment: number;
                byteCountLastSegment: number;
                bytesPerSegment: number;
            }
            export enum CellularClass {
                none,
                gsm,
                cdma,
            }
            export enum SmsDeviceStatus {
                off,
                ready,
                simNotInserted,
                badSim,
                deviceFailure,
                subscriptionNotActivated,
                deviceLocked,
                deviceBlocked,
            }
            export class SendSmsMessageOperation implements Windows.Foundation.IAsyncAction, Windows.Foundation.IAsyncInfo {
                completed: Windows.Foundation.AsyncActionCompletedHandler;
                errorCode: number;
                id: number;
                status: Windows.Foundation.AsyncStatus;
                getResults(): void;
                cancel(): void;
                close(): void;
                then<U>(success: (value: any) => U, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success: (value: any) => Windows.Foundation.IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success: (value: any) => U, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success: (value: any) => Windows.Foundation.IPromise<U>, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                done<U>(success: (value: any) => any, error?: (error: any) => any, progress?: (progress: any) => void ): void;
                operation: {
                    completed: Windows.Foundation.AsyncOperationCompletedHandler<any>;
                    getResults(): any;
                }
            }
            export interface ISmsMessageReceivedEventArgs {
                binaryMessage: Windows.Devices.Sms.SmsBinaryMessage;
                textMessage: Windows.Devices.Sms.SmsTextMessage;
            }
            export class SmsMessageReceivedEventArgs implements Windows.Devices.Sms.ISmsMessageReceivedEventArgs {
                binaryMessage: Windows.Devices.Sms.SmsBinaryMessage;
                textMessage: Windows.Devices.Sms.SmsTextMessage;
            }
            export interface SmsMessageReceivedEventHandler {
                (sender: Windows.Devices.Sms.SmsDevice, e: Windows.Devices.Sms.SmsMessageReceivedEventArgs): void;
            }
            export class SmsDevice implements Windows.Devices.Sms.ISmsDevice {
                accountPhoneNumber: string;
                cellularClass: Windows.Devices.Sms.CellularClass;
                deviceStatus: Windows.Devices.Sms.SmsDeviceStatus;
                messageStore: Windows.Devices.Sms.SmsDeviceMessageStore;
                sendMessageAsync(message: Windows.Devices.Sms.ISmsMessage): Windows.Devices.Sms.SendSmsMessageOperation;
                calculateLength(message: Windows.Devices.Sms.SmsTextMessage): Windows.Devices.Sms.SmsEncodedLength;
                onsmsmessagereceived: any/* TODO */;
                onsmsdevicestatuschanged: any/* TODO */;
                static getDeviceSelector(): string;
                static fromIdAsync(deviceInstanceId: string): Windows.Foundation.IAsyncOperation<Windows.Devices.Sms.SmsDevice>;
                static getDefaultAsync(): Windows.Foundation.IAsyncOperation<Windows.Devices.Sms.SmsDevice>;
            }
            export interface SmsDeviceStatusChangedEventHandler {
                (sender: Windows.Devices.Sms.SmsDevice): void;
            }
            export class GetSmsDeviceOperation implements Windows.Foundation.IAsyncOperation<Windows.Devices.Sms.SmsDevice>, Windows.Foundation.IAsyncInfo {
                completed: Windows.Foundation.AsyncOperationCompletedHandler<Windows.Devices.Sms.SmsDevice>;
                errorCode: number;
                id: number;
                status: Windows.Foundation.AsyncStatus;
                getResults(): Windows.Devices.Sms.SmsDevice;
                cancel(): void;
                close(): void;
                then<U>(success?: (value: Windows.Devices.Sms.SmsDevice) => U, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: Windows.Devices.Sms.SmsDevice) => Windows.Foundation.IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: Windows.Devices.Sms.SmsDevice) => U, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: Windows.Devices.Sms.SmsDevice) => Windows.Foundation.IPromise<U>, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                done<U>(success?: (value: Windows.Devices.Sms.SmsDevice) => any, error?: (error: any) => any, progress?: (progress: any) => void ): void;
                operation: {
                    completed: Windows.Foundation.AsyncOperationCompletedHandler<Windows.Devices.Sms.SmsDevice>;
                    getResults(): Windows.Devices.Sms.SmsDevice;
                }
            }
            export interface ISmsDeviceStatics {
                getDeviceSelector(): string;
                fromIdAsync(deviceInstanceId: string): Windows.Foundation.IAsyncOperation<Windows.Devices.Sms.SmsDevice>;
                getDefaultAsync(): Windows.Foundation.IAsyncOperation<Windows.Devices.Sms.SmsDevice>;
            }
            export interface ISmsDevice {
                accountPhoneNumber: string;
                cellularClass: Windows.Devices.Sms.CellularClass;
                deviceStatus: Windows.Devices.Sms.SmsDeviceStatus;
                messageStore: Windows.Devices.Sms.SmsDeviceMessageStore;
                sendMessageAsync(message: Windows.Devices.Sms.ISmsMessage): Windows.Devices.Sms.SendSmsMessageOperation;
                calculateLength(message: Windows.Devices.Sms.SmsTextMessage): Windows.Devices.Sms.SmsEncodedLength;
                onsmsmessagereceived: any/* TODO */;
                onsmsdevicestatuschanged: any/* TODO */;
            }
            export interface ISmsReceivedEventDetails {
                deviceId: string;
                messageIndex: number;
            }
            export class SmsReceivedEventDetails implements Windows.Devices.Sms.ISmsReceivedEventDetails {
                deviceId: string;
                messageIndex: number;
            }
        }
    }
}
declare module Windows {
    export module Devices {
        export module Enumeration {
            export enum DeviceClass {
                all,
                audioCapture,
                audioRender,
                portableStorageDevice,
                videoCapture,
            }
            export enum DeviceWatcherStatus {
                created,
                started,
                enumerationCompleted,
                stopping,
                stopped,
                aborted,
            }
            export class DeviceThumbnail implements Windows.Storage.Streams.IRandomAccessStreamWithContentType, Windows.Storage.Streams.IRandomAccessStream, Windows.Foundation.IClosable, Windows.Storage.Streams.IInputStream, Windows.Storage.Streams.IOutputStream, Windows.Storage.Streams.IContentTypeProvider {
                canRead: boolean;
                canWrite: boolean;
                position: number;
                size: number;
                contentType: string;
                getInputStreamAt(position: number): Windows.Storage.Streams.IInputStream;
                getOutputStreamAt(position: number): Windows.Storage.Streams.IOutputStream;
                seek(position: number): void;
                cloneStream(): Windows.Storage.Streams.IRandomAccessStream;
                dispose(): void;
                readAsync(buffer: Windows.Storage.Streams.IBuffer, count: number, options: Windows.Storage.Streams.InputStreamOptions): Windows.Foundation.IAsyncOperationWithProgress<Windows.Storage.Streams.IBuffer, number>;
                writeAsync(buffer: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
                flushAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                close(): void;
            }
            export enum Panel {
                unknown,
                front,
                back,
                top,
                bottom,
                left,
                right,
            }
            export interface IEnclosureLocation {
                inDock: boolean;
                inLid: boolean;
                panel: Windows.Devices.Enumeration.Panel;
            }
            export class EnclosureLocation implements Windows.Devices.Enumeration.IEnclosureLocation {
                inDock: boolean;
                inLid: boolean;
                panel: Windows.Devices.Enumeration.Panel;
            }
            export interface IDeviceInformationUpdate {
                id: string;
                properties: Windows.Foundation.Collections.IMapView<string, any>;
            }
            export class DeviceInformationUpdate implements Windows.Devices.Enumeration.IDeviceInformationUpdate {
                id: string;
                properties: Windows.Foundation.Collections.IMapView<string, any>;
            }
            export class DeviceInformationCollection implements Windows.Foundation.Collections.IVectorView<Windows.Devices.Enumeration.DeviceInformation>, Windows.Foundation.Collections.IIterable<Windows.Devices.Enumeration.DeviceInformation> {
                size: number;
                getAt(index: number): Windows.Devices.Enumeration.DeviceInformation;
                indexOf(value: Windows.Devices.Enumeration.DeviceInformation): { index: number; returnValue: boolean; };
                getMany(startIndex: number): { items: Windows.Devices.Enumeration.DeviceInformation[]; returnValue: number; };
                first(): Windows.Foundation.Collections.IIterator<Windows.Devices.Enumeration.DeviceInformation>;
                toString(): string;
                toLocaleString(): string;
                concat(...items: Windows.Devices.Enumeration.DeviceInformation[][]): Windows.Devices.Enumeration.DeviceInformation[];
                join(seperator: string): string;
                pop(): Windows.Devices.Enumeration.DeviceInformation;
                push(...items: Windows.Devices.Enumeration.DeviceInformation[]): void;
                reverse(): Windows.Devices.Enumeration.DeviceInformation[];
                shift(): Windows.Devices.Enumeration.DeviceInformation;
                slice(start: number): Windows.Devices.Enumeration.DeviceInformation[];
                slice(start: number, end: number): Windows.Devices.Enumeration.DeviceInformation[];
                sort(): Windows.Devices.Enumeration.DeviceInformation[];
                sort(compareFn: (a: Windows.Devices.Enumeration.DeviceInformation, b: Windows.Devices.Enumeration.DeviceInformation) => number): Windows.Devices.Enumeration.DeviceInformation[];
                splice(start: number): Windows.Devices.Enumeration.DeviceInformation[];
                splice(start: number, deleteCount: number, ...items: Windows.Devices.Enumeration.DeviceInformation[]): Windows.Devices.Enumeration.DeviceInformation[];
                unshift(...items: Windows.Devices.Enumeration.DeviceInformation[]): number;
                lastIndexOf(searchElement: Windows.Devices.Enumeration.DeviceInformation): number;
                lastIndexOf(searchElement: Windows.Devices.Enumeration.DeviceInformation, fromIndex: number): number;
                every(callbackfn: (value: Windows.Devices.Enumeration.DeviceInformation, index: number, array: Windows.Devices.Enumeration.DeviceInformation[]) => boolean): boolean;
                every(callbackfn: (value: Windows.Devices.Enumeration.DeviceInformation, index: number, array: Windows.Devices.Enumeration.DeviceInformation[]) => boolean, thisArg: any): boolean;
                some(callbackfn: (value: Windows.Devices.Enumeration.DeviceInformation, index: number, array: Windows.Devices.Enumeration.DeviceInformation[]) => boolean): boolean;
                some(callbackfn: (value: Windows.Devices.Enumeration.DeviceInformation, index: number, array: Windows.Devices.Enumeration.DeviceInformation[]) => boolean, thisArg: any): boolean;
                forEach(callbackfn: (value: Windows.Devices.Enumeration.DeviceInformation, index: number, array: Windows.Devices.Enumeration.DeviceInformation[]) => void ): void;
                forEach(callbackfn: (value: Windows.Devices.Enumeration.DeviceInformation, index: number, array: Windows.Devices.Enumeration.DeviceInformation[]) => void , thisArg: any): void;
                map(callbackfn: (value: Windows.Devices.Enumeration.DeviceInformation, index: number, array: Windows.Devices.Enumeration.DeviceInformation[]) => any): any[];
                map(callbackfn: (value: Windows.Devices.Enumeration.DeviceInformation, index: number, array: Windows.Devices.Enumeration.DeviceInformation[]) => any, thisArg: any): any[];
                filter(callbackfn: (value: Windows.Devices.Enumeration.DeviceInformation, index: number, array: Windows.Devices.Enumeration.DeviceInformation[]) => boolean): Windows.Devices.Enumeration.DeviceInformation[];
                filter(callbackfn: (value: Windows.Devices.Enumeration.DeviceInformation, index: number, array: Windows.Devices.Enumeration.DeviceInformation[]) => boolean, thisArg: any): Windows.Devices.Enumeration.DeviceInformation[];
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Devices.Enumeration.DeviceInformation[]) => any): any;
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Devices.Enumeration.DeviceInformation[]) => any, initialValue: any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Devices.Enumeration.DeviceInformation[]) => any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Devices.Enumeration.DeviceInformation[]) => any, initialValue: any): any;
                length: number;
            }
            export interface IDeviceWatcher {
                status: Windows.Devices.Enumeration.DeviceWatcherStatus;
                onadded: any/* TODO */;
                onupdated: any/* TODO */;
                onremoved: any/* TODO */;
                onenumerationcompleted: any/* TODO */;
                onstopped: any/* TODO */;
                start(): void;
                stop(): void;
            }
            export class DeviceWatcher implements Windows.Devices.Enumeration.IDeviceWatcher {
                status: Windows.Devices.Enumeration.DeviceWatcherStatus;
                onadded: any/* TODO */;
                onupdated: any/* TODO */;
                onremoved: any/* TODO */;
                onenumerationcompleted: any/* TODO */;
                onstopped: any/* TODO */;
                start(): void;
                stop(): void;
            }
            export class DeviceInformation implements Windows.Devices.Enumeration.IDeviceInformation {
                enclosureLocation: Windows.Devices.Enumeration.EnclosureLocation;
                id: string;
                isDefault: boolean;
                isEnabled: boolean;
                name: string;
                properties: Windows.Foundation.Collections.IMapView<string, any>;
                update(updateInfo: Windows.Devices.Enumeration.DeviceInformationUpdate): void;
                getThumbnailAsync(): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.DeviceThumbnail>;
                getGlyphThumbnailAsync(): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.DeviceThumbnail>;
                static createFromIdAsync(id: string): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.DeviceInformation>;
                static createFromIdAsync(id: string, additionalProperties: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.DeviceInformation>;
                static findAllAsync(): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.DeviceInformationCollection>;
                static findAllAsync(deviceClass: Windows.Devices.Enumeration.DeviceClass): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.DeviceInformationCollection>;
                static findAllAsync(aqsFilter: string): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.DeviceInformationCollection>;
                static findAllAsync(aqsFilter: string, additionalProperties: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.DeviceInformationCollection>;
                static createWatcher(): Windows.Devices.Enumeration.DeviceWatcher;
                static createWatcher(deviceClass: Windows.Devices.Enumeration.DeviceClass): Windows.Devices.Enumeration.DeviceWatcher;
                static createWatcher(aqsFilter: string): Windows.Devices.Enumeration.DeviceWatcher;
                static createWatcher(aqsFilter: string, additionalProperties: Windows.Foundation.Collections.IIterable<string>): Windows.Devices.Enumeration.DeviceWatcher;
            }
            export interface IDeviceInformationStatics {
                createFromIdAsync(id: string): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.DeviceInformation>;
                createFromIdAsync(id: string, additionalProperties: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.DeviceInformation>;
                findAllAsync(): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.DeviceInformationCollection>;
                findAllAsync(deviceClass: Windows.Devices.Enumeration.DeviceClass): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.DeviceInformationCollection>;
                findAllAsync(aqsFilter: string): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.DeviceInformationCollection>;
                findAllAsync(aqsFilter: string, additionalProperties: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.DeviceInformationCollection>;
                createWatcher(): Windows.Devices.Enumeration.DeviceWatcher;
                createWatcher(deviceClass: Windows.Devices.Enumeration.DeviceClass): Windows.Devices.Enumeration.DeviceWatcher;
                createWatcher(aqsFilter: string): Windows.Devices.Enumeration.DeviceWatcher;
                createWatcher(aqsFilter: string, additionalProperties: Windows.Foundation.Collections.IIterable<string>): Windows.Devices.Enumeration.DeviceWatcher;
            }
            export interface IDeviceInformation {
                enclosureLocation: Windows.Devices.Enumeration.EnclosureLocation;
                id: string;
                isDefault: boolean;
                isEnabled: boolean;
                name: string;
                properties: Windows.Foundation.Collections.IMapView<string, any>;
                update(updateInfo: Windows.Devices.Enumeration.DeviceInformationUpdate): void;
                getThumbnailAsync(): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.DeviceThumbnail>;
                getGlyphThumbnailAsync(): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.DeviceThumbnail>;
            }
        }
    }
}
declare module Windows {
    export module Devices {
        export module Enumeration {
            export module Pnp {
                export enum PnpObjectType {
                    unknown,
                    deviceInterface,
                    deviceContainer,
                    device,
                    deviceInterfaceClass,
                }
                export interface IPnpObjectUpdate {
                    id: string;
                    properties: Windows.Foundation.Collections.IMapView<string, any>;
                    type: Windows.Devices.Enumeration.Pnp.PnpObjectType;
                }
                export class PnpObjectUpdate implements Windows.Devices.Enumeration.Pnp.IPnpObjectUpdate {
                    id: string;
                    properties: Windows.Foundation.Collections.IMapView<string, any>;
                    type: Windows.Devices.Enumeration.Pnp.PnpObjectType;
                }
                export class PnpObjectCollection implements Windows.Foundation.Collections.IVectorView<Windows.Devices.Enumeration.Pnp.PnpObject>, Windows.Foundation.Collections.IIterable<Windows.Devices.Enumeration.Pnp.PnpObject> {
                    size: number;
                    getAt(index: number): Windows.Devices.Enumeration.Pnp.PnpObject;
                    indexOf(value: Windows.Devices.Enumeration.Pnp.PnpObject): { index: number; returnValue: boolean; };
                    getMany(startIndex: number): { items: Windows.Devices.Enumeration.Pnp.PnpObject[]; returnValue: number; };
                    first(): Windows.Foundation.Collections.IIterator<Windows.Devices.Enumeration.Pnp.PnpObject>;
                    toString(): string;
                    toLocaleString(): string;
                    concat(...items: Windows.Devices.Enumeration.Pnp.PnpObject[][]): Windows.Devices.Enumeration.Pnp.PnpObject[];
                    join(seperator: string): string;
                    pop(): Windows.Devices.Enumeration.Pnp.PnpObject;
                    push(...items: Windows.Devices.Enumeration.Pnp.PnpObject[]): void;
                    reverse(): Windows.Devices.Enumeration.Pnp.PnpObject[];
                    shift(): Windows.Devices.Enumeration.Pnp.PnpObject;
                    slice(start: number): Windows.Devices.Enumeration.Pnp.PnpObject[];
                    slice(start: number, end: number): Windows.Devices.Enumeration.Pnp.PnpObject[];
                    sort(): Windows.Devices.Enumeration.Pnp.PnpObject[];
                    sort(compareFn: (a: Windows.Devices.Enumeration.Pnp.PnpObject, b: Windows.Devices.Enumeration.Pnp.PnpObject) => number): Windows.Devices.Enumeration.Pnp.PnpObject[];
                    splice(start: number): Windows.Devices.Enumeration.Pnp.PnpObject[];
                    splice(start: number, deleteCount: number, ...items: Windows.Devices.Enumeration.Pnp.PnpObject[]): Windows.Devices.Enumeration.Pnp.PnpObject[];
                    unshift(...items: Windows.Devices.Enumeration.Pnp.PnpObject[]): number;
                    lastIndexOf(searchElement: Windows.Devices.Enumeration.Pnp.PnpObject): number;
                    lastIndexOf(searchElement: Windows.Devices.Enumeration.Pnp.PnpObject, fromIndex: number): number;
                    every(callbackfn: (value: Windows.Devices.Enumeration.Pnp.PnpObject, index: number, array: Windows.Devices.Enumeration.Pnp.PnpObject[]) => boolean): boolean;
                    every(callbackfn: (value: Windows.Devices.Enumeration.Pnp.PnpObject, index: number, array: Windows.Devices.Enumeration.Pnp.PnpObject[]) => boolean, thisArg: any): boolean;
                    some(callbackfn: (value: Windows.Devices.Enumeration.Pnp.PnpObject, index: number, array: Windows.Devices.Enumeration.Pnp.PnpObject[]) => boolean): boolean;
                    some(callbackfn: (value: Windows.Devices.Enumeration.Pnp.PnpObject, index: number, array: Windows.Devices.Enumeration.Pnp.PnpObject[]) => boolean, thisArg: any): boolean;
                    forEach(callbackfn: (value: Windows.Devices.Enumeration.Pnp.PnpObject, index: number, array: Windows.Devices.Enumeration.Pnp.PnpObject[]) => void ): void;
                    forEach(callbackfn: (value: Windows.Devices.Enumeration.Pnp.PnpObject, index: number, array: Windows.Devices.Enumeration.Pnp.PnpObject[]) => void , thisArg: any): void;
                    map(callbackfn: (value: Windows.Devices.Enumeration.Pnp.PnpObject, index: number, array: Windows.Devices.Enumeration.Pnp.PnpObject[]) => any): any[];
                    map(callbackfn: (value: Windows.Devices.Enumeration.Pnp.PnpObject, index: number, array: Windows.Devices.Enumeration.Pnp.PnpObject[]) => any, thisArg: any): any[];
                    filter(callbackfn: (value: Windows.Devices.Enumeration.Pnp.PnpObject, index: number, array: Windows.Devices.Enumeration.Pnp.PnpObject[]) => boolean): Windows.Devices.Enumeration.Pnp.PnpObject[];
                    filter(callbackfn: (value: Windows.Devices.Enumeration.Pnp.PnpObject, index: number, array: Windows.Devices.Enumeration.Pnp.PnpObject[]) => boolean, thisArg: any): Windows.Devices.Enumeration.Pnp.PnpObject[];
                    reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Devices.Enumeration.Pnp.PnpObject[]) => any): any;
                    reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Devices.Enumeration.Pnp.PnpObject[]) => any, initialValue: any): any;
                    reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Devices.Enumeration.Pnp.PnpObject[]) => any): any;
                    reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Devices.Enumeration.Pnp.PnpObject[]) => any, initialValue: any): any;
                    length: number;
                }
                export interface IPnpObjectWatcher {
                    status: Windows.Devices.Enumeration.DeviceWatcherStatus;
                    onadded: any/* TODO */;
                    onupdated: any/* TODO */;
                    onremoved: any/* TODO */;
                    onenumerationcompleted: any/* TODO */;
                    onstopped: any/* TODO */;
                    start(): void;
                    stop(): void;
                }
                export class PnpObjectWatcher implements Windows.Devices.Enumeration.Pnp.IPnpObjectWatcher {
                    status: Windows.Devices.Enumeration.DeviceWatcherStatus;
                    onadded: any/* TODO */;
                    onupdated: any/* TODO */;
                    onremoved: any/* TODO */;
                    onenumerationcompleted: any/* TODO */;
                    onstopped: any/* TODO */;
                    start(): void;
                    stop(): void;
                }
                export class PnpObject implements Windows.Devices.Enumeration.Pnp.IPnpObject {
                    id: string;
                    properties: Windows.Foundation.Collections.IMapView<string, any>;
                    type: Windows.Devices.Enumeration.Pnp.PnpObjectType;
                    update(updateInfo: Windows.Devices.Enumeration.Pnp.PnpObjectUpdate): void;
                    static createFromIdAsync(type: Windows.Devices.Enumeration.Pnp.PnpObjectType, id: string, requestedProperties: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.Pnp.PnpObject>;
                    static findAllAsync(type: Windows.Devices.Enumeration.Pnp.PnpObjectType, requestedProperties: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.Pnp.PnpObjectCollection>;
                    static findAllAsync(type: Windows.Devices.Enumeration.Pnp.PnpObjectType, requestedProperties: Windows.Foundation.Collections.IIterable<string>, aqsFilter: string): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.Pnp.PnpObjectCollection>;
                    static createWatcher(type: Windows.Devices.Enumeration.Pnp.PnpObjectType, requestedProperties: Windows.Foundation.Collections.IIterable<string>): Windows.Devices.Enumeration.Pnp.PnpObjectWatcher;
                    static createWatcher(type: Windows.Devices.Enumeration.Pnp.PnpObjectType, requestedProperties: Windows.Foundation.Collections.IIterable<string>, aqsFilter: string): Windows.Devices.Enumeration.Pnp.PnpObjectWatcher;
                }
                export interface IPnpObjectStatics {
                    createFromIdAsync(type: Windows.Devices.Enumeration.Pnp.PnpObjectType, id: string, requestedProperties: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.Pnp.PnpObject>;
                    findAllAsync(type: Windows.Devices.Enumeration.Pnp.PnpObjectType, requestedProperties: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.Pnp.PnpObjectCollection>;
                    findAllAsync(type: Windows.Devices.Enumeration.Pnp.PnpObjectType, requestedProperties: Windows.Foundation.Collections.IIterable<string>, aqsFilter: string): Windows.Foundation.IAsyncOperation<Windows.Devices.Enumeration.Pnp.PnpObjectCollection>;
                    createWatcher(type: Windows.Devices.Enumeration.Pnp.PnpObjectType, requestedProperties: Windows.Foundation.Collections.IIterable<string>): Windows.Devices.Enumeration.Pnp.PnpObjectWatcher;
                    createWatcher(type: Windows.Devices.Enumeration.Pnp.PnpObjectType, requestedProperties: Windows.Foundation.Collections.IIterable<string>, aqsFilter: string): Windows.Devices.Enumeration.Pnp.PnpObjectWatcher;
                }
                export interface IPnpObject {
                    id: string;
                    properties: Windows.Foundation.Collections.IMapView<string, any>;
                    type: Windows.Devices.Enumeration.Pnp.PnpObjectType;
                    update(updateInfo: Windows.Devices.Enumeration.Pnp.PnpObjectUpdate): void;
                }
            }
        }
    }
}
declare module Windows {
    export module Devices {
        export module Geolocation {
            export enum PositionAccuracy {
                default,
                high,
            }
            export enum PositionStatus {
                ready,
                initializing,
                noData,
                disabled,
                notInitialized,
                notAvailable,
            }
            export interface IGeocoordinate {
                accuracy: number;
                altitude: number;
                altitudeAccuracy: number;
                heading: number;
                latitude: number;
                longitude: number;
                speed: number;
                timestamp: Date;
            }
            export class Geocoordinate implements Windows.Devices.Geolocation.IGeocoordinate {
                accuracy: number;
                altitude: number;
                altitudeAccuracy: number;
                heading: number;
                latitude: number;
                longitude: number;
                speed: number;
                timestamp: Date;
            }
            export interface ICivicAddress {
                city: string;
                country: string;
                postalCode: string;
                state: string;
                timestamp: Date;
            }
            export class CivicAddress implements Windows.Devices.Geolocation.ICivicAddress {
                city: string;
                country: string;
                postalCode: string;
                state: string;
                timestamp: Date;
            }
            export interface IGeoposition {
                civicAddress: Windows.Devices.Geolocation.CivicAddress;
                coordinate: Windows.Devices.Geolocation.Geocoordinate;
            }
            export class Geoposition implements Windows.Devices.Geolocation.IGeoposition {
                civicAddress: Windows.Devices.Geolocation.CivicAddress;
                coordinate: Windows.Devices.Geolocation.Geocoordinate;
            }
            export interface IPositionChangedEventArgs {
                position: Windows.Devices.Geolocation.Geoposition;
            }
            export class PositionChangedEventArgs implements Windows.Devices.Geolocation.IPositionChangedEventArgs {
                position: Windows.Devices.Geolocation.Geoposition;
            }
            export interface IStatusChangedEventArgs {
                status: Windows.Devices.Geolocation.PositionStatus;
            }
            export class StatusChangedEventArgs implements Windows.Devices.Geolocation.IStatusChangedEventArgs {
                status: Windows.Devices.Geolocation.PositionStatus;
            }
            export interface IGeolocator {
                desiredAccuracy: Windows.Devices.Geolocation.PositionAccuracy;
                locationStatus: Windows.Devices.Geolocation.PositionStatus;
                movementThreshold: number;
                reportInterval: number;
                getGeopositionAsync(): Windows.Foundation.IAsyncOperation<Windows.Devices.Geolocation.Geoposition>;
                getGeopositionAsync(maximumAge: number, timeout: number): Windows.Foundation.IAsyncOperation<Windows.Devices.Geolocation.Geoposition>;
                onpositionchanged: any/* TODO */;
                onstatuschanged: any/* TODO */;
            }
            export class Geolocator implements Windows.Devices.Geolocation.IGeolocator {
                desiredAccuracy: Windows.Devices.Geolocation.PositionAccuracy;
                locationStatus: Windows.Devices.Geolocation.PositionStatus;
                movementThreshold: number;
                reportInterval: number;
                getGeopositionAsync(): Windows.Foundation.IAsyncOperation<Windows.Devices.Geolocation.Geoposition>;
                getGeopositionAsync(maximumAge: number, timeout: number): Windows.Foundation.IAsyncOperation<Windows.Devices.Geolocation.Geoposition>;
                onpositionchanged: any/* TODO */;
                onstatuschanged: any/* TODO */;
            }
        }
    }
}
declare module Windows {
    export module Devices {
        export module Input {
            export enum PointerDeviceType {
                touch,
                pen,
                mouse,
            }
            export interface PointerDeviceUsage {
                usagePage: number;
                usage: number;
                minLogical: number;
                maxLogical: number;
                minPhysical: number;
                maxPhysical: number;
                unit: number;
                physicalMultiplier: number;
            }
            export interface MouseDelta {
                x: number;
                y: number;
            }
            export interface IMouseCapabilities {
                horizontalWheelPresent: number;
                mousePresent: number;
                numberOfButtons: number;
                swapButtons: number;
                verticalWheelPresent: number;
            }
            export interface IKeyboardCapabilities {
                keyboardPresent: number;
            }
            export interface ITouchCapabilities {
                contacts: number;
                touchPresent: number;
            }
            export interface IPointerDeviceStatics {
                getPointerDevice(pointerId: number): Windows.Devices.Input.PointerDevice;
                getPointerDevices(): Windows.Foundation.Collections.IVectorView<Windows.Devices.Input.PointerDevice>;
            }
            export class PointerDevice implements Windows.Devices.Input.IPointerDevice {
                isIntegrated: boolean;
                maxContacts: number;
                physicalDeviceRect: Windows.Foundation.Rect;
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                screenRect: Windows.Foundation.Rect;
                supportedUsages: Windows.Foundation.Collections.IVectorView<Windows.Devices.Input.PointerDeviceUsage>;
                static getPointerDevice(pointerId: number): Windows.Devices.Input.PointerDevice;
                static getPointerDevices(): Windows.Foundation.Collections.IVectorView<Windows.Devices.Input.PointerDevice>;
            }
            export interface IPointerDevice {
                isIntegrated: boolean;
                maxContacts: number;
                physicalDeviceRect: Windows.Foundation.Rect;
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                screenRect: Windows.Foundation.Rect;
                supportedUsages: Windows.Foundation.Collections.IVectorView<Windows.Devices.Input.PointerDeviceUsage>;
            }
            export interface IMouseEventArgs {
                mouseDelta: Windows.Devices.Input.MouseDelta;
            }
            export interface IMouseDevice {
                onmousemoved: any/* TODO */;
            }
            export class MouseDevice implements Windows.Devices.Input.IMouseDevice {
                onmousemoved: any/* TODO */;
                static getForCurrentView(): Windows.Devices.Input.MouseDevice;
            }
            export class MouseEventArgs implements Windows.Devices.Input.IMouseEventArgs {
                mouseDelta: Windows.Devices.Input.MouseDelta;
            }
            export interface IMouseDeviceStatics {
                getForCurrentView(): Windows.Devices.Input.MouseDevice;
            }
            export class MouseCapabilities implements Windows.Devices.Input.IMouseCapabilities {
                horizontalWheelPresent: number;
                mousePresent: number;
                numberOfButtons: number;
                swapButtons: number;
                verticalWheelPresent: number;
            }
            export class KeyboardCapabilities implements Windows.Devices.Input.IKeyboardCapabilities {
                keyboardPresent: number;
            }
            export class TouchCapabilities implements Windows.Devices.Input.ITouchCapabilities {
                contacts: number;
                touchPresent: number;
            }
        }
    }
}
declare module Windows {
    export module Devices {
        export module Portable {
            export enum ServiceDeviceType {
                calendarService,
                contactsService,
                deviceStatusService,
                notesService,
                ringtonesService,
                smsService,
                tasksService,
            }
            export interface IStorageDeviceStatics {
                fromId(interfaceId: string): Windows.Storage.StorageFolder;
                getDeviceSelector(): string;
            }
            export interface IServiceDeviceStatics {
                getDeviceSelector(serviceType: Windows.Devices.Portable.ServiceDeviceType): string;
                getDeviceSelectorFromServiceId(serviceId: string): string;
            }
            export class StorageDevice {
                static fromId(interfaceId: string): Windows.Storage.StorageFolder;
                static getDeviceSelector(): string;
            }
            export class ServiceDevice {
                static getDeviceSelector(serviceType: Windows.Devices.Portable.ServiceDeviceType): string;
                static getDeviceSelectorFromServiceId(serviceId: string): string;
            }
        }
    }
}
declare module Windows {
    export module Devices {
        export module Printers {
            export module Extensions {
                export interface IPrintTaskConfigurationSaveRequestedDeferral {
                    complete(): void;
                }
                export class PrintTaskConfigurationSaveRequestedDeferral implements Windows.Devices.Printers.Extensions.IPrintTaskConfigurationSaveRequestedDeferral {
                    complete(): void;
                }
                export interface IPrintTaskConfigurationSaveRequest {
                    deadline: Date;
                    cancel(): void;
                    save(printerExtensionContext: any): void;
                    getDeferral(): Windows.Devices.Printers.Extensions.PrintTaskConfigurationSaveRequestedDeferral;
                }
                export class PrintTaskConfigurationSaveRequest implements Windows.Devices.Printers.Extensions.IPrintTaskConfigurationSaveRequest {
                    deadline: Date;
                    cancel(): void;
                    save(printerExtensionContext: any): void;
                    getDeferral(): Windows.Devices.Printers.Extensions.PrintTaskConfigurationSaveRequestedDeferral;
                }
                export interface IPrintTaskConfigurationSaveRequestedEventArgs {
                    request: Windows.Devices.Printers.Extensions.PrintTaskConfigurationSaveRequest;
                }
                export class PrintTaskConfigurationSaveRequestedEventArgs implements Windows.Devices.Printers.Extensions.IPrintTaskConfigurationSaveRequestedEventArgs {
                    request: Windows.Devices.Printers.Extensions.PrintTaskConfigurationSaveRequest;
                }
                export interface IPrintTaskConfiguration {
                    printerExtensionContext: any;
                    onsaverequested: any/* TODO */;
                }
                export class PrintTaskConfiguration implements Windows.Devices.Printers.Extensions.IPrintTaskConfiguration {
                    printerExtensionContext: any;
                    onsaverequested: any/* TODO */;
                }
                export interface IPrintNotificationEventDetails {
                    eventData: string;
                    printerName: string;
                }
                export class PrintNotificationEventDetails implements Windows.Devices.Printers.Extensions.IPrintNotificationEventDetails {
                    eventData: string;
                    printerName: string;
                }
                export interface IPrintExtensionContextStatic {
                    fromDeviceId(deviceId: string): any;
                }
                export class PrintExtensionContext {
                    static fromDeviceId(deviceId: string): any;
                }
            }
        }
    }
}
declare module Windows {
    export module Devices {
        export module Sensors {
            export interface IAccelerometerStatics {
                getDefault(): Windows.Devices.Sensors.Accelerometer;
            }
            export class Accelerometer implements Windows.Devices.Sensors.IAccelerometer {
                minimumReportInterval: number;
                reportInterval: number;
                getCurrentReading(): Windows.Devices.Sensors.AccelerometerReading;
                onreadingchanged: any/* TODO */;
                onshaken: any/* TODO */;
                static getDefault(): Windows.Devices.Sensors.Accelerometer;
            }
            export interface IAccelerometer {
                minimumReportInterval: number;
                reportInterval: number;
                getCurrentReading(): Windows.Devices.Sensors.AccelerometerReading;
                onreadingchanged: any/* TODO */;
                onshaken: any/* TODO */;
            }
            export class AccelerometerReading implements Windows.Devices.Sensors.IAccelerometerReading {
                accelerationX: number;
                accelerationY: number;
                accelerationZ: number;
                timestamp: Date;
            }
            export class AccelerometerReadingChangedEventArgs implements Windows.Devices.Sensors.IAccelerometerReadingChangedEventArgs {
                reading: Windows.Devices.Sensors.AccelerometerReading;
            }
            export class AccelerometerShakenEventArgs implements Windows.Devices.Sensors.IAccelerometerShakenEventArgs {
                timestamp: Date;
            }
            export interface IAccelerometerReading {
                accelerationX: number;
                accelerationY: number;
                accelerationZ: number;
                timestamp: Date;
            }
            export interface IAccelerometerReadingChangedEventArgs {
                reading: Windows.Devices.Sensors.AccelerometerReading;
            }
            export interface IAccelerometerShakenEventArgs {
                timestamp: Date;
            }
            export interface IInclinometerStatics {
                getDefault(): Windows.Devices.Sensors.Inclinometer;
            }
            export class Inclinometer implements Windows.Devices.Sensors.IInclinometer {
                minimumReportInterval: number;
                reportInterval: number;
                getCurrentReading(): Windows.Devices.Sensors.InclinometerReading;
                onreadingchanged: any/* TODO */;
                static getDefault(): Windows.Devices.Sensors.Inclinometer;
            }
            export interface IInclinometer {
                minimumReportInterval: number;
                reportInterval: number;
                getCurrentReading(): Windows.Devices.Sensors.InclinometerReading;
                onreadingchanged: any/* TODO */;
            }
            export class InclinometerReading implements Windows.Devices.Sensors.IInclinometerReading {
                pitchDegrees: number;
                rollDegrees: number;
                timestamp: Date;
                yawDegrees: number;
            }
            export class InclinometerReadingChangedEventArgs implements Windows.Devices.Sensors.IInclinometerReadingChangedEventArgs {
                reading: Windows.Devices.Sensors.InclinometerReading;
            }
            export interface IInclinometerReading {
                pitchDegrees: number;
                rollDegrees: number;
                timestamp: Date;
                yawDegrees: number;
            }
            export interface IInclinometerReadingChangedEventArgs {
                reading: Windows.Devices.Sensors.InclinometerReading;
            }
            export interface IGyrometerStatics {
                getDefault(): Windows.Devices.Sensors.Gyrometer;
            }
            export class Gyrometer implements Windows.Devices.Sensors.IGyrometer {
                minimumReportInterval: number;
                reportInterval: number;
                getCurrentReading(): Windows.Devices.Sensors.GyrometerReading;
                onreadingchanged: any/* TODO */;
                static getDefault(): Windows.Devices.Sensors.Gyrometer;
            }
            export interface IGyrometer {
                minimumReportInterval: number;
                reportInterval: number;
                getCurrentReading(): Windows.Devices.Sensors.GyrometerReading;
                onreadingchanged: any/* TODO */;
            }
            export class GyrometerReading implements Windows.Devices.Sensors.IGyrometerReading {
                angularVelocityX: number;
                angularVelocityY: number;
                angularVelocityZ: number;
                timestamp: Date;
            }
            export class GyrometerReadingChangedEventArgs implements Windows.Devices.Sensors.IGyrometerReadingChangedEventArgs {
                reading: Windows.Devices.Sensors.GyrometerReading;
            }
            export interface IGyrometerReading {
                angularVelocityX: number;
                angularVelocityY: number;
                angularVelocityZ: number;
                timestamp: Date;
            }
            export interface IGyrometerReadingChangedEventArgs {
                reading: Windows.Devices.Sensors.GyrometerReading;
            }
            export interface ICompassStatics {
                getDefault(): Windows.Devices.Sensors.Compass;
            }
            export class Compass implements Windows.Devices.Sensors.ICompass {
                minimumReportInterval: number;
                reportInterval: number;
                getCurrentReading(): Windows.Devices.Sensors.CompassReading;
                onreadingchanged: any/* TODO */;
                static getDefault(): Windows.Devices.Sensors.Compass;
            }
            export interface ICompass {
                minimumReportInterval: number;
                reportInterval: number;
                getCurrentReading(): Windows.Devices.Sensors.CompassReading;
                onreadingchanged: any/* TODO */;
            }
            export class CompassReading implements Windows.Devices.Sensors.ICompassReading {
                headingMagneticNorth: number;
                headingTrueNorth: number;
                timestamp: Date;
            }
            export class CompassReadingChangedEventArgs implements Windows.Devices.Sensors.ICompassReadingChangedEventArgs {
                reading: Windows.Devices.Sensors.CompassReading;
            }
            export interface ICompassReading {
                headingMagneticNorth: number;
                headingTrueNorth: number;
                timestamp: Date;
            }
            export interface ICompassReadingChangedEventArgs {
                reading: Windows.Devices.Sensors.CompassReading;
            }
            export interface ILightSensorStatics {
                getDefault(): Windows.Devices.Sensors.LightSensor;
            }
            export class LightSensor implements Windows.Devices.Sensors.ILightSensor {
                minimumReportInterval: number;
                reportInterval: number;
                getCurrentReading(): Windows.Devices.Sensors.LightSensorReading;
                onreadingchanged: any/* TODO */;
                static getDefault(): Windows.Devices.Sensors.LightSensor;
            }
            export interface ILightSensor {
                minimumReportInterval: number;
                reportInterval: number;
                getCurrentReading(): Windows.Devices.Sensors.LightSensorReading;
                onreadingchanged: any/* TODO */;
            }
            export class LightSensorReading implements Windows.Devices.Sensors.ILightSensorReading {
                illuminanceInLux: number;
                timestamp: Date;
            }
            export class LightSensorReadingChangedEventArgs implements Windows.Devices.Sensors.ILightSensorReadingChangedEventArgs {
                reading: Windows.Devices.Sensors.LightSensorReading;
            }
            export interface ILightSensorReading {
                illuminanceInLux: number;
                timestamp: Date;
            }
            export interface ILightSensorReadingChangedEventArgs {
                reading: Windows.Devices.Sensors.LightSensorReading;
            }
            export interface ISensorRotationMatrix {
                m11: number;
                m12: number;
                m13: number;
                m21: number;
                m22: number;
                m23: number;
                m31: number;
                m32: number;
                m33: number;
            }
            export interface ISensorQuaternion {
                w: number;
                x: number;
                y: number;
                z: number;
            }
            export class SensorRotationMatrix implements Windows.Devices.Sensors.ISensorRotationMatrix {
                m11: number;
                m12: number;
                m13: number;
                m21: number;
                m22: number;
                m23: number;
                m31: number;
                m32: number;
                m33: number;
            }
            export class SensorQuaternion implements Windows.Devices.Sensors.ISensorQuaternion {
                w: number;
                x: number;
                y: number;
                z: number;
            }
            export interface IOrientationSensorStatics {
                getDefault(): Windows.Devices.Sensors.OrientationSensor;
            }
            export class OrientationSensor implements Windows.Devices.Sensors.IOrientationSensor {
                minimumReportInterval: number;
                reportInterval: number;
                getCurrentReading(): Windows.Devices.Sensors.OrientationSensorReading;
                onreadingchanged: any/* TODO */;
                static getDefault(): Windows.Devices.Sensors.OrientationSensor;
            }
            export interface IOrientationSensor {
                minimumReportInterval: number;
                reportInterval: number;
                getCurrentReading(): Windows.Devices.Sensors.OrientationSensorReading;
                onreadingchanged: any/* TODO */;
            }
            export class OrientationSensorReading implements Windows.Devices.Sensors.IOrientationSensorReading {
                quaternion: Windows.Devices.Sensors.SensorQuaternion;
                rotationMatrix: Windows.Devices.Sensors.SensorRotationMatrix;
                timestamp: Date;
            }
            export class OrientationSensorReadingChangedEventArgs implements Windows.Devices.Sensors.IOrientationSensorReadingChangedEventArgs {
                reading: Windows.Devices.Sensors.OrientationSensorReading;
            }
            export interface IOrientationSensorReading {
                quaternion: Windows.Devices.Sensors.SensorQuaternion;
                rotationMatrix: Windows.Devices.Sensors.SensorRotationMatrix;
                timestamp: Date;
            }
            export interface IOrientationSensorReadingChangedEventArgs {
                reading: Windows.Devices.Sensors.OrientationSensorReading;
            }
            export enum SimpleOrientation {
                notRotated,
                rotated90DegreesCounterclockwise,
                rotated180DegreesCounterclockwise,
                rotated270DegreesCounterclockwise,
                faceup,
                facedown,
            }
            export interface ISimpleOrientationSensorStatics {
                getDefault(): Windows.Devices.Sensors.SimpleOrientationSensor;
            }
            export class SimpleOrientationSensor implements Windows.Devices.Sensors.ISimpleOrientationSensor {
                getCurrentOrientation(): Windows.Devices.Sensors.SimpleOrientation;
                onorientationchanged: any/* TODO */;
                static getDefault(): Windows.Devices.Sensors.SimpleOrientationSensor;
            }
            export interface ISimpleOrientationSensor {
                getCurrentOrientation(): Windows.Devices.Sensors.SimpleOrientation;
                onorientationchanged: any/* TODO */;
            }
            export class SimpleOrientationSensorOrientationChangedEventArgs implements Windows.Devices.Sensors.ISimpleOrientationSensorOrientationChangedEventArgs {
                orientation: Windows.Devices.Sensors.SimpleOrientation;
                timestamp: Date;
            }
            export interface ISimpleOrientationSensorOrientationChangedEventArgs {
                orientation: Windows.Devices.Sensors.SimpleOrientation;
                timestamp: Date;
            }
        }
    }
}
declare module Windows {
    export module Globalization {
        export module Fonts {
            export interface ILanguageFontGroup {
                documentAlternate1Font: Windows.Globalization.Fonts.LanguageFont;
                documentAlternate2Font: Windows.Globalization.Fonts.LanguageFont;
                documentHeadingFont: Windows.Globalization.Fonts.LanguageFont;
                fixedWidthTextFont: Windows.Globalization.Fonts.LanguageFont;
                modernDocumentFont: Windows.Globalization.Fonts.LanguageFont;
                traditionalDocumentFont: Windows.Globalization.Fonts.LanguageFont;
                uICaptionFont: Windows.Globalization.Fonts.LanguageFont;
                uIHeadingFont: Windows.Globalization.Fonts.LanguageFont;
                uINotificationHeadingFont: Windows.Globalization.Fonts.LanguageFont;
                uITextFont: Windows.Globalization.Fonts.LanguageFont;
                uITitleFont: Windows.Globalization.Fonts.LanguageFont;
            }
            export class LanguageFont implements Windows.Globalization.Fonts.ILanguageFont {
                fontFamily: string;
                fontStretch: Windows.UI.Text.FontStretch;
                fontStyle: Windows.UI.Text.FontStyle;
                fontWeight: Windows.UI.Text.FontWeight;
                scaleFactor: number;
            }
            export interface ILanguageFontGroupFactory {
                createLanguageFontGroup(languageTag: string): Windows.Globalization.Fonts.LanguageFontGroup;
            }
            export class LanguageFontGroup implements Windows.Globalization.Fonts.ILanguageFontGroup {
                constructor(languageTag: string);
                documentAlternate1Font: Windows.Globalization.Fonts.LanguageFont;
                documentAlternate2Font: Windows.Globalization.Fonts.LanguageFont;
                documentHeadingFont: Windows.Globalization.Fonts.LanguageFont;
                fixedWidthTextFont: Windows.Globalization.Fonts.LanguageFont;
                modernDocumentFont: Windows.Globalization.Fonts.LanguageFont;
                traditionalDocumentFont: Windows.Globalization.Fonts.LanguageFont;
                uICaptionFont: Windows.Globalization.Fonts.LanguageFont;
                uIHeadingFont: Windows.Globalization.Fonts.LanguageFont;
                uINotificationHeadingFont: Windows.Globalization.Fonts.LanguageFont;
                uITextFont: Windows.Globalization.Fonts.LanguageFont;
                uITitleFont: Windows.Globalization.Fonts.LanguageFont;
            }
            export interface ILanguageFont {
                fontFamily: string;
                fontStretch: Windows.UI.Text.FontStretch;
                fontStyle: Windows.UI.Text.FontStyle;
                fontWeight: Windows.UI.Text.FontWeight;
                scaleFactor: number;
            }
        }
    }
}
declare module Windows {
    export module Globalization {
        export enum DayOfWeek {
            sunday,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
        }
        export interface ICalendarIdentifiersStatics {
            gregorian: string;
            hebrew: string;
            hijri: string;
            japanese: string;
            julian: string;
            korean: string;
            taiwan: string;
            thai: string;
            umAlQura: string;
        }
        export class CalendarIdentifiers {
            static gregorian: string;
            static hebrew: string;
            static hijri: string;
            static japanese: string;
            static julian: string;
            static korean: string;
            static taiwan: string;
            static thai: string;
            static umAlQura: string;
        }
        export interface IClockIdentifiersStatics {
            twelveHour: string;
            twentyFourHour: string;
        }
        export class ClockIdentifiers {
            static twelveHour: string;
            static twentyFourHour: string;
        }
        export interface IGeographicRegion {
            code: string;
            codeThreeDigit: string;
            codeThreeLetter: string;
            codeTwoLetter: string;
            currenciesInUse: Windows.Foundation.Collections.IVectorView<string>;
            displayName: string;
            nativeName: string;
        }
        export interface IGeographicRegionFactory {
            createGeographicRegion(geographicRegionCode: string): Windows.Globalization.GeographicRegion;
        }
        export class GeographicRegion implements Windows.Globalization.IGeographicRegion {
            constructor(geographicRegionCode: string);
            constructor();
            code: string;
            codeThreeDigit: string;
            codeThreeLetter: string;
            codeTwoLetter: string;
            currenciesInUse: Windows.Foundation.Collections.IVectorView<string>;
            displayName: string;
            nativeName: string;
            static isSupported(geographicRegionCode: string): boolean;
        }
        export interface IGeographicRegionStatics {
            isSupported(geographicRegionCode: string): boolean;
        }
        export interface ILanguage {
            displayName: string;
            languageTag: string;
            nativeName: string;
            script: string;
        }
        export interface ILanguageFactory {
            createLanguage(languageTag: string): Windows.Globalization.Language;
        }
        export class Language implements Windows.Globalization.ILanguage {
            constructor(languageTag: string);
            displayName: string;
            languageTag: string;
            nativeName: string;
            script: string;
            static currentInputMethodLanguageTag: string;
            static isWellFormed(languageTag: string): boolean;
        }
        export interface ILanguageStatics {
            currentInputMethodLanguageTag: string;
            isWellFormed(languageTag: string): boolean;
        }
        export interface ICalendar {
            day: number;
            dayOfWeek: Windows.Globalization.DayOfWeek;
            era: number;
            firstDayInThisMonth: number;
            firstEra: number;
            firstHourInThisPeriod: number;
            firstMinuteInThisHour: number;
            firstMonthInThisYear: number;
            firstPeriodInThisDay: number;
            firstSecondInThisMinute: number;
            firstYearInThisEra: number;
            hour: number;
            isDaylightSavingTime: boolean;
            languages: Windows.Foundation.Collections.IVectorView<string>;
            lastDayInThisMonth: number;
            lastEra: number;
            lastHourInThisPeriod: number;
            lastMinuteInThisHour: number;
            lastMonthInThisYear: number;
            lastPeriodInThisDay: number;
            lastSecondInThisMinute: number;
            lastYearInThisEra: number;
            minute: number;
            month: number;
            nanosecond: number;
            numberOfDaysInThisMonth: number;
            numberOfEras: number;
            numberOfHoursInThisPeriod: number;
            numberOfMinutesInThisHour: number;
            numberOfMonthsInThisYear: number;
            numberOfPeriodsInThisDay: number;
            numberOfSecondsInThisMinute: number;
            numberOfYearsInThisEra: number;
            numeralSystem: string;
            period: number;
            resolvedLanguage: string;
            second: number;
            year: number;
            clone(): Windows.Globalization.Calendar;
            setToMin(): void;
            setToMax(): void;
            getCalendarSystem(): string;
            changeCalendarSystem(value: string): void;
            getClock(): string;
            changeClock(value: string): void;
            getDateTime(): Date;
            setDateTime(value: Date): void;
            setToNow(): void;
            addEras(eras: number): void;
            eraAsString(): string;
            eraAsString(idealLength: number): string;
            addYears(years: number): void;
            yearAsString(): string;
            yearAsTruncatedString(remainingDigits: number): string;
            yearAsPaddedString(minDigits: number): string;
            addMonths(months: number): void;
            monthAsString(): string;
            monthAsString(idealLength: number): string;
            monthAsSoloString(): string;
            monthAsSoloString(idealLength: number): string;
            monthAsNumericString(): string;
            monthAsPaddedNumericString(minDigits: number): string;
            addWeeks(weeks: number): void;
            addDays(days: number): void;
            dayAsString(): string;
            dayAsPaddedString(minDigits: number): string;
            dayOfWeekAsString(): string;
            dayOfWeekAsString(idealLength: number): string;
            dayOfWeekAsSoloString(): string;
            dayOfWeekAsSoloString(idealLength: number): string;
            addPeriods(periods: number): void;
            periodAsString(): string;
            periodAsString(idealLength: number): string;
            addHours(hours: number): void;
            hourAsString(): string;
            hourAsPaddedString(minDigits: number): string;
            addMinutes(minutes: number): void;
            minuteAsString(): string;
            minuteAsPaddedString(minDigits: number): string;
            addSeconds(seconds: number): void;
            secondAsString(): string;
            secondAsPaddedString(minDigits: number): string;
            addNanoseconds(nanoseconds: number): void;
            nanosecondAsString(): string;
            nanosecondAsPaddedString(minDigits: number): string;
            compare(other: Windows.Globalization.Calendar): number;
            compareDateTime(other: Date): number;
            copyTo(other: Windows.Globalization.Calendar): void;
        }
        export class Calendar implements Windows.Globalization.ICalendar {
            constructor(languages: Windows.Foundation.Collections.IIterable<string>);
            constructor(languages: Windows.Foundation.Collections.IIterable<string>, calendar: string, clock: string);
            constructor();
            day: number;
            dayOfWeek: Windows.Globalization.DayOfWeek;
            era: number;
            firstDayInThisMonth: number;
            firstEra: number;
            firstHourInThisPeriod: number;
            firstMinuteInThisHour: number;
            firstMonthInThisYear: number;
            firstPeriodInThisDay: number;
            firstSecondInThisMinute: number;
            firstYearInThisEra: number;
            hour: number;
            isDaylightSavingTime: boolean;
            languages: Windows.Foundation.Collections.IVectorView<string>;
            lastDayInThisMonth: number;
            lastEra: number;
            lastHourInThisPeriod: number;
            lastMinuteInThisHour: number;
            lastMonthInThisYear: number;
            lastPeriodInThisDay: number;
            lastSecondInThisMinute: number;
            lastYearInThisEra: number;
            minute: number;
            month: number;
            nanosecond: number;
            numberOfDaysInThisMonth: number;
            numberOfEras: number;
            numberOfHoursInThisPeriod: number;
            numberOfMinutesInThisHour: number;
            numberOfMonthsInThisYear: number;
            numberOfPeriodsInThisDay: number;
            numberOfSecondsInThisMinute: number;
            numberOfYearsInThisEra: number;
            numeralSystem: string;
            period: number;
            resolvedLanguage: string;
            second: number;
            year: number;
            clone(): Windows.Globalization.Calendar;
            setToMin(): void;
            setToMax(): void;
            getCalendarSystem(): string;
            changeCalendarSystem(value: string): void;
            getClock(): string;
            changeClock(value: string): void;
            getDateTime(): Date;
            setDateTime(value: Date): void;
            setToNow(): void;
            addEras(eras: number): void;
            eraAsString(): string;
            eraAsString(idealLength: number): string;
            addYears(years: number): void;
            yearAsString(): string;
            yearAsTruncatedString(remainingDigits: number): string;
            yearAsPaddedString(minDigits: number): string;
            addMonths(months: number): void;
            monthAsString(): string;
            monthAsString(idealLength: number): string;
            monthAsSoloString(): string;
            monthAsSoloString(idealLength: number): string;
            monthAsNumericString(): string;
            monthAsPaddedNumericString(minDigits: number): string;
            addWeeks(weeks: number): void;
            addDays(days: number): void;
            dayAsString(): string;
            dayAsPaddedString(minDigits: number): string;
            dayOfWeekAsString(): string;
            dayOfWeekAsString(idealLength: number): string;
            dayOfWeekAsSoloString(): string;
            dayOfWeekAsSoloString(idealLength: number): string;
            addPeriods(periods: number): void;
            periodAsString(): string;
            periodAsString(idealLength: number): string;
            addHours(hours: number): void;
            hourAsString(): string;
            hourAsPaddedString(minDigits: number): string;
            addMinutes(minutes: number): void;
            minuteAsString(): string;
            minuteAsPaddedString(minDigits: number): string;
            addSeconds(seconds: number): void;
            secondAsString(): string;
            secondAsPaddedString(minDigits: number): string;
            addNanoseconds(nanoseconds: number): void;
            nanosecondAsString(): string;
            nanosecondAsPaddedString(minDigits: number): string;
            compare(other: Windows.Globalization.Calendar): number;
            compareDateTime(other: Date): number;
            copyTo(other: Windows.Globalization.Calendar): void;
        }
        export interface ICalendarFactory {
            createCalendarDefaultCalendarAndClock(languages: Windows.Foundation.Collections.IIterable<string>): Windows.Globalization.Calendar;
            createCalendar(languages: Windows.Foundation.Collections.IIterable<string>, calendar: string, clock: string): Windows.Globalization.Calendar;
        }
        export interface IApplicationLanguagesStatics {
            languages: Windows.Foundation.Collections.IVectorView<string>;
            manifestLanguages: Windows.Foundation.Collections.IVectorView<string>;
            primaryLanguageOverride: string;
        }
        export class ApplicationLanguages {
            static languages: Windows.Foundation.Collections.IVectorView<string>;
            static manifestLanguages: Windows.Foundation.Collections.IVectorView<string>;
            static primaryLanguageOverride: string;
        }
    }
}
declare module Windows {
    export module Globalization {
        export module DateTimeFormatting {
            export enum YearFormat {
                none,
                default,
                abbreviated,
                full,
            }
            export enum MonthFormat {
                none,
                default,
                abbreviated,
                full,
                numeric,
            }
            export enum DayOfWeekFormat {
                none,
                default,
                abbreviated,
                full,
            }
            export enum DayFormat {
                none,
                default,
            }
            export enum HourFormat {
                none,
                default,
            }
            export enum MinuteFormat {
                none,
                default,
            }
            export enum SecondFormat {
                none,
                default,
            }
            export interface IDateTimeFormatter {
                calendar: string;
                clock: string;
                geographicRegion: string;
                includeDay: Windows.Globalization.DateTimeFormatting.DayFormat;
                includeDayOfWeek: Windows.Globalization.DateTimeFormatting.DayOfWeekFormat;
                includeHour: Windows.Globalization.DateTimeFormatting.HourFormat;
                includeMinute: Windows.Globalization.DateTimeFormatting.MinuteFormat;
                includeMonth: Windows.Globalization.DateTimeFormatting.MonthFormat;
                includeSecond: Windows.Globalization.DateTimeFormatting.SecondFormat;
                includeYear: Windows.Globalization.DateTimeFormatting.YearFormat;
                languages: Windows.Foundation.Collections.IVectorView<string>;
                numeralSystem: string;
                patterns: Windows.Foundation.Collections.IVectorView<string>;
                resolvedGeographicRegion: string;
                resolvedLanguage: string;
                template: string;
                format(value: Date): string;
            }
            export interface IDateTimeFormatterFactory {
                createDateTimeFormatter(formatTemplate: string): Windows.Globalization.DateTimeFormatting.DateTimeFormatter;
                createDateTimeFormatterLanguages(formatTemplate: string, languages: Windows.Foundation.Collections.IIterable<string>): Windows.Globalization.DateTimeFormatting.DateTimeFormatter;
                createDateTimeFormatterContext(formatTemplate: string, languages: Windows.Foundation.Collections.IIterable<string>, geographicRegion: string, calendar: string, clock: string): Windows.Globalization.DateTimeFormatting.DateTimeFormatter;
                createDateTimeFormatterDate(yearFormat: Windows.Globalization.DateTimeFormatting.YearFormat, monthFormat: Windows.Globalization.DateTimeFormatting.MonthFormat, dayFormat: Windows.Globalization.DateTimeFormatting.DayFormat, dayOfWeekFormat: Windows.Globalization.DateTimeFormatting.DayOfWeekFormat): Windows.Globalization.DateTimeFormatting.DateTimeFormatter;
                createDateTimeFormatterTime(hourFormat: Windows.Globalization.DateTimeFormatting.HourFormat, minuteFormat: Windows.Globalization.DateTimeFormatting.MinuteFormat, secondFormat: Windows.Globalization.DateTimeFormatting.SecondFormat): Windows.Globalization.DateTimeFormatting.DateTimeFormatter;
                createDateTimeFormatterDateTimeLanguages(yearFormat: Windows.Globalization.DateTimeFormatting.YearFormat, monthFormat: Windows.Globalization.DateTimeFormatting.MonthFormat, dayFormat: Windows.Globalization.DateTimeFormatting.DayFormat, dayOfWeekFormat: Windows.Globalization.DateTimeFormatting.DayOfWeekFormat, hourFormat: Windows.Globalization.DateTimeFormatting.HourFormat, minuteFormat: Windows.Globalization.DateTimeFormatting.MinuteFormat, secondFormat: Windows.Globalization.DateTimeFormatting.SecondFormat, languages: Windows.Foundation.Collections.IIterable<string>): Windows.Globalization.DateTimeFormatting.DateTimeFormatter;
                createDateTimeFormatterDateTimeContext(yearFormat: Windows.Globalization.DateTimeFormatting.YearFormat, monthFormat: Windows.Globalization.DateTimeFormatting.MonthFormat, dayFormat: Windows.Globalization.DateTimeFormatting.DayFormat, dayOfWeekFormat: Windows.Globalization.DateTimeFormatting.DayOfWeekFormat, hourFormat: Windows.Globalization.DateTimeFormatting.HourFormat, minuteFormat: Windows.Globalization.DateTimeFormatting.MinuteFormat, secondFormat: Windows.Globalization.DateTimeFormatting.SecondFormat, languages: Windows.Foundation.Collections.IIterable<string>, geographicRegion: string, calendar: string, clock: string): Windows.Globalization.DateTimeFormatting.DateTimeFormatter;
            }
            export class DateTimeFormatter implements Windows.Globalization.DateTimeFormatting.IDateTimeFormatter {
                constructor(formatTemplate: string);
                constructor(formatTemplate: string, languages: Windows.Foundation.Collections.IIterable<string>);
                constructor(formatTemplate: string, languages: Windows.Foundation.Collections.IIterable<string>, geographicRegion: string, calendar: string, clock: string);
                constructor(yearFormat: Windows.Globalization.DateTimeFormatting.YearFormat, monthFormat: Windows.Globalization.DateTimeFormatting.MonthFormat, dayFormat: Windows.Globalization.DateTimeFormatting.DayFormat, dayOfWeekFormat: Windows.Globalization.DateTimeFormatting.DayOfWeekFormat);
                constructor(hourFormat: Windows.Globalization.DateTimeFormatting.HourFormat, minuteFormat: Windows.Globalization.DateTimeFormatting.MinuteFormat, secondFormat: Windows.Globalization.DateTimeFormatting.SecondFormat);
                constructor(yearFormat: Windows.Globalization.DateTimeFormatting.YearFormat, monthFormat: Windows.Globalization.DateTimeFormatting.MonthFormat, dayFormat: Windows.Globalization.DateTimeFormatting.DayFormat, dayOfWeekFormat: Windows.Globalization.DateTimeFormatting.DayOfWeekFormat, hourFormat: Windows.Globalization.DateTimeFormatting.HourFormat, minuteFormat: Windows.Globalization.DateTimeFormatting.MinuteFormat, secondFormat: Windows.Globalization.DateTimeFormatting.SecondFormat, languages: Windows.Foundation.Collections.IIterable<string>);
                constructor(yearFormat: Windows.Globalization.DateTimeFormatting.YearFormat, monthFormat: Windows.Globalization.DateTimeFormatting.MonthFormat, dayFormat: Windows.Globalization.DateTimeFormatting.DayFormat, dayOfWeekFormat: Windows.Globalization.DateTimeFormatting.DayOfWeekFormat, hourFormat: Windows.Globalization.DateTimeFormatting.HourFormat, minuteFormat: Windows.Globalization.DateTimeFormatting.MinuteFormat, secondFormat: Windows.Globalization.DateTimeFormatting.SecondFormat, languages: Windows.Foundation.Collections.IIterable<string>, geographicRegion: string, calendar: string, clock: string);
                calendar: string;
                clock: string;
                geographicRegion: string;
                includeDay: Windows.Globalization.DateTimeFormatting.DayFormat;
                includeDayOfWeek: Windows.Globalization.DateTimeFormatting.DayOfWeekFormat;
                includeHour: Windows.Globalization.DateTimeFormatting.HourFormat;
                includeMinute: Windows.Globalization.DateTimeFormatting.MinuteFormat;
                includeMonth: Windows.Globalization.DateTimeFormatting.MonthFormat;
                includeSecond: Windows.Globalization.DateTimeFormatting.SecondFormat;
                includeYear: Windows.Globalization.DateTimeFormatting.YearFormat;
                languages: Windows.Foundation.Collections.IVectorView<string>;
                numeralSystem: string;
                patterns: Windows.Foundation.Collections.IVectorView<string>;
                resolvedGeographicRegion: string;
                resolvedLanguage: string;
                template: string;
                format(value: Date): string;
                static longDate: Windows.Globalization.DateTimeFormatting.DateTimeFormatter;
                static longTime: Windows.Globalization.DateTimeFormatting.DateTimeFormatter;
                static shortDate: Windows.Globalization.DateTimeFormatting.DateTimeFormatter;
                static shortTime: Windows.Globalization.DateTimeFormatting.DateTimeFormatter;
            }
            export interface IDateTimeFormatterStatics {
                longDate: Windows.Globalization.DateTimeFormatting.DateTimeFormatter;
                longTime: Windows.Globalization.DateTimeFormatting.DateTimeFormatter;
                shortDate: Windows.Globalization.DateTimeFormatting.DateTimeFormatter;
                shortTime: Windows.Globalization.DateTimeFormatting.DateTimeFormatter;
            }
        }
    }
}
declare module Windows {
    export module Globalization {
        export module NumberFormatting {
            export interface INumberFormatter {
                format(value: number): string;
            }
            export interface INumberFormatter2 {
                formatInt(value: number): string;
                formatUInt(value: number): string;
                formatDouble(value: number): string;
            }
            export interface INumberParser {
                parseInt(text: string): number;
                parseUInt(text: string): number;
                parseDouble(text: string): number;
            }
            export interface INumberFormatterOptions {
                fractionDigits: number;
                geographicRegion: string;
                integerDigits: number;
                isDecimalPointAlwaysDisplayed: boolean;
                isGrouped: boolean;
                languages: Windows.Foundation.Collections.IVectorView<string>;
                numeralSystem: string;
                resolvedGeographicRegion: string;
                resolvedLanguage: string;
            }
            export interface IDecimalFormatterFactory {
                createDecimalFormatter(languages: Windows.Foundation.Collections.IIterable<string>, geographicRegion: string): Windows.Globalization.NumberFormatting.DecimalFormatter;
            }
            export class DecimalFormatter implements Windows.Globalization.NumberFormatting.INumberFormatterOptions, Windows.Globalization.NumberFormatting.INumberFormatter, Windows.Globalization.NumberFormatting.INumberFormatter2, Windows.Globalization.NumberFormatting.INumberParser {
                constructor(languages: Windows.Foundation.Collections.IIterable<string>, geographicRegion: string);
                constructor();
                fractionDigits: number;
                geographicRegion: string;
                integerDigits: number;
                isDecimalPointAlwaysDisplayed: boolean;
                isGrouped: boolean;
                languages: Windows.Foundation.Collections.IVectorView<string>;
                numeralSystem: string;
                resolvedGeographicRegion: string;
                resolvedLanguage: string;
                format(value: number): string;
                formatInt(value: number): string;
                formatUInt(value: number): string;
                formatDouble(value: number): string;
                parseInt(text: string): number;
                parseUInt(text: string): number;
                parseDouble(text: string): number;
            }
            export interface IPercentFormatterFactory {
                createPercentFormatter(languages: Windows.Foundation.Collections.IIterable<string>, geographicRegion: string): Windows.Globalization.NumberFormatting.PercentFormatter;
            }
            export class PercentFormatter implements Windows.Globalization.NumberFormatting.INumberFormatterOptions, Windows.Globalization.NumberFormatting.INumberFormatter, Windows.Globalization.NumberFormatting.INumberFormatter2, Windows.Globalization.NumberFormatting.INumberParser {
                constructor(languages: Windows.Foundation.Collections.IIterable<string>, geographicRegion: string);
                constructor();
                fractionDigits: number;
                geographicRegion: string;
                integerDigits: number;
                isDecimalPointAlwaysDisplayed: boolean;
                isGrouped: boolean;
                languages: Windows.Foundation.Collections.IVectorView<string>;
                numeralSystem: string;
                resolvedGeographicRegion: string;
                resolvedLanguage: string;
                format(value: number): string;
                formatInt(value: number): string;
                formatUInt(value: number): string;
                formatDouble(value: number): string;
                parseInt(text: string): number;
                parseUInt(text: string): number;
                parseDouble(text: string): number;
            }
            export interface IPermilleFormatterFactory {
                createPermilleFormatter(languages: Windows.Foundation.Collections.IIterable<string>, geographicRegion: string): Windows.Globalization.NumberFormatting.PermilleFormatter;
            }
            export class PermilleFormatter implements Windows.Globalization.NumberFormatting.INumberFormatterOptions, Windows.Globalization.NumberFormatting.INumberFormatter, Windows.Globalization.NumberFormatting.INumberFormatter2, Windows.Globalization.NumberFormatting.INumberParser {
                constructor(languages: Windows.Foundation.Collections.IIterable<string>, geographicRegion: string);
                constructor();
                fractionDigits: number;
                geographicRegion: string;
                integerDigits: number;
                isDecimalPointAlwaysDisplayed: boolean;
                isGrouped: boolean;
                languages: Windows.Foundation.Collections.IVectorView<string>;
                numeralSystem: string;
                resolvedGeographicRegion: string;
                resolvedLanguage: string;
                format(value: number): string;
                formatInt(value: number): string;
                formatUInt(value: number): string;
                formatDouble(value: number): string;
                parseInt(text: string): number;
                parseUInt(text: string): number;
                parseDouble(text: string): number;
            }
            export interface ICurrencyFormatterFactory {
                createCurrencyFormatterCode(currencyCode: string): Windows.Globalization.NumberFormatting.CurrencyFormatter;
                createCurrencyFormatterCodeContext(currencyCode: string, languages: Windows.Foundation.Collections.IIterable<string>, geographicRegion: string): Windows.Globalization.NumberFormatting.CurrencyFormatter;
            }
            export class CurrencyFormatter implements Windows.Globalization.NumberFormatting.ICurrencyFormatter, Windows.Globalization.NumberFormatting.INumberFormatterOptions, Windows.Globalization.NumberFormatting.INumberFormatter, Windows.Globalization.NumberFormatting.INumberFormatter2, Windows.Globalization.NumberFormatting.INumberParser {
                constructor(currencyCode: string);
                constructor(currencyCode: string, languages: Windows.Foundation.Collections.IIterable<string>, geographicRegion: string);
                currency: string;
                fractionDigits: number;
                geographicRegion: string;
                integerDigits: number;
                isDecimalPointAlwaysDisplayed: boolean;
                isGrouped: boolean;
                languages: Windows.Foundation.Collections.IVectorView<string>;
                numeralSystem: string;
                resolvedGeographicRegion: string;
                resolvedLanguage: string;
                format(value: number): string;
                formatInt(value: number): string;
                formatUInt(value: number): string;
                formatDouble(value: number): string;
                parseInt(text: string): number;
                parseUInt(text: string): number;
                parseDouble(text: string): number;
            }
            export interface ICurrencyFormatter extends Windows.Globalization.NumberFormatting.INumberFormatterOptions, Windows.Globalization.NumberFormatting.INumberFormatter, Windows.Globalization.NumberFormatting.INumberFormatter2, Windows.Globalization.NumberFormatting.INumberParser {
                currency: string;
            }
        }
    }
}
declare module Windows {
    export module Globalization {
        export module Collation {
            export interface ICharacterGrouping {
                first: string;
                label: string;
            }
            export class CharacterGrouping implements Windows.Globalization.Collation.ICharacterGrouping {
                first: string;
                label: string;
            }
            export interface ICharacterGroupings extends Windows.Foundation.Collections.IVectorView<Windows.Globalization.Collation.CharacterGrouping>, Windows.Foundation.Collections.IIterable<Windows.Globalization.Collation.CharacterGrouping> {
                lookup(text: string): string;
            }
            export class CharacterGroupings implements Windows.Globalization.Collation.ICharacterGroupings, Windows.Foundation.Collections.IVectorView<Windows.Globalization.Collation.CharacterGrouping>, Windows.Foundation.Collections.IIterable<Windows.Globalization.Collation.CharacterGrouping> {
                size: number;
                lookup(text: string): string;
                getAt(index: number): Windows.Globalization.Collation.CharacterGrouping;
                indexOf(value: Windows.Globalization.Collation.CharacterGrouping): { index: number; returnValue: boolean; };
                getMany(startIndex: number): { items: Windows.Globalization.Collation.CharacterGrouping[]; returnValue: number; };
                first(): Windows.Foundation.Collections.IIterator<Windows.Globalization.Collation.CharacterGrouping>;
                toString(): string;
                toLocaleString(): string;
                concat(...items: Windows.Globalization.Collation.CharacterGrouping[][]): Windows.Globalization.Collation.CharacterGrouping[];
                join(seperator: string): string;
                pop(): Windows.Globalization.Collation.CharacterGrouping;
                push(...items: Windows.Globalization.Collation.CharacterGrouping[]): void;
                reverse(): Windows.Globalization.Collation.CharacterGrouping[];
                shift(): Windows.Globalization.Collation.CharacterGrouping;
                slice(start: number): Windows.Globalization.Collation.CharacterGrouping[];
                slice(start: number, end: number): Windows.Globalization.Collation.CharacterGrouping[];
                sort(): Windows.Globalization.Collation.CharacterGrouping[];
                sort(compareFn: (a: Windows.Globalization.Collation.CharacterGrouping, b: Windows.Globalization.Collation.CharacterGrouping) => number): Windows.Globalization.Collation.CharacterGrouping[];
                splice(start: number): Windows.Globalization.Collation.CharacterGrouping[];
                splice(start: number, deleteCount: number, ...items: Windows.Globalization.Collation.CharacterGrouping[]): Windows.Globalization.Collation.CharacterGrouping[];
                unshift(...items: Windows.Globalization.Collation.CharacterGrouping[]): number;
                lastIndexOf(searchElement: Windows.Globalization.Collation.CharacterGrouping): number;
                lastIndexOf(searchElement: Windows.Globalization.Collation.CharacterGrouping, fromIndex: number): number;
                every(callbackfn: (value: Windows.Globalization.Collation.CharacterGrouping, index: number, array: Windows.Globalization.Collation.CharacterGrouping[]) => boolean): boolean;
                every(callbackfn: (value: Windows.Globalization.Collation.CharacterGrouping, index: number, array: Windows.Globalization.Collation.CharacterGrouping[]) => boolean, thisArg: any): boolean;
                some(callbackfn: (value: Windows.Globalization.Collation.CharacterGrouping, index: number, array: Windows.Globalization.Collation.CharacterGrouping[]) => boolean): boolean;
                some(callbackfn: (value: Windows.Globalization.Collation.CharacterGrouping, index: number, array: Windows.Globalization.Collation.CharacterGrouping[]) => boolean, thisArg: any): boolean;
                forEach(callbackfn: (value: Windows.Globalization.Collation.CharacterGrouping, index: number, array: Windows.Globalization.Collation.CharacterGrouping[]) => void ): void;
                forEach(callbackfn: (value: Windows.Globalization.Collation.CharacterGrouping, index: number, array: Windows.Globalization.Collation.CharacterGrouping[]) => void , thisArg: any): void;
                map(callbackfn: (value: Windows.Globalization.Collation.CharacterGrouping, index: number, array: Windows.Globalization.Collation.CharacterGrouping[]) => any): any[];
                map(callbackfn: (value: Windows.Globalization.Collation.CharacterGrouping, index: number, array: Windows.Globalization.Collation.CharacterGrouping[]) => any, thisArg: any): any[];
                filter(callbackfn: (value: Windows.Globalization.Collation.CharacterGrouping, index: number, array: Windows.Globalization.Collation.CharacterGrouping[]) => boolean): Windows.Globalization.Collation.CharacterGrouping[];
                filter(callbackfn: (value: Windows.Globalization.Collation.CharacterGrouping, index: number, array: Windows.Globalization.Collation.CharacterGrouping[]) => boolean, thisArg: any): Windows.Globalization.Collation.CharacterGrouping[];
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Globalization.Collation.CharacterGrouping[]) => any): any;
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Globalization.Collation.CharacterGrouping[]) => any, initialValue: any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Globalization.Collation.CharacterGrouping[]) => any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Globalization.Collation.CharacterGrouping[]) => any, initialValue: any): any;
                length: number;
            }
        }
    }
}
declare module Windows {
    export module Graphics {
        export module Display {
            export interface DisplayPropertiesEventHandler {
                (sender: any): void;
            }
            export enum DisplayOrientations {
                none,
                landscape,
                portrait,
                landscapeFlipped,
                portraitFlipped,
            }
            export enum ResolutionScale {
                invalid,
                scale100Percent,
                scale140Percent,
                scale180Percent,
            }
            export interface IDisplayPropertiesStatics {
                autoRotationPreferences: Windows.Graphics.Display.DisplayOrientations;
                currentOrientation: Windows.Graphics.Display.DisplayOrientations;
                logicalDpi: number;
                nativeOrientation: Windows.Graphics.Display.DisplayOrientations;
                resolutionScale: Windows.Graphics.Display.ResolutionScale;
                stereoEnabled: boolean;
                onorientationchanged: any/* TODO */;
                onlogicaldpichanged: any/* TODO */;
                onstereoenabledchanged: any/* TODO */;
                getColorProfileAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IRandomAccessStream>;
                oncolorprofilechanged: any/* TODO */;
                ondisplaycontentsinvalidated: any/* TODO */;
            }
            export class DisplayProperties {
                static autoRotationPreferences: Windows.Graphics.Display.DisplayOrientations;
                static currentOrientation: Windows.Graphics.Display.DisplayOrientations;
                static logicalDpi: number;
                static nativeOrientation: Windows.Graphics.Display.DisplayOrientations;
                static resolutionScale: Windows.Graphics.Display.ResolutionScale;
                static stereoEnabled: boolean;
                static onorientationchanged: any/* TODO */;
                static onlogicaldpichanged: any/* TODO */;
                static onstereoenabledchanged: any/* TODO */;
                static getColorProfileAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IRandomAccessStream>;
                static oncolorprofilechanged: any/* TODO */;
                static ondisplaycontentsinvalidated: any/* TODO */;
            }
        }
    }
}
declare module Windows {
    export module Graphics {
        export module Imaging {
            export enum BitmapPixelFormat {
                unknown,
                rgba16,
                rgba8,
                bgra8,
            }
            export enum BitmapAlphaMode {
                premultiplied,
                straight,
                ignore,
            }
            export enum BitmapInterpolationMode {
                nearestNeighbor,
                linear,
                cubic,
                fant,
            }
            export enum BitmapFlip {
                none,
                horizontal,
                vertical,
            }
            export enum BitmapRotation {
                none,
                clockwise90Degrees,
                clockwise180Degrees,
                clockwise270Degrees,
            }
            export interface BitmapBounds {
                x: number;
                y: number;
                width: number;
                height: number;
            }
            export enum ColorManagementMode {
                doNotColorManage,
                colorManageToSRgb,
            }
            export enum ExifOrientationMode {
                ignoreExifOrientation,
                respectExifOrientation,
            }
            export enum PngFilterMode {
                automatic,
                none,
                sub,
                up,
                average,
                paeth,
                adaptive,
            }
            export enum TiffCompressionMode {
                automatic,
                none,
                ccitt3,
                ccitt4,
                lzw,
                rle,
                zip,
                lzwhDifferencing,
            }
            export enum JpegSubsamplingMode {
                default,
                y4Cb2Cr0,
                y4Cb2Cr2,
                y4Cb4Cr4,
            }
            export interface IBitmapTransform {
                bounds: Windows.Graphics.Imaging.BitmapBounds;
                flip: Windows.Graphics.Imaging.BitmapFlip;
                interpolationMode: Windows.Graphics.Imaging.BitmapInterpolationMode;
                rotation: Windows.Graphics.Imaging.BitmapRotation;
                scaledHeight: number;
                scaledWidth: number;
            }
            export class BitmapTransform implements Windows.Graphics.Imaging.IBitmapTransform {
                bounds: Windows.Graphics.Imaging.BitmapBounds;
                flip: Windows.Graphics.Imaging.BitmapFlip;
                interpolationMode: Windows.Graphics.Imaging.BitmapInterpolationMode;
                rotation: Windows.Graphics.Imaging.BitmapRotation;
                scaledHeight: number;
                scaledWidth: number;
            }
            export interface IBitmapTypedValue {
                type: Windows.Foundation.PropertyType;
                value: any;
            }
            export interface IBitmapTypedValueFactory {
                create(value: any, type: Windows.Foundation.PropertyType): Windows.Graphics.Imaging.BitmapTypedValue;
            }
            export class BitmapTypedValue implements Windows.Graphics.Imaging.IBitmapTypedValue {
                constructor(value: any, type: Windows.Foundation.PropertyType);
                type: Windows.Foundation.PropertyType;
                value: any;
            }
            export class BitmapPropertySet implements Windows.Foundation.Collections.IMap<string, Windows.Graphics.Imaging.BitmapTypedValue>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, Windows.Graphics.Imaging.BitmapTypedValue>> {
                size: number;
                lookup(key: string): Windows.Graphics.Imaging.BitmapTypedValue;
                hasKey(key: string): boolean;
                getView(): Windows.Foundation.Collections.IMapView<string, Windows.Graphics.Imaging.BitmapTypedValue>;
                insert(key: string, value: Windows.Graphics.Imaging.BitmapTypedValue): boolean;
                remove(key: string): void;
                clear(): void;
                first(): Windows.Foundation.Collections.IIterator<Windows.Foundation.Collections.IKeyValuePair<string, Windows.Graphics.Imaging.BitmapTypedValue>>;
            }
            export interface IBitmapPropertiesView {
                getPropertiesAsync(propertiesToRetrieve: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.BitmapPropertySet>;
            }
            export interface IBitmapProperties extends Windows.Graphics.Imaging.IBitmapPropertiesView {
                setPropertiesAsync(propertiesToSet: Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, Windows.Graphics.Imaging.BitmapTypedValue>>): Windows.Foundation.IAsyncAction;
            }
            export class BitmapPropertiesView implements Windows.Graphics.Imaging.IBitmapPropertiesView {
                getPropertiesAsync(propertiesToRetrieve: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.BitmapPropertySet>;
            }
            export class BitmapProperties implements Windows.Graphics.Imaging.IBitmapProperties, Windows.Graphics.Imaging.IBitmapPropertiesView {
                setPropertiesAsync(propertiesToSet: Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, Windows.Graphics.Imaging.BitmapTypedValue>>): Windows.Foundation.IAsyncAction;
                getPropertiesAsync(propertiesToRetrieve: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.BitmapPropertySet>;
            }
            export interface IPixelDataProvider {
                detachPixelData(): Uint8Array;
            }
            export class PixelDataProvider implements Windows.Graphics.Imaging.IPixelDataProvider {
                detachPixelData(): Uint8Array;
            }
            export class ImageStream implements Windows.Storage.Streams.IRandomAccessStreamWithContentType, Windows.Storage.Streams.IRandomAccessStream, Windows.Foundation.IClosable, Windows.Storage.Streams.IInputStream, Windows.Storage.Streams.IOutputStream, Windows.Storage.Streams.IContentTypeProvider {
                canRead: boolean;
                canWrite: boolean;
                position: number;
                size: number;
                contentType: string;
                getInputStreamAt(position: number): Windows.Storage.Streams.IInputStream;
                getOutputStreamAt(position: number): Windows.Storage.Streams.IOutputStream;
                seek(position: number): void;
                cloneStream(): Windows.Storage.Streams.IRandomAccessStream;
                dispose(): void;
                readAsync(buffer: Windows.Storage.Streams.IBuffer, count: number, options: Windows.Storage.Streams.InputStreamOptions): Windows.Foundation.IAsyncOperationWithProgress<Windows.Storage.Streams.IBuffer, number>;
                writeAsync(buffer: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
                flushAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                close(): void;
            }
            export interface IBitmapFrame {
                bitmapAlphaMode: Windows.Graphics.Imaging.BitmapAlphaMode;
                bitmapPixelFormat: Windows.Graphics.Imaging.BitmapPixelFormat;
                bitmapProperties: Windows.Graphics.Imaging.BitmapPropertiesView;
                dpiX: number;
                dpiY: number;
                orientedPixelHeight: number;
                orientedPixelWidth: number;
                pixelHeight: number;
                pixelWidth: number;
                getThumbnailAsync(): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.ImageStream>;
                getPixelDataAsync(): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.PixelDataProvider>;
                getPixelDataAsync(pixelFormat: Windows.Graphics.Imaging.BitmapPixelFormat, alphaMode: Windows.Graphics.Imaging.BitmapAlphaMode, transform: Windows.Graphics.Imaging.BitmapTransform, exifOrientationMode: Windows.Graphics.Imaging.ExifOrientationMode, colorManagementMode: Windows.Graphics.Imaging.ColorManagementMode): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.PixelDataProvider>;
            }
            export class BitmapFrame implements Windows.Graphics.Imaging.IBitmapFrame {
                bitmapAlphaMode: Windows.Graphics.Imaging.BitmapAlphaMode;
                bitmapPixelFormat: Windows.Graphics.Imaging.BitmapPixelFormat;
                bitmapProperties: Windows.Graphics.Imaging.BitmapPropertiesView;
                dpiX: number;
                dpiY: number;
                orientedPixelHeight: number;
                orientedPixelWidth: number;
                pixelHeight: number;
                pixelWidth: number;
                getThumbnailAsync(): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.ImageStream>;
                getPixelDataAsync(): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.PixelDataProvider>;
                getPixelDataAsync(pixelFormat: Windows.Graphics.Imaging.BitmapPixelFormat, alphaMode: Windows.Graphics.Imaging.BitmapAlphaMode, transform: Windows.Graphics.Imaging.BitmapTransform, exifOrientationMode: Windows.Graphics.Imaging.ExifOrientationMode, colorManagementMode: Windows.Graphics.Imaging.ColorManagementMode): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.PixelDataProvider>;
            }
            export interface IBitmapCodecInformation {
                codecId: string;
                fileExtensions: Windows.Foundation.Collections.IVectorView<string>;
                friendlyName: string;
                mimeTypes: Windows.Foundation.Collections.IVectorView<string>;
            }
            export class BitmapCodecInformation implements Windows.Graphics.Imaging.IBitmapCodecInformation {
                codecId: string;
                fileExtensions: Windows.Foundation.Collections.IVectorView<string>;
                friendlyName: string;
                mimeTypes: Windows.Foundation.Collections.IVectorView<string>;
            }
            export interface IBitmapDecoderStatics {
                bmpDecoderId: string;
                gifDecoderId: string;
                icoDecoderId: string;
                jpegDecoderId: string;
                jpegXRDecoderId: string;
                pngDecoderId: string;
                tiffDecoderId: string;
                getDecoderInformationEnumerator(): Windows.Foundation.Collections.IVectorView<Windows.Graphics.Imaging.BitmapCodecInformation>;
                createAsync(stream: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.BitmapDecoder>;
                createAsync(decoderId: string, stream: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.BitmapDecoder>;
            }
            export class BitmapDecoder implements Windows.Graphics.Imaging.IBitmapDecoder, Windows.Graphics.Imaging.IBitmapFrame {
                bitmapContainerProperties: Windows.Graphics.Imaging.BitmapPropertiesView;
                decoderInformation: Windows.Graphics.Imaging.BitmapCodecInformation;
                frameCount: number;
                bitmapAlphaMode: Windows.Graphics.Imaging.BitmapAlphaMode;
                bitmapPixelFormat: Windows.Graphics.Imaging.BitmapPixelFormat;
                bitmapProperties: Windows.Graphics.Imaging.BitmapPropertiesView;
                dpiX: number;
                dpiY: number;
                orientedPixelHeight: number;
                orientedPixelWidth: number;
                pixelHeight: number;
                pixelWidth: number;
                getPreviewAsync(): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.ImageStream>;
                getFrameAsync(frameIndex: number): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.BitmapFrame>;
                getThumbnailAsync(): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.ImageStream>;
                getPixelDataAsync(): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.PixelDataProvider>;
                getPixelDataAsync(pixelFormat: Windows.Graphics.Imaging.BitmapPixelFormat, alphaMode: Windows.Graphics.Imaging.BitmapAlphaMode, transform: Windows.Graphics.Imaging.BitmapTransform, exifOrientationMode: Windows.Graphics.Imaging.ExifOrientationMode, colorManagementMode: Windows.Graphics.Imaging.ColorManagementMode): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.PixelDataProvider>;
                static bmpDecoderId: string;
                static gifDecoderId: string;
                static icoDecoderId: string;
                static jpegDecoderId: string;
                static jpegXRDecoderId: string;
                static pngDecoderId: string;
                static tiffDecoderId: string;
                static getDecoderInformationEnumerator(): Windows.Foundation.Collections.IVectorView<Windows.Graphics.Imaging.BitmapCodecInformation>;
                static createAsync(stream: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.BitmapDecoder>;
                static createAsync(decoderId: string, stream: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.BitmapDecoder>;
            }
            export interface IBitmapDecoder {
                bitmapContainerProperties: Windows.Graphics.Imaging.BitmapPropertiesView;
                decoderInformation: Windows.Graphics.Imaging.BitmapCodecInformation;
                frameCount: number;
                getPreviewAsync(): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.ImageStream>;
                getFrameAsync(frameIndex: number): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.BitmapFrame>;
            }
            export interface IBitmapEncoderStatics {
                bmpEncoderId: string;
                gifEncoderId: string;
                jpegEncoderId: string;
                jpegXREncoderId: string;
                pngEncoderId: string;
                tiffEncoderId: string;
                getEncoderInformationEnumerator(): Windows.Foundation.Collections.IVectorView<Windows.Graphics.Imaging.BitmapCodecInformation>;
                createAsync(encoderId: string, stream: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.BitmapEncoder>;
                createAsync(encoderId: string, stream: Windows.Storage.Streams.IRandomAccessStream, encodingOptions: Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, Windows.Graphics.Imaging.BitmapTypedValue>>): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.BitmapEncoder>;
                createForTranscodingAsync(stream: Windows.Storage.Streams.IRandomAccessStream, bitmapDecoder: Windows.Graphics.Imaging.BitmapDecoder): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.BitmapEncoder>;
                createForInPlacePropertyEncodingAsync(bitmapDecoder: Windows.Graphics.Imaging.BitmapDecoder): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.BitmapEncoder>;
            }
            export class BitmapEncoder implements Windows.Graphics.Imaging.IBitmapEncoder {
                bitmapContainerProperties: Windows.Graphics.Imaging.BitmapProperties;
                bitmapProperties: Windows.Graphics.Imaging.BitmapProperties;
                bitmapTransform: Windows.Graphics.Imaging.BitmapTransform;
                encoderInformation: Windows.Graphics.Imaging.BitmapCodecInformation;
                generatedThumbnailHeight: number;
                generatedThumbnailWidth: number;
                isThumbnailGenerated: boolean;
                setPixelData(pixelFormat: Windows.Graphics.Imaging.BitmapPixelFormat, alphaMode: Windows.Graphics.Imaging.BitmapAlphaMode, width: number, height: number, dpiX: number, dpiY: number, pixels: Uint8Array): void;
                goToNextFrameAsync(): Windows.Foundation.IAsyncAction;
                goToNextFrameAsync(encodingOptions: Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, Windows.Graphics.Imaging.BitmapTypedValue>>): Windows.Foundation.IAsyncAction;
                flushAsync(): Windows.Foundation.IAsyncAction;
                static bmpEncoderId: string;
                static gifEncoderId: string;
                static jpegEncoderId: string;
                static jpegXREncoderId: string;
                static pngEncoderId: string;
                static tiffEncoderId: string;
                static getEncoderInformationEnumerator(): Windows.Foundation.Collections.IVectorView<Windows.Graphics.Imaging.BitmapCodecInformation>;
                static createAsync(encoderId: string, stream: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.BitmapEncoder>;
                static createAsync(encoderId: string, stream: Windows.Storage.Streams.IRandomAccessStream, encodingOptions: Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, Windows.Graphics.Imaging.BitmapTypedValue>>): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.BitmapEncoder>;
                static createForTranscodingAsync(stream: Windows.Storage.Streams.IRandomAccessStream, bitmapDecoder: Windows.Graphics.Imaging.BitmapDecoder): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.BitmapEncoder>;
                static createForInPlacePropertyEncodingAsync(bitmapDecoder: Windows.Graphics.Imaging.BitmapDecoder): Windows.Foundation.IAsyncOperation<Windows.Graphics.Imaging.BitmapEncoder>;
            }
            export interface IBitmapEncoder {
                bitmapContainerProperties: Windows.Graphics.Imaging.BitmapProperties;
                bitmapProperties: Windows.Graphics.Imaging.BitmapProperties;
                bitmapTransform: Windows.Graphics.Imaging.BitmapTransform;
                encoderInformation: Windows.Graphics.Imaging.BitmapCodecInformation;
                generatedThumbnailHeight: number;
                generatedThumbnailWidth: number;
                isThumbnailGenerated: boolean;
                setPixelData(pixelFormat: Windows.Graphics.Imaging.BitmapPixelFormat, alphaMode: Windows.Graphics.Imaging.BitmapAlphaMode, width: number, height: number, dpiX: number, dpiY: number, pixels: Uint8Array): void;
                goToNextFrameAsync(): Windows.Foundation.IAsyncAction;
                goToNextFrameAsync(encodingOptions: Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, Windows.Graphics.Imaging.BitmapTypedValue>>): Windows.Foundation.IAsyncAction;
                flushAsync(): Windows.Foundation.IAsyncAction;
            }
        }
    }
}
declare module Windows {
    export module Graphics {
        export module Printing {
            export module OptionDetails {
                export enum PrintOptionStates {
                    none,
                    enabled,
                    constrained,
                }
                export enum PrintOptionType {
                    unknown,
                    number,
                    text,
                    itemList,
                }
                export interface IPrintOptionDetails {
                    errorText: string;
                    optionId: string;
                    optionType: Windows.Graphics.Printing.OptionDetails.PrintOptionType;
                    state: Windows.Graphics.Printing.OptionDetails.PrintOptionStates;
                    value: any;
                    trySetValue(value: any): boolean;
                }
                export interface IPrintNumberOptionDetails extends Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails {
                    maxValue: number;
                    minValue: number;
                }
                export interface IPrintTextOptionDetails extends Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails {
                    maxCharacters: number;
                }
                export interface IPrintItemListOptionDetails extends Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails {
                    items: Windows.Foundation.Collections.IVectorView<any>;
                }
                export class PrintCopiesOptionDetails implements Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintNumberOptionDetails {
                    errorText: string;
                    optionId: string;
                    optionType: Windows.Graphics.Printing.OptionDetails.PrintOptionType;
                    state: Windows.Graphics.Printing.OptionDetails.PrintOptionStates;
                    value: any;
                    maxValue: number;
                    minValue: number;
                    trySetValue(value: any): boolean;
                }
                export class PrintMediaSizeOptionDetails implements Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintItemListOptionDetails {
                    errorText: string;
                    optionId: string;
                    optionType: Windows.Graphics.Printing.OptionDetails.PrintOptionType;
                    state: Windows.Graphics.Printing.OptionDetails.PrintOptionStates;
                    value: any;
                    items: Windows.Foundation.Collections.IVectorView<any>;
                    trySetValue(value: any): boolean;
                }
                export class PrintMediaTypeOptionDetails implements Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintItemListOptionDetails {
                    errorText: string;
                    optionId: string;
                    optionType: Windows.Graphics.Printing.OptionDetails.PrintOptionType;
                    state: Windows.Graphics.Printing.OptionDetails.PrintOptionStates;
                    value: any;
                    items: Windows.Foundation.Collections.IVectorView<any>;
                    trySetValue(value: any): boolean;
                }
                export class PrintOrientationOptionDetails implements Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintItemListOptionDetails {
                    errorText: string;
                    optionId: string;
                    optionType: Windows.Graphics.Printing.OptionDetails.PrintOptionType;
                    state: Windows.Graphics.Printing.OptionDetails.PrintOptionStates;
                    value: any;
                    items: Windows.Foundation.Collections.IVectorView<any>;
                    trySetValue(value: any): boolean;
                }
                export class PrintQualityOptionDetails implements Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintItemListOptionDetails {
                    errorText: string;
                    optionId: string;
                    optionType: Windows.Graphics.Printing.OptionDetails.PrintOptionType;
                    state: Windows.Graphics.Printing.OptionDetails.PrintOptionStates;
                    value: any;
                    items: Windows.Foundation.Collections.IVectorView<any>;
                    trySetValue(value: any): boolean;
                }
                export class PrintColorModeOptionDetails implements Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintItemListOptionDetails {
                    errorText: string;
                    optionId: string;
                    optionType: Windows.Graphics.Printing.OptionDetails.PrintOptionType;
                    state: Windows.Graphics.Printing.OptionDetails.PrintOptionStates;
                    value: any;
                    items: Windows.Foundation.Collections.IVectorView<any>;
                    trySetValue(value: any): boolean;
                }
                export class PrintDuplexOptionDetails implements Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintItemListOptionDetails {
                    errorText: string;
                    optionId: string;
                    optionType: Windows.Graphics.Printing.OptionDetails.PrintOptionType;
                    state: Windows.Graphics.Printing.OptionDetails.PrintOptionStates;
                    value: any;
                    items: Windows.Foundation.Collections.IVectorView<any>;
                    trySetValue(value: any): boolean;
                }
                export class PrintCollationOptionDetails implements Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintItemListOptionDetails {
                    errorText: string;
                    optionId: string;
                    optionType: Windows.Graphics.Printing.OptionDetails.PrintOptionType;
                    state: Windows.Graphics.Printing.OptionDetails.PrintOptionStates;
                    value: any;
                    items: Windows.Foundation.Collections.IVectorView<any>;
                    trySetValue(value: any): boolean;
                }
                export class PrintStapleOptionDetails implements Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintItemListOptionDetails {
                    errorText: string;
                    optionId: string;
                    optionType: Windows.Graphics.Printing.OptionDetails.PrintOptionType;
                    state: Windows.Graphics.Printing.OptionDetails.PrintOptionStates;
                    value: any;
                    items: Windows.Foundation.Collections.IVectorView<any>;
                    trySetValue(value: any): boolean;
                }
                export class PrintHolePunchOptionDetails implements Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintItemListOptionDetails {
                    errorText: string;
                    optionId: string;
                    optionType: Windows.Graphics.Printing.OptionDetails.PrintOptionType;
                    state: Windows.Graphics.Printing.OptionDetails.PrintOptionStates;
                    value: any;
                    items: Windows.Foundation.Collections.IVectorView<any>;
                    trySetValue(value: any): boolean;
                }
                export class PrintBindingOptionDetails implements Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintItemListOptionDetails {
                    errorText: string;
                    optionId: string;
                    optionType: Windows.Graphics.Printing.OptionDetails.PrintOptionType;
                    state: Windows.Graphics.Printing.OptionDetails.PrintOptionStates;
                    value: any;
                    items: Windows.Foundation.Collections.IVectorView<any>;
                    trySetValue(value: any): boolean;
                }
                export interface IPrintCustomOptionDetails extends Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails {
                    displayName: string;
                }
                export interface IPrintCustomTextOptionDetails extends Windows.Graphics.Printing.OptionDetails.IPrintCustomOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails {
                    maxCharacters: number;
                }
                export class PrintCustomTextOptionDetails implements Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintCustomOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintCustomTextOptionDetails {
                    errorText: string;
                    optionId: string;
                    optionType: Windows.Graphics.Printing.OptionDetails.PrintOptionType;
                    state: Windows.Graphics.Printing.OptionDetails.PrintOptionStates;
                    value: any;
                    displayName: string;
                    maxCharacters: number;
                    trySetValue(value: any): boolean;
                }
                export interface IPrintCustomItemDetails {
                    itemDisplayName: string;
                    itemId: string;
                }
                export class PrintCustomItemDetails implements Windows.Graphics.Printing.OptionDetails.IPrintCustomItemDetails {
                    itemDisplayName: string;
                    itemId: string;
                }
                export interface IPrintCustomItemListOptionDetails extends Windows.Graphics.Printing.OptionDetails.IPrintItemListOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintCustomOptionDetails {
                    addItem(itemId: string, displayName: string): void;
                }
                export class PrintCustomItemListOptionDetails implements Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintCustomOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintItemListOptionDetails, Windows.Graphics.Printing.OptionDetails.IPrintCustomItemListOptionDetails {
                    errorText: string;
                    optionId: string;
                    optionType: Windows.Graphics.Printing.OptionDetails.PrintOptionType;
                    state: Windows.Graphics.Printing.OptionDetails.PrintOptionStates;
                    value: any;
                    displayName: string;
                    items: Windows.Foundation.Collections.IVectorView<any>;
                    trySetValue(value: any): boolean;
                    addItem(itemId: string, displayName: string): void;
                }
                export interface IPrintTaskOptionChangedEventArgs {
                    optionId: any;
                }
                export class PrintTaskOptionChangedEventArgs implements Windows.Graphics.Printing.OptionDetails.IPrintTaskOptionChangedEventArgs {
                    optionId: any;
                }
                export interface IPrintTaskOptionDetails {
                    options: Windows.Foundation.Collections.IMapView<string, Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails>;
                    createItemListOption(optionId: string, displayName: string): Windows.Graphics.Printing.OptionDetails.PrintCustomItemListOptionDetails;
                    createTextOption(optionId: string, displayName: string): Windows.Graphics.Printing.OptionDetails.PrintCustomTextOptionDetails;
                    onoptionchanged: any/* TODO */;
                    onbeginvalidation: any/* TODO */;
                }
                export class PrintTaskOptionDetails implements Windows.Graphics.Printing.OptionDetails.IPrintTaskOptionDetails, Windows.Graphics.Printing.IPrintTaskOptionsCore, Windows.Graphics.Printing.IPrintTaskOptionsCoreUIConfiguration {
                    options: Windows.Foundation.Collections.IMapView<string, Windows.Graphics.Printing.OptionDetails.IPrintOptionDetails>;
                    displayedOptions: Windows.Foundation.Collections.IVector<string>;
                    createItemListOption(optionId: string, displayName: string): Windows.Graphics.Printing.OptionDetails.PrintCustomItemListOptionDetails;
                    createTextOption(optionId: string, displayName: string): Windows.Graphics.Printing.OptionDetails.PrintCustomTextOptionDetails;
                    onoptionchanged: any/* TODO */;
                    onbeginvalidation: any/* TODO */;
                    getPageDescription(jobPageNumber: number): Windows.Graphics.Printing.PrintPageDescription;
                    static getFromPrintTaskOptions(printTaskOptions: Windows.Graphics.Printing.PrintTaskOptions): Windows.Graphics.Printing.OptionDetails.PrintTaskOptionDetails;
                }
                export interface IPrintTaskOptionDetailsStatic {
                    getFromPrintTaskOptions(printTaskOptions: Windows.Graphics.Printing.PrintTaskOptions): Windows.Graphics.Printing.OptionDetails.PrintTaskOptionDetails;
                }
            }
        }
    }
}
declare module Windows {
    export module Graphics {
        export module Printing {
            export interface PrintPageDescription {
                pageSize: Windows.Foundation.Size;
                imageableRect: Windows.Foundation.Rect;
                dpiX: number;
                dpiY: number;
            }
            export enum PrintMediaSize {
                default,
                notAvailable,
                printerCustom,
                businessCard,
                creditCard,
                isoA0,
                isoA1,
                isoA10,
                isoA2,
                isoA3,
                isoA3Extra,
                isoA3Rotated,
                isoA4,
                isoA4Extra,
                isoA4Rotated,
                isoA5,
                isoA5Extra,
                isoA5Rotated,
                isoA6,
                isoA6Rotated,
                isoA7,
                isoA8,
                isoA9,
                isoB0,
                isoB1,
                isoB10,
                isoB2,
                isoB3,
                isoB4,
                isoB4Envelope,
                isoB5Envelope,
                isoB5Extra,
                isoB7,
                isoB8,
                isoB9,
                isoC0,
                isoC1,
                isoC10,
                isoC2,
                isoC3,
                isoC3Envelope,
                isoC4,
                isoC4Envelope,
                isoC5,
                isoC5Envelope,
                isoC6,
                isoC6C5Envelope,
                isoC6Envelope,
                isoC7,
                isoC8,
                isoC9,
                isoDLEnvelope,
                isoDLEnvelopeRotated,
                isoSRA3,
                japan2LPhoto,
                japanChou3Envelope,
                japanChou3EnvelopeRotated,
                japanChou4Envelope,
                japanChou4EnvelopeRotated,
                japanDoubleHagakiPostcard,
                japanDoubleHagakiPostcardRotated,
                japanHagakiPostcard,
                japanHagakiPostcardRotated,
                japanKaku2Envelope,
                japanKaku2EnvelopeRotated,
                japanKaku3Envelope,
                japanKaku3EnvelopeRotated,
                japanLPhoto,
                japanQuadrupleHagakiPostcard,
                japanYou1Envelope,
                japanYou2Envelope,
                japanYou3Envelope,
                japanYou4Envelope,
                japanYou4EnvelopeRotated,
                japanYou6Envelope,
                japanYou6EnvelopeRotated,
                jisB0,
                jisB1,
                jisB10,
                jisB2,
                jisB3,
                jisB4,
                jisB4Rotated,
                jisB5,
                jisB5Rotated,
                jisB6,
                jisB6Rotated,
                jisB7,
                jisB8,
                jisB9,
                northAmerica10x11,
                northAmerica10x12,
                northAmerica10x14,
                northAmerica11x17,
                northAmerica14x17,
                northAmerica4x6,
                northAmerica4x8,
                northAmerica5x7,
                northAmerica8x10,
                northAmerica9x11,
                northAmericaArchitectureASheet,
                northAmericaArchitectureBSheet,
                northAmericaArchitectureCSheet,
                northAmericaArchitectureDSheet,
                northAmericaArchitectureESheet,
                northAmericaCSheet,
                northAmericaDSheet,
                northAmericaESheet,
                northAmericaExecutive,
                northAmericaGermanLegalFanfold,
                northAmericaGermanStandardFanfold,
                northAmericaLegal,
                northAmericaLegalExtra,
                northAmericaLetter,
                northAmericaLetterExtra,
                northAmericaLetterPlus,
                northAmericaLetterRotated,
                northAmericaMonarchEnvelope,
                northAmericaNote,
                northAmericaNumber10Envelope,
                northAmericaNumber10EnvelopeRotated,
                northAmericaNumber11Envelope,
                northAmericaNumber12Envelope,
                northAmericaNumber14Envelope,
                northAmericaNumber9Envelope,
                northAmericaPersonalEnvelope,
                northAmericaQuarto,
                northAmericaStatement,
                northAmericaSuperA,
                northAmericaSuperB,
                northAmericaTabloid,
                northAmericaTabloidExtra,
                otherMetricA3Plus,
                otherMetricA4Plus,
                otherMetricFolio,
                otherMetricInviteEnvelope,
                otherMetricItalianEnvelope,
                prc10Envelope,
                prc10EnvelopeRotated,
                prc16K,
                prc16KRotated,
                prc1Envelope,
                prc1EnvelopeRotated,
                prc2Envelope,
                prc2EnvelopeRotated,
                prc32K,
                prc32KBig,
                prc32KRotated,
                prc3Envelope,
                prc3EnvelopeRotated,
                prc4Envelope,
                prc4EnvelopeRotated,
                prc5Envelope,
                prc5EnvelopeRotated,
                prc6Envelope,
                prc6EnvelopeRotated,
                prc7Envelope,
                prc7EnvelopeRotated,
                prc8Envelope,
                prc8EnvelopeRotated,
                prc9Envelope,
                prc9EnvelopeRotated,
                roll04Inch,
                roll06Inch,
                roll08Inch,
                roll12Inch,
                roll15Inch,
                roll18Inch,
                roll22Inch,
                roll24Inch,
                roll30Inch,
                roll36Inch,
                roll54Inch,
            }
            export enum PrintMediaType {
                default,
                notAvailable,
                printerCustom,
                autoSelect,
                archival,
                backPrintFilm,
                bond,
                cardStock,
                continuous,
                envelopePlain,
                envelopeWindow,
                fabric,
                highResolution,
                label,
                multiLayerForm,
                multiPartForm,
                photographic,
                photographicFilm,
                photographicGlossy,
                photographicHighGloss,
                photographicMatte,
                photographicSatin,
                photographicSemiGloss,
                plain,
                screen,
                screenPaged,
                stationery,
                tabStockFull,
                tabStockPreCut,
                transparency,
                tShirtTransfer,
                none,
            }
            export enum PrintOrientation {
                default,
                notAvailable,
                printerCustom,
                portrait,
                portraitFlipped,
                landscape,
                landscapeFlipped,
            }
            export enum PrintQuality {
                default,
                notAvailable,
                printerCustom,
                automatic,
                draft,
                fax,
                high,
                normal,
                photographic,
                text,
            }
            export enum PrintColorMode {
                default,
                notAvailable,
                printerCustom,
                color,
                grayscale,
                monochrome,
            }
            export enum PrintDuplex {
                default,
                notAvailable,
                printerCustom,
                oneSided,
                twoSidedShortEdge,
                twoSidedLongEdge,
            }
            export enum PrintCollation {
                default,
                notAvailable,
                printerCustom,
                collated,
                uncollated,
            }
            export enum PrintStaple {
                default,
                notAvailable,
                printerCustom,
                none,
                stapleTopLeft,
                stapleTopRight,
                stapleBottomLeft,
                stapleBottomRight,
                stapleDualLeft,
                stapleDualRight,
                stapleDualTop,
                stapleDualBottom,
                saddleStitch,
            }
            export enum PrintHolePunch {
                default,
                notAvailable,
                printerCustom,
                none,
                leftEdge,
                rightEdge,
                topEdge,
                bottomEdge,
            }
            export enum PrintBinding {
                default,
                notAvailable,
                printerCustom,
                none,
                bale,
                bindBottom,
                bindLeft,
                bindRight,
                bindTop,
                booklet,
                edgeStitchBottom,
                edgeStitchLeft,
                edgeStitchRight,
                edgeStitchTop,
                fold,
                jogOffset,
                trim,
            }
            export interface IPrintTaskOptionsCoreProperties {
                binding: Windows.Graphics.Printing.PrintBinding;
                collation: Windows.Graphics.Printing.PrintCollation;
                colorMode: Windows.Graphics.Printing.PrintColorMode;
                duplex: Windows.Graphics.Printing.PrintDuplex;
                holePunch: Windows.Graphics.Printing.PrintHolePunch;
                maxCopies: number;
                mediaSize: Windows.Graphics.Printing.PrintMediaSize;
                mediaType: Windows.Graphics.Printing.PrintMediaType;
                minCopies: number;
                numberOfCopies: number;
                orientation: Windows.Graphics.Printing.PrintOrientation;
                printQuality: Windows.Graphics.Printing.PrintQuality;
                staple: Windows.Graphics.Printing.PrintStaple;
            }
            export interface IPrintTaskOptionsCoreUIConfiguration {
                displayedOptions: Windows.Foundation.Collections.IVector<string>;
            }
            export interface IPrintTaskOptionsCore {
                getPageDescription(jobPageNumber: number): Windows.Graphics.Printing.PrintPageDescription;
            }
            export class PrintTaskOptions implements Windows.Graphics.Printing.IPrintTaskOptionsCore, Windows.Graphics.Printing.IPrintTaskOptionsCoreProperties, Windows.Graphics.Printing.IPrintTaskOptionsCoreUIConfiguration {
                binding: Windows.Graphics.Printing.PrintBinding;
                collation: Windows.Graphics.Printing.PrintCollation;
                colorMode: Windows.Graphics.Printing.PrintColorMode;
                duplex: Windows.Graphics.Printing.PrintDuplex;
                holePunch: Windows.Graphics.Printing.PrintHolePunch;
                maxCopies: number;
                mediaSize: Windows.Graphics.Printing.PrintMediaSize;
                mediaType: Windows.Graphics.Printing.PrintMediaType;
                minCopies: number;
                numberOfCopies: number;
                orientation: Windows.Graphics.Printing.PrintOrientation;
                printQuality: Windows.Graphics.Printing.PrintQuality;
                staple: Windows.Graphics.Printing.PrintStaple;
                displayedOptions: Windows.Foundation.Collections.IVector<string>;
                getPageDescription(jobPageNumber: number): Windows.Graphics.Printing.PrintPageDescription;
            }
            export interface IStandardPrintTaskOptionsStatic {
                binding: string;
                collation: string;
                colorMode: string;
                copies: string;
                duplex: string;
                holePunch: string;
                inputBin: string;
                mediaSize: string;
                mediaType: string;
                nUp: string;
                orientation: string;
                printQuality: string;
                staple: string;
            }
            export class StandardPrintTaskOptions {
                static binding: string;
                static collation: string;
                static colorMode: string;
                static copies: string;
                static duplex: string;
                static holePunch: string;
                static inputBin: string;
                static mediaSize: string;
                static mediaType: string;
                static nUp: string;
                static orientation: string;
                static printQuality: string;
                static staple: string;
            }
            export interface IPrintDocumentSource {
            }
            export interface IPrintTaskProgressingEventArgs {
                documentPageCount: number;
            }
            export class PrintTaskProgressingEventArgs implements Windows.Graphics.Printing.IPrintTaskProgressingEventArgs {
                documentPageCount: number;
            }
            export enum PrintTaskCompletion {
                abandoned,
                canceled,
                failed,
                submitted,
            }
            export interface IPrintTaskCompletedEventArgs {
                completion: Windows.Graphics.Printing.PrintTaskCompletion;
            }
            export class PrintTaskCompletedEventArgs implements Windows.Graphics.Printing.IPrintTaskCompletedEventArgs {
                completion: Windows.Graphics.Printing.PrintTaskCompletion;
            }
            export interface IPrintTask {
                options: Windows.Graphics.Printing.PrintTaskOptions;
                properties: Windows.ApplicationModel.DataTransfer.DataPackagePropertySet;
                source: Windows.Graphics.Printing.IPrintDocumentSource;
                onpreviewing: any/* TODO */;
                onsubmitting: any/* TODO */;
                onprogressing: any/* TODO */;
                oncompleted: any/* TODO */;
            }
            export class PrintTask implements Windows.Graphics.Printing.IPrintTask {
                options: Windows.Graphics.Printing.PrintTaskOptions;
                properties: Windows.ApplicationModel.DataTransfer.DataPackagePropertySet;
                source: Windows.Graphics.Printing.IPrintDocumentSource;
                onpreviewing: any/* TODO */;
                onsubmitting: any/* TODO */;
                onprogressing: any/* TODO */;
                oncompleted: any/* TODO */;
            }
            export interface IPrintTaskSourceRequestedDeferral {
                complete(): void;
            }
            export class PrintTaskSourceRequestedDeferral implements Windows.Graphics.Printing.IPrintTaskSourceRequestedDeferral {
                complete(): void;
            }
            export interface IPrintTaskSourceRequestedArgs {
                deadline: Date;
                setSource(source: Windows.Graphics.Printing.IPrintDocumentSource): void;
                getDeferral(): Windows.Graphics.Printing.PrintTaskSourceRequestedDeferral;
            }
            export class PrintTaskSourceRequestedArgs implements Windows.Graphics.Printing.IPrintTaskSourceRequestedArgs {
                deadline: Date;
                setSource(source: Windows.Graphics.Printing.IPrintDocumentSource): void;
                getDeferral(): Windows.Graphics.Printing.PrintTaskSourceRequestedDeferral;
            }
            export interface PrintTaskSourceRequestedHandler {
                (args: Windows.Graphics.Printing.PrintTaskSourceRequestedArgs): void;
            }
            export interface IPrintTaskRequestedDeferral {
                complete(): void;
            }
            export class PrintTaskRequestedDeferral implements Windows.Graphics.Printing.IPrintTaskRequestedDeferral {
                complete(): void;
            }
            export interface IPrintTaskRequest {
                deadline: Date;
                createPrintTask(title: string, handler: Windows.Graphics.Printing.PrintTaskSourceRequestedHandler): Windows.Graphics.Printing.PrintTask;
                getDeferral(): Windows.Graphics.Printing.PrintTaskRequestedDeferral;
            }
            export class PrintTaskRequest implements Windows.Graphics.Printing.IPrintTaskRequest {
                deadline: Date;
                createPrintTask(title: string, handler: Windows.Graphics.Printing.PrintTaskSourceRequestedHandler): Windows.Graphics.Printing.PrintTask;
                getDeferral(): Windows.Graphics.Printing.PrintTaskRequestedDeferral;
            }
            export interface IPrintTaskRequestedEventArgs {
                request: Windows.Graphics.Printing.PrintTaskRequest;
            }
            export class PrintTaskRequestedEventArgs implements Windows.Graphics.Printing.IPrintTaskRequestedEventArgs {
                request: Windows.Graphics.Printing.PrintTaskRequest;
            }
            export interface IPrintManagerStatic {
                getForCurrentView(): Windows.Graphics.Printing.PrintManager;
                showPrintUIAsync(): Windows.Foundation.IAsyncOperation<boolean>;
            }
            export class PrintManager implements Windows.Graphics.Printing.IPrintManager {
                onprinttaskrequested: any/* TODO */;
                static getForCurrentView(): Windows.Graphics.Printing.PrintManager;
                static showPrintUIAsync(): Windows.Foundation.IAsyncOperation<boolean>;
            }
            export interface IPrintManager {
                onprinttaskrequested: any/* TODO */;
            }
        }
    }
}
declare module Windows {
    export module Management {
        export module Deployment {
            export enum DeploymentProgressState {
                queued,
                processing,
            }
            export interface DeploymentProgress {
                state: Windows.Management.Deployment.DeploymentProgressState;
                percentage: number;
            }
            export enum DeploymentOptions {
                none,
                forceApplicationShutdown,
                developmentMode,
            }
            export interface IDeploymentResult {
                activityId: string;
                errorText: string;
                extendedErrorCode: number;
            }
            export class DeploymentResult implements Windows.Management.Deployment.IDeploymentResult {
                activityId: string;
                errorText: string;
                extendedErrorCode: number;
            }
            export enum PackageInstallState {
                notInstalled,
                staged,
                installed,
            }
            export interface IPackageUserInformation {
                installState: Windows.Management.Deployment.PackageInstallState;
                userSecurityId: string;
            }
            export class PackageUserInformation implements Windows.Management.Deployment.IPackageUserInformation {
                installState: Windows.Management.Deployment.PackageInstallState;
                userSecurityId: string;
            }
            export enum PackageState {
                normal,
                licenseInvalid,
                modified,
                tampered,
            }
            export interface IPackageManager {
                addPackageAsync(packageUri: Windows.Foundation.Uri, dependencyPackageUris: Windows.Foundation.Collections.IIterable<Windows.Foundation.Uri>, deploymentOptions: Windows.Management.Deployment.DeploymentOptions): Windows.Foundation.IAsyncOperationWithProgress<Windows.Management.Deployment.DeploymentResult, Windows.Management.Deployment.DeploymentProgress>;
                updatePackageAsync(packageUri: Windows.Foundation.Uri, dependencyPackageUris: Windows.Foundation.Collections.IIterable<Windows.Foundation.Uri>, deploymentOptions: Windows.Management.Deployment.DeploymentOptions): Windows.Foundation.IAsyncOperationWithProgress<Windows.Management.Deployment.DeploymentResult, Windows.Management.Deployment.DeploymentProgress>;
                removePackageAsync(packageFullName: string): Windows.Foundation.IAsyncOperationWithProgress<Windows.Management.Deployment.DeploymentResult, Windows.Management.Deployment.DeploymentProgress>;
                stagePackageAsync(packageUri: Windows.Foundation.Uri, dependencyPackageUris: Windows.Foundation.Collections.IIterable<Windows.Foundation.Uri>): Windows.Foundation.IAsyncOperationWithProgress<Windows.Management.Deployment.DeploymentResult, Windows.Management.Deployment.DeploymentProgress>;
                registerPackageAsync(manifestUri: Windows.Foundation.Uri, dependencyPackageUris: Windows.Foundation.Collections.IIterable<Windows.Foundation.Uri>, deploymentOptions: Windows.Management.Deployment.DeploymentOptions): Windows.Foundation.IAsyncOperationWithProgress<Windows.Management.Deployment.DeploymentResult, Windows.Management.Deployment.DeploymentProgress>;
                findPackages(): Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Package>;
                findPackagesForUser(userSecurityId: string): Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Package>;
                findPackages(packageName: string, packagePublisher: string): Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Package>;
                findPackagesForUser(userSecurityId: string, packageName: string, packagePublisher: string): Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Package>;
                findUsers(packageFullName: string): Windows.Foundation.Collections.IIterable<Windows.Management.Deployment.PackageUserInformation>;
                setPackageState(packageFullName: string, packageState: Windows.Management.Deployment.PackageState): void;
                findPackage(packageFullName: string): Windows.ApplicationModel.Package;
                cleanupPackageForUserAsync(packageName: string, userSecurityId: string): Windows.Foundation.IAsyncOperationWithProgress<Windows.Management.Deployment.DeploymentResult, Windows.Management.Deployment.DeploymentProgress>;
                findPackages(packageFamilyName: string): Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Package>;
                findPackagesForUser(userSecurityId: string, packageFamilyName: string): Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Package>;
                findPackageForUser(userSecurityId: string, packageFullName: string): Windows.ApplicationModel.Package;
            }
            export class PackageManager implements Windows.Management.Deployment.IPackageManager {
                addPackageAsync(packageUri: Windows.Foundation.Uri, dependencyPackageUris: Windows.Foundation.Collections.IIterable<Windows.Foundation.Uri>, deploymentOptions: Windows.Management.Deployment.DeploymentOptions): Windows.Foundation.IAsyncOperationWithProgress<Windows.Management.Deployment.DeploymentResult, Windows.Management.Deployment.DeploymentProgress>;
                updatePackageAsync(packageUri: Windows.Foundation.Uri, dependencyPackageUris: Windows.Foundation.Collections.IIterable<Windows.Foundation.Uri>, deploymentOptions: Windows.Management.Deployment.DeploymentOptions): Windows.Foundation.IAsyncOperationWithProgress<Windows.Management.Deployment.DeploymentResult, Windows.Management.Deployment.DeploymentProgress>;
                removePackageAsync(packageFullName: string): Windows.Foundation.IAsyncOperationWithProgress<Windows.Management.Deployment.DeploymentResult, Windows.Management.Deployment.DeploymentProgress>;
                stagePackageAsync(packageUri: Windows.Foundation.Uri, dependencyPackageUris: Windows.Foundation.Collections.IIterable<Windows.Foundation.Uri>): Windows.Foundation.IAsyncOperationWithProgress<Windows.Management.Deployment.DeploymentResult, Windows.Management.Deployment.DeploymentProgress>;
                registerPackageAsync(manifestUri: Windows.Foundation.Uri, dependencyPackageUris: Windows.Foundation.Collections.IIterable<Windows.Foundation.Uri>, deploymentOptions: Windows.Management.Deployment.DeploymentOptions): Windows.Foundation.IAsyncOperationWithProgress<Windows.Management.Deployment.DeploymentResult, Windows.Management.Deployment.DeploymentProgress>;
                findPackages(): Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Package>;
                findPackagesForUser(userSecurityId: string): Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Package>;
                findPackages(packageName: string, packagePublisher: string): Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Package>;
                findPackagesForUser(userSecurityId: string, packageName: string, packagePublisher: string): Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Package>;
                findUsers(packageFullName: string): Windows.Foundation.Collections.IIterable<Windows.Management.Deployment.PackageUserInformation>;
                setPackageState(packageFullName: string, packageState: Windows.Management.Deployment.PackageState): void;
                findPackage(packageFullName: string): Windows.ApplicationModel.Package;
                cleanupPackageForUserAsync(packageName: string, userSecurityId: string): Windows.Foundation.IAsyncOperationWithProgress<Windows.Management.Deployment.DeploymentResult, Windows.Management.Deployment.DeploymentProgress>;
                findPackages(packageFamilyName: string): Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Package>;
                findPackagesForUser(userSecurityId: string, packageFamilyName: string): Windows.Foundation.Collections.IIterable<Windows.ApplicationModel.Package>;
                findPackageForUser(userSecurityId: string, packageFullName: string): Windows.ApplicationModel.Package;
            }
        }
    }
}
declare module Windows {
    export module Management {
        export module Core {
            export interface IApplicationDataManagerStatics {
                createForPackageFamily(packageFamilyName: string): Windows.Storage.ApplicationData;
            }
            export interface IApplicationDataManager {
            }
            export class ApplicationDataManager implements Windows.Management.Core.IApplicationDataManager {
                static createForPackageFamily(packageFamilyName: string): Windows.Storage.ApplicationData;
            }
        }
    }
}
declare module Windows {
    export module Media {
        export module Capture {
            export enum CameraCaptureUIMode {
                photoOrVideo,
                photo,
                video,
            }
            export enum CameraCaptureUIPhotoFormat {
                jpeg,
                png,
                jpegXR,
            }
            export enum CameraCaptureUIVideoFormat {
                mp4,
                wmv,
            }
            export enum CameraCaptureUIMaxVideoResolution {
                highestAvailable,
                lowDefinition,
                standardDefinition,
                highDefinition,
            }
            export enum CameraCaptureUIMaxPhotoResolution {
                highestAvailable,
                verySmallQvga,
                smallVga,
                mediumXga,
                large3M,
                veryLarge5M,
            }
            export interface ICameraCaptureUIPhotoCaptureSettings {
                allowCropping: boolean;
                croppedAspectRatio: Windows.Foundation.Size;
                croppedSizeInPixels: Windows.Foundation.Size;
                format: Windows.Media.Capture.CameraCaptureUIPhotoFormat;
                maxResolution: Windows.Media.Capture.CameraCaptureUIMaxPhotoResolution;
            }
            export class CameraCaptureUIPhotoCaptureSettings implements Windows.Media.Capture.ICameraCaptureUIPhotoCaptureSettings {
                allowCropping: boolean;
                croppedAspectRatio: Windows.Foundation.Size;
                croppedSizeInPixels: Windows.Foundation.Size;
                format: Windows.Media.Capture.CameraCaptureUIPhotoFormat;
                maxResolution: Windows.Media.Capture.CameraCaptureUIMaxPhotoResolution;
            }
            export interface ICameraCaptureUIVideoCaptureSettings {
                allowTrimming: boolean;
                format: Windows.Media.Capture.CameraCaptureUIVideoFormat;
                maxDurationInSeconds: number;
                maxResolution: Windows.Media.Capture.CameraCaptureUIMaxVideoResolution;
            }
            export class CameraCaptureUIVideoCaptureSettings implements Windows.Media.Capture.ICameraCaptureUIVideoCaptureSettings {
                allowTrimming: boolean;
                format: Windows.Media.Capture.CameraCaptureUIVideoFormat;
                maxDurationInSeconds: number;
                maxResolution: Windows.Media.Capture.CameraCaptureUIMaxVideoResolution;
            }
            export interface ICameraCaptureUI {
                photoSettings: Windows.Media.Capture.CameraCaptureUIPhotoCaptureSettings;
                videoSettings: Windows.Media.Capture.CameraCaptureUIVideoCaptureSettings;
                captureFileAsync(mode: Windows.Media.Capture.CameraCaptureUIMode): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            }
            export class CameraCaptureUI implements Windows.Media.Capture.ICameraCaptureUI {
                photoSettings: Windows.Media.Capture.CameraCaptureUIPhotoCaptureSettings;
                videoSettings: Windows.Media.Capture.CameraCaptureUIVideoCaptureSettings;
                captureFileAsync(mode: Windows.Media.Capture.CameraCaptureUIMode): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            }
            export interface ICameraOptionsUIStatics {
                show(mediaCapture: Windows.Media.Capture.MediaCapture): void;
            }
            export class CameraOptionsUI {
                static show(mediaCapture: Windows.Media.Capture.MediaCapture): void;
            }
            export enum MediaStreamType {
                videoPreview,
                videoRecord,
                audio,
                photo,
            }
            export enum StreamingCaptureMode {
                audioAndVideo,
                audio,
                video,
            }
            export enum VideoRotation {
                none,
                clockwise90Degrees,
                clockwise180Degrees,
                clockwise270Degrees,
            }
            export enum PhotoCaptureSource {
                auto,
                videoPreview,
                photo,
            }
            export enum VideoDeviceCharacteristic {
                allStreamsIndependent,
                previewRecordStreamsIdentical,
                previewPhotoStreamsIdentical,
                recordPhotoStreamsIdentical,
                allStreamsIdentical,
            }
            export enum PowerlineFrequency {
                disabled,
                fiftyHertz,
                sixtyHertz,
            }
            export interface IMediaCaptureFailedEventArgs {
                code: number;
                message: string;
            }
            export class MediaCaptureFailedEventArgs implements Windows.Media.Capture.IMediaCaptureFailedEventArgs {
                code: number;
                message: string;
            }
            export interface MediaCaptureFailedEventHandler {
                (sender: Windows.Media.Capture.MediaCapture, errorEventArgs: Windows.Media.Capture.MediaCaptureFailedEventArgs): void;
            }
            export class MediaCapture implements Windows.Media.Capture.IMediaCapture, Windows.Media.Capture.IMediaCaptureVideoPreview {
                audioDeviceController: Windows.Media.Devices.AudioDeviceController;
                mediaCaptureSettings: Windows.Media.Capture.MediaCaptureSettings;
                videoDeviceController: Windows.Media.Devices.VideoDeviceController;
                initializeAsync(): Windows.Foundation.IAsyncAction;
                initializeAsync(mediaCaptureInitializationSettings: Windows.Media.Capture.MediaCaptureInitializationSettings): Windows.Foundation.IAsyncAction;
                startRecordToStorageFileAsync(encodingProfile: Windows.Media.MediaProperties.MediaEncodingProfile, file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncAction;
                startRecordToStreamAsync(encodingProfile: Windows.Media.MediaProperties.MediaEncodingProfile, stream: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncAction;
                startRecordToCustomSinkAsync(encodingProfile: Windows.Media.MediaProperties.MediaEncodingProfile, customMediaSink: Windows.Media.IMediaExtension): Windows.Foundation.IAsyncAction;
                startRecordToCustomSinkAsync(encodingProfile: Windows.Media.MediaProperties.MediaEncodingProfile, customSinkActivationId: string, customSinkSettings: Windows.Foundation.Collections.IPropertySet): Windows.Foundation.IAsyncAction;
                stopRecordAsync(): Windows.Foundation.IAsyncAction;
                capturePhotoToStorageFileAsync(type: Windows.Media.MediaProperties.ImageEncodingProperties, file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncAction;
                capturePhotoToStreamAsync(type: Windows.Media.MediaProperties.ImageEncodingProperties, stream: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncAction;
                addEffectAsync(mediaStreamType: Windows.Media.Capture.MediaStreamType, effectActivationID: string, effectSettings: Windows.Foundation.Collections.IPropertySet): Windows.Foundation.IAsyncAction;
                clearEffectsAsync(mediaStreamType: Windows.Media.Capture.MediaStreamType): Windows.Foundation.IAsyncAction;
                setEncoderProperty(mediaStreamType: Windows.Media.Capture.MediaStreamType, propertyId: string, propertyValue: any): void;
                getEncoderProperty(mediaStreamType: Windows.Media.Capture.MediaStreamType, propertyId: string): any;
                onfailed: any/* TODO */;
                onrecordlimitationexceeded: any/* TODO */;
                setPreviewMirroring(value: boolean): void;
                getPreviewMirroring(): boolean;
                setPreviewRotation(value: Windows.Media.Capture.VideoRotation): void;
                getPreviewRotation(): Windows.Media.Capture.VideoRotation;
                setRecordRotation(value: Windows.Media.Capture.VideoRotation): void;
                getRecordRotation(): Windows.Media.Capture.VideoRotation;
                startPreviewAsync(): Windows.Foundation.IAsyncAction;
                startPreviewToCustomSinkAsync(encodingProfile: Windows.Media.MediaProperties.MediaEncodingProfile, customMediaSink: Windows.Media.IMediaExtension): Windows.Foundation.IAsyncAction;
                startPreviewToCustomSinkAsync(encodingProfile: Windows.Media.MediaProperties.MediaEncodingProfile, customSinkActivationId: string, customSinkSettings: Windows.Foundation.Collections.IPropertySet): Windows.Foundation.IAsyncAction;
                stopPreviewAsync(): Windows.Foundation.IAsyncAction;
            }
            export interface RecordLimitationExceededEventHandler {
                (sender: Windows.Media.Capture.MediaCapture): void;
            }
            export interface IMediaCaptureInitializationSettings {
                audioDeviceId: string;
                photoCaptureSource: Windows.Media.Capture.PhotoCaptureSource;
                streamingCaptureMode: Windows.Media.Capture.StreamingCaptureMode;
                videoDeviceId: string;
            }
            export class MediaCaptureInitializationSettings implements Windows.Media.Capture.IMediaCaptureInitializationSettings {
                audioDeviceId: string;
                photoCaptureSource: Windows.Media.Capture.PhotoCaptureSource;
                streamingCaptureMode: Windows.Media.Capture.StreamingCaptureMode;
                videoDeviceId: string;
            }
            export interface IMediaCapture {
                audioDeviceController: Windows.Media.Devices.AudioDeviceController;
                mediaCaptureSettings: Windows.Media.Capture.MediaCaptureSettings;
                videoDeviceController: Windows.Media.Devices.VideoDeviceController;
                initializeAsync(): Windows.Foundation.IAsyncAction;
                initializeAsync(mediaCaptureInitializationSettings: Windows.Media.Capture.MediaCaptureInitializationSettings): Windows.Foundation.IAsyncAction;
                startRecordToStorageFileAsync(encodingProfile: Windows.Media.MediaProperties.MediaEncodingProfile, file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncAction;
                startRecordToStreamAsync(encodingProfile: Windows.Media.MediaProperties.MediaEncodingProfile, stream: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncAction;
                startRecordToCustomSinkAsync(encodingProfile: Windows.Media.MediaProperties.MediaEncodingProfile, customMediaSink: Windows.Media.IMediaExtension): Windows.Foundation.IAsyncAction;
                startRecordToCustomSinkAsync(encodingProfile: Windows.Media.MediaProperties.MediaEncodingProfile, customSinkActivationId: string, customSinkSettings: Windows.Foundation.Collections.IPropertySet): Windows.Foundation.IAsyncAction;
                stopRecordAsync(): Windows.Foundation.IAsyncAction;
                capturePhotoToStorageFileAsync(type: Windows.Media.MediaProperties.ImageEncodingProperties, file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncAction;
                capturePhotoToStreamAsync(type: Windows.Media.MediaProperties.ImageEncodingProperties, stream: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncAction;
                addEffectAsync(mediaStreamType: Windows.Media.Capture.MediaStreamType, effectActivationID: string, effectSettings: Windows.Foundation.Collections.IPropertySet): Windows.Foundation.IAsyncAction;
                clearEffectsAsync(mediaStreamType: Windows.Media.Capture.MediaStreamType): Windows.Foundation.IAsyncAction;
                setEncoderProperty(mediaStreamType: Windows.Media.Capture.MediaStreamType, propertyId: string, propertyValue: any): void;
                getEncoderProperty(mediaStreamType: Windows.Media.Capture.MediaStreamType, propertyId: string): any;
                onfailed: any/* TODO */;
                onrecordlimitationexceeded: any/* TODO */;
                setPreviewMirroring(value: boolean): void;
                getPreviewMirroring(): boolean;
                setPreviewRotation(value: Windows.Media.Capture.VideoRotation): void;
                getPreviewRotation(): Windows.Media.Capture.VideoRotation;
                setRecordRotation(value: Windows.Media.Capture.VideoRotation): void;
                getRecordRotation(): Windows.Media.Capture.VideoRotation;
            }
            export class MediaCaptureSettings implements Windows.Media.Capture.IMediaCaptureSettings {
                audioDeviceId: string;
                photoCaptureSource: Windows.Media.Capture.PhotoCaptureSource;
                streamingCaptureMode: Windows.Media.Capture.StreamingCaptureMode;
                videoDeviceCharacteristic: Windows.Media.Capture.VideoDeviceCharacteristic;
                videoDeviceId: string;
            }
            export interface IMediaCaptureVideoPreview {
                startPreviewAsync(): Windows.Foundation.IAsyncAction;
                startPreviewToCustomSinkAsync(encodingProfile: Windows.Media.MediaProperties.MediaEncodingProfile, customMediaSink: Windows.Media.IMediaExtension): Windows.Foundation.IAsyncAction;
                startPreviewToCustomSinkAsync(encodingProfile: Windows.Media.MediaProperties.MediaEncodingProfile, customSinkActivationId: string, customSinkSettings: Windows.Foundation.Collections.IPropertySet): Windows.Foundation.IAsyncAction;
                stopPreviewAsync(): Windows.Foundation.IAsyncAction;
            }
            export interface IMediaCaptureSettings {
                audioDeviceId: string;
                photoCaptureSource: Windows.Media.Capture.PhotoCaptureSource;
                streamingCaptureMode: Windows.Media.Capture.StreamingCaptureMode;
                videoDeviceCharacteristic: Windows.Media.Capture.VideoDeviceCharacteristic;
                videoDeviceId: string;
            }
        }
    }
}
declare module Windows {
    export module Media {
        export module Devices {
            export enum TelephonyKey {
                d0,
                d1,
                d2,
                d3,
                d4,
                d5,
                d6,
                d7,
                d8,
                d9,
                star,
                pound,
                a,
                b,
                c,
                d,
            }
            export interface IDialRequestedEventArgs {
                contact: any;
                handled(): void;
            }
            export class DialRequestedEventArgs implements Windows.Media.Devices.IDialRequestedEventArgs {
                contact: any;
                handled(): void;
            }
            export interface IRedialRequestedEventArgs {
                handled(): void;
            }
            export class RedialRequestedEventArgs implements Windows.Media.Devices.IRedialRequestedEventArgs {
                handled(): void;
            }
            export interface IKeypadPressedEventArgs {
                telephonyKey: Windows.Media.Devices.TelephonyKey;
            }
            export class KeypadPressedEventArgs implements Windows.Media.Devices.IKeypadPressedEventArgs {
                telephonyKey: Windows.Media.Devices.TelephonyKey;
            }
            export interface CallControlEventHandler {
                (sender: Windows.Media.Devices.CallControl): void;
            }
            export class CallControl implements Windows.Media.Devices.ICallControl {
                hasRinger: boolean;
                indicateNewIncomingCall(enableRinger: boolean, callerId: string): number;
                indicateNewOutgoingCall(): number;
                indicateActiveCall(callToken: number): void;
                endCall(callToken: number): void;
                onanswerrequested: any/* TODO */;
                onhanguprequested: any/* TODO */;
                ondialrequested: any/* TODO */;
                onredialrequested: any/* TODO */;
                onkeypadpressed: any/* TODO */;
                onaudiotransferrequested: any/* TODO */;
                static getDefault(): Windows.Media.Devices.CallControl;
                static fromId(deviceInterfaceId: string): Windows.Media.Devices.CallControl;
            }
            export interface DialRequestedEventHandler {
                (sender: Windows.Media.Devices.CallControl, e: Windows.Media.Devices.DialRequestedEventArgs): void;
            }
            export interface RedialRequestedEventHandler {
                (sender: Windows.Media.Devices.CallControl, e: Windows.Media.Devices.RedialRequestedEventArgs): void;
            }
            export interface KeypadPressedEventHandler {
                (sender: Windows.Media.Devices.CallControl, e: Windows.Media.Devices.KeypadPressedEventArgs): void;
            }
            export interface ICallControl {
                hasRinger: boolean;
                indicateNewIncomingCall(enableRinger: boolean, callerId: string): number;
                indicateNewOutgoingCall(): number;
                indicateActiveCall(callToken: number): void;
                endCall(callToken: number): void;
                onanswerrequested: any/* TODO */;
                onhanguprequested: any/* TODO */;
                ondialrequested: any/* TODO */;
                onredialrequested: any/* TODO */;
                onkeypadpressed: any/* TODO */;
                onaudiotransferrequested: any/* TODO */;
            }
            export interface ICallControlStatics {
                getDefault(): Windows.Media.Devices.CallControl;
                fromId(deviceInterfaceId: string): Windows.Media.Devices.CallControl;
            }
            export enum AudioDeviceRole {
                default,
                communications,
            }
            export interface IDefaultAudioDeviceChangedEventArgs {
                id: string;
                role: Windows.Media.Devices.AudioDeviceRole;
            }
            export interface IMediaDeviceStatics {
                getAudioCaptureSelector(): string;
                getAudioRenderSelector(): string;
                getVideoCaptureSelector(): string;
                getDefaultAudioCaptureId(role: Windows.Media.Devices.AudioDeviceRole): string;
                getDefaultAudioRenderId(role: Windows.Media.Devices.AudioDeviceRole): string;
                ondefaultaudiocapturedevicechanged: any/* TODO */;
                ondefaultaudiorenderdevicechanged: any/* TODO */;
            }
            export class DefaultAudioCaptureDeviceChangedEventArgs implements Windows.Media.Devices.IDefaultAudioDeviceChangedEventArgs {
                id: string;
                role: Windows.Media.Devices.AudioDeviceRole;
            }
            export class DefaultAudioRenderDeviceChangedEventArgs implements Windows.Media.Devices.IDefaultAudioDeviceChangedEventArgs {
                id: string;
                role: Windows.Media.Devices.AudioDeviceRole;
            }
            export class MediaDevice {
                static getAudioCaptureSelector(): string;
                static getAudioRenderSelector(): string;
                static getVideoCaptureSelector(): string;
                static getDefaultAudioCaptureId(role: Windows.Media.Devices.AudioDeviceRole): string;
                static getDefaultAudioRenderId(role: Windows.Media.Devices.AudioDeviceRole): string;
                static ondefaultaudiocapturedevicechanged: any/* TODO */;
                static ondefaultaudiorenderdevicechanged: any/* TODO */;
            }
            export class AudioDeviceController implements Windows.Media.Devices.IAudioDeviceController, Windows.Media.Devices.IMediaDeviceController {
                muted: boolean;
                volumePercent: number;
                getAvailableMediaStreamProperties(mediaStreamType: Windows.Media.Capture.MediaStreamType): Windows.Foundation.Collections.IVectorView<Windows.Media.MediaProperties.IMediaEncodingProperties>;
                getMediaStreamProperties(mediaStreamType: Windows.Media.Capture.MediaStreamType): Windows.Media.MediaProperties.IMediaEncodingProperties;
                setMediaStreamPropertiesAsync(mediaStreamType: Windows.Media.Capture.MediaStreamType, mediaEncodingProperties: Windows.Media.MediaProperties.IMediaEncodingProperties): Windows.Foundation.IAsyncAction;
            }
            export class VideoDeviceController implements Windows.Media.Devices.IVideoDeviceController, Windows.Media.Devices.IMediaDeviceController, Windows.Media.Devices.IAdvancedVideoCaptureDeviceController {
                backlightCompensation: Windows.Media.Devices.MediaDeviceControl;
                brightness: Windows.Media.Devices.MediaDeviceControl;
                contrast: Windows.Media.Devices.MediaDeviceControl;
                exposure: Windows.Media.Devices.MediaDeviceControl;
                focus: Windows.Media.Devices.MediaDeviceControl;
                hue: Windows.Media.Devices.MediaDeviceControl;
                pan: Windows.Media.Devices.MediaDeviceControl;
                roll: Windows.Media.Devices.MediaDeviceControl;
                tilt: Windows.Media.Devices.MediaDeviceControl;
                whiteBalance: Windows.Media.Devices.MediaDeviceControl;
                zoom: Windows.Media.Devices.MediaDeviceControl;
                trySetPowerlineFrequency(value: Windows.Media.Capture.PowerlineFrequency): boolean;
                tryGetPowerlineFrequency(): { value: Windows.Media.Capture.PowerlineFrequency; succeeded: boolean; };
                getAvailableMediaStreamProperties(mediaStreamType: Windows.Media.Capture.MediaStreamType): Windows.Foundation.Collections.IVectorView<Windows.Media.MediaProperties.IMediaEncodingProperties>;
                getMediaStreamProperties(mediaStreamType: Windows.Media.Capture.MediaStreamType): Windows.Media.MediaProperties.IMediaEncodingProperties;
                setMediaStreamPropertiesAsync(mediaStreamType: Windows.Media.Capture.MediaStreamType, mediaEncodingProperties: Windows.Media.MediaProperties.IMediaEncodingProperties): Windows.Foundation.IAsyncAction;
                setDeviceProperty(propertyId: string, propertyValue: any): void;
                getDeviceProperty(propertyId: string): any;
            }
            export interface IMediaDeviceController {
                getAvailableMediaStreamProperties(mediaStreamType: Windows.Media.Capture.MediaStreamType): Windows.Foundation.Collections.IVectorView<Windows.Media.MediaProperties.IMediaEncodingProperties>;
                getMediaStreamProperties(mediaStreamType: Windows.Media.Capture.MediaStreamType): Windows.Media.MediaProperties.IMediaEncodingProperties;
                setMediaStreamPropertiesAsync(mediaStreamType: Windows.Media.Capture.MediaStreamType, mediaEncodingProperties: Windows.Media.MediaProperties.IMediaEncodingProperties): Windows.Foundation.IAsyncAction;
            }
            export interface IAudioDeviceController extends Windows.Media.Devices.IMediaDeviceController {
                muted: boolean;
                volumePercent: number;
            }
            export interface IVideoDeviceController extends Windows.Media.Devices.IMediaDeviceController {
                backlightCompensation: Windows.Media.Devices.MediaDeviceControl;
                brightness: Windows.Media.Devices.MediaDeviceControl;
                contrast: Windows.Media.Devices.MediaDeviceControl;
                exposure: Windows.Media.Devices.MediaDeviceControl;
                focus: Windows.Media.Devices.MediaDeviceControl;
                hue: Windows.Media.Devices.MediaDeviceControl;
                pan: Windows.Media.Devices.MediaDeviceControl;
                roll: Windows.Media.Devices.MediaDeviceControl;
                tilt: Windows.Media.Devices.MediaDeviceControl;
                whiteBalance: Windows.Media.Devices.MediaDeviceControl;
                zoom: Windows.Media.Devices.MediaDeviceControl;
                trySetPowerlineFrequency(value: Windows.Media.Capture.PowerlineFrequency): boolean;
                tryGetPowerlineFrequency(): { value: Windows.Media.Capture.PowerlineFrequency; succeeded: boolean; };
            }
            export class MediaDeviceControl implements Windows.Media.Devices.IMediaDeviceControl {
                capabilities: Windows.Media.Devices.MediaDeviceControlCapabilities;
                tryGetValue(): { value: number; succeeded: boolean; };
                trySetValue(value: number): boolean;
                tryGetAuto(): { value: boolean; succeeded: boolean; };
                trySetAuto(value: boolean): boolean;
            }
            export interface IMediaDeviceControl {
                capabilities: Windows.Media.Devices.MediaDeviceControlCapabilities;
                tryGetValue(): { value: number; succeeded: boolean; };
                trySetValue(value: number): boolean;
                tryGetAuto(): { value: boolean; succeeded: boolean; };
                trySetAuto(value: boolean): boolean;
            }
            export class MediaDeviceControlCapabilities implements Windows.Media.Devices.IMediaDeviceControlCapabilities {
                autoModeSupported: boolean;
                default: number;
                max: number;
                min: number;
                step: number;
                supported: boolean;
            }
            export interface IMediaDeviceControlCapabilities {
                autoModeSupported: boolean;
                default: number;
                max: number;
                min: number;
                step: number;
                supported: boolean;
            }
            export interface IAdvancedVideoCaptureDeviceController {
                setDeviceProperty(propertyId: string, propertyValue: any): void;
                getDeviceProperty(propertyId: string): any;
            }
        }
    }
}
declare module Windows {
    export module Media {
        export enum SoundLevel {
            muted,
            low,
            full,
        }
        export interface IMediaControl {
            albumArt: Windows.Foundation.Uri;
            artistName: string;
            isPlaying: boolean;
            soundLevel: Windows.Media.SoundLevel;
            trackName: string;
            onsoundlevelchanged: any/* TODO */;
            onplaypressed: any/* TODO */;
            onpausepressed: any/* TODO */;
            onstoppressed: any/* TODO */;
            onplaypausetogglepressed: any/* TODO */;
            onrecordpressed: any/* TODO */;
            onnexttrackpressed: any/* TODO */;
            onprevioustrackpressed: any/* TODO */;
            onfastforwardpressed: any/* TODO */;
            onrewindpressed: any/* TODO */;
            onchanneluppressed: any/* TODO */;
            onchanneldownpressed: any/* TODO */;
        }
        export class MediaControl {
            static albumArt: Windows.Foundation.Uri;
            static artistName: string;
            static isPlaying: boolean;
            static soundLevel: Windows.Media.SoundLevel;
            static trackName: string;
            static onsoundlevelchanged: any/* TODO */;
            static onplaypressed: any/* TODO */;
            static onpausepressed: any/* TODO */;
            static onstoppressed: any/* TODO */;
            static onplaypausetogglepressed: any/* TODO */;
            static onrecordpressed: any/* TODO */;
            static onnexttrackpressed: any/* TODO */;
            static onprevioustrackpressed: any/* TODO */;
            static onfastforwardpressed: any/* TODO */;
            static onrewindpressed: any/* TODO */;
            static onchanneluppressed: any/* TODO */;
            static onchanneldownpressed: any/* TODO */;
        }
        export interface IMediaExtension {
            setProperties(configuration: Windows.Foundation.Collections.IPropertySet): void;
        }
        export interface IMediaExtensionManager {
            registerSchemeHandler(activatableClassId: string, scheme: string): void;
            registerSchemeHandler(activatableClassId: string, scheme: string, configuration: Windows.Foundation.Collections.IPropertySet): void;
            registerByteStreamHandler(activatableClassId: string, fileExtension: string, mimeType: string): void;
            registerByteStreamHandler(activatableClassId: string, fileExtension: string, mimeType: string, configuration: Windows.Foundation.Collections.IPropertySet): void;
            registerAudioDecoder(activatableClassId: string, inputSubtype: string, outputSubtype: string): void;
            registerAudioDecoder(activatableClassId: string, inputSubtype: string, outputSubtype: string, configuration: Windows.Foundation.Collections.IPropertySet): void;
            registerAudioEncoder(activatableClassId: string, inputSubtype: string, outputSubtype: string): void;
            registerAudioEncoder(activatableClassId: string, inputSubtype: string, outputSubtype: string, configuration: Windows.Foundation.Collections.IPropertySet): void;
            registerVideoDecoder(activatableClassId: string, inputSubtype: string, outputSubtype: string): void;
            registerVideoDecoder(activatableClassId: string, inputSubtype: string, outputSubtype: string, configuration: Windows.Foundation.Collections.IPropertySet): void;
            registerVideoEncoder(activatableClassId: string, inputSubtype: string, outputSubtype: string): void;
            registerVideoEncoder(activatableClassId: string, inputSubtype: string, outputSubtype: string, configuration: Windows.Foundation.Collections.IPropertySet): void;
        }
        export class MediaExtensionManager implements Windows.Media.IMediaExtensionManager {
            registerSchemeHandler(activatableClassId: string, scheme: string): void;
            registerSchemeHandler(activatableClassId: string, scheme: string, configuration: Windows.Foundation.Collections.IPropertySet): void;
            registerByteStreamHandler(activatableClassId: string, fileExtension: string, mimeType: string): void;
            registerByteStreamHandler(activatableClassId: string, fileExtension: string, mimeType: string, configuration: Windows.Foundation.Collections.IPropertySet): void;
            registerAudioDecoder(activatableClassId: string, inputSubtype: string, outputSubtype: string): void;
            registerAudioDecoder(activatableClassId: string, inputSubtype: string, outputSubtype: string, configuration: Windows.Foundation.Collections.IPropertySet): void;
            registerAudioEncoder(activatableClassId: string, inputSubtype: string, outputSubtype: string): void;
            registerAudioEncoder(activatableClassId: string, inputSubtype: string, outputSubtype: string, configuration: Windows.Foundation.Collections.IPropertySet): void;
            registerVideoDecoder(activatableClassId: string, inputSubtype: string, outputSubtype: string): void;
            registerVideoDecoder(activatableClassId: string, inputSubtype: string, outputSubtype: string, configuration: Windows.Foundation.Collections.IPropertySet): void;
            registerVideoEncoder(activatableClassId: string, inputSubtype: string, outputSubtype: string): void;
            registerVideoEncoder(activatableClassId: string, inputSubtype: string, outputSubtype: string, configuration: Windows.Foundation.Collections.IPropertySet): void;
        }
        export interface IVideoEffectsStatics {
            videoStabilization: string;
        }
        export class VideoEffects {
            static videoStabilization: string;
        }
    }
}
declare module Windows {
    export module Media {
        export module Playlists {
            export enum PlaylistFormat {
                windowsMedia,
                zune,
                m3u,
            }
            export interface IPlaylist {
                files: Windows.Foundation.Collections.IVector<Windows.Storage.StorageFile>;
                saveAsync(): Windows.Foundation.IAsyncAction;
                saveAsAsync(saveLocation: Windows.Storage.IStorageFolder, desiredName: string, option: Windows.Storage.NameCollisionOption): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                saveAsAsync(saveLocation: Windows.Storage.IStorageFolder, desiredName: string, option: Windows.Storage.NameCollisionOption, playlistFormat: Windows.Media.Playlists.PlaylistFormat): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            }
            export interface IPlaylistStatics {
                loadAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<Windows.Media.Playlists.Playlist>;
            }
            export class Playlist implements Windows.Media.Playlists.IPlaylist {
                files: Windows.Foundation.Collections.IVector<Windows.Storage.StorageFile>;
                saveAsync(): Windows.Foundation.IAsyncAction;
                saveAsAsync(saveLocation: Windows.Storage.IStorageFolder, desiredName: string, option: Windows.Storage.NameCollisionOption): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                saveAsAsync(saveLocation: Windows.Storage.IStorageFolder, desiredName: string, option: Windows.Storage.NameCollisionOption, playlistFormat: Windows.Media.Playlists.PlaylistFormat): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                static loadAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<Windows.Media.Playlists.Playlist>;
            }
        }
    }
}
declare module Windows {
    export module Media {
        export module PlayTo {
            export interface IPlayToSource {
                connection: Windows.Media.PlayTo.PlayToConnection;
                next: Windows.Media.PlayTo.PlayToSource;
                playNext(): void;
            }
            export class PlayToConnection implements Windows.Media.PlayTo.IPlayToConnection {
                state: Windows.Media.PlayTo.PlayToConnectionState;
                onstatechanged: any/* TODO */;
                ontransferred: any/* TODO */;
                onerror: any/* TODO */;
            }
            export class PlayToSource implements Windows.Media.PlayTo.IPlayToSource {
                connection: Windows.Media.PlayTo.PlayToConnection;
                next: Windows.Media.PlayTo.PlayToSource;
                playNext(): void;
            }
            export enum PlayToConnectionState {
                disconnected,
                connected,
                rendering,
            }
            export interface IPlayToConnectionStateChangedEventArgs {
                currentState: Windows.Media.PlayTo.PlayToConnectionState;
                previousState: Windows.Media.PlayTo.PlayToConnectionState;
            }
            export class PlayToConnectionStateChangedEventArgs implements Windows.Media.PlayTo.IPlayToConnectionStateChangedEventArgs {
                currentState: Windows.Media.PlayTo.PlayToConnectionState;
                previousState: Windows.Media.PlayTo.PlayToConnectionState;
            }
            export interface IPlayToConnectionTransferredEventArgs {
                currentSource: Windows.Media.PlayTo.PlayToSource;
                previousSource: Windows.Media.PlayTo.PlayToSource;
            }
            export class PlayToConnectionTransferredEventArgs implements Windows.Media.PlayTo.IPlayToConnectionTransferredEventArgs {
                currentSource: Windows.Media.PlayTo.PlayToSource;
                previousSource: Windows.Media.PlayTo.PlayToSource;
            }
            export enum PlayToConnectionError {
                none,
                deviceNotResponding,
                deviceError,
                deviceLocked,
            }
            export interface IPlayToConnectionErrorEventArgs {
                code: Windows.Media.PlayTo.PlayToConnectionError;
                message: string;
            }
            export class PlayToConnectionErrorEventArgs implements Windows.Media.PlayTo.IPlayToConnectionErrorEventArgs {
                code: Windows.Media.PlayTo.PlayToConnectionError;
                message: string;
            }
            export interface IPlayToConnection {
                state: Windows.Media.PlayTo.PlayToConnectionState;
                onstatechanged: any/* TODO */;
                ontransferred: any/* TODO */;
                onerror: any/* TODO */;
            }
            export interface ISourceChangeRequestedEventArgs {
                album: string;
                author: string;
                date: Date;
                description: string;
                genre: string;
                properties: Windows.Foundation.Collections.IMapView<string, any>;
                rating: number;
                stream: Windows.Storage.Streams.IRandomAccessStreamWithContentType;
                thumbnail: Windows.Storage.Streams.IRandomAccessStreamReference;
                title: string;
            }
            export class SourceChangeRequestedEventArgs implements Windows.Media.PlayTo.ISourceChangeRequestedEventArgs {
                album: string;
                author: string;
                date: Date;
                description: string;
                genre: string;
                properties: Windows.Foundation.Collections.IMapView<string, any>;
                rating: number;
                stream: Windows.Storage.Streams.IRandomAccessStreamWithContentType;
                thumbnail: Windows.Storage.Streams.IRandomAccessStreamReference;
                title: string;
            }
            export interface IPlaybackRateChangeRequestedEventArgs {
                rate: number;
            }
            export class PlaybackRateChangeRequestedEventArgs implements Windows.Media.PlayTo.IPlaybackRateChangeRequestedEventArgs {
                rate: number;
            }
            export interface ICurrentTimeChangeRequestedEventArgs {
                time: number;
            }
            export class CurrentTimeChangeRequestedEventArgs implements Windows.Media.PlayTo.ICurrentTimeChangeRequestedEventArgs {
                time: number;
            }
            export interface IMuteChangeRequestedEventArgs {
                mute: boolean;
            }
            export class MuteChangeRequestedEventArgs implements Windows.Media.PlayTo.IMuteChangeRequestedEventArgs {
                mute: boolean;
            }
            export interface IVolumeChangeRequestedEventArgs {
                volume: number;
            }
            export class VolumeChangeRequestedEventArgs implements Windows.Media.PlayTo.IVolumeChangeRequestedEventArgs {
                volume: number;
            }
            export interface IPlayToReceiver {
                friendlyName: string;
                properties: Windows.Foundation.Collections.IPropertySet;
                supportsAudio: boolean;
                supportsImage: boolean;
                supportsVideo: boolean;
                onplayrequested: any/* TODO */;
                onpauserequested: any/* TODO */;
                onsourcechangerequested: any/* TODO */;
                onplaybackratechangerequested: any/* TODO */;
                oncurrenttimechangerequested: any/* TODO */;
                onmutechangerequested: any/* TODO */;
                onvolumechangerequested: any/* TODO */;
                ontimeupdaterequested: any/* TODO */;
                onstoprequested: any/* TODO */;
                notifyVolumeChange(volume: number, mute: boolean): void;
                notifyRateChange(rate: number): void;
                notifyLoadedMetadata(): void;
                notifyTimeUpdate(currentTime: number): void;
                notifyDurationChange(duration: number): void;
                notifySeeking(): void;
                notifySeeked(): void;
                notifyPaused(): void;
                notifyPlaying(): void;
                notifyEnded(): void;
                notifyError(): void;
                notifyStopped(): void;
                startAsync(): Windows.Foundation.IAsyncAction;
                stopAsync(): Windows.Foundation.IAsyncAction;
            }
            export class PlayToReceiver implements Windows.Media.PlayTo.IPlayToReceiver {
                friendlyName: string;
                properties: Windows.Foundation.Collections.IPropertySet;
                supportsAudio: boolean;
                supportsImage: boolean;
                supportsVideo: boolean;
                onplayrequested: any/* TODO */;
                onpauserequested: any/* TODO */;
                onsourcechangerequested: any/* TODO */;
                onplaybackratechangerequested: any/* TODO */;
                oncurrenttimechangerequested: any/* TODO */;
                onmutechangerequested: any/* TODO */;
                onvolumechangerequested: any/* TODO */;
                ontimeupdaterequested: any/* TODO */;
                onstoprequested: any/* TODO */;
                notifyVolumeChange(volume: number, mute: boolean): void;
                notifyRateChange(rate: number): void;
                notifyLoadedMetadata(): void;
                notifyTimeUpdate(currentTime: number): void;
                notifyDurationChange(duration: number): void;
                notifySeeking(): void;
                notifySeeked(): void;
                notifyPaused(): void;
                notifyPlaying(): void;
                notifyEnded(): void;
                notifyError(): void;
                notifyStopped(): void;
                startAsync(): Windows.Foundation.IAsyncAction;
                stopAsync(): Windows.Foundation.IAsyncAction;
            }
            export interface IPlayToSourceSelectedEventArgs {
                friendlyName: string;
                icon: Windows.Storage.Streams.IRandomAccessStreamWithContentType;
                supportsAudio: boolean;
                supportsImage: boolean;
                supportsVideo: boolean;
            }
            export class PlayToSourceSelectedEventArgs implements Windows.Media.PlayTo.IPlayToSourceSelectedEventArgs {
                friendlyName: string;
                icon: Windows.Storage.Streams.IRandomAccessStreamWithContentType;
                supportsAudio: boolean;
                supportsImage: boolean;
                supportsVideo: boolean;
            }
            export interface IPlayToSourceDeferral {
                complete(): void;
            }
            export class PlayToSourceDeferral implements Windows.Media.PlayTo.IPlayToSourceDeferral {
                complete(): void;
            }
            export interface IPlayToSourceRequest {
                deadline: Date;
                displayErrorString(errorString: string): void;
                getDeferral(): Windows.Media.PlayTo.PlayToSourceDeferral;
                setSource(value: Windows.Media.PlayTo.PlayToSource): void;
            }
            export class PlayToSourceRequest implements Windows.Media.PlayTo.IPlayToSourceRequest {
                deadline: Date;
                displayErrorString(errorString: string): void;
                getDeferral(): Windows.Media.PlayTo.PlayToSourceDeferral;
                setSource(value: Windows.Media.PlayTo.PlayToSource): void;
            }
            export interface IPlayToSourceRequestedEventArgs {
                sourceRequest: Windows.Media.PlayTo.PlayToSourceRequest;
            }
            export class PlayToSourceRequestedEventArgs implements Windows.Media.PlayTo.IPlayToSourceRequestedEventArgs {
                sourceRequest: Windows.Media.PlayTo.PlayToSourceRequest;
            }
            export interface IPlayToManager {
                defaultSourceSelection: boolean;
                onsourcerequested: any/* TODO */;
                onsourceselected: any/* TODO */;
            }
            export class PlayToManager implements Windows.Media.PlayTo.IPlayToManager {
                defaultSourceSelection: boolean;
                onsourcerequested: any/* TODO */;
                onsourceselected: any/* TODO */;
                static getForCurrentView(): Windows.Media.PlayTo.PlayToManager;
                static showPlayToUI(): void;
            }
            export interface IPlayToManagerStatics {
                getForCurrentView(): Windows.Media.PlayTo.PlayToManager;
                showPlayToUI(): void;
            }
        }
    }
}
declare module Windows {
    export module Media {
        export module MediaProperties {
            export interface IMediaRatio {
                denominator: number;
                numerator: number;
            }
            export class MediaRatio implements Windows.Media.MediaProperties.IMediaRatio {
                denominator: number;
                numerator: number;
            }
            export class MediaPropertySet implements Windows.Foundation.Collections.IMap<string, any>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, any>> {
                size: number;
                lookup(key: string): any;
                hasKey(key: string): boolean;
                getView(): Windows.Foundation.Collections.IMapView<string, any>;
                insert(key: string, value: any): boolean;
                remove(key: string): void;
                clear(): void;
                first(): Windows.Foundation.Collections.IIterator<Windows.Foundation.Collections.IKeyValuePair<string, any>>;
            }
            export interface IMediaEncodingProperties {
                properties: Windows.Media.MediaProperties.MediaPropertySet;
                subtype: string;
                type: string;
            }
            export interface IAudioEncodingProperties extends Windows.Media.MediaProperties.IMediaEncodingProperties {
                bitrate: number;
                bitsPerSample: number;
                channelCount: number;
                sampleRate: number;
            }
            export class AudioEncodingProperties implements Windows.Media.MediaProperties.IAudioEncodingProperties, Windows.Media.MediaProperties.IMediaEncodingProperties {
                bitrate: number;
                bitsPerSample: number;
                channelCount: number;
                sampleRate: number;
                properties: Windows.Media.MediaProperties.MediaPropertySet;
                subtype: string;
                type: string;
            }
            export interface IVideoEncodingProperties extends Windows.Media.MediaProperties.IMediaEncodingProperties {
                bitrate: number;
                frameRate: Windows.Media.MediaProperties.MediaRatio;
                height: number;
                pixelAspectRatio: Windows.Media.MediaProperties.MediaRatio;
                width: number;
            }
            export class VideoEncodingProperties implements Windows.Media.MediaProperties.IVideoEncodingProperties, Windows.Media.MediaProperties.IMediaEncodingProperties {
                bitrate: number;
                frameRate: Windows.Media.MediaProperties.MediaRatio;
                height: number;
                pixelAspectRatio: Windows.Media.MediaProperties.MediaRatio;
                width: number;
                properties: Windows.Media.MediaProperties.MediaPropertySet;
                subtype: string;
                type: string;
            }
            export interface IImageEncodingProperties extends Windows.Media.MediaProperties.IMediaEncodingProperties {
                height: number;
                width: number;
            }
            export interface IImageEncodingPropertiesStatics {
                createJpeg(): Windows.Media.MediaProperties.ImageEncodingProperties;
                createPng(): Windows.Media.MediaProperties.ImageEncodingProperties;
                createJpegXR(): Windows.Media.MediaProperties.ImageEncodingProperties;
            }
            export class ImageEncodingProperties implements Windows.Media.MediaProperties.IImageEncodingProperties, Windows.Media.MediaProperties.IMediaEncodingProperties {
                height: number;
                width: number;
                properties: Windows.Media.MediaProperties.MediaPropertySet;
                subtype: string;
                type: string;
                static createJpeg(): Windows.Media.MediaProperties.ImageEncodingProperties;
                static createPng(): Windows.Media.MediaProperties.ImageEncodingProperties;
                static createJpegXR(): Windows.Media.MediaProperties.ImageEncodingProperties;
            }
            export interface IContainerEncodingProperties extends Windows.Media.MediaProperties.IMediaEncodingProperties {
            }
            export class ContainerEncodingProperties implements Windows.Media.MediaProperties.IContainerEncodingProperties, Windows.Media.MediaProperties.IMediaEncodingProperties {
                properties: Windows.Media.MediaProperties.MediaPropertySet;
                subtype: string;
                type: string;
            }
            export enum AudioEncodingQuality {
                auto,
                high,
                medium,
                low,
            }
            export enum VideoEncodingQuality {
                auto,
                hD1080p,
                hD720p,
                wvga,
                ntsc,
                pal,
                vga,
                qvga,
            }
            export interface IMediaEncodingProfileStatics {
                createM4a(quality: Windows.Media.MediaProperties.AudioEncodingQuality): Windows.Media.MediaProperties.MediaEncodingProfile;
                createMp3(quality: Windows.Media.MediaProperties.AudioEncodingQuality): Windows.Media.MediaProperties.MediaEncodingProfile;
                createWma(quality: Windows.Media.MediaProperties.AudioEncodingQuality): Windows.Media.MediaProperties.MediaEncodingProfile;
                createMp4(quality: Windows.Media.MediaProperties.VideoEncodingQuality): Windows.Media.MediaProperties.MediaEncodingProfile;
                createWmv(quality: Windows.Media.MediaProperties.VideoEncodingQuality): Windows.Media.MediaProperties.MediaEncodingProfile;
                createFromFileAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<Windows.Media.MediaProperties.MediaEncodingProfile>;
                createFromStreamAsync(stream: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncOperation<Windows.Media.MediaProperties.MediaEncodingProfile>;
            }
            export class MediaEncodingProfile implements Windows.Media.MediaProperties.IMediaEncodingProfile {
                audio: Windows.Media.MediaProperties.AudioEncodingProperties;
                container: Windows.Media.MediaProperties.ContainerEncodingProperties;
                video: Windows.Media.MediaProperties.VideoEncodingProperties;
                static createM4a(quality: Windows.Media.MediaProperties.AudioEncodingQuality): Windows.Media.MediaProperties.MediaEncodingProfile;
                static createMp3(quality: Windows.Media.MediaProperties.AudioEncodingQuality): Windows.Media.MediaProperties.MediaEncodingProfile;
                static createWma(quality: Windows.Media.MediaProperties.AudioEncodingQuality): Windows.Media.MediaProperties.MediaEncodingProfile;
                static createMp4(quality: Windows.Media.MediaProperties.VideoEncodingQuality): Windows.Media.MediaProperties.MediaEncodingProfile;
                static createWmv(quality: Windows.Media.MediaProperties.VideoEncodingQuality): Windows.Media.MediaProperties.MediaEncodingProfile;
                static createFromFileAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<Windows.Media.MediaProperties.MediaEncodingProfile>;
                static createFromStreamAsync(stream: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncOperation<Windows.Media.MediaProperties.MediaEncodingProfile>;
            }
            export interface IMediaEncodingProfile {
                audio: Windows.Media.MediaProperties.AudioEncodingProperties;
                container: Windows.Media.MediaProperties.ContainerEncodingProperties;
                video: Windows.Media.MediaProperties.VideoEncodingProperties;
            }
        }
    }
}
declare module Windows {
    export module Media {
        export module Protection {
            export class MediaProtectionManager implements Windows.Media.Protection.IMediaProtectionManager {
                properties: Windows.Foundation.Collections.IPropertySet;
                onservicerequested: any/* TODO */;
                onrebootneeded: any/* TODO */;
                oncomponentloadfailed: any/* TODO */;
            }
            export class ServiceRequestedEventArgs implements Windows.Media.Protection.IServiceRequestedEventArgs {
                completion: Windows.Media.Protection.MediaProtectionServiceCompletion;
                request: Windows.Media.Protection.IMediaProtectionServiceRequest;
            }
            export class ComponentLoadFailedEventArgs implements Windows.Media.Protection.IComponentLoadFailedEventArgs {
                completion: Windows.Media.Protection.MediaProtectionServiceCompletion;
                information: Windows.Media.Protection.RevocationAndRenewalInformation;
            }
            export class MediaProtectionServiceCompletion implements Windows.Media.Protection.IMediaProtectionServiceCompletion {
                complete(success: boolean): void;
            }
            export class RevocationAndRenewalInformation implements Windows.Media.Protection.IRevocationAndRenewalInformation {
                items: Windows.Foundation.Collections.IVector<Windows.Media.Protection.RevocationAndRenewalItem>;
            }
            export class RevocationAndRenewalItem implements Windows.Media.Protection.IRevocationAndRenewalItem {
                headerHash: string;
                name: string;
                publicKeyHash: string;
                reasons: Windows.Media.Protection.RevocationAndRenewalReasons;
                renewalId: string;
            }
            export interface ServiceRequestedEventHandler {
                (sender: Windows.Media.Protection.MediaProtectionManager, e: Windows.Media.Protection.ServiceRequestedEventArgs): void;
            }
            export interface RebootNeededEventHandler {
                (sender: Windows.Media.Protection.MediaProtectionManager): void;
            }
            export interface ComponentLoadFailedEventHandler {
                (sender: Windows.Media.Protection.MediaProtectionManager, e: Windows.Media.Protection.ComponentLoadFailedEventArgs): void;
            }
            export interface IMediaProtectionManager {
                properties: Windows.Foundation.Collections.IPropertySet;
                onservicerequested: any/* TODO */;
                onrebootneeded: any/* TODO */;
                oncomponentloadfailed: any/* TODO */;
            }
            export interface IMediaProtectionServiceCompletion {
                complete(success: boolean): void;
            }
            export interface IServiceRequestedEventArgs {
                completion: Windows.Media.Protection.MediaProtectionServiceCompletion;
                request: Windows.Media.Protection.IMediaProtectionServiceRequest;
            }
            export interface IMediaProtectionServiceRequest {
                protectionSystem: string;
                type: string;
            }
            export interface IComponentLoadFailedEventArgs {
                completion: Windows.Media.Protection.MediaProtectionServiceCompletion;
                information: Windows.Media.Protection.RevocationAndRenewalInformation;
            }
            export interface IRevocationAndRenewalInformation {
                items: Windows.Foundation.Collections.IVector<Windows.Media.Protection.RevocationAndRenewalItem>;
            }
            export enum RevocationAndRenewalReasons {
                userModeComponentLoad,
                kernelModeComponentLoad,
                appComponent,
                globalRevocationListLoadFailed,
                invalidGlobalRevocationListSignature,
                globalRevocationListAbsent,
                componentRevoked,
                invalidComponentCertificateExtendedKeyUse,
                componentCertificateRevoked,
                invalidComponentCertificateRoot,
                componentHighSecurityCertificateRevoked,
                componentLowSecurityCertificateRevoked,
                bootDriverVerificationFailed,
                componentSignedWithTestCertificate,
                encryptionFailure,
            }
            export interface IRevocationAndRenewalItem {
                headerHash: string;
                name: string;
                publicKeyHash: string;
                reasons: Windows.Media.Protection.RevocationAndRenewalReasons;
                renewalId: string;
            }
            export class ComponentRenewal {
                static renewSystemComponentsAsync(information: Windows.Media.Protection.RevocationAndRenewalInformation): Windows.Foundation.IAsyncOperationWithProgress<Windows.Media.Protection.RenewalStatus, number>;
            }
            export enum RenewalStatus {
                notStarted,
                updatesInProgress,
                userCancelled,
                appComponentsMayNeedUpdating,
                noComponentsFound,
            }
            export interface IComponentRenewalStatics {
                renewSystemComponentsAsync(information: Windows.Media.Protection.RevocationAndRenewalInformation): Windows.Foundation.IAsyncOperationWithProgress<Windows.Media.Protection.RenewalStatus, number>;
            }
        }
    }
}
declare module Windows {
    export module Media {
        export module Transcoding {
            export enum TranscodeFailureReason {
                none,
                unknown,
                invalidProfile,
                codecNotFound,
            }
            export interface IMediaTranscoder {
                alwaysReencode: boolean;
                hardwareAccelerationEnabled: boolean;
                trimStartTime: number;
                trimStopTime: number;
                addAudioEffect(activatableClassId: string): void;
                addAudioEffect(activatableClassId: string, effectRequired: boolean, configuration: Windows.Foundation.Collections.IPropertySet): void;
                addVideoEffect(activatableClassId: string): void;
                addVideoEffect(activatableClassId: string, effectRequired: boolean, configuration: Windows.Foundation.Collections.IPropertySet): void;
                clearEffects(): void;
                prepareFileTranscodeAsync(source: Windows.Storage.IStorageFile, destination: Windows.Storage.IStorageFile, profile: Windows.Media.MediaProperties.MediaEncodingProfile): Windows.Foundation.IAsyncOperation<Windows.Media.Transcoding.PrepareTranscodeResult>;
                prepareStreamTranscodeAsync(source: Windows.Storage.Streams.IRandomAccessStream, destination: Windows.Storage.Streams.IRandomAccessStream, profile: Windows.Media.MediaProperties.MediaEncodingProfile): Windows.Foundation.IAsyncOperation<Windows.Media.Transcoding.PrepareTranscodeResult>;
            }
            export class PrepareTranscodeResult implements Windows.Media.Transcoding.IPrepareTranscodeResult {
                canTranscode: boolean;
                failureReason: Windows.Media.Transcoding.TranscodeFailureReason;
                transcodeAsync(): Windows.Foundation.IAsyncActionWithProgress<number>;
            }
            export interface IPrepareTranscodeResult {
                canTranscode: boolean;
                failureReason: Windows.Media.Transcoding.TranscodeFailureReason;
                transcodeAsync(): Windows.Foundation.IAsyncActionWithProgress<number>;
            }
            export class MediaTranscoder implements Windows.Media.Transcoding.IMediaTranscoder {
                alwaysReencode: boolean;
                hardwareAccelerationEnabled: boolean;
                trimStartTime: number;
                trimStopTime: number;
                addAudioEffect(activatableClassId: string): void;
                addAudioEffect(activatableClassId: string, effectRequired: boolean, configuration: Windows.Foundation.Collections.IPropertySet): void;
                addVideoEffect(activatableClassId: string): void;
                addVideoEffect(activatableClassId: string, effectRequired: boolean, configuration: Windows.Foundation.Collections.IPropertySet): void;
                clearEffects(): void;
                prepareFileTranscodeAsync(source: Windows.Storage.IStorageFile, destination: Windows.Storage.IStorageFile, profile: Windows.Media.MediaProperties.MediaEncodingProfile): Windows.Foundation.IAsyncOperation<Windows.Media.Transcoding.PrepareTranscodeResult>;
                prepareStreamTranscodeAsync(source: Windows.Storage.Streams.IRandomAccessStream, destination: Windows.Storage.Streams.IRandomAccessStream, profile: Windows.Media.MediaProperties.MediaEncodingProfile): Windows.Foundation.IAsyncOperation<Windows.Media.Transcoding.PrepareTranscodeResult>;
            }
        }
    }
}
declare module Windows {
    export module Networking {
        export module NetworkOperators {
            export enum DataClasses {
                none,
                gprs,
                edge,
                umts,
                hsdpa,
                hsupa,
                lteAdvanced,
                cdma1xRtt,
                cdma1xEvdo,
                cdma1xEvdoRevA,
                cdma1xEvdv,
                cdma3xRtt,
                cdma1xEvdoRevB,
                cdmaUmb,
                custom,
            }
            export enum MobileBroadbandDeviceType {
                unknown,
                embedded,
                removable,
                remote,
            }
            export enum NetworkDeviceStatus {
                deviceNotReady,
                deviceReady,
                simNotInserted,
                badSim,
                deviceHardwareFailure,
                accountNotActivated,
                deviceLocked,
                deviceBlocked,
            }
            export enum NetworkRegistrationState {
                none,
                deregistered,
                searching,
                home,
                roaming,
                partner,
                denied,
            }
            export enum MobileBroadbandRadioState {
                off,
                on,
            }
            export enum NetworkOperatorEventMessageType {
                gsm,
                cdma,
                ussd,
                dataPlanThresholdReached,
                dataPlanReset,
                dataPlanDeleted,
                profileConnected,
                profileDisconnected,
                registeredRoaming,
                registeredHome,
            }
            export enum MobileBroadbandAccountWatcherStatus {
                created,
                started,
                enumerationCompleted,
                stopped,
                aborted,
            }
            export interface IMobileBroadbandAccountStatics {
                availableNetworkAccountIds: Windows.Foundation.Collections.IVectorView<string>;
                createFromNetworkAccountId(networkAccountId: string): Windows.Networking.NetworkOperators.MobileBroadbandAccount;
            }
            export class MobileBroadbandAccount implements Windows.Networking.NetworkOperators.IMobileBroadbandAccount {
                currentDeviceInformation: Windows.Networking.NetworkOperators.MobileBroadbandDeviceInformation;
                currentNetwork: Windows.Networking.NetworkOperators.MobileBroadbandNetwork;
                networkAccountId: string;
                serviceProviderGuid: string;
                serviceProviderName: string;
                static availableNetworkAccountIds: Windows.Foundation.Collections.IVectorView<string>;
                static createFromNetworkAccountId(networkAccountId: string): Windows.Networking.NetworkOperators.MobileBroadbandAccount;
            }
            export interface IMobileBroadbandAccount {
                currentDeviceInformation: Windows.Networking.NetworkOperators.MobileBroadbandDeviceInformation;
                currentNetwork: Windows.Networking.NetworkOperators.MobileBroadbandNetwork;
                networkAccountId: string;
                serviceProviderGuid: string;
                serviceProviderName: string;
            }
            export class MobileBroadbandNetwork implements Windows.Networking.NetworkOperators.IMobileBroadbandNetwork {
                accessPointName: string;
                activationNetworkError: number;
                networkAdapter: Windows.Networking.Connectivity.NetworkAdapter;
                networkRegistrationState: Windows.Networking.NetworkOperators.NetworkRegistrationState;
                packetAttachNetworkError: number;
                registeredDataClass: Windows.Networking.NetworkOperators.DataClasses;
                registeredProviderId: string;
                registeredProviderName: string;
                registrationNetworkError: number;
                showConnectionUI(): void;
            }
            export class MobileBroadbandDeviceInformation implements Windows.Networking.NetworkOperators.IMobileBroadbandDeviceInformation {
                cellularClass: Windows.Devices.Sms.CellularClass;
                currentRadioState: Windows.Networking.NetworkOperators.MobileBroadbandRadioState;
                customDataClass: string;
                dataClasses: Windows.Networking.NetworkOperators.DataClasses;
                deviceId: string;
                deviceType: Windows.Networking.NetworkOperators.MobileBroadbandDeviceType;
                firmwareInformation: string;
                manufacturer: string;
                mobileEquipmentId: string;
                model: string;
                networkDeviceStatus: Windows.Networking.NetworkOperators.NetworkDeviceStatus;
                simIccId: string;
                subscriberId: string;
                telephoneNumbers: Windows.Foundation.Collections.IVectorView<string>;
            }
            export interface IMobileBroadbandDeviceInformation {
                cellularClass: Windows.Devices.Sms.CellularClass;
                currentRadioState: Windows.Networking.NetworkOperators.MobileBroadbandRadioState;
                customDataClass: string;
                dataClasses: Windows.Networking.NetworkOperators.DataClasses;
                deviceId: string;
                deviceType: Windows.Networking.NetworkOperators.MobileBroadbandDeviceType;
                firmwareInformation: string;
                manufacturer: string;
                mobileEquipmentId: string;
                model: string;
                networkDeviceStatus: Windows.Networking.NetworkOperators.NetworkDeviceStatus;
                simIccId: string;
                subscriberId: string;
                telephoneNumbers: Windows.Foundation.Collections.IVectorView<string>;
            }
            export interface IMobileBroadbandNetwork {
                accessPointName: string;
                activationNetworkError: number;
                networkAdapter: Windows.Networking.Connectivity.NetworkAdapter;
                networkRegistrationState: Windows.Networking.NetworkOperators.NetworkRegistrationState;
                packetAttachNetworkError: number;
                registeredDataClass: Windows.Networking.NetworkOperators.DataClasses;
                registeredProviderId: string;
                registeredProviderName: string;
                registrationNetworkError: number;
                showConnectionUI(): void;
            }
            export interface INetworkOperatorNotificationEventDetails {
                encodingType: number;
                message: string;
                networkAccountId: string;
                notificationType: Windows.Networking.NetworkOperators.NetworkOperatorEventMessageType;
                ruleId: string;
                smsMessage: Windows.Devices.Sms.ISmsMessage;
            }
            export class NetworkOperatorNotificationEventDetails implements Windows.Networking.NetworkOperators.INetworkOperatorNotificationEventDetails {
                encodingType: number;
                message: string;
                networkAccountId: string;
                notificationType: Windows.Networking.NetworkOperators.NetworkOperatorEventMessageType;
                ruleId: string;
                smsMessage: Windows.Devices.Sms.ISmsMessage;
            }
            export interface IMobileBroadbandAccountEventArgs {
                networkAccountId: string;
            }
            export class MobileBroadbandAccountEventArgs implements Windows.Networking.NetworkOperators.IMobileBroadbandAccountEventArgs {
                networkAccountId: string;
            }
            export interface IMobileBroadbandAccountUpdatedEventArgs {
                hasDeviceInformationChanged: boolean;
                hasNetworkChanged: boolean;
                networkAccountId: string;
            }
            export class MobileBroadbandAccountUpdatedEventArgs implements Windows.Networking.NetworkOperators.IMobileBroadbandAccountUpdatedEventArgs {
                hasDeviceInformationChanged: boolean;
                hasNetworkChanged: boolean;
                networkAccountId: string;
            }
            export interface IMobileBroadbandAccountWatcher {
                status: Windows.Networking.NetworkOperators.MobileBroadbandAccountWatcherStatus;
                onaccountadded: any/* TODO */;
                onaccountupdated: any/* TODO */;
                onaccountremoved: any/* TODO */;
                onenumerationcompleted: any/* TODO */;
                onstopped: any/* TODO */;
                start(): void;
                stop(): void;
            }
            export class MobileBroadbandAccountWatcher implements Windows.Networking.NetworkOperators.IMobileBroadbandAccountWatcher {
                status: Windows.Networking.NetworkOperators.MobileBroadbandAccountWatcherStatus;
                onaccountadded: any/* TODO */;
                onaccountupdated: any/* TODO */;
                onaccountremoved: any/* TODO */;
                onenumerationcompleted: any/* TODO */;
                onstopped: any/* TODO */;
                start(): void;
                stop(): void;
            }
            export interface IHotspotAuthenticationEventDetails {
                eventToken: string;
            }
            export class HotspotAuthenticationEventDetails implements Windows.Networking.NetworkOperators.IHotspotAuthenticationEventDetails {
                eventToken: string;
            }
            export interface IHotspotAuthenticationContextStatics {
                tryGetAuthenticationContext(evenToken: string): { context: Windows.Networking.NetworkOperators.HotspotAuthenticationContext; isValid: boolean; };
            }
            export class HotspotAuthenticationContext implements Windows.Networking.NetworkOperators.IHotspotAuthenticationContext {
                authenticationUrl: Windows.Foundation.Uri;
                networkAdapter: Windows.Networking.Connectivity.NetworkAdapter;
                redirectMessageUrl: Windows.Foundation.Uri;
                redirectMessageXml: Windows.Data.Xml.Dom.XmlDocument;
                wirelessNetworkId: Uint8Array;
                issueCredentials(userName: string, password: string, extraParameters: string, markAsManualConnectOnFailure: boolean): void;
                abortAuthentication(markAsManual: boolean): void;
                skipAuthentication(): void;
                triggerAttentionRequired(packageRelativeApplicationId: string, applicationParameters: string): void;
                static tryGetAuthenticationContext(evenToken: string): { context: Windows.Networking.NetworkOperators.HotspotAuthenticationContext; isValid: boolean; };
            }
            export interface IHotspotAuthenticationContext {
                authenticationUrl: Windows.Foundation.Uri;
                networkAdapter: Windows.Networking.Connectivity.NetworkAdapter;
                redirectMessageUrl: Windows.Foundation.Uri;
                redirectMessageXml: Windows.Data.Xml.Dom.XmlDocument;
                wirelessNetworkId: Uint8Array;
                issueCredentials(userName: string, password: string, extraParameters: string, markAsManualConnectOnFailure: boolean): void;
                abortAuthentication(markAsManual: boolean): void;
                skipAuthentication(): void;
                triggerAttentionRequired(packageRelativeApplicationId: string, applicationParameters: string): void;
            }
            export enum ProfileMediaType {
                wlan,
                wwan,
            }
            export interface IProvisionFromXmlDocumentResults {
                allElementsProvisioned: boolean;
                provisionResultsXml: string;
            }
            export class ProvisionFromXmlDocumentResults implements Windows.Networking.NetworkOperators.IProvisionFromXmlDocumentResults {
                allElementsProvisioned: boolean;
                provisionResultsXml: string;
            }
            export interface ProfileUsage {
                usageInMegabytes: number;
                lastSyncTime: Date;
            }
            export interface IProvisionedProfile {
                updateCost(value: Windows.Networking.Connectivity.NetworkCostType): void;
                updateUsage(value: Windows.Networking.NetworkOperators.ProfileUsage): void;
            }
            export class ProvisionedProfile implements Windows.Networking.NetworkOperators.IProvisionedProfile {
                updateCost(value: Windows.Networking.Connectivity.NetworkCostType): void;
                updateUsage(value: Windows.Networking.NetworkOperators.ProfileUsage): void;
            }
            export interface IProvisioningAgent {
                provisionFromXmlDocumentAsync(provisioningXmlDocument: string): Windows.Foundation.IAsyncOperation<Windows.Networking.NetworkOperators.ProvisionFromXmlDocumentResults>;
                getProvisionedProfile(mediaType: Windows.Networking.NetworkOperators.ProfileMediaType, profileName: string): Windows.Networking.NetworkOperators.ProvisionedProfile;
            }
            export interface IProvisioningAgentStaticMethods {
                createFromNetworkAccountId(networkAccountId: string): Windows.Networking.NetworkOperators.ProvisioningAgent;
            }
            export class ProvisioningAgent implements Windows.Networking.NetworkOperators.IProvisioningAgent {
                provisionFromXmlDocumentAsync(provisioningXmlDocument: string): Windows.Foundation.IAsyncOperation<Windows.Networking.NetworkOperators.ProvisionFromXmlDocumentResults>;
                getProvisionedProfile(mediaType: Windows.Networking.NetworkOperators.ProfileMediaType, profileName: string): Windows.Networking.NetworkOperators.ProvisionedProfile;
                static createFromNetworkAccountId(networkAccountId: string): Windows.Networking.NetworkOperators.ProvisioningAgent;
            }
            export enum UssdResultCode {
                noActionRequired,
                actionRequired,
                terminated,
                otherLocalClient,
                operationNotSupported,
                networkTimeout,
            }
            export interface IUssdMessage {
                dataCodingScheme: number;
                payloadAsText: string;
                getPayload(): Uint8Array;
                setPayload(value: Uint8Array): void;
            }
            export interface IUssdMessageFactory {
                createMessage(messageText: string): Windows.Networking.NetworkOperators.UssdMessage;
            }
            export class UssdMessage implements Windows.Networking.NetworkOperators.IUssdMessage {
                constructor(messageText: string);
                dataCodingScheme: number;
                payloadAsText: string;
                getPayload(): Uint8Array;
                setPayload(value: Uint8Array): void;
            }
            export interface IUssdReply {
                message: Windows.Networking.NetworkOperators.UssdMessage;
                resultCode: Windows.Networking.NetworkOperators.UssdResultCode;
            }
            export class UssdReply implements Windows.Networking.NetworkOperators.IUssdReply {
                message: Windows.Networking.NetworkOperators.UssdMessage;
                resultCode: Windows.Networking.NetworkOperators.UssdResultCode;
            }
            export interface IUssdSession {
                sendMessageAndGetReplyAsync(message: Windows.Networking.NetworkOperators.UssdMessage): Windows.Foundation.IAsyncOperation<Windows.Networking.NetworkOperators.UssdReply>;
                close(): void;
            }
            export interface IUssdSessionStatics {
                createFromNetworkAccountId(networkAccountId: string): Windows.Networking.NetworkOperators.UssdSession;
                createFromNetworkInterfaceId(networkInterfaceId: string): Windows.Networking.NetworkOperators.UssdSession;
            }
            export class UssdSession implements Windows.Networking.NetworkOperators.IUssdSession {
                sendMessageAndGetReplyAsync(message: Windows.Networking.NetworkOperators.UssdMessage): Windows.Foundation.IAsyncOperation<Windows.Networking.NetworkOperators.UssdReply>;
                close(): void;
                static createFromNetworkAccountId(networkAccountId: string): Windows.Networking.NetworkOperators.UssdSession;
                static createFromNetworkInterfaceId(networkInterfaceId: string): Windows.Networking.NetworkOperators.UssdSession;
            }
        }
    }
}
declare module Windows {
    export module Networking {
        export module BackgroundTransfer {
            export enum BackgroundTransferStatus {
                idle,
                running,
                pausedByApplication,
                pausedCostedNetwork,
                pausedNoNetwork,
                completed,
                canceled,
                error,
            }
            export enum BackgroundTransferCostPolicy {
                default,
                unrestrictedOnly,
                always,
            }
            export interface BackgroundDownloadProgress {
                bytesReceived: number;
                totalBytesToReceive: number;
                status: Windows.Networking.BackgroundTransfer.BackgroundTransferStatus;
                hasResponseChanged: boolean;
                hasRestarted: boolean;
            }
            export interface BackgroundUploadProgress {
                bytesReceived: number;
                bytesSent: number;
                totalBytesToReceive: number;
                totalBytesToSend: number;
                status: Windows.Networking.BackgroundTransfer.BackgroundTransferStatus;
                hasResponseChanged: boolean;
                hasRestarted: boolean;
            }
            export interface IBackgroundTransferBase {
                costPolicy: Windows.Networking.BackgroundTransfer.BackgroundTransferCostPolicy;
                group: string;
                method: string;
                proxyCredential: Windows.Security.Credentials.PasswordCredential;
                serverCredential: Windows.Security.Credentials.PasswordCredential;
                setRequestHeader(headerName: string, headerValue: string): void;
            }
            export interface IBackgroundDownloader extends Windows.Networking.BackgroundTransfer.IBackgroundTransferBase {
                createDownload(uri: Windows.Foundation.Uri, resultFile: Windows.Storage.IStorageFile): Windows.Networking.BackgroundTransfer.DownloadOperation;
                createDownload(uri: Windows.Foundation.Uri, resultFile: Windows.Storage.IStorageFile, requestBodyFile: Windows.Storage.IStorageFile): Windows.Networking.BackgroundTransfer.DownloadOperation;
                createDownloadAsync(uri: Windows.Foundation.Uri, resultFile: Windows.Storage.IStorageFile, requestBodyStream: Windows.Storage.Streams.IInputStream): Windows.Foundation.IAsyncOperation<Windows.Networking.BackgroundTransfer.DownloadOperation>;
            }
            export class DownloadOperation implements Windows.Networking.BackgroundTransfer.IDownloadOperation, Windows.Networking.BackgroundTransfer.IBackgroundTransferOperation {
                progress: Windows.Networking.BackgroundTransfer.BackgroundDownloadProgress;
                resultFile: Windows.Storage.IStorageFile;
                costPolicy: Windows.Networking.BackgroundTransfer.BackgroundTransferCostPolicy;
                group: string;
                guid: string;
                method: string;
                requestedUri: Windows.Foundation.Uri;
                startAsync(): Windows.Foundation.IAsyncOperationWithProgress<Windows.Networking.BackgroundTransfer.DownloadOperation, Windows.Networking.BackgroundTransfer.DownloadOperation>;
                attachAsync(): Windows.Foundation.IAsyncOperationWithProgress<Windows.Networking.BackgroundTransfer.DownloadOperation, Windows.Networking.BackgroundTransfer.DownloadOperation>;
                pause(): void;
                resume(): void;
                getResultStreamAt(position: number): Windows.Storage.Streams.IInputStream;
                getResponseInformation(): Windows.Networking.BackgroundTransfer.ResponseInformation;
            }
            export interface IBackgroundUploader extends Windows.Networking.BackgroundTransfer.IBackgroundTransferBase {
                createUpload(uri: Windows.Foundation.Uri, sourceFile: Windows.Storage.IStorageFile): Windows.Networking.BackgroundTransfer.UploadOperation;
                createUploadFromStreamAsync(uri: Windows.Foundation.Uri, sourceStream: Windows.Storage.Streams.IInputStream): Windows.Foundation.IAsyncOperation<Windows.Networking.BackgroundTransfer.UploadOperation>;
                createUploadAsync(uri: Windows.Foundation.Uri, parts: Windows.Foundation.Collections.IIterable<Windows.Networking.BackgroundTransfer.BackgroundTransferContentPart>): Windows.Foundation.IAsyncOperation<Windows.Networking.BackgroundTransfer.UploadOperation>;
                createUploadAsync(uri: Windows.Foundation.Uri, parts: Windows.Foundation.Collections.IIterable<Windows.Networking.BackgroundTransfer.BackgroundTransferContentPart>, subType: string): Windows.Foundation.IAsyncOperation<Windows.Networking.BackgroundTransfer.UploadOperation>;
                createUploadAsync(uri: Windows.Foundation.Uri, parts: Windows.Foundation.Collections.IIterable<Windows.Networking.BackgroundTransfer.BackgroundTransferContentPart>, subType: string, boundary: string): Windows.Foundation.IAsyncOperation<Windows.Networking.BackgroundTransfer.UploadOperation>;
            }
            export class UploadOperation implements Windows.Networking.BackgroundTransfer.IUploadOperation, Windows.Networking.BackgroundTransfer.IBackgroundTransferOperation {
                progress: Windows.Networking.BackgroundTransfer.BackgroundUploadProgress;
                sourceFile: Windows.Storage.IStorageFile;
                costPolicy: Windows.Networking.BackgroundTransfer.BackgroundTransferCostPolicy;
                group: string;
                guid: string;
                method: string;
                requestedUri: Windows.Foundation.Uri;
                startAsync(): Windows.Foundation.IAsyncOperationWithProgress<Windows.Networking.BackgroundTransfer.UploadOperation, Windows.Networking.BackgroundTransfer.UploadOperation>;
                attachAsync(): Windows.Foundation.IAsyncOperationWithProgress<Windows.Networking.BackgroundTransfer.UploadOperation, Windows.Networking.BackgroundTransfer.UploadOperation>;
                getResultStreamAt(position: number): Windows.Storage.Streams.IInputStream;
                getResponseInformation(): Windows.Networking.BackgroundTransfer.ResponseInformation;
            }
            export class BackgroundTransferContentPart implements Windows.Networking.BackgroundTransfer.IBackgroundTransferContentPart {
                constructor(name: string);
                constructor(name: string, fileName: string);
                constructor();
                setHeader(headerName: string, headerValue: string): void;
                setText(value: string): void;
                setFile(value: Windows.Storage.IStorageFile): void;
            }
            export interface IBackgroundTransferOperation {
                costPolicy: Windows.Networking.BackgroundTransfer.BackgroundTransferCostPolicy;
                group: string;
                guid: string;
                method: string;
                requestedUri: Windows.Foundation.Uri;
                getResultStreamAt(position: number): Windows.Storage.Streams.IInputStream;
                getResponseInformation(): Windows.Networking.BackgroundTransfer.ResponseInformation;
            }
            export class ResponseInformation implements Windows.Networking.BackgroundTransfer.IResponseInformation {
                actualUri: Windows.Foundation.Uri;
                headers: Windows.Foundation.Collections.IMapView<string, string>;
                isResumable: boolean;
                statusCode: number;
            }
            export interface IDownloadOperation extends Windows.Networking.BackgroundTransfer.IBackgroundTransferOperation {
                progress: Windows.Networking.BackgroundTransfer.BackgroundDownloadProgress;
                resultFile: Windows.Storage.IStorageFile;
                startAsync(): Windows.Foundation.IAsyncOperationWithProgress<Windows.Networking.BackgroundTransfer.DownloadOperation, Windows.Networking.BackgroundTransfer.DownloadOperation>;
                attachAsync(): Windows.Foundation.IAsyncOperationWithProgress<Windows.Networking.BackgroundTransfer.DownloadOperation, Windows.Networking.BackgroundTransfer.DownloadOperation>;
                pause(): void;
                resume(): void;
            }
            export interface IUploadOperation extends Windows.Networking.BackgroundTransfer.IBackgroundTransferOperation {
                progress: Windows.Networking.BackgroundTransfer.BackgroundUploadProgress;
                sourceFile: Windows.Storage.IStorageFile;
                startAsync(): Windows.Foundation.IAsyncOperationWithProgress<Windows.Networking.BackgroundTransfer.UploadOperation, Windows.Networking.BackgroundTransfer.UploadOperation>;
                attachAsync(): Windows.Foundation.IAsyncOperationWithProgress<Windows.Networking.BackgroundTransfer.UploadOperation, Windows.Networking.BackgroundTransfer.UploadOperation>;
            }
            export interface IBackgroundDownloaderStaticMethods {
                getCurrentDownloadsAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Networking.BackgroundTransfer.DownloadOperation>>;
                getCurrentDownloadsAsync(group: string): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Networking.BackgroundTransfer.DownloadOperation>>;
            }
            export interface IBackgroundUploaderStaticMethods {
                getCurrentUploadsAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Networking.BackgroundTransfer.UploadOperation>>;
                getCurrentUploadsAsync(group: string): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Networking.BackgroundTransfer.UploadOperation>>;
            }
            export interface IResponseInformation {
                actualUri: Windows.Foundation.Uri;
                headers: Windows.Foundation.Collections.IMapView<string, string>;
                isResumable: boolean;
                statusCode: number;
            }
            export interface IBackgroundTransferErrorStaticMethods {
                getStatus(hresult: number): Windows.Web.WebErrorStatus;
            }
            export interface IBackgroundTransferContentPart {
                setHeader(headerName: string, headerValue: string): void;
                setText(value: string): void;
                setFile(value: Windows.Storage.IStorageFile): void;
            }
            export interface IBackgroundTransferContentPartFactory {
                createWithName(name: string): Windows.Networking.BackgroundTransfer.BackgroundTransferContentPart;
                createWithNameAndFileName(name: string, fileName: string): Windows.Networking.BackgroundTransfer.BackgroundTransferContentPart;
            }
            export class BackgroundDownloader implements Windows.Networking.BackgroundTransfer.IBackgroundDownloader, Windows.Networking.BackgroundTransfer.IBackgroundTransferBase {
                costPolicy: Windows.Networking.BackgroundTransfer.BackgroundTransferCostPolicy;
                group: string;
                method: string;
                proxyCredential: Windows.Security.Credentials.PasswordCredential;
                serverCredential: Windows.Security.Credentials.PasswordCredential;
                createDownload(uri: Windows.Foundation.Uri, resultFile: Windows.Storage.IStorageFile): Windows.Networking.BackgroundTransfer.DownloadOperation;
                createDownload(uri: Windows.Foundation.Uri, resultFile: Windows.Storage.IStorageFile, requestBodyFile: Windows.Storage.IStorageFile): Windows.Networking.BackgroundTransfer.DownloadOperation;
                createDownloadAsync(uri: Windows.Foundation.Uri, resultFile: Windows.Storage.IStorageFile, requestBodyStream: Windows.Storage.Streams.IInputStream): Windows.Foundation.IAsyncOperation<Windows.Networking.BackgroundTransfer.DownloadOperation>;
                setRequestHeader(headerName: string, headerValue: string): void;
                static getCurrentDownloadsAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Networking.BackgroundTransfer.DownloadOperation>>;
                static getCurrentDownloadsAsync(group: string): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Networking.BackgroundTransfer.DownloadOperation>>;
            }
            export class BackgroundUploader implements Windows.Networking.BackgroundTransfer.IBackgroundUploader, Windows.Networking.BackgroundTransfer.IBackgroundTransferBase {
                costPolicy: Windows.Networking.BackgroundTransfer.BackgroundTransferCostPolicy;
                group: string;
                method: string;
                proxyCredential: Windows.Security.Credentials.PasswordCredential;
                serverCredential: Windows.Security.Credentials.PasswordCredential;
                createUpload(uri: Windows.Foundation.Uri, sourceFile: Windows.Storage.IStorageFile): Windows.Networking.BackgroundTransfer.UploadOperation;
                createUploadFromStreamAsync(uri: Windows.Foundation.Uri, sourceStream: Windows.Storage.Streams.IInputStream): Windows.Foundation.IAsyncOperation<Windows.Networking.BackgroundTransfer.UploadOperation>;
                createUploadAsync(uri: Windows.Foundation.Uri, parts: Windows.Foundation.Collections.IIterable<Windows.Networking.BackgroundTransfer.BackgroundTransferContentPart>): Windows.Foundation.IAsyncOperation<Windows.Networking.BackgroundTransfer.UploadOperation>;
                createUploadAsync(uri: Windows.Foundation.Uri, parts: Windows.Foundation.Collections.IIterable<Windows.Networking.BackgroundTransfer.BackgroundTransferContentPart>, subType: string): Windows.Foundation.IAsyncOperation<Windows.Networking.BackgroundTransfer.UploadOperation>;
                createUploadAsync(uri: Windows.Foundation.Uri, parts: Windows.Foundation.Collections.IIterable<Windows.Networking.BackgroundTransfer.BackgroundTransferContentPart>, subType: string, boundary: string): Windows.Foundation.IAsyncOperation<Windows.Networking.BackgroundTransfer.UploadOperation>;
                setRequestHeader(headerName: string, headerValue: string): void;
                static getCurrentUploadsAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Networking.BackgroundTransfer.UploadOperation>>;
                static getCurrentUploadsAsync(group: string): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Networking.BackgroundTransfer.UploadOperation>>;
            }
            export class BackgroundTransferError {
                static getStatus(hresult: number): Windows.Web.WebErrorStatus;
            }
        }
    }
}
declare module Windows {
    export module Networking {
        export module Proximity {
            export interface IProximityMessage {
                data: Windows.Storage.Streams.IBuffer;
                dataAsString: string;
                messageType: string;
                subscriptionId: number;
            }
            export class ProximityMessage implements Windows.Networking.Proximity.IProximityMessage {
                data: Windows.Storage.Streams.IBuffer;
                dataAsString: string;
                messageType: string;
                subscriptionId: number;
            }
            export interface MessageReceivedHandler {
                (sender: Windows.Networking.Proximity.ProximityDevice, message: Windows.Networking.Proximity.ProximityMessage): void;
            }
            export class ProximityDevice implements Windows.Networking.Proximity.IProximityDevice {
                bitsPerSecond: number;
                deviceId: string;
                maxMessageBytes: number;
                subscribeForMessage(messageType: string, messageReceivedHandler: Windows.Networking.Proximity.MessageReceivedHandler): number;
                publishMessage(messageType: string, message: string): number;
                publishMessage(messageType: string, message: string, messageTransmittedHandler: Windows.Networking.Proximity.MessageTransmittedHandler): number;
                publishBinaryMessage(messageType: string, message: Windows.Storage.Streams.IBuffer): number;
                publishBinaryMessage(messageType: string, message: Windows.Storage.Streams.IBuffer, messageTransmittedHandler: Windows.Networking.Proximity.MessageTransmittedHandler): number;
                publishUriMessage(message: Windows.Foundation.Uri): number;
                publishUriMessage(message: Windows.Foundation.Uri, messageTransmittedHandler: Windows.Networking.Proximity.MessageTransmittedHandler): number;
                stopSubscribingForMessage(subscriptionId: number): void;
                stopPublishingMessage(messageId: number): void;
                ondevicearrived: any/* TODO */;
                ondevicedeparted: any/* TODO */;
                static getDeviceSelector(): string;
                static getDefault(): Windows.Networking.Proximity.ProximityDevice;
                static fromId(deviceInterfaceId: string): Windows.Networking.Proximity.ProximityDevice;
            }
            export interface MessageTransmittedHandler {
                (sender: Windows.Networking.Proximity.ProximityDevice, messageId: number): void;
            }
            export interface DeviceArrivedEventHandler {
                (sender: Windows.Networking.Proximity.ProximityDevice): void;
            }
            export interface DeviceDepartedEventHandler {
                (sender: Windows.Networking.Proximity.ProximityDevice): void;
            }
            export interface IProximityDevice {
                bitsPerSecond: number;
                deviceId: string;
                maxMessageBytes: number;
                subscribeForMessage(messageType: string, messageReceivedHandler: Windows.Networking.Proximity.MessageReceivedHandler): number;
                publishMessage(messageType: string, message: string): number;
                publishMessage(messageType: string, message: string, messageTransmittedHandler: Windows.Networking.Proximity.MessageTransmittedHandler): number;
                publishBinaryMessage(messageType: string, message: Windows.Storage.Streams.IBuffer): number;
                publishBinaryMessage(messageType: string, message: Windows.Storage.Streams.IBuffer, messageTransmittedHandler: Windows.Networking.Proximity.MessageTransmittedHandler): number;
                publishUriMessage(message: Windows.Foundation.Uri): number;
                publishUriMessage(message: Windows.Foundation.Uri, messageTransmittedHandler: Windows.Networking.Proximity.MessageTransmittedHandler): number;
                stopSubscribingForMessage(subscriptionId: number): void;
                stopPublishingMessage(messageId: number): void;
                ondevicearrived: any/* TODO */;
                ondevicedeparted: any/* TODO */;
            }
            export interface IProximityDeviceStatics {
                getDeviceSelector(): string;
                getDefault(): Windows.Networking.Proximity.ProximityDevice;
                fromId(deviceInterfaceId: string): Windows.Networking.Proximity.ProximityDevice;
            }
            export enum TriggeredConnectState {
                peerFound,
                listening,
                connecting,
                completed,
                canceled,
                failed,
            }
            export interface ITriggeredConnectionStateChangedEventArgs {
                id: number;
                socket: Windows.Networking.Sockets.StreamSocket;
                state: Windows.Networking.Proximity.TriggeredConnectState;
            }
            export class TriggeredConnectionStateChangedEventArgs implements Windows.Networking.Proximity.ITriggeredConnectionStateChangedEventArgs {
                id: number;
                socket: Windows.Networking.Sockets.StreamSocket;
                state: Windows.Networking.Proximity.TriggeredConnectState;
            }
            export interface IPeerInformation {
                displayName: string;
            }
            export class PeerInformation implements Windows.Networking.Proximity.IPeerInformation {
                displayName: string;
            }
            export interface IConnectionRequestedEventArgs {
                peerInformation: Windows.Networking.Proximity.PeerInformation;
            }
            export class ConnectionRequestedEventArgs implements Windows.Networking.Proximity.IConnectionRequestedEventArgs {
                peerInformation: Windows.Networking.Proximity.PeerInformation;
            }
            export enum PeerDiscoveryTypes {
                none,
                browse,
                triggered,
            }
            export interface IPeerFinderStatics {
                allowBluetooth: boolean;
                allowInfrastructure: boolean;
                allowWiFiDirect: boolean;
                alternateIdentities: Windows.Foundation.Collections.IMap<string, string>;
                displayName: string;
                supportedDiscoveryTypes: Windows.Networking.Proximity.PeerDiscoveryTypes;
                start(): void;
                start(peerMessage: string): void;
                stop(): void;
                ontriggeredconnectionstatechanged: any/* TODO */;
                onconnectionrequested: any/* TODO */;
                findAllPeersAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Networking.Proximity.PeerInformation>>;
                connectAsync(peerInformation: Windows.Networking.Proximity.PeerInformation): Windows.Foundation.IAsyncOperation<Windows.Networking.Sockets.StreamSocket>;
            }
            export class PeerFinder {
                static allowBluetooth: boolean;
                static allowInfrastructure: boolean;
                static allowWiFiDirect: boolean;
                static alternateIdentities: Windows.Foundation.Collections.IMap<string, string>;
                static displayName: string;
                static supportedDiscoveryTypes: Windows.Networking.Proximity.PeerDiscoveryTypes;
                static start(): void;
                static start(peerMessage: string): void;
                static stop(): void;
                static ontriggeredconnectionstatechanged: any/* TODO */;
                static onconnectionrequested: any/* TODO */;
                static findAllPeersAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Networking.Proximity.PeerInformation>>;
                static connectAsync(peerInformation: Windows.Networking.Proximity.PeerInformation): Windows.Foundation.IAsyncOperation<Windows.Networking.Sockets.StreamSocket>;
            }
        }
    }
}
declare module Windows {
    export module Networking {
        export module Sockets {
            export enum ControlChannelTriggerStatus {
                hardwareSlotRequested,
                softwareSlotAllocated,
                hardwareSlotAllocated,
                policyError,
                systemError,
                transportDisconnected,
                serviceUnavailable,
            }
            export enum ControlChannelTriggerResourceType {
                requestSoftwareSlot,
                requestHardwareSlot,
            }
            export enum ControlChannelTriggerResetReason {
                fastUserSwitched,
                lowPowerExit,
            }
            export interface IControlChannelTrigger extends Windows.Foundation.IClosable {
                controlChannelTriggerId: string;
                currentKeepAliveIntervalInMinutes: number;
                keepAliveTrigger: Windows.ApplicationModel.Background.IBackgroundTrigger;
                pushNotificationTrigger: Windows.ApplicationModel.Background.IBackgroundTrigger;
                serverKeepAliveIntervalInMinutes: number;
                transportObject: any;
                usingTransport(transport: any): void;
                waitForPushEnabled(): Windows.Networking.Sockets.ControlChannelTriggerStatus;
                decreaseNetworkKeepAliveInterval(): void;
                flushTransport(): void;
            }
            export interface IControlChannelTriggerFactory {
                createControlChannelTrigger(channelId: string, serverKeepAliveIntervalInMinutes: number): Windows.Networking.Sockets.ControlChannelTrigger;
                createControlChannelTrigger(channelId: string, serverKeepAliveIntervalInMinutes: number, resourceRequestType: Windows.Networking.Sockets.ControlChannelTriggerResourceType): Windows.Networking.Sockets.ControlChannelTrigger;
            }
            export class ControlChannelTrigger implements Windows.Networking.Sockets.IControlChannelTrigger, Windows.Foundation.IClosable {
                constructor(channelId: string, serverKeepAliveIntervalInMinutes: number);
                constructor(channelId: string, serverKeepAliveIntervalInMinutes: number, resourceRequestType: Windows.Networking.Sockets.ControlChannelTriggerResourceType);
                controlChannelTriggerId: string;
                currentKeepAliveIntervalInMinutes: number;
                keepAliveTrigger: Windows.ApplicationModel.Background.IBackgroundTrigger;
                pushNotificationTrigger: Windows.ApplicationModel.Background.IBackgroundTrigger;
                serverKeepAliveIntervalInMinutes: number;
                transportObject: any;
                usingTransport(transport: any): void;
                waitForPushEnabled(): Windows.Networking.Sockets.ControlChannelTriggerStatus;
                decreaseNetworkKeepAliveInterval(): void;
                flushTransport(): void;
                dispose(): void;
                close(): void;
            }
            export interface IControlChannelTriggerEventDetails {
                controlChannelTrigger: Windows.Networking.Sockets.ControlChannelTrigger;
            }
            export interface IControlChannelTriggerResetEventDetails {
                hardwareSlotReset: boolean;
                resetReason: Windows.Networking.Sockets.ControlChannelTriggerResetReason;
                softwareSlotReset: boolean;
            }
            export enum SocketMessageType {
                binary,
                utf8,
            }
            export enum SocketProtectionLevel {
                plainSocket,
                ssl,
                sslAllowNullEncryption,
            }
            export enum SocketQualityOfService {
                normal,
                lowLatency,
            }
            export enum SocketErrorStatus {
                unknown,
                operationAborted,
                httpInvalidServerResponse,
                connectionTimedOut,
                addressFamilyNotSupported,
                socketTypeNotSupported,
                hostNotFound,
                noDataRecordOfRequestedType,
                nonAuthoritativeHostNotFound,
                classTypeNotFound,
                addressAlreadyInUse,
                cannotAssignRequestedAddress,
                connectionRefused,
                networkIsUnreachable,
                unreachableHost,
                networkIsDown,
                networkDroppedConnectionOnReset,
                softwareCausedConnectionAbort,
                connectionResetByPeer,
                hostIsDown,
                noAddressesFound,
                tooManyOpenFiles,
                messageTooLong,
                certificateExpired,
                certificateUntrustedRoot,
                certificateCommonNameIsIncorrect,
                certificateWrongUsage,
                certificateRevoked,
                certificateNoRevocationCheck,
                certificateRevocationServerOffline,
                certificateIsInvalid,
            }
            export interface RoundTripTimeStatistics {
                variance: number;
                max: number;
                min: number;
                sum: number;
            }
            export interface BandwidthStatistics {
                outboundBitsPerSecond: number;
                inboundBitsPerSecond: number;
                outboundBitsPerSecondInstability: number;
                inboundBitsPerSecondInstability: number;
                outboundBandwidthPeaked: boolean;
                inboundBandwidthPeaked: boolean;
            }
            export interface IDatagramSocketMessageReceivedEventArgs {
                localAddress: Windows.Networking.HostName;
                remoteAddress: Windows.Networking.HostName;
                remotePort: string;
                getDataReader(): Windows.Storage.Streams.DataReader;
                getDataStream(): Windows.Storage.Streams.IInputStream;
            }
            export interface IMessageWebSocketMessageReceivedEventArgs {
                messageType: Windows.Networking.Sockets.SocketMessageType;
                getDataReader(): Windows.Storage.Streams.DataReader;
                getDataStream(): Windows.Storage.Streams.IInputStream;
            }
            export interface IWebSocketClosedEventArgs {
                code: number;
                reason: string;
            }
            export interface IDatagramSocketInformation {
                localAddress: Windows.Networking.HostName;
                localPort: string;
                remoteAddress: Windows.Networking.HostName;
                remotePort: string;
            }
            export interface IDatagramSocketControl {
                outboundUnicastHopLimit: number;
                qualityOfService: Windows.Networking.Sockets.SocketQualityOfService;
            }
            export interface IDatagramSocketStatics {
                getEndpointPairsAsync(remoteHostName: Windows.Networking.HostName, remoteServiceName: string): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Networking.EndpointPair>>;
                getEndpointPairsAsync(remoteHostName: Windows.Networking.HostName, remoteServiceName: string, sortOptions: Windows.Networking.HostNameSortOptions): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Networking.EndpointPair>>;
            }
            export interface IDatagramSocket extends Windows.Foundation.IClosable {
                control: Windows.Networking.Sockets.DatagramSocketControl;
                information: Windows.Networking.Sockets.DatagramSocketInformation;
                outputStream: Windows.Storage.Streams.IOutputStream;
                connectAsync(remoteHostName: Windows.Networking.HostName, remoteServiceName: string): Windows.Foundation.IAsyncAction;
                connectAsync(endpointPair: Windows.Networking.EndpointPair): Windows.Foundation.IAsyncAction;
                bindServiceNameAsync(localServiceName: string): Windows.Foundation.IAsyncAction;
                bindEndpointAsync(localHostName: Windows.Networking.HostName, localServiceName: string): Windows.Foundation.IAsyncAction;
                joinMulticastGroup(host: Windows.Networking.HostName): void;
                getOutputStreamAsync(remoteHostName: Windows.Networking.HostName, remoteServiceName: string): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IOutputStream>;
                getOutputStreamAsync(endpointPair: Windows.Networking.EndpointPair): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IOutputStream>;
                onmessagereceived: any/* TODO */;
            }
            export class DatagramSocketControl implements Windows.Networking.Sockets.IDatagramSocketControl {
                outboundUnicastHopLimit: number;
                qualityOfService: Windows.Networking.Sockets.SocketQualityOfService;
            }
            export class DatagramSocketInformation implements Windows.Networking.Sockets.IDatagramSocketInformation {
                localAddress: Windows.Networking.HostName;
                localPort: string;
                remoteAddress: Windows.Networking.HostName;
                remotePort: string;
            }
            export class DatagramSocket implements Windows.Networking.Sockets.IDatagramSocket, Windows.Foundation.IClosable {
                control: Windows.Networking.Sockets.DatagramSocketControl;
                information: Windows.Networking.Sockets.DatagramSocketInformation;
                outputStream: Windows.Storage.Streams.IOutputStream;
                connectAsync(remoteHostName: Windows.Networking.HostName, remoteServiceName: string): Windows.Foundation.IAsyncAction;
                connectAsync(endpointPair: Windows.Networking.EndpointPair): Windows.Foundation.IAsyncAction;
                bindServiceNameAsync(localServiceName: string): Windows.Foundation.IAsyncAction;
                bindEndpointAsync(localHostName: Windows.Networking.HostName, localServiceName: string): Windows.Foundation.IAsyncAction;
                joinMulticastGroup(host: Windows.Networking.HostName): void;
                getOutputStreamAsync(remoteHostName: Windows.Networking.HostName, remoteServiceName: string): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IOutputStream>;
                getOutputStreamAsync(endpointPair: Windows.Networking.EndpointPair): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IOutputStream>;
                onmessagereceived: any/* TODO */;
                dispose(): void;
                static getEndpointPairsAsync(remoteHostName: Windows.Networking.HostName, remoteServiceName: string): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Networking.EndpointPair>>;
                static getEndpointPairsAsync(remoteHostName: Windows.Networking.HostName, remoteServiceName: string, sortOptions: Windows.Networking.HostNameSortOptions): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Networking.EndpointPair>>;
                close(): void;
            }
            export class DatagramSocketMessageReceivedEventArgs implements Windows.Networking.Sockets.IDatagramSocketMessageReceivedEventArgs {
                localAddress: Windows.Networking.HostName;
                remoteAddress: Windows.Networking.HostName;
                remotePort: string;
                getDataReader(): Windows.Storage.Streams.DataReader;
                getDataStream(): Windows.Storage.Streams.IInputStream;
            }
            export interface IStreamSocketInformation {
                bandwidthStatistics: Windows.Networking.Sockets.BandwidthStatistics;
                localAddress: Windows.Networking.HostName;
                localPort: string;
                protectionLevel: Windows.Networking.Sockets.SocketProtectionLevel;
                remoteAddress: Windows.Networking.HostName;
                remoteHostName: Windows.Networking.HostName;
                remotePort: string;
                remoteServiceName: string;
                roundTripTimeStatistics: Windows.Networking.Sockets.RoundTripTimeStatistics;
                sessionKey: Windows.Storage.Streams.IBuffer;
            }
            export interface IStreamSocketControl {
                keepAlive: boolean;
                noDelay: boolean;
                outboundBufferSizeInBytes: number;
                outboundUnicastHopLimit: number;
                qualityOfService: Windows.Networking.Sockets.SocketQualityOfService;
            }
            export interface IStreamSocket extends Windows.Foundation.IClosable {
                control: Windows.Networking.Sockets.StreamSocketControl;
                information: Windows.Networking.Sockets.StreamSocketInformation;
                inputStream: Windows.Storage.Streams.IInputStream;
                outputStream: Windows.Storage.Streams.IOutputStream;
                connectAsync(endpointPair: Windows.Networking.EndpointPair): Windows.Foundation.IAsyncAction;
                connectAsync(remoteHostName: Windows.Networking.HostName, remoteServiceName: string): Windows.Foundation.IAsyncAction;
                connectAsync(endpointPair: Windows.Networking.EndpointPair, protectionLevel: Windows.Networking.Sockets.SocketProtectionLevel): Windows.Foundation.IAsyncAction;
                connectAsync(remoteHostName: Windows.Networking.HostName, remoteServiceName: string, protectionLevel: Windows.Networking.Sockets.SocketProtectionLevel): Windows.Foundation.IAsyncAction;
                upgradeToSslAsync(protectionLevel: Windows.Networking.Sockets.SocketProtectionLevel, validationHostName: Windows.Networking.HostName): Windows.Foundation.IAsyncAction;
            }
            export class StreamSocketControl implements Windows.Networking.Sockets.IStreamSocketControl {
                keepAlive: boolean;
                noDelay: boolean;
                outboundBufferSizeInBytes: number;
                outboundUnicastHopLimit: number;
                qualityOfService: Windows.Networking.Sockets.SocketQualityOfService;
            }
            export class StreamSocketInformation implements Windows.Networking.Sockets.IStreamSocketInformation {
                bandwidthStatistics: Windows.Networking.Sockets.BandwidthStatistics;
                localAddress: Windows.Networking.HostName;
                localPort: string;
                protectionLevel: Windows.Networking.Sockets.SocketProtectionLevel;
                remoteAddress: Windows.Networking.HostName;
                remoteHostName: Windows.Networking.HostName;
                remotePort: string;
                remoteServiceName: string;
                roundTripTimeStatistics: Windows.Networking.Sockets.RoundTripTimeStatistics;
                sessionKey: Windows.Storage.Streams.IBuffer;
            }
            export interface IStreamSocketListenerControl {
                qualityOfService: Windows.Networking.Sockets.SocketQualityOfService;
            }
            export interface IStreamSocketListenerInformation {
                localPort: string;
            }
            export interface IStreamSocketListenerConnectionReceivedEventArgs {
                socket: Windows.Networking.Sockets.StreamSocket;
            }
            export class StreamSocket implements Windows.Networking.Sockets.IStreamSocket, Windows.Foundation.IClosable {
                control: Windows.Networking.Sockets.StreamSocketControl;
                information: Windows.Networking.Sockets.StreamSocketInformation;
                inputStream: Windows.Storage.Streams.IInputStream;
                outputStream: Windows.Storage.Streams.IOutputStream;
                connectAsync(endpointPair: Windows.Networking.EndpointPair): Windows.Foundation.IAsyncAction;
                connectAsync(remoteHostName: Windows.Networking.HostName, remoteServiceName: string): Windows.Foundation.IAsyncAction;
                connectAsync(endpointPair: Windows.Networking.EndpointPair, protectionLevel: Windows.Networking.Sockets.SocketProtectionLevel): Windows.Foundation.IAsyncAction;
                connectAsync(remoteHostName: Windows.Networking.HostName, remoteServiceName: string, protectionLevel: Windows.Networking.Sockets.SocketProtectionLevel): Windows.Foundation.IAsyncAction;
                upgradeToSslAsync(protectionLevel: Windows.Networking.Sockets.SocketProtectionLevel, validationHostName: Windows.Networking.HostName): Windows.Foundation.IAsyncAction;
                dispose(): void;
                close(): void;
            }
            export interface IStreamSocketListener extends Windows.Foundation.IClosable {
                control: Windows.Networking.Sockets.StreamSocketListenerControl;
                information: Windows.Networking.Sockets.StreamSocketListenerInformation;
                bindServiceNameAsync(localServiceName: string): Windows.Foundation.IAsyncAction;
                bindEndpointAsync(localHostName: Windows.Networking.HostName, localServiceName: string): Windows.Foundation.IAsyncAction;
                onconnectionreceived: any/* TODO */;
            }
            export class StreamSocketListenerControl implements Windows.Networking.Sockets.IStreamSocketListenerControl {
                qualityOfService: Windows.Networking.Sockets.SocketQualityOfService;
            }
            export class StreamSocketListenerInformation implements Windows.Networking.Sockets.IStreamSocketListenerInformation {
                localPort: string;
            }
            export class StreamSocketListener implements Windows.Networking.Sockets.IStreamSocketListener, Windows.Foundation.IClosable {
                control: Windows.Networking.Sockets.StreamSocketListenerControl;
                information: Windows.Networking.Sockets.StreamSocketListenerInformation;
                bindServiceNameAsync(localServiceName: string): Windows.Foundation.IAsyncAction;
                bindEndpointAsync(localHostName: Windows.Networking.HostName, localServiceName: string): Windows.Foundation.IAsyncAction;
                onconnectionreceived: any/* TODO */;
                dispose(): void;
                close(): void;
            }
            export class StreamSocketListenerConnectionReceivedEventArgs implements Windows.Networking.Sockets.IStreamSocketListenerConnectionReceivedEventArgs {
                socket: Windows.Networking.Sockets.StreamSocket;
            }
            export interface IWebSocketControl {
                outboundBufferSizeInBytes: number;
                proxyCredential: Windows.Security.Credentials.PasswordCredential;
                serverCredential: Windows.Security.Credentials.PasswordCredential;
                supportedProtocols: Windows.Foundation.Collections.IVector<string>;
            }
            export interface IWebSocketInformation {
                bandwidthStatistics: Windows.Networking.Sockets.BandwidthStatistics;
                localAddress: Windows.Networking.HostName;
                protocol: string;
            }
            export interface IWebSocket extends Windows.Foundation.IClosable {
                outputStream: Windows.Storage.Streams.IOutputStream;
                connectAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncAction;
                setRequestHeader(headerName: string, headerValue: string): void;
                onclosed: any/* TODO */;
                close(): void;
                close(code: number, reason: string): void;
            }
            export class WebSocketClosedEventArgs implements Windows.Networking.Sockets.IWebSocketClosedEventArgs {
                code: number;
                reason: string;
            }
            export interface IMessageWebSocketControl extends Windows.Networking.Sockets.IWebSocketControl {
                maxMessageSize: number;
                messageType: Windows.Networking.Sockets.SocketMessageType;
            }
            export interface IMessageWebSocket extends Windows.Networking.Sockets.IWebSocket, Windows.Foundation.IClosable {
                control: Windows.Networking.Sockets.MessageWebSocketControl;
                information: Windows.Networking.Sockets.MessageWebSocketInformation;
                onmessagereceived: any/* TODO */;
            }
            export class MessageWebSocketControl implements Windows.Networking.Sockets.IMessageWebSocketControl, Windows.Networking.Sockets.IWebSocketControl {
                maxMessageSize: number;
                messageType: Windows.Networking.Sockets.SocketMessageType;
                outboundBufferSizeInBytes: number;
                proxyCredential: Windows.Security.Credentials.PasswordCredential;
                serverCredential: Windows.Security.Credentials.PasswordCredential;
                supportedProtocols: Windows.Foundation.Collections.IVector<string>;
            }
            export class MessageWebSocketInformation implements Windows.Networking.Sockets.IWebSocketInformation {
                bandwidthStatistics: Windows.Networking.Sockets.BandwidthStatistics;
                localAddress: Windows.Networking.HostName;
                protocol: string;
            }
            export class MessageWebSocket implements Windows.Networking.Sockets.IMessageWebSocket, Windows.Networking.Sockets.IWebSocket, Windows.Foundation.IClosable {
                control: Windows.Networking.Sockets.MessageWebSocketControl;
                information: Windows.Networking.Sockets.MessageWebSocketInformation;
                outputStream: Windows.Storage.Streams.IOutputStream;
                onmessagereceived: any/* TODO */;
                connectAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncAction;
                setRequestHeader(headerName: string, headerValue: string): void;
                onclosed: any/* TODO */;
                close(code: number, reason: string): void;
                dispose(): void;
                close(): void;
            }
            export class MessageWebSocketMessageReceivedEventArgs implements Windows.Networking.Sockets.IMessageWebSocketMessageReceivedEventArgs {
                messageType: Windows.Networking.Sockets.SocketMessageType;
                getDataReader(): Windows.Storage.Streams.DataReader;
                getDataStream(): Windows.Storage.Streams.IInputStream;
            }
            export interface IStreamWebSocketControl extends Windows.Networking.Sockets.IWebSocketControl {
                noDelay: boolean;
            }
            export interface IStreamWebSocket extends Windows.Networking.Sockets.IWebSocket, Windows.Foundation.IClosable {
                control: Windows.Networking.Sockets.StreamWebSocketControl;
                information: Windows.Networking.Sockets.StreamWebSocketInformation;
                inputStream: Windows.Storage.Streams.IInputStream;
            }
            export class StreamWebSocketControl implements Windows.Networking.Sockets.IStreamWebSocketControl, Windows.Networking.Sockets.IWebSocketControl {
                noDelay: boolean;
                outboundBufferSizeInBytes: number;
                proxyCredential: Windows.Security.Credentials.PasswordCredential;
                serverCredential: Windows.Security.Credentials.PasswordCredential;
                supportedProtocols: Windows.Foundation.Collections.IVector<string>;
            }
            export class StreamWebSocketInformation implements Windows.Networking.Sockets.IWebSocketInformation {
                bandwidthStatistics: Windows.Networking.Sockets.BandwidthStatistics;
                localAddress: Windows.Networking.HostName;
                protocol: string;
            }
            export interface ISocketErrorStatics {
                getStatus(hresult: number): Windows.Networking.Sockets.SocketErrorStatus;
            }
            export interface IWebSocketErrorStatics {
                getStatus(hresult: number): Windows.Web.WebErrorStatus;
            }
            export class StreamWebSocket implements Windows.Networking.Sockets.IStreamWebSocket, Windows.Networking.Sockets.IWebSocket, Windows.Foundation.IClosable {
                control: Windows.Networking.Sockets.StreamWebSocketControl;
                information: Windows.Networking.Sockets.StreamWebSocketInformation;
                inputStream: Windows.Storage.Streams.IInputStream;
                outputStream: Windows.Storage.Streams.IOutputStream;
                connectAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncAction;
                setRequestHeader(headerName: string, headerValue: string): void;
                onclosed: any/* TODO */;
                close(code: number, reason: string): void;
                dispose(): void;
                close(): void;
            }
            export class WebSocketKeepAlive implements Windows.ApplicationModel.Background.IBackgroundTask {
                run(taskInstance: Windows.ApplicationModel.Background.IBackgroundTaskInstance): void;
            }
            export class SocketError {
                static getStatus(hresult: number): Windows.Networking.Sockets.SocketErrorStatus;
            }
            export class WebSocketError {
                static getStatus(hresult: number): Windows.Web.WebErrorStatus;
            }
        }
    }
}
declare module Windows {
    export module Networking {
        export enum HostNameSortOptions {
            none,
            optimizeForLongConnections,
        }
        export enum HostNameType {
            domainName,
            ipv4,
            ipv6,
            bluetooth,
        }
        export interface IHostNameStatics {
            compare(value1: string, value2: string): number;
        }
        export interface IHostName {
            canonicalName: string;
            displayName: string;
            iPInformation: Windows.Networking.Connectivity.IPInformation;
            rawName: string;
            type: Windows.Networking.HostNameType;
            isEqual(hostName: Windows.Networking.HostName): boolean;
        }
        export class HostName implements Windows.Networking.IHostName {
            constructor(hostName: string);
            canonicalName: string;
            displayName: string;
            iPInformation: Windows.Networking.Connectivity.IPInformation;
            rawName: string;
            type: Windows.Networking.HostNameType;
            isEqual(hostName: Windows.Networking.HostName): boolean;
            static compare(value1: string, value2: string): number;
        }
        export interface IHostNameFactory {
            createHostName(hostName: string): Windows.Networking.HostName;
        }
        export interface IEndpointPair {
            localHostName: Windows.Networking.HostName;
            localServiceName: string;
            remoteHostName: Windows.Networking.HostName;
            remoteServiceName: string;
        }
        export interface IEndpointPairFactory {
            createEndpointPair(localHostName: Windows.Networking.HostName, localServiceName: string, remoteHostName: Windows.Networking.HostName, remoteServiceName: string): Windows.Networking.EndpointPair;
        }
        export class EndpointPair implements Windows.Networking.IEndpointPair {
            constructor(localHostName: Windows.Networking.HostName, localServiceName: string, remoteHostName: Windows.Networking.HostName, remoteServiceName: string);
            localHostName: Windows.Networking.HostName;
            localServiceName: string;
            remoteHostName: Windows.Networking.HostName;
            remoteServiceName: string;
        }
    }
}
declare module Windows {
    export module Networking {
        export module Connectivity {
            export class IPInformation implements Windows.Networking.Connectivity.IIPInformation {
                networkAdapter: Windows.Networking.Connectivity.NetworkAdapter;
                prefixLength: number;
            }
            export enum NetworkCostType {
                unknown,
                unrestricted,
                fixed,
                variable,
            }
            export enum NetworkConnectivityLevel {
                none,
                localAccess,
                constrainedInternetAccess,
                internetAccess,
            }
            export enum NetworkTypes {
                none,
                internet,
                privateNetwork,
            }
            export enum RoamingStates {
                none,
                notRoaming,
                roaming,
            }
            export enum NetworkAuthenticationType {
                none,
                unknown,
                open80211,
                sharedKey80211,
                wpa,
                wpaPsk,
                wpaNone,
                rsna,
                rsnaPsk,
                ihv,
            }
            export enum NetworkEncryptionType {
                none,
                unknown,
                wep,
                wep40,
                wep104,
                tkip,
                ccmp,
                wpaUseGroup,
                rsnUseGroup,
                ihv,
            }
            export interface IDataUsage {
                bytesReceived: number;
                bytesSent: number;
            }
            export interface IDataPlanUsage {
                lastSyncTime: Date;
                megabytesUsed: number;
            }
            export interface IDataPlanStatus {
                dataLimitInMegabytes: number;
                dataPlanUsage: Windows.Networking.Connectivity.DataPlanUsage;
                inboundBitsPerSecond: number;
                maxTransferSizeInMegabytes: number;
                nextBillingCycle: Date;
                outboundBitsPerSecond: number;
            }
            export class DataPlanUsage implements Windows.Networking.Connectivity.IDataPlanUsage {
                lastSyncTime: Date;
                megabytesUsed: number;
            }
            export interface IConnectionCost {
                approachingDataLimit: boolean;
                networkCostType: Windows.Networking.Connectivity.NetworkCostType;
                overDataLimit: boolean;
                roaming: boolean;
            }
            export interface INetworkSecuritySettings {
                networkAuthenticationType: Windows.Networking.Connectivity.NetworkAuthenticationType;
                networkEncryptionType: Windows.Networking.Connectivity.NetworkEncryptionType;
            }
            export interface IConnectionProfile {
                networkAdapter: Windows.Networking.Connectivity.NetworkAdapter;
                networkSecuritySettings: Windows.Networking.Connectivity.NetworkSecuritySettings;
                profileName: string;
                getNetworkConnectivityLevel(): Windows.Networking.Connectivity.NetworkConnectivityLevel;
                getNetworkNames(): Windows.Foundation.Collections.IVectorView<string>;
                getConnectionCost(): Windows.Networking.Connectivity.ConnectionCost;
                getDataPlanStatus(): Windows.Networking.Connectivity.DataPlanStatus;
                getLocalUsage(StartTime: Date, EndTime: Date): Windows.Networking.Connectivity.DataUsage;
                getLocalUsage(StartTime: Date, EndTime: Date, States: Windows.Networking.Connectivity.RoamingStates): Windows.Networking.Connectivity.DataUsage;
            }
            export class ConnectionCost implements Windows.Networking.Connectivity.IConnectionCost {
                approachingDataLimit: boolean;
                networkCostType: Windows.Networking.Connectivity.NetworkCostType;
                overDataLimit: boolean;
                roaming: boolean;
            }
            export class DataPlanStatus implements Windows.Networking.Connectivity.IDataPlanStatus {
                dataLimitInMegabytes: number;
                dataPlanUsage: Windows.Networking.Connectivity.DataPlanUsage;
                inboundBitsPerSecond: number;
                maxTransferSizeInMegabytes: number;
                nextBillingCycle: Date;
                outboundBitsPerSecond: number;
            }
            export class NetworkAdapter implements Windows.Networking.Connectivity.INetworkAdapter {
                ianaInterfaceType: number;
                inboundMaxBitsPerSecond: number;
                networkAdapterId: string;
                networkItem: Windows.Networking.Connectivity.NetworkItem;
                outboundMaxBitsPerSecond: number;
                getConnectedProfileAsync(): Windows.Foundation.IAsyncOperation<Windows.Networking.Connectivity.ConnectionProfile>;
            }
            export class DataUsage implements Windows.Networking.Connectivity.IDataUsage {
                bytesReceived: number;
                bytesSent: number;
            }
            export class NetworkSecuritySettings implements Windows.Networking.Connectivity.INetworkSecuritySettings {
                networkAuthenticationType: Windows.Networking.Connectivity.NetworkAuthenticationType;
                networkEncryptionType: Windows.Networking.Connectivity.NetworkEncryptionType;
            }
            export interface ILanIdentifierData {
                type: number;
                value: Windows.Foundation.Collections.IVectorView<number>;
            }
            export interface ILanIdentifier {
                infrastructureId: Windows.Networking.Connectivity.LanIdentifierData;
                networkAdapterId: string;
                portId: Windows.Networking.Connectivity.LanIdentifierData;
            }
            export class LanIdentifierData implements Windows.Networking.Connectivity.ILanIdentifierData {
                type: number;
                value: Windows.Foundation.Collections.IVectorView<number>;
            }
            export interface NetworkStatusChangedEventHandler {
                (sender: any): void;
            }
            export interface INetworkInformationStatics {
                getConnectionProfiles(): Windows.Foundation.Collections.IVectorView<Windows.Networking.Connectivity.ConnectionProfile>;
                getInternetConnectionProfile(): Windows.Networking.Connectivity.ConnectionProfile;
                getLanIdentifiers(): Windows.Foundation.Collections.IVectorView<Windows.Networking.Connectivity.LanIdentifier>;
                getHostNames(): Windows.Foundation.Collections.IVectorView<Windows.Networking.HostName>;
                getProxyConfigurationAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperation<Windows.Networking.Connectivity.ProxyConfiguration>;
                getSortedEndpointPairs(destinationList: Windows.Foundation.Collections.IIterable<Windows.Networking.EndpointPair>, sortOptions: Windows.Networking.HostNameSortOptions): Windows.Foundation.Collections.IVectorView<Windows.Networking.EndpointPair>;
                onnetworkstatuschanged: any/* TODO */;
            }
            export class ConnectionProfile implements Windows.Networking.Connectivity.IConnectionProfile {
                networkAdapter: Windows.Networking.Connectivity.NetworkAdapter;
                networkSecuritySettings: Windows.Networking.Connectivity.NetworkSecuritySettings;
                profileName: string;
                getNetworkConnectivityLevel(): Windows.Networking.Connectivity.NetworkConnectivityLevel;
                getNetworkNames(): Windows.Foundation.Collections.IVectorView<string>;
                getConnectionCost(): Windows.Networking.Connectivity.ConnectionCost;
                getDataPlanStatus(): Windows.Networking.Connectivity.DataPlanStatus;
                getLocalUsage(StartTime: Date, EndTime: Date): Windows.Networking.Connectivity.DataUsage;
                getLocalUsage(StartTime: Date, EndTime: Date, States: Windows.Networking.Connectivity.RoamingStates): Windows.Networking.Connectivity.DataUsage;
            }
            export class LanIdentifier implements Windows.Networking.Connectivity.ILanIdentifier {
                infrastructureId: Windows.Networking.Connectivity.LanIdentifierData;
                networkAdapterId: string;
                portId: Windows.Networking.Connectivity.LanIdentifierData;
            }
            export class ProxyConfiguration implements Windows.Networking.Connectivity.IProxyConfiguration {
                canConnectDirectly: boolean;
                proxyUris: Windows.Foundation.Collections.IVectorView<Windows.Foundation.Uri>;
            }
            export interface INetworkItem {
                networkId: string;
                getNetworkTypes(): Windows.Networking.Connectivity.NetworkTypes;
            }
            export interface INetworkAdapter {
                ianaInterfaceType: number;
                inboundMaxBitsPerSecond: number;
                networkAdapterId: string;
                networkItem: Windows.Networking.Connectivity.NetworkItem;
                outboundMaxBitsPerSecond: number;
                getConnectedProfileAsync(): Windows.Foundation.IAsyncOperation<Windows.Networking.Connectivity.ConnectionProfile>;
            }
            export class NetworkItem implements Windows.Networking.Connectivity.INetworkItem {
                networkId: string;
                getNetworkTypes(): Windows.Networking.Connectivity.NetworkTypes;
            }
            export interface IIPInformation {
                networkAdapter: Windows.Networking.Connectivity.NetworkAdapter;
                prefixLength: number;
            }
            export interface IProxyConfiguration {
                canConnectDirectly: boolean;
                proxyUris: Windows.Foundation.Collections.IVectorView<Windows.Foundation.Uri>;
            }
            export class NetworkInformation {
                static getConnectionProfiles(): Windows.Foundation.Collections.IVectorView<Windows.Networking.Connectivity.ConnectionProfile>;
                static getInternetConnectionProfile(): Windows.Networking.Connectivity.ConnectionProfile;
                static getLanIdentifiers(): Windows.Foundation.Collections.IVectorView<Windows.Networking.Connectivity.LanIdentifier>;
                static getHostNames(): Windows.Foundation.Collections.IVectorView<Windows.Networking.HostName>;
                static getProxyConfigurationAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperation<Windows.Networking.Connectivity.ProxyConfiguration>;
                static getSortedEndpointPairs(destinationList: Windows.Foundation.Collections.IIterable<Windows.Networking.EndpointPair>, sortOptions: Windows.Networking.HostNameSortOptions): Windows.Foundation.Collections.IVectorView<Windows.Networking.EndpointPair>;
                static onnetworkstatuschanged: any/* TODO */;
            }
        }
    }
}
declare module Windows {
    export module Networking {
        export module PushNotifications {
            export enum PushNotificationType {
                toast,
                tile,
                badge,
                raw,
            }
            export interface IPushNotificationChannelManagerStatics {
                createPushNotificationChannelForApplicationAsync(): Windows.Foundation.IAsyncOperation<Windows.Networking.PushNotifications.PushNotificationChannel>;
                createPushNotificationChannelForApplicationAsync(applicationId: string): Windows.Foundation.IAsyncOperation<Windows.Networking.PushNotifications.PushNotificationChannel>;
                createPushNotificationChannelForSecondaryTileAsync(tileId: string): Windows.Foundation.IAsyncOperation<Windows.Networking.PushNotifications.PushNotificationChannel>;
            }
            export class PushNotificationChannel implements Windows.Networking.PushNotifications.IPushNotificationChannel {
                expirationTime: Date;
                uri: string;
                close(): void;
                onpushnotificationreceived: any/* TODO */;
            }
            export interface IPushNotificationChannel {
                expirationTime: Date;
                uri: string;
                close(): void;
                onpushnotificationreceived: any/* TODO */;
            }
            export class PushNotificationReceivedEventArgs implements Windows.Networking.PushNotifications.IPushNotificationReceivedEventArgs {
                badgeNotification: Windows.UI.Notifications.BadgeNotification;
                cancel: boolean;
                notificationType: Windows.Networking.PushNotifications.PushNotificationType;
                rawNotification: Windows.Networking.PushNotifications.RawNotification;
                tileNotification: Windows.UI.Notifications.TileNotification;
                toastNotification: Windows.UI.Notifications.ToastNotification;
            }
            export interface IPushNotificationReceivedEventArgs {
                badgeNotification: Windows.UI.Notifications.BadgeNotification;
                cancel: boolean;
                notificationType: Windows.Networking.PushNotifications.PushNotificationType;
                rawNotification: Windows.Networking.PushNotifications.RawNotification;
                tileNotification: Windows.UI.Notifications.TileNotification;
                toastNotification: Windows.UI.Notifications.ToastNotification;
            }
            export class RawNotification implements Windows.Networking.PushNotifications.IRawNotification {
                content: string;
            }
            export interface IRawNotification {
                content: string;
            }
            export class PushNotificationChannelManager {
                static createPushNotificationChannelForApplicationAsync(): Windows.Foundation.IAsyncOperation<Windows.Networking.PushNotifications.PushNotificationChannel>;
                static createPushNotificationChannelForApplicationAsync(applicationId: string): Windows.Foundation.IAsyncOperation<Windows.Networking.PushNotifications.PushNotificationChannel>;
                static createPushNotificationChannelForSecondaryTileAsync(tileId: string): Windows.Foundation.IAsyncOperation<Windows.Networking.PushNotifications.PushNotificationChannel>;
            }
        }
    }
}
declare module Windows {
    export module Security {
        export module Authentication {
            export module OnlineId {
                export enum CredentialPromptType {
                    promptIfNeeded,
                    retypeCredentials,
                    doNotPrompt,
                }
                export interface IOnlineIdServiceTicketRequest {
                    policy: string;
                    service: string;
                }
                export interface IOnlineIdServiceTicketRequestFactory {
                    createOnlineIdServiceTicketRequest(service: string, policy: string): Windows.Security.Authentication.OnlineId.OnlineIdServiceTicketRequest;
                    createOnlineIdServiceTicketRequest(service: string): Windows.Security.Authentication.OnlineId.OnlineIdServiceTicketRequest;
                }
                export class OnlineIdServiceTicketRequest implements Windows.Security.Authentication.OnlineId.IOnlineIdServiceTicketRequest {
                    constructor(service: string, policy: string);
                    constructor(service: string);
                    policy: string;
                    service: string;
                }
                export interface IOnlineIdServiceTicket {
                    errorCode: number;
                    request: Windows.Security.Authentication.OnlineId.OnlineIdServiceTicketRequest;
                    value: string;
                }
                export interface IUserIdentity {
                    firstName: string;
                    id: string;
                    isBetaAccount: boolean;
                    isConfirmedPC: boolean;
                    lastName: string;
                    safeCustomerId: string;
                    signInName: string;
                    tickets: Windows.Foundation.Collections.IVectorView<Windows.Security.Authentication.OnlineId.OnlineIdServiceTicket>;
                }
                export class OnlineIdServiceTicket implements Windows.Security.Authentication.OnlineId.IOnlineIdServiceTicket {
                    errorCode: number;
                    request: Windows.Security.Authentication.OnlineId.OnlineIdServiceTicketRequest;
                    value: string;
                }
                export interface IOnlineIdAuthenticator {
                    applicationId: string;
                    authenticatedSafeCustomerId: string;
                    canSignOut: boolean;
                    authenticateUserAsync(request: Windows.Security.Authentication.OnlineId.OnlineIdServiceTicketRequest): Windows.Security.Authentication.OnlineId.UserAuthenticationOperation;
                    authenticateUserAsync(requests: Windows.Foundation.Collections.IIterable<Windows.Security.Authentication.OnlineId.OnlineIdServiceTicketRequest>, credentialPromptType: Windows.Security.Authentication.OnlineId.CredentialPromptType): Windows.Security.Authentication.OnlineId.UserAuthenticationOperation;
                    signOutUserAsync(): Windows.Security.Authentication.OnlineId.SignOutUserOperation;
                }
                export class UserAuthenticationOperation implements Windows.Foundation.IAsyncOperation<Windows.Security.Authentication.OnlineId.UserIdentity>, Windows.Foundation.IAsyncInfo {
                    completed: Windows.Foundation.AsyncOperationCompletedHandler<Windows.Security.Authentication.OnlineId.UserIdentity>;
                    errorCode: number;
                    id: number;
                    status: Windows.Foundation.AsyncStatus;
                    getResults(): Windows.Security.Authentication.OnlineId.UserIdentity;
                    cancel(): void;
                    close(): void;
                    then<U>(success?: (value: Windows.Security.Authentication.OnlineId.UserIdentity) => U, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                    then<U>(success?: (value: Windows.Security.Authentication.OnlineId.UserIdentity) => Windows.Foundation.IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                    then<U>(success?: (value: Windows.Security.Authentication.OnlineId.UserIdentity) => U, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                    then<U>(success?: (value: Windows.Security.Authentication.OnlineId.UserIdentity) => Windows.Foundation.IPromise<U>, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                    done<U>(success?: (value: Windows.Security.Authentication.OnlineId.UserIdentity) => any, error?: (error: any) => any, progress?: (progress: any) => void ): void;
                    operation: {
                        completed: Windows.Foundation.AsyncOperationCompletedHandler<Windows.Security.Authentication.OnlineId.UserIdentity>;
                        getResults(): Windows.Security.Authentication.OnlineId.UserIdentity;
                    }
                }
                export class SignOutUserOperation implements Windows.Foundation.IAsyncAction, Windows.Foundation.IAsyncInfo {
                    completed: Windows.Foundation.AsyncActionCompletedHandler;
                    errorCode: number;
                    id: number;
                    status: Windows.Foundation.AsyncStatus;
                    getResults(): void;
                    cancel(): void;
                    close(): void;
                    then<U>(success: (value: any) => U, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                    then<U>(success: (value: any) => Windows.Foundation.IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                    then<U>(success: (value: any) => U, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                    then<U>(success: (value: any) => Windows.Foundation.IPromise<U>, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                    done<U>(success: (value: any) => any, error?: (error: any) => any, progress?: (progress: any) => void ): void;
                    operation: {
                        completed: Windows.Foundation.AsyncOperationCompletedHandler<any>;
                        getResults(): any;
                    }
                }
                export class UserIdentity implements Windows.Security.Authentication.OnlineId.IUserIdentity {
                    firstName: string;
                    id: string;
                    isBetaAccount: boolean;
                    isConfirmedPC: boolean;
                    lastName: string;
                    safeCustomerId: string;
                    signInName: string;
                    tickets: Windows.Foundation.Collections.IVectorView<Windows.Security.Authentication.OnlineId.OnlineIdServiceTicket>;
                }
                export class OnlineIdAuthenticator implements Windows.Security.Authentication.OnlineId.IOnlineIdAuthenticator {
                    applicationId: string;
                    authenticatedSafeCustomerId: string;
                    canSignOut: boolean;
                    authenticateUserAsync(request: Windows.Security.Authentication.OnlineId.OnlineIdServiceTicketRequest): Windows.Security.Authentication.OnlineId.UserAuthenticationOperation;
                    authenticateUserAsync(requests: Windows.Foundation.Collections.IIterable<Windows.Security.Authentication.OnlineId.OnlineIdServiceTicketRequest>, credentialPromptType: Windows.Security.Authentication.OnlineId.CredentialPromptType): Windows.Security.Authentication.OnlineId.UserAuthenticationOperation;
                    signOutUserAsync(): Windows.Security.Authentication.OnlineId.SignOutUserOperation;
                }
            }
        }
    }
}
declare module Windows {
    export module Security {
        export module Authentication {
            export module Web {
                export enum WebAuthenticationStatus {
                    success,
                    userCancel,
                    errorHttp,
                }
                export enum WebAuthenticationOptions {
                    none,
                    silentMode,
                    useTitle,
                    useHttpPost,
                    useCorporateNetwork,
                }
                export interface IWebAuthenticationResult {
                    responseData: string;
                    responseErrorDetail: number;
                    responseStatus: Windows.Security.Authentication.Web.WebAuthenticationStatus;
                }
                export class WebAuthenticationResult implements Windows.Security.Authentication.Web.IWebAuthenticationResult {
                    responseData: string;
                    responseErrorDetail: number;
                    responseStatus: Windows.Security.Authentication.Web.WebAuthenticationStatus;
                }
                export interface IWebAuthenticationBrokerStatics {
                    authenticateAsync(options: Windows.Security.Authentication.Web.WebAuthenticationOptions, requestUri: Windows.Foundation.Uri, callbackUri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperation<Windows.Security.Authentication.Web.WebAuthenticationResult>;
                    authenticateAsync(options: Windows.Security.Authentication.Web.WebAuthenticationOptions, requestUri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperation<Windows.Security.Authentication.Web.WebAuthenticationResult>;
                    getCurrentApplicationCallbackUri(): Windows.Foundation.Uri;
                }
                export class WebAuthenticationBroker {
                    static authenticateAsync(options: Windows.Security.Authentication.Web.WebAuthenticationOptions, requestUri: Windows.Foundation.Uri, callbackUri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperation<Windows.Security.Authentication.Web.WebAuthenticationResult>;
                    static authenticateAsync(options: Windows.Security.Authentication.Web.WebAuthenticationOptions, requestUri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperation<Windows.Security.Authentication.Web.WebAuthenticationResult>;
                    static getCurrentApplicationCallbackUri(): Windows.Foundation.Uri;
                }
            }
        }
    }
}
declare module Windows {
    export module Security {
        export module Credentials {
            export module UI {
                export enum AuthenticationProtocol {
                    basic,
                    digest,
                    ntlm,
                    kerberos,
                    negotiate,
                    credSsp,
                    custom,
                }
                export enum CredentialSaveOption {
                    unselected,
                    selected,
                    hidden,
                }
                export interface ICredentialPickerOptions {
                    alwaysDisplayDialog: boolean;
                    authenticationProtocol: Windows.Security.Credentials.UI.AuthenticationProtocol;
                    callerSavesCredential: boolean;
                    caption: string;
                    credentialSaveOption: Windows.Security.Credentials.UI.CredentialSaveOption;
                    customAuthenticationProtocol: string;
                    errorCode: number;
                    message: string;
                    previousCredential: Windows.Storage.Streams.IBuffer;
                    targetName: string;
                }
                export class CredentialPickerOptions implements Windows.Security.Credentials.UI.ICredentialPickerOptions {
                    alwaysDisplayDialog: boolean;
                    authenticationProtocol: Windows.Security.Credentials.UI.AuthenticationProtocol;
                    callerSavesCredential: boolean;
                    caption: string;
                    credentialSaveOption: Windows.Security.Credentials.UI.CredentialSaveOption;
                    customAuthenticationProtocol: string;
                    errorCode: number;
                    message: string;
                    previousCredential: Windows.Storage.Streams.IBuffer;
                    targetName: string;
                }
                export interface ICredentialPickerStatics {
                    pickAsync(options: Windows.Security.Credentials.UI.CredentialPickerOptions): Windows.Foundation.IAsyncOperation<Windows.Security.Credentials.UI.CredentialPickerResults>;
                    pickAsync(targetName: string, message: string): Windows.Foundation.IAsyncOperation<Windows.Security.Credentials.UI.CredentialPickerResults>;
                    pickAsync(targetName: string, message: string, caption: string): Windows.Foundation.IAsyncOperation<Windows.Security.Credentials.UI.CredentialPickerResults>;
                }
                export class CredentialPickerResults implements Windows.Security.Credentials.UI.ICredentialPickerResults {
                    credential: Windows.Storage.Streams.IBuffer;
                    credentialDomainName: string;
                    credentialPassword: string;
                    credentialSaveOption: Windows.Security.Credentials.UI.CredentialSaveOption;
                    credentialSaved: boolean;
                    credentialUserName: string;
                    errorCode: number;
                }
                export class CredentialPicker {
                    static pickAsync(options: Windows.Security.Credentials.UI.CredentialPickerOptions): Windows.Foundation.IAsyncOperation<Windows.Security.Credentials.UI.CredentialPickerResults>;
                    static pickAsync(targetName: string, message: string): Windows.Foundation.IAsyncOperation<Windows.Security.Credentials.UI.CredentialPickerResults>;
                    static pickAsync(targetName: string, message: string, caption: string): Windows.Foundation.IAsyncOperation<Windows.Security.Credentials.UI.CredentialPickerResults>;
                }
                export interface ICredentialPickerResults {
                    credential: Windows.Storage.Streams.IBuffer;
                    credentialDomainName: string;
                    credentialPassword: string;
                    credentialSaveOption: Windows.Security.Credentials.UI.CredentialSaveOption;
                    credentialSaved: boolean;
                    credentialUserName: string;
                    errorCode: number;
                }
            }
        }
    }
}
declare module Windows {
    export module Security {
        export module Credentials {
            export interface IPasswordCredential {
                password: string;
                properties: Windows.Foundation.Collections.IPropertySet;
                resource: string;
                userName: string;
                retrievePassword(): void;
            }
            export class PasswordCredential implements Windows.Security.Credentials.IPasswordCredential {
                constructor(resource: string, userName: string, password: string);
                constructor();
                password: string;
                properties: Windows.Foundation.Collections.IPropertySet;
                resource: string;
                userName: string;
                retrievePassword(): void;
            }
            export interface ICredentialFactory {
                createPasswordCredential(resource: string, userName: string, password: string): Windows.Security.Credentials.PasswordCredential;
            }
            export interface IPasswordVault {
                add(credential: Windows.Security.Credentials.PasswordCredential): void;
                remove(credential: Windows.Security.Credentials.PasswordCredential): void;
                retrieve(resource: string, userName: string): Windows.Security.Credentials.PasswordCredential;
                findAllByResource(resource: string): Windows.Foundation.Collections.IVectorView<Windows.Security.Credentials.PasswordCredential>;
                findAllByUserName(userName: string): Windows.Foundation.Collections.IVectorView<Windows.Security.Credentials.PasswordCredential>;
                retrieveAll(): Windows.Foundation.Collections.IVectorView<Windows.Security.Credentials.PasswordCredential>;
            }
            export class PasswordVault implements Windows.Security.Credentials.IPasswordVault {
                add(credential: Windows.Security.Credentials.PasswordCredential): void;
                remove(credential: Windows.Security.Credentials.PasswordCredential): void;
                retrieve(resource: string, userName: string): Windows.Security.Credentials.PasswordCredential;
                findAllByResource(resource: string): Windows.Foundation.Collections.IVectorView<Windows.Security.Credentials.PasswordCredential>;
                findAllByUserName(userName: string): Windows.Foundation.Collections.IVectorView<Windows.Security.Credentials.PasswordCredential>;
                retrieveAll(): Windows.Foundation.Collections.IVectorView<Windows.Security.Credentials.PasswordCredential>;
            }
            export class PasswordCredentialPropertyStore implements Windows.Foundation.Collections.IPropertySet, Windows.Foundation.Collections.IObservableMap<string, any>, Windows.Foundation.Collections.IMap<string, any>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, any>> {
                size: number;
                onmapchanged: any/* TODO */;
                lookup(key: string): any;
                hasKey(key: string): boolean;
                getView(): Windows.Foundation.Collections.IMapView<string, any>;
                insert(key: string, value: any): boolean;
                remove(key: string): void;
                clear(): void;
                first(): Windows.Foundation.Collections.IIterator<Windows.Foundation.Collections.IKeyValuePair<string, any>>;
            }
        }
    }
}
declare module Windows {
    export module Security {
        export module Cryptography {
            export module Certificates {
                export enum EnrollKeyUsages {
                    none,
                    decryption,
                    signing,
                    keyAgreement,
                    all,
                }
                export enum KeyProtectionLevel {
                    noConsent,
                    consentOnly,
                    consentWithPassword,
                }
                export enum ExportOption {
                    notExportable,
                    exportable,
                }
                export enum KeySize {
                    invalid,
                    rsa2048,
                    rsa4096,
                }
                export enum InstallOptions {
                    none,
                    deleteExpired,
                }
                export interface ICertificateRequestProperties {
                    exportable: Windows.Security.Cryptography.Certificates.ExportOption;
                    friendlyName: string;
                    hashAlgorithmName: string;
                    keyAlgorithmName: string;
                    keyProtectionLevel: Windows.Security.Cryptography.Certificates.KeyProtectionLevel;
                    keySize: number;
                    keyStorageProviderName: string;
                    keyUsages: Windows.Security.Cryptography.Certificates.EnrollKeyUsages;
                    subject: string;
                }
                export class CertificateRequestProperties implements Windows.Security.Cryptography.Certificates.ICertificateRequestProperties {
                    exportable: Windows.Security.Cryptography.Certificates.ExportOption;
                    friendlyName: string;
                    hashAlgorithmName: string;
                    keyAlgorithmName: string;
                    keyProtectionLevel: Windows.Security.Cryptography.Certificates.KeyProtectionLevel;
                    keySize: number;
                    keyStorageProviderName: string;
                    keyUsages: Windows.Security.Cryptography.Certificates.EnrollKeyUsages;
                    subject: string;
                }
                export interface ICertificateEnrollmentManagerStatics {
                    createRequestAsync(request: Windows.Security.Cryptography.Certificates.CertificateRequestProperties): Windows.Foundation.IAsyncOperation<string>;
                    installCertificateAsync(certificate: string, installOption: Windows.Security.Cryptography.Certificates.InstallOptions): Windows.Foundation.IAsyncAction;
                    importPfxDataAsync(pfxData: string, password: string, exportable: Windows.Security.Cryptography.Certificates.ExportOption, keyProtectionLevel: Windows.Security.Cryptography.Certificates.KeyProtectionLevel, installOption: Windows.Security.Cryptography.Certificates.InstallOptions, friendlyName: string): Windows.Foundation.IAsyncAction;
                }
                export class CertificateEnrollmentManager {
                    static createRequestAsync(request: Windows.Security.Cryptography.Certificates.CertificateRequestProperties): Windows.Foundation.IAsyncOperation<string>;
                    static installCertificateAsync(certificate: string, installOption: Windows.Security.Cryptography.Certificates.InstallOptions): Windows.Foundation.IAsyncAction;
                    static importPfxDataAsync(pfxData: string, password: string, exportable: Windows.Security.Cryptography.Certificates.ExportOption, keyProtectionLevel: Windows.Security.Cryptography.Certificates.KeyProtectionLevel, installOption: Windows.Security.Cryptography.Certificates.InstallOptions, friendlyName: string): Windows.Foundation.IAsyncAction;
                }
                export interface IKeyAlgorithmNamesStatics {
                    dsa: string;
                    ecdh256: string;
                    ecdh384: string;
                    ecdh521: string;
                    ecdsa256: string;
                    ecdsa384: string;
                    ecdsa521: string;
                    rsa: string;
                }
                export class KeyAlgorithmNames {
                    static dsa: string;
                    static ecdh256: string;
                    static ecdh384: string;
                    static ecdh521: string;
                    static ecdsa256: string;
                    static ecdsa384: string;
                    static ecdsa521: string;
                    static rsa: string;
                }
                export interface IKeyStorageProviderNamesStatics {
                    platformKeyStorageProvider: string;
                    smartcardKeyStorageProvider: string;
                    softwareKeyStorageProvider: string;
                }
                export class KeyStorageProviderNames {
                    static platformKeyStorageProvider: string;
                    static smartcardKeyStorageProvider: string;
                    static softwareKeyStorageProvider: string;
                }
            }
        }
    }
}
declare module Windows {
    export module Security {
        export module Cryptography {
            export module Core {
                export enum CryptographicPrivateKeyBlobType {
                    pkcs8RawPrivateKeyInfo,
                    pkcs1RsaPrivateKey,
                    bCryptPrivateKey,
                    capi1PrivateKey,
                }
                export enum CryptographicPublicKeyBlobType {
                    x509SubjectPublicKeyInfo,
                    pkcs1RsaPublicKey,
                    bCryptPublicKey,
                    capi1PublicKey,
                }
                export interface IKeyDerivationParameters {
                    iterationCount: number;
                    kdfGenericBinary: Windows.Storage.Streams.IBuffer;
                }
                export interface IKeyDerivationParametersStatics {
                    buildForPbkdf2(pbkdf2Salt: Windows.Storage.Streams.IBuffer, iterationCount: number): Windows.Security.Cryptography.Core.KeyDerivationParameters;
                    buildForSP800108(label: Windows.Storage.Streams.IBuffer, context: Windows.Storage.Streams.IBuffer): Windows.Security.Cryptography.Core.KeyDerivationParameters;
                    buildForSP80056a(algorithmId: Windows.Storage.Streams.IBuffer, partyUInfo: Windows.Storage.Streams.IBuffer, partyVInfo: Windows.Storage.Streams.IBuffer, suppPubInfo: Windows.Storage.Streams.IBuffer, suppPrivInfo: Windows.Storage.Streams.IBuffer): Windows.Security.Cryptography.Core.KeyDerivationParameters;
                }
                export class KeyDerivationParameters implements Windows.Security.Cryptography.Core.IKeyDerivationParameters {
                    iterationCount: number;
                    kdfGenericBinary: Windows.Storage.Streams.IBuffer;
                    static buildForPbkdf2(pbkdf2Salt: Windows.Storage.Streams.IBuffer, iterationCount: number): Windows.Security.Cryptography.Core.KeyDerivationParameters;
                    static buildForSP800108(label: Windows.Storage.Streams.IBuffer, context: Windows.Storage.Streams.IBuffer): Windows.Security.Cryptography.Core.KeyDerivationParameters;
                    static buildForSP80056a(algorithmId: Windows.Storage.Streams.IBuffer, partyUInfo: Windows.Storage.Streams.IBuffer, partyVInfo: Windows.Storage.Streams.IBuffer, suppPubInfo: Windows.Storage.Streams.IBuffer, suppPrivInfo: Windows.Storage.Streams.IBuffer): Windows.Security.Cryptography.Core.KeyDerivationParameters;
                }
                export interface ICryptographicKey {
                    keySize: number;
                    export(): Windows.Storage.Streams.IBuffer;
                    export(BlobType: Windows.Security.Cryptography.Core.CryptographicPrivateKeyBlobType): Windows.Storage.Streams.IBuffer;
                    exportPublicKey(): Windows.Storage.Streams.IBuffer;
                    exportPublicKey(BlobType: Windows.Security.Cryptography.Core.CryptographicPublicKeyBlobType): Windows.Storage.Streams.IBuffer;
                }
                export class CryptographicKey implements Windows.Security.Cryptography.Core.ICryptographicKey {
                    keySize: number;
                    export(): Windows.Storage.Streams.IBuffer;
                    export(BlobType: Windows.Security.Cryptography.Core.CryptographicPrivateKeyBlobType): Windows.Storage.Streams.IBuffer;
                    exportPublicKey(): Windows.Storage.Streams.IBuffer;
                    exportPublicKey(BlobType: Windows.Security.Cryptography.Core.CryptographicPublicKeyBlobType): Windows.Storage.Streams.IBuffer;
                }
                export interface IHashComputation {
                    append(data: Windows.Storage.Streams.IBuffer): void;
                    getValueAndReset(): Windows.Storage.Streams.IBuffer;
                }
                export class CryptographicHash implements Windows.Security.Cryptography.Core.IHashComputation {
                    append(data: Windows.Storage.Streams.IBuffer): void;
                    getValueAndReset(): Windows.Storage.Streams.IBuffer;
                }
                export interface IHashAlgorithmProvider {
                    algorithmName: string;
                    hashLength: number;
                    hashData(data: Windows.Storage.Streams.IBuffer): Windows.Storage.Streams.IBuffer;
                    createHash(): Windows.Security.Cryptography.Core.CryptographicHash;
                }
                export interface IMacAlgorithmProvider {
                    algorithmName: string;
                    macLength: number;
                    createKey(keyMaterial: Windows.Storage.Streams.IBuffer): Windows.Security.Cryptography.Core.CryptographicKey;
                }
                export interface IKeyDerivationAlgorithmProvider {
                    algorithmName: string;
                    createKey(keyMaterial: Windows.Storage.Streams.IBuffer): Windows.Security.Cryptography.Core.CryptographicKey;
                }
                export interface ISymmetricKeyAlgorithmProvider {
                    algorithmName: string;
                    blockLength: number;
                    createSymmetricKey(keyMaterial: Windows.Storage.Streams.IBuffer): Windows.Security.Cryptography.Core.CryptographicKey;
                }
                export interface IAsymmetricKeyAlgorithmProvider {
                    algorithmName: string;
                    createKeyPair(keySize: number): Windows.Security.Cryptography.Core.CryptographicKey;
                    importKeyPair(keyBlob: Windows.Storage.Streams.IBuffer): Windows.Security.Cryptography.Core.CryptographicKey;
                    importKeyPair(keyBlob: Windows.Storage.Streams.IBuffer, BlobType: Windows.Security.Cryptography.Core.CryptographicPrivateKeyBlobType): Windows.Security.Cryptography.Core.CryptographicKey;
                    importPublicKey(keyBlob: Windows.Storage.Streams.IBuffer): Windows.Security.Cryptography.Core.CryptographicKey;
                    importPublicKey(keyBlob: Windows.Storage.Streams.IBuffer, BlobType: Windows.Security.Cryptography.Core.CryptographicPublicKeyBlobType): Windows.Security.Cryptography.Core.CryptographicKey;
                }
                export interface IEncryptedAndAuthenticatedData {
                    authenticationTag: Windows.Storage.Streams.IBuffer;
                    encryptedData: Windows.Storage.Streams.IBuffer;
                }
                export class EncryptedAndAuthenticatedData implements Windows.Security.Cryptography.Core.IEncryptedAndAuthenticatedData {
                    authenticationTag: Windows.Storage.Streams.IBuffer;
                    encryptedData: Windows.Storage.Streams.IBuffer;
                }
                export interface ICryptographicEngineStatics {
                    encrypt(key: Windows.Security.Cryptography.Core.CryptographicKey, data: Windows.Storage.Streams.IBuffer, iv: Windows.Storage.Streams.IBuffer): Windows.Storage.Streams.IBuffer;
                    decrypt(key: Windows.Security.Cryptography.Core.CryptographicKey, data: Windows.Storage.Streams.IBuffer, iv: Windows.Storage.Streams.IBuffer): Windows.Storage.Streams.IBuffer;
                    encryptAndAuthenticate(key: Windows.Security.Cryptography.Core.CryptographicKey, data: Windows.Storage.Streams.IBuffer, nonce: Windows.Storage.Streams.IBuffer, authenticatedData: Windows.Storage.Streams.IBuffer): Windows.Security.Cryptography.Core.EncryptedAndAuthenticatedData;
                    decryptAndAuthenticate(key: Windows.Security.Cryptography.Core.CryptographicKey, data: Windows.Storage.Streams.IBuffer, nonce: Windows.Storage.Streams.IBuffer, authenticationTag: Windows.Storage.Streams.IBuffer, authenticatedData: Windows.Storage.Streams.IBuffer): Windows.Storage.Streams.IBuffer;
                    sign(key: Windows.Security.Cryptography.Core.CryptographicKey, data: Windows.Storage.Streams.IBuffer): Windows.Storage.Streams.IBuffer;
                    verifySignature(key: Windows.Security.Cryptography.Core.CryptographicKey, data: Windows.Storage.Streams.IBuffer, signature: Windows.Storage.Streams.IBuffer): boolean;
                    deriveKeyMaterial(key: Windows.Security.Cryptography.Core.CryptographicKey, parameters: Windows.Security.Cryptography.Core.KeyDerivationParameters, desiredKeySize: number): Windows.Storage.Streams.IBuffer;
                }
                export class CryptographicEngine {
                    static encrypt(key: Windows.Security.Cryptography.Core.CryptographicKey, data: Windows.Storage.Streams.IBuffer, iv: Windows.Storage.Streams.IBuffer): Windows.Storage.Streams.IBuffer;
                    static decrypt(key: Windows.Security.Cryptography.Core.CryptographicKey, data: Windows.Storage.Streams.IBuffer, iv: Windows.Storage.Streams.IBuffer): Windows.Storage.Streams.IBuffer;
                    static encryptAndAuthenticate(key: Windows.Security.Cryptography.Core.CryptographicKey, data: Windows.Storage.Streams.IBuffer, nonce: Windows.Storage.Streams.IBuffer, authenticatedData: Windows.Storage.Streams.IBuffer): Windows.Security.Cryptography.Core.EncryptedAndAuthenticatedData;
                    static decryptAndAuthenticate(key: Windows.Security.Cryptography.Core.CryptographicKey, data: Windows.Storage.Streams.IBuffer, nonce: Windows.Storage.Streams.IBuffer, authenticationTag: Windows.Storage.Streams.IBuffer, authenticatedData: Windows.Storage.Streams.IBuffer): Windows.Storage.Streams.IBuffer;
                    static sign(key: Windows.Security.Cryptography.Core.CryptographicKey, data: Windows.Storage.Streams.IBuffer): Windows.Storage.Streams.IBuffer;
                    static verifySignature(key: Windows.Security.Cryptography.Core.CryptographicKey, data: Windows.Storage.Streams.IBuffer, signature: Windows.Storage.Streams.IBuffer): boolean;
                    static deriveKeyMaterial(key: Windows.Security.Cryptography.Core.CryptographicKey, parameters: Windows.Security.Cryptography.Core.KeyDerivationParameters, desiredKeySize: number): Windows.Storage.Streams.IBuffer;
                }
                export interface IHashAlgorithmProviderStatics {
                    openAlgorithm(algorithm: string): Windows.Security.Cryptography.Core.HashAlgorithmProvider;
                }
                export class HashAlgorithmProvider implements Windows.Security.Cryptography.Core.IHashAlgorithmProvider {
                    algorithmName: string;
                    hashLength: number;
                    hashData(data: Windows.Storage.Streams.IBuffer): Windows.Storage.Streams.IBuffer;
                    createHash(): Windows.Security.Cryptography.Core.CryptographicHash;
                    static openAlgorithm(algorithm: string): Windows.Security.Cryptography.Core.HashAlgorithmProvider;
                }
                export interface IMacAlgorithmProviderStatics {
                    openAlgorithm(algorithm: string): Windows.Security.Cryptography.Core.MacAlgorithmProvider;
                }
                export class MacAlgorithmProvider implements Windows.Security.Cryptography.Core.IMacAlgorithmProvider {
                    algorithmName: string;
                    macLength: number;
                    createKey(keyMaterial: Windows.Storage.Streams.IBuffer): Windows.Security.Cryptography.Core.CryptographicKey;
                    static openAlgorithm(algorithm: string): Windows.Security.Cryptography.Core.MacAlgorithmProvider;
                }
                export interface IKeyDerivationAlgorithmProviderStatics {
                    openAlgorithm(algorithm: string): Windows.Security.Cryptography.Core.KeyDerivationAlgorithmProvider;
                }
                export class KeyDerivationAlgorithmProvider implements Windows.Security.Cryptography.Core.IKeyDerivationAlgorithmProvider {
                    algorithmName: string;
                    createKey(keyMaterial: Windows.Storage.Streams.IBuffer): Windows.Security.Cryptography.Core.CryptographicKey;
                    static openAlgorithm(algorithm: string): Windows.Security.Cryptography.Core.KeyDerivationAlgorithmProvider;
                }
                export interface ISymmetricKeyAlgorithmProviderStatics {
                    openAlgorithm(algorithm: string): Windows.Security.Cryptography.Core.SymmetricKeyAlgorithmProvider;
                }
                export class SymmetricKeyAlgorithmProvider implements Windows.Security.Cryptography.Core.ISymmetricKeyAlgorithmProvider {
                    algorithmName: string;
                    blockLength: number;
                    createSymmetricKey(keyMaterial: Windows.Storage.Streams.IBuffer): Windows.Security.Cryptography.Core.CryptographicKey;
                    static openAlgorithm(algorithm: string): Windows.Security.Cryptography.Core.SymmetricKeyAlgorithmProvider;
                }
                export interface IAsymmetricKeyAlgorithmProviderStatics {
                    openAlgorithm(algorithm: string): Windows.Security.Cryptography.Core.AsymmetricKeyAlgorithmProvider;
                }
                export class AsymmetricKeyAlgorithmProvider implements Windows.Security.Cryptography.Core.IAsymmetricKeyAlgorithmProvider {
                    algorithmName: string;
                    createKeyPair(keySize: number): Windows.Security.Cryptography.Core.CryptographicKey;
                    importKeyPair(keyBlob: Windows.Storage.Streams.IBuffer): Windows.Security.Cryptography.Core.CryptographicKey;
                    importKeyPair(keyBlob: Windows.Storage.Streams.IBuffer, BlobType: Windows.Security.Cryptography.Core.CryptographicPrivateKeyBlobType): Windows.Security.Cryptography.Core.CryptographicKey;
                    importPublicKey(keyBlob: Windows.Storage.Streams.IBuffer): Windows.Security.Cryptography.Core.CryptographicKey;
                    importPublicKey(keyBlob: Windows.Storage.Streams.IBuffer, BlobType: Windows.Security.Cryptography.Core.CryptographicPublicKeyBlobType): Windows.Security.Cryptography.Core.CryptographicKey;
                    static openAlgorithm(algorithm: string): Windows.Security.Cryptography.Core.AsymmetricKeyAlgorithmProvider;
                }
                export interface IHashAlgorithmNamesStatics {
                    md5: string;
                    sha1: string;
                    sha256: string;
                    sha384: string;
                    sha512: string;
                }
                export class HashAlgorithmNames {
                    static md5: string;
                    static sha1: string;
                    static sha256: string;
                    static sha384: string;
                    static sha512: string;
                }
                export interface IMacAlgorithmNamesStatics {
                    aesCmac: string;
                    hmacMd5: string;
                    hmacSha1: string;
                    hmacSha256: string;
                    hmacSha384: string;
                    hmacSha512: string;
                }
                export class MacAlgorithmNames {
                    static aesCmac: string;
                    static hmacMd5: string;
                    static hmacSha1: string;
                    static hmacSha256: string;
                    static hmacSha384: string;
                    static hmacSha512: string;
                }
                export interface ISymmetricAlgorithmNamesStatics {
                    aesCbc: string;
                    aesCbcPkcs7: string;
                    aesCcm: string;
                    aesEcb: string;
                    aesEcbPkcs7: string;
                    aesGcm: string;
                    desCbc: string;
                    desCbcPkcs7: string;
                    desEcb: string;
                    desEcbPkcs7: string;
                    rc2Cbc: string;
                    rc2CbcPkcs7: string;
                    rc2Ecb: string;
                    rc2EcbPkcs7: string;
                    rc4: string;
                    tripleDesCbc: string;
                    tripleDesCbcPkcs7: string;
                    tripleDesEcb: string;
                    tripleDesEcbPkcs7: string;
                }
                export class SymmetricAlgorithmNames {
                    static aesCbc: string;
                    static aesCbcPkcs7: string;
                    static aesCcm: string;
                    static aesEcb: string;
                    static aesEcbPkcs7: string;
                    static aesGcm: string;
                    static desCbc: string;
                    static desCbcPkcs7: string;
                    static desEcb: string;
                    static desEcbPkcs7: string;
                    static rc2Cbc: string;
                    static rc2CbcPkcs7: string;
                    static rc2Ecb: string;
                    static rc2EcbPkcs7: string;
                    static rc4: string;
                    static tripleDesCbc: string;
                    static tripleDesCbcPkcs7: string;
                    static tripleDesEcb: string;
                    static tripleDesEcbPkcs7: string;
                }
                export interface IAsymmetricAlgorithmNamesStatics {
                    dsaSha1: string;
                    dsaSha256: string;
                    ecdsaP256Sha256: string;
                    ecdsaP384Sha384: string;
                    ecdsaP521Sha512: string;
                    rsaOaepSha1: string;
                    rsaOaepSha256: string;
                    rsaOaepSha384: string;
                    rsaOaepSha512: string;
                    rsaPkcs1: string;
                    rsaSignPkcs1Sha1: string;
                    rsaSignPkcs1Sha256: string;
                    rsaSignPkcs1Sha384: string;
                    rsaSignPkcs1Sha512: string;
                    rsaSignPssSha1: string;
                    rsaSignPssSha256: string;
                    rsaSignPssSha384: string;
                    rsaSignPssSha512: string;
                }
                export class AsymmetricAlgorithmNames {
                    static dsaSha1: string;
                    static dsaSha256: string;
                    static ecdsaP256Sha256: string;
                    static ecdsaP384Sha384: string;
                    static ecdsaP521Sha512: string;
                    static rsaOaepSha1: string;
                    static rsaOaepSha256: string;
                    static rsaOaepSha384: string;
                    static rsaOaepSha512: string;
                    static rsaPkcs1: string;
                    static rsaSignPkcs1Sha1: string;
                    static rsaSignPkcs1Sha256: string;
                    static rsaSignPkcs1Sha384: string;
                    static rsaSignPkcs1Sha512: string;
                    static rsaSignPssSha1: string;
                    static rsaSignPssSha256: string;
                    static rsaSignPssSha384: string;
                    static rsaSignPssSha512: string;
                }
                export interface IKeyDerivationAlgorithmNamesStatics {
                    pbkdf2Md5: string;
                    pbkdf2Sha1: string;
                    pbkdf2Sha256: string;
                    pbkdf2Sha384: string;
                    pbkdf2Sha512: string;
                    sp800108CtrHmacMd5: string;
                    sp800108CtrHmacSha1: string;
                    sp800108CtrHmacSha256: string;
                    sp800108CtrHmacSha384: string;
                    sp800108CtrHmacSha512: string;
                    sp80056aConcatMd5: string;
                    sp80056aConcatSha1: string;
                    sp80056aConcatSha256: string;
                    sp80056aConcatSha384: string;
                    sp80056aConcatSha512: string;
                }
                export class KeyDerivationAlgorithmNames {
                    static pbkdf2Md5: string;
                    static pbkdf2Sha1: string;
                    static pbkdf2Sha256: string;
                    static pbkdf2Sha384: string;
                    static pbkdf2Sha512: string;
                    static sp800108CtrHmacMd5: string;
                    static sp800108CtrHmacSha1: string;
                    static sp800108CtrHmacSha256: string;
                    static sp800108CtrHmacSha384: string;
                    static sp800108CtrHmacSha512: string;
                    static sp80056aConcatMd5: string;
                    static sp80056aConcatSha1: string;
                    static sp80056aConcatSha256: string;
                    static sp80056aConcatSha384: string;
                    static sp80056aConcatSha512: string;
                }
            }
        }
    }
}
declare module Windows {
    export module Security {
        export module Cryptography {
            export module DataProtection {
                export interface IDataProtectionProvider {
                    protectAsync(data: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IBuffer>;
                    unprotectAsync(data: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IBuffer>;
                    protectStreamAsync(src: Windows.Storage.Streams.IInputStream, dest: Windows.Storage.Streams.IOutputStream): Windows.Foundation.IAsyncAction;
                    unprotectStreamAsync(src: Windows.Storage.Streams.IInputStream, dest: Windows.Storage.Streams.IOutputStream): Windows.Foundation.IAsyncAction;
                }
                export interface IDataProtectionProviderFactory {
                    createOverloadExplicit(protectionDescriptor: string): Windows.Security.Cryptography.DataProtection.DataProtectionProvider;
                }
                export class DataProtectionProvider implements Windows.Security.Cryptography.DataProtection.IDataProtectionProvider {
                    constructor(protectionDescriptor: string);
                    constructor();
                    protectAsync(data: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IBuffer>;
                    unprotectAsync(data: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IBuffer>;
                    protectStreamAsync(src: Windows.Storage.Streams.IInputStream, dest: Windows.Storage.Streams.IOutputStream): Windows.Foundation.IAsyncAction;
                    unprotectStreamAsync(src: Windows.Storage.Streams.IInputStream, dest: Windows.Storage.Streams.IOutputStream): Windows.Foundation.IAsyncAction;
                }
            }
        }
    }
}
declare module Windows {
    export module Security {
        export module Cryptography {
            export enum BinaryStringEncoding {
                utf8,
                utf16LE,
                utf16BE,
            }
            export interface ICryptographicBufferStatics {
                compare(object1: Windows.Storage.Streams.IBuffer, object2: Windows.Storage.Streams.IBuffer): boolean;
                generateRandom(length: number): Windows.Storage.Streams.IBuffer;
                generateRandomNumber(): number;
                createFromByteArray(value: Uint8Array): Windows.Storage.Streams.IBuffer;
                copyToByteArray(buffer: Windows.Storage.Streams.IBuffer): Uint8Array;
                decodeFromHexString(value: string): Windows.Storage.Streams.IBuffer;
                encodeToHexString(buffer: Windows.Storage.Streams.IBuffer): string;
                decodeFromBase64String(value: string): Windows.Storage.Streams.IBuffer;
                encodeToBase64String(buffer: Windows.Storage.Streams.IBuffer): string;
                convertStringToBinary(value: string, encoding: Windows.Security.Cryptography.BinaryStringEncoding): Windows.Storage.Streams.IBuffer;
                convertBinaryToString(encoding: Windows.Security.Cryptography.BinaryStringEncoding, buffer: Windows.Storage.Streams.IBuffer): string;
            }
            export class CryptographicBuffer {
                static compare(object1: Windows.Storage.Streams.IBuffer, object2: Windows.Storage.Streams.IBuffer): boolean;
                static generateRandom(length: number): Windows.Storage.Streams.IBuffer;
                static generateRandomNumber(): number;
                static createFromByteArray(value: Uint8Array): Windows.Storage.Streams.IBuffer;
                static copyToByteArray(buffer: Windows.Storage.Streams.IBuffer): Uint8Array;
                static decodeFromHexString(value: string): Windows.Storage.Streams.IBuffer;
                static encodeToHexString(buffer: Windows.Storage.Streams.IBuffer): string;
                static decodeFromBase64String(value: string): Windows.Storage.Streams.IBuffer;
                static encodeToBase64String(buffer: Windows.Storage.Streams.IBuffer): string;
                static convertStringToBinary(value: string, encoding: Windows.Security.Cryptography.BinaryStringEncoding): Windows.Storage.Streams.IBuffer;
                static convertBinaryToString(encoding: Windows.Security.Cryptography.BinaryStringEncoding, buffer: Windows.Storage.Streams.IBuffer): string;
            }
        }
    }
}
declare module Windows {
    export module Security {
        export module ExchangeActiveSyncProvisioning {
            export enum EasRequireEncryptionResult {
                notEvaluated,
                compliant,
                canBeCompliant,
                notProvisionedOnAllVolumes,
                deFixedDataNotSupported,
                deHardwareNotCompliant,
                deWinReNotConfigured,
                deProtectionSuspended,
                deOsVolumeNotProtected,
                deProtectionNotYetEnabled,
                noFeatureLicense,
                osNotProtected,
            }
            export enum EasMinPasswordLengthResult {
                notEvaluated,
                compliant,
                canBeCompliant,
                requestedPolicyIsStricter,
                requestedPolicyNotEnforceable,
                invalidParameter,
                currentUserHasBlankPassword,
                adminsHaveBlankPassword,
                userCannotChangePassword,
                adminsCannotChangePassword,
                localControlledUsersCannotChangePassword,
                connectedAdminsProviderPolicyIsWeak,
                connectedUserProviderPolicyIsWeak,
                changeConnectedAdminsPassword,
                changeConnectedUserPassword,
            }
            export enum EasDisallowConvenienceLogonResult {
                notEvaluated,
                compliant,
                canBeCompliant,
                requestedPolicyIsStricter,
            }
            export enum EasMinPasswordComplexCharactersResult {
                notEvaluated,
                compliant,
                canBeCompliant,
                requestedPolicyIsStricter,
                requestedPolicyNotEnforceable,
                invalidParameter,
                currentUserHasBlankPassword,
                adminsHaveBlankPassword,
                userCannotChangePassword,
                adminsCannotChangePassword,
                localControlledUsersCannotChangePassword,
                connectedAdminsProviderPolicyIsWeak,
                connectedUserProviderPolicyIsWeak,
                changeConnectedAdminsPassword,
                changeConnectedUserPassword,
            }
            export enum EasPasswordExpirationResult {
                notEvaluated,
                compliant,
                canBeCompliant,
                requestedPolicyIsStricter,
                requestedExpirationIncompatible,
                invalidParameter,
                userCannotChangePassword,
                adminsCannotChangePassword,
                localControlledUsersCannotChangePassword,
            }
            export enum EasPasswordHistoryResult {
                notEvaluated,
                compliant,
                canBeCompliant,
                requestedPolicyIsStricter,
                invalidParameter,
            }
            export enum EasMaxPasswordFailedAttemptsResult {
                notEvaluated,
                compliant,
                canBeCompliant,
                requestedPolicyIsStricter,
                invalidParameter,
            }
            export enum EasMaxInactivityTimeLockResult {
                notEvaluated,
                compliant,
                canBeCompliant,
                requestedPolicyIsStricter,
                invalidParameter,
            }
            export interface IEasClientDeviceInformation {
                friendlyName: string;
                id: string;
                operatingSystem: string;
                systemManufacturer: string;
                systemProductName: string;
                systemSku: string;
            }
            export interface IEasClientSecurityPolicy {
                disallowConvenienceLogon: boolean;
                maxInactivityTimeLock: number;
                maxPasswordFailedAttempts: number;
                minPasswordComplexCharacters: number;
                minPasswordLength: number;
                passwordExpiration: number;
                passwordHistory: number;
                requireEncryption: boolean;
                checkCompliance(): Windows.Security.ExchangeActiveSyncProvisioning.EasComplianceResults;
                applyAsync(): Windows.Foundation.IAsyncOperation<Windows.Security.ExchangeActiveSyncProvisioning.EasComplianceResults>;
            }
            export class EasComplianceResults implements Windows.Security.ExchangeActiveSyncProvisioning.IEasComplianceResults {
                compliant: boolean;
                disallowConvenienceLogonResult: Windows.Security.ExchangeActiveSyncProvisioning.EasDisallowConvenienceLogonResult;
                maxInactivityTimeLockResult: Windows.Security.ExchangeActiveSyncProvisioning.EasMaxInactivityTimeLockResult;
                maxPasswordFailedAttemptsResult: Windows.Security.ExchangeActiveSyncProvisioning.EasMaxPasswordFailedAttemptsResult;
                minPasswordComplexCharactersResult: Windows.Security.ExchangeActiveSyncProvisioning.EasMinPasswordComplexCharactersResult;
                minPasswordLengthResult: Windows.Security.ExchangeActiveSyncProvisioning.EasMinPasswordLengthResult;
                passwordExpirationResult: Windows.Security.ExchangeActiveSyncProvisioning.EasPasswordExpirationResult;
                passwordHistoryResult: Windows.Security.ExchangeActiveSyncProvisioning.EasPasswordHistoryResult;
                requireEncryptionResult: Windows.Security.ExchangeActiveSyncProvisioning.EasRequireEncryptionResult;
            }
            export interface IEasComplianceResults {
                compliant: boolean;
                disallowConvenienceLogonResult: Windows.Security.ExchangeActiveSyncProvisioning.EasDisallowConvenienceLogonResult;
                maxInactivityTimeLockResult: Windows.Security.ExchangeActiveSyncProvisioning.EasMaxInactivityTimeLockResult;
                maxPasswordFailedAttemptsResult: Windows.Security.ExchangeActiveSyncProvisioning.EasMaxPasswordFailedAttemptsResult;
                minPasswordComplexCharactersResult: Windows.Security.ExchangeActiveSyncProvisioning.EasMinPasswordComplexCharactersResult;
                minPasswordLengthResult: Windows.Security.ExchangeActiveSyncProvisioning.EasMinPasswordLengthResult;
                passwordExpirationResult: Windows.Security.ExchangeActiveSyncProvisioning.EasPasswordExpirationResult;
                passwordHistoryResult: Windows.Security.ExchangeActiveSyncProvisioning.EasPasswordHistoryResult;
                requireEncryptionResult: Windows.Security.ExchangeActiveSyncProvisioning.EasRequireEncryptionResult;
            }
            export class EasClientSecurityPolicy implements Windows.Security.ExchangeActiveSyncProvisioning.IEasClientSecurityPolicy {
                disallowConvenienceLogon: boolean;
                maxInactivityTimeLock: number;
                maxPasswordFailedAttempts: number;
                minPasswordComplexCharacters: number;
                minPasswordLength: number;
                passwordExpiration: number;
                passwordHistory: number;
                requireEncryption: boolean;
                checkCompliance(): Windows.Security.ExchangeActiveSyncProvisioning.EasComplianceResults;
                applyAsync(): Windows.Foundation.IAsyncOperation<Windows.Security.ExchangeActiveSyncProvisioning.EasComplianceResults>;
            }
            export class EasClientDeviceInformation implements Windows.Security.ExchangeActiveSyncProvisioning.IEasClientDeviceInformation {
                friendlyName: string;
                id: string;
                operatingSystem: string;
                systemManufacturer: string;
                systemProductName: string;
                systemSku: string;
            }
        }
    }
}
declare module Windows {
    export module Storage {
        export module Streams {
            export enum ByteOrder {
                littleEndian,
                bigEndian,
            }
            export enum UnicodeEncoding {
                utf8,
                utf16LE,
                utf16BE,
            }
            export class DataReaderLoadOperation implements Windows.Foundation.IAsyncOperation<number>, Windows.Foundation.IAsyncInfo {
                completed: Windows.Foundation.AsyncOperationCompletedHandler<number>;
                errorCode: number;
                id: number;
                status: Windows.Foundation.AsyncStatus;
                getResults(): number;
                cancel(): void;
                close(): void;
                then<U>(success?: (value: number) => U, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: number) => Windows.Foundation.IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: number) => U, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: number) => Windows.Foundation.IPromise<U>, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                done<U>(success?: (value: number) => any, error?: (error: any) => any, progress?: (progress: any) => void ): void;
                operation: {
                    completed: Windows.Foundation.AsyncOperationCompletedHandler<number>;
                    getResults(): number;
                }
            }
            export interface IDataReader {
                byteOrder: Windows.Storage.Streams.ByteOrder;
                inputStreamOptions: Windows.Storage.Streams.InputStreamOptions;
                unconsumedBufferLength: number;
                unicodeEncoding: Windows.Storage.Streams.UnicodeEncoding;
                readByte(): number;
                readBytes(): Uint8Array;
                readBuffer(length: number): Windows.Storage.Streams.IBuffer;
                readBoolean(): boolean;
                readGuid(): string;
                readInt16(): number;
                readInt32(): number;
                readInt64(): number;
                readUInt16(): number;
                readUInt32(): number;
                readUInt64(): number;
                readSingle(): number;
                readDouble(): number;
                readString(codeUnitCount: number): string;
                readDateTime(): Date;
                readTimeSpan(): number;
                loadAsync(count: number): Windows.Storage.Streams.DataReaderLoadOperation;
                detachBuffer(): Windows.Storage.Streams.IBuffer;
                detachStream(): Windows.Storage.Streams.IInputStream;
            }
            export interface IDataReaderFactory {
                createDataReader(inputStream: Windows.Storage.Streams.IInputStream): Windows.Storage.Streams.DataReader;
            }
            export class DataReader implements Windows.Storage.Streams.IDataReader, Windows.Foundation.IClosable {
                constructor(inputStream: Windows.Storage.Streams.IInputStream);
                byteOrder: Windows.Storage.Streams.ByteOrder;
                inputStreamOptions: Windows.Storage.Streams.InputStreamOptions;
                unconsumedBufferLength: number;
                unicodeEncoding: Windows.Storage.Streams.UnicodeEncoding;
                readByte(): number;
                readBytes(): Uint8Array;
                readBuffer(length: number): Windows.Storage.Streams.IBuffer;
                readBoolean(): boolean;
                readGuid(): string;
                readInt16(): number;
                readInt32(): number;
                readInt64(): number;
                readUInt16(): number;
                readUInt32(): number;
                readUInt64(): number;
                readSingle(): number;
                readDouble(): number;
                readString(codeUnitCount: number): string;
                readDateTime(): Date;
                readTimeSpan(): number;
                loadAsync(count: number): Windows.Storage.Streams.DataReaderLoadOperation;
                detachBuffer(): Windows.Storage.Streams.IBuffer;
                detachStream(): Windows.Storage.Streams.IInputStream;
                dispose(): void;
                static fromBuffer(buffer: Windows.Storage.Streams.IBuffer): Windows.Storage.Streams.DataReader;
                close(): void;
            }
            export interface IDataReaderStatics {
                fromBuffer(buffer: Windows.Storage.Streams.IBuffer): Windows.Storage.Streams.DataReader;
            }
            export class DataWriterStoreOperation implements Windows.Foundation.IAsyncOperation<number>, Windows.Foundation.IAsyncInfo {
                completed: Windows.Foundation.AsyncOperationCompletedHandler<number>;
                errorCode: number;
                id: number;
                status: Windows.Foundation.AsyncStatus;
                getResults(): number;
                cancel(): void;
                close(): void;
                then<U>(success?: (value: number) => U, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: number) => Windows.Foundation.IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: number) => U, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                then<U>(success?: (value: number) => Windows.Foundation.IPromise<U>, error?: (error: any) => Windows.Foundation.IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
                done<U>(success?: (value: number) => any, error?: (error: any) => any, progress?: (progress: any) => void ): void;
                operation: {
                    completed: Windows.Foundation.AsyncOperationCompletedHandler<number>;
                    getResults(): number;
                }
            }
            export interface IDataWriter {
                byteOrder: Windows.Storage.Streams.ByteOrder;
                unicodeEncoding: Windows.Storage.Streams.UnicodeEncoding;
                unstoredBufferLength: number;
                writeByte(value: number): void;
                writeBytes(value: Uint8Array): void;
                writeBuffer(buffer: Windows.Storage.Streams.IBuffer): void;
                writeBuffer(buffer: Windows.Storage.Streams.IBuffer, start: number, count: number): void;
                writeBoolean(value: boolean): void;
                writeGuid(value: string): void;
                writeInt16(value: number): void;
                writeInt32(value: number): void;
                writeInt64(value: number): void;
                writeUInt16(value: number): void;
                writeUInt32(value: number): void;
                writeUInt64(value: number): void;
                writeSingle(value: number): void;
                writeDouble(value: number): void;
                writeDateTime(value: Date): void;
                writeTimeSpan(value: number): void;
                writeString(value: string): number;
                measureString(value: string): number;
                storeAsync(): Windows.Storage.Streams.DataWriterStoreOperation;
                flushAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                detachBuffer(): Windows.Storage.Streams.IBuffer;
                detachStream(): Windows.Storage.Streams.IOutputStream;
            }
            export interface IDataWriterFactory {
                createDataWriter(outputStream: Windows.Storage.Streams.IOutputStream): Windows.Storage.Streams.DataWriter;
            }
            export class DataWriter implements Windows.Storage.Streams.IDataWriter, Windows.Foundation.IClosable {
                constructor(outputStream: Windows.Storage.Streams.IOutputStream);
                constructor();
                byteOrder: Windows.Storage.Streams.ByteOrder;
                unicodeEncoding: Windows.Storage.Streams.UnicodeEncoding;
                unstoredBufferLength: number;
                writeByte(value: number): void;
                writeBytes(value: Uint8Array): void;
                writeBuffer(buffer: Windows.Storage.Streams.IBuffer): void;
                writeBuffer(buffer: Windows.Storage.Streams.IBuffer, start: number, count: number): void;
                writeBoolean(value: boolean): void;
                writeGuid(value: string): void;
                writeInt16(value: number): void;
                writeInt32(value: number): void;
                writeInt64(value: number): void;
                writeUInt16(value: number): void;
                writeUInt32(value: number): void;
                writeUInt64(value: number): void;
                writeSingle(value: number): void;
                writeDouble(value: number): void;
                writeDateTime(value: Date): void;
                writeTimeSpan(value: number): void;
                writeString(value: string): number;
                measureString(value: string): number;
                storeAsync(): Windows.Storage.Streams.DataWriterStoreOperation;
                flushAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                detachBuffer(): Windows.Storage.Streams.IBuffer;
                detachStream(): Windows.Storage.Streams.IOutputStream;
                dispose(): void;
                close(): void;
            }
            export interface IRandomAccessStreamStatics {
                copyAsync(source: Windows.Storage.Streams.IInputStream, destination: Windows.Storage.Streams.IOutputStream): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
                copyAsync(source: Windows.Storage.Streams.IInputStream, destination: Windows.Storage.Streams.IOutputStream, bytesToCopy: number): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
                copyAndCloseAsync(source: Windows.Storage.Streams.IInputStream, destination: Windows.Storage.Streams.IOutputStream): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
            }
            export class RandomAccessStream {
                static copyAsync(source: Windows.Storage.Streams.IInputStream, destination: Windows.Storage.Streams.IOutputStream): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
                static copyAsync(source: Windows.Storage.Streams.IInputStream, destination: Windows.Storage.Streams.IOutputStream, bytesToCopy: number): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
                static copyAndCloseAsync(source: Windows.Storage.Streams.IInputStream, destination: Windows.Storage.Streams.IOutputStream): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
            }
            export interface IBufferFactory {
                create(capacity: number): Windows.Storage.Streams.Buffer;
            }
            export class Buffer implements Windows.Storage.Streams.IBuffer {
                constructor(capacity: number);
                capacity: number;
                length: number;
            }
            export interface IBuffer {
                capacity: number;
                length: number;
            }
            export enum InputStreamOptions {
                none,
                partial,
                readAhead,
            }
            export interface IContentTypeProvider {
                contentType: string;
            }
            export interface IRandomAccessStreamReference {
                openReadAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IRandomAccessStreamWithContentType>;
            }
            export interface IInputStreamReference {
                openSequentialReadAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IInputStream>;
            }
            export interface IRandomAccessStreamReferenceStatics {
                createFromFile(file: Windows.Storage.IStorageFile): Windows.Storage.Streams.RandomAccessStreamReference;
                createFromUri(uri: Windows.Foundation.Uri): Windows.Storage.Streams.RandomAccessStreamReference;
                createFromStream(stream: Windows.Storage.Streams.IRandomAccessStream): Windows.Storage.Streams.RandomAccessStreamReference;
            }
            export class RandomAccessStreamReference implements Windows.Storage.Streams.IRandomAccessStreamReference {
                openReadAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IRandomAccessStreamWithContentType>;
                static createFromFile(file: Windows.Storage.IStorageFile): Windows.Storage.Streams.RandomAccessStreamReference;
                static createFromUri(uri: Windows.Foundation.Uri): Windows.Storage.Streams.RandomAccessStreamReference;
                static createFromStream(stream: Windows.Storage.Streams.IRandomAccessStream): Windows.Storage.Streams.RandomAccessStreamReference;
            }
            export class FileRandomAccessStream implements Windows.Storage.Streams.IRandomAccessStream, Windows.Foundation.IClosable, Windows.Storage.Streams.IInputStream, Windows.Storage.Streams.IOutputStream {
                canRead: boolean;
                canWrite: boolean;
                position: number;
                size: number;
                getInputStreamAt(position: number): Windows.Storage.Streams.IInputStream;
                getOutputStreamAt(position: number): Windows.Storage.Streams.IOutputStream;
                seek(position: number): void;
                cloneStream(): Windows.Storage.Streams.IRandomAccessStream;
                dispose(): void;
                readAsync(buffer: Windows.Storage.Streams.IBuffer, count: number, options: Windows.Storage.Streams.InputStreamOptions): Windows.Foundation.IAsyncOperationWithProgress<Windows.Storage.Streams.IBuffer, number>;
                writeAsync(buffer: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
                flushAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                close(): void;
            }
            export class FileInputStream implements Windows.Storage.Streams.IInputStream, Windows.Foundation.IClosable {
                readAsync(buffer: Windows.Storage.Streams.IBuffer, count: number, options: Windows.Storage.Streams.InputStreamOptions): Windows.Foundation.IAsyncOperationWithProgress<Windows.Storage.Streams.IBuffer, number>;
                dispose(): void;
                close(): void;
            }
            export class FileOutputStream implements Windows.Storage.Streams.IOutputStream, Windows.Foundation.IClosable {
                writeAsync(buffer: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
                flushAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                dispose(): void;
                close(): void;
            }
            export class RandomAccessStreamOverStream implements Windows.Storage.Streams.IRandomAccessStream, Windows.Foundation.IClosable, Windows.Storage.Streams.IInputStream, Windows.Storage.Streams.IOutputStream {
                canRead: boolean;
                canWrite: boolean;
                position: number;
                size: number;
                getInputStreamAt(position: number): Windows.Storage.Streams.IInputStream;
                getOutputStreamAt(position: number): Windows.Storage.Streams.IOutputStream;
                seek(position: number): void;
                cloneStream(): Windows.Storage.Streams.IRandomAccessStream;
                dispose(): void;
                readAsync(buffer: Windows.Storage.Streams.IBuffer, count: number, options: Windows.Storage.Streams.InputStreamOptions): Windows.Foundation.IAsyncOperationWithProgress<Windows.Storage.Streams.IBuffer, number>;
                writeAsync(buffer: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
                flushAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                close(): void;
            }
            export class InputStreamOverStream implements Windows.Storage.Streams.IInputStream, Windows.Foundation.IClosable {
                readAsync(buffer: Windows.Storage.Streams.IBuffer, count: number, options: Windows.Storage.Streams.InputStreamOptions): Windows.Foundation.IAsyncOperationWithProgress<Windows.Storage.Streams.IBuffer, number>;
                dispose(): void;
                close(): void;
            }
            export class OutputStreamOverStream implements Windows.Storage.Streams.IOutputStream, Windows.Foundation.IClosable {
                writeAsync(buffer: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
                flushAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                dispose(): void;
                close(): void;
            }
            export class InMemoryRandomAccessStream implements Windows.Storage.Streams.IRandomAccessStream, Windows.Foundation.IClosable, Windows.Storage.Streams.IInputStream, Windows.Storage.Streams.IOutputStream {
                canRead: boolean;
                canWrite: boolean;
                position: number;
                size: number;
                getInputStreamAt(position: number): Windows.Storage.Streams.IInputStream;
                getOutputStreamAt(position: number): Windows.Storage.Streams.IOutputStream;
                seek(position: number): void;
                cloneStream(): Windows.Storage.Streams.IRandomAccessStream;
                dispose(): void;
                readAsync(buffer: Windows.Storage.Streams.IBuffer, count: number, options: Windows.Storage.Streams.InputStreamOptions): Windows.Foundation.IAsyncOperationWithProgress<Windows.Storage.Streams.IBuffer, number>;
                writeAsync(buffer: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
                flushAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                close(): void;
            }
            export interface IInputStream extends Windows.Foundation.IClosable {
                readAsync(buffer: Windows.Storage.Streams.IBuffer, count: number, options: Windows.Storage.Streams.InputStreamOptions): Windows.Foundation.IAsyncOperationWithProgress<Windows.Storage.Streams.IBuffer, number>;
            }
            export interface IOutputStream extends Windows.Foundation.IClosable {
                writeAsync(buffer: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
                flushAsync(): Windows.Foundation.IAsyncOperation<boolean>;
            }
            export interface IRandomAccessStream extends Windows.Foundation.IClosable, Windows.Storage.Streams.IInputStream, Windows.Storage.Streams.IOutputStream {
                canRead: boolean;
                canWrite: boolean;
                position: number;
                size: number;
                getInputStreamAt(position: number): Windows.Storage.Streams.IInputStream;
                getOutputStreamAt(position: number): Windows.Storage.Streams.IOutputStream;
                seek(position: number): void;
                cloneStream(): Windows.Storage.Streams.IRandomAccessStream;
            }
            export interface IRandomAccessStreamWithContentType extends Windows.Storage.Streams.IRandomAccessStream, Windows.Foundation.IClosable, Windows.Storage.Streams.IInputStream, Windows.Storage.Streams.IOutputStream, Windows.Storage.Streams.IContentTypeProvider {
            }
        }
    }
}
declare module Windows {
    export module Storage {
        export module Pickers {
            export module Provider {
                export interface IFileRemovedEventArgs {
                    id: string;
                }
                export class FileRemovedEventArgs implements Windows.Storage.Pickers.Provider.IFileRemovedEventArgs {
                    id: string;
                }
                export enum AddFileResult {
                    added,
                    alreadyAdded,
                    notAllowed,
                    unavailable,
                }
                export enum FileSelectionMode {
                    single,
                    multiple,
                }
                export interface IFileOpenPickerUI {
                    allowedFileTypes: Windows.Foundation.Collections.IVectorView<string>;
                    selectionMode: Windows.Storage.Pickers.Provider.FileSelectionMode;
                    settingsIdentifier: string;
                    title: string;
                    addFile(id: string, file: Windows.Storage.IStorageFile): Windows.Storage.Pickers.Provider.AddFileResult;
                    removeFile(id: string): void;
                    containsFile(id: string): boolean;
                    canAddFile(file: Windows.Storage.IStorageFile): boolean;
                    onfileremoved: any/* TODO */;
                    onclosing: any/* TODO */;
                }
                export class FileOpenPickerUI implements Windows.Storage.Pickers.Provider.IFileOpenPickerUI {
                    allowedFileTypes: Windows.Foundation.Collections.IVectorView<string>;
                    selectionMode: Windows.Storage.Pickers.Provider.FileSelectionMode;
                    settingsIdentifier: string;
                    title: string;
                    addFile(id: string, file: Windows.Storage.IStorageFile): Windows.Storage.Pickers.Provider.AddFileResult;
                    removeFile(id: string): void;
                    containsFile(id: string): boolean;
                    canAddFile(file: Windows.Storage.IStorageFile): boolean;
                    onfileremoved: any/* TODO */;
                    onclosing: any/* TODO */;
                }
                export class PickerClosingEventArgs implements Windows.Storage.Pickers.Provider.IPickerClosingEventArgs {
                    closingOperation: Windows.Storage.Pickers.Provider.PickerClosingOperation;
                    isCanceled: boolean;
                }
                export interface IPickerClosingEventArgs {
                    closingOperation: Windows.Storage.Pickers.Provider.PickerClosingOperation;
                    isCanceled: boolean;
                }
                export class PickerClosingOperation implements Windows.Storage.Pickers.Provider.IPickerClosingOperation {
                    deadline: Date;
                    getDeferral(): Windows.Storage.Pickers.Provider.PickerClosingDeferral;
                }
                export interface IPickerClosingOperation {
                    deadline: Date;
                    getDeferral(): Windows.Storage.Pickers.Provider.PickerClosingDeferral;
                }
                export class PickerClosingDeferral implements Windows.Storage.Pickers.Provider.IPickerClosingDeferral {
                    complete(): void;
                }
                export interface IPickerClosingDeferral {
                    complete(): void;
                }
                export enum SetFileNameResult {
                    succeeded,
                    notAllowed,
                    unavailable,
                }
                export interface IFileSavePickerUI {
                    allowedFileTypes: Windows.Foundation.Collections.IVectorView<string>;
                    fileName: string;
                    settingsIdentifier: string;
                    title: string;
                    trySetFileName(value: string): Windows.Storage.Pickers.Provider.SetFileNameResult;
                    onfilenamechanged: any/* TODO */;
                    ontargetfilerequested: any/* TODO */;
                }
                export class FileSavePickerUI implements Windows.Storage.Pickers.Provider.IFileSavePickerUI {
                    allowedFileTypes: Windows.Foundation.Collections.IVectorView<string>;
                    fileName: string;
                    settingsIdentifier: string;
                    title: string;
                    trySetFileName(value: string): Windows.Storage.Pickers.Provider.SetFileNameResult;
                    onfilenamechanged: any/* TODO */;
                    ontargetfilerequested: any/* TODO */;
                }
                export class TargetFileRequestedEventArgs implements Windows.Storage.Pickers.Provider.ITargetFileRequestedEventArgs {
                    request: Windows.Storage.Pickers.Provider.TargetFileRequest;
                }
                export interface ITargetFileRequestedEventArgs {
                    request: Windows.Storage.Pickers.Provider.TargetFileRequest;
                }
                export class TargetFileRequest implements Windows.Storage.Pickers.Provider.ITargetFileRequest {
                    targetFile: Windows.Storage.IStorageFile;
                    getDeferral(): Windows.Storage.Pickers.Provider.TargetFileRequestDeferral;
                }
                export interface ITargetFileRequest {
                    targetFile: Windows.Storage.IStorageFile;
                    getDeferral(): Windows.Storage.Pickers.Provider.TargetFileRequestDeferral;
                }
                export class TargetFileRequestDeferral implements Windows.Storage.Pickers.Provider.ITargetFileRequestDeferral {
                    complete(): void;
                }
                export interface ITargetFileRequestDeferral {
                    complete(): void;
                }
            }
        }
    }
}
declare module Windows {
    export module Storage {
        export module Provider {
            export enum CachedFileTarget {
                local,
                remote,
            }
            export enum UIStatus {
                unavailable,
                hidden,
                visible,
                complete,
            }
            export interface ICachedFileUpdaterUI {
                title: string;
                uIStatus: Windows.Storage.Provider.UIStatus;
                updateTarget: Windows.Storage.Provider.CachedFileTarget;
                onfileupdaterequested: any/* TODO */;
                onuirequested: any/* TODO */;
            }
            export class CachedFileUpdaterUI implements Windows.Storage.Provider.ICachedFileUpdaterUI {
                title: string;
                uIStatus: Windows.Storage.Provider.UIStatus;
                updateTarget: Windows.Storage.Provider.CachedFileTarget;
                onfileupdaterequested: any/* TODO */;
                onuirequested: any/* TODO */;
            }
            export class FileUpdateRequestedEventArgs implements Windows.Storage.Provider.IFileUpdateRequestedEventArgs {
                request: Windows.Storage.Provider.FileUpdateRequest;
            }
            export interface IFileUpdateRequestedEventArgs {
                request: Windows.Storage.Provider.FileUpdateRequest;
            }
            export class FileUpdateRequest implements Windows.Storage.Provider.IFileUpdateRequest {
                contentId: string;
                file: Windows.Storage.StorageFile;
                status: Windows.Storage.Provider.FileUpdateStatus;
                getDeferral(): Windows.Storage.Provider.FileUpdateRequestDeferral;
                updateLocalFile(value: Windows.Storage.IStorageFile): void;
            }
            export interface IFileUpdateRequest {
                contentId: string;
                file: Windows.Storage.StorageFile;
                status: Windows.Storage.Provider.FileUpdateStatus;
                getDeferral(): Windows.Storage.Provider.FileUpdateRequestDeferral;
                updateLocalFile(value: Windows.Storage.IStorageFile): void;
            }
            export class FileUpdateRequestDeferral implements Windows.Storage.Provider.IFileUpdateRequestDeferral {
                complete(): void;
            }
            export interface IFileUpdateRequestDeferral {
                complete(): void;
            }
            export enum FileUpdateStatus {
                incomplete,
                complete,
                userInputNeeded,
                currentlyUnavailable,
                failed,
                completeAndRenamed,
            }
            export enum CachedFileOptions {
                none,
                requireUpdateOnAccess,
                useCachedFileWhenOffline,
                denyAccessWhenOffline,
            }
            export enum ReadActivationMode {
                notNeeded,
                beforeAccess,
            }
            export enum WriteActivationMode {
                readOnly,
                notNeeded,
                afterWrite,
            }
            export interface ICachedFileUpdaterStatics {
                setUpdateInformation(file: Windows.Storage.IStorageFile, contentId: string, readMode: Windows.Storage.Provider.ReadActivationMode, writeMode: Windows.Storage.Provider.WriteActivationMode, options: Windows.Storage.Provider.CachedFileOptions): void;
            }
            export class CachedFileUpdater {
                static setUpdateInformation(file: Windows.Storage.IStorageFile, contentId: string, readMode: Windows.Storage.Provider.ReadActivationMode, writeMode: Windows.Storage.Provider.WriteActivationMode, options: Windows.Storage.Provider.CachedFileOptions): void;
            }
        }
    }
}
declare module Windows {
    export module Storage {
        export module FileProperties {
            export enum PropertyPrefetchOptions {
                none,
                musicProperties,
                videoProperties,
                imageProperties,
                documentProperties,
                basicProperties,
            }
            export enum ThumbnailType {
                image,
                icon,
            }
            export interface IThumbnailProperties {
                originalHeight: number;
                originalWidth: number;
                returnedSmallerCachedSize: boolean;
                type: Windows.Storage.FileProperties.ThumbnailType;
            }
            export class StorageItemThumbnail implements Windows.Storage.Streams.IRandomAccessStreamWithContentType, Windows.Storage.Streams.IRandomAccessStream, Windows.Foundation.IClosable, Windows.Storage.Streams.IInputStream, Windows.Storage.Streams.IOutputStream, Windows.Storage.Streams.IContentTypeProvider, Windows.Storage.FileProperties.IThumbnailProperties {
                canRead: boolean;
                canWrite: boolean;
                position: number;
                size: number;
                contentType: string;
                originalHeight: number;
                originalWidth: number;
                returnedSmallerCachedSize: boolean;
                type: Windows.Storage.FileProperties.ThumbnailType;
                getInputStreamAt(position: number): Windows.Storage.Streams.IInputStream;
                getOutputStreamAt(position: number): Windows.Storage.Streams.IOutputStream;
                seek(position: number): void;
                cloneStream(): Windows.Storage.Streams.IRandomAccessStream;
                dispose(): void;
                readAsync(buffer: Windows.Storage.Streams.IBuffer, count: number, options: Windows.Storage.Streams.InputStreamOptions): Windows.Foundation.IAsyncOperationWithProgress<Windows.Storage.Streams.IBuffer, number>;
                writeAsync(buffer: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
                flushAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                close(): void;
            }
            export enum ThumbnailMode {
                picturesView,
                videosView,
                musicView,
                documentsView,
                listView,
                singleItem,
            }
            export enum ThumbnailOptions {
                none,
                returnOnlyIfCached,
                resizeThumbnail,
                useCurrentScale,
            }
            export enum PhotoOrientation {
                unspecified,
                normal,
                flipHorizontal,
                rotate180,
                flipVertical,
                transpose,
                rotate270,
                transverse,
                rotate90,
            }
            export enum VideoOrientation {
                normal,
                rotate90,
                rotate180,
                rotate270,
            }
            export interface IStorageItemExtraProperties {
                retrievePropertiesAsync(propertiesToRetrieve: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IMap<string, any>>;
                savePropertiesAsync(propertiesToSave: Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, any>>): Windows.Foundation.IAsyncAction;
                savePropertiesAsync(): Windows.Foundation.IAsyncAction;
            }
            export interface IStorageItemContentProperties extends Windows.Storage.FileProperties.IStorageItemExtraProperties {
                getMusicPropertiesAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.MusicProperties>;
                getVideoPropertiesAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.VideoProperties>;
                getImagePropertiesAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.ImageProperties>;
                getDocumentPropertiesAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.DocumentProperties>;
            }
            export class MusicProperties implements Windows.Storage.FileProperties.IMusicProperties, Windows.Storage.FileProperties.IStorageItemExtraProperties {
                album: string;
                albumArtist: string;
                artist: string;
                bitrate: number;
                composers: Windows.Foundation.Collections.IVector<string>;
                conductors: Windows.Foundation.Collections.IVector<string>;
                duration: number;
                genre: Windows.Foundation.Collections.IVector<string>;
                producers: Windows.Foundation.Collections.IVector<string>;
                publisher: string;
                rating: number;
                subtitle: string;
                title: string;
                trackNumber: number;
                writers: Windows.Foundation.Collections.IVector<string>;
                year: number;
                retrievePropertiesAsync(propertiesToRetrieve: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IMap<string, any>>;
                savePropertiesAsync(propertiesToSave: Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, any>>): Windows.Foundation.IAsyncAction;
                savePropertiesAsync(): Windows.Foundation.IAsyncAction;
            }
            export class VideoProperties implements Windows.Storage.FileProperties.IVideoProperties, Windows.Storage.FileProperties.IStorageItemExtraProperties {
                bitrate: number;
                directors: Windows.Foundation.Collections.IVector<string>;
                duration: number;
                height: number;
                keywords: Windows.Foundation.Collections.IVector<string>;
                latitude: number;
                longitude: number;
                orientation: Windows.Storage.FileProperties.VideoOrientation;
                producers: Windows.Foundation.Collections.IVector<string>;
                publisher: string;
                rating: number;
                subtitle: string;
                title: string;
                width: number;
                writers: Windows.Foundation.Collections.IVector<string>;
                year: number;
                retrievePropertiesAsync(propertiesToRetrieve: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IMap<string, any>>;
                savePropertiesAsync(propertiesToSave: Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, any>>): Windows.Foundation.IAsyncAction;
                savePropertiesAsync(): Windows.Foundation.IAsyncAction;
            }
            export class ImageProperties implements Windows.Storage.FileProperties.IImageProperties, Windows.Storage.FileProperties.IStorageItemExtraProperties {
                cameraManufacturer: string;
                cameraModel: string;
                dateTaken: Date;
                height: number;
                keywords: Windows.Foundation.Collections.IVector<string>;
                latitude: number;
                longitude: number;
                orientation: Windows.Storage.FileProperties.PhotoOrientation;
                peopleNames: Windows.Foundation.Collections.IVectorView<string>;
                rating: number;
                title: string;
                width: number;
                retrievePropertiesAsync(propertiesToRetrieve: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IMap<string, any>>;
                savePropertiesAsync(propertiesToSave: Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, any>>): Windows.Foundation.IAsyncAction;
                savePropertiesAsync(): Windows.Foundation.IAsyncAction;
            }
            export class DocumentProperties implements Windows.Storage.FileProperties.IDocumentProperties, Windows.Storage.FileProperties.IStorageItemExtraProperties {
                author: Windows.Foundation.Collections.IVector<string>;
                comment: string;
                keywords: Windows.Foundation.Collections.IVector<string>;
                title: string;
                retrievePropertiesAsync(propertiesToRetrieve: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IMap<string, any>>;
                savePropertiesAsync(propertiesToSave: Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, any>>): Windows.Foundation.IAsyncAction;
                savePropertiesAsync(): Windows.Foundation.IAsyncAction;
            }
            export interface IMusicProperties extends Windows.Storage.FileProperties.IStorageItemExtraProperties {
                album: string;
                albumArtist: string;
                artist: string;
                bitrate: number;
                composers: Windows.Foundation.Collections.IVector<string>;
                conductors: Windows.Foundation.Collections.IVector<string>;
                duration: number;
                genre: Windows.Foundation.Collections.IVector<string>;
                producers: Windows.Foundation.Collections.IVector<string>;
                publisher: string;
                rating: number;
                subtitle: string;
                title: string;
                trackNumber: number;
                writers: Windows.Foundation.Collections.IVector<string>;
                year: number;
            }
            export interface IImageProperties extends Windows.Storage.FileProperties.IStorageItemExtraProperties {
                cameraManufacturer: string;
                cameraModel: string;
                dateTaken: Date;
                height: number;
                keywords: Windows.Foundation.Collections.IVector<string>;
                latitude: number;
                longitude: number;
                orientation: Windows.Storage.FileProperties.PhotoOrientation;
                peopleNames: Windows.Foundation.Collections.IVectorView<string>;
                rating: number;
                title: string;
                width: number;
            }
            export interface IVideoProperties extends Windows.Storage.FileProperties.IStorageItemExtraProperties {
                bitrate: number;
                directors: Windows.Foundation.Collections.IVector<string>;
                duration: number;
                height: number;
                keywords: Windows.Foundation.Collections.IVector<string>;
                latitude: number;
                longitude: number;
                orientation: Windows.Storage.FileProperties.VideoOrientation;
                producers: Windows.Foundation.Collections.IVector<string>;
                publisher: string;
                rating: number;
                subtitle: string;
                title: string;
                width: number;
                writers: Windows.Foundation.Collections.IVector<string>;
                year: number;
            }
            export interface IDocumentProperties extends Windows.Storage.FileProperties.IStorageItemExtraProperties {
                author: Windows.Foundation.Collections.IVector<string>;
                comment: string;
                keywords: Windows.Foundation.Collections.IVector<string>;
                title: string;
            }
            export interface IBasicProperties {
                dateModified: Date;
                itemDate: Date;
                size: number;
            }
            export class StorageItemContentProperties implements Windows.Storage.FileProperties.IStorageItemContentProperties, Windows.Storage.FileProperties.IStorageItemExtraProperties {
                getMusicPropertiesAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.MusicProperties>;
                getVideoPropertiesAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.VideoProperties>;
                getImagePropertiesAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.ImageProperties>;
                getDocumentPropertiesAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.DocumentProperties>;
                retrievePropertiesAsync(propertiesToRetrieve: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IMap<string, any>>;
                savePropertiesAsync(propertiesToSave: Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, any>>): Windows.Foundation.IAsyncAction;
                savePropertiesAsync(): Windows.Foundation.IAsyncAction;
            }
            export class BasicProperties implements Windows.Storage.FileProperties.IBasicProperties, Windows.Storage.FileProperties.IStorageItemExtraProperties {
                dateModified: Date;
                itemDate: Date;
                size: number;
                retrievePropertiesAsync(propertiesToRetrieve: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IMap<string, any>>;
                savePropertiesAsync(propertiesToSave: Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, any>>): Windows.Foundation.IAsyncAction;
                savePropertiesAsync(): Windows.Foundation.IAsyncAction;
            }
        }
    }
}
declare module Windows {
    export module Storage {
        export interface IKnownFoldersStatics {
            documentsLibrary: Windows.Storage.StorageFolder;
            homeGroup: Windows.Storage.StorageFolder;
            mediaServerDevices: Windows.Storage.StorageFolder;
            musicLibrary: Windows.Storage.StorageFolder;
            picturesLibrary: Windows.Storage.StorageFolder;
            removableDevices: Windows.Storage.StorageFolder;
            videosLibrary: Windows.Storage.StorageFolder;
        }
        export class StorageFolder implements Windows.Storage.IStorageFolder, Windows.Storage.IStorageItem, Windows.Storage.Search.IStorageFolderQueryOperations, Windows.Storage.IStorageItemProperties {
            attributes: Windows.Storage.FileAttributes;
            dateCreated: Date;
            name: string;
            path: string;
            displayName: string;
            displayType: string;
            folderRelativeId: string;
            properties: Windows.Storage.FileProperties.StorageItemContentProperties;
            createFileAsync(desiredName: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            createFileAsync(desiredName: string, options: Windows.Storage.CreationCollisionOption): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            createFolderAsync(desiredName: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
            createFolderAsync(desiredName: string, options: Windows.Storage.CreationCollisionOption): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
            getFileAsync(name: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            getFolderAsync(name: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
            getItemAsync(name: string): Windows.Foundation.IAsyncOperation<Windows.Storage.IStorageItem>;
            getFilesAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>>;
            getFoldersAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFolder>>;
            getItemsAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.IStorageItem>>;
            renameAsync(desiredName: string): Windows.Foundation.IAsyncAction;
            renameAsync(desiredName: string, option: Windows.Storage.NameCollisionOption): Windows.Foundation.IAsyncAction;
            deleteAsync(): Windows.Foundation.IAsyncAction;
            deleteAsync(option: Windows.Storage.StorageDeleteOption): Windows.Foundation.IAsyncAction;
            getBasicPropertiesAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.BasicProperties>;
            isOfType(type: Windows.Storage.StorageItemTypes): boolean;
            getIndexedStateAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.Search.IndexedState>;
            createFileQuery(): Windows.Storage.Search.StorageFileQueryResult;
            createFileQuery(query: Windows.Storage.Search.CommonFileQuery): Windows.Storage.Search.StorageFileQueryResult;
            createFileQueryWithOptions(queryOptions: Windows.Storage.Search.QueryOptions): Windows.Storage.Search.StorageFileQueryResult;
            createFolderQuery(): Windows.Storage.Search.StorageFolderQueryResult;
            createFolderQuery(query: Windows.Storage.Search.CommonFolderQuery): Windows.Storage.Search.StorageFolderQueryResult;
            createFolderQueryWithOptions(queryOptions: Windows.Storage.Search.QueryOptions): Windows.Storage.Search.StorageFolderQueryResult;
            createItemQuery(): Windows.Storage.Search.StorageItemQueryResult;
            createItemQueryWithOptions(queryOptions: Windows.Storage.Search.QueryOptions): Windows.Storage.Search.StorageItemQueryResult;
            getFilesAsync(query: Windows.Storage.Search.CommonFileQuery, startIndex: number, maxItemsToRetrieve: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>>;
            getFilesAsync(query: Windows.Storage.Search.CommonFileQuery): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>>;
            getFoldersAsync(query: Windows.Storage.Search.CommonFolderQuery, startIndex: number, maxItemsToRetrieve: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFolder>>;
            getFoldersAsync(query: Windows.Storage.Search.CommonFolderQuery): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFolder>>;
            getItemsAsync(startIndex: number, maxItemsToRetrieve: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.IStorageItem>>;
            areQueryOptionsSupported(queryOptions: Windows.Storage.Search.QueryOptions): boolean;
            isCommonFolderQuerySupported(query: Windows.Storage.Search.CommonFolderQuery): boolean;
            isCommonFileQuerySupported(query: Windows.Storage.Search.CommonFileQuery): boolean;
            getThumbnailAsync(mode: Windows.Storage.FileProperties.ThumbnailMode): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.StorageItemThumbnail>;
            getThumbnailAsync(mode: Windows.Storage.FileProperties.ThumbnailMode, requestedSize: number): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.StorageItemThumbnail>;
            getThumbnailAsync(mode: Windows.Storage.FileProperties.ThumbnailMode, requestedSize: number, options: Windows.Storage.FileProperties.ThumbnailOptions): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.StorageItemThumbnail>;
            static getFolderFromPathAsync(path: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
        }
        export class KnownFolders {
            static documentsLibrary: Windows.Storage.StorageFolder;
            static homeGroup: Windows.Storage.StorageFolder;
            static mediaServerDevices: Windows.Storage.StorageFolder;
            static musicLibrary: Windows.Storage.StorageFolder;
            static picturesLibrary: Windows.Storage.StorageFolder;
            static removableDevices: Windows.Storage.StorageFolder;
            static videosLibrary: Windows.Storage.StorageFolder;
        }
        export enum CreationCollisionOption {
            generateUniqueName,
            replaceExisting,
            failIfExists,
            openIfExists,
        }
        export interface IDownloadsFolderStatics {
            createFileAsync(desiredName: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            createFolderAsync(desiredName: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
            createFileAsync(desiredName: string, option: Windows.Storage.CreationCollisionOption): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            createFolderAsync(desiredName: string, option: Windows.Storage.CreationCollisionOption): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
        }
        export class StorageFile implements Windows.Storage.IStorageFile, Windows.Storage.IStorageItem, Windows.Storage.Streams.IRandomAccessStreamReference, Windows.Storage.Streams.IInputStreamReference, Windows.Storage.IStorageItemProperties {
            contentType: string;
            fileType: string;
            attributes: Windows.Storage.FileAttributes;
            dateCreated: Date;
            name: string;
            path: string;
            displayName: string;
            displayType: string;
            folderRelativeId: string;
            properties: Windows.Storage.FileProperties.StorageItemContentProperties;
            openAsync(accessMode: Windows.Storage.FileAccessMode): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IRandomAccessStream>;
            openTransactedWriteAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageStreamTransaction>;
            copyAsync(destinationFolder: Windows.Storage.IStorageFolder): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            copyAsync(destinationFolder: Windows.Storage.IStorageFolder, desiredNewName: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            copyAsync(destinationFolder: Windows.Storage.IStorageFolder, desiredNewName: string, option: Windows.Storage.NameCollisionOption): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            copyAndReplaceAsync(fileToReplace: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncAction;
            moveAsync(destinationFolder: Windows.Storage.IStorageFolder): Windows.Foundation.IAsyncAction;
            moveAsync(destinationFolder: Windows.Storage.IStorageFolder, desiredNewName: string): Windows.Foundation.IAsyncAction;
            moveAsync(destinationFolder: Windows.Storage.IStorageFolder, desiredNewName: string, option: Windows.Storage.NameCollisionOption): Windows.Foundation.IAsyncAction;
            moveAndReplaceAsync(fileToReplace: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncAction;
            renameAsync(desiredName: string): Windows.Foundation.IAsyncAction;
            renameAsync(desiredName: string, option: Windows.Storage.NameCollisionOption): Windows.Foundation.IAsyncAction;
            deleteAsync(): Windows.Foundation.IAsyncAction;
            deleteAsync(option: Windows.Storage.StorageDeleteOption): Windows.Foundation.IAsyncAction;
            getBasicPropertiesAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.BasicProperties>;
            isOfType(type: Windows.Storage.StorageItemTypes): boolean;
            openReadAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IRandomAccessStreamWithContentType>;
            openSequentialReadAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IInputStream>;
            getThumbnailAsync(mode: Windows.Storage.FileProperties.ThumbnailMode): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.StorageItemThumbnail>;
            getThumbnailAsync(mode: Windows.Storage.FileProperties.ThumbnailMode, requestedSize: number): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.StorageItemThumbnail>;
            getThumbnailAsync(mode: Windows.Storage.FileProperties.ThumbnailMode, requestedSize: number, options: Windows.Storage.FileProperties.ThumbnailOptions): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.StorageItemThumbnail>;
            static getFileFromPathAsync(path: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            static getFileFromApplicationUriAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            static createStreamedFileAsync(displayNameWithExtension: string, dataRequested: Windows.Storage.StreamedFileDataRequestedHandler, thumbnail: Windows.Storage.Streams.IRandomAccessStreamReference): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            static replaceWithStreamedFileAsync(fileToReplace: Windows.Storage.IStorageFile, dataRequested: Windows.Storage.StreamedFileDataRequestedHandler, thumbnail: Windows.Storage.Streams.IRandomAccessStreamReference): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            static createStreamedFileFromUriAsync(displayNameWithExtension: string, uri: Windows.Foundation.Uri, thumbnail: Windows.Storage.Streams.IRandomAccessStreamReference): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            static replaceWithStreamedFileFromUriAsync(fileToReplace: Windows.Storage.IStorageFile, uri: Windows.Foundation.Uri, thumbnail: Windows.Storage.Streams.IRandomAccessStreamReference): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
        }
        export class DownloadsFolder {
            static createFileAsync(desiredName: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            static createFolderAsync(desiredName: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
            static createFileAsync(desiredName: string, option: Windows.Storage.CreationCollisionOption): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            static createFolderAsync(desiredName: string, option: Windows.Storage.CreationCollisionOption): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
        }
        export enum NameCollisionOption {
            generateUniqueName,
            replaceExisting,
            failIfExists,
        }
        export enum StorageDeleteOption {
            default,
            permanentDelete,
        }
        export enum StorageItemTypes {
            none,
            file,
            folder,
        }
        export enum FileAttributes {
            normal,
            readOnly,
            directory,
            archive,
            temporary,
        }
        export enum FileAccessMode {
            read,
            readWrite,
        }
        export enum StreamedFileFailureMode {
            failed,
            currentlyUnavailable,
            incomplete,
        }
        export interface IStreamedFileDataRequest {
            failAndClose(failureMode: Windows.Storage.StreamedFileFailureMode): void;
        }
        export class StreamedFileDataRequest implements Windows.Storage.Streams.IOutputStream, Windows.Foundation.IClosable, Windows.Storage.IStreamedFileDataRequest {
            writeAsync(buffer: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
            flushAsync(): Windows.Foundation.IAsyncOperation<boolean>;
            dispose(): void;
            failAndClose(failureMode: Windows.Storage.StreamedFileFailureMode): void;
            close(): void;
        }
        export interface StreamedFileDataRequestedHandler {
            (stream: Windows.Storage.StreamedFileDataRequest): void;
        }
        export interface IStorageFileStatics {
            getFileFromPathAsync(path: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            getFileFromApplicationUriAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            createStreamedFileAsync(displayNameWithExtension: string, dataRequested: Windows.Storage.StreamedFileDataRequestedHandler, thumbnail: Windows.Storage.Streams.IRandomAccessStreamReference): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            replaceWithStreamedFileAsync(fileToReplace: Windows.Storage.IStorageFile, dataRequested: Windows.Storage.StreamedFileDataRequestedHandler, thumbnail: Windows.Storage.Streams.IRandomAccessStreamReference): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            createStreamedFileFromUriAsync(displayNameWithExtension: string, uri: Windows.Foundation.Uri, thumbnail: Windows.Storage.Streams.IRandomAccessStreamReference): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            replaceWithStreamedFileFromUriAsync(fileToReplace: Windows.Storage.IStorageFile, uri: Windows.Foundation.Uri, thumbnail: Windows.Storage.Streams.IRandomAccessStreamReference): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
        }
        export class StorageStreamTransaction implements Windows.Storage.IStorageStreamTransaction, Windows.Foundation.IClosable {
            stream: Windows.Storage.Streams.IRandomAccessStream;
            commitAsync(): Windows.Foundation.IAsyncAction;
            dispose(): void;
            close(): void;
        }
        export interface IStorageItem {
            attributes: Windows.Storage.FileAttributes;
            dateCreated: Date;
            name: string;
            path: string;
            renameAsync(desiredName: string): Windows.Foundation.IAsyncAction;
            renameAsync(desiredName: string, option: Windows.Storage.NameCollisionOption): Windows.Foundation.IAsyncAction;
            deleteAsync(): Windows.Foundation.IAsyncAction;
            deleteAsync(option: Windows.Storage.StorageDeleteOption): Windows.Foundation.IAsyncAction;
            getBasicPropertiesAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.BasicProperties>;
            isOfType(type: Windows.Storage.StorageItemTypes): boolean;
        }
        export interface IStorageFolder extends Windows.Storage.IStorageItem {
            createFileAsync(desiredName: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            createFileAsync(desiredName: string, options: Windows.Storage.CreationCollisionOption): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            createFolderAsync(desiredName: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
            createFolderAsync(desiredName: string, options: Windows.Storage.CreationCollisionOption): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
            getFileAsync(name: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            getFolderAsync(name: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
            getItemAsync(name: string): Windows.Foundation.IAsyncOperation<Windows.Storage.IStorageItem>;
            getFilesAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>>;
            getFoldersAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFolder>>;
            getItemsAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.IStorageItem>>;
        }
        export interface IStorageFile extends Windows.Storage.IStorageItem, Windows.Storage.Streams.IRandomAccessStreamReference, Windows.Storage.Streams.IInputStreamReference {
            contentType: string;
            fileType: string;
            openAsync(accessMode: Windows.Storage.FileAccessMode): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IRandomAccessStream>;
            openTransactedWriteAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageStreamTransaction>;
            copyAsync(destinationFolder: Windows.Storage.IStorageFolder): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            copyAsync(destinationFolder: Windows.Storage.IStorageFolder, desiredNewName: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            copyAsync(destinationFolder: Windows.Storage.IStorageFolder, desiredNewName: string, option: Windows.Storage.NameCollisionOption): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            copyAndReplaceAsync(fileToReplace: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncAction;
            moveAsync(destinationFolder: Windows.Storage.IStorageFolder): Windows.Foundation.IAsyncAction;
            moveAsync(destinationFolder: Windows.Storage.IStorageFolder, desiredNewName: string): Windows.Foundation.IAsyncAction;
            moveAsync(destinationFolder: Windows.Storage.IStorageFolder, desiredNewName: string, option: Windows.Storage.NameCollisionOption): Windows.Foundation.IAsyncAction;
            moveAndReplaceAsync(fileToReplace: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncAction;
        }
        export interface IStorageFolderStatics {
            getFolderFromPathAsync(path: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
        }
        export interface IStorageItemProperties {
            displayName: string;
            displayType: string;
            folderRelativeId: string;
            properties: Windows.Storage.FileProperties.StorageItemContentProperties;
            getThumbnailAsync(mode: Windows.Storage.FileProperties.ThumbnailMode): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.StorageItemThumbnail>;
            getThumbnailAsync(mode: Windows.Storage.FileProperties.ThumbnailMode, requestedSize: number): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.StorageItemThumbnail>;
            getThumbnailAsync(mode: Windows.Storage.FileProperties.ThumbnailMode, requestedSize: number, options: Windows.Storage.FileProperties.ThumbnailOptions): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.StorageItemThumbnail>;
        }
        export interface IFileIOStatics {
            readTextAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<string>;
            readTextAsync(file: Windows.Storage.IStorageFile, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncOperation<string>;
            writeTextAsync(file: Windows.Storage.IStorageFile, contents: string): Windows.Foundation.IAsyncAction;
            writeTextAsync(file: Windows.Storage.IStorageFile, contents: string, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncAction;
            appendTextAsync(file: Windows.Storage.IStorageFile, contents: string): Windows.Foundation.IAsyncAction;
            appendTextAsync(file: Windows.Storage.IStorageFile, contents: string, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncAction;
            readLinesAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVector<string>>;
            readLinesAsync(file: Windows.Storage.IStorageFile, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVector<string>>;
            writeLinesAsync(file: Windows.Storage.IStorageFile, lines: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncAction;
            writeLinesAsync(file: Windows.Storage.IStorageFile, lines: Windows.Foundation.Collections.IIterable<string>, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncAction;
            appendLinesAsync(file: Windows.Storage.IStorageFile, lines: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncAction;
            appendLinesAsync(file: Windows.Storage.IStorageFile, lines: Windows.Foundation.Collections.IIterable<string>, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncAction;
            readBufferAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IBuffer>;
            writeBufferAsync(file: Windows.Storage.IStorageFile, buffer: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncAction;
            writeBytesAsync(file: Windows.Storage.IStorageFile, buffer: Uint8Array): Windows.Foundation.IAsyncAction;
        }
        export class FileIO {
            static readTextAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<string>;
            static readTextAsync(file: Windows.Storage.IStorageFile, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncOperation<string>;
            static writeTextAsync(file: Windows.Storage.IStorageFile, contents: string): Windows.Foundation.IAsyncAction;
            static writeTextAsync(file: Windows.Storage.IStorageFile, contents: string, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncAction;
            static appendTextAsync(file: Windows.Storage.IStorageFile, contents: string): Windows.Foundation.IAsyncAction;
            static appendTextAsync(file: Windows.Storage.IStorageFile, contents: string, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncAction;
            static readLinesAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVector<string>>;
            static readLinesAsync(file: Windows.Storage.IStorageFile, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVector<string>>;
            static writeLinesAsync(file: Windows.Storage.IStorageFile, lines: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncAction;
            static writeLinesAsync(file: Windows.Storage.IStorageFile, lines: Windows.Foundation.Collections.IIterable<string>, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncAction;
            static appendLinesAsync(file: Windows.Storage.IStorageFile, lines: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncAction;
            static appendLinesAsync(file: Windows.Storage.IStorageFile, lines: Windows.Foundation.Collections.IIterable<string>, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncAction;
            static readBufferAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IBuffer>;
            static writeBufferAsync(file: Windows.Storage.IStorageFile, buffer: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncAction;
            static writeBytesAsync(file: Windows.Storage.IStorageFile, buffer: Uint8Array): Windows.Foundation.IAsyncAction;
        }
        export interface IPathIOStatics {
            readTextAsync(absolutePath: string): Windows.Foundation.IAsyncOperation<string>;
            readTextAsync(absolutePath: string, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncOperation<string>;
            writeTextAsync(absolutePath: string, contents: string): Windows.Foundation.IAsyncAction;
            writeTextAsync(absolutePath: string, contents: string, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncAction;
            appendTextAsync(absolutePath: string, contents: string): Windows.Foundation.IAsyncAction;
            appendTextAsync(absolutePath: string, contents: string, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncAction;
            readLinesAsync(absolutePath: string): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVector<string>>;
            readLinesAsync(absolutePath: string, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVector<string>>;
            writeLinesAsync(absolutePath: string, lines: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncAction;
            writeLinesAsync(absolutePath: string, lines: Windows.Foundation.Collections.IIterable<string>, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncAction;
            appendLinesAsync(absolutePath: string, lines: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncAction;
            appendLinesAsync(absolutePath: string, lines: Windows.Foundation.Collections.IIterable<string>, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncAction;
            readBufferAsync(absolutePath: string): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IBuffer>;
            writeBufferAsync(absolutePath: string, buffer: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncAction;
            writeBytesAsync(absolutePath: string, buffer: Uint8Array): Windows.Foundation.IAsyncAction;
        }
        export class PathIO {
            static readTextAsync(absolutePath: string): Windows.Foundation.IAsyncOperation<string>;
            static readTextAsync(absolutePath: string, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncOperation<string>;
            static writeTextAsync(absolutePath: string, contents: string): Windows.Foundation.IAsyncAction;
            static writeTextAsync(absolutePath: string, contents: string, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncAction;
            static appendTextAsync(absolutePath: string, contents: string): Windows.Foundation.IAsyncAction;
            static appendTextAsync(absolutePath: string, contents: string, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncAction;
            static readLinesAsync(absolutePath: string): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVector<string>>;
            static readLinesAsync(absolutePath: string, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVector<string>>;
            static writeLinesAsync(absolutePath: string, lines: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncAction;
            static writeLinesAsync(absolutePath: string, lines: Windows.Foundation.Collections.IIterable<string>, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncAction;
            static appendLinesAsync(absolutePath: string, lines: Windows.Foundation.Collections.IIterable<string>): Windows.Foundation.IAsyncAction;
            static appendLinesAsync(absolutePath: string, lines: Windows.Foundation.Collections.IIterable<string>, encoding: Windows.Storage.Streams.UnicodeEncoding): Windows.Foundation.IAsyncAction;
            static readBufferAsync(absolutePath: string): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IBuffer>;
            static writeBufferAsync(absolutePath: string, buffer: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncAction;
            static writeBytesAsync(absolutePath: string, buffer: Uint8Array): Windows.Foundation.IAsyncAction;
        }
        export interface ICachedFileManagerStatics {
            deferUpdates(file: Windows.Storage.IStorageFile): void;
            completeUpdatesAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<Windows.Storage.Provider.FileUpdateStatus>;
        }
        export class CachedFileManager {
            static deferUpdates(file: Windows.Storage.IStorageFile): void;
            static completeUpdatesAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<Windows.Storage.Provider.FileUpdateStatus>;
        }
        export interface IStorageStreamTransaction extends Windows.Foundation.IClosable {
            stream: Windows.Storage.Streams.IRandomAccessStream;
            commitAsync(): Windows.Foundation.IAsyncAction;
        }
        export enum ApplicationDataLocality {
            local,
            roaming,
            temporary,
        }
        export enum ApplicationDataCreateDisposition {
            always,
            existing,
        }
        export interface IApplicationDataStatics {
            current: Windows.Storage.ApplicationData;
        }
        export class ApplicationData implements Windows.Storage.IApplicationData {
            localFolder: Windows.Storage.StorageFolder;
            localSettings: Windows.Storage.ApplicationDataContainer;
            roamingFolder: Windows.Storage.StorageFolder;
            roamingSettings: Windows.Storage.ApplicationDataContainer;
            roamingStorageQuota: number;
            temporaryFolder: Windows.Storage.StorageFolder;
            version: number;
            setVersionAsync(desiredVersion: number, handler: Windows.Storage.ApplicationDataSetVersionHandler): Windows.Foundation.IAsyncAction;
            clearAsync(): Windows.Foundation.IAsyncAction;
            clearAsync(locality: Windows.Storage.ApplicationDataLocality): Windows.Foundation.IAsyncAction;
            ondatachanged: any/* TODO */;
            signalDataChanged(): void;
            static current: Windows.Storage.ApplicationData;
        }
        export interface IApplicationData {
            localFolder: Windows.Storage.StorageFolder;
            localSettings: Windows.Storage.ApplicationDataContainer;
            roamingFolder: Windows.Storage.StorageFolder;
            roamingSettings: Windows.Storage.ApplicationDataContainer;
            roamingStorageQuota: number;
            temporaryFolder: Windows.Storage.StorageFolder;
            version: number;
            setVersionAsync(desiredVersion: number, handler: Windows.Storage.ApplicationDataSetVersionHandler): Windows.Foundation.IAsyncAction;
            clearAsync(): Windows.Foundation.IAsyncAction;
            clearAsync(locality: Windows.Storage.ApplicationDataLocality): Windows.Foundation.IAsyncAction;
            ondatachanged: any/* TODO */;
            signalDataChanged(): void;
        }
        export interface ApplicationDataSetVersionHandler {
            (setVersionRequest: Windows.Storage.SetVersionRequest): void;
        }
        export class SetVersionRequest implements Windows.Storage.ISetVersionRequest {
            currentVersion: number;
            desiredVersion: number;
            getDeferral(): Windows.Storage.SetVersionDeferral;
        }
        export class ApplicationDataContainer implements Windows.Storage.IApplicationDataContainer {
            containers: Windows.Foundation.Collections.IMapView<string, Windows.Storage.ApplicationDataContainer>;
            locality: Windows.Storage.ApplicationDataLocality;
            name: string;
            values: Windows.Foundation.Collections.IPropertySet;
            createContainer(name: string, disposition: Windows.Storage.ApplicationDataCreateDisposition): Windows.Storage.ApplicationDataContainer;
            deleteContainer(name: string): void;
        }
        export interface ISetVersionRequest {
            currentVersion: number;
            desiredVersion: number;
            getDeferral(): Windows.Storage.SetVersionDeferral;
        }
        export class SetVersionDeferral implements Windows.Storage.ISetVersionDeferral {
            complete(): void;
        }
        export interface ISetVersionDeferral {
            complete(): void;
        }
        export interface IApplicationDataContainer {
            containers: Windows.Foundation.Collections.IMapView<string, Windows.Storage.ApplicationDataContainer>;
            locality: Windows.Storage.ApplicationDataLocality;
            name: string;
            values: Windows.Foundation.Collections.IPropertySet;
            createContainer(name: string, disposition: Windows.Storage.ApplicationDataCreateDisposition): Windows.Storage.ApplicationDataContainer;
            deleteContainer(name: string): void;
        }
        export class ApplicationDataContainerSettings implements Windows.Foundation.Collections.IPropertySet, Windows.Foundation.Collections.IObservableMap<string, any>, Windows.Foundation.Collections.IMap<string, any>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, any>> {
            size: number;
            onmapchanged: any/* TODO */;
            lookup(key: string): any;
            hasKey(key: string): boolean;
            getView(): Windows.Foundation.Collections.IMapView<string, any>;
            insert(key: string, value: any): boolean;
            remove(key: string): void;
            clear(): void;
            first(): Windows.Foundation.Collections.IIterator<Windows.Foundation.Collections.IKeyValuePair<string, any>>;
        }
        export class ApplicationDataCompositeValue implements Windows.Foundation.Collections.IPropertySet, Windows.Foundation.Collections.IObservableMap<string, any>, Windows.Foundation.Collections.IMap<string, any>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, any>> {
            size: number;
            onmapchanged: any/* TODO */;
            lookup(key: string): any;
            hasKey(key: string): boolean;
            getView(): Windows.Foundation.Collections.IMapView<string, any>;
            insert(key: string, value: any): boolean;
            remove(key: string): void;
            clear(): void;
            first(): Windows.Foundation.Collections.IIterator<Windows.Foundation.Collections.IKeyValuePair<string, any>>;
        }
    }
}
declare module Windows {
    export module Storage {
        export module Search {
            export interface SortEntry {
                propertyName: string;
                ascendingOrder: boolean;
            }
            export enum DateStackOption {
                none,
                year,
                month,
            }
            export enum IndexerOption {
                useIndexerWhenAvailable,
                onlyUseIndexer,
                doNotUseIndexer,
            }
            export enum FolderDepth {
                shallow,
                deep,
            }
            export enum CommonFileQuery {
                defaultQuery,
                orderByName,
                orderByTitle,
                orderByMusicProperties,
                orderBySearchRank,
                orderByDate,
            }
            export enum CommonFolderQuery {
                defaultQuery,
                groupByYear,
                groupByMonth,
                groupByArtist,
                groupByAlbum,
                groupByAlbumArtist,
                groupByComposer,
                groupByGenre,
                groupByPublishedYear,
                groupByRating,
                groupByTag,
                groupByAuthor,
                groupByType,
            }
            export enum IndexedState {
                unknown,
                notIndexed,
                partiallyIndexed,
                fullyIndexed,
            }
            export interface IQueryOptions {
                applicationSearchFilter: string;
                dateStackOption: Windows.Storage.Search.DateStackOption;
                fileTypeFilter: Windows.Foundation.Collections.IVector<string>;
                folderDepth: Windows.Storage.Search.FolderDepth;
                groupPropertyName: string;
                indexerOption: Windows.Storage.Search.IndexerOption;
                language: string;
                sortOrder: Windows.Foundation.Collections.IVector<Windows.Storage.Search.SortEntry>;
                userSearchFilter: string;
                saveToString(): string;
                loadFromString(value: string): void;
                setThumbnailPrefetch(mode: Windows.Storage.FileProperties.ThumbnailMode, requestedSize: number, options: Windows.Storage.FileProperties.ThumbnailOptions): void;
                setPropertyPrefetch(options: Windows.Storage.FileProperties.PropertyPrefetchOptions, propertiesToRetrieve: Windows.Foundation.Collections.IIterable<string>): void;
            }
            export interface IQueryOptionsFactory {
                createCommonFileQuery(query: Windows.Storage.Search.CommonFileQuery, fileTypeFilter: Windows.Foundation.Collections.IIterable<string>): Windows.Storage.Search.QueryOptions;
                createCommonFolderQuery(query: Windows.Storage.Search.CommonFolderQuery): Windows.Storage.Search.QueryOptions;
            }
            export class QueryOptions implements Windows.Storage.Search.IQueryOptions {
                constructor(query: Windows.Storage.Search.CommonFileQuery, fileTypeFilter: Windows.Foundation.Collections.IIterable<string>);
                constructor(query: Windows.Storage.Search.CommonFolderQuery);
                constructor();
                applicationSearchFilter: string;
                dateStackOption: Windows.Storage.Search.DateStackOption;
                fileTypeFilter: Windows.Foundation.Collections.IVector<string>;
                folderDepth: Windows.Storage.Search.FolderDepth;
                groupPropertyName: string;
                indexerOption: Windows.Storage.Search.IndexerOption;
                language: string;
                sortOrder: Windows.Foundation.Collections.IVector<Windows.Storage.Search.SortEntry>;
                userSearchFilter: string;
                saveToString(): string;
                loadFromString(value: string): void;
                setThumbnailPrefetch(mode: Windows.Storage.FileProperties.ThumbnailMode, requestedSize: number, options: Windows.Storage.FileProperties.ThumbnailOptions): void;
                setPropertyPrefetch(options: Windows.Storage.FileProperties.PropertyPrefetchOptions, propertiesToRetrieve: Windows.Foundation.Collections.IIterable<string>): void;
            }
            export interface IStorageQueryResultBase {
                folder: Windows.Storage.StorageFolder;
                getItemCountAsync(): Windows.Foundation.IAsyncOperation<number>;
                oncontentschanged: any/* TODO */;
                onoptionschanged: any/* TODO */;
                findStartIndexAsync(value: any): Windows.Foundation.IAsyncOperation<number>;
                getCurrentQueryOptions(): Windows.Storage.Search.QueryOptions;
                applyNewQueryOptions(newQueryOptions: Windows.Storage.Search.QueryOptions): void;
            }
            export interface IStorageFileQueryResult extends Windows.Storage.Search.IStorageQueryResultBase {
                getFilesAsync(startIndex: number, maxNumberOfItems: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>>;
                getFilesAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>>;
            }
            export interface IStorageFolderQueryResult extends Windows.Storage.Search.IStorageQueryResultBase {
                getFoldersAsync(startIndex: number, maxNumberOfItems: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFolder>>;
                getFoldersAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFolder>>;
            }
            export interface IStorageItemQueryResult extends Windows.Storage.Search.IStorageQueryResultBase {
                getItemsAsync(startIndex: number, maxNumberOfItems: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.IStorageItem>>;
                getItemsAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.IStorageItem>>;
            }
            export interface IStorageFolderQueryOperations {
                getIndexedStateAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.Search.IndexedState>;
                createFileQuery(): Windows.Storage.Search.StorageFileQueryResult;
                createFileQuery(query: Windows.Storage.Search.CommonFileQuery): Windows.Storage.Search.StorageFileQueryResult;
                createFileQueryWithOptions(queryOptions: Windows.Storage.Search.QueryOptions): Windows.Storage.Search.StorageFileQueryResult;
                createFolderQuery(): Windows.Storage.Search.StorageFolderQueryResult;
                createFolderQuery(query: Windows.Storage.Search.CommonFolderQuery): Windows.Storage.Search.StorageFolderQueryResult;
                createFolderQueryWithOptions(queryOptions: Windows.Storage.Search.QueryOptions): Windows.Storage.Search.StorageFolderQueryResult;
                createItemQuery(): Windows.Storage.Search.StorageItemQueryResult;
                createItemQueryWithOptions(queryOptions: Windows.Storage.Search.QueryOptions): Windows.Storage.Search.StorageItemQueryResult;
                getFilesAsync(query: Windows.Storage.Search.CommonFileQuery, startIndex: number, maxItemsToRetrieve: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>>;
                getFilesAsync(query: Windows.Storage.Search.CommonFileQuery): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>>;
                getFoldersAsync(query: Windows.Storage.Search.CommonFolderQuery, startIndex: number, maxItemsToRetrieve: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFolder>>;
                getFoldersAsync(query: Windows.Storage.Search.CommonFolderQuery): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFolder>>;
                getItemsAsync(startIndex: number, maxItemsToRetrieve: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.IStorageItem>>;
                areQueryOptionsSupported(queryOptions: Windows.Storage.Search.QueryOptions): boolean;
                isCommonFolderQuerySupported(query: Windows.Storage.Search.CommonFolderQuery): boolean;
                isCommonFileQuerySupported(query: Windows.Storage.Search.CommonFileQuery): boolean;
            }
            export class StorageFileQueryResult implements Windows.Storage.Search.IStorageFileQueryResult, Windows.Storage.Search.IStorageQueryResultBase {
                folder: Windows.Storage.StorageFolder;
                getFilesAsync(startIndex: number, maxNumberOfItems: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>>;
                getFilesAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>>;
                getItemCountAsync(): Windows.Foundation.IAsyncOperation<number>;
                oncontentschanged: any/* TODO */;
                onoptionschanged: any/* TODO */;
                findStartIndexAsync(value: any): Windows.Foundation.IAsyncOperation<number>;
                getCurrentQueryOptions(): Windows.Storage.Search.QueryOptions;
                applyNewQueryOptions(newQueryOptions: Windows.Storage.Search.QueryOptions): void;
            }
            export class StorageFolderQueryResult implements Windows.Storage.Search.IStorageFolderQueryResult, Windows.Storage.Search.IStorageQueryResultBase {
                folder: Windows.Storage.StorageFolder;
                getFoldersAsync(startIndex: number, maxNumberOfItems: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFolder>>;
                getFoldersAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFolder>>;
                getItemCountAsync(): Windows.Foundation.IAsyncOperation<number>;
                oncontentschanged: any/* TODO */;
                onoptionschanged: any/* TODO */;
                findStartIndexAsync(value: any): Windows.Foundation.IAsyncOperation<number>;
                getCurrentQueryOptions(): Windows.Storage.Search.QueryOptions;
                applyNewQueryOptions(newQueryOptions: Windows.Storage.Search.QueryOptions): void;
            }
            export class StorageItemQueryResult implements Windows.Storage.Search.IStorageItemQueryResult, Windows.Storage.Search.IStorageQueryResultBase {
                folder: Windows.Storage.StorageFolder;
                getItemsAsync(startIndex: number, maxNumberOfItems: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.IStorageItem>>;
                getItemsAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.IStorageItem>>;
                getItemCountAsync(): Windows.Foundation.IAsyncOperation<number>;
                oncontentschanged: any/* TODO */;
                onoptionschanged: any/* TODO */;
                findStartIndexAsync(value: any): Windows.Foundation.IAsyncOperation<number>;
                getCurrentQueryOptions(): Windows.Storage.Search.QueryOptions;
                applyNewQueryOptions(newQueryOptions: Windows.Storage.Search.QueryOptions): void;
            }
            export class SortEntryVector implements Windows.Foundation.Collections.IVector<Windows.Storage.Search.SortEntry>, Windows.Foundation.Collections.IIterable<Windows.Storage.Search.SortEntry> {
                size: number;
                getAt(index: number): Windows.Storage.Search.SortEntry;
                getView(): Windows.Foundation.Collections.IVectorView<Windows.Storage.Search.SortEntry>;
                indexOf(value: Windows.Storage.Search.SortEntry): { index: number; returnValue: boolean; };
                setAt(index: number, value: Windows.Storage.Search.SortEntry): void;
                insertAt(index: number, value: Windows.Storage.Search.SortEntry): void;
                removeAt(index: number): void;
                append(value: Windows.Storage.Search.SortEntry): void;
                removeAtEnd(): void;
                clear(): void;
                getMany(startIndex: number): { items: Windows.Storage.Search.SortEntry[]; returnValue: number; };
                replaceAll(items: Windows.Storage.Search.SortEntry[]): void;
                first(): Windows.Foundation.Collections.IIterator<Windows.Storage.Search.SortEntry>;
                toString(): string;
                toLocaleString(): string;
                concat(...items: Windows.Storage.Search.SortEntry[][]): Windows.Storage.Search.SortEntry[];
                join(seperator: string): string;
                pop(): Windows.Storage.Search.SortEntry;
                push(...items: Windows.Storage.Search.SortEntry[]): void;
                reverse(): Windows.Storage.Search.SortEntry[];
                shift(): Windows.Storage.Search.SortEntry;
                slice(start: number): Windows.Storage.Search.SortEntry[];
                slice(start: number, end: number): Windows.Storage.Search.SortEntry[];
                sort(): Windows.Storage.Search.SortEntry[];
                sort(compareFn: (a: Windows.Storage.Search.SortEntry, b: Windows.Storage.Search.SortEntry) => number): Windows.Storage.Search.SortEntry[];
                splice(start: number): Windows.Storage.Search.SortEntry[];
                splice(start: number, deleteCount: number, ...items: Windows.Storage.Search.SortEntry[]): Windows.Storage.Search.SortEntry[];
                unshift(...items: Windows.Storage.Search.SortEntry[]): number;
                lastIndexOf(searchElement: Windows.Storage.Search.SortEntry): number;
                lastIndexOf(searchElement: Windows.Storage.Search.SortEntry, fromIndex: number): number;
                every(callbackfn: (value: Windows.Storage.Search.SortEntry, index: number, array: Windows.Storage.Search.SortEntry[]) => boolean): boolean;
                every(callbackfn: (value: Windows.Storage.Search.SortEntry, index: number, array: Windows.Storage.Search.SortEntry[]) => boolean, thisArg: any): boolean;
                some(callbackfn: (value: Windows.Storage.Search.SortEntry, index: number, array: Windows.Storage.Search.SortEntry[]) => boolean): boolean;
                some(callbackfn: (value: Windows.Storage.Search.SortEntry, index: number, array: Windows.Storage.Search.SortEntry[]) => boolean, thisArg: any): boolean;
                forEach(callbackfn: (value: Windows.Storage.Search.SortEntry, index: number, array: Windows.Storage.Search.SortEntry[]) => void ): void;
                forEach(callbackfn: (value: Windows.Storage.Search.SortEntry, index: number, array: Windows.Storage.Search.SortEntry[]) => void , thisArg: any): void;
                map(callbackfn: (value: Windows.Storage.Search.SortEntry, index: number, array: Windows.Storage.Search.SortEntry[]) => any): any[];
                map(callbackfn: (value: Windows.Storage.Search.SortEntry, index: number, array: Windows.Storage.Search.SortEntry[]) => any, thisArg: any): any[];
                filter(callbackfn: (value: Windows.Storage.Search.SortEntry, index: number, array: Windows.Storage.Search.SortEntry[]) => boolean): Windows.Storage.Search.SortEntry[];
                filter(callbackfn: (value: Windows.Storage.Search.SortEntry, index: number, array: Windows.Storage.Search.SortEntry[]) => boolean, thisArg: any): Windows.Storage.Search.SortEntry[];
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Storage.Search.SortEntry[]) => any): any;
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Storage.Search.SortEntry[]) => any, initialValue: any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Storage.Search.SortEntry[]) => any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Storage.Search.SortEntry[]) => any, initialValue: any): any;
                length: number;
            }
        }
    }
}
declare module Windows {
    export module Storage {
        export module AccessCache {
            export interface AccessListEntry {
                token: string;
                metadata: string;
            }
            export interface IItemRemovedEventArgs {
                removedEntry: Windows.Storage.AccessCache.AccessListEntry;
            }
            export class AccessListEntryView implements Windows.Foundation.Collections.IVectorView<Windows.Storage.AccessCache.AccessListEntry>, Windows.Foundation.Collections.IIterable<Windows.Storage.AccessCache.AccessListEntry> {
                size: number;
                getAt(index: number): Windows.Storage.AccessCache.AccessListEntry;
                indexOf(value: Windows.Storage.AccessCache.AccessListEntry): { index: number; returnValue: boolean; };
                getMany(startIndex: number): { items: Windows.Storage.AccessCache.AccessListEntry[]; returnValue: number; };
                first(): Windows.Foundation.Collections.IIterator<Windows.Storage.AccessCache.AccessListEntry>;
                toString(): string;
                toLocaleString(): string;
                concat(...items: Windows.Storage.AccessCache.AccessListEntry[][]): Windows.Storage.AccessCache.AccessListEntry[];
                join(seperator: string): string;
                pop(): Windows.Storage.AccessCache.AccessListEntry;
                push(...items: Windows.Storage.AccessCache.AccessListEntry[]): void;
                reverse(): Windows.Storage.AccessCache.AccessListEntry[];
                shift(): Windows.Storage.AccessCache.AccessListEntry;
                slice(start: number): Windows.Storage.AccessCache.AccessListEntry[];
                slice(start: number, end: number): Windows.Storage.AccessCache.AccessListEntry[];
                sort(): Windows.Storage.AccessCache.AccessListEntry[];
                sort(compareFn: (a: Windows.Storage.AccessCache.AccessListEntry, b: Windows.Storage.AccessCache.AccessListEntry) => number): Windows.Storage.AccessCache.AccessListEntry[];
                splice(start: number): Windows.Storage.AccessCache.AccessListEntry[];
                splice(start: number, deleteCount: number, ...items: Windows.Storage.AccessCache.AccessListEntry[]): Windows.Storage.AccessCache.AccessListEntry[];
                unshift(...items: Windows.Storage.AccessCache.AccessListEntry[]): number;
                lastIndexOf(searchElement: Windows.Storage.AccessCache.AccessListEntry): number;
                lastIndexOf(searchElement: Windows.Storage.AccessCache.AccessListEntry, fromIndex: number): number;
                every(callbackfn: (value: Windows.Storage.AccessCache.AccessListEntry, index: number, array: Windows.Storage.AccessCache.AccessListEntry[]) => boolean): boolean;
                every(callbackfn: (value: Windows.Storage.AccessCache.AccessListEntry, index: number, array: Windows.Storage.AccessCache.AccessListEntry[]) => boolean, thisArg: any): boolean;
                some(callbackfn: (value: Windows.Storage.AccessCache.AccessListEntry, index: number, array: Windows.Storage.AccessCache.AccessListEntry[]) => boolean): boolean;
                some(callbackfn: (value: Windows.Storage.AccessCache.AccessListEntry, index: number, array: Windows.Storage.AccessCache.AccessListEntry[]) => boolean, thisArg: any): boolean;
                forEach(callbackfn: (value: Windows.Storage.AccessCache.AccessListEntry, index: number, array: Windows.Storage.AccessCache.AccessListEntry[]) => void ): void;
                forEach(callbackfn: (value: Windows.Storage.AccessCache.AccessListEntry, index: number, array: Windows.Storage.AccessCache.AccessListEntry[]) => void , thisArg: any): void;
                map(callbackfn: (value: Windows.Storage.AccessCache.AccessListEntry, index: number, array: Windows.Storage.AccessCache.AccessListEntry[]) => any): any[];
                map(callbackfn: (value: Windows.Storage.AccessCache.AccessListEntry, index: number, array: Windows.Storage.AccessCache.AccessListEntry[]) => any, thisArg: any): any[];
                filter(callbackfn: (value: Windows.Storage.AccessCache.AccessListEntry, index: number, array: Windows.Storage.AccessCache.AccessListEntry[]) => boolean): Windows.Storage.AccessCache.AccessListEntry[];
                filter(callbackfn: (value: Windows.Storage.AccessCache.AccessListEntry, index: number, array: Windows.Storage.AccessCache.AccessListEntry[]) => boolean, thisArg: any): Windows.Storage.AccessCache.AccessListEntry[];
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Storage.AccessCache.AccessListEntry[]) => any): any;
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Storage.AccessCache.AccessListEntry[]) => any, initialValue: any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Storage.AccessCache.AccessListEntry[]) => any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Storage.AccessCache.AccessListEntry[]) => any, initialValue: any): any;
                length: number;
            }
            export enum AccessCacheOptions {
                none,
                disallowUserInput,
                fastLocationsOnly,
                useReadOnlyCachedCopy,
                suppressAccessTimeUpdate,
            }
            export interface IStorageItemAccessList {
                entries: Windows.Storage.AccessCache.AccessListEntryView;
                maximumItemsAllowed: number;
                add(file: Windows.Storage.IStorageItem): string;
                add(file: Windows.Storage.IStorageItem, metadata: string): string;
                addOrReplace(token: string, file: Windows.Storage.IStorageItem): void;
                addOrReplace(token: string, file: Windows.Storage.IStorageItem, metadata: string): void;
                getItemAsync(token: string): Windows.Foundation.IAsyncOperation<Windows.Storage.IStorageItem>;
                getFileAsync(token: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                getFolderAsync(token: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
                getItemAsync(token: string, options: Windows.Storage.AccessCache.AccessCacheOptions): Windows.Foundation.IAsyncOperation<Windows.Storage.IStorageItem>;
                getFileAsync(token: string, options: Windows.Storage.AccessCache.AccessCacheOptions): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                getFolderAsync(token: string, options: Windows.Storage.AccessCache.AccessCacheOptions): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
                remove(token: string): void;
                containsItem(token: string): boolean;
                clear(): void;
                checkAccess(file: Windows.Storage.IStorageItem): boolean;
            }
            export interface IStorageItemMostRecentlyUsedList extends Windows.Storage.AccessCache.IStorageItemAccessList {
                onitemremoved: any/* TODO */;
            }
            export class StorageItemMostRecentlyUsedList implements Windows.Storage.AccessCache.IStorageItemMostRecentlyUsedList, Windows.Storage.AccessCache.IStorageItemAccessList {
                entries: Windows.Storage.AccessCache.AccessListEntryView;
                maximumItemsAllowed: number;
                onitemremoved: any/* TODO */;
                add(file: Windows.Storage.IStorageItem): string;
                add(file: Windows.Storage.IStorageItem, metadata: string): string;
                addOrReplace(token: string, file: Windows.Storage.IStorageItem): void;
                addOrReplace(token: string, file: Windows.Storage.IStorageItem, metadata: string): void;
                getItemAsync(token: string): Windows.Foundation.IAsyncOperation<Windows.Storage.IStorageItem>;
                getFileAsync(token: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                getFolderAsync(token: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
                getItemAsync(token: string, options: Windows.Storage.AccessCache.AccessCacheOptions): Windows.Foundation.IAsyncOperation<Windows.Storage.IStorageItem>;
                getFileAsync(token: string, options: Windows.Storage.AccessCache.AccessCacheOptions): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                getFolderAsync(token: string, options: Windows.Storage.AccessCache.AccessCacheOptions): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
                remove(token: string): void;
                containsItem(token: string): boolean;
                clear(): void;
                checkAccess(file: Windows.Storage.IStorageItem): boolean;
            }
            export class ItemRemovedEventArgs implements Windows.Storage.AccessCache.IItemRemovedEventArgs {
                removedEntry: Windows.Storage.AccessCache.AccessListEntry;
            }
            export interface IStorageApplicationPermissionsStatics {
                futureAccessList: Windows.Storage.AccessCache.StorageItemAccessList;
                mostRecentlyUsedList: Windows.Storage.AccessCache.StorageItemMostRecentlyUsedList;
            }
            export class StorageItemAccessList implements Windows.Storage.AccessCache.IStorageItemAccessList {
                entries: Windows.Storage.AccessCache.AccessListEntryView;
                maximumItemsAllowed: number;
                add(file: Windows.Storage.IStorageItem): string;
                add(file: Windows.Storage.IStorageItem, metadata: string): string;
                addOrReplace(token: string, file: Windows.Storage.IStorageItem): void;
                addOrReplace(token: string, file: Windows.Storage.IStorageItem, metadata: string): void;
                getItemAsync(token: string): Windows.Foundation.IAsyncOperation<Windows.Storage.IStorageItem>;
                getFileAsync(token: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                getFolderAsync(token: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
                getItemAsync(token: string, options: Windows.Storage.AccessCache.AccessCacheOptions): Windows.Foundation.IAsyncOperation<Windows.Storage.IStorageItem>;
                getFileAsync(token: string, options: Windows.Storage.AccessCache.AccessCacheOptions): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                getFolderAsync(token: string, options: Windows.Storage.AccessCache.AccessCacheOptions): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
                remove(token: string): void;
                containsItem(token: string): boolean;
                clear(): void;
                checkAccess(file: Windows.Storage.IStorageItem): boolean;
            }
            export class StorageApplicationPermissions {
                static futureAccessList: Windows.Storage.AccessCache.StorageItemAccessList;
                static mostRecentlyUsedList: Windows.Storage.AccessCache.StorageItemMostRecentlyUsedList;
            }
        }
    }
}
declare module Windows {
    export module Storage {
        export module BulkAccess {
            export interface IStorageItemInformation {
                basicProperties: Windows.Storage.FileProperties.BasicProperties;
                documentProperties: Windows.Storage.FileProperties.DocumentProperties;
                imageProperties: Windows.Storage.FileProperties.ImageProperties;
                musicProperties: Windows.Storage.FileProperties.MusicProperties;
                thumbnail: Windows.Storage.FileProperties.StorageItemThumbnail;
                videoProperties: Windows.Storage.FileProperties.VideoProperties;
                onthumbnailupdated: any/* TODO */;
                onpropertiesupdated: any/* TODO */;
            }
            export interface IFileInformationFactoryFactory {
                createWithMode(queryResult: Windows.Storage.Search.IStorageQueryResultBase, mode: Windows.Storage.FileProperties.ThumbnailMode): Windows.Storage.BulkAccess.FileInformationFactory;
                createWithModeAndSize(queryResult: Windows.Storage.Search.IStorageQueryResultBase, mode: Windows.Storage.FileProperties.ThumbnailMode, requestedThumbnailSize: number): Windows.Storage.BulkAccess.FileInformationFactory;
                createWithModeAndSizeAndOptions(queryResult: Windows.Storage.Search.IStorageQueryResultBase, mode: Windows.Storage.FileProperties.ThumbnailMode, requestedThumbnailSize: number, thumbnailOptions: Windows.Storage.FileProperties.ThumbnailOptions): Windows.Storage.BulkAccess.FileInformationFactory;
                createWithModeAndSizeAndOptionsAndFlags(queryResult: Windows.Storage.Search.IStorageQueryResultBase, mode: Windows.Storage.FileProperties.ThumbnailMode, requestedThumbnailSize: number, thumbnailOptions: Windows.Storage.FileProperties.ThumbnailOptions, delayLoad: boolean): Windows.Storage.BulkAccess.FileInformationFactory;
            }
            export class FileInformationFactory implements Windows.Storage.BulkAccess.IFileInformationFactory {
                constructor(queryResult: Windows.Storage.Search.IStorageQueryResultBase, mode: Windows.Storage.FileProperties.ThumbnailMode);
                constructor(queryResult: Windows.Storage.Search.IStorageQueryResultBase, mode: Windows.Storage.FileProperties.ThumbnailMode, requestedThumbnailSize: number);
                constructor(queryResult: Windows.Storage.Search.IStorageQueryResultBase, mode: Windows.Storage.FileProperties.ThumbnailMode, requestedThumbnailSize: number, thumbnailOptions: Windows.Storage.FileProperties.ThumbnailOptions);
                constructor(queryResult: Windows.Storage.Search.IStorageQueryResultBase, mode: Windows.Storage.FileProperties.ThumbnailMode, requestedThumbnailSize: number, thumbnailOptions: Windows.Storage.FileProperties.ThumbnailOptions, delayLoad: boolean);
                getItemsAsync(startIndex: number, maxItemsToRetrieve: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.BulkAccess.IStorageItemInformation>>;
                getItemsAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.BulkAccess.IStorageItemInformation>>;
                getFilesAsync(startIndex: number, maxItemsToRetrieve: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.BulkAccess.FileInformation>>;
                getFilesAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.BulkAccess.FileInformation>>;
                getFoldersAsync(startIndex: number, maxItemsToRetrieve: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.BulkAccess.FolderInformation>>;
                getFoldersAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.BulkAccess.FolderInformation>>;
                getVirtualizedItemsVector(): any;
                getVirtualizedFilesVector(): any;
                getVirtualizedFoldersVector(): any;
            }
            export interface IFileInformationFactory {
                getItemsAsync(startIndex: number, maxItemsToRetrieve: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.BulkAccess.IStorageItemInformation>>;
                getItemsAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.BulkAccess.IStorageItemInformation>>;
                getFilesAsync(startIndex: number, maxItemsToRetrieve: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.BulkAccess.FileInformation>>;
                getFilesAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.BulkAccess.FileInformation>>;
                getFoldersAsync(startIndex: number, maxItemsToRetrieve: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.BulkAccess.FolderInformation>>;
                getFoldersAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.BulkAccess.FolderInformation>>;
                getVirtualizedItemsVector(): any;
                getVirtualizedFilesVector(): any;
                getVirtualizedFoldersVector(): any;
            }
            export class FileInformation implements Windows.Storage.BulkAccess.IStorageItemInformation, Windows.Storage.IStorageFile, Windows.Storage.IStorageItem, Windows.Storage.Streams.IRandomAccessStreamReference, Windows.Storage.Streams.IInputStreamReference, Windows.Storage.IStorageItemProperties {
                basicProperties: Windows.Storage.FileProperties.BasicProperties;
                documentProperties: Windows.Storage.FileProperties.DocumentProperties;
                imageProperties: Windows.Storage.FileProperties.ImageProperties;
                musicProperties: Windows.Storage.FileProperties.MusicProperties;
                thumbnail: Windows.Storage.FileProperties.StorageItemThumbnail;
                videoProperties: Windows.Storage.FileProperties.VideoProperties;
                contentType: string;
                fileType: string;
                attributes: Windows.Storage.FileAttributes;
                dateCreated: Date;
                name: string;
                path: string;
                displayName: string;
                displayType: string;
                folderRelativeId: string;
                properties: Windows.Storage.FileProperties.StorageItemContentProperties;
                onthumbnailupdated: any/* TODO */;
                onpropertiesupdated: any/* TODO */;
                openAsync(accessMode: Windows.Storage.FileAccessMode): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IRandomAccessStream>;
                openTransactedWriteAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageStreamTransaction>;
                copyAsync(destinationFolder: Windows.Storage.IStorageFolder): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                copyAsync(destinationFolder: Windows.Storage.IStorageFolder, desiredNewName: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                copyAsync(destinationFolder: Windows.Storage.IStorageFolder, desiredNewName: string, option: Windows.Storage.NameCollisionOption): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                copyAndReplaceAsync(fileToReplace: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncAction;
                moveAsync(destinationFolder: Windows.Storage.IStorageFolder): Windows.Foundation.IAsyncAction;
                moveAsync(destinationFolder: Windows.Storage.IStorageFolder, desiredNewName: string): Windows.Foundation.IAsyncAction;
                moveAsync(destinationFolder: Windows.Storage.IStorageFolder, desiredNewName: string, option: Windows.Storage.NameCollisionOption): Windows.Foundation.IAsyncAction;
                moveAndReplaceAsync(fileToReplace: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncAction;
                renameAsync(desiredName: string): Windows.Foundation.IAsyncAction;
                renameAsync(desiredName: string, option: Windows.Storage.NameCollisionOption): Windows.Foundation.IAsyncAction;
                deleteAsync(): Windows.Foundation.IAsyncAction;
                deleteAsync(option: Windows.Storage.StorageDeleteOption): Windows.Foundation.IAsyncAction;
                getBasicPropertiesAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.BasicProperties>;
                isOfType(type: Windows.Storage.StorageItemTypes): boolean;
                openReadAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IRandomAccessStreamWithContentType>;
                openSequentialReadAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.Streams.IInputStream>;
                getThumbnailAsync(mode: Windows.Storage.FileProperties.ThumbnailMode): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.StorageItemThumbnail>;
                getThumbnailAsync(mode: Windows.Storage.FileProperties.ThumbnailMode, requestedSize: number): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.StorageItemThumbnail>;
                getThumbnailAsync(mode: Windows.Storage.FileProperties.ThumbnailMode, requestedSize: number, options: Windows.Storage.FileProperties.ThumbnailOptions): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.StorageItemThumbnail>;
            }
            export class FolderInformation implements Windows.Storage.BulkAccess.IStorageItemInformation, Windows.Storage.IStorageFolder, Windows.Storage.IStorageItem, Windows.Storage.IStorageItemProperties, Windows.Storage.Search.IStorageFolderQueryOperations {
                basicProperties: Windows.Storage.FileProperties.BasicProperties;
                documentProperties: Windows.Storage.FileProperties.DocumentProperties;
                imageProperties: Windows.Storage.FileProperties.ImageProperties;
                musicProperties: Windows.Storage.FileProperties.MusicProperties;
                thumbnail: Windows.Storage.FileProperties.StorageItemThumbnail;
                videoProperties: Windows.Storage.FileProperties.VideoProperties;
                attributes: Windows.Storage.FileAttributes;
                dateCreated: Date;
                name: string;
                path: string;
                displayName: string;
                displayType: string;
                folderRelativeId: string;
                properties: Windows.Storage.FileProperties.StorageItemContentProperties;
                onthumbnailupdated: any/* TODO */;
                onpropertiesupdated: any/* TODO */;
                createFileAsync(desiredName: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                createFileAsync(desiredName: string, options: Windows.Storage.CreationCollisionOption): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                createFolderAsync(desiredName: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
                createFolderAsync(desiredName: string, options: Windows.Storage.CreationCollisionOption): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
                getFileAsync(name: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                getFolderAsync(name: string): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
                getItemAsync(name: string): Windows.Foundation.IAsyncOperation<Windows.Storage.IStorageItem>;
                getFilesAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>>;
                getFoldersAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFolder>>;
                getItemsAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.IStorageItem>>;
                renameAsync(desiredName: string): Windows.Foundation.IAsyncAction;
                renameAsync(desiredName: string, option: Windows.Storage.NameCollisionOption): Windows.Foundation.IAsyncAction;
                deleteAsync(): Windows.Foundation.IAsyncAction;
                deleteAsync(option: Windows.Storage.StorageDeleteOption): Windows.Foundation.IAsyncAction;
                getBasicPropertiesAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.BasicProperties>;
                isOfType(type: Windows.Storage.StorageItemTypes): boolean;
                getThumbnailAsync(mode: Windows.Storage.FileProperties.ThumbnailMode): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.StorageItemThumbnail>;
                getThumbnailAsync(mode: Windows.Storage.FileProperties.ThumbnailMode, requestedSize: number): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.StorageItemThumbnail>;
                getThumbnailAsync(mode: Windows.Storage.FileProperties.ThumbnailMode, requestedSize: number, options: Windows.Storage.FileProperties.ThumbnailOptions): Windows.Foundation.IAsyncOperation<Windows.Storage.FileProperties.StorageItemThumbnail>;
                getIndexedStateAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.Search.IndexedState>;
                createFileQuery(): Windows.Storage.Search.StorageFileQueryResult;
                createFileQuery(query: Windows.Storage.Search.CommonFileQuery): Windows.Storage.Search.StorageFileQueryResult;
                createFileQueryWithOptions(queryOptions: Windows.Storage.Search.QueryOptions): Windows.Storage.Search.StorageFileQueryResult;
                createFolderQuery(): Windows.Storage.Search.StorageFolderQueryResult;
                createFolderQuery(query: Windows.Storage.Search.CommonFolderQuery): Windows.Storage.Search.StorageFolderQueryResult;
                createFolderQueryWithOptions(queryOptions: Windows.Storage.Search.QueryOptions): Windows.Storage.Search.StorageFolderQueryResult;
                createItemQuery(): Windows.Storage.Search.StorageItemQueryResult;
                createItemQueryWithOptions(queryOptions: Windows.Storage.Search.QueryOptions): Windows.Storage.Search.StorageItemQueryResult;
                getFilesAsync(query: Windows.Storage.Search.CommonFileQuery, startIndex: number, maxItemsToRetrieve: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>>;
                getFilesAsync(query: Windows.Storage.Search.CommonFileQuery): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>>;
                getFoldersAsync(query: Windows.Storage.Search.CommonFolderQuery, startIndex: number, maxItemsToRetrieve: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFolder>>;
                getFoldersAsync(query: Windows.Storage.Search.CommonFolderQuery): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFolder>>;
                getItemsAsync(startIndex: number, maxItemsToRetrieve: number): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.IStorageItem>>;
                areQueryOptionsSupported(queryOptions: Windows.Storage.Search.QueryOptions): boolean;
                isCommonFolderQuerySupported(query: Windows.Storage.Search.CommonFolderQuery): boolean;
                isCommonFileQuerySupported(query: Windows.Storage.Search.CommonFileQuery): boolean;
            }
        }
    }
}
declare module Windows {
    export module Storage {
        export module Pickers {
            export enum PickerViewMode {
                list,
                thumbnail,
            }
            export enum PickerLocationId {
                documentsLibrary,
                computerFolder,
                desktop,
                downloads,
                homeGroup,
                musicLibrary,
                picturesLibrary,
                videosLibrary,
            }
            export class FilePickerSelectedFilesArray implements Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>, Windows.Foundation.Collections.IIterable<Windows.Storage.StorageFile> {
                size: number;
                getAt(index: number): Windows.Storage.StorageFile;
                indexOf(value: Windows.Storage.StorageFile): { index: number; returnValue: boolean; };
                getMany(startIndex: number): { items: Windows.Storage.StorageFile[]; returnValue: number; };
                first(): Windows.Foundation.Collections.IIterator<Windows.Storage.StorageFile>;
                toString(): string;
                toLocaleString(): string;
                concat(...items: Windows.Storage.StorageFile[][]): Windows.Storage.StorageFile[];
                join(seperator: string): string;
                pop(): Windows.Storage.StorageFile;
                push(...items: Windows.Storage.StorageFile[]): void;
                reverse(): Windows.Storage.StorageFile[];
                shift(): Windows.Storage.StorageFile;
                slice(start: number): Windows.Storage.StorageFile[];
                slice(start: number, end: number): Windows.Storage.StorageFile[];
                sort(): Windows.Storage.StorageFile[];
                sort(compareFn: (a: Windows.Storage.StorageFile, b: Windows.Storage.StorageFile) => number): Windows.Storage.StorageFile[];
                splice(start: number): Windows.Storage.StorageFile[];
                splice(start: number, deleteCount: number, ...items: Windows.Storage.StorageFile[]): Windows.Storage.StorageFile[];
                unshift(...items: Windows.Storage.StorageFile[]): number;
                lastIndexOf(searchElement: Windows.Storage.StorageFile): number;
                lastIndexOf(searchElement: Windows.Storage.StorageFile, fromIndex: number): number;
                every(callbackfn: (value: Windows.Storage.StorageFile, index: number, array: Windows.Storage.StorageFile[]) => boolean): boolean;
                every(callbackfn: (value: Windows.Storage.StorageFile, index: number, array: Windows.Storage.StorageFile[]) => boolean, thisArg: any): boolean;
                some(callbackfn: (value: Windows.Storage.StorageFile, index: number, array: Windows.Storage.StorageFile[]) => boolean): boolean;
                some(callbackfn: (value: Windows.Storage.StorageFile, index: number, array: Windows.Storage.StorageFile[]) => boolean, thisArg: any): boolean;
                forEach(callbackfn: (value: Windows.Storage.StorageFile, index: number, array: Windows.Storage.StorageFile[]) => void ): void;
                forEach(callbackfn: (value: Windows.Storage.StorageFile, index: number, array: Windows.Storage.StorageFile[]) => void , thisArg: any): void;
                map(callbackfn: (value: Windows.Storage.StorageFile, index: number, array: Windows.Storage.StorageFile[]) => any): any[];
                map(callbackfn: (value: Windows.Storage.StorageFile, index: number, array: Windows.Storage.StorageFile[]) => any, thisArg: any): any[];
                filter(callbackfn: (value: Windows.Storage.StorageFile, index: number, array: Windows.Storage.StorageFile[]) => boolean): Windows.Storage.StorageFile[];
                filter(callbackfn: (value: Windows.Storage.StorageFile, index: number, array: Windows.Storage.StorageFile[]) => boolean, thisArg: any): Windows.Storage.StorageFile[];
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Storage.StorageFile[]) => any): any;
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Storage.StorageFile[]) => any, initialValue: any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Storage.StorageFile[]) => any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: Windows.Storage.StorageFile[]) => any, initialValue: any): any;
                length: number;
            }
            export class FilePickerFileTypesOrderedMap implements Windows.Foundation.Collections.IMap<string, Windows.Foundation.Collections.IVector<string>>, Windows.Foundation.Collections.IIterable<Windows.Foundation.Collections.IKeyValuePair<string, Windows.Foundation.Collections.IVector<string>>> {
                size: number;
                lookup(key: string): Windows.Foundation.Collections.IVector<string>;
                hasKey(key: string): boolean;
                getView(): Windows.Foundation.Collections.IMapView<string, Windows.Foundation.Collections.IVector<string>>;
                insert(key: string, value: Windows.Foundation.Collections.IVector<string>): boolean;
                remove(key: string): void;
                clear(): void;
                first(): Windows.Foundation.Collections.IIterator<Windows.Foundation.Collections.IKeyValuePair<string, Windows.Foundation.Collections.IVector<string>>>;
            }
            export class FileExtensionVector implements Windows.Foundation.Collections.IVector<string>, Windows.Foundation.Collections.IIterable<string> {
                size: number;
                getAt(index: number): string;
                getView(): Windows.Foundation.Collections.IVectorView<string>;
                indexOf(value: string): { index: number; returnValue: boolean; };
                setAt(index: number, value: string): void;
                insertAt(index: number, value: string): void;
                removeAt(index: number): void;
                append(value: string): void;
                removeAtEnd(): void;
                clear(): void;
                getMany(startIndex: number): { items: string[]; returnValue: number; };
                replaceAll(items: string[]): void;
                first(): Windows.Foundation.Collections.IIterator<string>;
                toString(): string;
                toLocaleString(): string;
                concat(...items: string[][]): string[];
                join(seperator: string): string;
                pop(): string;
                push(...items: string[]): void;
                reverse(): string[];
                shift(): string;
                slice(start: number): string[];
                slice(start: number, end: number): string[];
                sort(): string[];
                sort(compareFn: (a: string, b: string) => number): string[];
                splice(start: number): string[];
                splice(start: number, deleteCount: number, ...items: string[]): string[];
                unshift(...items: string[]): number;
                lastIndexOf(searchElement: string): number;
                lastIndexOf(searchElement: string, fromIndex: number): number;
                every(callbackfn: (value: string, index: number, array: string[]) => boolean): boolean;
                every(callbackfn: (value: string, index: number, array: string[]) => boolean, thisArg: any): boolean;
                some(callbackfn: (value: string, index: number, array: string[]) => boolean): boolean;
                some(callbackfn: (value: string, index: number, array: string[]) => boolean, thisArg: any): boolean;
                forEach(callbackfn: (value: string, index: number, array: string[]) => void ): void;
                forEach(callbackfn: (value: string, index: number, array: string[]) => void , thisArg: any): void;
                map(callbackfn: (value: string, index: number, array: string[]) => any): any[];
                map(callbackfn: (value: string, index: number, array: string[]) => any, thisArg: any): any[];
                filter(callbackfn: (value: string, index: number, array: string[]) => boolean): string[];
                filter(callbackfn: (value: string, index: number, array: string[]) => boolean, thisArg: any): string[];
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: string[]) => any): any;
                reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: string[]) => any, initialValue: any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: string[]) => any): any;
                reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: string[]) => any, initialValue: any): any;
                length: number;
            }
            export interface IFileOpenPicker {
                commitButtonText: string;
                fileTypeFilter: Windows.Foundation.Collections.IVector<string>;
                settingsIdentifier: string;
                suggestedStartLocation: Windows.Storage.Pickers.PickerLocationId;
                viewMode: Windows.Storage.Pickers.PickerViewMode;
                pickSingleFileAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                pickMultipleFilesAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>>;
            }
            export interface IFileSavePicker {
                commitButtonText: string;
                defaultFileExtension: string;
                fileTypeChoices: Windows.Foundation.Collections.IMap<string, Windows.Foundation.Collections.IVector<string>>;
                settingsIdentifier: string;
                suggestedFileName: string;
                suggestedSaveFile: Windows.Storage.StorageFile;
                suggestedStartLocation: Windows.Storage.Pickers.PickerLocationId;
                pickSaveFileAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            }
            export interface IFolderPicker {
                commitButtonText: string;
                fileTypeFilter: Windows.Foundation.Collections.IVector<string>;
                settingsIdentifier: string;
                suggestedStartLocation: Windows.Storage.Pickers.PickerLocationId;
                viewMode: Windows.Storage.Pickers.PickerViewMode;
                pickSingleFolderAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
            }
            export class FileOpenPicker implements Windows.Storage.Pickers.IFileOpenPicker {
                commitButtonText: string;
                fileTypeFilter: Windows.Foundation.Collections.IVector<string>;
                settingsIdentifier: string;
                suggestedStartLocation: Windows.Storage.Pickers.PickerLocationId;
                viewMode: Windows.Storage.Pickers.PickerViewMode;
                pickSingleFileAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
                pickMultipleFilesAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>>;
            }
            export class FileSavePicker implements Windows.Storage.Pickers.IFileSavePicker {
                commitButtonText: string;
                defaultFileExtension: string;
                fileTypeChoices: Windows.Foundation.Collections.IMap<string, Windows.Foundation.Collections.IVector<string>>;
                settingsIdentifier: string;
                suggestedFileName: string;
                suggestedSaveFile: Windows.Storage.StorageFile;
                suggestedStartLocation: Windows.Storage.Pickers.PickerLocationId;
                pickSaveFileAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFile>;
            }
            export class FolderPicker implements Windows.Storage.Pickers.IFolderPicker {
                commitButtonText: string;
                fileTypeFilter: Windows.Foundation.Collections.IVector<string>;
                settingsIdentifier: string;
                suggestedStartLocation: Windows.Storage.Pickers.PickerLocationId;
                viewMode: Windows.Storage.Pickers.PickerViewMode;
                pickSingleFolderAsync(): Windows.Foundation.IAsyncOperation<Windows.Storage.StorageFolder>;
            }
        }
    }
}
declare module Windows {
    export module Storage {
        export module Compression {
            export enum CompressAlgorithm {
                invalidAlgorithm,
                nullAlgorithm,
                mszip,
                xpress,
                xpressHuff,
                lzms,
            }
            export interface ICompressor extends Windows.Storage.Streams.IOutputStream, Windows.Foundation.IClosable {
                finishAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                detachStream(): Windows.Storage.Streams.IOutputStream;
            }
            export class Compressor implements Windows.Storage.Compression.ICompressor, Windows.Storage.Streams.IOutputStream, Windows.Foundation.IClosable {
                constructor(underlyingStream: Windows.Storage.Streams.IOutputStream);
                constructor(underlyingStream: Windows.Storage.Streams.IOutputStream, algorithm: Windows.Storage.Compression.CompressAlgorithm, blockSize: number);
                finishAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                detachStream(): Windows.Storage.Streams.IOutputStream;
                writeAsync(buffer: Windows.Storage.Streams.IBuffer): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
                flushAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                dispose(): void;
                close(): void;
            }
            export interface IDecompressor extends Windows.Storage.Streams.IInputStream, Windows.Foundation.IClosable {
                detachStream(): Windows.Storage.Streams.IInputStream;
            }
            export class Decompressor implements Windows.Storage.Compression.IDecompressor, Windows.Storage.Streams.IInputStream, Windows.Foundation.IClosable {
                constructor(underlyingStream: Windows.Storage.Streams.IInputStream);
                detachStream(): Windows.Storage.Streams.IInputStream;
                readAsync(buffer: Windows.Storage.Streams.IBuffer, count: number, options: Windows.Storage.Streams.InputStreamOptions): Windows.Foundation.IAsyncOperationWithProgress<Windows.Storage.Streams.IBuffer, number>;
                dispose(): void;
                close(): void;
            }
            export interface ICompressorFactory {
                createCompressor(underlyingStream: Windows.Storage.Streams.IOutputStream): Windows.Storage.Compression.Compressor;
                createCompressorEx(underlyingStream: Windows.Storage.Streams.IOutputStream, algorithm: Windows.Storage.Compression.CompressAlgorithm, blockSize: number): Windows.Storage.Compression.Compressor;
            }
            export interface IDecompressorFactory {
                createDecompressor(underlyingStream: Windows.Storage.Streams.IInputStream): Windows.Storage.Compression.Decompressor;
            }
        }
    }
}
declare module Windows {
    export module System {
        export module Profile {
            export interface IHardwareToken {
                certificate: Windows.Storage.Streams.IBuffer;
                id: Windows.Storage.Streams.IBuffer;
                signature: Windows.Storage.Streams.IBuffer;
            }
            export class HardwareToken implements Windows.System.Profile.IHardwareToken {
                certificate: Windows.Storage.Streams.IBuffer;
                id: Windows.Storage.Streams.IBuffer;
                signature: Windows.Storage.Streams.IBuffer;
            }
            export interface IHardwareIdentificationStatics {
                getPackageSpecificToken(nonce: Windows.Storage.Streams.IBuffer): Windows.System.Profile.HardwareToken;
            }
            export class HardwareIdentification {
                static getPackageSpecificToken(nonce: Windows.Storage.Streams.IBuffer): Windows.System.Profile.HardwareToken;
            }
        }
    }
}
declare module Windows {
    export module System {
        export module Threading {
            export enum WorkItemPriority {
                low,
                normal,
                high,
            }
            export enum WorkItemOptions {
                none,
                timeSliced,
            }
            export interface TimerElapsedHandler {
                (timer: Windows.System.Threading.ThreadPoolTimer): void;
            }
            export class ThreadPoolTimer implements Windows.System.Threading.IThreadPoolTimer {
                delay: number;
                period: number;
                cancel(): void;
                static createPeriodicTimer(handler: Windows.System.Threading.TimerElapsedHandler, period: number): Windows.System.Threading.ThreadPoolTimer;
                static createTimer(handler: Windows.System.Threading.TimerElapsedHandler, delay: number): Windows.System.Threading.ThreadPoolTimer;
                static createPeriodicTimer(handler: Windows.System.Threading.TimerElapsedHandler, period: number, destroyed: Windows.System.Threading.TimerDestroyedHandler): Windows.System.Threading.ThreadPoolTimer;
                static createTimer(handler: Windows.System.Threading.TimerElapsedHandler, delay: number, destroyed: Windows.System.Threading.TimerDestroyedHandler): Windows.System.Threading.ThreadPoolTimer;
            }
            export interface TimerDestroyedHandler {
                (timer: Windows.System.Threading.ThreadPoolTimer): void;
            }
            export interface WorkItemHandler {
                (operation: Windows.Foundation.IAsyncAction): void;
            }
            export interface IThreadPoolStatics {
                runAsync(handler: Windows.System.Threading.WorkItemHandler): Windows.Foundation.IAsyncAction;
                runAsync(handler: Windows.System.Threading.WorkItemHandler, priority: Windows.System.Threading.WorkItemPriority): Windows.Foundation.IAsyncAction;
                runAsync(handler: Windows.System.Threading.WorkItemHandler, priority: Windows.System.Threading.WorkItemPriority, options: Windows.System.Threading.WorkItemOptions): Windows.Foundation.IAsyncAction;
            }
            export interface IThreadPoolTimer {
                delay: number;
                period: number;
                cancel(): void;
            }
            export interface IThreadPoolTimerStatics {
                createPeriodicTimer(handler: Windows.System.Threading.TimerElapsedHandler, period: number): Windows.System.Threading.ThreadPoolTimer;
                createTimer(handler: Windows.System.Threading.TimerElapsedHandler, delay: number): Windows.System.Threading.ThreadPoolTimer;
                createPeriodicTimer(handler: Windows.System.Threading.TimerElapsedHandler, period: number, destroyed: Windows.System.Threading.TimerDestroyedHandler): Windows.System.Threading.ThreadPoolTimer;
                createTimer(handler: Windows.System.Threading.TimerElapsedHandler, delay: number, destroyed: Windows.System.Threading.TimerDestroyedHandler): Windows.System.Threading.ThreadPoolTimer;
            }
            export class ThreadPool {
                static runAsync(handler: Windows.System.Threading.WorkItemHandler): Windows.Foundation.IAsyncAction;
                static runAsync(handler: Windows.System.Threading.WorkItemHandler, priority: Windows.System.Threading.WorkItemPriority): Windows.Foundation.IAsyncAction;
                static runAsync(handler: Windows.System.Threading.WorkItemHandler, priority: Windows.System.Threading.WorkItemPriority, options: Windows.System.Threading.WorkItemOptions): Windows.Foundation.IAsyncAction;
            }
        }
    }
}
declare module Windows {
    export module System {
        export module Threading {
            export module Core {
                export interface SignalHandler {
                    (signalNotifier: Windows.System.Threading.Core.SignalNotifier, timedOut: boolean): void;
                }
                export class SignalNotifier implements Windows.System.Threading.Core.ISignalNotifier {
                    enable(): void;
                    terminate(): void;
                    static attachToEvent(name: string, handler: Windows.System.Threading.Core.SignalHandler): Windows.System.Threading.Core.SignalNotifier;
                    static attachToEvent(name: string, handler: Windows.System.Threading.Core.SignalHandler, timeout: number): Windows.System.Threading.Core.SignalNotifier;
                    static attachToSemaphore(name: string, handler: Windows.System.Threading.Core.SignalHandler): Windows.System.Threading.Core.SignalNotifier;
                    static attachToSemaphore(name: string, handler: Windows.System.Threading.Core.SignalHandler, timeout: number): Windows.System.Threading.Core.SignalNotifier;
                }
                export interface ISignalNotifierStatics {
                    attachToEvent(name: string, handler: Windows.System.Threading.Core.SignalHandler): Windows.System.Threading.Core.SignalNotifier;
                    attachToEvent(name: string, handler: Windows.System.Threading.Core.SignalHandler, timeout: number): Windows.System.Threading.Core.SignalNotifier;
                    attachToSemaphore(name: string, handler: Windows.System.Threading.Core.SignalHandler): Windows.System.Threading.Core.SignalNotifier;
                    attachToSemaphore(name: string, handler: Windows.System.Threading.Core.SignalHandler, timeout: number): Windows.System.Threading.Core.SignalNotifier;
                }
                export interface IPreallocatedWorkItemFactory {
                    createWorkItem(handler: Windows.System.Threading.WorkItemHandler): Windows.System.Threading.Core.PreallocatedWorkItem;
                    createWorkItemWithPriority(handler: Windows.System.Threading.WorkItemHandler, priority: Windows.System.Threading.WorkItemPriority): Windows.System.Threading.Core.PreallocatedWorkItem;
                    createWorkItemWithPriorityAndOptions(handler: Windows.System.Threading.WorkItemHandler, priority: Windows.System.Threading.WorkItemPriority, options: Windows.System.Threading.WorkItemOptions): Windows.System.Threading.Core.PreallocatedWorkItem;
                }
                export class PreallocatedWorkItem implements Windows.System.Threading.Core.IPreallocatedWorkItem {
                    constructor(handler: Windows.System.Threading.WorkItemHandler);
                    constructor(handler: Windows.System.Threading.WorkItemHandler, priority: Windows.System.Threading.WorkItemPriority);
                    constructor(handler: Windows.System.Threading.WorkItemHandler, priority: Windows.System.Threading.WorkItemPriority, options: Windows.System.Threading.WorkItemOptions);
                    runAsync(): Windows.Foundation.IAsyncAction;
                }
                export interface IPreallocatedWorkItem {
                    runAsync(): Windows.Foundation.IAsyncAction;
                }
                export interface ISignalNotifier {
                    enable(): void;
                    terminate(): void;
                }
            }
        }
    }
}
declare module Windows {
    export module System {
        export module UserProfile {
            export enum AccountPictureKind {
                smallImage,
                largeImage,
                video,
            }
            export enum SetAccountPictureResult {
                success,
                changeDisabled,
                largeOrDynamicError,
                videoFrameSizeError,
                fileSizeError,
                failure,
            }
            export interface IUserInformationStatics {
                accountPictureChangeEnabled: boolean;
                nameAccessAllowed: boolean;
                getAccountPicture(kind: Windows.System.UserProfile.AccountPictureKind): Windows.Storage.IStorageFile;
                setAccountPictureAsync(image: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<Windows.System.UserProfile.SetAccountPictureResult>;
                setAccountPicturesAsync(smallImage: Windows.Storage.IStorageFile, largeImage: Windows.Storage.IStorageFile, video: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<Windows.System.UserProfile.SetAccountPictureResult>;
                setAccountPictureFromStreamAsync(image: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncOperation<Windows.System.UserProfile.SetAccountPictureResult>;
                setAccountPicturesFromStreamsAsync(smallImage: Windows.Storage.Streams.IRandomAccessStream, largeImage: Windows.Storage.Streams.IRandomAccessStream, video: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncOperation<Windows.System.UserProfile.SetAccountPictureResult>;
                onaccountpicturechanged: any/* TODO */;
                getDisplayNameAsync(): Windows.Foundation.IAsyncOperation<string>;
                getFirstNameAsync(): Windows.Foundation.IAsyncOperation<string>;
                getLastNameAsync(): Windows.Foundation.IAsyncOperation<string>;
                getPrincipalNameAsync(): Windows.Foundation.IAsyncOperation<string>;
                getSessionInitiationProtocolUriAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Uri>;
                getDomainNameAsync(): Windows.Foundation.IAsyncOperation<string>;
            }
            export class UserInformation {
                static accountPictureChangeEnabled: boolean;
                static nameAccessAllowed: boolean;
                static getAccountPicture(kind: Windows.System.UserProfile.AccountPictureKind): Windows.Storage.IStorageFile;
                static setAccountPictureAsync(image: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<Windows.System.UserProfile.SetAccountPictureResult>;
                static setAccountPicturesAsync(smallImage: Windows.Storage.IStorageFile, largeImage: Windows.Storage.IStorageFile, video: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<Windows.System.UserProfile.SetAccountPictureResult>;
                static setAccountPictureFromStreamAsync(image: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncOperation<Windows.System.UserProfile.SetAccountPictureResult>;
                static setAccountPicturesFromStreamsAsync(smallImage: Windows.Storage.Streams.IRandomAccessStream, largeImage: Windows.Storage.Streams.IRandomAccessStream, video: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncOperation<Windows.System.UserProfile.SetAccountPictureResult>;
                static onaccountpicturechanged: any/* TODO */;
                static getDisplayNameAsync(): Windows.Foundation.IAsyncOperation<string>;
                static getFirstNameAsync(): Windows.Foundation.IAsyncOperation<string>;
                static getLastNameAsync(): Windows.Foundation.IAsyncOperation<string>;
                static getPrincipalNameAsync(): Windows.Foundation.IAsyncOperation<string>;
                static getSessionInitiationProtocolUriAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Uri>;
                static getDomainNameAsync(): Windows.Foundation.IAsyncOperation<string>;
            }
            export interface ILockScreenStatics {
                originalImageFile: Windows.Foundation.Uri;
                getImageStream(): Windows.Storage.Streams.IRandomAccessStream;
                setImageFileAsync(value: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncAction;
                setImageStreamAsync(value: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncAction;
            }
            export class LockScreen {
                static originalImageFile: Windows.Foundation.Uri;
                static getImageStream(): Windows.Storage.Streams.IRandomAccessStream;
                static setImageFileAsync(value: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncAction;
                static setImageStreamAsync(value: Windows.Storage.Streams.IRandomAccessStream): Windows.Foundation.IAsyncAction;
            }
            export interface IGlobalizationPreferencesStatics {
                calendars: Windows.Foundation.Collections.IVectorView<string>;
                clocks: Windows.Foundation.Collections.IVectorView<string>;
                currencies: Windows.Foundation.Collections.IVectorView<string>;
                homeGeographicRegion: string;
                languages: Windows.Foundation.Collections.IVectorView<string>;
                weekStartsOn: Windows.Globalization.DayOfWeek;
            }
            export class GlobalizationPreferences {
                static calendars: Windows.Foundation.Collections.IVectorView<string>;
                static clocks: Windows.Foundation.Collections.IVectorView<string>;
                static currencies: Windows.Foundation.Collections.IVectorView<string>;
                static homeGeographicRegion: string;
                static languages: Windows.Foundation.Collections.IVectorView<string>;
                static weekStartsOn: Windows.Globalization.DayOfWeek;
            }
        }
    }
}
declare module Windows {
    export module System {
        export interface ILauncherUIOptions {
            invocationPoint: Windows.Foundation.Point;
            preferredPlacement: Windows.UI.Popups.Placement;
            selectionRect: Windows.Foundation.Rect;
        }
        export class LauncherUIOptions implements Windows.System.ILauncherUIOptions {
            invocationPoint: Windows.Foundation.Point;
            preferredPlacement: Windows.UI.Popups.Placement;
            selectionRect: Windows.Foundation.Rect;
        }
        export interface ILauncherOptions {
            contentType: string;
            displayApplicationPicker: boolean;
            fallbackUri: Windows.Foundation.Uri;
            preferredApplicationDisplayName: string;
            preferredApplicationPackageFamilyName: string;
            treatAsUntrusted: boolean;
            uI: Windows.System.LauncherUIOptions;
        }
        export class LauncherOptions implements Windows.System.ILauncherOptions {
            contentType: string;
            displayApplicationPicker: boolean;
            fallbackUri: Windows.Foundation.Uri;
            preferredApplicationDisplayName: string;
            preferredApplicationPackageFamilyName: string;
            treatAsUntrusted: boolean;
            uI: Windows.System.LauncherUIOptions;
        }
        export interface ILauncherStatics {
            launchFileAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<boolean>;
            launchFileAsync(file: Windows.Storage.IStorageFile, options: Windows.System.LauncherOptions): Windows.Foundation.IAsyncOperation<boolean>;
            launchUriAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperation<boolean>;
            launchUriAsync(uri: Windows.Foundation.Uri, options: Windows.System.LauncherOptions): Windows.Foundation.IAsyncOperation<boolean>;
        }
        export class Launcher {
            static launchFileAsync(file: Windows.Storage.IStorageFile): Windows.Foundation.IAsyncOperation<boolean>;
            static launchFileAsync(file: Windows.Storage.IStorageFile, options: Windows.System.LauncherOptions): Windows.Foundation.IAsyncOperation<boolean>;
            static launchUriAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperation<boolean>;
            static launchUriAsync(uri: Windows.Foundation.Uri, options: Windows.System.LauncherOptions): Windows.Foundation.IAsyncOperation<boolean>;
        }
        export enum ProcessorArchitecture {
            x86,
            arm,
            x64,
            neutral,
            unknown,
        }
        export enum VirtualKeyModifiers {
            none,
            control,
            menu,
            shift,
            windows,
        }
        export enum VirtualKey {
            none,
            leftButton,
            rightButton,
            cancel,
            middleButton,
            xButton1,
            xButton2,
            back,
            tab,
            clear,
            enter,
            shift,
            control,
            menu,
            pause,
            capitalLock,
            kana,
            hangul,
            junja,
            final,
            hanja,
            kanji,
            escape,
            convert,
            nonConvert,
            accept,
            modeChange,
            space,
            pageUp,
            pageDown,
            end,
            home,
            left,
            up,
            right,
            down,
            select,
            print,
            execute,
            snapshot,
            insert,
            delete_,
            help,
            number0,
            number1,
            number2,
            number3,
            number4,
            number5,
            number6,
            number7,
            number8,
            number9,
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            t,
            u,
            v,
            w,
            x,
            y,
            z,
            leftWindows,
            rightWindows,
            application,
            sleep,
            numberPad0,
            numberPad1,
            numberPad2,
            numberPad3,
            numberPad4,
            numberPad5,
            numberPad6,
            numberPad7,
            numberPad8,
            numberPad9,
            multiply,
            add,
            separator,
            subtract,
            decimal,
            divide,
            f1,
            f2,
            f3,
            f4,
            f5,
            f6,
            f7,
            f8,
            f9,
            f10,
            f11,
            f12,
            f13,
            f14,
            f15,
            f16,
            f17,
            f18,
            f19,
            f20,
            f21,
            f22,
            f23,
            f24,
            numberKeyLock,
            scroll,
            leftShift,
            rightShift,
            leftControl,
            rightControl,
            leftMenu,
            rightMenu,
        }
    }
}
declare module Windows {
    export module System {
        export module Display {
            export interface IDisplayRequest {
                requestActive(): void;
                requestRelease(): void;
            }
            export class DisplayRequest implements Windows.System.Display.IDisplayRequest {
                requestActive(): void;
                requestRelease(): void;
            }
        }
    }
}
declare module Windows {
    export module System {
        export module RemoteDesktop {
            export interface IInteractiveSessionStatics {
                isRemote: boolean;
            }
            export class InteractiveSession {
                static isRemote: boolean;
            }
        }
    }
}
declare module Windows {
    export module UI {
        export module ApplicationSettings {
            export interface ISettingsCommandFactory {
                create(settingsCommandId: any, label: string, handler: Windows.UI.Popups.UICommandInvokedHandler): Windows.UI.ApplicationSettings.SettingsCommand;
            }
            export class SettingsCommand implements Windows.UI.Popups.IUICommand {
                constructor(settingsCommandId: any, label: string, handler: Windows.UI.Popups.UICommandInvokedHandler);
                id: any;
                invoked: Windows.UI.Popups.UICommandInvokedHandler;
                label: string;
            }
            export interface ISettingsPaneCommandsRequest {
                applicationCommands: Windows.Foundation.Collections.IVector<Windows.UI.ApplicationSettings.SettingsCommand>;
            }
            export class SettingsPaneCommandsRequest implements Windows.UI.ApplicationSettings.ISettingsPaneCommandsRequest {
                applicationCommands: Windows.Foundation.Collections.IVector<Windows.UI.ApplicationSettings.SettingsCommand>;
            }
            export interface ISettingsPaneCommandsRequestedEventArgs {
                request: Windows.UI.ApplicationSettings.SettingsPaneCommandsRequest;
            }
            export class SettingsPaneCommandsRequestedEventArgs implements Windows.UI.ApplicationSettings.ISettingsPaneCommandsRequestedEventArgs {
                request: Windows.UI.ApplicationSettings.SettingsPaneCommandsRequest;
            }
            export enum SettingsEdgeLocation {
                right,
                left,
            }
            export interface ISettingsPaneStatics {
                edge: Windows.UI.ApplicationSettings.SettingsEdgeLocation;
                getForCurrentView(): Windows.UI.ApplicationSettings.SettingsPane;
                show(): void;
            }
            export class SettingsPane implements Windows.UI.ApplicationSettings.ISettingsPane {
                oncommandsrequested: any/* TODO */;
                static edge: Windows.UI.ApplicationSettings.SettingsEdgeLocation;
                static getForCurrentView(): Windows.UI.ApplicationSettings.SettingsPane;
                static show(): void;
            }
            export interface ISettingsPane {
                oncommandsrequested: any/* TODO */;
            }
        }
    }
}
declare module Windows {
    export module UI {
        export module ViewManagement {
            export enum ApplicationViewState {
                fullScreenLandscape,
                filled,
                snapped,
                fullScreenPortrait,
            }
            export interface IApplicationViewStatics {
                value: Windows.UI.ViewManagement.ApplicationViewState;
                tryUnsnap(): boolean;
            }
            export class ApplicationView {
                static value: Windows.UI.ViewManagement.ApplicationViewState;
                static tryUnsnap(): boolean;
            }
            export interface IInputPaneVisibilityEventArgs {
                ensuredFocusedElementInView: boolean;
                occludedRect: Windows.Foundation.Rect;
            }
            export class InputPaneVisibilityEventArgs implements Windows.UI.ViewManagement.IInputPaneVisibilityEventArgs {
                ensuredFocusedElementInView: boolean;
                occludedRect: Windows.Foundation.Rect;
            }
            export interface IInputPane {
                occludedRect: Windows.Foundation.Rect;
                onshowing: any/* TODO */;
                onhiding: any/* TODO */;
            }
            export class InputPane implements Windows.UI.ViewManagement.IInputPane {
                occludedRect: Windows.Foundation.Rect;
                onshowing: any/* TODO */;
                onhiding: any/* TODO */;
                static getForCurrentView(): Windows.UI.ViewManagement.InputPane;
            }
            export interface IInputPaneStatics {
                getForCurrentView(): Windows.UI.ViewManagement.InputPane;
            }
            export enum HandPreference {
                leftHanded,
                rightHanded,
            }
            export enum UIElementType {
                activeCaption,
                background,
                buttonFace,
                buttonText,
                captionText,
                grayText,
                highlight,
                highlightText,
                hotlight,
                inactiveCaption,
                inactiveCaptionText,
                window,
                windowText,
            }
            export interface IAccessibilitySettings {
                highContrast: boolean;
                highContrastScheme: string;
                onhighcontrastchanged: any/* TODO */;
            }
            export class AccessibilitySettings implements Windows.UI.ViewManagement.IAccessibilitySettings {
                highContrast: boolean;
                highContrastScheme: string;
                onhighcontrastchanged: any/* TODO */;
            }
            export interface IUISettings {
                animationsEnabled: boolean;
                caretBlinkRate: number;
                caretBrowsingEnabled: boolean;
                caretWidth: number;
                cursorSize: Windows.Foundation.Size;
                doubleClickTime: number;
                handPreference: Windows.UI.ViewManagement.HandPreference;
                messageDuration: number;
                mouseHoverTime: number;
                scrollBarArrowSize: Windows.Foundation.Size;
                scrollBarSize: Windows.Foundation.Size;
                scrollBarThumbBoxSize: Windows.Foundation.Size;
                uIElementColor(desiredElement: Windows.UI.ViewManagement.UIElementType): Windows.UI.Color;
            }
            export class UISettings implements Windows.UI.ViewManagement.IUISettings {
                animationsEnabled: boolean;
                caretBlinkRate: number;
                caretBrowsingEnabled: boolean;
                caretWidth: number;
                cursorSize: Windows.Foundation.Size;
                doubleClickTime: number;
                handPreference: Windows.UI.ViewManagement.HandPreference;
                messageDuration: number;
                mouseHoverTime: number;
                scrollBarArrowSize: Windows.Foundation.Size;
                scrollBarSize: Windows.Foundation.Size;
                scrollBarThumbBoxSize: Windows.Foundation.Size;
                uIElementColor(desiredElement: Windows.UI.ViewManagement.UIElementType): Windows.UI.Color;
            }
        }
    }
}
declare module Windows {
    export module UI {
        export module Input {
            export enum EdgeGestureKind {
                touch,
                keyboard,
                mouse,
            }
            export interface IEdgeGestureEventArgs {
                kind: Windows.UI.Input.EdgeGestureKind;
            }
            export class EdgeGestureEventArgs implements Windows.UI.Input.IEdgeGestureEventArgs {
                kind: Windows.UI.Input.EdgeGestureKind;
            }
            export interface IEdgeGestureStatics {
                getForCurrentView(): Windows.UI.Input.EdgeGesture;
            }
            export class EdgeGesture implements Windows.UI.Input.IEdgeGesture {
                onstarting: any/* TODO */;
                oncompleted: any/* TODO */;
                oncanceled: any/* TODO */;
                static getForCurrentView(): Windows.UI.Input.EdgeGesture;
            }
            export interface IEdgeGesture {
                onstarting: any/* TODO */;
                oncompleted: any/* TODO */;
                oncanceled: any/* TODO */;
            }
            export enum HoldingState {
                started,
                completed,
                canceled,
            }
            export enum DraggingState {
                started,
                continuing,
                completed,
            }
            export enum CrossSlidingState {
                started,
                dragging,
                selecting,
                selectSpeedBumping,
                speedBumping,
                rearranging,
                completed,
            }
            export enum GestureSettings {
                none,
                tap,
                doubleTap,
                hold,
                holdWithMouse,
                rightTap,
                drag,
                manipulationTranslateX,
                manipulationTranslateY,
                manipulationTranslateRailsX,
                manipulationTranslateRailsY,
                manipulationRotate,
                manipulationScale,
                manipulationTranslateInertia,
                manipulationRotateInertia,
                manipulationScaleInertia,
                crossSlide,
            }
            export interface ManipulationDelta {
                translation: Windows.Foundation.Point;
                scale: number;
                rotation: number;
                expansion: number;
            }
            export interface ManipulationVelocities {
                linear: Windows.Foundation.Point;
                angular: number;
                expansion: number;
            }
            export interface CrossSlideThresholds {
                selectionStart: number;
                speedBumpStart: number;
                speedBumpEnd: number;
                rearrangeStart: number;
            }
            export interface ITappedEventArgs {
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
                tapCount: number;
            }
            export interface IRightTappedEventArgs {
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
            }
            export interface IHoldingEventArgs {
                holdingState: Windows.UI.Input.HoldingState;
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
            }
            export interface IDraggingEventArgs {
                draggingState: Windows.UI.Input.DraggingState;
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
            }
            export interface IManipulationStartedEventArgs {
                cumulative: Windows.UI.Input.ManipulationDelta;
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
            }
            export interface IManipulationUpdatedEventArgs {
                cumulative: Windows.UI.Input.ManipulationDelta;
                delta: Windows.UI.Input.ManipulationDelta;
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
                velocities: Windows.UI.Input.ManipulationVelocities;
            }
            export interface IManipulationInertiaStartingEventArgs {
                cumulative: Windows.UI.Input.ManipulationDelta;
                delta: Windows.UI.Input.ManipulationDelta;
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
                velocities: Windows.UI.Input.ManipulationVelocities;
            }
            export interface IManipulationCompletedEventArgs {
                cumulative: Windows.UI.Input.ManipulationDelta;
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
                velocities: Windows.UI.Input.ManipulationVelocities;
            }
            export interface ICrossSlidingEventArgs {
                crossSlidingState: Windows.UI.Input.CrossSlidingState;
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
            }
            export interface IMouseWheelParameters {
                charTranslation: Windows.Foundation.Point;
                deltaRotationAngle: number;
                deltaScale: number;
                pageTranslation: Windows.Foundation.Point;
            }
            export interface IGestureRecognizer {
                autoProcessInertia: boolean;
                crossSlideExact: boolean;
                crossSlideHorizontally: boolean;
                crossSlideThresholds: Windows.UI.Input.CrossSlideThresholds;
                gestureSettings: Windows.UI.Input.GestureSettings;
                inertiaExpansion: number;
                inertiaExpansionDeceleration: number;
                inertiaRotationAngle: number;
                inertiaRotationDeceleration: number;
                inertiaTranslationDeceleration: number;
                inertiaTranslationDisplacement: number;
                isActive: boolean;
                isInertial: boolean;
                manipulationExact: boolean;
                mouseWheelParameters: Windows.UI.Input.MouseWheelParameters;
                pivotCenter: Windows.Foundation.Point;
                pivotRadius: number;
                showGestureFeedback: boolean;
                canBeDoubleTap(value: Windows.UI.Input.PointerPoint): boolean;
                processDownEvent(value: Windows.UI.Input.PointerPoint): void;
                processMoveEvents(value: Windows.Foundation.Collections.IVector<Windows.UI.Input.PointerPoint>): void;
                processUpEvent(value: Windows.UI.Input.PointerPoint): void;
                processMouseWheelEvent(value: Windows.UI.Input.PointerPoint, isShiftKeyDown: boolean, isControlKeyDown: boolean): void;
                processInertia(): void;
                completeGesture(): void;
                ontapped: any/* TODO */;
                onrighttapped: any/* TODO */;
                onholding: any/* TODO */;
                ondragging: any/* TODO */;
                onmanipulationstarted: any/* TODO */;
                onmanipulationupdated: any/* TODO */;
                onmanipulationinertiastarting: any/* TODO */;
                onmanipulationcompleted: any/* TODO */;
                oncrosssliding: any/* TODO */;
            }
            export class MouseWheelParameters implements Windows.UI.Input.IMouseWheelParameters {
                charTranslation: Windows.Foundation.Point;
                deltaRotationAngle: number;
                deltaScale: number;
                pageTranslation: Windows.Foundation.Point;
            }
            export class GestureRecognizer implements Windows.UI.Input.IGestureRecognizer {
                autoProcessInertia: boolean;
                crossSlideExact: boolean;
                crossSlideHorizontally: boolean;
                crossSlideThresholds: Windows.UI.Input.CrossSlideThresholds;
                gestureSettings: Windows.UI.Input.GestureSettings;
                inertiaExpansion: number;
                inertiaExpansionDeceleration: number;
                inertiaRotationAngle: number;
                inertiaRotationDeceleration: number;
                inertiaTranslationDeceleration: number;
                inertiaTranslationDisplacement: number;
                isActive: boolean;
                isInertial: boolean;
                manipulationExact: boolean;
                mouseWheelParameters: Windows.UI.Input.MouseWheelParameters;
                pivotCenter: Windows.Foundation.Point;
                pivotRadius: number;
                showGestureFeedback: boolean;
                canBeDoubleTap(value: Windows.UI.Input.PointerPoint): boolean;
                processDownEvent(value: Windows.UI.Input.PointerPoint): void;
                processMoveEvents(value: Windows.Foundation.Collections.IVector<Windows.UI.Input.PointerPoint>): void;
                processUpEvent(value: Windows.UI.Input.PointerPoint): void;
                processMouseWheelEvent(value: Windows.UI.Input.PointerPoint, isShiftKeyDown: boolean, isControlKeyDown: boolean): void;
                processInertia(): void;
                completeGesture(): void;
                ontapped: any/* TODO */;
                onrighttapped: any/* TODO */;
                onholding: any/* TODO */;
                ondragging: any/* TODO */;
                onmanipulationstarted: any/* TODO */;
                onmanipulationupdated: any/* TODO */;
                onmanipulationinertiastarting: any/* TODO */;
                onmanipulationcompleted: any/* TODO */;
                oncrosssliding: any/* TODO */;
            }
            export class TappedEventArgs implements Windows.UI.Input.ITappedEventArgs {
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
                tapCount: number;
            }
            export class RightTappedEventArgs implements Windows.UI.Input.IRightTappedEventArgs {
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
            }
            export class HoldingEventArgs implements Windows.UI.Input.IHoldingEventArgs {
                holdingState: Windows.UI.Input.HoldingState;
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
            }
            export class DraggingEventArgs implements Windows.UI.Input.IDraggingEventArgs {
                draggingState: Windows.UI.Input.DraggingState;
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
            }
            export class ManipulationStartedEventArgs implements Windows.UI.Input.IManipulationStartedEventArgs {
                cumulative: Windows.UI.Input.ManipulationDelta;
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
            }
            export class ManipulationUpdatedEventArgs implements Windows.UI.Input.IManipulationUpdatedEventArgs {
                cumulative: Windows.UI.Input.ManipulationDelta;
                delta: Windows.UI.Input.ManipulationDelta;
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
                velocities: Windows.UI.Input.ManipulationVelocities;
            }
            export class ManipulationInertiaStartingEventArgs implements Windows.UI.Input.IManipulationInertiaStartingEventArgs {
                cumulative: Windows.UI.Input.ManipulationDelta;
                delta: Windows.UI.Input.ManipulationDelta;
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
                velocities: Windows.UI.Input.ManipulationVelocities;
            }
            export class ManipulationCompletedEventArgs implements Windows.UI.Input.IManipulationCompletedEventArgs {
                cumulative: Windows.UI.Input.ManipulationDelta;
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
                velocities: Windows.UI.Input.ManipulationVelocities;
            }
            export class CrossSlidingEventArgs implements Windows.UI.Input.ICrossSlidingEventArgs {
                crossSlidingState: Windows.UI.Input.CrossSlidingState;
                pointerDeviceType: Windows.Devices.Input.PointerDeviceType;
                position: Windows.Foundation.Point;
            }
            export interface IPointerPointStatics {
                getCurrentPoint(pointerId: number): Windows.UI.Input.PointerPoint;
                getIntermediatePoints(pointerId: number): Windows.Foundation.Collections.IVector<Windows.UI.Input.PointerPoint>;
                getCurrentPoint(pointerId: number, transform: Windows.UI.Input.IPointerPointTransform): Windows.UI.Input.PointerPoint;
                getIntermediatePoints(pointerId: number, transform: Windows.UI.Input.IPointerPointTransform): Windows.Foundation.Collections.IVector<Windows.UI.Input.PointerPoint>;
            }
            export class PointerPoint implements Windows.UI.Input.IPointerPoint {
                frameId: number;
                isInContact: boolean;
                pointerDevice: Windows.Devices.Input.PointerDevice;
                pointerId: number;
                position: Windows.Foundation.Point;
                properties: Windows.UI.Input.PointerPointProperties;
                rawPosition: Windows.Foundation.Point;
                timestamp: number;
                static getCurrentPoint(pointerId: number): Windows.UI.Input.PointerPoint;
                static getIntermediatePoints(pointerId: number): Windows.Foundation.Collections.IVector<Windows.UI.Input.PointerPoint>;
                static getCurrentPoint(pointerId: number, transform: Windows.UI.Input.IPointerPointTransform): Windows.UI.Input.PointerPoint;
                static getIntermediatePoints(pointerId: number, transform: Windows.UI.Input.IPointerPointTransform): Windows.Foundation.Collections.IVector<Windows.UI.Input.PointerPoint>;
            }
            export interface IPointerPointTransform {
                inverse: Windows.UI.Input.IPointerPointTransform;
                tryTransform(inPoint: Windows.Foundation.Point): { outPoint: Windows.Foundation.Point; returnValue: boolean; };
                transformBounds(rect: Windows.Foundation.Rect): Windows.Foundation.Rect;
            }
            export interface IPointerPoint {
                frameId: number;
                isInContact: boolean;
                pointerDevice: Windows.Devices.Input.PointerDevice;
                pointerId: number;
                position: Windows.Foundation.Point;
                properties: Windows.UI.Input.PointerPointProperties;
                rawPosition: Windows.Foundation.Point;
                timestamp: number;
            }
            export class PointerPointProperties implements Windows.UI.Input.IPointerPointProperties {
                contactRect: Windows.Foundation.Rect;
                contactRectRaw: Windows.Foundation.Rect;
                isBarrelButtonPressed: boolean;
                isCanceled: boolean;
                isEraser: boolean;
                isHorizontalMouseWheel: boolean;
                isInRange: boolean;
                isInverted: boolean;
                isLeftButtonPressed: boolean;
                isMiddleButtonPressed: boolean;
                isPrimary: boolean;
                isRightButtonPressed: boolean;
                isXButton1Pressed: boolean;
                isXButton2Pressed: boolean;
                mouseWheelDelta: number;
                orientation: number;
                pointerUpdateKind: Windows.UI.Input.PointerUpdateKind;
                pressure: number;
                touchConfidence: boolean;
                twist: number;
                xTilt: number;
                yTilt: number;
                hasUsage(usagePage: number, usageId: number): boolean;
                getUsageValue(usagePage: number, usageId: number): number;
            }
            export enum PointerUpdateKind {
                other,
                leftButtonPressed,
                leftButtonReleased,
                rightButtonPressed,
                rightButtonReleased,
                middleButtonPressed,
                middleButtonReleased,
                xButton1Pressed,
                xButton1Released,
                xButton2Pressed,
                xButton2Released,
            }
            export interface IPointerPointProperties {
                contactRect: Windows.Foundation.Rect;
                contactRectRaw: Windows.Foundation.Rect;
                isBarrelButtonPressed: boolean;
                isCanceled: boolean;
                isEraser: boolean;
                isHorizontalMouseWheel: boolean;
                isInRange: boolean;
                isInverted: boolean;
                isLeftButtonPressed: boolean;
                isMiddleButtonPressed: boolean;
                isPrimary: boolean;
                isRightButtonPressed: boolean;
                isXButton1Pressed: boolean;
                isXButton2Pressed: boolean;
                mouseWheelDelta: number;
                orientation: number;
                pointerUpdateKind: Windows.UI.Input.PointerUpdateKind;
                pressure: number;
                touchConfidence: boolean;
                twist: number;
                xTilt: number;
                yTilt: number;
                hasUsage(usagePage: number, usageId: number): boolean;
                getUsageValue(usagePage: number, usageId: number): number;
            }
            export interface IPointerVisualizationSettings {
                isBarrelButtonFeedbackEnabled: boolean;
                isContactFeedbackEnabled: boolean;
            }
            export interface IPointerVisualizationSettingsStatics {
                getForCurrentView(): Windows.UI.Input.PointerVisualizationSettings;
            }
            export class PointerVisualizationSettings implements Windows.UI.Input.IPointerVisualizationSettings {
                isBarrelButtonFeedbackEnabled: boolean;
                isContactFeedbackEnabled: boolean;
                static getForCurrentView(): Windows.UI.Input.PointerVisualizationSettings;
            }
        }
    }
}
declare module Windows {
    export module UI {
        export module Popups {
            export enum MessageDialogOptions {
                none,
                acceptUserInputAfterDelay,
            }
            export interface IMessageDialog {
                cancelCommandIndex: number;
                commands: Windows.Foundation.Collections.IVector<Windows.UI.Popups.IUICommand>;
                content: string;
                defaultCommandIndex: number;
                options: Windows.UI.Popups.MessageDialogOptions;
                title: string;
                showAsync(): Windows.Foundation.IAsyncOperation<Windows.UI.Popups.IUICommand>;
            }
            export interface IMessageDialogFactory {
                create(content: string): Windows.UI.Popups.MessageDialog;
                createWithTitle(content: string, title: string): Windows.UI.Popups.MessageDialog;
            }
            export class MessageDialog implements Windows.UI.Popups.IMessageDialog {
                constructor(content: string);
                constructor(content: string, title: string);
                cancelCommandIndex: number;
                commands: Windows.Foundation.Collections.IVector<Windows.UI.Popups.IUICommand>;
                content: string;
                defaultCommandIndex: number;
                options: Windows.UI.Popups.MessageDialogOptions;
                title: string;
                showAsync(): Windows.Foundation.IAsyncOperation<Windows.UI.Popups.IUICommand>;
            }
            export enum Placement {
                default,
                above,
                below,
                left,
                right,
            }
            export interface UICommandInvokedHandler {
                (command: Windows.UI.Popups.IUICommand): void;
            }
            export interface IUICommand {
                id: any;
                invoked: Windows.UI.Popups.UICommandInvokedHandler;
                label: string;
            }
            export interface IUICommandFactory {
                create(label: string): Windows.UI.Popups.UICommand;
                createWithHandler(label: string, action: Windows.UI.Popups.UICommandInvokedHandler): Windows.UI.Popups.UICommand;
                createWithHandlerAndId(label: string, action: Windows.UI.Popups.UICommandInvokedHandler, commandId: any): Windows.UI.Popups.UICommand;
            }
            export class UICommand implements Windows.UI.Popups.IUICommand {
                constructor(label: string);
                constructor(label: string, action: Windows.UI.Popups.UICommandInvokedHandler);
                constructor(label: string, action: Windows.UI.Popups.UICommandInvokedHandler, commandId: any);
                constructor();
                id: any;
                invoked: Windows.UI.Popups.UICommandInvokedHandler;
                label: string;
            }
            export class UICommandSeparator implements Windows.UI.Popups.IUICommand {
                id: any;
                invoked: Windows.UI.Popups.UICommandInvokedHandler;
                label: string;
            }
            export interface IPopupMenu {
                commands: Windows.Foundation.Collections.IVector<Windows.UI.Popups.IUICommand>;
                showAsync(invocationPoint: Windows.Foundation.Point): Windows.Foundation.IAsyncOperation<Windows.UI.Popups.IUICommand>;
                showForSelectionAsync(selection: Windows.Foundation.Rect): Windows.Foundation.IAsyncOperation<Windows.UI.Popups.IUICommand>;
                showForSelectionAsync(selection: Windows.Foundation.Rect, preferredPlacement: Windows.UI.Popups.Placement): Windows.Foundation.IAsyncOperation<Windows.UI.Popups.IUICommand>;
            }
            export class PopupMenu implements Windows.UI.Popups.IPopupMenu {
                commands: Windows.Foundation.Collections.IVector<Windows.UI.Popups.IUICommand>;
                showAsync(invocationPoint: Windows.Foundation.Point): Windows.Foundation.IAsyncOperation<Windows.UI.Popups.IUICommand>;
                showForSelectionAsync(selection: Windows.Foundation.Rect): Windows.Foundation.IAsyncOperation<Windows.UI.Popups.IUICommand>;
                showForSelectionAsync(selection: Windows.Foundation.Rect, preferredPlacement: Windows.UI.Popups.Placement): Windows.Foundation.IAsyncOperation<Windows.UI.Popups.IUICommand>;
            }
        }
    }
}
declare module Windows {
    export module UI {
        export module StartScreen {
            export enum TileOptions {
                none,
                showNameOnLogo,
                showNameOnWideLogo,
                copyOnDeployment,
            }
            export enum ForegroundText {
                dark,
                light,
            }
            export interface ISecondaryTile {
                arguments: string;
                backgroundColor: Windows.UI.Color;
                displayName: string;
                foregroundText: Windows.UI.StartScreen.ForegroundText;
                lockScreenBadgeLogo: Windows.Foundation.Uri;
                lockScreenDisplayBadgeAndTileText: boolean;
                logo: Windows.Foundation.Uri;
                shortName: string;
                smallLogo: Windows.Foundation.Uri;
                tileId: string;
                tileOptions: Windows.UI.StartScreen.TileOptions;
                wideLogo: Windows.Foundation.Uri;
                requestCreateAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                requestCreateAsync(invocationPoint: Windows.Foundation.Point): Windows.Foundation.IAsyncOperation<boolean>;
                requestCreateForSelectionAsync(selection: Windows.Foundation.Rect): Windows.Foundation.IAsyncOperation<boolean>;
                requestCreateForSelectionAsync(selection: Windows.Foundation.Rect, preferredPlacement: Windows.UI.Popups.Placement): Windows.Foundation.IAsyncOperation<boolean>;
                requestDeleteAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                requestDeleteAsync(invocationPoint: Windows.Foundation.Point): Windows.Foundation.IAsyncOperation<boolean>;
                requestDeleteForSelectionAsync(selection: Windows.Foundation.Rect): Windows.Foundation.IAsyncOperation<boolean>;
                requestDeleteForSelectionAsync(selection: Windows.Foundation.Rect, preferredPlacement: Windows.UI.Popups.Placement): Windows.Foundation.IAsyncOperation<boolean>;
                updateAsync(): Windows.Foundation.IAsyncOperation<boolean>;
            }
            export interface ISecondaryTileFactory {
                createTile(tileId: string, shortName: string, displayName: string, arguments: string, tileOptions: Windows.UI.StartScreen.TileOptions, logoReference: Windows.Foundation.Uri): Windows.UI.StartScreen.SecondaryTile;
                createWideTile(tileId: string, shortName: string, displayName: string, arguments: string, tileOptions: Windows.UI.StartScreen.TileOptions, logoReference: Windows.Foundation.Uri, wideLogoReference: Windows.Foundation.Uri): Windows.UI.StartScreen.SecondaryTile;
                createWithId(tileId: string): Windows.UI.StartScreen.SecondaryTile;
            }
            export class SecondaryTile implements Windows.UI.StartScreen.ISecondaryTile {
                constructor(tileId: string, shortName: string, displayName: string, arguments: string, tileOptions: Windows.UI.StartScreen.TileOptions, logoReference: Windows.Foundation.Uri);
                constructor(tileId: string, shortName: string, displayName: string, arguments: string, tileOptions: Windows.UI.StartScreen.TileOptions, logoReference: Windows.Foundation.Uri, wideLogoReference: Windows.Foundation.Uri);
                constructor(tileId: string);
                constructor();
                arguments: string;
                backgroundColor: Windows.UI.Color;
                displayName: string;
                foregroundText: Windows.UI.StartScreen.ForegroundText;
                lockScreenBadgeLogo: Windows.Foundation.Uri;
                lockScreenDisplayBadgeAndTileText: boolean;
                logo: Windows.Foundation.Uri;
                shortName: string;
                smallLogo: Windows.Foundation.Uri;
                tileId: string;
                tileOptions: Windows.UI.StartScreen.TileOptions;
                wideLogo: Windows.Foundation.Uri;
                requestCreateAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                requestCreateAsync(invocationPoint: Windows.Foundation.Point): Windows.Foundation.IAsyncOperation<boolean>;
                requestCreateForSelectionAsync(selection: Windows.Foundation.Rect): Windows.Foundation.IAsyncOperation<boolean>;
                requestCreateForSelectionAsync(selection: Windows.Foundation.Rect, preferredPlacement: Windows.UI.Popups.Placement): Windows.Foundation.IAsyncOperation<boolean>;
                requestDeleteAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                requestDeleteAsync(invocationPoint: Windows.Foundation.Point): Windows.Foundation.IAsyncOperation<boolean>;
                requestDeleteForSelectionAsync(selection: Windows.Foundation.Rect): Windows.Foundation.IAsyncOperation<boolean>;
                requestDeleteForSelectionAsync(selection: Windows.Foundation.Rect, preferredPlacement: Windows.UI.Popups.Placement): Windows.Foundation.IAsyncOperation<boolean>;
                updateAsync(): Windows.Foundation.IAsyncOperation<boolean>;
                static exists(tileId: string): boolean;
                static findAllAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.UI.StartScreen.SecondaryTile>>;
                static findAllAsync(applicationId: string): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.UI.StartScreen.SecondaryTile>>;
                static findAllForPackageAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.UI.StartScreen.SecondaryTile>>;
            }
            export interface ISecondaryTileStatics {
                exists(tileId: string): boolean;
                findAllAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.UI.StartScreen.SecondaryTile>>;
                findAllAsync(applicationId: string): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.UI.StartScreen.SecondaryTile>>;
                findAllForPackageAsync(): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.UI.StartScreen.SecondaryTile>>;
            }
        }
    }
}
declare module Windows {
    export module UI {
        export module Text {
            export enum CaretType {
                normal,
                null_,
            }
            export enum FindOptions {
                none,
                word,
                case_,
            }
            export enum FormatEffect {
                off,
                on,
                toggle,
                undefined,
            }
            export enum HorizontalCharacterAlignment {
                left,
                right,
                center,
            }
            export enum LetterCase {
                lower,
                upper,
            }
            export enum LineSpacingRule {
                undefined,
                single,
                oneAndHalf,
                double,
                atLeast,
                exactly,
                multiple,
                percent,
            }
            export enum LinkType {
                undefined,
                notALink,
                clientLink,
                friendlyLinkName,
                friendlyLinkAddress,
                autoLink,
                autoLinkEmail,
                autoLinkPhone,
                autoLinkPath,
            }
            export enum MarkerAlignment {
                undefined,
                left,
                center,
                right,
            }
            export enum MarkerStyle {
                undefined,
                parenthesis,
                parentheses,
                period,
                plain,
                minus,
                noNumber,
            }
            export enum MarkerType {
                undefined,
                none,
                bullet,
                arabic,
                lowercaseEnglishLetter,
                uppercaseEnglishLetter,
                lowercaseRoman,
                uppercaseRoman,
                unicodeSequence,
                circledNumber,
                blackCircleWingding,
                whiteCircleWingding,
                arabicWide,
                simplifiedChinese,
                traditionalChinese,
                japanSimplifiedChinese,
                japanKorea,
                arabicDictionary,
                arabicAbjad,
                hebrew,
                thaiAlphabetic,
                thaiNumeric,
                devanagariVowel,
                devanagariConsonant,
                devanagariNumeric,
            }
            export enum ParagraphAlignment {
                undefined,
                left,
                center,
                right,
                justify,
            }
            export enum ParagraphStyle {
                undefined,
                none,
                normal,
                heading1,
                heading2,
                heading3,
                heading4,
                heading5,
                heading6,
                heading7,
                heading8,
                heading9,
            }
            export enum PointOptions {
                none,
                includeInset,
                start,
                clientCoordinates,
                allowOffClient,
                transform,
                noHorizontalScroll,
                noVerticalScroll,
            }
            export enum RangeGravity {
                uIBehavior,
                backward,
                forward,
                inward,
                outward,
            }
            export enum SelectionOptions {
                startActive,
                atEndOfLine,
                overtype,
                active,
                replace,
            }
            export enum SelectionType {
                none,
                insertionPoint,
                normal,
                inlineShape,
                shape,
            }
            export enum TabAlignment {
                left,
                center,
                right,
                decimal,
                bar,
            }
            export enum TabLeader {
                spaces,
                dots,
                dashes,
                lines,
                thickLines,
                equals,
            }
            export enum TextGetOptions {
                none,
                adjustCrlf,
                useCrlf,
                useObjectText,
                allowFinalEop,
                noHidden,
                includeNumbering,
                formatRtf,
            }
            export enum TextSetOptions {
                none,
                unicodeBidi,
                unlink,
                unhide,
                checkTextLimit,
                formatRtf,
                applyRtfDocumentDefaults,
            }
            export enum TextRangeUnit {
                character,
                word,
                sentence,
                paragraph,
                line,
                story,
                screen,
                section,
                window,
                characterFormat,
                paragraphFormat,
                object,
                hardParagraph,
                cluster,
                bold,
                italic,
                underline,
                strikethrough,
                protectedText,
                link,
                smallCaps,
                allCaps,
                hidden,
                outline,
                shadow,
                imprint,
                disabled,
                revised,
                subscript,
                superscript,
                fontBound,
                linkProtected,
            }
            export enum TextScript {
                undefined,
                ansi,
                eastEurope,
                cyrillic,
                greek,
                turkish,
                hebrew,
                arabic,
                baltic,
                vietnamese,
                default,
                symbol,
                thai,
                shiftJis,
                gB2312,
                hangul,
                big5,
                pC437,
                oem,
                mac,
                armenian,
                syriac,
                thaana,
                devanagari,
                bengali,
                gurmukhi,
                gujarati,
                oriya,
                tamil,
                telugu,
                kannada,
                malayalam,
                sinhala,
                lao,
                tibetan,
                myanmar,
                georgian,
                jamo,
                ethiopic,
                cherokee,
                aboriginal,
                ogham,
                runic,
                khmer,
                mongolian,
                braille,
                yi,
                limbu,
                taiLe,
                newTaiLue,
                sylotiNagri,
                kharoshthi,
                kayahli,
                unicodeSymbol,
                emoji,
                glagolitic,
                lisu,
                vai,
                nKo,
                osmanya,
                phagsPa,
                gothic,
                deseret,
                tifinagh,
            }
            export enum UnderlineType {
                undefined,
                none,
                single,
                words,
                double,
                dotted,
                dash,
                dashDot,
                dashDotDot,
                wave,
                thick,
                thin,
                doubleWave,
                heavyWave,
                longDash,
                thickDash,
                thickDashDot,
                thickDashDotDot,
                thickDotted,
                thickLongDash,
            }
            export enum VerticalCharacterAlignment {
                top,
                baseline,
                bottom,
            }
            export class TextConstants {
                static autoColor: Windows.UI.Color;
                static maxUnitCount: number;
                static minUnitCount: number;
                static undefinedColor: Windows.UI.Color;
                static undefinedFloatValue: number;
                static undefinedFontStretch: Windows.UI.Text.FontStretch;
                static undefinedFontStyle: Windows.UI.Text.FontStyle;
                static undefinedInt32Value: number;
            }
            export interface ITextConstantsStatics {
                autoColor: Windows.UI.Color;
                maxUnitCount: number;
                minUnitCount: number;
                undefinedColor: Windows.UI.Color;
                undefinedFloatValue: number;
                undefinedFontStretch: Windows.UI.Text.FontStretch;
                undefinedFontStyle: Windows.UI.Text.FontStyle;
                undefinedInt32Value: number;
            }
            export interface ITextDocument {
                caretType: Windows.UI.Text.CaretType;
                defaultTabStop: number;
                selection: Windows.UI.Text.ITextSelection;
                undoLimit: number;
                canCopy(): boolean;
                canPaste(): boolean;
                canRedo(): boolean;
                canUndo(): boolean;
                applyDisplayUpdates(): number;
                batchDisplayUpdates(): number;
                beginUndoGroup(): void;
                endUndoGroup(): void;
                getDefaultCharacterFormat(): Windows.UI.Text.ITextCharacterFormat;
                getDefaultParagraphFormat(): Windows.UI.Text.ITextParagraphFormat;
                getRange(startPosition: number, endPosition: number): Windows.UI.Text.ITextRange;
                getRangeFromPoint(point: Windows.Foundation.Point, options: Windows.UI.Text.PointOptions): Windows.UI.Text.ITextRange;
                getText(options: Windows.UI.Text.TextGetOptions): string;
                loadFromStream(options: Windows.UI.Text.TextSetOptions, value: Windows.Storage.Streams.IRandomAccessStream): void;
                redo(): void;
                saveToStream(options: Windows.UI.Text.TextGetOptions, value: Windows.Storage.Streams.IRandomAccessStream): void;
                setDefaultCharacterFormat(value: Windows.UI.Text.ITextCharacterFormat): void;
                setDefaultParagraphFormat(value: Windows.UI.Text.ITextParagraphFormat): void;
                setText(options: Windows.UI.Text.TextSetOptions, value: string): void;
                undo(): void;
            }
            export interface ITextRange {
                character: string;
                characterFormat: Windows.UI.Text.ITextCharacterFormat;
                endPosition: number;
                formattedText: Windows.UI.Text.ITextRange;
                gravity: Windows.UI.Text.RangeGravity;
                length: number;
                link: string;
                paragraphFormat: Windows.UI.Text.ITextParagraphFormat;
                startPosition: number;
                storyLength: number;
                text: string;
                canPaste(format: number): boolean;
                changeCase(value: Windows.UI.Text.LetterCase): void;
                collapse(value: boolean): void;
                copy(): void;
                cut(): void;
                delete_(unit: Windows.UI.Text.TextRangeUnit, count: number): number;
                endOf(unit: Windows.UI.Text.TextRangeUnit, extend: boolean): number;
                expand(unit: Windows.UI.Text.TextRangeUnit): number;
                findText(value: string, scanLength: number, options: Windows.UI.Text.FindOptions): number;
                getCharacterUtf32(offset: number): number;
                getClone(): Windows.UI.Text.ITextRange;
                getIndex(unit: Windows.UI.Text.TextRangeUnit): number;
                getPoint(horizontalAlign: Windows.UI.Text.HorizontalCharacterAlignment, verticalAlign: Windows.UI.Text.VerticalCharacterAlignment, options: Windows.UI.Text.PointOptions): Windows.Foundation.Point;
                getRect(options: Windows.UI.Text.PointOptions): { rect: Windows.Foundation.Rect; hit: number; };
                getText(options: Windows.UI.Text.TextGetOptions): string;
                getTextViaStream(options: Windows.UI.Text.TextGetOptions, value: Windows.Storage.Streams.IRandomAccessStream): void;
                inRange(range: Windows.UI.Text.ITextRange): boolean;
                insertImage(width: number, height: number, ascent: number, verticalAlign: Windows.UI.Text.VerticalCharacterAlignment, alternateText: string, value: Windows.Storage.Streams.IRandomAccessStream): void;
                inStory(range: Windows.UI.Text.ITextRange): boolean;
                isEqual(range: Windows.UI.Text.ITextRange): boolean;
                move(unit: Windows.UI.Text.TextRangeUnit, count: number): number;
                moveEnd(unit: Windows.UI.Text.TextRangeUnit, count: number): number;
                moveStart(unit: Windows.UI.Text.TextRangeUnit, count: number): number;
                paste(format: number): void;
                scrollIntoView(value: Windows.UI.Text.PointOptions): void;
                matchSelection(): void;
                setIndex(unit: Windows.UI.Text.TextRangeUnit, index: number, extend: boolean): void;
                setPoint(point: Windows.Foundation.Point, options: Windows.UI.Text.PointOptions, extend: boolean): void;
                setRange(startPosition: number, endPosition: number): void;
                setText(options: Windows.UI.Text.TextSetOptions, value: string): void;
                setTextViaStream(options: Windows.UI.Text.TextSetOptions, value: Windows.Storage.Streams.IRandomAccessStream): void;
                startOf(unit: Windows.UI.Text.TextRangeUnit, extend: boolean): number;
            }
            export interface ITextSelection extends Windows.UI.Text.ITextRange {
                options: Windows.UI.Text.SelectionOptions;
                type: Windows.UI.Text.SelectionType;
                endKey(unit: Windows.UI.Text.TextRangeUnit, extend: boolean): number;
                homeKey(unit: Windows.UI.Text.TextRangeUnit, extend: boolean): number;
                moveDown(unit: Windows.UI.Text.TextRangeUnit, count: number, extend: boolean): number;
                moveLeft(unit: Windows.UI.Text.TextRangeUnit, count: number, extend: boolean): number;
                moveRight(unit: Windows.UI.Text.TextRangeUnit, count: number, extend: boolean): number;
                moveUp(unit: Windows.UI.Text.TextRangeUnit, count: number, extend: boolean): number;
                typeText(value: string): void;
            }
            export interface ITextCharacterFormat {
                allCaps: Windows.UI.Text.FormatEffect;
                backgroundColor: Windows.UI.Color;
                bold: Windows.UI.Text.FormatEffect;
                fontStretch: Windows.UI.Text.FontStretch;
                fontStyle: Windows.UI.Text.FontStyle;
                foregroundColor: Windows.UI.Color;
                hidden: Windows.UI.Text.FormatEffect;
                italic: Windows.UI.Text.FormatEffect;
                kerning: number;
                languageTag: string;
                linkType: Windows.UI.Text.LinkType;
                name: string;
                outline: Windows.UI.Text.FormatEffect;
                position: number;
                protectedText: Windows.UI.Text.FormatEffect;
                size: number;
                smallCaps: Windows.UI.Text.FormatEffect;
                spacing: number;
                strikethrough: Windows.UI.Text.FormatEffect;
                subscript: Windows.UI.Text.FormatEffect;
                superscript: Windows.UI.Text.FormatEffect;
                textScript: Windows.UI.Text.TextScript;
                underline: Windows.UI.Text.UnderlineType;
                weight: number;
                setClone(value: Windows.UI.Text.ITextCharacterFormat): void;
                getClone(): Windows.UI.Text.ITextCharacterFormat;
                isEqual(format: Windows.UI.Text.ITextCharacterFormat): boolean;
            }
            export interface ITextParagraphFormat {
                alignment: Windows.UI.Text.ParagraphAlignment;
                firstLineIndent: number;
                keepTogether: Windows.UI.Text.FormatEffect;
                keepWithNext: Windows.UI.Text.FormatEffect;
                leftIndent: number;
                lineSpacing: number;
                lineSpacingRule: Windows.UI.Text.LineSpacingRule;
                listAlignment: Windows.UI.Text.MarkerAlignment;
                listLevelIndex: number;
                listStart: number;
                listStyle: Windows.UI.Text.MarkerStyle;
                listTab: number;
                listType: Windows.UI.Text.MarkerType;
                noLineNumber: Windows.UI.Text.FormatEffect;
                pageBreakBefore: Windows.UI.Text.FormatEffect;
                rightIndent: number;
                rightToLeft: Windows.UI.Text.FormatEffect;
                spaceAfter: number;
                spaceBefore: number;
                style: Windows.UI.Text.ParagraphStyle;
                tabCount: number;
                widowControl: Windows.UI.Text.FormatEffect;
                addTab(position: number, align: Windows.UI.Text.TabAlignment, leader: Windows.UI.Text.TabLeader): void;
                clearAllTabs(): void;
                deleteTab(position: number): void;
                getClone(): Windows.UI.Text.ITextParagraphFormat;
                getTab(index: number): { position: number; align: Windows.UI.Text.TabAlignment; leader: Windows.UI.Text.TabLeader; };
                isEqual(format: Windows.UI.Text.ITextParagraphFormat): boolean;
                setClone(format: Windows.UI.Text.ITextParagraphFormat): void;
                setIndents(start: number, left: number, right: number): void;
                setLineSpacing(rule: Windows.UI.Text.LineSpacingRule, spacing: number): void;
            }
            export enum FontStyle {
                normal,
                oblique,
                italic,
            }
            export enum FontStretch {
                undefined,
                ultraCondensed,
                extraCondensed,
                condensed,
                semiCondensed,
                normal,
                semiExpanded,
                expanded,
                extraExpanded,
                ultraExpanded,
            }
            export interface FontWeight {
                weight: number;
            }
            export interface IFontWeights {
            }
            export interface IFontWeightsStatics {
                black: Windows.UI.Text.FontWeight;
                bold: Windows.UI.Text.FontWeight;
                extraBlack: Windows.UI.Text.FontWeight;
                extraBold: Windows.UI.Text.FontWeight;
                extraLight: Windows.UI.Text.FontWeight;
                light: Windows.UI.Text.FontWeight;
                medium: Windows.UI.Text.FontWeight;
                normal: Windows.UI.Text.FontWeight;
                semiBold: Windows.UI.Text.FontWeight;
                semiLight: Windows.UI.Text.FontWeight;
                thin: Windows.UI.Text.FontWeight;
            }
            export class FontWeights implements Windows.UI.Text.IFontWeights {
                static black: Windows.UI.Text.FontWeight;
                static bold: Windows.UI.Text.FontWeight;
                static extraBlack: Windows.UI.Text.FontWeight;
                static extraBold: Windows.UI.Text.FontWeight;
                static extraLight: Windows.UI.Text.FontWeight;
                static light: Windows.UI.Text.FontWeight;
                static medium: Windows.UI.Text.FontWeight;
                static normal: Windows.UI.Text.FontWeight;
                static semiBold: Windows.UI.Text.FontWeight;
                static semiLight: Windows.UI.Text.FontWeight;
                static thin: Windows.UI.Text.FontWeight;
            }
        }
    }
}
declare module Windows {
    export module UI {
        export module Core {
            export module AnimationMetrics {
                export enum PropertyAnimationType {
                    scale,
                    translation,
                    opacity,
                }
                export interface IPropertyAnimation {
                    control1: Windows.Foundation.Point;
                    control2: Windows.Foundation.Point;
                    delay: number;
                    duration: number;
                    type: Windows.UI.Core.AnimationMetrics.PropertyAnimationType;
                }
                export interface IScaleAnimation extends Windows.UI.Core.AnimationMetrics.IPropertyAnimation {
                    finalScaleX: number;
                    finalScaleY: number;
                    initialScaleX: number;
                    initialScaleY: number;
                    normalizedOrigin: Windows.Foundation.Point;
                }
                export interface IOpacityAnimation extends Windows.UI.Core.AnimationMetrics.IPropertyAnimation {
                    finalOpacity: number;
                    initialOpacity: number;
                }
                export enum AnimationEffect {
                    expand,
                    collapse,
                    reposition,
                    fadeIn,
                    fadeOut,
                    addToList,
                    deleteFromList,
                    addToGrid,
                    deleteFromGrid,
                    addToSearchGrid,
                    deleteFromSearchGrid,
                    addToSearchList,
                    deleteFromSearchList,
                    showEdgeUI,
                    showPanel,
                    hideEdgeUI,
                    hidePanel,
                    showPopup,
                    hidePopup,
                    pointerDown,
                    pointerUp,
                    dragSourceStart,
                    dragSourceEnd,
                    transitionContent,
                    reveal,
                    hide,
                    dragBetweenEnter,
                    dragBetweenLeave,
                    swipeSelect,
                    swipeDeselect,
                    swipeReveal,
                    enterPage,
                    transitionPage,
                    crossFade,
                    peek,
                    updateBadge,
                }
                export enum AnimationEffectTarget {
                    primary,
                    added,
                    affected,
                    background,
                    content,
                    deleted,
                    deselected,
                    dragSource,
                    hidden,
                    incoming,
                    outgoing,
                    outline,
                    remaining,
                    revealed,
                    rowIn,
                    rowOut,
                    selected,
                    selection,
                    shown,
                    tapped,
                }
                export interface IAnimationDescription {
                    animations: Windows.Foundation.Collections.IVectorView<Windows.UI.Core.AnimationMetrics.IPropertyAnimation>;
                    delayLimit: number;
                    staggerDelay: number;
                    staggerDelayFactor: number;
                    zOrder: number;
                }
                export interface IAnimationDescriptionFactory {
                    createInstance(effect: Windows.UI.Core.AnimationMetrics.AnimationEffect, target: Windows.UI.Core.AnimationMetrics.AnimationEffectTarget): Windows.UI.Core.AnimationMetrics.AnimationDescription;
                }
                export class AnimationDescription implements Windows.UI.Core.AnimationMetrics.IAnimationDescription {
                    constructor(effect: Windows.UI.Core.AnimationMetrics.AnimationEffect, target: Windows.UI.Core.AnimationMetrics.AnimationEffectTarget);
                    animations: Windows.Foundation.Collections.IVectorView<Windows.UI.Core.AnimationMetrics.IPropertyAnimation>;
                    delayLimit: number;
                    staggerDelay: number;
                    staggerDelayFactor: number;
                    zOrder: number;
                }
                export class PropertyAnimation implements Windows.UI.Core.AnimationMetrics.IPropertyAnimation {
                    control1: Windows.Foundation.Point;
                    control2: Windows.Foundation.Point;
                    delay: number;
                    duration: number;
                    type: Windows.UI.Core.AnimationMetrics.PropertyAnimationType;
                }
                export class ScaleAnimation implements Windows.UI.Core.AnimationMetrics.IScaleAnimation, Windows.UI.Core.AnimationMetrics.IPropertyAnimation {
                    finalScaleX: number;
                    finalScaleY: number;
                    initialScaleX: number;
                    initialScaleY: number;
                    normalizedOrigin: Windows.Foundation.Point;
                    control1: Windows.Foundation.Point;
                    control2: Windows.Foundation.Point;
                    delay: number;
                    duration: number;
                    type: Windows.UI.Core.AnimationMetrics.PropertyAnimationType;
                }
                export class TranslationAnimation implements Windows.UI.Core.AnimationMetrics.IPropertyAnimation {
                    control1: Windows.Foundation.Point;
                    control2: Windows.Foundation.Point;
                    delay: number;
                    duration: number;
                    type: Windows.UI.Core.AnimationMetrics.PropertyAnimationType;
                }
                export class OpacityAnimation implements Windows.UI.Core.AnimationMetrics.IOpacityAnimation, Windows.UI.Core.AnimationMetrics.IPropertyAnimation {
                    finalOpacity: number;
                    initialOpacity: number;
                    control1: Windows.Foundation.Point;
                    control2: Windows.Foundation.Point;
                    delay: number;
                    duration: number;
                    type: Windows.UI.Core.AnimationMetrics.PropertyAnimationType;
                }
            }
        }
    }
}
declare module Windows {
    export module UI {
        export module Core {
            export enum CoreWindowActivationState {
                codeActivated,
                deactivated,
                pointerActivated,
            }
            export enum CoreCursorType {
                arrow,
                cross,
                custom,
                hand,
                help,
                iBeam,
                sizeAll,
                sizeNortheastSouthwest,
                sizeNorthSouth,
                sizeNorthwestSoutheast,
                sizeWestEast,
                universalNo,
                upArrow,
                wait,
            }
            export enum CoreDispatcherPriority {
                low,
                normal,
                high,
            }
            export enum CoreProcessEventsOption {
                processOneAndAllPending,
                processOneIfPresent,
                processUntilQuit,
                processAllIfPresent,
            }
            export enum CoreWindowFlowDirection {
                leftToRight,
                rightToLeft,
            }
            export enum CoreVirtualKeyStates {
                none,
                down,
                locked,
            }
            export enum CoreAcceleratorKeyEventType {
                character,
                deadCharacter,
                keyDown,
                keyUp,
                systemCharacter,
                systemDeadCharacter,
                systemKeyDown,
                systemKeyUp,
                unicodeCharacter,
            }
            export enum CoreProximityEvaluationScore {
                closest,
                farthest,
            }
            export interface CorePhysicalKeyStatus {
                repeatCount: number;
                scanCode: number;
                isExtendedKey: boolean;
                isMenuKeyDown: boolean;
                wasKeyDown: boolean;
                isKeyReleased: boolean;
            }
            export interface CoreProximityEvaluation {
                score: number;
                adjustedPoint: Windows.Foundation.Point;
            }
            export interface ICoreWindowEventArgs {
                handled: boolean;
            }
            export interface IAutomationProviderRequestedEventArgs extends Windows.UI.Core.ICoreWindowEventArgs {
                automationProvider: any;
            }
            export interface ICharacterReceivedEventArgs extends Windows.UI.Core.ICoreWindowEventArgs {
                keyCode: number;
                keyStatus: Windows.UI.Core.CorePhysicalKeyStatus;
            }
            export interface IInputEnabledEventArgs extends Windows.UI.Core.ICoreWindowEventArgs {
                inputEnabled: boolean;
            }
            export interface IKeyEventArgs extends Windows.UI.Core.ICoreWindowEventArgs {
                keyStatus: Windows.UI.Core.CorePhysicalKeyStatus;
                virtualKey: Windows.System.VirtualKey;
            }
            export interface IPointerEventArgs extends Windows.UI.Core.ICoreWindowEventArgs {
                currentPoint: Windows.UI.Input.PointerPoint;
                keyModifiers: Windows.System.VirtualKeyModifiers;
                getIntermediatePoints(): Windows.Foundation.Collections.IVector<Windows.UI.Input.PointerPoint>;
            }
            export interface ITouchHitTestingEventArgs extends Windows.UI.Core.ICoreWindowEventArgs {
                boundingBox: Windows.Foundation.Rect;
                point: Windows.Foundation.Point;
                proximityEvaluation: Windows.UI.Core.CoreProximityEvaluation;
                evaluateProximity(controlBoundingBox: Windows.Foundation.Rect): Windows.UI.Core.CoreProximityEvaluation;
                evaluateProximity(controlVertices: Windows.Foundation.Point[]): Windows.UI.Core.CoreProximityEvaluation;
            }
            export interface IWindowActivatedEventArgs extends Windows.UI.Core.ICoreWindowEventArgs {
                windowActivationState: Windows.UI.Core.CoreWindowActivationState;
            }
            export interface IWindowSizeChangedEventArgs extends Windows.UI.Core.ICoreWindowEventArgs {
                size: Windows.Foundation.Size;
            }
            export interface IVisibilityChangedEventArgs extends Windows.UI.Core.ICoreWindowEventArgs {
                visible: boolean;
            }
            export interface ICoreWindow {
                automationHostProvider: any;
                bounds: Windows.Foundation.Rect;
                customProperties: Windows.Foundation.Collections.IPropertySet;
                dispatcher: Windows.UI.Core.CoreDispatcher;
                flowDirection: Windows.UI.Core.CoreWindowFlowDirection;
                isInputEnabled: boolean;
                pointerCursor: Windows.UI.Core.CoreCursor;
                pointerPosition: Windows.Foundation.Point;
                visible: boolean;
                activate(): void;
                close(): void;
                getAsyncKeyState(virtualKey: Windows.System.VirtualKey): Windows.UI.Core.CoreVirtualKeyStates;
                getKeyState(virtualKey: Windows.System.VirtualKey): Windows.UI.Core.CoreVirtualKeyStates;
                releasePointerCapture(): void;
                setPointerCapture(): void;
                onactivated: any/* TODO */;
                onautomationproviderrequested: any/* TODO */;
                oncharacterreceived: any/* TODO */;
                onclosed: any/* TODO */;
                oninputenabled: any/* TODO */;
                onkeydown: any/* TODO */;
                onkeyup: any/* TODO */;
                onpointercapturelost: any/* TODO */;
                onpointerentered: any/* TODO */;
                onpointerexited: any/* TODO */;
                onpointermoved: any/* TODO */;
                onpointerpressed: any/* TODO */;
                onpointerreleased: any/* TODO */;
                ontouchhittesting: any/* TODO */;
                onpointerwheelchanged: any/* TODO */;
                onsizechanged: any/* TODO */;
                onvisibilitychanged: any/* TODO */;
            }
            export class CoreDispatcher implements Windows.UI.Core.ICoreDispatcher, Windows.UI.Core.ICoreAcceleratorKeys {
                hasThreadAccess: boolean;
                processEvents(options: Windows.UI.Core.CoreProcessEventsOption): void;
                runAsync(priority: Windows.UI.Core.CoreDispatcherPriority, agileCallback: Windows.UI.Core.DispatchedHandler): Windows.Foundation.IAsyncAction;
                runIdleAsync(agileCallback: Windows.UI.Core.IdleDispatchedHandler): Windows.Foundation.IAsyncAction;
                onacceleratorkeyactivated: any/* TODO */;
            }
            export class CoreCursor implements Windows.UI.Core.ICoreCursor {
                constructor(type: Windows.UI.Core.CoreCursorType, id: number);
                id: number;
                type: Windows.UI.Core.CoreCursorType;
            }
            export class CoreWindow implements Windows.UI.Core.ICoreWindow {
                automationHostProvider: any;
                bounds: Windows.Foundation.Rect;
                customProperties: Windows.Foundation.Collections.IPropertySet;
                dispatcher: Windows.UI.Core.CoreDispatcher;
                flowDirection: Windows.UI.Core.CoreWindowFlowDirection;
                isInputEnabled: boolean;
                pointerCursor: Windows.UI.Core.CoreCursor;
                pointerPosition: Windows.Foundation.Point;
                visible: boolean;
                activate(): void;
                close(): void;
                getAsyncKeyState(virtualKey: Windows.System.VirtualKey): Windows.UI.Core.CoreVirtualKeyStates;
                getKeyState(virtualKey: Windows.System.VirtualKey): Windows.UI.Core.CoreVirtualKeyStates;
                releasePointerCapture(): void;
                setPointerCapture(): void;
                onactivated: any/* TODO */;
                onautomationproviderrequested: any/* TODO */;
                oncharacterreceived: any/* TODO */;
                onclosed: any/* TODO */;
                oninputenabled: any/* TODO */;
                onkeydown: any/* TODO */;
                onkeyup: any/* TODO */;
                onpointercapturelost: any/* TODO */;
                onpointerentered: any/* TODO */;
                onpointerexited: any/* TODO */;
                onpointermoved: any/* TODO */;
                onpointerpressed: any/* TODO */;
                onpointerreleased: any/* TODO */;
                ontouchhittesting: any/* TODO */;
                onpointerwheelchanged: any/* TODO */;
                onsizechanged: any/* TODO */;
                onvisibilitychanged: any/* TODO */;
                static getForCurrentThread(): Windows.UI.Core.CoreWindow;
            }
            export class WindowActivatedEventArgs implements Windows.UI.Core.IWindowActivatedEventArgs, Windows.UI.Core.ICoreWindowEventArgs {
                windowActivationState: Windows.UI.Core.CoreWindowActivationState;
                handled: boolean;
            }
            export class AutomationProviderRequestedEventArgs implements Windows.UI.Core.IAutomationProviderRequestedEventArgs, Windows.UI.Core.ICoreWindowEventArgs {
                automationProvider: any;
                handled: boolean;
            }
            export class CharacterReceivedEventArgs implements Windows.UI.Core.ICharacterReceivedEventArgs, Windows.UI.Core.ICoreWindowEventArgs {
                keyCode: number;
                keyStatus: Windows.UI.Core.CorePhysicalKeyStatus;
                handled: boolean;
            }
            export class CoreWindowEventArgs implements Windows.UI.Core.ICoreWindowEventArgs {
                handled: boolean;
            }
            export class InputEnabledEventArgs implements Windows.UI.Core.IInputEnabledEventArgs, Windows.UI.Core.ICoreWindowEventArgs {
                inputEnabled: boolean;
                handled: boolean;
            }
            export class KeyEventArgs implements Windows.UI.Core.IKeyEventArgs, Windows.UI.Core.ICoreWindowEventArgs {
                keyStatus: Windows.UI.Core.CorePhysicalKeyStatus;
                virtualKey: Windows.System.VirtualKey;
                handled: boolean;
            }
            export class PointerEventArgs implements Windows.UI.Core.IPointerEventArgs, Windows.UI.Core.ICoreWindowEventArgs {
                currentPoint: Windows.UI.Input.PointerPoint;
                keyModifiers: Windows.System.VirtualKeyModifiers;
                handled: boolean;
                getIntermediatePoints(): Windows.Foundation.Collections.IVector<Windows.UI.Input.PointerPoint>;
            }
            export class TouchHitTestingEventArgs implements Windows.UI.Core.ITouchHitTestingEventArgs, Windows.UI.Core.ICoreWindowEventArgs {
                boundingBox: Windows.Foundation.Rect;
                point: Windows.Foundation.Point;
                proximityEvaluation: Windows.UI.Core.CoreProximityEvaluation;
                handled: boolean;
                evaluateProximity(controlBoundingBox: Windows.Foundation.Rect): Windows.UI.Core.CoreProximityEvaluation;
                evaluateProximity(controlVertices: Windows.Foundation.Point[]): Windows.UI.Core.CoreProximityEvaluation;
            }
            export class WindowSizeChangedEventArgs implements Windows.UI.Core.IWindowSizeChangedEventArgs, Windows.UI.Core.ICoreWindowEventArgs {
                size: Windows.Foundation.Size;
                handled: boolean;
            }
            export class VisibilityChangedEventArgs implements Windows.UI.Core.IVisibilityChangedEventArgs, Windows.UI.Core.ICoreWindowEventArgs {
                visible: boolean;
                handled: boolean;
            }
            export interface ICoreWindowStatic {
                getForCurrentThread(): Windows.UI.Core.CoreWindow;
            }
            export interface DispatchedHandler {
                (): void;
            }
            export interface IdleDispatchedHandler {
                (e: Windows.UI.Core.IdleDispatchedHandlerArgs): void;
            }
            export class IdleDispatchedHandlerArgs implements Windows.UI.Core.IIdleDispatchedHandlerArgs {
                isDispatcherIdle: boolean;
            }
            export interface IAcceleratorKeyEventArgs extends Windows.UI.Core.ICoreWindowEventArgs {
                eventType: Windows.UI.Core.CoreAcceleratorKeyEventType;
                keyStatus: Windows.UI.Core.CorePhysicalKeyStatus;
                virtualKey: Windows.System.VirtualKey;
            }
            export interface ICoreAcceleratorKeys {
                onacceleratorkeyactivated: any/* TODO */;
            }
            export class AcceleratorKeyEventArgs implements Windows.UI.Core.IAcceleratorKeyEventArgs, Windows.UI.Core.ICoreWindowEventArgs {
                eventType: Windows.UI.Core.CoreAcceleratorKeyEventType;
                keyStatus: Windows.UI.Core.CorePhysicalKeyStatus;
                virtualKey: Windows.System.VirtualKey;
                handled: boolean;
            }
            export interface ICoreDispatcher extends Windows.UI.Core.ICoreAcceleratorKeys {
                hasThreadAccess: boolean;
                processEvents(options: Windows.UI.Core.CoreProcessEventsOption): void;
                runAsync(priority: Windows.UI.Core.CoreDispatcherPriority, agileCallback: Windows.UI.Core.DispatchedHandler): Windows.Foundation.IAsyncAction;
                runIdleAsync(agileCallback: Windows.UI.Core.IdleDispatchedHandler): Windows.Foundation.IAsyncAction;
            }
            export interface IIdleDispatchedHandlerArgs {
                isDispatcherIdle: boolean;
            }
            export class CoreAcceleratorKeys implements Windows.UI.Core.ICoreAcceleratorKeys {
                onacceleratorkeyactivated: any/* TODO */;
            }
            export interface ICoreCursor {
                id: number;
                type: Windows.UI.Core.CoreCursorType;
            }
            export interface ICoreCursorFactory {
                createCursor(type: Windows.UI.Core.CoreCursorType, id: number): Windows.UI.Core.CoreCursor;
            }
            export interface IInitializeWithCoreWindow {
                initialize(window: Windows.UI.Core.CoreWindow): void;
            }
            export interface ICoreWindowResizeManager {
                notifyLayoutCompleted(): void;
            }
            export interface ICoreWindowResizeManagerStatics {
                getForCurrentView(): Windows.UI.Core.CoreWindowResizeManager;
            }
            export class CoreWindowResizeManager implements Windows.UI.Core.ICoreWindowResizeManager {
                notifyLayoutCompleted(): void;
                static getForCurrentView(): Windows.UI.Core.CoreWindowResizeManager;
            }
            export interface ICoreWindowPopupShowingEventArgs {
                setDesiredSize(value: Windows.Foundation.Size): void;
            }
            export class CoreWindowPopupShowingEventArgs implements Windows.UI.Core.ICoreWindowPopupShowingEventArgs {
                setDesiredSize(value: Windows.Foundation.Size): void;
            }
            export interface ICoreWindowDialog {
                backButtonCommand: Windows.UI.Popups.UICommandInvokedHandler;
                cancelCommandIndex: number;
                commands: Windows.Foundation.Collections.IVector<Windows.UI.Popups.IUICommand>;
                defaultCommandIndex: number;
                isInteractionDelayed: number;
                maxSize: Windows.Foundation.Size;
                minSize: Windows.Foundation.Size;
                title: string;
                onshowing: any/* TODO */;
                showAsync(): Windows.Foundation.IAsyncOperation<Windows.UI.Popups.IUICommand>;
            }
            export interface ICoreWindowDialogFactory {
                createWithTitle(title: string): Windows.UI.Core.CoreWindowDialog;
            }
            export class CoreWindowDialog implements Windows.UI.Core.ICoreWindowDialog {
                constructor(title: string);
                constructor();
                backButtonCommand: Windows.UI.Popups.UICommandInvokedHandler;
                cancelCommandIndex: number;
                commands: Windows.Foundation.Collections.IVector<Windows.UI.Popups.IUICommand>;
                defaultCommandIndex: number;
                isInteractionDelayed: number;
                maxSize: Windows.Foundation.Size;
                minSize: Windows.Foundation.Size;
                title: string;
                onshowing: any/* TODO */;
                showAsync(): Windows.Foundation.IAsyncOperation<Windows.UI.Popups.IUICommand>;
            }
            export interface ICoreWindowFlyout {
                backButtonCommand: Windows.UI.Popups.UICommandInvokedHandler;
                commands: Windows.Foundation.Collections.IVector<Windows.UI.Popups.IUICommand>;
                defaultCommandIndex: number;
                isInteractionDelayed: number;
                maxSize: Windows.Foundation.Size;
                minSize: Windows.Foundation.Size;
                title: string;
                onshowing: any/* TODO */;
                showAsync(): Windows.Foundation.IAsyncOperation<Windows.UI.Popups.IUICommand>;
            }
            export interface ICoreWindowFlyoutFactory {
                create(position: Windows.Foundation.Point): Windows.UI.Core.CoreWindowFlyout;
                createWithTitle(position: Windows.Foundation.Point, title: string): Windows.UI.Core.CoreWindowFlyout;
            }
            export class CoreWindowFlyout implements Windows.UI.Core.ICoreWindowFlyout {
                constructor(position: Windows.Foundation.Point);
                constructor(position: Windows.Foundation.Point, title: string);
                backButtonCommand: Windows.UI.Popups.UICommandInvokedHandler;
                commands: Windows.Foundation.Collections.IVector<Windows.UI.Popups.IUICommand>;
                defaultCommandIndex: number;
                isInteractionDelayed: number;
                maxSize: Windows.Foundation.Size;
                minSize: Windows.Foundation.Size;
                title: string;
                onshowing: any/* TODO */;
                showAsync(): Windows.Foundation.IAsyncOperation<Windows.UI.Popups.IUICommand>;
            }
        }
    }
}
declare module Windows {
    export module UI {
        export module Input {
            export module Inking {
                export enum InkManipulationMode {
                    inking,
                    erasing,
                    selecting,
                }
                export enum InkRecognitionTarget {
                    all,
                    selected,
                    recent,
                }
                export enum PenTipShape {
                    circle,
                    rectangle,
                }
                export interface IInkDrawingAttributes {
                    color: Windows.UI.Color;
                    fitToCurve: boolean;
                    ignorePressure: boolean;
                    penTip: Windows.UI.Input.Inking.PenTipShape;
                    size: Windows.Foundation.Size;
                }
                export class InkDrawingAttributes implements Windows.UI.Input.Inking.IInkDrawingAttributes {
                    color: Windows.UI.Color;
                    fitToCurve: boolean;
                    ignorePressure: boolean;
                    penTip: Windows.UI.Input.Inking.PenTipShape;
                    size: Windows.Foundation.Size;
                }
                export interface IInkStrokeRenderingSegment {
                    bezierControlPoint1: Windows.Foundation.Point;
                    bezierControlPoint2: Windows.Foundation.Point;
                    position: Windows.Foundation.Point;
                    pressure: number;
                    tiltX: number;
                    tiltY: number;
                    twist: number;
                }
                export class InkStrokeRenderingSegment implements Windows.UI.Input.Inking.IInkStrokeRenderingSegment {
                    bezierControlPoint1: Windows.Foundation.Point;
                    bezierControlPoint2: Windows.Foundation.Point;
                    position: Windows.Foundation.Point;
                    pressure: number;
                    tiltX: number;
                    tiltY: number;
                    twist: number;
                }
                export interface IInkStroke {
                    boundingRect: Windows.Foundation.Rect;
                    drawingAttributes: Windows.UI.Input.Inking.InkDrawingAttributes;
                    recognized: boolean;
                    selected: boolean;
                    getRenderingSegments(): Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkStrokeRenderingSegment>;
                    clone(): Windows.UI.Input.Inking.InkStroke;
                }
                export class InkStroke implements Windows.UI.Input.Inking.IInkStroke {
                    boundingRect: Windows.Foundation.Rect;
                    drawingAttributes: Windows.UI.Input.Inking.InkDrawingAttributes;
                    recognized: boolean;
                    selected: boolean;
                    getRenderingSegments(): Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkStrokeRenderingSegment>;
                    clone(): Windows.UI.Input.Inking.InkStroke;
                }
                export interface IInkStrokeBuilder {
                    beginStroke(pointerPoint: Windows.UI.Input.PointerPoint): void;
                    appendToStroke(pointerPoint: Windows.UI.Input.PointerPoint): Windows.UI.Input.PointerPoint;
                    endStroke(pointerPoint: Windows.UI.Input.PointerPoint): Windows.UI.Input.Inking.InkStroke;
                    createStroke(points: Windows.Foundation.Collections.IIterable<Windows.Foundation.Point>): Windows.UI.Input.Inking.InkStroke;
                    setDefaultDrawingAttributes(drawingAttributes: Windows.UI.Input.Inking.InkDrawingAttributes): void;
                }
                export class InkStrokeBuilder implements Windows.UI.Input.Inking.IInkStrokeBuilder {
                    beginStroke(pointerPoint: Windows.UI.Input.PointerPoint): void;
                    appendToStroke(pointerPoint: Windows.UI.Input.PointerPoint): Windows.UI.Input.PointerPoint;
                    endStroke(pointerPoint: Windows.UI.Input.PointerPoint): Windows.UI.Input.Inking.InkStroke;
                    createStroke(points: Windows.Foundation.Collections.IIterable<Windows.Foundation.Point>): Windows.UI.Input.Inking.InkStroke;
                    setDefaultDrawingAttributes(drawingAttributes: Windows.UI.Input.Inking.InkDrawingAttributes): void;
                }
                export interface IInkRecognitionResult {
                    boundingRect: Windows.Foundation.Rect;
                    getTextCandidates(): Windows.Foundation.Collections.IVectorView<string>;
                    getStrokes(): Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkStroke>;
                }
                export class InkRecognitionResult implements Windows.UI.Input.Inking.IInkRecognitionResult {
                    boundingRect: Windows.Foundation.Rect;
                    getTextCandidates(): Windows.Foundation.Collections.IVectorView<string>;
                    getStrokes(): Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkStroke>;
                }
                export interface IInkStrokeContainer {
                    boundingRect: Windows.Foundation.Rect;
                    addStroke(stroke: Windows.UI.Input.Inking.InkStroke): void;
                    deleteSelected(): Windows.Foundation.Rect;
                    moveSelected(translation: Windows.Foundation.Point): Windows.Foundation.Rect;
                    selectWithPolyLine(polyline: Windows.Foundation.Collections.IIterable<Windows.Foundation.Point>): Windows.Foundation.Rect;
                    selectWithLine(from: Windows.Foundation.Point, to: Windows.Foundation.Point): Windows.Foundation.Rect;
                    copySelectedToClipboard(): void;
                    pasteFromClipboard(position: Windows.Foundation.Point): Windows.Foundation.Rect;
                    canPasteFromClipboard(): boolean;
                    loadAsync(inputStream: Windows.Storage.Streams.IInputStream): Windows.Foundation.IAsyncActionWithProgress<number>;
                    saveAsync(outputStream: Windows.Storage.Streams.IOutputStream): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
                    updateRecognitionResults(recognitionResults: Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkRecognitionResult>): void;
                    getStrokes(): Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkStroke>;
                    getRecognitionResults(): Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkRecognitionResult>;
                }
                export class InkStrokeContainer implements Windows.UI.Input.Inking.IInkStrokeContainer {
                    boundingRect: Windows.Foundation.Rect;
                    addStroke(stroke: Windows.UI.Input.Inking.InkStroke): void;
                    deleteSelected(): Windows.Foundation.Rect;
                    moveSelected(translation: Windows.Foundation.Point): Windows.Foundation.Rect;
                    selectWithPolyLine(polyline: Windows.Foundation.Collections.IIterable<Windows.Foundation.Point>): Windows.Foundation.Rect;
                    selectWithLine(from: Windows.Foundation.Point, to: Windows.Foundation.Point): Windows.Foundation.Rect;
                    copySelectedToClipboard(): void;
                    pasteFromClipboard(position: Windows.Foundation.Point): Windows.Foundation.Rect;
                    canPasteFromClipboard(): boolean;
                    loadAsync(inputStream: Windows.Storage.Streams.IInputStream): Windows.Foundation.IAsyncActionWithProgress<number>;
                    saveAsync(outputStream: Windows.Storage.Streams.IOutputStream): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
                    updateRecognitionResults(recognitionResults: Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkRecognitionResult>): void;
                    getStrokes(): Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkStroke>;
                    getRecognitionResults(): Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkRecognitionResult>;
                }
                export interface IInkRecognizer {
                    name: string;
                }
                export class InkRecognizer implements Windows.UI.Input.Inking.IInkRecognizer {
                    name: string;
                }
                export interface IInkRecognizerContainer {
                    setDefaultRecognizer(recognizer: Windows.UI.Input.Inking.InkRecognizer): void;
                    recognizeAsync(strokeCollection: Windows.UI.Input.Inking.InkStrokeContainer, recognitionTarget: Windows.UI.Input.Inking.InkRecognitionTarget): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkRecognitionResult>>;
                    getRecognizers(): Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkRecognizer>;
                }
                export class InkRecognizerContainer implements Windows.UI.Input.Inking.IInkRecognizerContainer {
                    setDefaultRecognizer(recognizer: Windows.UI.Input.Inking.InkRecognizer): void;
                    recognizeAsync(strokeCollection: Windows.UI.Input.Inking.InkStrokeContainer, recognitionTarget: Windows.UI.Input.Inking.InkRecognitionTarget): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkRecognitionResult>>;
                    getRecognizers(): Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkRecognizer>;
                }
                export interface IInkManager extends Windows.UI.Input.Inking.IInkStrokeContainer, Windows.UI.Input.Inking.IInkRecognizerContainer {
                    mode: Windows.UI.Input.Inking.InkManipulationMode;
                    processPointerDown(pointerPoint: Windows.UI.Input.PointerPoint): void;
                    processPointerUpdate(pointerPoint: Windows.UI.Input.PointerPoint): any;
                    processPointerUp(pointerPoint: Windows.UI.Input.PointerPoint): Windows.Foundation.Rect;
                    setDefaultDrawingAttributes(drawingAttributes: Windows.UI.Input.Inking.InkDrawingAttributes): void;
                    recognizeAsync(strokeCollection: Windows.UI.Input.Inking.InkStrokeContainer, recognitionTarget: Windows.UI.Input.Inking.InkRecognitionTarget): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkRecognitionResult>>;
                    recognizeAsync(recognitionTarget: Windows.UI.Input.Inking.InkRecognitionTarget): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkRecognitionResult>>;
                }
                export class InkManager implements Windows.UI.Input.Inking.IInkManager, Windows.UI.Input.Inking.IInkStrokeContainer, Windows.UI.Input.Inking.IInkRecognizerContainer {
                    mode: Windows.UI.Input.Inking.InkManipulationMode;
                    boundingRect: Windows.Foundation.Rect;
                    processPointerDown(pointerPoint: Windows.UI.Input.PointerPoint): void;
                    processPointerUpdate(pointerPoint: Windows.UI.Input.PointerPoint): any;
                    processPointerUp(pointerPoint: Windows.UI.Input.PointerPoint): Windows.Foundation.Rect;
                    setDefaultDrawingAttributes(drawingAttributes: Windows.UI.Input.Inking.InkDrawingAttributes): void;
                    recognizeAsync(recognitionTarget: Windows.UI.Input.Inking.InkRecognitionTarget): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkRecognitionResult>>;
                    addStroke(stroke: Windows.UI.Input.Inking.InkStroke): void;
                    deleteSelected(): Windows.Foundation.Rect;
                    moveSelected(translation: Windows.Foundation.Point): Windows.Foundation.Rect;
                    selectWithPolyLine(polyline: Windows.Foundation.Collections.IIterable<Windows.Foundation.Point>): Windows.Foundation.Rect;
                    selectWithLine(from: Windows.Foundation.Point, to: Windows.Foundation.Point): Windows.Foundation.Rect;
                    copySelectedToClipboard(): void;
                    pasteFromClipboard(position: Windows.Foundation.Point): Windows.Foundation.Rect;
                    canPasteFromClipboard(): boolean;
                    loadAsync(inputStream: Windows.Storage.Streams.IInputStream): Windows.Foundation.IAsyncActionWithProgress<number>;
                    saveAsync(outputStream: Windows.Storage.Streams.IOutputStream): Windows.Foundation.IAsyncOperationWithProgress<number, number>;
                    updateRecognitionResults(recognitionResults: Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkRecognitionResult>): void;
                    getStrokes(): Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkStroke>;
                    getRecognitionResults(): Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkRecognitionResult>;
                    setDefaultRecognizer(recognizer: Windows.UI.Input.Inking.InkRecognizer): void;
                    recognizeAsync(strokeCollection: Windows.UI.Input.Inking.InkStrokeContainer, recognitionTarget: Windows.UI.Input.Inking.InkRecognitionTarget): Windows.Foundation.IAsyncOperation<Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkRecognitionResult>>;
                    getRecognizers(): Windows.Foundation.Collections.IVectorView<Windows.UI.Input.Inking.InkRecognizer>;
                }
            }
        }
    }
}
declare module Windows {
    export module UI {
        export module WebUI {
            export interface IActivatedDeferral {
                complete(): void;
            }
            export class ActivatedDeferral implements Windows.UI.WebUI.IActivatedDeferral {
                complete(): void;
            }
            export interface IActivatedOperation {
                getDeferral(): Windows.UI.WebUI.ActivatedDeferral;
            }
            export class ActivatedOperation implements Windows.UI.WebUI.IActivatedOperation {
                getDeferral(): Windows.UI.WebUI.ActivatedDeferral;
            }
            export interface IActivatedEventArgsDeferral {
                activatedOperation: Windows.UI.WebUI.ActivatedOperation;
            }
            export class WebUILaunchActivatedEventArgs implements Windows.ApplicationModel.Activation.ILaunchActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs, Windows.UI.WebUI.IActivatedEventArgsDeferral {
                arguments: string;
                tileId: string;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
                activatedOperation: Windows.UI.WebUI.ActivatedOperation;
            }
            export class WebUISearchActivatedEventArgs implements Windows.ApplicationModel.Activation.ISearchActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs, Windows.UI.WebUI.IActivatedEventArgsDeferral {
                language: string;
                queryText: string;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
                activatedOperation: Windows.UI.WebUI.ActivatedOperation;
            }
            export class WebUIShareTargetActivatedEventArgs implements Windows.ApplicationModel.Activation.IShareTargetActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs, Windows.UI.WebUI.IActivatedEventArgsDeferral {
                shareOperation: Windows.ApplicationModel.DataTransfer.ShareTarget.ShareOperation;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
                activatedOperation: Windows.UI.WebUI.ActivatedOperation;
            }
            export class WebUIFileActivatedEventArgs implements Windows.ApplicationModel.Activation.IFileActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs, Windows.UI.WebUI.IActivatedEventArgsDeferral {
                files: Windows.Foundation.Collections.IVectorView<Windows.Storage.IStorageItem>;
                verb: string;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
                activatedOperation: Windows.UI.WebUI.ActivatedOperation;
            }
            export class WebUIProtocolActivatedEventArgs implements Windows.ApplicationModel.Activation.IProtocolActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs, Windows.UI.WebUI.IActivatedEventArgsDeferral {
                uri: Windows.Foundation.Uri;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
                activatedOperation: Windows.UI.WebUI.ActivatedOperation;
            }
            export class WebUIFileOpenPickerActivatedEventArgs implements Windows.ApplicationModel.Activation.IFileOpenPickerActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs, Windows.UI.WebUI.IActivatedEventArgsDeferral {
                fileOpenPickerUI: Windows.Storage.Pickers.Provider.FileOpenPickerUI;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
                activatedOperation: Windows.UI.WebUI.ActivatedOperation;
            }
            export class WebUIFileSavePickerActivatedEventArgs implements Windows.ApplicationModel.Activation.IFileSavePickerActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs, Windows.UI.WebUI.IActivatedEventArgsDeferral {
                fileSavePickerUI: Windows.Storage.Pickers.Provider.FileSavePickerUI;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
                activatedOperation: Windows.UI.WebUI.ActivatedOperation;
            }
            export class WebUICachedFileUpdaterActivatedEventArgs implements Windows.ApplicationModel.Activation.ICachedFileUpdaterActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs, Windows.UI.WebUI.IActivatedEventArgsDeferral {
                cachedFileUpdaterUI: Windows.Storage.Provider.CachedFileUpdaterUI;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
                activatedOperation: Windows.UI.WebUI.ActivatedOperation;
            }
            export class WebUIContactPickerActivatedEventArgs implements Windows.ApplicationModel.Activation.IContactPickerActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs, Windows.UI.WebUI.IActivatedEventArgsDeferral {
                contactPickerUI: Windows.ApplicationModel.Contacts.Provider.ContactPickerUI;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
                activatedOperation: Windows.UI.WebUI.ActivatedOperation;
            }
            export class WebUIDeviceActivatedEventArgs implements Windows.ApplicationModel.Activation.IDeviceActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs, Windows.UI.WebUI.IActivatedEventArgsDeferral {
                deviceInformationId: string;
                verb: string;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
                activatedOperation: Windows.UI.WebUI.ActivatedOperation;
            }
            export class WebUIPrintTaskSettingsActivatedEventArgs implements Windows.ApplicationModel.Activation.IPrintTaskSettingsActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs, Windows.UI.WebUI.IActivatedEventArgsDeferral {
                configuration: Windows.Devices.Printers.Extensions.PrintTaskConfiguration;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
                activatedOperation: Windows.UI.WebUI.ActivatedOperation;
            }
            export class WebUICameraSettingsActivatedEventArgs implements Windows.ApplicationModel.Activation.ICameraSettingsActivatedEventArgs, Windows.ApplicationModel.Activation.IActivatedEventArgs, Windows.UI.WebUI.IActivatedEventArgsDeferral {
                videoDeviceController: any;
                videoDeviceExtension: any;
                kind: Windows.ApplicationModel.Activation.ActivationKind;
                previousExecutionState: Windows.ApplicationModel.Activation.ApplicationExecutionState;
                splashScreen: Windows.ApplicationModel.Activation.SplashScreen;
                activatedOperation: Windows.UI.WebUI.ActivatedOperation;
            }
            export interface ActivatedEventHandler {
                (sender: any, eventArgs: Windows.ApplicationModel.Activation.IActivatedEventArgs): void;
            }
            export interface ResumingEventHandler {
                (sender: any): void;
            }
            export interface SuspendingEventHandler {
                (sender: any, e: Windows.ApplicationModel.ISuspendingEventArgs): void;
            }
            export interface NavigatedEventHandler {
                (sender: any, e: Windows.UI.WebUI.IWebUINavigatedEventArgs): void;
            }
            export interface IWebUINavigatedEventArgs {
                navigatedOperation: Windows.UI.WebUI.WebUINavigatedOperation;
            }
            export class WebUINavigatedOperation implements Windows.UI.WebUI.IWebUINavigatedOperation {
                getDeferral(): Windows.UI.WebUI.WebUINavigatedDeferral;
            }
            export class SuspendingDeferral implements Windows.ApplicationModel.ISuspendingDeferral {
                complete(): void;
            }
            export class SuspendingOperation implements Windows.ApplicationModel.ISuspendingOperation {
                deadline: Date;
                getDeferral(): Windows.ApplicationModel.SuspendingDeferral;
            }
            export class SuspendingEventArgs implements Windows.ApplicationModel.ISuspendingEventArgs {
                suspendingOperation: Windows.ApplicationModel.SuspendingOperation;
            }
            export interface IWebUIBackgroundTaskInstance {
                succeeded: boolean;
            }
            export interface IWebUIBackgroundTaskInstanceStatics {
                current: Windows.UI.WebUI.IWebUIBackgroundTaskInstance;
            }
            export class WebUIBackgroundTaskInstanceRuntimeClass implements Windows.UI.WebUI.IWebUIBackgroundTaskInstance, Windows.ApplicationModel.Background.IBackgroundTaskInstance {
                succeeded: boolean;
                instanceId: string;
                progress: number;
                suspendedCount: number;
                task: Windows.ApplicationModel.Background.BackgroundTaskRegistration;
                triggerDetails: any;
                oncanceled: any/* TODO */;
                getDeferral(): Windows.ApplicationModel.Background.BackgroundTaskDeferral;
            }
            export class WebUIBackgroundTaskInstance {
                static current: Windows.UI.WebUI.IWebUIBackgroundTaskInstance;
            }
            export interface IWebUINavigatedDeferral {
                complete(): void;
            }
            export class WebUINavigatedDeferral implements Windows.UI.WebUI.IWebUINavigatedDeferral {
                complete(): void;
            }
            export interface IWebUINavigatedOperation {
                getDeferral(): Windows.UI.WebUI.WebUINavigatedDeferral;
            }
            export class WebUINavigatedEventArgs implements Windows.UI.WebUI.IWebUINavigatedEventArgs {
                navigatedOperation: Windows.UI.WebUI.WebUINavigatedOperation;
            }
            export interface IWebUIActivationStatics {
                onactivated: any/* TODO */;
                onsuspending: any/* TODO */;
                onresuming: any/* TODO */;
                onnavigated: any/* TODO */;
            }
            export class WebUIApplication {
                static onactivated: any/* TODO */;
                static onsuspending: any/* TODO */;
                static onresuming: any/* TODO */;
                static onnavigated: any/* TODO */;
            }
        }
    }
}
declare module Windows {
    export module UI {
        export interface IColors {
        }
        export interface IColorsStatics {
            aliceBlue: Windows.UI.Color;
            antiqueWhite: Windows.UI.Color;
            aqua: Windows.UI.Color;
            aquamarine: Windows.UI.Color;
            azure: Windows.UI.Color;
            beige: Windows.UI.Color;
            bisque: Windows.UI.Color;
            black: Windows.UI.Color;
            blanchedAlmond: Windows.UI.Color;
            blue: Windows.UI.Color;
            blueViolet: Windows.UI.Color;
            brown: Windows.UI.Color;
            burlyWood: Windows.UI.Color;
            cadetBlue: Windows.UI.Color;
            chartreuse: Windows.UI.Color;
            chocolate: Windows.UI.Color;
            coral: Windows.UI.Color;
            cornflowerBlue: Windows.UI.Color;
            cornsilk: Windows.UI.Color;
            crimson: Windows.UI.Color;
            cyan: Windows.UI.Color;
            darkBlue: Windows.UI.Color;
            darkCyan: Windows.UI.Color;
            darkGoldenrod: Windows.UI.Color;
            darkGray: Windows.UI.Color;
            darkGreen: Windows.UI.Color;
            darkKhaki: Windows.UI.Color;
            darkMagenta: Windows.UI.Color;
            darkOliveGreen: Windows.UI.Color;
            darkOrange: Windows.UI.Color;
            darkOrchid: Windows.UI.Color;
            darkRed: Windows.UI.Color;
            darkSalmon: Windows.UI.Color;
            darkSeaGreen: Windows.UI.Color;
            darkSlateBlue: Windows.UI.Color;
            darkSlateGray: Windows.UI.Color;
            darkTurquoise: Windows.UI.Color;
            darkViolet: Windows.UI.Color;
            deepPink: Windows.UI.Color;
            deepSkyBlue: Windows.UI.Color;
            dimGray: Windows.UI.Color;
            dodgerBlue: Windows.UI.Color;
            firebrick: Windows.UI.Color;
            floralWhite: Windows.UI.Color;
            forestGreen: Windows.UI.Color;
            fuchsia: Windows.UI.Color;
            gainsboro: Windows.UI.Color;
            ghostWhite: Windows.UI.Color;
            gold: Windows.UI.Color;
            goldenrod: Windows.UI.Color;
            gray: Windows.UI.Color;
            green: Windows.UI.Color;
            greenYellow: Windows.UI.Color;
            honeydew: Windows.UI.Color;
            hotPink: Windows.UI.Color;
            indianRed: Windows.UI.Color;
            indigo: Windows.UI.Color;
            ivory: Windows.UI.Color;
            khaki: Windows.UI.Color;
            lavender: Windows.UI.Color;
            lavenderBlush: Windows.UI.Color;
            lawnGreen: Windows.UI.Color;
            lemonChiffon: Windows.UI.Color;
            lightBlue: Windows.UI.Color;
            lightCoral: Windows.UI.Color;
            lightCyan: Windows.UI.Color;
            lightGoldenrodYellow: Windows.UI.Color;
            lightGray: Windows.UI.Color;
            lightGreen: Windows.UI.Color;
            lightPink: Windows.UI.Color;
            lightSalmon: Windows.UI.Color;
            lightSeaGreen: Windows.UI.Color;
            lightSkyBlue: Windows.UI.Color;
            lightSlateGray: Windows.UI.Color;
            lightSteelBlue: Windows.UI.Color;
            lightYellow: Windows.UI.Color;
            lime: Windows.UI.Color;
            limeGreen: Windows.UI.Color;
            linen: Windows.UI.Color;
            magenta: Windows.UI.Color;
            maroon: Windows.UI.Color;
            mediumAquamarine: Windows.UI.Color;
            mediumBlue: Windows.UI.Color;
            mediumOrchid: Windows.UI.Color;
            mediumPurple: Windows.UI.Color;
            mediumSeaGreen: Windows.UI.Color;
            mediumSlateBlue: Windows.UI.Color;
            mediumSpringGreen: Windows.UI.Color;
            mediumTurquoise: Windows.UI.Color;
            mediumVioletRed: Windows.UI.Color;
            midnightBlue: Windows.UI.Color;
            mintCream: Windows.UI.Color;
            mistyRose: Windows.UI.Color;
            moccasin: Windows.UI.Color;
            navajoWhite: Windows.UI.Color;
            navy: Windows.UI.Color;
            oldLace: Windows.UI.Color;
            olive: Windows.UI.Color;
            oliveDrab: Windows.UI.Color;
            orange: Windows.UI.Color;
            orangeRed: Windows.UI.Color;
            orchid: Windows.UI.Color;
            paleGoldenrod: Windows.UI.Color;
            paleGreen: Windows.UI.Color;
            paleTurquoise: Windows.UI.Color;
            paleVioletRed: Windows.UI.Color;
            papayaWhip: Windows.UI.Color;
            peachPuff: Windows.UI.Color;
            peru: Windows.UI.Color;
            pink: Windows.UI.Color;
            plum: Windows.UI.Color;
            powderBlue: Windows.UI.Color;
            purple: Windows.UI.Color;
            red: Windows.UI.Color;
            rosyBrown: Windows.UI.Color;
            royalBlue: Windows.UI.Color;
            saddleBrown: Windows.UI.Color;
            salmon: Windows.UI.Color;
            sandyBrown: Windows.UI.Color;
            seaGreen: Windows.UI.Color;
            seaShell: Windows.UI.Color;
            sienna: Windows.UI.Color;
            silver: Windows.UI.Color;
            skyBlue: Windows.UI.Color;
            slateBlue: Windows.UI.Color;
            slateGray: Windows.UI.Color;
            snow: Windows.UI.Color;
            springGreen: Windows.UI.Color;
            steelBlue: Windows.UI.Color;
            tan: Windows.UI.Color;
            teal: Windows.UI.Color;
            thistle: Windows.UI.Color;
            tomato: Windows.UI.Color;
            transparent: Windows.UI.Color;
            turquoise: Windows.UI.Color;
            violet: Windows.UI.Color;
            wheat: Windows.UI.Color;
            white: Windows.UI.Color;
            whiteSmoke: Windows.UI.Color;
            yellow: Windows.UI.Color;
            yellowGreen: Windows.UI.Color;
        }
        export class Colors implements Windows.UI.IColors {
            static aliceBlue: Windows.UI.Color;
            static antiqueWhite: Windows.UI.Color;
            static aqua: Windows.UI.Color;
            static aquamarine: Windows.UI.Color;
            static azure: Windows.UI.Color;
            static beige: Windows.UI.Color;
            static bisque: Windows.UI.Color;
            static black: Windows.UI.Color;
            static blanchedAlmond: Windows.UI.Color;
            static blue: Windows.UI.Color;
            static blueViolet: Windows.UI.Color;
            static brown: Windows.UI.Color;
            static burlyWood: Windows.UI.Color;
            static cadetBlue: Windows.UI.Color;
            static chartreuse: Windows.UI.Color;
            static chocolate: Windows.UI.Color;
            static coral: Windows.UI.Color;
            static cornflowerBlue: Windows.UI.Color;
            static cornsilk: Windows.UI.Color;
            static crimson: Windows.UI.Color;
            static cyan: Windows.UI.Color;
            static darkBlue: Windows.UI.Color;
            static darkCyan: Windows.UI.Color;
            static darkGoldenrod: Windows.UI.Color;
            static darkGray: Windows.UI.Color;
            static darkGreen: Windows.UI.Color;
            static darkKhaki: Windows.UI.Color;
            static darkMagenta: Windows.UI.Color;
            static darkOliveGreen: Windows.UI.Color;
            static darkOrange: Windows.UI.Color;
            static darkOrchid: Windows.UI.Color;
            static darkRed: Windows.UI.Color;
            static darkSalmon: Windows.UI.Color;
            static darkSeaGreen: Windows.UI.Color;
            static darkSlateBlue: Windows.UI.Color;
            static darkSlateGray: Windows.UI.Color;
            static darkTurquoise: Windows.UI.Color;
            static darkViolet: Windows.UI.Color;
            static deepPink: Windows.UI.Color;
            static deepSkyBlue: Windows.UI.Color;
            static dimGray: Windows.UI.Color;
            static dodgerBlue: Windows.UI.Color;
            static firebrick: Windows.UI.Color;
            static floralWhite: Windows.UI.Color;
            static forestGreen: Windows.UI.Color;
            static fuchsia: Windows.UI.Color;
            static gainsboro: Windows.UI.Color;
            static ghostWhite: Windows.UI.Color;
            static gold: Windows.UI.Color;
            static goldenrod: Windows.UI.Color;
            static gray: Windows.UI.Color;
            static green: Windows.UI.Color;
            static greenYellow: Windows.UI.Color;
            static honeydew: Windows.UI.Color;
            static hotPink: Windows.UI.Color;
            static indianRed: Windows.UI.Color;
            static indigo: Windows.UI.Color;
            static ivory: Windows.UI.Color;
            static khaki: Windows.UI.Color;
            static lavender: Windows.UI.Color;
            static lavenderBlush: Windows.UI.Color;
            static lawnGreen: Windows.UI.Color;
            static lemonChiffon: Windows.UI.Color;
            static lightBlue: Windows.UI.Color;
            static lightCoral: Windows.UI.Color;
            static lightCyan: Windows.UI.Color;
            static lightGoldenrodYellow: Windows.UI.Color;
            static lightGray: Windows.UI.Color;
            static lightGreen: Windows.UI.Color;
            static lightPink: Windows.UI.Color;
            static lightSalmon: Windows.UI.Color;
            static lightSeaGreen: Windows.UI.Color;
            static lightSkyBlue: Windows.UI.Color;
            static lightSlateGray: Windows.UI.Color;
            static lightSteelBlue: Windows.UI.Color;
            static lightYellow: Windows.UI.Color;
            static lime: Windows.UI.Color;
            static limeGreen: Windows.UI.Color;
            static linen: Windows.UI.Color;
            static magenta: Windows.UI.Color;
            static maroon: Windows.UI.Color;
            static mediumAquamarine: Windows.UI.Color;
            static mediumBlue: Windows.UI.Color;
            static mediumOrchid: Windows.UI.Color;
            static mediumPurple: Windows.UI.Color;
            static mediumSeaGreen: Windows.UI.Color;
            static mediumSlateBlue: Windows.UI.Color;
            static mediumSpringGreen: Windows.UI.Color;
            static mediumTurquoise: Windows.UI.Color;
            static mediumVioletRed: Windows.UI.Color;
            static midnightBlue: Windows.UI.Color;
            static mintCream: Windows.UI.Color;
            static mistyRose: Windows.UI.Color;
            static moccasin: Windows.UI.Color;
            static navajoWhite: Windows.UI.Color;
            static navy: Windows.UI.Color;
            static oldLace: Windows.UI.Color;
            static olive: Windows.UI.Color;
            static oliveDrab: Windows.UI.Color;
            static orange: Windows.UI.Color;
            static orangeRed: Windows.UI.Color;
            static orchid: Windows.UI.Color;
            static paleGoldenrod: Windows.UI.Color;
            static paleGreen: Windows.UI.Color;
            static paleTurquoise: Windows.UI.Color;
            static paleVioletRed: Windows.UI.Color;
            static papayaWhip: Windows.UI.Color;
            static peachPuff: Windows.UI.Color;
            static peru: Windows.UI.Color;
            static pink: Windows.UI.Color;
            static plum: Windows.UI.Color;
            static powderBlue: Windows.UI.Color;
            static purple: Windows.UI.Color;
            static red: Windows.UI.Color;
            static rosyBrown: Windows.UI.Color;
            static royalBlue: Windows.UI.Color;
            static saddleBrown: Windows.UI.Color;
            static salmon: Windows.UI.Color;
            static sandyBrown: Windows.UI.Color;
            static seaGreen: Windows.UI.Color;
            static seaShell: Windows.UI.Color;
            static sienna: Windows.UI.Color;
            static silver: Windows.UI.Color;
            static skyBlue: Windows.UI.Color;
            static slateBlue: Windows.UI.Color;
            static slateGray: Windows.UI.Color;
            static snow: Windows.UI.Color;
            static springGreen: Windows.UI.Color;
            static steelBlue: Windows.UI.Color;
            static tan: Windows.UI.Color;
            static teal: Windows.UI.Color;
            static thistle: Windows.UI.Color;
            static tomato: Windows.UI.Color;
            static transparent: Windows.UI.Color;
            static turquoise: Windows.UI.Color;
            static violet: Windows.UI.Color;
            static wheat: Windows.UI.Color;
            static white: Windows.UI.Color;
            static whiteSmoke: Windows.UI.Color;
            static yellow: Windows.UI.Color;
            static yellowGreen: Windows.UI.Color;
        }
        export interface Color {
            a: number;
            r: number;
            g: number;
            b: number;
        }
        export interface IColorHelper {
        }
        export interface IColorHelperStatics {
            fromArgb(a: number, r: number, g: number, b: number): Windows.UI.Color;
        }
        export class ColorHelper implements Windows.UI.IColorHelper {
            static fromArgb(a: number, r: number, g: number, b: number): Windows.UI.Color;
        }
    }
}
declare module Windows {
    export module UI {
        export module Notifications {
            export enum NotificationSetting {
                enabled,
                disabledForApplication,
                disabledForUser,
                disabledByGroupPolicy,
                disabledByManifest,
            }
            export enum ToastDismissalReason {
                userCanceled,
                applicationHidden,
                timedOut,
            }
            export enum BadgeTemplateType {
                badgeGlyph,
                badgeNumber,
            }
            export enum TileTemplateType {
                tileSquareImage,
                tileSquareBlock,
                tileSquareText01,
                tileSquareText02,
                tileSquareText03,
                tileSquareText04,
                tileSquarePeekImageAndText01,
                tileSquarePeekImageAndText02,
                tileSquarePeekImageAndText03,
                tileSquarePeekImageAndText04,
                tileWideImage,
                tileWideImageCollection,
                tileWideImageAndText01,
                tileWideImageAndText02,
                tileWideBlockAndText01,
                tileWideBlockAndText02,
                tileWidePeekImageCollection01,
                tileWidePeekImageCollection02,
                tileWidePeekImageCollection03,
                tileWidePeekImageCollection04,
                tileWidePeekImageCollection05,
                tileWidePeekImageCollection06,
                tileWidePeekImageAndText01,
                tileWidePeekImageAndText02,
                tileWidePeekImage01,
                tileWidePeekImage02,
                tileWidePeekImage03,
                tileWidePeekImage04,
                tileWidePeekImage05,
                tileWidePeekImage06,
                tileWideSmallImageAndText01,
                tileWideSmallImageAndText02,
                tileWideSmallImageAndText03,
                tileWideSmallImageAndText04,
                tileWideSmallImageAndText05,
                tileWideText01,
                tileWideText02,
                tileWideText03,
                tileWideText04,
                tileWideText05,
                tileWideText06,
                tileWideText07,
                tileWideText08,
                tileWideText09,
                tileWideText10,
                tileWideText11,
            }
            export enum ToastTemplateType {
                toastImageAndText01,
                toastImageAndText02,
                toastImageAndText03,
                toastImageAndText04,
                toastText01,
                toastText02,
                toastText03,
                toastText04,
            }
            export enum PeriodicUpdateRecurrence {
                halfHour,
                hour,
                sixHours,
                twelveHours,
                daily,
            }
            export interface IToastDismissedEventArgs {
                reason: Windows.UI.Notifications.ToastDismissalReason;
            }
            export interface IToastFailedEventArgs {
                errorCode: number;
            }
            export interface ITileUpdateManagerStatics {
                createTileUpdaterForApplication(): Windows.UI.Notifications.TileUpdater;
                createTileUpdaterForApplication(applicationId: string): Windows.UI.Notifications.TileUpdater;
                createTileUpdaterForSecondaryTile(tileId: string): Windows.UI.Notifications.TileUpdater;
                getTemplateContent(type: Windows.UI.Notifications.TileTemplateType): Windows.Data.Xml.Dom.XmlDocument;
            }
            export class TileUpdater implements Windows.UI.Notifications.ITileUpdater {
                setting: Windows.UI.Notifications.NotificationSetting;
                update(notification: Windows.UI.Notifications.TileNotification): void;
                clear(): void;
                enableNotificationQueue(enable: boolean): void;
                addToSchedule(scheduledTile: Windows.UI.Notifications.ScheduledTileNotification): void;
                removeFromSchedule(scheduledTile: Windows.UI.Notifications.ScheduledTileNotification): void;
                getScheduledTileNotifications(): Windows.Foundation.Collections.IVectorView<Windows.UI.Notifications.ScheduledTileNotification>;
                startPeriodicUpdate(tileContent: Windows.Foundation.Uri, requestedInterval: Windows.UI.Notifications.PeriodicUpdateRecurrence): void;
                startPeriodicUpdate(tileContent: Windows.Foundation.Uri, startTime: Date, requestedInterval: Windows.UI.Notifications.PeriodicUpdateRecurrence): void;
                stopPeriodicUpdate(): void;
                startPeriodicUpdateBatch(tileContents: Windows.Foundation.Collections.IIterable<Windows.Foundation.Uri>, requestedInterval: Windows.UI.Notifications.PeriodicUpdateRecurrence): void;
                startPeriodicUpdateBatch(tileContents: Windows.Foundation.Collections.IIterable<Windows.Foundation.Uri>, startTime: Date, requestedInterval: Windows.UI.Notifications.PeriodicUpdateRecurrence): void;
            }
            export interface ITileUpdater {
                setting: Windows.UI.Notifications.NotificationSetting;
                update(notification: Windows.UI.Notifications.TileNotification): void;
                clear(): void;
                enableNotificationQueue(enable: boolean): void;
                addToSchedule(scheduledTile: Windows.UI.Notifications.ScheduledTileNotification): void;
                removeFromSchedule(scheduledTile: Windows.UI.Notifications.ScheduledTileNotification): void;
                getScheduledTileNotifications(): Windows.Foundation.Collections.IVectorView<Windows.UI.Notifications.ScheduledTileNotification>;
                startPeriodicUpdate(tileContent: Windows.Foundation.Uri, requestedInterval: Windows.UI.Notifications.PeriodicUpdateRecurrence): void;
                startPeriodicUpdate(tileContent: Windows.Foundation.Uri, startTime: Date, requestedInterval: Windows.UI.Notifications.PeriodicUpdateRecurrence): void;
                stopPeriodicUpdate(): void;
                startPeriodicUpdateBatch(tileContents: Windows.Foundation.Collections.IIterable<Windows.Foundation.Uri>, requestedInterval: Windows.UI.Notifications.PeriodicUpdateRecurrence): void;
                startPeriodicUpdateBatch(tileContents: Windows.Foundation.Collections.IIterable<Windows.Foundation.Uri>, startTime: Date, requestedInterval: Windows.UI.Notifications.PeriodicUpdateRecurrence): void;
            }
            export class TileNotification implements Windows.UI.Notifications.ITileNotification {
                constructor(content: Windows.Data.Xml.Dom.XmlDocument);
                content: Windows.Data.Xml.Dom.XmlDocument;
                expirationTime: Date;
                tag: string;
            }
            export class ScheduledTileNotification implements Windows.UI.Notifications.IScheduledTileNotification {
                constructor(content: Windows.Data.Xml.Dom.XmlDocument, deliveryTime: Date);
                content: Windows.Data.Xml.Dom.XmlDocument;
                deliveryTime: Date;
                expirationTime: Date;
                id: string;
                tag: string;
            }
            export interface IBadgeUpdateManagerStatics {
                createBadgeUpdaterForApplication(): Windows.UI.Notifications.BadgeUpdater;
                createBadgeUpdaterForApplication(applicationId: string): Windows.UI.Notifications.BadgeUpdater;
                createBadgeUpdaterForSecondaryTile(tileId: string): Windows.UI.Notifications.BadgeUpdater;
                getTemplateContent(type: Windows.UI.Notifications.BadgeTemplateType): Windows.Data.Xml.Dom.XmlDocument;
            }
            export class BadgeUpdater implements Windows.UI.Notifications.IBadgeUpdater {
                update(notification: Windows.UI.Notifications.BadgeNotification): void;
                clear(): void;
                startPeriodicUpdate(badgeContent: Windows.Foundation.Uri, requestedInterval: Windows.UI.Notifications.PeriodicUpdateRecurrence): void;
                startPeriodicUpdate(badgeContent: Windows.Foundation.Uri, startTime: Date, requestedInterval: Windows.UI.Notifications.PeriodicUpdateRecurrence): void;
                stopPeriodicUpdate(): void;
            }
            export interface IBadgeUpdater {
                update(notification: Windows.UI.Notifications.BadgeNotification): void;
                clear(): void;
                startPeriodicUpdate(badgeContent: Windows.Foundation.Uri, requestedInterval: Windows.UI.Notifications.PeriodicUpdateRecurrence): void;
                startPeriodicUpdate(badgeContent: Windows.Foundation.Uri, startTime: Date, requestedInterval: Windows.UI.Notifications.PeriodicUpdateRecurrence): void;
                stopPeriodicUpdate(): void;
            }
            export class BadgeNotification implements Windows.UI.Notifications.IBadgeNotification {
                constructor(content: Windows.Data.Xml.Dom.XmlDocument);
                content: Windows.Data.Xml.Dom.XmlDocument;
                expirationTime: Date;
            }
            export interface IToastNotificationManagerStatics {
                createToastNotifier(): Windows.UI.Notifications.ToastNotifier;
                createToastNotifier(applicationId: string): Windows.UI.Notifications.ToastNotifier;
                getTemplateContent(type: Windows.UI.Notifications.ToastTemplateType): Windows.Data.Xml.Dom.XmlDocument;
            }
            export class ToastNotifier implements Windows.UI.Notifications.IToastNotifier {
                setting: Windows.UI.Notifications.NotificationSetting;
                show(notification: Windows.UI.Notifications.ToastNotification): void;
                hide(notification: Windows.UI.Notifications.ToastNotification): void;
                addToSchedule(scheduledToast: Windows.UI.Notifications.ScheduledToastNotification): void;
                removeFromSchedule(scheduledToast: Windows.UI.Notifications.ScheduledToastNotification): void;
                getScheduledToastNotifications(): Windows.Foundation.Collections.IVectorView<Windows.UI.Notifications.ScheduledToastNotification>;
            }
            export interface IToastNotifier {
                setting: Windows.UI.Notifications.NotificationSetting;
                show(notification: Windows.UI.Notifications.ToastNotification): void;
                hide(notification: Windows.UI.Notifications.ToastNotification): void;
                addToSchedule(scheduledToast: Windows.UI.Notifications.ScheduledToastNotification): void;
                removeFromSchedule(scheduledToast: Windows.UI.Notifications.ScheduledToastNotification): void;
                getScheduledToastNotifications(): Windows.Foundation.Collections.IVectorView<Windows.UI.Notifications.ScheduledToastNotification>;
            }
            export class ToastNotification implements Windows.UI.Notifications.IToastNotification {
                constructor(content: Windows.Data.Xml.Dom.XmlDocument);
                content: Windows.Data.Xml.Dom.XmlDocument;
                expirationTime: Date;
                ondismissed: any/* TODO */;
                onactivated: any/* TODO */;
                onfailed: any/* TODO */;
            }
            export class ScheduledToastNotification implements Windows.UI.Notifications.IScheduledToastNotification {
                constructor(content: Windows.Data.Xml.Dom.XmlDocument, deliveryTime: Date);
                constructor(content: Windows.Data.Xml.Dom.XmlDocument, deliveryTime: Date, snoozeInterval: number, maximumSnoozeCount: number);
                content: Windows.Data.Xml.Dom.XmlDocument;
                deliveryTime: Date;
                id: string;
                maximumSnoozeCount: number;
                snoozeInterval: number;
            }
            export interface ITileNotificationFactory {
                createTileNotification(content: Windows.Data.Xml.Dom.XmlDocument): Windows.UI.Notifications.TileNotification;
            }
            export interface ITileNotification {
                content: Windows.Data.Xml.Dom.XmlDocument;
                expirationTime: Date;
                tag: string;
            }
            export interface IBadgeNotificationFactory {
                createBadgeNotification(content: Windows.Data.Xml.Dom.XmlDocument): Windows.UI.Notifications.BadgeNotification;
            }
            export interface IBadgeNotification {
                content: Windows.Data.Xml.Dom.XmlDocument;
                expirationTime: Date;
            }
            export interface IToastNotificationFactory {
                createToastNotification(content: Windows.Data.Xml.Dom.XmlDocument): Windows.UI.Notifications.ToastNotification;
            }
            export interface IToastNotification {
                content: Windows.Data.Xml.Dom.XmlDocument;
                expirationTime: Date;
                ondismissed: any/* TODO */;
                onactivated: any/* TODO */;
                onfailed: any/* TODO */;
            }
            export class ToastDismissedEventArgs implements Windows.UI.Notifications.IToastDismissedEventArgs {
                reason: Windows.UI.Notifications.ToastDismissalReason;
            }
            export class ToastFailedEventArgs implements Windows.UI.Notifications.IToastFailedEventArgs {
                errorCode: number;
            }
            export interface IScheduledToastNotificationFactory {
                createScheduledToastNotification(content: Windows.Data.Xml.Dom.XmlDocument, deliveryTime: Date): Windows.UI.Notifications.ScheduledToastNotification;
                createScheduledToastNotification(content: Windows.Data.Xml.Dom.XmlDocument, deliveryTime: Date, snoozeInterval: number, maximumSnoozeCount: number): Windows.UI.Notifications.ScheduledToastNotification;
            }
            export interface IScheduledToastNotification {
                content: Windows.Data.Xml.Dom.XmlDocument;
                deliveryTime: Date;
                id: string;
                maximumSnoozeCount: number;
                snoozeInterval: number;
            }
            export interface IScheduledTileNotificationFactory {
                createScheduledTileNotification(content: Windows.Data.Xml.Dom.XmlDocument, deliveryTime: Date): Windows.UI.Notifications.ScheduledTileNotification;
            }
            export interface IScheduledTileNotification {
                content: Windows.Data.Xml.Dom.XmlDocument;
                deliveryTime: Date;
                expirationTime: Date;
                id: string;
                tag: string;
            }
            export class TileUpdateManager {
                static createTileUpdaterForApplication(): Windows.UI.Notifications.TileUpdater;
                static createTileUpdaterForApplication(applicationId: string): Windows.UI.Notifications.TileUpdater;
                static createTileUpdaterForSecondaryTile(tileId: string): Windows.UI.Notifications.TileUpdater;
                static getTemplateContent(type: Windows.UI.Notifications.TileTemplateType): Windows.Data.Xml.Dom.XmlDocument;
            }
            export class BadgeUpdateManager {
                static createBadgeUpdaterForApplication(): Windows.UI.Notifications.BadgeUpdater;
                static createBadgeUpdaterForApplication(applicationId: string): Windows.UI.Notifications.BadgeUpdater;
                static createBadgeUpdaterForSecondaryTile(tileId: string): Windows.UI.Notifications.BadgeUpdater;
                static getTemplateContent(type: Windows.UI.Notifications.BadgeTemplateType): Windows.Data.Xml.Dom.XmlDocument;
            }
            export class ToastNotificationManager {
                static createToastNotifier(): Windows.UI.Notifications.ToastNotifier;
                static createToastNotifier(applicationId: string): Windows.UI.Notifications.ToastNotifier;
                static getTemplateContent(type: Windows.UI.Notifications.ToastTemplateType): Windows.Data.Xml.Dom.XmlDocument;
            }
        }
    }
}
declare module Windows {
    export module Web {
        export enum WebErrorStatus {
            unknown,
            certificateCommonNameIsIncorrect,
            certificateExpired,
            certificateContainsErrors,
            certificateRevoked,
            certificateIsInvalid,
            serverUnreachable,
            timeout,
            errorHttpInvalidServerResponse,
            connectionAborted,
            connectionReset,
            disconnected,
            httpToHttpsOnRedirection,
            httpsToHttpOnRedirection,
            cannotConnect,
            hostNameNotResolved,
            operationCanceled,
            redirectFailed,
            unexpectedStatusCode,
            unexpectedRedirection,
            unexpectedClientError,
            unexpectedServerError,
            multipleChoices,
            movedPermanently,
            found,
            seeOther,
            notModified,
            useProxy,
            temporaryRedirect,
            badRequest,
            unauthorized,
            paymentRequired,
            forbidden,
            notFound,
            methodNotAllowed,
            notAcceptable,
            proxyAuthenticationRequired,
            requestTimeout,
            conflict,
            gone,
            lengthRequired,
            preconditionFailed,
            requestEntityTooLarge,
            requestUriTooLong,
            unsupportedMediaType,
            requestedRangeNotSatisfiable,
            expectationFailed,
            internalServerError,
            notImplemented,
            badGateway,
            serviceUnavailable,
            gatewayTimeout,
            httpVersionNotSupported,
        }
        export interface IWebErrorStatics {
            getStatus(hresult: number): Windows.Web.WebErrorStatus;
        }
        export class WebError {
            static getStatus(hresult: number): Windows.Web.WebErrorStatus;
        }
    }
}
declare module Windows {
    export module Web {
        export module Syndication {
            export interface RetrievalProgress {
                bytesRetrieved: number;
                totalBytesToRetrieve: number;
            }
            export interface TransferProgress {
                bytesSent: number;
                totalBytesToSend: number;
                bytesRetrieved: number;
                totalBytesToRetrieve: number;
            }
            export enum SyndicationFormat {
                atom10,
                rss20,
                rss10,
                rss092,
                rss091,
                atom03,
            }
            export enum SyndicationErrorStatus {
                unknown,
                missingRequiredElement,
                missingRequiredAttribute,
                invalidXml,
                unexpectedContent,
                unsupportedFormat,
            }
            export interface ISyndicationAttribute {
                name: string;
                namespace: string;
                value: string;
            }
            export class SyndicationAttribute implements Windows.Web.Syndication.ISyndicationAttribute {
                constructor(attributeName: string, attributeNamespace: string, attributeValue: string);
                constructor();
                name: string;
                namespace: string;
                value: string;
            }
            export interface ISyndicationAttributeFactory {
                createSyndicationAttribute(attributeName: string, attributeNamespace: string, attributeValue: string): Windows.Web.Syndication.SyndicationAttribute;
            }
            export interface ISyndicationNode {
                attributeExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationAttribute>;
                baseUri: Windows.Foundation.Uri;
                elementExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.ISyndicationNode>;
                language: string;
                nodeName: string;
                nodeNamespace: string;
                nodeValue: string;
                getXmlDocument(format: Windows.Web.Syndication.SyndicationFormat): Windows.Data.Xml.Dom.XmlDocument;
            }
            export class SyndicationNode implements Windows.Web.Syndication.ISyndicationNode {
                constructor(nodeName: string, nodeNamespace: string, nodeValue: string);
                constructor();
                attributeExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationAttribute>;
                baseUri: Windows.Foundation.Uri;
                elementExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.ISyndicationNode>;
                language: string;
                nodeName: string;
                nodeNamespace: string;
                nodeValue: string;
                getXmlDocument(format: Windows.Web.Syndication.SyndicationFormat): Windows.Data.Xml.Dom.XmlDocument;
            }
            export interface ISyndicationNodeFactory {
                createSyndicationNode(nodeName: string, nodeNamespace: string, nodeValue: string): Windows.Web.Syndication.SyndicationNode;
            }
            export interface ISyndicationGenerator {
                text: string;
                uri: Windows.Foundation.Uri;
                version: string;
            }
            export class SyndicationGenerator implements Windows.Web.Syndication.ISyndicationGenerator, Windows.Web.Syndication.ISyndicationNode {
                constructor(text: string);
                constructor();
                text: string;
                uri: Windows.Foundation.Uri;
                version: string;
                attributeExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationAttribute>;
                baseUri: Windows.Foundation.Uri;
                elementExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.ISyndicationNode>;
                language: string;
                nodeName: string;
                nodeNamespace: string;
                nodeValue: string;
                getXmlDocument(format: Windows.Web.Syndication.SyndicationFormat): Windows.Data.Xml.Dom.XmlDocument;
            }
            export interface ISyndicationGeneratorFactory {
                createSyndicationGenerator(text: string): Windows.Web.Syndication.SyndicationGenerator;
            }
            export interface ISyndicationText extends Windows.Web.Syndication.ISyndicationNode {
                text: string;
                type: string;
                xml: Windows.Data.Xml.Dom.XmlDocument;
            }
            export class SyndicationText implements Windows.Web.Syndication.ISyndicationText, Windows.Web.Syndication.ISyndicationNode {
                constructor(text: string);
                constructor(text: string, type: Windows.Web.Syndication.SyndicationTextType);
                constructor();
                text: string;
                type: string;
                xml: Windows.Data.Xml.Dom.XmlDocument;
                attributeExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationAttribute>;
                baseUri: Windows.Foundation.Uri;
                elementExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.ISyndicationNode>;
                language: string;
                nodeName: string;
                nodeNamespace: string;
                nodeValue: string;
                getXmlDocument(format: Windows.Web.Syndication.SyndicationFormat): Windows.Data.Xml.Dom.XmlDocument;
            }
            export enum SyndicationTextType {
                text,
                html,
                xhtml,
            }
            export interface ISyndicationTextFactory {
                createSyndicationText(text: string): Windows.Web.Syndication.SyndicationText;
                createSyndicationText(text: string, type: Windows.Web.Syndication.SyndicationTextType): Windows.Web.Syndication.SyndicationText;
            }
            export interface ISyndicationContent extends Windows.Web.Syndication.ISyndicationText, Windows.Web.Syndication.ISyndicationNode {
                sourceUri: Windows.Foundation.Uri;
            }
            export class SyndicationContent implements Windows.Web.Syndication.ISyndicationText, Windows.Web.Syndication.ISyndicationNode, Windows.Web.Syndication.ISyndicationContent {
                constructor(text: string, type: Windows.Web.Syndication.SyndicationTextType);
                constructor(sourceUri: Windows.Foundation.Uri);
                constructor();
                text: string;
                type: string;
                xml: Windows.Data.Xml.Dom.XmlDocument;
                attributeExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationAttribute>;
                baseUri: Windows.Foundation.Uri;
                elementExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.ISyndicationNode>;
                language: string;
                nodeName: string;
                nodeNamespace: string;
                nodeValue: string;
                sourceUri: Windows.Foundation.Uri;
                getXmlDocument(format: Windows.Web.Syndication.SyndicationFormat): Windows.Data.Xml.Dom.XmlDocument;
            }
            export interface ISyndicationContentFactory {
                createSyndicationContent(text: string, type: Windows.Web.Syndication.SyndicationTextType): Windows.Web.Syndication.SyndicationContent;
                createSyndicationContent(sourceUri: Windows.Foundation.Uri): Windows.Web.Syndication.SyndicationContent;
            }
            export interface ISyndicationLink extends Windows.Web.Syndication.ISyndicationNode {
                length: number;
                mediaType: string;
                relationship: string;
                resourceLanguage: string;
                title: string;
                uri: Windows.Foundation.Uri;
            }
            export class SyndicationLink implements Windows.Web.Syndication.ISyndicationLink, Windows.Web.Syndication.ISyndicationNode {
                constructor(uri: Windows.Foundation.Uri);
                constructor(uri: Windows.Foundation.Uri, relationship: string, title: string, mediaType: string, length: number);
                constructor();
                length: number;
                mediaType: string;
                relationship: string;
                resourceLanguage: string;
                title: string;
                uri: Windows.Foundation.Uri;
                attributeExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationAttribute>;
                baseUri: Windows.Foundation.Uri;
                elementExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.ISyndicationNode>;
                language: string;
                nodeName: string;
                nodeNamespace: string;
                nodeValue: string;
                getXmlDocument(format: Windows.Web.Syndication.SyndicationFormat): Windows.Data.Xml.Dom.XmlDocument;
            }
            export interface ISyndicationLinkFactory {
                createSyndicationLink(uri: Windows.Foundation.Uri): Windows.Web.Syndication.SyndicationLink;
                createSyndicationLink(uri: Windows.Foundation.Uri, relationship: string, title: string, mediaType: string, length: number): Windows.Web.Syndication.SyndicationLink;
            }
            export interface ISyndicationPerson extends Windows.Web.Syndication.ISyndicationNode {
                email: string;
                name: string;
                uri: Windows.Foundation.Uri;
            }
            export class SyndicationPerson implements Windows.Web.Syndication.ISyndicationPerson, Windows.Web.Syndication.ISyndicationNode {
                constructor(name: string);
                constructor(name: string, email: string, uri: Windows.Foundation.Uri);
                constructor();
                email: string;
                name: string;
                uri: Windows.Foundation.Uri;
                attributeExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationAttribute>;
                baseUri: Windows.Foundation.Uri;
                elementExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.ISyndicationNode>;
                language: string;
                nodeName: string;
                nodeNamespace: string;
                nodeValue: string;
                getXmlDocument(format: Windows.Web.Syndication.SyndicationFormat): Windows.Data.Xml.Dom.XmlDocument;
            }
            export interface ISyndicationPersonFactory {
                createSyndicationPerson(name: string): Windows.Web.Syndication.SyndicationPerson;
                createSyndicationPerson(name: string, email: string, uri: Windows.Foundation.Uri): Windows.Web.Syndication.SyndicationPerson;
            }
            export interface ISyndicationCategory extends Windows.Web.Syndication.ISyndicationNode {
                label: string;
                scheme: string;
                term: string;
            }
            export class SyndicationCategory implements Windows.Web.Syndication.ISyndicationCategory, Windows.Web.Syndication.ISyndicationNode {
                constructor(term: string);
                constructor(term: string, scheme: string, label: string);
                constructor();
                label: string;
                scheme: string;
                term: string;
                attributeExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationAttribute>;
                baseUri: Windows.Foundation.Uri;
                elementExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.ISyndicationNode>;
                language: string;
                nodeName: string;
                nodeNamespace: string;
                nodeValue: string;
                getXmlDocument(format: Windows.Web.Syndication.SyndicationFormat): Windows.Data.Xml.Dom.XmlDocument;
            }
            export interface ISyndicationCategoryFactory {
                createSyndicationCategory(term: string): Windows.Web.Syndication.SyndicationCategory;
                createSyndicationCategory(term: string, scheme: string, label: string): Windows.Web.Syndication.SyndicationCategory;
            }
            export interface ISyndicationItem extends Windows.Web.Syndication.ISyndicationNode {
                authors: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationPerson>;
                categories: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationCategory>;
                commentsUri: Windows.Foundation.Uri;
                content: Windows.Web.Syndication.SyndicationContent;
                contributors: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationPerson>;
                eTag: string;
                editMediaUri: Windows.Foundation.Uri;
                editUri: Windows.Foundation.Uri;
                id: string;
                itemUri: Windows.Foundation.Uri;
                lastUpdatedTime: Date;
                links: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationLink>;
                publishedDate: Date;
                rights: Windows.Web.Syndication.ISyndicationText;
                source: Windows.Web.Syndication.SyndicationFeed;
                summary: Windows.Web.Syndication.ISyndicationText;
                title: Windows.Web.Syndication.ISyndicationText;
                load(item: string): void;
                loadFromXml(itemDocument: Windows.Data.Xml.Dom.XmlDocument): void;
            }
            export class SyndicationFeed implements Windows.Web.Syndication.ISyndicationFeed, Windows.Web.Syndication.ISyndicationNode {
                constructor(title: string, subtitle: string, uri: Windows.Foundation.Uri);
                constructor();
                authors: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationPerson>;
                categories: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationCategory>;
                contributors: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationPerson>;
                firstUri: Windows.Foundation.Uri;
                generator: Windows.Web.Syndication.SyndicationGenerator;
                iconUri: Windows.Foundation.Uri;
                id: string;
                imageUri: Windows.Foundation.Uri;
                items: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationItem>;
                lastUpdatedTime: Date;
                lastUri: Windows.Foundation.Uri;
                links: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationLink>;
                nextUri: Windows.Foundation.Uri;
                previousUri: Windows.Foundation.Uri;
                rights: Windows.Web.Syndication.ISyndicationText;
                sourceFormat: Windows.Web.Syndication.SyndicationFormat;
                subtitle: Windows.Web.Syndication.ISyndicationText;
                title: Windows.Web.Syndication.ISyndicationText;
                attributeExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationAttribute>;
                baseUri: Windows.Foundation.Uri;
                elementExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.ISyndicationNode>;
                language: string;
                nodeName: string;
                nodeNamespace: string;
                nodeValue: string;
                load(feed: string): void;
                loadFromXml(feedDocument: Windows.Data.Xml.Dom.XmlDocument): void;
                getXmlDocument(format: Windows.Web.Syndication.SyndicationFormat): Windows.Data.Xml.Dom.XmlDocument;
            }
            export class SyndicationItem implements Windows.Web.Syndication.ISyndicationItem, Windows.Web.Syndication.ISyndicationNode {
                constructor(title: string, content: Windows.Web.Syndication.SyndicationContent, uri: Windows.Foundation.Uri);
                constructor();
                authors: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationPerson>;
                categories: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationCategory>;
                commentsUri: Windows.Foundation.Uri;
                content: Windows.Web.Syndication.SyndicationContent;
                contributors: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationPerson>;
                eTag: string;
                editMediaUri: Windows.Foundation.Uri;
                editUri: Windows.Foundation.Uri;
                id: string;
                itemUri: Windows.Foundation.Uri;
                lastUpdatedTime: Date;
                links: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationLink>;
                publishedDate: Date;
                rights: Windows.Web.Syndication.ISyndicationText;
                source: Windows.Web.Syndication.SyndicationFeed;
                summary: Windows.Web.Syndication.ISyndicationText;
                title: Windows.Web.Syndication.ISyndicationText;
                attributeExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationAttribute>;
                baseUri: Windows.Foundation.Uri;
                elementExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.ISyndicationNode>;
                language: string;
                nodeName: string;
                nodeNamespace: string;
                nodeValue: string;
                load(item: string): void;
                loadFromXml(itemDocument: Windows.Data.Xml.Dom.XmlDocument): void;
                getXmlDocument(format: Windows.Web.Syndication.SyndicationFormat): Windows.Data.Xml.Dom.XmlDocument;
            }
            export interface ISyndicationItemFactory {
                createSyndicationItem(title: string, content: Windows.Web.Syndication.SyndicationContent, uri: Windows.Foundation.Uri): Windows.Web.Syndication.SyndicationItem;
            }
            export interface ISyndicationFeed extends Windows.Web.Syndication.ISyndicationNode {
                authors: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationPerson>;
                categories: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationCategory>;
                contributors: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationPerson>;
                firstUri: Windows.Foundation.Uri;
                generator: Windows.Web.Syndication.SyndicationGenerator;
                iconUri: Windows.Foundation.Uri;
                id: string;
                imageUri: Windows.Foundation.Uri;
                items: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationItem>;
                lastUpdatedTime: Date;
                lastUri: Windows.Foundation.Uri;
                links: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationLink>;
                nextUri: Windows.Foundation.Uri;
                previousUri: Windows.Foundation.Uri;
                rights: Windows.Web.Syndication.ISyndicationText;
                sourceFormat: Windows.Web.Syndication.SyndicationFormat;
                subtitle: Windows.Web.Syndication.ISyndicationText;
                title: Windows.Web.Syndication.ISyndicationText;
                load(feed: string): void;
                loadFromXml(feedDocument: Windows.Data.Xml.Dom.XmlDocument): void;
            }
            export interface ISyndicationFeedFactory {
                createSyndicationFeed(title: string, subtitle: string, uri: Windows.Foundation.Uri): Windows.Web.Syndication.SyndicationFeed;
            }
            export interface ISyndicationClient {
                bypassCacheOnRetrieve: boolean;
                maxResponseBufferSize: number;
                proxyCredential: Windows.Security.Credentials.PasswordCredential;
                serverCredential: Windows.Security.Credentials.PasswordCredential;
                timeout: number;
                setRequestHeader(name: string, value: string): void;
                retrieveFeedAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperationWithProgress<Windows.Web.Syndication.SyndicationFeed, Windows.Web.Syndication.RetrievalProgress>;
            }
            export class SyndicationClient implements Windows.Web.Syndication.ISyndicationClient {
                constructor(serverCredential: Windows.Security.Credentials.PasswordCredential);
                constructor();
                bypassCacheOnRetrieve: boolean;
                maxResponseBufferSize: number;
                proxyCredential: Windows.Security.Credentials.PasswordCredential;
                serverCredential: Windows.Security.Credentials.PasswordCredential;
                timeout: number;
                setRequestHeader(name: string, value: string): void;
                retrieveFeedAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperationWithProgress<Windows.Web.Syndication.SyndicationFeed, Windows.Web.Syndication.RetrievalProgress>;
            }
            export interface ISyndicationClientFactory {
                createSyndicationClient(serverCredential: Windows.Security.Credentials.PasswordCredential): Windows.Web.Syndication.SyndicationClient;
            }
            export interface ISyndicationErrorStatics {
                getStatus(hresult: number): Windows.Web.Syndication.SyndicationErrorStatus;
            }
            export class SyndicationError {
                static getStatus(hresult: number): Windows.Web.Syndication.SyndicationErrorStatus;
            }
        }
    }
}
declare module Windows {
    export module Web {
        export module AtomPub {
            export interface IResourceCollection extends Windows.Web.Syndication.ISyndicationNode {
                accepts: Windows.Foundation.Collections.IVectorView<string>;
                categories: Windows.Foundation.Collections.IVectorView<Windows.Web.Syndication.SyndicationCategory>;
                title: Windows.Web.Syndication.ISyndicationText;
                uri: Windows.Foundation.Uri;
            }
            export class ResourceCollection implements Windows.Web.AtomPub.IResourceCollection, Windows.Web.Syndication.ISyndicationNode {
                accepts: Windows.Foundation.Collections.IVectorView<string>;
                categories: Windows.Foundation.Collections.IVectorView<Windows.Web.Syndication.SyndicationCategory>;
                title: Windows.Web.Syndication.ISyndicationText;
                uri: Windows.Foundation.Uri;
                attributeExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationAttribute>;
                baseUri: Windows.Foundation.Uri;
                elementExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.ISyndicationNode>;
                language: string;
                nodeName: string;
                nodeNamespace: string;
                nodeValue: string;
                getXmlDocument(format: Windows.Web.Syndication.SyndicationFormat): Windows.Data.Xml.Dom.XmlDocument;
            }
            export interface IWorkspace extends Windows.Web.Syndication.ISyndicationNode {
                collections: Windows.Foundation.Collections.IVectorView<Windows.Web.AtomPub.ResourceCollection>;
                title: Windows.Web.Syndication.ISyndicationText;
            }
            export class Workspace implements Windows.Web.AtomPub.IWorkspace, Windows.Web.Syndication.ISyndicationNode {
                collections: Windows.Foundation.Collections.IVectorView<Windows.Web.AtomPub.ResourceCollection>;
                title: Windows.Web.Syndication.ISyndicationText;
                attributeExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationAttribute>;
                baseUri: Windows.Foundation.Uri;
                elementExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.ISyndicationNode>;
                language: string;
                nodeName: string;
                nodeNamespace: string;
                nodeValue: string;
                getXmlDocument(format: Windows.Web.Syndication.SyndicationFormat): Windows.Data.Xml.Dom.XmlDocument;
            }
            export interface IServiceDocument extends Windows.Web.Syndication.ISyndicationNode {
                workspaces: Windows.Foundation.Collections.IVectorView<Windows.Web.AtomPub.Workspace>;
            }
            export class ServiceDocument implements Windows.Web.AtomPub.IServiceDocument, Windows.Web.Syndication.ISyndicationNode {
                workspaces: Windows.Foundation.Collections.IVectorView<Windows.Web.AtomPub.Workspace>;
                attributeExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.SyndicationAttribute>;
                baseUri: Windows.Foundation.Uri;
                elementExtensions: Windows.Foundation.Collections.IVector<Windows.Web.Syndication.ISyndicationNode>;
                language: string;
                nodeName: string;
                nodeNamespace: string;
                nodeValue: string;
                getXmlDocument(format: Windows.Web.Syndication.SyndicationFormat): Windows.Data.Xml.Dom.XmlDocument;
            }
            export interface IAtomPubClient extends Windows.Web.Syndication.ISyndicationClient {
                retrieveServiceDocumentAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperationWithProgress<Windows.Web.AtomPub.ServiceDocument, Windows.Web.Syndication.RetrievalProgress>;
                retrieveMediaResourceAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperationWithProgress<Windows.Storage.Streams.IInputStream, Windows.Web.Syndication.RetrievalProgress>;
                retrieveResourceAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperationWithProgress<Windows.Web.Syndication.SyndicationItem, Windows.Web.Syndication.RetrievalProgress>;
                createResourceAsync(uri: Windows.Foundation.Uri, description: string, item: Windows.Web.Syndication.SyndicationItem): Windows.Foundation.IAsyncOperationWithProgress<Windows.Web.Syndication.SyndicationItem, Windows.Web.Syndication.TransferProgress>;
                createMediaResourceAsync(uri: Windows.Foundation.Uri, mediaType: string, description: string, mediaStream: Windows.Storage.Streams.IInputStream): Windows.Foundation.IAsyncOperationWithProgress<Windows.Web.Syndication.SyndicationItem, Windows.Web.Syndication.TransferProgress>;
                updateMediaResourceAsync(uri: Windows.Foundation.Uri, mediaType: string, mediaStream: Windows.Storage.Streams.IInputStream): Windows.Foundation.IAsyncActionWithProgress<Windows.Web.Syndication.TransferProgress>;
                updateResourceAsync(uri: Windows.Foundation.Uri, item: Windows.Web.Syndication.SyndicationItem): Windows.Foundation.IAsyncActionWithProgress<Windows.Web.Syndication.TransferProgress>;
                updateResourceItemAsync(item: Windows.Web.Syndication.SyndicationItem): Windows.Foundation.IAsyncActionWithProgress<Windows.Web.Syndication.TransferProgress>;
                deleteResourceAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncActionWithProgress<Windows.Web.Syndication.TransferProgress>;
                deleteResourceItemAsync(item: Windows.Web.Syndication.SyndicationItem): Windows.Foundation.IAsyncActionWithProgress<Windows.Web.Syndication.TransferProgress>;
                cancelAsyncOperations(): void;
            }
            export class AtomPubClient implements Windows.Web.AtomPub.IAtomPubClient, Windows.Web.Syndication.ISyndicationClient {
                constructor(serverCredential: Windows.Security.Credentials.PasswordCredential);
                constructor();
                bypassCacheOnRetrieve: boolean;
                maxResponseBufferSize: number;
                proxyCredential: Windows.Security.Credentials.PasswordCredential;
                serverCredential: Windows.Security.Credentials.PasswordCredential;
                timeout: number;
                retrieveServiceDocumentAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperationWithProgress<Windows.Web.AtomPub.ServiceDocument, Windows.Web.Syndication.RetrievalProgress>;
                retrieveMediaResourceAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperationWithProgress<Windows.Storage.Streams.IInputStream, Windows.Web.Syndication.RetrievalProgress>;
                retrieveResourceAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperationWithProgress<Windows.Web.Syndication.SyndicationItem, Windows.Web.Syndication.RetrievalProgress>;
                createResourceAsync(uri: Windows.Foundation.Uri, description: string, item: Windows.Web.Syndication.SyndicationItem): Windows.Foundation.IAsyncOperationWithProgress<Windows.Web.Syndication.SyndicationItem, Windows.Web.Syndication.TransferProgress>;
                createMediaResourceAsync(uri: Windows.Foundation.Uri, mediaType: string, description: string, mediaStream: Windows.Storage.Streams.IInputStream): Windows.Foundation.IAsyncOperationWithProgress<Windows.Web.Syndication.SyndicationItem, Windows.Web.Syndication.TransferProgress>;
                updateMediaResourceAsync(uri: Windows.Foundation.Uri, mediaType: string, mediaStream: Windows.Storage.Streams.IInputStream): Windows.Foundation.IAsyncActionWithProgress<Windows.Web.Syndication.TransferProgress>;
                updateResourceAsync(uri: Windows.Foundation.Uri, item: Windows.Web.Syndication.SyndicationItem): Windows.Foundation.IAsyncActionWithProgress<Windows.Web.Syndication.TransferProgress>;
                updateResourceItemAsync(item: Windows.Web.Syndication.SyndicationItem): Windows.Foundation.IAsyncActionWithProgress<Windows.Web.Syndication.TransferProgress>;
                deleteResourceAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncActionWithProgress<Windows.Web.Syndication.TransferProgress>;
                deleteResourceItemAsync(item: Windows.Web.Syndication.SyndicationItem): Windows.Foundation.IAsyncActionWithProgress<Windows.Web.Syndication.TransferProgress>;
                cancelAsyncOperations(): void;
                setRequestHeader(name: string, value: string): void;
                retrieveFeedAsync(uri: Windows.Foundation.Uri): Windows.Foundation.IAsyncOperationWithProgress<Windows.Web.Syndication.SyndicationFeed, Windows.Web.Syndication.RetrievalProgress>;
            }
            export interface IAtomPubClientFactory {
                createAtomPubClientWithCredentials(serverCredential: Windows.Security.Credentials.PasswordCredential): Windows.Web.AtomPub.AtomPubClient;
            }
        }
    }
}
declare module Windows.Foundation {
    export interface IPromise<T> {
        then<U>(success?: (value: T) => IPromise<U>, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
        then<U>(success?: (value: T) => IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
        then<U>(success?: (value: T) => U, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
        then<U>(success?: (value: T) => U, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
        done?<U>(success?: (value: T) => any, error?: (error: any) => any, progress?: (progress: any) => void ): void;
    }
}
