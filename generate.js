(() => {
    const codeBox = document.querySelector('#cssCode')
    const orientationSection = document.querySelector('#orientationSection');
    let mainAppBox = document.querySelector('#mainApp')
    let inputFrom, inputTo, gradientFrom, gradientTo, codeGradient, orientation, exceptionCode, itsEndAnimation, reverseColors, inputsBox
    let countGenerateInput, gradientMid, inputMid, btnNewInputMid
    btnNewInputMid = document.querySelector('#addInputMid');
    inputMid = 'undefined'
    countGenerateInput = 0;
    inputsBox = document.querySelector('#inputBox');
    itsEndAnimation = true;
    inputFrom = document.querySelector('#inputFrom')
    inputTo = document.querySelector('#inputTo')
    gradientFrom = '#938dff'
    gradientTo = '#ff8ff8'
    codeGradient = "linear-gradient(to bottom, " + gradientFrom + ', ' + gradientTo + ")"
    orientation = 'to bottom'
    exceptionCode = 'linear-gradient'
    reverseColors = false
    let reg = /(#([0-9A-Fa-f]{6})|(rgb|hsl)a\((([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s?){3}(1|0|0?\.\d+)\)|(rgb|hsl)\(\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])%?\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])%?\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])%?\s*\))/
    const getValue = () => {
        gradientFrom = inputFrom.value.toLowerCase()
        gradientTo = inputTo.value.toLowerCase()
        if (inputMid !== 'undefined') {
            gradientMid = inputMid.value.toLowerCase()
        }
        validateInput()
    }
    const validateInput = () => {
        gradientFrom = gradientFrom.match(reg)
        gradientFrom = (gradientFrom !== null) ? gradientFrom[0] : '#ffffff'
        gradientTo = gradientTo.match(reg)
        gradientTo = (gradientTo !== null) ? gradientTo[0] : '#ffffff'
        if (inputMid !== 'undefined') {
            gradientMid = gradientMid.match(reg)
            gradientMid = (gradientMid !== null) ? gradientMid[0] : '#ffffff'
            inputMid.value = gradientMid
        }
        inputFrom.value = gradientFrom
        inputTo.value = gradientTo
        createCodeGradient()
    }
    const createCodeGradient = () => {
        if (reverseColors === true) {
            reverseColorsFun()
        }
        codeGradient = (inputMid === 'undefined') ? exceptionCode + "(" + orientation + ", " + gradientFrom + ', ' + gradientTo + ")" : exceptionCode + "(" + orientation + ", " + gradientFrom + ', ' + gradientMid + ', ' + gradientTo + ")"
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
        mainAppBox.style.background = codeGradient
        inputFrom.style.backgroundColor = gradientFrom;
        changeFontColor(inputFrom)
        if (inputMid !== 'undefined') {
            inputMid.style.backgroundColor = gradientMid;
            changeFontColor(inputMid)
        }
        inputTo.style.backgroundColor = gradientTo;
        changeFontColor(inputTo)
    }
    const changeFontColor = (input) => {
        let bgColor, colorNumber, colorNumberArray, sumColor = 0
        bgColor = input.style.backgroundColor;
        colorNumber = bgColor.replace(/\D+|\D.*/g, '|')
        colorNumberArray = colorNumber.split('|')
        sumColor = parseInt(colorNumberArray[1]) + parseInt(colorNumberArray[2]) + parseInt(colorNumberArray[3])
        input.style.color = (sumColor <= 390) ? '#FFFFFF' : '#000000';
    }
    const addNewMidInput = () => {
        if (inputMid === 'undefined') {
            inputMid = inputFrom.cloneNode()
            countGenerateInput++
            inputMid.id = 'inputMid';
            inputsBox.insertBefore(inputMid, inputTo)
            inputMid.classList.remove('jscolor')
            inputMid.classList.add('jscolor')
            gradientMid = inputMid.value
            jsColorPicker('input.jscolor', {
                customBG: '#222',
                readOnly: false,
                // patch: false,
                init: function(elm, colors)  { // colors is a different instance (not connected to colorPicker)
                    elm.style.backgroundColor = elm.value;
                    elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
                },
                // appendTo: document.querySelector('.samples')
            });
            getValue()
            loadFocusOutBtn()
            changeContentAddSection()
        }
    }
    const changeContentAddSection = (changeTest) => {
        let textBox = document.querySelector('#addBtnSectionText');
        if (changeTest !== false) {
            textBox.innerText = 'Usuń poprzedni kolor'
            btnNewInputMid.innerText = 'USUŃ'
            btnNewInputMid.addEventListener('click', removeInputMid)
        } else if (changeTest === false) {
            textBox.innerText = 'DODAJ KOLEJNY KOLOR'
            btnNewInputMid.innerText = 'DODAJ'
            btnNewInputMid.addEventListener('click', addNewMidInput)
        }
    }
    const removeInputMid = (btnInputMid) => {
        if (inputMid !== 'undefined') {
            inputMid.remove()
        }
        btnNewInputMid.removeEventListener('click', removeInputMid)
        btnNewInputMid.removeEventListener('click', addNewMidInput)
        inputMid = 'undefined'
        gradientMid = undefined;
        changeContentAddSection(false)
        getValue()
    }
    const inputFocusOut = (thisInput) => {
        thisInput.target.style.backgroundColor = thisInput.target.value;
        if (thisInput.target.id === 'inputFrom') {
            gradientFrom = thisInput.target.value
        } else if (thisInput.target.id === 'inputTo') {
            gradientTo = thisInput.target.value
        } else if (thisInput.target.id === 'inputMid') {
            gradientMid = thisInput.target.value
        }
        getValue()
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
        removeInputMid(btnNewInputMid)
        btnNewInputMid.addEventListener('click', addNewMidInput)
        interfaceChanges()
    }
    const clickEventsLoad = () => {
        const btnCopyCode = document.querySelector('#copyCode')
        const btnReset = document.querySelector('#resetGenerator')
        btnCopyCode.addEventListener('click', copyCode);
        btnReset.addEventListener('click', reset);
        btnNewInputMid.addEventListener('click', addNewMidInput)
        addEventsToOrientationBtn(orientationSection)
        loadFocusOutBtn()
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
    const loadFocusOutBtn = () => {
        let elementsBtn = document.querySelectorAll('input.jscolor');
        for (let input of elementsBtn) {
            input.addEventListener('focusout', inputFocusOut)
        }
    }

    clickEventsLoad();
})();