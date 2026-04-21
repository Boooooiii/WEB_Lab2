let current_password = null;

(function checkAuth() {
    const user_info = JSON.parse(localStorage.getItem('currentUser')) || {
        login: null,
        password: null,
        email: null,
        date: null
    };

    const profileInfoBlock = document.getElementById('profile-info-block');
    const noProfileInfoBlock = document.getElementById('no-profile-info-block');

    if (!profileInfoBlock || !noProfileInfoBlock) return;

    if (!user_info || !user_info.login) {
        profileInfoBlock.style.display = 'none';
        noProfileInfoBlock.style.display = 'block';

        const message = document.createElement('h5');
        message.textContent = "Дані користувача відсутні";
        message.className = "text-white";
        message.style.top = '50%';

        const button = document.createElement('button');
        button.textContent = "Увійти/Зареєструватися";
        button.className = "auth-btn";
        button.onclick = () => { window.location.href = 'auth.html'; };

        noProfileInfoBlock.appendChild(message);
        noProfileInfoBlock.appendChild(button);
    } else {
        profileInfoBlock.style.display = 'block';
        noProfileInfoBlock.style.display = 'none';

        document.getElementById('login-text').textContent = user_info.login;
        document.getElementById('email-text').textContent = user_info.email;
        document.getElementById('password-text').textContent = user_info.password;
        document.getElementById('date-text').textContent = user_info.date;

        current_password = user_info.password;
        showOrHidePassword(document.getElementById('profile-password-checkbox'));
    }
})();

function clearCurrentUser() {
    localStorage.removeItem('currentUser');
    location.reload();
}

function changeDisplayToBlock(inputId) {
const element = document.getElementById(inputId);

    if (element) {
        element.style.display = 'block';
    }
}

function showError(yourText) {
    const error = document.getElementById('profile-edit-error');
    error.textContent = yourText;
    error.style.display = 'block';

    setTimeout(() => {
        error.textContent = null;
        error.style.display = 'none';
    }, 5000);
}

function editAndChangeDisplayToNone(inputId, field) {
    let users = JSON.parse(localStorage.getItem('users'));
    let edited_user = JSON.parse(localStorage.getItem('currentUser'));

    const newValue = document.getElementById(inputId).value;
    if (!newValue) {
        showError("field is empty!")
        changeDisplayToNone(inputId);
        return;
    }

    if (newValue === edited_user[field]) {
        changeDisplayToNone(inputId);
        return;
    }

    if (field != "password") {
        const isDuplicate = users.some(user => user[field] === newValue);

        if (isDuplicate) {
            showError("User with this " + field + " already exists!");
            changeDisplayToNone(inputId);
            return;
        }
    } else {
        current_password = newValue;
    }

    edited_user[field] = document.getElementById(inputId).value;

    const updatedUsers = users.map(user =>
        user.login === JSON.parse(localStorage.getItem('currentUser')).login ? edited_user : user
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(edited_user));

    changeDisplayToNone(inputId);
    location.reload();
}
function changeDisplayToNone(inputId) {
    const element = document.getElementById(inputId);

    if (element) {
        element.style.display = 'none';
    }
}

function showOrHidePassword(checkbox) {
    if (checkbox.checked) {
        document.getElementById('password-text').textContent = current_password;
    } else {
        document.getElementById('password-text').textContent = "*".repeat(current_password.length);
    }
}