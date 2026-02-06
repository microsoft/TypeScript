import type {
    ProjectResponse,
    SymbolResponse,
    TypeResponse,
} from "../proto.ts";

/**
 * Interface for objects with an ID that can be tracked by the registry.
 */
export interface Identifiable {
    readonly id: string;
}

/**
 * Interface for project objects that can load data.
 */
export interface ProjectLike extends Identifiable {
    loadData(data: ProjectResponse): void;
}

/**
 * Factory functions for creating API objects.
 */
export interface ObjectFactories<TProject extends ProjectLike, TSymbol extends Identifiable, TType extends Identifiable> {
    createProject(data: ProjectResponse): TProject;
    createSymbol(data: SymbolResponse): TSymbol;
    createType(data: TypeResponse): TType;
}

/**
 * Function type for releasing objects on the server.
 */
export type ReleaseFunction = (id: string) => void;

/**
 * Generic object registry for managing API objects with permanent identity.
 *
 * This registry ensures that the same server-side object ID always maps to
 * the same client-side object instance, enabling proper object identity
 * semantics across API calls.
 */
export class ObjectRegistry<
    TProject extends ProjectLike,
    TSymbol extends Identifiable,
    TType extends Identifiable,
> {
    private projects: Map<string, TProject> = new Map();
    private symbols: Map<string, TSymbol> = new Map();
    private types: Map<string, TType> = new Map();
    private factories: ObjectFactories<TProject, TSymbol, TType>;
    private releaseOnServer: ReleaseFunction;

    constructor(factories: ObjectFactories<TProject, TSymbol, TType>, releaseOnServer: ReleaseFunction) {
        this.factories = factories;
        this.releaseOnServer = releaseOnServer;
    }

    getProject(data: ProjectResponse): TProject {
        let project = this.projects.get(data.id);
        if (project) {
            project.loadData(data);
            return project;
        }

        project = this.factories.createProject(data);
        this.projects.set(data.id, project);
        return project;
    }

    getSymbol(data: SymbolResponse): TSymbol {
        let symbol = this.symbols.get(data.id);
        if (symbol) {
            return symbol;
        }

        symbol = this.factories.createSymbol(data);
        this.symbols.set(data.id, symbol);
        return symbol;
    }

    getType(data: TypeResponse): TType {
        let type = this.types.get(data.id);
        if (type) {
            return type;
        }

        type = this.factories.createType(data);
        this.types.set(data.id, type);
        return type;
    }

    release(object: Identifiable): void {
        // Check maps to determine object type
        if (this.projects.has(object.id) && this.projects.get(object.id) === object) {
            this.releaseProject(object as TProject);
        }
        else if (this.symbols.has(object.id) && this.symbols.get(object.id) === object) {
            this.releaseSymbol(object as TSymbol);
        }
        else if (this.types.has(object.id) && this.types.get(object.id) === object) {
            this.releaseType(object as TType);
        }
        else {
            throw new Error("Unknown object or object not in registry");
        }
    }

    releaseProject(project: TProject): void {
        this.projects.delete(project.id);
        this.releaseOnServer(project.id);
    }

    releaseSymbol(symbol: TSymbol): void {
        this.symbols.delete(symbol.id);
        this.releaseOnServer(symbol.id);
    }

    releaseType(type: TType): void {
        this.types.delete(type.id);
        this.releaseOnServer(type.id);
    }

    clear(): void {
        this.projects.clear();
        this.symbols.clear();
        this.types.clear();
    }
}
