const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());

const users = [];

app.get('/users', (req, res) => {
    return res.json(users)
})

app.post('/users', (req, res) => {
    const { username } = req.body;

    const newUser = ({ id: uuid(), username });

    users.push(newUser);

    return res.status(201).json(newUser)
})

app.put('/users/:id', (req, res) => {
    const { username } = req.body;
    const { id } = req.params;

    const userIndex = users.findIndex(user => user.id === id);

    if (!isUuid(id)) {
        return res.status(400).json("project not found ;C")
    }

    const newUser = {
        id,
        username,
    }

    users[userIndex] = newUser;

    return res.json(username);
})

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const userIndex = users.findIndex(user => user.id === id)

    if(userIndex < 0) {
        return res.status(400).json({ error: "user not found" })
    }

    users.splice(userIndex, 1);

    return res.status(204).send();
})

app.listen(3333);