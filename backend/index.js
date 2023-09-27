const express = require('express');
const cors= require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
    const { username, password } = req. body;

    const testUsername = 'admin';
    const testPassword = 'admin';

    if(username === 'admin' && password === 'admin') {
        return res.json({ message: `vous êtes maintenant connecté` });
    } else {
        return res.status(401).json({ message: `votre mot de passe ou votre nom d'utilisateur est incorrect! `});
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});




