(() => {
    const codeBox = document.querySelector('#cssCode')
    let mainAppBox = document.querySelector('#mainApp')
    let inputFrom, inputTo, gradientFrom, gradientTo, codeGradient
    inputFrom = document.querySelector('#inputFrom')
    inputTo = document.querySelector('#inputTo')
    gradientFrom = '#5a90e0'
    gradientTo = '#6000fc'
    codegradient = "linear-gradient(to right, " + gradientFrom + ', ' + gradientTo + ")"

    let reg = /(#([\da-f]{3}){1,2}|(rgb|hsl)a\((([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s?){3}(1|0|0?\.\d+)\)|(rgb|hsl)\(([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])%?(,\s?\d{1,3}%?){2}\))/
    const getValue = () => {
        console.log('1 step')


        gradientFrom = inputFrom.value.toLowerCase()
        gradientTo = inputTo.value.toLowerCase()
        validateInput()
    }
    const validateInput = () => {
        console.log('2 step')
        gradientFrom = (reg.test(gradientFrom)) ? gradientFrom : false

        gradientTo = (reg.test(gradientTo)) ? gradientTo : false
        console.log(gradientTo)

        try {
            console.log('3 step')
            if (gradientFrom.charAt(0) === '#' && gradientFrom.length <= 7) {

            } else if (gradientFrom.charAt(0) === '#') {
                gradientFrom = gradientFrom.split(0, 6)
                inputFrom.value = gradientFrom

            }

            if (gradientTo.charAt(0) === '#' && gradientTo.length <= 7) {

            } else if (gradientTo.charAt(0) === '#') {

                gradientTo = gradientTo.slice(0, 7)
                inputTo.value = gradientTo

            }
        } catch (err) {
            console.log('Value is empty')
        }



        if (gradientFrom != false & gradientTo != false) {
            createCodeGradient()
            interfaceChanges()
        }
    }
    const createCodeGradient = () => {
        console.log('4 step')

        codeGradient = "linear-gradient(to top, " + gradientFrom + ', ' + gradientTo + ")"
        codeBox.innerText = 'background-image: ' + codeGradient;
    }

    const interfaceChanges = () => {
        console.log('5 step')
        mainAppBox.style.background = codeGradient
        inputFrom.style.backgroundColor = gradientFrom;
        changeFontColor(inputFrom)
        inputTo.style.backgroundColor = gradientTo;
        changeFontColor(inputTo)
    }
    const changeFontColor = (input) => {
        console.log('6 step')
        let bgColor, colorNumber, colorNumberArray, sumColor = 0
        bgColor = input.style.backgroundColor;
        colorNumber = bgColor.replace(/\D+|\D.*/g, '|')
        colorNumberArray = colorNumber.split('|')
        sumColor = parseInt(colorNumberArray[1]) + parseInt(colorNumberArray[2]) + parseInt(colorNumberArray[3])
        input.style.color = (sumColor <= 390) ? '#FFFFFF' : '#000000';
    }
    const inputFocusOut = (thisInput) => {
        thisInput.target.style.backgroundColor = thisInput.target.value;
        changeFontColor(thisInput.target)
    }
    const copyCode = () => {
        codeBox.focus()
        codeBox.select()
        try {
            let successful = document.execCommand('copy');
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    }
    const reset = () => {
        gradientFrom = '#5a90e0'
        gradientTo = '#6000fc'
        codeGradient = "linear-gradient(to right, " + gradientFrom + ', ' + gradientTo + ")"
        inputFrom.value = gradientFrom;
        inputTo.value = gradientTo;
        codeBox.innerText = 'background-image: ' + codeGradient
        interfaceChanges()
    }
    const clickEventsLoad = () => {
        const btnCopyCode = document.querySelector('#copyCode')
        btnCopyCode.addEventListener('click', copyCode);
        const btnReset = document.querySelector('#resetGenerator')
        btnReset.addEventListener('click', reset);
        const btnGenerate = document.querySelector('#btnGenerate')
        btnGenerate.addEventListener('click', getValue);
        const focusOutBtnFrom = document.querySelector('#inputFrom')
        focusOutBtnFrom.addEventListener('focusout', inputFocusOut)
        const focusOutBtnTo = document.querySelector('#inputTo')
        focusOutBtnTo.addEventListener('focusout', inputFocusOut)

    }
    clickEventsLoad();
})();