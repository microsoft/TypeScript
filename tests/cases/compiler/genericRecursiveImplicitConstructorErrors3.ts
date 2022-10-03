module TypeScript {
    export class MemberName <A,B,C>{
        static create<A,B,C>(arg1: any, arg2?: any, arg3?: any): MemberName {
        }
    }
}
 
module TypeScript {
    export class PullSymbol <A,B,C>{
        public type: PullTypeSymbol = null;
    }
    export class PullTypeSymbol <A,B,C>extends PullSymbol {
        private _elementType: PullTypeSymbol = null;
        public toString<A,B,C>(scopeSymbol?: PullSymbol, useConstraintInName?: boolean) {
            var s = this.getScopedNameEx(scopeSymbol, useConstraintInName).toString();
            return s;
        }
        public getScopedNameEx<A,B,C>(scopeSymbol?: PullSymbol, useConstraintInName?: boolean, getPrettyTypeName?: boolean, getTypeParamMarkerInfo?: boolean) {
            if (this.isArray()) {
                var elementMemberName = this._elementType ?
                (this._elementType.isArray() || this._elementType.isNamedTypeSymbol() ?
                this._elementType.getScopedNameEx(scopeSymbol, false, getPrettyTypeName, getTypeParamMarkerInfo) :
                this._elementType.getMemberTypeNameEx(false, scopeSymbol, getPrettyTypeName)) : 1
                return MemberName.create(elementMemberName, "", "[]");
            }
        }
    }
}
 
