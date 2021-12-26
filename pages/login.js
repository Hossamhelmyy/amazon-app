import {
	List,
	ListItem,
	Typography,
	TextField,
	Button,
	Link,
} from '@material-ui/core';
import NextLink from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import useStyles from '../utlites/style';
import { useState, useEffect } from 'react';
import { addUser } from '../utlites/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { firebase } from '../utlites/firebase';
import swal from 'sweetalert';

export default function Login() {
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const classes = useStyles();
	const dispatch = useDispatch();
	const router = useRouter();
	const { redirect } = router.query; // login?redirect=/shipping

	const { userInfo } = useSelector((state) => state);
	useEffect(() => {
		if (userInfo) {
			router.push('/');
		}
	}, []);
	const signIn = () => {
		firebase
			.auth()
			.signInWithEmailAndPassword(emailAddress, password)
			.then((userCredential) => {
				// Signed in
				let user = userCredential.user;
				// ...
				// console.log(user);
				dispatch(addUser(user.displayName));
				Cookies.set(
					'user',
					JSON.stringify(user.displayName),
				);
				swal({
					title: 'Good job!',
					text: 'You Logged in!',
					icon: 'success',
					button: 'Aww yiss!',
				});
				router.push(redirect || '/');
			})
			.catch((err) => {
				if (err) {
					swal({
						title: 'Erorr!',
						text: "Passwords don't match",
						icon: 'warning',
						buttons: 'Try Again',
						dangerMode: true,
					});
				}
			});
	};

	const signInHundler = (e) => {
		e.preventDefault();
		signIn();
	};

	return (
		<Layout title='Login'>
			<form className={classes.form}>
				<Typography component='h1' variant='h1'>
					Login
				</Typography>
				<List>
					<ListItem>
						<TextField
							variant='outlined'
							fullWidth
							id='email'
							label='Email'
							value={emailAddress}
							onChange={({ target }) =>
								setEmailAddress(target.value)
							}
							inputProps={{ type: 'email' }}></TextField>
					</ListItem>
					<ListItem>
						<TextField
							variant='outlined'
							fullWidth
							id='password'
							label='Password'
							value={password}
							onChange={({ target }) =>
								setPassword(target.value)
							}
							inputProps={{ type: 'password' }}></TextField>
					</ListItem>
					<ListItem>
						<Button
							variant='contained'
							type='submit'
							fullWidth
							color='primary'
							onClick={signInHundler}>
							Login
						</Button>
					</ListItem>
					<ListItem>
						Don't have an account? &nbsp;
						<NextLink href='/register' passHref>
							<Link>Register</Link>
						</NextLink>
					</ListItem>
				</List>
			</form>
		</Layout>
	);
}
