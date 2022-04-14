import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import {
    Card,
    Grid,
    Table,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Input,
    Select,
    Box,
    Divider,
    FormControlLabel,
} from '@mui/material';
import MUIDataTable from "mui-datatables";
import { LoadingButton } from '@mui/lab';
import { BsFillEyeFill, BsFillCheckCircleFill } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// hooks
import useSettings from '../../../hooks/useSettings';
import useAuth from '../../../hooks/useAuth';
import useResponsive from '../../../hooks/useResponsive';

// utils
import axios from '../../../utils/axios';
// _mock_
import { _userList } from '../../../_mock';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Editor from '../../../components/editor';

// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from '../user/list';


// ----------------------------------------------------------------------

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    }, background: '#000'
}));

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
// ----------------------------------------------------------------------

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function MailTable() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const { getallnoti, notif, getagentdetail } = useAuth();
    useEffect(() => {
        getallnoti();
        // try {
        //     getallnoti();
        //     // setData(agents)
        // } catch (error) {
        //     console.log(error)
        // }

    }, [])
    const AgentID = async (e) => {
        const ID = e;
        const response = await axios.get(`api/approve/agent/${ID}`);
        const { message } = response.data;
        getallnoti();
        // setData(agents)
        enqueueSnackbar(message);
    }
    const DeleteMail = async (e) => {
        const ID = e;
        const response = await axios.post(`api/admin/delete/notification/${ID}`);
        const { message } = response.data;
        // console.log(response.data)
        enqueueSnackbar(message);
        // setData(agents)
        getallnoti();
    }
    const MailView = async (ID) => {
        setOpen(true);
        try {
            const response = await axios.get(`api/admin/notification/${ID}`);
            const { id, day, time, message } = response.data.mail;
            const { messages } = response.data;
            setID(id);
            setDay(day);
            setTime(time);
            setMessage(message);
            enqueueSnackbar(messages);

        } catch (error) {
            console.error(error);
        }
    }
    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "day",
            label: "Day",
            options: {
                filter: true,
                sort: true,
            }
        },
        // {
        //     name: "message",
        //     label: "Message",
        //     options: {
        //         filter: true,
        //         sort: true,
        //         customBodyRender: (value, row) => {
        //             return (
        //                 <div
        //                     dangerouslySetInnerHTML={{ __html: value }}
        //                 />

        //             );
        //         }
        //     },
        // },
        {
            name: "notify",
            label: "Send",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, row) => {
                    if (value !== "null") {
                        return (
                            <>
                                {JSON.parse(value).join(',')}
                            </>
                        )
                    }
                    return (
                        <>
                            Not Assign
                        </>
                    )

                }
            },
        },
        {
            name: "time",
            label: "Time",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, row) => {

                    return (
                        <>
                            <Input value={value} type='time' readOnly />
                        </>
                    );
                }
            },
        },
        {
            name: "Actions",
            options: {
                customBodyRender: (value, row) => {
                    return (
                        <>
                            <LoadingButton size="small" variant="outlined" style={{ margin: '10px' }} onClick={(e) => { DeleteMail(row.rowData[0]) }} >
                                DeleteMail
                            </LoadingButton>

                            <LoadingButton size="small" variant="outlined" onClick={(e) => { MailView(row.rowData[0]) }}  >
                                {`View`}
                            </LoadingButton>
                        </>
                    );
                }
            }
        }
    ];
    const options = {
        filterType: "dropdown",
        responsive: "scroll",
        selectableRows: true
    };

    // const [data, setData] = useState([]);
    const data = notif;
    const [open, setOpen] = useState(false);


    const handleClose = () => {
        setOpen(false);
    };

    const [fullScreen, setFullScreen] = useState(false);

    const isDesktop = useResponsive('up', 'sm');

    const [id, setID] = useState('');
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');
    const [messsage, setMessage] = useState('');
    const [AgentMail, setAgentMail] = useState(false);
    const [SaleMail, setSaleMail] = useState(false);
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
        if (AgentMail) {
            formData.append("send[]", 'agent')
        }
        if (SaleMail) {
            formData.append("send[]", 'seller')
        }

        const response = await axios.post(`api/admin/update/notification/${id}`, formData);
        const { message } = response.data;
        enqueueSnackbar(message);
        setOpen(false);
        getallnoti();
        navigate(PATH_DASHBOARD.general.sendmail);

    };


    return (<>
        <Page title="Mail">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Grid>
                    <HeaderBreadcrumbs
                        heading="Mail"
                        links={[
                            { name: 'Dashboard', href: PATH_DASHBOARD.root },
                            { name: 'Mail' },
                        ]}
                        action={
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to={PATH_DASHBOARD.general.addmail}
                                startIcon={<Iconify icon={'eva:plus-fill'} />}
                            >
                                New Mail
                            </Button>
                        }
                    />

                    <Card>
                        {data !== null ?
                            <MUIDataTable
                                title={"Mails"}
                                data={data}
                                columns={columns}
                                options={options}
                            /> : 'Refresh'
                        }
                    </Card>
                </Grid>
            </Container>
        </Page >
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Mail
            </BootstrapDialogTitle>
            <DialogContent dividers>
                {/* <RootStyle
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
                > */}
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

                <InputStyle disableUnderline placeholder="Day" value={day} onChange={(e) => { handleChangeDay(e.target.value) }} />


                <InputStyle disableUnderline placeholder="Time" type='time' value={time} onChange={(e) => { handleChangeTime(e.target.value) }} />

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
                <Box sx={{ py: 2, px: 3, display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel control={<Checkbox onChange={(e) => { setAgentMail(e.target.checked) }} />} label="Agent" />
                    <FormControlLabel control={<Checkbox onChange={(e) => { setSaleMail(e.target.checked) }} />} label="Seller" />
                </Box>
                <Divider />


                {/* </RootStyle> */}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={(e) => { onSubmitss() }}>
                    Update Mail
                </Button>
            </DialogActions>
        </BootstrapDialog>

    </>
    );
}

// ----------------------------------------------------------------------
