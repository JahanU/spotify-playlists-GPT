import { hydrate, prerender as ssr } from 'preact-iso';
import Home from './home';

export function App() {
	return (
		<div>
				<h2>SpotifyGPT</h2>
				<Home></Home>
		</div>
	);
}


if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
