//// [recursiveBaseCheck2.ts]
declare module Box2D.Collision.Shapes {
    export class b2CircleShape extends b2Shape {
    }
    export class b2Shape extends Box2D.Collision.Shapes.b2CircleShape {
    }
}
declare module Box2D.Dynamics {
    export class b2ContactListener extends Box2D.Collision.Shapes.b2Shape {
    }
    export class b2FixtureDef extends Box2D.Dynamics.b2ContactListener {
    }
}


//// [recursiveBaseCheck2.js]
