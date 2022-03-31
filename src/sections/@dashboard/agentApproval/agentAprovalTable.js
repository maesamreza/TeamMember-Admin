import { sentenceCase } from 'change-case';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
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
    TextField,
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
// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from '../user/list';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const InputStyle = styled(TextField)(({ theme }) => ({
    padding: theme.spacing(0.1, 1),
}));
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


export default function AgentApproval() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const { getallagent, agents, getagentdetail } = useAuth();
    useEffect(() => {
        getallagent();
        try {
            getallagent();
            // setData(agents)
        } catch (error) {
            console.log(error)
        }

    }, [])
    const AgentID = async (e) => {
        const ID = e;
        const response = await axios.get(`api/approve/agent/${ID}`);
        const { message } = response.data;
        getallagent();
        // setData(agents)
        enqueueSnackbar(message);
    }
    const AgentDeactivaID = async (e) => {
        const ID = e;
        const response = await axios.get(`api/deactive/agent/${ID}`);
        const { message } = response.data;
        // console.log(response.data)
        enqueueSnackbar(message);
        // setData(agents)
        getallagent();
    }
    const AgentViewID = async (ID) => {
        localStorage.setItem('AgentViewID', ID)
        try {
            await getagentdetail(ID);
            navigate(PATH_DASHBOARD.general.saleApproval);
        } catch (error) {
            console.error(error);
        }
    }
    const [open, setOpen] = useState(false);
    const [LID, setLID] = useState('');
    const [licenseCost, setLicenseCost] = useState('');
    const [usableFor, setUsableFor] = useState('');

    const handleClose = () => {
        setOpen(false)
    };
    const OpenModal = (e) => {
        // setOpen(true);
        const ID = e;
        setLID(ID)
        CreateLicence();
    }
    const CreateLicence = async () => {
        const formData = new FormData;
        formData.append('agent_id', LID);
        formData.append('price', 69);
        formData.append('usableFor', 1);
        const response = await axios.post(`api/license/create/${LID}`, formData);
        const { message } = response.data;
        enqueueSnackbar(message);
        // setOpen(false)

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
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "is_active",
            label: "Approve",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, row) => {
                    return (
                        <>
                            {row.rowData[3] === 1 ? 'Aprrove' : 'Deactive'}
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
                            {row.rowData[3] === 1 ?
                                <LoadingButton size="small" variant="outlined" style={{ margin: '10px' }} onClick={(e) => { AgentDeactivaID(row.rowData[0]) }} >
                                    Deactive
                                </LoadingButton>
                                :
                                <LoadingButton size="small" variant="outlined" style={{ margin: '10px' }} onClick={(e) => { AgentID(row.rowData[0]) }} >
                                    Apporve
                                </LoadingButton>}
                            <LoadingButton size="small" variant="outlined" onClick={(e) => { AgentViewID(row.rowData[0]) }}  >
                                View
                            </LoadingButton>
                            <LoadingButton size="small" variant="outlined" onClick={(e) => { OpenModal(row.rowData[0]) }}  >
                                Create Licence
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
    const data = agents;
    console.log(data)
    return (
        <Page title="Agent Appoval">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Grid>
                    <HeaderBreadcrumbs
                        heading="Agent Approval"
                        links={[
                            { name: 'Dashboard', href: PATH_DASHBOARD.root },
                            { name: 'AgentApproval' },
                        ]}
                        action={
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to={PATH_DASHBOARD.general.addNewAgent}
                                startIcon={<Iconify icon={'eva:plus-fill'} />}
                            >
                                New Agent
                            </Button>
                        }
                    />

                    <Card>
                        {data !== null ?
                            <MUIDataTable
                                title={"Agents"}
                                data={data}
                                columns={columns}
                                options={options}
                            /> : 'Refresh'
                        }
                    </Card>
                </Grid>
            </Container>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Create Licence
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <InputStyle value={licenseCost} label='License Cost' onChange={(e) => { setLicenseCost(e.target.value) }} type="number" />
                    <InputStyle value={usableFor} label='Allowed SalesPerson' onChange={(e) => { setUsableFor(e.target.value) }} type="number" />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={(e) => { CreateLicence() }}>
                        Add Licence
                    </Button>
                </DialogActions>
            </BootstrapDialog>

        </Page >
    );
}

// ----------------------------------------------------------------------
