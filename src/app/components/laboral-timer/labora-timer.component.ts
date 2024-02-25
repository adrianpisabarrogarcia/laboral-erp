import { Class } from './../../../../node_modules/@types/estree/index.d';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DateTimeComponent } from '../date-time/date-time.component';
import { CommonModule } from '@angular/common';


export enum States {
  Start = 'start',
  Pause = 'pause',
  Stop = 'stop'
}

export interface Item {
  dateTime: Date;
  state: string;
}
export interface ParentItem {
  items: Item[];
  current: boolean;
}


@Component({
  selector: 'app-laboral-timer',
  standalone: true,
  imports: [ButtonModule, DateTimeComponent, CommonModule],
  templateUrl: './laboral-timer.component.html',
  styleUrl: './laboral-timer.component.css'
})

export class LaboralTimerComponent implements OnInit {
  time: number = 0;
  timer: string = '00:00:00';
  displayButtons = {
    start: true,
    stop: false,
    pause: false,
    reset: false,
  };
  interval: any;
  savedItems: ParentItem[] = [];

  ngOnInit(): void {
    this.readLocaStorage();
  }

  start() {
    this.interval = setInterval(() => {
      this.time++;
      this.timer = this.formatTime(this.time);
    }, 1000);
    this.saveCurrentDateTime(States.Start);
    this.displayButtons.start = false;
    this.displayButtons.pause = true;
    this.displayButtons.stop = true;
  }

  pause() {
    clearInterval(this.interval);
    this.saveCurrentDateTime(States.Pause);
    this.displayButtons.start = true;
    this.displayButtons.pause = false;
    this.displayButtons.stop = false;
  }

  stop() {
    clearInterval(this.interval);
    this.time = 0;
    this.timer = this.formatTime(this.time);
    this.saveCurrentDateTime(States.Stop);
    this.displayButtons.start = true;
    this.displayButtons.pause = false;
    this.displayButtons.stop = false;
  }

  formatTime(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const hrsString = hrs < 10 ? '0' + hrs : hrs;
    const minsString = mins < 10 ? '0' + mins : mins;
    const secsString = secs < 10 ? '0' + secs : secs;
    return `${hrsString}:${minsString}:${secsString}`;
  }

  saveCurrentDateTime(state: States) {
    const item: Item = {
      dateTime: new Date(),
      state: state
    };
    // TODO: current & save the corrent object
    const parentItem: ParentItem = {
      items: [item],
      current: true
    };
    this.savedItems.push(parentItem);
    localStorage.setItem('data', JSON.stringify(this.savedItems));
  }

  readLocaStorage() {
    const lsData = localStorage.getItem('data');
    if (lsData) {
      const data = JSON.parse(lsData);
      data.forEach((item: any) => {
        // TODO: save the parsed data into the savedItems array
        console.log(item);
      });

    }
  }
}

