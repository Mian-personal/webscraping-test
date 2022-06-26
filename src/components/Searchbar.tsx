import React from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { Button, HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

function SearchBar():JSX.Element {

  return (<form>
    <HStack>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          // eslint-disable-next-line react/no-children-prop
          children={<SearchIcon />}
        />
        <Input
          name='search'
          placeholder='Please enter a Company name' 
        />
      </InputGroup>
      <Button type='submit' colorScheme='gray'>
        Scrap me that!
      </Button>
    </HStack>
  </form>);
}

export default SearchBar;