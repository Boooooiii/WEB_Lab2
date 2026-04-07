export default class View {
    constructor() {
        this.display = document.getElementById('display');
        this.history = document.getElementById('display-history');

        this.maxWidth = 380;
        this.minFontSize = 16;

        this.display.style.fontSize = '46px';
    }

    render(state) {
        this.display.textContent = state.currentValue;

        let currentFontSize = 46;
        this.display.style.fontSize = currentFontSize + 'px';
        this.display.style.display = 'inline-block';
        this.display.style.width = 'auto';

        while (this.display.offsetWidth > this.maxWidth && currentFontSize > this.minFontSize) {
            currentFontSize = currentFontSize - 2;
            this.display.style.fontSize = currentFontSize + 'px';
        }

        this.display.style.display = 'block';
        this.display.style.width = '100%';

        this.history.textContent = (state.previousValue === null ? "" : state.previousValue) + " " + (state.operator === null ? "" : state.operator) + " " + (state.currentValue === null ? "" : state.currentValue);
    }
}