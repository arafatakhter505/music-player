const musicList = [
  {
    title: "Music Title 1",
    song_path: "songs/1.mp3",
    cover_path: "covers/1.jpg",
  },
  {
    title: "Music Title 2",
    song_path: "songs/2.mp3",
    cover_path: "covers/2.jpg",
  },
  {
    title: "Music Title 3",
    song_path: "songs/3.mp3",
    cover_path: "covers/3.jpg",
  },
  {
    title: "Music Title 4",
    song_path: "songs/4.mp3",
    cover_path: "covers/4.jpg",
  },
  {
    title: "Music Title 5",
    song_path: "songs/5.mp3",
    cover_path: "covers/5.jpg",
  },
  {
    title: "Music Title 6",
    song_path: "songs/6.mp3",
    cover_path: "covers/6.jpg",
  },
  {
    title: "Music Title 7",
    song_path: "songs/7.mp3",
    cover_path: "covers/7.jpg",
  },
  {
    title: "Music Title 8",
    song_path: "songs/8.mp3",
    cover_path: "covers/8.jpg",
  },
  {
    title: "Music Title 9",
    song_path: "songs/9.mp3",
    cover_path: "covers/9.jpg",
  },
  {
    title: "Music Title 10",
    song_path: "songs/10.mp3",
    cover_path: "covers/10.jpg",
  },
];

const songList = document.getElementById("song-list");

musicList.forEach((music) => {
  const songItem = document.createElement("div");
  songItem.classList.add("song-item");
  songItem.innerHTML = `
          <img src=${music.cover_path} alt="" />
          <span>${music.title}</span>
          `;
  songList.appendChild(songItem);
});

let songIndex = 0;
const audioElement = new Audio(musicList[songIndex].song_path);
const playBtn = document.getElementById("play-btn");
const backwardBtn = document.getElementById("backward-btn");
const forwardBtn = document.getElementById("forward-btn");
const playingGif = document.getElementById("playing-gif");
const playCover = document.getElementById("play-cover");
const playTitle = document.getElementById("play-title");
const soundMute = document.getElementById("sound-mute");
const progressbar = document.getElementById("progressbar");
const songItemList = document.querySelectorAll(".song-item");

playCover.src = musicList[songIndex].cover_path;
playTitle.innerText = musicList[songIndex].title;

playBtn.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play();
    playBtn.classList.remove("fa-circle-play");
    playBtn.classList.add("fa-circle-pause");
    playBtn.classList.add("primary-color");
    playingGif.style.opacity = 1;
  } else {
    audioElement.pause();
    playBtn.classList.remove("fa-circle-pause");
    playBtn.classList.remove("primary-color");
    playBtn.classList.add("fa-circle-play");
    playingGif.style.opacity = 0;
  }
});

soundMute.addEventListener("click", () => {
  if (audioElement.muted === false) {
    audioElement.muted = true;
    soundMute.classList.add("primary-color");
  } else {
    audioElement.muted = false;
    soundMute.classList.remove("primary-color");
  }
});

audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  progressbar.value = progress;
});

progressbar.addEventListener("change", () => {
  audioElement.currentTime = (progressbar.value * audioElement.duration) / 100;
});

forwardBtn.addEventListener("click", () => {
  if (songIndex == musicList.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  songControl();
});

backwardBtn.addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex--;
  }
  songControl();
});

for (let i = 0; i < songItemList.length; i++) {
  songItemList[i].addEventListener("click", () => {
    songIndex = i;
    songControl();
  });
}

const songControl = () => {
  audioElement.src = musicList[songIndex].song_path;
  playCover.src = musicList[songIndex].cover_path;
  playTitle.innerText = musicList[songIndex].title;
  audioElement.currentTime = 0;
  audioElement.play();
  playBtn.classList.remove("fa-circle-play");
  playBtn.classList.add("fa-circle-pause");
  playBtn.classList.add("primary-color");
};
