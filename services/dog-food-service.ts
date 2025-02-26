import DogFood from "../models/DogFood";
import prisma from "../database/prisma-client";
import * as fs from "fs";
import path from "path";

export async function dogFoodAdd(d: DogFood, imagePath?: string) {
    try {
        const newDogFood = await prisma.dogFood.create({
            data: {
                name: d.name,
                price: parseFloat(d.price.toString()),
                description: d.description,
                stock: parseInt(d.stock.toString()),
                imagePath: imagePath || ''
            }
        });
        console.log('Dog food added:', newDogFood);
        return newDogFood;
    } catch (err) {
        console.error("Error adding dog food", err);
        throw err;
    }
}

export async function dogFoodUpdate(id: number, d: DogFood, imagePath?: string) {
    try {
        const existingDogFood = await prisma.dogFood.findUnique({
            where: { id: id },
            select: { imagePath: true }
        });

        if (imagePath && existingDogFood?.imagePath) {
            const oldImagePath = path.join(__dirname, '..', existingDogFood.imagePath);
            try {
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            } catch (err) {
                console.error("Error deleting old image file", err);
                // You might want to decide whether to continue or throw the error
            }
        }

        const updatedDogFood = await prisma.dogFood.update({
            where: {id: id},
            data: {
                name: d.name,
                price: parseFloat(d.price.toString()),
                description: d.description,
                stock: parseInt(d.stock.toString(), 10),
                imagePath: imagePath || existingDogFood?.imagePath || ''
            }
        })

        console.log('Dog food updated :', updatedDogFood);
        return updatedDogFood;
    } catch (err) {
        console.error("Error updating dog food", err);
        throw err;
    }
}

export async function dogFoodDelete(id: number) {
    try {
        const existingDogFood = await prisma.dogFood.findUnique({
            where: { id: id },
            select: { imagePath: true }
        });

        if (existingDogFood?.imagePath) {
            const oldImagePath = path.join(__dirname, '..', existingDogFood.imagePath);
            try {
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            } catch (err) {
                console.error("Error deleting old image file", err);
                // You might want to decide whether to continue or throw the error
            }
        }

        const deletedDogFood = await prisma.dogFood.delete({
            where: { id: id }
        });

        console.log("Dog food deleted:", deletedDogFood);
        return deletedDogFood;
    } catch (err) {
        console.error("Error deleting dog food", err);
        throw err;
    }
}

export async function getAllDogFoods() {
    try {
        return await prisma.dogFood.findMany();
    } catch (err) {
        console.error("Error getting dog foods", err);
        throw err;
    }
}

export async function getDogFoodById(id: number) {
    try {
        return await prisma.dogFood.findUnique({
            where: {id: id}
        });
    } catch (err) {
        console.error("Error getting dog food", err);
        throw err;
    }
}