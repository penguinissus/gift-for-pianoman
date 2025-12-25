let money = 0;
let mpc = 1;
let mpcCost = 10;
let mps = 0;
let mpsCost = 50;
let level = 0;

const moneyDisplay = document.getElementById("money");
const mpcDisplay = document.getElementById("mpc");
const mpcCostDisplay = document.getElementById("mpcCost");
const mpsDisplay = document.getElementById("mps");
const mpsCostDisplay = document.getElementById("mpsCost");
const mpsMessage = document.getElementById("upgradeMessage");

const pianist = document.getElementById("piano");
const drummer = document.getElementById("drums");
const harmonicaPlayer = document.getElementById("harmonica");
const ocarinaPlayer = document.getElementById("ocarina");

const trackNames = ["track1", "track2", "track3", "track4", "track5", "track6", "track7"];
const trackGains = {};

let ctx;
let isPlaying = false;

const upgrades = [
    "The stage is empty, add something",
    "A bassline is so boring, upgrade your piano player",
    "Add some drums",
    "I want that harmonica",
    "Where's the rest of the drumset",
    "Give the pianist a buff",
    "Now where's the melody",
    "Now perform"
]

// this whole section doesn't work
// const lastGoneDisplay = document.getElementById("lastGone");
// const lastVisit = localStorage.getItem("lastVisit");
// if (lastVisit) {
//     const diff = Date.now() - Number(lastVisit);
//     lastGoneDisplay.textContent = Math.floor(diff/1000);
// }
// window.addEventListener('beforeunload', function(e) {
//     e.preventDefault();
//     e.returnValue = '';//chrome requires this
//     localStorage.setItem("lastVisit", Date.now());
// });

function updateDisplay() {
    moneyDisplay.textContent = money;
    mpcDisplay.textContent = mpc;
    mpcCostDisplay.textContent = mpcCost;
    mpsDisplay.textContent = mps;
    mpsCostDisplay.textContent = mpsCost;
    mpsMessage.textContent = upgrades[level];
}

async function clickCookie() {
    money += mpc;
    if (!ctx) {
        ctx = new AudioContext();
    }
    if (!isPlaying) {
        await ctx.resume();
        playSound('track1', 'audio/track1.mp3');
        playSound('track2', 'audio/track2.mp3');
        playSound('track3', 'audio/track3.mp3');
        playSound('track4', 'audio/track4.mp3');
        playSound('track5', 'audio/track5.mp3');
        playSound('track6', 'audio/track6.mp3');
        playSound('track7', 'audio/track7.mp3');
        isPlaying = true;
    }
    if(trackGains.track1) {
        console.log(trackGains.track1.gain.value);
    } else {
        console.log(trackGains.track1);
        console.log(trackGains);
    }
    updateDisplay();
}
async function playSound(name, url) {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(buffer);
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    source.buffer = audioBuffer;
    source.loop = true;
    gain.gain.value = 0; //on mute to begin with
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start();
    trackGains[name] = gain;
}

function upgradeMPC() {
    if (money >= mpcCost) {
        money -= mpcCost;
        mpc++;
        mpcCost *= 2;
        updateDisplay();
        trackGains.track1.gain.value = 1;
    } else {
        alert("Not enough money to upgrade!");
    }
}

function buyMPS() {
    if (money >= mpsCost) {
        money -= mpsCost;
        mps++;
        mpsCost *= 2;
        level++;
        setInterval(function() {
            money += mps;
            updateDisplay();
        }, 1000);
        updateDisplay();
    } else {
        alert("Not enough money to buy MPS!");
    }
}

updateDisplay();