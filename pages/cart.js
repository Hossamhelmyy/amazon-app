import NextLink from 'next/link';
import Image from 'next/image';
import {
	Box,
	Grid,
	TableContainer,
	Table,
	Typography,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Link,
	Select,
	MenuItem,
	Button,
	Card,
	List,
	ListItem,
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import {
	addProductToCart,
	removeProductFormCart,
} from '../utlites/store/store';
import useStyles from '../utlites/style';

function cart() {
	const classes = useStyles();
	const router = useRouter();

	const { cartItems } = useSelector((state) => state);
	const dispatch = useDispatch();

	const onChangeValue = (item, value) => {
		dispatch(
			addProductToCart({ product: item, value: value }),
			console.log(item, value),
		);
	};
	const checkoutHandler = () => {
		router.push('/shipping');
	};
	const removeItemHandler = (item) => {
		dispatch(removeProductFormCart(item));
	};
	return (
		<Layout title='Shopping Cart'>
			<Typography component='h1' variant='h1'>
				Shopping Cart
			</Typography>
			{cartItems.length === 0 ? (
				<div>
					Cart is empty
					<NextLink href='/' passHref>
						<Link className={classes.padding}>
							Go shopping
						</Link>
					</NextLink>
				</div>
			) : (
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={1}>
						<Grid item md={9} xs={12}>
							<TableContainer>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>Image</TableCell>
											<TableCell>Name</TableCell>
											<TableCell align='right'>
												Quantity
											</TableCell>
											<TableCell align='right'>
												Price
											</TableCell>
											<TableCell align='right'>
												Action
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{cartItems.map((item) => (
											<TableRow key={item.name}>
												<TableCell>
													<NextLink
														href={`/product/${item.slug}`}
														passHref>
														<Link>
															<Image
																src={item.image}
																alt={item.name}
																width={50}
																height={50}></Image>
														</Link>
													</NextLink>
												</TableCell>

												<TableCell>
													<NextLink
														href={`/product/${item.slug}`}
														passHref>
														<Link>
															<Typography>
																{item.name}
															</Typography>
														</Link>
													</NextLink>
												</TableCell>
												<TableCell align='right'>
													<Select
														value={item.quantity}
														onChange={(e) =>
															onChangeValue(
																item,
																e.target.value,
															)
														}>
														{[
															...Array(
																item.countInStock,
															).keys(),
														].map((x) => (
															<MenuItem
																key={x + 1}
																value={x + 1}>
																{x + 1}
															</MenuItem>
														))}
													</Select>
												</TableCell>
												<TableCell align='right'>
													${item.price}
												</TableCell>
												<TableCell align='right'>
													<Button
														variant='contained'
														color='secondary'
														onClick={() =>
															removeItemHandler(item)
														}>
														x
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>

						<Grid item md={2} xs={12}>
							<Card>
								<List>
									<ListItem>
										<Typography variant='h2'>
											Subtotal (
											{cartItems.reduce(
												(a, c) => a + c.quantity,
												0,
											)}{' '}
											items) : $
											{cartItems.reduce(
												(a, c) => a + c.quantity * c.price,
												0,
											)}
										</Typography>
									</ListItem>
									<ListItem>
										<Button
											variant='contained'
											color='primary'
											onClick={checkoutHandler}
											fullWidth>
											Check Out
										</Button>
									</ListItem>
								</List>
							</Card>
						</Grid>
					</Grid>
				</Box>
			)}
		</Layout>
	);
}

export default dynamic(() => Promise.resolve(cart), {
	ssr: false,
});
