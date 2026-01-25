/// <reference path='fourslash.ts'/>

// Test complex type hierarchy with multiple levels, interfaces, unions, and implementations

// @Filename: /complexHierarchy.ts
////interface Serializable {
////    serialize(): string;
////}
////
////interface Comparable<T> {
////    compareTo(other: T): number;
////}
////
////interface Named {
////    name: string;
////}
////
////interface Timestamped {
////    createdAt: Date;
////    updatedAt: Date;
////}
////
////// Entity combines Named and Timestamped
////interface Entity extends Named, Timestamped {
////    id: string;
////}
////
////// Base class with serialization
////abstract class /*baseModel*/BaseModel implements Serializable {
////    abstract serialize(): string;
////}
////
////// User extends BaseModel and implements multiple interfaces
////class User extends BaseModel implements Entity, Comparable<User> {
////    id: string = "";
////    name: string = "";
////    createdAt: Date = new Date();
////    updatedAt: Date = new Date();
////    
////    serialize(): string {
////        return JSON.stringify(this);
////    }
////    
////    compareTo(other: User): number {
////        return this.name.localeCompare(other.name);
////    }
////}
////
////// AdminUser extends User
////class AdminUser extends User {
////    permissions: string[] = [];
////}
////
////// SuperAdmin extends AdminUser
////class SuperAdmin extends AdminUser {
////    canManageAdmins: boolean = true;
////}
////
////// GuestUser extends User
////class GuestUser extends User {
////    sessionId: string = "";
////}
////
////// Type alias for any user type
////type /*anyUser*/AnyUser = User | AdminUser | SuperAdmin | GuestUser;
////
////// Type alias for admin types only
////type AdminTypes = AdminUser | SuperAdmin;
////
////// Intersection type
////type AuditableEntity = Entity & Serializable;
////
////// Product also implements Entity
////class Product implements Entity, Serializable {
////    id: string = "";
////    name: string = "";
////    createdAt: Date = new Date();
////    updatedAt: Date = new Date();
////    price: number = 0;
////    
////    serialize(): string {
////        return JSON.stringify(this);
////    }
////}
////
////// Order uses multiple entities
////class Order implements Serializable {
////    id: string = "";
////    user: User | null = null;
////    products: Product[] = [];
////    
////    serialize(): string {
////        return JSON.stringify(this);
////    }
////}

// Show type hierarchy for BaseModel - should show User (and its subtypes) as subtypes
goTo.marker("baseModel");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Show type hierarchy for AnyUser - union type showing all user types as supertypes
goTo.marker("anyUser");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
