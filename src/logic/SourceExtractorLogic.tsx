import puppeteer from 'puppeteer';
import { Source, SourceData } from '../types/Source';

export async function extract(sources:Array<Source>, searchQuery:string):Promise<SourceData[]> {
    
  if (!searchQuery) {
    return [];
  }
    
  const browser = await puppeteer.launch();
    
  async function extractFromSource(source:Source):Promise<SourceData> {
    const url = source.url(searchQuery.toLowerCase());
    const page = await browser.newPage();
    page.setDefaultTimeout(15000);
    await page.goto(url);
        
    return {
      name: source.name,
      url,
      data: await Promise.all(source.extractors.map(e => e(page)))
    };
  }

  const data =  await Promise.all(sources.map(extractFromSource));
  browser.close();
    
  return data;
}