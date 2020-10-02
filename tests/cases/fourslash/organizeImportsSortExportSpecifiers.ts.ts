/// <reference path="fourslash.ts" />

// @filename: /a.ts
////export interface ChangeDetectionStrategy {}
////export interface Component {}
////export interface ContentChild {}
////export interface EventEmitter {}
////export interface Input {}
////export interface Output {}
////export interface TemplateRef {}
////export interface AfterViewInit {}
////export interface ChangeDetectorRef {}
////export interface HostBinding {}
////export interface ElementRef {}
////export interface ViewChild {}

// @filename: /b.ts
////export {
////    ChangeDetectionStrategy,
////    Component,
////    ContentChild,
////    EventEmitter,
////    Input,
////    Output,
////    TemplateRef,
////    AfterViewInit,
////    ChangeDetectorRef,
////    HostBinding,
////    ElementRef,
////    ViewChild
////} from './a';

goTo.file("/b.ts");
verify.organizeImports(
`export {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    TemplateRef,
    ViewChild
} from './a';
`);
