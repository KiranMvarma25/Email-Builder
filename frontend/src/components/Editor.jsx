function Editor({ layoutHtml, formData, onFieldChange }) {
    return (
        <div>
            <div>
                
                {/* <div className="layout-container" dangerouslySetInnerHTML={{ __html: layoutHtml }}></div> */}

                <div className="editor">
                    
                    <input className="titleInput" type="text" name="title" value={formData.title} onChange={onFieldChange} placeholder=" Enter Title"/>
                    
                    <br />
                    <br />
                    <br />
                    
                    <textarea className="textareaInput" name="body" value={formData.body} onChange={onFieldChange} placeholder=" Enter body"></textarea>

                </div>

            </div>
        </div>
    );
}

export default Editor;