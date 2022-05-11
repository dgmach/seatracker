import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
// import Typography from '@material-ui/core/Typography';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useRef, useState } from 'react';

import {
	AppBar,
	colors,
	Avatar,
	CssBaseline,
	ThemeProvider,
	Typography,
	Container,
	createMuiTheme,
	Box,
	Grid,
	Button,
	SvgIcon,
	FormControlLabel,
	Checkbox,
	TextField,
	Link,
	Icon
} from '@material-ui/core';

import Particles from './particles/Particles';
import './css/index.css';

// const styles = {
// 	root: {
// 		fontFamily: 'sans-serif',
// 		textAlign: 'center',
// 		height: '100%',
// 		background: '#222',
// 		display: 'flex',
// 		justifyContent: 'center',
// 		alignItems: 'center'
// 	}
// };

const styles = {
	containerMain: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	bottomView: {
		marginLeft: -40,
		width: '100%',
		height: 50,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute', //Here is the trick
		bottom: 0, //Here is the trick,
		zIndex: 99999
	},
	bottomView2: {
		marginLeft: -60,
		width: '100%',
		height: 50,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute', //Here is the trick
		bottom: 0 //Here is the trick
	},
	textStyle: {
		color: '#fff',
		fontSize: 18,
		float: 'right'
	},
	textStyle2: {
		color: '#fff',
		fontSize: 18,
		float: 'right',
		marginLeft: -20
	},

	backgroundImage: {
		position: 'absolute',
		width: 65,
		height: 50,
		marginLeft: '-50px',
		borderRadius: '50%'
	},
	backgroundImage2: {
		width: 40,
		height: 40,
		borderRadius: '50%'
	}
};

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

function Home() {
	const classes = useStyles();
	const filesElement = useRef(null);
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const { form, handleChange, setForm } = useForm({
		clinica: '',
		dentista: '',
		paciente: '',
		material: '',
		dentes: '',
		description: ''
	});

	const resetForm = () => {
		filesElement.current.value = '';
		setForm({
			clinica: '',
			dentista: '',
			paciente: '',
			material: [],
			dentes: '',
			description: ''
		});
	};

	const optionsMaterial = [
		{ value: 'cera', label: 'Cera' },
		{ value: 'zirconia', label: 'Zircônia' },
		{ value: 'dissilicato', label: 'Dissilicato de Lítio' },
		{ value: 'impressao3d', label: 'Impressão 3D' },
		{ value: 'ceramicahibrida', label: ' Cerâmica Híbrida' }
	].map(item => ({
		value: item.value,
		label: item.label
	}));

	function handleMaterialChange(value) {
		form.material = value;
		setForm({ ...form });
	}

	function callInstagram() {
		//window.location.href = 'https://www.instagram.com/mayadentalcenter/';
		alert('clicked here');
	}

	const handleClose = () => {
		setOpen(false);
	};
	const onSubmit = formData => {
		if (filesElement.current.value === '') {
			enqueueSnackbar('É necessario selecionar um arquivo para upload', {
				variant: 'error'
			});
		} else {
			if (formData.material.label) {
				formData.material = formData.material.label;
			} else {
				formData.material = '';
			}
			setLoading(true);
			const dataForm = new FormData();
			/* eslint-disable */
			for (const file of filesElement.current.files) {
				file.form = formData;
				dataForm.append('file', file);
			}

			dataForm.append('form', JSON.stringify(formData));
			dataForm.append('file', formData.material);

			const api = axios.create({
				baseURL: 'http://localhost:3000/',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8;multipart/form-data'
				}
			});

			api.post('/upload/', dataForm, { params: formData }).then(({ data }) => {
				if (data.status === 'OK') {
					// enqueueSnackbar(data.data, {
					// 	variant: 'success'
					// });
					setOpen(true);
					resetForm();
					setLoading(false);
				}
			});
		}
	};

	return (
		<div style={styles.containerMain}>
			<div
				style={{
					width: '100%',
					backgroundColor: 'black'
				}}
			>
				<Particles />
				<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">
						{' '}
						<Box p={1} bgcolor="black" color="white">
							Sucesso!
						</Box>{' '}
					</DialogTitle>
					<DialogContent>
						<DialogContentText>Seus dados foram enviados com sucesso.</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							OK
						</Button>
					</DialogActions>
				</Dialog>
			</div>

			<AppBar position="fixed" style={{ background: 'transparent' }} className="h-full">
				<Toolbar>
					<Grid
						justify="space-around" // Add it here :)
						container
						spacing={100}
					>
						<Grid item>
							<Card style={{ position: 'fixed' }} className="h-auto  mx-auto m-16 md:m-0" square>
								<LoadingOverlay
									active={loading}
									// spinner={<BounceLoader />}
									spinner={true}
									text="Enviando dados, aguarde..."
								>
									<CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
										<Container component="main" maxWidth="xs">
											<CssBaseline />
											<div className={classes.paper}>
												<Typography component="h1" variant="h5">
													<Icon color="action">cloud_upload</Icon>
													Upload
												</Typography>

												<form className={classes.form} style={{ marginTop: 20 }}>
													<Grid container spacing={2}>
														<Grid item xs={12} sm={7}>
															<TextField
																autoComplete="fname"
																variant="outlined"
																fullWidth
																label="Nome Clinica/Laboratório"
																autoFocus
																id="clinica"
																name="clinica"
																value={form.clinica}
																onChange={handleChange}
															/>
														</Grid>
														<Grid item xs={12} sm={5}>
															<TextField
																variant="outlined"
																fullWidth
																id="dentista"
																label="Dentista"
																name="dentista"
																value={form.dentista}
																onChange={handleChange}
																autoComplete="Denstista Responsável"
															/>
														</Grid>
														<Grid item xs={12}>
															<TextField
																variant="outlined"
																fullWidth
																id="paciente"
																label="Paciente"
																name="paciente"
																autoComplete="Paciente"
																value={form.paciente}
																onChange={handleChange}
															/>
														</Grid>
														<Grid item xs={12} sm={12}>
															<FuseChipSelect
																value={form.material}
																id="material"
																name="material"
																placeholder="Selecione um Material"
																onChange={handleMaterialChange}
																textFieldProps={{
																	label: 'Materiais',
																	InputLabelProps: {
																		shrink: true
																	},
																	variant: 'outlined'
																}}
																options={optionsMaterial}
																isMulti={false}
															/>
														</Grid>

														<Grid item xs={12}>
															<TextField
																variant="outlined"
																fullWidth
																id="dentes"
																label="Dentes"
																name="dentes"
																autoComplete="Dentes"
																value={form.dentes}
																onChange={handleChange}
															/>
														</Grid>
														<Grid item xs={12} sm={12}>
															<TextField
																variant="outlined"
																fullWidth
																multiline
																rows={4}
																id="description"
																label="Descrição do trabalho"
																name="description"
																autoComplete="Descrição do trabalho"
																value={form.description}
																onChange={handleChange}
															/>
														</Grid>

														<Grid item xs={12}>
															<Button variant="contained" component="label">
																<input
																	type="file"
																	ref={filesElement}
																	key={form.material || ''}
																	name="avatar"
																	multiple="multiple"
																	// onChange={handleInputChange}
																	// ref={input => (fileInput = input)}
																/>
															</Button>
														</Grid>
													</Grid>
													<Button
														// type="submit"

														fullWidth
														variant="contained"
														color="primary"
														className={classes.submit}
														style={{ marginTop: 10 }}
														onClick={() => onSubmit(form)}
													>
														Enviar
													</Button>
												</form>
											</div>
											{/* <Box mt={5}></Box> */}
										</Container>
									</CardContent>
								</LoadingOverlay>
							</Card>
						</Grid>
						<Grid item>
							<Container component="main" maxWidth="sm">
								<div style={{ backgroundColor: 'transparent' }} className="">
									<img
										style={{ backgroundColor: 'transparent' }}
										className="logo-icon  mt-68 ml-68"
										src="assets/images/logos/CAD_CENTER_LOGO.png"
										alt="logo"
									/>
									<img
										style={{ backgroundColor: 'transparent' }}
										className="logo-icon mt-96 ml-68"
										src="assets/images/logos/LOgo_transpa_BRANCO.png"
										alt="logo"
									/>
								</div>

								{/* 
								<Box mt={5}></Box> */}
							</Container>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			{/* <div className="react-player fixed-bottom">
				<Particles />{' '}
			</div> */}

			<div style={styles.bottomView}>
				<div style={styles.textStyle} className="flex items-center">
					<img
						style={styles.backgroundImage}
						className="logo-icon mr-40"
						src="https://harassousavaz.com.br/wp-content/uploads/2018/01/instagram-icon-white-on-black-circle-1.png"
						alt="logo"
					/>
					<Button
						style={{ color: 'white' }}
						variant="outlined"
						color="primary"
						href="https://www.instagram.com/mayadentalcenter/"
					>
						@mayadentalcenter
					</Button>
					<img
						style={styles.backgroundImage2}
						className="logo-icon "
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoGw1XH8wpToF8eVz3xP-1_gvg6uJw8ya6FA&usqp=CAU"
						alt="logo"
					/>
					<Button
						style={{ color: 'white' }}
						variant="outlined"
						color="primary"
						href="https://api.whatsapp.com/send?phone=5541999900867&text=Ol%C3%A1!"
					>
						(41) 9 9990-0867
					</Button>
				</div>
			</div>
		</div>
	);
}

// const Home = () => (
// 	<div style={styles.root}>
// 		<Particles />
// 	</div>
// );

export default Home;
