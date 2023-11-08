import { Router } from 'express';
import { getAllCoffees, getCoffee, updateCoffee, createCoffees, deleteCoffee } from '../controllers/coffeesControllers'

const router = Router();

router.route('/').get(getAllCoffees).post(createCoffees)
router.route('/:id').get(getCoffee).patch(updateCoffee).delete(deleteCoffee)

export default router