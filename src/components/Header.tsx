import React from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, Link, Text } from '@chakra-ui/react';


function Header():JSX.Element {

  return (<Alert status='info'>
    <AlertIcon />
    <Text>
                Welcome to my company webscraping test POC!<br/>
                For more information, please visit{' '}
      <Link href='https://github.com/Mian-personal/webscraping-test' isExternal>
                    Github repository <ExternalLinkIcon mx='2px' />
      </Link>
    </Text>
  </Alert>);
}

export default Header;