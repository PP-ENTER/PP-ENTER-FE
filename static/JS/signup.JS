const signupForm = document.getElementById('signup-form');
const loginLink = document.getElementById('login-link');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const nickname = document.getElementById('nickname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    try {
        const response = await fetch('http://127.0.0.1:8000/register/', { #지금은 제 로컬 주소로 되어 있습니다.
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, nickname, email, password, password2 })
        });

        if (response.ok) {
            window.location.href = '/post_list.html';
        } else {
            const data = await response.json();
            alert(data.message || '정보가 이미 존재합니다.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/login.html';
});