import { Component, OnInit } from '@angular/core';
import { Logger } from "angular2-logger/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
  }
  constructor(private logger: Logger) {
    this.logger.error('This is a priority level 1 error message...');
    this.logger.warn('This is a priority level 2 warning message...');
    this.logger.info('This is a priority level 3 warning message...');
    this.logger.debug('This is a priority level 4 debug message...');
    this.logger.log('This is a priority level 5 log message...');
  }
}
