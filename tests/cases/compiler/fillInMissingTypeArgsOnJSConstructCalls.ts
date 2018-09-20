// @allowJs: true
// @checkJs: true
// @noEmit: true
// regression test for #18254
// @Filename: BaseA.js
export default class BaseA {
}
// @Filename: SubA.js
import BaseA from './BaseA';
export default class SubA extends BaseA {
}
// @Filename: BaseB.js
import BaseA from './BaseA';
export default class B<T: BaseA> {
    _AClass: Class<T>;
    constructor(AClass: Class<T>) {
        this._AClass = AClass;
    }
}
// @Filename: SubB.js
import SubA from './SubA';
import BaseB from './BaseB';
export default class SubB extends BaseB<SubA> {
    constructor() {
        super(SubA);
    }
}
