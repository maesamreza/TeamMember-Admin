// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import SalePackages from "../../sections/@dashboard/agentApproval/packforSales"
// ----------------------------------------------------------------------

export default function CreateCoupons() {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="Agent: Approval">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {
            <Grid item xs={12} md={12} lg={12}>
              <SalePackages />
            </Grid>
          }

        </Grid>
      </Container>
    </Page>
  );
}
