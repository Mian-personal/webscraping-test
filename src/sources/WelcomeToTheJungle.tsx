import { Page } from 'puppeteer';
import { DataExtractorResult, DataType, Source } from '../types/Source';
import { extractAttribute, extractCSS, extractTextContent } from '../logic/DataExtractorLogic';

const source:Source = {
  name: 'Welcome To The Jungle',
  url: (companyName:string) => `https://www.welcometothejungle.com/fr/companies/${companyName}/`,
  extractors: [
    logo, 
    websiteLink, 
    location, 
    nbEmployees
  ]
};

async function logo(page:Page):Promise<DataExtractorResult> {
  return await extractCSS(page,
    'Logo',
    DataType.IMAGE,
    'div[data-testid="organization-header-logo-main"]',
    'background-image',
    value => {
      const matches = /['"](http.*)['"]/.exec(value);
      return matches ? matches[1] : value;
    }
  );
}

async function nbEmployees(page:Page):Promise<DataExtractorResult> {
  return await extractTextContent(page,
    'Nb Employees',
    DataType.VALUE,
    'li.sc-1x8gpne-1:nth-child(2) > span:nth-child(2)'
  );
}

async function websiteLink(page:Page):Promise<DataExtractorResult> {
  return await extractAttribute(page,
    'Website',
    DataType.LINK,
    'a.sc-bdvvtL:nth-child(1)',
    'href'
  );
}

async function location(page:Page):Promise<DataExtractorResult> {
  return await extractTextContent(page,
    'Location',
    DataType.VALUE,
    'ul.sc-1lvyirq-4:nth-child(3) > li:nth-child(2) > span:nth-child(2)'
  );
}

export default source;