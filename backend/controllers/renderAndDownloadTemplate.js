const fs = require('fs');
const path = require('path');

exports.renderAndDownloadTemplate = async (req, resp) => {
    try{
        const { title, body, imageUrl } = req.body;

        if(!title || !body){
            return resp.status(400).json({
                success: false,
                msg: "Title and body are required",
            });
        }

        console.log("Title", title);
        console.log("Body", body);
        console.log("Image URL", imageUrl);

        const layoutPath = path.join(__dirname, '..', 'layout.html');

        fs.readFile(layoutPath, 'utf8', (err, layoutData) => {
            if(err){
                return resp.status(500).json({
                    success: false,
                    msg: "Failed to read the layout file",
                });
            }
        
            const outputHtml = layoutData
                .replace('{{title}}', title)
                .replace('{{body}}', body)
                .replace('{{logo}}', imageUrl || 'https://png.pngtree.com/template/20190323/ourmid/pngtree-vintage-retro-blank-labels-logo-image_83079.jpg'); 
        
            const outputFilePath = path.join(__dirname, '..', 'output', 'generatedTemplate.html');
        
            fs.writeFile(outputFilePath, outputHtml, (err) => {
                if(err){
                    return resp.status(500).json({
                        success: false,
                        msg: "Failed to save the output file",
                    });
                }
        
                resp.download(outputFilePath, 'generatedTemplate.html', (err) => {
                    if(err){
                        return resp.status(500).json({
                            success: false,
                            msg: "Failed to download the file",
                        });
                    }
                });
            });
        });
        
    } 
    catch(error){
        console.log(error);
        resp.status(500).json({
            success: false,
            msg: "Internal Server Error",
            error: error.message,
        });
    }
};