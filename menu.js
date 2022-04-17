



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
var gameRule_Particles = true;
var gameRule_BGM = true;
var gameRule_BGM_Vol = 100;
var gameRule_SFX = true;
var gameRule_SFX_Vol = 100;

let temp_gameRule_Particles = true;
let temp_gameRule_BGM = true;
let temp_gameRule_BGM_Vol = 100;
let temp_gameRule_SFX = true;
let temp_gameRule_SFX_Vol = 100;

function uiSettingUI() {
    if (uiLock == false) {
        playAudioYes2()
        uiSettingsUpdate()

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

function uiSettingNav(tab) {
    const navGraphics = document.querySelector('#settingNavGraphics');
    const navControls = document.querySelector('#settingNavControls');
    const graphicContainer = document.querySelector('#settingNav1');
    const controlsContainer = document.querySelector('#settingNav2');

    if (tab == 2) {
        playAudioYes()
        navGraphics.classList.remove('setting-nav-active')
        graphicContainer.style.display = 'none';
        navControls.classList.add('setting-nav-active')
        controlsContainer.style.display = 'block';
    } 
    else if (tab == 1) {
        playAudioYes()
        navControls.classList.remove('setting-nav-active')
        controlsContainer.style.display = 'none';
        navGraphics.classList.add('setting-nav-active')
        graphicContainer.style.display = 'block';
    } 
}

function uiSettingOpt_Particles() {
    playAudioYes()
    if (temp_gameRule_Particles == true) {
        temp_gameRule_Particles = false;
    }
    else if (temp_gameRule_Particles == false) {
        temp_gameRule_Particles = true;
    }
}

function uiSettingOpt_Music() {
    playAudioYes()
    if (temp_gameRule_BGM == true) {
        temp_gameRule_BGM = false;
    }
    else if (temp_gameRule_BGM == false) {
        temp_gameRule_BGM = true;
    }
}

function uiSettingOpt_Music_Vol() {
    const BGM_Vol = document.querySelector('#gameRule_BGM_Vol');
    temp_gameRule_BGM_Vol = BGM_Vol.value;
    const span = document.querySelector('#settingOpt_BGM_Vol');
    span.innerHTML = temp_gameRule_BGM_Vol + '%'
    playAudioSettingTestBGM()
}

function uiSettingOpt_SFX() {
    playAudioYes()
    if (temp_gameRule_SFX == true) {
        temp_gameRule_SFX = false;
    }
    else if (temp_gameRule_SFX == false) {
        temp_gameRule_SFX = true;
    }
}

function uiSettingOpt_SFX_Vol() {
    const SFX_Vol = document.querySelector('#gameRule_SFX_Vol');
    temp_gameRule_SFX_Vol = SFX_Vol.value
    const span = document.querySelector('#settingOpt_SFX_Vol');
    span.innerHTML = temp_gameRule_SFX_Vol + '%'
    playAudioSettingTestSFX()
}

function uiSettingsUpdate() {
    // No particles 
    if (gameRule_Particles == true) {
        const no_particles = document.querySelector('#gameRule_particles');
        no_particles.checked = false;
    }
    else if (gameRule_Particles == false) {
        const no_particles = document.querySelector('#gameRule_particles');
        no_particles.checked = true;
    }

    // Music
    if (gameRule_BGM == true) {
        const no_BGM = document.querySelector('#gameRule_BGM');
        no_BGM.checked = false;
    }
    else if (gameRule_BGM == false) {
        const no_BGM = document.querySelector('#gameRule_BGM');
        no_BGM.checked = true;
    }

    // Music Volume
    const BGM_Vol = document.querySelector('#gameRule_BGM_Vol');
    BGM_Vol.value = gameRule_BGM_Vol;
    const span_BGM = document.querySelector('#settingOpt_BGM_Vol');
    span_BGM.innerHTML = gameRule_BGM_Vol + '%'

    // Sound
    if (gameRule_SFX == true) {
        const no_SFX = document.querySelector('#gameRule_SFX');
        no_SFX.checked = false;
    }
    else if (gameRule_SFX == false) {
        const no_SFX = document.querySelector('#gameRule_SFX');
        no_SFX.checked = true;
    }

    // Sound Volume
    const SFX_Vol = document.querySelector('#gameRule_SFX_Vol');
    SFX_Vol.value = gameRule_SFX_Vol;
    const span_SFX = document.querySelector('#settingOpt_SFX_Vol');
    span_SFX.innerHTML = gameRule_SFX_Vol + '%'

    temp_gameRule_Particles = gameRule_Particles;
    temp_gameRule_BGM = gameRule_BGM;
    temp_gameRule_BGM_Vol = gameRule_BGM_Vol;
    temp_gameRule_SFX = gameRule_SFX;
    temp_gameRule_SFX_Vol = gameRule_SFX_Vol;
}

function uiSettingSave() {
    if (uiLock == false) {

        gameRule_Particles = temp_gameRule_Particles;
        gameRule_BGM = temp_gameRule_BGM;
        gameRule_BGM_Vol = temp_gameRule_BGM_Vol;
        gameRule_SFX = temp_gameRule_SFX;
        gameRule_SFX_Vol = temp_gameRule_SFX_Vol;

        playAudioYes2()

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
        
        gameRule_Particles = temp_gameRule_Particles;
        gameRule_BGM = temp_gameRule_BGM;
        gameRule_BGM_Vol = temp_gameRule_BGM_Vol;
        gameRule_SFX = temp_gameRule_SFX;
        gameRule_SFX_Vol = temp_gameRule_SFX_Vol;
        
        playAudioYes()
    }
}

function uiSettingClose() {
    if (uiLock == false) {
        
        temp_gameRule_Particles = gameRule_Particles;
        temp_gameRule_BGM = gameRule_BGM;
        temp_gameRule_BGM_Vol = gameRule_BGM_Vol;
        temp_gameRule_SFX = gameRule_SFX;
        temp_gameRule_SFX_Vol = gameRule_SFX_Vol;

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