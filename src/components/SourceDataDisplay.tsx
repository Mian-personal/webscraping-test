import React from 'react';
import { TableContainer, Table, Thead, Tbody, Tr, Th, Link } from '@chakra-ui/react';
import { SourceData } from '../types/Source';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import DataExtractorResultDisplay from './DataExtractorResultDisplay';

type SourceDataDisplayProps = {
    sourceData:SourceData;
};

function SourceDataDisplay({sourceData}:SourceDataDisplayProps):JSX.Element {

  const rows = sourceData.data.map(data => <DataExtractorResultDisplay key={data.label} data={data}/>);

  return (<TableContainer width='500px'>
    <Table variant='simple'>
      <Thead backgroundColor='green.400'>
        <Tr>
          <Th colSpan={2}>
            <Link href={sourceData.url} isExternal>
              {sourceData.name} <ExternalLinkIcon mx='2px' />
            </Link>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {rows}
      </Tbody>
    </Table>
  </TableContainer>);
}

export default SourceDataDisplay;