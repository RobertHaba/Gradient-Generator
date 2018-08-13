const generator = () => {
    const codeBox = document.querySelector('#cssCode')
    const clickEventsLoad = () => {
        const btnCopyCode = document.querySelector('#copyCode')
        btnCopyCode.addEventListener('click', () => {
            copyCode()
        });
        const btnReset = document.querySelector('#resetGenerator')
        btnReset.addEventListener('click', () => {
            reset()
        });
    }
    clickEventsLoad();


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
}
generator();