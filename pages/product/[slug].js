import React from 'react';
import { useRouter } from 'next/router';
import data from '../../utlites/data';
import Layout from '../../components/Layout';
import NextLink from 'next/link';
import Image from 'next/image';
import { addProductToCart } from '../../utlites/store/store';
import {
	Grid,
	Link,
	List,
	ListItem,
	Typography,
	Card,
	Button,
} from '@material-ui/core';
import useStyles from '../../utlites/style';
import { useDispatch, useSelector } from 'react-redux';

export default function Slug() {
	const router = useRouter();
	const classes = useStyles();
	const dispatch = useDispatch();
	const { slug } = router.query;
	const { cart } = useSelector((state) => state);

	const product = data.products.find(
		(a) => a.slug === slug,
	);
	console.log(product);
	if (!product) {
		return <div>Product Not Found</div>;
	}
	const addProductToCartt = () => {
		dispatch(addProductToCart(product));
		// console.log(cartItems);
		// console.log(cartItems.length);
	};
	return (
		<Layout
			title={product.name}
			description={product.description}>
			<div className={classes.section}>
				<NextLink href='/'>
					<Link className={classes.back}>
						back to products
					</Link>
				</NextLink>
			</div>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={6}>
					<Image
						src={product.image}
						alt={product.name}
						width={640}
						height={640}
						layout='responsive'></Image>
				</Grid>
				<Grid item md={3} xs={12}>
					<List>
						<ListItem>
							<Typography component='h1' variant='h1'>
								{product.name}
							</Typography>
						</ListItem>
						<ListItem>
							<Typography>
								Category: {product.category}
							</Typography>
						</ListItem>
						<ListItem>
							<Typography>
								Brand: {product.brand}
							</Typography>
						</ListItem>
						<ListItem>
							<Typography>
								Rating: {product.rating} stars (
								{product.numReviews} reviews)
							</Typography>
						</ListItem>
						<ListItem>
							<Typography>
								Description: {product.description}
							</Typography>
						</ListItem>
					</List>
				</Grid>
				<Grid item md={3} xs={12}>
					<Card>
						<List>
							<ListItem>
								<Grid container>
									<Grid item xs={6}>
										<Typography>Price</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography>
											${product.price}
										</Typography>
									</Grid>
								</Grid>
							</ListItem>
							<ListItem>
								<Grid container>
									<Grid item xs={6}>
										<Typography>Status</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography>
											{product.countInStock > 0
												? 'In stock'
												: 'Unavailable'}
										</Typography>
									</Grid>
								</Grid>
							</ListItem>
							<ListItem>
								<Button
									fullWidth
									variant='contained'
									color='primary'
									onClick={addProductToCartt}>
									Add to cart
								</Button>
							</ListItem>
						</List>
					</Card>
				</Grid>
			</Grid>
		</Layout>
	);
}
