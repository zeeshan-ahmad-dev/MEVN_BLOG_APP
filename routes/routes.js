const { Router } = require("express");
const router = Router();
const API = require("../controllers/api");
const multer = require("multer");

// multer middleware
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({
    storage: storage
}).single("image")

router.get("/", API.fetchAllPost)
router.get("/:id", API.fetchPostById)
router.post("/", upload, API.createPost)
router.patch("/update/:id", upload, API.updatePost)
router.delete("/:id", API.deletePost)

module.exports = router;