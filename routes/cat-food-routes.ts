import express from "express";
import CatFood from "../models/CatFood";
import {catFoodAdd, catFoodDelete, catFoodUpdate, getAllCatFoods, getCatFoodById} from "../services/cat-food-service";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/cat-foods');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/add", upload.single('image'), async (req, res) => {
    const catFood: CatFood = req.body;
    const imagePath = req.file?.path;

    try {
        const addedCatFood = await catFoodAdd(catFood, imagePath);
        res.status(201).json(addedCatFood);
    } catch (err) {
        console.log("error adding cat food", err);
        res.status(500).send("error adding cat food");
    }
})

router.put("/update/:id", upload.single('image'), async (req, res) => {
    const id: number = parseInt(req.params.id);
    const catFood: CatFood = req.body;
    const imagePath = req.file?.path;

    try {
        const updatedCatFood = await catFoodUpdate(id, catFood, imagePath);
        res.status(200).json(updatedCatFood);
    } catch (err) {
        console.log("error updating cat food", err);
        res.status(400).send("error updating cat food");
    }
})

router.delete("/delete/:id", async (req, res) => {
    const id: number = parseInt(req.params.id);

    try {
        const deletedCatFood = await catFoodDelete(id);
        res.status(200).json({message: "Cat food deleted successfully"});
    } catch (err) {
        console.log("error deleting cat food", err);
        res.status(400).send("error deleting cat food");
    }
})

router.get("/", async (req, res) => {
    try {
        const catFoods = await getAllCatFoods();
        res.status(200).json(catFoods);
    } catch (err) {
        console.log("error getting cat foods", err);
        res.status(400).send("error getting cat foods");
    }
})

router.get("/:id", async (req, res) => {
    const id: number = parseInt(req.params.id);

    try {
        const catFood = await getCatFoodById(id);
        res.status(200).json(catFood);
    } catch (err) {
        console.log("error getting cat food", err);
        res.status(400).send("error getting cat food");
    }
})

export default router;