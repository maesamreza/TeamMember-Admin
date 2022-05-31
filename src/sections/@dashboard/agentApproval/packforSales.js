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
    padding: theme.spacing(1, 1),
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


export default function SalePackages() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const { getallsalePack, packages, getagentdetail } = useAuth();
    useEffect(() => {
        getallsalePack();
        try {
            getallsalePack();
            // setData(packages)
        } catch (error) {
            console.log(error)
        }

    }, [])

    const DeletePackage = async (e) => {
        const ID = e;
        const response = await axios.get(`api/license/package/delete/${ID}`);
        const { message } = response.data;
        // console.log(response.data)
        enqueueSnackbar(message);
        // setData(packages)
        getallsalePack();
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
    const [open2, setOpen2] = useState(false);
    const [LID, setLID] = useState('');
    const [licenseCost, setLicenseCost] = useState('');
    const [PackName, setPackName] = useState("");
    const [Decs, setDecs] = useState("");
    const [usableFor, setUsableFor] = useState('');


    const handleClose2 = () => {
        setOpen2(false)
    };
    const OpenModal2= () => {
        setOpen2(true);
        // const ID = e;
        // console.log(ID[2])
        // setLID(ID[0])
        // setPackName(ID[1])
        // setDecs(ID[2])
        // setLicenseCost(ID[3])
        // setUsableFor(ID[4])
    }
    const AddLicence = async () => {
        const formData = new FormData;
        formData.append('name', PackName);
        formData.append('des', Decs);
        formData.append('price', licenseCost);
        formData.append('usableFor', usableFor);
        const response = await axios.post(`api/license/package/create`, formData);
        const { message } = response.data;
        enqueueSnackbar(message);
        setOpen2(false)
        getallsalePack();
    }

    const handleClose = () => {
        setOpen(false)
    };
    const OpenModal = (e) => {
        setOpen(true);
        const ID = e;
        console.log(ID[2])
        setLID(ID[0])
        setPackName(ID[1])
        setDecs(ID[2])
        setLicenseCost(ID[3])
        setUsableFor(ID[4])
    }
    const UpdateLicence = async () => {
        const formData = new FormData;
        formData.append('name', PackName);
        formData.append('des', Decs);
        formData.append('price', licenseCost);
        formData.append('usableFor', usableFor);
        const response = await axios.post(`api/license/package/update/${LID}`, formData);
        const { message } = response.data;
        enqueueSnackbar(message);
        setOpen(false)
        getallsalePack();
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
            name: "des",
            label: "Description",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "price",
            label: "price",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "usableFor",
            label: "usableFor",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "Actions",
            options: {
                customBodyRender: (value, row) => {
                    return (
                        <>
                            <LoadingButton size="small" variant="outlined" onClick={(e) => { OpenModal(row.rowData) }}   >
                                Update
                            </LoadingButton>
                            <LoadingButton size="small" variant="outlined" onClick={(e) => { DeletePackage(row.rowData[0]) }} >
                                Delete
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
    const data = packages;
    // console.log(data)
    return (
        <Page title="Packages">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Grid>
                    <HeaderBreadcrumbs
                        heading="Sales Person Packages"
                        links={[
                            { name: 'Dashboard', href: PATH_DASHBOARD.root },
                            { name: 'Sales Person Packages' },
                        ]}
                        action={
                            <Button
                                variant="contained"
                                startIcon={<Iconify icon={'eva:plus-fill'} />}
                                onClick={(e) => { OpenModal2() }} 
                            >
                                New Packages
                            </Button>
                        }
                    />

                    <Card>
                        {data !== null ?
                            <MUIDataTable
                                title={"Sales Person Packages"}
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
                    Update Licence
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <InputStyle value={PackName} label='Name' onChange={(e) => { setPackName(e.target.value) }} />
                    <InputStyle value={Decs} label='Description' onChange={(e) => { setDecs(e.target.value) }} />
                    <InputStyle value={licenseCost} label='License Cost' onChange={(e) => { setLicenseCost(e.target.value) }} type="number" />
                    <InputStyle value={usableFor} label='Allowed SalesPerson' onChange={(e) => { setUsableFor(e.target.value) }} type="number" />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={(e) => { UpdateLicence() }}>
                        Update Licence
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <BootstrapDialog
                onClose={handleClose2}
                aria-labelledby="customized-dialog-title"
                open={open2}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose2}>
                    Add Licence
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <InputStyle value={PackName} label='Name' onChange={(e) => { setPackName(e.target.value) }} />
                    <InputStyle value={Decs} label='Description' onChange={(e) => { setDecs(e.target.value) }} />
                    <InputStyle value={licenseCost} label='License Cost' onChange={(e) => { setLicenseCost(e.target.value) }} type="number" />
                    <InputStyle value={usableFor} label='Allowed SalesPerson' onChange={(e) => { setUsableFor(e.target.value) }} type="number" />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={(e) => { AddLicence() }}>
                        Add Licence
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Page >
    );
}

// ----------------------------------------------------------------------
