const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const data = {
        code: 200,
        message: 'Hello World!',
    }
    return res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})