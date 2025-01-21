const express = require('express');
const fileUpload = require('express-fileupload');

const cors = require('cors');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));


app.use(cors({ 
    origin: "*" 
}));



const port = process.env.PORT || 2508;
app.listen(port, () => {
    console.log(`Server is running on PORT - ${port}`);
});


const dbConnect = require('./config/db');
dbConnect();

const { getEmailLayout } = require('./controllers/getEmailLayout');
const { uploadEmailConfig } = require('./controllers/uploadEmailConfig');
const { uploadImage } = require('./controllers/uploadImage');
const { renderAndDownloadTemplate } = require('./controllers/renderAndDownloadTemplate');



app.get('/getEmailLayout', getEmailLayout);
app.post('/uploadEmailConfig', uploadEmailConfig);
app.post('/uploadImage', uploadImage);
app.post('/renderAndDownloadTemplate', renderAndDownloadTemplate);