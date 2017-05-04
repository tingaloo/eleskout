/**
 * An elevator is a people mover! In this simulation, the elevator
 * is the actual car, not the entire elevator shaft
 */
(function($, cs) {
  cs.Elevator = function() {
    var currentFloor = 0;
    var targetFloor = undefined;
    var doorsClosed = true;
    var calls = [];
    var people = [];
    var template = '<div class="cs-elevator"></div>';

    /**
     * Logic to move the elevator
     */
    function move() {
      console.log('--- - ---');
    }

    /**
     * Render the elevator and the people inside of it
     */
    this.render = function(tick) {
      var element;
      var i;

      if (tick % 5 === 0) {
        move();
      }

      element = $(template)
        .css('bottom', (cs.HEIGHT * currentFloor) + 'px')
        .removeClass('cs-elevator-open cs-elevator-closed')
        .addClass(
          this.areDoorsOpen() ? 'cs-elevator-open' : 'cs-elevator-closed'
        );

      for (i = 0; i < people.length; i++) {
        element.append(
          people[i].render(tick)
        );
      }

      return element;
    };

    /**
     * Open the elevator doors
     */
    this.openDoors = function() {
      doorsClosed = false;
    };

    /**
     * Close the elevator doors
     */
    this.closeDoors = function() {
      doorsClosed = true;
    };

    /**
     * Queue a button push
     */
    this.pushButton = function(destination) {
      calls.push(destination);

      this.closeDoors();
    };

    /**
     * Add a person to the elevator
     */
    this.loadPassenger = function(person) {
      people.push(person);
      person.parent = this;
    };

    /**
     * Remove all people from the elevator and put
     * them onto the provided floor
     */
    this.unloadPassengers = function(floor) {
      throw new Error('DEVELOPERS CANNOT ESCAPE');
    }

    /**
     * Return if the doors are open
     */
    this.areDoorsOpen = function() {
      return doorsClosed === false;
    };

    /**
     * Check if the elevator is at the provided floor number
     */
    this.isAtFloor = function(level) {
      return currentFloor === level - 1;
    };

    /**
     * Check if the elevator is at the provided floor number
     */
    this.isAtFloorById = function(id) {
      return currentFloor === id;
    };

    move = move.bind(this);
  };
})($, cs);
