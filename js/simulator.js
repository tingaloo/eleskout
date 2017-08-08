/**
 * The simulator is the step-based animation engine
 */
(function($, cs) {
  cs.Simulator = {
    speed: 150,
    running: false,
    parts: [],
    template: '<div class="cs-canvas"> </div>',
    target: '.cs-target',
    tick: 0,

    /**
     * Add a part to the animation, takes a class and any additional
     * arguments will be passed on to the class during instantiation
     */
    addPart: function(Part) {
      var part = new (Function.prototype.bind.apply(Part, arguments));

      cs.Simulator.parts.push(part);

      return part;
    },

    /**
     * Animate the next step
     */
    step: function() {
      var i = 0;
      var element = $(cs.Simulator.template);

      // Only if the animation is running
      if (cs.Simulator.running) {
        cs.Simulator.tick++;

        // Animate all the parts
        for (i = 0; i < cs.Simulator.parts.length; i++) {
          element.append(
            cs.Simulator.parts[i].render(cs.Simulator.tick)
          );
        }

        // Put the parts into the DOM
        $(cs.Simulator.target).empty()
          .append(element);

        // Rinse & Repeat
        setTimeout(cs.Simulator.step, cs.Simulator.speed);
      }
    },

    /**
     * Stop the animation from running
     */
    stop: function() {
      cs.Simulator.running = false;
    },

    /**
     * Start running the animation
     */
    start: function() {
      cs.Simulator.running = true;
      cs.Simulator.step();
    },

    /**
     * Toggle running the animation
     */
    toggle: function() {
      cs.Simulator.running ? cs.Simulator.stop() : cs.Simulator.start();
    }

  }
})($, cs);
