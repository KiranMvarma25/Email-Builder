import { useState, useEffect } from 'react';
import Editor from './components/Editor';
import ImageUpload from './components/ImageUpload';

function App() {
    
    const [layoutHtml, setLayoutHtml] = useState('');
    
    const [formData, setFormData] = useState({
        title : '',
        body : '',
        imageUrl : '', 
    });

    useEffect(() => {
        fetch('http://localhost:2508/getEmailLayout')
            .then((response) => {
                if(!response.ok) 
                    throw new Error('Network response not ok');
                return response.json();
            })
            .then((data) => setLayoutHtml(data.html))
            .catch((error) => console.error('Error', error));
    },[]);

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name ]: value,
        }));
    };

    const handleImageUpload = (imageUrl) => {
        console.log("Image URL", imageUrl);
        setFormData((prevState) => ({
            ...prevState,
            imageUrl,
        }));
    };

    const handleSubmit = () => {
        fetch('http://localhost:2508/uploadEmailConfig', {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => alert('Template Rendered and Saved'))
            .catch((error) => console.error('Error in rendering the Template', error));
    };

    const handleDownload = () => {
        console.log("Form Data", formData);
        fetch('http://localhost:2508/renderAndDownloadTemplate', {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if(!response.ok) 
                    throw new Error('Failed to Download the Template');
                return response.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'GeneratedTemplate.html';
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch((error) => console.error('Error in downloading the Template:', error));
    };

    return (
        <>
            <h1 className='heading'>Template Editor</h1>
            
            <br />
            <br />
            <br />

            <div className='parent'>
                
                <div className='form'>
                    
                    <Editor layoutHtml={layoutHtml} formData={formData} onFieldChange={handleFieldChange} />
                    
                    <br />

                    <ImageUpload onImageUpload={handleImageUpload} />

                    <br />
                    <br />
                    
                    <button className='submitButton' onClick={handleSubmit}>Submit</button>
                    
                </div>
                
                <div className='download'>
                    <button className='downloadTemplateButton' onClick={handleDownload}>Download Template</button>
                </div>

            </div>
        </>
    );
}

export default App;