import { Router } from "express";

import HotelController from "../controller/hotel.controller.js";

const router = Router();

router.post("/", HotelController.create);
router.get("/", HotelController.findAll);
router.put("/:id", HotelController.update);
router.delete("/:id", HotelController.delete);
router.delete("/", HotelController.deleteAll);
router.get("/:id", HotelController.findOne);

export default router;