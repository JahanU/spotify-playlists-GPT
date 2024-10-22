import { Button } from "@/components/ui/button";
import { Music } from "lucide-react"; // Icon from lucide-react

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default function Login() {

    // spotify
    var client_id = '6caef0a659b14af4acf54aabef3f4ef3';
    var redirect_uri = 'http://localhost:5173/';
    var state = generateRandomString(16);
    localStorage.setItem('spotifyKey', state);
    var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);
    console.log(url)


    const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=playlist-modify-public%20playlist-modify-private`;

    const handleLogin = () => {
        window.location.href = SPOTIFY_AUTH_URL;
    };

    return (
        <Button onClick={handleLogin} className="bg-emerald-700 hover:bg-emerald-800 text-amber-50">
            Log in to Spotify
            <Music style={{paddingLeft: '4px'}}/>
        </Button>
    );
}