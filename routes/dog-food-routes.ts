import express from "express";
import DogFood from "../models/DogFood";
import {dogFoodAdd, dogFoodUpdate, dogFoodDelete, getAllDogFoods, getDogFoodById} from "../services/dog-food-service";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/dog-foods');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/add", upload.single('image'), async(req, res) => {
    const dogFood: DogFood = req.body;
    const imagePath = req.file?.path;

    try {
        const addedDogFood = await dogFoodAdd(dogFood, imagePath);
        res.status(201).json(addedDogFood);
    }catch (err) {
        console.log("error adding dog food", err);
        res.status(500).send("error adding dog food");
    }
})

router.put("/update/:id", upload.single('image'), async (req, res) => {
    const id: number = parseInt(req.params.id);
    const dogFood: DogFood = req.body;
    const imagePath = req.file?.path;

    try {
        const updatedDogFood = await dogFoodUpdate(id, dogFood, imagePath);
        res.status(200).json(updatedDogFood);
    }catch (err) {
        console.log("error updating dog food", err);
        res.status(400).send("error updating dog food");
    }
})

router.delete("/delete/:id", async (req, res) => {
    const id: number = parseInt(req.params.id);

    try {
        const deletedDogFood = await dogFoodDelete(id);
        res.status(200).json({message: "Dog food deleted successfully"});
    }catch (err) {
        console.log("error deleting dog food", err);
        res.status(400).send("error deleting dog food");
    }
})

router.get("/", async (req, res) => {
    try {
        const dogFoods = await getAllDogFoods();
        res.status(200).json(dogFoods);
    }catch (err) {
        console.log("error getting dog foods", err);
        res.status(400).send("error getting dog foods");
    }
})

router.get("/:id", async (req, res) => {
    const id: number = parseInt(req.params.id);

    try {
        const dogFood = await getDogFoodById(id);
        res.status(200).json(dogFood);
    }catch (err) {
        console.log("error getting dog food", err);
        res.status(400).send("error getting dog food");
    }
})

export default router;