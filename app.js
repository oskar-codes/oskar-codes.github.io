const TOUCH = 'ontouchstart' in document.documentElement;
if (TOUCH) {
  document.documentElement.classList.add('touch');
}
const timeTemplate = tinytime('{h}:{mm} {a}');
const dateTemplate = tinytime('{Mo}/{DD}/{YYYY}');

const midX = window.innerWidth / 2;
const midY = window.innerHeight / 2;

const app = new Vue({
  el: '#app',
  data: {
    time: timeTemplate.render(new Date()),
    date: dateTemplate.render(new Date()),
    windowState: {
      home: {
        name: 'Home',
        icon: 'fa-home',
        show: false,
        isMoving: false,
        coords: {x: midX - 50, y: midY - 50},
        content: `
          <h1>Oskar Codes</h1>
          <p>I’m Oskar Zanota, a ${new Date((new Date().getTime()) - (new Date('December 17, 2004').getTime())).getFullYear() - 1970} year old front-end developer based in Zurich, Switzerland. I’m the main programmer at <a target='_blank' href="https://twitter.com/ArtridgeGames">@Artridge</a>, where I work on the projects available <a target='_blank' href="https://artridge.ch">here</a>.</p> 
          <p>I mostly code in HTML, CSS, and JavaScript for web development, but I also have an interest for game development using Python and Lua.</p>
          <p>On this site are listed my own creations, that I develop in my free time. Most of them are just random experiments using various web technologies, that I wanted to share online.</p>
          <p>I also write quite a bit on <a target='_blank' href="https://dev.to/oskarcodes">dev.to</a>.</p>
          <button class="big-btn" onclick="app.openApp('projects')">Go to projects</button>
        `
      },
      projects: {
        name: 'Projects',
        icon: 'fa-folder-open',
        show: false,
        isMoving: false,
        coords: {x: midX - 25, y: midY - 25},
        content: `
          <hr>

          <h2>Desktop Apps</h2>
          <div class="collapsable">
            <ul>
              <li><a target='_blank' href="http://www.mediafire.com/file/4bxkfdjo39megu0/Notes-win32-x64.zip/file">Notes app</a> is a simple note manager made using ElectronJS. It lets you easily create and edit notes, with an advanced rich text editor.</li>
              <li><a target='_blank' href="http://www.mediafire.com/file/lfffkce3kmn5e8w/DiscordWebhookClient-win32-x64.zip/file">Discord Webhook Client</a> is another ElectronJS desktop app that lets you quickly send messages on Discord through webhooks. It supports basic messages as well as embeds with links, pictures and more.</li>
            </ul>
          </div>
          
          <hr>
          
          <h2>Web apps</h2>
          <div class="collapsable">
            <p>These are the most notable web applications I've made, but there's a quite few more on my <a target='_blank' href="https://github.com/oskar-codes?tab=repositories">GitHub profile</a>.</p>
            <ul>
              <li><a target='_blank' href="/uno-online">Uno Online</a> is a web based multiplayer version of the original UNO card game, with unlimited players.</li>
              <li><a target='_blank' href="/chopsticks-game">Chopsticks Game</a> is an online multiplayer version of the famous <a target='_blank' href="https://en.wikipedia.org/wiki/Chopsticks_(hand_game)">Chopsticks</a> hand game.</li>
              <li><a target='_blank' href="/search-by-lyrics">Search By Lyrics</a> lets you enter a part of a song’s lyrics, and displays the song, as well as a Spotify embed if available. This is the perfect solution if you remember the lyrics of a song, but not the title!</li>
              <li><a target='_blank' href="/simple-canvas">Simple Canvas</a> is not a web app, but a library for easy game development for the web. See <a href="/simple-canvas/examples/shooter.html">this example</a>.</li>
              <li><a target='_blank' href="/ascii-converter">ASCII Converter</a> allows you, as the name says, to instantly convert images to ASCII text.</li>
              <li><a target='_blank' href="/web-cmd">Web CMD</a> is an online CMD tool that can control devices remotely through the internet.</li>
              <li><a target='_blank' href="/web-chat">Web chat</a> is a prototype showing how you can use the realtime database in Google’s Firebase service to host data for a messaging web app. This chat features a global room where anyone can chat, and a private room creation feature. Just click the room name on the top left of your screen and start chatting privately.</li>
              <li><a target='_blank' href="/tile-swap">Tile Swap</a> is a little puzzle game with random generation, which means there’s an infinite amount of puzzles for you to solve! (For the new Tile Swap, check <a href="https://artridge.ch/TileSwap">artridge.ch</a>)</li>
              <li><a target='_blank' href="/webline">Webline</a> was my first real project, and is a web based terminal with lots of useful functions, like image to base64 conversion, client data fetching and much more.</li>
            </ul>
          </div>
          
          <hr>
          
          <h2>Chrome extensions</h2>
          <div class="collapsable">
            <p>I’ve also made a couple of Chrome extensions that you might find useful. To install them, unzip the downloaded file, and then browse to chrome://extensions. Activate developer mode, and then click “load unpacked”. You can then browse to the unzipped folder and select it in order to load the extension.</p>
            <ul>
              <li><a target='_blank' href="https://github.com/oskar-codes/oskar-codes.github.io/raw/master/extensions/web-image-converter.zip">Web Image Converter</a> lets you convert images to PNG or JPG simply by right clicking images you find online, and pressing convert. It’s as easy as that!</li>
              <li><a target='_blank' href="https://github.com/oskar-codes/oskar-codes.github.io/raw/master/extensions/PasswordInputDisplayer.zip">Password Input Displayer</a> lets you easily check if the password you typed in a password field is correct. Just right-click the input field, and click “Show Password” to display it.</li>
              <li><a target='_blank' href="https://github.com/oskar-codes/oskar-codes.github.io/raw/master/extensions/deep-fryer.zip">Deep Fryer</a> lets you toggle a DeepFry filter on any web page, because why not!</li>
            </ul>
          </div>

          <hr>
        `
      },
      articles: {
        name: 'Articles',
        icon: 'fa-newspaper',
        show: false,
        coords: {x: midX, y: midY},
        content: `
        `
      },
      social: {
        name: 'Social',
        icon: 'fa-share-alt',
        show: false,
        isMoving: false,
        coords: {x: midX + 25, y: midY + 25},
        content: `
          <div>
            <a target='_blank' href="mailto:oskar.codes@gmail.com"><i class="fas fa-envelope"></i></a>
            <a target='_blank' href="https://twitter.com/ZOSK_"><i class="fab fa-twitter"></i></a>
            <a target='_blank' href="https://dev.to/oskarcodes"><i class="fab fa-dev"></i></a>
            <a target='_blank' href="https://github.com/oskar-codes"><i class="fab fa-github"></i></a>
          </div>
        `
      },
      snake: {
        name: 'Snake',
        icon: 'fa-gamepad',
        show: false,
        isMoving: false,
        coords: {x: midX + 50, y: midY + 50},
        content: `
          <canvas></canvas>
        `
      }
    },
    zOrder: []
  },
  methods: {
    openApp(name) {
      name = name.toLowerCase();
      this.windowState[name].show = true;
      this.moveToFront(name);
    },
    closeApp(name) {
      name = name.toLowerCase();
      this.windowState[name].show = false;
      this.zOrder.splice(0, 0, this.zOrder.pop());
    },
    moveToFront(name) {
      name = name.toLowerCase();
      const index = this.zOrder.indexOf(name);
      this.zOrder.splice(index, 1);
      this.zOrder.push(name);
    }
  }
});

setInterval(() => {
  app.time = timeTemplate.render(new Date());
  app.date = dateTemplate.render(new Date());
}, 1e3);

// Define window zOrder
(() => {
  for (const key in app.windowState) {
    if (Object.hasOwnProperty.call(app.windowState, key)) {
      app.zOrder.push(key);
    }
  }
  app.openApp('home')
})();

// Manage windows
document.querySelectorAll('#desktop .window').forEach((win) => {
  const windowTop = win.querySelector('.window-top');
  const name = Object.keys(app.windowState)[Array.from(win.parentNode.children).indexOf(win)];
  const closeBtn = win.querySelector('.window-top button');
  const windowObj = app.windowState[name];
  win.id = name;
/*
  closeBtn.addEventListener('click', (e) => {
    windowObj.show = false;
  });*/
/*
  win.addEventListener('mousedown', (e) => {
    moveToFront(name);
  });*//*
  windowTop.addEventListener('mousedown', (e) => {
    windowObj.isMoving = true;
  });*/
  addEventListener('mouseup', (e) => {
    windowObj.isMoving = false;
  });
});

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
addEventListener('mousemove', (e) => {
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

// Add code links to web apps
(() => {
  document.querySelectorAll(`li > a[href^='/']:nth-of-type(1)`).forEach((e) => {
    const url = e.getAttribute('href');
    e.parentElement.innerHTML += `&nbsp;<a href='https://github.com/oskar-codes${url}' target='_blank'>[code]</a>`
  })
})();

const dist = (x1, y1, x2, y2) => Math.sqrt((x1 - x2)**2 + (y1- y2)**2);

(() => {
  const canvas = document.querySelector('#background-canvas');
  const ctx = canvas.getContext('2d');
  const background = SimpleCanvas.setupCanvas(ctx);
  background.update = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    background.cls();
    
    if (!TOUCH) {
      for (let x = 0; x < window.innerWidth; x += 50) {
        for (let y = 0; y < window.innerHeight; y += 50) {
          
          let vectorX = (x - background.mouse()[0]) * 0.06;
          let vectorY = (y - background.mouse()[1]) * 0.06;
    
          const lime = tinycolor('#05ffc5');
          const pink = tinycolor('#ff71ce');

          const distance = dist(background.mouse()[0], background.mouse()[1], x, y);
    
          const blend = tinycolor.mix(pink, lime, amount = distance / 8);
    
          background.line(x, y, x + vectorX, y + vectorY, blend, 3);

          const v = distance / 20;

          background.rect(x + v / 2, y + v / 2, v / 2, v / 2, blend);
          // background.rect(x + vectorX * -0.4, y + vectorY * -0.4, v / 2, v / 2, blend)
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
	let dx = 1;
	let dy = 0;
  
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
  });
  hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });

  interface.update = (delay) => {
    if (app.windowState.snake.show && app.zOrder[app.zOrder.length - 1] === 'snake') {

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


addEventListener('load', (e) => {
  loadArticles();
  const div = document.querySelector('#terminal');

  if (TOUCH) {
    div.style.display = 'none';
    document.querySelector('#app').style.filter = 'unset';
    window.setTimeout(e => {
      document.querySelector('#app').style.filter = 'blur(0px)';
    }, 2e3);
    return;
  }

  let turboLoading = false;
  const messages = ['Booting snake', 'Loading OS', 'Drawing icons', 'Installing apps', 'Refactoring legacy code', 'Clearing screen', 'Accelerating disk', 'Encrypting files', 'Aligning background elements'].map(e => e + '...')
  shuffle(messages);
  messages.splice(0, 0, 'Press [ENTER] to enable turbo loading')
  messages.push('Finally starting...');

  let delay = 0;

  let msgIndex = 0;
  function addMessage() {
    const span = document.createElement('span');
    span.classList.add('loading');
    span.textContent = messages[msgIndex];
    div.append(span, document.createElement('br'));

    msgIndex++;
    if (msgIndex < messages.length) {
      setTimeout(addMessage, turboLoading ? 25 : 600 + Math.random() * 400)
    } else {
      document.querySelector('#app').style.filter = 'unset';
      div.style.display = 'none';
      setTimeout(e => {
        document.querySelector('#app').style.filter = 'blur(0px)';
      }, 2e3);
    }
  }
  addMessage();

  addEventListener('keyup', e => {
    if (e.key === 'Enter') turboLoading = true;
  });
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

function loadArticles() {
  const xml = new XMLHttpRequest();
  xml.open('GET', 'https://dev.to/api/articles?username=oskarcodes');
  xml.addEventListener('load', (e) => {
    const data = JSON.parse(xml.responseText);
    const div = document.querySelector('.window#articles .window-content');
    for (let i = 0; i < data.length; i++) {
      const article = data[i];
      const html = `
        <a href="${article.canonical_url}" target='_blank'>
          <div class="article">
            <i>${article.readable_publish_date}</i>
            <h2>${article.title}</h2>
            <p>${article.description}</p>
          </div>
        </a>
      `
      div.innerHTML += html;
    }
  });

  xml.send();
}
