import Layout from '../components/Layout';
import { Grid } from '@material-ui/core';
import {
	Button,
	CardActionArea,
	CardMedia,
	Card,
	CardContent,
	Typography,
	CardActions,
} from '@material-ui/core';
import NextLink from 'next/link';
import data from '../utlites/data';
import { addProductToCart } from '../utlites/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import { db } from '../utlites/firebase';
import { useState, useEffect } from 'react';

export default function Home() {
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state) => state);
	const router = useRouter();
	const [myArray, setMyArray] = useState([]);

	useEffect(() => {
		db.collection('products')
			.get()
			.then((snapshot) => {
				snapshot.docs.forEach((item) => {
					const itemm = item.data();
					if (myArray.length < 7) {
						setMyArray((oldArray) => [...oldArray, itemm]);
					}
				});
			});
	}, []);

	const addProductToCartt = (product) => {
		const exist = cartItems.find(
			(item) => item.name === product.name,
		);
		if (
			product.countInStock === 0 ||
			(exist && exist.countInStock <= exist.quantity)
		) {
			// alert('this products is finished from the stock');
			swal({
				text: 'this product is finished from the stock',
				icon: 'warning',
				buttons: 'OK',
				dangerMode: true,
			});
		} else {
			dispatch(
				addProductToCart({
					product: product,
					value: false,
				}),
			);

			router.push('/cart');
		}
	};
	// let docRef = db
	// 	.collection('products')
	// 	.doc('Dxwv1GMzpEJyoJYdwr0w');

	// docRef
	// 	.get()
	// 	.then((doc) => {
	// 		if (doc.exists) {
	// 			console.log('Document data:', doc.id);
	// 		} else {
	// 			// doc.data() will be undefined in this case
	// 			console.log('No such document!');
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		console.log('Error getting document:', error);
	// 	});
	return (
		<Layout>
			<h1>Products</h1>
			<Grid container spacing={3}>
				{myArray.map((product) => (
					<Grid
						key={product.name}
						item
						md={4}
						sm={6}
						xs={12}>
						<Card>
							<NextLink
								href={`product/${product.slug}`}
								passHref>
								<CardActionArea>
									<CardMedia
										component='img'
										image={product.image}
										title={product.name}
									/>
									<CardContent>
										<Typography>{product.name}</Typography>
									</CardContent>
								</CardActionArea>
							</NextLink>
							<CardActions>
								<Typography>${product.price}</Typography>
								<Button
									size='small'
									color='primary'
									onClick={() =>
										addProductToCartt(product)
									}>
									Add to cart
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Layout>
	);
}
