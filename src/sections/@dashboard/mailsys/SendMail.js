import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Container, Card, Box, Input, Select, Portal, Button, Divider, Backdrop, IconButton, Typography } from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
import { getLabels } from '../../../redux/slices/mail';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useResponsive from '../../../hooks/useResponsive';
// utils
import axios from '../../../utils/axios';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Iconify from '../../../components/Iconify';
import Editor from '../../../components/editor';

// import { MailList, MailDetails, MailSidebar, MailCompose } from '../../sections/@dashboard/mail';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
    right: 0,
    bottom: 0,
    zIndex: 1999,
    minHeight: 440,
    outline: 'none',
    display: 'flex',
    // position: 'fixed',
    overflow: 'hidden',
    flexDirection: 'column',
    margin: theme.spacing(3),
    boxShadow: theme.customShadows.z20,
    borderRadius: Number(theme.shape.borderRadius) * 2,
    backgroundColor: theme.palette.background.paper,
}));

const InputStyle = styled(Input)(({ theme }) => ({
    padding: theme.spacing(0.5, 3),
    borderBottom: `solid 1px ${theme.palette.divider}`,
}));
const SelectStyle = styled(Select)(({ theme }) => ({
    padding: theme.spacing(0.1, 2),
    borderBottom: `solid 1px ${theme.palette.divider}`,
}));

export default function Mail() {
    const { themeStretch } = useSettings();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [fullScreen, setFullScreen] = useState(false);

    const isDesktop = useResponsive('up', 'sm');


    const [day, setDay] = useState('');
    const [time, setTime] = useState('');
    const [messsage, setMessage] = useState('');
    const handleChangeDay = (value) => {
        setDay(value);
    };
    const handleChangeTime = (value) => {
        setTime(value);
    };
    const handleChangeMessage = (value) => {
        setMessage(value);
    };

    const onSubmitss = async () => {

        const formData = new FormData();
        formData.append("day", day)
        formData.append("time", time)
        formData.append("message", messsage)
        formData.append("send[]", 'agent')
        formData.append("send[]", 'seller')

        const response = await axios.post(`api/admin/add/notification`, formData);
        const { message } = response.data;
        enqueueSnackbar(message);
        navigate(PATH_DASHBOARD.general.sendmail);

    };

   

    return (
        <Page title="Mail">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <HeaderBreadcrumbs
                    heading="Mail"
                    links={[
                        {
                            name: 'Dashboard',
                            href: PATH_DASHBOARD.root,
                        },
                        { name: 'Mail' },
                    ]}
                />

                <RootStyle
                    sx={{
                        ...(fullScreen && {
                            top: 0,
                            left: 0,
                            zIndex: 1999,
                            margin: 'auto',
                            width: {
                                xs: `calc(100% - 24px)`,
                                md: `calc(100% - 80px)`,
                            },
                            height: {
                                xs: `calc(100% - 24px)`,
                                md: `calc(100% - 80px)`,
                            },
                        }),
                    }}
                >
                    <Box
                        sx={{
                            pl: 3,
                            pr: 1,
                            height: 60,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h6">New Message</Typography>
                        <Box sx={{ flexGrow: 1 }} />

                    </Box>

                    <Divider />

                    <InputStyle disableUnderline placeholder="Day" onChange={(e)=>{handleChangeDay(e.target.value)}} />


                    <InputStyle disableUnderline placeholder="Time" type='time' onChange={(e)=>{handleChangeTime(e.target.value)}} />

                    <Editor
                        simple
                        id="compose-mail-12"
                        value={messsage}
                        onChange={handleChangeMessage}
                        placeholder="Type a message"
                        sx={{
                            borderColor: 'transparent',
                            flexGrow: 1,
                        }}
                    />

                    <Divider />

                    <Box sx={{ py: 2, px: 3, display: 'flex', alignItems: 'center' }}>
                        <LoadingButton variant="contained" onClick={(e)=>{onSubmitss()}}>Send</LoadingButton>
                    </Box>
                </RootStyle>
            </Container>
        </Page>
    );
}
