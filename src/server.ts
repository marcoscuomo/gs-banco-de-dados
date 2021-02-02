import 'reflect-metadata';
import express from 'express';
import routes from './routes';

import './database'

const app = express();
app.use(express.json());
app.use(routes);

// app.post('/', (request, response) => {
//     return response.json({msg: 'Hello world'});
// });

app.listen(3333, ()=>{
    console.log('Server starded on port 3333');
});
