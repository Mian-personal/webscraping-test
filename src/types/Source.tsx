import { Page } from 'puppeteer';

export interface Source {
    name: string,
    url: (companyName:string) => string;
    extractors: Array<(page:Page) => Promise<DataExtractorResult>>;
}

export interface SourceData {
    name: string,
    url : string,
    data:Array<DataExtractorResult>
}

export interface DataExtractorResult {
    label: string,
    type: DataType,
    value?: string
}

export enum DataType {
    VALUE,
    LINK,
    IMAGE,
    ERROR
}