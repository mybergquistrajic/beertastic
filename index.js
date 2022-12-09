const newUserPassword = {
    userId: 3,
    password: 'EyBroIsTheBest',
    newPassword: 'EyBroIsTheBest2'
}

const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUserPassword)
}

fetch('http://localhost:8888/PHP(Back-End)/updatePassword.php', options).then(res => res.json()).then(data => console.log(data))