import express from 'express'
import cors from 'cors'
import path from 'path';
import bodyParser from 'body-parser';
import Router from '@/routes'

const app = express()
const port = 3030

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(Router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
