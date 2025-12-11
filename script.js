let money = 0;
let mpc = 1;
let mpcCost = 10;
let mps = 0;
let mpsCost = 50;

const moneyDisplay = document.getElementById("money");
const mpcDisplay = document.getElementById("mpc");
const mpcCostDisplay = document.getElementById("mpcCost");
const mpsDisplay = document.getElementById("mps");
const mpsCostDisplay = document.getElementById("mpsCost");

function updateDisplay() {
    moneyDisplay.textContent = money;
    mpcDisplay.textContent = mpc;
    mpcCostDisplay.textContent = mpcCost;
    mpsDisplay.textContent = mps;
    mpsCostDisplay.textContent = mpsCost;
}

function clickCookie() {
    money += mpc;
    updateDisplay();
}

function upgradeMPC() {
    if (money >= mpcCost) {
        money -= mpcCost;
        mpc++;
        mpcCost *= 2;
        updateDisplay();
    } else {
        alert("Not enough money to upgrade!");
    }
}

function buyMPS() {
    if (money >= mpsCost) {
        money -= mpsCost;
        mps++;
        mpsCost *= 2;
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