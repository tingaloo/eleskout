/**
 * A floor is a level of a building someone may want to get to
 */
(function($, cs) {
  var uid = 0;

  cs.Floor = function(style) {
    var id = uid++;
    var template = '<div class="cs-floor ' + style + '"><div class="cs-floor-container"> </div><div class="cs-elevator-shaft"> </div></div>';
    var people = [];
    var calls = [];

    function renderPeople(element, tick) {
      var i;
      var person;

      for (i = 0; i < people.length; i++) {
        person = people[i].render(tick);
        element.append(
          person.css('right', (i * cs.Person.SIZE))
        );
      }
    }

    /**
     * Render the floor and people on it
     */
    this.render = function(tick) {
      var element = $(template).css('bottom', (cs.HEIGHT * id) + 'px');

      renderPeople(element.find('.cs-floor-container'), tick);
      return element;
    };

    /**
     * Load the provided elevator with people on the floor
     */
    this.loadElevator = function(elevator) {
      var i;
      elevator.unloadPassengers(this);

      if (calls.length) {
        for (i = 0; i < people.length; i++) {
          elevator.loadPassenger(people[i]);
        }

        calls = [];
        people = [];
      }
    };

    this.floors = function() {
      return uid;
    }

    /**
     * Add a person to the floor
     */
    this.addPerson = function(person) {
      people.push(person);
      person.parent = this;
    };

    /**
     * Handle up button pushes
     */
    this.pushUpButton = function() {
      calls.push(cs.Floor.UP);
    };

    /**
     * Handle down button pushes
     */
    this.pushDownButton = function() {
      calls.push(cs.Floor.DOWN);
    };

    /**
     * Get the floor level (the human readable level)
     */
    this.getFloorLevel = function() {
      return id + 1;
    };

    /**
     * Get the calls for the floor
     */
    this.getCalls = function() {
      return calls;
    }

    this.clearCalls = function() {
      calls = [];
    }
  };

  cs.Floor.UP = 1;
  cs.Floor.DOWN = 2;
})($, cs);
