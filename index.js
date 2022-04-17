// Power up button
const powerUp = document.querySelector('.power-background')
const topBar = document.querySelector('#top-bar')
const loadingScreen = document.querySelector('#loading-screen')
const bootUpScreen = document.querySelector('#bootup-screen')


let bootTime = 10000 // milliseconds
const playSoundDelay = bootTime / 10 // milliseconds

// DEBUGGING USE
let playAudio = false // Set false to mute boot up sound
bootTime = 1 // Set to 1 to speed up boot time
// DEBUGGING USE

powerUp.addEventListener('click', function bootUpFunction() {
    bootUpScreen.classList.remove('black-background')
    bootUpScreen.style.visibility = 'hidden'
    document.querySelector('#loading-progress').classList.add('active')
    const macStartUpSound = new Audio('media/mac_startup.mp3')
    macStartUpSound.volume = 0.2
    if (playAudio) {
        setTimeout(() => {
            macStartUpSound.play()
        }, playSoundDelay)
    }
    setTimeout(() => {
        topBar.classList.remove('black-background')
        loadingScreen.classList.remove('black-background')
        loadingScreen.style.visibility = 'hidden'
        document.querySelector('body').classList.add('active')
    }, bootTime) // <------------------------------------------------ Adjust loading screen time
})



// Set up date 

const dateItem = document.querySelector('#date-time>span')
let today = new Date()

const daysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const daysShort = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat']
const monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let morning = true
let currentDateTime
let day
let date
let month
let minutes
let seconds
let hours

function updateTime() {
    today = new Date()
    day = daysShort[today.getDay()]
    date = today.getDate()
    month = monthsShort[today.getMonth()]
    minutes = today.getMinutes()
    seconds = today.getSeconds()

    // Hours in AM/PM format
    hours = today.getHours()
    if (hours > 12) {
        hours = hours - 12
        morning = false
    } else if (hours === 0) {
        hours = 12
    }

    if (minutes < 10) {
        minutes = '0' + minutes
    }

    if (seconds < 10) {
        seconds = '0' + seconds
    }

    currentDateTime = `${day} ${date} ${month} ${hours}:${minutes} `
    if (morning) {
        currentDateTime += 'AM'
    } else {
        currentDateTime += 'PM'
    }


    dateItem.innerHTML = currentDateTime
    // console.log('time updated')

    // console.log(day)
    // console.log(date)
    // console.log(month)
    // console.log(hours)
    // console.log(minutes)
}

updateTime()

// App Opening

const terminalWindow = document.querySelector('#terminal-app')
const appName = document.querySelector('#app-name #app-name-display')
const fileLabel = document.querySelector('#file-label')
const gameWindow = document.querySelector('#game-app')
const safariWindow = document.querySelector('#safari-app')
const appleIcon = document.querySelector('#apple-icon')
const appleDropdown = document.querySelector('#apple-icon-dropdown')
const aboutMeButton = document.querySelector('#about-me')
const aboutMeApp = document.querySelector('#about-me-app')
const systemInfo = document.querySelector('#system-info')
const shutdown = document.querySelector('#shut-down')
const aboutMeContent = document.querySelector('#about-me-content')
const workContent = document.querySelector('#work-content')
const overViewTab = document.querySelector('#overview')
const workTab = document.querySelector('#work')
const educationTab = document.querySelector('#education')
const hobbiesTab = document.querySelector('#hobbies')
const educationContent = document.querySelector('#education-content')
const hobbiesContent = document.querySelector('#hobbies-content')
const website = document.querySelector('body')
const finderIcon = document.querySelector('#finder-icon')
const systemIcon = document.querySelector('#system-icon')
const keynoteIcon = document.querySelector('#keynote-icon')
const texteditIcon = document.querySelector('#textedit-icon')
const terminalContent = document.querySelector('#terminal-content')


let aboutLabel = 'About Finder'
let openNewTabLink = 'index.html'
let quitAppLabel = 'Restart Finder'
let finderActive = true

let appOpened = false

// Terminal app icon click
const terminalIcon = document.querySelector('#terminal-icon')

finderIcon.classList.add('app-open')

// Set up close terminal button
const terminalClose = document.querySelector('#terminal-app .close')

terminalClose.addEventListener('click', () => {
    // Make terminal hidden
    terminalWindow.classList.remove('active')

    // Remove white dot beneath the app icon at the dock
    terminalIcon.classList.remove('app-open')

    // Update the display of topbar
    appName.innerText = "Finder"
    fileLabel.innerText = "File"
    finderActive = true
    appOpened = false

    // hide close/minimize/expand button  (x, -, +) display
    // document.querySelector('#terminal-top-left .hover-text').classList.add('disabled-hover')
})

// Set up about me close button
const aboutMeClose = document.querySelector('#about-me-app .close')
aboutMeClose.addEventListener('click', () => {
    // Make terminal hidden
    aboutMeApp.classList.remove('active')
    aboutMeContent.classList.remove('active')
})

// Event listener when clicking app name top bar
// Enable top bar select dropdown

appName.addEventListener('click', () => {
    appNameDropdown.classList.toggle('active')
    appName.classList.toggle('active')

    const aboutAppSelect = document.querySelector('#about-app')
    const newTabSelect = document.querySelector('#open-new-tab')
    const closeAppSelect = document.querySelector('#close-app')

    function resetFinderName() {
        aboutLabel = 'About Finder'
        openNewTabLink = 'index.html'
        quitAppLabel = 'Restart Finder'
        appName.innerText = 'Finder'
        fileLabel.innerText = 'File'
    }

    if (finderActive) {
        resetFinderName()
    }

    aboutAppSelect.innerText = aboutLabel
    closeAppSelect.innerText = quitAppLabel


    if (appNameDropdown.classList.contains('active')) {
        newTabSelect.addEventListener('click', () => {
            window.open(openNewTabLink)
            appNameDropdown.classList.remove('active')
            gameIcon.classList.remove('active')
            appName.classList.remove('active')
        })

        function topBarCloseAppClickHandler(appIcon, appWindow) {
            closeAppSelect.addEventListener('click', () => {
                appWindow.classList.remove('active')
                appIcon.classList.remove('app-open')
                appNameDropdown.classList.remove('active')
                appName.classList.remove('active')
                finderActive = true
                appOpened = false
                resetFinderName()
            })
        }


        if (finderActive) {
            closeAppSelect.addEventListener('click', () => {
                appNameDropdown.classList.remove('active')
                appName.classList.remove('active')

                // Animate finder restart animation
                website.classList.add('black-background')
                website.classList.remove('active')
                document.querySelector('#dock').style.display = 'none'
                document.querySelector('#top-bar').style.display = 'none'

                setTimeout(() => {
                    website.classList.remove('black-background')
                    website.classList.add('active')
                    document.querySelector('#dock').style.display = 'flex'
                    document.querySelector('#top-bar').style.display = 'block'
                }, 1000)
            })
        } else if (gameIcon.classList.contains('app-open')) {
            topBarCloseAppClickHandler(gameIcon, gameWindow)
            // closeAppSelect.addEventListener('click', () => {
            //     gameWindow.classList.remove('active')
            //     gameIcon.classList.remove('app-open')
            //     appNameDropdown.classList.remove('active')
            //     appName.classList.remove('active')
            //     finderActive = true
            //     appOpened = false
            //     resetFinderName()
            // })
        } else if (safariIcon.classList.contains('app-open')) {
            topBarCloseAppClickHandler(safariIcon, safariWindow)
            // closeAppSelect.addEventListener('click', () => {
            //     safariWindow.classList.remove('active')
            //     safariIcon.classList.remove('app-open')
            //     appNameDropdown.classList.remove('active')
            //     appName.classList.remove('active')
            //     finderActive = true
            //     appOpened = false
            //     resetFinderName()
            // })
        } else if (terminalIcon.classList.contains('app-open')) {
            topBarCloseAppClickHandler(terminalIcon, terminalWindow)
            // closeAppSelect.addEventListener('click', () => {
            //     terminalWindow.classList.remove('active')
            //     terminalIcon.classList.remove('app-open')
            //     appNameDropdown.classList.remove('active')
            //     appName.classList.remove('active')
            //     finderActive = true
            //     appOpened = false
            //     resetFinderName()
            // })
        }

    }

    // Close dropdown window if elsewhere is clicked
    if (appNameDropdown.classList.contains('active')) {

        const leftX = appNameDropdown.clientLeft
        const rightX = appNameDropdown.clientLeft + appNameDropdown.clientWidth
        const topY = appNameDropdown.clientTop
        const botY = appNameDropdown.clientTop + appNameDropdown.clientWidth

        // Global mouse-click event listener


        website.addEventListener('click', (event) => {
            // console.log("eventClientX: ", event.clientX)
            // console.log("eventClientY: ", event.clientY)

            let mouseClickedX = event.clientX
            let mouseClickedY = event.clientY


            // Mouse clicked outside of the dropdown menu left-right offset
            if ((mouseClickedX >= leftX && mouseClickedX <= rightX && mouseClickedY <= botY)) {
                return
            } else {
                appNameDropdown.classList.remove('active')
                appName.classList.remove('active')
            }


            // console.log({
            //     leftX
            // }, {
            //     rightX
            // }, {
            //     topY
            // }, {
            //     botY
            // })
            // console.log("mouseClickedX: ", mouseClickedX, "mouseClickedY: ", mouseClickedY)

        })
    }
})


// Opening terminal
terminalIcon.addEventListener('click', () => {
    // Prevent another app clicked and an app is already opened
    if (!appOpened) {
        appOpened = true

        // Small white dot beneath app icon
        terminalIcon.classList.add('app-open')


        finderActive = false

        // Update drop down menu labels
        aboutLabel = 'Finder'
        quitAppLabel = 'Quit Terminal'
        appName.innerText = 'Terminal'
        fileLabel.innerText = 'Shell'


        if (terminalIcon.classList.contains('app-open')) {
            terminalWindow.classList.add('active')
            document.querySelector('#terminal-top-left .hover-text').classList.remove('disabled-hover')
        }

        updateTerminalLastLoginTime()
        insertNewTerminalInput()

        const terminalInput = document.querySelector('.terminal-input')
        terminalInput.classList.add('active')
    }

})


// Terminal window input
terminalWindow.addEventListener('keypress', (key) => {

    if (key.key === 'Enter') {
        const inputLines = document.querySelectorAll('.terminal-input')
        const currentInputLine = inputLines[inputLines.length - 1]
        const inputValue = currentInputLine.value
        currentInputLine.disabled = true

        // console.log(inputValue)
        // push input to new line for first line only

        const terminalOutputElement = document.createElement('div')


        let terminalOutputContent = null
        let clearTerminal = false

        // Listen for console.log command
        if (inputValue.slice(0, 11) === 'console.log') {
            // Check for string
            let consoleLogString = inputValue.slice(12, -1)
            // console.log(consoleLogString)
            if (consoleLogString[0] === "'" && consoleLogString[consoleLogString.length - 1] === "'") {
                terminalOutputElement.classList.add('terminalStringOutput')
                consoleLogString = consoleLogString.slice(1, -1)
            } else {
                terminalOutputElement.classList.add('terminalNumberOutput')
            }
            terminalOutputContent = consoleLogString

        } else if (inputValue === 'help') {
            terminalOutputContent =
                `console.log('hello world') ---------------  to print hello world
                open(http://www.google.com) --------------  to open google in a new tab
                clear() ----------------------------------  to clear terminal`

        } else if (inputValue.slice(0, 4) === 'open') {
            const webLink = inputValue.slice(5, -1)
            window.open(webLink)
            terminalOutputContent = `opened '${webLink}' in new tab`
        } else if (inputValue.slice(0, 7) === 'clear()') {
            clearTerminal = true
        } else {
            terminalOutputContent = 'command not found: ' + inputValue
            // console.log('invalid')
        }



        if (clearTerminal) {
            // Delete all the content inside terminal content
            while (terminalContent.firstChild) {
                terminalContent.removeChild(terminalContent.firstChild)
            }
            insertNewTerminalInput()

            // hide last login time

        } else {
            // Insert terminal output 
            terminalOutputElement.innerText = terminalOutputContent
            terminalOutputElement.style.overflowWrap = 'break-word'

            terminalContent.appendChild(terminalOutputElement)

            insertNewTerminalInput()
        }

    }

})

const gameAppObject = {
    aboutLabel: 'Game of Life',
    openNewTabLink: 'game.html',
    quitAppLabel: 'Quit Game of Life',
}
const SafariAppObject = {
    aboutLabel: 'Safari',
    openNewTabLink: 'https://app.daily.dev/',
    quitAppLabel: 'Quit Safari',
}

function openAppFromDock(appIcon, appWindow, appObject) {

    if (!appOpened) {
        appOpened = true
    }

    // Small white dot beneath app icon
    appIcon.classList.add('app-open')
    finderActive = false

    // Update drop down menu labels
    aboutLabel = appObject.aboutLabel
    openNewTabLink = appObject.openNewTabLink
    quitAppLabel = appObject.quitAppLabel
    appName.innerText = appObject.aboutLabel

    // window.open('game.html')
    if (appIcon.classList.contains('app-open')) {
        appWindow.classList.add('active')
        appName.innerText = appObject.aboutLabel
    }

}


// Set up game in dock
const gameIcon = document.querySelector('#game-icon')
const appNameDropdown = document.querySelector('#app-name-dropdown')
gameIcon.addEventListener('click', () => {
    openAppFromDock(gameIcon, gameWindow, gameAppObject)
})
// gameIcon.addEventListener('click', () => {
//     // Prevent another app clicked and an app is already opened
//     if (!appOpened) {
//         appOpened = true

//         // Small white dot beneath app icon
//         gameIcon.classList.add('app-open')
//         finderActive = false

//         // Update drop down menu labels
//         aboutLabel = 'Game of Life'
//         openNewTabLink = 'game.html'
//         quitAppLabel = 'Quit Game of Life'
//         appName.innerText = 'Game of Life'

//         // window.open('game.html')
//         if (gameIcon.classList.contains('app-open')) {
//             gameWindow.classList.add('active')
//             appName.innerText = "Game of Life"
//         }
//     }
//     // Change drop down labels
// })

// Set up safari in dock
const safariIcon = document.querySelector('#safari-icon')
safariIcon.addEventListener('click', () => {
    openAppFromDock(safariIcon, safariWindow, SafariAppObject)
})
// safariIcon.addEventListener('click', () => {

//     // Prevent another app clicked and an app is already opened
//     if (!appOpened) {
//         appOpened = true
//         // Small white dot beneath app icon
//         safariIcon.classList.add('app-open')
//         finderActive = false

//         // Update drop down menu labels
//         aboutLabel = 'About Safari'
//         openNewTabLink = 'https://app.daily.dev/'
//         quitAppLabel = 'Quit Safari'
//         appName.innerText = 'Safari'

//         if (safariIcon.classList.contains('app-open')) {
//             safariWindow.classList.add('active')
//         }
//     }
// })

// Set up apple icon on top bar
appleIcon.addEventListener('click', () => {
    appleDropdown.classList.toggle('active')
    appleIcon.classList.toggle('active')

    console.log('you clicked apple icon')

    // Enable top bar select dropdown
    if (appleDropdown.classList.contains('active')) {
        aboutMeButton.addEventListener('click', () => {
            aboutMeApp.classList.add('active')

            document.querySelector('#overview').classList.add('active')
            aboutMeContent.classList.add('active')

            console.log('you clicked about me')
        })
        systemInfo.addEventListener('click', () => {
            window.alert('TO DO!')
        })

        // Close window if shutdown is pressed
        shutdown.addEventListener('click', () => {
            window.close()
        })

    }

    // Close dropdown window if elsewhere is clicked
    if (appleDropdown.classList.contains('active')) {

        const leftX = appleDropdown.clientLeft
        const rightX = appleDropdown.clientLeft + appleDropdown.clientWidth
        const topY = appleDropdown.clientTop
        const botY = appleDropdown.clientTop + appleDropdown.clientWidth

        // Global mouse-click event listener
        const website = document.querySelector('body')

        website.addEventListener('click', (event) => {
            // console.log("eventClientX: ", event.clientX)
            // console.log("eventClientY: ", event.clientY)

            let mouseClickedX = event.clientX
            let mouseClickedY = event.clientY


            // Mouse clicked outside of the dropdown menu left-right offset
            if ((mouseClickedX >= leftX && mouseClickedX <= rightX && mouseClickedY <= botY)) {
                return
            } else {
                appleDropdown.classList.remove('active')
                appleIcon.classList.remove('active')
            }
        })
    }
})

// Set up tab select
const aboutMeAllTabs = document.querySelectorAll('#about-me-window-name>div')
const aboutMeAllContents = document.querySelectorAll('#about-me-window>div:not(:first-child)')


const allTabID = new Set(['overview', 'work', 'education', 'hobbies']) // All tabs in the about me content
const allContents = new Set(['overview', 'work', 'education', 'hobbies']) // All tabs in the about me content

function addActiveClass(DOMelement) {
    DOMelement.classList.add('active')
}

function removeActiveClass(DOMelement) {
    DOMelement.classList.remove('active')
}


function addTabClickListener(tab, content) {
    tab.addEventListener('click', () => {
        // Clear Tabs
        for (let tab of aboutMeAllTabs) {
            removeActiveClass(tab)
        }
        // Clear Contents
        for (let content of aboutMeAllContents) {
            removeActiveClass(content)
        }

        // Make tabObj active
        addActiveClass(tab)
        addActiveClass(content)

    })
}

addTabClickListener(overViewTab, aboutMeContent)
addTabClickListener(workTab, workContent)
addTabClickListener(educationTab, educationContent)
addTabClickListener(hobbiesTab, hobbiesContent)


// Terminal last open date

function updateTerminalLastLoginTime() {
    // Create last login element
    const terminalLastLogin = document.createElement('div')
    terminalLastLogin.setAttribute('id', 'terminal-last-login')
    terminalContent.appendChild(terminalLastLogin)

    // update last login time
    lastLoginDateTime = `Last login: ${day} ${month} ${date} ${today.getHours()}:${minutes}:${seconds} on console`
    document.querySelector('#terminal-last-login').innerText = lastLoginDateTime
}

// Insert new terminal input function
function insertNewTerminalInput() {
    // Insert new terminal input
    const newInputLine = document.createElement('div')
    newInputLine.classList.add('new-terminal-input-container')
    terminalContent.appendChild(newInputLine)

    // Add terminal input span → ~ 
    const terminalSpan = document.createElement('span')
    terminalSpan.innerText = '→ ~ '
    newInputLine.appendChild(terminalSpan)

    // Add new input
    const newTerminalInput = document.createElement('input')
    newTerminalInput.classList.add('terminal-input')
    newTerminalInput.type = 'textarea'
    newInputLine.appendChild(newTerminalInput)

    // Select new input automatically
    newTerminalInput.select()
}

// Update clock at top right corner
setInterval(updateTime, 1000);

// Finder white dot
document.querySelector('#finder-icon').classList.add('app-open')







// TO DO ITEMS:

finderIcon.addEventListener('click', () => {
    window.alert('TO DO!')
})
systemIcon.addEventListener('click', () => {
    window.alert('TO DO!')
})
keynoteIcon.addEventListener('click', () => {
    window.alert('TO DO!')
})
texteditIcon.addEventListener('click', () => {
    window.alert('TO DO!')
})