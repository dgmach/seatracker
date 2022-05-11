import * as React from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import Web3 from 'web3';

import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AdministrativeList from './AdministrativeList';
import Slide from '@material-ui/core/Slide';
import ListSubheader from '@material-ui/core/ListSubheader';

// import AreaTypeForm from './AdministrativeForm';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function Administrative() {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const [administrativeList, setAdministrativeList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [open2, setOpen2] = useState(true);
	const [token, setToken] = useState('');
	const [apiURL, setApi] = useState('');
	const [chain, setChain] = useState('');
	const [apiRest, setApiRest] = useState('');
	const [id, setId] = useState('');

	const blockChains = [
		{
			id: 1,
			chain: 'ETH',
			name: 'Ethereum Mainnet',
			api: '[1]',
			apiRest:
				'/api?module=account&action=balance&address=0x2D2685BBF2C1C1f7795259dC22e6158C8B145B20&tag=latest&apikey=5GCQIE45YYH1BE4K9VYHUCETWJ5CCX2HYZ'
		},
		{
			id: 42,
			chain: 'ETH',
			name: 'Ethereum Testnet Kovan',
			api: '[42]',
			apiRest:
				'/api?module=account&action=balancemulti&address=0xbFBb4cAd4d30dc9CF334636bf23e910e0e6E8c67&blockno=2000000&apikey=84VP9S81WSYFV426XKQJ6UF8VZWT1AVURZ'
		},
		{
			id: 137,
			chain: 'MATIC',
			name: 'Matic Mainnet',
			api: '[137]',
			apiRest:
				'/api?module=account&action=balance&address=0x8aE212fa8255D5D5A0821Ed605F1ea5FBeeab3a8&apikey=C8IJVN2S3Z3JH1UA5EAGJ1E82HQMI32N3W'
		},
		{
			id: 80001,
			chain: 'MATIC',
			name: 'MATIC Testnet Mumbai',
			api: '[43114]',
			apiRest:
				'/api?module=account&action=balance&address=0x8aE212fa8255D5D5A0821Ed605F1ea5FBeeab3a8&apikey=C8IJVN2S3Z3JH1UA5EAGJ1E82HQMI32N3W'
		},
		{
			id: 56,
			chain: 'BSC',
			name: 'Binance Smart Chain',
			api: '[56]',
			apiRest:
				'/api?module=account&action=balance&address=0x8aE212fa8255D5D5A0821Ed605F1ea5FBeeab3a8&apikey=C8IJVN2S3Z3JH1UA5EAGJ1E82HQMI32N3W'
		},
		{
			id: 97,
			chain: 'BSC',
			name: 'Binance Smart Chain Testnet',
			api: '[97]',
			apiRest:
				'/api?module=account&action=balance&address=0x8aE212fa8255D5D5A0821Ed605F1ea5FBeeab3a8&apikey=C8IJVN2S3Z3JH1UA5EAGJ1E82HQMI32N3W'
		}
	];

	const handleClickOpen = () => {
		setOpen(true);
	};

	const onChangeToken = event => {
		setToken(event.currentTarget.value);
	};

	const handleClose = () => {
		if (token !== '') {
			setOpen(false);
			enqueueSnackbar('Acesso realizado com sucesso!', {
				variant: 'success'
			});
			const api = axios.create({
				baseURL: 'https://api.covalenthq.com/',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			});

			setLoading(true);

			api.get(
				'v1/' +
					id +
					'/address/' +
					token +
					'/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=ckey_2749ce3996084c26b9d5f3bbd8b'
			)
				.then(({ data }) => {
					let resultData = data.data.items;
					var arrayTest = [];
					for (let index = 0; index < resultData.length; index++) {
						//var balance = data.result.toString();
						var result = {
							busdBalence: resultData[index].quote,
							balance: Web3.utils.fromWei(resultData[index].balance, 'ether'),
							status: 1,
							chain: resultData[index].contract_ticker_symbol,
							id: resultData[index].contract_address,
							icon: resultData[index].logo_url
						};

						arrayTest.push(result);
					}
					setAdministrativeList(arrayTest);
					setLoading(false);
					setOpen2(false);
				})
				.catch(() => setLoading(false));
		} else {
			enqueueSnackbar('É necessario informar uma wallet', {
				variant: 'error'
			});
			setOpen(true);
		}
	};

	const handleClose5 = () => {
		if (token !== '') {
			setOpen(false);
			enqueueSnackbar('Acesso realizado com sucesso!', {
				variant: 'success'
			});
			const api = axios.create({
				baseURL: apiURL,
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			});

			setLoading(true);
			api.get(apiRest)
				.then(({ data }) => {
					var balance = data.result.toString();
					var result = {
						balance: Web3.utils.fromWei(balance, 'ether'),
						status: 1,
						chain: chain,
						id: id
					};
					var arrayTest = [];
					arrayTest.push(result);
					setAdministrativeList([...administrativeList, ...arrayTest]);
					setLoading(false);
					setOpen2(false);
				})
				.catch(() => setLoading(false));
		} else {
			enqueueSnackbar('É necessario informar uma wallet', {
				variant: 'error'
			});
			setOpen(true);
		}
	};

	const handleClickOpen2 = () => {
		setOpen2(true);
	};

	const handleClose2 = () => {
		setOpen(false);
	};

	const clickList = item => {
		setApi(item.api);
		setChain(item.chain);
		setApiRest(item.apiRest);
		setId(item.id);
		setOpen(true);
	};

	return (
		<FusePageSimple
			innerScroll
			sidebarInner
			classes={{
				contentWrapper: 'p-8 sm:p-24',
				wrapper: 'min-h-0',
				header: 'min-h-84 h-84'
			}}
			header={<div className="flex items-center"></div>}
			content={
				<>
					{/* <AreaTypeForm handleResult={handleResult} itemToEdit={itemToEdit} setItemToEdit={setItemToEdit} /> */}
					<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
						<DialogTitle id="form-dialog-title"></DialogTitle>
						<DialogContent>
							<DialogContentText>
								To get the balance {chain}, fill the wallet address below.
							</DialogContentText>
							<TextField
								autoFocus
								margin="dense"
								id="token"
								label="Token"
								onChange={onChangeToken}
								fullWidth
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} color="primary">
								Acessar
							</Button>
						</DialogActions>
					</Dialog>
					<Dialog open={open2} onClose={handleClose2} TransitionComponent={Transition}>
						<DialogContent>
							<DialogContentText>Select the chain</DialogContentText>
						</DialogContent>
						<List>
							{blockChains.map(item => (
								<ListItem
									button
									onClick={() => clickList(item)}
									id={`item-${item.chain}`}
									key={`item-${item.chain}`}
								>
									<ListItemText primary={`${item.chain}`} secondary={`${item.name} - ${item.api}`} />
								</ListItem>
							))}
						</List>
					</Dialog>

					<Button variant="outlined" onClick={handleClickOpen2}>
						Add new
					</Button>
					{!open && (
						<AdministrativeList
							loading={loading}
							administrativeList={administrativeList}
							setAdministrativeList={setAdministrativeList}
						/>
					)}
				</>
			}
		/>
	);
}
