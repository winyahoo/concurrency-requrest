const express = require('express');
const app = express();
const { get, set, setnx, incrby, exists, decrby } = require('./model.redis')



const stock = 10
const keyName = 'Iphone13'
const buyNumber = 1

app.get('/orders', async (req, res) => {
    const time = new Date().getTime();

    const getKey = await get(keyName)
    if (!getKey) {
        await setnx(keyName, stock) //setnx dùng để xử lý 2 hoặc nhiều request đồng thời

    }
    let sellNumber = await decrby(keyName, buyNumber)
    
    if (sellNumber < 0) {
        console.log("Out of stock")
        return res.json({
            status: 'error',
            msg: 'Out of stock',
            time
        })
    }

        console.log(`SL con lai: ${sellNumber}`)
        console.log(`Time request ${time}`);
        return res.json({
            status: 'success',
            msg: 'Ok',
            time
        })
    

})

app.listen(3000, () => {
    console.log('listening on port 3000')
});