const loginOverlay = document.getElementById('loginOverlay');
const loginBtn = document.getElementById('loginBtn');
const loginPassword = document.getElementById('loginPassword');
const loginError = document.getElementById('loginError');

function doLogin() {
    if (loginPassword.value === 'pakbang') {
        loginOverlay.remove();
    } else {
        loginError.textContent = 'รหัสผ่านไม่ถูกต้อง';
        loginPassword.value = '';
        loginPassword.focus();
    }
}

loginBtn.onclick = doLogin;
loginPassword.onkeydown = function(e) {
    if (e.key === 'Enter') {
        doLogin();
    }
};

document.getElementById('problemForm').onsubmit = function(e) {
    e.preventDefault();
    window.location.href = "https://docs.google.com/spreadsheets/d/1V2TB2dy5qyF7IHJC_pYRG52wdki-3gx7vvmnORmuGuA/edit?usp=sharing";
};

document.getElementById('TutorForm').onsubmit = function(e) {
    e.preventDefault();
    window.location.href = "https://docs.google.com/spreadsheets/d/1OQKZZhLA8OYnT88trrgurYgZAwdhtTatKeouexpin3U/edit?usp=sharing";
};

document.getElementById('StudyForm').onsubmit = function(e) {
    e.preventDefault();
    window.location.href = "https://docs.google.com/spreadsheets/d/1yVr-qb8AFM_JsLkJ0JC8YAJXtdYBC4mQbLQLvCZYA3o/edit?usp=sharing";
};