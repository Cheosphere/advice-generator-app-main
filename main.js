const button = document.getElementById('dice')
const advice = document.getElementById('advice')
const adviceNumberTitle = document.getElementById('advice_number')
const maxNumberAdvice = 224
let adviceNumber = 71

// We write in the DOM the number of advice
adviceNumberTitle.innerHTML = `ADVICE #${adviceNumber}`

// Function that generates a random number
button.addEventListener('click', () => {
    // We generate a new number of advice
    adviceNumber = Math.floor(Math.random() * maxNumberAdvice)
    // We check that the number is greater than zero
    if (adviceNumber > 0) {
        setTimeout(() => {
            // // We write in the DOM the new number of advice
            adviceNumberTitle.innerHTML = `ADVICE #${adviceNumber}`
        }, 600);
        // We run the function
        runApi()

    } else {
        advice.innerHTML = 'Advice not found, please try again'
    }
})

// Function to consume the API
const runApi = async () => {
    try {
        const URL = `https://api.adviceslip.com/advice/${adviceNumber}`
        const response = await fetch(URL)
        // We check the status of the response
        if (response.status === 200) {
            const data = await response.json()
            const dataAdvice = data.slip.advice
            // We write the advice in the DOM
            if (data.slip === undefined) {
                advice.innerHTML = 'Advice not found, please try again'
            } else {
                advice.innerHTML = `"${dataAdvice}"`
            }
        } else if (response.status === 400) {
            console.log('The searched content is not found')
        } else {
            console.log('Unidentified error')
        }
        // Animations
        anime({
            targets: '.container',
            scale: [0, 1],
            opacity: {
                value: [0, 1],
                duration: 1000
            },
            rotate: {
                value:[-360, 360],
                duration: 500,
                easing: 'easeInOutSine'
            },
            duration: 200,
            easing: 'easeInOutQuart'
        });

        anime({
            targets: '.card_dice',
            rotate: {
                value:[-360, 360],
                duration: 500,
                delay: 100,
                easing: 'easeInOutSine'
            },
            scale: {
                value: [0, 1],
                delay: 100,
                duration: 200,
                easing: 'easeInOutSine'
            }
        })

    } catch (error) {
        console.log(error)
    }
}

runApi()







