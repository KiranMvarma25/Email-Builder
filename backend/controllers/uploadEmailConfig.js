const emailSchema = require('../model/emailSchema');

exports.uploadEmailConfig = async (req, res) => {
    try{
        const { title, body, imageUrl } = req.body;

        if(!title || !body){
            return res.status(400).json({
                success: false,
                message: "Title and Content are required"
            });
        }

        const createdTemplate = await emailSchema.create({ title, body, imageUrl });
        res.status(200).json({
            success: true,
            message: "Template Created Successfully",
            template: createdTemplate,
        });
    } 
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Failed to save email template'
        });
    }
};