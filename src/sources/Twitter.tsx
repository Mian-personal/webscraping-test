import { Page } from 'puppeteer';
import { DataExtractorResult, DataType, Source } from '../types/Source';
import { extractAttribute, extractTextContent } from '../logic/DataExtractorLogic';

const source:Source = {
  name: 'Twitter',
  url: (companyName:string) => `https://mobile.twitter.com/${companyName}/`,
  extractors: [nbTweets, websiteLink, location]
};

async function nbTweets(page:Page):Promise<DataExtractorResult> {
  return await extractTextContent({
    page,
    label: 'Nb Tweets',
    type: DataType.VALUE,
    selector: '#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div.css-1dbjc4n.r-aqfbo4.r-gtdqiz.r-1gn8etr.r-1g40b8q > div.css-1dbjc4n.r-1loqt21.r-136ojw6 > div > div > div > div > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1777fci > div > div',
    transformFct: value => {
      const matches = /([0-9]*) Tweets/.exec(value);
      return matches ? matches[1] : value;
    }
  });
}

async function location(page:Page):Promise<DataExtractorResult> {
  return await extractTextContent({
    page,
    label: 'Location',
    type: DataType.VALUE,
    selector: '#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div:nth-child(2) > div > div > div > div > div:nth-child(4) > div > span:nth-child(1) > span > span'
  });
}

async function websiteLink(page:Page):Promise<DataExtractorResult> {
  return await extractAttribute({
    page,
    label: 'Website',
    type: DataType.LINK,
    selector: '#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div:nth-child(2) > div > div > div > div > div:nth-child(4) > div > a',
    propertyName: 'href'
  });
}


export default source;