function generator() {




    this.copy = () => {
        const codeBox = document.querySelector('#cssCode')
        codeBox.focus()
        codeBox.select()
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    }
}
const generatorRun = new generator()