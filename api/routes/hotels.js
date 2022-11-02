import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel, countByCity, countByType, getHotelRooms } from "../controllers/hotel.js";
import {verifyAdmin} from "../utils/verifyToken.js"

const router = express.Router();

// //CREATE
// router.post("/", verifyAdmin, createHotel);

// //UPDATE
// router.put("/:id", verifyAdmin, updateHotel);

// //DELETE
// router.delete("/:id", verifyAdmin, deleteHotel);

// //GET
// router.get("/find/:id", getHotel);

// //GET ALL
// router.get("/",  getHotels);

// router.get("/countByCity", countByCity);
// router.get("/countByType", countByType);

// router.get("/room/:hotelId", getHotelRooms);




// Cookies Not Working on Heroku, So finding the solution

//CREATE
router.post("/", createHotel);

//UPDATE
router.put("/:id", updateHotel);

//DELETE
router.delete("/:id", deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GET ALL
router.get("/",  getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

router.get("/room/:hotelId", getHotelRooms);



export default router;