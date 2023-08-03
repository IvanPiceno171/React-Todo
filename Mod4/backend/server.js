const express = require('express')
const dotenv = require('dotenv')
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt')
const cors = require('cors')
// const bodyParser = require('body-parser')



dotenv.config()
// console.log(process.env.PORT)


const app = express()
const port = process.env.PORT || 5000;

const corOptions = {
    origin:'*',
    // methods:"GET,POST",
    credentials: true,
    optionSuccessStatus:200
}




// MySQL Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


app.use(cors(corOptions))

// app.use(bodyParser.json())
app.use(express.json());


app.use(async (req, res, next)=>{
    try{
        req.db = await pool.getConnection()
        console.log(Object.keys(req))
        req.db.connection.config.namedPlaceholders=true
    
        await next() // moves request to next middleware/endpoint its headed for
        req.db.release(); 
    }catch(err){
        console.log(err)
        if(req.db){
            req.db.release()
            throw err
        }
    }
})


const todos = [
    {
        title: 'gym'
    },
    {
        title: 'clean'
    }
]


app.get('/', (req, res)=>{
    
    // return res.status(200).json({data : todos} )
    return res.status(200).json({ todos } )
})

app.post('/', async (req, res)=>{
    console.log('post todos', req.body)
    try{
        const newTodo = req.body;
        await todos.push(newTodo)

        const [todo] = await req.db.query(`
            INSERT INTO todos (title, completed)
            VALUES (:title, :completed);
            `, {title: newTodo.title,
                completed: newTodo.completed
            });

        // return res.status(201).json({ todos });
        return res.status(201).json({ ...todos, todo });
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Internal Server Error' });

    }
})

// app.put('/:id', async (req, res) => {
//     const todoId = req.params.id;
//     const { title, completed } = req.body;
  
//     try {
//       await req.db.query(`
//         UPDATE todos
//         SET title = :title, completed = :completed
//         WHERE id = :todoId
//       `, {
//         title,
//         completed,
//         todoId,
//       });
  
//       // Check if any row was affected by the update operation
//       const [updatedTodo] = await req.db.query('SELECT * FROM todos WHERE id = ?', [todoId]);
//       if (updatedTodo.length === 0) {
//         return res.status(404).json({ error: 'Todo not found' });
//       }
  
//       return res.status(200).json(updatedTodo[0]);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  
  

app.delete('/:id', async (req, res)=>{
    const todoId = req.params.id; // Get the id from the URL parameter

    try{

        const [todo] = await req.db.query(`
            DELETE FROM todos
            WHERE id = :todoId
            `,{
               todoId
            });

            if (todo.affectedRows === 0) {
                return res.status(404).json({ error: 'Todo not found' });
              }

        return res.status(201).json({ success: "Todo deleted"});
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Internal Server Error' });

    }
})


app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
})