let count1 = 0;
    let count2 = 0;

    let posP1Y = 0;
    let posP2Y = 0; 

    let posBallX = 600;
    let posBallY = 304;

    let speedX = 4;
    let speedY = 4;

    score();

    function score() {
      const canvasRects = document.getElementById("score");
      let ctx = canvasRects.getContext("2d");
      ctx.clearRect(0, 0, 1200, 150);
      ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      ctx.shadowOffsetX = -20;
      ctx.shadowOffsetY = 20;
      ctx.shadowBlur = 2;
      ctx.fillStyle = "white";
      ctx.font = "110px Arial";
      ctx.fillText(( count1 + ":" + count2 ), 525, 110);
    }


    player1(posP1Y);

    function player1(y) {
      const canvasRects = document.getElementById("player1");
      let ctx = canvasRects.getContext("2d");
      ctx.clearRect(0, 0, 1200, 600);
      ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
      ctx.shadowOffsetX = -15;
      ctx.shadowOffsetY = 20;
      ctx.shadowBlur = 2;
      ctx.fillStyle = "white";
      ctx.fillRect(30, y, 20, 100);
    }
    

    player2(posP2Y);

    function player2(y) {
      const canvasRects = document.getElementById("player2");
      let ctx = canvasRects.getContext("2d");
      ctx.clearRect(0, 0, 1200, 600);
      ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
      ctx.shadowOffsetX = -5;
      ctx.shadowOffsetY = 20;
      ctx.shadowBlur = 2;
      ctx.fillStyle = "white";
      ctx.fillStyle = "white";
      ctx.fillRect(1150, y, 20, 100);
    }


    ball(posBallX, posBallY);

    function ball(x, y) {
      const canvasRects = document.getElementById("ball");
      let ctx = canvasRects.getContext("2d");
      ctx.clearRect(0, 0, 1200, 600);
      ctx.fillStyle = "yellow";
      ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      ctx.shadowOffsetX = -10;
      ctx.shadowOffsetY = 10;
      ctx.shadowBlur = 2;
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
    }


    function winner(who) {
      const canvasRects = document.getElementById("winner");
      let ctx = canvasRects.getContext("2d");
      ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      ctx.shadowOffsetX = -20;
      ctx.shadowOffsetY = 20;
      ctx.shadowBlur = 2;
      ctx.fillStyle = "yellow";
      ctx.font = "80px Arial";
      ctx.fillText( ("Player " + who + " win !"), 30, 80);
    }

    function countTime(count) {
      const canvasRects = document.getElementById("countTime");
      let ctx = canvasRects.getContext("2d");
      ctx.clearRect(0, 0, 1200, 150);
      ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      ctx.shadowOffsetX = -20;
      ctx.shadowOffsetY = 20;
      ctx.shadowBlur = 2;
      ctx.fillStyle = "yellow";
      ctx.font = "110px Arial";
      ctx.fillText(count, 220, 90);
    }


    document.addEventListener("keydown", () => {
      let player1DownId,
      player1UpId,
      player2DownId,
      player2UpId

      if (event.key === "Control") { player1DownId = setInterval(() => {downRocket(1)}, 1); }
      document.addEventListener("keyup", () => { if (event.key === "Control") clearInterval(player1DownId); });

      if (event.key === "Shift") { player1UpId = setInterval(() => {upRocket(1)}, 1); }
      document.addEventListener("keyup", () => { if (event.key === "Shift") clearInterval(player1UpId); });

      if (event.key === "ArrowDown") { player2DownId = setInterval(() => {downRocket(2)}, 1); }
      document.addEventListener("keyup", () => { if (event.key === "ArrowDown") clearInterval(player2DownId); });

      if (event.key === "ArrowUp") { player2UpId = setInterval(() => {upRocket(2)}, 1); }
      document.addEventListener("keyup", () => { if (event.key === "ArrowUp") clearInterval(player2UpId); });
      
      });


      function downRocket(player) {
        if (player === 1) {
          if (posP1Y != 502) {
            posP1Y = posP1Y + 1;
            player1(posP1Y);
          }
        }

        if (player === 2) {
          if (posP2Y != 501) {
            posP2Y = posP2Y + 1;
            player2(posP2Y);
          }
        }
      }

      function upRocket(player) {
        if (player === 1) {
          if (posP1Y != 5) {
            posP1Y = posP1Y - 1;
            player1(posP1Y);
          }
        }

        if (player === 2) {
          if (posP2Y != 5) {
            posP2Y = posP2Y - 1;
            player2(posP2Y);
          }
        }
      }


      let ballH = {
        cornX : "",
        cornY : "",

        update : function() {
         ball(posBallX, posBallY);
        }
      }

      const area = {
        right : 1144,
        left : 60,
        top : 10,
        bottom : 590,
      }

      let btnStart = document.getElementsByTagName("button")[0];
      btnStart.addEventListener("click", () => { 
        btnStart.classList.add("unvisible");
        timer();

      });


          
      function timer() {

        setTimeout( () => { document.getElementById('count').play(); }, 500) 
        let countTimer = 4;
        let startTimerId = setInterval(()=> {
        countTimer = countTimer - 1;
        countTime(countTimer);
        }, 1000);

        setTimeout(() => {
          clearInterval(startTimerId);
          
          const canvasRects = document.getElementById("countTime");
          let ctx = canvasRects.getContext("2d");
          ctx.clearRect(0, 0, 1200, 150);
          
          ball(posBallX = 600, posBallY = 304);
          ballH.cornX = corner();
          ballH.cornY = corner();
          //speedX = 4;
          //speedY = 4;
          play();
        }, 4000);

      }


      function corner() {
        if (Math.random() > 0.5) return "+";
        else return "-";
      }
      

      function play() {
        let requestID = requestAnimationFrame(play);

        if (ballH.cornX === "-") posBallX -= speedX;
        if (ballH.cornX === "+") posBallX += speedX;

        if (posBallX === area.right && posP2Y <= posBallY && posP2Y + 100 >= posBallY) {
          document.getElementById('pong').play();
          speedX = -speedX;
        }

        if (posBallX > area.right) {
          document.getElementById('fail').play();
          count1 = count1 + 1; 
          cancelAnimationFrame(requestID);
          score();

          if (count1 === 5 ) {
            winner(1);
            document.getElementById('win').play();
            cancelAnimationFrame(requestID);
            return;
          } 

          timer();
        }

        
        if (posBallX === area.left && posP1Y <= posBallY && posP1Y + 100 >= posBallY) {
          document.getElementById('pong').play();
          speedX = -speedX;
        }
        
        if (posBallX < area.left) {
          document.getElementById('fail').play();
          count2 = count2 + 1; 
          cancelAnimationFrame(requestID);
          score();

          if (count2 === 5 ) {
            winner(2);
            document.getElementById('win').play();
            cancelAnimationFrame(requestID);
            return;
          } 

          timer();
        }

        
        if (ballH.cornY == "-") posBallY -= speedY;
        if (ballH.cornY == "+") posBallY += speedY;

        if (posBallY >= area.bottom) {
          document.getElementById('pong').play();
          speedY = -speedY;
        }

        if (posBallY <= area.top) {
          document.getElementById('pong').play();
          speedY = -speedY;
        }
      

        ballH.update(posBallX, posBallY);
      }