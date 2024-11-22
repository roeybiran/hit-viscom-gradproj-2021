import strings from './lib/strings';
import { Center, Stack } from '@roeybiran/every-layout-styled-components';
import Image from 'next/image';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import hitLogo from '/public/hitLogo.svg';

type Props = {
	list: { name: string; slug: string }[];
};

export default function Footer(props: Props) {
	return (
		<Wrapper>
			<Stack>
				<Divider />
				<div className="scroller">
					<NameList list={props.list} />
					<NameList list={props.list} ariaHidden />
				</div>
				<Divider />
				<div className="center-wrapper">
					<Center intrinsic max="none" gutters="var(--s1)">
						<a href="https://www.hit.ac.il/" className="hit-link">
							<div>
								<Image
									aria-hidden
									src={hitLogo}
									width={30}
									height={30}
									alt={strings.hitFullName}
								/>
							</div>
							<div>
								<p className="hit-full-name">{strings.hitFullName}</p>
								<address>{strings.hitAddress}</address>
							</div>
						</a>
						<p className="colophon">
							{strings.credits.dev}:{' '}
							<Link href={strings.credits.mySlug}>{strings.credits.me}</Link>
						</p>
						<p className="colophon" dir="ltr">
							Built with <a href="https://nextjs.org">Next.js</a> (
							<a href="https://github.com/roeybiran/hitviscom-graduates-2021">
								Source
							</a>
							).
						</p>
					</Center>
				</div>
			</Stack>
		</Wrapper>
	);
}

const NameList = (props: Props & { ariaHidden?: boolean }) => (
	<ul aria-hidden={props.ariaHidden}>
		{props.list.map(({ name, slug }) => (
			<li key={slug}>
				<Link href={'/' + slug} tabIndex={-1}>{name}</Link>
			</li>
		))}
	</ul>
);

const Divider = styled.div`
	border-bottom: 1px solid currentcolor;
`;

const scrolling = keyframes`
 to {
   transform: translateX(0%)
 }
`;

const Wrapper = styled.div`
	margin-block-start: var(--s2);
	margin-block-end: var(--s0);
	text-decoration: none;

	.hit-full-name {
		font-weight: 700;
	}

	.hit-link {
		display: flex;
		gap: var(--s-1);
	}

	.center-wrapper {
		font-size: var(--s-1);
	}

	.colophon a {
		text-decoration: underline;
	}

	/* SCROLLER */

	.scroller {
		overflow: hidden;
		position: relative;
		display: flex;
	}

	.scroller ul {
		display: flex;
		transform: translateX(100%);
		will-change: transform;
		animation: 120s linear 0s infinite normal none running ${scrolling};
	}

	.scroller:hover ul {
		animation-play-state: paused;
	}

	.scroller li {
		white-space: nowrap;
	}

	.scroller li::after {
		content: ' ·\\00a0';
	}

	.scroller a:hover {
		text-decoration: underline;
	}

	@media (prefers-reduced-motion: reduce) {
		.scroller ul:nth-child(2) {
			display: none;
		}

		.scroller {
			overflow-x: auto;
		}

		.scroller ul {
			transform: translateX(0);
		}
	}
`;
