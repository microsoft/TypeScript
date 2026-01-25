/// <reference path='fourslash.ts'/>

// Test type hierarchy across project references
// This test verifies that type hierarchy works when types are spread across multiple projects
// Note: Full moniker support for faster resolution will be added in a follow-up PR



// @Filename: /lib/src/base.ts
/////** Base entity for all domain models */
////export interface /*baseEntity*/BaseEntity {
////    id: string;
////    createdAt: Date;
////    updatedAt: Date;
////}
////
/////** Named entity adds a name property */
////export interface /*namedEntity*/NamedEntity extends BaseEntity {
////    name: string;
////}
////
/////** Base repository interface */
////export interface /*repository*/Repository<T extends BaseEntity> {
////    find(id: string): Promise<T | null>;
////    save(entity: T): Promise<T>;
////    delete(id: string): Promise<void>;
////}
////
/////** Abstract base class for entities */
////export abstract class /*abstractEntity*/AbstractEntity implements BaseEntity {
////    abstract id: string;
////    createdAt: Date = new Date();
////    updatedAt: Date = new Date();
////}

// @Filename: /lib/src/events.ts
////import { BaseEntity } from './base';
////
/////** Event interface for domain events */
////export interface /*domainEvent*/DomainEvent<T extends BaseEntity = BaseEntity> {
////    type: string;
////    payload: T;
////    timestamp: Date;
////}
////
/////** Created event */
////export interface /*createdEvent*/EntityCreatedEvent<T extends BaseEntity> extends DomainEvent<T> {
////    type: 'created';
////}
////
/////** Updated event */
////export interface EntityUpdatedEvent<T extends BaseEntity> extends DomainEvent<T> {
////    type: 'updated';
////    changes: Partial<T>;
////}
////
/////** Deleted event */
////export interface EntityDeletedEvent<T extends BaseEntity> extends DomainEvent<T> {
////    type: 'deleted';
////}



// @Filename: /app/src/models/user.ts
////import { NamedEntity, AbstractEntity, Repository } from '../../lib/src/base';
////
/////** User entity interface */
////export interface /*userEntity*/UserEntity extends NamedEntity {
////    email: string;
////    role: 'admin' | 'user';
////}
////
/////** User class implementation */
////export class /*user*/User extends AbstractEntity implements UserEntity {
////    id: string = '';
////    name: string = '';
////    email: string = '';
////    role: 'admin' | 'user' = 'user';
////}
////
/////** Admin user extends User */
////export class /*admin*/AdminUser extends User {
////    permissions: string[] = [];
////    
////    constructor() {
////        super();
////        this.role = 'admin';
////    }
////}
////
/////** User repository interface */
////export interface /*userRepo*/UserRepository extends Repository<UserEntity> {
////    findByEmail(email: string): Promise<UserEntity | null>;
////    findByRole(role: 'admin' | 'user'): Promise<UserEntity[]>;
////}

// @Filename: /app/src/models/product.ts
////import { NamedEntity, AbstractEntity } from '../../lib/src/base';
////
/////** Product entity */
////export interface ProductEntity extends NamedEntity {
////    price: number;
////    sku: string;
////}
////
/////** Product class */
////export class /*product*/Product extends AbstractEntity implements ProductEntity {
////    id: string = '';
////    name: string = '';
////    price: number = 0;
////    sku: string = '';
////}

// @Filename: /app/src/services/userEvents.ts
////import { EntityCreatedEvent, EntityUpdatedEvent, EntityDeletedEvent, DomainEvent } from '../../lib/src/events';
////import { UserEntity } from '../models/user';
////
/////** User created event */
////export interface /*userCreated*/UserCreatedEvent extends EntityCreatedEvent<UserEntity> {
////    metadata: {
////        source: string;
////        ipAddress?: string;
////    };
////}
////
/////** User updated event */
////export interface UserUpdatedEvent extends EntityUpdatedEvent<UserEntity> {
////    metadata: {
////        changedBy: string;
////    };
////}
////
/////** Union of all user events */
////export type /*userEvents*/UserEvents = 
////    | UserCreatedEvent 
////    | UserUpdatedEvent 
////    | EntityDeletedEvent<UserEntity>;
////
/////** Event handler type */
////export type /*eventHandler*/EventHandler<E extends DomainEvent> = (event: E) => Promise<void>;

// @Filename: /app/src/services/repository.ts
////import { Repository, BaseEntity } from '../../lib/src/base';
////
/////** In-memory repository implementation */
////export class /*inMemoryRepo*/InMemoryRepository<T extends BaseEntity> implements Repository<T> {
////    protected items: Map<string, T> = new Map();
////    
////    async find(id: string): Promise<T | null> {
////        return this.items.get(id) ?? null;
////    }
////    
////    async save(entity: T): Promise<T> {
////        this.items.set(entity.id, entity);
////        return entity;
////    }
////    
////    async delete(id: string): Promise<void> {
////        this.items.delete(id);
////    }
////}
////
/////** Cached repository decorator */
////export class /*cachedRepo*/CachedRepository<T extends BaseEntity> extends InMemoryRepository<T> {
////    private cache: Map<string, { value: T; expiry: number }> = new Map();
////    
////    override async find(id: string): Promise<T | null> {
////        const cached = this.cache.get(id);
////        if (cached && cached.expiry > Date.now()) {
////            return cached.value;
////        }
////        return super.find(id);
////    }
////}

// Test 1: Base interface in lib project
goTo.marker("baseEntity");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: Interface extending base from same project
goTo.marker("namedEntity");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: Generic repository interface
goTo.marker("repository");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: Abstract class implementing interface
goTo.marker("abstractEntity");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: Generic event interface
goTo.marker("domainEvent");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 6: Generic event extending generic event
goTo.marker("createdEvent");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 7: Interface in app extending interface from lib
goTo.marker("userEntity");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 8: Class in app extending abstract class from lib
goTo.marker("user");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 9: Class extending class that extends lib abstract
goTo.marker("admin");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 10: Interface extending generic interface from lib with specific type
goTo.marker("userRepo");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 11: Class in different file extending abstract from lib
goTo.marker("product");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 12: Interface extending generic interface with app-specific type
goTo.marker("userCreated");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 13: Union type of cross-project types
goTo.marker("userEvents");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 14: Generic type alias referencing lib types
goTo.marker("eventHandler");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 15: Generic class implementing lib interface
goTo.marker("inMemoryRepo");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 16: Class extending generic class in same project
goTo.marker("cachedRepo");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
