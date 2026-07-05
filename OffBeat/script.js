const audio = document.getElementById('offbeatAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
const seekBar = document.getElementById('seekBar');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const statusText = document.getElementById('statusText');

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function updatePlayState() {
  playPauseBtn.textContent = audio.paused ? '▶' : '❚❚';
  statusText.textContent = audio.paused ? 'Paused' : 'Playing';
}

audio.addEventListener('loadedmetadata', () => {
  duration.textContent = formatTime(audio.duration);
  seekBar.max = Math.floor(audio.duration || 100);
});

audio.addEventListener('timeupdate', () => {
  currentTime.textContent = formatTime(audio.currentTime);
  seekBar.value = audio.currentTime;
});

audio.addEventListener('play', updatePlayState);
audio.addEventListener('pause', updatePlayState);
audio.addEventListener('ended', () => {
  seekBar.value = 0;
  currentTime.textContent = '0:00';
  statusText.textContent = 'Finished';
  playPauseBtn.textContent = '▶';
});

playPauseBtn.addEventListener('click', async () => {
  try {
    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  } catch (error) {
    statusText.textContent = 'Playback blocked';
  }
});

seekBar.addEventListener('input', () => {
  audio.currentTime = Number(seekBar.value);
  currentTime.textContent = formatTime(audio.currentTime);
});

updatePlayState();
