import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink ,useNavigate} from 'react-router-dom';
import { useSnackbar } from 'notistack';


// @mui
import { useTheme } from '@mui/material/styles';
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
} from '@mui/material';
import MUIDataTable from "mui-datatables";
import { LoadingButton } from '@mui/lab';
import { BsFillEyeFill, BsFillCheckCircleFill } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
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


export default function SalesApproval() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const { getallsaleman, salespersons } = useAuth();
    const [AgentID,setAgentID] = useState(localStorage.getItem('AgentViewID'))

    useEffect(() => {
        try {
            getallsaleman(AgentID);
            setData(salespersons)
        } catch (error) {
            console.log(error)
        }
    }, [])

    const SalePersonID = async (e) => {
        const IDs = e;
        setAgentID(localStorage.getItem('AgentViewID'))
        const response = await axios.get(`api/approve/seller/${IDs}/${AgentID}`);
        const { message } = response.data;
        enqueueSnackbar(message);
        getallsaleman(AgentID);
        setData(salespersons)
        navigate(PATH_DASHBOARD.general.saleApproval);
    }
    const SalePersonDeactivaID = async (e) => {
        const IDs = e;
        setAgentID(localStorage.getItem('AgentViewID'))
        const response = await axios.get(`api/deactive/seller/${IDs}/${AgentID}`);
        const { message } = response.data;
        // console.log(response.data)
        enqueueSnackbar(message);
        getallsaleman(AgentID);
        setData(salespersons);
        navigate(PATH_DASHBOARD.general.saleApproval);
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
            name: "phone",
            label: "phone",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "city",
            label: "City",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "country",
            label: "country",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "state",
            label: "state",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "agentName",
            label: "AgentName",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "agentEmail",
            label: "AgentEmail",
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
                            {row.rowData[9] === 1 ? 'Aprrove' : 'Deactive'}
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
                        {row.rowData[9] === 1 ?
                                <LoadingButton size="small" variant="contained" style={{ margin: '10px' }} onClick={(e) => { SalePersonDeactivaID(row.rowData[0]) }} >
                                    Deactive
                                </LoadingButton>
                                :
                                <LoadingButton size="small" variant="contained" style={{ margin: '10px' }} onClick={(e) => { SalePersonID(row.rowData[0]) }} >
                                    Apporve
                                </LoadingButton>}
                            
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

    const [data, setData] = useState([]);


    return (
        <Page title="SalePerson">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Grid>
                    <HeaderBreadcrumbs
                        heading="SalesPerson Approval"
                        links={[
                            { name: 'Dashboard', href: PATH_DASHBOARD.root },
                            { name: 'AgentApproval' },
                        ]}
                        action={
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to={PATH_DASHBOARD.general.addNewSale}
                                startIcon={<Iconify icon={'eva:plus-fill'} />}
                            >
                                New SalesPerson
                            </Button>
                        }
                    />

                    <Card>
                        {data !== null ?
                            <MUIDataTable
                                title={"SalesPerson"}
                                data={data}
                                columns={columns}
                                options={options}
                            /> : 'No SalePerson'}
                    </Card>
                </Grid>
            </Container>
        </Page >
    );
}

// ----------------------------------------------------------------------
