export function soundClicked(audio) {
  audio.play();
  setTimeout(() => {
    audio.pause();
  }, 2000);
  audio.currentTime = 0;
}
