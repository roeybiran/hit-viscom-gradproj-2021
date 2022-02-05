import 'normalize.css';
import Footer from '../SiteFooter';
import Header from '../SiteHeader';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/prefers-reduced-motion.css';
import '../styles/sr-only.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Header />
			<main>
				<Component {...pageProps} />
			</main>
			<Footer list={[]} />
		</>
	);
}
export default MyApp;

{
	/*
			<Footer
				list={projects.map(({ student, slug }) => ({
					first: student.firstName,
					last: student.lastName,
					slug: slug,
				}))}
			/>
			*/
}
