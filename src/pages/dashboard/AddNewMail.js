import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Card, Box, Input, Select, Portal, Button, Divider, Backdrop, IconButton, Typography } from '@mui/material';
// redux
import { useDispatch } from '../../redux/store';
import { getLabels } from '../../redux/slices/mail';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';
// utils
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Iconify from '../../components/Iconify';
import Editor from '../../components/editor';
import SendMail from '../../sections/@dashboard/mailsys/SendMail';
import MailTable from '../../sections/@dashboard/mailsys/MailTable';
// import { MailList, MailDetails, MailSidebar, MailCompose } from '../../sections/@dashboard/mail';

// ----------------------------------------------------------------------


export default function AddNewMail() {
    const { themeStretch } = useSettings();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();



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
                        { name: 'Add New Mail' },
                    ]}
                />

                <SendMail />
               
            </Container>
        </Page>
    );
}
