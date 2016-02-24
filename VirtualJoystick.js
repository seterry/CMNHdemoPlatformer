//
// Virtual Joystick
// CMNH 
//

var VirtualJoystick = function (input, game) {
	// Constructor
	this.size = 160.0;
	this.knob_size = 40.0;	
	this.outer_line_width = 3.0;	
	this.outer_color = 0x338910;
	this.knob_color = 0x005930;	
	this.xc = 100.0;
	this.yc = 100.0;
	this.pdown = 0.0;
	this.dpx = 0.0;
	this.dpy = 0.0;	
	
	input.onDown.add(function(p) {
		// Inside circle?
		var d = Math.sqrt(((input.x - this.xc) * (input.x - this.xc)) + 
		                  ((input.y - this.yc) * (input.y - this.yc)) );
		if (d < this.knob_size) {
			this.pdown = 1;	
			this.dpx = input.x - this.xc;
			this.dpy = input.y - this.yc;	
		}
	}, this);	
	
	input.onUp.add(function(p) {
		this.pdown = 0;	
	}, this);	
	
};

VirtualJoystick.prototype.update = function(game, graphics) {
	graphics.lineStyle(this.outer_line_width, this.outer_color);
	graphics.drawCircle(this.xc + game.camera.x, this.yc + game.camera.y, this.size);
	
	graphics.lineStyle(0);
	graphics.beginFill(this.knob_color, 0.5);
	
	if (this.pdown) {	
		var x1 = this.xc;
		var y1 = this.yc;
		var x2 = game.input.x - this.dpx;
		var y2 = game.input.y - this.dpy;
		var d = Math.sqrt(((x1-x2)*(x1-x2)) + ((y1-y2)*(y1-y2)));
		if (d > (this.size/2.0)) {
			var t = (this.size/2.0) / d;
			x2 = ((1.0 - t) * x1) + (t * x2);
			y2 = ((1.0 - t) * y1) + (t * y2);
		}
		graphics.drawCircle(x2 + game.camera.x, y2 + game.camera.y, this.knob_size);
		this.xr = (x2-x1)/(this.size/2.0);
		this.yr = (y2-y1)/(this.size/2.0);
	} else {	
		graphics.drawCircle(this.xc + game.camera.x, this.yc + game.camera.y, this.knob_size);
		this.xr = 0;
		this.yr = 0;
	}
	graphics.endFill();	
}

