import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';

// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
import { countries } from '../../../_mock';
// components
import Label from '../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AddNewForm() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const NewUserSchema = Yup.object().shape({
        firstName: Yup.string().required('FirstName is required'),
        lastName: Yup.string().required('LastName is required'),
        email: Yup.string().required('Email is required').email(),
        state: Yup.string().required('Confirm Password is required'),
        password: Yup.string().required('Password is required'),
        confirmpassword: Yup.string().required('Confirm Password is required'),
    });

    const defaultValues = useMemo(
        () => ({
            firstName: '',
            lastName: '',
            email: '',
            state: '',
            password: '',
            confirmpassword: '',
        }),

    );

    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        defaultValues,
    });

    const {
        watch,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("firstName", data.firstName)
            formData.append("lastName", data.lastName)
            formData.append("email", data.email)
            formData.append("state", data.state)
            formData.append("password", data.password)
            formData.append("confirmpassword", data.confirmpassword)
            const response = await axios.post(`api/register`, formData);
            const { message } = response.data;
            enqueueSnackbar(message);
            navigate(PATH_DASHBOARD.general.agentApproval);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>

                <Grid item xs={12} md={12}>
                    <Typography variant='h6' color='common.white'>
                        Add New Agent
                    </Typography>
                    <Card sx={{ p: 3 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                            }}
                        >
                            <RHFTextField name="firstName" label="First Name" />
                            <RHFTextField name="lastName" label="Last Name" />
                            <RHFTextField name="state" label="State/Region" />
                            <RHFTextField name="email" label="Email Address" />
                            <RHFTextField name="password" label="password" type='password' />
                            <RHFTextField name="confirmpassword" label="Confirm Password" type='password' />
                        </Box>

                        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                Add New Agent
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
