$(document).ready(function () {
  // All elements with the "draggy" class become draggable (and on mobile)
  $('.draggy').draggable();
});


// new for background image drag //
// Pre-select elements
var map = $("#map"),
    canvas = map.find(".map-canvas");

// Calculate canvas constraints
var maxLeft = map.width()-canvas.width(),
    maxTop = map.height()-canvas.height();

// Make canvas draggable
canvas.draggable({
    drag: function(e, ui) {
        // Check if canvas is within constraints
        if (ui.position.left > 0) {
            ui.position.left = 0;
        } else if (ui.position.left < maxLeft) {
            ui.position.left = maxLeft;
        }
        if (ui.position.top > 0) {
            ui.position.top = 0;
        } else if (ui.position.top < maxTop) {
            ui.position.top = maxTop;
        }
    }
});

// Create simple dot marker
$("<div></div>")
    .addClass("map-marker")
    .appendTo(canvas)
    .offset(function(){
        return { left: 150, top: 150 };
    })
    // Append a label
    .append("<span><- Dot</span>");

// Create draggable Google Maps pin marker
var pin =
$("<div></div>")
    .addClass("google-pin")
    .appendTo(canvas)
    .offset(function(){
        return { left: 50, top: 50 };
    })
    // Bind mouseup/down for visual confirmation of grab
    .bind({
        mousedown: function(){
            var os = pin.offset();
            pin.offset(function(){
                return { top: os.top-3 };
            });
        },
        mouseup: function(){
            var os = pin.offset();
            pin.offset(function(){
                return { top: os.top+3 };
            });
        }
    })
    // Make it draggable
    .draggable({
        start: function(e,ui){
            ui.helper.offset(function(){
                return { top: ui.offset.top-2 };
            });
        },
        container: canvas
    });
