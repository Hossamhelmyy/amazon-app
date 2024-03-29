import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	navbar: {
		backgroundColor: '#203040',
		'& a': {
			color: '#ffffff',
			marginLeft: 10,
		},
	},
	brand: {
		fontWeight: 'bold',
		fontSize: '1.5rem',

		cursor: 'pointer',

		'&:hover': {
			textDecoration: 'none',
		},
	},
	back: {
		cursor: 'pointer',
	},
	grow: {
		flexGrow: 1,
	},
	main: {
		minHeight: '80vh',
	},
	footer: {
		marginTop: 26,
		textAlign: 'center',
		fontWeight: 'bolder',
	},
	section: {
		marginTop: 10,
		marginBottom: 10,
	},
	form: {
		width: '100%',
		maxWidth: 800,
		margin: '0 auto',
	},
	navbarButton: {
		color: '#ffffff',
		textTransform: 'initial',
		cursor: 'pointer',
		fontSize: '16px',
	},
	transparentBackgroud: {
		backgroundColor: 'transparent',
	},
	error: {
		color: '#f04040',
	},
	fullWidth: {
		width: '100%',
	},
	reviewForm: {
		maxWidth: 800,
		width: '100%',
	},
	reviewItem: {
		marginRight: '1rem',
		borderRight: '1px #808080 solid',
		paddingRight: '1rem',
	},
	toolbar: {
		justifyContent: 'space-between',
	},
	menuButton: { padding: 0 },
	mt1: { marginTop: '1rem' },
	// search
	searchSection: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	searchForm: {
		border: '1px solid #ffffff',
		backgroundColor: '#ffffff',
		borderRadius: 5,
	},
	searchInput: {
		paddingLeft: 5,
		color: '#000000',
		'& ::placeholder': {
			color: '#606060',
		},
	},
	iconButton: {
		backgroundColor: '#f8c040',
		padding: 5,
		borderRadius: '0 5px 5px 0',
		'& span': {
			color: '#000000',
		},
		'&:hover': {
			backgroundColor: '#e4bb5b',
		},
	},
	sort: {
		marginRight: 5,
	},

	fullContainer: { height: '100vh' },
	mapInputBox: {
		position: 'absolute',
		display: 'flex',
		left: 0,
		right: 0,
		margin: '10px auto',
		width: 300,
		height: 40,
		'& input': {
			width: 250,
		},
	},
	flex: {
		display: 'flex',
	},
	padding: {
		paddingLeft: '10px',
	},
}));
export default useStyles;
