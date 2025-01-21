const fs = require('fs');
const path = require('path');

exports.getEmailLayout = (req, res) => {
    const layoutPath = path.join(__dirname, '..', 'layout.html'); 

    fs.readFile(layoutPath, 'utf8', (err, data) => {
        if(err){
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve the Email Layout'
            });
        }
        res.json({ html: data });  
    });
};