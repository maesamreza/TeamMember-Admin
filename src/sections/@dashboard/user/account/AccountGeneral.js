import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
// utils
import { fData } from '../../../../utils/formatNumber';
// utils
import axios from '../../../../utils/axios';
// _mock
import { countries } from '../../../../_mock';
// components
import { FormProvider, RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required(' firstName is required'),
    lastName: Yup.string().required(' lastName is required'),
    email: Yup.string().required(' email is required'),
    password: Yup.string().required(' Password is required'),
    passwordconfirmation: Yup.string().required('Confirm Password is required'),

  });

  const defaultValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    password: "",
    passwordconfirmation: "",

  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName)
      formData.append("lastName", data.lastName)
      formData.append("email", data.email)
      formData.append("password", data.password)
      formData.append("passwordconfirmation", data.passwordconfirmation)

      const response = await axios.post(`api/update/profile/admin`, formData);
      const { message } = response.data;
      enqueueSnackbar(message);
    } catch (error) {
      console.error(error);
    }
  };


  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'photoURL',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>

        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="firstName " label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />

              <RHFTextField name="email" label="Email Address" />

              <RHFTextField name="password" label="Password" />
              <RHFTextField name="passwordconfirmation" label="Password Confirm" />
            </Box >

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
