import express, { Router } from "express";  

import pool from "../Config/db.js";
import error from "../Middleware/error.js";

const router = express.Router();

router.use(error);

router.get('/',async(req, res, next)=>{
    try {
        const newUser = await pool.query("SELECT * FROM users");
        res.json(newUser.rows);
    } catch (error){
        next (error);
    }
})

// create 

router.post("/", async (req, res, next) => {
    const { id, name, email, phone, address, age } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (result.rows.length > 0) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const newUser = await pool.query(
            "INSERT INTO users (id, name, email, phone, address, age) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [id, name, email, phone, address, age ]
        );

        res.status(201).json({
            message: "User created successfully",
            user: newUser.rows[0]
        });
        
    } catch (error) {
        next(error);
    }
});

// delete 

router.delete('/:id', async (req, res, next)=>{
    const {id}= req.params;
    try {
        const result = await pool.query(
            "DELETE FROM users WHERE id = $1 RETURNING * ",
            [id]
        );
        res.json({
            message : "user deleted ."
        });
    } catch (error){
        next(error);
    }
});

// find id 

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        next(error);
    }
});


router.put('/:id', async (req, res, next )=>{
    const {id }= req.params;
    const {name, email, phone, address, age } = req.body;
    try{
        const result = await pool.query(
            "UPDATE users SET name = $1, email = $2, phone = $3, address = $4, age = $5 WHERE id = $6 RETURNING *",
            [name, email, phone, address, age, id] 
        );
        if (result.rows.length === 0){
            return res.status(404).json({
                message: "User not found"

            });
        }

        res.json({
            message:"user updated",
            user:result.rows[0]
            
        });
    }catch(error){
        next (error);
    }
});

export default router;