/// <reference path='fourslash.ts'/>

// Test type hierarchy across multiple files

// @Filename: /base/interfaces.ts
////export interface /*baseInterface*/BaseInterface {
////    id: string;
////}
////
////export interface ExtendedInterface extends BaseInterface {
////    name: string;
////}

// @Filename: /base/classes.ts
////import { BaseInterface, ExtendedInterface } from './interfaces';
////
////export abstract class /*abstractBase*/AbstractBase implements BaseInterface {
////    abstract id: string;
////}
////
////export class ConcreteBase extends AbstractBase {
////    id: string = "";
////}

// @Filename: /models/user.ts
////import { ExtendedInterface } from '../base/interfaces';
////import { AbstractBase } from '../base/classes';
////
////export interface UserInterface extends ExtendedInterface {
////    email: string;
////}
////
////export class /*userClass*/User extends AbstractBase implements UserInterface {
////    id: string = "";
////    name: string = "";
////    email: string = "";
////}

// @Filename: /models/admin.ts
////import { User } from './user';
////
////export class /*adminClass*/Admin extends User {
////    permissions: string[] = [];
////}
////
////export class SuperAdmin extends Admin {
////    canManageAll: boolean = true;
////}

// @Filename: /services/userService.ts
////import { User } from '../models/user';
////import { Admin, SuperAdmin } from '../models/admin';
////
////export type /*anyUserType*/AnyUser = User | Admin | SuperAdmin;
////
////export interface /*userService*/UserService {
////    getUser(id: string): AnyUser;
////}
////
////export class DefaultUserService implements UserService {
////    getUser(id: string): AnyUser {
////        return new User();
////    }
////}

// Test 1: Base interface hierarchy
goTo.marker("baseInterface");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 2: Abstract class implementing interface from different file
goTo.marker("abstractBase");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 3: Class extending from different file
goTo.marker("userClass");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 4: Deep inheritance across files
goTo.marker("adminClass");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 5: Union type with types from different files
goTo.marker("anyUserType");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");

// Test 6: Service interface
goTo.marker("userService");
verify.baselineTypeHierarchy(/*markerName*/ undefined, "both");
