import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckourWizard';
import useStyles from '../utlites/style';

import {
	Button,
	FormControl,
	FormControlLabel,
	List,
	ListItem,
	Radio,
	RadioGroup,
	Typography,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { savePaymentMethod } from '../utlites/store/store';
import swal from 'sweetalert';

export default function Payment() {
	const classes = useStyles();
	const router = useRouter();
	const dispatch = useDispatch();
	const [paymentMethod, setPaymentMethod] = useState('');
	const { shippingAddress } = useSelector((state) => state);
	useEffect(() => {
		if (!shippingAddress.address) {
			router.push('/shipping');
		} else {
			setPaymentMethod(Cookies.get('paymentMethod') || '');
		}
	}, []);
	const submitHandler = (e) => {
		e.preventDefault();
		if (!paymentMethod) {
			swal({
				text: 'Payment method is required',
				icon: 'warning',
				buttons: 'Try Again',
				dangerMode: true,
			});
		} else {
			dispatch(savePaymentMethod(paymentMethod));
			Cookies.set(
				'paymentMethod',
				JSON.stringify(paymentMethod),
			);
			router.push('/placeorder');
		}
	};
	return (
		<Layout title='Payment Method'>
			<CheckoutWizard activeStep={2}></CheckoutWizard>
			<form
				className={classes.form}
				onSubmit={submitHandler}>
				<Typography component='h1' variant='h1'>
					Payment Method
				</Typography>
				<List>
					<ListItem>
						<FormControl component='fieldset'>
							<RadioGroup
								aria-label='Payment Method'
								name='paymentMethod'
								value={paymentMethod}
								onChange={(e) =>
									setPaymentMethod(e.target.value)
								}>
								<FormControlLabel
									label='PayPal'
									value='PayPal'
									control={<Radio />}></FormControlLabel>
								<FormControlLabel
									label='Stripe'
									value='Stripe'
									control={<Radio />}></FormControlLabel>
								<FormControlLabel
									label='Cash'
									value='Cash'
									control={<Radio />}></FormControlLabel>
							</RadioGroup>
						</FormControl>
					</ListItem>
					<ListItem>
						<Button
							fullWidth
							type='submit'
							variant='contained'
							color='primary'>
							Continue
						</Button>
					</ListItem>
					<ListItem>
						<Button
							fullWidth
							type='button'
							variant='contained'
							onClick={() => router.push('/shipping')}>
							Back
						</Button>
					</ListItem>
				</List>
			</form>
		</Layout>
	);
}
