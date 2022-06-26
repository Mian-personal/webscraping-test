import { HStack } from '@chakra-ui/react';
import React from 'react';

import { SourceData } from '../types/Source';
import SourceDataDisplay from './SourceDataDisplay';

type ResultDisplayProps = {
    data: Array<SourceData>;
};

function ResultsDisplay({data}:ResultDisplayProps):JSX.Element {
  const results = data.map(sourceData => <SourceDataDisplay key={sourceData.name} sourceData={sourceData}/>);
  return (<HStack alignItems='start'spacing='1em'>
    {results}
  </HStack>);
}

export default ResultsDisplay;