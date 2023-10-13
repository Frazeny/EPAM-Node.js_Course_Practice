import express from 'express';
import healthRouter from "./health-check/health-check.route.js";
import moviesRouter from "./movies/movies.route.js";
import {errorHandlerMiddleware} from "./middleware/error-handler.js";
import {notFoundMiddleware} from "./middleware/not-found.js";

const PORT = process.env.PORT || 3000;
const app = new express();

//routes
app.use('/health-check', healthRouter);
app.use('/movies', moviesRouter);


//middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async () => {
    try {
        app.listen(PORT,()=>{
            console.info(`Server in listening on port ${PORT}\
            \npid: ${process.pid}`)
        })
    } catch (e){
        console.error(e);
    }
}

start();
