import {
  Box, Center, Text, Flex, Button, Spacer, useDisclosure, Modal,ModalOverlay,ModalContent, ModalHeader,
  ModalCloseButton,ModalBody
} from '@chakra-ui/react'

function profitLoss() {
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
        <Text fontSize='sm'>Laporan Laba Rugi</Text>
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
        <DetailProfitLoss />

      </Box>
    )
}

function DetailProfitLoss() {
  const {onOpen, isOpen, onClose} = useDisclosure()
  return (
    <>
    <Button size='xs' isFullWidth onClick={onOpen}>Lihat detail</Button>
    <Modal isOpen={isOpen} onClose={onClose} size='full'>
        <ModalOverlay />
        <ModalContent fontFamily='Poppins'>
          <ModalHeader>
            <Text>Detail Laba Rugi</Text>
            <Text fontSize='xs'>Periode 2023-01</Text>
          </ModalHeader>
          
          <ModalCloseButton />
          <ModalBody>
            
            
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default profitLoss