////////////////////////////////////////////////////////////
// Keyframe   and   KFobj  classes
////////////////////////////////////////////////////////////

class Keyframe {
 constructor(name,time,avars) {
 this.name = name;
 this.time = time;
 this.avars = avars;
 }
}

class Motion {
    constructor(setMatricesFunc) {
	this.keyFrameArray = [];          // list of keyframes
	this.maxTime = 0.0;               // time of last keyframe
	this.currTime = 0.0;              // current playback time
	this.updateMatrices = setMatricesFunc;    // function to call to update transformation matrices
    };
    reset() {                     // go back to first keyframe
	this.keyFrameArray = [];
	this.maxTime = 0.0;
	this.currTime = 0.0;
    };
    addKeyFrame(keyframe) {               // add a new keyframe at end of list
	this.keyFrameArray.push(keyframe);
	if (keyframe.time > this.maxTime)
	    this.maxTime = keyframe.time;
    };
    keyFrame1() {
    	dragonMotion.keyFrameArray = [];
    	dragonMotion.maxTime = 0.0;
    	dragonMotion.addKeyFrame(new Keyframe('straight',         0.0, [-4, 3,    0, 0, 0, 0, 0]));
    	dragonMotion.addKeyFrame(new Keyframe('dragon head move',	2.0, [-2, 5,   45, 0, -90, 0,0]));
    	dragonMotion.addKeyFrame(new Keyframe('dragon mid body move',       3.0, [-4, 6, 0, 45, 25, 25, 0]));
    	dragonMotion.addKeyFrame(new Keyframe('dragon back body move', 4.0, [-4, 3,   0, -90, 0, 0,0]));
    };
    keyFrame2() {
    	dragonMotion.keyFrameArray = [];
    	dragonMotion.maxTime = 0.0;
    	dragonMotion.addKeyFrame(new Keyframe('straight',         0.0, [-4, 3,    0, 0, 0, 0, 0]));
    	dragonMotion.addKeyFrame(new Keyframe('dragon head move',	2.0, [-2, 5,   90, 0, -180, 0,0]));
    	dragonMotion.addKeyFrame(new Keyframe('dragon mid body move',       3.0, [-4, 6, 0, 45, 25, 25, 0]));
    	dragonMotion.addKeyFrame(new Keyframe('dragon back body move', 4.0, [-4, 3,   0, -450, 0, 0,0]));
    };
    timestep(dt) {                //  take a time-step;  loop to beginning if at end
	this.currTime += dt;
	if (this.currTime > this.maxTime) 
	    this.currTime = 0;
	var avars = this.getAvars();
	this.updateMatrices(avars);
    }
    getAvars() {                  //  compute interpolated values for the current time
	var i = 1;
	while (this.currTime > this.keyFrameArray[i].time)       // find the right pair of keyframes
	    i++;
	var avars = [];
	for (var n=0; n<this.keyFrameArray[i-1].avars.length; n++) {   // interpolate the values
	    var y0 = this.keyFrameArray[i-1].avars[n];
	    var y1 = this.keyFrameArray[i].avars[n];
	    var x0 = this.keyFrameArray[i-1].time;
	    var x1 = this.keyFrameArray[i].time;
	    var x = this.currTime;
	    var y = y0 + (y1-y0)*(x-x0)/(x1-x0);    // linearly interpolate
	    avars.push(y);
	}
	return avars;         // return list of interpolated avars
    };
}

