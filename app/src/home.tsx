import { useState } from "preact/hooks";

function Home() {

    const [desc, setDesc] = useState('');
    const [songs, setSongs] = useState([1, 2, 3, 4]);


    const onClick = (e) => {
        console.log(e);
    }
    return (
 
    );
}

export default Home;