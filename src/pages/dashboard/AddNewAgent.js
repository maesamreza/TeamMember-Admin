// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

import AddNewAgentForm from '../../sections/@dashboard/agentApproval/NewAgentForm';
// ----------------------------------------------------------------------

export default function AddNewAgent() {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="Agent: New Agent">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <AddNewAgentForm />
            </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
