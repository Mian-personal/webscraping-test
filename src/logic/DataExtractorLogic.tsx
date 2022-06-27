import { Page } from 'puppeteer';
import { DataExtractorResult, DataType } from '../types/Source';

/** Object with extraction configuration options */
export interface ExtractConfig {
  /** Puppeteer Page object */
  page:Page, 
  /** Label of the extracted value */
  label:string, 
  /** Type of data of the extracted value */
  type:DataType, 
  /** CSS selector to be used to find the desired element */
  selector:string,
  /** Attribute or CSS property name to extract (not used for TextContent, mandatory otherwise) */
  propertyName?:string,
  /** An optionnal transformation function that is applied after the extraction of the value */
  transformFct?:(string:string)=>string
}

/**
 * Extract innerHTML from selected element
 * @param extractConfig an ExtractConfig object to configure extraction options
 * @returns a DataExtractorResult with given configuration
 */
export async function extractTextContent(extractConfig:ExtractConfig):Promise<DataExtractorResult> {
  return extractGeneric(extractConfig, 
    (page, element) => {
      return page.evaluate((element) => element.textContent, element);
    });
}

/**
 * Extract specified attribute from selected element
 * @param extractConfig an ExtractConfig object to configure extraction options
 * @returns a DataExtractorResult with given configuration
 */
export async function extractAttribute(extractConfig:ExtractConfig):Promise<DataExtractorResult> {
  return extractGeneric(extractConfig, 
    (page, element) => {
      return page.evaluate((element, propertyName) => element.getAttribute(propertyName), element, extractConfig.propertyName);
    });
}

/**
 * Extract specified CSS property value from selected element
 * @param extractConfig an ExtractConfig object to configure extraction options
 * @returns a DataExtractorResult with given configuration
 */
export async function extractCSS(extractConfig:ExtractConfig):Promise<DataExtractorResult> {
  return extractGeneric(extractConfig, 
    (page, element) => {
      return page.evaluate((element, propertyName) => {
        return getComputedStyle(element).getPropertyValue(propertyName || '');
      }, element, extractConfig.propertyName);
    });
}

async function extractGeneric(extractConfig:ExtractConfig, extractFct:(page:Page, element:any)=>Promise<string>):Promise<DataExtractorResult> {
  let value;
  try {
    const element = await extractConfig.page.waitForSelector(extractConfig.selector);
    if (element) {
      value = await extractFct(extractConfig.page, element);
      if (value && extractConfig.transformFct) {
        value = extractConfig.transformFct(value);
      }
    }
  }
  catch(e) {
    console.log(e);
  }
  return {
    label: extractConfig.label,
    type: value ? extractConfig.type : DataType.ERROR,
    value : value ? value : undefined
  };
}