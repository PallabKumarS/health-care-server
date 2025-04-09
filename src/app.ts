import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

const app: Application = express();

// parsers
app.use(
  cors({
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all routes here
app.use('/api/v1/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Server Status</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f4;
          font-family: Arial, sans-serif;
        }
        h1 {
          text-align: center;
          color: #333;
        }
      </style>
    </head>
    <body>
      <h1>🚀 Server is running successfully! 🚀</h1>
    </body>
    </html>
  `);
});

// not found route
app.use(notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
