/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sound-engine.js":
/*!*****************************!*\
  !*** ./src/sound-engine.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   playAudio: () => (/* binding */ playAudio),
/* harmony export */   playAudioWav: () => (/* binding */ playAudioWav)
/* harmony export */ });
// IMOPORTED!
let playSound = true;
let currentAudio = null;
let alreadyPlayed = false;


const synth = new Animalese('animalese/animalese.wav', function() {
  // document.getElementById('preview').disabled = false;
  // document.getElementById('download').disabled = false;
});

document.onfocus = function() {
  playSound = true;
};

document.onblur = function() {
  playSound = false;
  currentAudio.pause();
  currentAudio.currentTime = 0;
};

function toggleAudio() {
  playSound = !playSound;

  if (!playSound) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
}

function playAudioWav(wavUrl) {
  if (!playSound) { return; }
  const audio = new Audio(wavUrl);
  audio.volume = 1;
  currentAudio = audio;
  audio.play();
}

function playAudio(text) {
  if (!playSound) { return; }
  var audio = new Audio();
  audio.src = generateWav(text);
  audio.volume = 0.3;
  currentAudio = audio;
  audio.play();
}

function generateWav(text) {
  return synth.Animalese(`${ text }`,
    false,
    0.7).dataURI;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sound_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sound-engine */ "./src/sound-engine.js");


const startButton = document.querySelector("#start-btn");

startButton.addEventListener("click", () => {
  startButton.classList.add("hide");
  start();
});

createClouds();

function start() {
  // hide address bar on mobile
  window.scrollTo(0, 1);

  let alreadyPlayed = false;
  const revealData = document.querySelector("#Avataaar").getBBox();
  const pageBg = getParameterByName("background");

  const randomQuote = randomQuotes();
  let currentQuote = randomQuote();
  document.querySelector("#textbox").innerText = currentQuote.quote;

  pageBg && (document.body.style = `--page-background: ${pageBg}`);

  const mouthTimeline = createMouthAnimation();
  // coverAnimation();
  coverAnimation(() => displayRandomText());
  const blinkTimeline = blnkAnimation();

  // function relifAnimation(onComplete) {
  //   blinkTimeline.pause(0);
  //   $("#Eyes\\/Closed-😌").show();
  //   $("#Eyes\\/Default-😀").hide();
  //   $("#Mouth\\/Disbelief").show();
  //   $("#Mouth-Smile").hide();
  //   $("#Mouth-Serious").hide();
  // }

  function shockedAnimation(onComplete) {
    blinkTimeline.pause(0);
    $("#Eyes\\/Surprised-😳").show();
    $("#Eyes\\/Default-😀").hide();
    $("#Mouth\\/Scream-Open").show();
    $("#Mouth-Smile").hide();
    $("#Mouth-Serious").hide();
    $("#Face,#Top").addClass("shake");
    const shockTl = new TimelineMax({
      // paused: true,
      // repeat: 3,

      onComplete: () => {
        setTimeout(() => {
          console.log("finished shock");
          $("#Eyes\\/Surprised-😳").hide();
          $("#Eyes\\/Default-😀").show();
          $("#Mouth\\/Scream-Open").hide();
          $("#Mouth-Smile").show();
          $("#Face,#Top").removeClass("shake");
          blinkTimeline.play();
          onComplete && onComplete();
        }, 1000);
      },
    });

    shockTl.add("shock").to(
      "#Eyes\\/Surprised-😳",
      {
        duration: 2,
        ease: SteppedEase.config(1),
        css: {
          display: "initial",
        },
      },
      "shock"
    );
  }

  function laughAnimation(onComplete) {
    (0,_sound_engine__WEBPACK_IMPORTED_MODULE_0__.playAudio)("ha.ha.ha");
    blinkTimeline.pause(0);
    $("#Eyes\\/Happy-😁").show();
    $("#Eyes\\/Default-😀").hide();
    const laughTl = new TimelineMax({
      // paused: true,
      repeat: 3,

      onComplete: () => {
        setTimeout(() => {
          console.log("finished laugh");
          $("#Eyes\\/Happy-😁").hide();
          $("#Eyes\\/Default-😀").show();
          blinkTimeline.play();
          onComplete && onComplete();
        }, 1000);
      },
    });

    $("#Face").css({
      transform: "matrix(1, 0, 0, 1, 76, 80)",
    });

    laughTl
      .add("up")
      .to(
        "#Top",
        {
          duration: 0.1,
          y: -3,
          ease: Bounce.easeOut,
        },
        "up"
      )
      .to(
        "#Face",
        {
          duration: 0.1,
          css: {
            transform: "matrix(1, 0, 0, 1, 76, 77)",
          },
          // ease: Bounce.easeOut
        },
        "up"
      )
      .add("down")
      .to(
        "#Top",
        {
          duration: 0.1,
          y: 0,
          ease: Bounce.easeOut,
        },
        "down"
      )
      .to(
        "#Face",
        {
          duration: 0.1,
          css: {
            transform: "matrix(1, 0, 0, 1, 76, 80)",
          },
          // ease: Bounce.easeOut
        },
        "down"
      );
  }

  function displayRandomText() {
    currentQuote = randomQuote();
    mouthTimeline.play();
    // uncomment to replace with 'u' sounds
    (0,_sound_engine__WEBPACK_IMPORTED_MODULE_0__.playAudio)(currentQuote.quote /*currentQuote.quote.replace(/./g, 'u')*/);
    createTextAnimation("#textbox", currentQuote.quote, () => {
      mouthTimeline.pause();
      setTimeout(
        () =>
          currentQuote.animation
            ? currentQuote.animation(() => setTimeout(displayRandomText, 6000))
            : laughAnimation(() => setTimeout(displayRandomText, 6000)),
        500
      );
    }).play();
  }

  function stopEyesFollow() {
    $("body").off("mousemove");
    // $("body").off("touchmove");
  }

  function eyesFollowMouse() {
    $("body").mousemove(_.throttle(moveEyesToDirection, 1000 / 60));

    // $("body").on(
    //   "touchmove",
    //   _.throttle((e) => {
    //     // stop touch event
    //     e.stopPropagation();
    //     e.preventDefault();
    //     moveEyesToDirection(e);
    //   }, 1000 / 60)
    // );

    function moveEyesToDirection(event) {
      var eye = $("#Eyes\\/Default-😀");
      var eyesX = eye.offset().left + eye.width() / 2;
      var eyesY = eye.offset().top + eye.height() / 2;
      const maxMovement = 8;
      const distanceX = event.pageX - eyesX;
      const distanceY = event.pageY - eyesY;
      const maxY = $(window).height();
      const maxX = $(window).width();
      // console.log("eyes", { eyesX, eyesY });
      // console.log("mouse", { x: event.pageX, y: event.pageY });
      // console.log("screen size:", { maxX, maxY });
      // console.log("distance", { distanceX, distanceY });
      let eyesNewX = 0;
      let eyesNewY = 8;

      if (Math.abs(distanceX) > 100) {
        eyesNewX = distanceX > 0 ? 8 : -8;
      } else {
        eyesNewX = (distanceX / 100) * 8;
      }

      if (Math.abs(distanceY) > 100) {
        eyesNewY = distanceY > 0 ? 13 : 3;
      } else {
        eyesNewY = (distanceY / 100) * 5 + 8;
      }

      eye.css({
        "-webkit-transform": `translate(${eyesNewX}px, ${eyesNewY}px)`,
        "-moz-transform": `translate(${eyesNewX}px, ${eyesNewY}px)`,
        "-ms-transform": `translate(${eyesNewX}px, ${eyesNewY}px)`,
        transform: `translate(${eyesNewX}px, ${eyesNewY}px)`,
      });
    }
  }

  function createTextAnimation(id, text, onComplete) {
    if (!id) {
      return;
    }

    document.querySelector(id).innerText = text;

    var mySplitText = new SplitText(id, {
      type: "words,chars",
    });
    var chars = mySplitText.chars;

    var tl = new TimelineMax({
      paused: true,
      onComplete: () => mouthTimeline.pause(0) && onComplete && onComplete(),
    });
    tl.call(
      function () {
        $("#textbox").addClass("visible");
      },
      null,
      null,
      0
    ).staggerFrom(
      chars,
      0.8,
      {
        opacity: 0,
        ease: SteppedEase.config(1),
      },
      0.08,
      "+=0"
    );

    return tl;
  }

  function figureRadius(w, h) {
    return Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2;
  }

  function createMouthAnimation() {
    const mouthTimeline = gsap.timeline({
      repeat: -1,
      onRepeat: () => (alreadyPlayed = true),
    });

    mouthTimeline.pause();

    mouthTimeline.to("#Mouth-Smile", {
      duration: 0.5,
      ease: SteppedEase.config(1),
      css: {
        display: "none",
      },
    });

    return mouthTimeline;
  }

  function coverAnimation(onComplete) {
    const revealData = document.querySelector("#Avataaar").getBBox();

    TweenMax.set("#cover", {
      attr: {
        cx: revealData.x + revealData.width / 2,
        cy: revealData.y + revealData.height / 2,
        r: figureRadius(revealData.width, revealData.height),
      },
    });

    const revealTl = new TimelineMax({
      onComplete,
    });

    revealTl.delay(1).from("#cover", 1, {
      attr: { r: 0 },
      ease: Power4.easeInOut,
    });
  }

  function blnkAnimation() {
    const tl = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        // console.log("blinking");
        // tl.play("blink");
        // !alreadyPlayed && mouthTimeline.play();
        eyesFollowMouse();
        // textAnimation.play();
      },
    });

    tl.add("blink")
      .to(
        "#Eyes\\/Happy-😁",
        {
          duration: 0.2,
          ease: SteppedEase.config(1),
          css: {
            display: "initial",
          },
        },
        2
      )
      .to(
        "#Eyes\\/Default-😀",
        {
          duration: 0.2,
          ease: SteppedEase.config(1),
          css: {
            display: "none",
          },
        },
        2
      );

    return tl;
  }

  function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[[]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return "";
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  function wizardAnimation(onComplete) {
    (0,_sound_engine__WEBPACK_IMPORTED_MODULE_0__.playAudioWav)("http://noproblo.dayjo.org/ZeldaSounds/LOZ/LOZ_Fanfare.wav");
    onComplete && onComplete();
  }

  function randomQuotes() {
    const quotes = [];
    // quotes.push({ quote: "hello! welcome to my GitHub Profile!" });
    quotes.push({
      quote: "IT'S DANGROUS TO GO ALONE!\nTAKE THIS.",
      animation: wizardAnimation,
    });
    quotes.push({
      quote: "I'm speaking a language called Animalese from Animal Crossing. Should I be worried about copyrights? AM I DOOMED??",
      animation: shockedAnimation,
    });
    quotes.push({
      quote: "Warning: Dates in Calendar are closer than they appear.",
    });
    // quotes.push({ quote: "Give me ambiguity or give me something else." });
    quotes.push({
      quote: "Make it idiot proof and someone will make a better idiot.",
    });
    quotes.push({ quote: "I'm not a complete idiot, some parts are missing!" });
    quotes.push({ quote: "He who laughs last thinks slowest!" });
    quotes.push({
      quote: "Always remember you're unique, just like everyone else.",
    });
    // quotes.push({ quote: "Save the whales, collect the whole set" });
    // quotes.push("A flashlight is a case for holding dead batteries.");
    quotes.push({ quote: "Lottery: A tax on people who are bad at math." });
    quotes.push({ quote: "There's too much blood in my caffeine system." });
    // quotes.push({
    //   quote: "Artificial Intelligence usually beats real stupidity.",
    // });
    quotes.push({
      quote: "Hard work has a future payoff.  Laziness pays off now.",
    });
    // quotes.push({
    //   quote: "Friends help you move. Real friends help you move bodies.",
    // });
    quotes.push({
      quote: "I wont rise to the occasion, but I'll slide over to it.",
    });
    quotes.push({ quote: "What is a free gift ? Aren't all gifts free?" });
    // quotes.push({ quote: "Very funny, Scotty. Now beam down my clothes." });
    quotes.push({ quote: "Consciousness: that annoying time between naps." });
    quotes.push({
      quote: "Oops. My brain just hit a bad sector.",
      animation: shockedAnimation,
    });
    // quotes.push("I used to have a handle on life, then it broke.");
    // quotes.push({
    //   quote: "Don't take life too seriously, you won't get out alive.",
    // });
    quotes.push({
      quote: "I don't suffer from insanity.  I enjoy every minute of it.",
    });
    quotes.push({
      quote: "Better to understand a little than to misunderstand a lot.",
    });
    quotes.push({ quote: "The gene pool could use a little chlorine." });
    // quotes.push({ quote: "When there's a will, I want to be in it." });
    // quotes.push({
    //   quote: "All generalizations are false, including this one.",
    // });
    quotes.push({
      quote: "Change is inevitable, except from a vending machine.",
    });
    // quotes.push({
    //   quote: "C program run.  C program crash.  C programmer quit.",
    // });
    // quotes.push({ quote: "Criminal Lawyer is a redundancy." });
    quotes.push({ quote: "90% of all statistics are made up" });
    // quotes.push("A man needs a good memory after he has lied.");
    // quotes.push({ quote: "Beam me up, Scotty!" });
    // quotes.push({ quote: "Oh Beulah, peel me a grape." });
    quotes.push({ quote: "C++ should have been called B" });
    quotes.push({ quote: "Energizer Bunny Arrested! Charged with battery." });
    quotes.push({
      quote:
        "ERROR: Uncaught TypeError: Cannot read property 'length' of undefined..... Haha! Just kidding!",
    });
    quotes.push({
      quote:
        "I'm starting to wonder if there are more client-side JavaScript frameworks than there are apps that use them...",
    });
    quotes.push({
      quote:
        'Drinking game for web developers:\n(1) Think of a noun\n(2) Google "<noun>.js"\n(3) If a library with that name exists - drink!',
    });
    quotes.push({
      quote:
        'JavaScript makes me want to flip the table and say "Fuck this shit"...\nbut I can never be sure what "this" refers to......',
    });
    quotes.push({
      quote: "TypeScript.....?\nThat's one hell of an autocompletion plugin!",
    });

    quotes.push({
      quote: "How do you comfort a JavaScript bug?\n...\n...\nYou console it",
    });
    quotes.push({
      quote:
        "How did the JavaScript developer learn TypeScript so quickly?\n...\n...\nBecause they coded ANYtime, ANYplace, and ANYwhere",
    });
    quotes.push({
      quote:
        "Why was the JavaScript developer sad?\n...\n...\nBecause they didn't Node how to Express themselves",
    });
    quotes.push({
      quote:
        "What tool do you use to switch versions of node?\n...\n...\noh... nvm, I figured it out.",
    });
    quotes.push({
      quote:
        "TypeScript is easy! You just do exactly the opposite of what you did in java",
    });
    quotes.push({
      quote:
        `Why did the JavaScript developer go broke?\n...\n...\nBecause he used typeof on a penny and got a "string" instead of a "number".`,
    });

    quotes.push({
      quote:
        `Why did the JavaScript array go out of bounds?\n...\n...\nBecause it didn't know its own length.`,
    });

    quotes.push({
      quote:
        `Why was the JavaScript developer sad?\n...\n...\nBecause they didn't Node how to Express himself.`,
    });

    quotes.push({
      quote:
        `Why did the child component have such great self-esteem?\n...\n...\nBecause its parent kept giving it props!`,
    });

    quotes.push({
      quote:
        `Don't trust JavaScript programmers. All they do is promises but they never callback.`,
    });

    quotes.push({
      quote:
      `Why did the functional component feel lost?\n...\n...\nBecause it didn't know what state it was in!`,
    });

    quotes.push({
      quote:
      `JavaScript is a lot like English; No one knows how to use semicolons properly.`,
    });

    quotes.push({
      quote:
      `You want to hear a javascript joke?\n...\n...\nI'll callback later.`,
    });

    quotes.push({
      quote:
      `Have you heard of that new band "1023 Megabytes"?\n...\n...\nThey're pretty good, but they don't have a gig just yet.`,
    });

    quotes.push({
      quote:
      `What kind of computer sings the best?\n...\n...\nA Dell.`,
    });

    quotes.push({
      quote:
      `How many programmers does it take to change a light bulb?\n...\n...\nNone, because it is a hardware problem.`,
    });

    // return quotes[Math.floor(Math.random() * quotes.length)];

    let copy = quotes.slice(0);

    return function() {
      if (copy.length < 1) { copy = quotes.slice(0); }
      const index = Math.floor(Math.random() * copy.length);
      const item = copy[index];
      copy.splice(index, 1);
      return item;
    };
  }
}

function createClouds() {
  var cloudbox = document.getElementById("cloudbox");
  var cloudbox1 = document.getElementById("cloudbox2");

  function createCloud(cloudbox, color) {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    color = color || "white";
    cloudbox.style = `--cloud-color: ${color}`;
    // CREATE THE CLOUD SPAN
    var cloud = document.createElement("span");
    cloud.style.width = Math.abs(Math.random() * (180 - 60) + 60) + "px";

    // ANIMATION VARIABLES
    var cloudTime = Math.abs(Math.random() * (240 - 120) + 120);
    var cloudTop = Math.abs(Math.random() * vh);

    // GSAP TIMELINES
    var tlAcross = new TimelineMax({ repeat: -1 });
    tlAcross
      .set(cloud, { left: 0 })
      .seek(cloudTime * Math.random())
      .to(cloud, cloudTime, { left: "100%", ease: Power0.easeNone });

    var tlDown = new TimelineMax({ repeat: -1 });
    tlDown
      .set(cloud, { top: cloudTop, ease: Power0.easeNone })
      .seek(cloudTime * Math.random())
      .to(cloud, cloudTime / 2, { top: cloudTop + 40, ease: Power0.easeNone })
      .to(cloud, cloudTime / 2, { top: cloudTop, ease: Power0.easeNone });

    // ADD IT TO THE CLOUDBOX
    cloudbox.appendChild(cloud);
  }

  for (var i = 0; i < 25; i++) {
    createCloud(cloudbox, "white");
  }

  for (var i = 0; i < 25; i++) {
    createCloud(cloudbox1, "lightgrey");
  }
}

})();

/******/ })()
;
//# sourceMappingURL=index.js.map