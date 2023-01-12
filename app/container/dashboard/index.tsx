import { Box } from '@chakra-ui/react';
import ProfitLoss from './profitLoss';
import BalanceSheet from './balanceSheet';

interface NeracaDetail {
  label: string,
  value: number,
  details?: Array<NeracaDetail>,
  children?: Array<NeracaDetail>
}
interface result {
  dashboardData: {
    neraca: {
      label: string,
      value: number,
      details: Array<NeracaDetail>
    }, 
    profitloss: {
      label: string,
      value: number,
      details: any
    }
  }
}

export default function DashboardContainer(data: result) {
  return (
    <Box fontFamily='Poppins'>
      <Box
          mt='2' mb='4' mx='2' px='2' 
          fontSize='xs'
          as='h4'
          lineHeight='tight'
          isTruncated
        >
          Periode: 2023-01
      </Box>
      <ProfitLoss profitloss={data.dashboardData.profitloss} />

      <hr></hr>

      <BalanceSheet neraca={data.dashboardData.neraca} />
    </Box>
  );
}
