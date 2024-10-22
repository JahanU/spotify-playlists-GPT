import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GoogleGenerativeAI } from "@google/generative-ai";
import CreatePlaylist from './lib/createPlaylist';
import Login from './lib/login';
import { Activity } from "lucide-react"; // Icon from lucide-react

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export const Home = () => {
  const [accessToken, setAccessToken] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [songs, setSongs] = useState({});

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get('access_token');
      if (token) {
        setAccessToken(token);
        window.localStorage.setItem('spotify_access_token', token);  // Optionally store the token for later use
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e)
    const prompt = `
    Give me a 10 song playlist, with the data artist, title in JSON format.
    give this in the theme of ${userPrompt}`
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    const cleanInput = result.response.text().substring(7, result.response.text().length - 6);
    const JSONInput = JSON.parse(cleanInput);
    const map = new Map(JSONInput.map(item => [item.artist, item.title]));
    console.log(map);
    setSongs(map);
  };

  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-emerald-800">Spotify Playlist GPT</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <Input
              type="text"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Enter your prompt"
              className="flex-grow bg-amber-50 border-emerald-600 text-emerald-900 placeholder-emerald-700"
            />
            <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-amber-50">
              Generate
              <Activity style={{paddingLeft: '4px'}}/>
            </Button>
          </div>
        </form>
        {songs.size > 0 && (
          <Card className="bg-amber-50 border-emerald-600">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4 text-emerald-800">Related Items:</h2>
              <ul className="space-y-2">
                {Array.from(songs).map(([artist, title], index) => (
                  <li key={index} className="text-emerald-900">{index}. {artist}, {title}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
        {!accessToken && <Login />}
        {accessToken &&
          <div>Authenticated! Ready to create playlists.</div>}

        {<CreatePlaylist songs={songs} playlistName={userPrompt}/>}
      </div>
    </div>
  );
};