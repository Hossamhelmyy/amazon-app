import React, { Fragment, useState } from 'react';
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
	Badge,
	Button,
	Menu,
	MenuItem,
} from '@material-ui/core';
import NextLink from 'next/link';
import useStyles from '../utlites/style';
import {
	DarkOn,
	DarkOff,
	logout,
} from '../utlites/store/store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
function Layout({
	children,
	title = 'AMAZON',
	description,
}) {
	const { darkMode, cartItems, userInfo } = useSelector(
		(state) => state,
	);
	const router = useRouter();

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
		Cookies.set('mode', JSON.stringify(!darkMode));
		if (darkMode) {
			dispatch(DarkOff());
		} else {
			dispatch(DarkOn());
		}
	};
	const [anchorEl, setAnchorEl] = useState(null);
	const loginClickHandler = (e) => {
		setAnchorEl(e.currentTarget);
	};
	const loginMenuCloseHandler = () => {
		setAnchorEl(null);
	};
	const logoutClickHandler = () => {
		setAnchorEl(null);
		dispatch(logout());
		Cookies.remove('user');
		Cookies.remove('cartItems');
		router.push('/');
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
							<div
								className='toggle-switch'
								onClick={onModeChange}>
								<input
									type='checkbox'
									className='toggle-switch-checkbox'
									name='daily'
									checked={darkMode ? true : false}
								/>
								<label className='toggle-switch-label'>
									<span className='toggle-switch-inner' />
									<span className='toggle-switch-switch' />
								</label>
							</div>
							<NextLink href='/cart'>
								<Link
									style={{ marginLeft: '14px' }}
									className={classes.navbarButton}>
									{cartItems.length > 0 ? (
										<Badge
											color='secondary'
											badgeContent={cartItems.length}>
											Cart
										</Badge>
									) : (
										'Cart'
									)}
								</Link>
							</NextLink>
							{userInfo ? (
								<>
									<Button
										style={{ marginLeft: '12px' }}
										aria-controls='simple-menu'
										aria-haspopup='true'
										onClick={loginClickHandler}
										className={classes.navbarButton}>
										{userInfo}
									</Button>
									<Menu
										id='simple-menu'
										anchorEl={anchorEl}
										keepMounted
										open={Boolean(anchorEl)}
										onClose={loginMenuCloseHandler}>
										<MenuItem
											onClick={loginMenuCloseHandler}>
											Profile
										</MenuItem>
										<MenuItem
											onClick={loginMenuCloseHandler}>
											My account
										</MenuItem>
										<MenuItem onClick={logoutClickHandler}>
											Logout
										</MenuItem>
									</Menu>
								</>
							) : (
								<NextLink href='/login'>
									<Link
										style={{ marginLeft: '14px' }}
										className={classes.navbarButton}>
										Login
									</Link>
								</NextLink>
							)}
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
