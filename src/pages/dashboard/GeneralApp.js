import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// utils
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
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

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();

  useEffect(() => {
    SellerData();
    AgentData();
  }, [])
  const [RawNewAutoQuotesTotal, setRawNewAutoQuotesTotal] = useState(0)
  const [RawNewAutoWrittenTotal, setRawNewAutoWrittenTotal] = useState(0)
  const [TotalFireWrittenTotal, setTotalFireWrittenTotal] = useState(0)
  const [LifeApplicationsTotal, setLifeApplicationsTotal] = useState(0)
  const [AnnualizedLifePremiumTotal, setAnnualizedLifePremiumTotal] = useState(0)
  const [HealthApplicationsTotal, setHealthApplicationsTotal] = useState(0)
  const [AnnualizedHealthPremiumTotal, setAnnualizedHealthPremiumTotal] = useState(0)
  const [OtherFinancialServicesTotal, setOtherFinancialServicesTotal] = useState(0)
  const [Agent,SetAgent] = useState(0)
  const [Seller,SetSeller] = useState(0)
  const AgentData = async (e) => {

    const response = await axios.get(`api/get/agents?getcount`);
    const { total } = response.data
    SetAgent(total)
    // const { RawNewAutoQuotesTotal, RawNewAutoWrittenTotal, TotalFireWrittenTotal, LifeApplicationsTotal, AnnualizedLifePremiumTotal, HealthApplicationsTotal, AnnualizedHealthPremiumTotal, OtherFinancialServicesTotal } = response.data.reports;
    console.log(response);
    // setRawNewAutoQuotesTotal(RawNewAutoQuotesTotal)
    // setRawNewAutoWrittenTotal(RawNewAutoWrittenTotal)
    // setTotalFireWrittenTotal(TotalFireWrittenTotal)
    // setLifeApplicationsTotal(LifeApplicationsTotal)
    // setAnnualizedLifePremiumTotal(AnnualizedLifePremiumTotal)
    // setHealthApplicationsTotal(HealthApplicationsTotal)
    // setAnnualizedHealthPremiumTotal(AnnualizedHealthPremiumTotal)
    // setOtherFinancialServicesTotal(OtherFinancialServicesTotal)

  }
  const SellerData = async (e) => {

    const response = await axios.get(`/all/sellers/rating?getcount`);
    const { total } = response.data
    SetSeller(total)
    // const { RawNewAutoQuotesTotal, RawNewAutoWrittenTotal, TotalFireWrittenTotal, LifeApplicationsTotal, AnnualizedLifePremiumTotal, HealthApplicationsTotal, AnnualizedHealthPremiumTotal, OtherFinancialServicesTotal } = response.data.reports;
    console.log(response);
    // setRawNewAutoQuotesTotal(RawNewAutoQuotesTotal)
    // setRawNewAutoWrittenTotal(RawNewAutoWrittenTotal)
    // setTotalFireWrittenTotal(TotalFireWrittenTotal)
    // setLifeApplicationsTotal(LifeApplicationsTotal)
    // setAnnualizedLifePremiumTotal(AnnualizedLifePremiumTotal)
    // setHealthApplicationsTotal(HealthApplicationsTotal)
    // setAnnualizedHealthPremiumTotal(AnnualizedHealthPremiumTotal)
    // setOtherFinancialServicesTotal(OtherFinancialServicesTotal)

  }
  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>


          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Agents"
              total={Agent}
              chartColor={theme.palette.primary.main}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Sales Person"
              total={Seller}
              chartColor={theme.palette.chart.green[0]}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Raw New Auto Quotes"
              // percent={2.6}
              total={0}
              chartColor={theme.palette.primary.main}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Raw New Auto Written"
              // percent={-0.1}
              total={0}
              chartColor={theme.palette.chart.main}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Total Fire Written"
              // percent={0.6}
              total={0}
              chartColor={theme.palette.chart.main}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Life Applications"
              // percent={2.6}
              total={0}
              chartColor={theme.palette.primary.main}

            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Annualized Life Premium"
              // percent={2.6}
              total={0}
              chartColor={theme.palette.primary.main}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Health Applications"
              // percent={2.6}
              total={0}
              chartColor={theme.palette.primary.main}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Annualized Health Premium"
              // percent={2.6}
              total={0}
              chartColor={theme.palette.primary.main}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Other Financial Services"
              // percent={2.6}
              total={0}
              chartColor={theme.palette.primary.main}
            />
          </Grid>



        </Grid>
      </Container>
    </Page>
  );
}
