import { Button } from '@/components/ui/button';
import { useEffect, useState, memo } from 'react';
import { FilePlus2 } from "lucide-react"; // Icon from lucide-react

const CreatePlaylist = memo(function CreatePlaylist({ songs, playlistName }) {

    console.log(songs, playlistName)
    // State to store the access token and user's Spotify ID
    const [accessToken, setAccessToken] = useState('');
    const [userId, setUserId] = useState('');
    const [trackURIs, setTrackURIs] = useState([]);

    // useEffect hook to fetch the access token and user's profile when the component mounts
    useEffect(() => {
        // Get the access token from localStorage (saved during the authentication step)
        const token = window.localStorage.getItem('spotify_access_token');

        if (token) {
            setAccessToken(token); // Save token to state

            // Fetch the current user's profile to get their Spotify user ID
            fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass the access token in the Authorization header
                },
            })
                .then(response => response.json())
                .then(data => setUserId(data.id)) // Set the userId with the retrieved data
                .catch(err => console.error('Error fetching user profile:', err)); // Handle errors if the request fails
        }
    }, []);

    // Function to search for a song by title and get its URI
    const fetchTrackURI = async (title) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(title)}&type=track&limit=1`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const data = await response.json();
            if (data.tracks.items.length > 0) {
                return data.tracks.items[0].uri; // Return the URI of the first track
            } else {
                console.error(`No track found for title: ${title}`);
                return null;
            }
        } catch (error) {
            console.error('Error searching for track:', error);
            return null;
        }
    };

    // Function to search for all songs in the songTitles array and store their URIs
    const fetchAllTrackURIs = async () => {
        const uris = [];
        for (const title of songs) {
            const uri = await fetchTrackURI(title); // Search for each song and get its URI
            if (uri) uris.push(uri); // Only add URIs that are found
        }
        setTrackURIs(uris); // Save the URIs to state
        return uris;
    };


    // Function to create a new playlist
    const createPlaylist = async () => {
        try {
            // Create the playlist first
            const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: playlistName,
                    public: false,
                }),
            });

            const playlistData = await response.json();
            console.log('Playlist created:', playlistData);

            // Once the playlist is created, add the tracks to the playlist
            const uris = await fetchAllTrackURIs(); // Get the URIs of the songs
            if (uris.length > 0) {
                await fetch(`https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        uris: uris, // Send the track URIs
                    }),
                });
                console.log('Tracks added to playlist');
            } else {
                console.error('No tracks found to add to the playlist.');
            }
        } catch (error) {
            console.error('Error creating playlist or adding tracks:', error);
        }
    };

    return (
        <div>
            <Button onClick={createPlaylist} className="bg-emerald-700 hover:bg-emerald-800 text-amber-50">
                Create Playlist
                <FilePlus2 style={{ paddingLeft: '4px' }} />
            </Button>
        </div>
    );
});

export default CreatePlaylist;
