import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DateTimeComponent } from '../date-time/date-time.component';
import { CommonModule } from '@angular/common';


export enum States {
  Start = 'start',
  Pause = 'pause',
  Stop = 'stop'
}

@Component({
  selector: 'app-laboral-timer',
  standalone: true,
  imports: [ButtonModule, DateTimeComponent, CommonModule],
  templateUrl: './laboral-timer.component.html',
  styleUrl: './laboral-timer.component.css'
})
export class LaboralTimerComponent implements OnInit{

  time:number = 0;
  timer: string = "00:00:00"

  constructor() {
    console.log('constructor');
    console.log(States.Start);
   }

  ngOnInit() {
    console.log('init');
  }

  start() {
    setInterval(() => {
      this.time++;
      this.timer = this.formatTime(this.time);
    }, 1000); // 1000 milisegundos = 1 segundo

    console.log('start');
  }

  stop() {
    console.log('stop');
  }

  pause() {
    console.log('pause');
  }

  reset() {
    console.log('reset');
  }

  save() {
    console.log('save');
  }

  cancel() {
    console.log('cancel');
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

  saveCurrentDateTime() {
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
    const time = now.toTimeString().split(' ')[0]; // Hora en formato HH:MM:SS

    localStorage.setItem('start', `{date: ${date}, time: ${time}`);
  }




}
