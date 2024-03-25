// Importing React and AntD packages
import { useEffect, useState } from 'react'
import { Input, Button } from 'antd'

/* Defining the type of a post received by GET endpont. created_at is string because it
comes as a string in the response JSON. */
type post = {
  id: number,
  created_at: string,
  author: string,
  text: string
}

/* Main React component. It defines the methods and necessary hooks for API call and the states
for proper component update. */
const App = () => {
  /* React state hooks for both author and text. "setAuthor" sets the state content and "author" reads it.
  React states do not behave exactly like common JavaScript variables. Every change in the state allows
  React to perform reloading of component. It allows to have content updates immediately. */
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  // State for the "post" list.
  const [posts, setPosts] = useState<post[]>([]);

  /* useEffect runs a function every time the page is loaded or when a specific state is updated.
  In this example it happens only when page is reloaded. How to make it update after we click on Submit?
  That's a task for you :) */
  useEffect(() => {
    
    // Asynchronous methhod to be called every page refresh.
    const getPosts = async () => {

      // Fetches GET content.
      const resp = await fetch('http://localhost:3000');

      // Throws error if fetch fails.
      if (!resp.ok) {
        throw new Error("Failed to fetch");
      }

      // Gets JSON result and sets it as "posts" state
      const data: post[] = await resp.json();
      setPosts(data);
    }
    
    // Calling previous method inside useEffect hook.
    getPosts();
  }, [])

  const sendMessage = async () : Promise<void> => {
    try {
      
      // Sends POST request with content written by user.
      await fetch('http://localhost:3000', {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({author: author, text: text})
      });

      // Cleans textboxes value after everything is OK.
      setAuthor("");
      setText("");
      
    } catch (error) {
      // Shows error on console if try-catch fails.
      console.error(error)
    }
  }

  // Return in a React functional component generates the HTML-like structure.
  return (
    <>
      { /* Inside return, comments are written like this. */ }
      
      { /* We created two input AntD forms. Each one is linked to their respective states. Every time the user types,
      the onChange method is run and changes the state. The "e" argument contains the current status of the input.
      We can use it to obtain the text that was written bu calling "e.target.value". */ }
      <Input placeholder="Author" value={author} onChange={(e: any) => setAuthor(e.target.value)}/>
      <Input placeholder="Message" value={text} onChange={(e: any) => setText(e.target.value)}/>
      
      { /* Submit button to run sendMessage method. */ }
      <Button onClick={() => sendMessage()}>Submit</Button>

      { /* We map every content in the post array and create a simple div for them with a border.
      Inside the div we write the timestamp, author and text of each post. */ }
      {
        posts.map((p: post) => (
          <div style={{ border: '1px solid #ccc' }}>
            <h5>Written by {p.author} at {p.created_at}</h5>
            <h3>{p.text}</h3>
          </div>
        ))
      }
    </>
  )
}

// Every react component should be exported in order to be read by the parent component (main.tsx).
export default App
