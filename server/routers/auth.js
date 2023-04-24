const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send("Hello from router server home page");
});

module.exports = router;