import { Box } from '@chakra-ui/react';
import ProfitLoss from './profitLoss';

interface result {
  dashboardData: {
    neraca: object, 
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
    </Box>
  );
}
