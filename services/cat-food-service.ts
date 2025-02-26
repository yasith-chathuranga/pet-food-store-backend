import CatFood from "../models/CatFood";
import prisma from "../database/prisma-client";
import * as fs from "fs";
import path from "path";

export async function catFoodAdd(c: CatFood, imagePath?: string) {
    try {
        const newCatFood = await prisma.catFood.create({
            data: {
                name: c.name,
                price: parseFloat(c.price.toString()),
                description: c.description,
                stock: parseInt(c.stock.toString()),
                imagePath: imagePath || ''
            }
        });
        console.log('Cat food added:', newCatFood);
        return { success: true, data: newCatFood };
    } catch (err) {
        console.error("Error adding cat food", err);
        throw err;
    }
}

export async function catFoodUpdate(id: number, c: CatFood, imagePath?: string) {
    try {
        const existingCatFood = await prisma.catFood.findUnique({
            where: { id },
            select: { imagePath: true },
        });

        if (imagePath && existingCatFood?.imagePath) {
            const oldImagePath = path.join(__dirname, '..', existingCatFood.imagePath);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        const updatedCatFood = await prisma.catFood.update({
            where: { id },
            data: {
                name: c.name,
                price: parseFloat(c.price.toString()),
                description: c.description,
                stock: parseInt(c.stock.toString(), 10),
                imagePath: imagePath || existingCatFood?.imagePath || '',
            }
        })

        console.log("Cat food updated:", updatedCatFood);
        return { success: true, data: updatedCatFood };
    } catch (err) {
        console.error("Error updating cat food", err);
        throw err;
    }
}

export async function catFoodDelete(id: number) {
    try {
        const existingCatFood = await prisma.catFood.findUnique({
            where: { id },
            select: { imagePath: true },
        });

        if (existingCatFood?.imagePath) {
            const oldImagePath = existingCatFood.imagePath;
            if (oldImagePath) {
                fs.unlinkSync(oldImagePath);
            }
        }

        await prisma.catFood.delete({
            where: { id },
        });

        console.log("Cat food deleted:", id);
        return { success: true };
    } catch (err) {
        console.error("Error deleting cat food", err);
        throw err;
    }
}

export async function getAllCatFoods() {
    try {
        return await prisma.catFood.findMany();
    }catch (err) {
        console.error("Error getting all cat foods", err);
        throw err;
    }
}

export async function getCatFoodById(id: number) {
    try {
        return await prisma.catFood.findUnique({
            where: { id },
        });
    }catch (err) {
        console.error("Error getting cat food by id", err);
        throw err;
    }
}