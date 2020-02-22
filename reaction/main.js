      //variable voor de game
      var clickedTime;
      var createdTime;
      var reactionTime;
      var screenWidth = 0;
      var screenHeight = 0;
      var startTime= 0;
      var interval = null;
      var time = 15; // 15 seconden
      var clicks = 0;
      var times = [];
      var miss = 0;

      //berekenend de breedte en hoogte van je scherm.
      $(document).ready( () => {
        screenWidth = $('.screen').width();
        screenHeight = $('.screen').height();
        console.log(`${screenHeight}x${screenWidth}`)
        document.getElementById("scherm").innerHTML="gespeeld op: " + screenHeight + " en " + screenWidth;

      })
      //maakt de box (circle nu) aan.
			function makeBox() {
					var time= 50;
				setTimeout(function() {
          setPos();
					document.getElementById("box").style.display="block";
					createdTime=Date.now();
				}, time);
			}

      //wanneer je raak klikt
			document.getElementById("box").onclick=function(e) {
				clickedTime=Date.now();
				reactionTime=(clickedTime-createdTime)/1000;
        console.log("Your Reaction Time is: " + reactionTime + "seconds");
        times.push(reactionTime);
        clicks++;
      	this.style.display="none";
				makeBox();
        e.stopPropagation();
			}

      //wanneer je mis klikt
       $(".screen").on('click', () => {
         miss++;
         console.log("mis!")
        })

      //deze functie zet het balletje steeds op een andere plek.
      function setPos () {
        const boxH = $('#box').height();   // returns a random integer from 0 to 10
        const boxW = $('#box').width();   // returns a random integer from 0 to 10
        const dividedH = screenHeight / boxH;
        const dividedW = screenWidth / boxW;
        const top = boxH * Math.floor(Math.random() * Math.floor(dividedH));
        const left = boxW * Math.floor(Math.random() * Math.floor(dividedW));
        $('#box').css('top', top + "px");
        $('#box').css('left', left + "px");
      }

      //deze functie is de timer
      function startTimer () {
        startTime = Date.now();
        interval = setInterval ( () => {
          if ((Date.now() - startTime) > (time * 1000)) {
            // klaaaar
            clearInterval(interval);
            showResults();
            $('#timeLeft').text("");
            $('.screen').hide();

            setTimeout(function(){ $('.restart').show(); }, 3000);

          } else {
            $('#timeLeft').text(`Time left: ` + parseFloat((time - (Date.now() - startTime) / 1000)).toFixed(2));
            $('#clicks').text('hits: ' + clicks);

            var accuracy_tussenstap = (100 / clicks * miss).toFixed(2);
            var accuracy = (100 - accuracy_tussenstap).toFixed(2);
            if (accuracy <= 0) {
              document.getElementById("accuracy").innerHTML="accuracy: 0.00%";
            }

            else if (accuracy => 0) {
              document.getElementById("accuracy").innerHTML="accuracy: " + (100 - accuracy_tussenstap).toFixed(2) + "%";
            }

          }
        }, 10)
      }

      //dit laat je resultaat zien.
      function showResults () {
        if (times.length > 0) {
          let sum = times.reduce((previous, current) => current += previous);
          let avg = (sum / times.length).toFixed(2);
          console.log("Average reaction time is: " + avg + " in " + clicks + " clicks")
          document.getElementById("printReactionTime").innerHTML="Average reaction time is: " + avg + " seconds";
          document.getElementById("hits").innerHTML="hit/s: " + (clicks / time).toFixed(3) + "/s";
        }
      }
          startTimer();
          makeBox();

    //waneer er op de restart button word geklikt
    function restart() {
      location.reload();
    }
