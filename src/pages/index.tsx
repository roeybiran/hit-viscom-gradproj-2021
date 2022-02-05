import {
	Center,
	Grid as ul,
	Stack,
} from '@roeybiran/every-layout-styled-components';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import airtableClient, {
	AirtableImageAttachment,
} from 'src/airtable-api/airtableClient';
import FIELDS from 'src/airtable-api/fields';
import styled from 'styled-components';
import ProjectCard from '../home-page/ProjectCard';
import SearchBar from '../home-page/SearchBar';
import makeFeaturedImage from '../lib/makeFeaturedImage';
import STRINGS from '../lib/strings';

export default function Home({
	projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const initialProjects = projects.map((x) => ({ ...x, show: true }));
	const [currentProjects, setCurrentProjects] = useState(initialProjects);

	const handleChange = (s: string) => {
		const needle = s.toLowerCase().replace(/\s/g, '');
		if (!needle) {
			setCurrentProjects(initialProjects);
			return;
		}
		const filtered = initialProjects.map((p) => ({
			...p,
			show: (p.studentName + p.projectName).toLowerCase().includes(needle),
		}));
		setCurrentProjects(filtered);
	};

	return (
		<Wrapper>
			<Head>
				<title>{STRINGS.heads.home.title}</title>
				<meta name="description" content={STRINGS.heads.home.description} />
				<meta property="og:title" content={STRINGS.heads.home.title} />
				<meta property="og:image" content={'https://i.imgur.com/Su504JD.jpg'} />
				<meta
					property="og:description"
					content={STRINGS.heads.home.description}
				/>
				<meta property="twitter:title" content={STRINGS.heads.home.title} />
				<meta
					property="twitter:image"
					content={'https://i.imgur.com/Su504JD.jpg'}
				/>
				<meta
					property="twitter:description"
					content={STRINGS.heads.home.description}
				/>
			</Head>
			<header className="sr-only">
				<h1>{STRINGS.suffix}</h1>
			</header>
			<Center max="none" gutters="var(--s1)">
				<Stack>
					<SearchBar onInput={handleChange} />
					<ul
						className="grid"
						aria-live="polite"
						data-empty={currentProjects.every((x) => !x.show)}
					>
						{currentProjects.map((p) => (
							<li key={p.slug} data-show={p.show}>
								<ProjectCard
									projectName={p.projectName}
									studentName={p.studentName}
									slug={p.slug}
									alt={p.alt}
									image={{
										blurDataUrl: p.featuredImage.blurDataUrl,
										url: p.featuredImage.url,
									}}
								/>
							</li>
						))}
					</ul>
					<Center className="no-results" intrinsic>
						<p>
							{STRINGS.noResults} <span aria-hidden>¯\_(ツ)_/¯</span>
						</p>
					</Center>
				</Stack>
			</Center>
		</Wrapper>
	);
}

export const getStaticProps = async () => {
	const results = await airtableClient
		.select({
			fields: [
				FIELDS.fullNameHe,
				FIELDS.projectNameHe,
				FIELDS.featuredImage,
				FIELDS.slug,
			],
			sort: [{ field: FIELDS.lastNameHe, direction: 'asc' }],
		})
		.firstPage();

	const projects = await Promise.all(
		results
			.filter(
				({ fields }) =>
					Object.keys(fields).length &&
					fields[FIELDS.projectNameHe] &&
					fields[FIELDS.fullNameHe]
			)
			.map(async ({ fields }) => {
				const studentName = fields[FIELDS.fullNameHe] as string;
				const projectName = fields[FIELDS.projectNameHe] as string;
				const featuredImage = await makeFeaturedImage(
					(fields[FIELDS.featuredImage] as AirtableImageAttachment[]) ?? []
				);
				const alt = `${studentName}: ${projectName}`;
				const slug = String(fields[FIELDS.slug]);
				return {
					slug,
					studentName,
					projectName,
					featuredImage,
					alt,
				};
			})
	);

	return {
		props: {
			projects,
		},
	};
};

const Wrapper = styled.div`
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr));
		gap: var(--s0);
	}

	.no-results {
		font-size: var(--s3);
		color: var(--stdblue);
	}

	.grid > li[data-show='false'] {
		display: none;
	}

	.no-results {
		display: none;
	}

	[data-empty='true'] + .no-results {
		display: block;
	}
`;
