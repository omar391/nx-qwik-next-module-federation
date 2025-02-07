import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { RemoteMfe } from '../components/remote-mfe/remote-mfe';


export default component$(() => {
	return (
		<main>
			<h1>
				"shell" works! <span class="lightning">⚡️</span>
			</h1>
			<a class="mindblow" href="/about/">Navigate to /about</a>

			 
				<RemoteMfe remote="remote1" /> 
			 
				<RemoteMfe remote="remote2" /> 
			
		</main>
	);
});

export const head: DocumentHead = {
	title: 'shell',
};
