import { Router } from 'express';
import { getAllCoffees, getCoffee, updateCoffee, createCoffees, deleteCoffee, aliasForBestsellers } from '../controllers/coffeesControllers'

const router = Router();

router.route('/bestsellers').get(aliasForBestsellers, getAllCoffees)
router.route('/').get(getAllCoffees).post(createCoffees)
router.route('/:id').get(getCoffee).patch(updateCoffee).delete(deleteCoffee)

export default router