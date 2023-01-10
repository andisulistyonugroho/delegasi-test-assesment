import { Box } from '@chakra-ui/react';
import ProfitLoss from './profitLoss';

export default function DashboardContainer() {
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
      <ProfitLoss />
    </Box>
  );
}
