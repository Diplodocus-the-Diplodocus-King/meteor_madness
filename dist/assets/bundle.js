!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}n.r(e);var o=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.dinoId="dino-".concat(n),this.source=e.src,this.gameArea=document.querySelector(".game-area"),this.xPosition=Math.random()*(window.innerWidth-200),this.yPosition=0,this.facingDirection=Math.round(Math.random())*Math.PI,this.walkSpeed=2*Math.random(),this.jumpInterval=Math.round(65*Math.random()+35),this.jumpCounter=0,this.hit=!1}var e,n,o;return e=t,(n=[{key:"init",value:function(){var t=document.createElement("img");t.src=this.source,t.classList.add("dino"),t.setAttribute("id","".concat(this.dinoId)),this.gameArea.appendChild(t),t.style.left=this.xPosition,t.style.transform="rotateY(".concat(this.facingDirection,"rad)"),0===this.walkSpeed&&(this.walkSpeed=.1),this.moveDino(t)}},{key:"moveDino",value:function(t){var e=this,n=setInterval((function(){e.hit&&clearInterval(n),0===e.facingDirection&&e.xPosition<window.innerWidth-200?(e.xPosition+=e.walkSpeed,t.style.left=e.xPosition):0===e.facingDirection&&e.xPosition>=window.innerWidth-200?(e.facingDirection=Math.PI,t.style.transform="rotateY(".concat(e.facingDirection,"rad)")):e.facingDirection===Math.PI&&e.xPosition>0?(e.xPosition-=e.walkSpeed,t.style.left=e.xPosition):e.facingDirection===Math.PI&&e.xPosition<=0&&(e.facingDirection=0,t.style.transform="rotateY(".concat(e.facingDirection,"rad)")),e.jumpCounter===e.jumpInterval-1?(e.yPosition+=10,t.style.bottom=e.yPosition,e.jumpCounter++):e.jumpCounter===e.jumpInterval?(e.yPosition+=-10,t.style.bottom=e.yPosition,e.jumpCounter=0):e.jumpCounter>e.jumpInterval?e.jumpCounter=0:e.jumpCounter++}),50)}},{key:"flyDino",value:function(t){var e=this,n=0;n=1===Math.round(Math.random())?Math.random()*(Math.PI/180*75)+Math.PI/180*45:Math.random()*(Math.PI/180*315)+Math.PI/180*285;var i=0;this.velocity=20,this.facingDirection=0;var o=setInterval((function(){e.yPosition+=e.velocity*Math.cos(n),e.xPosition+=e.velocity*Math.sin(n),i+=.05,e.xPosition<0||e.xPosition>window.innerWidth||e.yPosition>window.innerHeight?(t.remove(),clearInterval(o)):(t.style.left=e.xPosition,t.style.bottom=e.yPosition,t.style.transform="rotate(".concat(i,"rad)"))}),50)}}])&&i(e.prototype,n),o&&i(e,o),t}();function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var a=function(){function t(e,n,i,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.laserId="laser-".concat(e),this.gameArea=document.querySelector(".game-area"),this.xPosition=n,this.yPosition=i,this.rotation=o,this.velocity=3,this.hit=!1}var e,n,i;return e=t,(n=[{key:"init",value:function(){var t=document.createElement("img");t.src="./dist/assets/images/laser-green.svg",t.classList.add("laser"),t.setAttribute("id","".concat(this.laserId)),this.gameArea.appendChild(t),this.xPosition+=-t.width/2,t.style.left=this.xPosition,t.style.bottom=this.yPosition,t.style.transform="rotate(".concat(this.rotation,"rad)");var e=document.createElement("audio");e.src="./dist/assets/sounds/weapon_player.mp3",e.setAttribute("preload","auto"),e.setAttribute("controls","none"),e.style.display="none",this.gameArea.appendChild(e),e.play(),this.moveLaser(t,e)}},{key:"moveLaser",value:function(t,e){var n=this,i=setInterval((function(){n.xPosition+=n.velocity*Math.sin(n.rotation),n.yPosition+=n.velocity*Math.cos(n.rotation),n.hit?(t.remove(),e.remove(),clearInterval(i)):(t.style.left=n.xPosition,t.style.bottom=n.yPosition)}),10)}}])&&r(e.prototype,n),i&&r(e,i),t}();function s(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var u=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.powerupId="powerup-".concat(e),this.gameArea=document.querySelector(".game-area"),this.xPosition=Math.round(Math.random()*(window.innerWidth-100-100)+100),this.yPosition=Math.round(Math.random()*(window.innerHeight-100-100)+100),this.powerupType=Math.round(2*Math.random()),this.hit=!1}var e,n,i;return e=t,(n=[{key:"init",value:function(){var t=document.createElement("img");switch(this.powerupType){case 0:t.src="./dist/assets/images/powerups/energy.svg";break;case 1:t.src="./dist/assets/images/powerups/fire.svg";break;case 2:t.src="./dist/assets/images/powerups/bullet.svg"}t.classList.add("powerup"),t.setAttribute("id","".concat(this.powerupId)),this.gameArea.appendChild(t),t.style.left=this.xPosition,t.style.bottom=this.yPosition;var e=document.createElement("audio");e.src="./dist/assets/sounds/explosion_powerup.mp3",e.setAttribute("preload","auto"),e.setAttribute("controls","none"),e.style.display="none",this.gameArea.appendChild(e),this.trigger(t,e)}},{key:"trigger",value:function(t,e){var n=this,i=setInterval((function(){n.hit&&(t.src="./dist/assets/images/powerups/powerup_hit.gif",e.play(),setTimeout((function(){t.remove()}),700),setTimeout((function(){e.remove()}),983),clearInterval(i))}),10)}}])&&s(e.prototype,n),i&&s(e,i),t}();function c(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var h=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.gameArea=document.querySelector(".game-area"),this.cannon=document.querySelector(".laser-cannon"),this.dinoArray=new Array,this.laserArray=new Array,this.powerupArray=new Array,this.laserCounter=0,this.powerupCounter=0,this.firerate=500,this.damage=1,this.shots=1,this.gunReloaded=!0,this.powerupOn=!1}var e,n,i;return e=t,(n=[{key:"init",value:function(){var t=this;this.createDinos(),this.cannon.style.left="".concat(window.innerWidth/2-this.cannon.width/2),window.onresize=function(){t.cannon.style.left="".concat(window.innerWidth/2-t.cannon.width/2)},window.addEventListener("mousemove",(function(e){t.rotateCannon(e)})),window.addEventListener("click",(function(){if(t.gunReloaded){t.gunReloaded=!t.gunReloaded;var e=window.innerWidth/2,n=t.cannon.height/2,i=window.getComputedStyle(t.cannon,null).getPropertyValue("transform"),o=i.slice(i.indexOf("(")+1,i.indexOf(")")).split(", "),r=Math.asin(o[1]),s=t.laserArray.length;t.laserArray.push(new a(t.laserCounter,e,n,r)),t.laserArray[s].init(),t.laserCounter>=99?t.laserCounter=0:t.laserCounter++,setTimeout((function(){t.gunReloaded=!t.gunReloaded}),t.firerate)}}))}},{key:"createDinos",value:function(){var t=this;fetch("./dist/assets/json/dino.json").then((function(t){return t.json()})).then((function(e){e.forEach((function(e,n){t.dinoArray[n]=new o(e,n),t.dinoArray[n].init()}))}))}},{key:"createPowerup",value:function(){var t=this.powerupArray.length;this.powerupArray.push(new u(this.powerupCounter)),this.powerupArray[t].init()}},{key:"rotateCannon",value:function(t){var e=window.innerWidth/2-t.clientX,n=window.innerHeight-this.cannon.height/2-t.clientY;t.clientY>=window.innerHeight-this.cannon.height/2&&(n=1);var i=Math.atan(e/n);this.cannon.style.transform="rotate(".concat(-i,"rad)")}},{key:"powerupActive",value:function(t){var e=this;switch(this.powerupOn=!0,t){case 0:this.firerate=250;break;case 1:this.damage=2;break;case 2:this.shots=3}setTimeout((function(){e.powerupOn=!1,console.log("powerdown"),e.firerate=500,e.damage=1,e.shots=1}),15e3)}},{key:"updateLaserArray",value:function(){var t=this.laserArray.filter((function(t){return null!==document.getElementById("".concat(t.laserId))}));this.laserArray=t}},{key:"updateDinoArray",value:function(){var t=this.dinoArray.filter((function(t){return null!==document.getElementById("".concat(t.dinoId))}));this.dinoArray=t}},{key:"updatePowerupArray",value:function(){var t=this.powerupArray.filter((function(t){return null!==document.getElementById("".concat(t.powerupId))}));this.powerupArray=t}}])&&c(e.prototype,n),i&&c(e,i),t}();function l(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var d=function(){function t(e,n,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.meteorId="meteor-".concat(e),this.gameArea=document.querySelector(".game-area"),this.xPosition=Math.random()*(window.innerWidth-100),this.yPosition=-100,this.rotation=Math.random()*(Math.PI/180*36),this.hitPoints=i,this.velocity=n,this.spinV=Math.random()*(.03-.001)+.001,this.spinDirection=Math.random(),this.spin=0,this.hit=!1,this.groundHit=!1,this.damageTaken=1}var e,n,i;return e=t,(n=[{key:"init",value:function(){var t=document.createElement("img");switch(this.hitPoints){case 1:t.src="./dist/assets/images/meteors/meteor_basic.svg";break;case 2:t.src="./dist/assets/images/meteors/meteor_2.svg";break;case 3:t.src="./dist/assets/images/meteors/meteor_3.svg";break;case 4:t.src="./dist/assets/images/meteors/meteor_4.svg";break;case 5:t.src="./dist/assets/images/meteors/meteor_5.svg";break;case 6:t.src="./dist/assets/images/meteors/meteor_6.svg"}t.classList.add("meteor"),t.setAttribute("id","".concat(this.meteorId)),this.gameArea.appendChild(t),t.style.left=this.xPosition,t.style.top=this.yPosition;var e=this.xPosition,n=document.createElement("audio");n.src="./dist/assets/sounds/explosion_asteroid.mp3",n.setAttribute("preload","auto"),n.setAttribute("controls","none"),n.style.display="none",this.gameArea.appendChild(n),this.moveMeteor(t,e,n)}},{key:"moveMeteor",value:function(t,e,n){var i=this,o=setInterval((function(){i.yPosition+=i.velocity*Math.cos(i.rotation),e<window.innerWidth/2?i.xPosition+=i.velocity*Math.sin(i.rotation):i.xPosition-=i.velocity*Math.sin(i.rotation),i.spinDirection>.5?i.spin+=i.spinV:i.spin-=i.spinV,i.hit||i.groundHit?(i.hitPoints-=i.damageTaken,i.hitPoints<=0||i.groundHit?(!1===i.groundHit&&(t.src="./dist/assets/images/meteors/explosion.gif"),t.style.transform="rotate(0rad)",clearInterval(o),n.play(),setTimeout((function(){t.remove()}),700),setTimeout((function(){n.remove()}),842)):(t.style.left=i.xPosition,t.style.top=i.yPosition,t.style.transform="rotate(".concat(i.spin,"rad)"),i.hit=!i.hit)):(t.style.left=i.xPosition,t.style.top=i.yPosition,t.style.transform="rotate(".concat(i.spin,"rad)"))}),10)}}])&&l(e.prototype,n),i&&l(e,i),t}();function m(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var p=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.gameArea=document.querySelector(".game-area"),this.meteorArray=new Array,this.meteorCounter=0,this.wave=1,this.waveSize=Math.round(Math.pow(this.wave,2)+10),this.waveRemianing=this.waveSize,this.intervalMax=5e3,this.intervalMin=3e3,this.meteorMax=Math.round(.1*this.waveSize),this.meteorMin=Math.round(.01*this.waveSize),this.meteorVmax=1,this.meteorVmin=.5}var e,n,i;return e=t,(n=[{key:"init",value:function(){this.waveGenerator()}},{key:"updateMeteorArray",value:function(){var t=this.meteorArray.filter((function(t){return null!==document.getElementById("".concat(t.meteorId))}));this.meteorArray=t}},{key:"waveGenerator",value:function(){var t=this,e=Math.random()*(this.intervalMax-this.intervalMin)+this.intervalMin,n=Math.round(Math.random()*(this.meteorMax-this.meteorMin)+this.meteorMin);setTimeout((function(){for(var e=1;e<=n;e++){var i=t.meteorArray.length,o=t.meteorRoll(),r=Math.random()*(t.meteorVmax-t.meteorVmin)+t.meteorVmin;t.meteorArray.push(new d(t.meteorCounter,r,o)),t.meteorArray[i].init(),t.meteorCounter++}t.waveRemianing-=n,t.waveRemianing<=0?(console.log("new wave!"),t.wave++,t.waveSize=Math.round(Math.pow(t.wave,2)+10),t.waveRemianing=t.waveSize,t.intervalMax=5e3-100*t.wave,t.intervalMin=3e3-100*t.wave,t.meteorMax=Math.round(.1*t.waveSize),t.meteorMin=Math.round(.01*t.waveSize),t.meteorVmax=1+.05*t.wave,t.meteorVmin=.5+.05*t.wave,t.waveGenerator()):t.waveGenerator()}),e)}},{key:"meteorRoll",value:function(){var t=Math.round(100*Math.random());return this.wave<3?t>=75?2:1:this.wave<5?t>=88?3:t>=63?2:1:this.wave<7?t>=94?4:t>=81?3:t>=56?2:1:this.wave<10?t>=97?5:t>=91?4:t>=78?3:t>=53?2:1:t>=98?6:t>=95?5:t>=89?4:t>=77?3:t>=52?2:1}}])&&m(e.prototype,n),i&&m(e,i),t}(),f=new h;f.init();var y=new p;y.init();var v=document.createElement("audio");v.src="./dist/assets/sounds/music_background.mp3",v.setAttribute("preload","auto"),v.setAttribute("controls","none"),v.style.display="none",document.querySelector(".game-area").appendChild(v),setInterval((function(){f.updateLaserArray(),f.updateDinoArray(),f.updatePowerupArray(),y.updateMeteorArray(),y.meteorArray.length>=1&&f.powerupArray.length<1&&!1===f.powerupOn&&f.createPowerup(),f.updatePowerupArray(),f.powerupArray.forEach((function(t){var e=document.getElementById("".concat(t.powerupId)).getBoundingClientRect(),n=[],i=0;e.left<e.right?n[0]=e.left+(e.right-e.left)/2:e.left>e.right?n[0]=e.right+(e.left-e.right)/2:n[0]=e.left,e.top<e.bottom?n[1]=e.top+(e.bottom-e.top)/2:e.top>e.bottom?n[1]=e.bottom+(e.top-e.bottom)/2:n[1]=e.top,i=e.height>e.width?e.width/2*.45:e.height/2*.45,f.laserArray.forEach((function(e){var o=document.getElementById("".concat(e.laserId)).getBoundingClientRect(),r=[o.left,o.top],a=[o.right,o.top];(Math.pow(r[0]-n[0],2)+Math.pow(r[1]-n[1],2)<=Math.pow(i,2)||Math.pow(a[0]-n[0],2)+Math.pow(a[1]-n[1],2)<=Math.pow(i,2))&&(t.hit=!0,e.hit=!0,f.powerupActive(t.powerupType))}))})),f.updateLaserArray(),y.meteorArray.forEach((function(t){var e=document.getElementById("".concat(t.meteorId)),n=e.getBoundingClientRect(),i=[],o=0;n.left<n.right?i[0]=n.left+(n.right-n.left)/2:n.left>n.right?i[0]=n.right+(n.left-n.right)/2:i[0]=n.left,n.top<n.bottom?i[1]=n.top+(n.bottom-n.top)/2:n.top>n.bottom?i[1]=n.bottom+(n.top-n.bottom)/2:i[1]=n.top,o=n.height>n.width?n.width/2*.45:n.height/2*.45,(n.top>.9*window.innerHeight||n.bottom>.9*window.innerHeight)&&f.dinoArray.forEach((function(n){var r=document.getElementById("".concat(n.dinoId)),a=r.getBoundingClientRect(),s=[];s=a.left<a.right?[a.left+(a.right-a.left)/2,window.innerHeight]:[a.right+(a.left-a.right)/2,window.innerHeight],Math.pow(s[0]-i[0],2)+Math.pow(s[1]-i[1],2)<=Math.pow(3*o,2)&&(n.hit=!0,t.groundHit=!0,e.style.height="10%",e.style.width="10%",e.src="./dist/assets/images/meteors/explosion_floor.gif",n.flyDino(r))})),(n.top>window.innerHeight||n.bottom>window.innerHeight)&&(t.groundHit=!0,e.style.height="10%",e.style.width="10%",e.src="./dist/assets/images/meteors/explosion_floor.gif"),f.laserArray.forEach((function(e){var n=document.getElementById("".concat(e.laserId)).getBoundingClientRect(),r=[n.left,n.top],a=[n.right,n.top];Math.pow(r[0]-i[0],2)+Math.pow(r[1]-i[1],2)<=Math.pow(o,2)||Math.pow(a[0]-i[0],2)+Math.pow(a[1]-i[1],2)<=Math.pow(o,2)?(t.damageTaken=f.damage,t.hit=!0,e.hit=!0):(n.top<0||n.right<0||n.left>window.innerWidth)&&(e.hit=!0)}))}))}),10)}]);