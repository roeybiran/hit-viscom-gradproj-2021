import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

interface CardProps {
	slug: string;
	image: {
		url: string;
		blurDataUrl: string;
	};
	alt: string;
	projectName: string;
	studentName: string;
}

export default function ProjectCard({
	slug,
	image,
	projectName,
	studentName,
	alt,
}: CardProps) {
	return (
		<Wrapper>
			<div className="image-container">
				<Image
					src={image.url}
					layout="fill"
					objectFit="cover"
					alt={alt}
					placeholder="blur"
					blurDataURL={image.blurDataUrl}
				/>
			</div>
			<div className="project-label">
				<Link href={slug}>
					<a>{studentName}</a>
				</Link>
				<p>{projectName}</p>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	background-color: var(--stdblue);
	position: relative;

	&:hover {
		box-shadow: 0 0 0 0.25rem black;
	}

	a {
		font-size: var(--s1);
		font-weight: 700;
		text-decoration: none;
		color: unset;
	}

	a:focus {
		text-decoration: underline;
		outline-color: white;
	}

	&:focus-within {
		box-shadow: 0 0 0 0.25rem black;
		outline: 2px solid transparent;
	}

	&:focus-within a:focus {
		text-decoration: none;
	}

	a::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	.image-container {
		position: relative;
		min-inline-size: 250px;
		min-block-size: 250px;
	}

	.project-label {
		color: var(--stdwhite);
		padding: var(--s0);
		font-size: var(--s0);
	}
`;
