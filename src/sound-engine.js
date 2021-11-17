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

export function playAudio(text) {
  if (!playSound) { return; }
  var audio = new Audio();
  audio.src = generateWav(text);
  audio.volume = 0.5;
  currentAudio = audio;
  audio.play();
}

function generateWav(text) {
  return synth.Animalese(`${ text }`,
    false,
    0.7).dataURI;
}