/// <reference path='fourslash.ts'/>

// Test type hierarchy with generic classes and interfaces

// @Filename: /generics.ts
////interface Repository<T> {
////    find(id: string): T | null;
////    save(entity: T): void;
////    delete(id: string): void;
////}
////
////interface CacheableRepository<T> extends Repository<T> {
////    clearCache(): void;
////}
////
////class /*baseRepo*/BaseRepository<T> implements Repository<T> {
////    find(id: string): T | null { return null; }
////    save(entity: T): void {}
////    delete(id: string): void {}
////}
////
////class /*cachedRepo*/CachedRepository<T> extends BaseRepository<T> implements CacheableRepository<T> {
////    private cache: Map<string, T> = new Map();
////    clearCache(): void { this.cache.clear(); }
////}
////
////interface Entity {
////    id: string;
////}
////
////class User implements Entity {
////    id: string = "";
////    name: string = "";
////}
////
////class /*userRepo*/UserRepository extends CachedRepository<User> {
////    findByName(name: string): User | null { return null; }
////}
////
////class AdminRepository extends UserRepository {
////    findAdmins(): User[] { return []; }
////}
////
////// Generic type alias
////type /*repoType*/RepositoryType<T> = Repository<T> | CacheableRepository<T>;
////
////// Constrained generic
////interface /*identifiable*/Identifiable<T extends Entity> {
////    identify(entity: T): string;
////}
////
////class EntityIdentifier<T extends Entity> implements Identifiable<T> {
////    identify(entity: T): string {
////        return entity.id;
////    }
////}

// Test 1: Generic base class with type parameter
goTo.marker("baseRepo");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: Generic class extending generic class
goTo.marker("cachedRepo");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: Concrete class extending generic class with specific type
goTo.marker("userRepo");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: Generic type alias
goTo.marker("repoType");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: Constrained generic interface
goTo.marker("identifiable");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
