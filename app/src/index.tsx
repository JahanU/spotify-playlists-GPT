import { hydrate, prerender as ssr } from 'preact-iso';
import Footer from './components/footer';
import { Home } from './home';
import "./index.css";

export function App() {
	return (
		<div>		
			<Home></Home>
			<Footer></Footer>
		</div>
	);
}


if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
