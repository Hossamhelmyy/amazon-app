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
import { useState } from 'react';
import { firebase } from '../utlites/firebase';
import { Controller, useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { useRouter } from 'next/router';

function register() {
	// const [emailAddress, setEmailAddress] = useState('');
	// const [name, setName] = useState('');
	// const [password, setPassword] = useState('');
	// const [confirmPassword, setConfirmPassword] =
	// 	useState('');
	// const [invalid, setInvalid] = useState(false);
	// const [errorMessage, setErrorMessage] = useState('');
	const router = useRouter();
	const classes = useStyles();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const signUpHundler = ({
		name,
		email,
		password,
		confirmPassword,
	}) => {
		if (password !== confirmPassword) {
			swal({
				title: 'Erorr!',
				text: "Passwords don't match",
				icon: 'warning',
				buttons: 'Try Again',
				dangerMode: true,
			});
			return;
		}
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				const user = result.user;
				user.updateProfile({
					displayName: name,
				});

				swal({
					title: 'Great!',
					text: `you signed up successfuly login now`,
					icon: 'success',
					buttons: 'OK',
					dangerMode: false,
				});
				router.push('/login');
				console.log(user);
			})
			.catch((error) => {
				swal({
					title: 'Erorr!',
					text: `${error.message}`,
					icon: 'warning',
					buttons: 'Try Again',
					dangerMode: true,
				});
				// setEmailAddress('');
				// setPassword('');
				// setName('');
				// setConfirmPassword('');
			});
	};
	return (
		<Layout title='Sign Up'>
			<form
				className={classes.form}
				onSubmit={handleSubmit(signUpHundler)}>
				<Typography component='h1' variant='h1'>
					Sign Up
				</Typography>
				<List>
					<ListItem>
						<Controller
							name='name'
							control={control}
							defaultValue=''
							rules={{
								required: true,
								minLength: 2,
							}}
							render={({ field }) => (
								<TextField
									variant='outlined'
									fullWidth
									id='name'
									label='Name'
									inputProps={{ type: 'name' }}
									error={Boolean(errors.name)}
									helperText={
										errors.name
											? errors.name.type === 'minLength'
												? 'Name length is more than 1'
												: 'Name is required'
											: ''
									}
									{...field}></TextField>
							)}></Controller>
					</ListItem>
					<ListItem>
						<Controller
							name='email'
							control={control}
							defaultValue=''
							rules={{
								required: true,
								pattern:
									/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
							}}
							render={({ field }) => (
								<TextField
									variant='outlined'
									fullWidth
									id='email'
									label='Email'
									inputProps={{ type: 'email' }}
									error={Boolean(errors.email)}
									helperText={
										errors.email
											? errors.email.type === 'pattern'
												? 'Email is not valid'
												: 'Email is required'
											: ''
									}
									{...field}></TextField>
							)}></Controller>
					</ListItem>
					<ListItem>
						<Controller
							name='password'
							control={control}
							defaultValue=''
							rules={{
								required: true,
								minLength: 8,
							}}
							render={({ field }) => (
								<TextField
									variant='outlined'
									fullWidth
									id='password'
									label='Password'
									inputProps={{ type: 'password' }}
									error={Boolean(errors.password)}
									helperText={
										errors.password
											? errors.password.type === 'minLength'
												? 'Password length is more than 5'
												: 'Password is required'
											: ''
									}
									{...field}></TextField>
							)}></Controller>
					</ListItem>
					<ListItem>
						<Controller
							name='confirmPassword'
							control={control}
							defaultValue=''
							rules={{
								required: true,
								minLength: 6,
							}}
							render={({ field }) => (
								<TextField
									variant='outlined'
									fullWidth
									id='confirmPassword'
									label='Confirm Password'
									inputProps={{ type: 'password' }}
									error={Boolean(errors.confirmPassword)}
									helperText={
										errors.confirmPassword
											? errors.confirmPassword.type ===
											  'minLength'
												? 'Confirm Password length is more than 5'
												: 'Confirm  Password is required'
											: ''
									}
									{...field}></TextField>
							)}></Controller>
					</ListItem>
					<ListItem>
						<Button
							variant='contained'
							type='submit'
							fullWidth
							color='primary'>
							Sign Up
						</Button>
					</ListItem>
					{/* {invalid && (
						<p
							style={{
								color: 'red',
								marginTop: '5px',
								marginLeft: '22px',
								fontWeight: 'bolder',
								display: 'block',
								fontSize: '17px',
							}}>
							{errorMessage}
						</p>
					)} */}
					<ListItem>
						Do you already have an account? &nbsp;
						<NextLink href='/login' passHref>
							<Link>Login</Link>
						</NextLink>
					</ListItem>
				</List>
			</form>
		</Layout>
	);
}

export default register;
