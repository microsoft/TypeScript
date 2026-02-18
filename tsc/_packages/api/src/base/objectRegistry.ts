import type {
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
 * Factory functions for creating API objects.
 */
export interface ObjectFactories<TSymbol extends Identifiable, TType extends Identifiable> {
    createSymbol(data: SymbolResponse): TSymbol;
    createType(data: TypeResponse): TType;
}

/**
 * Object registry scoped to a single snapshot.
 *
 * This registry ensures that the same server-side object ID always maps to
 * the same client-side object instance within a snapshot, enabling proper
 * object identity semantics across API calls against the same snapshot.
 *
 * Symbol and type lifetimes are tied to the snapshot - when the snapshot
 * is disposed, all its objects are implicitly released.
 */
export class ObjectRegistry<
    TSymbol extends Identifiable,
    TType extends Identifiable,
> {
    private symbols: Map<string, TSymbol> = new Map();
    private types: Map<string, TType> = new Map();
    private factories: ObjectFactories<TSymbol, TType>;

    constructor(factories: ObjectFactories<TSymbol, TType>) {
        this.factories = factories;
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

    clear(): void {
        this.symbols.clear();
        this.types.clear();
    }
}
