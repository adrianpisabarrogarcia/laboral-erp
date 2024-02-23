import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-date-time',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-time.component.html',
  styleUrl: './date-time.component.css'
})
export class DateTimeComponent implements OnInit, OnDestroy {
  fechaHora$: Observable<Date>;
  private subscription!: Subscription;

  constructor() {
    this.fechaHora$ = interval(1000).pipe(map(() => new Date()));
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.subscription = this.fechaHora$.subscribe();
  }

}
