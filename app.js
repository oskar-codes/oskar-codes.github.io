const midX = window.innerWidth / 2;
const midY = window.innerHeight / 2;

let app = new Vue({
  el: '#app',
  data: {
    windowState: {
      home: {
        name: 'Home',
        show: true,
        isMoving: false,
        coords: {x: midX - 50, y: midY - 50},
        content: `
          <h1>Oskar Codes</h1>
          <p>I’m a 16 year old web and game developer based in Zurich, Switzerland. I’m the main programmer at <a href="https://twitter.com/ArtridgeGames">@Artridge</a>, where I work on the projects available <a href="https://artridge.itch.io">here</a>.
On this site are listed my own creations, that I develop in my free time.
I also write quite on bit on <a href="https://dev.to/oskarcodes">dev.to</a>.</p>
        `
      },
      projects: {
        name: 'Projects',
        show: false,
        isMoving: false,
        coords: {x: midX - 25, y: midY - 25},
        content: `
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
      }
    },
    zOrder: ['home', 'projects', 'social']
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

    app.windowState[name].show = true;

    moveToFront(name);
  });
});

document.querySelectorAll('.collapsable').forEach((div) => {

  //div.setAttribute('data-height', div.style)
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
