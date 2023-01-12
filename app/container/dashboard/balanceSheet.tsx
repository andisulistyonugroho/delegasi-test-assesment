import {
  Box, Center, Text, Flex, Button, Spacer, useDisclosure, Modal,ModalOverlay,ModalContent, ModalHeader,
ModalCloseButton, Grid, GridItem, ModalBody, InputLeftAddon
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
      <DetailBalanceSheet aktiva={objectAktiva} pasiva={objectPasiva} />
    </Box>
  )
}

function DetailBalanceSheet(data:{aktiva:NeracaDetail, pasiva: NeracaDetail}) {
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
          <GridItem colSpan={1} bg='teal.100' p='1' fontSize='sm' fontWeight='bold'>Akun</GridItem>
          <GridItem colSpan={2} bg='teal.100' p='1' fontSize='sm' fontWeight='bold'>
            <Text align='center'>Saldo</Text>
          </GridItem>
          <GridItem></GridItem>
          <GridItem p='1' fontSize='sm' fontWeight='bold'><Text align='right'>Debit</Text></GridItem>
          <GridItem p='1' fontSize='sm' fontWeight='bold'><Text align='right'>Kredit</Text></GridItem>
          <NeracaAktiva data={data.aktiva} />
          <NeracaPasiva data={data.pasiva} />
        </Grid>

        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  )
}

function NeracaAktiva(neracaaktiva: {data: NeracaDetail}) {
  const assets = generateAssets(neracaaktiva.data)
  
  return (
    <>
      <GridItem colSpan={3} bg='teal.100' p='1' fontSize='xs' fontWeight='bold'>
        Aset
      </GridItem>
      {assets?.map((row,index) => (
        <GridNeraca key={index} data={row} index={index} flag='debit' />
      ))}
    </>
  )
}

function NeracaPasiva(neracapasiva: {data: NeracaDetail}) {
  const liabilities = generateLiability(neracapasiva.data)
  
  return (
    <>
      <GridItem colSpan={3} bg='teal.100' p='1' fontSize='xs' fontWeight='bold'>
        Kewajiban
      </GridItem>
      {liabilities?.map((row,index) => (
        <GridNeraca key={index} data={row} index={index} flag='kredit' />
      ))}
    </>
  )
}

function GridNeraca(input:{data: NeracaDetail, index: number, flag: string}) {
  const rowColor = function(value:number) {
    return value%2 === 1 ? '' : 'teal.100'
  }
  let debit = function(flag: string) {
    if (flag === 'debit') {
      return (
        <Text align='right'>
          {formatNumber(input.data.value) }
        </Text>
      )
    }
    return ''
  }
  let kredit = function(flag: string) {
    if (flag === 'kredit') {
      return (
        <Text align='right'>
          {formatNumber(input.data.value) }
        </Text>
      )
    }
    return ''
  }
  return (
    <>
    <GridItem py='1' pl='1' fontSize='xs' bg={rowColor(input.index)}>{input.data.label}</GridItem>
    <GridItem py='1' fontSize='xs' bg={rowColor(input.index)}>
      {debit(input.flag)}
    </GridItem>
    <GridItem py='1' fontSize='xs' bg={rowColor(input.index)}>
      {kredit(input.flag)}
    </GridItem>
    </>
  )
}

function generateAssets(data:NeracaDetail) {
  const aktivaLancar = getDataByLabel(data,'Aktiva Lancar')
  const cashnbank = getDataByLabel(aktivaLancar,'Kas & Bank')
  const akunpiutang = getDataByLabel(aktivaLancar,'Akun Piutang')
  const persediaan = getDataByLabel(aktivaLancar,'Persediaan')
  const aktivalancarlain = getDataByLabel(aktivaLancar,'Aktiva Lancar Lainnya')
  const aktivaTidakLancar = getDataByLabel(data,'Aktiva Tidak Lancar')
  
  let assets = cashnbank.details
  assets?.push(akunpiutang)
  assets?.push(persediaan)
  assets?.push(...(aktivalancarlain.details||[]))
  assets?.push(...(aktivaTidakLancar.details||[]))
  return assets
}

function generateLiability(data:NeracaDetail) {
  console.log('liabli:', data);
  
  const kewajibanlancar = getDataByLabel(data,'Kewajiban Lancar')
  const kewajibantidaklancar = getDataByLabel(data,'Kewajiban Tidak Lancar')
  
  let liabilites = kewajibanlancar.details
  liabilites?.push(...(kewajibantidaklancar.details||[]))
  return liabilites
}

function formatNumber(value:number) {
    return Intl.NumberFormat('en-US').format(value)
}

// third parameter is a marker wether this object deducting money or not
function getDataByLabel(data:NeracaDetail,label:string,) {  
  let found
  if (data.details && data.details.length) {
    found = data.details.find(obj => obj.label === label)
  } else if (data.children && data.children.length) {
    found = data.children.find(obj => obj.label === label)
  }
  return found ?? {label: label + ': not found', value: 0}
}