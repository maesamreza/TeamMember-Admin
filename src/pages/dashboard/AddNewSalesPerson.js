// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  EcommerceWelcome,
  EcommerceNewProducts,
  EcommerceYearlySales,
  EcommerceBestSalesman,
  EcommerceSaleByGender,
  EcommerceWidgetSummary,
  EcommerceSalesOverview,
  EcommerceLatestProducts,
  EcommerceCurrentBalance,
} from '../../sections/@dashboard/general/e-commerce';
import AddNewSalesForm from '../../sections/@dashboard/agentApproval/NewSaleForm';
// ----------------------------------------------------------------------

export default function AddNewAgent() {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="SalePerson: New SalesPerson">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <AddNewSalesForm />
            </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
