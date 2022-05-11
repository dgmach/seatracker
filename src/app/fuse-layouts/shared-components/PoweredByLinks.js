import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { motion } from 'framer-motion';

function PoweredByLinks() {
	const container = {
		show: {
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	const item = {
		hidden: { opacity: 0, scale: 0.6 },
		show: { opacity: 1, scale: 1 }
	};

	return (
		<motion.div variants={container} initial="hidden" animate="show" className="flex items-center">
			<Tooltip title="React" placement="top">
				<IconButton
					className="w-48 h-48 px-4"
					component={motion.a}
					variants={item}
					href="https://reactjs.org/"
					target="_blank"
					rel="noreferrer noopener"
					role="button"
				>
					<img src="assets/images/logos/logo.png" alt="react" width="32" />
				</IconButton>
			</Tooltip>
			<Tooltip variants={item} title="React Redux" placement="top">
				<IconButton
					className="w-48 h-48 px-4"
					component={motion.a}
					variants={item}
					href="https://github.com/reactjs/react-redux"
					target="_blank"
					rel="noreferrer noopener"
					role="button"
				>
					<img src="assets/images/logos/logo.png" alt="redux" width="32" />
				</IconButton>
			</Tooltip>
			<Tooltip variants={item} title="Material UI" placement="top">
				<IconButton
					className="w-48 h-48 px-4"
					component={motion.a}
					variants={item}
					href="https://material-ui-next.com/"
					target="_blank"
					rel="noreferrer noopener"
					role="button"
				>
					<img src="assets/images/logos/logo.png" alt="material ui" width="32" />
				</IconButton>
			</Tooltip>
			<Tooltip variants={item} title="Tailwind" placement="top">
				<IconButton
					className="w-48 h-48 px-4"
					component={motion.a}
					variants={item}
					href="https://tailwindcss.com"
					target="_blank"
					rel="noreferrer noopener"
					role="button"
				>
					<span
						dangerouslySetInnerHTML={{
							__html: `
                                    <svg style="height: 0; width: 0; position: absolute; visibility: hidden;">
                                      <defs>
                                        <linearGradient x1="0%" y1="0%" y2="100%" id="logoGradient">
                                          <stop stop-color="#2383AE" offset="0%"></stop>
                                          <stop stop-color="#6DD7B9" offset="100%"></stop>
                                        </linearGradient>
                                      </defs>
                                    </svg>
                                    <svg class="w-48 h-48 block" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 11.1C15.3 3.9 19.8.3 27 .3c10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 27.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" transform="translate(5 16)" fill="url(#logoGradient)" fill-rule="evenodd"></path></svg>
                                    `
						}}
					/>
				</IconButton>
			</Tooltip>
		</motion.div>
	);
}

export default PoweredByLinks;
