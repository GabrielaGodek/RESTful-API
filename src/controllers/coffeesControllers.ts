import { RequestHandler } from 'express';
import { cofSchema as CoffeeSchema } from '../models/coffeeModel';

// const coffeesData = JSON.parse(fs.readFileSync(path.resolve('src/db/db.json'), { encoding: 'utf-8' }))

const getAllCoffees: RequestHandler = async (req, res, next) => {
    try {
        const queryObj = {...req.query}
        const excludedFields:string[] = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach((el:string) => delete queryObj[el])
        // console.log(queryObj.name)
        

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)



        const query = CoffeeSchema.find(JSON.parse(queryStr))
        const coffeesData = await query

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

export { getAllCoffees, getCoffee, updateCoffee, createCoffees, deleteCoffee }