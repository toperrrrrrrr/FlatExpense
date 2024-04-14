var database = require("../database");
const { createRouter } = require("./helper");
const router = createRouter();

router.get("/", (req,res)=>{
    res.render("adminpanel")
})

module.exports = router