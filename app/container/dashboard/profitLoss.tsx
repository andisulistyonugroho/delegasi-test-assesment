import {
  Box, Center, Text, Flex, Button, Spacer, useDisclosure, Modal,ModalOverlay,ModalContent, ModalHeader,
  ModalCloseButton, SimpleGrid, ModalBody, Divider
} from '@chakra-ui/react'

type data = {
  profitloss: {
    value: number,
    details: any
  }
}

type rowData  = {
  label: string,
  value: number,
  subtract: boolean
}

let profit = 0

function ProfitLoss(data: data) {
    const profitloss = data.profitloss
    const grossOmset = profitloss.details.find((obj: { label: string }) => obj.label === 'Pendapatan Kotor')
    const expense = profitloss.details.find((obj: {label: string}) => obj.label === 'Beban')
    
    profit = profitloss.value
    const totalGrossOmset = grossOmset.value
    const totalExpense = expense.value
    
    return (
        <Box 
        my='2' py='3' px='2' borderWidth='0px'
        lineHeight='tight'
        isTruncated
        bg='grey.400'
      >
        <Text fontSize='sm' textAlign='center'>Laba Bersih</Text>
        <Center fontSize='xl' fontWeight='bold' mt='3' color='#255057'>
          Rp {formatNumber(profit)}
        </Center>
        <Flex pt='3'>
          <Box p='4'>
            <Text fontSize='xs'>Pendapatan</Text>
            <Text fontSize='sm' color='#499C6E'>Rp {formatNumber(totalGrossOmset)}</Text>
          </Box>
          <Spacer />
          <Box p='4'>
            <Text fontSize='xs'>Beban</Text>
            <Text color='red' fontSize='sm'>Rp {formatNumber(totalExpense)}</Text>
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
    <Button isFullWidth onClick={onOpen} size='sm'>Lihat detail</Button>
    <Modal isOpen={isOpen} onClose={onClose} size='full' isCentered scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent fontFamily='Poppins'>
        <ModalHeader>
          <Text fontWeight='normal'>Detail Laba Rugi</Text>
          <Text fontWeight='normal' fontSize='xs'>Periode 2023-01</Text>
        </ModalHeader>
        
        <ModalCloseButton />
        <ModalBody px='3'>

          <Income profitloss={data.profitloss} />
          <GrossExpense profitloss={data.profitloss} />
          <OperatingProfit profitloss={data.profitloss} />
          <ProfitBeforeTaxes profitloss={data.profitloss} />
          <Divider orientation='horizontal' />
          <NetProfit profitloss={data.profitloss} />

        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  )
}

function formatNumber(value:number) {
  return Intl.NumberFormat('en-US').format(value)
}

// third parameter is a marker wether this object deducting money or not
function getDataByLabel(data:data,label:string, flag: string) {
  const found = data.profitloss.details.find((obj: { label: string }) => obj.label === label)
  return found ? {...found,subtract: flag === 'deduct' ? true : false} : {label: label + ': not found', value: 0}
}

function GridProfitLoss(data:{ gridrow:{label: string,value: number, subtract: boolean},rowctr: number }) {
  const rowColor = function(value:number) {
    return value%2 === 1 ? 'teal.100' : ''
  }

  // Add bracket on object that cause money deduction
  const theValue = function (value:number, subtract:boolean) {
    if (subtract) {
      return '('+formatNumber(value)+')'  
    }
    return formatNumber(value)
  }
  
  return (
    <>
    <Box bg={rowColor(data.rowctr)} py='2' pl='4'>{data.gridrow.label}</Box>
    <Box bg={rowColor(data.rowctr)} py='2' pr='3'>
      <Text align='right'>
        {theValue(data.gridrow.value, data.gridrow.subtract)}
      </Text>
    </Box>
    </>
  )
}

function Income(data:data) {
  // third parameter is marker wether this value adding money or deducting money
  const rowIncome = [
    getDataByLabel(data,'Pendapatan Kotor', 'add'),
    getDataByLabel(data,'Diskon Penjualan','deduct'),
    getDataByLabel(data,'Refund', 'deduct'),
    getDataByLabel(data,'Komisi & Feee', 'deduct'),
    getDataByLabel(data,'Pendapatan Bersih', 'none')
  ]

  return (
    <>
    <Text bg='teal.100' fontWeight='bold' p='2'>Pendapatan Bersih</Text>
    <SimpleGrid columns={2} fontSize='sm' pb='5'>
      {rowIncome.map((row:rowData,index:number) => (
        <GridProfitLoss key={index} gridrow={row} rowctr={index} />
      ))}
    </SimpleGrid>
    </>
  )
}

function GrossExpense(data: data) {
  // third parameter is marker wether this value adding money or deducting money
  const rowIncome = [
    getDataByLabel(data,'Pendapatan Bersih', 'none'),
    getDataByLabel(data,'Harga Pokok Penjualan', 'deduct'),
    getDataByLabel(data,'Laba Kotor','none')
  ]

  return (
    <>
    <Text bg='teal.100' fontWeight='bold' p='2'>Laba Kotor</Text>
    <SimpleGrid columns={2} fontSize='sm' pb='5'>
      {rowIncome.map((row:rowData,index:number) => (
        <GridProfitLoss key={index} gridrow={row} rowctr={index} />
      ))}
    </SimpleGrid>
    </>
  )
}

function OperatingProfit(data: data) {
  // third parameter is marker wether this value adding money or deducting money
  const rowIncome = [
    getDataByLabel(data,'Laba Kotor','none'),
    getDataByLabel(data,'Beban','deduct'),
    getDataByLabel(data,'Laba Usaha','none'),
  ]

  return (
    <>
    <Text bg='teal.100' fontWeight='bold' p='2'>Laba Usaha</Text>
    <SimpleGrid columns={2} fontSize='sm' pb='5'>
      {rowIncome.map((row:rowData,index:number) => (
        <GridProfitLoss key={index} gridrow={row} rowctr={index} />
      ))}
    </SimpleGrid>
    </>
  )
}

function ProfitBeforeTaxes(data: data) {
  // third parameter is marker wether this value adding money or deducting money
  const rowIncome = [
    getDataByLabel(data,'Laba Usaha','none'),
    getDataByLabel(data,'Pendapatan Lainnya','none'),
    getDataByLabel(data,'Beban Lainnya','deduct'),
    getDataByLabel(data,'Laba Sebelum Beban Pajak Penghasilan','none'),
  ]

  return (
    <>
    <Text bg='teal.100' fontWeight='bold' p='2'>Laba Sebelum Pajak</Text>
    <SimpleGrid columns={2} fontSize='sm' pb='5'>
      {rowIncome.map((row:rowData,index:number) => (
        <GridProfitLoss key={index} gridrow={row} rowctr={index} />
      ))}
    </SimpleGrid>
    </>
  )
}

function NetProfit(data: data) {
  // third parameter is marker wether this value adding money or deducting money
  const rowIncome = [
    getDataByLabel(data,'Laba Sebelum Beban Pajak Penghasilan','none'),
    getDataByLabel(data,'Beban Pajak','deduct'),
  ]

  return (
    <>
    <Text bg='teal.100' fontWeight='bold' p='2'>Laba Bersih</Text>
    <SimpleGrid columns={2} fontSize='sm' pb='5'>
      {rowIncome.map((row:rowData,index:number) => (
        <GridProfitLoss key={index} gridrow={row} rowctr={index} />
      ))}
      <Box py='2' pl='4'>Laba Bersih</Box>
      <Box py='2' pr='3'>
        <Text align='right'>
          {formatNumber(profit)}
        </Text>
      </Box>
    </SimpleGrid>
    </>
  )
}

export default ProfitLoss