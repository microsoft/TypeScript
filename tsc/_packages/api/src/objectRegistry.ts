import {
    Project,
    Symbol,
    Type,
} from "./api.ts";
import type { Client } from "./client.ts";
import type {
    ProjectResponse,
    SymbolResponse,
    TypeResponse,
} from "./proto.ts";

export class ObjectRegistry {
    private client: Client;
    private projects: Map<string, Project> = new Map();
    private symbols: Map<string, Symbol> = new Map();
    private types: Map<string, Type> = new Map();

    constructor(client: Client) {
        this.client = client;
    }

    getProject(data: ProjectResponse): Project {
        let project = this.projects.get(data.id);
        if (project) {
            return project;
        }

        project = new Project(this.client, this, data);
        this.projects.set(data.id, project);
        return project;
    }

    getSymbol(data: SymbolResponse): Symbol {
        let symbol = this.symbols.get(data.id);
        if (symbol) {
            return symbol;
        }

        symbol = new Symbol(this.client, this, data);
        this.symbols.set(data.id, symbol);
        return symbol;
    }

    getType(data: TypeResponse): Type {
        let type = this.types.get(data.id);
        if (type) {
            return type;
        }

        type = new Type(this.client, this, data);
        this.types.set(data.id, type);
        return type;
    }

    release(object: object): void {
        if (object instanceof Project) {
            this.releaseProject(object);
        }
        else if (object instanceof Symbol) {
            this.releaseSymbol(object);
        }
        else if (object instanceof Type) {
            this.releaseType(object);
        }
        else {
            throw new Error("Unknown object type");
        }
    }

    releaseProject(project: Project): void {
        this.projects.delete(project.id);
        this.client.request("release", project.id);
    }

    releaseSymbol(symbol: Symbol): void {
        this.symbols.delete(symbol.id);
        this.client.request("release", symbol.id);
    }

    releaseType(type: Type): void {
        this.types.delete(type.id);
        this.client.request("release", type.id);
    }
}
