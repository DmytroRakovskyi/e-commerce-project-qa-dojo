import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '../components/header.component';

export class MainPage extends BasePage {
  readonly headerComponent: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.headerComponent = new HeaderComponent(page);
  }
}
