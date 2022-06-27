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
  return await extractCSS({
    page,
    label: 'Logo',
    type: DataType.IMAGE,
    selector: 'div[data-testid="organization-header-logo-main"]',
    propertyName: 'background-image',
    transformFct: value => {
      const matches = /['"](http.*)['"]/.exec(value);
      return matches ? matches[1] : value;
    }
  });
}

async function nbEmployees(page:Page):Promise<DataExtractorResult> {
  return await extractTextContent({
    page,
    label: 'Nb Employees',
    type: DataType.VALUE,
    selector: 'li.sc-1x8gpne-1:nth-child(2) > span:nth-child(2)'
  });
}

async function websiteLink(page:Page):Promise<DataExtractorResult> {
  return await extractAttribute({
    page,
    label: 'Website',
    type: DataType.LINK,
    selector: 'a.sc-bdvvtL:nth-child(1)',
    propertyName: 'href'
  });
}

async function location(page:Page):Promise<DataExtractorResult> {
  return await extractTextContent({
    page,
    label: 'Location',
    type: DataType.VALUE,
    selector: 'ul.sc-1lvyirq-4:nth-child(3) > li:nth-child(2) > span:nth-child(2)'
  });
}

export default source;