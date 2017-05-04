/**
 * A building is the container for floors and elevators,
 * it also manages the elevator logic
 */
(function($, cs) {
  cs.Building = function(fs, es) {
    var floors = [].concat(fs || []);
    var elevators = [].concat(es || []);
    var template = '<div class="cs-building"> </div>';

    /**
     * Get the elevator at the provided floor ID
     */
    function getElevatorAtFloor(id) {
      var i;

      for (i = 0; i < elevators.length; i++) {
        if (elevators[i].isAtFloorById(id)) {
          return elevators[i];
        }
      }
    }

    function callElevator(floor) {
      console.log('ELEVATORS ON LOCKDOWN');
    }

    /**
     * Render the floors in the building
     */
    function renderFloors(element, tick) {
      var elevator;

      if (floors.length) {
        for (i = 0; i < floors.length; i++) {
          elevator = getElevatorAtFloor(i);

          // Only load the elevator if the doors are open
          if (elevator && elevator.areDoorsOpen()) {
            floors[i].loadElevator(elevator);
          } else if (!elevator) {
            if (floors[i].getCalls() && floors[i].getCalls().length) {
              callElevator(i);
              floors[i].clearCalls();
            }
          }

          element.append(floors[i].render(tick));
        }
      }
    }

    /**
     * Render the elevators in the building
     */
    function renderElevators(element, tick) {
      if (elevators.length) {
        for (i = 0; i < elevators.length; i++) {
          element.append(elevators[i].render(tick));
        }
      }
    }

    /**
     * Render the building, its floors and elevators
     */
    this.render = function(tick) {
      var i;
      var element = $(template);

      renderFloors(element, tick);
      renderElevators(element, tick);

      return element;
    };

    /**
     * Add a floor to the building
     */
    this.addFloor = function(floor) {
      floors.push(floor);
    };

    /**
     * Add an elevator to the building
     */
    this.addElevator = function(elevator) {
      elevators.push(elevator);
    };

    /**
     * Add a person to the building
     */
    this.addPerson = function(floor, person) {
      floors[floor || 0].addPerson(person);
    }
  };
})($, cs);
