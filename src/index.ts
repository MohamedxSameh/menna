import express from "express";
import routes from "./routes";

const app: express.Application = express();
const port = 5000;

app.use(routes);

app.listen(port, () => {
  console.log(`Server strted on": http://localhost:${port}`);
});

export default app;
