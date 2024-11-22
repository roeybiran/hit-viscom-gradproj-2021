import { Center, Stack } from '@roeybiran/every-layout-styled-components';
import {
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import airtableClient, {
	AirtableImageAttachment,
} from 'src/airtable-api/airtableClient';
import FIELDS from 'src/airtable-api/fields';
import makeOtherImages from 'src/lib/makeOtherImages';
import makeVideos from 'src/lib/makeVideos';
import styled from 'styled-components';
import strings from '../lib/strings';
import { Fragment } from 'react';

export default function ProjectPage({
	studentName,
	projectName,
	summary,
	ogImageSrc,
	social,
	alt,
	images,
	videos,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const title = `${studentName} - ${projectName} | ${strings.suffix}`;
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={summary} />
				<meta property="og:title" content={title} />
				<meta property="og:image" content={ogImageSrc ?? ''} />
				<meta property="og:description" content={summary} />
				<meta property="twitter:title" content={title} />
				<meta property="twitter:image" content={ogImageSrc ?? ''} />
				<meta property="twitter:description" content={summary} />
			</Head>
			<Wrapper>
				<Stack>
					<Center gutters="var(--s0)">
						<Stack>
							<Stack as="header">
								<Link href="/">{strings.back}</Link>
								<div>
									<h1>{studentName}</h1>
									<p>{projectName}</p>
								</div>
							</Stack>
							<p>{summary}</p>
							{social.length ? (
								<dl>
									{social.map((x) => (
										<Fragment key={x.label}>
											<dt>{x.label}</dt>
											<dd>
												<a href={x.address as string}>{x.prettyURL}</a>
											</dd>
										</Fragment>
									))}
								</dl>
							) : null}
						</Stack>
					</Center>
					<Stack recursive>
						<Center max="none" intrinsic>
							{videos.map((vid) => (
								<div key={vid} dangerouslySetInnerHTML={{ __html: vid }} />
							))}
							{images.map((img) => (
								<div key={img.url} className="image-container">
									<Image
										src={img.url}
										alt={alt}
										className="nimg"
										width={img.width}
										height={img.height}
										placeholder="blur"
										style={{ objectFit: 'contain' }}
										blurDataURL={img.blurDataUrl}
									/>
								</div>
							))}
						</Center>
					</Stack>
				</Stack>
			</Wrapper>
		</>
	);
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const projectSlug = encodeURIComponent(params?.project as string);

	console.log(projectSlug);

	const [{ fields: record }] = await airtableClient
		.select({
			fields: [
				FIELDS.fullNameHe,
				FIELDS.projectNameHe,
				FIELDS.projectSummaryHe,
				FIELDS.mail,
				FIELDS.phone,
				FIELDS.portfolioURL,
				FIELDS.instagramURL,
				FIELDS.featuredImage,
				FIELDS.projectURL,
				FIELDS.images,
				FIELDS.videos,
			],
			maxRecords: 1,
			filterByFormula: `{slug} = "${projectSlug}"`,
		})
		.firstPage();

	// format the data
	const studentName = record[FIELDS.fullNameHe] as string;
	const projectName = record[FIELDS.projectNameHe] as string;

	let ogImageSrc: string | null = null;
	const [featuredImage] = (record[FIELDS.featuredImage] ??
		[]) as AirtableImageAttachment[];
	if (featuredImage) {
		ogImageSrc = featuredImage.url;
	}

	const images = await makeOtherImages(
		(record[FIELDS.images] ?? []) as AirtableImageAttachment[]
	);

	const videos = await makeVideos((record[FIELDS.videos] as string) ?? '');

	const social = [
		{
			address: record[FIELDS.projectURL],
			label: strings.projectUrl,
		},
		{ address: `mailto:${record[FIELDS.mail]}`, label: strings.mail },
		{
			address: record[FIELDS.portfolioURL],
			label: strings.portfolio,
		},
		{
			address: record[FIELDS.instagramURL],
			label: strings.instagram,
		},
	]
		.filter((x) => x.address && typeof x.address === 'string')
		.map((x) => {
			const address = (x.address as string)!;
			const prettyURL = (
				address.startsWith('http') ? address : `http://${address}`
			)
				.toLowerCase()
				.replace(/^http(s?):\/\//, '')
				.replace(/^www\./, '')
				.replace(/^mailto:/, '')
				.split('/')
				.filter((x) => x)
				.slice(0, 2)
				.join('/');
			return { ...x, prettyURL };
		});

	return {
		props: {
			studentName,
			projectName,
			summary: record[FIELDS.projectSummaryHe] as string,
			ogImageSrc,
			alt: `${studentName} — ${projectName}`,
			images,
			videos,
			social,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = (
		await airtableClient
			.select({
				fields: [FIELDS.slug, FIELDS.isValid],
			})
			.firstPage()
	)
		.filter((x) => x.fields[FIELDS.isValid])
		.map((x) => ({
			params: {
				project: decodeURIComponent(x.fields[FIELDS.slug] as string),
			},
		}));

	return { paths, fallback: false };
};

const Wrapper = styled.div`
	header a {
		display: block;
		::before {
			content: '${strings.backArrow} ';
		}
	}

	a {
		text-decoration: underline;
	}

	h1,
	dt {
		font-weight: 700;
	}

	dt:not(:first-child) {
		margin-block-start: var(--s0);
	}

	header p {
		font-size: var(--s1);
	}

	.image-container img {
		max-inline-size: 100%;
		max-block-size: 90vh;
	}
`;
