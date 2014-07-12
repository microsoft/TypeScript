===== TypeScript Sample: Simple =====

=== Overview ===

Simple use of classes and inheritance:
- Interface: A simple interface that defines the interface for something that can drive.
- Class: An implementation of a car.

=== Keep Playing ===

Want to experiment? Try adding a second interface: Flyable. Implement it in a Helicopter class, then write a FlyingCar class that implements both Drivable and Flyable!

interface Flyable { ... }
class Helicopter implements Flyable { ... }
class FlyingCar implements Drivable, Flyable { ... }

=== Running ===
tsc interfaces.ts
