export function soundClicked(audio, time) {
  audio.play();
  setTimeout(() => {
    audio.pause();
  }, time);
  audio.currentTime = 0;
}
