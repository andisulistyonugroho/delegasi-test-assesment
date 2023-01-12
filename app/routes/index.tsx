import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { useLoaderData } from '@remix-run/react';
import { getProfitLoss } from '~/models/profitloss.server';
import { getBalanceSheet } from '~/models/balancesheet.server'

import DashboardContainer from '~/container/dashboard';

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const data = useLoaderData()
  
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="full"
      background="gray.100"
    >
      <Box
        minWidth="375px"
        width={{ base: '100%', md: '380px' }}
        height="100vh"
        borderColor="gray.200"
        minHeight="200px"
        position="relative"
        bg="white"
      >
        <Box>
          <Flex
            bg={useColorModeValue('white', 'gray.800')}
            color={useColorModeValue('gray.600', 'white')}
            minH={'60px'}
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            align={'center'}
          >
            <Flex
              flex={{ base: 1 }}
              ml={{ base: -2 }}
              display={{ base: 'flex' }}
            >
              <IconButton
                onClick={onToggle}
                icon={
                  isOpen ? (
                    <CloseIcon w={3} h={3} />
                  ) : (
                    <HamburgerIcon w={5} h={5} />
                  )
                }
                variant={'ghost'}
                aria-label={'Toggle Navigation'}
              />
            </Flex>
            <Flex flex={{ base: 1 }} justify={{ base: 'center' }}>
              <Box>
                <Image
                  src={
                    'https://uploads-ssl.webflow.com/62af9fefd2f730861971dce1/62afe5cb0139380cff95569e_logoMain.png'
                  }
                  height="30px"
                />
              </Box>
            </Flex>

            <Stack
              flex={{ base: 1 }}
              justify={'flex-end'}
              direction={'row'}
              spacing={6}
            ></Stack>
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            <MobileNav />
          </Collapse>
          <DashboardContainer dashboardData={data} />
        </Box>
      </Box>
    </Box>
  );
}

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Dashboard',
    href: '/',
  },
  {
    label: 'Custom Page',
    href: '#',
  },
];

export async function loader (){
  const profitlossRes = await getProfitLoss();
  const neracaRes = await getBalanceSheet();
  return {profitloss: profitlossRes, neraca: neracaRes}
}