import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import Switch from '@material-ui/core/Switch';
import { Icon, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import FileDownload from 'js-file-download';
import { saveAs } from 'file-saver';

export default function AreaTypeList({ administrativeList, setAdministrativeList, setItemToEdit, loading }) {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const setDownlaodFile = data => {
		console.log('downlaodfile', data);

		const path = data.row.filePath;
		/* eslint-disable prefer-template */
		const url = 'http://localhost:3000/downloadPathFile?filePath=' + path;

		fetch(url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(function (response) {
				return response.blob();
			})
			.then(function (blob) {
				FileDownload(blob, path.split('/')[path.split('/').length - 1]);
				enqueueSnackbar('Download realizado com sucesso!', {
					variant: 'success'
				});
			})
			.catch(error => {
				//whatever
			});
	};

	const columns = [
		{
			field: 'icon',
			headerName: ' ',
			width: 100,
			renderCell: params => <img className="block rounded" style={{ width: '30px' }} src={params.value} />
		},
		{
			field: 'chain',
			headerName: 'Rede',
			flex: 1
		},
		{
			field: 'balance',
			headerName: 'Saldo',
			flex: 1
		},
		{
			field: 'busdBalence',
			headerName: 'BUSD',
			flex: 1
		},
		{
			field: 'id',
			headerName: 'Contract address',
			flex: 1
		}
	];

	return (
		<TableContainer component={Paper}>
			<div style={{ height: 600, width: '100%' }}>
				<DataGrid
					rows={administrativeList}
					columns={columns}
					pageSize={20}
					disableSelectionOnClick
					loading={loading}
				/>
			</div>
		</TableContainer>
	);
}
