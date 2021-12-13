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

export default function Home() {
	const addProductToCart = () => {
		console.log('');
	};
	return (
		<Layout>
			<h1>Products</h1>
			<Grid container spacing={3}>
				{data.products.map((product) => (
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
									onClick={addProductToCart}>
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
