declare module WinJS {
    class Promise<T> {
        then<U>(success?: (value: T) => Promise<U>, error?: (error: any) => Promise<U>, progress?: (progress: any) => void): Promise<U>;
    }
}
declare module Data {
    export interface IListItem<T> {
        itemIndex: number;
        key: any;
        data: T;
        group: any;
        isHeader: boolean;
        cached: boolean;
        isNonSourceData: boolean;
        preventAugmentation: boolean;
    }
    export interface IVirtualList<T> {
        //removeIndices: WinJS.Promise<IListItem<T>[]>;
        removeIndices(indices: number[], options?: any): WinJS.Promise<IListItem<T>[]>;
    }
    export class VirtualList<T> implements IVirtualList<T> {
        //removeIndices: WinJS.Promise<IListItem<T>[]>;
        public removeIndices(indices: number[], options?: any): WinJS.Promise<IListItem<T>[]>;
    }
}