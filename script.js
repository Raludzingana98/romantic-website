// 🌸 CONSTANTS
const ANNIVERSARY = '2026-05-15T00:00:00';
const REL_START = '2025-05-15T00:00:00';
const MEETUP_DATE = '2025-12-16T00:00:00';
const heartsContainer = document.querySelector('.hearts');

// 🌸 UTIL SHORTCUTS
const qs = s => document.querySelector(s);
const qsa = s => [...document.querySelectorAll(s)];

// 🌸 HEART ANIMATION
function spawnHeart() {
  const h = document.createElement('div');
  h.className = 'heart';
  h.style.left = Math.random() * 100 + '%';
  h.style.top = (10 + Math.random() * 60) + '%';
  const size = 20 + Math.random() * 36;
  h.style.width = h.style.height = size + 'px';
  heartsContainer.appendChild(h);
  const dur = 4000 + Math.random() * 3000;
  h.animate(
    [
      { transform: 'translateY(0) scale(1)', opacity: 1 },
      { transform: 'translateY(-220px) scale(.7)', opacity: 0 }
    ],
    { duration: dur, easing: 'ease-out' }
  ).onfinish = () => h.remove();
}
setInterval(() => { if (Math.random() > 0.6) spawnHeart(); }, 700);

// 🌸 MODALS
qs('#open-letter').onclick = () => qs('#modal').classList.add('open');
qs('#close-modal').onclick = () => qs('#modal').classList.remove('open');
qs('#scroll-gallery').onclick = () => document.getElementById('gallery-section').scrollIntoView({ behavior: 'smooth' });
qs('#confetti').onclick = () => { for (let i = 0; i < 60; i++) setTimeout(spawnHeart, i * 30); };

// 🌸 LIGHTBOX
qsa('#gallery img').forEach(img => img.onclick = () => {
  qs('#lightbox-img').src = img.src;
  qs('#lightbox').classList.add('open');
});
qs('#close-lightbox').onclick = () => qs('#lightbox').classList.remove('open');

// 🌸 TIMER FUNCTIONS (Anniversary, Relationship Duration, Meetup)
function updateTimers() {
  const now = new Date();
  const ann = new Date(ANNIVERSARY);
  const rel = new Date(REL_START);
  const meetup = new Date(MEETUP_DATE);

  const diffAnn = ann - now;
  const diffMeet = meetup - now;
  const up = now - rel;

  const fmt = ms => {
    const d = Math.floor(ms / 86400000),
          h = Math.floor(ms / 3600000) % 24,
          m = Math.floor(ms / 60000) % 60,
          s = Math.floor(ms / 1000) % 60;
    return `${d}d ${h}h ${m}m ${s}s`;
  };

  qs('#countdown').textContent = diffAnn <= 0 ? 'Happy Anniversary! 💖' : fmt(diffAnn);
  qs('#countup').textContent = fmt(up);
  qs('#meetup').textContent = diffMeet <= 0 ? 'You’re together again! 💞' : fmt(diffMeet);
}
setInterval(updateTimers, 1000);
updateTimers();

// 🌸 LOVE MESSAGES
const loveReasons = [
  "You make ordinary days feel magical ✨",
  "Your smile is my favorite sunrise 🌅",
  "You see the best in me — always 💞",
  "Every laugh with you feels like a melody 🎶",
  "You love me without conditions or limits 💫",
  "Even in silence, you understand me 💗",
  "You make forever sound too short ❤️"
];

qs('#new-message').onclick = () => {
  const msg = loveReasons[Math.floor(Math.random() * loveReasons.length)];
  qs('#love-text').textContent = msg;
};

// 🌸 QUOTES
const quotes = [
  "“In all the world, there is no heart for me like yours.” — Maya Angelou",
  "“I love you not only for what you are, but for what I am when I am with you.” — Roy Croft",
  "“Every love story is beautiful, but ours is my favorite.” 💖",
  "“To love and be loved is to feel the sun from both sides.” — David Viscott"
];
qs('#quote-text').textContent = quotes[new Date().getDate() % quotes.length];

// 🌸 MUSIC PLAYER (Multiple Songs)
const music = qs('#music');
const titleEl = qs('#song-title');

const playlist = [
  { title: "Thojana Ya Thesele", src: "music/Thojana Ya Thesele.mp3" },
  { title: "Best Part of Me (feat. YEBBA)", src: "music/05 Best Part of Me (feat. YEBBA) - (SongsLover.com).mp3" },
  { title: "In Case You Didn’t Know – Brett Young", src: "music/Brett_Young_-_In_Case_You_Didn't_Know_(Official_Music_Video)(256k).mp3" },
  { title: "Halo – Beyoncé", src: "music/Beyoncé_-_Halo(256k).mp3" },
  { title: "Ride For Me – B Young", src: "music/B_Young_-_Ride_For_Me_(Official_Video)(256k).mp3" },
  { title: "I Wanna Get Next to You", src: "music/09- I Wanna Get Next to you.mp3" },
  { title: "Long Distance", src: "music/07 Long Distance.mp3" },
  { title: "All By Myself", src: "music/06 - All By Myself.mp3" }
];

let current = 0;

function fadeIn() {
  music.volume = 0;
  const fade = setInterval(() => {
    if (music.volume < 1) music.volume += 0.1;
    else clearInterval(fade);
  }, 200);
}

function loadSong(index) {
  const song = playlist[index];
  music.src = song.src;
  titleEl.textContent = `Song: ${song.title}`;
}

function playSong() {
  loadSong(current);
  music.play();
  fadeIn();
}

qs('#play').onclick = playSong;
qs('#pause').onclick = () => music.pause();
qs('#next').onclick = () => {
  current = (current + 1) % playlist.length;
  playSong();
};
qs('#prev').onclick = () => {
  current = (current - 1 + playlist.length) % playlist.length;
  playSong();
};
loadSong(current);

// 💞 MEMORY GAME
const memories = [
  '💖 Our first date',
  '🌅 The beach walk',
  '🎶 Our favorite song',
  '🍰 Birthday surprise',
  '💌 Love letter day',
  '🌸 Picnic laughter'
];

let deck = [...memories, ...memories].sort(() => Math.random() - 0.5);
const gameBoard = qs('#game');
const gameStatus = qs('#game-status');
let firstCard = null;
let lock = false;

function createGame() {
  gameBoard.innerHTML = '';
  deck = [...memories, ...memories].sort(() => Math.random() - 0.5);
  deck.forEach(memory => {
    const card = document.createElement('div');
    card.className = 'card-game';
    card.dataset.value = memory;
    card.textContent = '💞';
    gameBoard.appendChild(card);
  });
  firstCard = null;
  lock = false;
  gameStatus.textContent = '';
}

gameBoard.addEventListener('click', e => {
  const c = e.target;
  if (!c.classList.contains('card-game') || lock || c.classList.contains('flipped') || c.classList.contains('matched')) return;
  c.textContent = c.dataset.value;
  c.classList.add('flipped');

  if (!firstCard) {
    firstCard = c;
    return;
  }

  if (firstCard.dataset.value === c.dataset.value) {
    c.classList.add('matched');
    firstCard.classList.add('matched');
    firstCard = null;

    if ([...gameBoard.children].every(x => x.classList.contains('matched'))) {
      setTimeout(() => {
        gameStatus.textContent = 'You matched all the memories! 💖';
        gameStatus.style.color = '#ffd1e6';
      }, 400);
    }
  } else {
    lock = true;
    setTimeout(() => {
      c.textContent = '💞';
      firstCard.textContent = '💞';
      c.classList.remove('flipped');
      firstCard.classList.remove('flipped');
      firstCard = null;
      lock = false;
    }, 900);
  }
});

qs('#reset-game').onclick = createGame;
createGame();

// 🌸 LOVE QUIZ
qs('#calculate').addEventListener('click', () => {
  const name1 = qs('#name1').value.trim();
  const name2 = qs('#name2').value.trim();

  if (!name1 || !name2) {
    alert('Please enter both names 💕');
    return;
  }

  const q1 = qs('#q1').value;
  const q2 = qs('#q2').value;
  const q3 = qs('#q3').value;

  let score = 50 + Math.floor(Math.random() * 50);
  if (q1 === 'dinner' && q3 === 'handwritten') score += 10;
  if (q2 === 'time') score += 5;
  if (score > 100) score = 100;

  const resultEl = qs('#result');
  resultEl.style.display = 'block';
  resultEl.innerHTML = `
    💞 ${name1} & ${name2}'s Love Score: <strong>${score}%</strong> 💞<br>
    ${score > 80 ? "You're a perfect match! 💍" : score > 60 ? "You’re pretty compatible! 💕" : "There’s potential... keep trying! 🌹"}
  `;
});
