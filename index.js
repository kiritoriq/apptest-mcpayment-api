require('dotenv').config();
const express = require('express');
const { sequelize } = require('./db')
const budgetRoutes = require('./routes/budgetRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));

sequelize
    .authenticate()
    .then(response => {
        console.log('Connected to database type ' + process.env.DB_DRIVER + 'on port ' + process.env.DB_PORT);
        app.listen(process.env.APP_PORT);
        console.log('Listening to port ' + process.env.APP_PORT + '...');
    })
    .catch(err => {
        console.log(err);
    })

app.use('/api/budget', budgetRoutes);

// 404 not found
app.use((req, res) => {
    if(res.status(404)) {
        res.json({
            message: 'Not Found',
            code: 404
        });
    }
})

