import { FormControl, Typography } from '@material-ui/core';
import CustomDialog from 'app/shared-components/common/CustomDialog';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import api from 'app/services/api/api';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomButton from 'app/shared-components/common/CustomButton';

export default function ModalValidations({ open, onClose, confirmedValidations, setForm }) {
	const [validationOptions, setValidationOptions] = useState([]);
	const [state, setState] = useState({});
	const { t } = useTranslation();

	const handleChange = event => setState({ ...state, [event.target.name]: event.target.checked });

	const submit = () => {
		setForm(form => ({
			...form,
			validations: validationOptions.filter(item => state[item.id]).map(item => item.id)
		}));
		onClose();
	};

	useEffect(() => {
		const source = axios.CancelToken.source();

		api.get(`/area-type-validations/?is_active=true`, { cancelToken: source.token }).then(({ data }) =>
			setValidationOptions(data)
		);

		return () => source.cancel();
	}, []);

	useEffect(() => {
		if (validationOptions) {
			const aux = {};
			validationOptions.forEach(option => {
				aux[option.id] = confirmedValidations.some(validation => option.id === validation);
			});
			setState(aux);
		}
	}, [confirmedValidations, validationOptions]);

	return (
		<CustomDialog
			title={t('areaType:form:validationsModalTitle')}
			open={open}
			onClose={onClose}
			footer={<CustomButton onClick={submit}>{t('global:saveButton')}</CustomButton>}
		>
			<FormControl component="fieldset">
				<div className="font-medium text-14 mb-8">{t('areaType:form:availableValidations')}</div>
				{validationOptions.map(item => (
					<FormControlLabel
						className="ml-12"
						key={item.id}
						control={
							<Checkbox type="checkbox" name={item.id} checked={state[item.id]} onChange={handleChange} />
						}
						label={<Typography color="secondary">{item.name}</Typography>}
					/>
				))}
			</FormControl>
		</CustomDialog>
	);
}
