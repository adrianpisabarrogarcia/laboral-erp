import { Component, OnInit } from '@angular/core';
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
    this.readLocalStorage();
  }

  start(save: boolean = true) {
    this.interval = setInterval(() => {
      this.time++;
      this.timer = this.formatTime(this.time);
    }, 1000);
    if(save) this.saveCurrentDateTime(States.Start);
    this.displayButtons.start = false;
    this.displayButtons.pause = true;
    this.displayButtons.stop = true;
  }

  pause(save: boolean = true) {
    clearInterval(this.interval);
    if(save) this.saveCurrentDateTime(States.Pause);
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

  createNewState(state: States) {
    return {
      dateTime: new Date(),
      state: state
    };
  }

  saveCurrentDateTime(state: States) {
    let current = this.savedItems.find(item => item.current);
    if (current) {
      current.items.push(this.createNewState(state));
      if (state === States.Stop) {
        current.current = false;
      }
    } else {
      this.savedItems.push({
        items: [this.createNewState(state)],
        current: true
      });
    }
    console.log(this.savedItems);
    localStorage.setItem('data', JSON.stringify(this.savedItems));
  }

  readLocalStorage() {
    const lsData = localStorage.getItem('data');
    if (lsData) {
      this.savedItems = JSON.parse(lsData).map((dat: any) => ({
        items: dat.items.map((item: any) => ({
          dateTime: new Date(item.dateTime),
          state: item.state
        })),
        current: dat.current
      }));
      const current = this.savedItems.find(item => item.current);
      if (current) {
        this.displayButtons.start = false;
        this.displayButtons.pause = true;
        this.displayButtons.stop = true;
        const sortedItems = current.items.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
        let elapsedTime = 0;
        sortedItems.forEach((item, index) => {
          if (item.state === States.Start) {
            const nextItem = sortedItems[index + 1];
            if (nextItem && nextItem.state === States.Pause) {
              elapsedTime += nextItem.dateTime.getTime() - item.dateTime.getTime();
            } else if (nextItem && nextItem.state === States.Stop) {
              elapsedTime += new Date().getTime() - item.dateTime.getTime();
            } else if (nextItem === undefined) {
              elapsedTime += new Date().getTime() - item.dateTime.getTime();
            }
          }
        });
        //from elapsedtime to seconds
        this.time = Math.round(elapsedTime/1000);
        console.log(this.time);
        this.timer = this.formatTime(this.time);
        const lastState = sortedItems[sortedItems.length - 1].state;
        if (lastState === States.Start) {
          this.start(false);
        } else if (lastState === States.Pause) {
          this.pause(false);
        }

      }
    }
  }
}
