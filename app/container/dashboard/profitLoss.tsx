import {Box, Center, Text, Flex, Button, Spacer} from '@chakra-ui/react'

function detailProfitLoss() {
    const data = {
        total: 200301222
      }
    
    const total = Intl.NumberFormat('en-US').format(data.total)
    
    return (
        <Box 
        my='2' py='3' px='2' borderWidth='0px'
        lineHeight='tight'
        isTruncated
        bg='grey.400'
      >
        <Box fontSize='sm'>Laporan Laba Rugi</Box>
        <Center fontSize='xl' mt='3'>
          Rp {total}
        </Center>
        <Flex pt='3'>
          <Box p='4'>
            <Text fontSize='xs'>Pendapatan</Text>
            <Text fontSize='sm' color='green.400'>Rp 10.000</Text>
          </Box>
          <Spacer />
          <Box p='4'>
            <Text fontSize='xs'>Beban</Text>
            <Text color='red.400' fontSize='sm'>Rp 10.000.000</Text>
          </Box>
        </Flex>

        <Button size='xs' isFullWidth>Lihat detail</Button>
      </Box>
        
    )
}

export default detailProfitLoss