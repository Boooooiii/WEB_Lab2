import View from "./view.js";
import Store from "./store.js";

export default class ViewController {
    constructor() {
        this.view = new View();
        this.store = new Store((state) => this.view.render(state));
    }

    init() {
        let c_currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (!currentUser || !currentUser.login) {
            window.assert("Can not work without account");
            window.location.href = 'auth.html';
            return;
        } else {
            this.currentUser = c_currentUser;
        }

        let usersData = JSON.parse(localStorage.getItem('usersData')) || {};

        let currentUserData = usersData[this.currentUser.login] || null;

        if (currentUserData) {
            this.store.setState(currentUserData);
        } 

        document.querySelector('.row.g-2').parentElement.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (btn) this.handleInput(btn.textContent);
        });
    }

    handleInput(val) {
        if (!isNaN(val) || val === '.') this.store.dispatch('DIGIT', val);
        else if (val === 'C') this.store.dispatch('CLEAR');
        else if (val === 'CE') this.store.dispatch('CLEAR CURRENT');
        else if (val === '=') this.store.dispatch('EQUALS');
        else if (val === '⌫') this.store.dispatch('DELETE');
        else {
            let op = val;
            if (val === '×') op = '*';
            else if (val === '÷') op = '/';
            else if (val === 'x²') { op = '^2'; this.store.dispatch('FAST OP', op); return; }
            else if (val === '²√x') { op = '2sqrt'; this.store.dispatch('FAST OP', op); return; }
            else if (val === '¹/x') { op = '1/'; this.store.dispatch('FAST OP', op); return; }
            else if (val === '+/-') { this.store.dispatch('FAST OP', op); return; }
            this.store.dispatch('OP', op);
        }

        let usersData = JSON.parse(localStorage.getItem('usersData')) || {};
        usersData[this.currentUser.login] = this.store.getState();

        localStorage.setItem('usersData', JSON.stringify(usersData));
    }
}
