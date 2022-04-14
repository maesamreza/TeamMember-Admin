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
    MenuItem,
    FormControl,
    InputLabel
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
        padding: theme.spacing(4),
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


export default function Salecoupon() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const { getallcupon, coupon, getagentdetail } = useAuth();
    useEffect(() => {
        getallcupon();
        try {
            getallcupon();
            // setData(coupon)
        } catch (error) {
            console.log(error)
        }

    }, [])


    // const AgentViewID = async (ID) => {
    //     localStorage.setItem('AgentViewID', ID)
    //     try {
    //         await getagentdetail(ID);
    //         navigate(PATH_DASHBOARD.general.saleApproval);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [LID, setLID] = useState('');
    const [licenseCost, setLicenseCost] = useState('');
    const [discount, setdiscount] = useState("");
    const [discountType, setdiscountType] = useState("");
    const [usableFor, setUsableFor] = useState('');
    const [Emails, setEmail] = useState('');
    const [CupID, setCupID] = useState('');


    const handleClose2 = () => {
        setOpen2(false)
    };
    const handleClose3 = () => {
        setOpen3(false)
    };
    const OpenModal2 = () => {
        setOpen2(true);
        // const ID = e;
        // console.log(ID[2])
        // setLID(ID[0])
        // setdiscount(ID[1])
        // setdiscountType(ID[2])
        // setLicenseCost(ID[3])
        // setUsableFor(ID[4])
    }
    const OpenModal3 = (e) => {
        setOpen3(true);
        setCupID(e)
    }
    const CreateCup = async () => {
        const formData = new FormData;
        formData.append('discount', discount);
        formData.append('discountType', discountType);
        const response = await axios.post(`api/coupon/create`, formData);
        const { message } = response.data;
        enqueueSnackbar(message);
        setOpen2(false)
        getallcupon();
    }

    const handleClose = () => {
        setOpen(false)
    };
    const OpenModal = (e) => {
        setOpen(true);
        const ID = e;
        console.log(ID)
        setLID(ID[0])
        setdiscountType(ID[2])
        setdiscount(ID[3])
    }
    const UpdateCupon = async () => {
        const formData = new FormData;
        formData.append('discount', discount);
        formData.append('discountType', discountType);
        const response = await axios.post(`api/coupon/update/${LID}`, formData);
        const { message } = response.data;
        enqueueSnackbar(message);
        setOpen(false)
        getallcupon();
    }
    const DeleteCupon = async (e) => {
        const ID = e;
        const response = await axios.get(`api/coupon/delete/${ID}`);
        const { message } = response.data;
        // console.log(response.data)
        enqueueSnackbar(message);
        // setData(coupon)
        getallcupon();
    }
    const MailCupon = async (e) => {
        const formData = new FormData;
        formData.append('email', Emails);
        const response = await axios.post(`api/coupon/mail/${CupID}`, formData);
        const { message } = response.data;
        enqueueSnackbar(message);
        getallcupon();
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
            name: "discountType",
            label: "DiscountType",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "discount",
            label: "Discount",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "id",
            label: "Actions",
            options: {
                customBodyRender: (value, row) => {
                    return (
                        <>
                            <LoadingButton size="small" variant="outlined" onClick={(e) => { OpenModal(row.rowData) }}   >
                                Update
                            </LoadingButton>
                            <LoadingButton size="small" variant="outlined" sx={{ ml: 2 }} onClick={(e) => { DeleteCupon(value) }} >
                                Delete
                            </LoadingButton>
                            <LoadingButton size="small" variant="outlined" sx={{ ml: 2 }} onClick={(e) => { OpenModal3(value) }} >
                                Mail Coupon
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
    const data = coupon;
    // console.log(data)
    return (
        <Page>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Grid>
                    <HeaderBreadcrumbs
                        heading="Cuopons"
                        links={[
                            { name: 'Dashboard', href: PATH_DASHBOARD.root },
                            { name: 'Cuopons' },
                        ]}
                        action={
                            <Button
                                variant="contained"
                                startIcon={<Iconify icon={'eva:plus-fill'} />}
                                onClick={(e) => { OpenModal2() }}
                            >
                                New coupon
                            </Button>
                        }
                    />

                    <Card>
                        {data !== null ?
                            <MUIDataTable
                                title={"Cuopons"}
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
                    Update Cuopons
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <TextField value={discount} label='Discount' onChange={(e) => { setdiscount(e.target.value) }} sx={{ mr: 1 }} />
                    </FormControl>
                    {/* <TextField value={discountType} label='DiscountType' onChange={} /> */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">DiscountType</InputLabel>
                        <Select
                            value={discountType}
                            label="DiscountType"
                            onChange={(e) => { setdiscountType(e.target.value) }}
                        >
                            <MenuItem value={'Amount'}>Amount</MenuItem>
                            <MenuItem value={'Percent'}>Percent</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={(e) => { UpdateCupon() }}>
                        Update Cuopons
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <BootstrapDialog
                onClose={handleClose2}
                aria-labelledby="customized-dialog-title"
                open={open2}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Cuopons
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <TextField value={discount} label='Discount' onChange={(e) => { setdiscount(e.target.value) }} sx={{ mr: 1 }} />
                    </FormControl>
                    {/* <TextField value={discountType} label='DiscountType' onChange={} /> */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">DiscountType</InputLabel>
                        <Select
                            value={discountType}
                            label="DiscountType"
                            onChange={(e) => { setdiscountType(e.target.value) }}
                        >
                            <MenuItem value={'Amount'}>Amount</MenuItem>
                            <MenuItem value={'Percent'}>Percent</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={(e) => { CreateCup() }}>
                        Add Cuopons
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <BootstrapDialog
                onClose={handleClose3}
                aria-labelledby="customized-dialog-title"
                open={open3}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Mail Cuopons
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <FormControl fullWidth >
                        <TextField value={Emails} label='Email' onChange={(e) => { setEmail(e.target.value) }} sx={{ mr: 1 }} />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant='outlined' onClick={(e) => { MailCupon() }}>
                        Mail Cuopons
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Page >
    );
}

// ----------------------------------------------------------------------
