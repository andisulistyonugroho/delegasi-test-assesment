import {
  Box, Center, Text, Flex, Button, Spacer, useDisclosure, Modal,ModalOverlay,ModalContent, ModalHeader,
ModalCloseButton, Grid, GridItem, ModalBody
} from '@chakra-ui/react'

type data = {
  neraca: {
    label: string,
    value: number,
    details: Array<NeracaDetail>
  }
}

interface NeracaDetail {
  label: string,
  value: number,
  details?: Array<NeracaDetail>,
  children?: Array<NeracaDetail>
}

export default function balanceSheet(data: data) {
  const objectAktiva = getDataByLabel(data.neraca,'Aktiva')
  const aktiva = objectAktiva.value
  const objectPasiva = getDataByLabel(data.neraca,'Pasiva')
  const pasiva = objectPasiva.value
  const balanceState = aktiva === pasiva ? 'Seimbang' : 'Tidak Seimbang'
  return (
    <Box 
    my='2' py='3' px='2' borderWidth='0px'
    lineHeight='tight'
    isTruncated
    bg='grey.400'
    >
      <Text fontSize='sm' textAlign='center'>Neraca Keuangan</Text>
      <Center fontSize='xl' fontWeight='bold' mt='3' color='#255057'>
        {balanceState }
      </Center>
      <Flex pt='3'>
        <Box p='4'>
          <Text fontSize='xs'>Aktiva</Text>
          <Text fontSize='sm' color='#499C6E'>Rp {formatNumber(aktiva)}</Text>
        </Box>
        <Spacer />
        <Box p='4'>
          <Text fontSize='xs'>Pasiva</Text>
          <Text color='red' fontSize='sm'>Rp {formatNumber(pasiva)}</Text>
        </Box>
      </Flex>
      <DetailBalanceSheet aktiva={objectAktiva} />
    </Box>
  )
}

function DetailBalanceSheet(data:{aktiva:NeracaDetail}) {
  const {onOpen, isOpen, onClose} = useDisclosure()
  
  return (
    <>
      <Button isFullWidth onClick={onOpen} size='sm'>Lihat detail</Button>
      <Modal isOpen={isOpen} onClose={onClose} size='full' isCentered scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent fontFamily='Poppins'>
        <ModalHeader>
          <Text fontWeight='normal'>Detail Neraca Keuangan</Text>
          <Text fontWeight='normal' fontSize='xs'>Periode 2023-01</Text>
        </ModalHeader>
        
        <ModalCloseButton />
        <ModalBody px='0'>

        <Grid
          templateColumns='repeat(3, 1fr)'
        >
          <GridItem h='10' colSpan={1} bg='teal.100' p='2'>Akun</GridItem>
          <GridItem h='10' colSpan={2} bg='teal.100' p='2'>
            <Text align='center'>Saldo</Text>
          </GridItem>
          <GridItem h='10'></GridItem>
          <GridItem h='10' p='2'><Text align='center'>Debit</Text></GridItem>
          <GridItem h='10' p='2'><Text align='center'>Kredit</Text></GridItem>
          <NeracaAktiva data={data.aktiva} />
        </Grid>

        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  )
}

function NeracaAktiva(neracaaktiva: {data: NeracaDetail}) {
  // const aktivaDetail = neracaaktiva.data.details
  // const aktivaLancar = aktivaDetail ? aktivaDetail.find(obj => obj.label === 'Aktiva Lancar') : []
  const aktivaLancar = getDataByLabel(neracaaktiva.data,'Aktiva Lancar')
  const cashnbank = getDataByLabel(aktivaLancar,'Kas & Bank')
  console.log('A:', cashnbank.details)
  // const asset = []
  // asset = asset.push(cashnbank.details)
  
  return (
    <Box>----</Box>
  )
}

function GridNeraca(data:{details:{label:string, value: number, details: any, children: any}}) {
  console.log(data.details.details)
  return (
    <>
    <GridItem>{data.details.label}</GridItem>
    <GridItem>{data.details.value }</GridItem>
    <GridItem>{data.details.label}</GridItem>
    <GridNeracaChild row={data.details.details} />
    </>
  )
}

function GridNeracaChild(child:{row:any}) {
  // console.log('child:', child.row.length)
  if (child.row.length > 0) {
    return (
      <>
      <Text>A</Text>
        {/* {child.row.map((row:detailRow, index: number) => (
          <GridNeraca key={index} details={row} />
        ))} */}
      </>
    )
  } else {
    return (<>{child.row.length}</>)
  }
}

function formatNumber(value:number) {
    return Intl.NumberFormat('en-US').format(value)
}

// third parameter is a marker wether this object deducting money or not
function getDataByLabel(data:NeracaDetail,label:string,) {
  // console.log(data);
  console.log('find :', label)
  
  let found
  if (data.details && data.details.length) {
    found = data.details.find(obj => obj.label === label)
  } else if (data.children && data.children.length) {
    found = data.children.find(obj => obj.label === label)
  }
  // console.log('found: ', found)
  return found ?? {label: label + ': not found', value: 0}
}