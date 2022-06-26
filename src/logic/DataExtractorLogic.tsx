import { Page } from 'puppeteer';
import { DataExtractorResult, DataType } from '../types/Source';

export async function extractTextContent(page:Page, 
  label:string, 
  type:DataType, 
  selector:string,
  transformFct?:(string:string)=>string
):Promise<DataExtractorResult> {
  let value;
  try {
    const element = await page.waitForSelector(selector);
    if (element) {
      value = await page.evaluate((element) => element.textContent, element);
      if (value && transformFct) {
        value = transformFct(value);
      }
    }
  }
  catch(e) {
    console.log(e);
  }
  return {
    label,
    type: value ? type : DataType.ERROR,
    value : value ? value : undefined
  };
}

export async function extractAttribute(page:Page, 
  label:string, 
  type:DataType, 
  selector:string, 
  attributeName:string,
  transformFct?:(string:string)=>string
):Promise<DataExtractorResult> {
  let value;
  try {
    const element = await page.waitForSelector(selector);
    if (element) {
      value = await page.evaluate((element, attributeName) => element.getAttribute(attributeName), element, attributeName);
      if (value && transformFct) {
        value = transformFct(value);
      }
    }
  }
  catch(e) {
    console.log(e);
  }
  return {
    label,
    type: value ? type : DataType.ERROR,
    value : value ? value : undefined
  };
}

export async function extractCSS(page:Page, 
  label:string, 
  type:DataType, 
  selector:string, 
  propertyName:string,
  transformFct?:(string:string)=>string
):Promise<DataExtractorResult> {
  let value;
  try {
    const element = await page.waitForSelector(selector);
    if (element) {
      value = await page.evaluate((element, propertyName) => {
        return getComputedStyle(element).getPropertyValue(propertyName);
      }, element, propertyName);
      if (value && transformFct) {
        value = transformFct(value);
      }
    }
  }
  catch(e) {
    console.log(e);
  }
  return {
    label,
    type: value ? type : DataType.ERROR,
    value : value ? value : undefined
  };
}