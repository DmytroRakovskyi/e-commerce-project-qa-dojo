import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '../components/header.component';

export class MainPage extends BasePage {
  public headerComponent: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.headerComponent = new HeaderComponent(page);
  }
}
