import { Box, Flex, Text,Center } from '@chakra-ui/react';

export default function DashboardContainer() {
  const data = {
    total: 200301222
  }

  const total = Intl.NumberFormat('en-US').format(data.total)

  
  return (
    <Box fontFamily='Poppins'>
      <Box
          my='2' mx='2' px='2' 
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          isTruncated
        >
          Periode: 2023-01
      </Box>
        <Box 
          my='2' mx='2' px='2' borderWidth='0px' borderRadius='lg'
          lineHeight='tight'
          isTruncated
        >
          <Box fontSize='sm'>Laba Rugi</Box>
          <Center fontSize='xl' mt='3'>
            Rp {total}
          </Center>
        </Box>
    </Box>
  );
}
