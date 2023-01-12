import {
  Box, Center, Text, Flex, Button, Spacer, useDisclosure, Modal,ModalOverlay,ModalContent, ModalHeader,
  ModalCloseButton, SimpleGrid, TableContainer, Table, Tbody, Tr, Td
} from '@chakra-ui/react'

interface data {
  profitloss: {
    value: number,
    details: any
  }
}

function ProfitLoss(data: data) {
    const profitloss = data.profitloss
    const grossOmset = profitloss.details.find((obj: { label: string }) => obj.label === 'Pendapatan Kotor')
    const expense = profitloss.details.find((obj: {label: string}) => obj.label === 'Beban')
    
    const total = Intl.NumberFormat('en-US').format(profitloss.value)
    const totalGrossOmset = Intl.NumberFormat('en-US').format(grossOmset.value)
    const totalExpense = Intl.NumberFormat('en-US').format(expense.value)
    
    return (
        <Box 
        my='2' py='3' px='2' borderWidth='0px'
        lineHeight='tight'
        isTruncated
        bg='grey.400'
      >
        <Text fontSize='sm' textAlign='center'>Laba Rugi</Text>
        <Center fontSize='xl' fontWeight='bold' mt='3' color='#255057'>
          Rp {total}
        </Center>
        <Flex pt='3'>
          <Box p='4'>
            <Text fontSize='xs'>Pendapatan</Text>
            <Text fontSize='sm' color='#499C6E'>Rp {totalGrossOmset}</Text>
          </Box>
          <Spacer />
          <Box p='4'>
            <Text fontSize='xs'>Beban</Text>
            <Text color='red' fontSize='sm'>Rp {totalExpense}</Text>
          </Box>
        </Flex>
        <DetailProfitLoss profitloss={profitloss} />
      </Box>
    )
}

function DetailProfitLoss(data:data) {
  const {onOpen, isOpen, onClose} = useDisclosure()

  return (
    <>
    <Button isFullWidth onClick={onOpen}>Lihat detail</Button>
    <Modal isOpen={isOpen} onClose={onClose} size='sm' isCentered>
      <ModalOverlay />
      <ModalContent fontFamily='Poppins'>
        <ModalHeader>
          <Text fontWeight='normal'>Detail Laba Rugi</Text>
          <Text fontWeight='normal' fontSize='xs'>Periode 2023-01</Text>
        </ModalHeader>
        
        <ModalCloseButton />

        <SimpleGrid columns={2} fontSize='sm'>
        {data.profitloss.details.map((row: { label: string,value: number }, index:number) => (
          <GridProfitLoss key={index} gridrow={row} rowctr={index} />
        ))}
        </SimpleGrid>
        
      </ModalContent>
    </Modal>
    </>
  )
}

function formatNumber(value:number) {
  return Intl.NumberFormat('en-US').format(value)
}

function GridProfitLoss(data:{ gridrow:{label: string,value: number},rowctr: number }) {
  const rowColor = function(value:number) {
    return value%2 === 1 ? 'teal.100' : ''
  }
  return (
    <>
    <Box bg={rowColor(data.rowctr)} py='2' pl='4'>{data.gridrow.label}</Box>
    <Box bg={rowColor(data.rowctr)} py='2' pr='3'><Text align='right'>{formatNumber(data.gridrow.value)}</Text></Box>
    </>
  )
}

export default ProfitLoss