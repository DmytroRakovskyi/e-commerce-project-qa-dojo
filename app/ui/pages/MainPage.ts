import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from '../components/header';

export class MainPage extends BasePage {
  public header: Header;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
  }
}
