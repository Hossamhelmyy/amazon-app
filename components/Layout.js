import React, { Fragment } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
	AppBar,
	Toolbar,
	Typography,
	Container,
	Link,
	MuiThemeProvider,
	createTheme,
	CssBaseline,
	Switch,
	FormControlLabel,
} from '@material-ui/core';
import NextLink from 'next/link';
import {
	changeThemeToDark,
	changeThemeToLight,
} from '../utlites/store/actions';
import useStyles from '../utlites/style';
import { DarkOn, DarkOff } from '../utlites/store/store';
function Layout({
	children,
	title = 'AMAZON',
	description,
}) {
	const { darkMode } = useSelector((state) => state);

	const dispatch = useDispatch();
	const classes = useStyles();
	const theme = createTheme({
		typography: {
			h1: {
				fontSize: '1.6rem',
				fontWeight: 400,
				margin: '1rem 0',
			},
			h2: {
				fontSize: '1.4rem',
				fontWeight: 400,
				margin: '1rem 0',
			},
		},
		palette: {
			type: darkMode ? 'dark' : 'light',
			primary: {
				main: '#f0c000',
			},
			secondary: {
				main: '#208080',
			},
		},
	});

	const onModeChange = () => {
		if (darkMode) {
			dispatch(DarkOff());
		} else {
			dispatch(DarkOn());
		}
	};

	return (
		<Fragment>
			<Head>
				<title> {title}</title>
				<meta name='description' content={description} />
			</Head>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar
					position='static'
					className={classes.navbar}>
					<Toolbar>
						<NextLink href='/'>
							<Link>
								<Typography className={classes.brand}>
									Amazon
								</Typography>
							</Link>
						</NextLink>
						<div className={classes.grow}></div>
						<div>
							<FormControlLabel
								control={
									<Switch
										checked={darkMode}
										onChange={onModeChange}
									/>
								}
							/>
							<NextLink href='/'>
								<Link>Cart</Link>
							</NextLink>
							<NextLink href='/'>
								<Link>Login</Link>
							</NextLink>
						</div>
					</Toolbar>
				</AppBar>
				<Container className={classes.main}>
					{children}
				</Container>
				<footer>
					<Typography className={classes.footer}>
						All Rights reserved to HossamHelmy
					</Typography>
				</footer>
			</MuiThemeProvider>
		</Fragment>
	);
}

export default Layout;
