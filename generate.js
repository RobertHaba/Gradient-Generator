(() => {
    const codeBox = document.querySelector('#cssCode')
    const orientationSection = document.querySelector('#orientationSection');
    let mainAppBox = document.querySelector('#mainApp')
    let inputFrom, inputTo, gradientFrom, gradientTo, codeGradient, orientation, exceptionCode, itsEndAnimation, reverseColors
    itsEndAnimation = true;
    inputFrom = document.querySelector('#inputFrom')
    inputTo = document.querySelector('#inputTo')
    gradientFrom = '#938dff'
    gradientTo = '#ff8ff8'
    codeGradient = "linear-gradient(to bottom, " + gradientFrom + ', ' + gradientTo + ")"
    orientation = 'to bottom'
    exceptionCode = 'linear-gradient'
    reverseColors = false
        /*
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
                 if (gradientFrom.charAt(0) === '#' && gradientFrom.length <= 7) {} else if (gradientFrom.charAt(0) === '#') {
                     gradientFrom = gradientFrom.split(0, 6)
                     inputFrom.value = gradientFrom
                 }
                 if (gradientTo.charAt(0) === '#' && gradientTo.length <= 7) {} else if (gradientTo.charAt(0) === '#') {
                     gradientTo = gradientTo.slice(0, 7)
                     inputTo.value = gradientTo
                 }
             } catch (err) {
                 console.log('Value is empty')
             }
             if (gradientFrom != false & gradientTo != false) {
                 createCodeGradient()
             }
         }
         */
    const createCodeGradient = () => {
        if (reverseColors === true) {
            reverseColorsFun()
        }
        codeGradient = exceptionCode + "(" + orientation + ", " + gradientFrom + ', ' + gradientTo + ")"
        if (reverseColors === true) {
            reverseColorsFun()
        }
        interfaceChanges()
        showCodeGradient()

    }
    const reverseColorsFun = () => {
        let help
        help = gradientFrom
        gradientFrom = gradientTo
        gradientTo = help
    }
    const showCodeGradient = () => {
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
        if (thisInput.target.id === 'inputFrom') {
            gradientFrom = thisInput.target.value
        } else if (thisInput.target.id === 'inputTo') {
            gradientTo = thisInput.target.value
        }
        createCodeGradient()
        interfaceChanges()
        changeFontColor(thisInput.target)
    }
    const copyCode = () => {
        codeBox.focus()
        codeBox.select()
        let copyTest = false
        try {
            copyTest = document.execCommand('copy');
        } catch (err) {
            console.log('Oops, unable to copy');
            return copyTest = false;
        } finally {
            console.log('perfectio')
        }
        let modalCopyBox = document.querySelector('#modalCopy')
        if (copyTest && itsEndAnimation === true) {
            itsEndAnimation = false;
            modalCopyBox.style.display = 'flex'
            addAnimation(modalCopyBox, 'modalToTop', 1)
            hiddenAnimation(modalCopyBox, 'hiddenAnimation', 3500)
        }
    }

    const addAnimation = (element, animationName, timeAnimation) => {
        element.style.animation = timeAnimation + 's ' + animationName + ' forwards'
    }
    const hiddenAnimation = (element, animationName, timeToRemove) => {
        timeToRemove = (timeToRemove === undefined) ? 0 : timeToRemove
        setTimeout(() => {
            element.style.animation = '1s ' + animationName + ' forwards'
            setTimeout(() => {
                element.style.display = 'none'
                console.log('asd')
                itsEndAnimation = true;
            }, 1000)
        }, timeToRemove - 1000)
    }
    const reset = () => {
        gradientFrom = '#938dff'
        gradientTo = '#ff8ff8'
        codeGradient = "linear-gradient(to bottom, " + gradientFrom + ', ' + gradientTo + ")"
        inputFrom.value = gradientFrom;
        inputTo.value = gradientTo;
        codeBox.innerText = 'background-image: ' + codeGradient
        orientation = 'to bottom'
        exceptionCode = 'linear-gradient'
        reverseColors = false
        let activeBtn = orientationSection.querySelector('.active')
        if (activeBtn !== null) {
            activeBtn.classList.remove('active');
        }
        let defaultOrientationBtn = document.querySelector('#defaultOrientation');
        defaultOrientationBtn.classList.add('active')
        interfaceChanges()
    }
    const clickEventsLoad = () => {
        const btnCopyCode = document.querySelector('#copyCode')
        btnCopyCode.addEventListener('click', copyCode);
        const btnReset = document.querySelector('#resetGenerator')
        btnReset.addEventListener('click', reset);
        const focusOutBtnFrom = document.querySelector('#inputFrom')
        focusOutBtnFrom.addEventListener('focusout', inputFocusOut)
        const focusOutBtnTo = document.querySelector('#inputTo')
        focusOutBtnTo.addEventListener('focusout', inputFocusOut)
        addEventsToOrientationBtn(orientationSection)
    }
    const addEventsToOrientationBtn = orientationSection => {
        const childElements = orientationSection.children
        for (let childBtn of childElements) {
            childBtn.addEventListener('click', () => {
                orientation = childBtn.dataset.orientation
                exceptionCode = (childBtn.dataset.exception === undefined) ? 'linear-gradient' : childBtn.dataset.exception
                reverseColors = JSON.parse(childBtn.dataset.reverse)
                createCodeGradient()
                let activeBtn = orientationSection.querySelector('.active')
                if (activeBtn !== null) {
                    activeBtn.classList.remove('active');
                }
                childBtn.classList.add('active')
            })
        }
    }
    clickEventsLoad();
})();