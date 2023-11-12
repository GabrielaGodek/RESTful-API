import { RequestHandler } from 'express';
import { Model, Document } from "mongoose";
import { cofSchema as CoffeeSchema, CoffeeDoc, CoffeeObj } from '../models/coffeeModel';
import { APIFeatures } from '../utils/apiFeatures'


const getAllCoffees: RequestHandler = async (req, res, next) => {
    try {
        const coffeeModel: Model<CoffeeDoc> = CoffeeSchema;
        const filterFeature = new APIFeatures(coffeeModel.find(), req.query).filter().sort().fields().pagination()
        const coffeesData = await filterFeature.query
        // console.log(await coffeeModel.find())

        res.json({
            status: 'success',
            coffees: coffeesData
        })
    } catch (err) {
        console.log(err)
    }
}

const getCoffee: RequestHandler<{ id: string }> = async (req, res, next) => {
    console.log(typeof req.params.id)
    try {
        const coffee = await CoffeeSchema.findById(req.params.id)
        if (!coffee) {
            return res.json({
                status: 'fail',
                message: "Invalid ID"
            })
        }
        res.json({
            status: 'success',
            coffees: coffee
        })
    } catch (err) {
        console.log(err)
    }
}

const updateCoffee: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
        const coffeeToUpdate = await CoffeeSchema.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        await coffeeToUpdate?.save()
        res.json({
            status: 'updated',
            updatedCoffee: coffeeToUpdate
        })

    } catch (err) { }
}

const createCoffees: RequestHandler = async (req, res, next) => {
    const newCoffee = new CoffeeSchema(req.body)
    try {
        await newCoffee.save()
        res.json({
            status: 'created',
            addedCoffee: newCoffee
        })
    } catch (err) {

    }
}

const deleteCoffee: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
        const coffeeToDelete = await CoffeeSchema.findByIdAndDelete(req.params.id)
        res.json({
            status: "deleted",
            data: null
        })

    } catch (err) { }
}

// alias
const aliasForBestsellers: RequestHandler = async (req, res, next) => {
    (req.query.limit as string) = '3';
    (req.query.sort as string) = 'salePrice,price';
    next()
}

const getCoffeeStats: RequestHandler = async (req, res, next) => {
    try {
        const stats = await CoffeeSchema.aggregate([
            {
                $match: { price: { $gte: 10 } }
            },
            {
                $group: {
                    _id: '$description',
                    numOfCoffees: { $sum: 1 },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                }
            },
            {
                $sort: {
                    avgPrice: 1
                }
            }
        ])
        res.json({
            status: 'stats',
            data: stats
        })
    } catch (err) { }
}



export { getAllCoffees, getCoffee, updateCoffee, createCoffees, deleteCoffee, aliasForBestsellers, getCoffeeStats }