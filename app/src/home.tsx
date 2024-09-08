import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [items, setItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // This is where you'd typically make an API call to get related items
    // For demonstration, we'll just generate some dummy items
    const dummyItems = Array.from({ length: 10 }, (_, i) => `Related item ${i + 1} to "${prompt}"`);
    setItems(dummyItems);
  };

  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-emerald-800">Spotify Playlist GPT</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <Input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt"
              className="flex-grow bg-amber-50 border-emerald-600 text-emerald-900 placeholder-emerald-700"
            />
            <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-amber-50">
              Generate
            </Button>
          </div>
        </form>
        {items.length > 0 && (
          <Card className="bg-amber-50 border-emerald-600">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4 text-emerald-800">Related Items:</h2>
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <li key={index} className="text-emerald-900">{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};