
function saveUser(newUserInfo) {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const isDuplicate = users.some(user =>
        user.login === newUserInfo.login ||
        user.email === newUserInfo.email
    );

    if (isDuplicate) {
        return false;
    }

    users.push(newUserInfo);
    localStorage.setItem('users', JSON.stringify(users));

    localStorage.setItem('currentUser', JSON.stringify(newUserInfo));

    return true;
}

function findUser(userLogin, userPassword) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(user => user.login === userLogin);

    if (!foundUser) {
        return false;
    }

    if (foundUser.password === userPassword) {
        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        return true;
    } else {
        return false;
    }
}

(function login() {
    const log = document.getElementById('login-form');

    if (log) {
        log.onsubmit = function (event) {
            event.preventDefault();

            const l = document.getElementById('login-login').value;
            const p = document.getElementById('login-password').value;

            if (findUser(l, p)) {
                window.location.href = "profile.html";
                checkAuth();
            } else {
                const error = document.getElementById('login-error');
                const error_text = error.textContent;

                error.textContent = "wrong login or password!";

                setTimeout(() => {
                    error.textContent = error_text;
                }, 5000);
            }
        }
    }
})();

(function register() {
    const reg = document.getElementById('register-form');

    if (reg) {
        reg.onsubmit = function (event) {
            event.preventDefault();

            temp_user = {
                login: document.getElementById('reg-login').value,
                password: document.getElementById('reg-password').value,
                email: document.getElementById('reg-email').value,
                date: new Date().toUTCString()
            }

            if (saveUser(temp_user)) {
                window.location.href = "profile.html";
                checkAuth();
            } else {
                const error = document.getElementById('register-error');
                const error_text = error.textContent;

                error.textContent = "user already exists!";

                setTimeout(() => {
                    error.textContent = error_text;
                }, 5000);
            }
        }
    }
})();