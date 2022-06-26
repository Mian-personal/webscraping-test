import React from 'react';
import { Tr, Td, Image, Link, Text } from '@chakra-ui/react';
import { DataExtractorResult, DataType } from '../types/Source';
import { ExternalLinkIcon, WarningTwoIcon } from '@chakra-ui/icons';

type DataExtractorResultProps = {
    data:DataExtractorResult;
};

function renderValue(data:DataExtractorResult):JSX.Element {
  switch (data.type) {
  case DataType.IMAGE :
    return <Image src={data.value} width='150px' height='150px'/>;
  case DataType.LINK :
    return <Link href={data.value} isExternal>
      {data.value} <ExternalLinkIcon mx='2px' />
    </Link>;
  case DataType.VALUE :
    return <Text>{data.value}</Text>;
  case DataType.ERROR :
    return <Text color='orange' size='sm'><WarningTwoIcon color='orange'/> Extration failed</Text>;
  }
}

function DataExtractorResultDisplay({data}:DataExtractorResultProps):JSX.Element {
  return (<Tr key={data.label}>
    <Td><Text fontWeight='bold' color='gray'>{data.label}</Text></Td>
    <Td>{renderValue(data)}</Td>
  </Tr>
  );
}

export default DataExtractorResultDisplay;