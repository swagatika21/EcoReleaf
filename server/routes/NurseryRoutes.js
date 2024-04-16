const router = require("express").Router();
const { nlogin, nsignup, getAllNursery, getNurseryById } = require("../controllers/nurseryController");

router.post("/nsignup", nsignup);
router.post("/nlogin", nlogin);
router.get("/ngetAll", getAllNursery);
router.get("/nursery/:nurseryId", getNurseryById);

module.exports = router;