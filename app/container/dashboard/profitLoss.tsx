import {
  Box, Center, Text, Flex, Button, Spacer, useDisclosure, Modal,ModalOverlay,ModalContent, ModalHeader,
  ModalCloseButton, ModalFooter, ModalBody, TableContainer, Table, Tbody, Tr, Td
} from '@chakra-ui/react'

interface profitloss {
  profitloss: {
    value: number,
    details: any
  }
}

function ProfitLoss(data: profitloss) {
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
        <DetailProfitLoss />
      </Box>
    )
}

function DetailProfitLoss() {
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
        
        <TableContainer>
          <Table variant='striped' colorScheme='teal' size='sm'>
            <Tbody>
              <Tr>
                <Td fontWeight='bold' colSpan={3}>Pendapatan</Td>
              </Tr>
              <Tr>
                <Td fontSize='xs'>
                  Pendapatan Kotor
                </Td>
                <Td isNumeric fontSize='xs'>196919000</Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td fontSize='xs'>Diskon Penjualan</Td>
                <Td></Td>
                <Td isNumeric fontSize='xs'>196919000</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <ModalBody>BODY</ModalBody>
      </ModalContent>
    </Modal>
    </>
  )
}

export default ProfitLoss