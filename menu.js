



// Every function must have "ui" before the actual name. Same goes for every variable outside a function.

// Set to _true_ when UI is in transition. Set to _false_ after the transition.
let uiLock = false;


// Game Start
function uiStartGame() {
    if (uiLock == false) {
        uiLock = true;
        playAudioYes2()
        
        resetGame()
        restartGame()
        const titleScreen = document.querySelector('.menu');
        titleScreen.style.opacity = '0'
        
        setTimeout(() => {
            titleScreen.style.display = 'none'
            setTimeout(() => {
                uiLock = false;
            }, 0);
        }, 1000);
    }
}


// Difficulty
function uiDifficultyUI() {
    if (uiLock == false) {
        playAudioYes2()

        uiDisableUI()
        setTimeout(() => {
            const targetSection = document.querySelector('.difficulty-section')
            targetSection.style.display = 'block'
            setTimeout(() => {
                targetSection.style.transition = '500ms'
                targetSection.style.opacity = '1'
            }, 10);
        }, 520);
    }
}

// Requires main.js
function uiDiffSelect(difficulty) {
    if (difficulty == 1) {
        gameDifficulty = 1;
        uiStartGame()
    }
    if (difficulty == 2) {
        gameDifficulty = 2;
        uiStartGame()
    }
    if (difficulty == 3) {
        gameDifficulty = 3;
        uiStartGame()
    }
    if (difficulty == 4) {
        gameDifficulty = 4;
        uiStartGame()
    }
    setTimeout(() => {
        const targetSection = document.querySelector('.difficulty-section')
        targetSection.style.display = 'none'
    }, 1050);
}


// Gamemode Menu
function uiGamemodeUI() {
    if (uiLock == false) {
        playAudioYes2()

        uiDisableUI()
        setTimeout(() => {
            const targetSection = document.querySelector('.gamemode-section')
            targetSection.style.display = 'block'
            setTimeout(() => {
                targetSection.style.transition = '500ms'
                targetSection.style.opacity = '1'
            }, 10);
        }, 520);
    }
}

function uiGMSelect(type, pratice) {
    gameType = type;
    gamePraticeMode = pratice;
    uiDifficultyUI()
}


// Manual
function uiManualUI() {
    if (uiLock == false) {
        playAudioYes2()
        uiManualDisplayValue = 0;
        uiManualDisplay(0)

        uiDisableUI()
        setTimeout(() => {
            const targetSection = document.querySelector('.manual-section')
            targetSection.style.display = 'block'
            setTimeout(() => {
                targetSection.style.transition = '500ms'
                targetSection.style.opacity = '1'
            }, 10);
        }, 520);
    }
}

let uiManualDisplayValue = 0;
function uiManualDisplay(value) {
    const uiManualDisplayBaseValue = 640;
    const container = document.querySelector('.manual-container');
    uiManualDisplayValue += value;
    
    if (uiManualDisplayValue < 0) {
        uiManualDisplayValue -= value;
        playAudioWarning()
    }
    else if (uiManualDisplayValue >= 3) {
        uiManualDisplayValue -= value;
        playAudioWarning()
    }
    else if (value == 0) {
        container.style.transform = `translateX(-${uiManualDisplayBaseValue * uiManualDisplayValue}px)`;
    }
    else {
        container.style.transform = `translateX(-${uiManualDisplayBaseValue * uiManualDisplayValue}px)`;
        playAudioYes()
    }
}


// Settings
function uiSettingUI() {
    if (uiLock == false) {
        playAudioYes2()

        uiDisableUI()
        setTimeout(() => {
            const targetSection = document.querySelector('.setting-section')
            targetSection.style.display = 'block'
            setTimeout(() => {
                targetSection.style.transition = '500ms'
                targetSection.style.opacity = '1'
            }, 10);
        }, 520);
    }
}

function uiSettingSave() {
    if (uiLock == false) {
        playAudioYes2()

        // ...

        uiDisableUI()
        setTimeout(() => {
            const targetSection = document.querySelector('.title-section')
            targetSection.style.display = 'block'
            setTimeout(() => {
                targetSection.style.transition = '500ms'
                targetSection.style.opacity = '1'
            }, 10);
        }, 520);
    }
}

function uiSettingApply() {
    if (uiLock == false) {
        playAudioYes()

        // ...
    }
}

function uiSettingClose() {
    if (uiLock == false) {
        playAudioNo()

        // ...

        uiDisableUI()
        setTimeout(() => {
            const targetSection = document.querySelector('.title-section')
            targetSection.style.display = 'block'
            setTimeout(() => {
                targetSection.style.transition = '500ms'
                targetSection.style.opacity = '1'
            }, 10);
        }, 520);
    }
}


// Credits
function uiCreditUI() {
    if (uiLock == false) {
        playAudioYes2()

        uiDisableUI()
        setTimeout(() => {
            const targetSection = document.querySelector('.credit-section')
            targetSection.style.display = 'block'
            setTimeout(() => {
                targetSection.style.transition = '500ms'
                targetSection.style.opacity = '1'
            }, 10);
        }, 520);
    }
}


function uiBackToTitle() {
    if (uiLock == false) {
        playAudioNo()

        uiDisableUI()
        setTimeout(() => {
            const targetSection = document.querySelector('.title-section')
            targetSection.style.display = 'block'
            setTimeout(() => {
                targetSection.style.transition = '500ms'
                targetSection.style.opacity = '1'
            }, 10);
        }, 520);
    }
}


// Disabling all UI sections
function uiDisableUI() {
    uiLock = true;
    const mainMenu = document.querySelector('.title-section');
    const difficultyMenu = document.querySelector('.difficulty-section');
    const gamemodeMenu = document.querySelector('.gamemode-section');
    const manualMenu = document.querySelector('.manual-section');
    const settingsMenu = document.querySelector('.setting-section');
    const creditMenu = document.querySelector('.credit-section');
    
    mainMenu.style.transition = '500ms';
    mainMenu.style.opacity = '0';
    settingsMenu.style.transition = '500ms';
    settingsMenu.style.opacity = '0';
    difficultyMenu.style.transition = '500ms';
    difficultyMenu.style.opacity = '0';
    gamemodeMenu.style.transition = '500ms';
    gamemodeMenu.style.opacity = '0';
    creditMenu.style.transition = '500ms';
    creditMenu.style.opacity = '0';
    manualMenu.style.transition = '500ms';
    manualMenu.style.opacity = '0';
    
    setTimeout(() => {
        mainMenu.style.display = 'none';
        settingsMenu.style.display = 'none';
        difficultyMenu.style.display = 'none';
        gamemodeMenu.style.display = 'none';
        creditMenu.style.display = 'none';
        manualMenu.style.display = 'none';
    }, 500);

    setTimeout(() => {
        uiLock = false;
    }, 1050);
}


// Game to Main Menu
function uiGameToTitle() {
    if (uiLock == false) {
        uiLock = true;
        playAudioYes2()

        uiDisableUI()
        const titleScreen = document.querySelector('.menu');
        titleScreen.style.display = 'block'
        setTimeout(() => {
        titleScreen.style.opacity = '1'
        }, 0);
        
        setTimeout(() => {
            const targetSection = document.querySelector('.title-section')
            targetSection.style.display = 'block'
            setTimeout(() => {
                targetSection.style.transition = '500ms'
                targetSection.style.opacity = '1'
            }, 10);
        }, 520);
        
        const deathScreen = document.querySelector('.death-section');
        deathScreen.style.transition = '500ms'
        setTimeout(() => {
            deathScreen.style.opacity = '0'
        }, 0);
        setTimeout(() => {
            deathScreen.style.display = 'none'
            deathScreen.style.opacity = '1'
            deathScreen.style.transition = '0ms'
        }, 520);
    }
}


function uiRestartGame() {
    const targetSection = document.querySelector('.death-section');
    targetSection.style.display = 'none'
    resetGame()
    restartGame()
}


function uiDeathUI() {
    const targetSection = document.querySelector('.death-section');
    targetSection.style.display = 'block'
}