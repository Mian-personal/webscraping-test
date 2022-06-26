import { Page } from 'puppeteer';
import { DataExtractorResult, DataType, Source } from '../types/Source';
import { extractAttribute, extractTextContent } from '../logic/DataExtractorLogic';

const source:Source = {
  name: 'Crunchbase',
  url: (companyName:string) => `https://www.crunchbase.com/organization/${companyName}/`,
  extractors: [
    logo, 
    websiteLink, 
    location, 
    nbEmployees
  ]
};

async function logo(page:Page):Promise<DataExtractorResult> {
  return await extractAttribute(page,
    'Logo',
    DataType.IMAGE,
    'body > chrome > div > mat-sidenav-container > mat-sidenav-content > div > ng-component > entity-v2 > page-layout > div > div > profile-header > div > header > div > div > div > div.image-holder.ng-star-inserted > identifier-image > div > img',
    'src'
  );
}

async function nbEmployees(page:Page):Promise<DataExtractorResult> {
  return await extractTextContent(page,
    'Nb Employees',
    DataType.VALUE,
    'body > chrome > div > mat-sidenav-container > mat-sidenav-content > div > ng-component > entity-v2 > page-layout > div > div > div > page-centered-layout.overview-divider.ng-star-inserted > div > row-card > div > div:nth-child(1) > profile-section > section-card > mat-card > div.section-content-wrapper > div > fields-card > ul > li:nth-child(2) > label-with-icon > span > field-formatter > a'
  );
}

async function websiteLink(page:Page):Promise<DataExtractorResult> {
  return await extractAttribute(page,
    'Website',
    DataType.LINK,
    'body > chrome > div > mat-sidenav-container > mat-sidenav-content > div > ng-component > entity-v2 > page-layout > div > div > div > page-centered-layout.overview-divider.ng-star-inserted > div > row-card > div > div:nth-child(1) > profile-section > section-card > mat-card > div.section-content-wrapper > div > fields-card > ul > li:nth-child(5) > label-with-icon > span > field-formatter > link-formatter > a',
    'href'
  );
}

async function location(page:Page):Promise<DataExtractorResult> {
  return await extractTextContent(page,
    'Location',
    DataType.VALUE,
    'body > chrome > div > mat-sidenav-container > mat-sidenav-content > div > ng-component > entity-v2 > page-layout > div > div > div > page-centered-layout.overview-divider.ng-star-inserted > div > row-card > div > div:nth-child(1) > profile-section > section-card > mat-card > div.section-content-wrapper > div > fields-card > ul > li:nth-child(1) > label-with-icon > span > field-formatter > identifier-multi-formatter > span'
  );
}

export default source;