import React from 'react';
import { ChakraProvider, VStack, } from '@chakra-ui/react';
import Header from './Header';
import SearchBar from './Searchbar';
import ResultsDisplay from './ResultsDisplay';
import { SourceData } from '../types/Source';

type AppProps = {
    data: Array<SourceData>;
};

function App({data}:AppProps):JSX.Element {
  return (<ChakraProvider>
    <VStack flexGrow='1' alignItems='start' margin='1em' spacing='1em'>
      <Header/>
      <SearchBar/>
      <ResultsDisplay data={data}/>
    </VStack>
  </ChakraProvider>);
}

export default App;