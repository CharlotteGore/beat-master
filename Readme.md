
# beat-master


```js

	// create a beep lasting a quarter of a second
	// every half a second

	var webAudioContext = require('shared-context');
	var beatMaster = require('beat-master');

	beatMaster.setBPM(120);
	beatMaster.start();

	beatMaster.on('next-beat-is-at', function (start){
		var osc = ctx.createOscillator();
		osc.connect(ctx.destination);
		osc.start( start );
		osc.stop( start+ 0.25)
	});

	beatMaster.on('next-beat-is-at', function(start){
		var buffer = ctx.createBufferSource();
		buffer.buffer = someSampleIMadeEarlier;
		buffer.connect(ctx.destination);
		buffer.start( start );

	})

```

## Installation

  Install with [component(1)](http://component.io):

    $ component install charlottegore/beat-master

## API



## License

  MIT