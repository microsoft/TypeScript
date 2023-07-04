// @strict:true,false
// @target: es2015

//@fileName: module-for-arrow.ts
export type Used = { foo: string };
export type UsedAsReturn = { foo: string };
export type UnUsed = { foo: string };

//@fileName: module-for-fn-exp.ts
export type UsedExpr = { foo: string };
export type UsedAsReturnExpr = { foo: string };
export type UnUsedExp = { foo: string };

//@fileName: functions.ts
import type { Used, UsedAsReturn, UnUsed } from './module-for-arrow'

export const fnNoParameterTypeWithDefault = (a = 0): number => a;
export const fn = (a: string): number => a.length;
export const fn3 = (a: Used): UsedAsReturn => a.length;

import type { UsedExpr, UsedAsReturnExpr, UnUsedExp } from './module-for-fn-exp'
export const fnExpr = function (a: string): number { return a.length; };
export const fn3Expr = function (a: UsedExpr): UsedAsReturnExpr { return a.length; }
export const fnExpNoParameterTypeWithDefault = function (a = 0): number  { return a; }