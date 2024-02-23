import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaboralTimerComponent } from './labora-timer.component';
describe('LaboralTimerComponent', () => {
  let component: LaboralTimerComponent;
  let fixture: ComponentFixture<LaboralTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaboralTimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboralTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
