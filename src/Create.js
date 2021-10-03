import { useState } from 'react';
import { useHistory } from "react-router-dom";

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Suvam');
    const [isPending, setIsPending] = useState(false);

    const History = useHistory();
    

    const handleSubmit = (e) => {
        e.preventDefault();

        // const blog = { title, body, author }; // They are same//

        const blog = {          //Same as the Previous Line//
            title: title,     
            body: body,
            author: author
        }

        console.log(blog);
        setIsPending(true);

        fetch('http://localhost:8000/blogs',{
            method:'POST',
            headers : {"Content-Type":"application/json"},
            body: JSON.stringify(blog)
                  
        }).then(() => {
            console.log('New Blog added');
            setIsPending(false);
            // History.go(-1); //Goes to the previous page //
            History.push('/'); // Goes to Home page as Home page path is passed through arguments //
        })
    }

    return (

        <div className="create">

            <h2>Add a New Blog</h2>

            <form onSubmit={handleSubmit}>

                {/* Taking input the blog title */}
                <label>Blog Title</label>
                <input 
                type="text"
                required
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />

                {/* Taking input the blog body */}
                <label>Blog Body</label>
                <textarea
                required
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                ></textarea>

                {/* Taking input the blog author by option */}
                <label>Blog Author : </label>
                <select value = {author} onChange = {(e) => setAuthor(e.target.value)}>
                    <option value = "Suvam">Suvam</option>
                    <option value = "Amit">Amit</option>
                    <option value = "Abhishek">Abhishek</option>
                </select>
                
                {/* Submit Button */}
                { !isPending && <button>Add Blog</button> }
                { isPending && <button disabled>Adding Blog...</button> }

                {/* The Values */}
                <p>This will be saved</p>
                <p> Title of the blog : {title}</p>
                <p>Body : {body}</p>
                <p>Author : {author}</p>

            </form>

        </div>
    );
}
 
export default Create;