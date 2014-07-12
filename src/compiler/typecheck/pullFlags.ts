// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\references.ts' />

module TypeScript {

    export enum PullElementFlags {
        None = 0,
        Exported = 1,
        Private = 1 << 1,
        Public = 1 << 2,
        Ambient = 1 << 3,
        Static = 1 << 4,
        Optional = 1 << 7,
        Signature = 1 << 11,
        Enum = 1 << 12,
        ArrowFunction = 1 << 13,

        ClassConstructorVariable = 1 << 14,
        InitializedModule = 1 << 15,
        InitializedDynamicModule = 1 << 16,

        MustCaptureThis = 1 << 18,

        DeclaredInAWithBlock = 1 << 21,

        HasReturnStatement = 1 << 22,

        PropertyParameter = 1 << 23,

        IsAnnotatedWithAny = 1 << 24,

        HasDefaultArgs = 1 << 25,

        ConstructorParameter = 1 << 26,

        ImplicitVariable = ClassConstructorVariable | InitializedModule | InitializedDynamicModule | Enum,
        SomeInitializedModule = InitializedModule | InitializedDynamicModule | Enum,
    }

    export function hasModifier(modifiers: PullElementFlags[], flag: PullElementFlags): boolean {
        for (var i = 0, n = modifiers.length; i < n; i++) {
            if (hasFlag(modifiers[i], flag)) {
                return true;
            }
        }

        return false;
    }

    export enum PullElementKind {
        None = 0,
        Global = 0,

        Script = 1 << 0,
        Primitive = 1 << 1,

        Container = 1 << 2,
        Class = 1 << 3,
        Interface = 1 << 4,
        DynamicModule = 1 << 5,
        Enum = 1 << 6,
        TypeAlias = 1 << 7,
        ObjectLiteral = 1 << 8,

        Variable = 1 << 9,
        CatchVariable = 1 << 10,
        Parameter = 1 << 11,
        Property = 1 << 12,
        TypeParameter = 1 << 13,

        Function = 1 << 14,
        ConstructorMethod = 1 << 15,
        Method = 1 << 16,
        FunctionExpression = 1 << 17,

        GetAccessor = 1 << 18,
        SetAccessor = 1 << 19,

        CallSignature = 1 << 20,
        ConstructSignature = 1 << 21,
        IndexSignature = 1 << 22,

        ObjectType = 1 << 23,
        FunctionType = 1 << 24,
        ConstructorType = 1 << 25,

        EnumMember = 1 << 26,

        WithBlock = 1 << 27,
        CatchBlock = 1 << 28,

        // WARNING: To prevent JS VMs from wrapping these values as floats, we don't want to utilize more than the 31 bits above.  (Doing so would
        // seriously slow down bitwise operations

        All = Script | Global | Primitive | Container | Class | Interface | DynamicModule | Enum | TypeAlias |
            ObjectLiteral | Variable | Parameter | Property | TypeParameter | Function | ConstructorMethod | Method |
            FunctionExpression | GetAccessor | SetAccessor | CallSignature | ConstructSignature | IndexSignature | ObjectType |
            FunctionType | ConstructorType | EnumMember | WithBlock | CatchBlock,

        SomeFunction = Function | ConstructorMethod | Method | FunctionExpression | GetAccessor | SetAccessor,

        // Warning: SomeValue and SomeType (along with their constituents) must be disjoint
        SomeValue = Variable | Parameter | Property | EnumMember | SomeFunction,

        SomeType = Script | Global | Primitive | Class | Interface |
                    Enum | ObjectLiteral | ObjectType | FunctionType | ConstructorType | TypeParameter,

        AcceptableAlias = Variable | SomeFunction | Class | Interface | Enum | Container | ObjectType | FunctionType | ConstructorType,

        SomeContainer = Container | DynamicModule | TypeAlias,

        SomeSignature = CallSignature | ConstructSignature | IndexSignature,

        SomeTypeReference = Interface | ObjectType | FunctionType | ConstructorType,

        SomeInstantiatableType = Class | Interface | TypeParameter,
    }
}