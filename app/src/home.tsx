import { Button, Card } from "@salt-ds/core";
import { Input } from "@salt-ds/core";
import { useState } from "preact/hooks";

function Home() {

    const [desc, setDesc] = useState('');
    const [songs, setSongs] = useState([1, 2, 3, 4]);


    const onClick = (e) => {
        console.log(e);
    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Input defaultValue="Value" style={{ width: "256px" }} />
                <Button onClick={onClick}>Create</Button>
            </div>

            {songs.map((song) => (
                <Card key={song}>{song}</Card>
            ))}
        </>
    );
}

export default Home;