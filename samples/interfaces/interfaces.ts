interface Drivable {   

    // Starts the car's ignition so that it can drive.
    start(): void;
    // Attempt to drive a distance. Returns true or false based on whether or not the drive was successful.
    drive(distance: number): boolean;
    // Give the distance from the start.
    getPosition(): number;
}

class Car implements Drivable {
    private _isRunning: boolean;
    private _distanceFromStart: number;

    constructor() {
        this._isRunning = false;
        this._distanceFromStart = 0;
    }

    /**
    *   Starts the car's ignition so that it can drive.
    */
    public start() {
        this._isRunning = true;
    }

    /**
    *   Attempt to drive a distance. Returns true or false based on whether or not the drive was successful.
    *
    *   @param {number} distance The distance attempting to cover
    *
    *   @returns {boolean} Whether or not the drive was successful
    */
    public drive(distance: number): boolean {
        if (this._isRunning) {
            this._distanceFromStart += distance;
            return true;
        }
        return false;
    }

    /**
    *   Gives the distance from starting position
    *
    *   @returns {number} Distance from starting position;
    */
    public getPosition(): number {
        return this._distanceFromStart;
    }
}

// Want to experiment? Try adding a second interface: Flyable. Implement it in a Helicopter class, then write a FlyingCar class that implements both Drivable and Flyable!