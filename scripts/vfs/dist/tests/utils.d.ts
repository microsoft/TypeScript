export interface Theory {
    title: string;
    args: any[];
}
export declare function theory(name: string, data: (Theory | any[])[], callback: (...args: any[]) => any): void;
