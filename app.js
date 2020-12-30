const midX = window.innerWidth / 2;
const midY = window.innerHeight / 2;

let app = new Vue({
  el: '#app',
  data: {
    windowState: {
      home: {
        name: 'Home',
        icon: 'fa-home',
        show: true,
        isMoving: false,
        coords: {x: midX - 50, y: midY - 50},
        content: `
          <h1>Oskar Codes</h1>
          <p>I’m Oskar Zanota, a 16 year old web and game developer based in Zurich, Switzerland. I’m the main programmer at <a href="https://twitter.com/ArtridgeGames">@Artridge</a>, where I work on the projects available <a href="https://artridge.ch">here</a>.
On this site are listed my own creations, that I develop in my free time.
I also write quite on bit on <a href="https://dev.to/oskarcodes">dev.to</a>.</p>
          <p>And as a bonus, you can play <a href="#" onclick="openApp('snake');">snake</a> on this website!</p>
        `
      },
      projects: {
        name: 'Projects',
        icon: 'fa-project-diagram',
        show: false,
        isMoving: false,
        coords: {x: midX - 25, y: midY - 25},
        content: `
          <hr>

          <h2>Desktop Apps</h2>
          <div class="collapsable">
            <p><a href="http://www.mediafire.com/file/4bxkfdjo39megu0/Notes-win32-x64.zip/file">Notes app</a> is a simple note manager made using ElectronJS. It lets you easily create and edit notes, with an advanced rich text editor.</p>
            <p><a href="http://www.mediafire.com/file/lfffkce3kmn5e8w/DiscordWebhookClient-win32-x64.zip/file">Discord Webhook Client</a> is another ElectronJS desktop app that lets you quickly send messages on Discord through webhooks. It supports basic messages as well as embeds with links, pictures and more.</p>
          </div>
          
          <hr>
          
          <h2>Web apps</h2>
          <div class="collapsable">
            <p><a href="/search-by-lyrics">Search By Lyrics</a> lets you enter a part of a song’s lyrics, and displays the song, as well as a Spotify embed if available. This is the perfect solution if you remember the lyrics of a song, but not the title!</p>
            <p><a href="/ascii-converter">ASCII Converter</a> allows you, as the name says, to instantly convert images to ASCII text.</p>
            <p><a href="/chopsticks-game">Chopsticks Game</a> is an online multiplayer version of the famous <a href="https://en.wikipedia.org/wiki/Chopsticks_(hand_game)">Chopsticks</a> hand game.</p>
            <p><a href="/web-chat">Web chat</a> is a prototype showing how you can use the realtime database in Google’s Firebase service to host data for a messaging web app. This chat features a global room where anyone can chat, and a private room creation feature. Just click the room name on the top left of your screen and start chatting privately.</p>
            <p><a href="/tile-swap">Tile Swap</a> is a little puzzle game with random generation, which means there’s an infinite amount of puzzles for you to solve!</p>
            <p><a href="/webline">Webline</a> is a web based terminal with lots of useful functions, like image to base64 conversion, client data fetching and much more.</p>
          </div>
          
          <hr>
          
          <h2>Chrome extensions</h2>
          <div class="collapsable">
            <p>I’ve also made a couple of Chrome extensions that you might find useful. To install them, unzip the downloaded file, and then browse to chrome://extensions. Activate developer mode, and then click “load unpacked”. You can then browse to the unzipped folder and select it in order to load the extension.</p>
            <p><a href="https://github.com/oskar-codes/oskar-codes.github.io/raw/master/extensions/web-image-converter.zip">Web Image Converter</a> lets you convert images to PNG or JPG simply by right clicking images you find online, and pressing convert. It’s as easy as that!</p>
            <p><a href="https://github.com/oskar-codes/oskar-codes.github.io/raw/master/extensions/PasswordInputDisplayer.zip">Password Input Displayer</a> lets you easily check if the password you typed in a password field is correct. Just right-click the input field, and click “Show Password” to display it.</p>
            <p><a href="https://github.com/oskar-codes/oskar-codes.github.io/raw/master/extensions/deep-fryer.zip">Deep Fryer</a> lets you toggle a DeepFry filter on any web page, because why not!</p>
          </div>

          <hr>
        `
      },
      social: {
        name: 'Social',
        icon: 'fa-share-alt',
        show: false,
        isMoving: false,
        coords: {x: midX, y: midY},
        content: `
          <div>
            <a href="mailto:oskar.codes@gmail.com"><i class="fas fa-envelope"></i></a>
            <a href="https://twitter.com/ZOSK_"><i class="fab fa-twitter"></i></a>
            <a href="https://dev.to/oskarcodes"><i class="fab fa-dev"></i></a>
            <a href="https://github.com/oskar-codes"><i class="fab fa-github"></i></a>
          </div>
        `
      },
      snake: {
        name: 'Snake',
        icon: 'fa-gamepad',
        show: false,
        isMoving: false,
        coords: {x: midX + 25, y: midY},
        content: `
          <canvas></canvas>
        `
      }
    },
    zOrder: ['home', 'projects', 'social', 'snake']
  }
});

// Manage windows
document.querySelectorAll('#desktop .window').forEach((win) => {
  const windowTop = win.querySelector('.window-top');
  const name = Object.keys(app.windowState)[Array.from(win.parentNode.children).indexOf(win)];
  const closeBtn = win.querySelector('.window-top button');
  const windowObj = app.windowState[name];
  win.id = name;

  closeBtn.addEventListener('click', (e) => {
    windowObj.show = false;
  });

  win.addEventListener('mousedown', (e) => {
    moveToFront(name);
  });
  windowTop.addEventListener('mousedown', (e) => {
    windowObj.isMoving = true;
  });
  window.addEventListener('mouseup', (e) => {
    windowObj.isMoving = false;
  });
});

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
window.addEventListener('mousemove', (e) => {
  for (win in app.windowState) {
    const windowObj = app.windowState[win];
    if (windowObj.isMoving && window.innerWidth > 800) {
      windowObj.coords.x += e.movementX;
      windowObj.coords.y += e.movementY;

      windowObj.coords.x = clamp(windowObj.coords.x, 0, window.innerWidth)
      windowObj.coords.y = clamp(windowObj.coords.y, 300, window.innerHeight)
    }
  }
});

// Open windows from navbar
document.querySelectorAll('#nav div button').forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    const name = btn.getAttribute('data-name').toLowerCase();
    openApp(name);
  });
});

function openApp(name) {
  name = name.toLowerCase();
  app.windowState[name].show = true;
  moveToFront(name);
}

// manage collapsables
document.querySelectorAll('.collapsable').forEach((div) => {
  div.style.height = '0px';
  const header = div.previousElementSibling;
  header.addEventListener('click', (e) => {
    if (div.style.height === '0px') {
      div.style.height = div.scrollHeight + 'px';
    } else {
      div.style.height = '0px';
    }
  });
});

function moveToFront(name) {
  const index = app.zOrder.indexOf(name);
  app.zOrder.splice(index, 1);
  app.zOrder.push(name);
}

const dist = (x1, y1, x2, y2) => Math.sqrt((x1 - x2)**2 + (y1- y2)**2);

(() => {
  const canvas = document.querySelector('#background-canvas');
  const ctx = canvas.getContext('2d');
  const background = SimpleCanvas.setupCanvas(ctx);
  background.update = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    background.cls();
    
    if (window.innerWidth > 800) {
      for (let x = 0; x < window.innerWidth; x += 50) {
        for (let y = 0; y < window.innerHeight; y += 50) {
          
          let vectorX = (x - background.mouse()[0]) * 0.06;
          let vectorY = (y - background.mouse()[1]) * 0.06;
    
          const lime = tinycolor('#05ffc5');
          const pink = tinycolor('#ff71ce');

          const distance = dist(background.mouse()[0], background.mouse()[1], x, y);
    
          const blend = tinycolor.mix(pink, lime, amount = distance / 8);
    
          background.line(x, y, x + vectorX, y + vectorY, blend, 3);

          const v = distance / 20
          background.rect(x + v / 2, y + v / 2, v / 2, v / 2, blend)
          // background.rect(x - v / 2, y - v / 2, v, v, blend)
        }
      }
    }
  }
})();

(() => {
  const canvas = document.querySelector('.window#snake canvas');
  const ctx = canvas.getContext('2d');
  const interface = SimpleCanvas.setupCanvas(ctx);
  canvas.width = 794;
  canvas.height = 570;

  let x = 500;
	let y = 300;
	const snake = [
		{ x: 400, y: 300 },
		{ x: 450, y: 300 },
		{ x: 500, y: 300 }
  ]
	let dx = 1
	let dy = 0
  
  const apple = {};
  setApple();
  let counter = 0;
  const directions = {
    left: 2,
    up: 8,
    right: 4,
    down: 16
  }
  const hammertime = new Hammer(canvas);
  hammertime.on('pan', function(ev) {
    if (window.innerWidth < 800) {
      const dir = ev.direction;
      if (dir === directions.left) {
        dx = -1; dy = 0;
      }
      if (dir === directions.right) {
        dx = 1; dy = 0;
      }
      if (dir === directions.down) {
        dx = 0; dy = 1;
      }
      if (dir === directions.up) {
        dx = 0; dy = -1;
      }
    }
  });
  hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });

  interface.update = (delay) => {
    if (app.windowState.snake.show) {

      const parentRect = canvas.parentNode.getBoundingClientRect();
      canvas.width = parentRect.width;
      canvas.height = parentRect.height;

      const fps = 1/delay;
      counter++;

      if (window.innerWidth >= 800) {
        if (interface.btn('LEFT')) {
          dx = -1; dy = 0;
        }
        if (interface.btn('RIGHT')) {
          dx = 1; dy = 0;
        }
        if (interface.btn('DOWN')) {
          dx = 0; dy = 1;
        }
        if (interface.btn('UP')) {
          dx = 0; dy = -1;
        }
      }

      if (counter > fps * 200) {
        counter = 0;

        x += dx * 50;
        y += dy * 50;

        if (x > canvas.width) x = 0;
        if (y > canvas.height) y = 0;
        if (x < 0) x = canvas.width - canvas.width % 50;
        if (y < 0) y = canvas.height - canvas.height % 50;

        if (x === apple.x && y === apple.y) {
          setApple();
        } else {
          snake.splice(0,1);
        }
        snake.push({
          x: x,
          y: y
        });
      }

      let dead = false;
      for (let i = 0; i < snake.length - 1; i++) {
        const tile = snake[i];
        if (tile.x === x && tile.y === y) {
          dead = true;
        }
      }
      if (dead) {
        snake.length = 0;
        x = 500;
        y = 300;
        dx = 1;
        dy = 0;
        for (let i = 0; i < 3; i++) {
          snake.push({
            x: 400 + i * 50,
            y: 300
          });
        }
        setApple();
      }

      interface.cls();
      for (let i = 0; i < snake.length; i++) {
        const p = snake[i];
        interface.rectfill(p.x, p.y, 47, 47, '#05ffc5');
      }
      interface.rectfill(apple.x, apple.y, 47, 47, '#b967ff');
    }
  }

  function setApple() {
    const appleX = Math.floor(Math.random() * canvas.width);
    const appleY = Math.floor(Math.random() * (canvas.height - 50));
    apple.x = appleX - appleX % 50;
    apple.y = appleY - appleY % 50; 
  }

  document.querySelector('button[data-name="Snake"]').addEventListener('click', (e) => {
    if (window.innerWidth < 800) {
      setApple();
    }
  });
})();


window.addEventListener('load', (e) => {
  const messages = ['Booting snake', 'Loading OS', 'Drawing icons', 'Installing apps', 'Refactoring legacy code', 'Clearing screen', 'Accelerating disk', 'Encrypting files', 'Aligning background elements'];
  shuffle(messages);
  messages.push('Finally starting');

  const div = document.querySelector('#terminal');
  let delay = 0;

  messages.forEach((msg) => {
    window.setTimeout(() => {
      div.innerHTML += `<span class="loading">${msg}...</span><br>`;
    }, delay);
    delay += 600 + Math.random() * 400;
  });

  window.setTimeout(() => {
    document.querySelector('#app').style.filter = 'unset';
    div.style.display = 'none';
  }, messages.length * 1000);
});

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
