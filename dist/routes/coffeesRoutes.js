"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coffeesControllers_1 = require("../controllers/coffeesControllers");
const router = (0, express_1.Router)();
router.route('/stats').get(coffeesControllers_1.getCoffeeStats);
router.route('/bestsellers').get(coffeesControllers_1.aliasForBestsellers, coffeesControllers_1.getAllCoffees);
router.route('/').get(coffeesControllers_1.getAllCoffees).post(coffeesControllers_1.createCoffees);
router.route('/:id').get(coffeesControllers_1.getCoffee).patch(coffeesControllers_1.updateCoffee).delete(coffeesControllers_1.deleteCoffee);
exports.default = router;
//# sourceMappingURL=coffeesRoutes.js.map