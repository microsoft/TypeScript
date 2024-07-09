module TypeScript2 {
    export class MemberName {
        public prefix: string = "";
    }
    export class MemberNameArray extends MemberName {
    }
}

var a = new TypeScript2.MemberNameArray()