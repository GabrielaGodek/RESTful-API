import { RequestHandler } from 'express';
import { Model } from "mongoose";
import { cofSchema as CoffeeSchema, CoffeeDoc } from '../models/coffeeModel';
import { APIFeatures } from '../utils/apiFeatures'
import ErrorHandler, { HttpStatusCode } from '../utils/errorHandler'


const getAllCoffees: RequestHandler = async (req, res, next) => {
    try {
        const coffeeModel: Model<CoffeeDoc> = CoffeeSchema;
        const filterFeature = new APIFeatures(coffeeModel.find(), req.query).filter().sort().fields().pagination()
        const coffeesData = await filterFeature.query

        res.json({
            status: 'success',
            result: coffeesData.length,
            coffees: coffeesData
        })
    } catch (err) {
        next(new ErrorHandler('NOT FOUND', HttpStatusCode.NOT_FOUND, true, 'Data was not found'))
    }
}

const getCoffee: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
        const coffee = await CoffeeSchema.findById(req.params.id)
        if (!coffee) {
            return next(new ErrorHandler('BAD REQUEST', HttpStatusCode.BAD_REQUEST, true, 'Incorrect ID'))
        }
        res.json({
            status: 'success',
            coffees: coffee
        })
    } catch (err) {
        next(new ErrorHandler('BAD REQUEST', HttpStatusCode.BAD_REQUEST, true, 'Incorrect ID'))
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

    } catch (err) { 
        next(new ErrorHandler('BAD REQUEST', HttpStatusCode.BAD_REQUEST, true, 'Incorrect fields'))
    }
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
        // console.log(err)
        next(new ErrorHandler('BAD REQUEST', HttpStatusCode.BAD_REQUEST, true, 'Incorrect or duplicate fields'))
    }
}

const deleteCoffee: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
        const coffeeToDelete = await CoffeeSchema.findByIdAndDelete(req.params.id)
        res.json({
            status: "deleted",
            data: null
        })

    } catch (err) { 
        next(new ErrorHandler('INTERNAL SERVER', HttpStatusCode.INTERNAL_SERVER, true))
    }
}

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
    } catch (err) {
        next(new ErrorHandler('INTERNAL SERVER', HttpStatusCode.INTERNAL_SERVER, true, 'Cannot download selected statistics'))
     }
}



export { getAllCoffees, getCoffee, updateCoffee, createCoffees, deleteCoffee, aliasForBestsellers, getCoffeeStats }