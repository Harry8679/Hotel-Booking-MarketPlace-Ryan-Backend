const home = (req, res) => {
    res.send('Test 5');
}

const register = (req, res) => {
    console.log(req.body);
    res.send('Registration from Controller 2');
}

module.exports = { home, register };