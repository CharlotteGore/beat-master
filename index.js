var tick = require('tick');
var ctx = require('shared-context');
var extend = require('extend');
var Events = require('backbone-events').Events;

function BeatMaster(){

	var self = this;

	// we create a dummy node to make sure that the
	// webaudio time is actually updating..
	var dummy = ctx.createGain();
	dummy.connect(ctx.destination);

	this.setBPM( 120 );

}

BeatMaster.prototype = {
	start : function(){

		var self = this;

		this.handle = tick.add((function beatWrapper (){

			var startTime = ctx.currentTime;
			var beatTime = startTime;

			return function beat (elapsed, stop){
				var now = ctx.currentTime, osc, envelope;
				if(now > beatTime){
					beatTime = beatTime + self.webAudioBeatDuration;
					self.trigger('next-beat-is-at', beatTime);
				}
			};

		}()));

	},
	stop : function(){

		if(this.handle){
			this.handle.stop();
		}

	},
	setBPM : function(){

		this.beatsPerMin = 120;
		this.msPerBeat = 60000 / this.beatsPerMin;
		this.webAudioBeatDuration =	this.msPerBeat / 1000;

		return this;

	}
};

var beatMaster = extend(new BeatMaster(), Events);

module.exports = beatMaster;