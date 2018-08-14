(() => {
    const codeBox = document.querySelector('#cssCode')
    let mainAppBox = document.querySelector('#mainApp')
    let inputFrom, inputTo, grandientFrom, grandientTo
    inputFrom = document.querySelector('#inputFrom')
    inputTo = document.querySelector('#inputTo')


    let reg = /(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/
    const getValue = () => {
        console.log('1st step')


        grandientFrom = inputFrom.value.toLowerCase()
        grandientTo = inputTo.value.toLowerCase()
        validateInput()
    }
    const validateInput = () => {
        console.log('second step')
        grandientFrom = (reg.test(grandientFrom)) ? grandientFrom : false

        grandientTo = (reg.test(grandientTo)) ? grandientTo : false
        console.log(grandientFrom + ' ' + grandientTo)
        if (grandientFrom != false & grandientTo != false) {
            interfaceChanges()
        }
    }
    const interfaceChanges = () => {

        mainAppBox.style.background = "linear-gradient(to top," + grandientFrom + ',' + grandientTo + ")"
        inputFrom.style.backgroundColor = grandientFrom;
        inputTo.style.backgroundColor = grandientTo;
    }
    const copyCode = () => {
        codeBox.focus()
        codeBox.select()
        try {
            let successful = document.execCommand('copy');
            let msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    }
    const reset = () => {
        codeBox.innerText = 'background-image: linear-gradient(to right, #5a90e0, #6000fc);';
    }
    const clickEventsLoad = () => {
        const btnCopyCode = document.querySelector('#copyCode')
        btnCopyCode.addEventListener('click', copyCode);
        const btnReset = document.querySelector('#resetGenerator')
        btnReset.addEventListener('click', reset);
        const btnGenerate = document.querySelector('#btnGenerate')
        btnGenerate.addEventListener('click', getValue);

    }
    clickEventsLoad();
})();