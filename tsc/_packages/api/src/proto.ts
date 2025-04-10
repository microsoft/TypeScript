export interface ConfigResponse {
    options: Record<string, unknown>;
    fileNames: string[];
}

export interface ProjectResponse {
    id: string;
    configFileName: string;
    compilerOptions: Record<string, unknown>;
    rootFiles: string[];
}

export interface SymbolResponse {
    id: string;
    name: string;
    flags: number;
    checkFlags: number;
}

export interface TypeResponse {
    id: string;
    flags: number;
}
