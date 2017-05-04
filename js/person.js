/**
 * A person likes to go places
 */
(function(cs) {
  cs.Person = function(curr, dest) {
    var destination = dest || 1;
    var pushedDestination = false;
    var template = '<div class="cs-person"> </div>';

    this.parent = undefined;

    /**
     * Push the button based on the person's current location and destination
     */
    function pushButton() {
      if (!pushedDestination) {
        if (this.parent instanceof cs.Elevator) {
          this.parent.pushButton(destination);

          // The person is happy they are going where they want to go
          pushedDestination = true;
        } else {
          if (this.parent.getFloorLevel() > destination) {
            this.parent.pushDownButton();
          } else {
            this.parent.pushUpButton();
          }
        }
      }
    }

    /**
     * Render the person
     */
    this.render = function(tick) {
      if (tick % 3 === 0) {
        pushButton();
      }

      return $(template);
    };

    pushButton = pushButton.bind(this);
  };

  cs.Person.SIZE = 10;
})(cs);
