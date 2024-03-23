import { useEffect, useState } from 'react'
import { Input, Button } from 'antd'

type post = {
  id: number,
  created_at: string,
  author: string,
  text: string
}
const App = () => {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [posts, setPosts] = useState<post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetch('http://localhost:3000');
      if (!resp.ok) {
        throw new Error("Failed to fetch");
      }
      const data: post[] = await resp.json();
      setPosts(data);
    }
    getPosts();
  }, [])

  const sendMessage = async () : Promise<void> => {
    try {
      await fetch('http://localhost:3000', {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({author: author, text: text})
      });
      setAuthor("");
      setText("");
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Input placeholder="Author" value={author} onChange={(e: any) => setAuthor(e.target.value)}/>
      <Input placeholder="Message" value={text} onChange={(e: any) => setText(e.target.value)}/>
      <Button onClick={() => sendMessage()}>Submit</Button>
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

export default App
