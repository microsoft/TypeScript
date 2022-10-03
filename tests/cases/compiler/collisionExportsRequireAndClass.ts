//@module: amd
//@filename: collisionExportsRequireAndClass_externalmodule.ts
export class require {
}
export class exports {
}
module m1 {
    class require {
    }
    class exports {
    }
}
module m2 {
    export class require {
    }
    export class exports {
    }
}

//@filename: collisionExportsRequireAndClass_globalFile.ts
class require {
}
class exports {
}
module m3 {
    class require {
    }
    class exports {
    }
}
module m4 {
    export class require {
    }
    export class exports {
    }
}