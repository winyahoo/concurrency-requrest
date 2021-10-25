const express = require('express');
const app = express();



app.get('/orders', (req, res) => {
    const time = new Date().getTime();
    console.log(`Time request ${time}`);
    return res.json({
        status: 'success',
        msg: 'Ok',
        time
    })
})

app.listen(3000, ()=>{
    console.log('listening on port 3000')
});